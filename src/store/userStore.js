import { initStore } from './useStore';

const configureRefStore = () => {

  const actions = {
    SET_USER: (currentState, user) => ({
      ...currentState, user: { ...user }
    }),
  };

  initStore(actions, { user: {} });

};

export default configureRefStore;
