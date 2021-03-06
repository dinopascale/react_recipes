import React, { Component, Fragment } from 'react';

class TextareaAutoresize extends Component {
  constructor(props) {
    super(props);
    this.state = { textareaStyle: { ...this.props.customStyle } };
  }

  autoResize = event => {
    const target = event.target;
    const textareaStyle = {
      ...this.state.textareaStyle,
      minHeight: target.scrollHeight
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
          onFocus={this.autoResize}
          onKeyUp={this.autoResize}
          style={textareaStyle}
          rows="4"
          spellCheck="false"
          {...this.props}
        />

        <style jsx>{`
          .form-textarea {
            display: block;
            overflow: hidden;
            resize: none;
            width: 100%;
            min-height: 80px;
            padding: 10px 8px;
            font-family: 'Open Sans', sans-serif;
            font-size: 15px;
            color: #111;
            line-height: 1.5;
            border: 1px solid #bdbdbd;
            border-radius: 3px;
            background: #fff;
            outline: none;
            transition: all 0.2s linear;
          }

          .form-textarea.valid {
            border: 1px solid #00e676;
          }

          .form-textarea.invalid {
            border: 1px solid #b71c1c;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default TextareaAutoresize;
