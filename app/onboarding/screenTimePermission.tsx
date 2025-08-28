import { useRouter } from 'expo-router';
import React from 'react';
import { Button, NativeModules, StyleSheet, Text, View } from 'react-native';


export default function ScreenTimePermissionScreen() {
  const router = useRouter();

  const requestPermission = async () => {
    try {
      const granted = await NativeModules.ScreenTime.requestAuthorization();
      if (granted) {
        router.replace('/(tabs)'); // przekieruj dalej
      } else {
        // Obsłuż brak zgody
        alert('Musisz wyrazić zgodę, aby korzystać z funkcji monitorowania czasu TikToka.');
      }
    } catch (e) {
      alert('Wystąpił błąd podczas uzyskiwania zgody.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zgoda na monitorowanie czasu TikToka</Text>
      <Text style={styles.desc}>
        Potrzebujemy Twojej zgody na dostęp do Screen Time, aby wyświetlać statystyki TikToka w aplikacji.
      </Text>
      <Button title="Wyraź zgodę" onPress={requestPermission} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  desc: { fontSize: 16, textAlign: 'center', marginBottom: 24 },
});
