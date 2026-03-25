import { Select as AntdSelect } from 'antd'
import clsx from 'clsx'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'
import styles from './Select.module.css'

interface Option {
  value: string
  label: string
}

interface ISelect<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  options: Option[]
  className?: string
  placeholder?: string
  rules?: RegisterOptions<T>
}

export const Select = <T extends FieldValues>({
  name,
  control,
  options,
  className,
  placeholder,
  rules,
}: ISelect<T>) => {
  const isRequired = !!rules?.required

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const hasValue = !!field.value

        const isError = !!fieldState.error
        const isWarning = !isRequired && !hasValue

        return (
          <>
            <AntdSelect
              {...field}
              defaultValue={undefined}
              className={clsx(
                styles.wrapper,
                className,
                isError && styles.error,
                isWarning && styles.warning,
              )}
              options={options}
              placeholder={placeholder}
              onChange={(value) => field.onChange(value)}
              value={field.value}
            />

            {isError && <span className={styles.errorText}>{fieldState.error?.message}</span>}
          </>
        )
      }}
    />
  )
}
