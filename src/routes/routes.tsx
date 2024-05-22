import { useUser } from '@clerk/clerk-react';
import { ErrorFallback } from '@components/Common/ErrorFallback';
import { loaderDesk } from '@components/Common/loaderDesk';
import { ChatPanel } from '@components/chatPanel/ChatPanel';
import { NoChat } from '@components/chatPanel/NoChat';
import { ChatProvider } from '@context/ChatProvider';
import { DesktopLayout } from '@layout/Desktop/Desktop';
import { RootLayout } from '@layout/Root/Root';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom';

// const routes = createRoutesFromElements(
//   <Route path='/' element={<RootLayout />} errorElement={<ErrorFallback />}>
//     <Route index element={<Login />} />
//     <Route path='sign-in' element={<Login />} />
//     <Route path='sign-up' element={<Register />} />
//     <Route errorElement={<ErrorFallback />}>
//       <Route path='chat' element={<DesktopLayout />}>
//         <Route index element={<NoChat />} />
//         <Route path=':chatId' element={<ChatPanel />} />
//         <Route path='*' element={<div>No chat found for this ID.</div>} />
//       </Route>
//     </Route>
//   </Route>
// );
const routes = createRoutesFromElements(
  <Route path='/' element={<RootLayout />} errorElement={<ErrorFallback />}>
    <Route element={<DesktopLayout />} loader={loaderDesk}>
      <Route index element={<NoChat />} />
      <Route path='contacts/:chatId' element={<ChatPanel />} />
      <Route
        path='contacts/:chatId/destroy'
        action={(actions) => {
          console.log({ actions });
          return redirect('/');
        }}
        element={<>hi</>}
        errorElement={<div>Oops! There was an error.</div>}
      />
      <Route path='*' element={<div>No chat found for this ID.</div>} />
    </Route>
  </Route>
);

export const Router = () => {
  // TODO: FIX THE WAY FULL NAME IS DONE.
  const { user } = useUser();
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const fullName = `${firstName} ${lastName}`;

  return (
    <ChatProvider currentUser={fullName}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </ChatProvider>
  );
};
