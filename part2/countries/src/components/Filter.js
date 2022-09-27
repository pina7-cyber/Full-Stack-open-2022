const Filter = ({ term, filterHandler }) => {
    return (
      <div>
        find countries <input value={term} onChange={filterHandler} />
      </div>
    );
  }

  export default Filter