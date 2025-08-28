import { useAppFlow } from '@/hooks/useAppFlow';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Dimensions nie są potrzebne dla tego splash screen

export default function SplashScreen() {
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

    const router = useRouter();
    const flow = useAppFlow();

    useEffect(() => {
        if (flow === 'loading') return;

        const timer = setTimeout(() => {
            if (flow === 'onboarding') router.replace('/onboarding');
            if (flow === 'registered') router.replace('/onboarding/infoSlide');
            if (flow === 'customPlan') router.replace('/onboarding/customPlan');
            if (flow === 'main') router.replace('/(tabs)');
    }, 2000);

  return () => clearTimeout(timer); // czyszczenie timera przy odmontowaniu lub zmianie flow
}, [flow, router]);

  useEffect(() => {
    // Animacja fade-in dla całego ekranu
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Animacja pulsująca dla ikony głównej
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    // Animacja obracająca dla sparkles
    const rotate = Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );
    rotate.start();

    return () => {
      pulse.stop();
      rotate.stop();
    };
  }, [pulseAnimation, rotateAnimation, fadeAnimation]);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnimation }]}>
      <LinearGradient
        colors={['#0F0C29', '#24243e', '#0F0C29']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            {/* Główna ikona z animacją */}
            <View style={styles.logoContainer}>
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
                  <Sparkles size={40} color="#fff" />
                </LinearGradient>
              </Animated.View>

              {/* Obracające się sparkles dookoła */}
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
                <Sparkles size={10} color="#FFD600" style={styles.sparkle4} />
              </Animated.View>
            </View>

            {/* Tekst aplikacji */}
            <View style={styles.textContainer}>
              <Text style={styles.appName}>FCK TikTok</Text>
              <Text style={styles.tagline}>Odzyskaj swój czas</Text>
            </View>

            {/* Ładująca animacja */}
            <View style={styles.loadingContainer}>
              <View style={styles.loadingDots}>
                {[0, 1, 2].map((index) => (
                  <Animated.View
                    key={index}
                    style={[
                      styles.dot,
                      {
                        opacity: pulseAnimation.interpolate({
                          inputRange: [1, 1.1],
                          outputRange: [0.4, 1],
                        }),
                        transform: [
                          {
                            scale: pulseAnimation.interpolate({
                              inputRange: [1, 1.1],
                              outputRange: [0.8, 1.2],
                            }),
                          },
                        ],
                      },
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.loadingText}>Ładowanie...</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF1744',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  sparklesContainer: {
    position: 'absolute',
    top: -10,
    width: 140,
    height: 140,
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
  sparkle4: {
    position: 'absolute',
    bottom: 10,
    right: 25,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF1744',
    marginHorizontal: 4,
  },
  loadingText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
});