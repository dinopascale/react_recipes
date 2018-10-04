import ActionButton from '../../shared/ActionButton';

export default ({ areThreads, loaded, load }) => {
  if (!areThreads) {
    if (loaded) {
      return (
        <p className="no-comments">
          No comments for this recipe! Be the first to write one!
          <style jsx>{`
            .no-comments {
              margin: 0;
              padding: 20px 5px;
              font-size: 18px;
              color: #777;
              text-align: center;
              line-height: 1.5;
            }
          `}</style>
        </p>
      );
    } else {
      return (
        <ActionButton
          handleClick={load}
          customStyle={{
            flex: '1 0 100%',
            backgroundColor: '#06b4fe',
            color: '#fff'
          }}
        >
          Load Comments
        </ActionButton>
      );
    }
  } else {
    return null;
  }
};
