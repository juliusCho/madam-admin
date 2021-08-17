export const ROUTER_PATH = {
  LOGIN: '/login',
  DASHBOARD: {
    APP_USE: '/dashboard/app-use',
    BEST_MADAM: '/dashboard/best-madam',
    USER: '/dashboard/user',
    COUPLING: '/dashboard/coupling',
    ETC: '/dashboard/etc',
  },
  SYSTEM_VARIABLE: {
    CONFIG: '/sys-var/config',
    PROFILE: '/sys-var/profile',
  },
  POINT_PLAN: '/point-plan',
  HELP_DESK: {
    BASE_USE: '/help-desk/base-use',
    ACCOUNT: '/help-desk/account',
    COUPLING: '/help-desk/coupling',
    MEETING: '/help-desk/meeting',
    BEST_MADAM: '/help-desk/best-madam',
    MADAM_TEAM: '/help-desk/madam-team',
  },
  QNA: '/qna',
  USER: {
    BLOCK: '/user/block',
    INTEREST: '/user/interest',
    PHOTO: '/user/photo',
    PROFILE: '/user/profile',
  },
}

export const ROUTER_TITLE = {
  LOGIN: 'Madam Admin - 로그인',
  DASHBOARD: {
    APP_USE: 'Madam Admin - 대시보드[앱 사용]',
    BEST_MADAM: 'Madam Admin - 대시보드[최고의 마담]',
    USER: 'Madam Admin - 대시보드[유저]',
    COUPLING: 'Madam Admin - 대시보드[소개팅]',
    ETC: 'Madam Admin - 대시보드[기타]',
  },
  SYSTEM_VARIABLE: {
    CONFIG: 'Madam Admin - 설정 변수[시스템 설정 변수]',
    PROFILE: 'Madam Admin - 설정 변수[유저 프로필 추가선택 항목]',
  },
  POINT_PLAN: 'Madam Admin - 포인트 플랜',
  HELP_DESK: {
    BASE_USE: 'Madam Admin - 헬프데스크[앱 기본 사용]',
    ACCOUNT: 'Madam Admin - 헬프데스크[계정]',
    COUPLING: 'Madam Admin - 헬프데스크[소개팅]',
    MEETING: 'Madam Admin - 헬프데스크[미팅]',
    BEST_MADAM: 'Madam Admin - 헬프데스크[최고의 마담]',
    MADAM_TEAM: 'Madam Admin - 헬프데스크[Madam 팀]',
  },
  QNA: 'Madam Admin - 문의글 답변',
  USER: {
    BLOCK: 'Madam Admin - 유저관리[신고/차단]',
    INTEREST: 'Madam Admin - 유저관리[관심사]',
    PHOTO: 'Madam Admin - 유저관리[사진]',
    PROFILE: 'Madam Admin - 유저관리[프로필]',
  },
}

export const firstDepthTab = (route: string) => [
  {
    title: '대시보드',
    route: ROUTER_PATH.DASHBOARD.APP_USE,
    selected:
      route === ROUTER_PATH.DASHBOARD.APP_USE ||
      route === ROUTER_PATH.DASHBOARD.BEST_MADAM ||
      route === ROUTER_PATH.DASHBOARD.COUPLING ||
      route === ROUTER_PATH.DASHBOARD.USER ||
      route === ROUTER_PATH.DASHBOARD.ETC,
  },
  {
    title: '설정 변수',
    route: ROUTER_PATH.SYSTEM_VARIABLE.CONFIG,
    selected:
      route === ROUTER_PATH.SYSTEM_VARIABLE.CONFIG ||
      route === ROUTER_PATH.SYSTEM_VARIABLE.PROFILE,
  },
  {
    title: '포인트 플랜',
    route: ROUTER_PATH.POINT_PLAN,
    selected: route === ROUTER_PATH.POINT_PLAN,
  },
  {
    title: '헬프데스크',
    route: ROUTER_PATH.HELP_DESK.BASE_USE,
    selected:
      route === ROUTER_PATH.HELP_DESK.BASE_USE ||
      route === ROUTER_PATH.HELP_DESK.ACCOUNT ||
      route === ROUTER_PATH.HELP_DESK.BEST_MADAM ||
      route === ROUTER_PATH.HELP_DESK.COUPLING ||
      route === ROUTER_PATH.HELP_DESK.MADAM_TEAM ||
      route === ROUTER_PATH.HELP_DESK.MEETING,
  },
  {
    title: '문의글 답변',
    route: ROUTER_PATH.QNA,
    selected: route === ROUTER_PATH.QNA,
  },
]

export const secondDepthTab = (route: string) => ({
  DASHBOARD: [
    {
      title: '앱 사용',
      route: ROUTER_PATH.DASHBOARD.APP_USE,
      selected: route === ROUTER_PATH.DASHBOARD.APP_USE,
    },
    {
      title: '최고의 마담',
      route: ROUTER_PATH.DASHBOARD.BEST_MADAM,
      selected: route === ROUTER_PATH.DASHBOARD.BEST_MADAM,
    },
    {
      title: '유저',
      route: ROUTER_PATH.DASHBOARD.USER,
      selected: route === ROUTER_PATH.DASHBOARD.USER,
    },
    {
      title: '소개팅',
      route: ROUTER_PATH.DASHBOARD.COUPLING,
      selected: route === ROUTER_PATH.DASHBOARD.COUPLING,
    },
    {
      title: '기타',
      route: ROUTER_PATH.DASHBOARD.ETC,
      selected: route === ROUTER_PATH.DASHBOARD.ETC,
    },
  ],
  SYSTEM_VARIABLE: [
    {
      title: '시스템 설정 변수',
      route: ROUTER_PATH.SYSTEM_VARIABLE.CONFIG,
      selected: route === ROUTER_PATH.SYSTEM_VARIABLE.CONFIG,
    },
    {
      title: '유저 프로필 추가선택 항목',
      route: ROUTER_PATH.SYSTEM_VARIABLE.PROFILE,
      selected: route === ROUTER_PATH.SYSTEM_VARIABLE.PROFILE,
    },
  ],
  HELP_DESK: [
    {
      title: '앱 기본 사용',
      route: ROUTER_PATH.HELP_DESK.BASE_USE,
      selected: route === ROUTER_PATH.HELP_DESK.BASE_USE,
    },
    {
      title: '계정',
      route: ROUTER_PATH.HELP_DESK.ACCOUNT,
      selected: route === ROUTER_PATH.HELP_DESK.ACCOUNT,
    },
    {
      title: '소개팅',
      route: ROUTER_PATH.HELP_DESK.COUPLING,
      selected: route === ROUTER_PATH.HELP_DESK.COUPLING,
    },
    {
      title: '미팅',
      route: ROUTER_PATH.HELP_DESK.MEETING,
      selected: route === ROUTER_PATH.HELP_DESK.MEETING,
    },
    {
      title: '최고의 마담',
      route: ROUTER_PATH.HELP_DESK.BEST_MADAM,
      selected: route === ROUTER_PATH.HELP_DESK.BEST_MADAM,
    },
    {
      title: 'Madam 팀',
      route: ROUTER_PATH.HELP_DESK.MADAM_TEAM,
      selected: route === ROUTER_PATH.HELP_DESK.MADAM_TEAM,
    },
  ],
  USER: [
    {
      title: '신고/차단',
      route: ROUTER_PATH.USER.BLOCK,
      selected: route === ROUTER_PATH.USER.BLOCK,
    },
    {
      title: '관심사',
      route: ROUTER_PATH.USER.INTEREST,
      selected: route === ROUTER_PATH.USER.INTEREST,
    },
    {
      title: '사진',
      route: ROUTER_PATH.USER.PHOTO,
      selected: route === ROUTER_PATH.USER.PHOTO,
    },
    {
      title: '프로필',
      route: ROUTER_PATH.USER.PROFILE,
      selected: route === ROUTER_PATH.USER.PROFILE,
    },
  ],
})
