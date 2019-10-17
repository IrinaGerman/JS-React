/* exported variableName */
/* eslint no-unused-vars: "error" */
import React from 'react';
import Input from './Input';
import List from './List';
import './App.css';

class App extends React.Component {
  render() {
    return (
			<div>
				<Input/>
				<List/>
			</div>
    );
  }
}

export default App;
