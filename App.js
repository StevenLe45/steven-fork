import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useLinkTo } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { colors, app } from './Scripts/Styles.js'
import { Provider } from './Scripts/Context.js'
import { useFonts } from 'expo-font'

import userContext from './Scripts/Context.js'

// URL linking configuration.
const linking = {
  prefixes: ['http://mentorship.cs.wwu.edu'],
  config: {
    screens: {
      Welcome: 'welcome',
      ForgotPassword: 'forgot-password',
      UpdatePassword: 'update-password',
      Main: {
        screens: {
          Home: {
            screens: {
              Topics: 'topics',
            }
          },
          UserManagement: {
            screens: {
              Pairs: 'pairs',
              Users: 'users',
            }
          }
        }
      }
    }
  }
}

// Import drawers.
import Main from './Scripts/Drawers/Main.js'

// Import auth flow.
import Welcome from './Scripts/Welcome.js'
import ForgotPassword from './Scripts/ForgotPassword.js'
import UpdatePassword from './Scripts/UpdatePassword.js'

const Stack = createStackNavigator()

export default function App() {

  const user = useContext(userContext)

  const [styles, setStyles] = useState(app)

  const [loaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    OCRA: require('./assets/fonts/OCRA.ttf')
  })

  const MyTheme = {
    colors: {
      background:colors.secondaryBackground,
      primary:colors.mainTextColor,
      card:colors.mainBackground,
      border:colors.mainBackground
    }
  }
  
  return (<Provider value={user}>
    <NavigationContainer linking={linking} theme={MyTheme}>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Welcome" component={Welcome} options={{title:'Welcome - CS/M Dashboard'}} />
        <Stack.Screen name="Main" component={Main} options={{title:'Home - CS/M Dashboard'}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title:'Forgot Password - CS/M Dashboard'}} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} options={{title:'Update Password - CS/M Dashboard'}} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>)
}