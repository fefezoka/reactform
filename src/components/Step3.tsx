import React from 'react';

interface Props {
  name: string;
}

export const Step3 = ({ name }: Props) => {
  const formatedName = (() => name.trim().replace(/\b(\w)/g, (s) => s.toUpperCase()))();

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.25rem',
        gap: '2rem',
        flexDirection: 'column',
      }}
    >
      <p>
        Olá, <span style={{ fontWeight: 500 }}>{formatedName}!</span>
      </p>
      O envio foi concluído com sucesso!
    </div>
  );
};
