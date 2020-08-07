import React from 'react';
import { useState, useRef, useEffect, useReducer } from 'react';

import { MSG_OPEN_IN_NEW_WINDOW } from '../../../utils/dictionary';

import { 
  VideoProps, 
  VideoPlayerOptionsProps, 
  VideoDisplayDataProps, 
  VideoPlayerActionTypes 
} from '../types';

import { 
  playerStateReducer,
  PLAYER_STATE_LOADING,
  PLAYER_STATE_PLAYING,
  PLAYER_STATE_PAUSED,
  PLAYER_ACTION_ENABLE_CONTROLS,
  PLAYER_ACTION_JUMP_TO,
  PLAYER_ACTION_CLEAR_UPDATED_TIME
} from './helperPlayerStateReducer';

import { LoadingIcon } from '../../LoadingIcon';
import { VideoPlayerTime } from './VideoPlayerTime';
import { VideoProgressMeter } from './VideoProgressMeter';
import { PlayerStateTriggers } from './PlayerStateTriggers';
import { ChapterTriggers } from './ChapterTriggers';

interface Props {
  video: VideoProps;
}

export function VideoPlayer ({ video }: Props): JSX.Element {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const initialPlayerState = {
    playerState: PLAYER_STATE_LOADING,
    updatedTime: null
  };

  const initialDisplayData = {
    currentTime: 0,
    duration: 0
  };

  const [{ playerState, updatedTime }, dispatch] = useReducer(playerStateReducer, initialPlayerState);
  const [displayData, storeDisplayData] = useState<VideoDisplayDataProps>(initialDisplayData);

  useEffect(() => {
    const currentVideo = videoPlayerRef.current;
    if ( !!currentVideo ) {
      switch (playerState) {
      case PLAYER_STATE_LOADING: 
        currentVideo.addEventListener('loadedmetadata', () => {
          dispatch({ type: PLAYER_ACTION_ENABLE_CONTROLS });
        });
        return;
      case PLAYER_STATE_PLAYING: currentVideo.play(); return;
      case PLAYER_STATE_PAUSED: currentVideo.pause(); return;
      }
    }
  }, [playerState]);

  useEffect(() => {
    const currentVideo = videoPlayerRef.current;
    if ( !!currentVideo && updatedTime !== null ) {
      // TSTODO - why do I need that as number at the end? 
      currentVideo.currentTime = updatedTime as number; 
      dispatch({ type:PLAYER_ACTION_CLEAR_UPDATED_TIME });
    }
  }, [updatedTime]);

  useEffect(() => {
    const currentVideo = videoPlayerRef.current;
    if ( !!currentVideo ) {
      if ( currentVideo.ended ) { currentVideo.load(); }
      const timeout = setTimeout(() => {
        storeDisplayData({ 
          currentTime: currentVideo.currentTime,
          duration: currentVideo.duration 
        });
      }, 500);
      return () => { clearTimeout(timeout); }
    } else { return; }
  }, [playerState, displayData]);

  const options: VideoPlayerOptionsProps = {
    autoPlay: video.autoPlay || false,
    poster: video.poster || '',
  };

  return (
    <div className="video-player">
      <video ref={videoPlayerRef} preload="auto" {...options}>
        {video.sources.map(({ src, type }, index) => (
          <source key={index} src={src} type={type} />
        ))};
      </video>

      <div className="video-player__cpanel">
        {playerState === PLAYER_STATE_LOADING && <LoadingIcon />}

        {playerState !== PLAYER_STATE_LOADING && (
          <>
            <VideoProgressMeter 
              displayData={displayData}
              updatePlayerTime={(updatedTime) => {
                dispatch({ type: PLAYER_ACTION_JUMP_TO, updatedTime:updatedTime });
              }}
            />

            <div className="control-bar">
              <span className="control-bar__primary-controls">
                <PlayerStateTriggers
                  playerState={playerState}
                  updatePlayerState={(newPlayerState: VideoPlayerActionTypes) => {
                    dispatch({ type: newPlayerState });
                  }}
                />            

                <VideoPlayerTime videoRef={videoPlayerRef} />
              </span>

              {!!video.chapters && (
                <span className="control-bar__chapters">
                  <ChapterTriggers 
                    chapters={video.chapters}
                    currentTime={displayData.currentTime}
                    updatePlayerTime={(updatedTime) => {
                      dispatch({ type: PLAYER_ACTION_JUMP_TO, updatedTime:updatedTime });
                    }}
                  />
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="video-player__new-window-trigger">
        <span className="link" 
          onClick={() => { window.location.href = video.sources[0].src; }}>
          {MSG_OPEN_IN_NEW_WINDOW}
        </span>
      </div>
    </div>
  );
}
