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
    <>
      <div className="slideshow">
        <div className="slides">
          {images.map((image, index) => {
            const showImage = index === activeIndex;
            return (
              <picture data-is-active={showImage} key={index}>
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
            <div className="back jump-trigger" onClick={() => setActiveIndex(backIndex)}>
              <span className="jump-trigger-icon"></span>
            </div>

            <div className="next jump-trigger" onClick={() => setActiveIndex(nextIndex)}>
              <span className="jump-trigger-icon"></span>
            </div>
          </>
        )}

        <ExpandoClicker 
          buttonText={expandoButtonText}
          clickCallback={expandoClickCallback} 
          assetUrl={activeImageUrl}
        />
      </div>
  
      <style jsx>{`
        .slideshow { 
          position:relative;
          height:100%;
          width:100%;
          border:1px solid #bbb; 
          overflow:hidden;
          background:var(--slideshow-background);
        }

        .slides {
          position:relative;
          height:100%;
          width:100%;
        }

        img { 
          position:absolute;
          top:50%;
          transform:translateY(-50%);          
          opacity:0;
          width:100%;
          height:auto;
          transition: opacity .5s;
        }

        picture[data-is-active="true"] img {
          opacity:1;
          transition:opacity .2s;
        }

        .jump-trigger {
          position:absolute;
          top:0; 
          bottom:0; 
          z-index:3;
          cursor:pointer;
        }

        .slideshow .jump-trigger { 
          width:33%; 
        }

        .back {
          left:0;
        }

        .next {
          right:0;
        }

        .jump-trigger-icon {
          position:absolute;
          top:50%;
          transform:translateY(-50%);
          height:var(--slideshow-trigger-size);
          width:var(--slideshow-trigger-size); 
          border-radius:100%;
          background:var(--slideshow-trigger-background);
          text-align:center;
          transition: var(--transition-swoop);
        }

        .jump-trigger-icon:before {
          position:relative;
          top:15px;
          content:'';
          display:inline-block;
          height:12px;
          width:12px;
          border-style:solid;
          border-color:var(--slideshow-trigger-caret);
          border-width:3px 0 0 3px;
          transform-origin:center center;
        }

        .jump-trigger:hover .jump-trigger-icon {
          background:#fff;
          transform:translateY(-50%) scale(2);
          box-shadow:0 0 5px #888;
        }

        .jump-trigger:active .jump-trigger-icon {
          transition:var(--transition-bounce);
          transform:translateY(-50%) scale(1.8);
        }

        .jump-trigger:hover .jump-trigger-icon:before {
          border-color:#000;          
        }

        .back .jump-trigger-icon {
          left:calc(var(--slideshow-trigger-offset) * -1);
        }

        .back .jump-trigger-icon:before {
          transform:rotate(-55deg) skew(-20deg);
          left:14px;
        }

        .next .jump-trigger-icon {
          right:calc(var(--slideshow-trigger-offset) * -1);
        }
    
        .next .jump-trigger-icon:before {
          transform:rotate(128deg) skew(-20deg);
          right:12px;
        }
      `}</style>
    </>
  );
}

function getScreenshotUrl (image: string, directory: string) {
  const isExternalLink = image.slice(0, 4) === 'http';
  return isExternalLink ? image : `/images/screenshots/${directory}/${image}`;
}
