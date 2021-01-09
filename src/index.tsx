import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Colors} from "./styles";
import HomeScreen from "./screens/Home";
import SignInScreen from "./screens/SignIn";

const RootStack = createStackNavigator();

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<RootStack.Navigator headerMode='none'>
					<RootStack.Screen
						name='Home'
						component={HomeScreen}
					/>
					<RootStack.Screen
						name='SignIn'
						component={SignInScreen}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.PRIMARY,
        accent: Colors.SECONDARY
    }
}
