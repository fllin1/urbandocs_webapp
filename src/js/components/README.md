# Footer Component

## Usage

The footer component is automatically loaded on all pages that include the footer script.

### To add the footer to a new page

1. Add the footer placeholder div where you want the footer to appear:

    ```html
    <!-- Footer will be loaded here -->
    <div id="footer-placeholder"></div>
    ```

2. Include the footer script at the end of your `<body>` tag:

    ```html
    <script type="module" src="js/components/footer.js"></script>
    ```

### To update the footer

Simply edit the `footer.js` file. Changes will automatically apply to all pages using the footer component.

### Features

- ✅ Consistent footer across all pages
- ✅ Centralized management (single source of truth)
- ✅ Fixed social icons sizing and alignment
- ✅ Proper SVG social icons (Twitter, Facebook, LinkedIn, YouTube)
- ✅ Responsive design maintained

### Social Icons

The footer uses SVG icons located in `assets/icons/social/`:

- `twitter-x.svg` - Twitter/X icon
- `facebook.svg` - Facebook icon  
- `linkedin.svg` - LinkedIn icon
- `youtube.svg` - YouTube icon

Icons are sized to 20x20px and properly centered within 40x40px containers. 