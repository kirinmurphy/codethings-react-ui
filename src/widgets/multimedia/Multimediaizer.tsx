import React from 'react';

import { MultimediaizerProps } from './types';

import { SlideshowPopup } from './SlideshowPopup';
import { VideoPlayer } from './videoPlayer/VideoPlayer';

export function hasMultimediaContent (multimedia: MultimediaizerProps): boolean {
  if ( !multimedia ) { return false; }
  const { type, slideshow, video, iframeUrl } = multimedia;
  const hasSlideshow = type === 'slideshow' && !!slideshow?.images?.length;
  const hasIframe = type === 'iframe' && !!iframeUrl;
  const hasVideo = type === 'video' && !!video?.sources?.length;
  return hasSlideshow || hasIframe || hasVideo;
}

export function Multimediaizer ({ 
  type, 
  slideshow, 
  video, 
  iframeUrl }: MultimediaizerProps): JSX.Element {

  return (
    <section className={`multimediaizer multimediaizer-${type}`}>
      {type === 'iframe' && <iframe src={iframeUrl} />}
      {type === 'slideshow' && <SlideshowPopup {...slideshow} />}
      {type === 'video' && <VideoPlayer video={video} />}
    </section>      
  );
}
