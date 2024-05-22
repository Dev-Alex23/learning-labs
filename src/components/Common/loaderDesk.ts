import { Params } from 'react-router-dom';

export const loaderDesk = ({ params }: { params: Readonly<Params<string>> }) => {
  console.log({ params });
  return params;
};

export const action = ({ params }) => {
  console.log({ params });

  return params;
};
