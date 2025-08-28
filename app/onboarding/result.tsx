import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Defs, Path, Stop, LinearGradient as SvgGradient, Text as SvgText } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

const TEXTS = [
  'Analizuję Twoje odpowiedzi...',
  'Tworzę spersonalizowany plan...',
  'Wyciągam wnioski...',
  'Sprawdzam Twój poziom uzależnienia...',
  'Przygotowuję rekomendacje...',
  'Analiza stylu korzystania...',
  'Ocenianie motywacji...',
  'Tworzę podsumowanie...',
];

export default function ResultScreen() {
  const [percent, setPercent] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setPercent(p);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setShowAnalysis(true), 500);
      }
    }, 60); // slower animation
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showAnalysis) {
      const textInterval = setInterval(() => {
        setTextIndex((i) => (i + 1) % TEXTS.length);
      }, 1400);
      return () => clearInterval(textInterval);
    }
  }, [showAnalysis]);

  // Circle animation
  const radius = 90;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const progress = percent / 100;

  const handleClick = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      router.push('/onboarding/register');
  };

  return (
    <LinearGradient colors={["#000000", "#1A0A1A", "#FF1744"]} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      {!showAnalysis && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
          <View style={styles.circleContainer}>
            <Svg width={200} height={200}>
              <Circle
                cx={100}
                cy={100}
                r={radius}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Defs>
                <SvgGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0%" stopColor="#43e97b" />
                  <Stop offset="100%" stopColor="#38f9d7" />
                </SvgGradient>
              </Defs>
              <Circle
                cx={100}
                cy={100}
                r={radius}
                stroke="url(#greenGradient)"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={`${circumference * (1 - progress)}`}
                strokeLinecap="round"
              />
            </Svg>
            <Text style={styles.percent}>{percent}%</Text>
          </View>
          <Text style={styles.heroText}>Analizowanie</Text>
          <Text style={styles.animatedText}>{TEXTS[textIndex]}</Text>
        </View>
      )}
      {showAnalysis && (
        <>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false} 
            style={{ flex: 1 }}
          >
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <View style={styles.glassCard}>
                <Text style={styles.premiumTitle}>Twoja analiza TikTok</Text>
                <Text style={styles.premiumSubtitle}>Personalne statystyki i prognozy oparte na Twoich odpowiedziach</Text>
              </View>
            </View>

            {/* Usage Comparison Card */}
            <View style={styles.cardContainer}>
              <LinearGradient colors={['rgba(255,23,68,0.15)', 'rgba(46,196,241,0.05)']} style={styles.modernCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Intensywność korzystania</Text>
                </View>
                <ModernBarChart userScore={76} avgScore={40} />
                <View style={styles.insightBox}>
                  <Text style={styles.insightText}>
                    Korzystasz z TikToka <Text style={styles.highlightRed}>36% intensywniej</Text> niż przeciętny użytkownik
                  </Text>
                </View>
              </LinearGradient>
            </View>

            {/* Time Recovery Card */}
            <View style={styles.cardContainer}>
              <LinearGradient colors={['rgba(46,196,241,0.15)', 'rgba(143,47,255,0.05)']} style={styles.modernCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle1}>Ile życia przescrollujesz</Text>
                </View>
                <FuturisticLineChart avgDaily={2.5} reducedDaily={0.5} />
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>18 250</Text>
                    <Text style={styles.statLabel}>godzin do odzyskania</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>12.3</Text>
                    <Text style={styles.statLabel}>lat życia</Text>
                  </View>
                </View>
                <View style={styles.insightBox}>
                  <Text style={styles.insightText}>
                    Z naszą aplikacją możesz przeznaczyć <Text style={styles.highlightBlue}>+18 250 godzin</Text> na rozwój, pasje i relacje!
                  </Text>
                </View>
              </LinearGradient>
            </View>

            {/* Impact Card */}
            <View style={styles.cardContainer}>
              <LinearGradient colors={['rgba(143,47,255,0.15)', 'rgba(255,215,0,0.05)']} style={styles.modernCard}>
                <Text style={styles.cardTitle1}>Przewidywany wpływ</Text>
                <View style={styles.impactGrid}>
                  <ImpactMetric icon="⚡" label="Energia" value="+85%" color="#FFD600" />
                  <ImpactMetric icon="🎯" label="Koncentracja" value="+70%" color="#2EC4F1" />
                  <ImpactMetric icon="😌" label="Samopoczucie" value="+65%" color="#8F2FFF" />
                  <ImpactMetric icon="🚀" label="Produktywność" value="+90%" color="#FF1744" />
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.disclaimer}>
              * Wyniki są orientacyjne i nie stanowią diagnozy medycznej
            </Text>
          </ScrollView>
          
          <View style={styles.premiumButtonWrap}>
            <TouchableOpacity style={styles.premiumButton} onPress={handleClick} activeOpacity={0.9}>
              <LinearGradient colors={['#2EC4F1', '#8F2FFF']} style={styles.buttonGradient} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
                <Text style={styles.premiumButtonText}>Rozpocznij transformację</Text>
                <Text style={styles.premiumButtonSubtext}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0A1A',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 64,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    height: 220,
  },
  percent: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
    heroText: {
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
  animatedText: {
    fontSize: 18,
    color: '#c5c5c5ff',
    textAlign: 'center',
    marginBottom: 24,
    minHeight: 24,
  },
  analysisTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  analysisDesc: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.85,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 40,
    marginBottom: 12,
    marginTop: 12,
  },
  barWrap: {
    alignItems: 'center',
  },
  bar: {
    width: 48,
    borderRadius: 12,
    backgroundColor: '#FF1744',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 8,
  },
  barAvg: {
    backgroundColor: '#02b84eff',
  },
  barLabel: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  barDesc: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  analysisText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  noteText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#2EC4F1',
    borderRadius: 32,
    paddingVertical: 20,
    paddingHorizontal: 36,
    marginTop: 40 ,
    alignItems: 'center',
    shadowColor: '#2EC4F1',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
    width: '100%',
    alignSelf: 'center',
  },
  stickyButtonWrap: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    width: '100%',
  },
  premiumTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  premiumSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  modernCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    width: '100%',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 80,
    textAlign: 'center',
  },
  cardTitle1: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  impactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  impactItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  impactIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  impactLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 4,
  },
  impactValue: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  modernChartContainer: {
    marginVertical: 20,
    alignItems: 'center',
    paddingVertical: 16,
  },
  modernChartRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 40,
    paddingBottom: 16,
    height: 240,
    paddingTop: 30, // Increased to move bars lower
  },
  modernBarWrap: {
    alignItems: 'center',
    gap: 4,
    height: '100%',
    justifyContent: 'flex-end',
  },
  modernBar: {
    width: 60,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  userBar: {
    borderWidth: 2,
    borderColor: 'rgba(255, 23, 68, 0.3)',
  },
  avgBar: {
    borderWidth: 2,
    borderColor: 'rgba(46, 196, 241, 0.3)',
  },
  barGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  modernBarLabel: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 2,
  },
  modernBarDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 1,
  },
  futuristicChartContainer: {
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 20,
    padding: 16,
  },
  modernLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 16,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '500',
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  badge: {
    backgroundColor: 'rgba(255, 23, 68, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 23, 68, 0.3)',
  },
  badgeText: {
    color: '#FF1744',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  insightBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  insightText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  highlightRed: {
    color: '#FF1744',
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 16,
  },
  highlightBlue: {
    color: '#2EC4F1',
    fontWeight: '700',
  },
  disclaimer: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 120,
    lineHeight: 16,
    paddingHorizontal: 8,
  },
  premiumButtonWrap: {
    position: 'absolute',
    bottom: 42,
    left: 16,
    right: 16,
  },
  premiumButton: {
    borderRadius: 28,
    shadowColor: '#2EC4F1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  premiumButtonSubtext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300',
  },
});

// Modern 3D Bar Chart with glass effect
function ModernBarChart({ userScore = 74, avgScore = 40 }) {
  const userBar = useSharedValue(0);
  const avgBar = useSharedValue(0);

  React.useEffect(() => {
    userBar.value = withTiming(userScore, { duration: 1200 });
    avgBar.value = withTiming(avgScore, { duration: 1200 });
  }, [userScore, avgScore, userBar, avgBar]);

  const userBarStyle = useAnimatedStyle(() => ({
    height: Math.max(userBar.value * 3.5, 50),
    marginTop: Math.max(0, (100 - userBar.value) * 3.5), // Align to bottom
  }));
  
  const avgBarStyle = useAnimatedStyle(() => ({
    height: Math.max(avgBar.value * 3.5, 50),
    marginTop: Math.max(0, (100 - avgBar.value) * 3.5), // Align to bottom
  }));

  return (
    <View style={styles.modernChartContainer}>
      <View style={styles.modernChartRow}>
        <View style={styles.modernBarWrap}>
          <Animated.View style={[styles.modernBar, styles.userBar, userBarStyle]}>
            <LinearGradient colors={['#FF1744', '#FF6B6B']} style={styles.barGradient}>
            </LinearGradient>
          </Animated.View>
          <Text style={styles.modernBarLabel}>{userScore}%</Text>
          <Text style={styles.modernBarDesc}>Twój wynik</Text>
        </View>
        <View style={styles.modernBarWrap}>
          <Animated.View style={[styles.modernBar, styles.avgBar, avgBarStyle]}>
            <LinearGradient colors={['#2EC4F1', '#4ECDC4']} style={styles.barGradient}>
            </LinearGradient>
          </Animated.View>
          <Text style={styles.modernBarLabel}>{avgScore}%</Text>
          <Text style={styles.modernBarDesc}>Przeciętny</Text>
        </View>
      </View>
    </View>
  );
}

// Futuristic Line Chart with animated paths
function FuturisticLineChart({ avgDaily = 2.5, reducedDaily = 0.5 }) {
  const years = 20;
  const points = Array.from({ length: years + 1 }, (_, i) => i);
  const hoursNoApp = points.map(y => Math.round(avgDaily * 365 * y));
  const hoursWithApp = points.map(y => Math.round(reducedDaily * 365 * y));
  const maxHours = Math.max(...hoursNoApp);
  const chartHeight = 160;
  const chartWidth = screenWidth - 120; // Responsive width with padding
  const padding = 20;

  const getY = (h: number) => chartHeight - (h / maxHours) * chartHeight + padding;
  const getX = (i: number) => (i / years) * chartWidth + padding;

  const noAppLine = hoursNoApp.map((h, i) => `${i === 0 ? 'M' : 'L'}${getX(i)},${getY(h)}`).join(' ');
  const withAppLine = hoursWithApp.map((h, i) => `${i === 0 ? 'M' : 'L'}${getX(i)},${getY(h)}`).join(' ');
  const noAppArea = `${noAppLine} L${getX(years)},${chartHeight + padding} L${getX(0)},${chartHeight + padding} Z`;

  return (
    <View style={styles.futuristicChartContainer}>
      <Svg width={chartWidth + (padding * 2)} height={chartHeight + 60}>
        <Defs>
          <SvgGradient id="redGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#FF1744" />
            <Stop offset="100%" stopColor="#FF6B6B" />
          </SvgGradient>
          <SvgGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#2EC4F1" />
            <Stop offset="100%" stopColor="#4ECDC4" />
          </SvgGradient>
          <SvgGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FF1744" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#FF1744" stopOpacity="0.05" />
          </SvgGradient>
        </Defs>
        
        {/* Grid */}
        {[1, 2, 3, 4].map(i => (
          <Path
            key={i}
            d={`M${padding},${padding + (chartHeight / 4) * i} L${chartWidth + padding},${padding + (chartHeight / 4) * i}`}
            stroke="#fff"
            strokeWidth={0.8}
            opacity={0.08}
            strokeDasharray="4,8"
          />
        ))}
        
        {/* Area fill */}
        <Path d={noAppArea} fill="url(#areaGradient)" />
        
        {/* Lines with glow effect */}
        <Path d={noAppLine} stroke="url(#redGradient)" strokeWidth={3} fill="none" strokeLinecap="round" />
        <Path d={withAppLine} stroke="url(#blueGradient)" strokeWidth={3} fill="none" strokeLinecap="round" />
        
        {/* Data points */}
        <Circle cx={getX(0)} cy={getY(hoursNoApp[0])} r={5} fill="#FF1744" />
        <Circle cx={getX(years)} cy={getY(hoursNoApp[years])} r={5} fill="#FF6B6B" />
        <Circle cx={getX(0)} cy={getY(hoursWithApp[0])} r={5} fill="#2EC4F1" />
        <Circle cx={getX(years)} cy={getY(hoursWithApp[years])} r={5} fill="#4ECDC4" />
        
        {/* Labels */}
        <SvgText x={padding} y={15} fontSize={11} fill="#fff" opacity={0.7}>Godziny</SvgText>
        <SvgText x={chartWidth - 10} y={chartHeight + 45} fontSize={11} fill="#fff" opacity={0.7}>20 lat</SvgText>
      </Svg>
      
      <View style={styles.modernLegend}>
        <View style={styles.legendItem}>
          <LinearGradient colors={['#FF1744', '#FF6B6B']} style={styles.legendDot} />
          <Text style={styles.legendText}>Bez aplikacji</Text>
        </View>
        <View style={styles.legendItem}>
          <LinearGradient colors={['#2EC4F1', '#4ECDC4']} style={styles.legendDot} />
          <Text style={styles.legendText}>Z aplikacją</Text>
        </View>
      </View>
    </View>
  );
}

// Impact Metric Component
function ImpactMetric({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <View style={styles.impactItem}>
      <Text style={styles.impactIcon}>{icon}</Text>
      <Text style={styles.impactLabel}>{label}</Text>
      <Text style={[styles.impactValue, { color }]}>{value}</Text>
    </View>
  );
}
