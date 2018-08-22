import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { openSessionModal } from "../../actions/modal_actions";
import { updateAvatar } from "../../actions/user_actions";
import { eraseHomes } from "../../actions/home_actions";
import LoggedIn from "./greeting";

const mapStateToProps = ({ session, entities }) => {
  return {
    currentUser: entities.users[session.id]
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  updateAvatar: (id, formData) => dispatch(updateAvatar(id, formData)),
  openSessionModal: modal => dispatch(openSessionModal(modal)),
  eraseHomes: () => dispatch(eraseHomes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedIn);
