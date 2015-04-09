var React = require('react');
var TimeoutTransitionGroup = require('./TimeoutTransitionGroup');

var PropTypes = React.PropTypes;
var ReactTransitionGroup = React.addons.TransitionGroup;

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
        leaveTimeout: PropTypes.number
    },

    getDefaultProps: function() {
        return {
          appendTo: document.body,
          overlay: 'overlay',
          className: 'modal-dialog',
          transitionAppear: true,
          transitionEnter: true,
          transitionLeave: true
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
    },

    onTransitionEnd: function() {
        React.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
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
