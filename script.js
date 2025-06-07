function createStore(reducer) {
  let state;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  // Initialize the state
  dispatch({ type: "@@INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

function counterReducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
const store = createStore(counterReducer);
function render() {
  const state = store.getState();
  document.getElementById("counter").innerText = state;
}
document.getElementById("increase").addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});

document.getElementById("decrease").addEventListener("click", () => {
  store.dispatch({ type: "DECREMENT" });
});
store.subscribe(render);
