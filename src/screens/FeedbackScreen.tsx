import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Formik, FormikActions, FormikProps } from 'formik';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, ImageStyle, Keyboard, StyleSheet, Text, TextInput, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { WToast } from 'react-native-smart-tip';
import * as yup from 'yup';
import { SEND_FEEDBACK_INTERVAL, TIMEOUT_FOR_FEEDBACK_REQUEST } from '../constants/Firebase';
import { Layout, Theme } from '../constants/index';
import { storeFeedback } from '../firebase/index';
import { FeedbackFields } from '../types/index';

const EMPTY_FIELDS_ERROR_MESSAGE = 'Dude, you have to write something!';

const validationSchema = yup.object().shape({
  email: yup.string()
    .label('Email')
    .email('Invalid email'),
  bugs: yup.string()
    .label('Bugs')
    .test(
      'oneOfRequired',
      EMPTY_FIELDS_ERROR_MESSAGE,
      function (value) {
        const { positive } = this.parent;
        return value || positive;
      },
    ),
  positive: yup.string()
    .label('Positive')
    .test(
      'oneOfRequired',
      EMPTY_FIELDS_ERROR_MESSAGE,
      function (value) {
        const { bugs } = this.parent;
        return value || bugs;
      },
    ),
});

const initialFields: FeedbackFields = {
  email: '',
  bugs: '',
  positive: '',
};

const showSuccessToast = () => {
  WToast.show({
    data: 'Feedback sent',
    textColor: Theme.colors.white,
    backgroundColor: Theme.colors.green,
    duration: WToast.duration.LONG,
    position: WToast.position.TOP,
    icon: (<AntDesign name="check" size={24} color={Theme.colors.white} />),
  });
};

const showAntiSpamToast = () => {
  WToast.show({
    data: 'Please wait 5 minutes before sending feedback again',
    textColor: Theme.colors.white,
    backgroundColor: Theme.colors.red,
    duration: WToast.duration.LONG,
    position: WToast.position.TOP,
  });
};

const Form: React.FC = () => {
  const [isSubmittable, setIsSubmittable] = useState(true);
  const emailRef = useRef();
  const bugsRef = useRef();
  const positiveRef = useRef();
  const FEEDBACK_FAILURE_MESSAGE = 'Looks like there are internet related problems. No worries, feedback will be sent automatically when problems are solved!';
  const clearFields = () => (emailRef.current.clear(), bugsRef.current.clear(), positiveRef.current.clear());
  const sendFeedback = (fields: FeedbackFields) => new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(FEEDBACK_FAILURE_MESSAGE), TIMEOUT_FOR_FEEDBACK_REQUEST);
    storeFeedback(fields, () => (clearTimeout(timeout), resolve(), handleStoreSuccess()))
      .catch(err => reject(err));
  });
  const handleStoreSuccess = () => {
    showSuccessToast();
  };
  const handleValidatedSubmit = (fields: FeedbackFields, actions: FormikActions) => {
    if (!isSubmittable) {
      showAntiSpamToast();
      actions.setSubmitting(false);
      return;
    }
    clearFields();
    setTimeout(() => setIsSubmittable(true), SEND_FEEDBACK_INTERVAL);
    sendFeedback(fields)
      .then(() => setIsSubmittable(false))
      .catch(err => Alert.alert('Feedback sending failed', err))
      .finally(() => actions.resetForm());
  };
  return (
  <Formik
      initialValues={initialFields}
      onSubmit={handleValidatedSubmit}
      validationSchema={validationSchema}
      validateOnBlur={false}
    >
      {({
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
  }: FormikProps<FeedbackFields>) => (
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/flame.png')}
          />
        </View>
          <TextInput
          ref={emailRef}
          style={styles.textInput}
          onChangeText={handleChange('email')}
          placeholder="Email (optional)"
          />
          {errors.email && (<Text style={styles.errorMessage}>{errors.email}</Text>)}
          <TextInput
          ref={bugsRef}
          multiline
          style={styles.textInput}
          onChangeText={handleChange('bugs')}
          placeholder="Have you encountered any bugs?"
          />
          <TextInput
          ref={positiveRef}
          multiline
          style={styles.textInput}
          onChangeText={handleChange('positive')}
          placeholder="Is there something you really liked in the app? :)"
          />
          {(errors.positive || errors.bugs) && (<Text style={styles.errorMessage}>{errors.positive || errors.bugs}</Text>)}
          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button title="Submit" onPress={() => (Keyboard.dismiss(), handleSubmit())} />
          )}
          </View>
      )}
    </Formik>
  ); };

const FeedbackScreen: React.FC = () => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View>
      <Form />
    </View>
  </TouchableWithoutFeedback>
);

interface Styles {
  container: ViewStyle;
  image: ImageStyle;
  imageContainer: ViewStyle;
  textInput: ViewStyle;
  errorMessage: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  image: {
    width: Layout.width * 0.6,
    height: Layout.width * 0.6,
    alignSelf: 'center',
  },
  imageContainer: {
    paddingTop: Constants.statusBarHeight * 2,
    marginBottom: Constants.statusBarHeight,
  },
  textInput: {
    backgroundColor: '#f5f6f7',
    padding: 10,
    margin: 10,
  },
  errorMessage: {
    color: 'red',
    alignSelf: 'center',
  },
});

export default FeedbackScreen;
