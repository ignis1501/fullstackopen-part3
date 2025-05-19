const Filter = ({onChange, value}) => {
    console.log('Valor onChange: ', onChange, 'Valor value: ', value);
    return (
      <div>
        filter shown with: <input onChange={onChange} value={value}/>
      </div>
    )
  }

export default Filter;