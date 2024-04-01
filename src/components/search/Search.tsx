import { UsersIcon } from '@components/Common/icons/UsersIcon';
import { useChat } from '@hooks/useChat';
import { IconButton, Input } from '@material-tailwind/react';
import { FC, useState } from 'react';

interface SearchProps {
  icon: JSX.Element;
}

export const Search: FC<SearchProps> = ({ icon }) => {
  const [userInput, setUserInput] = useState('');
  const { sendWebSocketMessage } = useChat();
  return (
    <form className='flex items-center w-full cursor-pointer'>
      <label htmlFor='simple-search' className='sr-only'>
        Search
      </label>
      <div className='w-full'>
        <Input
          crossOrigin={undefined}
          type='text'
          id='simple-search'
          label='Username'
          icon={<UsersIcon />}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
      <div>
        <IconButton
          className='p-2.5 ml-2 text-white bg-black rounded-lg'
          placeholder={'search'}
          onClick={() => sendWebSocketMessage({ type: 'add_user', userId: userInput.toLowerCase() })}
        >
          {icon}
          <span className='sr-only'>Search</span>
        </IconButton>
      </div>
    </form>
  );
};
