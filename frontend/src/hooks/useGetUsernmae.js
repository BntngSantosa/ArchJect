import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function useGetUsername() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.name);
        }
    }, []);

    return username;
}