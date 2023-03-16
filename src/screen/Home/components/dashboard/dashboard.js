import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

const DashBoard = () => {
  const Data = useSelector(state => state.Numbers.value);

  return (
    <View style={styles.dashboard}>
      <View style={styles.balanceBox}>
        <Text style={styles.balance}>Balance</Text>
        <Text style={styles.bal_amt}>${Data?.balance || '0'}</Text>
      </View>
      <View style={styles.border}></View>
      <View style={styles.inexBox}>
        <View style={styles.incomeBox}>
          <Text style={styles.inex}>Income</Text>
          <Text style={styles.in_amt}>${Data?.income || '0'}</Text>
        </View>
        <View style={styles.expenseBox}>
          <Text style={styles.ex_amt}>${Data?.expense || '0'}</Text>
          <Text style={styles.inex}>Expense</Text>
        </View>
      </View>
    </View>
  );
};

export default DashBoard;
