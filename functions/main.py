# -* coding: utf-8 -*-
"""
Firebase functions

This module contains Firebase functions for handling requests related to
urban planning documents. It interacts with a Supabase database to retrieve
data about cities, zoning, zones, typologies, and documents.

Version: 0.0.1
Last update: 2025-04-15
TODO: Secure the Supabase URLs
TODO: Retrieve Supabase info when user is logged in
"""

import json
import os
import re
import urllib.parse

import gotrue
import requests
from firebase_functions import https_fn, options
from supabase import create_client

# Initialisation de Supabase
supabase_url = os.environ.get("SUPABASE_PROJECT_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")
supabase = create_client(supabase_url, supabase_key)

# Configuration CORS
cors_config = options.CorsOptions(
    cors_origins=[
        "https://urbandocs.web.app",
        "https://urbandocs.firebaseapp.com",
        "http://127.0.0.1:5000",  # Port on Linux
        "http://127.0.0.1:5002",  # Port on Mac
    ],
    cors_methods=["GET", "POST", "OPTIONS"],
)


@https_fn.on_request(cors=cors_config)
def get_villes(req: https_fn.Request) -> https_fn.Response:
    try:
        response = supabase.table("villes").select("id, nom").order("nom").execute()
        return https_fn.Response(
            response=json.dumps(response.data), status=200, mimetype="application/json"
        )
    except Exception as e:
        print(f"Erreur: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "Erreur serveur"}),
            status=500,
            mimetype="application/json",
        )


@https_fn.on_request(cors=cors_config)
def get_zonages(req: https_fn.Request) -> https_fn.Response:
    ville_id = req.args.get("villeId")
    if not ville_id:
        return https_fn.Response(
            response=json.dumps({"error": "ID de ville manquant"}),
            status=400,
            mimetype="application/json",
        )

    try:
        response = (
            supabase.table("zonages")
            .select("id, nom")
            .eq("ville_id", ville_id)
            .order("nom")
            .execute()
        )
        return https_fn.Response(
            response=json.dumps(response.data), status=200, mimetype="application/json"
        )
    except Exception as e:
        print(f"Erreur: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "Erreur serveur"}),
            status=500,
            mimetype="application/json",
        )


@https_fn.on_request(cors=cors_config)
def get_zones(req: https_fn.Request) -> https_fn.Response:
    zonage_id = req.args.get("zonageId")
    if not zonage_id:
        return https_fn.Response(
            response=json.dumps({"error": "ID de zonage manquant"}),
            status=400,
            mimetype="application/json",
        )

    try:
        response = (
            supabase.table("zones")
            .select("id, nom")
            .eq("zonage_id", zonage_id)
            .order("nom")
            .execute()
        )
        return https_fn.Response(
            response=json.dumps(response.data), status=200, mimetype="application/json"
        )
    except Exception as e:
        print(f"Erreur: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "Erreur serveur"}),
            status=500,
            mimetype="application/json",
        )


@https_fn.on_request(cors=cors_config)
def get_typologies(req: https_fn.Request) -> https_fn.Response:
    zonage_id = req.args.get("zonageId")
    zone_id = req.args.get("zoneId")

    if not zonage_id or not zone_id:
        return https_fn.Response(
            response=json.dumps({"error": "Paramètres manquants"}),
            status=400,
            mimetype="application/json",
        )

    try:
        docs_response = (
            supabase.table("documents")
            .select("typologie_id")
            .eq("zonage_id", zonage_id)
            .eq("zone_id", zone_id)
            .execute()
        )

        if not docs_response.data:
            return https_fn.Response(
                response=json.dumps([]),  # Return empty list as JSON
                status=200,
                mimetype="application/json",
            )

        typologie_ids = [doc["typologie_id"] for doc in docs_response.data]
        typo_response = (
            supabase.table("typologies")
            .select("id, nom")
            .in_("id", typologie_ids)
            .order("nom")
            .execute()
        )

        return https_fn.Response(
            response=json.dumps(typo_response.data),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(f"Erreur: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "Erreur serveur"}),
            status=500,
            mimetype="application/json",
        )


@https_fn.on_request(cors=cors_config)
def get_document(req: https_fn.Request) -> https_fn.Response:
    zonage_id = req.args.get("zonageId")
    zone_id = req.args.get("zoneId")
    typologie_id = req.args.get("typologieId")

    if not zonage_id or not zone_id or not typologie_id:
        return https_fn.Response(
            response=json.dumps({"error": "Paramètres manquants"}),
            status=400,
            mimetype="application/json",
        )

    try:
        response = (
            supabase.table("documents")
            .select("id, plu_url, source_plu_date")
            .eq("zonage_id", zonage_id)
            .eq("zone_id", zone_id)
            .eq("typologie_id", typologie_id)
            .execute()
        )

        if not response.data:
            return https_fn.Response(
                response=json.dumps({"error": "Document non trouvé"}),
                status=404,
                mimetype="application/json",
            )

        return https_fn.Response(
            response=json.dumps(response.data[0]),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(f"Erreur: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "Erreur serveur"}),
            status=500,
            mimetype="application/json",
        )


## SUPABASE AUTHENTICATION


@https_fn.on_request(cors=cors_config)
def handle_confirmation(req: https_fn.Request) -> https_fn.Response:
    # 1. Récupération et vérification du paramètre
    confirmation_url = req.args.get("confirmation_url")
    if not confirmation_url:
        return https_fn.Response(
            response=json.dumps({"error": "Missing confirmation URL"}),
            status=400,
            mimetype="application/json",
        )

    # 2. Décodage
    decoded_url = urllib.parse.unquote(confirmation_url)

    # 3. Appel vers Supabase sans suivre les redirections
    try:
        resp = requests.get(decoded_url, allow_redirects=False, timeout=10)
    except requests.RequestException:
        return https_fn.Response(
            response=json.dumps({"error": "Supabase unreachable"}),
            status=502,
            mimetype="application/json",
        )

    # 4. Si Supabase renvoie un Location (redirigé vers redirect_to)
    location = resp.headers.get("Location")
    if location:
        # On transmet cette redirection au navigateur
        return https_fn.Response(status=302, headers={"Location": location})

    # 5. Sinon, erreur de confirmation
    return https_fn.Response(
        response=json.dumps({"error": "Confirmation failed"}),
        status=400,
        mimetype="application/json",
    )
