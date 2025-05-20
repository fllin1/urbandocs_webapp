# -* coding: utf-8 -*-
"""
User Signup Handler

This module contains Firebase functions to handle user registration via Supabase.
It interacts with Supabase's authentication API.
You cannot signup using an email that is already in use.

Version: 0.0.2
Last update: 2025-05-11
"""

import json
import re

import gotrue.errors
from firebase_functions import https_fn

from utils.cors_config import cors_config
from utils.supabase_client import supabase


@https_fn.on_request(cors=cors_config)
def handle_signup(req: https_fn.Request) -> https_fn.Response:
    """
    Handles user registration via Supabase.

    Args:
        req: HTTP request containing email and password.

    Returns:
        Response: HTTP response with registration operation status.
    """
    # Verify HTTP method
    if req.method != "POST":
        return https_fn.Response(
            response=json.dumps({"error": "Only POST method is allowed"}),
            status=405,
            mimetype="application/json",
        )

    # Get and validate request data
    try:
        request_data = req.get_json()
        email = request_data.get("email")
        password = request_data.get("password")
    except json.JSONDecodeError:
        return https_fn.Response(
            response=json.dumps({"error": "Invalid JSON format"}),
            status=400,
            mimetype="application/json",
        )

    # Validate required fields
    if not email or not password:
        return https_fn.Response(
            response=json.dumps({"error": "Un email et un mot de passe sont requis"}),
            status=400,
            mimetype="application/json",
        )

    # Attempt registration
    try:
        signup_response = supabase.auth.sign_up({"email": email, "password": password})

        if len(signup_response.user.identities) == 0:
            return https_fn.Response(
                response=json.dumps(
                    {
                        "error": "Cette adresse mail a déjà été utilisée. Veuillez utiliser une autre adresse mail."
                    }
                ),
                status=400,
                mimetype="application/json",
            )

        # Prepare user data to return
        user_info = None
        if signup_response.user:
            user_info = {
                "id": signup_response.user.id,
                "email": signup_response.user.email,
                "created_at": signup_response.user.created_at.isoformat()
                if signup_response.user.created_at
                else None,
                "confirmation_sent_at": signup_response.user.confirmation_sent_at.isoformat()
                if signup_response.user.confirmation_sent_at
                else None,
            }

        return https_fn.Response(
            response=json.dumps(
                {
                    "message": "Identifiants valides ! Veuillez vérifier votre email pour confirmer votre inscription.",
                    "user": user_info,
                }
            ),
            status=200,
            mimetype="application/json",
        )

    except gotrue.errors.AuthApiError as e:
        # Check for rate limiting
        wait_time_match = re.search(r"only request this after (\d+) seconds", str(e))

        if wait_time_match:
            wait_time = wait_time_match.group(1)
            message = f"Veuillez réessayer dans {wait_time} secondes."
            return https_fn.Response(
                response=json.dumps({"error": message, "wait_time": int(wait_time)}),
                status=429,
                mimetype="application/json",
            )

        # Other authentication errors
        return https_fn.Response(
            response=json.dumps({"error": f"Erreur d'authentification: {str(e)}"}),
            status=400,
            mimetype="application/json",
        )

    except Exception as e:
        # General errors
        print(f"Signup error: {str(e)}")
        return https_fn.Response(
            response=json.dumps(
                {"error": "Une erreur est survenue lors de l'inscription."}
            ),
            status=500,
            mimetype="application/json",
        )
