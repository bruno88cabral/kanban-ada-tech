import styled from 'styled-components';

export const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.layout.grey};
  border-radius: ${({ theme }) => theme.spacing.xs};
  box-shadow: ${({ theme }) => theme.spacing.none} 1px 2px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.palette.layout.white};

  &:hover {
    background-color: ${({ theme }) => theme.palette.layout.blueGrey};
    cursor: pointer;
  }
`;

export const Title = styled.h3`
  margin-top: ${({ theme }) => theme.spacing.none};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled.p`
  margin: ${({ theme }) => theme.spacing.none};
  background-color: ${({ theme }) => theme.palette.feedback.lighten.disabled};
  color: ${({ theme }) => theme.palette.layout.blueGrey};
  padding: ${({ theme }) => theme.spacing.md};
  min-height: ${({ theme }) => theme.spacing.xxl};
  max-height: ${({ theme }) => theme.spacing.xxl};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.palette.feedback.lighten.error};
  cursor: pointer;
`;
