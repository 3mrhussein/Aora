import { TouchableOpacityProps } from 'react-native';

export interface CustomButtonProps extends TouchableOpacityProps {
  textStyles?: string;
  title?: string;
  containerStyles?: string;
  isLoading?: boolean;
}
