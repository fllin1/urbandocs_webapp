# UrbanDocs App

Web platform to access the synthesis of the Ubran Documents in France using Firebase as host.

## Patch Notes

### Next Steps

Adding security layers, other methods of authentication and improving user experience.

Detail list of tasks in the [TODO list](./references/TODO.md).

### Version Update

```markdown
0.0.6 (May 13th 2025) - Complete redesign (base built with [Bolt](https://bolt.new/~/github-p2sgvptw))
0.0.5 (May 9th 2025) - Moved to Supabase Authentication (login & signup)
0.0.4 (May 3rd 2025) - Supabase Mail Confirmation
0.0.3 (April 27th 2025) - Firebase Authentication system for login
0.0.2 (April 26th 2025) - Update on the UI
0.0.1 (April 21st 2025) - Initial commit of the website
```

## Author

[![Static Badge](https://img.shields.io/badge/author-Panda-blue)](https://github.com/fllin1)

## Badges

![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

## Documentation

### Setting Up

[![Static Badge](https://img.shields.io/badge/Firebase-App%20Hosting-red)](https://firebase.google.com/docs/app-hosting)
[![Static Badge](https://img.shields.io/badge/Firebase-Cloud%20Functions-red)](https://firebase.google.com/docs/functions)
[![Static Badge](https://img.shields.io/badge/Supabase-Documentation-light_green)](https://supabase.com/docs)
[![Static Badge](https://img.shields.io/badge/Reddit-Functions%20Rules-orange)](https://www.reddit.com/r/reactjs/comments/fsw405/firebase_cloud_functions_cors_policy_error/?rdt=48891)

In this project, only the *App Hosting* and *Cloud Functions* from **Firebase** were used. The storage of the data was done with **Supabase**. Lastly, for Firebase *gen2 functions*, refer to the reddit post on **Function Rules** to correctly update newly added rules in the Cloud Functions.

## Installation

You should make sure that you can Python and NodeJS.

Then setup your [Firebase CLI](https://firebase.google.com/docs/cli) on your local machine.

You should use a bundler such as [webpack](https://webpack.js.org/guides/getting-started/) and install the Supabase library as it serves as our database.

```bash
  npm install -D webpack webpack-cli copy-webpack-plugin html-webpack-plugin
  npm install @supabase/supabase-js firebase
  npm install -g firebase-tools  # Client firebase
```

Write first your JS modules in the `./src/` folder, add its name in the `./webpack.config.js`.

**NOTE** : You have just installed the *developper* version of webpack, in production mode, you might want to switch to the [production version](https://webpack.js.org/guides/production/).

### Roadblocks

1. If you encounter issues with your `pip` to install the dependencies, follow this [Youtube Tutorial](https://www.youtube.com/watch?v=q_sayYt50oM).
2. **Set your [gcloud CLI](https://cloud.google.com/sdk/docs/install) account** (your gmail address should then appear on your terminal line). Then, after setting up your *Cloud Functions*, you should use the following terminal command to grand the necessary access to your functions.

    ```bash
      gcloud functions add-invoker-policy-binding $python_function_name --member=allUsers
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your ̀`./functions/.env` file :

```sh
SUPABASE_PROJECT_URL={PROJECT_URL}
SUPABASE_SERVICE_KEY={SERVICE_ROLE_KEY}
```

## Run Locally

You will first need to create a Firebase project, this part is not covered and will be tested at a later date.

1. Clone the project and go to the project directory

    ```bash
      git clone https://github.com/fllin1/urbandocs_webapp.git
      cd urbandocs_webapp
    ```

2. Firebase Init

    ```bash
      firebase init
    ```

    Choose to add the *Hosting* and *Cloud Functions* services.
    - For Hosting : The default values should be the right ones.
    - For Cloud Functions : Do not rewrite the files, and install the dependencies : Choose Python as the langagen then the default init configuration should be the right ones.

    NOTE : If you encounter issues while installing your dependencies, I invite you to check the [Roadblocks](#roadblocks) section and refer to the Youtube Tutorial.

3. If you wish to use webpack in development mode, the current `./webpack.config.js` is already configured for it. You can then start the emulator for a test run

    ```bash
      npm run dev
      firebase emulators:start
    ```

## Deployment

The first step would be to use webpack in **production mode**. In this case, you can simply build your project, the commands are already set in your `./package.json` file. Right after that you can deploy your project :

```bash
  npm run prod
  firebase deploy
```

## Code Structure

### Frontend

#### Source (JavaScript)

```text
src/
│
├── assets/
│   ├── fonts/
│   │   └── (...)                 # Font files used across the application
│   │
│   ├── icons/
│   │   └── (...)                 # SVG and other icon files
│   │
│   └── images/
│       └── (...)                 # Image assets for the site
│
├── css/
│   ├── base/
│   │   └── base.css              # Core styles and CSS resets
│   │
│   ├── components/
│   │   ├── buttons.css           # Button styles and variants
│   │   ├── forms.css             # Form elements and input styling
│   │   ├── messages.css          # Notification and message styles
│   │   └── spinner.css           # Loading spinners and animations
│   │
│   ├── layout/
│   │   ├── footer.css            # Footer layout and styling
│   │   ├── grid.css              # Grid system for page layouts
│   │   └── header.css            # Header and navigation styling
│   │
│   ├── pages/
│   │   ├── auth.css              # Styles specific to auth pages
│   │   ├── error.css             # Error page styling
│   │   └── home.css              # Homepage specific styles
│   │
│   ├── utils/
│   │   ├── animations.css        # Reusable animation classes
│   │   └── utilities.css         # Helper classes and utilities
│   └── main.css                  # Main CSS file that imports all modules
│
├── js/
│   ├── auth/                     # Authentication modules
│   │   ├── auth.js               # Common base functions
│   │   ├── login.js              # Functions specific to login
│   │   ├── signup.js             # Functions specific to signup
│   │   └── confirmation.js       # Functions specific to confirmation
│   │
│   ├── entries/                  # Entry points for webpack
│   │   ├── auth.js               # General entry point for authentication
│   │   ├── login.js              # Entry point for login.html
│   │   ├── signup.js             # Entry point for signup.html
│   │   └── confirmation.js       # Entry point for confirmation.html
│   │
│   ├── api.js                    # API to communicate with the backend
│   ├── app.js                    # Main entry point
│   ├── mappings.js               # Mappings for the application
│   ├── ui.js                     # Common UI functions
│   └── typewriter.js             # Text animation effects for landing page
│
├── 404.html                      # Custom 404 error page
├── confirmation.html             # Account confirmation page
├── index.html                    # Main landing page
├── login.html                    # User login page
├── profile.html                  # User profile management
├── signup.html                   # New user registration
└── terms.html                    # Terms and conditions page
```

#### Public (with `npm run dev`)

```text
public/
│
├── assets/
│   └── (same assets as dev)
│
├── js/
│   ├── api.bundle.js
│   ├── app.bundle.js
│   ├── mappings.bundle.js
│   ├── ui.bundle.js
│   ├── auth.bundle.js
│   ├── login.bundle.js
│   ├── signup.bundle.js
│   └── confirmation.bundle.js
│
├── css/
│   └── (same .css as dev)
│
└── (same .html as dev)
```

### Backend (Python)

```text
functions/
├── main.py                      # Entry point for Firebase functions
├── auth/                        # Functions related to authentication
│   ├── handle_login.py          # Function to handle login
│   ├── handle_signup.py         # Function to handle signup
│   └── handle_confirmation.py   # Function to handle email confirmation
│
├── docs/                        # Functions to retrieve Supabase data
│   ├── get_villes.py
│   ├── get_zonages.py
│   ├── get_zones.py
│   ├── get_typologies.py
│   └── get_document.py
│
└── utils/                       # Common utilities
    ├── supabase_client.py       # Supabase client initialization
    └── cors_config.py           # Common CORS configuration
```

## Licence

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)