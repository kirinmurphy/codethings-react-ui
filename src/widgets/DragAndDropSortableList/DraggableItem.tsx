import React, { useRef } from 'react';
import { ItemTemplateType } from '.';

import { useDragAndDropEvents } from './useDragAndDropEvents';

interface Props {
  listItem: string;
  index: number;
  setActiveDragIndex: (arg0: number) => void;
  prependDroppedElement: (arg0: number) => void;
  itemTemplate: ItemTemplateType;
}

export function DraggableItem (props: Props): JSX.Element {
  const { 
    listItem, 
    index, 
    setActiveDragIndex, 
    prependDroppedElement,
    itemTemplate
  } = props;

  const draggableRef = useRef(null);

  const [dragState, dropzoneState] = useDragAndDropEvents({
    ref: draggableRef,
    index, 
    setActiveDragIndex,
    prependDroppedElement
  });

  return (
    <>
      {listItem !== '' && (
        <li draggable="true" 
          ref={draggableRef}
          className={`${dragState} ${dropzoneState}`}>
          
          {itemTemplate(index, listItem)}
        </li>
      )}
    </>
  );
}
