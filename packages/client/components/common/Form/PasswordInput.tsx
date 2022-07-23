import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import TextInput, { TextInputProps } from './TextInput';

export default function PasswordInput(props: TextInputProps) {
  const [isShowingPass, setIsShowingPass] = useState(false);

  const handleClickShowPassword = () => {
    setIsShowingPass((prev) => !prev);
  };

  return (
    <TextInput
      required
      type={isShowingPass ? 'text' : 'password'}
      InputProps={{
        sx: {
          'input::placeholder': {
            top: 4,
            position: 'relative'
          }
        },
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleClickShowPassword}>
              {isShowingPass ? (
                <Visibility fontSize='small' />
              ) : (
                <VisibilityOff fontSize='small' />
              )}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
}
