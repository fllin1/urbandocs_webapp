# -* coding: utf-8 -*-
"""
User Login Handler

This module contains Firebase functions to handle user login via Supabase.
It interacts with Supabase's authentication API.

Version: 0.0.1
Last update: 2025-05-08
"""

import json

import gotrue.errors
from firebase_functions import https_fn

from utils.cors_config import cors_config
from utils.supabase_client import supabase


@https_fn.on_request(cors=cors_config)
def handle_login(req: https_fn.Request) -> https_fn.Response:
    """
    Handles user login via Supabase.

    Args:
        req: HTTP request containing email and password.

    Returns:
        Response: HTTP response with login operation status and user data.
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
    except Exception:
        return https_fn.Response(
            response=json.dumps({"error": "Invalid request format"}),
            status=400,
            mimetype="application/json",
        )

    # Validate required fields
    if not email or not password:
        return https_fn.Response(
            response=json.dumps({"error": "Email and password are required"}),
            status=400,
            mimetype="application/json",
        )

    # Attempt login
    try:
        signin_response = supabase.auth.sign_in_with_password(
            {"email": email, "password": password}
        )

        # Prepare user data to return (limit to necessary information)
        user_data = None
        if signin_response.user:
            user_data = {
                "id": signin_response.user.id,
                "email": signin_response.user.email,
                "last_sign_in_at": signin_response.user.last_sign_in_at.isoformat()
                if signin_response.user.last_sign_in_at
                else None,
                "created_at": signin_response.user.created_at.isoformat()
                if signin_response.user.created_at
                else None,
            }

        # Prepare token data
        token_data = None
        if signin_response.session:
            token_data = {
                "access_token": signin_response.session.access_token,
                "refresh_token": signin_response.session.refresh_token,
                "expires_in": signin_response.session.expires_in,
            }

        # Success response
        return https_fn.Response(
            response=json.dumps(
                {
                    "message": "Login successful",
                    "user": user_data,
                    "session": token_data,
                }
            ),
            status=200,
            mimetype="application/json",
        )

    except gotrue.errors.AuthApiError as e:
        error_message = str(e).lower()

        # Handle email not confirmed
        if "email not confirmed" in error_message:
            return https_fn.Response(
                response=json.dumps(
                    {
                        "error": "Your email has not been confirmed. Please check your inbox."
                    }
                ),
                status=401,
                mimetype="application/json",
            )

        # Handle invalid credentials
        if "invalid login credentials" in error_message:
            return https_fn.Response(
                response=json.dumps({"error": "Email ou mot de passe incorrect."}),
                status=401,
                mimetype="application/json",
            )

        # Other authentication errors
        return https_fn.Response(
            response=json.dumps({"error": f"Authentication error: {str(e)}"}),
            status=400,
            mimetype="application/json",
        )

    except Exception as e:
        # General errors
        print(f"Login error: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "An error occurred during login"}),
            status=500,
            mimetype="application/json",
        )
