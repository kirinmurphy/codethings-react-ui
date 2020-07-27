import { VideoPlayerStateProps, VideoPlayerActionProps,  } from "../types";

export const PLAYER_STATE_LOADING = 'loading';
export const PLAYER_STATE_READY = 'ready';
export const PLAYER_STATE_PLAYING = 'playing';
export const PLAYER_STATE_PAUSED = 'paused';

export const PLAYER_ACTION_ENABLE_CONTROLS = 'enableControls';
export const PLAYER_ACTION_PLAY = 'play';
export const PLAYER_ACTION_JUMP_TO = 'jumpTo';
export const PLAYER_ACTION_PAUSE = 'pause';
export const PLAYER_ACTION_CLEAR_UPDATED_TIME = 'resetUpdatedTime';

export function playerStateReducer(
  state: VideoPlayerStateProps, 
  action: VideoPlayerActionProps): VideoPlayerStateProps {
  
  switch (action.type) {
  case PLAYER_ACTION_ENABLE_CONTROLS: 
    return {
      ...state,
      playerState: PLAYER_STATE_READY,
      updatedTime: null
    };
  case PLAYER_ACTION_PLAY: 
    return {
      ...state, 
      playerState: PLAYER_STATE_PLAYING, 
      updatedTime: null 
    };
  case PLAYER_ACTION_PAUSE:
    return {
      ...state,
      playerState: PLAYER_STATE_PAUSED,
      updatedTime: null 
    };
  case PLAYER_ACTION_JUMP_TO: 
    return {
      ...state,
      playerState: PLAYER_STATE_PLAYING, 
      updatedTime:action.updatedTime 
    };
  case PLAYER_ACTION_CLEAR_UPDATED_TIME:
    return {
      ...state,
      updatedTime: null
    };
  
  default:
    throw new Error();
  }
}
