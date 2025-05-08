# -* coding: utf-8 -*-
"""
CORS Configuration

This module defines the CORS (Cross-Origin Resource Sharing) configuration
for Firebase functions.

Version: 0.0.1
Last update: 2025-05-08
"""

from firebase_functions import options

# CORS configuration for all Firebase functions
cors_config = options.CorsOptions(
    cors_origins=[
        "https://urbandocs.web.app",
        "https://urbandocs.firebaseapp.com",
        "http://127.0.0.1:5000",  # Port on Linux
        "http://127.0.0.1:5002",  # Port on Mac
    ],
    cors_methods=["GET", "POST", "OPTIONS"],
)
