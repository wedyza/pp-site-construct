import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../search/Search';

const SearchWrapper: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/goods/?search=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <Search
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
        />
    );
};

export default SearchWrapper;
