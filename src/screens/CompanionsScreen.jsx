// CompanionsScreen.js
import React, { useState, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  MapPin,
  Music,
  Star,
  DollarSign,
  BadgeCheck,
  ShieldCheck,
  Globe,
} from 'lucide-react-native';

const COLORS = {
  cardBg: '#FFFFFF',
  title: '#204793',
  sub: '#6B7A90',
  chipBlueBg: '#E9F7FF',
  chipBlueText: '#0AA9FF',
  teal: '#17A2A6',
  tealBg: '#E7F7F7',
  divider: '#EEF2F7',
};

const CompanionCard = memo(function CompanionCard({
  name = 'AMY LOU',
  distance = '2.5 Miles away',
  category = 'Music',
  rate = 50,
  rating = '5.0/5.0',
  tagline = "I'm all about the vibe—whether it's the adrenaline of a new place, great food, or a cozy chat over coffee. Fun, safe, and memorable times guaranteed.",
  badgeText = 'Empathy Expert',
  imageUri = 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800&auto=format&fit=crop', // replace with your asset if you like
}) {
  const [expanded, setExpanded] = useState(false);

  const renderDescription = () => {
    if (!expanded) {
      return (
        <Text style={styles.desc} numberOfLines={2}>
          {tagline + ' '}
          <Text style={styles.link} onPress={() => setExpanded(true)}>
            Read More…
          </Text>
        </Text>
      );
    }
    return (
      <Text style={styles.desc}>
        {tagline + ' '}
        <Text style={styles.link} onPress={() => setExpanded(false)}>
          Read Less
        </Text>
      </Text>
    );
  };

  return (
    <View style={styles.card}>
      {/* Left: Photo + bottom badge */}
      <View style={styles.leftCol}>
        <View style={styles.photoWrap}>
          <Image source={{ uri: imageUri }} style={styles.photo} />

          {/* Gradient badge overlapping bottom of photo */}
          <View style={styles.badgeOuter}>
            <LinearGradient
              colors={['#A06BFF', '#5ED2FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.badgeGradientBorder}
            >
              <View style={styles.badgeInner}>
                <View style={styles.badgeDot} />
                <Text style={styles.badgeText}>{badgeText}</Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* Right: Content */}
      <View style={styles.rightCol}>
        {/* Name row + tiny blue icons */}
        <View style={styles.nameRow}>
          <Text style={styles.name}>{name.toUpperCase()}</Text>
          <BadgeCheck size={16} color="#0AA9FF" style={styles.nameIcon} />
          <ShieldCheck size={16} color="#0AA9FF" style={styles.nameIcon} />
          <Globe size={16} color="#0AA9FF" style={styles.nameIcon} />
        </View>

        {/* Description with Read More/Less */}
        {renderDescription()}

        {/* Distance + category chip */}
        <View style={styles.metaRow}>
          <View style={styles.distanceWrap}>
            <MapPin size={16} color={COLORS.sub} />
            <Text style={styles.distanceText}>{'  ' + distance}</Text>
          </View>

          <View style={styles.rightChips}>
            <View style={styles.blueChip}>
              <Music size={14} color={COLORS.chipBlueText} />
              <Text style={styles.blueChipText}>{'  ' + category}</Text>
            </View>
          </View>
        </View>

        {/* Bottom chips: rating (gradient) + price (teal) */}
        <View style={styles.bottomRow}>
          <LinearGradient
            colors={['#FE8C3A', '#FF3E8A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.ratingChip}
          >
            <Star size={14} color="#FFFFFF" />
            <Text style={styles.ratingText}>{'  ' + rating}</Text>
          </LinearGradient>

          <View style={styles.priceChip}>
            <DollarSign size={14} color={COLORS.teal} />
            <Text style={styles.priceText}>{`  $${rate}/h`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

const CompanionsScreen = () => {
  return (
    <View style={styles.screen}>
      <CompanionCard />
      <View style={{ height: 12, backgroundColor: '#f6f4f4ff' }}></View>
      <CompanionCard />
      <View style={{ height: 12, backgroundColor: '#f6f4f4ff' }}></View>
      <CompanionCard />
    </View>
  );
};

export default CompanionsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
  },

  card: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '92%',
    borderRadius: 16,
    padding: 12,
    gap: '10%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  leftCol: {
    width: 108,
    alignItems: 'center',
  },
  photoWrap: {
    width: 120,
    height: 120,
    borderRadius: 14,
    overflow: 'visible',
    alignItems: 'center',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 14,
    backgroundColor: '#EEE',
  },

  // Gradient label below photo
  badgeOuter: {
    position: 'absolute',
    bottom: -11,
    width: 130,
    alignItems: 'center',
  },
  badgeGradientBorder: {
    borderRadius: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  badgeInner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '97%',
  },
  badgeDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#FF72D2',
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B3EFF',
  },

  rightCol: {
    flex: 1,
    paddingLeft: 2,
    paddingBottom: 2,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    marginBottom: 4,
  },
  name: {
    color: COLORS.title,
    fontWeight: '700',
    letterSpacing: 0.6,
    fontSize: 16,
  },
  nameIcon: {
    marginLeft: 6,
  },

  desc: {
    color: COLORS.sub,
    fontSize: 12,
    lineHeight: 18,
  },
  link: {
    color: '#0AA9FF',
    fontWeight: '700',
  },

  metaRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  distanceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    color: COLORS.sub,
    fontSize: 13,
    fontWeight: '600',
  },

  rightChips: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  blueChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.chipBlueBg,
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: '#0367A6',
  },
  blueChipText: {
    color: COLORS.chipBlueText,
    fontSize: 12.5,
    fontWeight: '700',
  },

  bottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ratingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    height: 30,
    width: '42%',
    justifyContent: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12.5,
  },
  priceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.tealBg,
    borderRadius: 50,
    height: 30,
    width: '42%',
    justifyContent: 'center',
  },
  priceText: {
    color: COLORS.teal,
    fontWeight: '800',
    fontSize: 12.5,
  },
});
