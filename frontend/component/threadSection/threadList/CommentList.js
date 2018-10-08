import React, { Component } from 'react';
import withCommentAPI from '../../../hoc/withCommentAPI';
import NewComment from '../NewComment';
import CommentElement from './CommentElement';

class CommentList extends Component {
  //   async componentDidMount() {
  //     await this.props.load();
  //   }

  render() {
    const {
      list,
      loaded,
      showed,
      userInfo,
      newCommentShowed,
      showNewComment,
      hideNewComment,
      setNewCommentRef,
      submitNewComment
    } = this.props;

    console.log(!loaded || !showed);

    let content = null;

    if (!loaded || !showed) {
      content = null;
    } else if (list.length === 0 && loaded) {
      content = <p>No comments</p>;
    } else {
      content = this.props.list.map((comment, index) => (
        <div key={comment._id} className="response-item">
          <CommentElement
            comment={comment}
            showNewComment={showNewComment}
            isComment
            //   deleteSelf={comment.editable ? this.props.delete(index) : null}
            //   rateComment={this.props.auth ? this.props.rate(index) : null}
          />
        </div>
      ));
    }

    return (
      <div className="response-list">
        {content}
        <NewComment
          userInfo={userInfo}
          showed={newCommentShowed}
          hideNew={hideNewComment}
          submit={submitNewComment}
          setNewRef={setNewCommentRef}
          isResponse
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

export default CommentList;
