# -* coding: utf-8 -*-
"""
Zones Retrieval Function

This module contains the Firebase function to retrieve the list of zones
for a specific zoning area from the Supabase database.

Version: 0.0.1
Last update: 2025-05-08
"""

import json

from firebase_functions import https_fn

from utils.cors_config import cors_config
from utils.supabase_client import supabase


@https_fn.on_request(cors=cors_config)
def get_zones(req: https_fn.Request) -> https_fn.Response:
    """
    Retrieves the list of zones for a specific zoning area.

    Args:
        req: HTTP request containing the zoning area ID.

    Returns:
        Response: JSON response with the list of zones.
    """
    zonage_id = req.args.get("zonageId")
    if not zonage_id:
        return https_fn.Response(
            response=json.dumps({"error": "Missing zoning ID"}),
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
        print(f"Error: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "Server error"}),
            status=500,
            mimetype="application/json",
        )
