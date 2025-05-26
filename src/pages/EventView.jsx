import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../lib/Db';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const EventView = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventAndParticipants = async () => {
      setLoading(true);
      const { data: eventData, error: eventError } = await supabase
        .from('userEvents')
        .select('*')
        .eq('id', id)
        .single();

      if (eventError) {
        console.error('Error fetching event:', eventError);
        setLoading(false);
        return;
      }

      setEvent(eventData);

      const { data: participantsData, error: participantsError } = await supabase
        .from('userParticipate')
        .select('*')
        .eq('eid', eventData.id);

      if (participantsError) {
        console.error('Error fetching participants:', participantsError);
      } else {
        setParticipants(participantsData);
      }
      setLoading(false);
    };

    if (id) fetchEventAndParticipants();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200 text-gray-800 mb-10"
    >
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">📅 Event Details</h1>

      {event ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 space-y-2 bg-gray-50 p-4 rounded-xl border border-indigo-100 shadow-sm"
        >
          <p><span className="font-semibold text-gray-700">Title:</span> {event.title}</p>
          <p><span className="font-semibold text-gray-700">Date:</span> {new Date(event.date).toLocaleString()}</p>
          <p><span className="font-semibold text-gray-700">Description:</span> {event.description}</p>
          <p><span className="font-semibold text-gray-700">Location:</span> {event.location}</p>
          <p><span className="font-semibold text-gray-700">Category:</span> {event.category}</p>
    
        </motion.div>
      ) : (
        <p className="text-center text-gray-500">No event found.</p>
      )}

      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">👥 Participants</h2>
      {participants.length === 0 ? (
        <p className="text-gray-500 text-center">No participants yet.</p>
      ) : (
        <div className="space-y-3">
          {participants.map((p, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-indigo-50 transition"
            >
              <p><span className="font-semibold text-gray-700">Name:</span> {p.name}</p>
              <p><span className="font-semibold text-gray-700">Email:</span> {p.email}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EventView;
