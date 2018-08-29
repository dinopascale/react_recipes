import React, { Component } from 'react';
import Head from 'next/head';

class NewRecipe extends Component {
  render() {
    console.log('ciao');
    return (
      <div>
        <Head>
          <title>New Recipe</title>
        </Head>
        New Recipe
      </div>
    );
  }
}

export default NewRecipe;
