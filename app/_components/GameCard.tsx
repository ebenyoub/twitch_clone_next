import Image from 'next/image';
import React, { useEffect } from 'react';
import useFetch from '../utils/useFetch';

const GameCard = ({ game }: { game: TopStreamsData }): JSX.Element => {
    const imageWithSize = game.box_art_url.replace(/{width}/g, "218").replace(/{height}/g, "278");
    const { data, loading, error } = useFetch(process.env.NEXT_PUBLIC_URL_STREAMS + '?' + `game_id=${game.igdb_id}`)

    useEffect(() => {
        console.log(data);
    }, [data])

    if (error) {
        return <div>Error</div>
    }

    if (loading) {
        return <div>Chargement...</div>
    }

    return (
        <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
            <Image
                src={imageWithSize}
                width={218}
                height={278}
                alt={game.name}
                className="w-full h-auto"
                priority
            />
            <div className='p-2'>
                <h2 className="text-white mt-2 max-w-full line-clamp-1">{game.name}</h2>

            </div>
        </div>
    );
};

const GameGrid = ({ games }: { games: TopStreamsData[] | null }): JSX.Element => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games?.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
    );
};

export default GameGrid;
