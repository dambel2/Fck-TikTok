import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, BadgeCheck } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const testimonials = [
  {
    name: 'Mateusz',
    // avatar: require('../../assets/images/michal.png'),
    title: 'W końcu mam kontrolę nad czasem',
    text: 'Ta aplikacja pomogła mi ograniczyć scrollowanie TikToka i skupić się na pracy oraz nauce. Czuję się bardziej produktywny i spokojny.',
  },
  {
    name: 'Maja',
    // avatar: require('../../assets/images/karolina.png'),
    title: 'Lepszy sen i mniej stresu',
    text: 'Dzięki regularnym przerwom od TikToka mój sen jest głębszy, a stres znacznie mniejszy. Wreszcie mogę naprawdę odpocząć po całym dniu.',
  },
  {
    name: 'Miłosz',
    // avatar: require('../../assets/images/tomek.png'),
    title: 'Zmieniłem swoje nawyki',
    text: 'Przestałem bezmyślnie scrollować. Ta aplikacja nauczyła mnie kontrolować czas w social mediach i bardziej cieszyć się realnym życiem.',
  },
  {
    name: 'Monika',
    // avatar: require('../../assets/images/anna.png'),
    title: 'Mniej rozpraszania, więcej koncentracji',
    text: 'Dzięki tej aplikacji moje dni są bardziej uporządkowane. Skupiam się na nauce i pracy, zamiast tracić godziny na bezsensowny scroll.',
  },
  {
    name: 'Maciek',
    // avatar: require('../../assets/images/lukasz.png'),
    title: 'Czuję się spokojniejszy i bardziej obecny',
    text: 'Aplikacja pomogła mi ograniczyć TikToka i odzyskać kontrolę nad moim czasem. Czuję się mniej przytłoczony i bardziej obecny w codziennym życiu.',
  },
];


export default function TestimonialsScreen() {

	const handleClick = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
		router.push('/onboarding/goals');
	};

	return (
		<LinearGradient colors={['#181A2A', '#032847ff', '#2EC4F1']} style={styles.container}>
			<View style={styles.headerRow}>
				<TouchableOpacity
					style={styles.backBtn}
					onPress={() => router.back()}>
					<ArrowLeft size={26} color="#fff" />
				</TouchableOpacity>
				<Text style={styles.header}>Co mówią użytkownicy</Text>
			</View>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}>
				{testimonials.map((item, idx) => (
					<View key={idx} style={styles.cardWrap}>
						<View style={styles.nameRow}>
							<View style={styles.avatar} />
							<Text style={styles.name}>{item.name}</Text>
							<BadgeCheck size={18} color="#43e97b" style={{ marginLeft: 6 }} />
						</View>
						<View style={styles.cardBubbleFixed}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.text}>{item.text}</Text>
						</View>
					</View>
				))}
				<View style={{ height: 120 }} />
			</ScrollView>
			<View style={styles.buttonBg}>
				<TouchableOpacity
					style={styles.button}
					onPress={handleClick}>
					<Text style={styles.buttonText}>Kontynuuj</Text>
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 58,
		position: 'relative',
	},
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 18,
		marginBottom: 24,
	},
	backBtn: {
		marginRight: 8,
	},
	header: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'left',
		letterSpacing: 0.2,
	},
	scrollContent: {
		paddingHorizontal: 18,
		paddingBottom: 120,
	},
	cardWrap: {
		marginBottom: 28,
	},
	nameRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
		marginLeft: 2,
	},
	name: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 15,
		marginRight: 2,
	},
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: '#111',
		marginRight: 12,
	},
	cardBubbleFixed: {
		backgroundColor: '#792edb73',
		borderTopLeftRadius: 0,
		borderTopRightRadius: 18,
		borderBottomLeftRadius: 18,
		borderBottomRightRadius: 18,
		padding: 16,
		shadowColor: '#000',
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 2,
		minWidth: 220,
		alignSelf: 'flex-start',
		marginLeft: 56,
		marginTop: 0,
	},
	title: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
		marginBottom: 12,
	},
	text: {
		color: '#fff',
		fontSize: 15,
		opacity: 0.92,
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
		backgroundColor: '#2EC4F1',
		borderRadius: 24,
		paddingVertical: 18,
		width: '92%',
		alignSelf: 'center',
		shadowColor: '#2EC4F1',
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
