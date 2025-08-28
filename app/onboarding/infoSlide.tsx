import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const slides = [
  {
    color: ['#D8042A', '#D8042A'],
    icon: <Feather name="activity" size={90} color="#fff" />,
    title: 'TikTok uzależnia',
    desc: 'Każde przewijanie wyzwala dopaminę, dając chwilową przyjemność, ale stopniowo uzależnia Twój mózg od nieustannych bodźców.',
  },
  {
    color: ['#D8042A', '#D8042A'],
    icon: <Feather name="eye" size={90} color="#fff" />,
    title: 'Zaburza Twoją koncentrację',
    desc: 'Niekończący się feed rozprasza Twój umysł, skraca zdolność skupienia i utrudnia efektywną naukę oraz pracę.',
  },
  {
    color: ['#D8042A', '#D8042A'],
    icon: <MaterialCommunityIcons name="sleep" size={90} color="#fff" />,
    title: 'Negatywnie wpływa na sen',
    desc: 'Wieczorne scrollowanie skraca sen, pogarsza jego jakość i utrudnia regenerację organizmu, co odbija się na energii i samopoczuciu.',
  },
  {
    color: ['#D8042A', '#D8042A'],
    icon: <FontAwesome5 name="user-friends" size={90} color="#fff" />,
    title: 'Osłabia kontakty społeczne',
    desc: 'Zamiast spędzać czas z bliskimi, wybierasz ekran, co prowadzi do poczucia izolacji i ogranicza prawdziwe relacje.',
  },
  {
    color: ['#0350a8ff', '#0350a8ff'],
    icon: <Feather name="sun" size={90} color="#fff" />,
    title: 'Odzyskaj kontrolę nad swoim czasem',
    desc: 'To możliwe! Nasza aplikacja pomoże Ci przerwać nawyk, odzyskać produktywność i poprawić samopoczucie każdego dnia.',
  },
];


export default function InfoSliderScreen() {
  const scrollRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      scrollRef.current.scrollTo({ x: width * (current + 1), animated: true });
    } else {
      router.push('/onboarding/goals'); // lub router.replace('/'), zależnie od nawigacji
    }
  };

  const onScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrent(idx);
  };

  // Subtelna animacja pulsowania ikony
  const pulse = useSharedValue(1);
  React.useEffect(() => {
    pulse.value = withRepeat(withTiming(1.08, { duration: 900 }), -1, true);
  }, []);
  const iconAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <LinearGradient colors={slides[current].color} style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {slides.map((slide, idx) => (
          <View key={idx} style={[styles.slide, { width }]}> 
            <View style={styles.imageWrap}>
              <Animated.View style={iconAnimStyle}>{slide.icon}</Animated.View>
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.desc}>{slide.desc}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsWrap}>
        {slides.map((_, idx) => (
          <View key={idx} style={[styles.dot, current === idx && styles.dotActive]} />
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Dalej</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    justifyContent: 'flex-end',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  imageWrap: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  desc: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 12,
  },
  dotsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#fff',
    width: 16,
  },
  nextButton: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignSelf: 'center',
    marginBottom: 72,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  nextButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});
