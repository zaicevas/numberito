import Constants from 'expo-constants';
import * as firebase from 'firebase';
import { FeedbackFields } from '../types/index';

const firebaseConfig = Constants.manifest.extra.firebase;
firebase.initializeApp(firebaseConfig);

const storeFeedback = (fields: FeedbackFields) => firebase
        .database()
        .ref(`feedback/${new Date()}`)
        .set(fields);

export { storeFeedback };

