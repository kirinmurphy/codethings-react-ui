import React from 'react';

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

  const includeButton = !!buttonText && !!clickCallback;

  return includeButton ? (
    <div className="expando-clicker">
      <div className="expando-clicker__inner">
        <button className="expando-clicker__button" 
          onClick={() => { clickCallback(assetUrl); }}>
          {buttonText}
        </button>
      </div>
    </div>
  ) : <></>;
}
