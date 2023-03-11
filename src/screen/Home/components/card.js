import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import ExpenseCard from './expenseCard';

const Card = props => {
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
