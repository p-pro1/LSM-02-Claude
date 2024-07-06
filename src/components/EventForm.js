'use client';

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase';
import imageCompression from 'browser-image-compression';

export default function EventForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Set default to today
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      return imageFile; // Return original file if compression fails
    }
  };

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const compressedImage = await compressImage(e.target.files[0]);
      setImage(compressedImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `events/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'events'), {
        name,
        date,
        location,
        description,
        imageUrl,
      });

      // Clear the form
      setName('');
      setDate(new Date().toISOString().split('T')[0]); // Reset to today's date
      setLocation('');
      setDescription('');
      setImage(null);
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <h2 className="text-2xl font-semibold text-black">Add New Event</h2>
      <div>
        <label htmlFor="name" className="block text-black">Event Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded p-2 text-black"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-black">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border rounded p-2 text-black"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-black">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full border rounded p-2 text-black"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-black">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border rounded p-2 text-black"
          rows="4"
        ></textarea>
      </div>
      <div>
        <label htmlFor="image" className="block text-black">Event Image:</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full border rounded p-2 text-black"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add Event
      </button>
    </form>
  );
}