import { useClerk, useUser } from '@clerk/clerk-react';
import { SignOutIcon } from '@components/Common/icons/SignOutIcon';
import { UserProfileIcon } from '@components/Common/icons/UserProfileIcon';
import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';

export const UserMenu = () => {
  const { signOut, openUserProfile } = useClerk();
  const { user } = useUser();
  const userImg = user?.imageUrl ?? 'https://docs.material-tailwind.com/img/face-2.jpg';
  return (
    <Menu>
      <MenuHandler>{<Avatar size={'md'} src={userImg} alt='avatar' className='cursor-pointer' />}</MenuHandler>
      <MenuList>
        <MenuItem className='flex items-center gap-2' onClick={openUserProfile}>
          <UserProfileIcon />
          <Typography variant='small' className='font-poppins font-medium'>
            My Profile
          </Typography>
        </MenuItem>
        <hr className='my-2 border-blue-gray-50' />
        <MenuItem className='flex items-center gap-2' onClick={signOut}>
          <SignOutIcon />
          <Typography variant='small' className='font-poppins font-medium'>
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
