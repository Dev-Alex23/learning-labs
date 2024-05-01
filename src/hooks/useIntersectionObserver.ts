/* eslint-disable react-hooks/exhaustive-deps */
import { Message } from '@context/ChatTypes';
import { useCallback, useEffect, useRef } from 'react';

interface IntersectionObserverProps {
  rootRef: React.MutableRefObject<HTMLDivElement | null>;
  lastMessageRef: React.MutableRefObject<HTMLDivElement | null>;
  messages?: Message[] | null;
}

export const useIntersectionObserver = ({ lastMessageRef, rootRef, messages }: IntersectionObserverProps) => {
  const isNearBottomRef = useRef(true);

  const handleScroll = useCallback(() => {
    if (!rootRef.current) return;

    const threshold = 45;
    const isNearBottom =
      rootRef.current.scrollHeight - rootRef.current.scrollTop - rootRef.current.clientHeight < threshold;

    isNearBottomRef.current = isNearBottom;
  }, []);

  useEffect(() => {
    const target = lastMessageRef.current;
    const root = rootRef.current;

    if (!target || !root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isNearBottomRef.current) {
          entry.target.scrollIntoView({ behavior: 'smooth' });
        }
      },
      { root, threshold: 0.1 }
    );

    observer.observe(target);

    root.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      root.removeEventListener('scroll', handleScroll);
    };
  }, [messages?.length]);
};
