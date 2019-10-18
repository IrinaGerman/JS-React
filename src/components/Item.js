/* exported variableName */
import React from 'react';
import './Item.css';

const Item = (props) => {
  const {
    image, name, owner, language, watchers, forks, stargazers,
  } = props;
  return (
    <div>
      <div className="item">
        <div><img src={image} alt="" /></div>
        <ul>
          <li>
            <h3>
              Name:
              {name}
            </h3>
          </li>
          <li>
            <p>
              Owner:
              {owner}
            </p>
          </li>
          <li>
            <p>
              Language:
              {language}
            </p>
          </li>
          <li>
            <p>
              Watchers:
              {watchers}
            </p>
          </li>
          <li>
            <p>
              Forks:
              {forks}
            </p>
          </li>
          <li>
            <p>
              Stars:
              {stargazers}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Item;
