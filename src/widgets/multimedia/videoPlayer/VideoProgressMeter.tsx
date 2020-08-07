import React from 'react';
import { useRef } from 'react';

import { VideoDisplayDataProps } from '../types';
import { GenericRefTypeUntilIFigureOutTheCommonDenominator } from '../../types';

interface Props {
  displayData: VideoDisplayDataProps;
  updatePlayerTime: (arg0: number) => void;
}

export function VideoProgressMeter ({ displayData, updatePlayerTime }: Props): JSX.Element {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentViewed = displayData.currentTime / displayData.duration * 100;

  return (
    <div ref={progressRef} className="progress-meter"
      onClick={event => { 
        const newTimeFromClick = getNewTimeFromClick(event, progressRef, displayData);
        if ( !!newTimeFromClick ) { updatePlayerTime(newTimeFromClick); }
      }}>

      <div className="progress-meter__percent-complete"
        style={{ width: percentViewed+'%' }}></div>
    </div>
  );
}

function getNewTimeFromClick (
  event: React.MouseEvent, 
  ref: GenericRefTypeUntilIFigureOutTheCommonDenominator, 
  displayData:VideoDisplayDataProps): number | null {
  
  const progressMeter = ref.current;
  if ( !progressMeter ) { return null; }
  const containerOffset = progressMeter?.getBoundingClientRect().left;
  const clickedTargetPosition = event.pageX - containerOffset;
  const percentProgressOfClick = clickedTargetPosition / progressMeter?.offsetWidth;
  return Math.floor(displayData.duration * percentProgressOfClick);
}