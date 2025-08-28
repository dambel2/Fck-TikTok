import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, CircleCheck as CheckCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';


type QuizAnswers = { [key: string]: any; };
const questions = [
  
  {
    id: 'gender',
    question: 'Jaka jest Twoja płeć?',
    options: [
      { id: 'male', label: 'Mężczyzna', value: 'Mężczyzna' },
      { id: 'female', label: 'Kobieta', value: 'Kobieta' },
      { id: 'other', label: 'Inna / nie chcę podawać', value: 'Inna' },
    ],
  },
  {
    id: 'dailyUsage',
    question: 'Ile czasu średnio spędzasz dziennie na TikToku?',
    options: [
      { id: 'less1h', label: 'Mniej niż 1 godzinę', value: '<1h' },
      { id: '1-2h', label: '1-2 godziny', value: '1-2h' },
      { id: '2-4h', label: '2-4 godziny', value: '2-4h' },
      { id: '4h+', label: 'Ponad 4 godziny', value: '>4h' },
    ],
  },
  {
    id: 'scrollTime',
    question: 'Kiedy najczęściej scrollujesz TikToka?',
    options: [
      { id: 'morning', label: 'Rano', value: 'Rano' },
      { id: 'afternoon', label: 'Po południu', value: 'Po południu' },
      { id: 'evening', label: 'Wieczorem', value: 'Wieczorem' },
      { id: 'night', label: 'W nocy', value: 'W nocy' },
      { id: 'always', label: 'O każdej porze', value: 'O każdej porze' },
    ],
  },
  {
    id: 'feelingAfter',
    question: 'Co czujesz po dłuższej sesji scrollowania?',
    options: [
    { id: 'sad', label: 'Przygnębienie', value: 'Przygnębienie' },
      { id: 'tired', label: 'Zmęczenie', value: 'Zmęczenie' },
      { id: 'guilty', label: 'Poczucie winy', value: 'Poczucie winy' },
      { id: 'neutral', label: 'Nic szczególnego', value: 'Nic szczególnego' }, 
    ],
  },
  {
    id: 'sleepImpact',
    question: 'Jak TikTok wpływa na Twój sen?',
    options: [
        { id: 'noSleep', label: 'Nie pozwala zasnąć', value: 'Nie pozwala zasnąć' },
        { id: 'worse', label: 'Pogarsza jakość snu', value: 'Pogarsza jakość snu' },
        { id: 'delay', label: 'Trochę opóźnia zasypianie', value: 'Trochę opóźnia zasypianie' },
        { id: 'noImpact', label: 'Nie wpływa', value: 'Nie wpływa' },
    ],
  },
  {
    id: 'autoOpen',
    question: 'Czy zdarza Ci się nieświadomie włączać TikToka z przyzwyczajenia?',
    options: [
      { id: 'often', label: 'Często', value: 'Często' },
      { id: 'sometimes', label: 'Czasami', value: 'Czasami' },
      { id: 'rarely', label: 'Rzadko', value: 'Rzadko' },
      { id: 'never', label: 'Nigdy', value: 'Nigdy' },
    ],
  },
  {
    id: 'procrastination',
    question: 'Czy zamiast pracować lub uczyć się, otwierasz TikToka?',
    options: [
      { id: 'yes', label: 'Tak, często', value: 'Tak' },
      { id: 'sometimes', label: 'Czasami', value: 'Czasami' },
      { id: 'no', label: 'Nie', value: 'Nie' },
    ],
  },
  {
    id: 'concentration',
    question: 'Czy zauważyłeś zmiany w umiejętności koncentracji?',
    options: [
      { id: 'totally', label: 'Wogle nie mogę się skupić', value: 'Wogle nie mogę się skupić' },
      { id: 'worse', label: 'Pogorszyła się', value: 'Pogorszyła się' },
      { id: 'same', label: 'Nie, bez zmian', value: 'Bez zmian' },
    ],
  },
  {
    id: 'trigger',
    question: 'Co najczęściej sprawia, że zaczynasz scrollować TikToka?',
    options: [
      { id: 'boredom', label: 'Nuda', value: 'Nuda' },
      { id: 'stress', label: 'Stres', value: 'Stres' },
      { id: 'habit', label: 'Nawyk', value: 'Nawyk' },
      { id: 'curiosity', label: 'Ciekawość', value: 'Ciekawość' },
    ],
  },
  {
    id: 'energy',
    question: 'Czy czujesz się wiecznie zmęczony i pozbawiony energii?',
    options: [
      { id: 'yes', label: 'Tak', value: 'Tak' },
      { id: 'sometimes', label: 'Czasami', value: 'Czasami' },
      { id: 'no', label: 'Nie', value: 'Nie' },
    ],
  },
  {
    id: 'triedLimit',
    question: 'Czy próbowałeś wcześniej ograniczyć czas w social mediach?',
    options: [
        { id: 'partial', label: 'Próbowałem, ale bez sukcesu', value: 'Bez sukcesu' },
      { id: 'yes', label: 'Tak, próbowałem', value: 'Tak' },
      { id: 'no', label: 'Nie próbowałem', value: 'Nie' },
      
    ],
  },
  {
    id: 'motivation',
    question: 'Na ile jesteś zmotywowany, żeby zmienić swoje nawyki? (1–5)',
    options: [
      { id: '1', label: '1 – wcale', value: 1 },
      { id: '2', label: '2', value: 2 },
      { id: '3', label: '3', value: 3 },
      { id: '4', label: '4', value: 4 },
      { id: '5', label: '5 – bardzo', value: 5 },
    ],
  },
];

export default function QuizScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  // Animacja progress bara
  const progressValue = useSharedValue(((0 + 1) / questions.length) * 100);
  useEffect(() => {
    progressValue.value = withTiming(((currentQuestion + 1) / questions.length) * 100, { duration: 400 });
  }, [currentQuestion, progressValue]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));

  // Animacja wejścia opcji
  const optionX1 = useSharedValue(50);
  const optionX2 = useSharedValue(50);
  const optionX3 = useSharedValue(50);
  const optionX4 = useSharedValue(50);
  const optionX5 = useSharedValue(50);

  useEffect(() => {
    // Reset i animacja wejścia opcji z prawej strony
    [optionX1, optionX2, optionX3, optionX4, optionX5].forEach((sharedValue, index) => {
      sharedValue.value = 50;
      sharedValue.value = withTiming(0, { duration: 800 + index * 80 });
    });
  }, [currentQuestion, optionX1, optionX2, optionX3, optionX4, optionX5]);

  const animatedOption1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: optionX1.value }],
    opacity: interpolate(optionX1.value, [50, 0], [0, 1], Extrapolate.CLAMP),
  }));
  const animatedOption2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: optionX2.value }],
    opacity: interpolate(optionX2.value, [50, 0], [0, 1], Extrapolate.CLAMP),
  }));
  const animatedOption3Style = useAnimatedStyle(() => ({
    transform: [{ translateX: optionX3.value }],
    opacity: interpolate(optionX3.value, [50, 0], [0, 1], Extrapolate.CLAMP),
  }));
  const animatedOption4Style = useAnimatedStyle(() => ({
    transform: [{ translateX: optionX4.value }],
    opacity: interpolate(optionX4.value, [50, 0], [0, 1], Extrapolate.CLAMP),
  }));
  const animatedOption5Style = useAnimatedStyle(() => ({
    transform: [{ translateX: optionX5.value }],
    opacity: interpolate(optionX5.value, [50, 0], [0, 1], Extrapolate.CLAMP),
  }));

  const optionStyles = [animatedOption1Style, animatedOption2Style, animatedOption3Style, animatedOption4Style, animatedOption5Style];

  // shared value dla animacji nacisku
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleAnswer = (optionValue: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    
    const questionId = question.id as keyof QuizAnswers;
    setAnswers({ ...answers, [questionId]: optionValue });

    // animacja kliknięcia
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    // Przejście do następnego pytania
    setTimeout(() => {
      if (isLastQuestion) {
        AsyncStorage.setItem('quizAnswers', JSON.stringify({ ...answers, [question.id]: optionValue }));
        router.push('/onboarding/result');
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 450);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentQuestion === 0) {
      router.back();
    } else {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      'Pomiń quiz',
      'Czy na pewno chcesz pominąć quiz? Wyniki pomogą lepiej dopasować program.',
      [
        { text: 'Anuluj', style: 'cancel' },
        { text: 'Pomiń', style: 'destructive', onPress: () => router.push('/onboarding/register') },
      ]
    );
  };

  const isAnswerSelected = (optionValue: any) => {
    const questionId = question.id as keyof QuizAnswers;
    const currentAnswer = answers[questionId];
    return currentAnswer === optionValue;
  };

  return (
    <LinearGradient colors={['#000000', '#1A0A1A', '#FF1744']} style={styles.container} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      {/* HEADER BACK + PROGRESS */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, animatedProgressStyle]}>
                <LinearGradient
                  colors={["#FF1744", "#2EC4F1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.questionNumber}>Pytanie {currentQuestion + 1}</Text>
        <Text style={styles.questionText}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((option, idx) => (
            <Animated.View key={option.id} style={[animatedStyle, optionStyles[idx]]}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: isAnswerSelected(option.value) ? '#fff' : 'rgba(255,255,255,0.08)',
                    borderColor: isAnswerSelected(option.value) ? '#fff' : 'rgba(255,255,255,0.18)',
                  },
                ]}
                onPress={() => handleAnswer(option.value)}
              >
                <Text style={[styles.optionText, { color: isAnswerSelected(option.value) ? '#FF1744' : '#fff' }]}>
                  {option.label}
                </Text>
                {isAnswerSelected(option.value) && <CheckCircle size={20} color="#FF6B35" />}
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* SKIP TEST */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Pomiń test →</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 16 },
  backButton: { padding: 8 },
  progressBarContainer: { flex: 1, marginLeft: 16, borderRadius: 4, overflow: 'hidden' },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)' },
  progressFill: { height: 8, borderRadius: 4 },
  content: { flex: 1, paddingHorizontal: 24 },
  questionNumber: { fontSize: 16, color: 'white', opacity: 0.7, marginBottom: 8 },
  questionText: { fontSize: 28, fontWeight: '700', color: 'white', marginBottom: 32, lineHeight: 36 },
  optionsContainer: { gap: 16, paddingBottom: 20 },
  optionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderRadius: 16, borderWidth: 2 },
  optionText: { fontSize: 16, fontWeight: '600', flex: 1 },
  footer: { paddingHorizontal: 24, paddingBottom: 40, alignItems: 'center' },
  skipText: { fontSize: 14, color: 'white', opacity: 0.7, marginTop: 12},
});