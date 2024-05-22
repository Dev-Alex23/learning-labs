import { useChat } from '@hooks/useChat';
import { Typography } from '@material-tailwind/react';

export const NoChat = () => {
  const { selectedContact } = useChat();

  if (selectedContact === null) {
    return (
      <section className='flex flex-col justify-center items-center gap-5 bg-white rounded-lg'>
        <Typography className='font-poppins font-normal'>Please select a contact to view chat history</Typography>
      </section>
    );
  }
};
