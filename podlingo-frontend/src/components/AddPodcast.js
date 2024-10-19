import React, { useState } from 'react';
import axios from 'axios';

const AddPodcast = () => {
  const [podcast, setPodcast] = useState({
    title: '',
    language: '',
    level: '',
    topic: '',
    url: '',
    description: ''
  });

  const handleChange = (e) => {
    setPodcast({
      ...podcast,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/podcasts`, podcast);
      alert('Podcast added successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Podcast Title"
        value={podcast.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="language"
        placeholder="Language"
        value={podcast.language}
        onChange={handleChange}
        required
      />
      <select name="level" value={podcast.level} onChange={handleChange}>
        <option value="A1">A1</option>
        <option value="A2">A2</option>
        <option value="B1">B1</option>
        <option value="B2">B2</option>
        <option value="C1">C1</option>
        <option value="C2">C2</option>
      </select>
      <input
        type="text"
        name="topic"
        placeholder="Topic"
        value={podcast.topic}
        onChange={handleChange}
        required
      />
      <input
        type="url"
        name="url"
        placeholder="Podcast URL"
        value={podcast.url}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Podcast Description"
        value={podcast.description}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Add Podcast</button>
    </form>
  );
};


export default AddPodcast;