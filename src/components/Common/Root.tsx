import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <main className='w-screen h-screen p-3 bg-gray-100'>
      <Outlet />
    </main>
  );
};
