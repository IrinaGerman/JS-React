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

  onSelect(page, url, find, perPage) {
    this.urlName = `${url}q=${find}+in:name&per_page=${perPage}&page=${page}`;
    fetch(this.urlName)
      .then((promise) => promise.json())
      .then((promise) => {
        if (!promise.message) {
          this.props.onTotalCount(promise.total_count);
          this.props.onSelectItems(promise.items);
        } else {
          this.props.onRateLimit();
          this.props.onFind();
          this.props.onPage();
        }
      });
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.find !== nextProps.find && this.props.page !== nextProps.page) {
      this.onSelect(nextProps.page, this.props.url, nextProps.find, this.props.perPage);
      return false;
    } if (this.props.find !== nextProps.find) {
      this.onSelect(this.props.page, this.props.url, nextProps.find, this.props.perPage);
      return false;
    } if (this.props.page !== nextProps.page) {
      this.onSelect(nextProps.page, this.props.url, this.props.find, this.props.perPage);
      return false;
    } if (this.props.list !== nextProps.list) {
      return true;
    }
    return false;
  }

  render() {
    const content = [];

    if (Array.isArray(this.props.list) && (this.props.list[0])) {
      content.push((this.props.list).map((item) =>
        (<Item
                    key={ item.id }
                    image={ item.owner.avatar_url }
                    name={ item.name }
                    owner={ item.owner.login }
                    language={ item.language }
                    watchers={ item.watchers_count }
                    forks={ item.forks_count }
                    stargazers={ item.stargazers_count }
                />)));
      return (
                <div>
                    <div className="results">results: {this.props.totalCount}</div>
                    <div>{content}</div>
                    <Pagination/>
                </div>
      );
    } return (
                <div className="message">{this.props.list}</div>
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
