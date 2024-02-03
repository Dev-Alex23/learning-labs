import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const routerError = useRouteError();
  let errorMessage;

  if (isRouteErrorResponse(routerError)) {
    errorMessage = routerError;
  }

  return (
    <div className='flex flex-col gap-8 justify-center items-center h-screen'>
      <h1 className='text-4xl font-bold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='text-slate-400'>
        <i>{errorMessage?.data}</i>
      </p>
    </div>
  );
};
