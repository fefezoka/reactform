import { styled } from '@stitches/react';

export const Input = styled('input', {
  padding: '8px 16px',
  width: '100%',
  fontSize: '.875rem',
  borderRadius: '4px',
  lineHeight: '28px',
  border: '1px solid',
  borderColor: 'rgb(204, 204, 204)',

  '&:focus': {
    outline: '1px solid #2684ff',
  },

  '@media (min-width: 768px)': {
    fontSize: '1rem',
  },

  variants: {
    error: {
      true: {
        border: '2px solid',
        borderColor: '#f00',

        '&:focus': {
          outline: 'none',
        },
      },
    },
  },
});
