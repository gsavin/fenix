const React                 = require('react')
    , BaseLink              = require('react-router5').BaseLink
    , withRoute             = require('react-router5').withRoute
    , MQTTConnectionManager = require('./mqtt-connection-manager.jsx')
    , Logo                  = require('./logo.jsx');

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const router = this.props.router;

    return (
      <nav id="main-nav">
        <BaseLink router={ router } routeName="home" className="icon-link"><Logo/></BaseLink>
        <BaseLink router={ router } routeName="mqtt">MQTT</BaseLink>
        <a>Database</a>
        <a>Network</a>
      </nav>
    );
  }
}

module.exports = withRoute(Nav);
