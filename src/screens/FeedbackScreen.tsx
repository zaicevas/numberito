import Constants from 'expo-constants';
import { Formik } from 'formik';
import React from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { Layout } from '../constants/index';

const validationSchema = yup.object().shape({
  email: yup.string()
    .label('Email')
    .email('Invalid email'),
  bugs: yup.string()
    .label('Bugs'),
  positive: yup.string()
    .label('Positive'),
});

export const MyReactNativeForm = props => (
  <Formik
      initialValues={{ email: '', bugs: '', positive: '' }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values));
        setTimeout(() => {
          actions.setSubmitting(false);
        },         1000);
      }}
      validationSchema={validationSchema}
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
  }) => (
      <View>
        <View style={{ paddingTop: Constants.statusBarHeight * 2, marginBottom: Constants.statusBarHeight * 2 }}>
                <Image
          style={{ width: Layout.width * 0.4, height: Layout.width * 0.4, alignSelf: 'center' }}
          source={require('../../assets/flame.png')}
        />
        </View>
          <TextInput
          style={styles.TextInput}
          onChangeText={handleChange('email')}
          placeholder="Email (optional)"
          />
          <Text style={{ color: 'red' }}>{errors.email}</Text>
          <TextInput
          multiline
          style={styles.TextInput}
          onChangeText={handleChange('bugs')}
          placeholder="Have you encountered any bugs?"
          />
          <Text style={{ color: 'red' }}>{errors.bugs}</Text>
          <TextInput
          multiline
          style={styles.TextInput}
          onChangeText={handleChange('positive')}
          placeholder="Is there something you really liked in the app in the app? :)"
          />
          <Text style={{ color: 'red' }}>{errors.positive}</Text>
          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button title="Submit" onPress={handleSubmit} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  TextInput: {
    backgroundColor: '#f5f6f7',
    padding: 10,
    margin:10,
  },
});

export default FeedbackScreen;
