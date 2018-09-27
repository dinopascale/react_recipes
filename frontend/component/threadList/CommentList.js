import React, { Component } from 'react';
import withCommentAPI from '../../hoc/withCommentAPI';
import NewComment from './NewComment';
import CommentElement from './CommentElement';

class CommentList extends Component {
  async componentDidMount() {
    await this.props.load();
  }

  render() {
    return (
      <div className="response-list">
        {this.props.list.map((comment, index) => (
          <div key={comment._id} className="response-item">
            <CommentElement
              comment={comment}
              deleteSelf={comment.editable ? this.props.delete(index) : null}
              rateComment={this.props.auth ? this.props.rate(index) : null}
            />
          </div>
        ))}
        <NewComment
          comment={this.props.submitNew}
          changed={this.props.createNew}
          value={this.props.new}
          isAuth={this.props.auth}
        />
        <style jsx>{`
          .response-list {
            margin-left: 50px;
            margin-top: 10px;
          }

          .response-item {
            margin: 10px 0;
          }
        `}</style>
      </div>
    );
  }
}

export default withCommentAPI(CommentList);
