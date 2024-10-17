import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipProps {
    children: React.ReactNode;
    trigger: JSX.Element;
}

const CustomTooltip = ({ children, trigger }: TooltipProps): JSX.Element => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger className='w-full'>
                    { trigger }
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={10} className="bg-zinc-600">
                    { children }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default CustomTooltip;