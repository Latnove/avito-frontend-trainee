import { ollamaApi } from '@/shared/api'

export async function generateText(prompt: string) {
  try {
    const res = await ollamaApi.post('/generate', {
      model: 'llama3',
      prompt,
      stream: false,
    })

    return res.data.response
  } catch (e) {
    console.error(e)
    throw new Error('Ошибка генерации текста')
  }
}

export async function generatePrice(prompt: string) {
  try {
    const res = await ollamaApi.post('/generate', {
      model: 'llama3',
      prompt,
      stream: false,
    })

    return res.data.response
  } catch (e) {
    console.error(e)
    throw new Error('Ошибка генерации цены')
  }
}

// CR: generateText и generatePrice отличаются только сообщением об ошибке
export async function generate(prompt: string, errorMessage: string = 'Произошила ошибка при генерации') {
  try {
    const res = await ollamaApi.post('/generate', {
      model: 'llama3',
      prompt,
      stream: false,
    })

    return res.data.response
  } catch (e) {
    console.error(e)
    throw new Error(errorMessage)
  }
}

