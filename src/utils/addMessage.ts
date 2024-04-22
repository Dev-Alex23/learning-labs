import { Message, State } from '@context/ChatTypes';
import { addContactIfNotExist } from './addContactIfNotExist';

export const addMessage = (
  state: State,
  payload: { message: Message; currentUser: string | null | undefined }
): State => {
  // TODO: HOW SHOULD MAPS BE USED IN TERMS OF IMMUTABILITY?
  const { message, currentUser } = payload;
  if (!message?.messageFrom || !message?.messageTo || !currentUser) {
    return state;
  }
  const contactId = message.messageFrom.toLowerCase();
  const currentLoggedInUser = currentUser?.toLowerCase();

  const contacts =
    contactId !== currentLoggedInUser && !state.contacts.has(contactId)
      ? addContactIfNotExist(state, contactId)
      : state.contacts;

  const messageKey = currentLoggedInUser === contactId ? message.messageTo.toLowerCase() : contactId;
  const currentMessages = state.messages.get(messageKey) ?? [];
  const newMessages = new Map(state.messages).set(messageKey, [...currentMessages, message]);

  return { ...state, messages: newMessages, contacts };
};
