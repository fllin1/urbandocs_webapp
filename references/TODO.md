# 📋 List of TODO

Checklist for the Version 0.0.*

## 🍖 Priorities

🤖 Ask Claude First

![Perplexity](https://img.shields.io/badge/perplexity-000000?style=for-the-badge&logo=perplexity&logoColor=088F8F)

### 🫀 Core Features

* [ ] Create the base website containing :
  * [x] Home page (with "Villes", "Zonages" and "Zones" selectors);
  * [x] Login page (with email and password);
  * [x] Signup page (with email and password);
  * [x] Confirmation page;
  * [ ] Profile page;
  * [ ] Password change;
  * [x] Conditions d'utilisation;
* [x] Connect your website to the Supabase Database;
* [x] Assert that users are logged before they can download the documents;
* [x] Create a minimalist style appearance;

### 🧠 Additional Features

The tasks in this section aim to implement complete features, requiring multiple level updates.

* [ ] Connect Supabase Authentication to the table Users, and to the Frontend;
* [ ] Add Google Signup/Signin and Phone number verification;
* [x] Use personal domain adress to send all the mails;

### 🫁 Atomic Corrections

The tasks in this section should only concern specific features of the project/pipeline, and should not involve the correction of 1 (or 2) files.

1. **Supabase**:
   *Email message* ([Auth Templates](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/auth/templates)):
   * [x] Sign up;
   * [x] Reset password;
   * [x] Magic link;
   * [x] Invite user;
   * [x] Change email address;
   *Storage* ([UrbanDocs Bucket](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/storage/buckets/urbandocs)):
   * [ ] Add RLS to the .pdf files to give access to authenticated users only;
   *Database* ([Tables Schemas](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/database/schemas)):
   * [ ] Modify the links in the [documents table](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/editor/39678) to redirect to the UrbanDocs Bucket instead of the current public "Documents" bucket;
   * [ ] Correct the [Security Advisor](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/advisors/security) and [Performance Advisor](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/advisors/performance)
   * [ ] Retrieve user info;
2. **Signup**:
   *UX* :
   * [x] Add a notification that a confirmation email was sent;
   * [x] Add indications on the required format of the passwords
   * [x] Display the error message next to the input fields
   * [x] Correct error message syntax when the password does not fill the requirements;
   * [x] If the confirmation mail was successfuly sent, hide the input fields;
   * [ ] Redirect to login page;
   *Security* :
   * [x] When trying to create an account with an already used mail, return error message;
3. **Confirmation** - Email verification link redirection:
   *Context* : When signing up, you will recieve an authentication email;
   * [x] You will be redirected to a user-confirmation page;
   * [x] Add term of services;
   * [x] Force the user to read all the terms before confirmation;
   * [ ] After the user confirms, send him a mail saying his account was created;
4. **Login** - Security and UX:
   *Security* :
   * [ ] Adding a limitation to the number of login trials;
   * [ ] Adding a CAPTCHA;
   *UX* :
   * [ ] If the user confirmation link expired, it should display a specific message (currently just shows : *"Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception."* which is inexact);
5. **Profile** :
   * [x] Add the redirection to this page;
   * [ ] Fill the page (first check "Retrieve user info");
6. **Change Password** :
   * [ ] Create this page;
7. **Index** :
   * [x] Add a typewriter effect on the subtitle;
   * [x] Add the geometry background (check bolt.new or bootstrap for help);
   * [ ] Add loading animation for the selectors;

## 🦯 Ergonomie

* [x] Remove the suffix ".html" from the different pages;
* [x] Use webpack production mode;
* [x] Redo the 404.html page;
* [ ] Replace spinner with an animation (building...);
