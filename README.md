<img src=".erb/img/erb-banner.svg" width="100%" />

<br>

<!-- TOC -->

- [1. Install](#1-install)
- [2. Starting Development](#2-starting-development)
- [3. Packaging for Production](#3-packaging-for-production)
- [4. Deploying to Firebase](#4-deploying-to-firebase)

<!-- /TOC -->

## 1. Install

Install dependencies:

```bash
npm install
```

## 2. Starting Development

Create a `.env` file with

```env
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

## 3. Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## 4. Deploying to Firebase

```bash
npm run firebase:deploy
```
