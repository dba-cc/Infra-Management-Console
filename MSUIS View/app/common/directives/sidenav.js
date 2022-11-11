app.directive("sidenav", function ($rootScope) {
    return {
        templateUrl: "UI/layouts/common/directives/sidenav.html",
        restrict: "E",
        replace: !0,
        controller: ["$scope", function (e) {

			e.menuItemList = [
				{
					"icon": "ti-view-grid",
					"displayName": "User Management",
					"state": "User"
				},
				{
					"icon": "ti-view-grid",
					"displayName": "Permissions",
					"state": "Permission"
				},
				{
					"icon": "ti-view-grid",
					"displayName": "Backup Restore",
					"state": "RestoreBackup"
				},
				{
					"icon": "ti-view-grid",
					"displayName": "Query Analytics",
					"state": "QueryHit"
				},
				{
					"icon": "ti-view-grid",
					"displayName": "Credential Analytics",
					"state": "CredentialAnalytics"
				}
			]

			if (!$rootScope.reloadPage) {
				$("#pcoded").pcodedmenu({
					themelayout: 'vertical',
					verticalMenuplacement: 'left',		// value should be left/right
					verticalMenulayout: 'wide',   		// value should be wide/box/widebox
					MenuTrigger: 'click',
					SubMenuTrigger: 'click',
					activeMenuClass: 'active',
					ThemeBackgroundPattern: 'pattern2',
					HeaderBackground: 'theme4',
					LHeaderBackground: 'theme4',
					NavbarBackground: 'theme4',
					ActiveItemBackground: 'theme5',
					SubItemBackground: 'theme2',
					ActiveItemStyle: 'style0',
					ItemBorder: true,
					ItemBorderStyle: 'none',
					SubItemBorder: true,
					DropDownIconStyle: 'style3', // Value should be style1,style2,style3
					FixedNavbarPosition: false,
					FixedHeaderPosition: false,
					collapseVerticalLeftHeader: true,
					VerticalSubMenuItemIconStyle: 'style6',  // value should be style1,style2,style3,style4,style5,style6
					VerticalNavigationView: 'view1',
					verticalMenueffect: {
						desktop: "shrink",
						tablet: "overlay",
						phone: "overlay",
					},
					defaultVerticalMenu: {
						desktop: "expanded",	// value should be offcanvas/collapsed/expanded/compact/compact-acc/fullpage/ex-popover/sub-expanded
						tablet: "collapsed",		// value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
						phone: "offcanvas",		// value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
					},
					onToggleVerticalMenu: {
						desktop: "collapsed",		// value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
						tablet: "expanded",		// value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
						phone: "expanded",			// value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
					},

				});
			}

            //e.tabActive = [],
            //    e.$watch("tabActive", function () {
            //        e.perfectSCrollbarObj && setTimeout(function () {
            //            e.perfectSCrollbarObj.perfectScrollbar("update")
            //        }, 100)
            //    }, !0)
        }],
        link: function (e, t, a) {
            setTimeout(function () {
                e.perfectSCrollbarObj = t.find(".tab-content").perfectScrollbar()
            }, 0)
        }
    }
})