import * as React from 'react';

import { getFormattedTime } from './helperGetFormattedTime';
import { GenericRefTypeUntilIFigureOutTheCommonDenominator } from '../../types';

interface Props {
  videoRef: GenericRefTypeUntilIFigureOutTheCommonDenominator;
}

export function VideoPlayerTime ({ videoRef }: Props): JSX.Element {
  return !!videoRef?.current ? (
    <span className="video-time">
      <span>{getFormattedTime(videoRef.current.currentTime)}</span> / 
      <span>{getFormattedTime(videoRef.current.duration)}</span>
    </span>
  ): <></>;
}
