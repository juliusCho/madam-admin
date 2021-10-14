import moment from 'moment'
import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'
import { PageNationType } from '~/models/page-nation'
import { ProfileExtraItemType } from '~/models/profile-extra-item'

const apiGetProfileExtraItems = async (
  token: string,
  pageNation?: PageNationType,
  profileExtraItem?: ProfileExtraItemType,
): Promise<ProfileExtraItemType[] | null> => {
  return [
    {
      id: '1',
      titleKr: 'MBTI',
      titleEn: 'MBTI',
      type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
      createdAt: moment().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
    },
    {
      id: '2',
      titleKr: '종교',
      titleEn: 'Religion',
      type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
      createdAt: moment().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
    },
    {
      id: '3',
      titleKr: '혈액형',
      titleEn: 'Blood Type',
      type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
      createdAt: moment().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
    },
    {
      id: '4',
      titleKr: '별자리',
      titleEn: 'Star Sign',
      type: PROFILE_EXTRA_ITEM_TYPE.SELECT,
      createdAt: moment().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
    },
  ]
}

export default {
  apiGetProfileExtraItems,
}
