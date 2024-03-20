import { SearchIcon } from '@components/Common/icons/SearchIcon';
import { DialogDefault } from '@components/dialog/Dialog';
import { Search } from '@components/search/Search';
import { UserMenu } from '@components/userMenu/UserMenu';

export const UserSearch = () => {
  return (
    <section className='h-[90px] w-full bg-white rounded-lg'>
      <div className='flex justify-between items-center h-full px-5 gap-2.5'>
        <UserMenu />
        <Search icon={<SearchIcon />} />
        <DialogDefault />
      </div>
    </section>
  );
};
