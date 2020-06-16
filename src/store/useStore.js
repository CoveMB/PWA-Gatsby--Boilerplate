import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {

  const setGlobalState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {

    const newState = actions[actionIdentifier](globalState, payload);

    globalState = {
      ...globalState, ...newState
    };

    listeners.forEach((listener) => {

      listener(globalState);

    });

  };

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

  return [ globalState, dispatch ];

};

export const initStore = (userActions, initialState) => {

  if (initialState) {

    globalState = {
      ...globalState, ...initialState
    };

  }
  actions = {
    ...actions, ...userActions
  };

};
