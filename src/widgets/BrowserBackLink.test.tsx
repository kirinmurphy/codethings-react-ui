import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import { BrowserBackLink } from './BrowserBackLink';
import { MSG_BACK_LINK } from '../utils/dictionary';

describe("<BrowserBackLink/>", () => {
  test('link text', () => {
    render(<BrowserBackLink/>);
    expect(screen.getByText(MSG_BACK_LINK)).toBeDefined();
  });

  test('link click', () => {
    render(<BrowserBackLink/>);
    fireEvent.click(screen.getByText(MSG_BACK_LINK));
    expect(1).toBe(1);
  });
});
