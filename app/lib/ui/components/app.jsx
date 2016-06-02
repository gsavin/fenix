const React = require('react')
    , Nav   = require('./nav.jsx')
    , Main  = require('./main.jsx')
    , fenix = require('../fenix-ui.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onError = this.onError.bind(this);
  }

  onError(err) {
    console.log("### ERROR ###", err);
  }

  componentDidMount() {
    fenix.api.on('/error', this.onError);
  }

  componentWillUnmount() {
    fenix.api.removeListener('/error', this.onError);
  }

  render() {
    return (
      <div id="app">
        <aside><Nav/></aside>
        <main><Main/></main>
      </div>
    );
  }
}

module.exports = App;
