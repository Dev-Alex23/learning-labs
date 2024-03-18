import { Button } from '@material-tailwind/react';

export const AddUser = () => {
  return (
    <div>
      <Button
        placeholder={'Add User'}
        className='p-2.5 ms-2 font-medium text-white bg-green-300 rounded-lg border border-green-300 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
        <span className='sr-only'>Add User</span>
      </Button>
    </div>
  );
};
