import Person from './Person';

const Persons = ({personToShow, onClickDelete}) => {
    return (
      <div>
        {personToShow.map(person => <Person  key={person.name} person={person} onClickDelete={onClickDelete}/>)}
      </div>
    )
}

export default Persons;