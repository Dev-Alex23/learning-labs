import { State } from '@context/ChatTypes';

export const addContactIfNotExist = (state: State, contactId: string) => {
  if (!state.contacts.get(contactId.toLowerCase())) {
    const newContacts = new Map(state.contacts);
    console.log({ newContacts });

    newContacts.set(contactId.toLowerCase(), { fullName: contactId });
    return newContacts;
  }

  return state.contacts;
};
