import React, { Component } from 'react';
import Spinner from '../../../component/Spinner';

class ImgDynamicSrc extends Component {
  state = {
    loading: true,
    error: false
  };

  handleLoading = () => {
    this.setState({
      loading: false
    });
  };

  handleError = () => {
    this.setState({
      loading: false,
      error: true
    });
  };

  render() {
    const { loading, error } = this.state;
    const { imgURL } = this.props;
    return (
      <div className="img-container">
        {loading ? <Spinner type="contain" /> : null}
        <img
          src={error ? '/static/no-img.png' : imgURL}
          onLoad={this.handleLoading}
          onError={this.handleError}
        />
        <style jsx>{`
          .img-container {
            position: relative;
            height: 150px;
            width: 100%;
            margin: 6px auto 10px auto;
          }

          .img-container img {
            max-height: 150px;
            margin: 0 auto;
            display: block;
            border-radius: 8px;
          }
        `}</style>
      </div>
    );
  }
}

export default ImgDynamicSrc;
