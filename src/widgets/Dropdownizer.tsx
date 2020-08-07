import React from 'react';
import { useState, useRef } from 'react';

import { useCallbackOnExternalEventTrigger } from '../utils/useCallbackOnExternalEventTrigger';

interface Props {
  title: string | JSX.Element;
  content: JSX.Element[] | JSX.Element;
  orientation?: 'above' | 'below';
}

export function Dropdownizer ({ title, content, orientation = 'below' }: Props): JSX.Element {
  const dropdownRef = useRef<HTMLDListElement>(null);
  const dropdownWindowRef = useRef<HTMLDListElement>(null);

  const [isActive, setActiveState] = useState<boolean>(false);

  const toggleDropdown = () => setActiveState(!isActive);

  const closeDropdown = () => setActiveState(false);

  useCallbackOnExternalEventTrigger(dropdownRef, closeDropdown);

  const dropdownParentHeight = dropdownRef.current?.offsetHeight;
  const bottomOffset = orientation === 'above' ? dropdownParentHeight : 'none';

  return (
    <dl className="dropdownizer" ref={dropdownRef} 
      data-is-active={isActive}
      data-orientation={orientation}>

      <dt className="dropdownizer__trigger"
        onClick={toggleDropdown}>
        
        <span className="dropdownizer__title">{title}</span>
      </dt>

      {/* TODO:  this expects all dropdown interaction to be a single click 
      this wouldn't support a form submission or other interactions
      to fix, would have to limit the close to only specific elements in the child content 
      what's cleaner - passing props through the component chain 
      or doing another useRef on this element and seeing if the actual clicked element is of a certain type */}
      <dd className="dropdownizer__window"
        style={{ bottom:bottomOffset }}
        ref={dropdownWindowRef} 
        onClick={closeDropdown}>

        {content}
      </dd>
    </dl>
  );
}
