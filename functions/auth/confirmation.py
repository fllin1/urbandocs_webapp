# -* coding: utf-8 -*-
"""
Email Confirmation Handler

This module contains Firebase functions to handle email confirmation after
user registration via Supabase. It also sends a confirmation email to the user.

Version: 0.0.2
Last update: 2025-05-10
"""

import json
import urllib.parse

import requests
from firebase_functions import https_fn

from utils.cors_config import cors_config


@https_fn.on_request(cors=cors_config)
def handle_confirmation(req: https_fn.Request) -> https_fn.Response:
    """
    Handles email confirmation by forwarding the request to Supabase.

    Args:
        req: HTTP request containing the confirmation URL.

    Returns:
        Response: Redirection to appropriate page or error message.
    """
    # 1. Get and validate the parameter
    confirmation_url = req.args.get("confirmation_url")
    if not confirmation_url:
        return https_fn.Response(
            response=json.dumps({"error": "Missing confirmation URL"}),
            status=400,
            mimetype="application/json",
        )

    # 2. Decode URL
    decoded_url = urllib.parse.unquote(confirmation_url)

    # 3. Call Supabase
    try:
        # We expect Supabase to handle the confirmation and potentially redirect.
        # We'll check the final status of this request.
        # Supabase should ideally return a 2xx status if its part is done,
        # even if it would normally issue a redirect to the client.
        resp = requests.get(decoded_url, timeout=10)  # allow_redirects=True is default

        # 4. Check Supabase response
        if resp.ok:  # .ok checks for status codes < 400
            return https_fn.Response(
                response=json.dumps(
                    {"message": "Email confirmé avec succès. Veuillez vous connecter."}
                ),
                status=200,  # Or resp.status_code if you want to echo Supabase's specific success
                mimetype="application/json",
            )
        else:
            # If Supabase itself returns an error (e.g., token expired, already used)
            error_message = "La confirmation a échoué."
            try:
                # Try to get a more specific error from Supabase response if it's JSON
                sup_error = resp.json()
                if sup_error and "error_description" in sup_error:
                    error_message = sup_error["error_description"]
                elif sup_error and "msg" in sup_error:  # Supabase sometimes uses 'msg'
                    error_message = sup_error["msg"]
            except ValueError:  # Not JSON
                pass  # Use default error_message

            return https_fn.Response(
                response=json.dumps(
                    {"error": error_message, "supabase_status": resp.status_code}
                ),
                status=400,  # Client error, as the confirmation token might be invalid
                mimetype="application/json",
            )

    except requests.exceptions.Timeout:
        return https_fn.Response(
            response=json.dumps({"error": "La requête de confirmation a expiré"}),
            status=504,  # Gateway Timeout
            mimetype="application/json",
        )
    except requests.exceptions.RequestException as e:
        # This catches other network errors, DNS failures, etc.
        return https_fn.Response(
            response=json.dumps(
                {"error": f"Failed to reach Supabase for confirmation: {str(e)}"}
            ),
            status=502,  # Bad Gateway
            mimetype="application/json",
        )
