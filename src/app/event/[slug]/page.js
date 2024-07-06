'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function EventPage({ params }) {
  const [event, setEvent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const q = query(collection(db, 'events'), where('slug', '==', params.slug));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const eventDoc = querySnapshot.docs[0];
        setEvent({ id: eventDoc.id, ...eventDoc.data() });
      } else {
        console.log("No such document!");
      }
    };

    fetchEvent();
  }, [params.slug]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`/api/events/${event.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete event');
        }
        router.push('/');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  if (!event) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">{event.name}</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {event.imageUrl && (
          <div className="relative h-96">
            <Image 
              src={event.imageUrl} 
              alt={event.name} 
              layout="fill" 
              objectFit="cover"
            />
          </div>
        )}
        <div className="p-6">
        <div className="mb-4">
          <p className="text-lg text-gray-800"><strong>Date:</strong> {event.date}</p>
          <p className="text-lg text-gray-800"><strong>Location:</strong> {event.location}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Description</h2>
          <p className="text-gray-700">{event.description}</p>
        </div>
          <div className="mt-8 flex justify-between items-center">
            <Link href="/" className="text-blue-500 hover:underline">
              Back to Events List
            </Link>
            <button 
              onClick={handleDelete} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}