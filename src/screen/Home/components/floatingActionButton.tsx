import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FloatingActionButton = (props: any) => {
  return (
    <TouchableOpacity onPressIn={() => props.navigation.navigate('AddTask')}>
      <View style={styles.fab}>
        <Text style={styles.buttonTitle}> + </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#F9C201',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  buttonTitle: {
    fontSize: 20,
  },
});

export default FloatingActionButton;
