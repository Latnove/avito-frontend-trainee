import { useUpdateAdMutation, type Ad, type ItemUpdateIn } from '@/entities/ad'
import { categoryLabels } from '@/entities/category'
import { AiDescription, AiPrice } from '@/features/ai-assistant'
import { useDraft } from '@/features/draft'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Label } from '@/shared/ui/Label'
import { Select } from '@/shared/ui/Select'
import { TextArea } from '@/shared/ui/TextArea'
import { Alert, notification } from 'antd'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useForm, type Path, type PathValue } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styles from './AdForm.module.css'
import { ParamsFields } from './ParamsFields'

interface IAdForm {
  ad: Ad
  id: string
}

export const AdForm = ({ ad, id }: IAdForm) => {
  const STORAGE_KEY = `ad-form-draft-${id}`
  const { draft, save, restore, clear } = useDraft<ItemUpdateIn>(STORAGE_KEY)
  const { mutateAsync, isPending } = useUpdateAdMutation(id)
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { isValid, dirtyFields },
    getValues,
    setValue,
    watch,
  } = useForm<ItemUpdateIn>({
    defaultValues: {
      category: ad.category,
      title: ad.title,
      description: ad.description,
      price: ad.price,
      params: ad.params,
    },
    mode: 'onBlur',
  })

  const values = watch()

  useEffect(() => {
    const subscription = watch((value) => {
      save(value as ItemUpdateIn)
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = async (values: ItemUpdateIn) => {
    try {
      await mutateAsync(values)

      notification.success({
        title: 'Изменения сохранены',
        placement: 'topRight',
        className: clsx(styles.notification, styles.notificationSuccess),
        description: null,
      })

      clear()
      navigate(`/ads/${id}`)
    } catch (e: unknown) {
      console.error(e)

      notification.error({
        title: 'Ошибка сохранения',
        description:
          'При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.',
        placement: 'topRight',
        className: clsx(styles.notification, styles.notificationError),
      })
    }
  }

  const handleApply = <K extends Path<ItemUpdateIn>>(
    field: K,
    value: PathValue<ItemUpdateIn, K>,
  ) => {
    setValue(field, value, {
      shouldDirty: true,
    })
  }

  const handleRestoreDraft = () => {
    const data = restore()
    Object.entries(data as ItemUpdateIn).forEach(([key, value]) => {
      setValue(key as Path<ItemUpdateIn>, value, { shouldDirty: true })
    })

    clear()
  }

  return (
    <form>
      {draft && (
        <Alert
          type='info'
          title='Найден черновик'
          description={
            <Button isPrimary onClick={handleRestoreDraft}>
              Восстановить
            </Button>
          }
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Label title='Категория' className={styles.label}>
        <Select
          name='category'
          control={control}
          options={Object.entries(categoryLabels).map(([value, label]) => ({ value, label }))}
          placeholder='Выберите категорию'
          rules={{ required: 'Категория должна быть выбрана' }}
          className={styles.categorySelect}
        />
      </Label>

      <Label title='Название' isRequired={true} className={styles.label}>
        <Input
          name='title'
          control={control}
          placeholder={ad.title}
          rules={{ required: 'Название должно быть заполнено' }}
          className={styles.input}
        />
      </Label>

      <Label title='Цена' isRequired={true} className={styles.label}>
        <div className={styles.priceContainer}>
          <Input
            name='price'
            control={control}
            placeholder={ad.price}
            rules={{ required: 'Цена должна быть указана' }}
            className={styles.input}
            type='number'
          />
          <AiPrice onApply={handleApply} getValues={getValues} />
        </div>
      </Label>

      <Label title='Характеристики' className={styles.label}>
        <ParamsFields
          control={control}
          category={values.category || ad.category}
          params={ad.params}
        />
      </Label>

      <Label title='Описание' className={styles.textAreaLabel}>
        <TextArea
          className={styles.textArea}
          name='description'
          control={control}
          placeholder='Описание объявления'
          isShowCount={true}
          maxLength={1000}
        />

        <AiDescription
          isEmpty={!values.description?.trim()}
          onApply={handleApply}
          getValues={getValues}
        />
      </Label>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          disabled={!isValid || !Object.entries(dirtyFields).length}
          onClick={handleSubmit(onSubmit)}
          loading={isPending}
          isPrimary
        >
          Сохранить
        </Button>

        <Button className={styles.button} onClick={() => navigate(`/ads/${id}`)} isSecondary>
          Отменить
        </Button>
      </div>
    </form>
  )
}
