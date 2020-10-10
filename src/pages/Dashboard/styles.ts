import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  selected?: boolean;
}
interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 20px 20px;
`;

export const ButtonSelect = styled.button`
  background: ${({ selected }: ButtonProps): string =>
    selected ? '#4E878C' : '#fff'};
  color: ${({ selected }: ButtonProps): string => (selected ? '#fff' : '#000')};
  border-radius: 5px;
  padding: 8px 45px;
  border: 0;
  transition: background-color 0.2s;
  font-size: 14px;
  margin-right: 5px;

  &:hover {
    background: ${shade(0.2, '#4e878c')};
    color: #fff;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: 20px;
`;

export const Card = styled.div`
  background: ${({ total }: CardProps): string => (total ? '#4E878C' : '#fff')};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#4E878C')};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      &.title {
        color: #363f5f;
      }

      &.Income {
        color: #12a454;
      }

      &.Outcome {
        color: #e83f5b;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
