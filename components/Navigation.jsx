import Startup from './Startup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BaseZoom from './BaseZoom';
import MapZoom from './MapZoom';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Startup">
            <Stack.Screen name="Startup" component={Startup} />
            <Stack.Screen name="BaseZoom" component={BaseZoom} />
            <Stack.Screen name="MapZoom" component={MapZoom} />
        </Stack.Navigator>
    );

};


export default Navigation;
