import { ChatAvatar } from '@components/Common/avatar/Avatar';
import { MessageIcon } from '@components/Common/icons/MessageIcon';
import { useChat } from '@hooks/useChat';
import { Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ChatHeaderProps {
  status: 'offline' | 'online';
}

export const ChatHeader: FC<ChatHeaderProps> = ({ status }) => {
  const { selectedContact, dispatch, setSelectedContact } = useChat();
  // const navigate = useNavigate();
  return (
    <section className='w-full h-[90px] rounded-lg bg-white'>
      <div className='flex gap-4 p-5 border-gray-200 items-center justify-center'>
        <ChatAvatar username={selectedContact} />
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
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z'
                    />
                  </svg>
                }
              </MenuHandler>
              <MenuList>
                <MenuItem
                  className='flex items-center gap-2'
                  // onClick={() => {
                  //   dispatch({ type: 'REMOVE_CONTACT', payload: selectedContact! });
                  //   setSelectedContact(null);
                  //   // navigate(`destroy`);
                  // }}
                >
                  <Link to={'destroy'}>
                    <MessageIcon />
                    <button className='font-poppins font-medium' type='submit'>
                      Delete Contact
                    </button>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </section>
  );
};
