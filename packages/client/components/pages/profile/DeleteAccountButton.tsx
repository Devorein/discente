import { Button, FormControl, TextField } from '@mui/material';
import { useDeleteUserMutation, useDeleteUserMutationCache } from 'api';
import { ConfirmDialog, FieldLabel } from 'components';
import { useCurrentUser } from 'contexts';
import { useState } from 'react';

export function DeleteAccountButton() {
  const { mutateAsync, isLoading } = useDeleteUserMutation();
  const deleteUserMutationCacheFn = useDeleteUserMutationCache();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const { currentUser } = useCurrentUser();

  function resetState() {
    setIsOpen(false);
    setUsername('');
  }

  const isError = currentUser?.username !== username;

  return currentUser?.role !== 'admin' ? (
    <>
      <Button
        disabled={isLoading}
        onClick={() => {
          setIsOpen(true);
        }}
        color='error'
        variant='contained'
      >
        Delete Account
      </Button>
      <ConfirmDialog
        onClose={resetState}
        isOpen={isOpen}
        secondaryTitle="This action can't be undone"
        title='Are you sure you want to delete your account?'
        confirmButtonProps={{
          color: 'error',
          variant: 'contained',
          disabled: isError,
          onClick: () => {
            mutateAsync(
              null,
              deleteUserMutationCacheFn(() => {
                resetState();
              })
            );
          }
        }}
      >
        <FormControl
          sx={{
            mb: 2
          }}
        >
          <FieldLabel
            error={isError ? 'Type your username' : undefined}
            name='currentUsername'
            label='Username'
          />
          <TextField
            error={isError}
            placeholder={currentUser?.username}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FormControl>
      </ConfirmDialog>
    </>
  ) : null;
}
