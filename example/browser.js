var insertCSS = require('insert-css');
var domReady = require('domready');
var domify = require('domify');
var React = require('react')
var Modal = require('../src/index');

var fs = require('fs');
var style = fs.readFileSync(__dirname+'/style.css', 'utf8');
insertCSS(style);

var SomePage = React.createClass({
  getInitialState: function() {
    return { showDialog: false };
  },
  showDialog: function() {
    this.setState({showDialog: !this.state.showDialog});
  },
  closeDialog: function() {
    this.setState({showDialog: false});
  },
  render: function() {
    if (this.state.showDialog) {
      node = (<Modal transitionName='zoom' closeOnEsc={true} closeOnOutsideClick={true} close={this.closeDialog}>
          <h3>Plain old Modal</h3>
          <button onClick={this.closeDialog}>Close Dialog</button>
        </Modal>)
    } else {
      node = null
    }

    return <div>
      <button onClick={this.showDialog}>Show Dialog</button>
      {node}
    </div>
  }
});

domReady(function () {
  document.body.appendChild(domify('<div class="container"></div>'));
  React.render(<SomePage/>, document.querySelector('.container'));
});
