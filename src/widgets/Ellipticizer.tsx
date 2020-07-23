import * as React from 'react';

interface Props {
  children: JSX.Element | string;
  width?: string;
}

export function Ellipticizer ({ children, width }: Props): JSX.Element {
  return (
    <span>
      {children}
      
      <style jsx>{`
        span {
          width: ${width || 'auto'};
          display:inline-block;
          white-space:nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
        }
      `}</style>
    </span>
  );
}
