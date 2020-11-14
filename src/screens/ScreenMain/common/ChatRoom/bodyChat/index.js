import React, { useState, useContext, useRef } from 'react';
import { Image } from 'react-native';
import { Content, View, Text } from 'native-base';
import LeftChat from './LeftChat';
import RightChat from './RightChat';
import { SocketContext } from 'components/common/context/SocketContext';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import HeaderChat from '../footerChat';
import useChatSocket from 'components/common/hook/useChatSocket';
import ModalRemoveMess from 'components/common/ComponentsCommon/Modal/modalRemoveMess';

const BodyChat = () => {
  const scrollViewRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [textChat, setTextChat] = useState('');
  const { socket } = useContext(SocketContext);
  const { dataUser } = useSelector(state => state.dataUser);
  const { singleGroups } = useSelector(state => state.groupChecks);
  const { currentSingleGroup } = useSelector(state => state.groups);
  const { messages, setMessages } = useChatSocket({
    singleGroups,
    currentSingleGroup,
    dataUser
  });

  const onHandleSendMess = () => {
    if (textChat === '') return;
    socket.emit('send_and_recive', textChat);
    socket.on('send_and_recive', function (msg) {
      setMessages([...messages, msg]);
    });
    setTextChat('');
  };
  const handleToggleModalRemove = indexToggle => {
    setPosition(indexToggle);
  };
  const onHandleRemoveMess = idMess => {
    socket.emit('delete_message', idMess);
    const tempMess = [...messages];
    const filterMessRemove = tempMess.filter(mess => mess._id !== idMess);
    setMessages([...filterMessRemove]);
    setPosition(null);
  };

  const renderItem = ({ item: itemMess, index }) => {
    if (itemMess.user.id === dataUser.id) {
      return (
        <>
          <LeftChat
            indexToggle={index}
            handleToggleModalRemove={handleToggleModalRemove}
            name={itemMess.user.name}
            message={[itemMess.content]}
          />
          {position === index && (
            <ModalRemoveMess
              visible={!!(position === index)}
              setVisible={setPosition}
              onHandleRemoveMess={onHandleRemoveMess}
              idMess={itemMess._id}
            />
          )}
        </>
      );
    }
    if (itemMess.user.id !== dataUser.id) {
      return (
        <RightChat name={itemMess.user.name} message={[itemMess.content]} />
      );
    }
  };

  const renderHeaderComponent = () => (
    <>
      <Content>
        <View
          style={{ alignSelf: 'center', alignItems: 'center', marginTop: 10 }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            source={require('assets/defaultGid.gif')}
          />
          <Text style={{ color: '#00b0ff' }}>Hi!</Text>
        </View>
      </Content>
    </>
  );
  return (
    <>
      <HeaderChat
        setTextChat={setTextChat}
        textChat={textChat}
        onHandleSendMess={onHandleSendMess}
      />
      <FlatList
        ListHeaderComponent={renderHeaderComponent}
        data={messages}
        ref={scrollViewRef}
        inverted={true}
        renderItem={renderItem}
        keyExtractor={item => `${item._id}`}
        onEndReached={() => scrollViewRef.current.scrollToEnd()}
      />
    </>
  );
};

export default BodyChat;
