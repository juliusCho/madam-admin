import { QueryConstraint } from 'firebase/firestore'

export type QueryOperator =
  | '<'
  | '<='
  | '=='
  | '>'
  | '!='
  | 'array-contains'
  | 'array-contains-any'
  | 'in'
  | 'not-in'

export type WhereFilterType<T> = [keyof T, QueryOperator, unknown]

export interface GridSearchQueryType<T, K> {
  limit: number
  offset: QueryConstraint
  sort?: {
    column: keyof T
    type: 'asc' | 'desc'
  }
  filter?: WhereFilterType<K>[]
}
