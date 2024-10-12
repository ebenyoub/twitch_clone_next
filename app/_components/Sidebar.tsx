import { Video } from 'lucide-react';
import React from "react";
import TopStreams from './TopStreams';
import { cn } from '@/lib/utils';

interface SidebarProps {
    className?: string; 
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
     return (
        <aside className={cn('flex flex-col gap-4 items-center p-4 w-[50px] h-full bg-zinc-800', className)}>
            <Video className='text-foreground'/>
            <TopStreams />
        </aside>
    );
};

export default Sidebar;