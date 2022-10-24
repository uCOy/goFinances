import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacityProps } from 'react-native';
import styled from "styled-components/native";

export const Container = styled(TouchableOpacityProps).attrs(({theme}) => ({
  placeholderTextColor: theme.colors.text,
}))`
  width: 100%;
  padding: 18px;
  border-radius: 5px;
  background-color: ${( {theme} ) => theme.colors.orage};
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${ ( {theme} ) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${ ( {theme}) => theme.colors.shape};
`;