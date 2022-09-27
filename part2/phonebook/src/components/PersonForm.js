const PersonForm = ({
    submitHandler,
    newName,
    newNumber,
    nameInputHandler,
    numberInputHandler,
  }) => {
    return (
      <form onSubmit={submitHandler}>
        <div>
          name: <input value={newName} onChange={nameInputHandler} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberInputHandler} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    );
  };

  export default PersonForm