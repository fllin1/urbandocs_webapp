# 📋 List of TODO

Checklist for the Version 0.0.\*, our main focus is to provide a working version of the webapp.

_For version 0.1.\*, our main focus will be to increase the speed, realiability and informative status messages._
_For version 0.2.\*, our main focus will be to add useful features._
_For version 0.3.\*, our main focus will be to enforce security._
_For version 0.4.\*, our main focus will be UX._

## 🍖 Priorities

🤖 Powered by Claude, Cursor (Gemini 2.5 Pro) and Bolt.

![Perplexity](https://img.shields.io/badge/perplexity-000000?style=for-the-badge&logo=perplexity&logoColor=088F8F)

### 🏎️ Quick fix

- [ ] Logo MWPLU sur toutes les pages;
- [ ] Resize Google Auth for mobile;
- [ ] Resize Turnstile widget for mobile;
- [ ] Add Instagram link;

### 🫀 Core Features

- **Base Web App** _(v 0.0.\*)_:
  - [x] Home page (with "Villes", "Zonages" and "Zones" selectors, "Contact" sections);
  - [x] Login page (with email and password);
  - [x] Signup page (with email and password);
  - [x] Confirmation page;
  - [x] Profile page;
  - [x] Password change;
  - [x] Conditions d'utilisation;
  - [ ] Donation page;
  - [ ] Dedicated static pages (Politique de vente, cookies, presentation du produit, mission, présentation de l'équipe)
- [ ] Add typology _(v 1.0.\*)_;

### 🧠 Additional Features

Important features that are not necessary for the launch.

- [x] Add Google Signup/Signin _(v 0.0.\*)_;
- [x] Use professional domain adress to send all the mails _(v 0.0.\*)_;
- [ ] Add a comment section (users could ask their cities PLU) _(v 0.0.\*)_;
- [ ] Add phone number verification _(v 0.1.\*)_;
- [ ] Connect Supabase Authentication to the table Users, and to the Frontend _(v 0.2.\*)_;
- Voting system for the PLU _(v 0.2.\*)_;
  - [ ] Can only vote once;
  - [ ] Mark out of 5;
  - [ ] Comment section;
- [ ] Links for users to verify source info _(v 0.2.\*)_;

### 🫁 Atomic Corrections

The tasks in this section should only concern specific features of the project/pipeline, and should not involve the correction of 1 (or 2) files.

1. **Supabase**:
   - [x] Email message : Sign up _(v 0.0.\*)_;
   - [x] Email message : Reset password _(v 0.0.\*)_;
   - [x] Email message : Magic link _(v 0.0.\*)_;
   - [x] Email message : Invite user _(v 0.0.\*)_;
   - [x] Email message : Change email address _(v 0.0.\*)_;
   - [x] Add RLS to the .pdf files to give access to authenticated users only _(v 0.0.\*)_;
   - [x] Remove the links in the [documents table](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/editor/39678) _(v 0.0.\*)_;
   - [ ] Correct the [Security Advisor](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/advisors/security) and [Performance Advisor](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/advisors/performance) _(v 0.0.\*)_;
   - [x] Improve all email message _(v 0.2.\*)_;
2. **Confirmation** - Email verification link redirection:
   - [x] Status Message _(v 0.0.\*)_;;
   - [x] Add term of services _(v 0.0.\*)_;;
   - [x] Force the user to read all the terms before confirmation _(v 0.0.\*)_;;
   - [x] IMPORTANT : Redirection to the login page after confirmation is BROKEN (FIXED) _(v 0.0.\*)_;
   - [ ] After the user confirms, send him a mail saying his account was created _(v 0.4.\*)_;
3. **Login** - Security and UX:
   - [ ] Adding a limitation to the number of login trials _(v 0.3.\*)_;
   - [x] Adding a CAPTCHA _(v 0.3.\*)_;
   - [ ] If the user confirmation link expired, it should display a specific message (currently just shows : _"Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception."_ which is inexact) _(v 0.4.\*)_;
4. **Profile** :
   - [x] Add the link to this page on the user info _(v 0.0.\*)_;
   - [ ] Fill the page _(v 0.4.\*)_;

## 🦯 Ergonomie

- [x] Remove the suffix ".html" from the different pages;
- [x] Use webpack production mode;
- [x] Redo the 404.html page;
- [ ] Create an animation for loading to replace the spinner (building theme...);

## 👌 Completed

- [x] Connect your website to the Supabase Database _(v 0.0.\*)_;
- [x] Assert that users are logged before they can download the documents _(v 0.0.\*)_;
- [x] Create a minimalist style appearance _(v 0.0.\*)_;
- [x] Add logos (to pages and documents) _(v 0.0.\*)_;
- [x] Move all authentication and documents features from Firebase to client-side _(v 0.1.\*)_;

1. **Index** :
   - [x] Add a typewriter effect on the subtitle _(v 0.4.\*)_;
   - [x] Add the geometry background (check bolt.new or bootstrap for help) _(v 0.4.\*)_;
2. **Signup**:
   - [x] Add a status message that a confirmation email was sent _(v 0.0.\*)_;
   - [x] Add indications on the required format of the passwords _(v 0.0.\*)_;
   - [x] Display the error message next to the input fields _(v 0.0.\*)_;
   - [x] Correct error message syntax when the password does not fill the requirements _(v 0.0.\*)_;
   - [x] If the confirmation mail was successfuly sent, hide the from _(v 0.0.\*)_;
   - [x] When trying to create an account with an already used mail, return error message _(v 0.0.\*)_;
3. **Change Password** :
   - [x] Create forgotten-password and update-password pages _(v 0.0.\*)_;

### 🦴 Backend

1. **Add on the synthesis** :
   - [x] Logo;
   - [x] Reminder of "mentions légales" at the end;
   - [x] Link to CGU;
   - [x] Add version date (+ version of the source PLU);
