import React, { useMemo } from 'react';

import { FormattedVideoChapterProps, VideoChapterProps } from '../types';

import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';

import { JumpBackIconTrigger, JumpForwardIconTrigger } from './ChapterJumpTriggers';
import { ChapterSelectionTrigger } from './ChapterSelectionTrigger';
import { getFormattedChapters } from './helperGetFormattedChapters';

interface Props {
  chapters:VideoChapterProps[];
  updatePlayerTime: (arg0:number | null) => void;
  currentTime: number;
}

export function ChapterTriggers ({ 
  chapters, 
  updatePlayerTime, 
  currentTime }: Props): JSX.Element {

  if ( !chapters || chapters.length < 2 ) { return (<></>); }

  // ??? - how do i test performance of this useMemo example?
  // https://kentcdodds.com/blog/usememo-and-usecallback
  // or should I wrap useCallback around the ChapterTriggers component instance instead?
  const formattedChapters = useMemo(() => 
    getFormattedChapters(chapters), [chapters]) as FormattedVideoChapterProps[];

  const activeChapter = getActiveChapter(formattedChapters, currentTime);
  const activeChapterIndex = formattedChapters.indexOf(activeChapter);

  const getStartTimeForBackButton = () => {
    const currentChapterStart = activeChapter?.startTime;
    const isOnCurrentChapterStart = currentTime - currentChapterStart < 3;
    const previousChapterStart = formattedChapters[activeChapterIndex - 1]?.startTime || 0;
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
        chapters={formattedChapters}
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
