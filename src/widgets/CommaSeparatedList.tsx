import React from 'react';

export type CommaSeparatedListCollectionType = string[];

import { Markdownizer } from './Markdownizer';

interface Props {
  name?: string;
  collection?: CommaSeparatedListCollectionType;
}

export function CommaSeparatedList ({ name, collection }: Props): JSX.Element {
  return collection && collection.length ? (
    <div className="comma-separated-list">
      {!!name && <strong>{name}: </strong>}
      
      <span>{collection.map((item, index, array) => {
        
        const possibleComma = index < array.length - 1 ? ', ' : '';
        const content = `${item}${possibleComma}`;
        
        return <span key={item}>
          <Markdownizer source={content} useAllowedTypes={true} />
        </span>
      })}</span>
    </div>
  ) : <></>;
}
