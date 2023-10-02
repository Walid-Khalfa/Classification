// reducers.ts
import { combineReducers } from 'redux';

// Define an initial state interface
interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

// Define action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Define action interfaces
interface IncrementAction {
  type: typeof INCREMENT;
}

interface DecrementAction {
  type: typeof DECREMENT;
}

// Define a union type for all possible actions
type CounterActionTypes = IncrementAction | DecrementAction;

// Define a reducer function
const countReducer = (state = initialState, action: CounterActionTypes): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Combine reducers if needed
const rootReducer = combineReducers({
  count: countReducer,
  // Add more reducers here if you have multiple pieces of state
});

export default rootReducer;

