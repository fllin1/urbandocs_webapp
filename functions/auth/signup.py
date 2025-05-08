# -* coding: utf-8 -*-
"""
User Signup Handler

This module contains Firebase functions to handle user registration via Supabase.
It interacts with Supabase's authentication API.

Version: 0.0.1
Last update: 2025-05-08
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

    # Basic email format validation
    email_pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    if not re.match(email_pattern, email):
        return https_fn.Response(
            response=json.dumps({"error": "Invalid email format"}),
            status=400,
            mimetype="application/json",
        )

    # Password validation
    if len(password) < 8:
        return https_fn.Response(
            response=json.dumps(
                {"error": "Password must be at least 8 characters long"}
            ),
            status=400,
            mimetype="application/json",
        )

    # Attempt registration
    try:
        signup_response = supabase.auth.sign_up({"email": email, "password": password})

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
                    "message": "Account created successfully. Please check your email to confirm your registration.",
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
            message = f"Please try again in {wait_time} seconds."
            return https_fn.Response(
                response=json.dumps({"error": message, "wait_time": int(wait_time)}),
                status=429,
                mimetype="application/json",
            )

        # Handle email already exists
        if "already exists" in str(e).lower():
            return https_fn.Response(
                response=json.dumps({"error": "This email is already in use."}),
                status=409,
                mimetype="application/json",
            )

        # Handle weak password
        if "password" in str(e).lower() and "weak" in str(e).lower():
            return https_fn.Response(
                response=json.dumps(
                    {
                        "error": "The password is too weak. \
                            Use at least 8 characters with uppercase, lowercase, and numbers."
                    }
                ),
                status=400,
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
        print(f"Signup error: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "An error occurred during signup"}),
            status=500,
            mimetype="application/json",
        )
