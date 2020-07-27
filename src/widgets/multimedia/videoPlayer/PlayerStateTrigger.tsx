import * as React from 'react';

import '../../../utils/fontAwesomeLibrary';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props { 
  trigger:() => void; 
  icon: IconProp;
}

export function PlayerStateTrigger ({ trigger, icon }: Props): JSX.Element {
  return (
    <span onClick={trigger}>
      <FontAwesomeIcon icon={icon} />
      <style jsx>{`
        span { cursor:pointer; }
      `}</style>
    </span>
  );
}
