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

import os
import json

from firebase_functions import https_fn, options
from supabase import create_client

# Initialisation de Supabase
supabase_url = os.environ.get("SUPABASE_URL", "")
supabase_key = os.environ.get("SUPABASE_KEY", "")
try:
    supabase = create_client(supabase_url, supabase_key)
except Exception as e:
    raise (f"Erreur de connexion à Supabase: {str(e)}")

# Configuration CORS
cors_config = options.CorsOptions(
    cors_origins=[
        "https://urbandocs.web.app",
        "https://urbandocs.firebaseapp.com",
        "http://127.0.0.1:5000",  # Port on Linux
        "http://127.0.0.1:5002",  # Port on Mac
    ],
    cors_methods=["GET", "OPTIONS"],
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
