import { AddIcon } from '@components/Common/icons/AddIcon';
import { Button } from '@material-tailwind/react';

export const AddUser = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <Button
        placeholder={'Add User'}
        className='p-2.5 ms-2 text-white bg-green-300 rounded-lg border border-green-300 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800'
        onClick={onClick}
      >
        <AddIcon />
        <span className='sr-only'>Add User</span>
      </Button>
    </div>
  );
};
