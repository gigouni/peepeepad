<div align="center">
  <img src="assets/readme-app.png" width="100%" />
</div>

<br>

PeePeePad, the application to know which dog sleeps upstairs tonight https://peepeepad-fa20c.web.app/.

<!-- TOC -->

- [1. Install](#1-install)
- [2. Starting Development](#2-starting-development)
  - [2.1. Env vars caveats](#21-env-vars-caveats)
- [3. Packaging for Production & deploying to Firebase](#3-packaging-for-production--deploying-to-firebase)

<!-- /TOC -->

## 1. Install

Install dependencies:

```bash
npm install
```

## 2. Starting Development

Complete the `src/main/constants/sensitive-db.constants.ts` file with your Firebase credentials (values can be found in https://console.firebase.google.com/u/0/project/peepeepad-fa20c/settings/serviceaccounts/databasesecrets)

Start the app in the `dev` environment:

```bash
npm start
```

### 2.1. Env vars caveats

To follow best practices and prevent leaking secrets, I wanted to use a `.env` file to expose some environment variables like the Firebase credentials. Locally, it was okay, but during the packaging process, the Electron wrapping was isolating the app from the "main" world and preventing the use of `process.env`. Some alternatives were investigated, like the Electron IPC and the `exposeToMainWorld()` method to expose the env vars, but after some hours of research, the fun was gone, and I just wanted to release my pain from this issue. The credentials are now in the `src/main/constants/sensitive-db.constants.ts`, and you have to complete it yourself to enjoy the app.

## 3. Packaging for Production & deploying to Firebase

```bash
npm run firebase:deploy
```

Then, launch https://peepeepad-fa20c.web.app/
