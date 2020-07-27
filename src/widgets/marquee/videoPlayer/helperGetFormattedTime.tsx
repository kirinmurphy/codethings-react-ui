export function getFormattedTime (duration: number | undefined): string | null {
  if ( duration === undefined ) { return null; }
  if ( duration === 0 ) { return '0:00'; }
  const hours = Math.floor(duration / 3600);
  const hoursDisplay = hours > 0 ? `${hours}:` : '';
  const formattedMinutes = getFormattedMinutes(duration, hours);
  const formattedSeconds = getFormattedSeconds(duration);
  return `${hoursDisplay}${formattedMinutes}:${formattedSeconds}`;
}

function getFormattedMinutes (duration:number, hours:number) {
  const minutes = Math.floor(duration % 3600 / 60);
  const isLessThanTenMinutes = hours > 0 && minutes < 10;
  return isLessThanTenMinutes ? `0${minutes}` : minutes;
}

function getFormattedSeconds (duration: number) {
  const seconds = Math.floor(duration) % 60;
  return seconds < 10 ? `0${seconds}` : seconds;
}