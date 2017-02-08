import React from 'react';

class Player extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        <span className="badge">{this.props.item.quantity}</span>
        {this.props.item.name}
      </li>
    );
  }
}

export default Player;
