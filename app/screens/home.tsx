import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Home } from '../components/home';

interface HomePageProps {
  navigation: NavigationProp<ParamListBase>;
}

export const HomePage = ({ navigation }:HomePageProps) => {
  return <Home navigation={navigation} />;
};
