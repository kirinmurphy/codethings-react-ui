import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from "@testing-library/react";

import { CommaSeparatedList } from './CommaSeparatedList';


describe("<CommaSeparatedList/>", () => {
  test('should display a comma separated list with title', () => {
    const mockList = ['item1', 'item2', 'item3'];
    const mockTitle = 'I am a title';
    render(<CommaSeparatedList name={mockTitle} collection={mockList} />);

    expect(screen.getByText(`${mockTitle}:`).closest('strong')).toBeDefined();
    expect(screen.getByText(`${mockList[0]},`)).toBeDefined();
    expect(screen.getByText(`${mockList[1]},`)).toBeDefined();
    expect(screen.getByText(`${mockList[2]}`)).toBeDefined();
  });

  test('should hide the title if not supplied', () => {
    const mockList = ["item1", "item2"];
    render(<CommaSeparatedList collection={mockList} />);
    const container = screen.getByText(`${mockList[0]},`).closest('.comma-separated-list');
    expect(container).not.toContainHTML('<strong>');
  });

  test('should include markdown content if supplied in a list item', () => {
    const linkText = 'LINK TEXTTT';
    const linkHref = 'http://www.whatever';
    const mockListWithMarkdown = [`[${linkText}](${linkHref})`];
    render(<CommaSeparatedList collection={mockListWithMarkdown} />);
    expect(screen.getByText(linkText).closest('a')).toHaveAttribute('href', linkHref);
  });
});
