import { StyleSheet } from "react-native";

export default StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: 'darkorange',
    },
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
      backgroundColor: 'white',
      marginTop: 50,
      alignItems: 'center',
      padding: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      color: '#626058',
      textAlign: 'center',
      flex: 1,
    },
    cross: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#626058',
    },
    amount: {
      fontSize: 35,
      color: '#D10000',
      fontWeight: 'bold',
      marginTop: 55,
    },
    desc: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    desc_title: {
      fontSize: 18,
      color: '#626058',
    },
    desc_date: {
      fontSize: 14,
      color: '#626058',
      marginTop: 10,
    },
    buttons: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
    edit: {
      color: '#F9C201',
      fontSize: 14,
    },
    delete: {
      color: '#626058',
      fontSize: 14,
      marginTop: 20,
    },
  });