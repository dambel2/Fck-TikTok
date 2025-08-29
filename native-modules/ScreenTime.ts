import { NativeModules } from 'react-native';

const { ScreenTimeModule } = NativeModules;

// Dzisiaj
export const getTikTokTime = async () => {
  try {
    const time = await ScreenTimeModule.getTikTokTime();
    return time;
  } catch (e) {
    console.error("Błąd pobierania czasu:", e);
    return 0;
  }
};

// Wczoraj
export const getTikTokTimeYesterday = async () => {
  try {
    const time = await ScreenTimeModule.getTikTokTimeYesterday();
    return time;
  } catch (e) {
    console.error("Błąd pobierania czasu z wczoraj:", e);
    return 0;
  }
};

// Suma z ostatniego tygodnia
export const getWeeklyTotal = async () => {
  try {
    const total = await ScreenTimeModule.getWeeklyTotal();
    return total;
  } catch (e) {
    console.error("Błąd pobierania sumy z tygodnia:", e);
    return 0;
  }
};

// Prośba o dostęp
export const requestAccess = async () => {
  try {
    const granted = await ScreenTimeModule.requestAccess();
    return granted;
  } catch (e) {
    console.error("Błąd przy prośbie o zgodę:", e);
    return false;
  }
};
