# -* coding: utf-8 -*-
"""
Zoning Retrieval Function

This module contains the Firebase function to retrieve the list of zoning areas
for a specific city from the Supabase database.

Version: 0.0.1
Last update: 2025-05-08
"""

import json

from firebase_functions import https_fn

from utils.cors_config import cors_config
from utils.supabase_client import supabase


@https_fn.on_request(cors=cors_config)
def get_zonages(req: https_fn.Request) -> https_fn.Response:
    """
    Retrieves the list of zoning areas for a specific city.

    Args:
        req: HTTP request containing the city ID.

    Returns:
        Response: JSON response with the list of zoning areas.
    """
    ville_id = req.args.get("villeId")
    if not ville_id:
        return https_fn.Response(
            response=json.dumps({"error": "Missing city ID"}),
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
        print(f"Error: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "Server error"}),
            status=500,
            mimetype="application/json",
        )
