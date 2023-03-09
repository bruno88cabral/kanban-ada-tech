import styled from 'styled-components';

const Main = styled.section`
  width: calc(100vw - calc(${({ theme }) => theme.spacing.xl} * 2));
  height: calc(100vh - calc(${({ theme }) => theme.spacing.xl} * 2));
  max-width: 100vw;
  max-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.palette.layout.grey};
  font-family: ${({ theme }) => theme.font.main};
`;

export default Main;
