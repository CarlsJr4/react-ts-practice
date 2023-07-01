import React, { ReactNode, useState } from 'react';
import ExpandButton from './ExpandButton';

// Goal: pass a prop which limits the amount of characters that can be shown on the screen
// Create a show more/show less button that expands/collapses the text

// Take text string
// Substring
// Keep track of original string in state
// Keep track of modified string in state
// Update as necessary

// Good practice: define the props interface before passing the props down from parent for intellisense

interface Props {
  children: string;
  maxChars?: number;
}

export default function ExpandableText({ children, maxChars = 100 }: Props) {
  const [originalText, _] = useState(children);
  const [displayedText, updateDisplayedText] = useState(
    originalText.substring(0, maxChars) + '...'
  );
  const [expanded, setExpanded] = useState(false);
  const [buttonText, setButtonText] = useState('Show more');

  const handleClick = () => {
    if (!expanded) {
      updateDisplayedText(originalText);
      setButtonText('Show less');
    } else {
      updateDisplayedText(originalText.substring(0, maxChars) + '...');
      setButtonText('Show more');
    }
    setExpanded(!expanded);
  };

  return (
    <div>
      {displayedText}
      <ExpandButton handleClick={handleClick} buttonText={buttonText} />
    </div>
  );
}
