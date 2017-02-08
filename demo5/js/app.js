import React from 'react';
import ReactDOM from 'react-dom';

import Player from './player';

class PlayerLibrary extends React.Component {
  state = { name: null, items: [] };

  componentDidMount() {
    // Fetch player data via http request.
    fetch(`http://localhost:3000/graphql?query={
                            player(playerName: "Ash") {
                              name,
                              items {
                                name,
                                quantity
                              }
                            }
                          }`)
    .then(response => response.json())
    .then(json => {
      // Update state based on player object in response from graphQL server.
      this.setState(json.data.player)
    })
    .catch(ex => console.error(ex))
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.state.name}</h3>
        </div>
        <ul className="list-group">
          {this.state.items.map((item, index) => // Iterate over items that player has.
            <Player key={index} item={item} /> // Passing item object to player component.
          )}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <PlayerLibrary />,
  document.getElementById('react')
);
