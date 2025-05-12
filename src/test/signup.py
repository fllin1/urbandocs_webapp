"""
Test the signup function
"""

import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

# Initialize Supabase client
supabase_url = os.environ.get("SUPABASE_PROJECT_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")

# Create singleton instance
supabase: Client = create_client(supabase_url, supabase_key)


def main():
    """
    Test the signup function
    """
    print(
        supabase.auth.sign_up(
            {"email": "p02mfr95gh@qacmjeq.com", "password": "Urbandocs25"}
        )
    )


if __name__ == "__main__":
    main()
