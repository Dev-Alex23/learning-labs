import { MessageIcon } from '@components/Common/icons/MessageIcon';
import { PaperClipIcon } from '@components/Common/icons/PaperClipIcon';
import { SendIcon } from '@components/Common/icons/SendIcon';
import { IconButton, Input } from '@material-tailwind/react';

export const ChatComposer = () => {
  return (
    <section className='h-[90px] w-full rounded-lg bg-white flex items-center'>
      <div className='w-full p-5 flex justify-center gap-5'>
        <Input placeholder='Enter a message' crossOrigin={''} label='Enter a message' icon={<MessageIcon />} />
        <IconButton className='p-5'>
          <PaperClipIcon />
        </IconButton>
        <IconButton className='p-5'>
          <SendIcon />
        </IconButton>
      </div>
    </section>
  );
};
