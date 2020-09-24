import { initStore } from './useStore';

// Configure here actions for user store
const configureUserStore = () => {

  const actions = {
    SET_USER: (currentState, user) => ({
      ...currentState, user: { ...user }
    }),
  };

  // Configure here initial state for the store
  initStore(actions, { user: {} });

};

export { configureUserStore };
