import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Fieldset, Input, Label } from './';

export const Step1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
        <h2 style={{ fontWeight: 500 }}>Dados pessoais</h2>
      </div>
      <Fieldset>
        <Label>Nome</Label>
        <Input
          error={errors.name && 'true'}
          type="text"
          {...register('name')}
          name="name"
        />
        {errors.name && <span>{errors.name.message as string}</span>}
      </Fieldset>

      <Fieldset>
        <Label>Email</Label>
        <Input error={errors.email && 'true'} type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message as string}</span>}
      </Fieldset>

      <Fieldset>
        <Label>CPF</Label>
        <Input error={errors.cpf && 'true'} type="text" {...register('cpf')} />
        {errors.cpf && <span>{errors.cpf.message as string}</span>}
      </Fieldset>

      <Fieldset>
        <Label>Telefone</Label>
        <Input error={errors.phone && 'true'} type="name" {...register('phone')} />
        {errors.phone && <span>{errors.phone.message as string}</span>}
      </Fieldset>
    </div>
  );
};
