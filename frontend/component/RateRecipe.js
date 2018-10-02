import React, { Component } from 'react';

import DisplayRate from './rateRecipe/DisplayRate';
import ChangeRate from './rateRecipe/ChangeRate';
import Spinner from './Spinner';

class RateRecipe extends Component {
  state = {
    rateCount: this.props.rateCount,
    rateValue: this.props.rateValue,
    userRate: null,
    rated: false,
    isLoading: false,
    initialized: false,
    rateSystem: ['empty', 'empty', 'empty', 'empty', 'empty']
  };

  getRatedBefore = async () => {
    this.setState({
      isLoading: true
    });

    const endpoint = `/api/recipe/rated/${this.props.recipeId}`;
    const options = {
      method: 'GET',
      credentials: 'include'
    };

    const response = await fetch(endpoint, options);

    const json = await response.json();

    this.setState({
      initialized: true,
      rated: json.meta.rated,
      userRate: json.data.value,
      isLoading: false
    });
  };

  setRate = i => event => {
    const newRate = this.state.rateSystem.map((el, index) => {
      if (index <= i) {
        return 'full';
      }
      return 'empty';
    });
    this.setState({ rateSystem: newRate });
  };

  sendRate = async () => {
    this.setState({
      isLoading: true
    });

    const rate = this.state.rateSystem.reduce((sum, current) => {
      if (current === 'full') {
        return ++sum;
      } else {
        return sum;
      }
    }, 0);

    const rawResp = await fetch(`/api/rate/r/${this.props.recipeId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: rate })
    });

    const response = await rawResp.json();

    this.setState(prevState => ({
      isLoading: false,
      rated: true,
      rateCount: prevState.rateCount + 1,
      rateValue: prevState.rateValue + rate,
      userRate: rate
    }));
  };

  componentDidUpdate(prevProps) {
    const { initialized } = this.state;
    if (!initialized && prevProps.isVisible !== this.props.isVisible) {
      this.getRatedBefore();
    }
  }

  render() {
    const { isAuth, isAuthor, recipeId } = this.props;
    const {
      rateValue,
      rateCount,
      userRate,
      rateSystem,
      rated,
      isLoading
    } = this.state;
    const canRate = isAuth && !isAuthor;

    let content = null;

    if (isLoading) {
      return (
        <div className="placeholder">
          <Spinner type="contain" />
          <style jsx>{`
            .placeholder {
              width: 100%;
              min-height: 210px;
              position: relative;
              width: 95%;
              margin: 0 auto;
              padding: 2px 8px;
              background: #fff;
            }
          `}</style>
        </div>
      );
    }

    if (rated || !canRate) {
      content = (
        <DisplayRate
          rate={rateValue}
          count={rateCount}
          userRate={userRate}
          isAuthor={isAuthor}
          isAuth={isAuth}
        />
      );
    } else {
      content = (
        <ChangeRate
          sys={rateSystem}
          eventHandler={this.setRate}
          sendRate={this.sendRate}
          recipeId={recipeId}
        />
      );
    }
    return content;
  }
}

export default RateRecipe;
