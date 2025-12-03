import React, { useEffect, useState } from 'react';
import { getBalance } from '../../services/getBalanceService';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarIcon from '../../../assets/calendar.png';
import styles from './styles.js';
import { getRecives } from '../../services/getRecivesService.js';
import SetaParaCima from '../../../assets/setaparacimabranca.png';
import SetaParaBaixo from '../../../assets/setaparabaixobranca.png';
import { deleteReceive } from '../../services/deleteRecivesService';
import { useIsFocused } from '@react-navigation/native';

export default function Home() {
  const isFocused = useIsFocused();

  const [balanceData, setBalanceData] = useState({
    balance: 0.00,
    entries: 0.00,
    exits: 0.00,
  });

  const [items, setItems] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredDate, setFilteredDate] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const convertDateToBrazilian = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const getTodayBrazilian = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFilter = () => {
    setFilteredDate(selectedDate);
    setShowCalendar(false);
  };

  const clearFilter = () => {
    setFilteredDate('');
    setSelectedDate('');
  };

  const confirmDelete = async () => {
    try {
      await deleteReceive(selectedItem.id);

      const updatedItems = items.filter(i => i.id !== selectedItem.id);
      setItems(updatedItems);

      const today = getTodayBrazilian();
      const todaysItems = updatedItems.filter(item => item.date === today);

      const todaysEntries = todaysItems
        .filter(item => item.type === 'receita')
        .reduce((sum, item) => sum + Number(item.value), 0);

      const todaysExits = todaysItems
        .filter(item => item.type === 'despesa')
        .reduce((sum, item) => sum + Number(item.value), 0);

      setBalanceData(prev => ({
        ...prev,
        entries: todaysEntries.toFixed(2),
        exits: todaysExits.toFixed(2)
      }));

      setDeleteModalVisible(false);
      console.log('✅ Item deletado e balance atualizado!');
      
    } catch (error) {
      console.log("Erro ao deletar item:", error);
    }
  };

  useEffect(() => {
    async function loadAllData() {
      if (!isFocused) return;

      try {
        const data = await getRecives();
        setItems(data);

        const dataArray = await getBalance();
        const currentBalance = dataArray.find(item => item.tag === 'saldo')?.saldo || 0;

        const today = getTodayBrazilian();
        const todaysItems = data.filter(item => item.date === today);

        const todaysEntries = todaysItems
          .filter(item => item.type === 'receita')
          .reduce((sum, item) => sum + Number(item.value), 0);

        const todaysExits = todaysItems
          .filter(item => item.type === 'despesa')
          .reduce((sum, item) => sum + Number(item.value), 0);

        setBalanceData({
          balance: currentBalance,
          entries: todaysEntries.toFixed(2),
          exits: todaysExits.toFixed(2)
        });

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    loadAllData();
  }, [isFocused]);

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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={styles.fixedButton}
            onPress={() => setShowCalendar(!showCalendar)}
          >
            <Image source={CalendarIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Últimas movimentações</Text>
          </TouchableOpacity>

          {filteredDate && (
            <TouchableOpacity
              onPress={clearFilter}
              style={{ padding: 8, backgroundColor: '#ff6b6b', borderRadius: 5, marginLeft: 10 }}
            >
              <Text style={{ color: 'white', fontSize: 12 }}>Limpar Filtro</Text>
            </TouchableOpacity>
          )}
        </View>

        <View>
          {items
            .filter(item => {
              if (filteredDate) {
                return item.date === convertDateToBrazilian(filteredDate);
              }
              return item.date === getTodayBrazilian();
            })
            .map((item) => (
              <TouchableOpacity
                key={item.id}
                onLongPress={() => {
                  setSelectedItem(item);
                  setDeleteModalVisible(true);
                }}
                delayLongPress={400}
              >
                <View style={styles.card}>
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
                    <Text style={styles.badgeText}>{item.type}</Text>
                  </View>
                  <Text style={styles.value}>
                    R$ {Number(item.value).toFixed(2).replace('.', ',')}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

          {filteredDate && items.filter(item => item.date === convertDateToBrazilian(filteredDate)).length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
              Nenhuma movimentação encontrada para esta data
            </Text>
          )}

          {!filteredDate && items.filter(item => item.date === getTodayBrazilian()).length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
              Nenhuma movimentação hoje
            </Text>
          )}
        </View>
      </View>

      <Modal transparent visible={showCalendar} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={(day) => setSelectedDate(day.dateString)}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      selectedColor: '#4a90e2',
                      selectedTextColor: 'white'
                    }
                  }}
                  style={styles.calendar}
                />
                <TouchableOpacity style={styles.calendarButton} onPress={handleFilter}>
                  <Text style={styles.calendarButtonText}>Filtrar</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal transparent visible={deleteModalVisible} animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, width: '80%', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center' }}>
              Deseja deletar esta movimentação?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{ padding: 10, backgroundColor: '#e53935', borderRadius: 8, width: '45%' }}
                onPress={confirmDelete}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 10, backgroundColor: '#bdbdbd', borderRadius: 8, width: '45%' }}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}