import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import FormsScreen from '../screens/FormsScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Forms':
              iconName = 'description';
              break;
            case 'Progress':
              iconName = 'timeline';
              break;
            case 'Resources':
              iconName = 'library-books';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0e6efb',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="Forms" 
        component={FormsScreen}
        options={{ title: 'Forms' }}
      />
      <Tab.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{ title: 'Progress' }}
      />
      <Tab.Screen 
        name="Resources" 
        component={ResourcesScreen}
        options={{ title: 'Resources' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
