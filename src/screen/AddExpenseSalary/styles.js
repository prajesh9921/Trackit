import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    rootView: {
      flex: 1,
      backgroundColor: 'darkorange',
    },
    container: {
      backgroundColor: 'white',
      marginTop: 50,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
      padding: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      color: '#626058',
      fontSize: 18,
      width: '60%',
      flex: 1,
      textAlign: 'center',
    },
    cross: {
      color: '#626058',
      fontSize: 30,
      fontWeight: 'bold',
    },
  
    //Button
    button: {
      borderRadius: 8,
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: 25,
    },
  
    // Button Selected
    incomeView_selected: {
      padding: 12,
      backgroundColor: '#F9C201',
      borderBottomLeftRadius: 8,
      borderTopLeftRadius: 8,
    },
    income_selected: {
      color: 'white',
      fontSize: 14,
    },
    expenseView_selected: {
      padding: 12,
      backgroundColor: '#F9C201',
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
    },
    expense_selected: {
      color: 'white',
      fontSize: 14,
    },
  
    // Button Unselected
    incomeView_unselected: {
      padding: 12,
      backgroundColor: '#E9E9E9',
      borderBottomLeftRadius: 8,
      borderTopLeftRadius: 8,
    },
    income_unselected: {
      color: '#626058',
      fontSize: 14,
    },
    expenseView_unselected: {
      padding: 12,
      backgroundColor: '#E9E9E9',
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
    },
    expense_unselected: {
      color: '#626058',
      fontSize: 14,
    },
  
    // inputUnselected
    input_unselected: {
      borderColor: '#D3D3D3',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: 16,
      marginTop: 25,
      color: 'black',
    },
  
    // input selected
    input_selected: {
      borderColor: '#F9C201',
      borderWidth: 2,
      borderRadius: 8,
      paddingLeft: 16,
      marginTop: 25,
      color: 'black',
    },
  
    // Save Button
  
    save_button: {
      color: '#F9C201',
      fontSize: 16,
      marginTop: 25,
      textAlign: 'center',
    },
  });