import React from 'react';

import { FormattedVideoChapterProps } from '../types';

import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

import { JumpBackIconTrigger, JumpForwardIconTrigger } from './ChapterJumpTriggers';
import { ChapterSelectionTrigger } from './ChapterSelectionTrigger';

interface Props {
  chapters:FormattedVideoChapterProps[];
  updatePlayerTime: (arg0:number | null) => void;
  currentTime: number;
}

export function ChapterTriggers ({ 
  chapters, 
  updatePlayerTime, 
  currentTime }: Props): JSX.Element {

  if ( !chapters || chapters.length < 2 ) { return (<></>); }

  const activeChapter = getActiveChapter(chapters, currentTime);
  const activeChapterIndex = chapters.indexOf(activeChapter);

  const getStartTimeForBackButton = () => {
    const currentChapterStart = activeChapter?.startTime;
    const isOnCurrentChapterStart = currentTime - currentChapterStart < 3;
    const previousChapterStart = chapters[activeChapterIndex - 1]?.startTime || 0;
    return isOnCurrentChapterStart ? previousChapterStart : currentChapterStart;
  };

  return (
    <>
      <span className="trigger-icons">
        <span className="trigger-icons__icon">
          <JumpBackIconTrigger
            triggerStartTime={getStartTimeForBackButton()}
            show={activeChapterIndex > 0}
            updatePlayerTime={(time) => { updatePlayerTime(time); }}
            icon={faBackward}
          />
        </span>

        <span className="trigger-icons__icon">
          <JumpForwardIconTrigger
            triggerStartTime={activeChapter?.nextChapterStartTime || null}
            show={activeChapterIndex < chapters.length - 1}
            updatePlayerTime={updatePlayerTime} 
            icon={faForward}
          />
        </span>
      </span>

      <ChapterSelectionTrigger 
        chapters={chapters}
        activeChapter={activeChapter}
        activeChapterIndex={activeChapterIndex}
        updatePlayerTime={updatePlayerTime}
      />
    </>
  );
}

function getActiveChapter (chapters:FormattedVideoChapterProps[], currentTime: number) {
  return chapters.filter((chapter) => {
    const currentTimeIsAfterChapterStart = currentTime > chapter.startTime;
    const nextChapterStartTime = chapter.nextChapterStartTime;
    const currentTimeIsBeforeNextChapter = !!nextChapterStartTime && currentTime < nextChapterStartTime;
    return currentTimeIsAfterChapterStart && (!nextChapterStartTime || currentTimeIsBeforeNextChapter);
  })[0];
}
