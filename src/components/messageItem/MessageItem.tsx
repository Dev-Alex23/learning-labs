import { useChat } from '@hooks/useChat';
import { Typography } from '@material-tailwind/react';
import { forwardRef, useMemo } from 'react';

export interface MessageProps {
  content: string;
  timeStamp?: string;
  sender: string;
}

export const MessageItem = forwardRef<HTMLDivElement | null, MessageProps>(({ content, timeStamp, sender }, ref) => {
  const { currentUser } = useChat();

  // Pre-compute and memoize comparisons to avoid repeated lowercasing in the render
  const isCurrentUser = useMemo(() => currentUser?.toLowerCase() === sender.toLowerCase(), [currentUser, sender]);

  const messageStyles = {
    backgroundClass: isCurrentUser ? 'bg-[#278EFF] self-end' : 'bg-[#2FCC59]',
    textAlignmentClass: isCurrentUser ? 'self-end' : '',
  };

  return (
    <>
      <Typography className={`text-gray-500 font-poppins font-normal text-sm ${messageStyles.textAlignmentClass}`}>
        {timeStamp}
      </Typography>
      <div className={`max-w-fit flex ${messageStyles.backgroundClass} p-3 rounded-xl`} ref={ref}>
        <Typography className='text-white font-poppins max-w-xl break-words'>{content}</Typography>
      </div>
    </>
  );
});
