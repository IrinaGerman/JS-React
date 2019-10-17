/* exported variableName */
import React from 'react';
import './Item.css';

const Item = (props) => (
    <div>
        <div className="item">
            <div><img src={props.image} alt=""/></div>
            <ul>
                <li><h3>Name: {props.name}</h3></li>
                <li><p>Owner: {props.owner}</p></li>
                <li><p>Language: {props.language}</p></li>
                <li><p>Watchers: {props.watchers}</p></li>
                <li><p>Forks: {props.forks}</p></li>
                <li><p>Stars: {props.stargazers}</p></li>
            </ul>
        </div>
    </div>
);

export default Item;
