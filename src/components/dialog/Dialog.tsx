import { AddIcon } from '@components/Common/icons/AddIcon';
import { AddUser } from '@components/addUser/AddUser';
import { Search } from '@components/search/Search';
import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import React from 'react';

export const DialogDefault = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <AddUser onClick={handleOpen} />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add a new user</DialogHeader>
        <DialogBody onClick={handleOpen}>
          <Search icon={<AddIcon />} />
        </DialogBody>
      </Dialog>
    </>
  );
};
