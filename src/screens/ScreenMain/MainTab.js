import React, { useState } from 'react';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Container, Text, Footer, FooterTab, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import Messages from './Messages';
import Phonebook from './Phonebook';
import Profile from './Profile';
import { TouchableHighlight } from 'react-native-gesture-handler';

Platform.OS === 'android' && StatusBar.setHidden(true);

const MainTab = props => {
  const [content, setContent] = useState(<Phonebook />);
  const [isActive, setActive] = useState('');
  const [footer, setFooter] = useState(true);

  const handleChangeTab = target => {
    setActive(target);
    target === 'message' && setContent(<Messages setFooter={setFooter} />);
    target === 'phonebook' && setContent(<Phonebook setFooter={setFooter} />);
    target === 'profile' &&
      setContent(<Profile setFooter={setFooter} {...props} />);
  };

  return (
    <Container>
      {content}
      {footer && (
        <Footer style={{ backgroundColor: '#F6F6F6' }}>
          <FooterTab style={{ backgroundColor: '#F6F6F6' }}>
            <Button transparent onPress={() => handleChangeTab('message')}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#e3f2fd"
                onPress={() => console.log('press')}
              >
                <AntDesign
                  style={
                    isActive === 'message'
                      ? styles.textActive
                      : styles.textColor
                  }
                  name="message1"
                  size={24}
                  color="black"
                />
              </TouchableHighlight>
              <Text
                style={
                  isActive === 'message' ? styles.textActive : styles.textColor
                }
              >
                Message
              </Text>
            </Button>
            <Button transparent onPress={() => handleChangeTab('phonebook')}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#e3f2fd"
                onPress={() => console.log('press')}
              >
                <AntDesign
                  style={
                    isActive === 'phonebook'
                      ? styles.textActive
                      : styles.textColor
                  }
                  name="contacts"
                  size={24}
                  color="black"
                />
              </TouchableHighlight>
              <Text
                style={
                  isActive === 'phonebook'
                    ? styles.textActive
                    : styles.textColor
                }
              >
                Phonebook
              </Text>
            </Button>
            <Button transparent onPress={() => handleChangeTab('profile')}>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#e3f2fd"
                onPress={() => console.log('press')}
              >
                <AntDesign
                  style={
                    isActive === 'profile'
                      ? styles.textActive
                      : styles.textColor
                  }
                  name="profile"
                  size={24}
                  color="black"
                />
              </TouchableHighlight>
              <Text
                style={
                  isActive === 'profile' ? styles.textActive : styles.textColor
                }
              >
                Profile
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      )}
    </Container>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  textColor: {
    color: '#555'
  },
  textActive: {
    color: '#2196f3',
    fontWeight: '700'
  }
});
