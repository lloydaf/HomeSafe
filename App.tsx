import React from 'react'
import { handleNotification } from 'utils/expo/expo.util'
import * as Notifications from 'expo-notifications'
import { AsyncStorage } from 'react-native'
import { Config } from 'utils/config/config.util'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, ApolloLink } from '@apollo/client'
import { onError } from '@apollo/link-error'
import { Container } from 'native-base'
import { Home, Login } from 'routes'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import AppLoading from 'expo-app-loading'
import { UserContext, UserContextType } from 'stores/users'
import { EventSubscription } from 'fbemitter'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { SignUp } from 'routes/sign-up/SignUp'


const Stack = createStackNavigator()

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: 'http://192.168.1.240:3000/dev/api'
})


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, httpLink])
})

export default class App extends React.Component {

  _notificationSubscription: EventSubscription;
  state = {
    loading: true,
    loggedIn: false
  }

  userContext: UserContextType = {
    logout: () => this.setState({ loggedIn: false }),
    login: async ({ username }) => {
      await AsyncStorage.setItem(Config.UserName, username)
      this.setState({ loggedIn: true })
    }
  };

  async componentDidMount() {

    try {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
      const userName = await AsyncStorage.getItem(Config.UserName)
      console.log('username is', userName)
      if (userName) {
        this.setState({ loggedIn: true })
      }
      const loading = false
      this.setState({ loading })
    } catch (err) {
      console.log('error is', err)
    }

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addNotificationReceivedListener(handleNotification)
  }


  render() {
    let view
    if (this.state.loading) {
      return <AppLoading />
    }
    return (
      <NavigationContainer>
        <ApolloProvider client={client}>
          <UserContext.Provider value={this.userContext}>
            <Container>
              {!this.state.loggedIn ? (
                <Stack.Navigator initialRouteName="Login">
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="SignUp" component={SignUp} />
                </Stack.Navigator>
              ) : (
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name={'Home'} component={Home} />
                </Stack.Navigator>
              )}
            </Container>
          </UserContext.Provider>
        </ApolloProvider>
      </NavigationContainer>
    )
  }
}
