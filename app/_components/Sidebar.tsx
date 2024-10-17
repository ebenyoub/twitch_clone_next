import { Video } from 'lucide-react';
import React from "react";
import TopStreams from './TopStreams';
import { cn } from '@/lib/utils';
import CustomTooltip from './CustumTooltip';

interface SidebarProps {
    className?: string; 
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
     return (
        <aside className={cn('flex flex-col gap-4 items-center p-2 w-[50px] h-full bg-zinc-800', className)}>
            <CustomTooltip
                trigger={<Video className='text-foreground w-full'/>}
            >
                <p className='text-foreground'>Chaînes recommandées</p>
            </CustomTooltip>
            <TopStreams />
        </aside>
    );
};

export default Sidebar;