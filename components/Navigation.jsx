import Startup from './Startup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Startup">
            <Stack.Screen name="Startup" component={Startup} />
        </Stack.Navigator>
    );

};


export default Navigation;
