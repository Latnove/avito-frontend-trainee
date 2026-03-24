import { useState } from 'react'

import { Button } from '@/shared/ui/Button'
import { BulbOutlined, RedoOutlined } from '@ant-design/icons'

import type { ItemUpdateIn } from '@/entities/ad'
import type { Path, PathValue, UseFormGetValues } from 'react-hook-form'

import { parsePriceResponse, type IParsePriceResponse } from '../lib/parsePriceResponse'
import { buildPricePrompt } from '../lib/prompts'
import { useGeneratePrice } from '../model/useGeneratePrice'
import styles from './AiButton.module.css'
import { AiTooltip } from './AiTooltip'

interface IAiPrice {
  onApply: <K extends Path<ItemUpdateIn>>(field: K, value: PathValue<ItemUpdateIn, K>) => void
  getValues: UseFormGetValues<ItemUpdateIn>
}

export const AiPrice = ({ onApply, getValues }: IAiPrice) => {
  const { mutateAsync, isPending, reset } = useGeneratePrice()
  const [isFirstPrompt, setIsFirstPrompt] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [data, setData] = useState<IParsePriceResponse | null>(null)

  const handleGenerate = async () => {
    setIsFirstPrompt(false)
    setData(null)
    try {
      setIsError(false)
      const values = getValues()
      const prompt = buildPricePrompt(values)

      const text = await mutateAsync(prompt)

      const response = parsePriceResponse(text)
      if (!response) throw new Error('Bad answer from ollama')

      setData(response)
    } catch (e) {
      console.error(e)
      setIsError(true)
    }
  }

  const handleApply = () => {
    if (!data) return

    onApply('price', data.price)
    handleClose()
  }

  const handleClose = () => {
    setIsError(false)
    setData(null)
    reset()
  }

  return (
    <AiTooltip
      isOpen={!!data || isError}
      data={data?.text}
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
            ? 'Узнать рыночную цену'
            : 'Повторить запрос'}
      </Button>
    </AiTooltip>
  )
}
