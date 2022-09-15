import { Link } from 'react-router-dom';

function NextLink({ children, path, target, onClick = () => {}, className }) {
  return (
    <Link to={path} target={target || '_self'} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

export default NextLink;
