import React, { useState } from 'react';

import { DraggableItem } from './DraggableItem';

type CollectionType = string[];

export type ItemTemplateType = (arg0: number, arg1: string) => JSX.Element;

interface Props {
  itemTemplate: ItemTemplateType;
  collection: CollectionType;
  onAfterReSort: (arg0: CollectionType) => void;
}

export function DragAndDropSortableList (props: Props): JSX.Element {

  const { itemTemplate, collection, onAfterReSort } = props;

  const [activeDragIndex, setActiveDragIndex] = useState<number>(0);

  function prependDroppedElement (dropIndex: number): void {
    const PENDING_STATE = 'REMOVING';
    const listItemInTransit = collection[activeDragIndex];
    collection[activeDragIndex] = PENDING_STATE;
    collection.splice(dropIndex, 0, listItemInTransit);
    const removeIndex = collection.indexOf(PENDING_STATE);
    collection.splice(removeIndex, 1);
    onAfterReSort(collection);
  } 

  return (
    <ul className="drag-and-drop-list"
      data-testid="drag-and-drop-list">

      {collection.map((listItem, index) => 
        <DraggableItem 
          listItem={listItem}
          index={index}
          key={index}
          setActiveDragIndex={setActiveDragIndex}
          prependDroppedElement={prependDroppedElement}
          itemTemplate={itemTemplate}
        />        
      )}
    </ul>
  );
}
