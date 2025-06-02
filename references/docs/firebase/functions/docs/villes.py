# -* coding: utf-8 -*-
"""
Cities Retrieval Function

This module contains the Firebase function to retrieve the list of cities
from the Supabase database.

Version: 0.0.1
Last update: 2025-05-08
"""

import json

from firebase_functions import https_fn

from utils.cors_config import cors_config
from utils.supabase_client import supabase


@https_fn.on_request(cors=cors_config)
def get_villes(req: https_fn.Request) -> https_fn.Response:
    """
    Retrieves the list of cities from the database.

    Args:
        req: HTTP request.

    Returns:
        Response: JSON response with the list of cities.
    """
    try:
        response = supabase.table("villes").select("id, nom").order("nom").execute()
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
