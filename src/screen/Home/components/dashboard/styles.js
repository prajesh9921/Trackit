import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    dashboard: {
      borderColor: '#D3D3D3',
      borderRadius: 8,
      flexDirection: 'row',
      borderWidth: 1,
      padding: 8,
      marginBottom: 10
    },
    balanceBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    balance: {
      fontSize: 12,
      color: '#626058',
    },
    bal_amt: {
      color: '#02BEE8',
      fontSize: 24,
    },
    border: {
      backgroundColor: '#D3D3D3',
      width: 1,
    },
    inexBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    incomeBox: {
      marginBottom: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inex: {
      fontSize: 10,
      color: '#626058',
    },
    in_amt: {
      color: '#00B152',
      fontSize: 20,
    },
    expenseBox: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    ex_amt: {
      color: '#D10000',
      fontSize: 20,
    },
  });