import { State, StateAction } from '@context/ChatTypes';

export const chatStateReducer = (state: State, { type, payload }: StateAction) => {
  switch (type) {
    case 'ADD_CONTACT': {
      // check if user exist already
      if (state.contacts.get(payload.toLowerCase())) {
        return state;
      }

      const newContact = new Map(state.contacts);
      newContact.set(payload.toLowerCase(), { fullName: payload });

      // update the contact state
      return {
        ...state,
        contacts: newContact,
      };
    }
    case 'ADD_MESSAGE': {
      // get the payload
      const { message, currentUser } = payload;

      // Basic validation
      if (!message || !message.messageFrom || !message.messageTo) {
        return state;
      }

      const contactId = message.messageFrom.toLowerCase();
      const currentLoggedInUser = currentUser?.toLowerCase();
      const contacts = new Map(state.contacts);

      // add user if they do not exist
      if (contactId !== currentLoggedInUser && !state.contacts.has(contactId)) {
        const newContact = { contactId, fullName: contactId };
        contacts.set(contactId, newContact);
      }

      // get all the message
      const messages = new Map(state.messages);

      const sender =
        currentLoggedInUser === message.messageFrom.toLowerCase()
          ? message.messageTo.toLowerCase()
          : message.messageFrom.toLowerCase();

      const currentMessages = messages.get(sender) ?? [];

      messages.set(sender, [...currentMessages, payload.message]);

      return {
        ...state,
        messages,
        contacts,
      };
    }
    default:
      return state;
  }
};
