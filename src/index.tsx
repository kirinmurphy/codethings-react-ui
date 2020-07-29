import './css/_variables-theme.css';
import './css/reset.css';
import './css/panel.css';

// Widgets css
import './widgets/css/_variables-widgets.css';
import './widgets/css/back-link.css';
import './widgets/css/ellipticizer.css';
import './widgets/css/loading-icon.css';
import './widgets/css/dropdownizer.css';
import './widgets/css/popupizer.css';
import './widgets/css/expandoclicker.css';
import './widgets/css/slideshow.css';
import './widgets/css/multimediaizer.css';
import './widgets/css/videoplayer.css';
import './widgets/css/videoplayer-control-bar.css';
import './widgets/css/videoplayer-chapter-controls.css';

import { useTriggerOverride } from './utils/useTriggerOverride';
import { useCallbackOnExternalEventTrigger } from './utils/useCallbackOnExternalEventTrigger';

import { Ellipticizer } from './widgets/Ellipticizer';
import { Markdownizer, MarkdownizerProps } from './widgets/Markdownizer';
import { CommaSeparatedList, CommaSeparatedListCollectionType } from './widgets/CommaSeparatedList';
import { Dropdownizer } from './widgets/Dropdownizer';
import { LoadingIcon } from './widgets/LoadingIcon';
import { Popupizer } from './widgets/Popupizer';
import { BackLink } from './widgets/BackLink';

import { ExpandoClicker, openActiveImageInNewWindow } from './widgets/multimedia/ExpandoClicker';
import { Multimediaizer, hasMultimediaContent } from './widgets/multimedia/Multimediaizer';
import { MultimediaizerProps } from './widgets/multimedia/types';
import { getFormattedVideoTime } from './widgets/multimedia/videoPlayer/helperGetFormattedVideoTime';
import { getFormattedChapters } from './widgets/multimedia/videoPlayer/helperGetFormattedChapters';

export {
  // custom hooks
  useTriggerOverride,
  useCallbackOnExternalEventTrigger,

  // Props
  MarkdownizerProps,
  CommaSeparatedListCollectionType,
  MultimediaizerProps,

  // components
  LoadingIcon,
  Ellipticizer,
  Markdownizer,
  CommaSeparatedList,
  Dropdownizer,
  Popupizer,
  BackLink,

  // multimedia
  ExpandoClicker,
  openActiveImageInNewWindow,
  Multimediaizer,
  hasMultimediaContent,
  getFormattedVideoTime,
  getFormattedChapters

}
