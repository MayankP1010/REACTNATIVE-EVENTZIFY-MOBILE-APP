import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ErrorMessage,
  StatusBar,
} from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as yup from 'yup';
class Password extends React.Component {
  state = {
    oldpassword: '',
    newpassword: '',
  };

  render() {
    const loginValidationSchema = yup.object().shape({
      oldpassword: yup
        .string()
        .required('old password is required')
        .min(4, 'Password must be atleast 4 character')
        .max(50),
      newpassword: yup
        .string()
        .required('new Password is required')
        .min(4, 'Password must be atleast 4 character')
        .max(50),
    });
    return (
      <View style={styles.container}>
        <ImageBackground
         source={{
            uri:
              'https://c0.wallpaperflare.com/preview/936/292/949/rock-band-on-stage.jpg',
          }}
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'center',
          }}>

           
          <View style={styles.inner_view}>
            <Formik
              validateOnMount={true}
              validationSchema={loginValidationSchema}
              initialValues={{ oldpassword: '', newpassword: '' }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <View style={styles.input}>
                    <Input
                    name="oldpassword"
                      placeholder="Enter old password.."
                      placeholderTextColor="white"
                      inputStyle={{ color: 'white', paddingLeft: 10 }}
                      onChangeText={handleChange('oldpassword')}
                      onBlur={handleBlur('oldpassword')}
                      value={values.oldpassword}
                      style={styles.textInput}
                      secureTextEntry
                      leftIcon={<Icon name="lock" size={20} color="white" />}
                    />
                    {errors.oldpassword && touched.oldpassword && (
                      <Text style={styles.errorText}>{errors.oldpassword}</Text>
                    )}
                    <Input
                      name="newpassword"
                      placeholder="Enter new password.."
                      placeholderTextColor="white"
                      inputStyle={{ color: 'white', paddingLeft: 10 }}
                        onChangeText={handleChange('newpassword')}
                      onBlur={handleBlur('newpassword')}
                      value={values.newpassword}
                      style={styles.textInput}
                      secureTextEntry
                      leftIcon={<Icon name="lock" size={24} color="white" />}
                    />
                    {errors.newpassword && touched.newpassword && (
                      <Text style={styles.errorText}>{errors.newpassword}</Text>
                    )}
                  </View>
                  <View style={styles.button}>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                      <Text style={{ color: 'white', fontSize: 20 }}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
  },
  inner_view: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#000000a0',
  },

  input: {
    color: 'red',
    marginRight: 40,
    marginLeft: 20,
    paddingLeft: 10,

    marginBottom: 10,
  },
  button: {
    width: '100%',
    alignContent: 'center',
    textAlign: 'center',
    paddingBottom: 20,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#fd7e14',
    width: '80%',
    height: 40,
    padding: 5,

    letterSpacing: 2,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default Password;
