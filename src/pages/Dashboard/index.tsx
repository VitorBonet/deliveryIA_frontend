import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import {
  Container,
  ButtonSelect,
  CardContainer,
  Card,
  TableContainer,
} from './styles';

interface Delivery {
  id: string;
  type: 'Income' | 'Outcome';
  seq: number;
  exec: string;
  order: {
    id: string;
    time: number;
    value: number;
    itemGrafo: {
      id: string;
      name: string;
    };
    created_at: Date;
  };
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface NumberToMoney {
  value: number;
  type: string | undefined;
}

function convertNumberToMoney({ value, type }: NumberToMoney): string {
  let ret = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  if (type === 'Outcome') {
    ret = `- ${ret}`;
  }

  return ret;
}

const Dashboard: React.FC = () => {
  const [buttonSelectedA1, setButtonSelectedA1] = useState(true);
  const [buttonSelectedA2, setButtonSelectedA2] = useState(false);
  const [deliverys, setDeliverys] = useState<Delivery[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/delivery');

      const deliverysData: Delivery[] = response.data;

      const valueIncome = deliverysData
        .filter(deli => deli.type === 'Income')
        .reduce((tot, delivery) => {
          return tot + delivery.order.value;
        }, 0);

      const valueOutcome = deliverysData
        .filter(deli => deli.type === 'Outcome')
        .reduce((tot, delivery) => {
          return tot + delivery.order.value;
        }, 0);

      const valueTot = deliverysData.reduce((tot, delivery) => {
        return tot + delivery.order.value;
      }, 0);

      const BalanceIncome = convertNumberToMoney({
        value: valueIncome,
        type: undefined,
      });

      const BalanceOutcome = convertNumberToMoney({
        value: valueOutcome,
        type: undefined,
      });

      const BalanceTotal = convertNumberToMoney({
        value: valueTot,
        type: undefined,
      });

      const balanceData = {
        income: BalanceIncome,
        outcome: BalanceOutcome,
        total: BalanceTotal,
      };

      setDeliverys(deliverysData);
      setBalance(balanceData);
    }

    loadTransactions();
  }, []);

  const handleSelectDeliverys = useCallback(async button => {
    if (button === 1) {
      setButtonSelectedA1(true);
      setButtonSelectedA2(false);
    } else {
      setButtonSelectedA1(false);
      setButtonSelectedA2(true);
    }
    // try {
    //   await api.patch('/delivery/upload', data);
    //   addToast({
    //     type: 'success',
    //     title: 'Sucesso',
    //     description: 'Importação realizada com sucesso',
    //   });
    // } catch (err) {
    //   console.log(err.response.data.message);
    //   if (err.response.data.status) {
    //     addToast({
    //       type: 'error',
    //       title: 'Erro na importação',
    //       description: err.response.data.message,
    //     });
    //   } else {
    //     addToast({
    //       type: 'error',
    //       title: 'Erro na importação',
    //       description: 'Ocorreu um erro ao tentar importar o arquivo.',
    //     });
    //   }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <ButtonSelect
          onClick={() => handleSelectDeliverys(1)}
          type="button"
          selected={buttonSelectedA1}
        >
          A1
        </ButtonSelect>
        <ButtonSelect
          onClick={() => handleSelectDeliverys(2)}
          type="button"
          disabled
          selected={buttonSelectedA2}
        >
          A2
        </ButtonSelect>
        <CardContainer>
          <Card>
            <header>
              <p>Realizadas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Perdidas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
              </tr>
            </thead>

            <tbody>
              {deliverys.map(delivery => (
                <tr key={delivery.id}>
                  <td className="title">{delivery.order.itemGrafo.name}</td>
                  <td className={delivery.type}>
                    {convertNumberToMoney({
                      value: delivery.order.value,
                      type: delivery.type,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
