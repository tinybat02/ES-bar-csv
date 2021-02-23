import React, { useState } from 'react';
//@ts-ignore
import { FormField, PanelOptionsGroup } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { PanelOptions } from './types';

export const MainEditor: React.FC<PanelEditorProps<PanelOptions>> = ({ options, onOptionsChange }) => {
  const [inputs, setInputs] = useState(options);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onOptionsChange(inputs);
  };
  return (
    <div className="section gf-form-group">
      <h5 className="section-heading">TimeZone</h5>
      <FormField
        label="TimeZone"
        labelWidth={10}
        inputWidth={40}
        type="text"
        name="timezone"
        value={inputs.timezone}
        onChange={handleChange}
      />
      <FormField
        label="CSV File"
        labelWidth={10}
        inputWidth={40}
        type="text"
        name="filename"
        value={inputs.filename}
        onChange={handleChange}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
