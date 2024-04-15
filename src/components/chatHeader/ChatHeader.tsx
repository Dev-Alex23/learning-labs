import { ChatAvatar } from '@components/Common/avatar/Avatar';
import { MessageIcon } from '@components/Common/icons/MessageIcon';
import { useChat } from '@hooks/useChat';
import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { FC } from 'react';

interface ChatHeaderProps {
  userImgUrl?: string;
  status: 'offline' | 'online';
}

export const ChatHeader: FC<ChatHeaderProps> = ({ userImgUrl, status }) => {
  const { selectedContact, dispatch, setSelectedContact } = useChat();
  return (
    <section className='w-full h-[90px] rounded-lg bg-white'>
      <div className='flex gap-4 p-5 border-gray-200 items-center justify-center'>
        <ChatAvatar src={userImgUrl} />
        <div className='w-full flex items-center justify-between gap-1'>
          <div className=' flex flex-col justify-between'>
            <Typography className='capitalize font-poppins font-medium'>{selectedContact}</Typography>
            <Typography className='capitalize text-gray-500  font-normal text-sm'>{status}</Typography>
          </div>
          <div className='cursor-pointer'>
            <Menu>
              <MenuHandler>
                {
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z'
                    />
                  </svg>
                }
              </MenuHandler>
              <MenuList>
                <MenuItem
                  className='flex items-center gap-2'
                  onClick={() => {
                    dispatch({ type: 'REMOVE_CONTACT', payload: selectedContact! });
                    setSelectedContact(null);
                  }}
                >
                  <MessageIcon />
                  <Typography variant='small' className='font-poppins font-medium'>
                    Delete Contact
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </section>
  );
};
