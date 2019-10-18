import React from 'react';
import './Pagination.css';
import {connect} from 'react-redux';

class Pagination extends React.Component {
  constructor() {
    super();
    this.classNamePrev = '';
    this.classNameNext = '';
    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {
      list,
    } = this.props;
    if (list !== nextProps.list) {
      console.log('36', this.classNamePrev);
      return true;
    }
    return true;
  }

  onClickPrev() {
    const {
      page, onPrev,
    } = this.props;
    if (page !== 1) {
      this.classNamePrev = 'active';
      onPrev();
    } if (page === 2) {
      this.classNamePrev = '';
    }
  }

  onClickNext() {
    const {
      page, totalCount, perPage, onNext,
    } = this.props;
    this.lastPage = Math.ceil(totalCount / perPage);
    if (page !== this.lastPage) {
      this.classNameNext = 'active';
      this.classNamePrev = 'active';
      onNext();
    } if (page === (this.lastPage - 1)) {
      this.classNameNext = '';
    }
  }

  render() {
    const {
      page, totalCount, perPage,
    } = this.props;
    this.lastPage = Math.ceil(totalCount / perPage);
    if (totalCount > perPage && page !== this.lastPage) {
      this.classNameNext = 'active';
    } if (page === 1) {
      this.classNamePrev = '';
    }
    return (
      <ul className="pagination">
        <li>
          <button
            type="button"
            className={`but page-prev ${this.classNamePrev}`}
            onClick={this.onClickPrev}>
            Previous
          </button>
        </li>
        <li>
          <button
            type="button"
            className="but page-center">
            {page}
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`but page-next ${this.classNameNext}`}
            onClick={this.onClickNext}>
            Next
          </button>
        </li>
      </ul>
    );
  }
}

export default connect(
  (state) => ({
    page: state.page,
    totalCount: state.totalCount,
    perPage: state.perPage,
    list: state.list,
  }),
  (dispatch) => ({
    onNext: () => dispatch({type: 'INCREMENT_PAGE'}),
    onPrev: () => dispatch({type: 'DECREMENT_PAGE'}),
  }),
)(Pagination);
