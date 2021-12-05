import { collection } from 'firebase/firestore'
import { collection as rxCollection, collectionData } from 'rxfire/firestore'
import { map } from 'rxjs'
import { db } from '~/firebaseSetup'
import {
  ProfileExtraItemFilterType,
  ProfileExtraItemType,
} from '~/models/profile-extra-item'
import {
  SystemVariableFilterType,
  SystemVariableType,
} from '~/models/system-variable'
import { GridSearchQueryType } from '~/types/firestore'
import { gridSearchQuery } from '..'

const apiGetProfileExtraItems$ = (
  grid?: GridSearchQueryType<ProfileExtraItemType, ProfileExtraItemFilterType>,
) =>
  rxCollection(
    grid
      ? gridSearchQuery('profile-extra-items', grid)
      : collection(db, 'profile-extra-items'),
  ).pipe(
    map(
      (extraItems) =>
        extraItems.map((extraItem) => ({
          key: extraItem.id,
          ...extraItem.data(),
        })) as ProfileExtraItemType[],
    ),
  )

const apiGetAllSystemVariableTypes$ = () =>
  collectionData(collection(db, 'system-variables')).pipe(
    map((systemVariables) => {
      const result: string[] = []

      systemVariables.forEach((systemVariable) => {
        if (!result.some((res) => res === systemVariable.type)) {
          result.push(systemVariable.type)
        }
      })

      return result
    }),
  )

const apiGetSystemVariables$ = (
  grid: GridSearchQueryType<SystemVariableType, SystemVariableFilterType>,
) =>
  rxCollection(gridSearchQuery('system-variables', grid)).pipe(
    map(
      (systemVariables) =>
        systemVariables.map((systemVariable) => ({
          key: systemVariable.id,
          ...systemVariable.data(),
        })) as SystemVariableType[],
    ),
  )

export default {
  apiGetProfileExtraItems$,
  apiGetAllSystemVariableTypes$,
  apiGetSystemVariables$,
}
