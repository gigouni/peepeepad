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

Complete the `src/main/constants/db.constants.ts` file with your Firebase credentials (values can be found in https://console.firebase.google.com/u/0/project/peepeepad-fa20c/settings/serviceaccounts/databasesecrets)

Start the app in the `dev` environment:

```bash
npm start
```

## 3. Packaging for Production & deploying to Firebase

```bash
npm run firebase:deploy
```

Then, launch https://peepeepad-fa20c.web.app/
