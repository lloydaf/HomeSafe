import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NotifyList } from './components/notify-list/NotifyList';
import { handleNotification, getExpoToken, sendPushNotification } from './utils/expo/expo.util';
import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import { Config } from './utils/expo/config.util';

export default class App extends React.Component {

  _notificationSubscription;
  state = {
    loading: false,
    showLogin: false
  }

  async componentDidMount() {

    try {
      const [[_, expoToken], [__, userName]] = await AsyncStorage.multiGet([Config.ExpoToken, Config.UserName]);
      console.log(expoToken, userName);
      if (!expoToken) {
        const token = await getExpoToken();
        console.log('token is', token);
        await AsyncStorage.setItem(Config.ExpoToken, token);
      }
      if (!userName) {
        const showLogin = true;
        this.setState({ showLogin });
      }
      const loading = false;
      this.setState({ loading })
    } catch (err) {
      console.log('error is', err);
    } finally {

    }

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(handleNotification);
  }


  render() {

    return (
      <View style={this.styles.container}>
        {
          !!this.state.loading && (
            <Text>Loading</Text>
          )
        }
        {
          !this.state.loading && !this.state.showLogin && (
            <NotifyList data={[
              { key: 'Devin' },
              { key: 'Dan' },
              { key: 'Dominic' },
              { key: 'Jackson' },
              { key: 'James' },
              { key: 'Joel' },
              { key: 'John' },
              { key: 'Jillian' },
              { key: 'Jimmy' },
              { key: 'Julie' },
            ]} onPress={sendPushNotification}>
            </NotifyList>
          )
        }
        {
          !this.state.loading && this.state.showLogin && (
            <Text>Login</Text>
          )
        }
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
