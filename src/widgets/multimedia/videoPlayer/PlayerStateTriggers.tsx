import * as React from 'react';

import { PlayerStateTrigger } from './PlayerStateTrigger';
import { VideoPlayerActionTypes, PlayerStateType } from '../types';
import { 
  PLAYER_STATE_PLAYING, 
  PLAYER_ACTION_PLAY,
  PLAYER_ACTION_PAUSE,
} from './helperPlayerStateReducer';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

interface Props {
  playerState: PlayerStateType;
  updatePlayerState: (arg0: VideoPlayerActionTypes) => void;
}

export function PlayerStateTriggers ({ playerState, updatePlayerState }: Props): JSX.Element {
  return (
    <span className="player-controls">
      {playerState !== PLAYER_STATE_PLAYING && (
        <PlayerStateTrigger 
          trigger={() => { updatePlayerState(PLAYER_ACTION_PLAY); }}
          icon={faPlay}
        />
      )}

      {playerState === PLAYER_STATE_PLAYING && (
        <PlayerStateTrigger 
          trigger={() => { updatePlayerState(PLAYER_ACTION_PAUSE); }} 
          icon={faPause}
        />
      )}
    </span>
  );
}
