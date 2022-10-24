import React from 'react'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { 
  Container,
  Header,
  Title,
  Form,
} from './styles'

export function Register() {
  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Input 
          placeholder="Nome"
        />
        <Input 
          placeholder="Preço"
        />
      </Form>
      <Button/>
    </Container>
  )
}