import React from 'react';
import { MdHourglassTop } from 'react-icons/md';

type Props = {};

const Splash = (props: Props) => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <MdHourglassTop size={100} />
    </div>
  );
};

export default Splash;
