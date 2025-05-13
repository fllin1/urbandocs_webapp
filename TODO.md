# 📋 List of TODO

Checklist for the Version 0.0.*

## 🍖 Priorities

🤖 Ask Claude First

![Perplexity](https://img.shields.io/badge/perplexity-000000?style=for-the-badge&logo=perplexity&logoColor=088F8F)

### 🫀 Core Features

* [x] Create the base website containing :
  1. Home page (with "Villes", "Zonages" and "Zones" selectors);
  2. Login page (with email and password);
  3. Signup page (with email and password);
  4. Confirmation page;
* [x] Connect your website to the Supabase Database;
* [x] Assert that users are logged before they can download the documents;

### 🧠 Additional Features

The tasks in this section aim to implement complete features, requiring multiple level updates.

* [ ] Connect Supabase Authentication to the table Users, and to the Frontend;
* [ ] Add Google Signup/Signin and Phone number verification;
* [ ] Use personal domain adress to send all the mails (*Resend*);

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
2. **Signup**:
   *UX* :
   * [x] Add a notification that a confirmation email was sent;
   * [x] Add indications on the required format of the passwords
   * [x] Display the error message next to the input fields
   * [x] Correct error message syntax when the password does not fill the requirements;
   * [ ] If the confirmation mail was successfuly sent, hide the input fields
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
   * [ ] Redo the error messages;

## 🦯 Ergonomie

* [ ] Remove the suffix ".html" from the different pages;
* [x] Use webpack production mode;
