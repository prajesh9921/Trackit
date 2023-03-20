import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';
import {clearAll} from './components';

const AppBar = props => {
  const dispatch = useDispatch();

  return (
    <View style={styles.appbar}>
      <Text style={styles.appbar_title}>Home</Text>
      <FontAwesome5
        name={'trash-alt'}
        size={20}
        style={{marginRight: 20}}
        color="white"
        onPress={() => clearAll(dispatch)}
      />
      <FontAwesome5
        name={'user-circle'}
        size={20}
        color="white"
        onPress={() => props.navigation.navigate('UserInfo')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appbar: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: '#F9C201',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appbar_title: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AppBar;
