import React from 'react'
import DynameicForm from './DynamicForm'
import DateForm from './DateForm'
import AddressForm from './AddressForm'

function Form(props) {
  return (
    <div>
      <DynameicForm />
      <DateForm />
      <AddressForm />
    </div>
  )
}

export default Form