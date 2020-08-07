import React from 'react';

import { getFormattedVideoTime } from './helperGetFormattedVideoTime';
import { GenericRefTypeUntilIFigureOutTheCommonDenominator } from '../../types';

interface Props {
  videoRef: GenericRefTypeUntilIFigureOutTheCommonDenominator;
}

export function VideoPlayerTime ({ videoRef }: Props): JSX.Element {
  return !!videoRef?.current ? (
    <span className="video-time">
      <span>{getFormattedVideoTime(videoRef.current.currentTime)}</span> / 
      <span>{getFormattedVideoTime(videoRef.current.duration)}</span>
    </span>
  ): <></>;
}
