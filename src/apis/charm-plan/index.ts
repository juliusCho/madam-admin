import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { CRUD } from '~/enums'
import { db } from '~/firebaseSetup'
import { CharmPlanType } from '~/models/charm-plan'
import { GridSearchQueryType } from '~/types/firestore'
import { convertFirestoreDataToModel } from '~/utils/helpers'
import { gridSearchQuery } from '..'

const apiGetCharmPlans = async (
  grid: GridSearchQueryType<CharmPlanType, null>,
) => {
  const res = await getDocs(gridSearchQuery('charm-plans', grid))

  const result: CharmPlanType[] = []

  res.forEach((d) => {
    const item = convertFirestoreDataToModel(
      d.data() as Omit<CharmPlanType, 'key'>,
    )

    result.push({
      ...item,
      key: d.id,
    })
  })

  return result
}

const apiSaveCharmPlans = async (
  list: Array<CharmPlanType & { crud: CRUD }>,
) => {
  const getUpdateData = (item: CharmPlanType) => ({
    charm: item.charm ?? 0,
    dollar: item.dollar ?? '',
    order: item.order,
    purchaseCount: item.purchaseCount,
    type: item.type ?? '',
    adminKey: item.adminKey,
    modifiedAt: new Date(),
  })
  const promises: Promise<void>[] = []

  list.forEach((item) => {
    switch (item.crud) {
      case CRUD.CREATE:
        promises.push(
          setDoc(doc(collection(db, 'charm-plans')), {
            ...getUpdateData(item),
            createdAt: new Date(),
          }),
        )
        break
      case CRUD.DELETE:
        promises.push(deleteDoc(doc(db, 'charm-plans', item.key ?? '')))
        break
      default:
        promises.push(
          updateDoc(
            doc(db, 'charm-plans', item.key ?? ''),
            getUpdateData(item),
          ),
        )
        break
    }
  })

  await Promise.all(promises)
}

export default {
  apiGetCharmPlans,
  apiSaveCharmPlans,
}
