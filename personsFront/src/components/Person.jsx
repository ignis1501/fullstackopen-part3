import ButtonDelete from "./ButtonDelete";

const Person = ({person, onClickDelete}) => {
    return (
      <p>{person.name} {person.number} <ButtonDelete text='delete' onClickDelete={onClickDelete} person={person}/></p>
    )
}

export default Person;