import {
  collection,
  FieldPath,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { db } from '~/firebaseSetup'
import { GridSearchQueryType } from '~/types/firestore'
import apiDashboard from './dashboard'
import apiSession from './session'
import apiSystemVariable from './system-variables'

export { apiDashboard, apiSession, apiSystemVariable }

export const gridSearchQuery = <T, K>(
  document: string,
  grid: GridSearchQueryType<T, K>,
) =>
  query(
    collection(db, document),
    // @ts-ignore
    ...(grid.filter ? grid.filter.map((filter) => where(...filter)) : []),
    grid.sort
      ? orderBy(grid.sort.column as string | FieldPath, grid.sort.type)
      : orderBy('modifiedAt', 'desc'),
    grid.offset,
    limit(grid.limit),
  )
