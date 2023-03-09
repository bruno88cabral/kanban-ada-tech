import styled from 'styled-components';
import { GoDiffAdded } from 'react-icons/go';

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.font.size.xxl};
  margin: ${({ theme }) => theme.spacing.none};
  color: ${({ theme }) => theme.palette.layout.white};
`;

export const Section = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc((350px * 3) + (${({ theme }) => theme.spacing.md} * 5));
  margin: ${({ theme }) => theme.spacing.none} auto
    ${({ theme }) => theme.spacing.xl} auto;
`;

export const AddIcon = styled(GoDiffAdded)`
  margin-right: ${({ theme }) => theme.spacing.sm};
`;
