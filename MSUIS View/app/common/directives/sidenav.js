app.directive("sidenav", function ($rootScope) {
    return {
        templateUrl: "UI/layouts/common/directives/sidenav.html",
        restrict: "E",
        replace: !0,
        controller: ["$scope", function (e) {
            e.toggleSubmenu = function (item) {
                item.expanded = !item.expanded;
            }

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
        }],
        link: function (scope, element, attrs) {    

            scope.menuItems = [
                {
                    "icon": "bi bi-person-vcard-fill",
                    "name": "Identity & Access",
                    "hasSubmenu": true,
                    "subitems": [{
                        "icon": "bi bi-people-fill",
                        "name": "User Accounts",
                        "state": "User",
                    }, {
                        "icon": "bi bi-person-fill-check",
                        "name": "User Permissions",
                        "state": "Permission",
                    }, {
                        "icon": "bi bi-braces-asterisk",
                        "name": "SP Permissions",
                        "state": "SPPermission",
                    }, {
                        "icon": "bi bi-database-fill-lock",
                        "name": "Database Permissions",
                        "state": "DBPermission",
                    }, {
                        "icon": "bi bi-person-video2",
                        "name": "Permissions Report",
                        "state": "PermReport",
                    }]
                },
                {
                    "icon": "bi bi-device-hdd-fill",
                    "name": "Manage Backups",
                    "hasSubmenu": true,
                    "subitems": [{
                        "icon": "bi bi-alarm-fill",
                        "name": "Auto Backup",
                        "state": "AutoBackup",
                    }, {
                        "icon": "bi bi-hdd-fill",
                        "name": "Restore Backup",
                        "state": "RestoreBackup",
                    }]
                },
                {
                    "icon": "bi bi-bar-chart-line-fill",
                    "name": "Analytics",
                    "hasSubmenu": true,
                    "subitems": [{
                        "icon": "bi bi-play-fill",
                        "name": "Query Analytics",
                        "state": "QueryHit",
                    }, {
                        "icon": "bi bi-person-lines-fill",
                        "name": "Credential Analytics",
                        "state": "CredentialAnalytics",
                    }, {
                        "icon": "bi-file-lock2",
                        "name": "Locks Analytics",
                        "state": "LockAnalysis",
                    }]
                }
            ]

            scope.slideUpMenu = function () {
                $('.subitem').ready(function () {
                    items = document.getElementsByClassName('subitem')
                    $(items).hide().slideUp();
                })
            }

            scope.toggleSubmenu = function (item, menuItems, e) {
                menus = e.currentTarget.parentNode.children;
                $(e.currentTarget).siblings().children(":odd").slideUp()
                submenus = e.currentTarget.children[1];
                $(submenus).slideToggle(300);
            }
        }
    }
})