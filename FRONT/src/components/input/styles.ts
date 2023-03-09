import styled from 'styled-components';

export const FormGroup = styled.div<{ error?: string }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  ${(props) =>
    props.error &&
    `
    input {
      border-color: #dc3545;
    }
  `}
`;

export const Label = styled.label`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const InputField = styled.input<{ error?: string }>`
  display: block;
  width: auto;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.font.size.md};
  line-height: 1.5;
  color: ${({ theme }) => theme.palette.layout.grey};
  background-color: ${({ theme }) => theme.palette.layout.white};
  border: 1px solid ${(props) => (props.error ? '#dc3545' : '#ced4da')};
  border-radius: 5px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.layout.blueGrey};
    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
  }
`;

export const CharCounter = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.palette.layout.white};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const ErrorLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.palette.feedback.lighten.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-weight: bold;
`;
