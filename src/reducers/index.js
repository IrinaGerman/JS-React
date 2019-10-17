import {combineReducers} from 'redux';
import find from './find';
import list from './list';
import page from './page';
import url from './url';
import perPage from './perPage';
import totalCount from './totalCount';
import lastPage from './lastPage';

const reducer = combineReducers({
  find,
  list,
  page,
  url,
  perPage,
  totalCount,
  lastPage,
});

export default reducer;
