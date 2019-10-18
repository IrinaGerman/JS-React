import React from 'react';
import {connect} from 'react-redux';
import Item from './Item';
import Pagination from './Pagination';
import './List.css';

class List extends React.Component {
  constructor() {
    super();
    this.onSelect = this.onSelect.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {
      find, page, url, perPage, list,
    } = this.props;
    if (find !== nextProps.find && page !== nextProps.page) {
      this.onSelect(nextProps.page, url, nextProps.find, perPage);
      return false;
    } if (find !== nextProps.find) {
      this.onSelect(page, url, nextProps.find, perPage);
      return false;
    } if (page !== nextProps.page) {
      this.onSelect(nextProps.page, url, find, perPage);
      return false;
    } if (list !== nextProps.list) {
      return true;
    }
    return false;
  }

  onSelect(page, url, find, perPage) {
    const {
      onSelectItems, onTotalCount, onRateLimit, onFind, onPage,
    } = this.props;
    this.urlName = `${url}q=${find}+in:name&per_page=${perPage}&page=${page}`;
    fetch(this.urlName)
      .then((promise) => promise.json())
      .then((promise) => {
        if (!promise.message) {
          onTotalCount(promise.total_count);
          onSelectItems(promise.items);
        } else {
          onRateLimit();
          onFind();
          onPage();
        }
      });
  }

  render() {
    const content = [];
    const {
      list, totalCount,
    } = this.props;
    if (Array.isArray(list) && (list[0])) {
      content.push((list).map((item) =>
        (
          <Item
            key={item.id}
            image={item.owner.avatar_url}
            name={item.name}
            owner={item.owner.login}
            language={item.language}
            watchers={item.watchers_count}
            forks={item.forks_count}
            stargazers={item.stargazers_count}
          />
        )));
      return (
        <div>
          <div className="results">
              results:
            {totalCount}
          </div>
          <div>{content}</div>
          <Pagination />
        </div>
      );
    } return (
      <div className="message">{list}</div>
    );
  }
}

export default connect(
  (state) => ({
    page: state.page,
    url: state.url,
    find: state.find,
    perPage: state.perPage,
    list: state.list,
    totalCount: state.totalCount,
  }),
  (dispatch) => ({
    onSelectItems: (items) => dispatch({type: 'NEW_ITEMS', payload: items}),
    onTotalCount: (count) => dispatch({type: 'TOTAL_COUNT', payload: count}),
    onRateLimit: () => dispatch({type: 'RATE_LIMIT'}),
    onFind: () => dispatch({type: 'FIND', payload: ''}),
    onPage: () => dispatch({type: 'FIRST_PAGE', payload: 1}),
  }),
)(List);
