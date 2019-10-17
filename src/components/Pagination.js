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

  onClickPrev() {
    	if (this.props.page !== 1) {
    		this.classNamePrev = 'active';
    		this.props.onPrev();
    	} if (this.props.page === 2) {
    		this.classNamePrev = '';
    	}
  }

  onClickNext() {
    	this.lastPage = Math.ceil(this.props.totalCount / this.props.perPage);
    	if (this.props.page !== this.lastPage) {
    		this.classNameNext = 'active';
    		this.classNamePrev = 'active';
    		this.props.onNext();
    	} if (this.props.page === (this.lastPage - 1)) {
    		this.classNameNext = '';
    	}
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.list !== nextProps.list) {
      console.log("36", this.classNamePrev);
      return true;
    }
    return true;
  }

  render() {   
    	this.lastPage = Math.ceil(this.props.totalCount / this.props.perPage);
    	if (this.props.totalCount > this.props.perPage && this.props.page !== this.lastPage) {
   			this.classNameNext = 'active';
        console.log("46", this.classNamePrev);
   		} if (this.props.page === 1) {
        console.log("47", this.classNamePrev);
        this.classNamePrev = '';
      }

    	return (
			<ul className="pagination">
				<li><button className={`but page-prev ${this.classNamePrev}`} onClick={this.onClickPrev}>Previous</button></li>
				<li><button className="but page-center">{this.props.page}</button></li>
				<li><button className={`but page-next ${this.classNameNext}`} onClick={this.onClickNext}>Next</button></li></ul>
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
