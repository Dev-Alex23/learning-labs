import { Message, State } from '@context/ChatTypes';
import { addContactIfNotExist } from './addContactIfNotExist';

export const addMessage = (state: State, payload: { message: Message; currentUser: string | null | undefined }) => {
  const { message, currentUser } = payload;
  try {
    if (!message || !message.messageFrom || !message.messageTo) {
      return state;
    }
    const contactId = message.messageFrom.toLowerCase();
    const currentLoggedInUser = currentUser?.toLowerCase();
    let contacts = state.contacts;

    if (contactId !== currentLoggedInUser && !state.contacts.has(contactId)) {
      contacts = addContactIfNotExist(state, contactId);
    }

    const sender =
      currentLoggedInUser === contactId ? message.messageTo.toLowerCase() : message.messageFrom.toLowerCase();
    const currentMessages = state.messages.get(sender) ?? [];
    const newMessages = new Map(state.messages);
    newMessages.set(sender, [...currentMessages, message]);

    return { ...state, messages: newMessages, contacts };
  } catch (e) {
    console.error(e);
    return state;
  }
};
