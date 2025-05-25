import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../lib/Db';

const EventView = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchEventAndParticipants = async () => {
      const { data: eventData, error: eventError } = await supabase
        .from('userEvents')
        .select('*')
        .eq('id', id)
        .single();

      if (eventError) {
        console.error('Error fetching event:', eventError);
        return;
      }

      setEvent(eventData);

      const { data: participantsData, error: participantsError } = await supabase
        .from('userParticipate')
        .select('*')
        .eq('eid', eventData.uid);

      if (participantsError) {
        console.error('Error fetching participants:', participantsError);
      } else {
        setParticipants(participantsData);
      }
    };

    if (id) fetchEventAndParticipants();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 text-gray-800">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">📅 Event Details</h1>

      {event ? (
        <div className="mb-8 space-y-2 bg-gray-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
          <p><span className="font-semibold text-gray-700">Title:</span> {event.title}</p>
          <p><span className="font-semibold text-gray-700">Date:</span> {event.date}</p>
          <p><span className="font-semibold text-gray-700">Description:</span> {event.description}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading event...</p>
      )}

      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">👥 Participants</h2>
      {participants.length === 0 ? (
        <p className="text-gray-500 text-center">No participants yet.</p>
      ) : (
        <div className="space-y-3">
          {participants.map((p, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-indigo-50 transition"
            >
              <p><span className="font-semibold text-gray-700">Name:</span> {p.name}</p>
              <p><span className="font-semibold text-gray-700">Email:</span> {p.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventView;
