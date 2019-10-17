export default function lastPage(state = 0, action) {
  if (action.type === 'LAST_PAGE') {
    return action.payload;
  }
  return state;
}
