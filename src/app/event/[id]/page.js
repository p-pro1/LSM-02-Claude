import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';

async function getEventData(id) {
  const docRef = doc(db, 'events', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const event = await getEventData(params.id);
  return {
    title: event ? `${event.name} | City Events` : 'Event Details',
    description: event ? `Details for ${event.name} happening on ${event.date} at ${event.location}` : 'Event information',
  };
}

export default async function EventPage({ params }) {
  const event = await getEventData(params.id);

  if (!event) {
    return <div className="container mx-auto px-4 py-8">Event not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      {event.imageUrl && (
        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Image 
            src={event.imageUrl} 
            alt={event.name}
            fill
            sizes="100vw"
            style={{ objectFit: 'contain' }}
            />
        </div>
        )}
      <p className="text-lg mb-2"><strong>Date:</strong> {event.date}</p>
      <p className="text-lg mb-2"><strong>Location:</strong> {event.location}</p>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="mb-4">{event.description}</p>
      </div>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Events List
      </Link>
    </div>
  );
}