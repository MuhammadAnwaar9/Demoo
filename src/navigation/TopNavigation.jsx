import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MapPin, Plus, SlidersHorizontal } from 'lucide-react-native';
import CompanionsScreen from '../screens/CompanionsScreen';

const Tab = createMaterialTopTabNavigator();

function QuickHangoutsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.muted}>Quick Hangouts</Text>
    </View>
  );
}

const HeaderBanner = () => (
  <View style={styles.banner}>
    <Text style={styles.bannerTitle}>Connections</Text>
    <View style={styles.bannerActions}>
      <TouchableOpacity
        onPress={() => Alert.alert('Location', 'Open location picker')}
        style={styles.bannerIcon}
        activeOpacity={0.7}
      >
        <MapPin color="#0FB6C6" size={18} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert('Add', 'Open create flow')}
        style={styles.bannerIcon}
        activeOpacity={0.7}
      >
        <Plus color="#0FB6C6" size={18} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Alert.alert('Filters', 'Open filters bottom sheet')}
        style={styles.bannerIcon}
        activeOpacity={0.7}
      >
        <SlidersHorizontal color="#0FB6C6" size={18} />
      </TouchableOpacity>
    </View>
  </View>
);

export default function TopNavigation() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F6FAFD' }}>
      <HeaderBanner />
      <Tab.Navigator
        initialRouteName="Companions"
        screenOptions={{
          tabBarActiveTintColor: '#0FB6C6',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarLabelStyle: { fontSize: 14, fontWeight: '700', textTransform: 'none' },
          tabBarIndicatorStyle: { backgroundColor: '#0FB6C6', height: 3, borderRadius: 2 },
          tabBarStyle: { backgroundColor: '#F6FAFD', elevation: 0, shadowOpacity: 0 },
        }}
      >
        <Tab.Screen name="Quick Hangouts" component={QuickHangoutsScreen} />
        <Tab.Screen name="Companions" component={CompanionsScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { color: '#94A3B8', fontSize: 16, fontWeight: '700' },
  banner: {
    marginTop: 8,
    marginHorizontal: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#0FB6C6',
    borderRadius: 18,           // rounded ends like mock
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', flex: 1 },
  bannerActions: { flexDirection: 'row', gap: 10 },
  bannerIcon: {
    height: 36, width: 36, borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },
});
