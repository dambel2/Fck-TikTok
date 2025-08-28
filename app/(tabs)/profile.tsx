import { LinearGradient } from 'expo-linear-gradient';
import {
  Award,
  Calendar,
  Clock,
  Flame,
  Trophy,
  User
} from 'lucide-react-native';
import React from 'react';
import {
  ColorValue,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

// Stałe kolory dla całego UI
const COLORS = {
  primary: '#FF1744',
  secondary: '#E91E63',
  accent: '#FF69B4',
  success: '#00C853',
  warning: '#FF9800',
  background: '#1A1A1A',
  surface: '#2A2A2A',
  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
  border: '#3A3A3A',
};

export default function ProfileScreen() {
  // Używaj stałych kolorów
  const theme = COLORS;

  // Mock data użytkownika
  const user = {
    displayName: 'Wojownik czasu',
    level: 'Wojownik',
    streak: 25,
    totalTimeSaved: 1680,
    createdAt: new Date().toISOString()
  };

  // Mock data - w prawdziwej aplikacji pochodziłyby z rzeczywistego trackingu
  const streakData = {
    labels: ['Tydzień 1', 'Tydzień 2', 'Tydzień 3', 'Tydzień 4', 'Tydzień 5', 'Tydzień 6'],
    datasets: [{
      data: [2, 5, 8, 12, 18, user?.streak || 25],
      color: () => theme.primary,
      strokeWidth: 3,
    }],
  };

  const dailyUsageData = {
    labels: ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'],
    datasets: [{
      data: [0.5, 0.2, 0, 1.8, 0.3, 0.1, 0],
      color: () => theme.primary,
      strokeWidth: 3,
    }],
  };

  const timeSavedData = {
    labels: ['Tydzień 1', 'Tydzień 2', 'Tydzień 3', 'Tydzień 4'],
    datasets: [
      {
        data: [8, 15, 22, Math.floor((user?.totalTimeSaved || 1680) / 60)],
        color: () => theme.success,
        strokeWidth: 3,
        label: 'Czas zaoszczędzony'
      },
      {
        data: [25, 25, 25, 25],
        color: () => theme.textSecondary,
        strokeWidth: 2,
        withDots: false,
        label: 'Potencjalnie stracony'
      }
    ],
  };

  const wellbeingData = {
    labels: ['Koncentracja', 'Energia', 'Sen', 'Nastrój'],
    data: [0.85, 0.78, 0.92, 0.88],
  };

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    color: (opacity = 1) => `rgba(255, 23, 68, ${opacity})`,
    labelColor: () => theme.text,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: theme.primary,
    },
  };

  const wellbeingChartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`,
    labelColor: () => theme.text,
    strokeWidth: 2,
  };

  const achievements = [
    { 
      id: '1', 
      title: 'Pierwsze kroki', 
      description: 'Ukończono wprowadzenie', 
      icon: '🚀', 
      unlocked: true 
    },
    { 
      id: '2', 
      title: 'Wojownik tygodnia', 
      description: 'Osiągnięto 7-dniową serię', 
      icon: '⚔️', 
      unlocked: (user?.streak || 0) >= 7 
    },
    { 
      id: '3', 
      title: 'Mistrz miesiąca', 
      description: 'Osiągnięto 30-dniową serię', 
      icon: '👑', 
      unlocked: (user?.streak || 0) >= 30 
    },
    { 
      id: '4', 
      title: 'Oszczędzacz czasu', 
      description: 'Zaoszczędzono 100+ godzin', 
      icon: '⏰', 
      unlocked: (user?.totalTimeSaved || 0) >= 6000 
    },
  ];

  const stats = [
    {
      icon: Clock,
      title: 'Całkowity czas zaoszczędzony',
      value: `${Math.floor((user?.totalTimeSaved || 1680) / 60)}h ${(user?.totalTimeSaved || 1680) % 60}m`,
      color: theme.success,
    },
    {
      icon: Trophy,
      title: 'Obecna seria',
      value: `${user?.streak || 25} dni`,
      color: theme.primary,
    },
    {
      icon: Award,
      title: 'Poziom',
      value: user?.level || 'Wojownik',
      color: theme.secondary,
    },
    {
      icon: Calendar,
      title: 'Członek od',
      value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Dziś',
      color: theme.textSecondary,
    },
  ];

  type StatCardProps = {
    icon: any;
    title: string;
    value: string;
    subtitle?: string;
    color?: string;
    gradient?: ColorValue[];
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, gradient }: StatCardProps) => {
    const safeGradient: [ColorValue, ColorValue] = gradient && gradient.length >= 2
      ? [gradient[0], gradient[1]]
      : [theme.primary, theme.secondary];
    return (
      <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border, shadowColor: theme.primary, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4 }]}> 
        {gradient ? (
          <LinearGradient colors={safeGradient} style={styles.statIconGradient}>
            <Icon size={28} color="white" />
          </LinearGradient>
        ) : (
          <Icon size={28} color={color} />
        )}
        <Text style={[styles.statValue, { color: theme.text, fontSize: 20 }]}>{value}</Text>
        <Text style={[styles.statTitle, { color: theme.textSecondary, fontSize: 12 }]}>{title}</Text>
        {subtitle && <Text style={[styles.statSubtitle, { color: theme.textSecondary, fontSize: 10 }]}>{subtitle}</Text>}
      </View>
    );
  };

  type ChartSectionProps = {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  };

  const ChartSection = ({ title, subtitle, children }: ChartSectionProps) => (
    <View style={[styles.chartSection, { backgroundColor: theme.surface, borderColor: theme.border, marginBottom: 32, paddingBottom: 24, shadowColor: theme.primary, shadowOpacity: 0.10, shadowRadius: 6, elevation: 2 }]}> 
      <View style={styles.chartHeader}>
        <View>
          <Text style={[styles.chartTitle, { color: theme.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.chartSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>}
        </View>
      </View>
      {children}
    </View>
  );

  const AchievementCard = ({ achievement }: { achievement: any }) => (
    <View style={[
      styles.achievementCard, 
      { 
        backgroundColor: theme.surface, 
        borderColor: theme.border,
        opacity: achievement.unlocked ? 1 : 0.5,
      }
    ]}>
      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
      <View style={styles.achievementInfo}>
        <Text style={[styles.achievementTitle, { color: theme.text }]}>
          {achievement.title}
        </Text>
        <Text style={[styles.achievementDescription, { color: theme.textSecondary }]}>
          {achievement.description}
        </Text>
      </View>
      {achievement.unlocked && (
        <View style={[styles.unlockedBadge, { backgroundColor: theme.success }]}>
          <Text style={styles.unlockedText}>✓</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header profilu */}
      <View style={styles.header}>
        <LinearGradient
          colors={[theme.primary, '#FF8A5B']}
          style={styles.profileGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <User size={40} color="white" />
            </View>
            <Text style={styles.displayName}>{user?.displayName || 'Wojownik czasu'}</Text>
            <Text style={styles.levelText}>{user?.level || 'Wojownik'}</Text>
            
            <View style={styles.streakContainer}>
              <Flame size={16} color="white" />
              <Text style={styles.streakText}>{user?.streak || 25} dni z rzędu</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Statystyki kluczowe */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </View>

      {/* Wykres serii */}
      <ChartSection 
        title="Postęp serii" 
        subtitle="Dni bez TikToka w czasie"
      >
        <LineChart
          data={streakData}
          width={width - 80}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(255, 23, 68, ${opacity})`,
            labelColor: () => theme.textSecondary,
            backgroundGradientFrom: theme.surface,
            backgroundGradientTo: theme.surface,
          }}
          bezier
          style={{ ...styles.chart, marginBottom: 16 }}
        />
        <Text style={[styles.chartNote, { color: theme.textSecondary }]}>🔥 Najdłuższa seria: {user?.streak || 25} dni</Text>
      </ChartSection>

      {/* Wykres dziennego użycia */}
      <ChartSection 
        title="Dzienne użycie w tym tygodniu" 
        subtitle="Czerwona linia to Twój dzienny limit (2 godziny)"
      >
        <LineChart
          data={dailyUsageData}
          width={width - 80}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(255, 23, 68, ${opacity})`,
            labelColor: () => theme.textSecondary,
            backgroundGradientFrom: theme.surface,
            backgroundGradientTo: theme.surface,
          }}
          style={{ ...styles.chart, marginBottom: 16 }}
          withHorizontalLines={true}
          segments={4}
        />
        <View style={styles.limitIndicator}>
          <View style={[styles.limitLine, { backgroundColor: theme.primary }]} />
          <Text style={[styles.limitText, { color: theme.primary }]}>Limit dzienny: 2 godziny</Text>
        </View>
        <Text style={[styles.chartNote, { color: theme.textSecondary }]}>📉 Świetnie, większość dni poniżej limitu!</Text>
      </ChartSection>

      {/* Wykres czasu zaoszczędzonego 
      <ChartSection 
        title="Czas zaoszczędzony vs potencjalnie stracony" 
        subtitle="Godziny zaoszczędzone względem poprzedniego użycia"
      >
        <LineChart
          data={timeSavedData}
          width={width - 80}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 200, 83, ${opacity})`,
            labelColor: () => theme.textSecondary,
            backgroundGradientFrom: theme.surface,
            backgroundGradientTo: theme.surface,
          }}
          style={{ ...styles.chart, marginBottom: 16 }}
        />
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.success }]} />
            <Text style={[styles.legendText, { color: theme.text }]}>Zaoszczędzony czas</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: theme.textSecondary }]} />
            <Text style={[styles.legendText, { color: theme.text }]}>Potencjalnie stracony</Text>
          </View>
        </View>
        <Text style={[styles.chartNote, { color: theme.textSecondary }]}>💚 Zaoszczędziłeś {Math.floor((user?.totalTimeSaved || 1680) / 60)} godzin w tym miesiącu!</Text>
      </ChartSection>

      
      <ChartSection 
        title="Poprawa samopoczucia" 
        subtitle="Jak poprawiło się Twoje zdrowie psychiczne i fizyczne"
      >
        <ProgressChart
          data={wellbeingData}
          width={width - 80}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            ...wellbeingChartConfig,
            backgroundGradientFrom: theme.surface,
            backgroundGradientTo: theme.surface,
          }}
          hideLegend={false}
          style={{ ...styles.chart, marginBottom: 16 }}
        />
        <View style={styles.wellbeingGrid}>
          <View style={styles.wellbeingItem}>
            <Brain size={20} color={theme.success} />
            <Text style={[styles.wellbeingLabel, { color: theme.text }]}>Koncentracja</Text>
            <Text style={[styles.wellbeingValue, { color: theme.success }]}>85%</Text>
          </View>
          <View style={styles.wellbeingItem}>
            <Zap size={20} color={theme.warning} />
            <Text style={[styles.wellbeingLabel, { color: theme.text }]}>Energia</Text>
            <Text style={[styles.wellbeingValue, { color: theme.warning }]}>78%</Text>
          </View>
          <View style={styles.wellbeingItem}>
            <Heart size={20} color={theme.accent} />
            <Text style={[styles.wellbeingLabel, { color: theme.text }]}>Sen</Text>
            <Text style={[styles.wellbeingValue, { color: theme.accent }]}>92%</Text>
          </View>
          <View style={styles.wellbeingItem}>
            <Award size={20} color={theme.secondary} />
            <Text style={[styles.wellbeingLabel, { color: theme.text }]}>Nastrój</Text>
            <Text style={[styles.wellbeingValue, { color: theme.secondary }]}>88%</Text>
          </View>
        </View>
        <Text style={[styles.chartNote, { color: theme.textSecondary }]}>🌟 Wszystkie wskaźniki poprawiły się od początku Twojej drogi!</Text>
      </ChartSection>*/}

      {/* Osiągnięcia */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Trophy size={24} color={theme.primary} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Osiągnięcia</Text>
        </View>
        
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </View>

      {/* Cel 
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Target size={24} color={theme.secondary} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Cel</Text>
        </View>
        
        <View style={[styles.goalCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.goalTitle, { color: theme.text }]}>Osiągnij 30-dniową serię</Text>
          <Text style={[styles.goalProgress, { color: theme.textSecondary }]}>
            {user?.streak || 25}/30 dni
          </Text>
          <View style={[styles.goalProgressBar, { backgroundColor: theme.border }]}>
            <View 
              style={[
                styles.goalProgressFill, 
                { 
                  backgroundColor: theme.primary,
                  width: `${Math.min(((user?.streak || 25) / 30) * 100, 100)}%`
                }
              ]} 
            />
          </View>
        </View>
      </View>*/}

      

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    marginBottom: 80,
  },
  header: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 32,
  },
  profileContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  displayName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  levelText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginBottom: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  streakText: {
    color: 'white',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    width: '47%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
  },
  statIconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  statSubtitle: {
    fontSize: 10,
    textAlign: 'center',
  },
  chartSection: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  chartNote: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  limitIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 8,
  },
  limitLine: {
    width: 20,
    height: 2,
  },
  limitText: {
    fontSize: 12,
    fontWeight: '500',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
  },
  wellbeingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  wellbeingItem: {
    alignItems: 'center',
    gap: 4,
  },
  wellbeingLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  wellbeingValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  achievementCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
  },
  unlockedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlockedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  goalCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  goalProgress: {
    fontSize: 14,
    marginBottom: 12,
  },
  goalProgressBar: {
    height: 8,
    borderRadius: 4,
  },
  goalProgressFill: {
    height: 8,
    borderRadius: 4,
  },
  actionsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  summarySection: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 24,
    marginBottom: 100,
    overflow: 'hidden',
  },
  summaryGradient: {
    padding: 24,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
    opacity: 0.9,
  },
  summaryStats: {
    flexDirection: 'row',
    gap: 32,
  },
  summaryStatItem: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
  },
});