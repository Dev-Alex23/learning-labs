import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

export const ErrorFallback: FC = () => {
  const error = useRouteError() as Error;
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
      <h2 className='text-2xl font-bold text-red-600'>Something went wrong.</h2>
      <p className='mt-4'>Error: {error.message}</p>
    </div>
  );
};
