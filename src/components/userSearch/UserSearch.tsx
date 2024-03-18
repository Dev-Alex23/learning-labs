import { SearchIcon } from '@components/Common/icons/SearchIcon';
import { DialogDefault } from '@components/dialog/Dialog';
import { Search } from '@components/search/Search';

export const UserSearch = () => {
  return (
    <section className='h-[90px] w-full bg-white rounded-lg'>
      <div className='flex justify-between items-center h-full px-5'>
        <Search icon={<SearchIcon />} />
        <DialogDefault />
      </div>
    </section>
  );
};
