import * as React from 'react';
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
    expectElementGone(container, 'strong');
  });

  test('should include markdown content if supplied in a list item', () => {
    const linkText = 'LINK TEXTTT';
    const linkHref = 'http://www.whatever';
    const mockListWithMarkdown = [`[${linkText}](${linkHref})`];
    render(<CommaSeparatedList collection={mockListWithMarkdown} />);
    expect(screen.getByText(linkText).closest('a')?.getAttribute('href')).toBe(linkHref);
  });
});

function expectElementGone (container: Element | null, element: string) {
  expect(containerHasElement(container, element)).toBe(false);
}

// TODO - this is pretty hacky, how can i do this better? 
function containerHasElement (container: Element | null, element: string) {
  const splitParts = container?.innerHTML.split(`<${element}>`);
  return !!splitParts && splitParts?.length > 1;
}

// function hasJoinedText (node: Element, expectedOutput: string): boolean {
//   const hasText = (node: Element) => node.textContent === expectedOutput;
//   const nodeHasText = hasText(node);
//   const childrenDontHaveText = Array.from(node.children).every(
//     (child) => !hasText(child)
//   );

//   return nodeHasText && childrenDontHaveText;
// }
