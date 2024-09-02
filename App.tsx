import { GluestackUIProvider } from '@gluestack-ui/themed';
import AppNavigator from './app/navigation/AppNavigator';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
      <GluestackUIProvider>
        <AppNavigator />
      </GluestackUIProvider>
  );
}

