import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to College Events</h1>
        <p className="lead">
          Discover and participate in exciting college events. From workshops to cultural festivals,
          find events that match your interests.
        </p>
        <hr className="my-4" />
        <p>
          Join our community to stay updated with the latest events and create your own events.
        </p>
        <Link to="/events" className="btn btn-primary btn-lg me-2">
          Browse Events
        </Link>
        <Link to="/create-event" className="btn btn-success btn-lg">
          Create Event
        </Link>
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Upcoming Events</h5>
              <p className="card-text">
                Stay tuned for exciting upcoming events. Check our events page regularly for updates.
              </p>
              <Link to="/events" className="btn btn-outline-primary">
                View Events
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create Your Event</h5>
              <p className="card-text">
                Have an idea for an event? Create and manage your own events with our easy-to-use platform.
              </p>
              <Link to="/create-event" className="btn btn-outline-success">
                Create Event
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Join Our Community</h5>
              <p className="card-text">
                Register now to participate in events, connect with other students, and stay updated.
              </p>
              <Link to="/register" className="btn btn-outline-info">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 