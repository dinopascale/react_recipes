import React, { Component } from 'react';

import withCommentAPI from '../hoc/withCommentAPI';
import withFilter from '../hoc/withFilter';

import CommentElement from './threadList/CommentElement';
import FilterRow from './threadList/FilterRow';
import NewComment from './threadList/NewComment';
import ActionButton from '../shared/ActionButton';
import CommentList from './threadList/CommentList';
import SortListRow from './recipesList/SortListRow';
import DropdownList from '../hoc/DropdownList';

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
    const showNewConversation = [...this.state.conversationsShowed];
    showNewConversation.push(i);
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
          //   <FilterRow options={sortOptions} selected={this.props.sorted} />

          <DropdownList
            render={(isOpen, toggleShow, close) => (
              <div className="sort-row">
                <SortListRow
                  isOpen={isOpen}
                  toggleShow={toggleShow}
                  close={close}
                  sortBy={
                    this.props.sortBy === 'totalRate'
                      ? 'Most Popular'
                      : 'Most Recent'
                  }
                  items={[
                    {
                      value: 'Most Popular',
                      handleClick: event =>
                        this.props.sorted(event, 'totalRate')
                    },
                    {
                      value: 'Most Recent',
                      handleClick: event =>
                        this.props.sorted(event, 'createdAt')
                    }
                  ]}
                />
              </div>
            )}
          />
        ) : null}
        {this.props.list
          .sort((a, b) => b[this.props.sortBy] - a[this.props.sortBy])
          .map((comment, index) => (
            <div key={comment._id} className="comment-list">
              <CommentElement
                comment={comment}
                deleteSelf={comment.editable ? this.props.delete(index) : null}
                rateComment={this.props.isAuth ? this.props.rate(index) : null}
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
            this.props.listLoaded ? (
              <p className="no-comments">
                No comments for this recipe! Be the first to write one!
              </p>
            ) : (
              <ActionButton
                handleClick={this.props.load}
                customStyle={{
                  width: '100%',
                  border: '1px solid rgb(236, 242, 132)',
                  padding: '30px',
                  color: '#000',
                  fontWeight: 'bold',
                  backgroundColor: 'rgb(236, 242, 132)'
                }}
              >
                Load Comments
              </ActionButton>
            )
          ) : null}
        </div>
        <style jsx>{`
          .comments-section {
            background: #ff7f50;
            padding: 10px 0;
            margin-top: 0px;
            width: 95%;
            margin: 0 auto;
          }

          .comment-list-title {
            padding: 10px 20px;
            margin-top: 5px;
            margin-bottom: 10px;
            color: #fff;
          }

          .sort-row {
            padding: 20px 20px 10px 20px;
          }

          .comment-list {
            padding: 10px 0;
          }

          .load-button-container {
            padding: 20px 20px;
          }

          .no-comments {
            margin: 0;
            padding: 20px 5px;
            font-size: 18px;
            color: #777;
            text-align: center;
            line-height: 1.5;
          }
        `}</style>
      </div>
    );
  }
}

export default withFilter(withCommentAPI(ThreadList), 'createdAt');
