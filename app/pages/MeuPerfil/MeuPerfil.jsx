import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaInicial() {
  const navigation = useNavigation();

  const handleRegistrarGastos = () => {
    navigation.navigate('Registrar');
  };

  const handleSair = async () => {
    try {
      await AsyncStorage.removeItem('@app:token');
      await AsyncStorage.removeItem('@app:user');
      
      console.log('✅ Logout realizado com sucesso');
      
      if (typeof window !== 'undefined' && window.location) {
        window.location.reload();
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
      
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo de volta</Text>
      
      <TouchableOpacity 
        style={styles.buttonPrimary} 
        onPress={handleRegistrarGastos}
      >
        <Text style={styles.buttonPrimaryText}>Registrar gastos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.buttonSecondary} 
        onPress={handleSair}
      >
        <Text style={styles.buttonSecondaryText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 40,
    textAlign: 'center',
  },
  
  buttonPrimary: {
    backgroundColor: '#3B3DBF',
    width: '100%',
    maxWidth: 320,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  
  buttonSecondary: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 320,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e53935',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  
  buttonSecondaryText: {
    color: '#e53935',
    fontSize: 18,
    fontWeight: '600',
  },
});