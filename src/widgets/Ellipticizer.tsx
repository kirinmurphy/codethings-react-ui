import * as React from 'react';

interface Props {
  children: JSX.Element | string;
  width?: string;
}

export default function Ellipticizer ({ children }: Props): JSX.Element {
  return (
    <span>
      {children}      
    </span>
  );
}
