import { SendIcon } from '@components/Common/icons/SendIcon';
import { AddUser } from '@components/addUser/AddUser';
import { Search } from '@components/search/Search';
import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import React from 'react';

export function DialogDefault() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <AddUser onClick={handleOpen} />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add a new user</DialogHeader>
        <DialogBody>
          <Search icon={<SendIcon />} />
        </DialogBody>
      </Dialog>
    </>
  );
}
