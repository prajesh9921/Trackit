import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

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

const styles = StyleSheet.create({
  expenseCard: {
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E9E9E9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  dataView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    color: '#626058',
  },
  cardExpense: {
    fontSize: 14,
    color: '#D10000',
  },
  cardExpenseAdded: {
    fontSize: 14,
    color: '#00B152',
  },
});

export default ExpenseCard;
