import { useEffect, useState } from "react";
import client from "../api";

function useSession() {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('loading');

    const verifyUser = async () => {
        try {
            const { data } = await client.get('/auth/verify');
            setUser(data);
            setStatus('authorized');
        } catch (err) {
            setUser(null);
            setStatus('unauthorized');
        }
    };
    const renewUser = async () => {
        try {
            const { data } = await client.get('/auth/renew');
            setUser(data.user);
            console.log(data.user);
            localStorage.setItem('token', data.token);
        } catch (error) {
            setUser(null);
            setStatus('unauthorized');
        }
    };


    useEffect(() => {
        verifyUser();
    }, []);


    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
        setStatus('unauthorized');
        window.location.reload();
    };

    return { user, status, logout, renewUser };
}

export { useSession };