import React, { Component } from 'react';
import CommentElement from './commentList/CommentElement';
import FilterRow from './commentList/FilterRow';
import NewComment from './commentList/NewComment';

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

class CommentList extends Component {
  state = {
    list: [],
    loading: false,
    sortBy: 'createdAt',
    newComment: ''
  };

  loadComments = async () => {
    this.setState({
      loading: true
    });
    const rawResponse = await fetch(`/api/threads/${this.props.recipeId}`, {
      method: 'GET',
      credentials: 'include'
    });

    const json = await rawResponse.json();

    console.log(json);

    this.setState({
      list: json.threads.map(thread => {
        return {
          ...thread,
          createdAt: new Date(thread.createdAt),
          updatedAt: new Date(thread.updatedAt)
        };
      }),
      loading: false
    });
  };

  rateComment = i => async event => {
    const value = event.target.name === 'up' ? 1 : -1;
    const comment = JSON.parse(JSON.stringify(this.state.list[i]));
    const rawResponse = await fetch(`/api/rate/c/${comment._id}`, {
      method: comment.ratedBefore ? 'PATCH' : 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    });

    const json = await rawResponse.json();

    if (json.status) {
      const newList = this.state.list.map((comment, index) => {
        if (index === i) {
          return {
            ...comment,
            userRate: value,
            totalRate: (comment.totalRate - comment.userRate || 0) + value,
            ratedBefore: true
          };
        }
        return comment;
      });

      this.setState({ list: newList });
    } else {
      //error handler
    }
  };

  onChangeNewComment = event => {
    this.setState({
      newComment: event.target.value
    });
  };

  onAddComment = async () => {
    const text = this.state.newComment;
    const rawResponse = await fetch(`/api/thread/${this.props.recipeId}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    const json = await rawResponse.json();
    if (json.status) {
      this.setState({
        newComment: ''
      });
      await this.loadComments();
    } else {
      //error handler
    }
  };

  selectSortOptions = event => {
    this.setState({
      sortBy: event.target.value
    });
  };

  render() {
    return (
      <div>
        <h2 className="comment-list-title">Comments</h2>
        {this.props.isAuth ? (
          <NewComment
            comment={this.onAddComment}
            changed={this.onChangeNewComment}
            value={this.state.newComment}
          />
        ) : null}
        {this.state.list.length > 0 ? (
          <FilterRow options={sortOptions} selected={this.selectSortOptions} />
        ) : null}
        {this.state.list
          .sort((a, b) => b[this.state.sortBy] - a[this.state.sortBy])
          .map((comment, index) => (
            <div key={comment._id} className="comment-list">
              <CommentElement
                comment={comment}
                rateComment={this.rateComment(index)}
              />
            </div>
          ))}
        {this.state.list.length === 0 ? (
          <button onClick={this.loadComments}>Load</button>
        ) : null}
        <style jsx>{`
          .comment-list-title {
            padding: 0px 20px;
            margin-bottom: 10px;
          }

          .comment-list {
            padding: 10px 0;
          }
        `}</style>
      </div>
    );
  }
}

export default CommentList;
