import React, { Component } from 'react';

class Edit extends Component {
  static async getInitialProps({ req, query }) {
    if (req) {
      console.log(query);
    }

    console.log(query);

    return {};
  }

  render() {
    return <div>Ciao</div>;
  }
}

export default Edit;
