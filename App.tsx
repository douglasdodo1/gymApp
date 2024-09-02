import { GluestackUIProvider } from '@gluestack-ui/themed';
import AppNavigator from './app/navigation/AppNavigator';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <GluestackUIProvider>
        <AppNavigator />
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
