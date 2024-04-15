import { State, StateAction } from '@context/ChatTypes';
import { chatStateReducer } from '@state/chatStateReducer';

describe('ChatStateReducer', () => {
  describe('Add Contact', () => {
    it('should add a new if not already present', () => {
      // Arrange
      const state: State = {
        contacts: new Map(),
        messages: new Map(),
      };

      const action: StateAction = {
        type: 'ADD_CONTACT',
        payload: 'John Doe',
      };

      // Act
      const newState = chatStateReducer(state, action);

      // Assert
      expect(newState.contacts.has('john doe')).toBeTruthy();
      expect(newState.contacts.get('john doe')).toEqual({ fullName: 'John Doe' });
    });

    it('should not add a contact if it already exists', () => {
      // Arrange
      const state = {
        contacts: new Map([['john doe', { fullName: 'John Doe' }]]),
        messages: new Map(),
      };
      const action: StateAction = {
        type: 'ADD_CONTACT',
        payload: 'John Doe',
      };

      // Act
      const newState = chatStateReducer(state, action);

      // Assert
      expect(newState).toBe(state);
    });
  });
  describe('Add message', () => {
    it('should add message to existing contact', () => {
      // Arrange
      const state: State = {
        contacts: new Map([
          ['john doe', { fullName: 'John Doe' }],
          ['jane doe', { fullName: 'Jane Doe' }],
        ]),
        messages: new Map(),
      };
      const action: StateAction = {
        type: 'ADD_MESSAGE',
        payload: {
          message: {
            messageFrom: 'John Doe',
            messageTo: 'Jane Doe',
            content: 'Hello, Jane!',
            messageId: '1234',
            timestamp: '12:00',
          },
          currentUser: 'John Doe',
        },
      };

      // Act
      const newState = chatStateReducer(state, action);

      // Assert
      const messagesFromJohn = newState.messages.get('jane doe');
      expect(messagesFromJohn).toHaveLength(1);
      // expect(messagesFromJohn[0].content).toBe('Hello, Jane!');
    });

    it('should add a new contact if sender is not in contacts and add the message', () => {
      // Arrange
      const state = {
        contacts: new Map(),
        messages: new Map(),
      };
      const action: StateAction = {
        type: 'ADD_MESSAGE',
        payload: {
          message: {
            messageFrom: 'John Doe',
            messageTo: 'Jane Doe',
            content: 'Hello, Jane!',
            messageId: '12345',
            timestamp: '13:00',
          },
          currentUser: 'jane Doe',
        },
      };

      // Act
      const newState = chatStateReducer(state, action);

      // Assert
      expect(newState.contacts.get('john doe')).toBeTruthy();
    });
  });
});
