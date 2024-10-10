import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";

const AvatarWithSize = ({ img }: { img: string | undefined }): JSX.Element => {
    const avatarImg = img?.replace(/{width}/g, "40").replace(/{height}/g, "40")
    
    return (
        <li>
            <Link href={"/"}>
                <Avatar>
                    <AvatarImage src={avatarImg} />
                    <AvatarFallback>TW</AvatarFallback>
                </Avatar>
            </Link>
        </li>
    )
}

export default AvatarWithSize;