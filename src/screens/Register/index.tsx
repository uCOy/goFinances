import React, { useState } from 'react'
import { Modal, Alert } from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { InputForm } from '../../components/Form/InputForm';

import { Button } from '../../components/Form/Button';
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

interface FormData {
  name: string;
  amount: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório'),
  amount: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.replace(/,/,'.')))
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

export function Register() {

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ 
    resolver: yupResolver(schema)
  });

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false)
  }

  function handleTransactionsTypeSelect(type: 'up' | 'down'){
    setTransactionType(type)
  }

  function handleRegister(form: FormData){
    if(!transactionType)
      return Alert.alert('Selecione o tipo de transação')

    if(category.key === 'categoy')
      return Alert.alert('Selecione a categoria')

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }
    console.log(data)
  }

  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm
            control={control}
            name="name"
            placeholder="Nome"
            autoCapitalize='sentences'
            autoCorrect={false}
            error={errors.name && errors.name.message}
            />
          <InputForm
            control={control}
            name="amount" 
            placeholder="Preço"
            keyboardType='numeric'
            error={errors.amount && errors.amount.message}
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
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button 
          title="Enviar"
          onPress={handleSubmit(handleRegister)}
        />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  )
}