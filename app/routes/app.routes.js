import { View, Image, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerItemList } from '@react-navigation/drawer';

import Home from '../pages/Home';
import Registrando from '../pages/Registrando/Registrando.jsx';
import MeuPerfil from '../pages/MeuPerfil/MeuPerfil.jsx';

import Logo from '../../assets/Logo.png';

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: '#3B3DBF',
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
        drawerItemStyle: {
          marginVertical: 5,
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
        }
      }}
      drawerContent={(props) => (
        <View style={styles.drawerContainer}>
          <Image source={Logo} style={styles.drawerLogo} />
          <Text style={styles.drawerWelcomeText}>Bem-vindo</Text>
          <DrawerItemList {...props} />
        </View>
      )}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Registrar" component={Registrando} />
      <Drawer.Screen name="Meu Perfil" component={MeuPerfil} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
  },
  
  drawerLogo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  
  drawerWelcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});