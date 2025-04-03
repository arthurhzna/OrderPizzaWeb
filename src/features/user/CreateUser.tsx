import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateName } from './userSlice';

export const CreateUser = () => {
    const [username, setUsername] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        if (!username) return;
        dispatch(updateName(username));
        navigate('/menu');
      }
    

    return (
        <form onSubmit={handleSubmit}>
        <p>
          👋 Welcome! Please start by telling us your name:
        </p>
  
        <input
          type="text"
          placeholder="Your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
    );
}