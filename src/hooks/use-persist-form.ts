import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm as useFormPrimitive,
} from 'react-hook-form';
import omit from 'lodash.omit';
import useFormPersist from 'react-hook-form-persist';

export const usePersistForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined
>(
  name: string,
  props?: UseFormProps<TFieldValues, TContext>
): UseFormReturn<TFieldValues, TContext, TTransformedValues> => {
  const hasStorage = window.sessionStorage.getItem(name);

  const form = useFormPrimitive<TFieldValues, TContext, TTransformedValues>({
    ...(hasStorage ? omit(props, ['defaultValues']) : props),
  });

  useFormPersist(name, form);
  return form;
};
