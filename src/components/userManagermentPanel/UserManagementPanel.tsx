import { UserList } from '@components/userList/UserList';
import { UserSearch } from '@components/userSearch/UserSearch';

export const UserManagementPanel = () => {
  return (
    <section className='flex flex-col gap-5'>
      <UserSearch />
      <UserList />
    </section>
  );
};
