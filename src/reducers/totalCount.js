export default function totalCount(state = '', action) {
  if (action.type === 'TOTAL_COUNT' && action.payload) {
    return action.payload;
  }
  return state;
}
