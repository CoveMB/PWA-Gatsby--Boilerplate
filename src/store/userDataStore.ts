import { ConfigStore, Actions, UserData } from 'types';
import { initStore } from './useStore';

// Configure here actions for user store
const configureUserDataStore: ConfigStore = () => {

  const actions: Actions<UserData> = {
    UPDATE_USER_DATA: (currentState, userData) => ({
      ...currentState,
      userData: {
        ...currentState.userData, ...userData
      }
    }),
  };

  // Configure here initial state for the store
  initStore(actions, {
    userData: {
      tokens: [], email: ''
    }
  });

};

export { configureUserDataStore };
