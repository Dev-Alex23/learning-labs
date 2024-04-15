import { State, StateAction } from '@context/ChatTypes';
import { addMessage } from '@utils/addMessage';

export const chatStateReducer = (state: State, { type, payload }: StateAction) => {
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
    default:
      return state;
  }
};
