import { AddIcon } from '@components/Common/icons/AddIcon';
import { IconButton } from '@material-tailwind/react';

export const AddUser = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <IconButton placeholder={'Add User'} className='p-2.5 text-white bg-black rounded-lg' onClick={onClick}>
        <AddIcon />
        <span className='sr-only'>Add User</span>
      </IconButton>
    </div>
  );
};
