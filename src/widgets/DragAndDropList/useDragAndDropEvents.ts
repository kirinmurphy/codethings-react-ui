import { useEffect, useState } from 'react';
import { GenericRefTypeUntilIFigureOutTheCommonDenominator } from '../types';

type UseDragAndDropEventsReturnType = [string, string]

interface Props {
  ref: GenericRefTypeUntilIFigureOutTheCommonDenominator;
  index: number;
  setActiveDragIndex: (arg0: number | null) => void;
  prependDroppedElement: (arg0: number) => void;
}

export function useDragAndDropEvents ({ ref, index, setActiveDragIndex, prependDroppedElement }: Props): UseDragAndDropEventsReturnType {
  const [dragState, setDragState] = useState('');
  const [dropzoneState, setDropzoneState] = useState('');

  useEffect(() => {
    const currentRef = ref.current;
    if ( currentRef ) {
      currentRef.addEventListener('dragstart', onDragStart);
      currentRef.addEventListener('dragend', onDragEnd);
    }

    function onDragStart () { 
      setDragState('dragging'); 
      setActiveDragIndex(index);
    }

    function onDragEnd () { 
      setDragState('');
      setTimeout(() => setActiveDragIndex(null), 1);
    }

    return () => {
      currentRef.removeEventListener('dragstart', onDragStart);
      currentRef.removeEventListener('dragend', onDragEnd);
    }

  }, [ref, index, setActiveDragIndex]);

  useEffect(() => {
    const currentRef = ref.current;

    if ( currentRef ) {
      currentRef.addEventListener('dragover', onDragOver);
      currentRef.addEventListener('dragenter', onDragEnter);
      currentRef.addEventListener('dragleave', onDragLeave);
      currentRef.addEventListener('drop', onDragDrop);
    }

    function onDragOver (event: Event) { 
      event.preventDefault(); 
    }
      
    function onDragEnter () { 
      if ( dragState !== 'dragging' ) { setDropzoneState('being-hovered'); }
    }

    function onDragLeave () { 
      setDropzoneState(''); 
    }

    function onDragDrop () { 
      setDropzoneState('');
      prependDroppedElement(index);
    }

    return () => {
      currentRef.removeEventListener('dragover', onDragOver);
      currentRef.removeEventListener('dragenter', onDragEnter);
      currentRef.removeEventListener('dragleave', onDragLeave);
      currentRef.removeEventListener('drop', onDragDrop);
    }
  }, [ref, index, dragState, prependDroppedElement]);  

  return [dragState, dropzoneState];
}
