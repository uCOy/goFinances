import React, { useEffect, useState } from 'react';
import { 
  Modal, 
  Alert,
  Keyboard,
  TouchableWithoutFeedback, 
} from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

import { 
  useNavigation, 
  NavigationProp, 
  ParamListBase
} from '@react-navigation/native';

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

  const dataKey = "@gofinaces:transactions";

  // const navigate = useNavigation();
  const { navigate } : NavigationProp<ParamListBase> = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
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

  async function handleRegister(form: FormData){
    if(!transactionType)
      return Alert.alert('Selecione o tipo de transação')

    if(category.key === 'categoy')
      return Alert.alert('Selecione a categoria')

    const newTransaction = { 
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date()
    }
    console.log(newTransaction)

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : [];

      const dataFormated = {
        ...currentData,
        newTransaction
      }

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated))
      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      })

      navigate('Listagem');

    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possivel salvar")
    }
  }

  // useEffect( () => {
  //   async function loadData(){
  //     const data = await AsyncStorage.getItem(dataKey)
  //     console.log(data!);
  //   }

  //   loadData();

  //   // async function removeAll(){
  //   //   AsyncStorage.removeItem(dataKey)
  //   // }
  //   // removeAll();
    
  // }, [])

  return(
    <TouchableWithoutFeedback>
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
    </TouchableWithoutFeedback>
  )
}