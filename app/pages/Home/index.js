import React, { useEffect } from 'react';
import { getBalance } from '../../services/getBalanceService';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import CalendarIcon from '../../../assets/calendar.png';
import styles from './styles.js';
import { getRecives } from '../../services/getRecivesService.js';
import SetaParaCima from '../../../assets/setaparacimabranca.png';
import SetaParaBaixo from '../../../assets/setaparabaixobranca.png';

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

  const [items, setItems] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await getRecives();
        setItems(data);
      } catch (error) {
        console.log("Erro ao buscar itens:", error);
      }
    }

    loadItems();
  }, []);

  return (
    <View style={styles.container}>
      <View>
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



      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Image
            source={CalendarIcon}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Últimas movimentações</Text>
        </TouchableOpacity>
        <View>

          {items.map((item) => (
            <View key={item.id} style={styles.card}>
              <View
                style={[
                  styles.badge,
                  item.type === 'receita' ? styles.badgeReceita : styles.badgeDespesa
                ]}
              >
                <Image
                  source={item.type === 'receita' ? SetaParaCima : SetaParaBaixo}
                  style={styles.badgeIcon}
                />
                <Text style={styles.badgeText}>
                  {item.type}
                </Text>
              </View>

              <Text style={styles.value}>
                R$ {Number(item.value).toFixed(2).replace('.', ',')}
              </Text>
            </View>
          ))}

        </View>

      </View>

      <View style={{ flex: 1 }}>
        <Modal
          transparent
          visible={showCalendar}
          animationType="fade"
        >
          <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.calendarContainer}>
                  <Calendar
                    onDayPress={(day) => {
                      console.log('Dia selecionado:', day.dateString);
                      setShowCalendar(false);
                    }}
                    style={styles.calendar}
                  />
                  <TouchableOpacity
                    style={styles.calendarButton}
                    onPress={() => {
                      console.log('Botão dentro do calendário');
                    }}
                  >
                    <Text style={styles.calendarButtonText}>Filtrar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
    </View>
  )
}

