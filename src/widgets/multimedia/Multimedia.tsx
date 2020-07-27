import * as React from 'react';

import { MultimediaProps } from './types';

import { SlideshowPopup } from './SlideshowPopup';
import { VideoPlayer } from './videoPlayer/VideoPlayer';

export function hasMultimediaContent (multimedia: MultimediaProps, projectUrl?: string): boolean {
  if ( !multimedia ) { return false; }
  const { type, images, video } = multimedia;
  const hasImages = type === 'slideshow' && !!images && !!images.length;
  const hasIframe = type === 'iframe' && !!projectUrl;
  const hasVideo = type === 'video' && !!video && !!video.sources.length;
  return hasIframe || hasImages || hasVideo;
}

export function Multimediaizer ({ 
  type, 
  images, 
  video, 
  iframeUrl }: MultimediaProps): JSX.Element {

  return (
    <>
      <section className={`multimedia multimedia-${type}`}>
        {type === 'iframe' && <iframe src={iframeUrl} />}
        {type === 'slideshow' && <SlideshowPopup images={images} />}
        {type === 'video' && <VideoPlayer video={video} />}
      </section>
      
      <style jsx>{`
        .multimedia {
          position:absolute;
          top:4px;
          left:4px;
          right:4px;
          bottom:4px;
        }
        
        .multimedia > iframe {
          position: absolute;
          left:calc(-12.5% + 1px);
          top:calc(-12.5% + 1px);
          width:125%;
          height:125%;
          transform:scale(0.8);
        }
      `}</style>
    </>
  );
}
