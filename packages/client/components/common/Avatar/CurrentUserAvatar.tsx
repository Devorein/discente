import { useCurrentUser } from 'contexts';
import CustomAvatar from './CustomAvatar';

export default function CurrentUserAvatar() {
  const { currentUser } = useCurrentUser();
  if (!currentUser) {
    return null;
  }

  return <CustomAvatar avatar={currentUser.avatar} name={currentUser.name} />;
}
