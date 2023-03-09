import styled from 'styled-components';

export const Title = styled.h2`
  margin: ${({ theme }) => theme.spacing.none};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
`;
