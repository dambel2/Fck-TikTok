import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { CheckCircle2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  { key: 1, img: require('../../assets/images/partial-react-logo.png') },
  { key: 2, img: require('../../assets/images/partial-react-logo.png') },
  { key: 3, img: require('../../assets/images/partial-react-logo.png') },
];

const benefits = [
  'Blokuj dostęp do TikToka za pomocą specjalnych narzędzi',
  'Śledz swój progres na przestrzeni czasu',
  'Wypełniaj swoje cele odnośnie ograniczenia czasu na scrollowanie',
  'Osiągaj wyższe poziomy, dzięki wypełnianiu celów',
];

export default function PaywallScreen() {
  const [plan, setPlan] = useState<'annual' | 'monthly'>('annual');
  const [slideIdx, setSlideIdx] = useState(0);
  const router = useRouter();

    const handleClick = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        router.push('/(tabs)');
    };

  return (
    <LinearGradient colors={[  '#951f99ff','#181A2A', '#234A8C' ]} style={styles.container} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>ŚLEDZ SWÓJ PROGRES</Text>
        <View style={styles.sliderWrap}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={e => {
              const idx = Math.round(e.nativeEvent.contentOffset.x / width);
              setSlideIdx(idx);
            }}
            scrollEventThrottle={16}
          >
            {slides.map((s, idx) => (
              <View key={s.key} style={[styles.slide, { width }]}> 
                <Image source={s.img} style={styles.slideImg} resizeMode="contain" />
              </View>
            ))}
          </ScrollView>
          <View style={styles.dotsRow}>
            {slides.map((_, idx) => (
              <View key={idx} style={[styles.dot, slideIdx === idx && styles.dotActive]} />
            ))}
          </View>
        </View>
        <View style={styles.benefitsWrap}>
          {benefits.map((b, idx) => (
            <View key={idx} style={styles.benefitRow}>
              <CheckCircle2 size={22} color="#2EC4F1" style={{ marginRight: 8 }} />
              <Text style={styles.benefitText}>{b}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomSection}>
        <View style={styles.planOptionWrapper}>
          <View style={[styles.discountBar, { backgroundColor: plan === 'annual' ? '#8F2FFF' : 'rgba(255, 255, 255, 0.48)' }] }>
            <Text style={styles.discountBarText}>OSZCZĘDŹ 60%</Text>
          </View>
          <TouchableOpacity
            style={[styles.planOption, plan === 'annual' && styles.planOptionActive]}
            onPress={() => setPlan('annual')}
          >
            <View style={styles.planLeft}>
              <Text style={[styles.planTitle, plan === 'annual' && styles.planTitleActive]}>Rocznie</Text>
              <Text style={[styles.planSub, plan === 'annual' && styles.planSubActive]}>12mo · 149,99 zł</Text>
            </View>
            <Text style={[styles.planPrice, plan === 'annual' && styles.planPriceActive]}>12,50 zł/mo</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.planOption, styles.monthlyOption, plan === 'monthly' && styles.planOptionActive]}
          onPress={() => setPlan('monthly')}
        >
          <View style={styles.planLeft}>
            <Text style={[styles.planTitle, plan === 'monthly' && styles.planTitleActive]}>Miesięcznie</Text>
          </View>
          <Text style={[styles.planPrice, plan === 'monthly' && styles.planPriceActive]}>29,99 zł/mo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClick} style={styles.ctaBtn} activeOpacity={0.85}>
          <LinearGradient
            colors={['#8F2FFF', '#2EC4F1']}
            style={styles.ctaBtn}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.ctaText}>SKORZYSTAJ Z OFERTY</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.bottomTextRow}>
          <Text style={styles.bottomText}>Zrezygnuj w każdej chwili</Text>
          <Text style={styles.bottomText}>•</Text>
          <Text style={styles.bottomText}>Gwarancja zwrotu pieniędzy</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingTop: 70,
    paddingBottom: 360,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
  },
  sliderWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  slide: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImg: {
    width: 180,
    height: 180,
    borderRadius: 18,
    backgroundColor: '#222',
    opacity: 0.7,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    opacity: 0.3,
    marginHorizontal: 3,
  },
  dotActive: {
    opacity: 1,
    backgroundColor: '#8F2FFF',
  },
  benefitsWrap: {
    marginTop: 12,
    marginBottom: 24,
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(24, 26, 42, 0.95)',
    paddingTop: 18,
    paddingBottom: 32,
    alignItems: 'center',
    zIndex: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  planOptionWrapper: {
    width: '92%',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 12,
    overflow: 'hidden',
  },
  planOption: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  monthlyOption: {
    width: '92%',
    marginTop: 0,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  planOptionActive: {
    borderColor: '#8F2FFF',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  planLeft: {
    flexDirection: 'column',
  },
  planTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 2,
  },
  planTitleActive: {
    color: '#fff',
  },
  planSub: {
    color: '#fff',
    fontSize: 13,
    opacity: 0.7,
  },
  planSubActive: {
    color: '#fff',
    opacity: 0.9,
  },
  planPrice: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  planPriceActive: {
    color: '#fff',
  },
  discountBar: {
    width: '100%',
    backgroundColor: '#8F2FFF',
    paddingVertical: 6,
    alignItems: 'center',
    marginBottom: 0,
  },
  discountBarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  ctaBtn: {
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 18,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 4,
    shadowColor: '#8F2FFF',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  ctaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  bottomTextRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
  },
  bottomText: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.6,
    marginHorizontal: 4,
  },
});
