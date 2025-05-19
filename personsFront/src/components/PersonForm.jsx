const PersonForm = ({onChangeName, onChangeTel, valueName, valueTel, onClick }) => {
    return (
      <form>
        <div>
            name: <input onChange={onChangeName} value={valueName}/>
          </div>
          <div>
            number: <input onChange={onChangeTel} value={valueTel}/>
          </div>
          <div>
            <button type="submit" onClick={onClick}>add</button>
          </div>
      </form>
      
    )
  }

  export default PersonForm;