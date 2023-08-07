import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    let url = 'http://localhost:3001/users/';
    if (name.trim() !== '') {
      url += `name/${encodeURIComponent(name)}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="App">
      <h1>User Search</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={fetchUsers}>Search</button>
      <ul>
        {users && users.map((user) => (
          <li key={user.id}>{user.name} - Likes: {user.likes}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
