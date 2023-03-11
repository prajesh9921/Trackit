import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import ExpenseCard from './expenseCard';

const Card = props => {
  // const [datesArray, setDateArray] = useState();

  // useEffect(() => {
  //   console.log('Card called');

  //   const GetDateArray = () => {
  //     var unique = [];

  //     props.data.map(item => {
  //       if (item.timestamp != 'values') {
  //         if (!unique.includes(item.info.timestamp)) {
  //           unique.push(item.info.timestamp);
  //         }
  //       }
  //     });

  //     console.log(unique);

  //     unique.sort((a, b) => {
  //       const dateA = new Date(a);
  //       const dateB = new Date(b);
  //       return dateB - dateA; // Reverse the order of the comparison
  //     });

  //     console.log(unique);
  //     setDateArray(unique);
  //   };

  //   GetDateArray();
  // },[]);

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <Text style={styles.cardTime}>Today</Text>
        </>
      }
      horizontal={false}
      data={props.data}
      keyExtractor={item => item.timestamp}
      renderItem={({item}) => {
        if (item.timestamp != 'values') {
                return (
                  <ExpenseCard
                    navigation={props.navigation}
                    id={item?.timestamp || ''}
                    title={item.info?.content || ''}
                     amount={item.info?.amt || ''}
                     deducted={item.info?.deducted || ''}
                   />
                 );
               } else {
                 return null;
               }
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 35,
    marginBottom: 30,
  },
  cardTime: {
    fontSize: 14,
    color: 'black',
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default Card;
