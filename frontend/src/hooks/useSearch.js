import { useState } from 'react';

const useSearch = (data) => {

    const [dummy, setDummy] = useState([]);

    const handleQueryChange = (e) => {
        const value = e.target.value.toLowerCase();
        if (value === '') {
            setDummy(data);
            return;
        }

        const filtered = data.filter((v) => {
            const isNameMatch = v.name.toLowerCase().includes(value);
            const isEmailMatch = v.email.toLowerCase().includes(value);
            const isIdMatch = v.id.toString().includes(value);

            return isIdMatch || isNameMatch||isEmailMatch ;
        });
        setDummy(filtered);
    };



    return { dummy, setDummy, handleQueryChange };
};

export default useSearch;