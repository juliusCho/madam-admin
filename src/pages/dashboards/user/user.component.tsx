import React from 'react'
import Recoil from 'recoil'
import { apiSystemVariable } from '~/api'
import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'
import { ProfileExtraItemType } from '~/models/profile-extra-item'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import adminGlobalStates from '~/states/admin'
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
  const token = Recoil.useRecoilValue(adminGlobalStates.tokenState)
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const [profileExtraItems, setProfileExtraItems] = React.useState<
    ProfileExtraItemType[]
  >([])

  const isMounted = customHooks.useIsMounted()

  const fetchProfileExtraItems = React.useCallback(async () => {
    const result = await apiSystemVariable.apiGetProfileExtraItems(token)
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
  }, [
    apiSystemVariable.apiGetProfileExtraItems,
    token,
    PROFILE_EXTRA_ITEM_TYPE,
  ])

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
            token={token}
            className={`${PageDashboardStyle.chart({ device })} mt-5`}
          />
          <GenderPreferChart
            token={token}
            className={PageDashboardStyle.chart({ device })}
          />
          <CountryChart
            token={token}
            className={PageDashboardStyle.chart({ device })}
          />
          <InterestChart
            token={token}
            isLike
            className={`${PageDashboardStyle.chart({ device })} mt-5`}
          />
          <InterestChart
            token={token}
            isLike={false}
            className={`${PageDashboardStyle.chart({ device })} mt-5`}
          />
          {profileExtraItems.map((item) => (
            <DynamicChart
              key={item.id}
              token={token}
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
