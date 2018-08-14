import React, { Component } from 'react';

import DisplayRate from './rateRecipe/DisplayRate';
import ChangeRate from './rateRecipe/ChangeRate';

class RateRecipe extends Component {
  state = {
    ratedBefore: this.props.ratedBefore,
    userRate: this.props.userRate,
    rateCount: this.props.rateCount,
    rateValue: this.props.rateValue,
    rateSystem: ['empty', 'empty', 'empty', 'empty', 'empty'],
    isLoading: false
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

    const rawResp = await fetch(`/api/rate/r/${this.props.id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: rate })
    });

    const response = await rawResp.json();

    console.log(response);

    // this.setState({
    //   isLoading: false,
    //   ratedBefore: true,
    //   rateCount:
    //   rateValue: response.newRateValue,
    //   userRate: rate
    // });
    this.setState(prevState => ({
      isLoading: false,
      ratedBefore: true,
      rateCount: prevState.rateCount + 1,
      rateValue: prevState.rateValue + rate,
      userRate: rate
    }));
  };

  render() {
    const canRate = this.props.isAuth && !this.props.isAuthor;
    let content = null;
    if (this.state.ratedBefore || !canRate) {
      content = (
        <DisplayRate
          rate={this.state.rateValue}
          count={this.state.rateCount}
          userRate={this.state.userRate}
          isAuthor={this.props.isAuthor}
        />
      );
    } else {
      content = (
        <ChangeRate
          sys={this.state.rateSystem}
          eventHandler={this.setRate}
          sendRate={this.sendRate}
          recipeId={this.props.id}
        />
      );
    }
    return content;
  }
}

export default RateRecipe;
