import type { Category } from '@/entities/category'

// мы будем считать по типам, что все поля параметров необязательные
interface ParamsConfig {
  key: string
  label: string
}

interface ParamsConfigInput extends ParamsConfig {
  type: 'input'
  valueType: 'string' | 'number'
}

interface ParamsConfigSelect extends ParamsConfig {
  type: 'select'
  options: Array<{ value: string; label: string }>
}

export const paramsConfig: Record<Category, Array<ParamsConfigInput | ParamsConfigSelect>> = {
  electronics: [
    {
      key: 'type',
      label: 'Тип',
      type: 'select',
      options: [
        { value: 'phone', label: 'Телефон' },
        { value: 'laptop', label: 'Ноутбук' },
        { value: 'misc', label: 'Другое' },
      ],
    },
    { key: 'brand', label: 'Бренд', type: 'input', valueType: 'string' },
    { key: 'model', label: 'Модель', type: 'input', valueType: 'string' },
    {
      key: 'condition',
      label: 'Состояние',
      type: 'select',
      options: [{ value: 'new', label: 'Новый' }],
    },
    { key: 'color', label: 'Цвет', type: 'input', valueType: 'string' },
  ],
  real_estate: [
    {
      key: 'type',
      label: 'Тип',
      type: 'select',
      options: [
        { value: 'flat', label: 'Квартира' },
        { value: 'house', label: 'Дом' },
        { value: 'room', label: 'Комната' },
      ],
    },
    { key: 'address', label: 'Адрес', type: 'input', valueType: 'string' },
    { key: 'area', label: 'Площадь', type: 'input', valueType: 'number' },
    { key: 'floor', label: 'Этаж', type: 'input', valueType: 'number' },
  ],
  auto: [
    { key: 'yearOfManufacture', label: 'Год выпуска', type: 'input', valueType: 'number' },
    { key: 'brand', label: 'Бренд', type: 'input', valueType: 'string' },
    { key: 'model', label: 'Модель', type: 'input', valueType: 'string' },
    {
      key: 'transmission',
      label: 'Двигатель',
      type: 'select',
      options: [
        { value: 'automatic', label: 'Автомат' },
        { value: 'manual', label: 'Механика' },
      ],
    },
    { key: 'mileage', label: 'Пробег', type: 'input', valueType: 'number' },
    { key: 'enginePower', label: 'Мощность двигателя', type: 'input', valueType: 'number' },
  ],
}
