import React, { Component } from 'react';
import withCommentAPI from '../../../hoc/withCommentAPI';

class CommentList extends Component {
  async componentDidMount() {
    await this.props.load();
  }

  render() {
    return this.props.list.map(comment => <div>{comment.text} ciao</div>);
  }
}

export default withCommentAPI(CommentList);
