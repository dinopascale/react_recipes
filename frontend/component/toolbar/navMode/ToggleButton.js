export default props => (
  <div className="hamburger-icon" onClick={props.openSideDrawer}>
    <span />
    <span />
    <span />
    <style jsx>{`
      .hamburger-icon {
        width: 25px;
        height: 15px;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        cursor: pointer;
      }

      .hamburger-icon span {
        width: 90%;
        border-radius: 70px;
        height: 2px;
        background-color: #919bb0;
      }

      @media (min-width: 499px) {
        .hamburger-icon {
          display: none;
        }
      }
    `}</style>
  </div>
);
