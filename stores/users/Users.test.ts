import * as exported from './index';
import { Context } from 'react'
describe('Tests for Users store', () => {
  it('should export UserContext of type React.Context', () => {
    const userContext = exported.UserContext;
    expect(userContext).toBeTruthy();
    expect(isContext(userContext)).toBeTruthy();
  });
})

function isContext(obj: any): obj is Context<{}> {
  return obj !== undefined;
}