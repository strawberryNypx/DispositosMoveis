import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import SetaParaCima from '../../../assets/arrow-up.png';
import SetaParaBaixo from '../../../assets/arrow-down.png';
import styles from './style';
import {postRecive} from '../../services/postReciveService';

export default function Registro() {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('receita');

  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const ano = hoje.getFullYear();
  const [date] = useState(`${dia}/${mes}/${ano}`);

  async function handleRegistrar() {
    try {
      const data = {
        description,
        value: Number(value),
        type,
        date
      };

      await postRecive(data);
      console.log("Registrado com sucesso!");
    } catch (error) {
      console.log("Erro ao registrar:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>

      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="Valor"
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.tipoButton,
            type === 'receita' ? styles.selectedButton : styles.unselectedButton
          ]}
          onPress={() => setType('receita')}
        >
          <Image source={SetaParaCima} style={styles.icon} />
          <Text style={type === 'receita' ? styles.selectedText : styles.unselectedText}>
            Receita
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tipoButton,
            type === 'despesa' ? styles.selectedButton : styles.unselectedButton
          ]}
          onPress={() => setType('despesa')}
        >
          <Image source={SetaParaBaixo} style={styles.icon} />
          <Text style={type === 'despesa' ? styles.selectedText : styles.unselectedText}>
            Despesa
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegistrar}>
        <Text style={styles.registerText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
