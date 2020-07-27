import * as React from 'react';
import { useRef } from 'react';

import { useOutsideTriggerListener } from '../utils/useOutsideTriggerListener';

import '../utils/fontAwesomeLibrary';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  children: JSX.Element | JSX.Element[];
  closeAction: () => void;
}

export function Popupizer ({ children, closeAction }: Props): JSX.Element {

  const popupRef = useRef<HTMLDivElement>(null);
  useOutsideTriggerListener(popupRef, closeAction);

  return (
    <>
      <div className="popup" ref={popupRef}>
        <div className="content">
          {children}
        </div>

        <div className="full-screen-close-trigger" onClick={closeAction}>
          <FontAwesomeIcon icon={['fas', 'times']} />
        </div>
      </div>

      <div className="full-screen-overlay"></div>

      <style jsx>{`
        .popup {
          position:fixed;
          width:95vw;
          height:95vh;
          max-width:1100px;
          max-height:900px;
          left:50%;
          top:50%;
          transform:translate3d(-50%, -50%, 0);
          z-index:200;
          box-shadow:0 0 10px #000;
          background:#fff;
          overflow-y:auto;
          overflow-x:hidden;
          color:var(--textcolor-base);
        }

        .content {
          height:100%;
          overflow-x:hidden;
          overflow-y:auto;
        }

        .full-screen-overlay {
          position:fixed;
          top:3px; left:3px; right:3px; bottom:3px;
          z-index:199;
          background:rgba(0,0,0, .5);
        }

        .full-screen-close-trigger {
          display:block;
          position:absolute; 
          top:0;
          right:0;
          z-index:199; 
          padding:.5rem 1rem .25rem 1rem;
          background:#fff;
          cursor:pointer;
          box-shadow:0 0 5px #999;
          transform:scale(1);
          transform-origin:right top;
          transition:var(--transition-swoop);
        }

        .full-screen-close-trigger :global(.fa-times) {
          width:1.5rem;
          color:var(--textcolor-base);
        }

        .full-screen-close-trigger:hover {
          transform:scale(1.3);
        }
    `}</style>
    </>
  );
}
