app.directive("sidenav", function ($rootScope, $state) {
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
        link: function (scope, element, attrs, $interval) {

            scope.menuItems = [
                {
                    "icon": "bi bi-speedometer",
                    "name": "Dashboard",
                    "hasSubmenu": false,
                    "state": "dashboard"
                },
                {
                    "icon": "bi bi-database-fill",
                    "name": "Databases",
                    "hasSubmenu": true,
                    "subitems": [{
                        "icon": "bi bi-database-fill-gear",
                        "name": "Manage Databases",
                        "state": "Database",
                    }, {
                        "icon": "bi bi-hdd-fill",
                        "name": "Backup Manager",
                        "state": "Backup",
                    }]
                },
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
                        "name": "Table Permissions",
                        "state": "Permission",
                    }, {
                        "icon": "bi bi-braces-asterisk",
                        "name": "SP Permissions",
                        "state": "SPPermission",
                    }, {
                        "icon": "bi bi-database-fill-lock",
                        "name": "Database Roles",
                        "state": "DBPermission",
                    }, {
                        "icon": "bi bi-person-video2",
                        "name": "Permissions Report",
                        "state": "PermReport",
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
                    }, {
                        "icon": "bi bi-card-heading",
                        "name": "Index Analytics",
                        "state": "Indexing",
                    }]
                }
            ]

            scope.slideUpMenu = function () {
                $('.subitem').ready(function () {
                    items = document.getElementsByClassName('subitem')
                    $(items).hide().slideUp(300);
                })
                if ($state.current.name === 'dashboard') {
                    document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].style.backgroundColor = '#20bb40ad'
                    document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].children[0].style.color = 'white'
                    document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].children[0].children[1].children[0].style.color = 'white'
                } else {
                    setTimeout(function () {
                        var state = $state.current.name;
                        document.getElementById(state).classList.add('active-menu')
                        document.getElementById(state).parentNode.parentNode.style.display = 'block';
                    }, 500);
                }
            }

            scope.toggleSubmenu = function (e) {
                $(e.currentTarget).parent().siblings().children(":odd").slideUp()
                submenus = e.currentTarget.parentNode.children[1];
                $(submenus).slideToggle(300);
            }

            scope.active = function (e) {
                $(e.currentTarget).parent().siblings().children().removeClass('active-menu')
                $(e.currentTarget).parent().parent().parent().siblings().children(":odd").children().children().removeClass('active-menu')
                e.currentTarget.classList.add('active-menu')
                document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].style.backgroundColor = '#8080801f'
                document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].children[0].style.color = 'green'
                document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].children[0].children[1].children[0].style.color = 'black'
            }

            scope.removeActivePages = function () {
                $('a').parent().parent().parent().siblings().children(":odd").children().children().removeClass('active-menu')
                document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].style.backgroundColor = '#8080801f'
                document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].children[0].style.color = 'green'
                document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].children[0].children[1].children[0].style.color = 'black'
            }

            scope.goToState = function (stateName) {
                scope.slideUpMenu();
                scope.removeActivePages();
                document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].style.backgroundColor = '#20bb40ad'
                document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].children[0].style.color = 'white'
                document.querySelectorAll('.pcoded .pcoded-navbar .pcoded-item > li')[0].children[0].children[1].children[0].style.color = 'white'
                $state.go(stateName);
            }
        }
    }
})