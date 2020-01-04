import React from 'react';
import renderer from 'react-test-renderer';
import { NotifyList } from './NotifyList';

describe('Tests for NotifyList', () => {
  it('should create', () => {
    const list = renderer.create(<NotifyList data={[]}></NotifyList>);
    expect(list).toBeTruthy();
  })
})