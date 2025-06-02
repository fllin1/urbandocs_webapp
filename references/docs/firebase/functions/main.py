# # -* coding: utf-8 -*-
# """
# Main Entry Point for Firebase Functions

# This module imports and exposes all Firebase functions defined in the sub-modules.

# Version: 0.0.2
# Last update: 2025-05-08
# """

# # Import authentication functions
# from auth.confirmation import handle_confirmation
# from auth.login import handle_login
# from auth.signup import handle_signup

# # Import document-related functions
# from docs.document import get_document
# from docs.typologies import get_typologies
# from docs.villes import get_villes
# from docs.zonages import get_zonages
# from docs.zones import get_zones

# # List of functions exported for Firebase
# __all__ = [
#     # Document functions
#     "get_villes",
#     "get_zonages",
#     "get_zones",
#     "get_typologies",
#     "get_document",
#     # Authentication functions
#     "handle_login",
#     "handle_signup",
#     "handle_confirmation",
# ]
