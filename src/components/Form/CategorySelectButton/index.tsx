import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  Container,
  Category,
  Icon,
} from './styles';

interface Props{
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({title} : Props) {
  return (
    <Container> 
      <Category>{title}</Category>
        <Icon name="chevron-down" />
    </Container>
  )
}