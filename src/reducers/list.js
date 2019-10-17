export default function list(state = '', action) {
  if (action.type === 'NEW_ITEMS' && action.payload[0]) {
    return action.payload;
  } if (action.type === 'NEW_ITEMS') {
    return 'THIS REQUEST IS NOT CORRECT';
  } if (action.type === 'RATE_LIMIT') {
    return 'You have reached a request limit. Please wait a few minutes before you try again.';
  }
  return state;
}
