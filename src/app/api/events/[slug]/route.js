import { db, storage } from '@/firebase';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

export async function DELETE(request, { params }) {
  const { slug } = params;

  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const eventDoc = querySnapshot.docs[0];
    const eventData = eventDoc.data();

    if (eventData.imageUrl) {
      const imageRef = ref(storage, eventData.imageUrl);
      await deleteObject(imageRef);
    }

    await deleteDoc(eventDoc.ref);

    return new Response(JSON.stringify({ message: 'Event and associated image deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete event' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}