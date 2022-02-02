import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { collection as rxCollection, collectionData } from 'rxfire/firestore'
import { map } from 'rxjs'
import { CRUD } from '~/enums'
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
import { convertFirestoreDataToModel } from '~/utils/helpers'
import { gridSearchQuery } from '..'

const apiGetAllProfileExtraItems$ = () =>
  collectionData(collection(db, 'profile-extra-items')).pipe(
    map((profileExtraItems) => {
      const result: string[] = []

      profileExtraItems.forEach((profileExtraItem) => {
        if (!result.some((res) => res === profileExtraItem.type)) {
          result.push(profileExtraItem.type)
        }
      })

      return result
    }),
  )

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

const apiGetProfileExtraItems = async (
  grid: GridSearchQueryType<ProfileExtraItemType, ProfileExtraItemFilterType>,
) => {
  const res = await getDocs(gridSearchQuery('profile-extra-items', grid))

  const result: ProfileExtraItemType[] = []

  res.forEach((d) => {
    const item = convertFirestoreDataToModel(
      d.data() as Omit<ProfileExtraItemType, 'key'>,
    )

    result.push({
      ...item,
      key: d.id,
    })
  })

  return result
}

const apiSaveProfileExtraItems = async (
  list: Array<ProfileExtraItemType & { crud: CRUD }>,
) => {
  const getUpdateData = (item: ProfileExtraItemType) => ({
    type: item.type,
    titleKr: item.titleKr,
    titleEn: item.titleEn,
    adminKey: item.adminKey,
    modifiedAt: new Date(),
  })

  const promises: Promise<void>[] = []

  list.forEach((item) => {
    switch (item.crud) {
      case CRUD.CREATE:
        promises.push(
          setDoc(doc(collection(db, 'profile-extra-items')), {
            ...getUpdateData(item),
            createdAt: new Date(),
          }),
        )
        break
      case CRUD.DELETE:
        promises.push(deleteDoc(doc(db, 'profile-extra-items', item.key ?? '')))
        break
      default:
        promises.push(
          updateDoc(
            doc(db, 'profile-extra-items', item.key ?? ''),
            getUpdateData(item),
          ),
        )
        break
    }
  })

  await Promise.all(promises)
}

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

const apiGetSystemVariables = async (
  grid: GridSearchQueryType<SystemVariableType, SystemVariableFilterType>,
) => {
  const res = await getDocs(gridSearchQuery('system-variables', grid))

  const result: SystemVariableType[] = []

  res.forEach((d) => {
    const item = convertFirestoreDataToModel(
      d.data() as Omit<SystemVariableType, 'key'>,
    )

    result.push({
      ...item,
      key: d.id,
    })
  })

  return result
}

const apiSaveSystemVariables = async (
  list: Array<SystemVariableType & { crud: CRUD }>,
) => {
  const getUpdateData = (item: SystemVariableType) => ({
    type: item.type,
    name: item.name ?? '',
    value: item.value ?? '',
    use: item.use,
    adminKey: item.adminKey,
    modifiedAt: new Date(),
  })
  const promises: Promise<void>[] = []

  list.forEach((item) => {
    switch (item.crud) {
      case CRUD.CREATE:
        promises.push(
          setDoc(doc(collection(db, 'system-variables')), {
            ...getUpdateData(item),
            createdAt: new Date(),
          }),
        )
        break
      case CRUD.DELETE:
        promises.push(deleteDoc(doc(db, 'system-variables', item.key ?? '')))
        break
      default:
        promises.push(
          updateDoc(
            doc(db, 'system-variables', item.key ?? ''),
            getUpdateData(item),
          ),
        )
        break
    }
  })

  await Promise.all(promises)
}

export default {
  apiGetAllProfileExtraItems$,
  apiGetProfileExtraItems$,
  apiGetProfileExtraItems,
  apiSaveProfileExtraItems,
  apiGetAllSystemVariableTypes$,
  apiGetSystemVariables,
  apiSaveSystemVariables,
}
