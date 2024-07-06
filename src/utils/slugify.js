// src/utils/slugify.js

import { collection, query, where, getDocs } from 'firebase/firestore';

export async function createUniqueSlug(db, title, date) {
    const baseSlug = slugify(title, date);
    let slug = baseSlug;
    let counter = 1;
  
    while (await slugExists(db, slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  
    return slug;
  }
  
  function slugify(title, date) {
    const slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    
    const formattedDate = new Date(date).toISOString().split('T')[0];
    
    return `${formattedDate}-${slug}`;
  }
  
  async function slugExists(db, slug) {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }