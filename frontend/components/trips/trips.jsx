import React from "react";
import ReactBodymovin from "react-bodymovin";
import animation from "../../../app/assets/animations/techno_penguin.json";

import { NavBar } from "../nav/nav_bar";
import { BottomNavBar } from "../nav/bottom_nav";
import HomeIndex from "../homes/home_index";

class Trips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLoad: true,
      loadComplete: false
    };
  }

  componentDidMount() {
    this.props.fetchTrips().then(payload => {
      const tripHomeIds = [];

      Object.keys(payload.trips).forEach(key => {
        tripHomeIds.push(payload.trips[key]["home_id"]);
      });

      this.props.fetchHomes({ trips: tripHomeIds });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.loadComplete) this.setState({ loadComplete: false });

    //toggle off initalLoad once assets begin load
    if (nextProps.isLoadingAssets && this.state.initialLoad) {
      this.setState({ initialLoad: false });
      return false;
    }
    //once all assets have loaded, render will fire
    else if (!this.state.initialLoad && !nextProps.isLoadingAssets) {
      this.setState({ initialLoad: true, loadComplete: true });
      return true;
    } else return false;
  }

  componentWillUnmount() {
    this.props.clearHomes();
  }

  futureTrips(futureBookings) {
    if (futureBookings.length) {
      return (
        <div>
          <h1 className="trips-heading">Upcoming Trips</h1>
          <HomeIndex
            homes={this.props.homes.futureTrips}
            bookings={futureBookings}
            upcomingTrip={true}
          />
        </div>
      );
    }
  }

  pastTrips(pastBookings) {
    if (pastBookings.length) {
      return (
        <div>
          <h1 className="trips-heading">Past Trips</h1>
          <HomeIndex
            homes={this.props.homes.pastTrips}
            bookings={pastBookings}
            upcomingTrip={false}
          />
        </div>
      );
    }
  }

  noTrips(pastBookings, futureBookings) {
    if (!pastBookings.length && !futureBookings.length) {
      const bodyMovinOptions = {
        loop: true,
        autoplay: true,
        prerender: true,
        animationData: animation
      };

      return (
        <div className="dancing-penguin-cntr">
          <div className="no-trips-text-cntr">
            <h1>
              Is it <span>cold</span> in here,
            </h1>
            <h1>
              {" "}
              or is it just us<span>?</span>
            </h1>
            <br />
            <h2>
              You don't have any trips currently planned, let's change that!
            </h2>
            <h2>Search for a location above to get started.</h2>
          </div>
          <div className="dancing-penguin">
            <ReactBodymovin options={bodyMovinOptions} />
          </div>
        </div>
      );
    }
  }

  bottomNavBar() {
    return (
      <div className="trip-index-bottom-bar">
        <BottomNavBar />
      </div>
    );
  }

  sortTrips() {
    const bookings = this.props.bookings;
    let futureBookings = Object.keys(bookings).filter(key => {
      return new Date(bookings[key]["end_date"]) > new Date();
    });
    let pastBookings = Object.keys(bookings).filter(key => {
      return new Date(bookings[key]["end_date"]) <= new Date();
    });

    futureBookings = futureBookings.map(key => {
      return bookings[key];
    });
    pastBookings = pastBookings.map(key => {
      return bookings[key];
    });

    return (
      <div>
        <NavBar />
        {this.noTrips(pastBookings, futureBookings)}
        {this.futureTrips(futureBookings)}
        <br />
        {this.pastTrips(pastBookings)}
        {this.bottomNavBar()}
      </div>
    );
  }

  render() {
    if (this.state.loadComplete) return <div>{this.sortTrips()}</div>;
    else return <div />;
  }
}

export default Trips;
