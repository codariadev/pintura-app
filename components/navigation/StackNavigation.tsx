import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PaintHome from '../screens/PaintModule/PaintHome'
import CreateBudget from 'components/screens/PaintModule/CreateBudget';
import BudgetScreen from 'components/screens/PaintModule/BudgetScreen';

export type RootStackParamList = {
  Home: undefined;
  PaintHome: undefined;
  CreateBudget: undefined;
  Budget: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PaintHome" component={PaintHome} />
        <Stack.Screen name="CreateBudget" component={CreateBudget} />
        <Stack.Screen name="Budget" component={BudgetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
