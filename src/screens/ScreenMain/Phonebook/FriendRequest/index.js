import React, { useEffect } from 'react';
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
  const dispatch = useDispatch();
  const { listRequestFriends, isLoading } = useSelector(state => state.friends);
  const { setShowFriendsReq, handleAcceptFriend, handleDeclineFriend } = props;

  useEffect(() => {
    dispatch(fetchRequestFriends());
  }, [dispatch]);

  const renderEmptyComponent = () => (
    <EmptyList message={' No friends requested'} />
  );

  const renderItemFriendRequired = ({ item: friend }) => (
    <ItemFriendsRequired
      styles={styles}
      friend={friend}
      handleDeclineFriend={handleDeclineFriend}
      handleAcceptFriend={handleAcceptFriend}
    />
  );

  const handlePullToRefesh = () => {};
  return (
    <>
      <Container>
        <View style={styles.rect}>
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
  setShowFriendsReq: PropTypes.func
};
FriendRequest.defaultProps = {
  handleDeclineFriend: () => {},
  handleAcceptFriend: () => {},
  setShowFriendsReq: () => {}
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
    paddingTop: '15%',
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
