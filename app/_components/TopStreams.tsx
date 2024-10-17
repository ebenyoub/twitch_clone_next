'use client'

import useFetch from '../utils/useFetch';
import { useEffect, useState } from "react";
import AvatarWithSize from './AvatarWithSize';
import { Circles } from 'react-loader-spinner';
import { FileWarning, Minus, Plus } from 'lucide-react';
import { formatViews } from '@/lib/utils';
import CustomTooltip from './CustumTooltip';

const TopStreams = (): JSX.Element => {
    const [topStreams, setTopStreams] = useState<CombinedStreamData[]>();
    const [usersURL, setUsersURL] = useState<string>('');
    const [more, setMore] = useState<boolean>(false);
    const [listSize, setListSize] = useState<number>(6);

    const { data: streamsData, loading: streamsLoading, error: streamsError } = useFetch<StreamData>(process.env.NEXT_PUBLIC_URL_STREAMS, true);

    useEffect(() => {
        if (streamsData) {
            const userIds = streamsData.map(stream => `id=${stream.user_id}`).join('&');
            setUsersURL(`${process.env.NEXT_PUBLIC_BASE_URL_USERS}?${userIds}`);
        }
    }, [streamsData])

    const { data: usersData, loading: usersLoading, error: usersError } = useFetch<UserData>(usersURL, true);

    useEffect(() => {
        if (streamsData && usersData) {
            const combinedStreams: CombinedStreamData[] = streamsData.map(streamData => {
                const user = usersData.find(userData => userData.id === streamData.user_id);

                return {
                    id: user?.id,
                    display_name: user?.display_name,
                    profile_image_url: user?.profile_image_url,
                    game_name: streamData.game_name,
                    viewer_count: streamData.viewer_count,
                    description: streamData.title
                }
            }).sort((a, b) => b.viewer_count - a.viewer_count)

            setTopStreams(combinedStreams);
        }
    }, [streamsData, usersData])

    const handleMore = (): void => {
        setMore(prev => !prev);
        setListSize(!more ? 10 : 6);
    }

    if (streamsError || usersError) {
        return (
            <ul className="flex flex-col gap-4">
                {Array.from({ length: listSize }).map((_, index) => (
                    <li className="flex justify-center items-center size-[40px] text-purple-600" key={index}>
                        <FileWarning key={index} />
                    </li>
                ))}
            </ul>
        )
    }

    if (streamsLoading || usersLoading) {
        return (
            <div>
                <ul className='flex flex-col gap-4'>
                    {Array.from({ length: listSize }).map((_, index) => (
                        <li className="flex justify-center items-center size-[40px] text-purple-600" key={index}>
                            <Circles
                                visible={true}
                                height="20"
                                width="20"
                                color="rgb(147 51 234)"
                                ariaLabel="tail-spin-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <ul className='flex flex-col gap-4 overflow-hidden'>
                {topStreams &&
                    topStreams.slice(0, listSize).map((stream, index) => {
                        const { profile_image_url } = stream;

                        return (
                            <CustomTooltip
                                key={index}
                                trigger={<AvatarWithSize img={profile_image_url} w-full />}
                            >
                                <div className='flex flex-col gap-1'>
                                    <p className='text-purple-500 font-bold'>{`${stream.display_name} • ${stream.game_name}`}</p>
                                    <p className='max-w-[300px] line-clamp-2 text-foreground'>{stream.description}</p>
                                    <div className="flex items-center space-x-2">
                                        <span className="inline-block h-2.5 w-2.5 bg-red-500 rounded-full"></span>
                                        <span className="font-medium text-white">{`Live | ${formatViews(stream.viewer_count)} spectateurs`}</span>
                                    </div>
                                </div>
                            </CustomTooltip>
                        )
                    })
                }
            </ul>
            <div className="flex mt-4 justify-center cursor-pointer text-purple-600" onClick={handleMore}>
                {more ? <Minus /> : <Plus />}
            </div>
        </div>
    );
};

export default TopStreams;