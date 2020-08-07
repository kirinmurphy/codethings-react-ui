import React from 'react';
import { useRef } from 'react';

import { useCallbackOnExternalEventTrigger } from '../utils/useCallbackOnExternalEventTrigger';

import '../utils/fontAwesomeLibrary';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children: JSX.Element | JSX.Element[];
  closeAction: () => void;
}

export function Popupizer ({ children, closeAction }: Props): JSX.Element {

  const popupRef = useRef<HTMLDivElement>(null);
  useCallbackOnExternalEventTrigger(popupRef, closeAction);

  return (
    <>
      <div className="popupizer" ref={popupRef}>
        <div className="popupizer__content"
          data-testid="popup-content">
          {children}
        </div>

        <div className="popupizer__close-trigger" 
          data-testid="popup-close-button"
          onClick={closeAction}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>

      <div className="popupizer-fullscreen-overlay"
        data-testid="popup-overlay"></div>
    </>
  );
}
