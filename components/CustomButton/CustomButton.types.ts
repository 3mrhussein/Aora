import { TouchableOpacityProps } from 'react-native';

export interface CustomButtonProps extends TouchableOpacityProps {
  title?;
  containerStyles?;
  textStyles?;
  isLoading?;
}
