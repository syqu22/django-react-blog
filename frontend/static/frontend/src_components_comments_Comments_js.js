/*! For license information please see src_components_comments_Comments_js.js.LICENSE.txt */
(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_comments_Comments_js"],{"./src/components/comments/Comment.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst Comment = ({\n  values\n}) => {\n  const formatDate = date => {\n    return moment__WEBPACK_IMPORTED_MODULE_1___default()(date).fromNow();\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: "comment"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: "left-item"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {\n    src: "https://www.w3schools.com/howto/img_avatar.png",\n    className: "avatar"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, values.author.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, formatDate(values.created_at))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: "right-item"\n  }, values.body));\n};\n\nComment.propTypes = {\n  values: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object)\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comment);\n\n//# sourceURL=webpack://frontend/./src/components/comments/Comment.js?')},"./src/components/comments/Comments.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n/* harmony import */ var _connection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../connection */ "./src/connection.js");\n/* harmony import */ var _Comment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Comment */ "./src/components/comments/Comment.js");\n/* harmony import */ var _Pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Pagination */ "./src/components/Pagination.js");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst initialData = Object.freeze({\n  body: ""\n});\n\nconst Comments = ({\n  slug\n}) => {\n  const [commentsList, setCommentsList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n  const [formData, setFormData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialData);\n  const [commentCreated, setCommentCreated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [countdown, setCountdown] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});\n  const commentsPerPage = 6;\n  const maxComments = commentsList.length / commentsPerPage;\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    clearState();\n    setError({});\n    setCommentCreated(false);\n    _connection__WEBPACK_IMPORTED_MODULE_1__.default.get(`comments/${slug}/`).then(res => setCommentsList(res.data)).catch(err => console.log(err.message));\n  }, [commentCreated]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const tooManyRequests = error["Too Many Requests"];\n\n    if (tooManyRequests) {\n      setCountdown(parseInt(tooManyRequests.split(" ")[2], 10));\n    }\n  }, [error]);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    if (countdown > 0) {\n      let timer = setTimeout(() => setCountdown(countdown - 1), 1000);\n      return () => clearTimeout(timer);\n    }\n  }, [countdown]);\n\n  const clearState = () => {\n    setFormData(initialData);\n  }; // Make textarea bigger with big enough text\n\n\n  const handleChange = e => {\n    e.target.style.height = "inherit", e.target.style.height = `${e.target.scrollHeight}px`, setFormData({ ...formData,\n      [e.target.name]: e.target.value.trim()\n    });\n  };\n\n  const handleSubmit = e => {\n    e.preventDefault();\n    _connection__WEBPACK_IMPORTED_MODULE_1__.default.post(`comments/${slug}/send/`, {\n      body: formData.body\n    }).then(() => setCommentCreated(true)).catch(err => {\n      setError(err.response.data);\n    });\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, countdown > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {\n    className: "comment-countdown"\n  }, "Please wait ", countdown, " seconds before posting another comment."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {\n    className: "comment-form",\n    onSubmit: handleSubmit,\n    noValidate: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {\n    htmlFor: "body"\n  }, error.body && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {\n    className: "invalid-value"\n  }, error.body), error.detail && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {\n    className: "invalid-value"\n  }, error.detail)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("textarea", {\n    id: "body",\n    name: "body",\n    onChange: handleChange,\n    placeholder: "Write your own comment here...",\n    maxLength: "255",\n    rows: 4,\n    style: error.body || countdown ? {\n      borderColor: "var(--danger)"\n    } : {\n      borderColor: "var(--secondary)"\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {\n    className: "info"\n  }, formData.body.length, " / 255"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {\n    className: "animated-button",\n    type: "submit"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Comment")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {\n    className: "comments"\n  }, commentsList.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", {\n    className: "error"\n  }, "No comments yet"), commentsList.slice(currentPage * commentsPerPage, currentPage * commentsPerPage + commentsPerPage).map(comment => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Comment__WEBPACK_IMPORTED_MODULE_2__.default, {\n      key: comment.id,\n      values: comment\n    });\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Pagination__WEBPACK_IMPORTED_MODULE_3__.default, {\n    page: currentPage,\n    maxPages: maxComments,\n    handleChange: setCurrentPage\n  }));\n};\n\nComments.propTypes = {\n  slug: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string)\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comments);\n\n//# sourceURL=webpack://frontend/./src/components/comments/Comments.js?')}}]);