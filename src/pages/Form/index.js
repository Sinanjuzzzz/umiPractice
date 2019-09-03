import React from 'react'
import DynameicForm from './DynamicForm'
import DateForm from './DateForm'
import AddressForm from './AddressForm'
import InvoiceForm from './InvoiceForm'

function Form(props) {
  return (
    <div>
      <DynameicForm />
      <DateForm />
      <AddressForm />
      <InvoiceForm />
    </div>
  )
}

export default Form