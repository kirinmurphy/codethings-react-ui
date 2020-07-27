import * as React from 'react';
import * as ReactMarkdown from "react-markdown";

const markdownTypesAllowed: ReactMarkdown.NodeType[] = [ 
  'text',
  'strong',
  'delete',
  'emphasis',
  'link'
];

interface Props {
  source: string;
  useAllowedTypes?: boolean;
}

interface OptionsProps {
  source: string;
  escapeHtml: boolean;
  allowedTypes?: ReactMarkdown.NodeType[];
  unwrapDisallowed?: boolean;
}

export function Markdownizer ({ source, useAllowedTypes = false }: Props): JSX.Element {  

  const options: OptionsProps = {
    source: source,
    escapeHtml: false
  };

  if ( useAllowedTypes ) {
    options.allowedTypes = markdownTypesAllowed;
    options.unwrapDisallowed = true;
  }

  return (
    <ReactMarkdown {...options} />
  );
}
