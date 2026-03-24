import { paramsConfig, type ParamsType } from '@/entities/ad'
import type { Category } from '@/entities/category'
import { Input } from '@/shared/ui/Input'
import { Label } from '@/shared/ui/Label'
import { Select } from '@/shared/ui/Select'
import { type Control, type FieldValues, type Path } from 'react-hook-form'
import styles from './AdForm.module.css'

interface IParamsFields<T extends FieldValues> {
  control: Control<T>
  params: ParamsType
  category: Category
}

export const ParamsFields = <T extends FieldValues>({
  control,
  params,
  category,
}: IParamsFields<T>) => {
  const currentParamsConfig = paramsConfig[category]
  const recordParams = params as Record<string, string>

  return (
    <div className={styles.paramsList}>
      {currentParamsConfig.map((param) => {
        const value = recordParams[param.key] || null

        return (
          <Label title={param.label} key={String(param.key)} className={styles.params}>
            {param.type === 'input' ? (
              <Input
                className={styles.input}
                control={control}
                name={`params.${param.key}` as Path<T>}
                placeholder={value ? value : param.label}
                type={param.valueType}
              />
            ) : (
              <Select
                control={control}
                className={styles.input}
                name={`params.${param.key}` as Path<T>}
                placeholder={param.label}
                options={param.options}
              />
            )}
          </Label>
        )
      })}
    </div>
  )
}
