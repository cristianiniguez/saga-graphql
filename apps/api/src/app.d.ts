type BaseModel = {
  id: string
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

type Attributes = {
  description?: string
  shape?: string
  hardiness?: string
  taste?: string
}

type Avocado = BaseModel & {
  name: string
  sku: string
  price: number
  image: string
  attributes: Attributes
}
