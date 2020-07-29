import * as React from 'react';

import '../../../utils/fontAwesomeLibrary';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  show: boolean;
  updatePlayerTime: (arg0: number | null) => void;
  triggerStartTime : number | null;
  icon: IconProp;
}

function JumpIconTrigger (props: IconProps): JSX.Element {
  const { triggerStartTime, show, updatePlayerTime, icon } = props;
  return show ? (
    <span className="jump-icon-trigger" 
      onClick={() => {
        if ( triggerStartTime !== undefined ) { updatePlayerTime(triggerStartTime); }
      }}>
      
      <FontAwesomeIcon icon={icon} />
    </span>
  ): <></>;
}

export const JumpForwardIconTrigger:React.FC<IconProps> = JumpIconTrigger;

interface BackIconProps extends IconProps {
  triggerStartTime: number;
}

export function JumpBackIconTrigger (props: BackIconProps): JSX.Element {
  return ( <JumpIconTrigger {...props} />);
}
