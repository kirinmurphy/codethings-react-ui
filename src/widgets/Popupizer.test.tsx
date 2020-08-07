import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import { Popupizer } from './Popupizer';

describe('<Popupizer />', () => {
  const innerContent = 'Some popup content';
  const closeAction = jest.fn();
  const outsideElementCopy = 'some external element';

  beforeEach(() => {
    render(
      <>
        <span>{outsideElementCopy}</span>
        <Popupizer closeAction={closeAction}><>{innerContent}</></Popupizer>
      </>
    )
  });

  test('should display content within popup element', () => {
    const popupContentElement = screen.getByTestId('popup-content');
    const popupContent = screen.getByText(innerContent);
    expect(popupContentElement).toContainElement(popupContent);
  });

  test('should display an overlay', () => {
    expect(screen.getByTestId('popup-overlay')).toBeInTheDocument();
  });

  test('should display a close button', () => {
    const closeButton = screen.getByTestId('popup-close-button');
    const svgIcon = document.querySelector('svg.fa-times') as SVGElement;
    expect(closeButton).toBeInTheDocument();
    expect(svgIcon).toBeInstanceOf(SVGSVGElement);
    expect(closeButton).toContainElement(svgIcon);
  });

  test('should close the window when the close button is clicked', () => {
    const closeButton = screen.getByTestId('popup-close-button');
    fireEvent.click(closeButton);
    expect(closeAction).toHaveBeenCalledTimes(1);
  });

  test('should close the window when outside elements are clicked', () => {
    const outsideElement = screen.getByText(outsideElementCopy);
    console.log('outsideElm', outsideElement.innerHTML);
    fireEvent.click(outsideElement);
    expect(closeAction).toHaveBeenCalledTimes(1);
  });

  // test('should NOT close the window when inner elements are clicked', () => {
  //   const popupContent = screen.getByText(innerContent);
  //   fireEvent.click(popupContent);
  //   expect(closeAction).toHaveBeenCalledTimes(0);    
  // });
});
