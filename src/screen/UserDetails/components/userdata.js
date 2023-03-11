import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const UserData = () => {
  const [userData, setUserData] = useState();
  const [userNumber, setUserNumber] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      setUserData(response.data);
    };

    getUser();
  }, []);

  const NextUser = () => {
    const LEN = userData.length;
    if (userNumber === LEN - 1) {
    } else {
      setUserNumber(userNumber + 1);
    }
  };

  const PrevUser = () => {
    const LEN = userData.length;
    if (userNumber === 0) {
    } else {
      setUserNumber(userNumber - 1);
    }
  };

  return (
    <View style={styles.view}>
      <View style={styles.image}>
        <Text style={styles.image_title}>
          {!userData ? 'Loading...' : userData[userNumber].username}
        </Text>
      </View>
      <Text style={styles.name}>
        {!userData ? 'Loading...' : userData[userNumber].name}
      </Text>
      <Text style={styles.email}>
        {!userData ? 'Loading...' : userData[userNumber].email}
      </Text>
      <Text style={styles.info}>
        {!userData ? 'Loading...' : userData[userNumber].address.street},
        {!userData ? 'Loading...' : userData[userNumber].address.suite},
        {!userData ? 'Loading...' : userData[userNumber].address.city}
      </Text>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <FontAwesome5
            name={'chevron-circle-left'}
            size={40}
            color="#F9C201"
            onPress={PrevUser}
          />
        </View>
        <View style={styles.button}>
          <FontAwesome5
            name={'chevron-circle-right'}
            size={40}
            color="#F9C201"
            onPress={NextUser}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    color: 'black',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 50,
    backgroundColor: '#F9C201',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 30,
    color: 'black',
  },
  email: {
    fontSize: 16,
    color: '#707070',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#707070',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'white',
    margin: 10,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default UserData;
