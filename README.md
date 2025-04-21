
# UrbanDocs App

Web platform to access the synthesis of the Ubran Documents in France.


## Author

[![Static Badge](https://img.shields.io/badge/github-fllin1-blue)](https://github.com/fllin1)

## Badges

![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

## Documentation

[![Static Badge](https://img.shields.io/badge/Firebase-App%20Hosting-red)](https://firebase.google.com/docs/app-hosting)
[![Static Badge](https://img.shields.io/badge/Firebase-Cloud%20Functions-red)](https://firebase.google.com/docs/functions)
[![Static Badge](https://img.shields.io/badge/Supabase-Documentation-light_green)](https://supabase.com/docs)
[![Static Badge](https://img.shields.io/badge/Reddit-Functions%20Rules-orange)](https://www.reddit.com/r/reactjs/comments/fsw405/firebase_cloud_functions_cors_policy_error/?rdt=48891)

In this project, only the *App Hosting* and *Cloud Functions* from **Firebase** were used. The storage of the data was done with **Supabase**. Lastly, for Firebase *gen2 functions*, refer to the reddit post on **Function Rules** to correctly update newly added rules in the Cloud Functions.


## Installation

You should make sure that you can Python and NodeJS.

Then setup your [Firebase CLI](https://firebase.google.com/docs/cli) on your local machine.

After that you just have to init a project, select `App Hosting` and `Cloud Functions`. Then it will as you if you want to overwrite the scripts, **say No** to any overwrite. For Cloud Functions, chose **Python** and accept to install the dependencies.

```bash
  firebase init
```

### Roadblocks

1. If you encounter issues with your `pip` to install the dependencies, follow this [Youtube Tutorial](https://www.youtube.com/watch?v=q_sayYt50oM).
2. **Set your [gcloud CLI](https://cloud.google.com/sdk/docs/install) account** (your gmail address should then appear on your terminal line). Then, after setting up your *Cloud Functions*, you should use the following terminal command to grand the necessary access to your functions.

```bash
  gcloud functions add-invoker-policy-binding $python_function_name --member=allUsers
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SUPABASE_URL`

`SUPABASE_KEY`


## Run Locally

Clone the project

```bash
  git clone https://github.com/fllin1/urbandocs_app.git
```

Go to the project directory

```bash
  cd urbandocs_app
```

Install dependencies and then init your project

```bash
  firebase init
```

Start the emulator

```bash
 firebase emulators:start
```


## Deployment

To deploy this project run

```bash
  firebase deploy
```


## Licence

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)