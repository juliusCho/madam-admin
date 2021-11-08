import moment from 'moment'
import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'
import { PageNationType } from '~/models/page-nation'
import { ProfileExtraItemType } from '~/models/profile-extra-item'

const apiGetProfileExtraItems = (
  pageNation?: PageNationType,
  profileExtraItem?: ProfileExtraItemType,
) => {
  return [
    {
      id: '1',
      titleKr: 'MBTI',
      titleEn: 'MBTI',
      type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
      createdAt: moment().toDate(),
    },
    {
      id: '2',
      titleKr: '종교',
      titleEn: 'Religion',
      type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
      createdAt: moment().toDate(),
    },
    {
      id: '3',
      titleKr: '혈액형',
      titleEn: 'Blood Type',
      type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
      createdAt: moment().toDate(),
    },
    {
      id: '4',
      titleKr: '별자리',
      titleEn: 'Star Sign',
      type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
      createdAt: moment().toDate(),
    },
  ]
}

export default {
  apiGetProfileExtraItems,
}
