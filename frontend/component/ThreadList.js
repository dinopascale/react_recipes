import React, { Component } from 'react';

import CommentElement from './threadList/CommentElement';
import FilterRow from './threadList/FilterRow';
import NewComment from './threadList/NewComment';
import ActionButton from '../shared/ActionButton';
import withFilter from '../hoc/withFilter';
import withCommentAPI from '../hoc/withCommentAPI';
import CommentList from './threadList/CommentList';

const sortOptions = [
  {
    label: 'createdAt',
    value: 'Most Recent'
  },
  {
    label: 'totalRate',
    value: 'Most Popular'
  }
];

class ThreadList extends Component {
  state = {
    conversationsShowed: []
  };

  showResponseList = i => () => {
    console.log('qui', i);
    const showNewConversation = [...this.state.conversationsShowed];
    showNewConversation.push(i);
    console.log(showNewConversation);
    this.setState({
      conversationsShowed: showNewConversation
    });
  };

  render() {
    return (
      <div className="comments-section">
        <h2 className="comment-list-title">Comments</h2>
        <NewComment
          comment={this.props.submitNew}
          changed={this.props.createNew}
          value={this.props.new}
          isAuth={this.props.isAuth}
        />
        {this.props.list.length > 0 ? (
          <FilterRow options={sortOptions} selected={this.props.sorted} />
        ) : null}
        {this.props.list
          .sort((a, b) => b[this.props.sortBy] - a[this.props.sortBy])
          .map((comment, index) => (
            <div key={comment._id} className="comment-list">
              <CommentElement
                comment={comment}
                deleteSelf={comment.editable ? this.props.delete(index) : null}
                rateComment={this.props.rate(index)}
                showResponses={this.showResponseList(index)}
              />
              {this.state.conversationsShowed.includes(index) ? (
                <CommentList
                  apiId={comment._id}
                  baseURL="/api/comment"
                  type="comments"
                  auth={this.props.isAuth}
                />
              ) : null}
            </div>
          ))}
        <div className="load-button-container">
          {this.props.list.length === 0 ? (
            <ActionButton
              handleClick={this.props.load}
              customStyle={{
                width: '100%',
                border: '1px solid rgb(119, 181, 255)',
                padding: '30px',
                color: '#fff',
                fontWeight: 'bold',
                backgroundColor: 'rgb(119, 181, 255)'
              }}
            >
              Load Comments
            </ActionButton>
          ) : null}
        </div>
        <style jsx>{`
          .comments-section {
            background: #ffe4c4;
            padding: 10px 0;
            margin-top: 20px;
          }

          .comment-list-title {
            padding: 10px 20px;
            margin-bottom: 10px;
            color: rgb(119, 181, 255);
          }

          .comment-list {
            padding: 10px 0;
          }

          .load-button-container {
            padding: 20px 20px;
          }
        `}</style>
      </div>
    );
  }
}

export default withFilter(withCommentAPI(ThreadList), 'createdAt');
