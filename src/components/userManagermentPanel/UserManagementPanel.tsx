import { UserList } from '@components/userList/UserList';
import { UserSearch } from '@components/userSearch/UserSearch';

export const UserManagementPanel = () => {
  return (
    <section className='grid grid-rows-[90px_1fr] gap-5'>
      <UserSearch />
      <UserList />
    </section>
  );
};
