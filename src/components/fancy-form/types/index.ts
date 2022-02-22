type FancyFormItemType = 'input' | 'password' | 'select' | 'datepicker'

export interface FancyFormItem {
  field: string
  type: FancyFormItemType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
}

export interface FancyFormType {
  formItems: FancyFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
