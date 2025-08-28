import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false, }}>
      <Stack.Screen name="index" options={{ animation: 'none' }} />
      <Stack.Screen name="goals" />
      <Stack.Screen name="customPlan"/>
      <Stack.Screen name="quiz" />
      <Stack.Screen name="infoSlide" />
      <Stack.Screen name="paywall" />
      <Stack.Screen name="rating" />
      <Stack.Screen name="result" />
      <Stack.Screen name="register" />
      <Stack.Screen name="testimonials" />
      <Stack.Screen name="login" />
    </Stack>
  );
}