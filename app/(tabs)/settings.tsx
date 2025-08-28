// import { useUser } from '@/hooks/useUser'; // Backend not ready, zostawiam na przyszłość
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { Bell, CircleHelp as HelpCircle, Lock, LogOut, Mail, Smartphone, Star, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
  // Przejście do ekranu profilu użytkownika
  const handleProfile = () => {
    router.push('/profile');
  };

  // Przejście do formularza feedbacku
  const handleFeedback = () => {
    router.push('/(tabs)/feedback');
  };

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  // const { user } = useUser(); // Backend not ready yet, use hardcoded user below
  // For future: uncomment above when backend is ready
  const user = {
    displayName: 'Mateusz',
    email: 'demo@fucktiktok.app',
  };
  // Dodajemy hook do autentykacji
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  // ...istniejący kod...

  const colors = {
    light: {
      primary: '#FF1744',
      secondary: '#4A90E2',
      success: '#28A745',
      danger: '#DC3545',
      warning: '#FFC107',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: '#1A1A1A',
      textSecondary: '#666666',
      border: '#E0E0E0',
    },
    dark: {
      primary: '#FF1744',
      secondary: '#4A90E2',
      success: '#28A745',
      danger: '#DC3545',
      warning: '#FFC107',
      background: '#1A1A1A',
      surface: '#2A2A2A',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
      border: '#3A3A3A',
    }
  };

  const theme = colors[colorScheme ?? 'light'];

  // Wszystkie teksty poniżej przetłumaczone na polski
  // Typowanie propsów dla SettingItem
  /**
   * Uwaga dla przyszłego mnie:
   * SettingItem przyjmuje wszystkie propsy, nawet jeśli nie są używane w danym przypadku.
   * Dzięki temu nie ma błędów typowania przy różnych wariantach użycia.
   */
  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    value,
    onPress = undefined,
    showSwitch = false,
    switchValue = false,
    onSwitchChange = () => {},
    iconColor = undefined,
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    value?: string;
    onPress?: () => void;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (val: boolean) => void;
    iconColor?: string;
  }) => (
    <TouchableOpacity 
      style={[styles.settingItem, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={onPress}
      disabled={showSwitch}
    >
      <Icon size={24} color={iconColor || theme.textSecondary} />
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: theme.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
        )}
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: theme.border, true: theme.primary + '40' }}
          thumbColor={switchValue ? theme.primary : theme.textSecondary}
        />
      ) : (
        value && <Text style={[styles.settingValue, { color: theme.textSecondary }]}>{value}</Text>
      )}
    </TouchableOpacity>
  );

  // Typowanie propsów dla SectionHeader
  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={[styles.sectionHeader, { color: theme.text }]}>{title}</Text>
  );

  // ...istniejący kod...

  const handleLogout = () => {
    Alert.alert(
      'Wyloguj się',
      'Czy na pewno chcesz się wylogować?',
      [
        { text: 'Anuluj', style: 'cancel' },
        { 
          text: 'Wyloguj',
          onPress: async () => {
            await logout();
            router.replace('/onboarding');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Ustawienia</Text>
      </View>

      <SectionHeader title="Konto" />

      <SettingItem
        icon={User}
        title={user.displayName}
        subtitle={user.email}
        onPress={handleProfile}
        iconColor={theme.primary}
      />

      <SettingItem
        icon={Bell}
        title="Powiadomienia"
        subtitle="Otrzymuj przypomnienia i aktualizacje serii"
        showSwitch
        switchValue={notifications}
        onSwitchChange={setNotifications}
        iconColor={theme.primary}
      />

      <SectionHeader title="Subskrypcja" />
      
      <SettingItem
        icon={Star}
        title="Status subskrypcji"
        value={'Płatny plan'}
        iconColor={theme.warning}
      />

      <SectionHeader title="Aplikacja" />


      <SettingItem
        icon={Smartphone}
        title="Wersja aplikacji"
        value="1.0.0"
        iconColor={theme.textSecondary}
      />

      <SettingItem
        icon={HelpCircle}
        title="Pomoc i wsparcie"
        subtitle="Uzyskaj pomoc lub skontaktuj się z nami"
        onPress={() => Alert.alert('Pomoc', 'Kontakt: help@fucktiktok.app')}
        iconColor={theme.secondary}
      />

      <SectionHeader title="Prywatność i bezpieczeństwo" />
      
      <SettingItem
        icon={Lock}
        title="Polityka prywatności"
        subtitle="Przeczytaj naszą politykę prywatności"
        onPress={() => Alert.alert('Polityka prywatności', 'Otwieranie polityki prywatności...')}
        iconColor={theme.textSecondary}
      />

      <SettingItem
        icon={Mail}
        title="Regulamin"
        subtitle="Przeczytaj regulamin"
        onPress={() => Alert.alert('Regulamin', 'Otwieranie regulaminu...')}
        iconColor={theme.textSecondary}
      />

      <SectionHeader title="Zarządzanie kontem" />
      
      <SettingItem
        icon={LogOut}
        title="Wyloguj się"
        subtitle="Wyloguj się ze swojego konta"
        onPress={handleLogout}
        iconColor={theme.danger}
      />

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          F**k TikTok v1.0.0
        </Text>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Stworzone z ❤️ dla cyfrowego dobrostanu
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 24,
    paddingVertical: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingBottom: 120,
    gap: 8,
  },
  footerText: {
    fontSize: 14,
  },
});