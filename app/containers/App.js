// @flow
import React, { type Node } from 'react';

type Props = {
  children: Node
};

export default function({ children }: Props) {
  return <>{children}</>;
}
