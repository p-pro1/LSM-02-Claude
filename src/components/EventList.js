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

  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">Upcoming Events</h2>
      <ul className="space-y-4">
        {events.map(event => (
          <li key={event.id} className="border p-4 rounded-lg flex items-center">
            {event.imageUrl && (
              <div className="mr-4">
                <Image src={event.imageUrl} alt={event.name} width={100} height={100} className="rounded-lg" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-medium">{event.name}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <Link href={`/event/${event.id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}