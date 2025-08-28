import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Brain, Clock, Heart, Sparkles, Star, Target, Trophy } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

export default function CustomPlanScreen() {
    const insets = useSafeAreaInsets();
    
    const timeAnimation = useSharedValue(0);
    const yearsAnimation = useSharedValue(0);

    useEffect(() => {
        // Animate numbers counting up
        timeAnimation.value = withDelay(500, withTiming(18250, { duration: 2000 }));
        yearsAnimation.value = withDelay(800, withTiming(2.1, { duration: 2000 }));
    }, [timeAnimation, yearsAnimation]);

    const handleClick = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        router.push('/onboarding/paywall');
    };

  return (
    <LinearGradient 
      colors={[ '#0F0C29', '#24243e', '#302b63' ]} 
      style={styles.container}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <LinearGradient colors={['#FF1744', '#FF6B6B']} style={styles.heroIcon}>
            <Sparkles size={32} color="#fff" />
          </LinearGradient>
          <Text style={styles.heroTitle}>Twój spersonalizowany plan jest gotowy!</Text>
          <Text style={styles.heroSubtitle}>Na podstawie Twoich odpowiedzi przygotowaliśmy idealne rozwiązanie</Text>
        </View>

        {/* Time Savings Card */}
        <LinearGradient colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']} style={styles.timeCard}>
          <View style={styles.timeCardHeader}>
            <Clock size={28} color="#FFD600" />
            <Text style={styles.timeCardTitle}>Odzyskasz swój czas</Text>
          </View>
          
          <View style={styles.timeStats}>
            <View style={styles.timeStat}>
              <Text style={styles.timeNumber}>18 250</Text>
              <Text style={styles.timeLabel}>godzin rocznie</Text>
            </View>
            <View style={styles.timeDivider} />
            <View style={styles.timeStat}>
              <Text style={styles.timeNumber}>12.3</Text>
              <Text style={styles.timeLabel}>lat życia</Text>
            </View>
          </View>
          
          <Text style={styles.timeDescription}>
            To czas, który możesz przeznaczyć na rozwój kariery, relacje z bliskimi lub swoje pasje
          </Text>
        </LinearGradient>

        {/* Benefits Grid */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Co zyskasz dzięki FCK-TikTok</Text>
          
          <View style={styles.benefitsGrid}>
            <LinearGradient colors={['rgba(46,196,241,0.2)', 'rgba(46,196,241,0.05)']} style={styles.benefitCard}>
              <Brain size={32} color="#2EC4F1" />
              <Text style={styles.benefitTitle}>Lepszą koncentrację</Text>
              <Text style={styles.benefitDesc}>+75% focus na ważnych zadaniach</Text>
            </LinearGradient>
            
            <LinearGradient colors={['rgba(255,23,68,0.2)', 'rgba(255,23,68,0.05)']} style={styles.benefitCard}>
              <Heart size={32} color="#FF1744" />
              <Text style={styles.benefitTitle}>Lepsze samopoczucie</Text>
              <Text style={styles.benefitDesc}>-60% stresu i niepokoju</Text>
            </LinearGradient>
            
            <LinearGradient colors={['rgba(255,214,0,0.2)', 'rgba(255,214,0,0.05)']} style={styles.benefitCard}>
              <Trophy size={32} color="#FFD600" />
              <Text style={styles.benefitTitle}>Większą produktywność</Text>
              <Text style={styles.benefitDesc}>+90% efektywności w pracy</Text>
            </LinearGradient>
            
            <LinearGradient colors={['rgba(143,47,255,0.2)', 'rgba(143,47,255,0.05)']} style={styles.benefitCard}>
              <Target size={32} color="#8F2FFF" />
              <Text style={styles.benefitTitle}>Lepsze relacje</Text>
              <Text style={styles.benefitDesc}>Więcej czasu na bliskich</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Success Rate */}
        <LinearGradient colors={['rgba(46,196,241,0.15)', 'rgba(143,47,255,0.05)']} style={styles.successCard}>
          <View style={styles.successHeader}>
            
            <Text style={styles.successTitle}>Skuteczność potwierdzona</Text>
          </View>
          
          <View style={styles.successStats}>
            <View style={styles.successBar}>
              <View style={styles.successBarBg}>
                <LinearGradient colors={['#2EC4F1', '#8F2FFF']} style={[styles.successBarFill, { width: '92%' }]} />
              </View>
              <Text style={styles.successPercentage}>92%</Text>
            </View>
            <Text style={styles.successLabel}>użytkowników osiąga swoje cele</Text>
          </View>
          
          <Text style={styles.successDescription}>
            Ponad 10 000 użytkowników już odzyskało kontrolę nad swoim czasem dzięki FCK-TikTok
          </Text>
        </LinearGradient>

        {/* Social Proof */}
        <View style={styles.socialProof}>
          <View style={styles.starsRow}>
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={24} color="#FFD600" fill="#FFD600" />
            ))}
          </View>
          <Text style={styles.socialText}>
            &ldquo;Dzięki tej aplikacji odzyskałem 3 godziny dziennie. Teraz mam czas na sport i naukę języków!&rdquo;
          </Text>
          <Text style={styles.socialAuthor}>- Miłosz, 18 lat</Text>
        </View>

        {/* Proste nawyki */}
        <View style={styles.habitsSection}>
          <Text style={styles.habitsSectionTitle}>Proste codzienne nawyki</Text>
          <Text style={styles.habitsSectionSubtitle}>Małe kroki, wielkie rezultaty</Text>
          
          <View style={styles.habitsGrid}>
            <View style={styles.habitCard}>
              <View style={styles.habitIconContainer}>
                <Clock size={24} color="#FF1744" />
              </View>
              <Text style={styles.habitTitle}>5 min rano</Text>
              <Text style={styles.habitDescription}>Ustaw cel na dzień</Text>
            </View>
            
            <View style={styles.habitCard}>
              <View style={styles.habitIconContainer}>
                <Brain size={24} color="#FF1744" />
              </View>
              <Text style={styles.habitTitle}>Świadome korzystanie</Text>
              <Text style={styles.habitDescription}>Pytaj się &ldquo;Po co?&rdquo;</Text>
            </View>
            
            <View style={styles.habitCard}>
              <View style={styles.habitIconContainer}>
                <Heart size={24} color="#FF1744" />
              </View>
              <Text style={styles.habitTitle}>Wieczorne refleksje</Text>
              <Text style={styles.habitDescription}>Co udało się dziś?</Text>
            </View>
            
            <View style={styles.habitCard}>
              <View style={styles.habitIconContainer}>
                <Trophy size={24} color="#FF1744" />
              </View>
              <Text style={styles.habitTitle}>Nagradzaj siebie</Text>
              <Text style={styles.habitDescription}>Celebruj postępy</Text>
            </View>
          </View>
        </View>

      </ScrollView>
      
      <LinearGradient colors={['rgba(15,12,41,0.95)', '#0F0C29']} style={[styles.buttonSection, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity style={styles.ctaButton} onPress={handleClick} activeOpacity={0.9}>
          <LinearGradient colors={['#FF1744', '#FF6B6B']} style={styles.ctaGradient}>
            <Text style={styles.ctaText}>Zacznij swoją transformację</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.ctaSubtext}>Dołącz do tysięcy zadowolonych użytkowników</Text>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  
  // Hero Section
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#FF1744',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  
  // Time Card
  timeCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  timeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  timeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeStat: {
    flex: 1,
    alignItems: 'center',
  },
  timeDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 20,
  },
  timeNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFD600',
    marginBottom: 4,
  },
  timeLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  timeDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Benefits Section
  benefitsSection: {
    marginBottom: 32,
  },
  benefitsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: (screenWidth - 60) / 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minHeight: 120,
    justifyContent: 'center',
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
    lineHeight: 18,
  },
  benefitDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    paddingHorizontal: 4,
    lineHeight: 16,
  },
  
  // Success Card
  successCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 12,
  },
  successStats: {
    marginBottom: 16,
  },
  successBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  successBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginRight: 12,
  },
  successBarFill: {
    height: 8,
    borderRadius: 4,
  },
  successPercentage: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2EC4F1',
    width: 40,
  },
  successLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  successDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
  
  // Social Proof
  socialProof: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    marginBottom: 32,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  socialText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 12,
  },
  socialAuthor: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  
  // CTA Section
  buttonSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    borderRadius: 28,
    marginBottom: 12,
    shadowColor: '#FF1744',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  ctaSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  
  // Habits Section
  habitsSection: {
    marginTop: 32,
    marginBottom: 32,
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  habitsSectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  habitsSectionSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  habitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  habitCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  habitIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,23,68,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  habitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  habitDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 16,
  },
});
