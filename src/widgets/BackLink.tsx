import * as React from 'react';

import { MSG_BACK_LINK } from '../utils/dictionary';

import '../utils/fontAwesomeLibrary';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export function BackLink (): JSX.Element {
  return (
    <>
      <a className="back-link" 
        onClick={() => { window.history.back(); }}>
          
        <FontAwesomeIcon icon={faAngleLeft} />{MSG_BACK_LINK}
      </a>    
    </>
  );
}
