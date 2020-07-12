import { initStore } from './useStore';

// Configure here actions for user store
const configureUserDataStore = () => {

  const actions = {
    UPDATE_USER_DATA: (currentState, userData) => ({
      ...currentState,
      userData: {
        ...currentState.userData, ...userData
      }
    }),
  };

  // Configure here initial state for the store
  initStore(actions, { userData: { tokens: [] } });

};

export { configureUserDataStore };
