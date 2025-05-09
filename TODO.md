# 📋 List of TODO

## Priorities

🤖 Ask Claude First

![Perplexity](https://img.shields.io/badge/perplexity-000000?style=for-the-badge&logo=perplexity&logoColor=088F8F)

### Features

The tasks in this section aim to implement complete features, requiring multiple level updates.

* [ ] Connect Supabase Authentication to the table Users, and to the Frontend;
* [ ] Add Google Signup/Signin and Phone number verification;

### Atomic Corrections

The tasks in this section should only concern specific features of the project/pipeline, and should not involve the correction of 1 (or 2) files.

1. **Supabase**:
   *Email message* ([Auth Templates](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/auth/templates)):
   * [ ] Sign up;
   * [ ] Reset password;
   * [ ] Magic link;
   * [ ] Invite user;
   * [ ] Change email address.
   *Storage* ([UrbanDocs Bucket](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/storage/buckets/urbandocs)):
   * [ ] Add RLS to the .pdf files to give access to authenticated users only.
   *Database* ([Tables Schemas](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/database/schemas)):
   * [ ] Modify the links in the [documents table](https://supabase.com/dashboard/project/ofeyssipibktmbfebibo/editor/39678) to redirect to the UrbanDocs Bucket instead of the current plublic "Documents" bucket.
2. **Signup**:
   * [ ] When trying to create an account with an already used mail, return error message.
3. **Confirmation** - Email verification link redirection:
   *Context* : When signing up, you will recieve an authentication email.
   * [x] You will be redirected to a user-confirmation page;
   * [ ] Add term of services;
   * [ ] Force the user to read all the terms before confirmation.
4. **Login** - Security and UX:
   *Security* :
   * [ ] Adding a limitation to the number of login trials
   * [ ] Adding a CAPTCHA
   *UX* :
   * [ ] More precise messages for the errors

## Optional

1. Remove the suffix ".html" from the different pages.
