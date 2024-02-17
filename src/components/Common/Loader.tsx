import { Spinner } from '@material-tailwind/react';

export const Loader = () => (
  <div className='flex items-center justify-center h-screen'>
    <Spinner className='h-16 w-16' />
  </div>
);
