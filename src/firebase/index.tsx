import Constants from 'expo-constants';
import * as firebase from 'firebase';
import { FeedbackFields } from '../types/index';

const firebaseConfig = Constants.manifest.extra.firebase;

const storeFeedback = (fields: FeedbackFields) => {
  firebase
        .database()
        .ref(`feedback/${new Date()}`)
        .set(fields);
};

firebase.initializeApp(firebaseConfig);

export { storeFeedback };

