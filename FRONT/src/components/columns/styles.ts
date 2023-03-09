import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100vw;
`;

export const ColumnWrapper = styled.div`
  width: 350px;
  min-height: 250px;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-right: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.palette.layout.black};
  border-radius: ${({ theme }) => theme.spacing.xs};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h3`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.palette.layout.blue};
`;

export const CardList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;
