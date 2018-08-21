import {
  OPEN_SESSION_MODAL,
  CLOSE_SESSION_MODAL
} from "../actions/modal_actions";

export default function modalReducer(state = null, action) {
  switch (action.type) {
    case OPEN_SESSION_MODAL:
      return action.modal;
    case CLOSE_SESSION_MODAL:
      return null;
    default:
      return state;
  }
}
