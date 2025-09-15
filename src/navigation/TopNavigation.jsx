// TopNavigation.js
import React, { useMemo, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MapPin, Plus, SlidersHorizontal } from 'lucide-react-native';
import CompanionsScreen from '../screens/CompanionsScreen';

const Tab = createMaterialTopTabNavigator();
const W = Dimensions.get('window').width;
const H_PAD = 18; // left/right breathing space like mock
const TAB_CONTAINER_W = W - H_PAD * 2; // tabs baseline width

/* ------------------------ Header: gradient capsule ------------------------ */
const HeaderBanner = () => (
  <LinearGradient
    colors={['#04ADBF', '#0367A6']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.banner}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: '100%',
      }}
    >
      <Text style={styles.bannerTitle}>Connections</Text>

      <View style={styles.bannerActions}>
        {[MapPin, Plus, SlidersHorizontal].map((Icon, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => Alert.alert('Action', 'Coming soon')}
            activeOpacity={0.8}
            style={styles.bannerCircle}
          >
            <Icon size={18} color="#FFFFFF" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </LinearGradient>
);

/* -------------------------- Custom TabBar (ditto) ------------------------- */
function CustomTabBar({ state, descriptors, navigation }) {
  const index = state.index;
  const tabWidth = TAB_CONTAINER_W / 2;
  const INDICATOR_W = tabWidth * 0.75; // short teal underline like mock
  const leftAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(leftAnim, {
      toValue: index * tabWidth + (tabWidth - INDICATOR_W) / 2,
      useNativeDriver: false,
      tension: 120,
      friction: 14,
    }).start();
  }, [index, tabWidth, INDICATOR_W, leftAnim]);

  return (
    <View style={styles.tabsWrap}>
      <View style={styles.tabsRow}>
        {state.routes.map((route, i) => {
          const focused = index === i;
          const label = descriptors[route.key].options.title ?? route.name;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.8}
              style={styles.tabItem}
            >
              <Text
                style={[
                  styles.tabText,
                  focused ? styles.tabActive : styles.tabMuted,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* baseline (light grey full-width) */}
      <View style={styles.baseLine} />

      {/* short rounded teal indicator under active tab */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: INDICATOR_W,
            left: leftAnim,
          },
        ]}
      />
    </View>
  );
}

/* ------------------------------- Screens ---------------------------------- */
function QuickHangoutsScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.muted}>Quick Hangouts</Text>
    </View>
  );
}

export default function TopNavigation() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F6FAFD' }}>
      <HeaderBanner />

      <Tab.Navigator
        initialRouteName="Companions"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          swipeEnabled: true,
        }}
      >
        <Tab.Screen name="Quick Hangouts" component={QuickHangoutsScreen} />
        <Tab.Screen name="Companions" component={CompanionsScreen} />
      </Tab.Navigator>
    </View>
  );
}

/* --------------------------------- Styles --------------------------------- */
const styles = StyleSheet.create({
  /* Header capsule */
  banner: {
    width: '90%',
    alignSelf: 'center',
    height: 60,

    borderRadius: 100,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
    flex: 1,
  },
  bannerActions: { flexDirection: 'row', gap: 10 },
  // white outlined circles with transparent fill (exact to screenshot)
  bannerCircle: {
    height: 42,
    width: 42,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Custom tabs */
  tabsWrap: {
    width: TAB_CONTAINER_W,
    alignSelf: 'center',
    marginTop: 10,
    paddingBottom: 8, // space for indicator
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabItem: {
    width: TAB_CONTAINER_W / 2,
    alignItems: 'center',
    paddingVertical: 4,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '800',
  },
  tabMuted: { color: '#B7BDC7' }, // light grey like “Quick Hangouts”
  tabActive: { color: '#147EAB' }, // teal/blue like “Companions”

  baseLine: {
    height: 2,
    backgroundColor: '#E5ECF3',
    borderRadius: 2,
    marginTop: 8,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    backgroundColor: '#19BFEA',
    borderRadius: 8,
    
  },

  /* Misc */
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { color: '#94A3B8', fontSize: 16, fontWeight: '700' },
});
