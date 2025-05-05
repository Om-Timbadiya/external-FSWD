import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${id}`);
      setEvent(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch event details');
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

  if (!event) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          Event not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            {event.image && (
              <img
                src={`http://localhost:5000/${event.image}`}
                className="card-img-top"
                alt={event.title}
                style={{ height: '400px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h2 className="card-title">{event.title}</h2>
              <p className="card-text">{event.description}</p>
              <div className="mb-3">
                <strong>Date:</strong>{' '}
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="mb-3">
                <strong>Time:</strong> {event.time}
              </div>
              <div className="mb-3">
                <strong>Location:</strong> {event.location}
              </div>
              <div className="mb-3">
                <strong>Type:</strong>{' '}
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </div>
              <div className="mb-3">
                <strong>Organizer:</strong> {event.organizer?.name}
              </div>
              <button
                className="btn btn-primary me-2"
                onClick={() => navigate('/events')}
              >
                Back to Events
              </button>
              <button
                className="btn btn-success"
                onClick={() => navigate(`/events/${id}/edit`)}
              >
                Edit Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 