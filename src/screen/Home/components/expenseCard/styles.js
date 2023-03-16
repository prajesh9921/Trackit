import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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