import { useCallback, useEffect, useState } from 'react';

// Initial global state listener and actions for the store
let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {

  // Create a react state
  const setGlobalState = useState(globalState)[1];

  // Create the dispatch method
  const dispatch = useCallback((actionIdentifier, payload) => {

    const newState = actions[actionIdentifier](globalState, payload);

    // Merge states
    globalState = {
      ...globalState, ...newState
    };

    // Connect listeners to state
    listeners.forEach((listener) => {

      listener(globalState);

    });

  }, []);

  useEffect(() => {

    if (shouldListen) {

      listeners.push(setGlobalState);

    }

    return () => {

      if (shouldListen) {

        listeners = listeners.filter((li) => li !== setGlobalState);

      }

    };

  }, []);

  // calling useState hook will return the state and a dispatch method to trigger actions
  return [ globalState, dispatch ];

};

// Init the store
export const initStore = (userActions, initialState) => {

  if (initialState) {

    // Merge initial states if any of all stores
    globalState = {
      ...globalState, ...initialState
    };

  }

  // Merges actions from all stores
  actions = {
    ...actions, ...userActions
  };

};
