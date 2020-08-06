import * as React from 'react';
import { render, screen } from "@testing-library/react";

import { BackLink } from './BackLink';
import { MSG_BACK_LINK } from '../utils/dictionary';

describe("<BackLink/>", () => {
  test('link text', () => {
    render(<BackLink/>);
    expect(screen.getByText(MSG_BACK_LINK)).toBeDefined();
  });
});
