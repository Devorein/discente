import { Avatar, AvatarProps } from '@mui/material';

interface CustomAvatarProps extends Partial<AvatarProps> {
  name: string | null;
  avatar: string | null;
}

export default function CustomAvatar({
  name,
  avatar,
  ...props
}: CustomAvatarProps) {
  const shortenedName = name
    ?.split(' ')
    .reduce((prev, curr) => prev + curr.charAt(0).toUpperCase(), '');

  return avatar ? (
    <Avatar {...props} src={avatar} />
  ) : (
    <Avatar {...props}>{shortenedName}</Avatar>
  );
}
