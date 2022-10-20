import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  background-color: ${ ({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: 18px;
`;

export const Title = styled.Text`
  font-family: ${ ({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${( {theme} ) => theme.colors.title};
`;

export const Amount = styled.Text`
  font-family: ${ ({theme}) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  margin-top: 2px;
  color: ${( {theme} ) => theme.colors.green};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  color: ${( {theme} ) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`;

export const CategoryName = styled.Text`
  font-family: ${ ({theme}) => theme.fonts.regular};
  color: ${( {theme} ) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  margin-left: 17px;
`;

export const Date = styled.Text`
  font-family: ${ ({theme}) => theme.fonts.regular};
  color: ${( {theme} ) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;