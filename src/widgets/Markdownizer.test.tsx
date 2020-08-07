import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from "@testing-library/react";

import { Markdownizer } from './Markdownizer';

describe("<Markdownizer/>", () => {
  test('should return formatted content based on markdown syntax', () => {
    const linkText = 'link';
    const linkHref = 'www.something.com';
    const source = `[${linkText}](${linkHref})`;      
    render(<Markdownizer source={source} />);
    expect(screen.getByText(linkText).closest('a')).toHaveAttribute('href', linkHref);
  });

  // test('should return with allowed types', () => {
  //   const source = `
  //     heyyyy 

  //     something else`;
  //   render(<Markdownizer source={source} useAllowedTypes={true} />);
  //   screen.debug();
  // });
});
