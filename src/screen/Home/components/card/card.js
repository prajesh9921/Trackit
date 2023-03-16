import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import ExpenseCard from '../expenseCard/expenseCard';

const Card = (props) => {
  return (
    <FlatList
      horizontal={false}
      data={props.datesArray}
      keyExtractor={item => item}
      renderItem={({item}) => {
        return (
          <View key={item}>
            <Text style={{color: 'black', fontSize: 14, textAlign: 'center', marginTop: 10}}>{props.todayDate == item ? 'Today' : item}</Text>
            {props.data.map(dataItem => {
              if (dataItem.timestamp != 'values') {
                if (dataItem.info.date == item) {
                  return (
                    <ExpenseCard
                      key={dataItem?.timestamp || ''}
                      navigation={props.navigation}
                      id={dataItem?.timestamp || ''}
                      title={dataItem.info?.content || ''}
                      amount={dataItem.info?.amt || ''}
                      deducted={dataItem.info?.deducted || ''}
                    />
                  );
                }
              } else {
                return null;
              }
            })}
          </View>
        );
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
