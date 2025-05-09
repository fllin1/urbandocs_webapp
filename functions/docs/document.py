# -* coding: utf-8 -*-
"""
Document Retrieval Function

This module contains the Firebase function to retrieve a specific document
based on zone, zoning area, and typology from the Supabase database.

Version: 0.0.1
Last update: 2025-05-08
"""

import json

from firebase_functions import https_fn

from utils.cors_config import cors_config
from utils.supabase_client import supabase


@https_fn.on_request(cors=cors_config)
def get_document(req: https_fn.Request) -> https_fn.Response:
    """
    Retrieves a specific document based on zone, zoning area, and typology.

    Args:
        req: HTTP request containing zone, zoning area, and typology IDs.

    Returns:
        Response: JSON response with the document data.
    """
    zonage_id = req.args.get("zonageId")
    zone_id = req.args.get("zoneId")
    typologie_id = req.args.get("typologieId")

    if not zonage_id or not zone_id or not typologie_id:
        return https_fn.Response(
            response=json.dumps({"error": "Missing parameters"}),
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
                response=json.dumps({"error": "Document not found"}),
                status=404,
                mimetype="application/json",
            )

        return https_fn.Response(
            response=json.dumps(response.data[0]),
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
