import Constants from 'expo-constants';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { ActivityIndicator, Button, Image, Keyboard, StyleSheet, Text, TextInput, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import * as yup from 'yup';
import { Layout } from '../constants/index';

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

const MyReactNativeForm = props => {
  const emailRef = useRef();
  const bugsRef = useRef();
  const positiveRef = useRef();
  const clearFields = () => (emailRef.current.clear(), bugsRef.current.clear(), positiveRef.current.clear());
  const handleSuccessfulSubmit = (values, actions) => {
    clearFields();
    setTimeout(() => {
          actions.resetForm();
        },         2000);
  };
  return (
  <Formik
      initialValues={{ email: '', bugs: '', positive: '' }}
      onSubmit={handleSuccessfulSubmit}
      validationSchema={validationSchema}
      validateOnBlur={false}
      onReset={clearFields}
    >
      {({
    handleChange,
    values,
    handleSubmit,
    errors,
    isValid,
    touched,
    handleBlur,
    isSubmitting,
    validateForm,
    resetForm,
  }) => (
      <View>
        <View style={{ paddingTop: Constants.statusBarHeight * 2, marginBottom: Constants.statusBarHeight * 2 }}>
                <Image
          style={{ width: Layout.width * 0.4, height: Layout.width * 0.4, alignSelf: 'center' }}
          source={require('../../assets/flame.png')}
        />
        </View>
          <TextInput
          ref={emailRef}
          style={styles.textInput}
          onChangeText={handleChange('email')}
          placeholder="Email (optional)"
          />
          {errors.email ? (<Text style={styles.errorMessage}>{errors.email}</Text>) : null}
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
          {errors.positive || errors.bugs ? (<Text style={styles.errorMessage}>{errors.positive || errors.bugs}</Text>) : null}
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
      <MyReactNativeForm />
    </View>
  </TouchableWithoutFeedback>
);

interface Styles {
  container: ViewStyle;
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
