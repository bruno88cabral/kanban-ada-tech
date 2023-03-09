import styled from 'styled-components';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { BsArrowLeftShort, BsArrowRightShort, BsTrash } from 'react-icons/bs';

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.palette.layout.blue};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled.p`
  background-color: ${({ theme }) => theme.palette.feedback.lighten.disabled};
  color: ${({ theme }) => theme.palette.layout.blueGrey};
  padding: ${({ theme }) => theme.spacing.md};
  min-height: calc(${({ theme }) => theme.spacing.xxl} * 2.5);
  max-height: calc(${({ theme }) => theme.spacing.xxl} * 3);
  overflow: auto;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PreviousIcon = styled(BsArrowLeftShort)`
  color: ${({ theme }) => theme.palette.feedback.lighten.info};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const NextIcon = styled(BsArrowRightShort)`
  color: ${({ theme }) => theme.palette.feedback.lighten.info};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

export const CloseIcon = styled(AiOutlineClose)`
  float: right;
  cursor: pointer;
`;

export const RemoveIcon = styled(BsTrash)`
  color: ${({ theme }) => theme.palette.layout.white};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const EditIcon = styled(AiOutlineEdit)`
  color: ${({ theme }) => theme.palette.layout.white};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;
