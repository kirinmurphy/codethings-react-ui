import * as React from 'react';

import '../utils/fontAwesomeLibrary';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function LoadingIcon (): JSX.Element {
  return (
    <div className="loading-icon">
      <FontAwesomeIcon icon={['fas', 'spinner']} spin />

      <style jsx>{`
        .loading-icon {
          transform:translate3d(1rem, .7rem, 0);
          display:inline-block;
          width:2rem !important;
          height:2rem !important;
          transform-origin:center center;
          text-align:center;
        }

        .loading-icon :global(.svg-inline--fa) {
          display:block;
          width:2rem !important;
          height:2rem !important;
          /* animation:spin .75s linear infinite; */
        }

        /* @keyframes spin { 
          from { transform:rotate(0deg); }
          to { transform:rotate(360deg) }
        } */
      `}</style>
    </div>
  );
}
