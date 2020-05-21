import renderer, { ReactTestRenderer} from 'react-test-renderer';
import {Settings} from './Settings';
import React from 'react';
import {UserContext, UserContextType} from 'stores/users';

describe('tests for Settings Component', () => {
  let component: ReactTestRenderer;
  beforeEach(() => {
    let mockUserContext: UserContextType = {
        login : ({username}) => {},
        logout : () => {}
    }

    component = renderer.create(
      <UserContext.Provider value= {mockUserContext}>
        <Settings/>
      </UserContext.Provider>
    )
  })
  
  it('renders without error', () => {
    expect(component).toBeTruthy();
  });
})