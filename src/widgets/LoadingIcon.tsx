import * as React from 'react';

import '../utils/fontAwesomeLibrary';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export function LoadingIcon (): JSX.Element {
  return (
    <div className="loading-icon">
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
}
