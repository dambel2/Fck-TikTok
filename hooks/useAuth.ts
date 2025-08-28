import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Rejestracja użytkownika
  const register = async ({ username, email, password }: { username: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });
      if (supabaseError) {
        setError(supabaseError.message);
        console.log('Supabase error:', supabaseError);
        setLoading(false);
        return false;
      }
      // Zapisz tylko właściwe pola sesji do AsyncStorage (bez user)
      if (data.session) {
        const { user, ...sessionToSave } = data.session;
        await AsyncStorage.setItem('supabase.session', JSON.stringify(sessionToSave));
      }
      setLoading(false);
      return true;
    } catch (err) {
      setError('Wystąpił błąd podczas rejestracji.');
      console.log('Register catch error:', err);
      setLoading(false);
      return false;
    }
  };

  // Logowanie użytkownika
  async function login({ email, password }: { email: string; password: string }) {
    setLoading(true);
    setError(null);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return false;
      }
      // Zapisz sesję do AsyncStorage (tak jak przy rejestracji)
      if (data && data.session) {
        const { user, ...sessionToSave } = data.session;
        await AsyncStorage.setItem('supabase.session', JSON.stringify(sessionToSave));
      }
      setLoading(false);
      return true;
    } catch (err) {
      setError('Wystąpił błąd logowania.');
      setLoading(false);
      return false;
    }
  }

  const completeOnboarding = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.log('userError: ', userError);
      }
      if (!userData?.user) {
        setError('Brak zalogowanego użytkownika');
        console.log('Brak zalogowanego użytkownika');
        return false;
      }
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update({ onboardingCompleted: true })
        .eq('id', userData.user.id);
      if (updateError) {
        setError(updateError.message);
        console.log('updateError: ', updateError);
        return false;
      }
      return true;
    } catch (err) {
      setError('Wystąpił błąd podczas kończenia onboardingu.');
      console.log('error: ', err);
      return false;
    }
  };

  // Wylogowanie
  async function logout() {
  await supabase.auth.signOut();
  // Usuń sesję z AsyncStorage, żeby po wylogowaniu nie zostawała lokalnie
  await AsyncStorage.removeItem('supabase.session');
  }

  return { loading, error, register, login, logout, completeOnboarding };
}
