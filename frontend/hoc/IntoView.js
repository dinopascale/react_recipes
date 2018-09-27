import React, { Component } from 'react';

class IntoView extends Component {
  constructor() {
    super();
    this.state = { isVisible: false };
    this.io = null;
    this.container = null;
  }

  componentDidMount() {
    this.io = new IntersectionObserver(([entry]) => {
      this.setState({
        isVisible: entry.isIntersecting
      });
    }, {});
    this.io.observe(this.container);
  }

  componentWillUnmount() {
    if (this.io) {
      this.io.disconnect();
    }
  }

  render() {
    return (
      <div
        style={{ width: '100%' }}
        ref={div => {
          this.container = div;
        }}
      >
        {this.props.render(this.state.isVisible)}
      </div>
    );
  }
}

export default IntoView;
