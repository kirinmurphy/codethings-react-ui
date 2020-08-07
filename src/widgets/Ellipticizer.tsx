import React from 'react';

interface Props {
  children: JSX.Element | string;
  width?: string;
}

export function Ellipticizer ({ children, width }: Props): JSX.Element {
  return (
    <span className="ellipticizer" style={{width: width || 'auto'}}>
      {children}      
    </span>
  );
}
