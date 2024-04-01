import { MessageIcon } from '@components/Common/icons/MessageIcon';
import { PaperClipIcon } from '@components/Common/icons/PaperClipIcon';
import { SendIcon } from '@components/Common/icons/SendIcon';
import { useChat } from '@hooks/useChat';
import { IconButton, Input } from '@material-tailwind/react';
import { useState } from 'react';

export const ChatComposer = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, selectedContact } = useChat();

  return (
    <section className='h-[90px] w-full rounded-lg bg-white flex items-center'>
      <div className='w-full p-5 flex justify-center gap-5'>
        <Input
          value={message}
          placeholder='Enter a message'
          crossOrigin={''}
          label='Enter a message'
          icon={<MessageIcon />}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton className='p-5'>
          <PaperClipIcon />
        </IconButton>
        <IconButton
          className='p-5'
          onClick={() => {
            if (message.length !== 0) {
              sendMessage(selectedContact!, message);
            }
            setMessage('');
          }}
        >
          <SendIcon />
        </IconButton>
      </div>
    </section>
  );
};
