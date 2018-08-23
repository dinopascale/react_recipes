import React, { Component } from 'react';

import CommentElement from './threadList/ThreadElement';
import FilterRow from './threadList/FilterRow';
import NewComment from './threadList/NewComment';
import ActionButton from '../shared/ActionButton';
import withFilter from '../hoc/withFilter';
import withCommentAPI from '../hoc/withCommentAPI';

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
  //   state = {
  // list: [],
  // loading: false
  // newComment: 'Login to write a comment...'
  //   };

  //   loadComments = async () => {
  //     this.setState({
  //       loading: true
  //     });
  //     const rawResponse = await fetch(`/api/threads/${this.props.recipeId}`, {
  //       method: 'GET',
  //       credentials: 'include'
  //     });

  //     const json = await rawResponse.json();

  //     console.log(json);

  //     this.setState({
  //       list: json.threads.map(thread => {
  //         return {
  //           ...thread,
  //           createdAt: new Date(thread.createdAt),
  //           updatedAt: new Date(thread.updatedAt)
  //         };
  //       }),
  //       loading: false
  //     });
  //   };

  //   rateComment = i => async event => {
  //     const value = event.target.name === 'up' ? 1 : -1;
  //     const comment = JSON.parse(JSON.stringify(this.state.list[i]));
  //     const rawResponse = await fetch(`/api/rate/c/${comment._id}`, {
  //       method: comment.ratedBefore ? 'PATCH' : 'POST',
  //       credentials: 'include',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ value })
  //     });

  //     const json = await rawResponse.json();

  //     if (json.status) {
  //       const newList = this.state.list.map((comment, index) => {
  //         if (index === i) {
  //           return {
  //             ...comment,
  //             userRate: value,
  //             totalRate: (comment.totalRate - comment.userRate || 0) + value,
  //             ratedBefore: true
  //           };
  //         }
  //         return comment;
  //       });

  //       this.setState({ list: newList });
  //     } else {
  //       //error handler
  //     }
  //   };

  //   onChangeNewComment = event => {
  //     this.setState({
  //       newComment: event.target.innerHTML
  //     });
  //   };

  //   onSubmitComment = async () => {
  //     const text = this.state.newComment;
  //     const rawResponse = await fetch(`/api/thread/${this.props.recipeId}`, {
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ text })
  //     });

  //     const json = await rawResponse.json();
  //     if (json.status) {
  //       this.setState({
  //         newComment: ''
  //       });
  //       await this.loadComments();
  //     } else {
  //       //error handler
  //     }
  //   };

  //   onDeleteComment = i => async () => {
  //     const commentToDelete = this.state.list[i];
  //     try {
  //       const rawResponse = await fetch(`/api/thread/${commentToDelete._id}`, {
  //         method: 'DELETE',
  //         credentials: 'include'
  //       });

  //       const json = await rawResponse.json();

  //       console.log(json);

  //       if (json.status) {
  //         await this.loadComments();
  //       } else {
  //         //error handler
  //       }
  //     } catch (e) {
  //       //error
  //     }
  //   };

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
              />
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
