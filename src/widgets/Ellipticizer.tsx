import * as React from 'react';

interface Props {
  children: JSX.Element | string;
  width?: string;
}

export function Ellipticizer ({ children, width }: Props): JSX.Element {
  return (
    <span style={{width: width || 'auto'}} className="ellipticizer">
      {children}
      
      <style jsx>{`
        .ellipticizer {
          display:inline-block;
          white-space:nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
        }
      `}</style>
    </span>
  );
}
