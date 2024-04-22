import { GluestackUIProvider} from '@gluestack-ui/themed';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  
  return (
    <GluestackUIProvider>
      <AppNavigator/>
    </GluestackUIProvider>
  );
}




