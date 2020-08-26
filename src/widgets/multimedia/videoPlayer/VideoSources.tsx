import React from 'react';

import { VideoSourceProps } from "../types";

interface Props {
  sources: VideoSourceProps[];
}

export function VideoSources ({ sources }: Props): JSX.Element {
  return (
    <>
      {sources.map(({ src, type }: VideoSourceProps, index: number) => (
        <source key={index} src={src} type={type} />
      ))}
    </>    
  ); 
}