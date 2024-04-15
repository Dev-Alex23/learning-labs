import { AddUser } from '@components/addUser/AddUser';
import { Typography } from '@material-tailwind/react';

export const NoUser = () => {
  return (
    <section className='bg-white h-full w-full rounded-lg flex flex-col justify-center items-center overflow-auto gap-6'>
      <div className='text-center'>
        <Typography className='capitalize font-poppins font-normal'>Please add a new user</Typography>
      </div>
      <AddUser onClick={() => {}} />
    </section>
  );
};
