import React from 'react';

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface TransactionProps {
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export interface Category {
  name: string;
  icon: string;
}

interface Props {
  data: TransactionProps,
}

export function TransactionCard( {data} : Props ) {
  return (
    <Container>
      <Title>{data.title}</Title> 
      <Amount>{data.amount}</Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon}></Icon>
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}