import React, { Component } from 'react';
import NewComment from '../NewComment';
import CommentElement from './CommentElement';

class CommentList extends Component {
  async componentDidMount() {
    await this.props.loadData();
  }

  render() {
    const {
      isAuth,
      isAuthor,
      list,
      loaded,
      showed,
      userInfo,
      newCommentShowed,
      showNewComment,
      hideNewComment,
      setNewCommentRef,
      submitNewComment,
      setEditableElement,
      editingComment,
      enterCommentEditMode,
      exitCommentEditMode,
      submitChangeComment,
      deleteComment,
      rateComment
    } = this.props;

    let content = null;

    if (!loaded || !showed) {
      content = null;
    } else {
      content = list
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((comment, index) => (
          <div key={comment._id} className="response-item">
            <CommentElement
              comment={comment}
              isAuthor={isAuthor}
              setEditableRef={setEditableElement}
              editable={comment.editable}
              isAuth={isAuth}
              enterEditMode={enterCommentEditMode}
              exitEditMode={exitCommentEditMode}
              editingThread={editingComment}
              submitChangeElement={submitChangeComment}
              deleteElement={deleteComment}
              rateElement={isAuth ? rateComment(index) : null}
              showNewComment={showNewComment}
              isComment
            />
            <style jsx>{`
              .response-item {
                padding: 24px 0 8px 0;
              }
            `}</style>
          </div>
        ));
    }

    return (
      <div className="response-list">
        <NewComment
          userInfo={userInfo}
          showed={newCommentShowed}
          hideNew={hideNewComment}
          submit={submitNewComment}
          setNewRef={setNewCommentRef}
          isResponse
        />
        {content}
        <style jsx>{`
          .response-list {
            width: 85%;
            min-width: 252px;
            margin-right: 0;
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }
}

export default CommentList;
