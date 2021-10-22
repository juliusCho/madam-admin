import React from 'react'
import Recoil from 'recoil'
import { apiSystemVariable } from '~/api'
import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'
import { ProfileExtraItemType } from '~/models/profile-extra-item'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import deviceGlobalStates from '~/states/device'
import customHooks from '~/utils/hooks'
import PageDashboardStyle from '../layout.style'
import CountryChart from './country-chart'
import DynamicChart from './dynamic-chart'
import GenderChart from './gender-chart'
import GenderPreferChart from './gender-prefer-chart'
import InterestChart from './interest-chart'

export interface PageDashboardUserProps {}

export default function PageDashboardUser({}: PageDashboardUserProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const [profileExtraItems, setProfileExtraItems] = React.useState<
    ProfileExtraItemType[]
  >([])

  const isMounted = customHooks.useIsMounted()

  const fetchProfileExtraItems = React.useCallback(async () => {
    const result = await apiSystemVariable.apiGetProfileExtraItems()
    if (!result) {
      setProfileExtraItems(() => [])
      return
    }

    setProfileExtraItems(() =>
      result.filter(
        (item) =>
          item.type === PROFILE_EXTRA_ITEM_TYPE.SELECT ||
          item.type === PROFILE_EXTRA_ITEM_TYPE.MULTI_SELECT,
      ),
    )
  }, [apiSystemVariable.apiGetProfileExtraItems, PROFILE_EXTRA_ITEM_TYPE])

  React.useEffect(() => {
    if (isMounted()) {
      fetchProfileExtraItems()
    }
  }, [isMounted, fetchProfileExtraItems])

  return (
    <PageDashboardLayout endpoint="USER">
      <div className={PageDashboardStyle.container({ device })}>
        <div className={PageDashboardStyle.row({ device })}>
          <GenderChart
            className={`${PageDashboardStyle.chart({ device })} mt-5`}
          />
          <GenderPreferChart className={PageDashboardStyle.chart({ device })} />
          <CountryChart className={PageDashboardStyle.chart({ device })} />
          <InterestChart
            isLike
            className={`${PageDashboardStyle.chart({ device })} mt-5`}
          />
          <InterestChart
            isLike={false}
            className={`${PageDashboardStyle.chart({ device })} mt-5`}
          />
          {profileExtraItems.map((item) => (
            <DynamicChart
              key={item.id}
              id={item.id}
              title={item.titleKr}
              className={`${PageDashboardStyle.chart({ device })} mt-5`}
            />
          ))}
        </div>
      </div>
    </PageDashboardLayout>
  )
}
