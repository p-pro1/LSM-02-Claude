'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import Link from 'next/link';
import Image from 'next/image';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsCollection = collection(db, 'events');
    const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
      const eventList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventList);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/events/${slug}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete event');
        }
        // The event will be automatically removed from the list due to the Firestore listener
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold my-8 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="border rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              {event.imageUrl ? (
                <Image 
                  src={event.imageUrl} 
                  alt={event.name} 
                  layout="fill" 
                  objectFit="cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-2">Date: {event.date}</p>
              <p className="text-gray-600 mb-4">Location: {event.location}</p>
              <div className="flex justify-between items-center">
              <Link href={`/event/${event.slug}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
              <button 
                onClick={() => handleDelete(event.slug)} 
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}