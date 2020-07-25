import { useEffect } from 'react';

import { GenericRefTypeUntilIFigureOutTheCommonDenominator } from '../widgets/types'; 

interface eventDataProps {
  triggeredHref: string;
}

interface conditionProps {
  ref: GenericRefTypeUntilIFigureOutTheCommonDenominator;
  event: Event;
  eventData: eventDataProps;
}

export type triggerOverrideCallbackType = (arg0:eventDataProps) => void;

interface useTriggerOverrideProps {
  eventType: 'click' | 'mousedown';
  ref: GenericRefTypeUntilIFigureOutTheCommonDenominator;  
  condition: (arg0: conditionProps) => boolean;
  conditionalCallback: triggerOverrideCallbackType;
}

export function useTriggerOverride (props: useTriggerOverrideProps): void {
  useEffect(() => {
    const { eventType, ref, condition, conditionalCallback } = props;

    const eventCallback = (event: MouseEvent) => {
      if ( ref.current ) {
        const target = event.target as HTMLElement;
      
        const eventData = {
          triggeredHref: target.closest('a')?.getAttribute('href')
        } as eventDataProps;
    
        if ( condition({ ref, event, eventData }) ) {
          event.preventDefault();
          event.stopPropagation();
          conditionalCallback(eventData);
        }  
      }
    };

    // ??? - what is the performance implication if there's a bunch of these on the page 
    document.addEventListener(eventType, eventCallback);
    return () => {
      document.removeEventListener(eventType, eventCallback);
    };
  }, [props]);  
}
