import renderer, { ReactTestRenderer, act} from 'react-test-renderer';
import {Home} from './Home';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import {GroupContext, GroupContextType} from 'stores/groups/Groups.store'

describe('tests for Home Component', () => {
  let component: ReactTestRenderer;
  let mockNavigation = {
    navigate: () => {}
  }

  let mockGroupContext: GroupContextType = {
    createNewGroup: () => {},
    deleteGroupName: () => {},
    groups: []
  }

  beforeEach(() => {
    component = renderer.create(
      <MockedProvider mocks={[]}>
        <GroupContext.Provider value={mockGroupContext}>
          <Home navigation={mockNavigation} />
        </GroupContext.Provider>
      </MockedProvider>
    )
  });

  it('renders without error', () => {
    expect(component).toBeTruthy();
  });
})