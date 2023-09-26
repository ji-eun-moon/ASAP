import React from 'react';
import { Spinner as Spin } from '@material-tailwind/react';

interface Props {
  size: string;
}

function Spinner({ size }: Props) {
  return <Spin className={`h-${size} w-${size}`} />;
}

export default Spinner;
