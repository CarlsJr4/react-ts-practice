import React from 'react';

interface Props {
  handleClick: Function;
  buttonText: string;
}

export default function ExpandButton({ handleClick, buttonText }: Props) {
  return <button onClick={() => handleClick()}>{buttonText}</button>;
}
