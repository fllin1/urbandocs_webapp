# -* coding: utf-8 -*-
"""
Typologies Retrieval Function

This module contains the Firebase function to retrieve the list of typologies
for a specific zone and zoning area from the Supabase database.

Version: 0.0.1
Last update: 2025-05-08
"""

import json

from firebase_functions import https_fn

from utils.cors_config import cors_config
from utils.supabase_client import supabase


@https_fn.on_request(cors=cors_config)
def get_typologies(req: https_fn.Request) -> https_fn.Response:
    """
    Retrieves the list of typologies for a specific zone and zoning area.

    Args:
        req: HTTP request containing the zone and zoning area IDs.

    Returns:
        Response: JSON response with the list of typologies.
    """
    zonage_id = req.args.get("zonageId")
    zone_id = req.args.get("zoneId")

    if not zonage_id or not zone_id:
        return https_fn.Response(
            response=json.dumps({"error": "Missing parameters"}),
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
        print(f"Error: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "Server error"}),
            status=500,
            mimetype="application/json",
        )
