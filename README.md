# React-modal-component
Yet another modal dialog built on react but with a simpler api and supports react-style animations. Inspired by https://github.com/rackt/react-modal.

## Example Usage

```css

.fade-appear {
  opacity: 0;
  transition: opacity .5s ease-in;
}

.fade-appear.fade-appear-active {
  opacity: 1;
}

.fade-leave {
  opacity: 1;
  transition: opacity .5s ease-in;
}

.fade-leave.fade-leave-active {
  opacity: 0;
}

```

```js
var Modal = require('react-modal-component');

var Component = React.createClass({
  getInitialState: function() {
    return { showModal: false };
  },
  openModal: function() {
    this.setState({showModal: true});
  },
  closeModal: function() {
    this.setState({showModal: false});
  },
  render: function() {
    var node = null;

    if (this.state.showModal) {
      node = (
        <Modal transitionName='fade'>
          <h3>Plain old Modal</h3>
          <button onClick={this.closeModal}>Close Dialog</button>
        </Modal>
      )
    }

    return
      (
        <div>
         <button onClick={this.openModal}>Show Dialog</button>
         {node}
        </div>
      )
  }
});

```

## Installation

`npm install react-modal-component --save`

 optional :-

 Use [modal.css](./assets/modal.css) included in this repo derived from [medium](https://medium.com) to support a responsive modal dialog.

## API

#### Modal(props)

Type: React Component

Basic modal.

### props.className

Class name for the modal. (default: `.modal-dialog`)

### props.overlay

Class name for the overlay/backdrop. (default: `.overlay`)

### props.appendTo

DOM node where the modal is appended. (default: `document.body`)

#### props.transitionName

Transition name to base the animation on.

### props.close

Function to call to close the dialog. Required to support props `closeOnEsc` and `closeOnOutsideClick`.

### props.closeOnEsc

Boolean value to support closing of dialog on Esc. (default: `false`)

### props.closeOnOutsideClick

Boolean value to support closing of dialog on clicking outside the dialog. (default: `false`)

### props.enterTimeout

(see below)

### props.leaveTimeout

(see below)


## Additional Information:

The CSSTransitionGroup component uses the ```transitionend``` event, which browsers will not send for any number of reasons, including the
transitioning node not being painted or in an unfocused tab.

This component supports a variant of [TimeoutTransitionGroup](https://github.com/Khan/react-components/blob/master/js/timeout-transition-group.jsx) to define a user-defined timeout to determine
when it is a good time to remove the component. Note:- It's modified to support ```enterTimeout``` for ```appear``` transition as well.

## Todo

* Support server rendering.

## Example

To run the example:

`npm install`

`npm run example`

## License
MIT
