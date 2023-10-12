import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContextProvider } from './context/AppContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OrderContextProvider } from './context/OrderContext';
import { AuthContextProvider } from './context/AuthContext';
import 'react-native-gesture-handler'
import SplashScreen from './screen/SplashScreen'
import HomeScreen from './screen/HomeScreen';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';
import Send from './screen/Send';
import CreateOrder from './screen/CreateOrder';
import OrderDetails from './screen/OrderDetails';
import ShippingDetails from './screen/ShippingDetails';
import TrackOrder from './screen/TrackOrder';
import Orders from './screen/Orders';
import Router from './components/Router';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer >
      <SafeAreaProvider>
        <AuthContextProvider>
          <AppContextProvider>
            <OrderContextProvider>
              <Router />
            </OrderContextProvider>
          </AppContextProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}