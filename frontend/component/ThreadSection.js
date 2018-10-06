import React, { Component } from 'react';

import withCommentAPI from '../hoc/withCommentAPI';
import withFilter from '../hoc/withFilter';

import ThreadList from './threadSection/ThreadList';
import NewComment from './threadSection/NewComment';
import LoadThreadsButton from './threadSection/LoadThreadsButton';
import ActionButton from '../shared/ActionButton';
import ThreadActionRow from './threadSection/ThreadActionRow';
import NoThreads from './threadSection/NoThreads';

class ThreadSection extends Component {
  state = {
    initialized: false
  };

  componentDidUpdate(prevProps) {
    const { initialized } = this.state;
    const { isVisible, loadThreads } = this.props;
    if (!initialized && prevProps.isVisible !== isVisible) {
      this.setState({
        initialized: true
      });
      loadThreads();
    }
  }

  render() {
    const {
      sortBy,
      sorted,
      isAuth,
      list,
      rate,
      submitNew,
      createNew,
      newEl,
      listLoaded,
      load,
      isVisible,
      listInfo,
      loadThreads,
      showNewThread,
      hideNewThread,
      setNewThreadRef,
      setEditableRef,
      submitNewThread,
      enterEditMode,
      exitEditMode,
      submitChangeElement,
      deleteElement,
      rateElement
    } = this.props;

    const loadedAndEmptyList =
      listInfo.list.length === 0 && this.state.initialized;
    console.log(loadedAndEmptyList);

    if (!isVisible) {
      return (
        <div className="placeholder">
          <style jsx>{`
            .placeholder {
              height: 50px;
            }
          `}</style>
        </div>
      );
    }

    console.log(listInfo.list);

    return (
      <div className="comments-section">
        <h6 className="comment-list-title">Comments</h6>
        <ThreadActionRow
          listLength={listInfo.list.length}
          sortBy={sortBy}
          sorted={sorted}
          isAuth={isAuth}
          showNew={showNewThread}
        />
        <NewComment
          userInfo={isAuth}
          showed={listInfo.showNewElement}
          hideNew={hideNewThread}
          submit={submitNewThread}
          setNewRef={setNewThreadRef}
        />
        {/* <ThreadList
          list={listInfo.list}
          sortBy={sortBy}
          isAuth={isAuth}
          deleteEl={deleteElement}
          rate={rate}
          showResponseList={this.showResponseList}
          conversationShowed={conversationsShowed}
        /> */}
        <div className="thread-list-container">
          {!loadedAndEmptyList ? (
            <ThreadList
              list={listInfo.list}
              sortBy={sortBy}
              userInfo={isAuth}
              setEditableRef={setEditableRef}
              enterEditMode={enterEditMode}
              exitEditMode={exitEditMode}
              editingThread={listInfo.idElementEditing}
              submitChangeElement={submitChangeElement}
              deleteElement={deleteElement}
              rateElement={rateElement}
            />
          ) : (
            <NoThreads />
          )}
        </div>
        <style jsx>{`
          .comments-section {
            background: #fff;
            padding: 10px 0;
            margin-top: 0px;
            width: 95%;
            margin: 0 auto 48px auto;
            border-top: 1px solid #ccc;
          }

          .comment-list-title {
            padding: 10px 20px;
            margin-top: 5px;
            margin-bottom: 0px;
            color: #26335e;
          }

          .row-filter-new {
            display: flex;
            flex-flow: row nowrap;
          }

          .thread-list-container {
            min-height: 50px;
          }
        `}</style>
      </div>
    );
  }
}

export default withFilter(ThreadSection, 'createdAt');
