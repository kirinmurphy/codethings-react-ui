// https://medium.com/@gabrielmickey28/using-debounce-with-react-components-f988c28f52c1

import { useCallback } from 'react';

interface Props {
  callback: (arg0?: any) => void;
  updateDelay: number;
}

type UseDebounceReturnType = [({ ...Props }) => void];

export function useDebounce ({ callback, updateDelay }: Props): UseDebounceReturnType {
  const debouncer = useCallback(debounce({ callback, updateDelay }), []);
  return [debouncer];
}

function debounce ({ callback, updateDelay }: Props) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: [any]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), updateDelay);
  }
}
