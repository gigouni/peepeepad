<div align="center">
  <img src="assets/readme-app.png" width="100%" />
</div>

<br>

PeePeePad, the application to know which dog sleeps upstairs tonight https://peepeepad-fa20c.web.app/.

<!-- TOC -->

- [1. Install](#1-install)
- [2. Starting Development](#2-starting-development)
- [3. Packaging for Production & deploying to Firebase](#3-packaging-for-production--deploying-to-firebase)

<!-- /TOC -->

## 1. Install

Install dependencies:

```bash
npm install
```

## 2. Starting Development

Create a `.env` file with

```env
# Values can be found in https://console.firebase.google.com/u/0/project/peepeepad-fa20c/settings/serviceaccounts/databasesecrets
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Start the app in the `dev` environment:

```bash
npm start
```

## 3. Packaging for Production & deploying to Firebase

```bash
npm run firebase:deploy
```
