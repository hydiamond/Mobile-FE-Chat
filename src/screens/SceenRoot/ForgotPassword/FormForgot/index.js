import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Text, View, Tabs, Tab, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// Component
import FormPhone from '../FormPhone';
import FormEmail from '../FormEmail';
import FormPassword from '../FormPassword';

const ForgotForm = props => {
  const { isLoadingChangePass, error, message } = useSelector(
    state => state.authen
  );
  const {
    initialValues,
    defaultSchema,
    setTypeForgot,
    onHandleSubmited,
    styles,
    step
  } = props;

  const handleChangeType = (e, formikProps) => {
    const type = e.ref.props.name;
    formikProps.setErrors({});
    setTypeForgot(type);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(defaultSchema)}
      onSubmit={onHandleSubmited}
    >
      {({ touched, errors, ...formikProps }) => (
        <>
          {step === 0 && (
            <Tabs
              onChangeTab={e => handleChangeType(e, formikProps)}
              tabBarUnderlineStyle={{
                backgroundColor: '#2196f3',
                height: 1
              }}
            >
              <Tab
                tabStyle={{ backgroundColor: '#F8F8F8' }}
                textStyle={{ color: '#AAA' }}
                activeTabStyle={{ backgroundColor: '#F8F8F8' }}
                activeTextStyle={{ color: '#2196f3', fontWeight: '700' }}
                heading="Phone"
                name="Phone"
              >
                {error && (
                  <View style={styles.errorBE}>
                    <MaterialIcons
                      style={styles.errorBEIcon}
                      name="error"
                      size={20}
                      color="red"
                    />
                    <Text style={styles.errorBEText}>{message.msg}</Text>
                  </View>
                )}
                <FormPhone
                  styles={styles}
                  touched={touched}
                  errors={errors}
                  formikProps={formikProps}
                />
              </Tab>
              <Tab
                tabStyle={{ backgroundColor: '#F8F8F8' }}
                textStyle={{ color: '#AAA' }}
                activeTabStyle={{ backgroundColor: '#F8F8F8' }}
                activeTextStyle={{ color: '#2196f3', fontWeight: '700' }}
                heading="Email"
                name="Email"
              >
                {error && (
                  <View style={styles.errorBE}>
                    <MaterialIcons
                      style={styles.errorBEIcon}
                      name="error"
                      size={20}
                      color="red"
                    />
                    <Text style={styles.errorBEText}>{message.msg}</Text>
                  </View>
                )}
                <FormEmail
                  styles={styles}
                  touched={touched}
                  errors={errors}
                  formikProps={formikProps}
                />
              </Tab>
            </Tabs>
          )}
          {step === 2 && (
            <FormPassword
              styles={styles}
              touched={touched}
              errors={errors}
              formikProps={formikProps}
            />
          )}
          <TouchableOpacity onPress={formikProps.handleSubmit}>
            <LinearGradient
              style={styles.rect7}
              colors={['#0cb3ff', '#0068ff']}
            >
              <Text style={styles.loginButton}>
                {step !== 2 ? 'Next' : 'Completed'}
              </Text>
              {isLoadingChangePass && step === 2 && (
                <Spinner
                  style={{ position: 'absolute' }}
                  size="large"
                  color="white"
                />
              )}
              {step !== 2 && (
                <MaterialIcons
                  style={styles.iconNext}
                  name="navigate-next"
                  size={28}
                  color="white"
                />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

export default ForgotForm;

ForgotForm.propTypes = {
  step: PropTypes.number,
  styles: PropTypes.objectOf(PropTypes.any),
  initialValues: PropTypes.objectOf(PropTypes.any),
  defaultSchema: PropTypes.objectOf(PropTypes.any),
  setTypeForgot: PropTypes.func,
  onHandleSubmited: PropTypes.func
};
ForgotForm.defaultProps = {
  step: 0,
  styles: {},
  initialValues: {},
  defaultSchema: {},
  setTypeForgot: () => {},
  onHandleSubmited: () => {}
};
