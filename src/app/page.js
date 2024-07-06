import EventList from '@/components/EventList';

export const metadata = {
  title: 'City Events',
  description: 'Find and add exciting events happening in your city',
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">City Events</h1>
      <EventList />
    </div>
  );
}