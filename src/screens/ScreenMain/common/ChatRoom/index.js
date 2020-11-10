import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { HeaderGroupChat, HeaderSingleChat } from './headerChat';
import BodyChat from './bodyChat';
import FooterChat from './footerChat';
import GroupAddMember from './GroupAddMember';
import { fetchAllGroup } from 'actions/groupActions';

const ChatRoom = props => {
  const dispatch = useDispatch();
  const [isAddMember, setAddMember] = useState(false);
  const { setChatOpen, setFooter, typeChat } = props;

  useEffect(() => {
    return () => {
      dispatch(fetchAllGroup());
    };
  }, [dispatch]);

  return (
    <Fragment>
      {isAddMember && <GroupAddMember setAddMember={setAddMember} />}
      {!isAddMember && (
        <>
          {typeChat === 'group' && (
            <HeaderGroupChat
              setChatOpen={setChatOpen}
              setFooter={setFooter}
              setAddMember={setAddMember}
            />
          )}
          {typeChat === 'single' && (
            <HeaderSingleChat setChatOpen={setChatOpen} setFooter={setFooter} />
          )}
          <BodyChat />
          <FooterChat />
        </>
      )}
    </Fragment>
  );
};

export default ChatRoom;

ChatRoom.propTypes = {
  typeChat: PropTypes.string,
  currentGroup: PropTypes.objectOf(PropTypes.any),
  setChatOpen: PropTypes.func,
  setFooter: PropTypes.func
};
ChatRoom.defaultProps = {
  typeChat: '',
  currentGroup: {},
  setChatOpen: () => {},
  setFooter: () => {}
};
