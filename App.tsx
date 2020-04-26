import React from 'react';
import { handleNotification, getExpoToken, sendPushNotification } from 'utils/expo/expo.util';
import { Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import { Config } from 'utils/expo/config.util';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Container, Header, Left, Body, Title, Right } from 'native-base';
import { Home, Login } from 'routes';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { UserContext, UserContextType } from 'stores/users';
import { EventSubscription } from 'fbemitter';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://192.168.1.4:3000/dev/api',
  })
});

export default class App extends React.Component {

  _notificationSubscription: EventSubscription;
  state = {
    loading: true,
    loggedIn: false
  }

  userContext: UserContextType = {
    logout: () => this.setState({ loggedIn: false }),
    login: () => this.setState({ loggedIn: true })
  };

  async componentDidUpdate() {

  }

  async componentDidMount() {

    try {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      const [[_, expoToken], [__, userName]] = await AsyncStorage.multiGet([Config.ExpoToken, Config.UserName]);
      console.log(expoToken, userName);
      if (!expoToken) {
        const token = await getExpoToken();
        console.log('token is', token);
        await AsyncStorage.setItem(Config.ExpoToken, token);
      }
      if (userName) {
        this.setState({ loggedIn: true });
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
    let view;
    if (this.state.loading) {
      return <AppLoading />;
    }
    else if (!this.state.loggedIn) {
      view = <Login />;
    }
    else {
      view = <Home />
    }
    return (
      <ApolloProvider client={client}>
        <UserContext.Provider value={this.userContext}>
          <Container>
            <Header hasTabs>
              <Left />
              <Body>
                <Title>HomeSafe</Title>
              </Body>
              <Right />
            </Header>
            {view}
          </Container>
        </UserContext.Provider>
      </ApolloProvider>
    );
  }
}
