const ErrorNote = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    return <div className='errorNote'>{message}</div>;
  }
};

export default ErrorNote;
