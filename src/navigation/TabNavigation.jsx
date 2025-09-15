import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Users, Bell, Calendar, PlusCircle } from 'lucide-react-native';
import TopNavigation from './TopNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const Screen = ({ label }) => (
  <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ color: '#0B1726', fontSize: 16 }}>{label}</Text>
  </View>
);

function HomeScreen() { return <Screen label="🏠 Home" />; }
function AddScreen() { return <Screen label="➕ Add" />; }
function NotificationsScreen() { return <Screen label="🔔 Notifications" />; }
function CalendarScreen() { return <Screen label="📅 Calendar" />; }

function ConnectionsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <TopNavigation />
    </SafeAreaView>
  );
}

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Connections"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#0FB6C6',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E5E7EB',
            borderTopWidth: 1,
            height: 64,
          },
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case 'Home': return <Home size={size} color={color} />;
              case 'Connections': return <Users size={size} color={color} />;
              case 'Add': return <PlusCircle size={size + 4} color={color} />;
              case 'Notifications': return <Bell size={size} color={color} />;
              case 'Calendar': return <Calendar size={size} color={color} />;
              default: return null;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Connections" component={ConnectionsScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
