const AddNote = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    return <div className='addNote'>{message}</div>;
  }
};

export default AddNote;
