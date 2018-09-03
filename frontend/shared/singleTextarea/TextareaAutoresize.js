import React, { Component, Fragment } from 'react';

class TextareaAutoresize extends Component {
  state = {
    textareaStyle: null
  };

  componentWillMount() {
    this.setState({
      textareaStyle: { ...this.props.customStyle }
    });
  }

  autoResize = event => {
    const target = event.target;
    const textareaStyle = {
      ...this.state.textareaStyle,
      height: target.scrollHeight
    };
    this.setState(
      {
        textareaStyle
      },
      () => {
        target.scrollTop = target.scrollHeight;
      }
    );
  };

  render() {
    const { textareaStyle } = this.state;
    return (
      <Fragment>
        <textarea
          className="form-textarea"
          value={this.props.value}
          onKeyUp={this.autoResize}
          style={textareaStyle}
          rows="8"
          spellCheck="false"
          {...this.props}
        />

        <style jsx>{`
          .form-textarea {
            display: block;
            overflow: hidden;
            resize: none;
            width: 100%;
            padding: 9px 8px;
            font-family: 'Open Sans', sans-serif;
            font-size: 15px;
            color: #fff;
            line-height: 1.5;
            border: none;
            border-radius: 3px;
            background: #77b5ff;
            outline: none;
            transition: all 0.1s linear;
          }

          .form-textarea.valid {
            background: #00e676;
          }

          .form-textarea.invalid {
            background: #b71c1c;
          }
          .valid {
          }
        `}</style>
      </Fragment>
    );
  }
}

export default TextareaAutoresize;
