var React = require('react');
var TimeoutTransitionGroup = require('./TimeoutTransitionGroup');
var domEvents = require('attach-dom-events');
var selectParent = require('select-parent');

attachEvents = domEvents.on;
detachEvents = domEvents.off;

var PropTypes = React.PropTypes;
var ReactTransitionGroup = React.addons.TransitionGroup;
var validateClosePropTypes = function(props, propName, componentName) {
    var propValue = props[propName];
   if (propValue != null && typeof propValue !== 'boolean') {
     return new Error(
       'Expected a boolean for ' + propName + ' in ' +
       componentName + '.'
     );
   }
   if(propValue && !props.close) {
       return new Error(
       'Expected a function for prop `close` in ' +
       componentName + ', since prop `'+ propName + '` is set true.'
     );
   }
};

var Modal = React.createClass({
    displayName: 'Modal',

    propTypes: {
        appendTo: PropTypes.object,
        overlay: PropTypes.string,
        className: PropTypes.string,
        transitionName: PropTypes.string,
        transitionEnter: PropTypes.bool,
        transitionLeave: PropTypes.bool,
        transitionAppear: PropTypes.bool,
        enterTimeout: PropTypes.number,
        leaveTimeout: PropTypes.number,
        close: PropTypes.func,
        closeOnEsc: validateClosePropTypes,
        closeOnOutsideClick: validateClosePropTypes
    },

    getDefaultProps: function() {
        return {
          appendTo: document.body,
          overlay: 'overlay',
          className: 'modal-dialog',
          transitionAppear: true,
          transitionEnter: true,
          transitionLeave: true,
          closeOnEsc: false,
          closeOnOutsideClick: false
        };
    },

    render: function() {
        return null;
    },

    componentDidMount: function() {
        this.node = document.createElement('div');
        this.node.className = this.props.overlay;
        this.props.appendTo.appendChild(this.node);
        React.render(<_Modal {...this.props}/>, this.node);
        if (this.props.closeOnOutsideClick) {
            attachEvents(this.node, {
                'click': this._closeOnOutsideClick
            });
        }
        if (this.props.closeOnEsc) {
            attachEvents(document.body, {
                'keyup': this._closeOnEsc
            });
        }
    },

    _closeOnEsc: function(e) {
        if (e.keyCode === 27 && this.props.close) {
            this.props.close();
        }
    },

    _closeOnOutsideClick: function(e) {
        if (!e.target.classList.contains(this.props.className) &&
            !selectParent('.'+ this.props.className, e.target) &&
            this.props.close) {
            this.props.close();
        }
    },

    onTransitionEnd: function() {
        React.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
        if (this.props.closeOnOutsideClick) {
            detachEvents(this.node, {
                'click': this._closeOnOutsideClick
            });
        }
        if (this.props.closeOnEsc) {
            detachEvents(document.body, {
                'keyup': this._closeOnEsc
            });
        }
        this.node = null;
    },

    componentWillUnmount: function() {
        if (this.props.transitionName) {
            React.render(<_Modal {...this.props} children={null} onTransitionEnd={this.onTransitionEnd}/>,
                        this.node);
        } else {
            this.onTransitionEnd();
        }
    }
});


var _Modal = React.createClass({

    render: function() {
        var {appendTo, overlay, className, children, ...other} = this.props,
            key = 'modal-'+ Math.random();

        if (children) {
            node = (<div key={key} className={className}>
              {children}
            </div>)
        } else {
            node = <span key={key} style={{display:'inline-block'}}></span>
        }

        return <TimeoutTransitionGroup {...other}>
            {node}
        </TimeoutTransitionGroup>
    }
});


module.exports = Modal;
