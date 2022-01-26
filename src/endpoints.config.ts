export default {
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ?? '',
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.REACT_APP_FIREBASE_APP_ID ?? '',
    measurementId: process.env.REACT_APP_MEASUREMENT_ID ?? '',
    siteKey: process.env.REACT_APP_SITE_KEY ?? '',
  },
  snsKeySecret: process.env.REACT_APP_SNS_KEY_SECRET ?? '',
  test: {
    key: process.env.REACT_APP_TEST_KEY ?? '',
    email: process.env.REACT_APP_TEST_EMAIL ?? '',
    name: process.env.REACT_APP_TEST_NAME ?? '',
    password: process.env.REACT_APP_TEST_PW ?? '',
  },
}
