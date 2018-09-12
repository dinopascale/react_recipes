export default props => (
  <div className="hamburger-icon" onClick={props.openSideDrawer}>
    <span />
    <span />
    <span />
    <style jsx>{`
      .hamburger-icon {
        width: 40px;
        height: 50px;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        align-items: center;
        padding: 10px 0;
        box-sizing: border-box;
        cursor: pointer;
        cursor: pointer;
      }

      .hamburger-icon span {
        width: 90%;
        border-radius: 40px;
        height: 2px;
        background-color: #fff;
      }

      @media (min-width: 499px) {
        .hamburger-icon {
          display: none;
        }
      }
    `}</style>
  </div>
);
