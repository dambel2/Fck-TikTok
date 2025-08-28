import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowRight, Sparkles } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
  },
  sparkle: {
    position: 'absolute',
  },
  sparkle1: {
    top: 100,
    left: 50,
  },
  sparkle2: {
    top: 200,
    right: 50,
  },
  sparkle3: {
    bottom: 300,
    left: 80,
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 0,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 4,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 42,
    textAlign: 'left',
    lineHeight: 26,
    fontWeight: '500',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 0,
    alignItems: 'center',
    gap: 4
  },
  star: {
    fontSize: 12,
    color: '#FF69B4',
    marginHorizontal: 2,
  },
  starText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '800',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  startButton: {
    borderRadius: 32,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#FF1744',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    marginBottom: 18,
  },
  buttonGradient: {
    flexDirection: 'row',
    paddingHorizontal: 48,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  link: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    opacity: 0.85,
    width: '100%',
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default function OnboardingStart() {
  const router = useRouter();
  // Animations
  const fadeAnimation = useSharedValue(0);
  const slideAnimation = useSharedValue(50);
  const sparkleAnimation = useSharedValue(0);

  useEffect(() => {
    fadeAnimation.value = withTiming(1, { duration: 1000 });
    slideAnimation.value = withTiming(0, { duration: 800 });
    sparkleAnimation.value = withRepeat(
      withTiming(360, { duration: 3000 }),
      -1,
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fadeAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnimation.value,
      transform: [{ translateY: slideAnimation.value }],
    };
  });

  const sparkleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${sparkleAnimation.value}deg` }],
    };
  });

  const handleClick = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push('/onboarding/quiz');
  };

  const handleLoginClick = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push('/onboarding/login');
  };

  return (
    <LinearGradient
      colors={['#000000', '#1A0A1A', '#FF1744']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Floating sparkles */}
      <Animated.View style={[styles.sparkle, styles.sparkle1, sparkleAnimatedStyle]}>
        <Sparkles size={16} color="rgba(255,255,255,0.3)" />
      </Animated.View>
      <Animated.View style={[styles.sparkle, styles.sparkle2, sparkleAnimatedStyle]}>
        <Sparkles size={12} color="rgba(255,23,68,0.4)" />
      </Animated.View>
      <Animated.View style={[styles.sparkle, styles.sparkle3, sparkleAnimatedStyle]}>
        <Sparkles size={20} color="rgba(255,255,255,0.2)" />
      </Animated.View>

      <Animated.View style={[styles.content, fadeAnimatedStyle]}>
        {/* Logo 
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>QUITTR</Text>
        </View>*/}
        {/* Welcome Title */}
        <Text style={styles.title}>Dobrze, że jesteś!</Text>
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Zanim zaczniesz, sprawdźmy Twój poziom uzależnienia od TikToka
        </Text>
        {/* Decorative stars */}
        <View style={styles.starsRow}>
          <Text style={styles.star}>⭐️⭐️⭐️⭐️⭐️</Text>
          <Text style={styles.starText}>10K+ Użytkowników</Text>
        </View>
        {/* Start Quiz Button */}
        
      </Animated.View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
            style={styles.startButton}
            onPress={handleClick}
          >
            <LinearGradient
              colors={['#FF1744', '#E91E63']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
            <Text style={styles.buttonText}>Rozpocznij quiz</Text>
            <ArrowRight size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
        {/* Already joined link */}
        <TouchableOpacity style={styles.link} onPress={handleLoginClick}>
          <Text style={styles.linkText}>Mam już konto</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>)}

