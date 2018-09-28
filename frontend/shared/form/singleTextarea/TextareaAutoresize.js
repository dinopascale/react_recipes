import React, { Component, Fragment } from 'react';

class TextareaAutoresize extends Component {
  constructor(props) {
    super(props);
    this.state = { textareaStyle: { ...this.props.customStyle } };
  }

  //   state = {
  //     textareaStyle: null
  //   };

  //   componentWillMount() {
  //     this.setState({
  //       textareaStyle: { ...this.props.customStyle }
  //     });
  //   }

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
            color: #fff;
            line-height: 1.5;
            border: none;
            border-radius: 3px;
            background: #10aeb2;
            outline: none;
            transition: all 0.2s linear;
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
