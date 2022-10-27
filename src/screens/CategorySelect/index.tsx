import React from 'react';
import { categories } from '../../Utils/categories';
import { Button } from '../../components/Form/Button';
import { FlatList } from 'react-native';

import { 
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

interface Category{
  key: string;
  name: string;
}

interface Props{
  category: Category,
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
} : Props) {

  function handleCategorySelect(category: Category){
    setCategory(category)
  }

  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <FlatList 
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <Category 
            onPress={ () => handleCategorySelect(item)}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={ () => <Separator />}
      />
      <Footer>
        <Button 
          title="Selecionar"
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  )
}