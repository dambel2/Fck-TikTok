import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Aperture, ArrowLeft, BookOpen, CheckCircle, Clock, Dot, Moon, UserPlus, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { View as RNView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const goalsList = [
  {
    label: 'Szersze doświadczanie życia',
    color: ['#FF6B35', '#FF6B35'],
    icon: <Clock size={28} color="#fff" />,
  },
  {
    label: 'Większa produktywność w pracy i nauce',
    color: ['#1976D2', '#1976D2'],
    icon: <CheckCircle size={28} color="#fff" />,
  },
  {
    label: 'Zdrowszy sen i regeneracja',
    color: ['#4CAF50', '#4CAF50'],
    icon: <Moon size={28} color="#fff" />,
  },
  {
    label: 'Lepsza koncentracja i pamięć',
    color: ['#6C2EB7', '#6C2EB7'],
    icon: <Aperture size={28} color="#fff" />,
  },
  {
    label: 'Więcej energii i motywacji do działania',
    color: ['#FF9800', '#FF9800'],
    icon: <Zap size={28} color="#fff" />,
  },
  {
    label: 'Więcej czasu na hobby i rozwój osobisty',
    color: ['#009688', '#009688'],
    icon: <BookOpen size={28} color="#fff" />,
  },
  {
    label: 'Lepsze relacje z rodziną i przyjaciółmi',
    color: ['#B71C1C', '#B71C1C'],
    icon: <UserPlus size={28} color="#fff" />,
  },
];


export default function GoalsScreen() {
  const [selected, setSelected] = useState([]);

  function toggleGoal(idx) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(sel =>
      sel.includes(idx) ? sel.filter(i => i !== idx) : [...sel, idx]
    );
  }

  const handleClick = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      router.push('/onboarding/rating');
    };

  return (
    <LinearGradient colors={["#181A2A", "#10132cff"]} style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Wybierz swoje cele</Text>
      </View>
      <Text style={styles.subheader}>Wybierz cele, które chcesz śledzić podczas swojego odwyku.</Text>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {goalsList.map((goal, idx) => (
          <TouchableOpacity key={idx} activeOpacity={0.85} onPress={() => toggleGoal(idx)}>
            <LinearGradient colors={goal.color} style={styles.goalCard}>
              <View style={styles.goalRow}>
                <View style={styles.iconWrap}>{goal.icon}</View>
                <Text style={styles.goalLabel}>{goal.label}</Text>
                <View style={styles.checkWrap}>
                  {selected.includes(idx) ? (
                    <RNView style={styles.checkedCircle}>
                      <Dot size={80} color={goal.color[0]} fill="#fff" />
                    </RNView>
                  ) : (
                    <View style={styles.uncheckedCircle} />
                  )}
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
        <View style={{ height: 120 }} />
      </ScrollView>
      <View style={styles.buttonBg}>
        <TouchableOpacity
          style={[styles.button, selected.length === 0 && styles.buttonDisabled]}
          onPress={handleClick}
          disabled={selected.length === 0}
        >
          <Text style={[styles.buttonText, selected.length === 0 && styles.buttonTextDisabled]}>Monitoruj te cele</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    position: 'relative',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  backBtn: {
    padding: 6,
    marginRight: 8,
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 0.2,
  },
  subheader: {
    color: '#fff',
    fontSize: 15,
    opacity: 0.7,
    marginBottom: 18,
    marginLeft: 18,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 120,
  },
  goalCard: {
    borderRadius: 32,
    marginBottom: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  goalLabel: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    flex: 1,
  },
  checkWrap: {
    marginLeft: 12,
  },
  checkedCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uncheckedCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
  },
  buttonBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#181A2A',
    paddingBottom: 48,
    paddingTop: 12,
    alignItems: 'center',
    zIndex: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 18,
    width: '92%',
    alignSelf: 'center',
    shadowColor: '#2EC4F1',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: '#bdbdbd',
    opacity: 0.7,
  },
  buttonText: {
    color: '#181A2A',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  buttonTextDisabled: {
    color: '#888',
  },
});
