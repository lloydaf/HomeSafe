import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Platform, Vibration, AsyncStorage } from 'react-native';
import { Config } from './config.util';

export const handleNotification = (_: any) => {
  Vibration.vibrate(0);
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
export const sendPushNotification = async ({ expoToken, title, body }: { expoToken: string, title: string, body: string }) => {
  const message = {
    to: expoToken,
    sound: 'default',
    title, body,
    data: { data: 'goes here' },
    _displayInForeground: true,
  };
  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};

export const getExpoToken = async (): Promise<string> => {
  let token: string;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
  return token;
};

export const getToken = async () => {
  try {
    const expoToken = await AsyncStorage.getItem(Config.ExpoToken);
    if (!expoToken) throw new Error(`${Config.ExpoToken} not set, fetching!`);
    console.log(`${Config.ExpoToken} set, ${expoToken}`);
    return expoToken;
  } catch (err) {
    const token = await getExpoToken();
    console.log(`${Config.ExpoToken} fetched, ${token}`);
    await AsyncStorage.setItem(Config.ExpoToken, token);
    return token;
  }
}