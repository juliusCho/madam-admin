import moment from 'moment'
import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'
import { PageNationType } from '~/models/page-nation'
import { ProfileExtraItemType } from '~/models/profile-extra-item'

const apiGetProfileExtraItems = async (
  token: string,
  pageNation: PageNationType,
  profileExtraItem?: ProfileExtraItemType,
): Promise<ProfileExtraItemType[] | null> => {
  return [
    {
      id: '1',
      titleKr: '테스트',
      titleEn: 'test',
      type: PROFILE_EXTRA_ITEM_TYPE.TEXT,
      createdAt: moment().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
    },
  ]
}

export default {
  apiGetProfileExtraItems,
}
