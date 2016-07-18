import React from 'react';
import { fRender, sRender, expect, storageMock } from '../test_helper';
import sinon from 'sinon';

import Application from '../../src/components/application';

describe('Application', () => {
  let component;
  const state = {
    test: 'test',
  };

  const props = {
    test: 'test',
  }

  beforeEach(() => {
    component = sRender(<Application {...props} />, state);
  });

  it('Renders something', () => {
    expect(component).to.exist;
  });
});
