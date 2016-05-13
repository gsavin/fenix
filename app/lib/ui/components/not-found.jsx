const React     = require('react');

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="error">View not found</div>
    );
  }
}

module.exports = NotFound;
