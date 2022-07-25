import { Avatar } from '@mui/material';

interface CustomAvatarProps {
  name: string | null;
  avatar: string | null;
}

export default function CustomAvatar({ name, avatar }: CustomAvatarProps) {
  const shortenedName = name
    ?.split(' ')
    .reduce((prev, curr) => prev + curr.charAt(0).toUpperCase(), '');

  return avatar ? <Avatar src={avatar} /> : <Avatar>{shortenedName}</Avatar>;
}
