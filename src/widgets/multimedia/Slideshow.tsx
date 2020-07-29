import * as React from 'react';
import { useState, useEffect } from 'react';

// import { breakpointMaxWidth } from '../../../portfolioData/cssVariables';
const breakpointMaxWidth = '1000px';

import { ExpandoClicker } from './ExpandoClicker';

interface SlideshowProps {
  images: string[];
  showSmallImageAtMaxWidth: boolean;
  autoRotateDelay?: number;
  expandoButtonText: string;
  expandoClickCallback: (arg0: string | null) => void;
}

export function Slideshow ({ 
  images, 
  showSmallImageAtMaxWidth,
  autoRotateDelay, 
  expandoButtonText, 
  expandoClickCallback }: SlideshowProps): JSX.Element {

  const imageCount = images.length;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeImageUrl = getScreenshotUrl(images[activeIndex], 'full');

  const atEnd = imageCount === activeIndex + 1;
  const nextIndex = atEnd ? 0 : activeIndex + 1; 
  const atBeginning = activeIndex === 0;
  const backIndex = atBeginning ? imageCount - 1 : activeIndex - 1;
  
  useEffect(() => {
    if ( imageCount > 1 && !!autoRotateDelay ) {
      // added a little time offset so the slideshows switch at slightly different times;
      const duration = autoRotateDelay + (Math.random() * 2000);
      const timeout = setTimeout(() => { setActiveIndex(nextIndex); }, duration); 
      return () => { clearTimeout(timeout); };   
    } else { return; }
  }, [nextIndex, autoRotateDelay, imageCount]);

  return (
    <div className="slideshow">
      <div className="slideshow__slides">
        {images.map((image, index) => {
          const showImage = index === activeIndex;
          return (
            <picture className="slideshow__picture"
              data-is-active={showImage} key={index}>
              {showSmallImageAtMaxWidth && (
                <source srcSet={getScreenshotUrl(image, 'small')} media={`(min-width: ${breakpointMaxWidth})`} />
              )}
              <source srcSet={getScreenshotUrl(image, 'small')} media={`(max-width:600px)`} />
              <img src={getScreenshotUrl(image, 'full')} />
            </picture>
          );
        })}
      </div>

      {images.length > 1 && (
        <>
          <div className="jump-trigger jump-trigger--back"
            onClick={() => setActiveIndex(backIndex)}>
            
            <span className="jump-trigger__icon"></span>
          </div>

          <div className="jump-trigger jump-trigger--next"
            onClick={() => setActiveIndex(nextIndex)}>
            <span className="jump-trigger__icon"></span>
          </div>
        </>
      )}

      <ExpandoClicker 
        buttonText={expandoButtonText}
        clickCallback={expandoClickCallback} 
        assetUrl={activeImageUrl}
      />
    </div>
  );
}

function getScreenshotUrl (image: string, directory: string) {
  const isExternalLink = image.slice(0, 4) === 'http';
  return isExternalLink ? image : `/images/screenshots/${directory}/${image}`;
}
