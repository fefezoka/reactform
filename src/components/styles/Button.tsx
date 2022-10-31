import { styled } from '@stitches/react';
import { ComponentProps } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export const StyledButton = styled('button', {
  display: 'inline-block',
  padding: '12px 20px',
  backgroundColor: '#5892fc',
  border: 'none',
  minWidth: '92px',
  color: 'white',
  marginTop: '16px',
  fontSize: '.875rem',
  cursor: 'pointer',
  borderRadius: '16px',

  '&:disabled': {
    cursor: 'default',
    backgroundColor: '#3c67b5',
  },

  '@media(min-width: 768px)': {
    padding: '16px 24px',
    minWidth: '118px',
    fontSize: '1rem',
  },

  variants: {
    back: {
      true: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: 'rgb(240, 242, 245)',
        color: 'black',
      },
    },
  },
});

interface Props extends ComponentProps<typeof StyledButton> {
  back?: boolean;
  value: string;
}

export const Button = ({ back, value, ...props }: Props) => {
  return (
    <StyledButton back={back} {...props}>
      {back && <FaArrowLeft size={14} />}
      {value}
    </StyledButton>
  );
};
