import React from 'react';
import ReactDOM from 'react-dom';

import Relay from 'react-relay';
import Player from './player';

class PlayerLibrary extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.library.name}</h3>
        </div>
        <ul className="list-group">
          {this.props.library.items.map((item, index) =>
            <Player key={index} item={item} />
          )}
        </ul>
      </div>
    )
  }
}

PlayerLibrary = Relay.createContainer(PlayerLibrary, {
  fragments: {
    // A chunk of data requirement can be defined as fragment.
    // This way, you can import multiple fragments to build desired query instead of concatenating string.
    library: () => Relay.QL `
      fragment player on Player {
        name
        items {
          name
          quantity
        }
      }
    `
  }
});

class AppRoute extends Relay.Route {
  static routeName = 'App';
  static queries = {
    // Template literal Relay.QL converts it into a function that will be executed immediately.
    // If 'query' is specified in the template, it will be a function that fetches data from graphQL server.
    library: (Component) => Relay.QL `
      query RootQuery {
        player(playerName: "Ash") {
          ${Component.getFragment('library')}
        }
      }
    `
  }
}

ReactDOM.render(
  <Relay.RootContainer
    Component={PlayerLibrary}
    route={new AppRoute()} // Associate route with graphQL query that will be executed when this component is rendered.
  />,
  document.getElementById('react')
);
