import EventForm from '@/components/EventForm';

export default function AddEventPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Add New Event</h1>
      <EventForm />
    </div>
  );
}