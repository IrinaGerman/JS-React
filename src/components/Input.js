import React from 'react';
import {connect} from 'react-redux';
import './Input.css';

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeName(event) {
    this.setState({inputName: event.target.value});
  }

  onSubmit() {
    const {
      onPage, onFind,
    } = this.props;
    const {
      inputName,
    } = this.state;
    onPage();
    onFind(inputName);
    this.setState({inputName: ''});
  }

  render() {
    const {
      inputName,
    } = this.state;
    return (
      <div className="inputForm">
        <ul>
          <li className="title">github search</li>
          <li>
            <input
              type="text"
              className="inputName"
              value={inputName}
              onChange={this.onChangeName}
              placeholder="enter repository name"
            />
          </li>
          <li><button type="submit" className="submit" onClick={this.onSubmit}>submit</button></li>
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    find: state.find,
  }),
  (dispatch) => ({
    onFind: (name) => dispatch({type: 'FIND', payload: name}),
    onPage: () => dispatch({type: 'FIRST_PAGE', payload: 1}),
  }),
)(Input);
