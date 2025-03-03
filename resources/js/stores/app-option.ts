import {defineStore, getActivePinia} from "pinia";



export const useAppOptionStore = defineStore({
  id: "appOption",
  state: () => {
    return {
    	appMode: 'dark',
    	appThemeClass: '',
    	appCoverClass: '',
			appBoxedLayout: false,
			appHeaderHide: false,
			appHeaderSearchToggled: false,
			appSidebarToggled: true,
			appSidebarCollapsed: true,
			appSidebarMobileToggled: false,
			appSidebarMobileClosed: false,
			appSidebarHide: true,
			appContentFullHeight: false,
			appContentClass: '',
			appTopNav: false,
			appFooter: false,
			appFooterFixed: false,
			appThemePanelToggled: false,
		}
  }
});
