import React from 'react';
import AppProps from '../types/test';

export default function test({ message }: AppProps) {
  return <div>{message}</div>;
}
