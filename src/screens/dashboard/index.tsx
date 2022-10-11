import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
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
}  from './styles'; 

export function Dashboard(){
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
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards>
    </Container>
  )
}