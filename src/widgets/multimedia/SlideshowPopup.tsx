import React, { useState, useEffect, useRef } from 'react'; 

import { 
  MSG_OPEN_IN_NEW_WINDOW,
  MSG_FULL_SCREEN_VIEW
} from '../../utils/dictionary';
import { useDebounce } from '../../utils/useDebounce';

import { Popupizer } from '../Popupizer';
import { Slideshow } from './Slideshow';
import { openActiveImageInNewWindow } from './ExpandoClicker';

interface Props {
  images: string[];
  autoAdvanceDelay?: number;
}

export function SlideshowPopup ({ images, autoAdvanceDelay = 4000 }: Props): JSX.Element {
  const [showFullScreen, setFullScreenState] = useState<boolean>(false);
  const [dynamicAutoAdvanceDelay, setDynamicAutoAdvanceDelay] = useState<number | null>(null);

  const inlineSlideshowRef = useRef<HTMLDivElement>(null);

  const [scrollDebouncer] = useDebounce({
    callback: currentRef => {
      const delay = halfOfImageIsVisible(currentRef) ? autoAdvanceDelay : null;
      setDynamicAutoAdvanceDelay(delay);
    },
    updateDelay: 750
  });

  useEffect(() => {
    const currentRef = inlineSlideshowRef.current;
    if ( currentRef && typeof(Window) !== 'undefined' ) {
      const onScroll = () => scrollDebouncer(currentRef);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
    return;
  }, []);

  return (
    <>
      <div ref={inlineSlideshowRef}
        className="slideshow-wrapper uses-expando-trigger">
        <Slideshow
          autoAdvanceDelay={dynamicAutoAdvanceDelay}
          images={images}
          showSmallImageAtMaxWidth={true}
          expandoButtonText={MSG_FULL_SCREEN_VIEW}
          expandoClickCallback={() => setFullScreenState(true)}
        />
      </div>

      {showFullScreen && (
        <div className="slideshow-popup-wrapper uses-expando-trigger">
          <Popupizer closeAction={() => setFullScreenState(false)}>
            <Slideshow
              images={images}
              showSmallImageAtMaxWidth={false}
              expandoButtonText={MSG_OPEN_IN_NEW_WINDOW}
              expandoClickCallback={openActiveImageInNewWindow}
            />
          </Popupizer>
        </div>
      )}
    </>
  )
}

function halfOfImageIsVisible (currentRef: HTMLDivElement): boolean {
  const { top, bottom, height } = currentRef.getBoundingClientRect();
  const halfHeight = Math.floor(height / 2);
  const windowHeight = window.innerHeight;
  const topHalfVisible = top > 0 && (halfHeight + top) < windowHeight;
  const bottomHalfVisible = bottom > halfHeight && bottom < height;
  return topHalfVisible || bottomHalfVisible;
}
