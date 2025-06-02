# Auth Pages Mobile Fixes

## Issues Fixed

### 1. Turnstile Widget Mobile Overflow

**Problem**: The Cloudflare Turnstile widget was overflowing from the form section on mobile devices.

**Solution**: Enhanced `.auth-captcha` styling in `src/css/pages/auth.css`:

- Added flexbox layout with proper centering
- Implemented responsive scaling for different screen sizes
- Added overflow control to prevent widget from breaking layout
- Used CSS transforms to scale the widget on smaller screens:
  - 768px and below: 85% scale
  - 480px and below: 75% scale

**Key CSS Changes**:

```css
.auth-captcha {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Mobile responsive scaling */
@media (max-width: 768px) {
    .auth-captcha iframe {
        width: 280px !important;
        max-width: calc(100vw - 60px) !important;
        transform: scale(0.85);
        transform-origin: center;
    }
}

@media (max-width: 480px) {
    .auth-captcha iframe {
        width: 260px !important;
        max-width: calc(100vw - 80px) !important;
        transform: scale(0.75);
        transform-origin: center;
    }
}
```

### 2. Social Button Text Centering

**Problem**: Text in `.auth-button.social-button` buttons was not perfectly centered due to absolute positioning of the icon.

**Solution**: Redesigned `.social-button` layout in `src/css/components/logo.css`:

- Removed absolute positioning approach
- Implemented flexbox with gap for proper spacing
- Icons and text now flow naturally in the layout

**Key CSS Changes**:

```css
.social-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;  /* Even spacing between icon and text */
}

.social-button img {
    height: 18px;
    width: auto;
    max-width: 20px;
    flex-shrink: 0;  /* Prevent icon from shrinking */
}
```

## Files Modified

1. `src/css/pages/auth.css` - Enhanced Turnstile widget responsiveness
2. `src/css/components/logo.css` - Fixed social button text centering

## Affected Pages

- `/login` (auth/login.html)
- `/signup` (auth/signup.html) 
- `/forgotten-password` (auth/forgotten-password.html)

## Testing Notes

The fixes ensure:

- Turnstile widget scales appropriately on all mobile devices
- No horizontal overflow occurs on any screen size
- Button text is perfectly centered alongside icons
- Layout remains consistent across all auth pages

All changes are backwards compatible and don't affect desktop layouts.
