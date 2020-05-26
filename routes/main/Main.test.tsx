import renderer, { ReactTestRenderer, act} from 'react-test-renderer';
import {Main} from './Main';
import React from 'react';
import Button from 'native-base';
import {GroupContext, GroupContextType} from 'stores/groups/Groups.store';

// this is to get rid of a warning, see: https://stackoverflow.com/a/59593847/6613113
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('tests for Main Component', () => {
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
      <GroupContext.Provider value= {mockGroupContext}>
        <Main navigation={mockNavigation} />
      </GroupContext.Provider>
    )
  })
  
  it('renders without error', () => {
    expect(component).toBeTruthy();
  });
  describe('when plus button is clicked', () => {
    it('calls navigate function', async () => {
      const navigationSpy = jest.spyOn(mockNavigation, "navigate");
      const addNewGroupButton = component.root.findByType(Button);
      await act(async () => addNewGroupButton.props.onPress());
      expect(navigationSpy).toHaveBeenCalledWith("AddNewGroup")
    });
  
  }

  );
  
})