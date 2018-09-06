import React, { Component } from 'react';
import Spinner from '../../component/Spinner';

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
            width: 100%;
            min-height: 200px;
            margin: 6px 0 10px 0;
          }

          .img-container img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
        `}</style>
      </div>
    );
  }
}

export default ImgDynamicSrc;
