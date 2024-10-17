'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import getAccessToken from "./getAccessToken";

const useFetch = <T>(url: string, refresh: boolean = false): FetchResponse<T[]> => {
    const [data, setData] = useState<T[]>([]); // Initialiser avec un tableau vide
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cursor, setCursor] = useState<string | undefined>();

    useEffect(() => {
        const fetchData = async (currentUrl: string) => {
            const accessToken = getAccessToken();
            
            try {
                const response = await axios.get(currentUrl, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID
                    }
                });

                // Récupérer les nouvelles données et le curseur
                const newData = response.data.data as T[];
                const newCursor = response.data.pagination?.cursor;

                // Concaténer les nouvelles données avec les anciennes
                if (Array.isArray(newData)) {
                    setData(prev => [...prev, ...newData]);
                } else {
                    console.error("newData n'est pas un tableau:", newData);
                }

                // Mettre à jour le curseur
                setCursor(newCursor);
                console.log(newCursor);

                // Si le curseur est présent, fetch les données de la prochaine page
                if (newCursor) {
                    const urlParams = new URLSearchParams(currentUrl.split('?')[1]); // Récupérez les paramètres de l'URL
                    urlParams.set('after', newCursor); // Remplacez le paramètre 'after'
                    const nextUrl = `${url.split('?')[0]}?${urlParams.toString()}`; // Reconstituez l'URL
                    // await fetchData(nextUrl); // Appel récursif
                }
                console.log(data.length);

            } catch (err) {
                setError(`Error fetching data: ${err instanceof Error ? err.message : err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData(url);

        if (refresh) {
            const intervalId = setInterval(() => fetchData(url), 5000);
            return () => clearInterval(intervalId); 
        }
    }, [url, refresh]);

    return { data, error, loading, cursor };
};

export default useFetch;
