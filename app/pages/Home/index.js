import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@react-native-vector-icons/feather';
import { getBalance } from '../../services/getBalanceService';
import { useState } from 'react';


export default function Home() {

  const [balanceData, setBalanceData] = useState({
    balance: 0.00,
    entries: 0.00,
    exits: 0.00,
  });

  useEffect(() => {
    async function fetchBalance() {
      try {
        const dataArray = await getBalance();
        ag
        const currentBalance = dataArray.find(item => item.tag === 'saldo')?.saldo || 0;
        const currentEntries = dataArray.find(item => item.tag === 'receita')?.saldo || 0;
        const currentExits = dataArray.find(item => item.tag === 'despesa')?.saldo || 0;

        setBalanceData({
          balance: currentBalance,
          entries: currentEntries,
          exits: currentExits,
        });


      } catch (error) {
        console.error("Erro ao buscar o balanço:", error);
      }
    }

    fetchBalance();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewHorizontal}
        contentContainerStyle={styles.contentContainer}
      >

        <View style={styles.square1}>
          <Text style={styles.squareText1}>Saldo atual</Text>
          <Text style={styles.squareTextDetails1}>R$ {balanceData.balance}</Text>
        </View>

        <View style={styles.square2}>
          <Text style={styles.squareText2}>Entradas de hoje</Text>
          <Text style={styles.squareTextDetails2}>R$ {balanceData.entries}</Text>
        </View>


        <View style={styles.square3}>
          <Text style={styles.squareText3}>Saidas de hoje</Text>
          <Text style={styles.squareTextDetails3}>R$ {balanceData.exits}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
  },
  scrollViewHorizontal: {
    height: 160,
    marginTop: 10,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  square1: {
    width: 305,
    height: 136,
    backgroundColor: '#3B3DBF',
    borderRadius: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  square2: {
    width: 305,
    height: 136,
    backgroundColor: '#00B94A',
    borderRadius: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  square3: {
    width: 305,
    height: 136,
    backgroundColor: '#EF463A',
    borderRadius: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  squareText1: {
    paddingTop: 30,
    paddingLeft: 20,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0
  },
  squareText2: {
    paddingTop: 30,
    paddingLeft: 20,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0
  },
  squareText3: {
    paddingTop: 30,
    paddingLeft: 20,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0
  },
  squareTextDetails1: {
    paddingTop: 5,
    paddingLeft: 20,
    fontSize: 33,
    color: '#FFFFFF'
  },
  squareTextDetails2: {
    paddingTop: 5,
    paddingLeft: 20,
    fontSize: 33,
    color: '#FFFFFF'
  },
  squareTextDetails3: {
    paddingTop: 5,
    paddingLeft: 20,
    fontSize: 33,
    color: '#FFFFFF'
  },


});