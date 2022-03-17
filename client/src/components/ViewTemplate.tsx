import React, { FC } from 'react';
import { useAuth } from '../hooks/useAuth';

type Props = {
  header: string;
  actions?: {
    text: string;
    onClick: () => void;
    icon?: any;
    requiresAuth?: boolean;
  }[];
};

const ViewLayout: FC<Props> = ({ header, actions, children }) => {
  const { profile } = useAuth();
  return (
    <div className='px-10 mt-12 max-w-6xl mx-auto'>
      <div className='flex justify-between border-b-2 pb-5 mb-10'>
        <h1 className='text-5xl font-bold'>{header}</h1>
        <div>
          {actions?.map(
            (action, ind) =>
              (!action.requiresAuth || profile) && (
                <button
                  key={ind}
                  className='border-2 rounded-md py-1 px-2 flex items-center'
                  onClick={action.onClick}
                >
                  {action.icon} {action.text}
                </button>
              )
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ViewLayout;
