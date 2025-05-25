import React, { useEffect, useState } from "react";
import supabase from "../lib/Db";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  // Event form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [participantModalOpen, setParticipantModalOpen] = useState(false);

  // Data
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Participant form state
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");

  // Fetch events
  const fetchEvents = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) return;
    const { data, error } = await supabase
      .from("userEvents")
      .select("*")
      .eq("uid", user.id)
      .order("date", { ascending: false });
    if (error) return;
    setEvents(data.map(e => ({ ...e, status: e.status || "Pending" })));
  };

  // Create / update event
  const handleSubmit = async e => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (editingId) {
      await supabase
        .from("userEvents")
        .update({ title, description, date, location, category })
        .eq("id", editingId);
    } else {
      await supabase.from("userEvents").insert([{
        title, description, date, location, category,
        uid: user.id, status: "Pending"
      }]);
    }

    await fetchEvents();
    resetEventForm();
  };

  // Delete event
  const deleteEvent = async id => {
    await supabase.from("userEvents").delete().eq("id", id);
    setEvents(events.filter(e => e.id !== id));
  };

  // Open edit modal
  const handleEdit = ev => {
    setTitle(ev.title);
    setDescription(ev.description);
    setDate(ev.date);
    setLocation(ev.location);
    setCategory(ev.category);
    setEditingId(ev.id);
    setIsModalOpen(true);
  };

  // Reset event form
  const resetEventForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    setCategory("");
    setEditingId(null);
    setIsModalOpen(false);
  };

  // Participant modal
  const openParticipantModal = ev => {
    setCurrentEvent(ev);
    setParticipantName("");
    setParticipantEmail("");
    setParticipantModalOpen(true);
  };
  const closeParticipantModal = () => {
    setParticipantModalOpen(false);
    setCurrentEvent(null);
  };

  // Submit participant (only name & email + event_id)
  const handleParticipantSubmit = async e => {
    e.preventDefault();
    if (!currentEvent) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("userParticipate").insert([{
      eid: user.id,
      name: participantName,
      email: participantEmail,
    }]);

    if (error) {
      alert("Error adding participant: " + error.message);
      return;
    }

    alert("Participant added successfully!");
    closeParticipantModal();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 text-black">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          📅 My Events
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
          >
            ➕ {editingId ? "Update Event" : "Add New Event"}
          </button>
        </div>

        {/* Event Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-4">
                {editingId ? "Edit Event" : "Add Event"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="datetime-local"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Category</option>
                  <option>Tech</option>
                  <option>Education</option>
                  <option>Entertainment</option>
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={resetEventForm}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    {editingId ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Participant Modal */}
        {participantModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
                Add Participant to: {currentEvent?.title}
              </h2>
              <form onSubmit={handleParticipantSubmit} className="space-y-3">
                <input
                  type="text"
                  value={participantName}
                  onChange={e => setParticipantName(e.target.value)}
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  value={participantEmail}
                  onChange={e => setParticipantEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeParticipantModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add Participant
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-indigo-50 p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p>{event.description}</p>
              <p>📍 {event.location}</p>
              <p>📅 {new Date(event.date).toLocaleString()}</p>
              <p>🏷️ {event.category}</p>
              <p className="mt-1">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    event.status === "Pending"
                      ? "text-yellow-600"
                      : event.status === "Approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {event.status}
                </span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {event.status !== "Approved" && (
                  <>
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </>
                )}
                {event.status === "Approved" && (
                  <button
                    onClick={() => openParticipantModal(event)}
                    className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-white"
                  >
                    Add Participant
                  </button>
                )}
                <Link
                  to={`/event/${event.id}`}
                  state={{ event }}
                  className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-800 text-white"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
