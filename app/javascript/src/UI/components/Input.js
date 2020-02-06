import React from 'react';

const Input = ({onAddressInput}) => {

  let address
  const query_submit = event => {
    if (event.keyCode === 13) {
      event.preventDefault()
      const encoded_address = address.value.replace(' ', "%20");
      onAddressInput(encoded_address) }}

  return (
    <form className="query">
      <label htmlFor="address">address?</label>
      <input id="address"
        onKeyDown={ query_submit }
        ref={input => address = input}></input>
    </form>
  )}

export default Input
