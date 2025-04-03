import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchOrder = () => {
    const [query, setQuery] = useState<string>('');
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery('');
      }

    return (
        <form onSubmit={handleSubmit}>
        <input
          placeholder="Search order id"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    );
}