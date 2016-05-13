const React = require('react')
    , Nav   = require('./nav.jsx')
    , Main  = require('./main.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
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
