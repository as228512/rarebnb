import { connect } from 'react-redux';
import { fetchHome } from '../../actions/home_actions';
import { fetchBookings } from '../../actions/booking_actions';
import { selectHome, selectBookingsForHome } from '../../reducers/selectors';
import { createBooking } from '../../actions/home_actions';
import { eraseHomes } from '../../actions/home_actions';
import HomeShow from './home_show';

const mapStateToProps = (state, { match }) => {
  const homeId = parseInt(match.params.homeId);
  const home = selectHome(state.entities, homeId);
  const bookings = selectBookingsForHome(state.entities, home);
  const currentLoadingState = state.ui.loadingState.homeLoading;
  return {
    homeId,
    home,
    bookings,
    currentLoadingState
  };
};

const mapDispatchToProps = dispatch => ({
  fetchHome: id => dispatch(fetchHome(id)),
  // fetchBookings: id => dispatch(fetchBookings(id)),
  eraseHome: () => dispatch(eraseHomes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeShow);
