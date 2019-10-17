export default function find(state = '', action) {
  if (action.type === 'FIND') {
    return action.payload;
  }
  return state;
}
