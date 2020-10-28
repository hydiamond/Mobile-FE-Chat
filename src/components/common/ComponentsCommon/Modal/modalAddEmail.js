import React from 'react';
import PropTypes from 'prop-types';
import { BlurView } from 'expo-blur';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { Formik } from 'formik';
import ErrorInput from 'components/common/ComponentsCommon/ErrorInput';
import { StyledInput } from 'components/common/ComponentsCommon/StyledInput';
import { Button, Text } from 'native-base';
// import { accountSendOTPSignUp } from 'actions/authenActions';

const ModalCustom = props => {
  // const { isLoading, error, message } = useSelector(state => state.authen);
  const { setVisible } = props;

  const handleCloseModal = () => {
    setVisible(null);
  };

  const onHandleSubmitAdd = () => {
    // dispatchEvent(accountSendOTPSignUp('email', value));
  };

  return (
    <Modal animationType="slide" transparent visible={true}>
      <View style={styles.centeredView}>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <BlurView
            style={{ ...StyleSheet.absoluteFill }}
            tint="dark"
            intensity={20}
          />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <Formik initialValues={{ email: '' }} onSubmit={onHandleSubmitAdd}>
            {({ touched, errors, ...formikProps }) => (
              <View>
                {touched.email && errors.email ? (
                  <ErrorInput text={errors.email} />
                ) : null}
                <View
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  <View style={{ width: '80%' }}>
                    <StyledInput
                      formikProps={formikProps}
                      formikKey="email"
                      placeholder="Your email..."
                      value={formikProps.values.email}
                      style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#AAA'
                      }}
                    />
                  </View>
                  <Button onPress={formikProps.handleSubmit}>
                    <Text>+</Text>
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

ModalCustom.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func
};
ModalCustom.defaultProps = {
  visible: false,
  setVisible: () => {}
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

export default ModalCustom;