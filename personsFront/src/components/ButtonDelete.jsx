const ButtonDelete = ({text, person, onClickDelete}) => {
    
    return (
      <>
      <button onClick={() => onClickDelete(person)}>{text}</button>
      </>
    )
  }

export default ButtonDelete;