import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as StoreReview from 'expo-store-review';
import { ArrowLeft, Star } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

const reviews = [
  {
    name: 'Kamil Nowak',
    username: '@kamiln',
    //avatar: require('../../assets/images/user1.png'),
    text: '"Świetna aplikacja! Dzięki niej ograniczyłem scrollowanie do minimum. Mam w końcu więcej czasu na naukę i sport."',
  },
  {
    name: 'Anna Kowalczyk',
    username: '@aniak',
    //avatar: require('../../assets/images/user2.png'),
    text: '"Na początku byłam sceptyczna, ale system przypomnień naprawdę działa. Czuję się spokojniejsza i mniej zestresowana."',
  },
  {
    name: 'Piotr Majewski',
    username: '@piotrm',
    //avatar: require('../../assets/images/user3.png'),
    text: '"Nie sądziłem, że to możliwe, ale już po tygodniu zauważyłem różnicę. Jestem bardziej skoncentrowany w pracy i szybciej wykonuję zadania."',
  },
  {
    name: 'Magda Wiśniewska',
    username: '@magdaw',
    //avatar: require('../../assets/images/user4.png'),
    text: '"Najlepsza decyzja! Aplikacja pomogła mi odzyskać sen i teraz kładę się spać bez telefonu w ręku."',
  },
  {
    name: 'Tomasz Zieliński',
    username: '@tomaszz',
    //avatar: require('../../assets/images/user5.png'),
    text: '"Super pomysł i świetne wykonanie. Widzę swój progres i naprawdę czuję, że wracam do normalnego życia."',
  },
];

export default function RatingScreen() {
  const { completeOnboarding } = useAuth();
  const router = useRouter();
  const [rating, setRating] = useState(5);

  useEffect(() => {
    StoreReview.requestReview();
  }, []);

  const handleClick = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    const success = await completeOnboarding();
    if (success) {
      router.push('/onboarding/customPlan');
    }
    
  };

  return (
    <LinearGradient colors={['#000', '#1A0A1A', '#200720ff', '#FF1744']} style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={26} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.starsWrap}>
        <Text style={styles.starsTitle}>Daj nam ocenę!</Text>
        
        <Text style={styles.starsDesc}>Ta aplikacja została stworzona dla osób takich jak Ty.</Text>
        <View style={styles.peopleRow}>
          <Image source={require('../../assets/images/icon.png')} style={styles.peopleAvatar} />
          <Image source={require('../../assets/images/icon.png')} style={styles.peopleAvatar} />
          <Image source={require('../../assets/images/icon.png')} style={styles.peopleAvatar} />
          <Text style={styles.peopleText}>+1 000 osób</Text>
        </View>
      </View>
      <ScrollView style={styles.reviewsWrap} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {reviews.map((r, idx) => (
          <View key={idx} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={require('../../assets/images/icon.png')} style={styles.reviewAvatar} />
              <View>
                <Text style={styles.reviewName}>{r.name}</Text>
                <Text style={styles.reviewUsername}>{r.username}</Text>
              </View>
              <View style={styles.reviewStarsRow}>
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={18} color="#FFD600" fill="#FFD600" style={{ marginHorizontal: 1 }} />
                ))}
              </View>
            </View>
            <Text style={styles.reviewText}>{r.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonBg}>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Dalej</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 0.2,
  },
  starsWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },
  starsTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 8,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  starsDesc: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 18,
  },
  peopleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  peopleAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#222',
    marginRight: 4,
  },
  peopleText: {
    color: '#fff',
    fontSize: 15,
    opacity: 0.7,
    marginLeft: 6,
  },
  reviewsWrap: {
    paddingHorizontal: 18,
    marginBottom: 120,
  },
  reviewCard: {
    backgroundColor: '#181A2A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#222',
    marginRight: 10,
  },
  reviewName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  reviewUsername: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.7,
  },
  reviewStarsRow: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  reviewText: {
    color: '#fff',
    fontSize: 15,
    opacity: 0.92,
    marginTop: 2,
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
    backgroundColor: '#FF1744',
    borderRadius: 24,
    paddingVertical: 18,
    width: '92%',
    alignSelf: 'center',
    shadowColor: '#FF1744',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
