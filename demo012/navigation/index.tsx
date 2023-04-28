import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home";
import About from "../screens/About";
import Me from "../screens/Me";
import { FontAwesome } from '@expo/vector-icons';


const BottomTab = createBottomTabNavigator()


export default function Navigation() {
    return (
        <NavigationContainer>
            <BottomTab.Navigator initialRouteName="Root">
                <BottomTab.Screen name="Home" component={Home} options={{
                    title: "首页", tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='home' size={size} color={color}/>
                    ),
                    tabBarActiveTintColor: "red"
                }}/>

                <BottomTab.Screen name="About" component={About} options={{
                    title: "发布", tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='send' size={size} color={color}/>
                    )
                }}/>

                <BottomTab.Screen name="Me" component={Me} options={{
                    title: "首页", tabBarIcon: ({ color, size }) => (
                        <FontAwesome name='user' size={size} color={color}/>
                    )
                }}/>
            </BottomTab.Navigator>
        </NavigationContainer>
    );
}
