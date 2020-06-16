import { initStore } from './useStore';

const configureRefStore = () => {

  const actions = {
    SET_USER: (currentState, user) => ({
      ...currentState, ...user
    }),
  };

  initStore(actions, {});

};

export default configureRefStore;
