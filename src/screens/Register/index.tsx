import React, { useState } from 'react'
import { Button } from '../../components/Form/Button';
import { Modal } from 'react-native';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles'

export function Register() {

  const [transactionType, setTransactionType] = useState('');
  const [categorieModalOpen, setCategorieModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  function handleOpenSelectCategoryModal(){
    setCategorieModalOpen(true)
  }

  function handleCloseSelectCategoryModal(){
    setCategorieModalOpen(false)
  }

  function handleTransactionsTypeSelect(type: 'up' | 'down'){
    setTransactionType(type)
  }

  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input 
            placeholder="Nome"
          />
          <Input 
            placeholder="Preço"
          />
          <TransactionTypes>
            <TransactionTypeButton 
              type='up' 
              title='Income'
              onPress={ () => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton 
              type='down' 
              title='Outcome'
              onPress={ () => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionTypes>
          <CategorySelectButton 
            title='Categoria'
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button title="Enviar"/>
      </Form>
      <Modal visible={categorieModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  )
}