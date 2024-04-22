import { Contact, State } from '@context/ChatTypes';

export const addContactIfNotExist = (state: State, contactId: string): Map<string, Contact> => {
  const lowerCaseContactId = contactId.toLowerCase();
  if (!state.contacts.get(lowerCaseContactId)) {
    const newContacts = new Map<string, Contact>(state.contacts);
    newContacts.set(lowerCaseContactId, { fullName: contactId });
    return newContacts;
  }

  return state.contacts;
};
