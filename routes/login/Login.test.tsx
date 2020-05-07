import React from 'react';
import renderer, { ReactTestRenderer, act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { Login } from './Login';
import { UserContext, UserContextType } from 'stores/users';
import { LOGIN_USER, SET_TOKEN } from 'graphql-schema/users';
import * as expoUtils from 'utils/expo/expo.util';

// this is to get rid of a warning, see: https://stackoverflow.com/a/59593847/6613113
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const mockUsername = 'john';
const mockPassword = 'password';
const mockExpoToken = 'test';
const mockFullname = 'John Wayne';

describe('tests for Login Component', () => {
  const mockNavigation = {
    navigate: (mockArg: string) => { }
  };

  const mockUserContext: UserContextType = {
    login: ({ username }) => { },
    logout: () => { }
  }

  let component: ReactTestRenderer;


  const mockLogin = {
    request: {
      query: LOGIN_USER.mutation,
      variables: LOGIN_USER.variables({
        username: mockUsername,
        password: mockPassword
      })
    },
    result: {
      data: {
        login: {
          fullName: mockFullname
        }
      }
    }
  };

  const mockSetToken = {
    request: {
      query: SET_TOKEN.mutation,
      variables: SET_TOKEN.variables({
        username: mockUsername,
        expoToken: mockExpoToken
      })
    },
    result: {
      data: {
        setToken: {
          fullName: mockFullname
        }
      }
    }
  }

  beforeEach(() => {
    act(() => {
      component = renderer.create(
        <MockedProvider mocks={[mockLogin, mockSetToken]} addTypename={false}>
          <UserContext.Provider value={mockUserContext}>
            <Login navigation={mockNavigation} />
          </UserContext.Provider>
        </MockedProvider>
      )
    })
  })


  it('renders without error', () => {
    expect(component).toBeTruthy();
  });

  it('should have TextInputs for entering Username and Password', () => {
    const username = component.root.findByProps({ placeholder: 'Username' });
    const password = component.root.findByProps({ placeholder: 'Password' });
    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
  });

  it('should update component state if username or password changes', () => {
    const username = component.root.findByProps({ placeholder: 'Username' });
    const password = component.root.findByProps({ placeholder: 'Password' });
    act(() => {
      username.props.onChangeText(mockUsername);
      password.props.onChangeText(mockPassword);
    })
    expect(username.props.defaultValue).toBe(mockUsername);
    expect(password.props.defaultValue).toBe(mockPassword);
  })

  it('should try to login if the login button is clicked', async () => {
    //@ts-ignore
    expoUtils.getToken = jest.fn().mockReturnValue(mockExpoToken);
    const loginSpy = jest.spyOn(mockUserContext, "login");
    const username = component.root.findByProps({ placeholder: 'Username' });
    const password = component.root.findByProps({ placeholder: 'Password' });
    const login = component.root.findByProps({ title: 'Login' });
    await act(async () => {
      username.props.onChangeText(mockUsername);
      password.props.onChangeText(mockPassword);
    });
    await act(async () => login.props.onPress());
    expect(loginSpy).toHaveBeenCalledWith({ username: mockUsername })
  })
})