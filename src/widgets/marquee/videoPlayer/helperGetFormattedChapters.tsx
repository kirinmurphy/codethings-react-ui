import { VideoChapterProps, FormattedVideoChapterProps } from '../types';

// TODO - check if all chapters timestamps are < the total video time
export function getFormattedChapters (chapters: VideoChapterProps[]): FormattedVideoChapterProps[] {
  if ( !chapters.length ) { return []; }
  const formattedChapters = addPossibleMissingStartingChapter(chapters); 

  return formattedChapters.map((chapter, index) => {
    const startTime = convertToSeconds(chapter.startTime);
    const nextChapter = formattedChapters[index+1];
    const nextChapterStartTime = !!nextChapter ? convertToSeconds(nextChapter.startTime) : null;
    return {
      title: chapter.title,
      startTime,
      nextChapterStartTime
    };
  }) as FormattedVideoChapterProps[];  
}

function convertToSeconds (formattedTime: string) {
  const timeArray = formattedTime.split(':').reverse()
    .map((parts) => { return parseInt(parts); });
  
  const seconds = timeArray[0];
  const minutes = timeArray[1] || 0;
  const hours = timeArray[2] || 0;
  return seconds + minutes * 60 + hours * 3600;
}

function addPossibleMissingStartingChapter (chapters: VideoChapterProps[]) {
  const missingStartingChapter = chapters[0].startTime !== '0:00';
  const possibleFirstChapter = { title:'', startTime: '0:00' };
  return missingStartingChapter ? [possibleFirstChapter, ...chapters] : chapters; 
}
