# Project Organization Guide

## Overview

This project has been reorganized to improve maintainability and separation of concerns. Files are now properly organized in the `public/` directory with clear subdirectories for different types of content.

## File Structure

```text
public/
├── index.html                      # Main homepage
├── about.html                      # About page
├── contact.html                    # Contact page  
├── documentation.html              # Documentation page
├── donation.html                   # Donation page
├── profile.html                    # User profile page
├── plu-summary.html                # PLU summary page
├── 404.html                        # Error page
├── auth/                           # Authentication pages
│   ├── login.html                  # Login page
│   ├── signup.html                 # Signup page  
│   ├── confirmation.html           # Email confirmation
│   ├── forgotten-password.html     # Password reset
│   └── update-password.html        # Password update
├── policies/                       # Legal/policy pages
│   ├── mentions-legales.html       # Legal mentions
│   ├── terms.html                  # Terms of use
│   ├── confidentialite.html        # Privacy policy
│   ├── cookies.html                # Cookie policy
│   └── politiques-de-ventes.html   # Sales policy
├── assets/                         # Static assets
│   ├── icons/                      # SVG icons
│   └── images/                     # Images
├── css/                            # Stylesheets
└── js/                             # JavaScript bundles
```

## Configuration Files

### webpack.config.js

- Configured to output files to correct subdirectories
- Auth pages go to `auth/` subdirectory  
- Policy pages go to `policies/` subdirectory
- Main pages remain in root
- Footer component included in common chunks

### firebase.json

- URL rewrites configured for clean URLs
- `/login` → `/auth/login.html`
- `/signup` → `/auth/signup.html`
- `/terms` → `/policies/terms.html`
- etc.

## URL Structure

### Clean URLs (user-facing)

- `/` → Homepage
- `/about` → About page
- `/login` → Login page
- `/signup` → Signup page
- `/terms` → Terms page
- `/confidentialite` → Privacy page

### File Paths (internal)

- `/` → `index.html`
- `/about` → `about.html`  
- `/login` → `auth/login.html`
- `/signup` → `auth/signup.html`
- `/terms` → `policies/terms.html`
- `/confidentialite` → `policies/confidentialite.html`

## Asset Paths

### Main Pages (in root)

- CSS: `css/main.css`
- Assets: `assets/icons/logo.svg`

### Auth Pages (in `auth/` subdirectory)

- CSS: `../css/main.css`
- Assets: `../assets/icons/logo.svg`

### Policy Pages (in `policies/` subdirectory)

- CSS: `../css/main.css`
- Assets: `../assets/icons/logo.svg`

## Footer Component

The footer is now centralized in `src/js/components/footer.js`:

### Usage

```html
<!-- Add placeholder in HTML -->
<div id="footer-placeholder"></div>

<!-- Include footer script -->
<script type="module" src="js/components/footer.js"></script>
```

### Benefits

- ✅ Single source of truth for footer content
- ✅ Automatic loading on all pages
- ✅ Easy global updates
- ✅ Consistent styling and links

## Development Workflow

### Building

```bash
npm run dev    # Development build
npm run prod   # Production build
npm run watch  # Watch mode
```

### File Organization Rules

1. **Main pages**: Go in public root
2. **Auth pages**: Go in `auth/` subdirectory
3. **Policy pages**: Go in `policies/` subdirectory
4. **Use relative paths** for assets in subdirectories
5. **Use clean URLs** in links (Firebase handles routing)

## Deployment

The project is configured for Firebase Hosting with automatic URL rewrites. Deploy with:

```bash
firebase deploy --only hosting
```

All URLs will work as expected:

- Direct file access: `domain.com/auth/login.html` ✅
- Clean URL access: `domain.com/login` ✅ (redirects to auth/login.html)

## Maintenance

### Adding New Pages

1. **Main page**: Add to webpack config in main pages section
2. **Auth page**: Add to webpack config in auth section + update template paths
3. **Policy page**: Add to webpack config in policies section + update template paths
4. **Update firebase.json** with new URL rewrite if needed

### Footer Updates

Simply edit `src/js/components/footer.js` - changes apply to all pages automatically. 