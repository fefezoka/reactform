import { styled } from '@stitches/react';

export const Fieldset = styled('fieldset', {
  height: '90px',
  border: 'none',

  '& > label': {
    fontSize: '14px',
    fontWeight: 500,
  },
  '& > span': {
    fontSize: '12px',
    display: 'block',
    color: '#f00',
    fontWeight: 500,
    textAlign: 'right',
  },
});
