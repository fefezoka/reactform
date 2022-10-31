import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Theme } from 'react-select';
import { City } from '../types/city.types';
import { Country } from '../types/country.types';
import { Fieldset, Label } from './';
import { ReactSelect } from './Select';

interface Props {
  countries: Country[];
  cities: City[];
}

export const Step2 = ({ countries, cities }: Props) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  // Informações do form transmitidos pelo form provider

  const selectedCountries = watch('countries');

  // Estilização do select
  const theme = (theme: Theme) => ({
    ...theme,
    spacing: {
      ...theme.spacing,
      controlHeight: 40,
      baseUnit: 2,
    },
  });

  useEffect(() => {
    // Caso algum país seja excluído, todos as cidades desse país são retirados também
    if (!selectedCountries || !watch('cities')) {
      return;
    }
    setValue(
      'cities',
      watch('cities').filter((city: City) =>
        selectedCountries.some(
          (country: { value: string }) => country.value === city.country_code
        )
      )
    );
  }, [selectedCountries, setValue, watch]);

  return (
    <div className="flex flex-col justify-between">
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <h2 style={{ fontWeight: 500 }}>Destinos de interesse</h2>
      </div>
      <Fieldset style={{ minHeight: '178px', color: 'black' }}>
        <Label style={{ marginBottom: '8px' }}>Países</Label>

        <ReactSelect
          name="countries"
          control={control}
          maxItems={5}
          theme={theme}
          options={countries.map((country) => {
            return {
              label: country.name_ptbr,
              value: country.code,
            };
          })}
        />
        {errors.countries && <span>{errors.countries.message as string}</span>}
      </Fieldset>

      <Fieldset style={{ minHeight: '178px' }}>
        <Label style={{ marginBottom: '8px' }}>Cidades</Label>

        <ReactSelect
          name="cities"
          control={control}
          maxItems={8}
          theme={theme}
          // Mostra apenas cidades de paises previamente selecionados
          options={
            watch('countries') &&
            cities
              .filter((city) =>
                watch('countries').some(
                  (country: { value: string }) => country.value === city.country_code
                )
              )
              .sort((a, b) => a.name.localeCompare(b.name)) // Ordem alfabética
              .map((city) => {
                return {
                  country_code: city.country_code,
                  label: city.name.split(/(,| -)+/)[0],
                  value: city.id,
                };
              })
          }
        />
        {errors.cities && <span>{errors.cities.message as string}</span>}
      </Fieldset>
    </div>
  );
};
