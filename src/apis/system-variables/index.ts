import { collection } from 'firebase/firestore'
import { collection as rxCollection } from 'rxfire/firestore'
import { map } from 'rxjs'
import { db } from '~/firebaseSetup'
import {
  ProfileExtraItemFilterType,
  ProfileExtraItemType,
} from '~/models/profile-extra-item'
import { GridSearchQueryType } from '~/types/firestore'
import { gridSearchQuery } from '..'

const apiGetProfileExtraItems$ = (
  grid?: GridSearchQueryType<ProfileExtraItemType, ProfileExtraItemFilterType>,
) => {
  return rxCollection(
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
}

export default {
  apiGetProfileExtraItems$,
}
