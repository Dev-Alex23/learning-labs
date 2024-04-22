import { State, StateAction } from '@context/ChatTypes';
import { addMessage } from '@utils/addMessage';

export const chatStateReducer = (state: State, { type, payload }: StateAction): State => {
  switch (type) {
    case 'ADD_CONTACT': {
      const contactName = payload.toLowerCase();
      if (state.contacts.has(contactName)) {
        return state;
      }
      const newContacts = new Map(state.contacts).set(contactName, { fullName: payload });
      return { ...state, contacts: newContacts };
    }
    case 'ADD_MESSAGE': {
      return addMessage(state, payload);
    }
    case 'REMOVE_CONTACT': {
      const contactToRemove = payload.toLowerCase();
      if (!state.contacts.has(contactToRemove) && !state.messages.has(contactToRemove)) {
        return state;
      }

      const contacts = new Map(state.contacts);
      const messages = new Map(state.messages);

      contacts.delete(contactToRemove);
      messages.delete(contactToRemove);

      return {
        ...state,
        contacts,
        messages,
      };
    }
    default:
      return state;
  }
};
