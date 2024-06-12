import { TextInputProps } from 'react-native';

export type FormFieldType = React.JSX.Element;

export interface FormFieldProps extends TextInputProps {
  title?: string;
  onChangeText: (e: string) => void;
  otherStyles?: string;
  icon?;
  onIconPress?: () => void;
}
