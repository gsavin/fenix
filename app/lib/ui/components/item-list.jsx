'use strict';

const React = require('react');

class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = [];

    if (this.props.items instanceof Array) {
      this.props.items.forEach(k => {
        items.push(<a className="item" key={ k }>{ k }</a>);
      });
    }
    else {
      Object.keys(this.props.items).forEach(k => {
        items.push(<a className="item" key={ k }>{ this.props.items[k] }</a>);
      });
    }

    return (
      <div className="item-list">{ items }</div>
    );
  }
}

ItemList.contextTypes = {
    items: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array])
};

module.exports = ItemList;
