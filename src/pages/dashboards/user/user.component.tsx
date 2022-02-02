import { startAfter } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import { apiSystemVariable } from '~/apis'
import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'
import { ProfileExtraItemType } from '~/models/profile-extra-item'
import PageDashboardLayout from '~/pages/dashboards/layout.component'
import adminGlobalStates from '~/states/admin'
import deviceGlobalStates from '~/states/device'
import PageDashboardStyle from '../layout.style'
import CountryChart from './country-chart'
import DynamicChart from './dynamic-chart'
import GenderChart from './gender-chart'
import GenderPreferChart from './gender-prefer-chart'
import InterestChart from './interest-chart'

export interface PageDashboardUserProps {}

export default function PageDashboardUser({}: PageDashboardUserProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)
  const admin = Recoil.useRecoilValue(adminGlobalStates.adminState)

  const [profileExtraItems, setProfileExtraItems] = React.useState<
    ProfileExtraItemType[]
  >([])

  React.useLayoutEffect(() => {
    if (!admin) {
      return () => {}
    }

    const subscription = apiSystemVariable
      .apiGetProfileExtraItems$({
        limit: 10000,
        offset: startAfter(moment('9999-12-31T00:00:00.000Z').toDate()),
        sort: {
          column: 'modifiedAt',
          type: 'desc',
        },
        filter: [
          [
            'type',
            'in',
            [
              PROFILE_EXTRA_ITEM_TYPE.SELECT,
              PROFILE_EXTRA_ITEM_TYPE.MULTI_SELECT,
            ],
          ],
        ],
      })
      .subscribe((result) => {
        if (!result) {
          setProfileExtraItems(() => [])
          return
        }

        setProfileExtraItems(() => result)
      })

    return () => subscription.unsubscribe()
  }, [
    admin,
    apiSystemVariable.apiGetProfileExtraItems$,
    startAfter,
    moment,
    PROFILE_EXTRA_ITEM_TYPE,
  ])

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
              key={item.key}
              id={item.key ?? ''}
              title={item.titleKr ?? ''}
              className={`${PageDashboardStyle.chart({ device })} mt-5`}
            />
          ))}
        </div>
      </div>
    </PageDashboardLayout>
  )
}
