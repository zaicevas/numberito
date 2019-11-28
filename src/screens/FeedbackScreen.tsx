import Constants from 'expo-constants';
import { Formik } from 'formik';
import React from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import * as yup from 'yup';
import { Layout } from '../constants/index';

const EMPTY_FIELDS_ERROR_MESSAGE = 'Dude, you have to write something!';

const validationSchema = yup
.object().shape({
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

const MyReactNativeForm = props => (
  <Formik
      initialValues={{ email: '', bugs: '', positive: '' }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values));
        setTimeout(() => {
          actions.setSubmitting(false);
        },         1000);
      }}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur={false}
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
  }) => (
      <View>
        <View style={{ paddingTop: Constants.statusBarHeight * 2, marginBottom: Constants.statusBarHeight * 2 }}>
                <Image
          style={{ width: Layout.width * 0.4, height: Layout.width * 0.4, alignSelf: 'center' }}
          source={require('../../assets/flame.png')}
        />
        </View>
          <TextInput
          style={styles.textInput}
          onChangeText={handleChange('email')}
          placeholder="Email (optional)"
          />
          {errors.email ? (<Text style={styles.errorMessage}>{errors.email}</Text>) : null}
          <TextInput
          multiline
          style={styles.textInput}
          onChangeText={handleChange('bugs')}
          placeholder="Have you encountered any bugs?"
          />
          <TextInput
          multiline
          style={styles.textInput}
          onChangeText={handleChange('positive')}
          placeholder="Is there something you really liked in the app? :)"
          />
          {console.log(errors)}
          {errors.positive || errors.bugs ? (<Text style={styles.errorMessage}>{errors.positive || errors.bugs}</Text>) : null}
          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button title="Submit" onPress={() => handleSubmit() && validateForm()} />
          )}
          </View>
      )}
    </Formik>
);

class FeedbackScreen extends React.Component {
  public render() {
    return (
      <View >
        <MyReactNativeForm />
      </View>
    );
  }
}

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
    margin:10,
  },
  errorMessage: {
    color: 'red',
    alignSelf: 'center',
  },
});

export default FeedbackScreen;
