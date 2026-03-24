import { Input } from 'antd'
import clsx from 'clsx'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'
import styles from './TextArea.module.css'

const { TextArea: AntdTextArea } = Input

interface ITextArea<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  className?: string
  placeholder?: string | number
  rules?: RegisterOptions<T>
  isShowCount?: boolean
  maxLength?: number
}

export const TextArea = <T extends FieldValues>({
  name,
  control,
  className,
  placeholder,
  rules,
  isShowCount,
  maxLength,
}: ITextArea<T>) => {
  const isRequired = !!rules?.required

  return (
    <Controller
      name={name}
      control={control}
      rules={
        maxLength
          ? {
              ...rules,
              maxLength: {
                value: maxLength,
                message: 'Максимальная длина описания 1000 символов',
              },
            }
          : rules
      }
      render={({ field, fieldState }) => {
        const hasValue = !!field.value

        const isError = !!fieldState.error
        const isWarning = !isRequired && !hasValue

        return (
          <div className={styles.container}>
            <AntdTextArea
              {...field}
              placeholder={placeholder?.toString()}
              className={clsx(
                styles.wrapper,
                className,
                isError && styles.error,
                isWarning && styles.warning,
              )}
              showCount={isShowCount}
              maxLength={maxLength}
              autoSize={{ minRows: 2, maxRows: 10 }}
            />

            {isError && <span className={styles.errorText}>{fieldState.error?.message}</span>}
          </div>
        )
      }}
    />
  )
}
