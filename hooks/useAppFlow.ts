import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

type AppFlow = 'onboarding' | 'registered' | 'customPlan' | 'main' | 'loading';

export function useAppFlow() {
  const [flow, setFlow] = useState<AppFlow>('loading');

  useEffect(() => {
    async function checkFlow() {
      // Spróbuj odczytać sesję z AsyncStorage
      const sessionString = await AsyncStorage.getItem('supabase.session');
      if (sessionString) {
        const session = JSON.parse(sessionString);
        await supabase.auth.setSession(session);
        console.log('Session from AsyncStorage:', session);
      }

      // Pobierz sesję z Supabase
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      console.log('Session from supabase:', sessionData, sessionError);

      // Pobierz usera z Supabase
      const { data: userData, error: userError } = await supabase.auth.getUser();
      console.log('User from supabase:', userData, userError);

      const user = userData?.user;
      if (!user) {
        setFlow('onboarding');
        return;
      }

      // Pobierz profil z Supabase
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('onboardingCompleted, isPaid')
        .eq('id', user.id)
        .single();
      console.log('Profile from supabase:', profile, profileError);
      if (!profile) {
        setFlow('onboarding');
        return;
      }
      if (!profile.onboardingCompleted) {
        setFlow('registered');
        return;
      }
      if (profile.isPaid) {
        setFlow('main');
      } else {
        setFlow('customPlan');
      }
    }
    checkFlow();
  }, []);

  return flow;
}