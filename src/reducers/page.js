export default function page(state = 1, action) {
  if (action.type === 'INCREMENT_PAGE') {
    return ++state;
  } if (action.type === 'DECREMENT_PAGE') {
    return --state;
  } if (action.type === 'FIRST_PAGE') {
    return action.payload;
  }
  return state;
}
