import moment from 'moment'
import PageNation from '~/classes/page-nation'
import ProfileExtraItem from '~/classes/profile-extra-item'
import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'

const apiGetProfileExtraItems = async (
  token: string,
  pageNation: PageNation,
  profileExtraItem?: ProfileExtraItem,
): Promise<ProfileExtraItem[] | null> => {
  return [
    new ProfileExtraItem({
      id: '1',
      titleKr: '테스트',
      titleEn: 'test',
      type: PROFILE_EXTRA_ITEM_TYPE.TEXT,
      createdAt: moment().format('YYYY-MM-DDTHH:mm:ss.sssZ'),
    }),
  ]
}

export default {
  apiGetProfileExtraItems,
}
