exports.id = 733;
exports.ids = [733];
exports.modules = {

/***/ 927:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 7977, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 4999));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 3912, 23))

/***/ }),

/***/ 4999:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ GetPath)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./app/_components/NavBar.module.css
var NavBar_module = __webpack_require__(9076);
var NavBar_module_default = /*#__PURE__*/__webpack_require__.n(NavBar_module);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1621);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./app/_components/navLinks.js
const navLinks = [
    {
        name: "HOME",
        path: "/"
    },
    {
        name: "PORTFOLIO",
        path: "/portfolio"
    },
    {
        name: "SHOP",
        path: "/shop"
    },
    {
        name: "COMMISSIONS",
        path: "/commissions"
    },
    {
        name: "BASKET",
        path: "/basket"
    }
];

// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(9483);
;// CONCATENATED MODULE: ./app/_components/navElements.js
/* __next_internal_client_entry_do_not_use__ default auto */ 





function GetPath() {
    const pathName = (0,navigation.usePathname)();
    (0,react_.useEffect)(()=>{}, [
        pathName
    ]);
    return navLinks.map((link, index)=>{
        if (pathName != link.path) {
            return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                id: "nav" + link.name,
                href: link.path,
                className: (NavBar_module_default()).nav,
                children: link.name
            }, index);
        } else {
            return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                id: "nav" + link.name,
                href: link.path,
                className: (NavBar_module_default()).navActive,
                children: link.name
            }, index);
        }
    });
}


/***/ }),

/***/ 9076:
/***/ ((module) => {

// Exports
module.exports = {
	"nav": "NavBar_nav__JivjP",
	"navActive": "NavBar_navActive__LLvON"
};


/***/ }),

/***/ 3689:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"app/layout.js","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var layout_js_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(736);
var layout_js_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(layout_js_import_Inter_arguments_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(993);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(4834);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/headers.js
var headers = __webpack_require__(3919);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(2817);
;// CONCATENATED MODULE: ./app/_components/navLinks.js
const navLinks = [
    {
        name: "HOME",
        path: "/"
    },
    {
        name: "PORTFOLIO",
        path: "/portfolio"
    },
    {
        name: "SHOP",
        path: "/shop"
    },
    {
        name: "COMMISSIONS",
        path: "/commissions"
    },
    {
        name: "BASKET",
        path: "/basket"
    }
];

// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1313);
;// CONCATENATED MODULE: ./app/_components/navElements.js

const proxy = (0,module_proxy.createProxy)(String.raw`/home/gerryy/coding/shop/app/_components/navElements.js`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const navElements = (__default__);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(7887);
;// CONCATENATED MODULE: ./app/_components/navBar.js






function NavBar() {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "w-full h-20 flex items-center justify-between font-mono text-sm bg-white px-80",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                href: "/",
                className: "text-4xl",
                children: "Logo"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex w-2/4 justify-evenly",
                children: /*#__PURE__*/ jsx_runtime_.jsx(react_shared_subset.Suspense, {
                    fallback: null,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(navElements, {})
                })
            })
        ]
    });
}

;// CONCATENATED MODULE: ./app/layout.js








const metadata = {
    title: "test tab title",
    description: "Built by Gerald Simpson"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            className: (layout_js_import_Inter_arguments_subsets_latin_variableName_inter_default()).className,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col w-view items-center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(NavBar, {}),
                    children
                ]
            })
        })
    });
}


/***/ }),

/***/ 3174:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3180);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 2817:
/***/ (() => {



/***/ })

};
;