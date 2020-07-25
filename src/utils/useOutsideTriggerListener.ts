import { GenericRefTypeUntilIFigureOutTheCommonDenominator } from '../widgets/types';

import { 
  useTriggerOverride, 
  triggerOverrideCallbackType,
} from './useTriggerOverride';

export function useOutsideTriggerListener (
  ref:GenericRefTypeUntilIFigureOutTheCommonDenominator, 
  callback:triggerOverrideCallbackType): void {
  
  useTriggerOverride({ 
    eventType: 'mousedown', 
    ref: ref, 
    condition: ({ ref, event }) => {
      return !ref.current.contains(event.target);
    }, 
    conditionalCallback: callback
  });
}
