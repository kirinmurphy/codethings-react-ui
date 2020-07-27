import * as React from 'react';

import { FormattedVideoChapterProps } from '../types';

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

  console.log('gac', getActiveChapter(chapters, currentTime))
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
        <span className="trigger-icon">
          <JumpBackIconTrigger
            triggerStartTime={getStartTimeForBackButton()}
            show={activeChapterIndex > 0}
            updatePlayerTime={(time) => { updatePlayerTime(time); }}
            icon={['fas', 'backward']}
          />
        </span>

        <span className="trigger-icon">
          <JumpForwardIconTrigger
            triggerStartTime={activeChapter?.nextChapterStartTime || null}
            show={activeChapterIndex < chapters.length - 1}
            updatePlayerTime={updatePlayerTime} 
            icon={['fas', 'forward']}
          />
        </span>
      </span>

      <ChapterSelectionTrigger 
        chapters={chapters}
        activeChapter={activeChapter}
        activeChapterIndex={activeChapterIndex}
        updatePlayerTime={updatePlayerTime}
      />

      <style jsx>{`
        .trigger-icons {
          margin-left:var(--video-control-bar-spacer);
          width:var(--video-chapter-icon-triggers-width);
        }

        .trigger-icon {
          display:inline-block;
          width:50%;
          text-align:center;
        }
      `}</style>
    </>
  );
}

function getActiveChapter (chapters:FormattedVideoChapterProps[], currentTime: number) {
  return chapters.filter((chapter) => {
    const currentTimeIsAfterChapterStart = currentTime > chapter.startTime;
    console.log('ctafst', currentTimeIsAfterChapterStart);
    const nextChapterStartTime = chapter.nextChapterStartTime;
    console.log('ncst', nextChapterStartTime);
    const currentTimeIsBeforeNextChapter = !!nextChapterStartTime && currentTime < nextChapterStartTime;
    console.log('ctibnc', currentTimeIsBeforeNextChapter);
    return currentTimeIsAfterChapterStart && (!nextChapterStartTime || currentTimeIsBeforeNextChapter);
  })[0];
}
