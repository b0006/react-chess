import { FC } from 'react';
import { Link } from 'react-router-dom';

const StartPage: FC = () => {
  return (
    <div>
      <Link to='/test'>Test page</Link>
    </div>
  );
};

export { StartPage };
