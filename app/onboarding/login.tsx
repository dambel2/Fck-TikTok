import { AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  function validate() {
    let valid = true;
    let errs = { email: '', password: '' };
    // Email: prosty regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Podaj poprawny adres email.';
      valid = false;
    }
    // Hasło: min 8 znaków
    if (password.length < 8) {
      errs.password = 'Hasło musi mieć co najmniej 8 znaków.';
      valid = false;
    }
    setErrors(errs);
    return valid;
  }

  async function handleLogin() {
    if (!validate()) return;
    const success = await login({ email, password });
    if (success) {
      router.replace('/(tabs)');
    }
  }

  useEffect(() => {
    if (error && !errors.email && !errors.password) {
      Alert.alert(
        'Coś poszło nie tak',
        'Wystąpił błąd logowania. Spróbuj ponownie później.',
        [{ text: 'OK' }]
      );
    }
  }, [error, errors]);

  return (
    <LinearGradient colors={['#000', '#1A0A1A', '#200720ff', '#FF1744']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>
          <Text style={styles.title}>Zaloguj się</Text>
          <Text style={styles.subtitle}>Wpisz swoje dane, aby się zalogować</Text>

          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="name@mail.com"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Hasło</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1, paddingRight: 40 }, errors.password ? styles.inputError : null]}
                placeholder="Wpisz hasło"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(v => !v)}
                disabled={loading}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {showPassword ? (
                  <Feather name="eye" size={22} color="#FF1744" />
                ) : (
                  <Feather name="eye-off" size={22} color="#FF1744" />
                )}
              </TouchableOpacity>
            </View>
            {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          <TouchableOpacity style={[styles.createButton, loading && styles.createButtonLoading]} onPress={handleLogin} disabled={loading}>
            <Text style={styles.createButtonText}>{loading ? 'Logowanie...' : 'Zaloguj się'}</Text>
          </TouchableOpacity>
          {/* {error && <Text style={styles.errorText}>{error}</Text>} // możesz usunąć lub zostawić dla debugowania */}

          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>lub</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.googleButton} disabled={loading}>
            <AntDesign name="google" color="#fff" size={22} style={{ marginRight: 8 }} />
            <Text style={styles.googleButtonText}>Zaloguj się przez Google</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Nie masz konta?{' '}
            <Text style={styles.loginLink} onPress={() => router.replace('/onboarding/register')}>
              Załóż konto
            </Text>
          </Text>
        </View>
        <Text style={styles.termsText}>
          Logując się, akceptujesz <Text style={styles.termsLink}>Politykę prywatności</Text> i <Text style={styles.termsLink}>Regulamin</Text>.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 48,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 24,
  },
  inner: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.7,
    marginBottom: 32,
  },
  inputBox: {
    marginBottom: 18,
  },
  inputLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
    opacity: 0.8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  inputError: {
    borderColor: '#FF1744',
  },
  errorText: {
    color: '#FF1744',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 2,
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: '#FF1744',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#FF1744',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  createButtonLoading: {
    opacity: 0.7,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  orText: {
    color: '#fff',
    opacity: 0.7,
    marginHorizontal: 12,
    fontSize: 15,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: 'center',
    marginBottom: 18,
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: 'medium',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  loginText: {
    color: '#fff',
    opacity: 0.7,
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
  loginLink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  termsText: {
    color: '#fff',
    opacity: 0.5,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  termsLink: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
