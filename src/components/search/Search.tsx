import { UsersIcon } from '@components/Common/icons/UsersIcon';
import { Button, Input } from '@material-tailwind/react';
import { FC } from 'react';

interface SearchProps {
  icon: JSX.Element;
}

export const Search: FC<SearchProps> = ({ icon }) => {
  return (
    <form className='flex items-center w-full'>
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='w-full'>
        <Input
          crossOrigin={undefined}
          type='text'
          id='simple-search'
          label='Username'
          color='light-green'
          icon={<UsersIcon />}
        />
      </div>
      <Button
        className='p-2.5 ms-2 text-white bg-green-300 rounded-lg border border-green-300 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800'
        placeholder={'search'}
      >
        {icon}
        <span className='sr-only'>Search</span>
      </Button>
    </form>
  );
};
