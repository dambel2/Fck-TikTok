import { LinearGradient } from 'expo-linear-gradient';
import { ChartBar as BarChart3, CircleCheck as CheckCircle, ChevronRight, Clock, Flame, Lightbulb, Shield, Target, Trophy, User } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { getTikTokTime, requestAccess } from '../../native-modules/ScreenTime';

// Demo router na górze pliku
const router = { push: (route: string) => Alert.alert('Demo', `Przejście do: ${route}`) };

export default function HomeScreen() {
  // Komentarz: tymczasowo wyłączam backendowe pobieranie usera
  // import { useUser } from '@/hooks/useUser';
  // const { user, loading } = useUser();
  // Zamiast tego hardcoded demo user:
  const user = {
    displayName: 'Wojownik czasu',
    streak: 7,
    level: 'Wojownik',
    totalTimeSaved: 420,
  };
  const loading = false;

  const [currentTime, setCurrentTime] = useState(new Date());
  const [todaysTikTokTime, setTodaysTikTokTime] = useState(0); // minutes spent on TikTok today
  const [todaysSaved] = useState(142); // minut zaoszczędzonych dzisiaj
  const [weekProgress] = useState(0.73); // 73% tygodniowego celu
  const [currentTip, setCurrentTip] = useState(0);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    const init = async () => {
      const granted = await requestAccess();
      setAccess(granted);
  
      if (granted) {
        const t = await getTikTokTime();
        setTodaysTikTokTime(t); // aktualizacja stanu na start
      }
    };
    init();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (access) {
        const t = await getTikTokTime();
        setTodaysTikTokTime(t);
      }
    }, 60000); // co minutę
  
    return () => clearInterval(interval);
  }, [access]);
  
  
  // Animations
  const pulseAnimation = useSharedValue(1);
  const fadeAnimation = useSharedValue(0);
  const slideAnimation = useSharedValue(30);
  const progressAnimation = useSharedValue(0);

  // Stałe kolory jak w dark theme
  const COLORS = {
    primary: '#FF1744',
    secondary: '#E91E63',
    accent: '#FF69B4',
    success: '#00C853',
    warning: '#FF9800',
    danger: '#F44336',
    background: '#1A1A1A',
    surface: '#2A2A2A',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#3A3A3A',
  };

  const theme = COLORS;

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Animations
    fadeAnimation.value = withTiming(1, { duration: 1000 });
    slideAnimation.value = withTiming(0, { duration: 800 });
    
    progressAnimation.value = withDelay(500, withTiming(weekProgress, { duration: 1500 }));
    
    pulseAnimation.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );

    // Tip rotation
    const tipTimer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % detoxTips.length);
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
    };
  }, [weekProgress]);

  const animatedFadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnimation.value,
      transform: [{ translateY: slideAnimation.value }],
    };
  });

  const animatedPulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseAnimation.value }],
    };
  });

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${interpolate(progressAnimation.value, [0, 1], [0, 100])}%`,
    };
  });

  const streak = user?.streak || 0;
  const level = user?.level || 'Newbie';

  const getMotivationalMessage = () => {
  const hour = currentTime.getHours();
  if (hour < 12) return "Kolejny świadomy poranek! 🌅";
  if (hour < 17) return "Nie zmarnuj tego dnia! 💪";
  return "Czas na wieczorną koncentrację! 🌙";
  };

  const quickActions = [
    {
      icon: BarChart3,
      title: 'Statystyki',
      subtitle: 'Śledź postępy',
      gradient: ['#E91E63', '#FF69B4'] as [string, string],
      onPress: () => router.push('/tracker'),
    },
    {
      icon: User,
      title: 'Profil',
      subtitle: 'Zobacz swój profil',
      gradient: ['#FF69B4', '#FF1744'] as [string, string],
      onPress: () => router.push('/(tabs)/progress'),
    },
    {
      icon: Target,
      title: 'Ustal cele',
      subtitle: 'Zmień swój dzienny cel',
      gradient: ['#FF1744', '#E91E63'] as [string, string],
      onPress: () => Alert.alert('Cele', 'Funkcja ustalania celów już wkrótce!'),
    },
  ];

  const milestones = [
  { days: 1, title: 'Pierwszy dzień', completed: streak >= 1 },
  { days: 7, title: 'Tydzień', completed: streak >= 7 },
  { days: 30, title: 'Miesiąc', completed: streak >= 30 },
  { days: 100, title: 'Koniec uzależnienia', completed: streak >= 100 },
  ];

  const detoxTips = [
    {
      icon: '🧘',
      title: 'Ćwicz uważność',
      description: 'Gdy masz ochotę scrollować, weź 3 głębokie oddechy i zapytaj siebie: "Czego naprawdę teraz potrzebuję?"'
    },
    {
      icon: '📱',
      title: 'Strefy bez telefonu',
      description: 'Sypialnia i stół jadalny to strefy wolne od TikToka. Wykorzystaj je na odpoczynek i rozmowę.'
    },
    {
      icon: '⏰',
      title: 'Zmień nawyk',
      description: 'Zamiast otwierać TikToka, przeczytaj stronę książki lub zrób 10 pompek. Małe sukcesy budują motywację!'
    },
    {
      icon: '🎯',
      title: 'Ustal intencje',
      description: 'Zanim sięgniesz po telefon, zdecyduj co chcesz zrobić. Świadome użycie telefonu zapobiega bezmyślnemu scrollowaniu.'
    },
    {
      icon: '🌱',
      title: 'Obserwuj wyzwalacze',
      description: 'Zwróć uwagę, kiedy najbardziej chcesz użyć TikToka. Nuda? Stres? Znając wyzwalacze, przygotujesz alternatywy.'
    },
    {
      icon: '🏆',
      title: 'Świętuj małe sukcesy',
      description: 'Każda godzina bez TikToka to zwycięstwo. Doceniaj postępy i bądź dumny ze swojej zmiany.'
    }
  ];

  const handlePanicBlock = () => {
    Alert.alert(
      'Blokada aktywna!',
      'TikTok zablokowany na 30 minut. Dasz radę! 💪',
      [
        {
          text: 'Wytrzymaj!',
          onPress: () => {
            // W prawdziwej aplikacji tu byłaby blokada
            Alert.alert('Blokada trwa', 'Dostęp do TikToka zablokowany na 30 minut. Wykorzystaj ten czas dobrze!');
          }
        }
      ]
    );
  };

  // Wait for user data to load
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.loadingText, { color: theme.text }]}>Ładowanie...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 1. Powitanie */}
      <Animated.View style={[styles.header, animatedFadeStyle]}>
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}> 
            {getMotivationalMessage()}
          </Text>
          <Text style={[styles.userName, { color: theme.textSecondary }]}> 
            {user?.displayName || 'Wojownik czasu'}
          </Text>
        </View>
      </Animated.View>

      {/* 2. Czas na TikToku dziś */}
      <Animated.View style={[styles.tikTokTimeSection, animatedFadeStyle]}>
        <View style={[styles.tikTokTimeCard, { backgroundColor: theme.surface, borderColor: theme.border }]}> 
          <View style={styles.tikTokTimeHeader}> 
            <Clock size={24} color={theme.success} />
            <Text style={[styles.tikTokTimeTitle, { color: theme.text }]}>Czas na TikToku dzisiaj</Text>
          </View>
          
          <Text style={[styles.tikTokTimeValue, { color: theme.success }]}> 
          {Math.floor(todaysTikTokTime / 60)}h {todaysTikTokTime % 60}m
          </Text>
          
          <Text style={[styles.tikTokTimeSubtitle, { color: theme.textSecondary }]}> 
            {todaysTikTokTime > 60 ? 'Czas na przerwę!' : 'Świetna samokontrola!'}
          </Text>
          
          <View style={styles.tikTokTimeProgress}> 
            <View style={[styles.tikTokTimeProgressTrack, { backgroundColor: theme.border }]}> 
              <View 
                style={[ 
                  styles.tikTokTimeProgressFill,
                  { 
                    backgroundColor: todaysTikTokTime > 60 ? theme.danger : theme.success,
                    width: `${Math.min((todaysTikTokTime / 180) * 100, 100)}%`
                  }
                ]}
              />
            </View>
            <Text style={[styles.tikTokTimeProgressText, { color: theme.textSecondary }]}> 
              Limit dzienny: 3 godziny
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* 3. Seria & Poziom */}
      <Animated.View style={[styles.streakLevelSection, animatedPulseStyle]}>
        <View style={styles.streakLevelRow}> 
          <LinearGradient
            colors={['#FF1744', '#E91E63']}
            style={styles.streakCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Flame size={24} color="white" />
            <Text style={styles.streakNumber}>{streak}</Text>
            <Text style={styles.streakLabel}>Dni z rzędu</Text>
          </LinearGradient>

          <LinearGradient
            colors={['#E91E63', '#FF69B4']}
            style={styles.levelCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Trophy size={24} color="white" />
            <Text style={styles.levelText}>{level}</Text>
            <Text style={styles.levelLabel}>Aktualny poziom</Text>
          </LinearGradient>
        </View>
      </Animated.View>


      {/* 4. Przycisk paniki */}
      <Animated.View style={[styles.panicSection, animatedFadeStyle]}>
        <TouchableOpacity 
          style={styles.panicButton}
          onPress={handlePanicBlock}
        >
          <LinearGradient
            colors={['#FF1744', '#F44336']}
            style={styles.panicGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Shield size={28} color="white" />
            <View style={styles.panicText}>
              <Text style={styles.panicTitle}>Czujesz pokusę?</Text>
              <Text style={styles.panicSubtitle}>Zablokuj TikToka na 30 minut</Text>
            </View>
            <Text style={styles.panicEmoji}>🚨</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* 5. Zaoszczędzony czas */}
      <Animated.View style={[styles.timeSavedSection, animatedFadeStyle]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Twój postęp w czasie</Text>
        <View style={{ backgroundColor: theme.surface, borderRadius: 20, borderWidth: 1, borderColor: theme.border, padding: 24, marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Trophy size={28} color={theme.success} style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 18, fontWeight: '700', color: theme.text }}>Ile spędziłeś na TikToku?</Text>
          </View>
          
          {/* Nowoczesny wykres z react-native-chart-kit */}
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <LineChart
              data={{
                labels: ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'],
                datasets: [
                  {
                    data: [60, 120, 180, 240, 300, 360, 420], // Bez apki - liniowy wzrost
                    color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, // Czerwony
                    strokeWidth: 3
                  },
                  {
                    data: [0, 20, 45, 80, 120, 180, user.totalTimeSaved || 250], // Z apką - wolniejszy wzrost
                    color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`, // Zielony
                    strokeWidth: 3
                  }
                ],
                legend: ['Bez apki', 'Z apką']
              }}
              width={280}
              height={180}
              yAxisSuffix=" min"
              chartConfig={{
                backgroundColor: theme.surface,
                backgroundGradientFrom: theme.surface,
                backgroundGradientTo: theme.surface,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(204, 204, 204, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: '5',
                  strokeWidth: '2',
                  stroke: theme.border
                },
                propsForBackgroundLines: {
                  strokeDasharray: '',
                  stroke: theme.border,
                  strokeWidth: 1
                }
              }}
              bezier
              style={{
                borderRadius: 16,
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
              }}
            />
          </View>

          {/* Statystyki pod wykresem */}
          <View style={{ backgroundColor: `${theme.border}20`, borderRadius: 12, padding: 16, marginTop: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <View style={{ width: 12, height: 3, backgroundColor: theme.danger, borderRadius: 2, marginRight: 6 }} />
                  <Text style={{ fontSize: 14, color: theme.textSecondary, fontWeight: '600' }}>Bez ochrony</Text>
                </View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.danger }}>
                  {Math.floor(420 / 20)}h {420 % 60}m
                </Text>
                <Text style={{ fontSize: 12, color: theme.textSecondary }}>Potencjalnie spędzone</Text>
              </View>
              
              <View style={{ width: 1, height: '100%', backgroundColor: theme.border, marginHorizontal: 16 }} />
              
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <View style={{ width: 12, height: 3, backgroundColor: theme.success, borderRadius: 2, marginRight: 6 }} />
                  <Text style={{ fontSize: 14, color: theme.textSecondary, fontWeight: '600' }}>Z aplikacją</Text>
                </View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.success }}>
                  {Math.floor((user.totalTimeSaved || 250) / 80)}h {(user.totalTimeSaved || 250) % 60}m
                </Text>
                <Text style={{ fontSize: 12, color: theme.textSecondary }}>Rzeczywisty czas</Text>
              </View>
            </View>
            
            {/* Procent oszczędności */}
            <View style={{ alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: theme.border }}>
              <Text style={{ fontSize: 16, color: theme.text, fontWeight: '600', marginBottom: 4 }}>
                🎯 Oszczędność: {/*Math.round(((420 - (user.totalTimeSaved || 250)) / 120) * 100)*/}43%
              </Text>
              <Text style={{ fontSize: 13, color: theme.textSecondary, textAlign: 'center' }}>
                Dzięki aplikacji zaoszczędziłeś <Text style={{ color: theme.success, fontWeight: 'bold' }}>16h 0{/*Math.floor((420 - (user.totalTimeSaved || 250)) / 60)}h {(420 - (user.totalTimeSaved || 250)) % 60*/}m</Text> swojego życia!
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
      

      {/* 6. Szybkie akcje */}
      <Animated.View style={[styles.actionsSection, animatedFadeStyle]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Szybkie akcje</Text>
        
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionButton}
              onPress={action.onPress}
            >
              <LinearGradient
                colors={action.gradient}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <action.icon size={24} color="white" />
                <View style={styles.actionText}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </View>
                <ChevronRight size={16} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* 7. Kamienie milowe */}
      <Animated.View style={[styles.milestonesSection, animatedFadeStyle]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Kamienie milowe</Text>
        
        <View style={styles.milestonesContainer}>
          {milestones.map((milestone, index) => (
            <View 
              key={index}
              style={[ 
                styles.milestoneItem,
                { 
                  backgroundColor: theme.surface,
                  borderColor: milestone.completed ? theme.success : theme.border,
                  opacity: milestone.completed ? 1 : 0.6,
                }
              ]}
            >
              <View style={[ 
                styles.milestoneIcon,
                { backgroundColor: milestone.completed ? theme.success : theme.border }
              ]}>
                {milestone.completed ? (
                  <CheckCircle size={16} color="white" />
                ) : (
                  <Text style={[styles.milestoneDays, { color: theme.textSecondary }]}> 
                    {milestone.days}
                  </Text>
                )}
              </View>
              
              <View style={styles.milestoneContent}>
                <Text style={[styles.milestoneTitle, { color: theme.text }]}> 
                  {milestone.title}
                </Text>
                <Text style={[styles.milestoneDaysText, { color: theme.textSecondary }]}> 
                  {milestone.days} dni
                </Text>
              </View>
              
              {milestone.completed && (
                <Trophy size={20} color={theme.success} />
              )}
            </View>
          ))}
        </View>
      </Animated.View>

      {/* 8. Porada detoksu */}
      <Animated.View style={[styles.tipsSection, animatedFadeStyle]}>
        <View style={styles.tipsHeader}>
          <Lightbulb size={24} color={theme.warning} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Porada dnia</Text>
        </View>
        
        <View style={[styles.tipCard, { backgroundColor: theme.surface, borderColor: theme.border }]}> 
          <Text style={styles.tipIcon}>{detoxTips[currentTip].icon}</Text>
          <Text style={[styles.tipTitle, { color: theme.text }]}> 
            {detoxTips[currentTip].title}
          </Text>
          <Text style={[styles.tipDescription, { color: theme.textSecondary }]}> 
            {detoxTips[currentTip].description}
          </Text>
          
          <View style={styles.tipDots}>
            {detoxTips.map((_, index) => (
              <View
                key={index}
                style={[ 
                  styles.tipDot,
                  {
                    backgroundColor: index === currentTip ? theme.primary : theme.border,
                  }
                ]}
              />
            ))}
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  profileEmoji: {
    fontSize: 24,
  },
  tikTokTimeSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  tikTokTimeCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  tikTokTimeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  tikTokTimeTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  tikTokTimeValue: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 8,
  },
  tikTokTimeSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  tikTokTimeProgress: {
    gap: 8,
  },
  tikTokTimeProgressTrack: {
    height: 8,
    borderRadius: 4,
  },
  tikTokTimeProgressFill: {
    height: 8,
    borderRadius: 4,
  },
  tikTokTimeProgressText: {
    fontSize: 12,
    textAlign: 'center',
  },
  streakLevelSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  streakLevelRow: {
    flexDirection: 'row',
    gap: 12,
  },
  streakCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#FF1744',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
  },
  streakLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
  },
  levelCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 18,
    elevation: 4,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  levelLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.9,
  },
  timeSavedSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  timeSavedCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  timeSavedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  timeSavedTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  timeSavedValue: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 8,
  },
  timeSavedSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  timeSavedProgress: {
    gap: 8,
  },
  timeSavedProgressTrack: {
    height: 8,
    borderRadius: 4,
  },
  timeSavedProgressFill: {
    height: 8,
    borderRadius: 4,
  },
  timeSavedProgressText: {
    fontSize: 12,
    textAlign: 'center',
  },
  panicSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  panicButton: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#FF1744',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  panicGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  panicText: {
    flex: 1,
  },
  panicTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  panicSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  panicEmoji: {
    fontSize: 24,
  },
  actionsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  actionsGrid: {
    gap: 12,
  },
  actionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
  milestonesSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  milestonesContainer: {
    gap: 12,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    gap: 16,
  },
  milestoneIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneDays: {
    fontSize: 12,
    fontWeight: '700',
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  milestoneDaysText: {
    fontSize: 12,
  },
  tipsSection: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  tipCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  tipIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  tipDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  tipDots: {
    flexDirection: 'row',
    gap: 8,
  },
  tipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});