import * as React from 'react';

import { MultimediaProps } from './types';

import { SlideshowPopup } from './SlideshowPopup';
import { VideoPlayer } from './videoPlayer/VideoPlayer';

export function hasMultimediaContent (multimedia: MultimediaProps): boolean {
  if ( !multimedia ) { return false; }
  const { type, images, video, iframeUrl } = multimedia;
  const hasImages = type === 'slideshow' && !!images && !!images.length;
  const hasIframe = type === 'iframe' && !!iframeUrl;
  const hasVideo = type === 'video' && !!video && !!video.sources.length;
  return hasIframe || hasImages || hasVideo;
}


export function Multimediaizer ({ 
  type, 
  images, 
  video, 
  iframeUrl }: MultimediaProps): JSX.Element {

  return (
    <section className={`multimediaizer multimediaizer-${type}`}>
      {type === 'iframe' && <iframe src={iframeUrl} />}
      {type === 'slideshow' && <SlideshowPopup images={images} />}
      {type === 'video' && <VideoPlayer video={video} />}
    </section>      
  );
}
