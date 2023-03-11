import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const DashBoard = () => {
  const Data = useSelector(state => state.Numbers.value);

  return (
    <View style={styles.dashboard}>
      <View style={styles.balanceBox}>
        <Text style={styles.balance}>Balance</Text>
        <Text style={styles.bal_amt}>${Data.balance}</Text>
      </View>
      <View style={styles.border}></View>
      <View style={styles.inexBox}>
        <View style={styles.incomeBox}>
          <Text style={styles.inex}>Income</Text>
          <Text style={styles.in_amt}>${Data.income}</Text>
        </View>
        <View style={styles.expenseBox}>
          <Text style={styles.ex_amt}>${Data.expense}</Text>
          <Text style={styles.inex}>Expense</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    borderColor: '#D3D3D3',
    borderRadius: 8,
    flexDirection: 'row',
    borderWidth: 1,
    padding: 8,
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

export default DashBoard;
