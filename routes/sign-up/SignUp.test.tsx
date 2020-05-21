import renderer, { ReactTestRenderer, act } from 'react-test-renderer';
import { SignUp } from './SignUp';
import React from 'react';
import { GroupContext, GroupContextType } from 'stores/groups/Groups.store';
import { MockedProvider } from '@apollo/client/testing';

describe('tests for Sign Up Component', () => {
  let component: ReactTestRenderer;
  beforeEach(() => {
    let mockGroupContext: GroupContextType = {
        createNewGroup: () => { },
        deleteGroupName: () => { },
        groups: []
    }
    let mockNavigation = {
        navigate: () => { }
    }

    component = renderer.create(
      <MockedProvider mocks={[]}>
          <GroupContext.Provider value={mockGroupContext}>
              <SignUp navigation={mockNavigation} />
          </GroupContext.Provider>
      </MockedProvider>
    )
  })
  it('renders without error', () => {
      expect(component).toBeTruthy();
  });
})