import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomePage } from '../screens/home';
import { StatusBar } from 'react-native';0

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a1a'},
          headerTintColor: 'white',
          headerBackVisible:true,
          headerShadowVisible:false
        }}>
        <Stack.Screen name='GymApp' component={HomePage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}




