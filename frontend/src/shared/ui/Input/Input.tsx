import { Input as AntdInput } from 'antd'
import clsx from 'clsx'
import {
  Controller,
  useWatch,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'
import styles from './Input.module.css'

type InputType = 'string' | 'number'

interface IInput<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  type?: InputType
  className?: string
  placeholder?: string | number
  rules?: RegisterOptions<T>
}

export const Input = <T extends FieldValues>({
  name,
  control,
  className,
  placeholder,
  rules,
  type = 'string',
}: IInput<T>) => {
  const isRequired = !!rules?.required

  // CR: ай-яй-яй! нарушался Rules of Hooks, хуки используют только внутри компонента, а был в рендер-пропсе
  const value = useWatch({ control, name })

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const hasValue = value !== undefined && value !== ''
        const isError = !!fieldState.error
        const isWarning = !isRequired && !hasValue

        return (
          <div className={clsx(styles.container, className)}>
            <AntdInput
              {...field}
              value={value ?? ''}
              allowClear
              placeholder={placeholder?.toString()}
              type={type}
              onChange={(e) => {
                const value = e.target.value

                field.onChange(value === '' ? undefined : type === 'number' ? Number(value) : value)
              }}
              className={clsx(
                styles.wrapper,
                className,
                isError && styles.error,
                isWarning && styles.warning,
              )}
            />

            {isError && <span className={styles.errorText}>{fieldState.error?.message}</span>}
          </div>
        )
      }}
    />
  )
}
