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

  // return [
  //   {
  //     id: '1',
  //     titleKr: 'MBTI',
  //     titleEn: 'MBTI',
  //     type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
  //     createdAt: moment().toDate(),
  //     modifiedAt: moment().toDate(),
  //     adminKey: '1',
  //   },
  //   {
  //     id: '2',
  //     titleKr: '종교',
  //     titleEn: 'Religion',
  //     type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
  //     createdAt: moment().toDate(),
  //     modifiedAt: moment().toDate(),
  //     adminKey: '1',
  //   },
  //   {
  //     id: '3',
  //     titleKr: '혈액형',
  //     titleEn: 'Blood Type',
  //     type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
  //     createdAt: moment().toDate(),
  //     modifiedAt: moment().toDate(),
  //     adminKey: '1',
  //   },
  //   {
  //     id: '4',
  //     titleKr: '별자리',
  //     titleEn: 'Star Sign',
  //     type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
  //     createdAt: moment().toDate(),
  //     modifiedAt: moment().toDate(),
  //     adminKey: '1',
  //   },
  // ]
}

export default {
  apiGetProfileExtraItems$,
}
