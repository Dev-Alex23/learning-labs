import { State, StateAction } from '@context/ChatTypes';
import { addMessage } from '@utils/addMessage';

export const chatStateReducer = (state: State, { type, payload }: StateAction): State => {
  switch (type) {
    case 'ADD_CONTACT': {
      if (state.contacts.has(payload.toLowerCase())) {
        return state;
      }
      const newContacts = new Map(state.contacts);
      newContacts.set(payload.toLowerCase(), { fullName: payload });
      return { ...state, contacts: newContacts };
    }
    case 'ADD_MESSAGE': {
      return addMessage(state, payload);
    }
    case 'REMOVE_CONTACT': {
      const contacts = new Map(state.contacts);
      const messages = new Map(state.messages);
      const contactToRemove = payload.toLowerCase();

      if (state.contacts.has(contactToRemove)) {
        contacts.delete(contactToRemove);
      }

      if (state.messages.has(contactToRemove)) {
        messages.delete(contactToRemove);
      }

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
