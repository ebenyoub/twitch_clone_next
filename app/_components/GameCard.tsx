import Image from 'next/image';
import React from 'react';
import useFetch from '../utils/useFetch';
import { formatViews } from '@/lib/utils';

const GameCard = ({ game }: { game: TopStreamsData }): JSX.Element => {
    const imageWithSize = game.box_art_url.replace(/{width}/g, "218").replace(/{height}/g, "278");
    // const [allStreamsByGame, setAllStreamsByGame] = useState<StreamData[] | null>(null);
    // const [totalViewers, setTotalViewers] = useState<number>(0);

    const { data, error, loading } = useFetch<StreamData>(process.env.NEXT_PUBLIC_URL_STREAMS + '?' + `game_id=${game.id}&first=100&type=live`)
    
    
    console.log('gameData', data);

    
    const totalViewers = data ? data?.reduce((acc, curr) => acc + curr.viewer_count, 0) : 0;

    if (error) {
        return <div className='flex justify-center items-center'>Error</div>
    }

    if (loading) {
        return <div className='flex justify-center items-center'>Chargement...</div>
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
                <span className='text-foreground'>{`${formatViews(totalViewers)} spectateurs`}</span>
            </div>
        </div>
    );
};

const GameGrid = ({ games }: { games: TopStreamsData[] | null }): JSX.Element => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {games?.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
    );
};

export default GameGrid;
