import React from 'react';

const Input = ({onAddressInput}) => {

  let address
  const query_submit = event => {
    event.preventDefault()
    encoded_address = address.replace(' ', "%20");
    onAddressInput(encoded_address) }

  return (
    <form onSubmit={ query_submit } className="query">
      <label htmlFor="address">address?</label>
      <input id="address"
        ref={input => address = input}></input>
      <button>load address</button>
    </form>
  )}

export default Input
