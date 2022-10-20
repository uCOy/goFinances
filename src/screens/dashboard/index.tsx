import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
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

export function Dashboard(){

  const data = [
    {
      title:'Desenvolvimento de site',
      amount:'R$ 12.000,00',
      category:{
        name: 'Vendas',
        icon: 'dollar-sign'
      },         
      date:'13/04/2020'
    },
    {
      title:'Hamburgueria Pizzy',
      amount:'- R$ 59,00',
      category:{
        name: 'Alimentação',
        icon: 'coffee'
      },
      date:'10/04/2020',
    },
    {
      title:'Aluguel do apartamento',
      amount:'- R$ 1.200,00',
      category:{
        name: 'Casa',
        icon: 'home'
      },
      date:'23/03/2020',
    }
  ]
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