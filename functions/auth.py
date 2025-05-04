import json
import os
import re
import urllib.parse

import gotrue
from dotenv import load_dotenv
from firebase_functions import https_fn, options
from supabase import Client, create_client

load_dotenv()

# Initialisation de Supabase
supabase_url = os.environ.get("SUPABASE_PROJECT_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)


def sign_up(email: str, password: str) -> https_fn.Response:
    """
    Sign up a user with email and password and sends a verification email.
    If there's an error, it checks if the error is related to rate limiting
    and returns a message indicating the wait time.

    Args:
        email (str): The email address of the user.
        password (str): The password for the user.
    Returns:
        dict: A dictionary containing the response from Supabase or an error message.
    """
    try:
        response = supabase.auth.sign_up({"email": email, "password": password})
        return response

    except gotrue.errors.AuthApiError as e:
        wait_time_match = re.search(r"only request this after (\d+) seconds", str(e))

        if wait_time_match:
            wait_time = wait_time_match.group(1)
            message = f"Veuillez réessayer dans {wait_time} secondes."
            return {"error": message, "wait_time": int(wait_time)}

        return {"error": f"Erreur d'authentification: {str(e)}"}


def handle_confirmation(req: https_fn.Request) -> https_fn.Response:
    """Process the Supabase confirmation URL."""
    try:
        # Get the confirmation URL from query parameters
        confirmation_url = req.args.get("confirmation_url")
        if not confirmation_url:
            return https_fn.Response(
                response=json.dumps({"error": "Missing confirmation URL"}),
                status=400,
                mimetype="application/json",
            )

        # URL decode the confirmation URL
        decoded_url = urllib.parse.unquote(confirmation_url)

        # Validate the URL to ensure it's a legitimate Supabase URL
        if "supabase" not in decoded_url:
            return https_fn.Response(
                response=json.dumps({"error": "Invalid confirmation URL"}),
                status=400,
                mimetype="application/json",
            )

        # Return the decoded URL
        return https_fn.Response(
            response=json.dumps({"confirmation_url": decoded_url}),
            status=200,
            mimetype="application/json",
        )

        # Alternative approach: actually hit the URL and return success/failure
        # response = requests.get(decoded_url)
        # if response.status_code == 200:
        #     return https_fn.Response(
        #         response=json.dumps({"success": True}),
        #         status=200,
        #         mimetype="application/json"
        #     )
        # else:
        #     return https_fn.Response(
        #         response=json.dumps({"error": "Confirmation failed"}),
        #         status=400,
        #         mimetype="application/json"
        #     )

    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return https_fn.Response(
            response=json.dumps({"error": "Server error"}),
            status=500,
            mimetype="application/json",
        )


def sign_in_with_password(email: str, password: str):
    """
    Sign in a user with email and password.
    """
    try:
        response = supabase.auth.sign_in_with_password(
            {"email": email, "password": password}
        )
        return response
    except gotrue.errors.AuthApiError as e:
        if "Invalid login credentials" in str(e):
            return {"error": "Identifiant ou mot de passe invalide."}

        if "Email not confirmed" in str(e):
            return {"error": "Veuillez confirmer votre adresse e-mail."}

        return {"error": f"Erreur d'authentification: {str(e)}"}


def sign_out():
    """
    Sign out the current user.
    """
    supabase.auth.sign_out()


def get_user():
    """
    Get the current user.
    """
    response = supabase.auth.get_user()
    return response


def main():
    """
    Main function to test the functions.
    """
    # Test sign up
    email = "linflorent@hotmail.fr"
    password = "Urbandocs25"

    print(sign_up(email, password))


if __name__ == "__main__":
    main()
