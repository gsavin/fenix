'use strict';

const React = require('react');

class DataWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="data-widget" draggable="true">
        <div className="value">{ this.props.data.value }</div>
        <div className="type">{ this.props.data.type }</div>
      </div>
    );
  }
}

DataWidget.propTypes = {
    data: React.PropTypes.object.isRequired
};

module.exports = DataWidget;
