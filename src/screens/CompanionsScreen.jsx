import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CompanionsScreen = () => {
  return (
    <View>
      <View
        style={{
          width: '90%',
          paddingHorizontal: 20,
          borderWidth: 1,
          borderRadius: 12,
          alignSelf: 'center',
          marginTop: 20,
          paddingVertical: 15,
        }}
      >
        <View
          style={{
            height: 130,
            width: 130,
            alignItems: 'center',
            borderRadius: 12,
          }}
        >
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: 'pink',
              borderRadius: 12,
            }}
          ></View>
          <View
            style={{
              width: '100%',
              height: 30,
              borderWidth: 1,
              position: 'absolute',
              alignSelf: 'center',
              borderRadius: 50,
              position: 'absolute',
              bottom: 20,
              backgroundColor: 'white',
            }}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default CompanionsScreen;

const styles = StyleSheet.create({});
