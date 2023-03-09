import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';

interface IVariant {
  backgroundColor: string;
  borderColor: string;
}

export const Container = styled.div<{ variant: IVariant }>`
  color: ${({ theme }) => theme.palette.layout.white};
  background-color: ${({ variant }) => variant.backgroundColor};
  border: 2px solid ${({ variant }) => variant.borderColor};
  border-radius: ${({ theme }) => theme.spacing.sm};
  min-width: 300px;
  max-width: 50%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  position: relative;
`;

export const Message = styled.span`
  margin-left: ${({ theme }) => theme.spacing.md};
  font-weight: bolder;
  margin-right: ${({ theme }) => theme.spacing.xl};
  display: inline-block;
`;

export const CloseIcon = styled(AiOutlineClose)`
  cursor: pointer;
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
`;
