import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import TextInput, { TextInputProps } from './TextInput';

export default function PasswordInput(props: TextInputProps) {
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const handleClickShowPassword = () => {
    setIsShowingPassword((prev) => !prev);
  };

  return (
    <TextInput
      type={isShowingPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleClickShowPassword}>
              {isShowingPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
}
