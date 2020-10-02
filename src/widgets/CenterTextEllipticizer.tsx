import React, { useRef, useState, useLayoutEffect } from 'react';

interface Props {
  rawText: string;
  ellipsisString?: string;
}

export function CenterTextEllipticizer (props: Props): JSX.Element {
  const { rawText, ellipsisString = ' ... ' } = props;

  // ??? - HTMLDivElement blows up bc default value is null
  // Don't have this problem in other instances of useRef :shrug:
  const textWrapRef = useRef<any>(null);
  const fullTextRef = useRef<any>(null);
  const animationRef = useRef<number>(0);

  const [formattedText, setFormattedText] = useState<string | null>(null);

  useLayoutEffect(() => {
    const currentOuterRef = textWrapRef.current;
    const currentInnerRef = fullTextRef.current;
    
    if ( currentOuterRef && currentInnerRef ) {
      animationRef.current = window.requestAnimationFrame(setFormattedTextBasedOnWidth);
    }

    function setFormattedTextBasedOnWidth () {
      const percentageOfTextToHide = getPercentageOfTextToHide(currentOuterRef, currentInnerRef);
      const newText = percentageOfTextToHide > 0 
        ? getTruncatedText(rawText, ellipsisString, percentageOfTextToHide) 
        : rawText;
  
      setFormattedText(newText);  
      animationRef.current = window.requestAnimationFrame(setFormattedTextBasedOnWidth);
    }

    return () => { window.cancelAnimationFrame(animationRef.current); }
  }, [rawText, textWrapRef, fullTextRef]);
  
  return (
    <div className="center-text-ellipticizer" ref={textWrapRef}>
      {/* Had to check the length of the question without the trucation impacting the value
      so added the full question to the DOM hidden in CSS and checking that width instead. */}
      
      <div title={rawText}>{formattedText}</div>
      <span 
        ref={fullTextRef} 
        className="center-text-ellipticizer__hidden-real-text">
        {rawText}
      </span>
    </div>
  );  
}

function getTruncatedText (
  rawText: string, 
  ellipsisString: string,
  percentageOfTextToHide: number): string {

  const characterCount = rawText.length;
  const numberOfCharactersToRemove = Math.floor(percentageOfTextToHide/100 * characterCount) + ellipsisString.length;
  const textChunkCharacterLimit = (characterCount - numberOfCharactersToRemove) / 2;
  const beginningChunk = rawText.slice(0, textChunkCharacterLimit);
  const startIndexOfEndChunk = textChunkCharacterLimit + numberOfCharactersToRemove;
  const endChunk = rawText.slice(startIndexOfEndChunk, characterCount);
  return `${beginningChunk}${ellipsisString}${endChunk}`;
}

function getPercentageOfTextToHide (
  currentOuterRef: HTMLDivElement, 
  currentInnerRef: HTMLDivElement): number {

  const availableContainerWidth = currentOuterRef.offsetWidth;
  const textWidth = currentInnerRef.offsetWidth;
  return Math.floor((1 - availableContainerWidth / textWidth) * 100);
}
