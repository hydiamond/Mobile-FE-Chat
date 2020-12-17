import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { fetchRequestFriends } from 'actions/userActions';
import EmptyList from 'screens/ScreenMain/common/EmptyList';
import { ItemFriendsRequired } from 'screens/ScreenMain/common/ItemRender';

const FriendRequest = props => {
  console.log('friend req');
  const dispatch = useDispatch();
  const { listRequestFriends, isLoading } = useSelector(state => state.friends);
  const {
    setShowFriendsReq,
    handleAcceptFriend,
    handleDeclineFriend,
    handleToggleChatRoom
  } = props;

  const renderEmptyComponent = () => (
    <EmptyList message={' No friends requested'} />
  );

  const renderItemFriendRequired = useCallback(
    ({ item: friend }) => {
      return (
        <TouchableOpacity onPress={() => handleToggleChatRoom(friend)}>
          <ItemFriendsRequired
            styles={styles}
            friend={friend}
            handleDeclineFriend={handleDeclineFriend}
            handleAcceptFriend={handleAcceptFriend}
          />
        </TouchableOpacity>
      );
    },
    [handleAcceptFriend, handleDeclineFriend, handleToggleChatRoom]
  );

  const handlePullToRefesh = () => {
    dispatch(fetchRequestFriends());
  };

  return (
    <>
      <Container>
        <View
          style={
            Platform.OS === 'android'
              ? { ...styles.rect }
              : { ...styles.rect, paddingTop: '15%' }
          }
        >
          <TouchableOpacity onPress={() => setShowFriendsReq(false)}>
            <Ionicons name="md-arrow-back" size={24} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.login}>Friends request</Text>
        </View>
        <View style={{ marginTop: 10, height: '100%' }}>
          <FlatList
            data={listRequestFriends}
            renderItem={renderItemFriendRequired}
            keyExtractor={item => `${item.id}`}
            refreshing={isLoading}
            ListEmptyComponent={renderEmptyComponent}
            onRefresh={handlePullToRefesh}
          />
        </View>
      </Container>
    </>
  );
};

export default FriendRequest;

FriendRequest.propTypes = {
  handleDeclineFriend: PropTypes.func,
  handleAcceptFriend: PropTypes.func,
  setShowFriendsReq: PropTypes.func,
  handleToggleChatRoom: PropTypes.func
};
FriendRequest.defaultProps = {
  handleDeclineFriend: () => {},
  handleAcceptFriend: () => {},
  setShowFriendsReq: () => {},
  handleToggleChatRoom: () => {}
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  LinearGradientLeft: {
    borderRadius: 18,
    alignSelf: 'center',
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginRight: 5
  },
  LinearGradientRight: {
    borderRadius: 18,
    alignSelf: 'center',
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
  UpdatedProfileText: {
    color: 'white'
  },
  UpdateProfile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35
  },
  rect: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  icon: {
    fontSize: 30,
    marginRight: 20
  },
  login: {
    fontSize: 20,
    fontWeight: '500'
  }
});
