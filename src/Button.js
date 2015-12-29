import React, {Component} from 'react';
import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import CSSCore from 'fbjs/lib/CSSCore';

import {_bind, onCSSTransitionEnd} from './utils';

export default class Button extends Component {
  static displayName = 'Button'

  constructor(props) {
    super(props);
    _bind(this, 'handleClick');
  }

  handleClick(e) {
    CSSCore.addClass(this.toastrButton, 'active');

    /*
     * In order to avoid event bubbling we need to call the onClick callback
     * after we have remove the css class 'active' that contains the animation
     */
    const end = () => {
      CSSCore.removeClass(this.toastrButton, 'active');
      if (this.props.onClick) {
        this.props.onClick && this.props.onClick();
      }
    };

    onCSSTransitionEnd(this.toastrButton, end);
  }

  render() {
    return (
      <button
        ref={(ref) => this.toastrButton = ref}
        type="button"
        onClick={e => this.handleClick(e)}><p>{this.props.children}</p></button>
    );
  }
}