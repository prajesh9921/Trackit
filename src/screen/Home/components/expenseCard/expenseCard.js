import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
const ExpenseCard = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('ExpenseDisplay', {id: props.id})
      }>
      <View style={styles.expenseCard}>
        <View style={styles.dataView}>
          <Text style={styles.cardTitle}>{props.title}</Text>
          <Text
            style={
              props.deducted ? styles.cardExpense : styles.cardExpenseAdded
            }>
            $ {props.amount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseCard;
