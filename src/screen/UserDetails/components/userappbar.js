import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AppBar = ({navigation}) => {
  return (
    <View style={styles.appbar}>
      <FontAwesome5
        name={'arrow-left'}
        size={20}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.appbar_title}>User Details</Text>
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
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  appbar_title: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppBar;
