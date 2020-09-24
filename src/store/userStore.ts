import { ConfigStore, Actions, User } from 'types';
import { initStore } from './useStore';

// Configure here actions for user store
const configureUserStore: ConfigStore = () => {

  const actions: Actions<User> = {
    SET_USER: (currentState, user) => ({
      ...currentState, user
    }),
  };

  // Configure here initial state for the store
  initStore(actions, { user: undefined });

};

export { configureUserStore };
