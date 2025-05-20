# -* coding: utf-8 -*-
"""
Supabase Client Utility

This module initializes and provides a singleton instance of the Supabase client
for use throughout the application.

Version: 0.0.1
Last update: 2025-05-08
"""

import os

from supabase import Client, create_client

# Initialize Supabase client
supabase_url = os.environ.get("SUPABASE_PROJECT_URL")
supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")

# Create singleton instance
supabase: Client = create_client(supabase_url, supabase_key)
