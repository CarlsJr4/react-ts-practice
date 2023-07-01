import React, { useState } from 'react';

// Study Mosh's solution, it is much shorter than yours
interface Props {
  children: string;
  maxChars?: number;
}

export default function ExpandableText({ children, maxChars = 100 }: Props) {
  const [isExpanded, setExpanded] = useState(false);

  // If the user sets max chars to longer than the size of the children, return the children unmodified, and with no extra button
  if (children.length <= maxChars) return <p>{children}</p>;

  // Else, use logic to display the text
  const text = isExpanded ? children : children.substring(0, maxChars);

  // Conditionally render button text based on parent state. No need for an extra component.
  return (
    <p>
      {text}...
      <button onClick={() => setExpanded(!isExpanded)}>
        {isExpanded ? 'See more' : 'See less'}
      </button>
    </p>
  );

  // Key takeaways from Mosh's solution
  // You don't need state for every variable
  // Take advantage of conditional rendering
  // Take advantage of short circuit returns
  // You can perform logic with your props
  // You don't need to conditionally render extra components, you can just use JSX if its simple enough
}
