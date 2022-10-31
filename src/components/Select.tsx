import React from 'react';
import { Controller, Control } from 'react-hook-form';
import Select, { ThemeConfig } from 'react-select';

interface Props {
  control: Control;
  theme: ThemeConfig;
  name: string;
  maxItems: number;
  options: Option[];
}

interface Option {
  value: string | number;
  label: string;
  country_code?: string;
}

export const ReactSelect = ({ control, theme, options, name, maxItems }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          placeholder="Selecione uma opção"
          value={field.value}
          ref={field.ref}
          onChange={field.onChange}
          isMulti
          theme={theme}
          noOptionsMessage={() => 'Sem cidades'}
          options={options}
          closeMenuOnSelect={false}
          isOptionDisabled={() => field.value && field.value.length >= maxItems}
        />
      )}
    />
  );
};
