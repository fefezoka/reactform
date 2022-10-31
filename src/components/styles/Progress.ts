import { styled } from '@stitches/react';

export const Progress = styled('div', {
  width: '100%',
  height: '8px',
  backgroundColor: '#ccc',
  borderRadius: '8px',
  marginTop: '16px',
  marginBottom: '32px',

  '& > div': {
    background: 'rgb(88, 146, 252)',
    height: '100%',
  },
});
