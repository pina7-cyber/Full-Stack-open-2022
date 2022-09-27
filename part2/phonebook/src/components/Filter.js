const Filter = ({ term, filterHandler }) => {
    return (
      <div>
        filter shown with <input value={term} onChange={filterHandler} />
      </div>
    );
  }

  export default Filter