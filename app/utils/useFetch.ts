'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import getAccessToken from "./getAccessToken";

const useFetch = <T>(url: string, refresh: boolean = false): FetchResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        console.log(url);
        const fetchData = async () => {
            const accessToken = getAccessToken();
            
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID
                    }
                });
                setData(response.data.data as T);
            } catch (err) {
                setError(`Error fetching data : ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        if (refresh) {
            const intervalId = setInterval(fetchData, 5000);
            return () => clearInterval(intervalId); 
        }
    }, [url, refresh]);


    return { data, error, loading };
};

export default useFetch;
