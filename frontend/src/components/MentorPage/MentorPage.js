import React from "react";
import { connect } from "react-redux";

const MentorPage = (props) => {
  console.log(props.auth.inProgress);
  return (
    <div>
      Mentor Page
      <p>{props.auth.inProgress}</p>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(MentorPage);
