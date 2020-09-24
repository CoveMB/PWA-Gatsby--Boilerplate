import { Dispatch } from 'react';
import { ModelsActions, State } from 'types';

// Actions
export type Action<M> = (globalState: State, payload: Partial<M>) => PartialState;

export type Actions<M> = Record<string, Action<M> >;

export type PossibleActions = ModelsActions[keyof ModelsActions];

export type Listeners = Dispatch[];

// Store
export type PossibleStores = State[keyof State];

export type PartialState = Partial<State>;

export type StoreDispatch = (
  actionIdentifier: PossibleActions,
  payload?: Partial<PossibleStores>
) => void;

export type UseStore = (shouldListen = true) => [State, StoreDispatch];

export type InitStore = (storeActions: Actions, initialSate: PartialState) => void;

export type ConfigStore = () => void;
