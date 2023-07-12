import { useEffect, useState } from 'react';
import './App.css';
import axios, { CanceledError } from 'axios';

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users', {
        signal: controller.signal,
      })
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter(u => u.id !== user.id));
    axios
      .delete('https://jsonplaceholder.typicode.com/users/' + user.id)
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers); // Undoes operation if delete request fails
      });
  };

  const addUser = () => {
    const newUser = { id: 0, name: 'Mosh' };
    const originalUsers = [...users];
    setUsers([newUser, ...users]); // Optimistic UI update before state is populated with server response
    axios
      .post('https://jsonplaceholder.typicode.com/users/', newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const updatedUser = { ...user, name: user.name + '!' };
    const originalUsers = [...users];
    setUsers(users.map(u => (u.id === user.id ? updatedUser : u))); // Optimistic UI update
    axios
      .patch(
        'https://jsonplaceholder.typicode.com/users/' + user.id,
        updatedUser
      )
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border">LOADING</div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} <button onClick={() => updateUser(user)}>Update</button>{' '}
            <button onClick={() => deleteUser(user)}>DELETE</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
