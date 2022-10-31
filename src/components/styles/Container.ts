import { styled } from '@stitches/react';

export const Container = styled('div', {
  padding: '1.75rem 2.25rem',
  borderRadius: '8px',
  position: 'relative',
  width: '100%',
  minHeight: '530px',
  backgroundColor: 'white',
  border: '1px solid rgb(204, 204, 204)',

  '@media(min-width: 768px)': {
    padding: '2.75rem 3rem',
    minHeight: '568px',
    width: '450px',
  },
});
