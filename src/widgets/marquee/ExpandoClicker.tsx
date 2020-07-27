import * as React from 'react';

export function openActiveImageInNewWindow (imageUrl: string | null): void {
  if ( imageUrl ) { window.location.href = imageUrl; }  
}

interface Props {
  buttonText: string;
  clickCallback: (arg0: string | null) => void;
  assetUrl: string | null;
}

export function ExpandoClicker (props: Props): JSX.Element {

  const { buttonText, clickCallback, assetUrl = null } = props;

  return (!!buttonText && !!clickCallback) ? (
    <>
      <div className="expand-trigger-wrapper">
        <div className="expand-trigger-inner">
          <button className="expand-trigger-button" 
            onClick={() => { clickCallback(assetUrl); }}>
            {buttonText}
          </button>
        </div>
      </div>
      <style jsx>{`
        .expand-trigger-wrapper {
          position:absolute; 
          left:50%;
          transform:translateX(-50%) translateY(3rem);
          bottom:2rem;
          z-index:3;
          transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          opacity:0;
        }

        .expand-trigger-inner {
          transition:var(--transition-swoop);
          transform-origin:center center;
        }

        .expand-trigger-inner:hover {
          transform:scale(1.3);
        }

        .expand-trigger-button {
          padding:.5rem 1rem;
          background:var(--color-light-blue);
          color:#fff;
          border-radius:5px;
          transition:var(--transition-bounce);
          transform:scale(1);
        }

        .expand-trigger-button:active {
          transform:scale(.9);
        }
      `}</style>
      <style jsx global>{`
        .uses-expando-trigger:hover .expand-trigger-wrapper {
          opacity:1;
          transform:translateX(-50%) translateY(0);
        }
      `}</style>
    </>    
  ) : <></>;
}
