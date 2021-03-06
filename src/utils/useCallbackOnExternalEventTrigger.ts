import { GenericRefTypeUntilIFigureOutTheCommonDenominator } from '../widgets/types';

import { 
  useTriggerOverride, 
  triggerOverrideCallbackType,
} from './useTriggerOverride';

export function useCallbackOnExternalEventTrigger (
  ref:GenericRefTypeUntilIFigureOutTheCommonDenominator, 
  callback:triggerOverrideCallbackType): void {
  
  useTriggerOverride({ 
    eventType: 'mouseup', 
    ref: ref, 
    condition: ({ ref, event }) => {
      return !ref.current.contains(event.target);
    }, 
    conditionalCallback: callback
  });
}
