import { useState } from 'react'

import { Button } from '@/shared/ui/Button'
import { BulbOutlined, RedoOutlined } from '@ant-design/icons'

import type { ItemUpdateIn } from '@/entities/ad'
import type { Path, PathValue, UseFormGetValues } from 'react-hook-form'
import { buildDescriptionPrompt } from '../lib/prompts'
import { useGenerateDescription } from '../model/useGenerateDescription'
import styles from './AiButton.module.css'
import { AiTooltip } from './AiTooltip'

interface IAiDescription {
  isEmpty: boolean
  onApply: <K extends Path<ItemUpdateIn>>(field: K, value: PathValue<ItemUpdateIn, K>) => void
  getValues: UseFormGetValues<ItemUpdateIn>
}

export const AiDescription = ({ onApply, getValues, isEmpty }: IAiDescription) => {
  const { mutateAsync, isPending, data, reset } = useGenerateDescription()
  const [isFirstPrompt, setIsFirstPrompt] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const handleGenerate = async () => {
    setIsFirstPrompt(false)
    try {
      setIsError(false)
      const values = getValues()
      const prompt = buildDescriptionPrompt(values)

      await mutateAsync(prompt)
    } catch (e) {
      console.error(e)
      setIsError(true)
    }
  }

  const handleApply = () => {
    if (!data) return

    onApply('description', data)
    handleClose()
  }

  const handleClose = () => {
    setIsError(false)
    reset()
  }

  return (
    <AiTooltip
      isOpen={!!data || isError}
      data={data}
      isError={isError}
      onApply={handleApply}
      onClose={handleClose}
    >
      <Button
        onClick={handleGenerate}
        loading={isPending}
        icon={isPending ? null : isFirstPrompt ? <BulbOutlined /> : <RedoOutlined />}
        className={styles.button}
      >
        {isPending
          ? 'Выполняется запрос'
          : isFirstPrompt
            ? isEmpty
              ? 'Придумать описание'
              : 'Улучшить описание'
            : 'Повторить запрос'}
      </Button>
    </AiTooltip>
  )
}
