import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

export default function Loading() {
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animacja pulsująca dla ikony
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // Animacja obracająca dla sparkles
    const rotate = Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    rotate.start();

    return () => {
      pulse.stop();
      rotate.stop();
    };
  }, [pulseAnimation, rotateAnimation]);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#0F0C29', '#24243e']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Główna ikona z animacją */}
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ scale: pulseAnimation }],
              },
            ]}
          >
            <LinearGradient
              colors={['#FF1744', '#FF6B6B']}
              style={styles.iconGradient}
            >
              <Sparkles size={32} color="#fff" />
            </LinearGradient>
          </Animated.View>

          {/* Obracające się sparkles */}
          <Animated.View
            style={[
              styles.sparklesContainer,
              {
                transform: [{ rotate }],
              },
            ]}
          >
            <Sparkles size={16} color="#FF1744" style={styles.sparkle1} />
            <Sparkles size={12} color="#FFD600" style={styles.sparkle2} />
            <Sparkles size={14} color="#FF1744" style={styles.sparkle3} />
          </Animated.View>

          {/* Tekst ładowania */}
          <View style={styles.textContainer}>
            <Text style={styles.loadingText}>Ładowanie...</Text>
            <Text style={styles.subtitleText}>Przygotowujemy Twoją transformację</Text>
          </View>

          {/* Prosta animacja kropek */}
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: pulseAnimation.interpolate({
                      inputRange: [1, 1.2],
                      outputRange: [0.3, 1],
                    }),
                    transform: [
                      {
                        scale: pulseAnimation.interpolate({
                          inputRange: [1, 1.2],
                          outputRange: [0.8, 1.2],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF1744',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sparklesContainer: {
    position: 'absolute',
    top: height * 0.35,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkle1: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  sparkle2: {
    position: 'absolute',
    top: 30,
    right: 15,
  },
  sparkle3: {
    position: 'absolute',
    bottom: 20,
    left: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF1744',
    marginHorizontal: 4,
  },
});