import React from 'react';
import renderer from 'react-test-renderer';
import { ListItem } from './ListItem'

describe('Tests for ListItem', () => {
  it('should create', () => {
    const json = renderer.create(<ListItem item={{ key: 'Lloyd' }}></ListItem>).toJSON();
    expect(json).toBeTruthy();
  })
})