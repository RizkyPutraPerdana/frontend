"use client";

import React, { useState, useRef } from 'react';
import axios from 'axios';
// import './global.css'; // Global styles

const MovieForms = () => {
  const [judul, setJudul] = useState('');
  const [sutradara, setSutradara] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [rating, setRating] = useState('');
  const fileInputRef = useRef(null);

  const simpanData = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('sutradara', sutradara);
    formData.append('deskripsi', deskripsi);
    formData.append('rating', rating);

    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
      formData.append('image', fileInputRef.current.files[0]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/movies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-200 to-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded shadow-md">
        <form onSubmit={simpanData}>
          <div className="mb-4">
            <label htmlFor="judul" className="block text-sm font-medium text-gray-700">Judul Film</label>
            <input
              type="text"
              id="judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Judul"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sutradara" className="block text-sm font-medium text-gray-700">Sutradara</label>
            <input
              type="text"
              id="sutradara"
              value={sutradara}
              onChange={(e) => setSutradara(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Sutradara"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <input
              type="text"
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              placeholder="Deskripsi"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Gambar Cover</label>
            <input type="file" id="image" ref={fileInputRef} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <div className="star-rating flex space-x-2 mt-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <React.Fragment key={star}>
                  <input type="radio" id={`${star}-stars`} name="rating" value={star} onClick={() => setRating(star.toString())} />
                  <label htmlFor={`${star}-stars`} className="star">&#9733;</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Simpan Data</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForms;
