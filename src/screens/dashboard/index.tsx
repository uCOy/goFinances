import React, { useEffect, useState } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreething,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
}  from './styles'; 

export interface DataListProps extends TransactionCardProps {
  id: string,
}

export function Dashboard() {

  // const data: DataListProps[] = [
  //   {
  //     id: '1',
  //     type: 'positive',
  //     title:'Desenvolvimento de site',
  //     amount:'R$ 12.000,00',
  //     category:{
  //       name: 'Vendas',
  //       icon: 'dollar-sign'
  //     },         
  //     date:'13/04/2020'
  //   },
  //   {
  //     id: '2',
  //     type: 'negative',
  //     title:'Hamburgueria Pizzy',
  //     amount:'R$ 59,00',
  //     category:{
  //       name: 'Alimentação',
  //       icon: 'coffee'
  //     },
  //     date:'10/04/2020',
  //   },
  //   {
  //     id: '3',
  //     type: 'negative',
  //     title:'Aluguel do apartamento',
  //     amount:'R$ 1.200,00',
  //     category:{
  //       name: 'Casa',
  //       icon: 'home'
  //     },
  //     date:'23/03/2020',
  //   }
  // ]

  const [data, setData] = useState<DataListProps[]>([])

  async function loadTransaction(){
    const dataKey = "@gofinaces:transactions";
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];
    // setData(transactions);

    // console.log(transactions);

    const transactionsFormated: DataListProps[] = transactions
    .map( (item:DataListProps) => {
      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));
      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    })

    setData(transactionsFormated);
  }

  useEffect(() => {
    loadTransaction();
  }, [])

  return(
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo 
              source={ { uri:'https://avatars.githubusercontent.com/u/66300419?v=4'} }
              />
            <User>
              <UserGreething>Olá,</UserGreething>
              <UserName>Richard</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard 
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
          type="up"
        />
        <HighlightCard 
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última saída dia 03 de abril'
          type="down"
        />
        <HighlightCard 
          title='Total'
          amount='R$ 16.141,00'
          lastTransaction='01 à 16 de abril'
          type="total"
        />
      </HighlightCards>
      <Transactions>
        <Title>
          Listagem
        </Title>
        <TransactionList 
          data={data}
          keyExtractor={item => item}
          renderItem={( { item }) => 
            <TransactionCard data={item} />
          }
        />
          {/* <TransactionCard 
            data = {data[0]}
          /> */}
      </Transactions>
    </Container>
  )
}