import * as exported from './Groups.store';
import { Context } from 'react'
describe('Tests for Groups store', () => {
  it('should export GroupContext of type React.Context', () => {
    const groupContext = exported.GroupContext;
    expect(groupContext).toBeTruthy();
    expect(isContext(groupContext)).toBeTruthy();
  });
})

function isContext(obj: any): obj is Context<{}> {
  return obj !== undefined;
}