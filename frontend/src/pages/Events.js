import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Upcoming Events</h2>
      <div className="row">
        {events.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">
              No events found. Be the first to create an event!
            </div>
          </div>
        ) : (
          events.map((event) => (
            <div className="col-md-4 mb-4" key={event._id}>
              <div className="card h-100">
                {event.image && (
                  <img
                    src={`http://localhost:5000/${event.image}`}
                    className="card-img-top"
                    alt={event.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description.substring(0, 100)}...</p>
                  <div className="mb-2">
                    <small className="text-muted">
                      Date: {new Date(event.date).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Location: {event.location}</small>
                  </div>
                  <Link to={`/events/${event._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events; 