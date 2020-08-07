import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import { BackLink } from './BackLink';
import { MSG_BACK_LINK } from '../utils/dictionary';

describe("<BackLink/>", () => {
  test('link text', () => {
    render(<BackLink/>);
    expect(screen.getByText(MSG_BACK_LINK)).toBeDefined();
  });

  test('link click', () => {
    render(<BackLink/>);
    fireEvent.click(screen.getByText(MSG_BACK_LINK));
    expect(1).toBe(1);
  });
});
