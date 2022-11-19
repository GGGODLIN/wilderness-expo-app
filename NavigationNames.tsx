export const MAIN_STACK_LOGIN = 'MainStack_LoginScreen';
export const MAIN_STACK_REGISTER = 'MainStack_RegisterScreen';
export const MAIN_STACK_RESET_PASSWORD = 'MainStack_ResetPasswordScreen';

export const MAIN_STACK_EVENT_DETAILS = 'MainStack_EventDetailsScreen';
export const MAIN_STACK_MESSAGES = 'MainStack_MessagesScreen';
export const MAIN_STACK_PROFILE = 'MainStack_ProfileScreen';
export const MAIN_STACK_CREATE_POST = 'MainStack_CreatePostScreen';
export const MAIN_STACK_CREATE_POST_WITH_LOCATION = 'MainStack_CreatePostWithLocationScreen';
export const MAIN_STACK_CREATE_LOCATION = 'MainStack_CreateLocationScreen';

export const MAIN_STACK_TABS = 'MainStack_TabsScreen';

export const MAIN_TAB_COMMUNITY = 'MainStack_MainTab_CommunityScreen'; // TODO: Rename to MAIN_TAB_CLUBS
export const MAIN_TAB_EXPLORE = 'MainStack_MainTab_ExploreScreen';
export const MAIN_TAB_HOME = 'MainStack_MainTab_HomeScreen';
export const MAIN_TAB_COLLECTION = 'MainStack_MainTab_CollectionScreen';
export const MAIN_TAB_PROFILE = 'MainStack_MainTab_ProfileScreen';

export const PROFILE_STACK_SCORE = 'ProfileStack_Score';
export const PROFILE_STACK_USER = 'ProfileStack_User';
export const PROFILE_STACK_NOTIFICATIONS = 'ProfileStack_Notifications';
export const PROFILE_STACK_SETTINGS = 'ProfileStack_Settings';
export const PROFILE_STACK_CHANGE_PASSWORD = 'ProfileStack_ChangePassword';
export const PROFILE_STACK_EDIT_PROFILE = 'ProfileStack_EditProfile';
export const PROFILE_STACK_EDIT_AVATAR = 'ProfileStack_EditAvatar';
export const PROFILE_STACK_PRIVACY = 'ProfileStack_Privacy';
export const PROFILE_STACK_ABOUT = 'ProfileStack_About';
export const PROFILE_STACK_TERMS = 'ProfileStack_Terms';

/** @deprecated 請改用 MAIN_STACK_LOCATION_DRAWER */
export const MAIN_STACK_LOCATION_DETAILS = 'MainStack_LocationDrawer'; // 舊的相容 DRAWER :P
export const MAIN_STACK_LOCATION_DRAWER = 'MainStack_LocationDrawer';
export const MAIN_STACK_LOCATION_DRAWER_POST_DETAILS = 'MainStack_LocationDrawer_PostDetailsScreen';
export const MAIN_STACK_LOCATION_DRAWER_POST_EDIT = 'MainStack_LocationDrawer_PostEditScreen';
export const MAIN_STACK_LOCATION_DRAWER_POST_REPORT = 'MainStack_LocationDrawer_PostReportScreen';

/** @deprecated 請改用 MAIN_STACK_POST_DRAWER */
export const MAIN_STACK_POST = 'MainStack_PostDrawer'; // @deprecated 舊的相容 DRAWER :P
export const MAIN_STACK_POST_DRAWER = 'MainStack_PostDrawer';
export const MAIN_STACK_POST_DRAWER_POST_DETAILS = 'MainStack_PostDrawer_PostDetailsScreen';
export const MAIN_STACK_POST_DRAWER_POST_EDIT = 'MainStack_PostDrawer_PostEditScreen';
export const MAIN_STACK_POST_DRAWER_POST_REPORT = 'MainStack_PostDrawer_PostReportScreen';

export const NAME_MAPPING = {
  [MAIN_TAB_COMMUNITY]: '探索', // TODO: Rename to MAIN_TAB_CLUBS
  [MAIN_TAB_EXPLORE]: '社群',
  [MAIN_TAB_HOME]: '首頁',
  [MAIN_TAB_COLLECTION]: '私藏',
  [MAIN_TAB_PROFILE]: '個人',
};
