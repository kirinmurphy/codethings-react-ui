import React from 'react';

import { MultimediaizerProps } from './types';

import { SlideshowPopup } from './SlideshowPopup';
import { VideoPlayer } from './videoPlayer/VideoPlayer';

export function hasMultimediaContent (multimedia: MultimediaizerProps): boolean {
  if ( !multimedia ) { return false; }
  const { type, slideshow: { images }, video, iframeUrl } = multimedia;
  const hasImages = type === 'slideshow' && !!images && !!images.length;
  const hasIframe = type === 'iframe' && !!iframeUrl;
  const hasVideo = type === 'video' && !!video && !!video.sources.length;
  return hasIframe || hasImages || hasVideo;
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
