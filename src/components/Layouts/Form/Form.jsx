import React, { useState } from 'react';
import {
  Checkbox,
  Form as SemanticForm,
  Radio,
} from 'semantic-ui-react';



function Form() {
  const [form, setForm] = useState({});
  const handleChange = (e, { value }) => setForm({ value });

  //   const { value } = this.state;
  return (
    <>
      {/* <SemanticForm> */}

      <SemanticForm.Group inline>
        <label>Quantity</label>
        <SemanticForm.Field
          control={Radio}
          label='One'
          //   value='1'
          //   checked={value === '1'}
          //   onChange={this.handleChange}
        />
        <SemanticForm.Field
          control={Radio}
          label='Two'
          value='2'
          //   checked={value === '2'}
          //   onChange={this.handleChange}
        />
        <SemanticForm.Field
          control={Radio}
          label='Three'
          value='3'
          //   checked={value === '3'}
          //   onChange={this.handleChange}
        />
      </SemanticForm.Group>
      <SemanticForm.Field control={Checkbox} label='I agree to the Terms and Conditions' />
      {/* </SemanticForm> */}
    </>
  );
}

export default Form;
