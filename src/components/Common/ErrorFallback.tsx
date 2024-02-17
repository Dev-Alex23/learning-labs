import { Button } from '@material-tailwind/react';
import { FC } from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className='flex flex-col items-center justify-center h-screen text-center'>
    <h2 className='text-2xl font-bold text-red-600'>Something went wrong.</h2>
    <p className='mt-4'>Error: {error.message}</p>
    <Button placeholder='Try again' color='red' onClick={resetErrorBoundary} className='mt-6'>
      Try again
    </Button>
  </div>
);
