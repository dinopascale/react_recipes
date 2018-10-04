import React, { Component } from 'react';

import withCommentAPI from '../hoc/withCommentAPI';
import withFilter from '../hoc/withFilter';

import FilterRow from './threadSection/FilterRow';
import ThreadList from './threadSection/ThreadList';
import NewComment from './threadSection/NewComment';
import LoadThreadsButton from './threadSection/LoadThreadsButton';

class ThreadSection extends Component {
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
    const {
      sortBy,
      list,
      isAuth,
      deleteElement,
      rate,
      submitNew,
      createNew,
      newEl,
      listLoaded,
      load
    } = this.props;
    const { conversationsShowed } = this.state;
    return (
      <div className="comments-section">
        <h6 className="comment-list-title">Comments</h6>
        <NewComment
          comment={submitNew}
          changed={createNew}
          value={newEl}
          isAuth={isAuth}
        />
        {this.props.list.length > 0 ? <FilterRow sortBy={sortBy} /> : null}
        <ThreadList
          list={list}
          sortBy={sortBy}
          isAuth={isAuth}
          deleteEl={deleteElement}
          rate={rate}
          showResponseList={this.showResponseList}
          conversationShowed={conversationsShowed}
        />
        <div className="load-button-container">
          <LoadThreadsButton
            areThreads={list.length !== 0}
            loaded={listLoaded}
            load={load}
          />
        </div>
        <style jsx>{`
          .comments-section {
            background: #fff;
            padding: 10px 0;
            margin-top: 0px;
            width: 95%;
            margin: 0 auto 48px auto;
          }

          .comment-list-title {
            padding: 10px 20px;
            margin-top: 5px;
            margin-bottom: 0px;
            color: #26335e;
          }

          .load-button-container {
            padding: 30px 20px 20px 20px;
            display: flex;
            justify-content: center;
          }
        `}</style>
      </div>
    );
  }
}

export default withFilter(withCommentAPI(ThreadSection), 'createdAt');
