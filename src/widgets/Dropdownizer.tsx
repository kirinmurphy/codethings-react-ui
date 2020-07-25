import * as React from 'react';
import { useState, useRef } from 'react';

import { useOutsideTriggerListener } from '../utils/useOutsideTriggerListener';

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

  useOutsideTriggerListener(dropdownRef, closeDropdown);

  const dropdownParentHeight = dropdownRef.current?.offsetHeight;

  return (
    <>
      <dl className="dropdown" ref={dropdownRef} 
        data-is-active={isActive}
        data-orientation={orientation}>

        <dt onClick={toggleDropdown}>
          <span>{title}</span>
        </dt>

        {/* TODO:  this expects all dropdown interaction to be a single click 
        this wouldn't support a form submission or other interactions
        to fix, would have to limit the close to only specific elements in the child content 
        what's cleaner - passing props through the component chain 
        or doing another useRef on this element and seeing if the actual clicked element is of a certain type */}
        <dd ref={dropdownWindowRef} onClick={closeDropdown}>
          {content}
        </dd>
      </dl>

      <style jsx>{`
        .dropdown { 
          position:relative; 
          z-index:100;
        }

        .dropdown > dt { 
          padding-bottom:.25rem;
          cursor:pointer; 
        }

        .dropdown > dt span {
          /* margin-right:.2rem; */
        }

        .dropdown > dt:after {
          display:inline-block;
          margin-left:.4rem;
          transform: scale(1, .5);
        } 

        .dropdown > dd {
          position:absolute;
          right:0;
          width:220px;
          background:rgba(241, 243, 248, 0.95);
          box-shadow:0 10px 10px #aaa;
          transition:top .1s linear;
        }

        .dropdown[data-orientation="above"] dd {
          bottom:${dropdownParentHeight}px;
        }

        .dropdown[data-is-active="false"] dt:after {
          content: "▼";
        }

        .dropdown[data-is-active="false"] dd { 
          display:none; 
        }

        .dropdown[data-is-active="true"] dt:after {
          content: "▲";
        }

        // optional dropdown theme
        .dropdown :global(.dropdown-item) {
          padding:.5rem 1rem;
          cursor:pointer;
          color:var(--textcolor-link);
        }

        .dropdown :global(.dropdown-item:not(:last-of-type)) {
          border-bottom:1px solid #ddd;
        }

        .dropdown :global(.dropdown-item:hover) {
          background:var(--color-dark-blue);
          color:#fff;
          font-weight:bold;
        }
      `}</style>
    </>
  );
}
