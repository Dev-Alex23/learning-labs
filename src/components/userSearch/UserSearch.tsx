import { AddUser } from '@components/addUser/AddUser';
import { Search } from '@components/search/Search';

export const UserSearch = () => {
  return (
    <section className='h-[90px] w-full bg-white rounded-lg'>
      <div className='flex justify-between items-center h-full px-5'>
        <Search />
        <AddUser />
      </div>
    </section>
  );
};
