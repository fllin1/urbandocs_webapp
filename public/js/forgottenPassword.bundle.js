/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@supabase/auth-js/dist/module/AuthAdminApi.js":
/*!********************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/AuthAdminApi.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _GoTrueAdminApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GoTrueAdminApi */ "./node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js");

const AuthAdminApi = _GoTrueAdminApi__WEBPACK_IMPORTED_MODULE_0__["default"];
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (AuthAdminApi);
//# sourceMappingURL=AuthAdminApi.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/AuthClient.js":
/*!******************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/AuthClient.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _GoTrueClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GoTrueClient */ "./node_modules/@supabase/auth-js/dist/module/GoTrueClient.js");

const AuthClient = _GoTrueClient__WEBPACK_IMPORTED_MODULE_0__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthClient);
//# sourceMappingURL=AuthClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GoTrueAdminApi)
/* harmony export */ });
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/fetch */ "./node_modules/@supabase/auth-js/dist/module/lib/fetch.js");
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/helpers */ "./node_modules/@supabase/auth-js/dist/module/lib/helpers.js");
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/errors */ "./node_modules/@supabase/auth-js/dist/module/lib/errors.js");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



class GoTrueAdminApi {
    constructor({ url = '', headers = {}, fetch, }) {
        this.url = url;
        this.headers = headers;
        this.fetch = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_1__.resolveFetch)(fetch);
        this.mfa = {
            listFactors: this._listFactors.bind(this),
            deleteFactor: this._deleteFactor.bind(this),
        };
    }
    /**
     * Removes a logged-in session.
     * @param jwt A valid, logged-in JWT.
     * @param scope The logout sope.
     */
    async signOut(jwt, scope = 'global') {
        try {
            await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'POST', `${this.url}/logout?scope=${scope}`, {
                headers: this.headers,
                jwt,
                noResolveJson: true,
            });
            return { data: null, error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * Sends an invite link to an email address.
     * @param email The email address of the user.
     * @param options Additional options to be included when inviting.
     */
    async inviteUserByEmail(email, options = {}) {
        try {
            return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'POST', `${this.url}/invite`, {
                body: { email, data: options.data },
                headers: this.headers,
                redirectTo: options.redirectTo,
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._userResponse,
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Generates email links and OTPs to be sent via a custom email provider.
     * @param email The user's email.
     * @param options.password User password. For signup only.
     * @param options.data Optional user metadata. For signup only.
     * @param options.redirectTo The redirect url which should be appended to the generated link
     */
    async generateLink(params) {
        try {
            const { options } = params, rest = __rest(params, ["options"]);
            const body = Object.assign(Object.assign({}, rest), options);
            if ('newEmail' in rest) {
                // replace newEmail with new_email in request body
                body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
                delete body['newEmail'];
            }
            return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'POST', `${this.url}/admin/generate_link`, {
                body: body,
                headers: this.headers,
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._generateLinkResponse,
                redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo,
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return {
                    data: {
                        properties: null,
                        user: null,
                    },
                    error,
                };
            }
            throw error;
        }
    }
    // User Admin API
    /**
     * Creates a new user.
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async createUser(attributes) {
        try {
            return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'POST', `${this.url}/admin/users`, {
                body: attributes,
                headers: this.headers,
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._userResponse,
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Get a list of users.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
     */
    async listUsers(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
            const pagination = { nextPage: null, lastPage: 0, total: 0 };
            const response = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'GET', `${this.url}/admin/users`, {
                headers: this.headers,
                noResolveJson: true,
                query: {
                    page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '',
                    per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '',
                },
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._noResolveJsonResponse,
            });
            if (response.error)
                throw response.error;
            const users = await response.json();
            const total = (_e = response.headers.get('x-total-count')) !== null && _e !== void 0 ? _e : 0;
            const links = (_g = (_f = response.headers.get('link')) === null || _f === void 0 ? void 0 : _f.split(',')) !== null && _g !== void 0 ? _g : [];
            if (links.length > 0) {
                links.forEach((link) => {
                    const page = parseInt(link.split(';')[0].split('=')[1].substring(0, 1));
                    const rel = JSON.parse(link.split(';')[1].split('=')[1]);
                    pagination[`${rel}Page`] = page;
                });
                pagination.total = parseInt(total);
            }
            return { data: Object.assign(Object.assign({}, users), pagination), error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { users: [] }, error };
            }
            throw error;
        }
    }
    /**
     * Get user by id.
     *
     * @param uid The user's unique identifier
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async getUserById(uid) {
        try {
            return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'GET', `${this.url}/admin/users/${uid}`, {
                headers: this.headers,
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._userResponse,
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Updates the user data.
     *
     * @param attributes The data you want to update.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async updateUserById(uid, attributes) {
        try {
            return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'PUT', `${this.url}/admin/users/${uid}`, {
                body: attributes,
                headers: this.headers,
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._userResponse,
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Delete a user. Requires a `service_role` key.
     *
     * @param id The user id you want to remove.
     * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema. Soft deletion allows user identification from the hashed user ID but is not reversible.
     * Defaults to false for backward compatibility.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */
    async deleteUser(id, shouldSoftDelete = false) {
        try {
            return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'DELETE', `${this.url}/admin/users/${id}`, {
                headers: this.headers,
                body: {
                    should_soft_delete: shouldSoftDelete,
                },
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_0__._userResponse,
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    async _listFactors(params) {
        try {
            const { data, error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'GET', `${this.url}/admin/users/${params.userId}/factors`, {
                headers: this.headers,
                xform: (factors) => {
                    return { data: { factors }, error: null };
                },
            });
            return { data, error };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    async _deleteFactor(params) {
        try {
            const data = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_0__._request)(this.fetch, 'DELETE', `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
                headers: this.headers,
            });
            return { data, error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
}
//# sourceMappingURL=GoTrueAdminApi.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/GoTrueClient.js":
/*!********************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/GoTrueClient.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GoTrueClient)
/* harmony export */ });
/* harmony import */ var _GoTrueAdminApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GoTrueAdminApi */ "./node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/constants */ "./node_modules/@supabase/auth-js/dist/module/lib/constants.js");
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/errors */ "./node_modules/@supabase/auth-js/dist/module/lib/errors.js");
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/fetch */ "./node_modules/@supabase/auth-js/dist/module/lib/fetch.js");
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/helpers */ "./node_modules/@supabase/auth-js/dist/module/lib/helpers.js");
/* harmony import */ var _lib_local_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/local-storage */ "./node_modules/@supabase/auth-js/dist/module/lib/local-storage.js");
/* harmony import */ var _lib_polyfills__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/polyfills */ "./node_modules/@supabase/auth-js/dist/module/lib/polyfills.js");
/* harmony import */ var _lib_version__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/version */ "./node_modules/@supabase/auth-js/dist/module/lib/version.js");
/* harmony import */ var _lib_locks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/locks */ "./node_modules/@supabase/auth-js/dist/module/lib/locks.js");
/* harmony import */ var _lib_base64url__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/base64url */ "./node_modules/@supabase/auth-js/dist/module/lib/base64url.js");










(0,_lib_polyfills__WEBPACK_IMPORTED_MODULE_6__.polyfillGlobalThis)(); // Make "globalThis" available
const DEFAULT_OPTIONS = {
    url: _lib_constants__WEBPACK_IMPORTED_MODULE_1__.GOTRUE_URL,
    storageKey: _lib_constants__WEBPACK_IMPORTED_MODULE_1__.STORAGE_KEY,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    headers: _lib_constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_HEADERS,
    flowType: 'implicit',
    debug: false,
    hasCustomAuthorizationHeader: false,
};
async function lockNoOp(name, acquireTimeout, fn) {
    return await fn();
}
class GoTrueClient {
    /**
     * Create a new client for use in the browser.
     */
    constructor(options) {
        var _a, _b;
        this.memoryStorage = null;
        this.stateChangeEmitters = new Map();
        this.autoRefreshTicker = null;
        this.visibilityChangedCallback = null;
        this.refreshingDeferred = null;
        /**
         * Keeps track of the async client initialization.
         * When null or not yet resolved the auth state is `unknown`
         * Once resolved the the auth state is known and it's save to call any further client methods.
         * Keep extra care to never reject or throw uncaught errors
         */
        this.initializePromise = null;
        this.detectSessionInUrl = true;
        this.hasCustomAuthorizationHeader = false;
        this.suppressGetSessionWarning = false;
        this.lockAcquired = false;
        this.pendingInLock = [];
        /**
         * Used to broadcast state change events to other tabs listening.
         */
        this.broadcastChannel = null;
        this.logger = console.log;
        this.instanceID = GoTrueClient.nextInstanceID;
        GoTrueClient.nextInstanceID += 1;
        if (this.instanceID > 0 && (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)()) {
            console.warn('Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.');
        }
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.logDebugMessages = !!settings.debug;
        if (typeof settings.debug === 'function') {
            this.logger = settings.debug;
        }
        this.persistSession = settings.persistSession;
        this.storageKey = settings.storageKey;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.admin = new _GoTrueAdminApi__WEBPACK_IMPORTED_MODULE_0__["default"]({
            url: settings.url,
            headers: settings.headers,
            fetch: settings.fetch,
        });
        this.url = settings.url;
        this.headers = settings.headers;
        this.fetch = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.resolveFetch)(settings.fetch);
        this.lock = settings.lock || lockNoOp;
        this.detectSessionInUrl = settings.detectSessionInUrl;
        this.flowType = settings.flowType;
        this.hasCustomAuthorizationHeader = settings.hasCustomAuthorizationHeader;
        if (settings.lock) {
            this.lock = settings.lock;
        }
        else if ((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() && ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _a === void 0 ? void 0 : _a.locks)) {
            this.lock = _lib_locks__WEBPACK_IMPORTED_MODULE_8__.navigatorLock;
        }
        else {
            this.lock = lockNoOp;
        }
        this.jwks = { keys: [] };
        this.jwks_cached_at = Number.MIN_SAFE_INTEGER;
        this.mfa = {
            verify: this._verify.bind(this),
            enroll: this._enroll.bind(this),
            unenroll: this._unenroll.bind(this),
            challenge: this._challenge.bind(this),
            listFactors: this._listFactors.bind(this),
            challengeAndVerify: this._challengeAndVerify.bind(this),
            getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
        };
        if (this.persistSession) {
            if (settings.storage) {
                this.storage = settings.storage;
            }
            else {
                if ((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.supportsLocalStorage)()) {
                    this.storage = _lib_local_storage__WEBPACK_IMPORTED_MODULE_5__.localStorageAdapter;
                }
                else {
                    this.memoryStorage = {};
                    this.storage = (0,_lib_local_storage__WEBPACK_IMPORTED_MODULE_5__.memoryLocalStorageAdapter)(this.memoryStorage);
                }
            }
        }
        else {
            this.memoryStorage = {};
            this.storage = (0,_lib_local_storage__WEBPACK_IMPORTED_MODULE_5__.memoryLocalStorageAdapter)(this.memoryStorage);
        }
        if ((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
            try {
                this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
            }
            catch (e) {
                console.error('Failed to create a new BroadcastChannel, multi-tab state changes will not be available', e);
            }
            (_b = this.broadcastChannel) === null || _b === void 0 ? void 0 : _b.addEventListener('message', async (event) => {
                this._debug('received broadcast notification from other tab or client', event);
                await this._notifyAllSubscribers(event.data.event, event.data.session, false); // broadcast = false so we don't get an endless loop of messages
            });
        }
        this.initialize();
    }
    _debug(...args) {
        if (this.logDebugMessages) {
            this.logger(`GoTrueClient@${this.instanceID} (${_lib_version__WEBPACK_IMPORTED_MODULE_7__.version}) ${new Date().toISOString()}`, ...args);
        }
        return this;
    }
    /**
     * Initializes the client session either from the url or from storage.
     * This method is automatically called when instantiating the client, but should also be called
     * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
     */
    async initialize() {
        if (this.initializePromise) {
            return await this.initializePromise;
        }
        this.initializePromise = (async () => {
            return await this._acquireLock(-1, async () => {
                return await this._initialize();
            });
        })();
        return await this.initializePromise;
    }
    /**
     * IMPORTANT:
     * 1. Never throw in this method, as it is called from the constructor
     * 2. Never return a session from this method as it would be cached over
     *    the whole lifetime of the client
     */
    async _initialize() {
        var _a;
        try {
            const params = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.parseParametersFromURL)(window.location.href);
            let callbackUrlType = 'none';
            if (this._isImplicitGrantCallback(params)) {
                callbackUrlType = 'implicit';
            }
            else if (await this._isPKCECallback(params)) {
                callbackUrlType = 'pkce';
            }
            /**
             * Attempt to get the session from the URL only if these conditions are fulfilled
             *
             * Note: If the URL isn't one of the callback url types (implicit or pkce),
             * then there could be an existing session so we don't want to prematurely remove it
             */
            if ((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() && this.detectSessionInUrl && callbackUrlType !== 'none') {
                const { data, error } = await this._getSessionFromURL(params, callbackUrlType);
                if (error) {
                    this._debug('#_initialize()', 'error detecting session from URL', error);
                    if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthImplicitGrantRedirectError)(error)) {
                        const errorCode = (_a = error.details) === null || _a === void 0 ? void 0 : _a.code;
                        if (errorCode === 'identity_already_exists' ||
                            errorCode === 'identity_not_found' ||
                            errorCode === 'single_identity_not_deletable') {
                            return { error };
                        }
                    }
                    // failed login attempt via url,
                    // remove old session as in verifyOtp, signUp and signInWith*
                    await this._removeSession();
                    return { error };
                }
                const { session, redirectType } = data;
                this._debug('#_initialize()', 'detected session in URL', session, 'redirect type', redirectType);
                await this._saveSession(session);
                setTimeout(async () => {
                    if (redirectType === 'recovery') {
                        await this._notifyAllSubscribers('PASSWORD_RECOVERY', session);
                    }
                    else {
                        await this._notifyAllSubscribers('SIGNED_IN', session);
                    }
                }, 0);
                return { error: null };
            }
            // no login attempt via callback url try to recover session from storage
            await this._recoverAndRefresh();
            return { error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { error };
            }
            return {
                error: new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthUnknownError('Unexpected error during initialization', error),
            };
        }
        finally {
            await this._handleVisibilityChange();
            this._debug('#_initialize()', 'end');
        }
    }
    /**
     * Creates a new anonymous user.
     *
     * @returns A session where the is_anonymous claim in the access token JWT set to true
     */
    async signInAnonymously(credentials) {
        var _a, _b, _c;
        try {
            const res = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/signup`, {
                headers: this.headers,
                body: {
                    data: (_b = (_a = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {},
                    gotrue_meta_security: { captcha_token: (_c = credentials === null || credentials === void 0 ? void 0 : credentials.options) === null || _c === void 0 ? void 0 : _c.captchaToken },
                },
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
            });
            const { data, error } = res;
            if (error || !data) {
                return { data: { user: null, session: null }, error: error };
            }
            const session = data.session;
            const user = data.user;
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', session);
            }
            return { data: { user, session }, error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Creates a new user.
     *
     * Be aware that if a user account exists in the system you may get back an
     * error message that attempts to hide this information from the user.
     * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
     *
     * @returns A logged-in session if the server has "autoconfirm" ON
     * @returns A user if the server has "autoconfirm" OFF
     */
    async signUp(credentials) {
        var _a, _b, _c;
        try {
            let res;
            if ('email' in credentials) {
                const { email, password, options } = credentials;
                let codeChallenge = null;
                let codeChallengeMethod = null;
                if (this.flowType === 'pkce') {
                    ;
                    [codeChallenge, codeChallengeMethod] = await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getCodeChallengeAndMethod)(this.storage, this.storageKey);
                }
                res = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/signup`, {
                    headers: this.headers,
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                    body: {
                        email,
                        password,
                        data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        code_challenge: codeChallenge,
                        code_challenge_method: codeChallengeMethod,
                    },
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
                });
            }
            else if ('phone' in credentials) {
                const { phone, password, options } = credentials;
                res = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/signup`, {
                    headers: this.headers,
                    body: {
                        phone,
                        password,
                        data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
                        channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : 'sms',
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
                });
            }
            else {
                throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidCredentialsError('You must provide either an email or phone number and a password');
            }
            const { data, error } = res;
            if (error || !data) {
                return { data: { user: null, session: null }, error: error };
            }
            const session = data.session;
            const user = data.user;
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', session);
            }
            return { data: { user, session }, error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Log in an existing user with an email and password or phone and password.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or that the
     * email/phone and password combination is wrong or that the account can only
     * be accessed via social login.
     */
    async signInWithPassword(credentials) {
        try {
            let res;
            if ('email' in credentials) {
                const { email, password, options } = credentials;
                res = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
                    headers: this.headers,
                    body: {
                        email,
                        password,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponsePassword,
                });
            }
            else if ('phone' in credentials) {
                const { phone, password, options } = credentials;
                res = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
                    headers: this.headers,
                    body: {
                        phone,
                        password,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponsePassword,
                });
            }
            else {
                throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidCredentialsError('You must provide either an email or phone number and a password');
            }
            const { data, error } = res;
            if (error) {
                return { data: { user: null, session: null }, error };
            }
            else if (!data || !data.session || !data.user) {
                return { data: { user: null, session: null }, error: new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidTokenResponseError() };
            }
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', data.session);
            }
            return {
                data: Object.assign({ user: data.user, session: data.session }, (data.weak_password ? { weakPassword: data.weak_password } : null)),
                error,
            };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Log in an existing user via a third-party provider.
     * This method supports the PKCE flow.
     */
    async signInWithOAuth(credentials) {
        var _a, _b, _c, _d;
        return await this._handleProviderSignIn(credentials.provider, {
            redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
            scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
            queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
            skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect,
        });
    }
    /**
     * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
     */
    async exchangeCodeForSession(authCode) {
        await this.initializePromise;
        return this._acquireLock(-1, async () => {
            return this._exchangeCodeForSession(authCode);
        });
    }
    async _exchangeCodeForSession(authCode) {
        const storageItem = await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
        const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== void 0 ? storageItem : '').split('/');
        try {
            const { data, error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/token?grant_type=pkce`, {
                headers: this.headers,
                body: {
                    auth_code: authCode,
                    code_verifier: codeVerifier,
                },
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
            });
            await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.removeItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
            if (error) {
                throw error;
            }
            if (!data || !data.session || !data.user) {
                return {
                    data: { user: null, session: null, redirectType: null },
                    error: new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidTokenResponseError(),
                };
            }
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', data.session);
            }
            return { data: Object.assign(Object.assign({}, data), { redirectType: redirectType !== null && redirectType !== void 0 ? redirectType : null }), error };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null, session: null, redirectType: null }, error };
            }
            throw error;
        }
    }
    /**
     * Allows signing in with an OIDC ID token. The authentication provider used
     * should be enabled and configured.
     */
    async signInWithIdToken(credentials) {
        try {
            const { options, provider, token, access_token, nonce } = credentials;
            const res = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/token?grant_type=id_token`, {
                headers: this.headers,
                body: {
                    provider,
                    id_token: token,
                    access_token,
                    nonce,
                    gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                },
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
            });
            const { data, error } = res;
            if (error) {
                return { data: { user: null, session: null }, error };
            }
            else if (!data || !data.session || !data.user) {
                return {
                    data: { user: null, session: null },
                    error: new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidTokenResponseError(),
                };
            }
            if (data.session) {
                await this._saveSession(data.session);
                await this._notifyAllSubscribers('SIGNED_IN', data.session);
            }
            return { data, error };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Log in a user using magiclink or a one-time password (OTP).
     *
     * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
     * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
     * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or, that the account
     * can only be accessed via social login.
     *
     * Do note that you will need to configure a Whatsapp sender on Twilio
     * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
     * channel is not supported on other providers
     * at this time.
     * This method supports PKCE when an email is passed.
     */
    async signInWithOtp(credentials) {
        var _a, _b, _c, _d, _e;
        try {
            if ('email' in credentials) {
                const { email, options } = credentials;
                let codeChallenge = null;
                let codeChallengeMethod = null;
                if (this.flowType === 'pkce') {
                    ;
                    [codeChallenge, codeChallengeMethod] = await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getCodeChallengeAndMethod)(this.storage, this.storageKey);
                }
                const { error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/otp`, {
                    headers: this.headers,
                    body: {
                        email,
                        data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                        create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        code_challenge: codeChallenge,
                        code_challenge_method: codeChallengeMethod,
                    },
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                });
                return { data: { user: null, session: null }, error };
            }
            if ('phone' in credentials) {
                const { phone, options } = credentials;
                const { data, error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/otp`, {
                    headers: this.headers,
                    body: {
                        phone,
                        data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
                        create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                        channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : 'sms',
                    },
                });
                return { data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id }, error };
            }
            throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidCredentialsError('You must provide either an email or phone number.');
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
     */
    async verifyOtp(params) {
        var _a, _b;
        try {
            let redirectTo = undefined;
            let captchaToken = undefined;
            if ('options' in params) {
                redirectTo = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo;
                captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
            }
            const { data, error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/verify`, {
                headers: this.headers,
                body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
                redirectTo,
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
            });
            if (error) {
                throw error;
            }
            if (!data) {
                throw new Error('An error occurred on token verification.');
            }
            const session = data.session;
            const user = data.user;
            if (session === null || session === void 0 ? void 0 : session.access_token) {
                await this._saveSession(session);
                await this._notifyAllSubscribers(params.type == 'recovery' ? 'PASSWORD_RECOVERY' : 'SIGNED_IN', session);
            }
            return { data: { user, session }, error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Attempts a single-sign on using an enterprise Identity Provider. A
     * successful SSO attempt will redirect the current page to the identity
     * provider authorization page. The redirect URL is implementation and SSO
     * protocol specific.
     *
     * You can use it by providing a SSO domain. Typically you can extract this
     * domain by asking users for their email address. If this domain is
     * registered on the Auth instance the redirect will use that organization's
     * currently active SSO Identity Provider for the login.
     *
     * If you have built an organization-specific login page, you can use the
     * organization's SSO Identity Provider UUID directly instead.
     */
    async signInWithSSO(params) {
        var _a, _b, _c;
        try {
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === 'pkce') {
                ;
                [codeChallenge, codeChallengeMethod] = await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getCodeChallengeAndMethod)(this.storage, this.storageKey);
            }
            return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/sso`, {
                body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ('providerId' in params ? { provider_id: params.providerId } : null)), ('domain' in params ? { domain: params.domain } : null)), { redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : undefined }), (((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken)
                    ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } }
                    : null)), { skip_http_redirect: true, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
                headers: this.headers,
                xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._ssoResponse,
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * Sends a reauthentication OTP to the user's email or phone number.
     * Requires the user to be signed-in.
     */
    async reauthenticate() {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
            return await this._reauthenticate();
        });
    }
    async _reauthenticate() {
        try {
            return await this._useSession(async (result) => {
                const { data: { session }, error: sessionError, } = result;
                if (sessionError)
                    throw sessionError;
                if (!session)
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
                const { error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'GET', `${this.url}/reauthenticate`, {
                    headers: this.headers,
                    jwt: session.access_token,
                });
                return { data: { user: null, session: null }, error };
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
     */
    async resend(credentials) {
        try {
            const endpoint = `${this.url}/resend`;
            if ('email' in credentials) {
                const { email, type, options } = credentials;
                const { error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', endpoint, {
                    headers: this.headers,
                    body: {
                        email,
                        type,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                });
                return { data: { user: null, session: null }, error };
            }
            else if ('phone' in credentials) {
                const { phone, type, options } = credentials;
                const { data, error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', endpoint, {
                    headers: this.headers,
                    body: {
                        phone,
                        type,
                        gotrue_meta_security: { captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken },
                    },
                });
                return { data: { user: null, session: null, messageId: data === null || data === void 0 ? void 0 : data.message_id }, error };
            }
            throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidCredentialsError('You must provide either an email or phone number and a type');
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Returns the session, refreshing it if necessary.
     *
     * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
     *
     * **IMPORTANT:** This method loads values directly from the storage attached
     * to the client. If that storage is based on request cookies for example,
     * the values in it may not be authentic and therefore it's strongly advised
     * against using this method and its results in such circumstances. A warning
     * will be emitted if this is detected. Use {@link #getUser()} instead.
     */
    async getSession() {
        await this.initializePromise;
        const result = await this._acquireLock(-1, async () => {
            return this._useSession(async (result) => {
                return result;
            });
        });
        return result;
    }
    /**
     * Acquires a global lock based on the storage key.
     */
    async _acquireLock(acquireTimeout, fn) {
        this._debug('#_acquireLock', 'begin', acquireTimeout);
        try {
            if (this.lockAcquired) {
                const last = this.pendingInLock.length
                    ? this.pendingInLock[this.pendingInLock.length - 1]
                    : Promise.resolve();
                const result = (async () => {
                    await last;
                    return await fn();
                })();
                this.pendingInLock.push((async () => {
                    try {
                        await result;
                    }
                    catch (e) {
                        // we just care if it finished
                    }
                })());
                return result;
            }
            return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
                this._debug('#_acquireLock', 'lock acquired for storage key', this.storageKey);
                try {
                    this.lockAcquired = true;
                    const result = fn();
                    this.pendingInLock.push((async () => {
                        try {
                            await result;
                        }
                        catch (e) {
                            // we just care if it finished
                        }
                    })());
                    await result;
                    // keep draining the queue until there's nothing to wait on
                    while (this.pendingInLock.length) {
                        const waitOn = [...this.pendingInLock];
                        await Promise.all(waitOn);
                        this.pendingInLock.splice(0, waitOn.length);
                    }
                    return await result;
                }
                finally {
                    this._debug('#_acquireLock', 'lock released for storage key', this.storageKey);
                    this.lockAcquired = false;
                }
            });
        }
        finally {
            this._debug('#_acquireLock', 'end');
        }
    }
    /**
     * Use instead of {@link #getSession} inside the library. It is
     * semantically usually what you want, as getting a session involves some
     * processing afterwards that requires only one client operating on the
     * session at once across multiple tabs or processes.
     */
    async _useSession(fn) {
        this._debug('#_useSession', 'begin');
        try {
            // the use of __loadSession here is the only correct use of the function!
            const result = await this.__loadSession();
            return await fn(result);
        }
        finally {
            this._debug('#_useSession', 'end');
        }
    }
    /**
     * NEVER USE DIRECTLY!
     *
     * Always use {@link #_useSession}.
     */
    async __loadSession() {
        this._debug('#__loadSession()', 'begin');
        if (!this.lockAcquired) {
            this._debug('#__loadSession()', 'used outside of an acquired lock!', new Error().stack);
        }
        try {
            let currentSession = null;
            const maybeSession = await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getItemAsync)(this.storage, this.storageKey);
            this._debug('#getSession()', 'session from storage', maybeSession);
            if (maybeSession !== null) {
                if (this._isValidSession(maybeSession)) {
                    currentSession = maybeSession;
                }
                else {
                    this._debug('#getSession()', 'session from storage is not valid');
                    await this._removeSession();
                }
            }
            if (!currentSession) {
                return { data: { session: null }, error: null };
            }
            // A session is considered expired before the access token _actually_
            // expires. When the autoRefreshToken option is off (or when the tab is
            // in the background), very eager users of getSession() -- like
            // realtime-js -- might send a valid JWT which will expire by the time it
            // reaches the server.
            const hasExpired = currentSession.expires_at
                ? currentSession.expires_at * 1000 - Date.now() < _lib_constants__WEBPACK_IMPORTED_MODULE_1__.EXPIRY_MARGIN_MS
                : false;
            this._debug('#__loadSession()', `session has${hasExpired ? '' : ' not'} expired`, 'expires_at', currentSession.expires_at);
            if (!hasExpired) {
                if (this.storage.isServer) {
                    let suppressWarning = this.suppressGetSessionWarning;
                    const proxySession = new Proxy(currentSession, {
                        get: (target, prop, receiver) => {
                            if (!suppressWarning && prop === 'user') {
                                // only show warning when the user object is being accessed from the server
                                console.warn('Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.');
                                suppressWarning = true; // keeps this proxy instance from logging additional warnings
                                this.suppressGetSessionWarning = true; // keeps this client's future proxy instances from warning
                            }
                            return Reflect.get(target, prop, receiver);
                        },
                    });
                    currentSession = proxySession;
                }
                return { data: { session: currentSession }, error: null };
            }
            const { session, error } = await this._callRefreshToken(currentSession.refresh_token);
            if (error) {
                return { data: { session: null }, error };
            }
            return { data: { session }, error: null };
        }
        finally {
            this._debug('#__loadSession()', 'end');
        }
    }
    /**
     * Gets the current user details if there is an existing session. This method
     * performs a network request to the Supabase Auth server, so the returned
     * value is authentic and can be used to base authorization rules on.
     *
     * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
     */
    async getUser(jwt) {
        if (jwt) {
            return await this._getUser(jwt);
        }
        await this.initializePromise;
        const result = await this._acquireLock(-1, async () => {
            return await this._getUser();
        });
        return result;
    }
    async _getUser(jwt) {
        try {
            if (jwt) {
                return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'GET', `${this.url}/user`, {
                    headers: this.headers,
                    jwt: jwt,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._userResponse,
                });
            }
            return await this._useSession(async (result) => {
                var _a, _b, _c;
                const { data, error } = result;
                if (error) {
                    throw error;
                }
                // returns an error if there is no access_token or custom authorization header
                if (!((_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) && !this.hasCustomAuthorizationHeader) {
                    return { data: { user: null }, error: new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError() };
                }
                return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'GET', `${this.url}/user`, {
                    headers: this.headers,
                    jwt: (_c = (_b = data.session) === null || _b === void 0 ? void 0 : _b.access_token) !== null && _c !== void 0 ? _c : undefined,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._userResponse,
                });
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthSessionMissingError)(error)) {
                    // JWT contains a `session_id` which does not correspond to an active
                    // session in the database, indicating the user is signed out.
                    await this._removeSession();
                    await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.removeItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
                }
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Updates user data for a logged in user.
     */
    async updateUser(attributes, options = {}) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
            return await this._updateUser(attributes, options);
        });
    }
    async _updateUser(attributes, options = {}) {
        try {
            return await this._useSession(async (result) => {
                const { data: sessionData, error: sessionError } = result;
                if (sessionError) {
                    throw sessionError;
                }
                if (!sessionData.session) {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
                }
                const session = sessionData.session;
                let codeChallenge = null;
                let codeChallengeMethod = null;
                if (this.flowType === 'pkce' && attributes.email != null) {
                    ;
                    [codeChallenge, codeChallengeMethod] = await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getCodeChallengeAndMethod)(this.storage, this.storageKey);
                }
                const { data, error: userError } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'PUT', `${this.url}/user`, {
                    headers: this.headers,
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                    body: Object.assign(Object.assign({}, attributes), { code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
                    jwt: session.access_token,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._userResponse,
                });
                if (userError)
                    throw userError;
                session.user = data.user;
                await this._saveSession(session);
                await this._notifyAllSubscribers('USER_UPDATED', session);
                return { data: { user: session.user }, error: null };
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
     * If the refresh token or access token in the current session is invalid, an error will be thrown.
     * @param currentSession The current session that minimally contains an access token and refresh token.
     */
    async setSession(currentSession) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
            return await this._setSession(currentSession);
        });
    }
    async _setSession(currentSession) {
        try {
            if (!currentSession.access_token || !currentSession.refresh_token) {
                throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
            }
            const timeNow = Date.now() / 1000;
            let expiresAt = timeNow;
            let hasExpired = true;
            let session = null;
            const { payload } = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.decodeJWT)(currentSession.access_token);
            if (payload.exp) {
                expiresAt = payload.exp;
                hasExpired = expiresAt <= timeNow;
            }
            if (hasExpired) {
                const { session: refreshedSession, error } = await this._callRefreshToken(currentSession.refresh_token);
                if (error) {
                    return { data: { user: null, session: null }, error: error };
                }
                if (!refreshedSession) {
                    return { data: { user: null, session: null }, error: null };
                }
                session = refreshedSession;
            }
            else {
                const { data, error } = await this._getUser(currentSession.access_token);
                if (error) {
                    throw error;
                }
                session = {
                    access_token: currentSession.access_token,
                    refresh_token: currentSession.refresh_token,
                    user: data.user,
                    token_type: 'bearer',
                    expires_in: expiresAt - timeNow,
                    expires_at: expiresAt,
                };
                await this._saveSession(session);
                await this._notifyAllSubscribers('SIGNED_IN', session);
            }
            return { data: { user: session.user, session }, error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { session: null, user: null }, error };
            }
            throw error;
        }
    }
    /**
     * Returns a new session, regardless of expiry status.
     * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
     * If the current session's refresh token is invalid, an error will be thrown.
     * @param currentSession The current session. If passed in, it must contain a refresh token.
     */
    async refreshSession(currentSession) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
            return await this._refreshSession(currentSession);
        });
    }
    async _refreshSession(currentSession) {
        try {
            return await this._useSession(async (result) => {
                var _a;
                if (!currentSession) {
                    const { data, error } = result;
                    if (error) {
                        throw error;
                    }
                    currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : undefined;
                }
                if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
                }
                const { session, error } = await this._callRefreshToken(currentSession.refresh_token);
                if (error) {
                    return { data: { user: null, session: null }, error: error };
                }
                if (!session) {
                    return { data: { user: null, session: null }, error: null };
                }
                return { data: { user: session.user, session }, error: null };
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { user: null, session: null }, error };
            }
            throw error;
        }
    }
    /**
     * Gets the session data from a URL string
     */
    async _getSessionFromURL(params, callbackUrlType) {
        try {
            if (!(0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)())
                throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('No browser detected.');
            // If there's an error in the URL, it doesn't matter what flow it is, we just return the error.
            if (params.error || params.error_description || params.error_code) {
                // The error class returned implies that the redirect is from an implicit grant flow
                // but it could also be from a redirect error from a PKCE flow.
                throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError(params.error_description || 'Error in URL with unspecified error_description', {
                    error: params.error || 'unspecified_error',
                    code: params.error_code || 'unspecified_code',
                });
            }
            // Checks for mismatches between the flowType initialised in the client and the URL parameters
            switch (callbackUrlType) {
                case 'implicit':
                    if (this.flowType === 'pkce') {
                        throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthPKCEGrantCodeExchangeError('Not a valid PKCE flow url.');
                    }
                    break;
                case 'pkce':
                    if (this.flowType === 'implicit') {
                        throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('Not a valid implicit grant flow url.');
                    }
                    break;
                default:
                // there's no mismatch so we continue
            }
            // Since this is a redirect for PKCE, we attempt to retrieve the code from the URL for the code exchange
            if (callbackUrlType === 'pkce') {
                this._debug('#_initialize()', 'begin', 'is PKCE flow', true);
                if (!params.code)
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthPKCEGrantCodeExchangeError('No code detected.');
                const { data, error } = await this._exchangeCodeForSession(params.code);
                if (error)
                    throw error;
                const url = new URL(window.location.href);
                url.searchParams.delete('code');
                window.history.replaceState(window.history.state, '', url.toString());
                return { data: { session: data.session, redirectType: null }, error: null };
            }
            const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type, } = params;
            if (!access_token || !expires_in || !refresh_token || !token_type) {
                throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthImplicitGrantRedirectError('No session defined in URL');
            }
            const timeNow = Math.round(Date.now() / 1000);
            const expiresIn = parseInt(expires_in);
            let expiresAt = timeNow + expiresIn;
            if (expires_at) {
                expiresAt = parseInt(expires_at);
            }
            const actuallyExpiresIn = expiresAt - timeNow;
            if (actuallyExpiresIn * 1000 <= _lib_constants__WEBPACK_IMPORTED_MODULE_1__.AUTO_REFRESH_TICK_DURATION_MS) {
                console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
            }
            const issuedAt = expiresAt - expiresIn;
            if (timeNow - issuedAt >= 120) {
                console.warn('@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale', issuedAt, expiresAt, timeNow);
            }
            else if (timeNow - issuedAt < 0) {
                console.warn('@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew', issuedAt, expiresAt, timeNow);
            }
            const { data, error } = await this._getUser(access_token);
            if (error)
                throw error;
            const session = {
                provider_token,
                provider_refresh_token,
                access_token,
                expires_in: expiresIn,
                expires_at: expiresAt,
                refresh_token,
                token_type,
                user: data.user,
            };
            // Remove tokens from URL
            window.location.hash = '';
            this._debug('#_getSessionFromURL()', 'clearing window.location.hash');
            return { data: { session, redirectType: params.type }, error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { session: null, redirectType: null }, error };
            }
            throw error;
        }
    }
    /**
     * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
     */
    _isImplicitGrantCallback(params) {
        return Boolean(params.access_token || params.error_description);
    }
    /**
     * Checks if the current URL and backing storage contain parameters given by a PKCE flow
     */
    async _isPKCECallback(params) {
        const currentStorageContent = await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
        return !!(params.code && currentStorageContent);
    }
    /**
     * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
     *
     * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
     * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
     *
     * If using `others` scope, no `SIGNED_OUT` event is fired!
     */
    async signOut(options = { scope: 'global' }) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
            return await this._signOut(options);
        });
    }
    async _signOut({ scope } = { scope: 'global' }) {
        return await this._useSession(async (result) => {
            var _a;
            const { data, error: sessionError } = result;
            if (sessionError) {
                return { error: sessionError };
            }
            const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
            if (accessToken) {
                const { error } = await this.admin.signOut(accessToken, scope);
                if (error) {
                    // ignore 404s since user might not exist anymore
                    // ignore 401s since an invalid or expired JWT should sign out the current session
                    if (!((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthApiError)(error) &&
                        (error.status === 404 || error.status === 401 || error.status === 403))) {
                        return { error };
                    }
                }
            }
            if (scope !== 'others') {
                await this._removeSession();
                await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.removeItemAsync)(this.storage, `${this.storageKey}-code-verifier`);
            }
            return { error: null };
        });
    }
    /**
     * Receive a notification every time an auth event happens.
     * @param callback A callback function to be invoked when an auth event happens.
     */
    onAuthStateChange(callback) {
        const id = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.uuid)();
        const subscription = {
            id,
            callback,
            unsubscribe: () => {
                this._debug('#unsubscribe()', 'state change callback with id removed', id);
                this.stateChangeEmitters.delete(id);
            },
        };
        this._debug('#onAuthStateChange()', 'registered callback with id', id);
        this.stateChangeEmitters.set(id, subscription);
        (async () => {
            await this.initializePromise;
            await this._acquireLock(-1, async () => {
                this._emitInitialSession(id);
            });
        })();
        return { data: { subscription } };
    }
    async _emitInitialSession(id) {
        return await this._useSession(async (result) => {
            var _a, _b;
            try {
                const { data: { session }, error, } = result;
                if (error)
                    throw error;
                await ((_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback('INITIAL_SESSION', session));
                this._debug('INITIAL_SESSION', 'callback id', id, 'session', session);
            }
            catch (err) {
                await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback('INITIAL_SESSION', null));
                this._debug('INITIAL_SESSION', 'callback id', id, 'error', err);
                console.error(err);
            }
        });
    }
    /**
     * Sends a password reset request to an email address. This method supports the PKCE flow.
     *
     * @param email The email address of the user.
     * @param options.redirectTo The URL to send the user to after they click the password reset link.
     * @param options.captchaToken Verification token received when the user completes the captcha on the site.
     */
    async resetPasswordForEmail(email, options = {}) {
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === 'pkce') {
            ;
            [codeChallenge, codeChallengeMethod] = await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getCodeChallengeAndMethod)(this.storage, this.storageKey, true // isPasswordRecovery
            );
        }
        try {
            return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/recover`, {
                body: {
                    email,
                    code_challenge: codeChallenge,
                    code_challenge_method: codeChallengeMethod,
                    gotrue_meta_security: { captcha_token: options.captchaToken },
                },
                headers: this.headers,
                redirectTo: options.redirectTo,
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * Gets all the identities linked to a user.
     */
    async getUserIdentities() {
        var _a;
        try {
            const { data, error } = await this.getUser();
            if (error)
                throw error;
            return { data: { identities: (_a = data.user.identities) !== null && _a !== void 0 ? _a : [] }, error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * Links an oauth identity to an existing user.
     * This method supports the PKCE flow.
     */
    async linkIdentity(credentials) {
        var _a;
        try {
            const { data, error } = await this._useSession(async (result) => {
                var _a, _b, _c, _d, _e;
                const { data, error } = result;
                if (error)
                    throw error;
                const url = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
                    redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
                    scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
                    queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
                    skipBrowserRedirect: true,
                });
                return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'GET', url, {
                    headers: this.headers,
                    jwt: (_e = (_d = data.session) === null || _d === void 0 ? void 0 : _d.access_token) !== null && _e !== void 0 ? _e : undefined,
                });
            });
            if (error)
                throw error;
            if ((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() && !((_a = credentials.options) === null || _a === void 0 ? void 0 : _a.skipBrowserRedirect)) {
                window.location.assign(data === null || data === void 0 ? void 0 : data.url);
            }
            return { data: { provider: credentials.provider, url: data === null || data === void 0 ? void 0 : data.url }, error: null };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { provider: credentials.provider, url: null }, error };
            }
            throw error;
        }
    }
    /**
     * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
     */
    async unlinkIdentity(identity) {
        try {
            return await this._useSession(async (result) => {
                var _a, _b;
                const { data, error } = result;
                if (error) {
                    throw error;
                }
                return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'DELETE', `${this.url}/user/identities/${identity.identity_id}`, {
                    headers: this.headers,
                    jwt: (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : undefined,
                });
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * Generates a new JWT.
     * @param refreshToken A valid refresh token that was returned on login.
     */
    async _refreshAccessToken(refreshToken) {
        const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
        this._debug(debugName, 'begin');
        try {
            const startedAt = Date.now();
            // will attempt to refresh the token with exponential backoff
            return await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.retryable)(async (attempt) => {
                if (attempt > 0) {
                    await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.sleep)(200 * Math.pow(2, attempt - 1)); // 200, 400, 800, ...
                }
                this._debug(debugName, 'refreshing attempt', attempt);
                return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/token?grant_type=refresh_token`, {
                    body: { refresh_token: refreshToken },
                    headers: this.headers,
                    xform: _lib_fetch__WEBPACK_IMPORTED_MODULE_3__._sessionResponse,
                });
            }, (attempt, error) => {
                const nextBackOffInterval = 200 * Math.pow(2, attempt);
                return (error &&
                    (0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthRetryableFetchError)(error) &&
                    // retryable only if the request can be sent before the backoff overflows the tick duration
                    Date.now() + nextBackOffInterval - startedAt < _lib_constants__WEBPACK_IMPORTED_MODULE_1__.AUTO_REFRESH_TICK_DURATION_MS);
            });
        }
        catch (error) {
            this._debug(debugName, 'error', error);
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: { session: null, user: null }, error };
            }
            throw error;
        }
        finally {
            this._debug(debugName, 'end');
        }
    }
    _isValidSession(maybeSession) {
        const isValidSession = typeof maybeSession === 'object' &&
            maybeSession !== null &&
            'access_token' in maybeSession &&
            'refresh_token' in maybeSession &&
            'expires_at' in maybeSession;
        return isValidSession;
    }
    async _handleProviderSignIn(provider, options) {
        const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
            redirectTo: options.redirectTo,
            scopes: options.scopes,
            queryParams: options.queryParams,
        });
        this._debug('#_handleProviderSignIn()', 'provider', provider, 'options', options, 'url', url);
        // try to open on the browser
        if ((0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() && !options.skipBrowserRedirect) {
            window.location.assign(url);
        }
        return { data: { provider, url }, error: null };
    }
    /**
     * Recovers the session from LocalStorage and refreshes the token
     * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
     */
    async _recoverAndRefresh() {
        var _a;
        const debugName = '#_recoverAndRefresh()';
        this._debug(debugName, 'begin');
        try {
            const currentSession = await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getItemAsync)(this.storage, this.storageKey);
            this._debug(debugName, 'session from storage', currentSession);
            if (!this._isValidSession(currentSession)) {
                this._debug(debugName, 'session is not valid');
                if (currentSession !== null) {
                    await this._removeSession();
                }
                return;
            }
            const expiresWithMargin = ((_a = currentSession.expires_at) !== null && _a !== void 0 ? _a : Infinity) * 1000 - Date.now() < _lib_constants__WEBPACK_IMPORTED_MODULE_1__.EXPIRY_MARGIN_MS;
            this._debug(debugName, `session has${expiresWithMargin ? '' : ' not'} expired with margin of ${_lib_constants__WEBPACK_IMPORTED_MODULE_1__.EXPIRY_MARGIN_MS}s`);
            if (expiresWithMargin) {
                if (this.autoRefreshToken && currentSession.refresh_token) {
                    const { error } = await this._callRefreshToken(currentSession.refresh_token);
                    if (error) {
                        console.error(error);
                        if (!(0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthRetryableFetchError)(error)) {
                            this._debug(debugName, 'refresh failed with a non-retryable error, removing the session', error);
                            await this._removeSession();
                        }
                    }
                }
            }
            else {
                // no need to persist currentSession again, as we just loaded it from
                // local storage; persisting it again may overwrite a value saved by
                // another client with access to the same local storage
                await this._notifyAllSubscribers('SIGNED_IN', currentSession);
            }
        }
        catch (err) {
            this._debug(debugName, 'error', err);
            console.error(err);
            return;
        }
        finally {
            this._debug(debugName, 'end');
        }
    }
    async _callRefreshToken(refreshToken) {
        var _a, _b;
        if (!refreshToken) {
            throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
        }
        // refreshing is already in progress
        if (this.refreshingDeferred) {
            return this.refreshingDeferred.promise;
        }
        const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
        this._debug(debugName, 'begin');
        try {
            this.refreshingDeferred = new _lib_helpers__WEBPACK_IMPORTED_MODULE_4__.Deferred();
            const { data, error } = await this._refreshAccessToken(refreshToken);
            if (error)
                throw error;
            if (!data.session)
                throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
            await this._saveSession(data.session);
            await this._notifyAllSubscribers('TOKEN_REFRESHED', data.session);
            const result = { session: data.session, error: null };
            this.refreshingDeferred.resolve(result);
            return result;
        }
        catch (error) {
            this._debug(debugName, 'error', error);
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                const result = { session: null, error };
                if (!(0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthRetryableFetchError)(error)) {
                    await this._removeSession();
                }
                (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
                return result;
            }
            (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
            throw error;
        }
        finally {
            this.refreshingDeferred = null;
            this._debug(debugName, 'end');
        }
    }
    async _notifyAllSubscribers(event, session, broadcast = true) {
        const debugName = `#_notifyAllSubscribers(${event})`;
        this._debug(debugName, 'begin', session, `broadcast = ${broadcast}`);
        try {
            if (this.broadcastChannel && broadcast) {
                this.broadcastChannel.postMessage({ event, session });
            }
            const errors = [];
            const promises = Array.from(this.stateChangeEmitters.values()).map(async (x) => {
                try {
                    await x.callback(event, session);
                }
                catch (e) {
                    errors.push(e);
                }
            });
            await Promise.all(promises);
            if (errors.length > 0) {
                for (let i = 0; i < errors.length; i += 1) {
                    console.error(errors[i]);
                }
                throw errors[0];
            }
        }
        finally {
            this._debug(debugName, 'end');
        }
    }
    /**
     * set currentSession and currentUser
     * process to _startAutoRefreshToken if possible
     */
    async _saveSession(session) {
        this._debug('#_saveSession()', session);
        // _saveSession is always called whenever a new session has been acquired
        // so we can safely suppress the warning returned by future getSession calls
        this.suppressGetSessionWarning = true;
        await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.setItemAsync)(this.storage, this.storageKey, session);
    }
    async _removeSession() {
        this._debug('#_removeSession()');
        await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.removeItemAsync)(this.storage, this.storageKey);
        await this._notifyAllSubscribers('SIGNED_OUT', null);
    }
    /**
     * Removes any registered visibilitychange callback.
     *
     * {@see #startAutoRefresh}
     * {@see #stopAutoRefresh}
     */
    _removeVisibilityChangedCallback() {
        this._debug('#_removeVisibilityChangedCallback()');
        const callback = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
            if (callback && (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
                window.removeEventListener('visibilitychange', callback);
            }
        }
        catch (e) {
            console.error('removing visibilitychange callback failed', e);
        }
    }
    /**
     * This is the private implementation of {@link #startAutoRefresh}. Use this
     * within the library.
     */
    async _startAutoRefresh() {
        await this._stopAutoRefresh();
        this._debug('#_startAutoRefresh()');
        const ticker = setInterval(() => this._autoRefreshTokenTick(), _lib_constants__WEBPACK_IMPORTED_MODULE_1__.AUTO_REFRESH_TICK_DURATION_MS);
        this.autoRefreshTicker = ticker;
        if (ticker && typeof ticker === 'object' && typeof ticker.unref === 'function') {
            // ticker is a NodeJS Timeout object that has an `unref` method
            // https://nodejs.org/api/timers.html#timeoutunref
            // When auto refresh is used in NodeJS (like for testing) the
            // `setInterval` is preventing the process from being marked as
            // finished and tests run endlessly. This can be prevented by calling
            // `unref()` on the returned object.
            ticker.unref();
            // @ts-expect-error TS has no context of Deno
        }
        else if (typeof Deno !== 'undefined' && typeof Deno.unrefTimer === 'function') {
            // similar like for NodeJS, but with the Deno API
            // https://deno.land/api@latest?unstable&s=Deno.unrefTimer
            // @ts-expect-error TS has no context of Deno
            Deno.unrefTimer(ticker);
        }
        // run the tick immediately, but in the next pass of the event loop so that
        // #_initialize can be allowed to complete without recursively waiting on
        // itself
        setTimeout(async () => {
            await this.initializePromise;
            await this._autoRefreshTokenTick();
        }, 0);
    }
    /**
     * This is the private implementation of {@link #stopAutoRefresh}. Use this
     * within the library.
     */
    async _stopAutoRefresh() {
        this._debug('#_stopAutoRefresh()');
        const ticker = this.autoRefreshTicker;
        this.autoRefreshTicker = null;
        if (ticker) {
            clearInterval(ticker);
        }
    }
    /**
     * Starts an auto-refresh process in the background. The session is checked
     * every few seconds. Close to the time of expiration a process is started to
     * refresh the session. If refreshing fails it will be retried for as long as
     * necessary.
     *
     * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
     * to call this function, it will be called for you.
     *
     * On browsers the refresh process works only when the tab/window is in the
     * foreground to conserve resources as well as prevent race conditions and
     * flooding auth with requests. If you call this method any managed
     * visibility change callback will be removed and you must manage visibility
     * changes on your own.
     *
     * On non-browser platforms the refresh process works *continuously* in the
     * background, which may not be desirable. You should hook into your
     * platform's foreground indication mechanism and call these methods
     * appropriately to conserve resources.
     *
     * {@see #stopAutoRefresh}
     */
    async startAutoRefresh() {
        this._removeVisibilityChangedCallback();
        await this._startAutoRefresh();
    }
    /**
     * Stops an active auto refresh process running in the background (if any).
     *
     * If you call this method any managed visibility change callback will be
     * removed and you must manage visibility changes on your own.
     *
     * See {@link #startAutoRefresh} for more details.
     */
    async stopAutoRefresh() {
        this._removeVisibilityChangedCallback();
        await this._stopAutoRefresh();
    }
    /**
     * Runs the auto refresh token tick.
     */
    async _autoRefreshTokenTick() {
        this._debug('#_autoRefreshTokenTick()', 'begin');
        try {
            await this._acquireLock(0, async () => {
                try {
                    const now = Date.now();
                    try {
                        return await this._useSession(async (result) => {
                            const { data: { session }, } = result;
                            if (!session || !session.refresh_token || !session.expires_at) {
                                this._debug('#_autoRefreshTokenTick()', 'no session');
                                return;
                            }
                            // session will expire in this many ticks (or has already expired if <= 0)
                            const expiresInTicks = Math.floor((session.expires_at * 1000 - now) / _lib_constants__WEBPACK_IMPORTED_MODULE_1__.AUTO_REFRESH_TICK_DURATION_MS);
                            this._debug('#_autoRefreshTokenTick()', `access token expires in ${expiresInTicks} ticks, a tick lasts ${_lib_constants__WEBPACK_IMPORTED_MODULE_1__.AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${_lib_constants__WEBPACK_IMPORTED_MODULE_1__.AUTO_REFRESH_TICK_THRESHOLD} ticks`);
                            if (expiresInTicks <= _lib_constants__WEBPACK_IMPORTED_MODULE_1__.AUTO_REFRESH_TICK_THRESHOLD) {
                                await this._callRefreshToken(session.refresh_token);
                            }
                        });
                    }
                    catch (e) {
                        console.error('Auto refresh tick failed with error. This is likely a transient error.', e);
                    }
                }
                finally {
                    this._debug('#_autoRefreshTokenTick()', 'end');
                }
            });
        }
        catch (e) {
            if (e.isAcquireTimeout || e instanceof _lib_locks__WEBPACK_IMPORTED_MODULE_8__.LockAcquireTimeoutError) {
                this._debug('auto refresh token tick lock not available');
            }
            else {
                throw e;
            }
        }
    }
    /**
     * Registers callbacks on the browser / platform, which in-turn run
     * algorithms when the browser window/tab are in foreground. On non-browser
     * platforms it assumes always foreground.
     */
    async _handleVisibilityChange() {
        this._debug('#_handleVisibilityChange()');
        if (!(0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.isBrowser)() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
            if (this.autoRefreshToken) {
                // in non-browser environments the refresh token ticker runs always
                this.startAutoRefresh();
            }
            return false;
        }
        try {
            this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false);
            window === null || window === void 0 ? void 0 : window.addEventListener('visibilitychange', this.visibilityChangedCallback);
            // now immediately call the visbility changed callback to setup with the
            // current visbility state
            await this._onVisibilityChanged(true); // initial call
        }
        catch (error) {
            console.error('_handleVisibilityChange', error);
        }
    }
    /**
     * Callback registered with `window.addEventListener('visibilitychange')`.
     */
    async _onVisibilityChanged(calledFromInitialize) {
        const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
        this._debug(methodName, 'visibilityState', document.visibilityState);
        if (document.visibilityState === 'visible') {
            if (this.autoRefreshToken) {
                // in browser environments the refresh token ticker runs only on focused tabs
                // which prevents race conditions
                this._startAutoRefresh();
            }
            if (!calledFromInitialize) {
                // called when the visibility has changed, i.e. the browser
                // transitioned from hidden -> visible so we need to see if the session
                // should be recovered immediately... but to do that we need to acquire
                // the lock first asynchronously
                await this.initializePromise;
                await this._acquireLock(-1, async () => {
                    if (document.visibilityState !== 'visible') {
                        this._debug(methodName, 'acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting');
                        // visibility has changed while waiting for the lock, abort
                        return;
                    }
                    // recover the session
                    await this._recoverAndRefresh();
                });
            }
        }
        else if (document.visibilityState === 'hidden') {
            if (this.autoRefreshToken) {
                this._stopAutoRefresh();
            }
        }
    }
    /**
     * Generates the relevant login URL for a third-party provider.
     * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param options.scopes A space-separated list of scopes granted to the OAuth application.
     * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
     */
    async _getUrlForProvider(url, provider, options) {
        const urlParams = [`provider=${encodeURIComponent(provider)}`];
        if (options === null || options === void 0 ? void 0 : options.redirectTo) {
            urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
        }
        if (options === null || options === void 0 ? void 0 : options.scopes) {
            urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
        }
        if (this.flowType === 'pkce') {
            const [codeChallenge, codeChallengeMethod] = await (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getCodeChallengeAndMethod)(this.storage, this.storageKey);
            const flowParams = new URLSearchParams({
                code_challenge: `${encodeURIComponent(codeChallenge)}`,
                code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`,
            });
            urlParams.push(flowParams.toString());
        }
        if (options === null || options === void 0 ? void 0 : options.queryParams) {
            const query = new URLSearchParams(options.queryParams);
            urlParams.push(query.toString());
        }
        if (options === null || options === void 0 ? void 0 : options.skipBrowserRedirect) {
            urlParams.push(`skip_http_redirect=${options.skipBrowserRedirect}`);
        }
        return `${url}?${urlParams.join('&')}`;
    }
    async _unenroll(params) {
        try {
            return await this._useSession(async (result) => {
                var _a;
                const { data: sessionData, error: sessionError } = result;
                if (sessionError) {
                    return { data: null, error: sessionError };
                }
                return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'DELETE', `${this.url}/factors/${params.factorId}`, {
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                });
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    async _enroll(params) {
        try {
            return await this._useSession(async (result) => {
                var _a, _b;
                const { data: sessionData, error: sessionError } = result;
                if (sessionError) {
                    return { data: null, error: sessionError };
                }
                const body = Object.assign({ friendly_name: params.friendlyName, factor_type: params.factorType }, (params.factorType === 'phone' ? { phone: params.phone } : { issuer: params.issuer }));
                const { data, error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/factors`, {
                    body,
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                });
                if (error) {
                    return { data: null, error };
                }
                if (params.factorType === 'totp' && ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code)) {
                    data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
                }
                return { data, error: null };
            });
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
    /**
     * {@see GoTrueMFAApi#verify}
     */
    async _verify(params) {
        return this._acquireLock(-1, async () => {
            try {
                return await this._useSession(async (result) => {
                    var _a;
                    const { data: sessionData, error: sessionError } = result;
                    if (sessionError) {
                        return { data: null, error: sessionError };
                    }
                    const { data, error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/factors/${params.factorId}/verify`, {
                        body: { code: params.code, challenge_id: params.challengeId },
                        headers: this.headers,
                        jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                    });
                    if (error) {
                        return { data: null, error };
                    }
                    await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1000) + data.expires_in }, data));
                    await this._notifyAllSubscribers('MFA_CHALLENGE_VERIFIED', data);
                    return { data, error };
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challenge}
     */
    async _challenge(params) {
        return this._acquireLock(-1, async () => {
            try {
                return await this._useSession(async (result) => {
                    var _a;
                    const { data: sessionData, error: sessionError } = result;
                    if (sessionError) {
                        return { data: null, error: sessionError };
                    }
                    return await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'POST', `${this.url}/factors/${params.factorId}/challenge`, {
                        body: { channel: params.channel },
                        headers: this.headers,
                        jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token,
                    });
                });
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challengeAndVerify}
     */
    async _challengeAndVerify(params) {
        // both _challenge and _verify independently acquire the lock, so no need
        // to acquire it here
        const { data: challengeData, error: challengeError } = await this._challenge({
            factorId: params.factorId,
        });
        if (challengeError) {
            return { data: null, error: challengeError };
        }
        return await this._verify({
            factorId: params.factorId,
            challengeId: challengeData.id,
            code: params.code,
        });
    }
    /**
     * {@see GoTrueMFAApi#listFactors}
     */
    async _listFactors() {
        // use #getUser instead of #_getUser as the former acquires a lock
        const { data: { user }, error: userError, } = await this.getUser();
        if (userError) {
            return { data: null, error: userError };
        }
        const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
        const totp = factors.filter((factor) => factor.factor_type === 'totp' && factor.status === 'verified');
        const phone = factors.filter((factor) => factor.factor_type === 'phone' && factor.status === 'verified');
        return {
            data: {
                all: factors,
                totp,
                phone,
            },
            error: null,
        };
    }
    /**
     * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
     */
    async _getAuthenticatorAssuranceLevel() {
        return this._acquireLock(-1, async () => {
            return await this._useSession(async (result) => {
                var _a, _b;
                const { data: { session }, error: sessionError, } = result;
                if (sessionError) {
                    return { data: null, error: sessionError };
                }
                if (!session) {
                    return {
                        data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
                        error: null,
                    };
                }
                const { payload } = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.decodeJWT)(session.access_token);
                let currentLevel = null;
                if (payload.aal) {
                    currentLevel = payload.aal;
                }
                let nextLevel = currentLevel;
                const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === 'verified')) !== null && _b !== void 0 ? _b : [];
                if (verifiedFactors.length > 0) {
                    nextLevel = 'aal2';
                }
                const currentAuthenticationMethods = payload.amr || [];
                return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
            });
        });
    }
    async fetchJwk(kid, jwks = { keys: [] }) {
        // try fetching from the supplied jwks
        let jwk = jwks.keys.find((key) => key.kid === kid);
        if (jwk) {
            return jwk;
        }
        // try fetching from cache
        jwk = this.jwks.keys.find((key) => key.kid === kid);
        // jwk exists and jwks isn't stale
        if (jwk && this.jwks_cached_at + _lib_constants__WEBPACK_IMPORTED_MODULE_1__.JWKS_TTL > Date.now()) {
            return jwk;
        }
        // jwk isn't cached in memory so we need to fetch it from the well-known endpoint
        const { data, error } = await (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_3__._request)(this.fetch, 'GET', `${this.url}/.well-known/jwks.json`, {
            headers: this.headers,
        });
        if (error) {
            throw error;
        }
        if (!data.keys || data.keys.length === 0) {
            throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidJwtError('JWKS is empty');
        }
        this.jwks = data;
        this.jwks_cached_at = Date.now();
        // Find the signing key
        jwk = data.keys.find((key) => key.kid === kid);
        if (!jwk) {
            throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidJwtError('No matching signing key found in JWKS');
        }
        return jwk;
    }
    /**
     * @experimental This method may change in future versions.
     * @description Gets the claims from a JWT. If the JWT is symmetric JWTs, it will call getUser() to verify against the server. If the JWT is asymmetric, it will be verified against the JWKS using the WebCrypto API.
     */
    async getClaims(jwt, jwks = { keys: [] }) {
        try {
            let token = jwt;
            if (!token) {
                const { data, error } = await this.getSession();
                if (error || !data.session) {
                    return { data: null, error };
                }
                token = data.session.access_token;
            }
            const { header, payload, signature, raw: { header: rawHeader, payload: rawPayload }, } = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.decodeJWT)(token);
            // Reject expired JWTs
            (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.validateExp)(payload.exp);
            // If symmetric algorithm or WebCrypto API is unavailable, fallback to getUser()
            if (!header.kid ||
                header.alg === 'HS256' ||
                !('crypto' in globalThis && 'subtle' in globalThis.crypto)) {
                const { error } = await this.getUser(token);
                if (error) {
                    throw error;
                }
                // getUser succeeds so the claims in the JWT can be trusted
                return {
                    data: {
                        claims: payload,
                        header,
                        signature,
                    },
                    error: null,
                };
            }
            const algorithm = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_4__.getAlgorithm)(header.alg);
            const signingKey = await this.fetchJwk(header.kid, jwks);
            // Convert JWK to CryptoKey
            const publicKey = await crypto.subtle.importKey('jwk', signingKey, algorithm, true, [
                'verify',
            ]);
            // Verify the signature
            const isValid = await crypto.subtle.verify(algorithm, publicKey, signature, (0,_lib_base64url__WEBPACK_IMPORTED_MODULE_9__.stringToUint8Array)(`${rawHeader}.${rawPayload}`));
            if (!isValid) {
                throw new _lib_errors__WEBPACK_IMPORTED_MODULE_2__.AuthInvalidJwtError('Invalid JWT signature');
            }
            // If verification succeeds, decode and return claims
            return {
                data: {
                    claims: payload,
                    header,
                    signature,
                },
                error: null,
            };
        }
        catch (error) {
            if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_2__.isAuthError)(error)) {
                return { data: null, error };
            }
            throw error;
        }
    }
}
GoTrueClient.nextInstanceID = 0;
//# sourceMappingURL=GoTrueClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthClient: () => (/* reexport safe */ _AuthClient__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _GoTrueAdminApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GoTrueAdminApi */ "./node_modules/@supabase/auth-js/dist/module/GoTrueAdminApi.js");
/* harmony import */ var _GoTrueClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GoTrueClient */ "./node_modules/@supabase/auth-js/dist/module/GoTrueClient.js");
/* harmony import */ var _AuthAdminApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AuthAdminApi */ "./node_modules/@supabase/auth-js/dist/module/AuthAdminApi.js");
/* harmony import */ var _AuthClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AuthClient */ "./node_modules/@supabase/auth-js/dist/module/AuthClient.js");
/* harmony import */ var _lib_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/types */ "./node_modules/@supabase/auth-js/dist/module/lib/types.js");
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/errors */ "./node_modules/@supabase/auth-js/dist/module/lib/errors.js");
/* harmony import */ var _lib_locks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/locks */ "./node_modules/@supabase/auth-js/dist/module/lib/locks.js");








//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/lib/base64url.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/lib/base64url.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64UrlToUint8Array: () => (/* binding */ base64UrlToUint8Array),
/* harmony export */   stringFromBase64URL: () => (/* binding */ stringFromBase64URL),
/* harmony export */   stringToUint8Array: () => (/* binding */ stringToUint8Array)
/* harmony export */ });
/* unused harmony exports byteToBase64URL, byteFromBase64URL, stringToBase64URL, codepointToUTF8, stringToUTF8, stringFromUTF8 */
/**
 * Avoid modifying this file. It's part of
 * https://github.com/supabase-community/base64url-js.  Submit all fixes on
 * that repo!
 */
/**
 * An array of characters that encode 6 bits into a Base64-URL alphabet
 * character.
 */
const TO_BASE64URL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split('');
/**
 * An array of characters that can appear in a Base64-URL encoded string but
 * should be ignored.
 */
const IGNORE_BASE64URL = ' \t\n\r='.split('');
/**
 * An array of 128 numbers that map a Base64-URL character to 6 bits, or if -2
 * used to skip the character, or if -1 used to error out.
 */
const FROM_BASE64URL = (() => {
    const charMap = new Array(128);
    for (let i = 0; i < charMap.length; i += 1) {
        charMap[i] = -1;
    }
    for (let i = 0; i < IGNORE_BASE64URL.length; i += 1) {
        charMap[IGNORE_BASE64URL[i].charCodeAt(0)] = -2;
    }
    for (let i = 0; i < TO_BASE64URL.length; i += 1) {
        charMap[TO_BASE64URL[i].charCodeAt(0)] = i;
    }
    return charMap;
})();
/**
 * Converts a byte to a Base64-URL string.
 *
 * @param byte The byte to convert, or null to flush at the end of the byte sequence.
 * @param state The Base64 conversion state. Pass an initial value of `{ queue: 0, queuedBits: 0 }`.
 * @param emit A function called with the next Base64 character when ready.
 */
function byteToBase64URL(byte, state, emit) {
    if (byte !== null) {
        state.queue = (state.queue << 8) | byte;
        state.queuedBits += 8;
        while (state.queuedBits >= 6) {
            const pos = (state.queue >> (state.queuedBits - 6)) & 63;
            emit(TO_BASE64URL[pos]);
            state.queuedBits -= 6;
        }
    }
    else if (state.queuedBits > 0) {
        state.queue = state.queue << (6 - state.queuedBits);
        state.queuedBits = 6;
        while (state.queuedBits >= 6) {
            const pos = (state.queue >> (state.queuedBits - 6)) & 63;
            emit(TO_BASE64URL[pos]);
            state.queuedBits -= 6;
        }
    }
}
/**
 * Converts a String char code (extracted using `string.charCodeAt(position)`) to a sequence of Base64-URL characters.
 *
 * @param charCode The char code of the JavaScript string.
 * @param state The Base64 state. Pass an initial value of `{ queue: 0, queuedBits: 0 }`.
 * @param emit A function called with the next byte.
 */
function byteFromBase64URL(charCode, state, emit) {
    const bits = FROM_BASE64URL[charCode];
    if (bits > -1) {
        // valid Base64-URL character
        state.queue = (state.queue << 6) | bits;
        state.queuedBits += 6;
        while (state.queuedBits >= 8) {
            emit((state.queue >> (state.queuedBits - 8)) & 0xff);
            state.queuedBits -= 8;
        }
    }
    else if (bits === -2) {
        // ignore spaces, tabs, newlines, =
        return;
    }
    else {
        throw new Error(`Invalid Base64-URL character "${String.fromCharCode(charCode)}"`);
    }
}
/**
 * Converts a JavaScript string (which may include any valid character) into a
 * Base64-URL encoded string. The string is first encoded in UTF-8 which is
 * then encoded as Base64-URL.
 *
 * @param str The string to convert.
 */
function stringToBase64URL(str) {
    const base64 = [];
    const emitter = (char) => {
        base64.push(char);
    };
    const state = { queue: 0, queuedBits: 0 };
    stringToUTF8(str, (byte) => {
        byteToBase64URL(byte, state, emitter);
    });
    byteToBase64URL(null, state, emitter);
    return base64.join('');
}
/**
 * Converts a Base64-URL encoded string into a JavaScript string. It is assumed
 * that the underlying string has been encoded as UTF-8.
 *
 * @param str The Base64-URL encoded string.
 */
function stringFromBase64URL(str) {
    const conv = [];
    const utf8Emit = (codepoint) => {
        conv.push(String.fromCodePoint(codepoint));
    };
    const utf8State = {
        utf8seq: 0,
        codepoint: 0,
    };
    const b64State = { queue: 0, queuedBits: 0 };
    const byteEmit = (byte) => {
        stringFromUTF8(byte, utf8State, utf8Emit);
    };
    for (let i = 0; i < str.length; i += 1) {
        byteFromBase64URL(str.charCodeAt(i), b64State, byteEmit);
    }
    return conv.join('');
}
/**
 * Converts a Unicode codepoint to a multi-byte UTF-8 sequence.
 *
 * @param codepoint The Unicode codepoint.
 * @param emit      Function which will be called for each UTF-8 byte that represents the codepoint.
 */
function codepointToUTF8(codepoint, emit) {
    if (codepoint <= 0x7f) {
        emit(codepoint);
        return;
    }
    else if (codepoint <= 0x7ff) {
        emit(0xc0 | (codepoint >> 6));
        emit(0x80 | (codepoint & 0x3f));
        return;
    }
    else if (codepoint <= 0xffff) {
        emit(0xe0 | (codepoint >> 12));
        emit(0x80 | ((codepoint >> 6) & 0x3f));
        emit(0x80 | (codepoint & 0x3f));
        return;
    }
    else if (codepoint <= 0x10ffff) {
        emit(0xf0 | (codepoint >> 18));
        emit(0x80 | ((codepoint >> 12) & 0x3f));
        emit(0x80 | ((codepoint >> 6) & 0x3f));
        emit(0x80 | (codepoint & 0x3f));
        return;
    }
    throw new Error(`Unrecognized Unicode codepoint: ${codepoint.toString(16)}`);
}
/**
 * Converts a JavaScript string to a sequence of UTF-8 bytes.
 *
 * @param str  The string to convert to UTF-8.
 * @param emit Function which will be called for each UTF-8 byte of the string.
 */
function stringToUTF8(str, emit) {
    for (let i = 0; i < str.length; i += 1) {
        let codepoint = str.charCodeAt(i);
        if (codepoint > 0xd7ff && codepoint <= 0xdbff) {
            // most UTF-16 codepoints are Unicode codepoints, except values in this
            // range where the next UTF-16 codepoint needs to be combined with the
            // current one to get the Unicode codepoint
            const highSurrogate = ((codepoint - 0xd800) * 0x400) & 0xffff;
            const lowSurrogate = (str.charCodeAt(i + 1) - 0xdc00) & 0xffff;
            codepoint = (lowSurrogate | highSurrogate) + 0x10000;
            i += 1;
        }
        codepointToUTF8(codepoint, emit);
    }
}
/**
 * Converts a UTF-8 byte to a Unicode codepoint.
 *
 * @param byte  The UTF-8 byte next in the sequence.
 * @param state The shared state between consecutive UTF-8 bytes in the
 *              sequence, an object with the shape `{ utf8seq: 0, codepoint: 0 }`.
 * @param emit  Function which will be called for each codepoint.
 */
function stringFromUTF8(byte, state, emit) {
    if (state.utf8seq === 0) {
        if (byte <= 0x7f) {
            emit(byte);
            return;
        }
        // count the number of 1 leading bits until you reach 0
        for (let leadingBit = 1; leadingBit < 6; leadingBit += 1) {
            if (((byte >> (7 - leadingBit)) & 1) === 0) {
                state.utf8seq = leadingBit;
                break;
            }
        }
        if (state.utf8seq === 2) {
            state.codepoint = byte & 31;
        }
        else if (state.utf8seq === 3) {
            state.codepoint = byte & 15;
        }
        else if (state.utf8seq === 4) {
            state.codepoint = byte & 7;
        }
        else {
            throw new Error('Invalid UTF-8 sequence');
        }
        state.utf8seq -= 1;
    }
    else if (state.utf8seq > 0) {
        if (byte <= 0x7f) {
            throw new Error('Invalid UTF-8 sequence');
        }
        state.codepoint = (state.codepoint << 6) | (byte & 63);
        state.utf8seq -= 1;
        if (state.utf8seq === 0) {
            emit(state.codepoint);
        }
    }
}
/**
 * Helper functions to convert different types of strings to Uint8Array
 */
function base64UrlToUint8Array(str) {
    const result = [];
    const state = { queue: 0, queuedBits: 0 };
    const onByte = (byte) => {
        result.push(byte);
    };
    for (let i = 0; i < str.length; i += 1) {
        byteFromBase64URL(str.charCodeAt(i), state, onByte);
    }
    return new Uint8Array(result);
}
function stringToUint8Array(str) {
    const result = [];
    stringToUTF8(str, (byte) => result.push(byte));
    return new Uint8Array(result);
}
//# sourceMappingURL=base64url.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/lib/constants.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/lib/constants.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_VERSIONS: () => (/* binding */ API_VERSIONS),
/* harmony export */   API_VERSION_HEADER_NAME: () => (/* binding */ API_VERSION_HEADER_NAME),
/* harmony export */   AUTO_REFRESH_TICK_DURATION_MS: () => (/* binding */ AUTO_REFRESH_TICK_DURATION_MS),
/* harmony export */   AUTO_REFRESH_TICK_THRESHOLD: () => (/* binding */ AUTO_REFRESH_TICK_THRESHOLD),
/* harmony export */   BASE64URL_REGEX: () => (/* binding */ BASE64URL_REGEX),
/* harmony export */   DEFAULT_HEADERS: () => (/* binding */ DEFAULT_HEADERS),
/* harmony export */   EXPIRY_MARGIN_MS: () => (/* binding */ EXPIRY_MARGIN_MS),
/* harmony export */   GOTRUE_URL: () => (/* binding */ GOTRUE_URL),
/* harmony export */   JWKS_TTL: () => (/* binding */ JWKS_TTL),
/* harmony export */   STORAGE_KEY: () => (/* binding */ STORAGE_KEY)
/* harmony export */ });
/* unused harmony exports AUDIENCE, NETWORK_FAILURE */
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/@supabase/auth-js/dist/module/lib/version.js");

/** Current session will be checked for refresh at this interval. */
const AUTO_REFRESH_TICK_DURATION_MS = 30 * 1000;
/**
 * A token refresh will be attempted this many ticks before the current session expires. */
const AUTO_REFRESH_TICK_THRESHOLD = 3;
/*
 * Earliest time before an access token expires that the session should be refreshed.
 */
const EXPIRY_MARGIN_MS = AUTO_REFRESH_TICK_THRESHOLD * AUTO_REFRESH_TICK_DURATION_MS;
const GOTRUE_URL = 'http://localhost:9999';
const STORAGE_KEY = 'supabase.auth.token';
const AUDIENCE = '';
const DEFAULT_HEADERS = { 'X-Client-Info': `gotrue-js/${_version__WEBPACK_IMPORTED_MODULE_0__.version}` };
const NETWORK_FAILURE = {
    MAX_RETRIES: 10,
    RETRY_INTERVAL: 2, // in deciseconds
};
const API_VERSION_HEADER_NAME = 'X-Supabase-Api-Version';
const API_VERSIONS = {
    '2024-01-01': {
        timestamp: Date.parse('2024-01-01T00:00:00.0Z'),
        name: '2024-01-01',
    },
};
const BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
const JWKS_TTL = 600000; // 10 minutes
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/lib/errors.js":
/*!******************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/lib/errors.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthApiError: () => (/* binding */ AuthApiError),
/* harmony export */   AuthImplicitGrantRedirectError: () => (/* binding */ AuthImplicitGrantRedirectError),
/* harmony export */   AuthInvalidCredentialsError: () => (/* binding */ AuthInvalidCredentialsError),
/* harmony export */   AuthInvalidJwtError: () => (/* binding */ AuthInvalidJwtError),
/* harmony export */   AuthInvalidTokenResponseError: () => (/* binding */ AuthInvalidTokenResponseError),
/* harmony export */   AuthPKCEGrantCodeExchangeError: () => (/* binding */ AuthPKCEGrantCodeExchangeError),
/* harmony export */   AuthRetryableFetchError: () => (/* binding */ AuthRetryableFetchError),
/* harmony export */   AuthSessionMissingError: () => (/* binding */ AuthSessionMissingError),
/* harmony export */   AuthUnknownError: () => (/* binding */ AuthUnknownError),
/* harmony export */   AuthWeakPasswordError: () => (/* binding */ AuthWeakPasswordError),
/* harmony export */   isAuthApiError: () => (/* binding */ isAuthApiError),
/* harmony export */   isAuthError: () => (/* binding */ isAuthError),
/* harmony export */   isAuthImplicitGrantRedirectError: () => (/* binding */ isAuthImplicitGrantRedirectError),
/* harmony export */   isAuthRetryableFetchError: () => (/* binding */ isAuthRetryableFetchError),
/* harmony export */   isAuthSessionMissingError: () => (/* binding */ isAuthSessionMissingError)
/* harmony export */ });
/* unused harmony exports AuthError, CustomAuthError, isAuthWeakPasswordError */
class AuthError extends Error {
    constructor(message, status, code) {
        super(message);
        this.__isAuthError = true;
        this.name = 'AuthError';
        this.status = status;
        this.code = code;
    }
}
function isAuthError(error) {
    return typeof error === 'object' && error !== null && '__isAuthError' in error;
}
class AuthApiError extends AuthError {
    constructor(message, status, code) {
        super(message, status, code);
        this.name = 'AuthApiError';
        this.status = status;
        this.code = code;
    }
}
function isAuthApiError(error) {
    return isAuthError(error) && error.name === 'AuthApiError';
}
class AuthUnknownError extends AuthError {
    constructor(message, originalError) {
        super(message);
        this.name = 'AuthUnknownError';
        this.originalError = originalError;
    }
}
class CustomAuthError extends AuthError {
    constructor(message, name, status, code) {
        super(message, status, code);
        this.name = name;
        this.status = status;
    }
}
class AuthSessionMissingError extends CustomAuthError {
    constructor() {
        super('Auth session missing!', 'AuthSessionMissingError', 400, undefined);
    }
}
function isAuthSessionMissingError(error) {
    return isAuthError(error) && error.name === 'AuthSessionMissingError';
}
class AuthInvalidTokenResponseError extends CustomAuthError {
    constructor() {
        super('Auth session or user missing', 'AuthInvalidTokenResponseError', 500, undefined);
    }
}
class AuthInvalidCredentialsError extends CustomAuthError {
    constructor(message) {
        super(message, 'AuthInvalidCredentialsError', 400, undefined);
    }
}
class AuthImplicitGrantRedirectError extends CustomAuthError {
    constructor(message, details = null) {
        super(message, 'AuthImplicitGrantRedirectError', 500, undefined);
        this.details = null;
        this.details = details;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details,
        };
    }
}
function isAuthImplicitGrantRedirectError(error) {
    return isAuthError(error) && error.name === 'AuthImplicitGrantRedirectError';
}
class AuthPKCEGrantCodeExchangeError extends CustomAuthError {
    constructor(message, details = null) {
        super(message, 'AuthPKCEGrantCodeExchangeError', 500, undefined);
        this.details = null;
        this.details = details;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details,
        };
    }
}
class AuthRetryableFetchError extends CustomAuthError {
    constructor(message, status) {
        super(message, 'AuthRetryableFetchError', status, undefined);
    }
}
function isAuthRetryableFetchError(error) {
    return isAuthError(error) && error.name === 'AuthRetryableFetchError';
}
/**
 * This error is thrown on certain methods when the password used is deemed
 * weak. Inspect the reasons to identify what password strength rules are
 * inadequate.
 */
class AuthWeakPasswordError extends CustomAuthError {
    constructor(message, status, reasons) {
        super(message, 'AuthWeakPasswordError', status, 'weak_password');
        this.reasons = reasons;
    }
}
function isAuthWeakPasswordError(error) {
    return isAuthError(error) && error.name === 'AuthWeakPasswordError';
}
class AuthInvalidJwtError extends CustomAuthError {
    constructor(message) {
        super(message, 'AuthInvalidJwtError', 400, 'invalid_jwt');
    }
}
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/lib/fetch.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/lib/fetch.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _generateLinkResponse: () => (/* binding */ _generateLinkResponse),
/* harmony export */   _noResolveJsonResponse: () => (/* binding */ _noResolveJsonResponse),
/* harmony export */   _request: () => (/* binding */ _request),
/* harmony export */   _sessionResponse: () => (/* binding */ _sessionResponse),
/* harmony export */   _sessionResponsePassword: () => (/* binding */ _sessionResponsePassword),
/* harmony export */   _ssoResponse: () => (/* binding */ _ssoResponse),
/* harmony export */   _userResponse: () => (/* binding */ _userResponse)
/* harmony export */ });
/* unused harmony export handleError */
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/@supabase/auth-js/dist/module/lib/constants.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./node_modules/@supabase/auth-js/dist/module/lib/helpers.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors */ "./node_modules/@supabase/auth-js/dist/module/lib/errors.js");
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



const _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const NETWORK_ERROR_CODES = [502, 503, 504];
async function handleError(error) {
    var _a;
    if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.looksLikeFetchResponse)(error)) {
        throw new _errors__WEBPACK_IMPORTED_MODULE_2__.AuthRetryableFetchError(_getErrorMessage(error), 0);
    }
    if (NETWORK_ERROR_CODES.includes(error.status)) {
        // status in 500...599 range - server had an error, request might be retryed.
        throw new _errors__WEBPACK_IMPORTED_MODULE_2__.AuthRetryableFetchError(_getErrorMessage(error), error.status);
    }
    let data;
    try {
        data = await error.json();
    }
    catch (e) {
        throw new _errors__WEBPACK_IMPORTED_MODULE_2__.AuthUnknownError(_getErrorMessage(e), e);
    }
    let errorCode = undefined;
    const responseAPIVersion = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.parseResponseAPIVersion)(error);
    if (responseAPIVersion &&
        responseAPIVersion.getTime() >= _constants__WEBPACK_IMPORTED_MODULE_0__.API_VERSIONS['2024-01-01'].timestamp &&
        typeof data === 'object' &&
        data &&
        typeof data.code === 'string') {
        errorCode = data.code;
    }
    else if (typeof data === 'object' && data && typeof data.error_code === 'string') {
        errorCode = data.error_code;
    }
    if (!errorCode) {
        // Legacy support for weak password errors, when there were no error codes
        if (typeof data === 'object' &&
            data &&
            typeof data.weak_password === 'object' &&
            data.weak_password &&
            Array.isArray(data.weak_password.reasons) &&
            data.weak_password.reasons.length &&
            data.weak_password.reasons.reduce((a, i) => a && typeof i === 'string', true)) {
            throw new _errors__WEBPACK_IMPORTED_MODULE_2__.AuthWeakPasswordError(_getErrorMessage(data), error.status, data.weak_password.reasons);
        }
    }
    else if (errorCode === 'weak_password') {
        throw new _errors__WEBPACK_IMPORTED_MODULE_2__.AuthWeakPasswordError(_getErrorMessage(data), error.status, ((_a = data.weak_password) === null || _a === void 0 ? void 0 : _a.reasons) || []);
    }
    else if (errorCode === 'session_not_found') {
        // The `session_id` inside the JWT does not correspond to a row in the
        // `sessions` table. This usually means the user has signed out, has been
        // deleted, or their session has somehow been terminated.
        throw new _errors__WEBPACK_IMPORTED_MODULE_2__.AuthSessionMissingError();
    }
    throw new _errors__WEBPACK_IMPORTED_MODULE_2__.AuthApiError(_getErrorMessage(data), error.status || 500, errorCode);
}
const _getRequestParams = (method, options, parameters, body) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
    if (method === 'GET') {
        return params;
    }
    params.headers = Object.assign({ 'Content-Type': 'application/json;charset=UTF-8' }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
};
async function _request(fetcher, method, url, options) {
    var _a;
    const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
    if (!headers[_constants__WEBPACK_IMPORTED_MODULE_0__.API_VERSION_HEADER_NAME]) {
        headers[_constants__WEBPACK_IMPORTED_MODULE_0__.API_VERSION_HEADER_NAME] = _constants__WEBPACK_IMPORTED_MODULE_0__.API_VERSIONS['2024-01-01'].name;
    }
    if (options === null || options === void 0 ? void 0 : options.jwt) {
        headers['Authorization'] = `Bearer ${options.jwt}`;
    }
    const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
    if (options === null || options === void 0 ? void 0 : options.redirectTo) {
        qs['redirect_to'] = options.redirectTo;
    }
    const queryString = Object.keys(qs).length ? '?' + new URLSearchParams(qs).toString() : '';
    const data = await _handleRequest(fetcher, method, url + queryString, {
        headers,
        noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson,
    }, {}, options === null || options === void 0 ? void 0 : options.body);
    return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : { data: Object.assign({}, data), error: null };
}
async function _handleRequest(fetcher, method, url, options, parameters, body) {
    const requestParams = _getRequestParams(method, options, parameters, body);
    let result;
    try {
        result = await fetcher(url, Object.assign({}, requestParams));
    }
    catch (e) {
        console.error(e);
        // fetch failed, likely due to a network or CORS error
        throw new _errors__WEBPACK_IMPORTED_MODULE_2__.AuthRetryableFetchError(_getErrorMessage(e), 0);
    }
    if (!result.ok) {
        await handleError(result);
    }
    if (options === null || options === void 0 ? void 0 : options.noResolveJson) {
        return result;
    }
    try {
        return await result.json();
    }
    catch (e) {
        await handleError(e);
    }
}
function _sessionResponse(data) {
    var _a;
    let session = null;
    if (hasSession(data)) {
        session = Object.assign({}, data);
        if (!data.expires_at) {
            session.expires_at = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.expiresAt)(data.expires_in);
        }
    }
    const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
    return { data: { session, user }, error: null };
}
function _sessionResponsePassword(data) {
    const response = _sessionResponse(data);
    if (!response.error &&
        data.weak_password &&
        typeof data.weak_password === 'object' &&
        Array.isArray(data.weak_password.reasons) &&
        data.weak_password.reasons.length &&
        data.weak_password.message &&
        typeof data.weak_password.message === 'string' &&
        data.weak_password.reasons.reduce((a, i) => a && typeof i === 'string', true)) {
        response.data.weak_password = data.weak_password;
    }
    return response;
}
function _userResponse(data) {
    var _a;
    const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
    return { data: { user }, error: null };
}
function _ssoResponse(data) {
    return { data, error: null };
}
function _generateLinkResponse(data) {
    const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
    const properties = {
        action_link,
        email_otp,
        hashed_token,
        redirect_to,
        verification_type,
    };
    const user = Object.assign({}, rest);
    return {
        data: {
            properties,
            user,
        },
        error: null,
    };
}
function _noResolveJsonResponse(data) {
    return data;
}
/**
 * hasSession checks if the response object contains a valid session
 * @param data A response object
 * @returns true if a session is in the response
 */
function hasSession(data) {
    return data.access_token && data.refresh_token && data.expires_in;
}
//# sourceMappingURL=fetch.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/lib/helpers.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/lib/helpers.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Deferred: () => (/* binding */ Deferred),
/* harmony export */   decodeJWT: () => (/* binding */ decodeJWT),
/* harmony export */   expiresAt: () => (/* binding */ expiresAt),
/* harmony export */   getAlgorithm: () => (/* binding */ getAlgorithm),
/* harmony export */   getCodeChallengeAndMethod: () => (/* binding */ getCodeChallengeAndMethod),
/* harmony export */   getItemAsync: () => (/* binding */ getItemAsync),
/* harmony export */   isBrowser: () => (/* binding */ isBrowser),
/* harmony export */   looksLikeFetchResponse: () => (/* binding */ looksLikeFetchResponse),
/* harmony export */   parseParametersFromURL: () => (/* binding */ parseParametersFromURL),
/* harmony export */   parseResponseAPIVersion: () => (/* binding */ parseResponseAPIVersion),
/* harmony export */   removeItemAsync: () => (/* binding */ removeItemAsync),
/* harmony export */   resolveFetch: () => (/* binding */ resolveFetch),
/* harmony export */   retryable: () => (/* binding */ retryable),
/* harmony export */   setItemAsync: () => (/* binding */ setItemAsync),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   supportsLocalStorage: () => (/* binding */ supportsLocalStorage),
/* harmony export */   uuid: () => (/* binding */ uuid),
/* harmony export */   validateExp: () => (/* binding */ validateExp)
/* harmony export */ });
/* unused harmony exports generatePKCEVerifier, generatePKCEChallenge */
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/@supabase/auth-js/dist/module/lib/constants.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors */ "./node_modules/@supabase/auth-js/dist/module/lib/errors.js");
/* harmony import */ var _base64url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base64url */ "./node_modules/@supabase/auth-js/dist/module/lib/base64url.js");



function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1000);
    return timeNow + expiresIn;
}
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';
const localStorageWriteTests = {
    tested: false,
    writable: false,
};
/**
 * Checks whether localStorage is supported on this browser.
 */
const supportsLocalStorage = () => {
    if (!isBrowser()) {
        return false;
    }
    try {
        if (typeof globalThis.localStorage !== 'object') {
            return false;
        }
    }
    catch (e) {
        // DOM exception when accessing `localStorage`
        return false;
    }
    if (localStorageWriteTests.tested) {
        return localStorageWriteTests.writable;
    }
    const randomKey = `lswt-${Math.random()}${Math.random()}`;
    try {
        globalThis.localStorage.setItem(randomKey, randomKey);
        globalThis.localStorage.removeItem(randomKey);
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = true;
    }
    catch (e) {
        // localStorage can't be written to
        // https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = false;
    }
    return localStorageWriteTests.writable;
};
/**
 * Extracts parameters encoded in the URL both in the query and fragment.
 */
function parseParametersFromURL(href) {
    const result = {};
    const url = new URL(href);
    if (url.hash && url.hash[0] === '#') {
        try {
            const hashSearchParams = new URLSearchParams(url.hash.substring(1));
            hashSearchParams.forEach((value, key) => {
                result[key] = value;
            });
        }
        catch (e) {
            // hash is not a query string
        }
    }
    // search parameters take precedence over hash parameters
    url.searchParams.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}
const resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = (...args) => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @supabase/node-fetch */ "./node_modules/@supabase/node-fetch/browser.js")).then(({ default: fetch }) => fetch(...args));
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
const looksLikeFetchResponse = (maybeResponse) => {
    return (typeof maybeResponse === 'object' &&
        maybeResponse !== null &&
        'status' in maybeResponse &&
        'ok' in maybeResponse &&
        'json' in maybeResponse &&
        typeof maybeResponse.json === 'function');
};
// Storage helpers
const setItemAsync = async (storage, key, data) => {
    await storage.setItem(key, JSON.stringify(data));
};
const getItemAsync = async (storage, key) => {
    const value = await storage.getItem(key);
    if (!value) {
        return null;
    }
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
};
const removeItemAsync = async (storage, key) => {
    await storage.removeItem(key);
};
/**
 * A deferred represents some asynchronous work that is not yet finished, which
 * may or may not culminate in a value.
 * Taken from: https://github.com/mike-north/types/blob/master/src/async.ts
 */
class Deferred {
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;
        this.promise = new Deferred.promiseConstructor((res, rej) => {
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;
            this.resolve = res;
            this.reject = rej;
        });
    }
}
Deferred.promiseConstructor = Promise;
function decodeJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new _errors__WEBPACK_IMPORTED_MODULE_1__.AuthInvalidJwtError('Invalid JWT structure');
    }
    // Regex checks for base64url format
    for (let i = 0; i < parts.length; i++) {
        if (!_constants__WEBPACK_IMPORTED_MODULE_0__.BASE64URL_REGEX.test(parts[i])) {
            throw new _errors__WEBPACK_IMPORTED_MODULE_1__.AuthInvalidJwtError('JWT not in base64url format');
        }
    }
    const data = {
        // using base64url lib
        header: JSON.parse((0,_base64url__WEBPACK_IMPORTED_MODULE_2__.stringFromBase64URL)(parts[0])),
        payload: JSON.parse((0,_base64url__WEBPACK_IMPORTED_MODULE_2__.stringFromBase64URL)(parts[1])),
        signature: (0,_base64url__WEBPACK_IMPORTED_MODULE_2__.base64UrlToUint8Array)(parts[2]),
        raw: {
            header: parts[0],
            payload: parts[1],
        },
    };
    return data;
}
/**
 * Creates a promise that resolves to null after some time.
 */
async function sleep(time) {
    return await new Promise((accept) => {
        setTimeout(() => accept(null), time);
    });
}
/**
 * Converts the provided async function into a retryable function. Each result
 * or thrown error is sent to the isRetryable function which should return true
 * if the function should run again.
 */
function retryable(fn, isRetryable) {
    const promise = new Promise((accept, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;
        (async () => {
            for (let attempt = 0; attempt < Infinity; attempt++) {
                try {
                    const result = await fn(attempt);
                    if (!isRetryable(attempt, null, result)) {
                        accept(result);
                        return;
                    }
                }
                catch (e) {
                    if (!isRetryable(attempt, e)) {
                        reject(e);
                        return;
                    }
                }
            }
        })();
    });
    return promise;
}
function dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
}
// Functions below taken from: https://stackoverflow.com/questions/63309409/creating-a-code-verifier-and-challenge-for-pkce-auth-on-spotify-api-in-reactjs
function generatePKCEVerifier() {
    const verifierLength = 56;
    const array = new Uint32Array(verifierLength);
    if (typeof crypto === 'undefined') {
        const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
        const charSetLen = charSet.length;
        let verifier = '';
        for (let i = 0; i < verifierLength; i++) {
            verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
        }
        return verifier;
    }
    crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join('');
}
async function sha256(randomString) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(randomString);
    const hash = await crypto.subtle.digest('SHA-256', encodedData);
    const bytes = new Uint8Array(hash);
    return Array.from(bytes)
        .map((c) => String.fromCharCode(c))
        .join('');
}
async function generatePKCEChallenge(verifier) {
    const hasCryptoSupport = typeof crypto !== 'undefined' &&
        typeof crypto.subtle !== 'undefined' &&
        typeof TextEncoder !== 'undefined';
    if (!hasCryptoSupport) {
        console.warn('WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.');
        return verifier;
    }
    const hashed = await sha256(verifier);
    return btoa(hashed).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function getCodeChallengeAndMethod(storage, storageKey, isPasswordRecovery = false) {
    const codeVerifier = generatePKCEVerifier();
    let storedCodeVerifier = codeVerifier;
    if (isPasswordRecovery) {
        storedCodeVerifier += '/PASSWORD_RECOVERY';
    }
    await setItemAsync(storage, `${storageKey}-code-verifier`, storedCodeVerifier);
    const codeChallenge = await generatePKCEChallenge(codeVerifier);
    const codeChallengeMethod = codeVerifier === codeChallenge ? 'plain' : 's256';
    return [codeChallenge, codeChallengeMethod];
}
/** Parses the API version which is 2YYY-MM-DD. */
const API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function parseResponseAPIVersion(response) {
    const apiVersion = response.headers.get(_constants__WEBPACK_IMPORTED_MODULE_0__.API_VERSION_HEADER_NAME);
    if (!apiVersion) {
        return null;
    }
    if (!apiVersion.match(API_VERSION_REGEX)) {
        return null;
    }
    try {
        const date = new Date(`${apiVersion}T00:00:00.0Z`);
        return date;
    }
    catch (e) {
        return null;
    }
}
function validateExp(exp) {
    if (!exp) {
        throw new Error('Missing exp claim');
    }
    const timeNow = Math.floor(Date.now() / 1000);
    if (exp <= timeNow) {
        throw new Error('JWT has expired');
    }
}
function getAlgorithm(alg) {
    switch (alg) {
        case 'RS256':
            return {
                name: 'RSASSA-PKCS1-v1_5',
                hash: { name: 'SHA-256' },
            };
        case 'ES256':
            return {
                name: 'ECDSA',
                namedCurve: 'P-256',
                hash: { name: 'SHA-256' },
            };
        default:
            throw new Error('Invalid alg claim');
    }
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/lib/local-storage.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/lib/local-storage.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   localStorageAdapter: () => (/* binding */ localStorageAdapter),
/* harmony export */   memoryLocalStorageAdapter: () => (/* binding */ memoryLocalStorageAdapter)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/@supabase/auth-js/dist/module/lib/helpers.js");

/**
 * Provides safe access to the globalThis.localStorage property.
 */
const localStorageAdapter = {
    getItem: (key) => {
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.supportsLocalStorage)()) {
            return null;
        }
        return globalThis.localStorage.getItem(key);
    },
    setItem: (key, value) => {
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.supportsLocalStorage)()) {
            return;
        }
        globalThis.localStorage.setItem(key, value);
    },
    removeItem: (key) => {
        if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.supportsLocalStorage)()) {
            return;
        }
        globalThis.localStorage.removeItem(key);
    },
};
/**
 * Returns a localStorage-like object that stores the key-value pairs in
 * memory.
 */
function memoryLocalStorageAdapter(store = {}) {
    return {
        getItem: (key) => {
            return store[key] || null;
        },
        setItem: (key, value) => {
            store[key] = value;
        },
        removeItem: (key) => {
            delete store[key];
        },
    };
}
//# sourceMappingURL=local-storage.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/lib/locks.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/lib/locks.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LockAcquireTimeoutError: () => (/* binding */ LockAcquireTimeoutError),
/* harmony export */   navigatorLock: () => (/* binding */ navigatorLock)
/* harmony export */ });
/* unused harmony exports internals, NavigatorLockAcquireTimeoutError, ProcessLockAcquireTimeoutError, processLock */
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/@supabase/auth-js/dist/module/lib/helpers.js");

/**
 * @experimental
 */
const internals = {
    /**
     * @experimental
     */
    debug: !!(globalThis &&
        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.supportsLocalStorage)() &&
        globalThis.localStorage &&
        globalThis.localStorage.getItem('supabase.gotrue-js.locks.debug') === 'true'),
};
/**
 * An error thrown when a lock cannot be acquired after some amount of time.
 *
 * Use the {@link #isAcquireTimeout} property instead of checking with `instanceof`.
 */
class LockAcquireTimeoutError extends Error {
    constructor(message) {
        super(message);
        this.isAcquireTimeout = true;
    }
}
class NavigatorLockAcquireTimeoutError extends LockAcquireTimeoutError {
}
class ProcessLockAcquireTimeoutError extends LockAcquireTimeoutError {
}
/**
 * Implements a global exclusive lock using the Navigator LockManager API. It
 * is available on all browsers released after 2022-03-15 with Safari being the
 * last one to release support. If the API is not available, this function will
 * throw. Make sure you check availablility before configuring {@link
 * GoTrueClient}.
 *
 * You can turn on debugging by setting the `supabase.gotrue-js.locks.debug`
 * local storage item to `true`.
 *
 * Internals:
 *
 * Since the LockManager API does not preserve stack traces for the async
 * function passed in the `request` method, a trick is used where acquiring the
 * lock releases a previously started promise to run the operation in the `fn`
 * function. The lock waits for that promise to finish (with or without error),
 * while the function will finally wait for the result anyway.
 *
 * @param name Name of the lock to be acquired.
 * @param acquireTimeout If negative, no timeout. If 0 an error is thrown if
 *                       the lock can't be acquired without waiting. If positive, the lock acquire
 *                       will time out after so many milliseconds. An error is
 *                       a timeout if it has `isAcquireTimeout` set to true.
 * @param fn The operation to run once the lock is acquired.
 */
async function navigatorLock(name, acquireTimeout, fn) {
    if (internals.debug) {
        console.log('@supabase/gotrue-js: navigatorLock: acquire lock', name, acquireTimeout);
    }
    const abortController = new globalThis.AbortController();
    if (acquireTimeout > 0) {
        setTimeout(() => {
            abortController.abort();
            if (internals.debug) {
                console.log('@supabase/gotrue-js: navigatorLock acquire timed out', name);
            }
        }, acquireTimeout);
    }
    // MDN article: https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request
    // Wrapping navigator.locks.request() with a plain Promise is done as some
    // libraries like zone.js patch the Promise object to track the execution
    // context. However, it appears that most browsers use an internal promise
    // implementation when using the navigator.locks.request() API causing them
    // to lose context and emit confusing log messages or break certain features.
    // This wrapping is believed to help zone.js track the execution context
    // better.
    return await Promise.resolve().then(() => globalThis.navigator.locks.request(name, acquireTimeout === 0
        ? {
            mode: 'exclusive',
            ifAvailable: true,
        }
        : {
            mode: 'exclusive',
            signal: abortController.signal,
        }, async (lock) => {
        if (lock) {
            if (internals.debug) {
                console.log('@supabase/gotrue-js: navigatorLock: acquired', name, lock.name);
            }
            try {
                return await fn();
            }
            finally {
                if (internals.debug) {
                    console.log('@supabase/gotrue-js: navigatorLock: released', name, lock.name);
                }
            }
        }
        else {
            if (acquireTimeout === 0) {
                if (internals.debug) {
                    console.log('@supabase/gotrue-js: navigatorLock: not immediately available', name);
                }
                throw new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`);
            }
            else {
                if (internals.debug) {
                    try {
                        const result = await globalThis.navigator.locks.query();
                        console.log('@supabase/gotrue-js: Navigator LockManager state', JSON.stringify(result, null, '  '));
                    }
                    catch (e) {
                        console.warn('@supabase/gotrue-js: Error when querying Navigator LockManager state', e);
                    }
                }
                // Browser is not following the Navigator LockManager spec, it
                // returned a null lock when we didn't use ifAvailable. So we can
                // pretend the lock is acquired in the name of backward compatibility
                // and user experience and just run the function.
                console.warn('@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request');
                return await fn();
            }
        }
    }));
}
const PROCESS_LOCKS = {};
/**
 * Implements a global exclusive lock that works only in the current process.
 * Useful for environments like React Native or other non-browser
 * single-process (i.e. no concept of "tabs") environments.
 *
 * Use {@link #navigatorLock} in browser environments.
 *
 * @param name Name of the lock to be acquired.
 * @param acquireTimeout If negative, no timeout. If 0 an error is thrown if
 *                       the lock can't be acquired without waiting. If positive, the lock acquire
 *                       will time out after so many milliseconds. An error is
 *                       a timeout if it has `isAcquireTimeout` set to true.
 * @param fn The operation to run once the lock is acquired.
 */
async function processLock(name, acquireTimeout, fn) {
    var _a;
    const previousOperation = (_a = PROCESS_LOCKS[name]) !== null && _a !== void 0 ? _a : Promise.resolve();
    const currentOperation = Promise.race([
        previousOperation.catch(() => {
            // ignore error of previous operation that we're waiting to finish
            return null;
        }),
        acquireTimeout >= 0
            ? new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new ProcessLockAcquireTimeoutError(`Acquring process lock with name "${name}" timed out`));
                }, acquireTimeout);
            })
            : null,
    ].filter((x) => x))
        .catch((e) => {
        if (e && e.isAcquireTimeout) {
            throw e;
        }
        return null;
    })
        .then(async () => {
        // previous operations finished and we didn't get a race on the acquire
        // timeout, so the current operation can finally start
        return await fn();
    });
    PROCESS_LOCKS[name] = currentOperation.catch(async (e) => {
        if (e && e.isAcquireTimeout) {
            // if the current operation timed out, it doesn't mean that the previous
            // operation finished, so we need contnue waiting for it to finish
            await previousOperation;
            return null;
        }
        throw e;
    });
    // finally wait for the current operation to finish successfully, with an
    // error or with an acquire timeout error
    return await currentOperation;
}
//# sourceMappingURL=locks.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/lib/polyfills.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/lib/polyfills.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   polyfillGlobalThis: () => (/* binding */ polyfillGlobalThis)
/* harmony export */ });
/**
 * https://mathiasbynens.be/notes/globalthis
 */
function polyfillGlobalThis() {
    if (typeof globalThis === 'object')
        return;
    try {
        Object.defineProperty(Object.prototype, '__magic__', {
            get: function () {
                return this;
            },
            configurable: true,
        });
        // @ts-expect-error 'Allow access to magic'
        __magic__.globalThis = __magic__;
        // @ts-expect-error 'Allow access to magic'
        delete Object.prototype.__magic__;
    }
    catch (e) {
        if (typeof self !== 'undefined') {
            // @ts-expect-error 'Allow access to globals'
            self.globalThis = self;
        }
    }
}
//# sourceMappingURL=polyfills.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/lib/types.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/lib/types.js ***!
  \*****************************************************************/
/***/ (() => {


//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/@supabase/auth-js/dist/module/lib/version.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@supabase/auth-js/dist/module/lib/version.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
const version = '2.69.1';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@supabase/functions-js/dist/module/FunctionsClient.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@supabase/functions-js/dist/module/FunctionsClient.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FunctionsClient: () => (/* binding */ FunctionsClient)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./node_modules/@supabase/functions-js/dist/module/helper.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./node_modules/@supabase/functions-js/dist/module/types.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class FunctionsClient {
    constructor(url, { headers = {}, customFetch, region = _types__WEBPACK_IMPORTED_MODULE_0__.FunctionRegion.Any, } = {}) {
        this.url = url;
        this.headers = headers;
        this.region = region;
        this.fetch = (0,_helper__WEBPACK_IMPORTED_MODULE_1__.resolveFetch)(customFetch);
    }
    /**
     * Updates the authorization header
     * @param token - the new jwt token sent in the authorisation header
     */
    setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
    }
    /**
     * Invokes a function
     * @param functionName - The name of the Function to invoke.
     * @param options - Options for invoking the Function.
     */
    invoke(functionName, options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { headers, method, body: functionArgs } = options;
                let _headers = {};
                let { region } = options;
                if (!region) {
                    region = this.region;
                }
                if (region && region !== 'any') {
                    _headers['x-region'] = region;
                }
                let body;
                if (functionArgs &&
                    ((headers && !Object.prototype.hasOwnProperty.call(headers, 'Content-Type')) || !headers)) {
                    if ((typeof Blob !== 'undefined' && functionArgs instanceof Blob) ||
                        functionArgs instanceof ArrayBuffer) {
                        // will work for File as File inherits Blob
                        // also works for ArrayBuffer as it is the same underlying structure as a Blob
                        _headers['Content-Type'] = 'application/octet-stream';
                        body = functionArgs;
                    }
                    else if (typeof functionArgs === 'string') {
                        // plain string
                        _headers['Content-Type'] = 'text/plain';
                        body = functionArgs;
                    }
                    else if (typeof FormData !== 'undefined' && functionArgs instanceof FormData) {
                        // don't set content-type headers
                        // Request will automatically add the right boundary value
                        body = functionArgs;
                    }
                    else {
                        // default, assume this is JSON
                        _headers['Content-Type'] = 'application/json';
                        body = JSON.stringify(functionArgs);
                    }
                }
                const response = yield this.fetch(`${this.url}/${functionName}`, {
                    method: method || 'POST',
                    // headers priority is (high to low):
                    // 1. invoke-level headers
                    // 2. client-level headers
                    // 3. default Content-Type header
                    headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
                    body,
                }).catch((fetchError) => {
                    throw new _types__WEBPACK_IMPORTED_MODULE_0__.FunctionsFetchError(fetchError);
                });
                const isRelayError = response.headers.get('x-relay-error');
                if (isRelayError && isRelayError === 'true') {
                    throw new _types__WEBPACK_IMPORTED_MODULE_0__.FunctionsRelayError(response);
                }
                if (!response.ok) {
                    throw new _types__WEBPACK_IMPORTED_MODULE_0__.FunctionsHttpError(response);
                }
                let responseType = ((_a = response.headers.get('Content-Type')) !== null && _a !== void 0 ? _a : 'text/plain').split(';')[0].trim();
                let data;
                if (responseType === 'application/json') {
                    data = yield response.json();
                }
                else if (responseType === 'application/octet-stream') {
                    data = yield response.blob();
                }
                else if (responseType === 'text/event-stream') {
                    data = response;
                }
                else if (responseType === 'multipart/form-data') {
                    data = yield response.formData();
                }
                else {
                    // default to text
                    data = yield response.text();
                }
                return { data, error: null };
            }
            catch (error) {
                return { data: null, error };
            }
        });
    }
}
//# sourceMappingURL=FunctionsClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/functions-js/dist/module/helper.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@supabase/functions-js/dist/module/helper.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveFetch: () => (/* binding */ resolveFetch)
/* harmony export */ });
const resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = (...args) => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @supabase/node-fetch */ "./node_modules/@supabase/node-fetch/browser.js")).then(({ default: fetch }) => fetch(...args));
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
//# sourceMappingURL=helper.js.map

/***/ }),

/***/ "./node_modules/@supabase/functions-js/dist/module/types.js":
/*!******************************************************************!*\
  !*** ./node_modules/@supabase/functions-js/dist/module/types.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FunctionRegion: () => (/* binding */ FunctionRegion),
/* harmony export */   FunctionsFetchError: () => (/* binding */ FunctionsFetchError),
/* harmony export */   FunctionsHttpError: () => (/* binding */ FunctionsHttpError),
/* harmony export */   FunctionsRelayError: () => (/* binding */ FunctionsRelayError)
/* harmony export */ });
/* unused harmony export FunctionsError */
class FunctionsError extends Error {
    constructor(message, name = 'FunctionsError', context) {
        super(message);
        this.name = name;
        this.context = context;
    }
}
class FunctionsFetchError extends FunctionsError {
    constructor(context) {
        super('Failed to send a request to the Edge Function', 'FunctionsFetchError', context);
    }
}
class FunctionsRelayError extends FunctionsError {
    constructor(context) {
        super('Relay Error invoking the Edge Function', 'FunctionsRelayError', context);
    }
}
class FunctionsHttpError extends FunctionsError {
    constructor(context) {
        super('Edge Function returned a non-2xx status code', 'FunctionsHttpError', context);
    }
}
// Define the enum for the 'region' property
var FunctionRegion;
(function (FunctionRegion) {
    FunctionRegion["Any"] = "any";
    FunctionRegion["ApNortheast1"] = "ap-northeast-1";
    FunctionRegion["ApNortheast2"] = "ap-northeast-2";
    FunctionRegion["ApSouth1"] = "ap-south-1";
    FunctionRegion["ApSoutheast1"] = "ap-southeast-1";
    FunctionRegion["ApSoutheast2"] = "ap-southeast-2";
    FunctionRegion["CaCentral1"] = "ca-central-1";
    FunctionRegion["EuCentral1"] = "eu-central-1";
    FunctionRegion["EuWest1"] = "eu-west-1";
    FunctionRegion["EuWest2"] = "eu-west-2";
    FunctionRegion["EuWest3"] = "eu-west-3";
    FunctionRegion["SaEast1"] = "sa-east-1";
    FunctionRegion["UsEast1"] = "us-east-1";
    FunctionRegion["UsWest1"] = "us-west-1";
    FunctionRegion["UsWest2"] = "us-west-2";
})(FunctionRegion || (FunctionRegion = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/@supabase/node-fetch/browser.js":
/*!******************************************************!*\
  !*** ./node_modules/@supabase/node-fetch/browser.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Headers: () => (/* binding */ Headers),
/* harmony export */   Request: () => (/* binding */ Request),
/* harmony export */   Response: () => (/* binding */ Response),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fetch: () => (/* binding */ fetch)
/* harmony export */ });


// ref: https://github.com/tc39/proposal-global
var getGlobal = function() {
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof __webpack_require__.g !== 'undefined') { return __webpack_require__.g; }
    throw new Error('unable to locate global object');
}

var globalObject = getGlobal();

const fetch = globalObject.fetch;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (globalObject.fetch.bind(globalObject));

const Headers = globalObject.Headers;
const Request = globalObject.Request;
const Response = globalObject.Response;


/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// @ts-ignore
const node_fetch_1 = __importDefault(__webpack_require__(/*! @supabase/node-fetch */ "./node_modules/@supabase/node-fetch/browser.js"));
const PostgrestError_1 = __importDefault(__webpack_require__(/*! ./PostgrestError */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js"));
class PostgrestBuilder {
    constructor(builder) {
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = builder.headers;
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = builder.shouldThrowOnError;
        this.signal = builder.signal;
        this.isMaybeSingle = builder.isMaybeSingle;
        if (builder.fetch) {
            this.fetch = builder.fetch;
        }
        else if (typeof fetch === 'undefined') {
            this.fetch = node_fetch_1.default;
        }
        else {
            this.fetch = fetch;
        }
    }
    /**
     * If there's an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     *
     * {@link https://github.com/supabase/supabase-js/issues/92}
     */
    throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    /**
     * Set an HTTP header for the request.
     */
    setHeader(name, value) {
        this.headers = Object.assign({}, this.headers);
        this.headers[name] = value;
        return this;
    }
    then(onfulfilled, onrejected) {
        // https://postgrest.org/en/stable/api.html#switching-schemas
        if (this.schema === undefined) {
            // skip
        }
        else if (['GET', 'HEAD'].includes(this.method)) {
            this.headers['Accept-Profile'] = this.schema;
        }
        else {
            this.headers['Content-Profile'] = this.schema;
        }
        if (this.method !== 'GET' && this.method !== 'HEAD') {
            this.headers['Content-Type'] = 'application/json';
        }
        // NOTE: Invoke w/o `this` to avoid illegal invocation error.
        // https://github.com/supabase/postgrest-js/pull/247
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal,
        }).then(async (res) => {
            var _a, _b, _c;
            let error = null;
            let data = null;
            let count = null;
            let status = res.status;
            let statusText = res.statusText;
            if (res.ok) {
                if (this.method !== 'HEAD') {
                    const body = await res.text();
                    if (body === '') {
                        // Prefer: return=minimal
                    }
                    else if (this.headers['Accept'] === 'text/csv') {
                        data = body;
                    }
                    else if (this.headers['Accept'] &&
                        this.headers['Accept'].includes('application/vnd.pgrst.plan+text')) {
                        data = body;
                    }
                    else {
                        data = JSON.parse(body);
                    }
                }
                const countHeader = (_a = this.headers['Prefer']) === null || _a === void 0 ? void 0 : _a.match(/count=(exact|planned|estimated)/);
                const contentRange = (_b = res.headers.get('content-range')) === null || _b === void 0 ? void 0 : _b.split('/');
                if (countHeader && contentRange && contentRange.length > 1) {
                    count = parseInt(contentRange[1]);
                }
                // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
                // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
                if (this.isMaybeSingle && this.method === 'GET' && Array.isArray(data)) {
                    if (data.length > 1) {
                        error = {
                            // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                            code: 'PGRST116',
                            details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                            hint: null,
                            message: 'JSON object requested, multiple (or no) rows returned',
                        };
                        data = null;
                        count = null;
                        status = 406;
                        statusText = 'Not Acceptable';
                    }
                    else if (data.length === 1) {
                        data = data[0];
                    }
                    else {
                        data = null;
                    }
                }
            }
            else {
                const body = await res.text();
                try {
                    error = JSON.parse(body);
                    // Workaround for https://github.com/supabase/postgrest-js/issues/295
                    if (Array.isArray(error) && res.status === 404) {
                        data = [];
                        error = null;
                        status = 200;
                        statusText = 'OK';
                    }
                }
                catch (_d) {
                    // Workaround for https://github.com/supabase/postgrest-js/issues/295
                    if (res.status === 404 && body === '') {
                        status = 204;
                        statusText = 'No Content';
                    }
                    else {
                        error = {
                            message: body,
                        };
                    }
                }
                if (error && this.isMaybeSingle && ((_c = error === null || error === void 0 ? void 0 : error.details) === null || _c === void 0 ? void 0 : _c.includes('0 rows'))) {
                    error = null;
                    status = 200;
                    statusText = 'OK';
                }
                if (error && this.shouldThrowOnError) {
                    throw new PostgrestError_1.default(error);
                }
            }
            const postgrestResponse = {
                error,
                data,
                count,
                status,
                statusText,
            };
            return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
            res = res.catch((fetchError) => {
                var _a, _b, _c;
                return ({
                    error: {
                        message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : 'FetchError'}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                        details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ''}`,
                        hint: '',
                        code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ''}`,
                    },
                    data: null,
                    count: null,
                    status: 0,
                    statusText: '',
                });
            });
        }
        return res.then(onfulfilled, onrejected);
    }
    /**
     * Override the type of the returned `data`.
     *
     * @typeParam NewResult - The new result type to override with
     * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
     */
    returns() {
        /* istanbul ignore next */
        return this;
    }
    /**
     * Override the type of the returned `data` field in the response.
     *
     * @typeParam NewResult - The new type to cast the response data to
     * @typeParam Options - Optional type configuration (defaults to { merge: true })
     * @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
     * @example
     * ```typescript
     * // Merge with existing types (default behavior)
     * const query = supabase
     *   .from('users')
     *   .select()
     *   .overrideTypes<{ custom_field: string }>()
     *
     * // Replace existing types completely
     * const replaceQuery = supabase
     *   .from('users')
     *   .select()
     *   .overrideTypes<{ id: number; name: string }, { merge: false }>()
     * ```
     * @returns A PostgrestBuilder instance with the new type
     */
    overrideTypes() {
        return this;
    }
}
exports["default"] = PostgrestBuilder;
//# sourceMappingURL=PostgrestBuilder.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const PostgrestQueryBuilder_1 = __importDefault(__webpack_require__(/*! ./PostgrestQueryBuilder */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js"));
const PostgrestFilterBuilder_1 = __importDefault(__webpack_require__(/*! ./PostgrestFilterBuilder */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js"));
const constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/@supabase/postgrest-js/dist/cjs/constants.js");
/**
 * PostgREST client.
 *
 * @typeParam Database - Types for the schema from the [type
 * generator](https://supabase.com/docs/reference/javascript/next/typescript-support)
 *
 * @typeParam SchemaName - Postgres schema to switch to. Must be a string
 * literal, the same one passed to the constructor. If the schema is not
 * `"public"`, this must be supplied manually.
 */
class PostgrestClient {
    // TODO: Add back shouldThrowOnError once we figure out the typings
    /**
     * Creates a PostgREST client.
     *
     * @param url - URL of the PostgREST endpoint
     * @param options - Named parameters
     * @param options.headers - Custom headers
     * @param options.schema - Postgres schema to switch to
     * @param options.fetch - Custom fetch
     */
    constructor(url, { headers = {}, schema, fetch, } = {}) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, constants_1.DEFAULT_HEADERS), headers);
        this.schemaName = schema;
        this.fetch = fetch;
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */
    from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new PostgrestQueryBuilder_1.default(url, {
            headers: Object.assign({}, this.headers),
            schema: this.schemaName,
            fetch: this.fetch,
        });
    }
    /**
     * Select a schema to query or perform an function (rpc) call.
     *
     * The schema needs to be on the list of exposed schemas inside Supabase.
     *
     * @param schema - The schema to query
     */
    schema(schema) {
        return new PostgrestClient(this.url, {
            headers: this.headers,
            schema,
            fetch: this.fetch,
        });
    }
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.get - When set to `true`, the function will be called with
     * read-only access mode.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    rpc(fn, args = {}, { head = false, get = false, count, } = {}) {
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        if (head || get) {
            method = head ? 'HEAD' : 'GET';
            Object.entries(args)
                // params with undefined value needs to be filtered out, otherwise it'll
                // show up as `?param=undefined`
                .filter(([_, value]) => value !== undefined)
                // array values need special syntax
                .map(([name, value]) => [name, Array.isArray(value) ? `{${value.join(',')}}` : `${value}`])
                .forEach(([name, value]) => {
                url.searchParams.append(name, value);
            });
        }
        else {
            method = 'POST';
            body = args;
        }
        const headers = Object.assign({}, this.headers);
        if (count) {
            headers['Prefer'] = `count=${count}`;
        }
        return new PostgrestFilterBuilder_1.default({
            method,
            url,
            headers,
            schema: this.schemaName,
            body,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
}
exports["default"] = PostgrestClient;
//# sourceMappingURL=PostgrestClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js":
/*!************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Error format
 *
 * {@link https://postgrest.org/en/stable/api.html?highlight=options#errors-and-http-status-codes}
 */
class PostgrestError extends Error {
    constructor(context) {
        super(context.message);
        this.name = 'PostgrestError';
        this.details = context.details;
        this.hint = context.hint;
        this.code = context.code;
    }
}
exports["default"] = PostgrestError;
//# sourceMappingURL=PostgrestError.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const PostgrestTransformBuilder_1 = __importDefault(__webpack_require__(/*! ./PostgrestTransformBuilder */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js"));
class PostgrestFilterBuilder extends PostgrestTransformBuilder_1.default {
    /**
     * Match only rows where `column` is equal to `value`.
     *
     * To check if the value of `column` is NULL, you should use `.is()` instead.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is not equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is greater than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is greater than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is less than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is less than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-sensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    like(column, pattern) {
        this.url.searchParams.append(column, `like.${pattern}`);
        return this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-insensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    ilike(column, pattern) {
        this.url.searchParams.append(column, `ilike.${pattern}`);
        return this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(',')}}`);
        return this;
    }
    /**
     * Match only rows where `column` IS `value`.
     *
     * For non-boolean columns, this is only relevant for checking if the value of
     * `column` is NULL by setting `value` to `null`.
     *
     * For boolean columns, you can also set `value` to `true` or `false` and it
     * will behave the same way as `.eq()`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is included in the `values` array.
     *
     * @param column - The column to filter on
     * @param values - The values array to filter with
     */
    in(column, values) {
        const cleanedValues = Array.from(new Set(values))
            .map((s) => {
            // handle postgrest reserved characters
            // https://postgrest.org/en/v7.0.0/api.html#reserved-characters
            if (typeof s === 'string' && new RegExp('[,()]').test(s))
                return `"${s}"`;
            else
                return `${s}`;
        })
            .join(',');
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * `column` contains every element appearing in `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    contains(column, value) {
        if (typeof value === 'string') {
            // range types can be inclusive '[', ']' or exclusive '(', ')' so just
            // keep it simple and accept a string
            this.url.searchParams.append(column, `cs.${value}`);
        }
        else if (Array.isArray(value)) {
            // array
            this.url.searchParams.append(column, `cs.{${value.join(',')}}`);
        }
        else {
            // json
            this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        }
        return this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * every element appearing in `column` is contained by `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    containedBy(column, value) {
        if (typeof value === 'string') {
            // range
            this.url.searchParams.append(column, `cd.${value}`);
        }
        else if (Array.isArray(value)) {
            // array
            this.url.searchParams.append(column, `cd.{${value.join(',')}}`);
        }
        else {
            // json
            this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        }
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is greater than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or greater than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is less than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or less than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where `column` is
     * mutually exclusive to `range` and there can be no element between the two
     * ranges.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
    }
    /**
     * Only relevant for array and range columns. Match only rows where
     * `column` and `value` have an element in common.
     *
     * @param column - The array or range column to filter on
     * @param value - The array or range value to filter with
     */
    overlaps(column, value) {
        if (typeof value === 'string') {
            // range
            this.url.searchParams.append(column, `ov.${value}`);
        }
        else {
            // array
            this.url.searchParams.append(column, `ov.{${value.join(',')}}`);
        }
        return this;
    }
    /**
     * Only relevant for text and tsvector columns. Match only rows where
     * `column` matches the query string in `query`.
     *
     * @param column - The text or tsvector column to filter on
     * @param query - The query text to match with
     * @param options - Named parameters
     * @param options.config - The text search configuration to use
     * @param options.type - Change how the `query` text is interpreted
     */
    textSearch(column, query, { config, type } = {}) {
        let typePart = '';
        if (type === 'plain') {
            typePart = 'pl';
        }
        else if (type === 'phrase') {
            typePart = 'ph';
        }
        else if (type === 'websearch') {
            typePart = 'w';
        }
        const configPart = config === undefined ? '' : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
    }
    /**
     * Match only rows where each column in `query` keys is equal to its
     * associated value. Shorthand for multiple `.eq()`s.
     *
     * @param query - The object to filter with, with column names as keys mapped
     * to their filter values
     */
    match(query) {
        Object.entries(query).forEach(([column, value]) => {
            this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
    }
    /**
     * Match only rows which doesn't satisfy the filter.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to be negated to filter with, following
     * PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */
    not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
    }
    /**
     * Match only rows which satisfy at least one of the filters.
     *
     * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure it's properly sanitized.
     *
     * It's currently not possible to do an `.or()` filter across multiple tables.
     *
     * @param filters - The filters to use, following PostgREST syntax
     * @param options - Named parameters
     * @param options.referencedTable - Set this to filter on referenced tables
     * instead of the parent table
     * @param options.foreignTable - Deprecated, use `referencedTable` instead
     */
    or(filters, { foreignTable, referencedTable = foreignTable, } = {}) {
        const key = referencedTable ? `${referencedTable}.or` : 'or';
        this.url.searchParams.append(key, `(${filters})`);
        return this;
    }
    /**
     * Match only rows which satisfy the filter. This is an escape hatch - you
     * should use the specific filter methods wherever possible.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to filter with, following PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */
    filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
    }
}
exports["default"] = PostgrestFilterBuilder;
//# sourceMappingURL=PostgrestFilterBuilder.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const PostgrestFilterBuilder_1 = __importDefault(__webpack_require__(/*! ./PostgrestFilterBuilder */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js"));
class PostgrestQueryBuilder {
    constructor(url, { headers = {}, schema, fetch, }) {
        this.url = url;
        this.headers = headers;
        this.schema = schema;
        this.fetch = fetch;
    }
    /**
     * Perform a SELECT query on the table or view.
     *
     * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
     *
     * @param options - Named parameters
     *
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     *
     * @param options.count - Count algorithm to use to count rows in the table or view.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    select(columns, { head = false, count, } = {}) {
        const method = head ? 'HEAD' : 'GET';
        // Remove whitespaces except when quoted
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : '*')
            .split('')
            .map((c) => {
            if (/\s/.test(c) && !quoted) {
                return '';
            }
            if (c === '"') {
                quoted = !quoted;
            }
            return c;
        })
            .join('');
        this.url.searchParams.set('select', cleanedColumns);
        if (count) {
            this.headers['Prefer'] = `count=${count}`;
        }
        return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
    /**
     * Perform an INSERT into the table or view.
     *
     * By default, inserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to insert. Pass an object to insert a single row
     * or an array to insert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count inserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. Only applies for bulk
     * inserts.
     */
    insert(values, { count, defaultToNull = true, } = {}) {
        const method = 'POST';
        const prefersHeaders = [];
        if (this.headers['Prefer']) {
            prefersHeaders.push(this.headers['Prefer']);
        }
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
            prefersHeaders.push('missing=default');
        }
        this.headers['Prefer'] = prefersHeaders.join(',');
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
                this.url.searchParams.set('columns', uniqueColumns.join(','));
            }
        }
        return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
    /**
     * Perform an UPSERT on the table or view. Depending on the column(s) passed
     * to `onConflict`, `.upsert()` allows you to perform the equivalent of
     * `.insert()` if a row with the corresponding `onConflict` columns doesn't
     * exist, or if it does exist, perform an alternative action depending on
     * `ignoreDuplicates`.
     *
     * By default, upserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to upsert with. Pass an object to upsert a
     * single row or an array to upsert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
     * duplicate rows are determined. Two rows are duplicates if all the
     * `onConflict` columns are equal.
     *
     * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
     * `false`, duplicate rows are merged with existing rows.
     *
     * @param options.count - Count algorithm to use to count upserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. This only applies when
     * inserting new rows, not when merging with existing rows under
     * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
     */
    upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true, } = {}) {
        const method = 'POST';
        const prefersHeaders = [`resolution=${ignoreDuplicates ? 'ignore' : 'merge'}-duplicates`];
        if (onConflict !== undefined)
            this.url.searchParams.set('on_conflict', onConflict);
        if (this.headers['Prefer']) {
            prefersHeaders.push(this.headers['Prefer']);
        }
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
            prefersHeaders.push('missing=default');
        }
        this.headers['Prefer'] = prefersHeaders.join(',');
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
                this.url.searchParams.set('columns', uniqueColumns.join(','));
            }
        }
        return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
    /**
     * Perform an UPDATE on the table or view.
     *
     * By default, updated rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param values - The values to update with
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count updated rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    update(values, { count, } = {}) {
        const method = 'PATCH';
        const prefersHeaders = [];
        if (this.headers['Prefer']) {
            prefersHeaders.push(this.headers['Prefer']);
        }
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        this.headers['Prefer'] = prefersHeaders.join(',');
        return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
    /**
     * Perform a DELETE on the table or view.
     *
     * By default, deleted rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count deleted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    delete({ count, } = {}) {
        const method = 'DELETE';
        const prefersHeaders = [];
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        if (this.headers['Prefer']) {
            prefersHeaders.unshift(this.headers['Prefer']);
        }
        this.headers['Prefer'] = prefersHeaders.join(',');
        return new PostgrestFilterBuilder_1.default({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: false,
        });
    }
}
exports["default"] = PostgrestQueryBuilder;
//# sourceMappingURL=PostgrestQueryBuilder.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const PostgrestBuilder_1 = __importDefault(__webpack_require__(/*! ./PostgrestBuilder */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js"));
class PostgrestTransformBuilder extends PostgrestBuilder_1.default {
    /**
     * Perform a SELECT on the query result.
     *
     * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
     * return modified rows. By calling this method, modified rows are returned in
     * `data`.
     *
     * @param columns - The columns to retrieve, separated by commas
     */
    select(columns) {
        // Remove whitespaces except when quoted
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : '*')
            .split('')
            .map((c) => {
            if (/\s/.test(c) && !quoted) {
                return '';
            }
            if (c === '"') {
                quoted = !quoted;
            }
            return c;
        })
            .join('');
        this.url.searchParams.set('select', cleanedColumns);
        if (this.headers['Prefer']) {
            this.headers['Prefer'] += ',';
        }
        this.headers['Prefer'] += 'return=representation';
        return this;
    }
    /**
     * Order the query result by `column`.
     *
     * You can call this method multiple times to order by multiple columns.
     *
     * You can order referenced tables, but it only affects the ordering of the
     * parent table if you use `!inner` in the query.
     *
     * @param column - The column to order by
     * @param options - Named parameters
     * @param options.ascending - If `true`, the result will be in ascending order
     * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
     * `null`s appear last.
     * @param options.referencedTable - Set this to order a referenced table by
     * its columns
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable, } = {}) {
        const key = referencedTable ? `${referencedTable}.order` : 'order';
        const existingOrder = this.url.searchParams.get(key);
        this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ''}${column}.${ascending ? 'asc' : 'desc'}${nullsFirst === undefined ? '' : nullsFirst ? '.nullsfirst' : '.nullslast'}`);
        return this;
    }
    /**
     * Limit the query result by `count`.
     *
     * @param count - The maximum number of rows to return
     * @param options - Named parameters
     * @param options.referencedTable - Set this to limit rows of referenced
     * tables instead of the parent table
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    limit(count, { foreignTable, referencedTable = foreignTable, } = {}) {
        const key = typeof referencedTable === 'undefined' ? 'limit' : `${referencedTable}.limit`;
        this.url.searchParams.set(key, `${count}`);
        return this;
    }
    /**
     * Limit the query result by starting at an offset `from` and ending at the offset `to`.
     * Only records within this range are returned.
     * This respects the query order and if there is no order clause the range could behave unexpectedly.
     * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
     * and fourth rows of the query.
     *
     * @param from - The starting index from which to limit the result
     * @param to - The last index to which to limit the result
     * @param options - Named parameters
     * @param options.referencedTable - Set this to limit rows of referenced
     * tables instead of the parent table
     * @param options.foreignTable - Deprecated, use `options.referencedTable`
     * instead
     */
    range(from, to, { foreignTable, referencedTable = foreignTable, } = {}) {
        const keyOffset = typeof referencedTable === 'undefined' ? 'offset' : `${referencedTable}.offset`;
        const keyLimit = typeof referencedTable === 'undefined' ? 'limit' : `${referencedTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        // Range is inclusive, so add 1
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
    }
    /**
     * Set the AbortSignal for the fetch request.
     *
     * @param signal - The AbortSignal to use for the fetch request
     */
    abortSignal(signal) {
        this.signal = signal;
        return this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be one row (e.g. using `.limit(1)`), otherwise this
     * returns an error.
     */
    single() {
        this.headers['Accept'] = 'application/vnd.pgrst.object+json';
        return this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
     * this returns an error.
     */
    maybeSingle() {
        // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
        // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
        if (this.method === 'GET') {
            this.headers['Accept'] = 'application/json';
        }
        else {
            this.headers['Accept'] = 'application/vnd.pgrst.object+json';
        }
        this.isMaybeSingle = true;
        return this;
    }
    /**
     * Return `data` as a string in CSV format.
     */
    csv() {
        this.headers['Accept'] = 'text/csv';
        return this;
    }
    /**
     * Return `data` as an object in [GeoJSON](https://geojson.org) format.
     */
    geojson() {
        this.headers['Accept'] = 'application/geo+json';
        return this;
    }
    /**
     * Return `data` as the EXPLAIN plan for the query.
     *
     * You need to enable the
     * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
     * setting before using this method.
     *
     * @param options - Named parameters
     *
     * @param options.analyze - If `true`, the query will be executed and the
     * actual run time will be returned
     *
     * @param options.verbose - If `true`, the query identifier will be returned
     * and `data` will include the output columns of the query
     *
     * @param options.settings - If `true`, include information on configuration
     * parameters that affect query planning
     *
     * @param options.buffers - If `true`, include information on buffer usage
     *
     * @param options.wal - If `true`, include information on WAL record generation
     *
     * @param options.format - The format of the output, can be `"text"` (default)
     * or `"json"`
     */
    explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = 'text', } = {}) {
        var _a;
        const options = [
            analyze ? 'analyze' : null,
            verbose ? 'verbose' : null,
            settings ? 'settings' : null,
            buffers ? 'buffers' : null,
            wal ? 'wal' : null,
        ]
            .filter(Boolean)
            .join('|');
        // An Accept header can carry multiple media types but postgrest-js always sends one
        const forMediatype = (_a = this.headers['Accept']) !== null && _a !== void 0 ? _a : 'application/json';
        this.headers['Accept'] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`;
        if (format === 'json')
            return this;
        else
            return this;
    }
    /**
     * Rollback the query.
     *
     * `data` will still be returned, but the query is not committed.
     */
    rollback() {
        var _a;
        if (((_a = this.headers['Prefer']) !== null && _a !== void 0 ? _a : '').trim().length > 0) {
            this.headers['Prefer'] += ',tx=rollback';
        }
        else {
            this.headers['Prefer'] = 'tx=rollback';
        }
        return this;
    }
    /**
     * Override the type of the returned `data`.
     *
     * @typeParam NewResult - The new result type to override with
     * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
     */
    returns() {
        return this;
    }
}
exports["default"] = PostgrestTransformBuilder;
//# sourceMappingURL=PostgrestTransformBuilder.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/cjs/constants.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/cjs/constants.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_HEADERS = void 0;
const version_1 = __webpack_require__(/*! ./version */ "./node_modules/@supabase/postgrest-js/dist/cjs/version.js");
exports.DEFAULT_HEADERS = { 'X-Client-Info': `postgrest-js/${version_1.version}` };
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/cjs/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/cjs/index.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgrestError = exports.PostgrestBuilder = exports.PostgrestTransformBuilder = exports.PostgrestFilterBuilder = exports.PostgrestQueryBuilder = exports.PostgrestClient = void 0;
// Always update wrapper.mjs when updating this file.
const PostgrestClient_1 = __importDefault(__webpack_require__(/*! ./PostgrestClient */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestClient.js"));
exports.PostgrestClient = PostgrestClient_1.default;
const PostgrestQueryBuilder_1 = __importDefault(__webpack_require__(/*! ./PostgrestQueryBuilder */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestQueryBuilder.js"));
exports.PostgrestQueryBuilder = PostgrestQueryBuilder_1.default;
const PostgrestFilterBuilder_1 = __importDefault(__webpack_require__(/*! ./PostgrestFilterBuilder */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestFilterBuilder.js"));
exports.PostgrestFilterBuilder = PostgrestFilterBuilder_1.default;
const PostgrestTransformBuilder_1 = __importDefault(__webpack_require__(/*! ./PostgrestTransformBuilder */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestTransformBuilder.js"));
exports.PostgrestTransformBuilder = PostgrestTransformBuilder_1.default;
const PostgrestBuilder_1 = __importDefault(__webpack_require__(/*! ./PostgrestBuilder */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestBuilder.js"));
exports.PostgrestBuilder = PostgrestBuilder_1.default;
const PostgrestError_1 = __importDefault(__webpack_require__(/*! ./PostgrestError */ "./node_modules/@supabase/postgrest-js/dist/cjs/PostgrestError.js"));
exports.PostgrestError = PostgrestError_1.default;
exports["default"] = {
    PostgrestClient: PostgrestClient_1.default,
    PostgrestQueryBuilder: PostgrestQueryBuilder_1.default,
    PostgrestFilterBuilder: PostgrestFilterBuilder_1.default,
    PostgrestTransformBuilder: PostgrestTransformBuilder_1.default,
    PostgrestBuilder: PostgrestBuilder_1.default,
    PostgrestError: PostgrestError_1.default,
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/cjs/version.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/cjs/version.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.version = void 0;
exports.version = '0.0.0-automated';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@supabase/postgrest-js/dist/esm/wrapper.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/@supabase/postgrest-js/dist/esm/wrapper.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PostgrestClient: () => (/* binding */ PostgrestClient)
/* harmony export */ });
/* unused harmony exports PostgrestBuilder, PostgrestFilterBuilder, PostgrestQueryBuilder, PostgrestTransformBuilder, PostgrestError */
/* harmony import */ var _cjs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cjs/index.js */ "./node_modules/@supabase/postgrest-js/dist/cjs/index.js");

const {
  PostgrestClient,
  PostgrestQueryBuilder,
  PostgrestFilterBuilder,
  PostgrestTransformBuilder,
  PostgrestBuilder,
  PostgrestError,
} = _cjs_index_js__WEBPACK_IMPORTED_MODULE_0__



// compatibility with CJS output
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  PostgrestClient,
  PostgrestQueryBuilder,
  PostgrestFilterBuilder,
  PostgrestTransformBuilder,
  PostgrestBuilder,
  PostgrestError,
});


/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RealtimeChannel)
/* harmony export */ });
/* unused harmony exports REALTIME_POSTGRES_CHANGES_LISTEN_EVENT, REALTIME_LISTEN_TYPES, REALTIME_SUBSCRIBE_STATES, REALTIME_CHANNEL_STATES */
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/constants */ "./node_modules/@supabase/realtime-js/dist/module/lib/constants.js");
/* harmony import */ var _lib_push__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/push */ "./node_modules/@supabase/realtime-js/dist/module/lib/push.js");
/* harmony import */ var _lib_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/timer */ "./node_modules/@supabase/realtime-js/dist/module/lib/timer.js");
/* harmony import */ var _RealtimePresence__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RealtimePresence */ "./node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js");
/* harmony import */ var _lib_transformers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/transformers */ "./node_modules/@supabase/realtime-js/dist/module/lib/transformers.js");






var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function (REALTIME_LISTEN_TYPES) {
    REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
    REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
    REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
    REALTIME_LISTEN_TYPES["SYSTEM"] = "system";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function (REALTIME_SUBSCRIBE_STATES) {
    REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
    REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
    REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
    REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
const REALTIME_CHANNEL_STATES = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES;
/** A channel is the basic building block of Realtime
 * and narrows the scope of data flow to subscribed clients.
 * You can think of a channel as a chatroom where participants are able to see who's online
 * and send and receive messages.
 */
class RealtimeChannel {
    constructor(
    /** Topic name can be any string. */
    topic, params = { config: {} }, socket) {
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.closed;
        this.joinedOnce = false;
        this.pushBuffer = [];
        this.subTopic = topic.replace(/^realtime:/i, '');
        this.params.config = Object.assign({
            broadcast: { ack: false, self: false },
            presence: { key: '' },
            private: false,
        }, params.config);
        this.timeout = this.socket.timeout;
        this.joinPush = new _lib_push__WEBPACK_IMPORTED_MODULE_1__["default"](this, _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.join, this.params, this.timeout);
        this.rejoinTimer = new _lib_timer__WEBPACK_IMPORTED_MODULE_2__["default"](() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive('ok', () => {
            this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.joined;
            this.rejoinTimer.reset();
            this.pushBuffer.forEach((pushEvent) => pushEvent.send());
            this.pushBuffer = [];
        });
        this._onClose(() => {
            this.rejoinTimer.reset();
            this.socket.log('channel', `close ${this.topic} ${this._joinRef()}`);
            this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.closed;
            this.socket._remove(this);
        });
        this._onError((reason) => {
            if (this._isLeaving() || this._isClosed()) {
                return;
            }
            this.socket.log('channel', `error ${this.topic}`, reason);
            this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive('timeout', () => {
            if (!this._isJoining()) {
                return;
            }
            this.socket.log('channel', `timeout ${this.topic}`, this.joinPush.timeout);
            this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this._on(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.reply, {}, (payload, ref) => {
            this._trigger(this._replyEventName(ref), payload);
        });
        this.presence = new _RealtimePresence__WEBPACK_IMPORTED_MODULE_3__["default"](this);
        this.broadcastEndpointURL =
            (0,_lib_transformers__WEBPACK_IMPORTED_MODULE_4__.httpEndpointURL)(this.socket.endPoint) + '/api/broadcast';
        this.private = this.params.config.private || false;
    }
    /** Subscribe registers your client with the server */
    subscribe(callback, timeout = this.timeout) {
        var _a, _b;
        if (!this.socket.isConnected()) {
            this.socket.connect();
        }
        if (this.joinedOnce) {
            throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
        }
        else {
            const { config: { broadcast, presence, private: isPrivate }, } = this.params;
            this._onError((e) => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, e));
            this._onClose(() => callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CLOSED));
            const accessTokenPayload = {};
            const config = {
                broadcast,
                presence,
                postgres_changes: (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r) => r.filter)) !== null && _b !== void 0 ? _b : [],
                private: isPrivate,
            };
            if (this.socket.accessTokenValue) {
                accessTokenPayload.access_token = this.socket.accessTokenValue;
            }
            this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
            this.joinedOnce = true;
            this._rejoin(timeout);
            this.joinPush
                .receive('ok', async ({ postgres_changes }) => {
                var _a;
                this.socket.setAuth();
                if (postgres_changes === undefined) {
                    callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
                    return;
                }
                else {
                    const clientPostgresBindings = this.bindings.postgres_changes;
                    const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a !== void 0 ? _a : 0;
                    const newPostgresBindings = [];
                    for (let i = 0; i < bindingsLen; i++) {
                        const clientPostgresBinding = clientPostgresBindings[i];
                        const { filter: { event, schema, table, filter }, } = clientPostgresBinding;
                        const serverPostgresFilter = postgres_changes && postgres_changes[i];
                        if (serverPostgresFilter &&
                            serverPostgresFilter.event === event &&
                            serverPostgresFilter.schema === schema &&
                            serverPostgresFilter.table === table &&
                            serverPostgresFilter.filter === filter) {
                            newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
                        }
                        else {
                            this.unsubscribe();
                            callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error('mismatch between server and client bindings for postgres changes'));
                            return;
                        }
                    }
                    this.bindings.postgres_changes = newPostgresBindings;
                    callback && callback(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
                    return;
                }
            })
                .receive('error', (error) => {
                callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(error).join(', ') || 'error')));
                return;
            })
                .receive('timeout', () => {
                callback === null || callback === void 0 ? void 0 : callback(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
                return;
            });
        }
        return this;
    }
    presenceState() {
        return this.presence.state;
    }
    async track(payload, opts = {}) {
        return await this.send({
            type: 'presence',
            event: 'track',
            payload,
        }, opts.timeout || this.timeout);
    }
    async untrack(opts = {}) {
        return await this.send({
            type: 'presence',
            event: 'untrack',
        }, opts);
    }
    on(type, filter, callback) {
        return this._on(type, filter, callback);
    }
    /**
     * Sends a message into the channel.
     *
     * @param args Arguments to send to channel
     * @param args.type The type of event to send
     * @param args.event The name of the event being sent
     * @param args.payload Payload to be sent
     * @param opts Options to be used during the send process
     */
    async send(args, opts = {}) {
        var _a, _b;
        if (!this._canPush() && args.type === 'broadcast') {
            const { event, payload: endpoint_payload } = args;
            const authorization = this.socket.accessTokenValue
                ? `Bearer ${this.socket.accessTokenValue}`
                : '';
            const options = {
                method: 'POST',
                headers: {
                    Authorization: authorization,
                    apikey: this.socket.apiKey ? this.socket.apiKey : '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            topic: this.subTopic,
                            event,
                            payload: endpoint_payload,
                            private: this.private,
                        },
                    ],
                }),
            };
            try {
                const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options, (_a = opts.timeout) !== null && _a !== void 0 ? _a : this.timeout);
                await ((_b = response.body) === null || _b === void 0 ? void 0 : _b.cancel());
                return response.ok ? 'ok' : 'error';
            }
            catch (error) {
                if (error.name === 'AbortError') {
                    return 'timed out';
                }
                else {
                    return 'error';
                }
            }
        }
        else {
            return new Promise((resolve) => {
                var _a, _b, _c;
                const push = this._push(args.type, args, opts.timeout || this.timeout);
                if (args.type === 'broadcast' && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
                    resolve('ok');
                }
                push.receive('ok', () => resolve('ok'));
                push.receive('error', () => resolve('error'));
                push.receive('timeout', () => resolve('timed out'));
            });
        }
    }
    updateJoinPayload(payload) {
        this.joinPush.updatePayload(payload);
    }
    /**
     * Leaves the channel.
     *
     * Unsubscribes from server events, and instructs channel to terminate on server.
     * Triggers onClose() hooks.
     *
     * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
     * channel.unsubscribe().receive("ok", () => alert("left!") )
     */
    unsubscribe(timeout = this.timeout) {
        this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.leaving;
        const onClose = () => {
            this.socket.log('channel', `leave ${this.topic}`);
            this._trigger(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.close, 'leave', this._joinRef());
        };
        this.rejoinTimer.reset();
        // Destroy joinPush to avoid connection timeouts during unscription phase
        this.joinPush.destroy();
        return new Promise((resolve) => {
            const leavePush = new _lib_push__WEBPACK_IMPORTED_MODULE_1__["default"](this, _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.leave, {}, timeout);
            leavePush
                .receive('ok', () => {
                onClose();
                resolve('ok');
            })
                .receive('timeout', () => {
                onClose();
                resolve('timed out');
            })
                .receive('error', () => {
                resolve('error');
            });
            leavePush.send();
            if (!this._canPush()) {
                leavePush.trigger('ok', {});
            }
        });
    }
    /** @internal */
    async _fetchWithTimeout(url, options, timeout) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options), { signal: controller.signal }));
        clearTimeout(id);
        return response;
    }
    /** @internal */
    _push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) {
            throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        }
        let pushEvent = new _lib_push__WEBPACK_IMPORTED_MODULE_1__["default"](this, event, payload, timeout);
        if (this._canPush()) {
            pushEvent.send();
        }
        else {
            pushEvent.startTimeout();
            this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling before dispatching to the channel callbacks.
     * Must return the payload, modified or unmodified.
     *
     * @internal
     */
    _onMessage(_event, payload, _ref) {
        return payload;
    }
    /** @internal */
    _isMember(topic) {
        return this.topic === topic;
    }
    /** @internal */
    _joinRef() {
        return this.joinPush.ref;
    }
    /** @internal */
    _trigger(type, payload, ref) {
        var _a, _b;
        const typeLower = type.toLocaleLowerCase();
        const { close, error, leave, join } = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS;
        const events = [close, error, leave, join];
        if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
            return;
        }
        let handledPayload = this._onMessage(typeLower, payload, ref);
        if (payload && !handledPayload) {
            throw 'channel onMessage callbacks must return the payload, modified or unmodified';
        }
        if (['insert', 'update', 'delete'].includes(typeLower)) {
            (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind) => {
                var _a, _b, _c;
                return (((_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event) === '*' ||
                    ((_c = (_b = bind.filter) === null || _b === void 0 ? void 0 : _b.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower);
            }).map((bind) => bind.callback(handledPayload, ref));
        }
        else {
            (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
                var _a, _b, _c, _d, _e, _f;
                if (['broadcast', 'presence', 'postgres_changes'].includes(typeLower)) {
                    if ('id' in bind) {
                        const bindId = bind.id;
                        const bindEvent = (_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event;
                        return (bindId &&
                            ((_b = payload.ids) === null || _b === void 0 ? void 0 : _b.includes(bindId)) &&
                            (bindEvent === '*' ||
                                (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) ===
                                    ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase())));
                    }
                    else {
                        const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                        return (bindEvent === '*' ||
                            bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase()));
                    }
                }
                else {
                    return bind.type.toLocaleLowerCase() === typeLower;
                }
            }).map((bind) => {
                if (typeof handledPayload === 'object' && 'ids' in handledPayload) {
                    const postgresChanges = handledPayload.data;
                    const { schema, table, commit_timestamp, type, errors } = postgresChanges;
                    const enrichedPayload = {
                        schema: schema,
                        table: table,
                        commit_timestamp: commit_timestamp,
                        eventType: type,
                        new: {},
                        old: {},
                        errors: errors,
                    };
                    handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
                }
                bind.callback(handledPayload, ref);
            });
        }
    }
    /** @internal */
    _isClosed() {
        return this.state === _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.closed;
    }
    /** @internal */
    _isJoined() {
        return this.state === _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.joined;
    }
    /** @internal */
    _isJoining() {
        return this.state === _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.joining;
    }
    /** @internal */
    _isLeaving() {
        return this.state === _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.leaving;
    }
    /** @internal */
    _replyEventName(ref) {
        return `chan_reply_${ref}`;
    }
    /** @internal */
    _on(type, filter, callback) {
        const typeLower = type.toLocaleLowerCase();
        const binding = {
            type: typeLower,
            filter: filter,
            callback: callback,
        };
        if (this.bindings[typeLower]) {
            this.bindings[typeLower].push(binding);
        }
        else {
            this.bindings[typeLower] = [binding];
        }
        return this;
    }
    /** @internal */
    _off(type, filter) {
        const typeLower = type.toLocaleLowerCase();
        this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
            var _a;
            return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower &&
                RealtimeChannel.isEqual(bind.filter, filter));
        });
        return this;
    }
    /** @internal */
    static isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        for (const k in obj1) {
            if (obj1[k] !== obj2[k]) {
                return false;
            }
        }
        return true;
    }
    /** @internal */
    _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();
        if (this.socket.isConnected()) {
            this._rejoin();
        }
    }
    /**
     * Registers a callback that will be executed when the channel closes.
     *
     * @internal
     */
    _onClose(callback) {
        this._on(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.close, {}, callback);
    }
    /**
     * Registers a callback that will be executed when the channel encounteres an error.
     *
     * @internal
     */
    _onError(callback) {
        this._on(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
    }
    /**
     * Returns `true` if the socket is connected and the channel has been joined.
     *
     * @internal
     */
    _canPush() {
        return this.socket.isConnected() && this._isJoined();
    }
    /** @internal */
    _rejoin(timeout = this.timeout) {
        if (this._isLeaving()) {
            return;
        }
        this.socket._leaveOpenTopic(this.topic);
        this.state = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
    }
    /** @internal */
    _getPayloadRecords(payload) {
        const records = {
            new: {},
            old: {},
        };
        if (payload.type === 'INSERT' || payload.type === 'UPDATE') {
            records.new = _lib_transformers__WEBPACK_IMPORTED_MODULE_4__.convertChangeData(payload.columns, payload.record);
        }
        if (payload.type === 'UPDATE' || payload.type === 'DELETE') {
            records.old = _lib_transformers__WEBPACK_IMPORTED_MODULE_4__.convertChangeData(payload.columns, payload.old_record);
        }
        return records;
    }
}
//# sourceMappingURL=RealtimeChannel.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RealtimeClient)
/* harmony export */ });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/constants */ "./node_modules/@supabase/realtime-js/dist/module/lib/constants.js");
/* harmony import */ var _lib_serializer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/serializer */ "./node_modules/@supabase/realtime-js/dist/module/lib/serializer.js");
/* harmony import */ var _lib_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/timer */ "./node_modules/@supabase/realtime-js/dist/module/lib/timer.js");
/* harmony import */ var _lib_transformers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/transformers */ "./node_modules/@supabase/realtime-js/dist/module/lib/transformers.js");
/* harmony import */ var _RealtimeChannel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RealtimeChannel */ "./node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js");





const noop = () => { };
const NATIVE_WEBSOCKET_AVAILABLE = typeof WebSocket !== 'undefined';
const WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class RealtimeClient {
    /**
     * Initializes the Socket.
     *
     * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
     * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
     * @param options.transport The Websocket Transport, for example WebSocket.
     * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
     * @param options.params The optional params to pass when connecting.
     * @param options.headers The optional headers to pass when connecting.
     * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
     * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
     * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
     * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
     * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
     * @param options.worker Use Web Worker to set a side flow. Defaults to false.
     * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
     */
    constructor(endPoint, options) {
        var _a;
        this.accessTokenValue = null;
        this.apiKey = null;
        this.channels = [];
        this.endPoint = '';
        this.httpEndpoint = '';
        this.headers = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_HEADERS;
        this.params = {};
        this.timeout = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_TIMEOUT;
        this.heartbeatIntervalMs = 30000;
        this.heartbeatTimer = undefined;
        this.pendingHeartbeatRef = null;
        this.ref = 0;
        this.logger = noop;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new _lib_serializer__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: [],
        };
        this.accessToken = null;
        /**
         * Use either custom fetch, if provided, or default fetch to make HTTP requests
         *
         * @internal
         */
        this._resolveFetch = (customFetch) => {
            let _fetch;
            if (customFetch) {
                _fetch = customFetch;
            }
            else if (typeof fetch === 'undefined') {
                _fetch = (...args) => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @supabase/node-fetch */ "./node_modules/@supabase/node-fetch/browser.js")).then(({ default: fetch }) => fetch(...args));
            }
            else {
                _fetch = fetch;
            }
            return (...args) => _fetch(...args);
        };
        this.endPoint = `${endPoint}/${_lib_constants__WEBPACK_IMPORTED_MODULE_0__.TRANSPORTS.websocket}`;
        this.httpEndpoint = (0,_lib_transformers__WEBPACK_IMPORTED_MODULE_3__.httpEndpointURL)(endPoint);
        if (options === null || options === void 0 ? void 0 : options.transport) {
            this.transport = options.transport;
        }
        else {
            this.transport = null;
        }
        if (options === null || options === void 0 ? void 0 : options.params)
            this.params = options.params;
        if (options === null || options === void 0 ? void 0 : options.headers)
            this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
        if (options === null || options === void 0 ? void 0 : options.timeout)
            this.timeout = options.timeout;
        if (options === null || options === void 0 ? void 0 : options.logger)
            this.logger = options.logger;
        if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs)
            this.heartbeatIntervalMs = options.heartbeatIntervalMs;
        const accessTokenValue = (_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.apikey;
        if (accessTokenValue) {
            this.accessTokenValue = accessTokenValue;
            this.apiKey = accessTokenValue;
        }
        this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs)
            ? options.reconnectAfterMs
            : (tries) => {
                return [1000, 2000, 5000, 10000][tries - 1] || 10000;
            };
        this.encode = (options === null || options === void 0 ? void 0 : options.encode)
            ? options.encode
            : (payload, callback) => {
                return callback(JSON.stringify(payload));
            };
        this.decode = (options === null || options === void 0 ? void 0 : options.decode)
            ? options.decode
            : this.serializer.decode.bind(this.serializer);
        this.reconnectTimer = new _lib_timer__WEBPACK_IMPORTED_MODULE_2__["default"](async () => {
            this.disconnect();
            this.connect();
        }, this.reconnectAfterMs);
        this.fetch = this._resolveFetch(options === null || options === void 0 ? void 0 : options.fetch);
        if (options === null || options === void 0 ? void 0 : options.worker) {
            if (typeof window !== 'undefined' && !window.Worker) {
                throw new Error('Web Worker is not supported');
            }
            this.worker = (options === null || options === void 0 ? void 0 : options.worker) || false;
            this.workerUrl = options === null || options === void 0 ? void 0 : options.workerUrl;
        }
        this.accessToken = (options === null || options === void 0 ? void 0 : options.accessToken) || null;
    }
    /**
     * Connects the socket, unless already connected.
     */
    connect() {
        if (this.conn) {
            return;
        }
        if (this.transport) {
            this.conn = new this.transport(this.endpointURL(), undefined, {
                headers: this.headers,
            });
            return;
        }
        if (NATIVE_WEBSOCKET_AVAILABLE) {
            this.conn = new WebSocket(this.endpointURL());
            this.setupConnection();
            return;
        }
        this.conn = new WSWebSocketDummy(this.endpointURL(), undefined, {
            close: () => {
                this.conn = null;
            },
        });
        __webpack_require__.e(/*! import() */ "node_modules_ws_browser_js").then(__webpack_require__.t.bind(__webpack_require__, /*! ws */ "./node_modules/ws/browser.js", 23)).then(({ default: WS }) => {
            this.conn = new WS(this.endpointURL(), undefined, {
                headers: this.headers,
            });
            this.setupConnection();
        });
    }
    /**
     * Returns the URL of the websocket.
     * @returns string The URL of the websocket.
     */
    endpointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: _lib_constants__WEBPACK_IMPORTED_MODULE_0__.VSN }));
    }
    /**
     * Disconnects the socket.
     *
     * @param code A numeric status code to send on disconnect.
     * @param reason A custom reason for the disconnect.
     */
    disconnect(code, reason) {
        if (this.conn) {
            this.conn.onclose = function () { }; // noop
            if (code) {
                this.conn.close(code, reason !== null && reason !== void 0 ? reason : '');
            }
            else {
                this.conn.close();
            }
            this.conn = null;
            // remove open handles
            this.heartbeatTimer && clearInterval(this.heartbeatTimer);
            this.reconnectTimer.reset();
        }
    }
    /**
     * Returns all created channels
     */
    getChannels() {
        return this.channels;
    }
    /**
     * Unsubscribes and removes a single channel
     * @param channel A RealtimeChannel instance
     */
    async removeChannel(channel) {
        const status = await channel.unsubscribe();
        if (this.channels.length === 0) {
            this.disconnect();
        }
        return status;
    }
    /**
     * Unsubscribes and removes all channels
     */
    async removeAllChannels() {
        const values_1 = await Promise.all(this.channels.map((channel) => channel.unsubscribe()));
        this.disconnect();
        return values_1;
    }
    /**
     * Logs the message.
     *
     * For customized logging, `this.logger` can be overridden.
     */
    log(kind, msg, data) {
        this.logger(kind, msg, data);
    }
    /**
     * Returns the current state of the socket.
     */
    connectionState() {
        switch (this.conn && this.conn.readyState) {
            case _lib_constants__WEBPACK_IMPORTED_MODULE_0__.SOCKET_STATES.connecting:
                return _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CONNECTION_STATE.Connecting;
            case _lib_constants__WEBPACK_IMPORTED_MODULE_0__.SOCKET_STATES.open:
                return _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CONNECTION_STATE.Open;
            case _lib_constants__WEBPACK_IMPORTED_MODULE_0__.SOCKET_STATES.closing:
                return _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CONNECTION_STATE.Closing;
            default:
                return _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CONNECTION_STATE.Closed;
        }
    }
    /**
     * Returns `true` is the connection is open.
     */
    isConnected() {
        return this.connectionState() === _lib_constants__WEBPACK_IMPORTED_MODULE_0__.CONNECTION_STATE.Open;
    }
    channel(topic, params = { config: {} }) {
        const chan = new _RealtimeChannel__WEBPACK_IMPORTED_MODULE_4__["default"](`realtime:${topic}`, params, this);
        this.channels.push(chan);
        return chan;
    }
    /**
     * Push out a message if the socket is connected.
     *
     * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
     */
    push(data) {
        const { topic, event, payload, ref } = data;
        const callback = () => {
            this.encode(data, (result) => {
                var _a;
                (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
            });
        };
        this.log('push', `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
            callback();
        }
        else {
            this.sendBuffer.push(callback);
        }
    }
    /**
     * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
     *
     * If param is null it will use the `accessToken` callback function or the token set on the client.
     *
     * On callback used, it will set the value of the token internal to the client.
     *
     * @param token A JWT string to override the token set on the client.
     */
    async setAuth(token = null) {
        let tokenToSend = token ||
            (this.accessToken && (await this.accessToken())) ||
            this.accessTokenValue;
        if (tokenToSend) {
            let parsed = null;
            try {
                parsed = JSON.parse(atob(tokenToSend.split('.')[1]));
            }
            catch (_error) { }
            if (parsed && parsed.exp) {
                let now = Math.floor(Date.now() / 1000);
                let valid = now - parsed.exp < 0;
                if (!valid) {
                    this.log('auth', `InvalidJWTToken: Invalid value for JWT claim "exp" with value ${parsed.exp}`);
                    return Promise.reject(`InvalidJWTToken: Invalid value for JWT claim "exp" with value ${parsed.exp}`);
                }
            }
            this.accessTokenValue = tokenToSend;
            this.channels.forEach((channel) => {
                tokenToSend && channel.updateJoinPayload({ access_token: tokenToSend });
                if (channel.joinedOnce && channel._isJoined()) {
                    channel._push(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.access_token, {
                        access_token: tokenToSend,
                    });
                }
            });
        }
    }
    /**
     * Sends a heartbeat message if the socket is connected.
     */
    async sendHeartbeat() {
        var _a;
        if (!this.isConnected()) {
            return;
        }
        if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
            this.log('transport', 'heartbeat timeout. Attempting to re-establish connection');
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.WS_CLOSE_NORMAL, 'hearbeat timeout');
            return;
        }
        this.pendingHeartbeatRef = this._makeRef();
        this.push({
            topic: 'phoenix',
            event: 'heartbeat',
            payload: {},
            ref: this.pendingHeartbeatRef,
        });
        this.setAuth();
    }
    /**
     * Flushes send buffer
     */
    flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
            this.sendBuffer.forEach((callback) => callback());
            this.sendBuffer = [];
        }
    }
    /**
     * Return the next message ref, accounting for overflows
     *
     * @internal
     */
    _makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
            this.ref = 0;
        }
        else {
            this.ref = newRef;
        }
        return this.ref.toString();
    }
    /**
     * Unsubscribe from channels with the specified topic.
     *
     * @internal
     */
    _leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
        if (dupChannel) {
            this.log('transport', `leaving duplicate topic "${topic}"`);
            dupChannel.unsubscribe();
        }
    }
    /**
     * Removes a subscription from the socket.
     *
     * @param channel An open subscription.
     *
     * @internal
     */
    _remove(channel) {
        this.channels = this.channels.filter((c) => c._joinRef() !== channel._joinRef());
    }
    /**
     * Sets up connection handlers.
     *
     * @internal
     */
    setupConnection() {
        if (this.conn) {
            this.conn.binaryType = 'arraybuffer';
            this.conn.onopen = () => this._onConnOpen();
            this.conn.onerror = (error) => this._onConnError(error);
            this.conn.onmessage = (event) => this._onConnMessage(event);
            this.conn.onclose = (event) => this._onConnClose(event);
        }
    }
    /** @internal */
    _onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg) => {
            let { topic, event, payload, ref } = msg;
            if (ref && ref === this.pendingHeartbeatRef) {
                this.pendingHeartbeatRef = null;
            }
            this.log('receive', `${payload.status || ''} ${topic} ${event} ${(ref && '(' + ref + ')') || ''}`, payload);
            this.channels
                .filter((channel) => channel._isMember(topic))
                .forEach((channel) => channel._trigger(event, payload, ref));
            this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
        });
    }
    /** @internal */
    async _onConnOpen() {
        this.log('transport', `connected to ${this.endpointURL()}`);
        this.flushSendBuffer();
        this.reconnectTimer.reset();
        if (!this.worker) {
            this.heartbeatTimer && clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        else {
            if (this.workerUrl) {
                this.log('worker', `starting worker for from ${this.workerUrl}`);
            }
            else {
                this.log('worker', `starting default worker`);
            }
            const objectUrl = this._workerObjectUrl(this.workerUrl);
            this.workerRef = new Worker(objectUrl);
            this.workerRef.onerror = (error) => {
                this.log('worker', 'worker error', error.message);
                this.workerRef.terminate();
            };
            this.workerRef.onmessage = (event) => {
                if (event.data.event === 'keepAlive') {
                    this.sendHeartbeat();
                }
            };
            this.workerRef.postMessage({
                event: 'start',
                interval: this.heartbeatIntervalMs,
            });
        }
        this.stateChangeCallbacks.open.forEach((callback) => callback());
    }
    /** @internal */
    _onConnClose(event) {
        this.log('transport', 'close', event);
        this._triggerChanError();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.reconnectTimer.scheduleTimeout();
        this.stateChangeCallbacks.close.forEach((callback) => callback(event));
    }
    /** @internal */
    _onConnError(error) {
        this.log('transport', error.message);
        this._triggerChanError();
        this.stateChangeCallbacks.error.forEach((callback) => callback(error));
    }
    /** @internal */
    _triggerChanError() {
        this.channels.forEach((channel) => channel._trigger(_lib_constants__WEBPACK_IMPORTED_MODULE_0__.CHANNEL_EVENTS.error));
    }
    /** @internal */
    _appendParams(url, params) {
        if (Object.keys(params).length === 0) {
            return url;
        }
        const prefix = url.match(/\?/) ? '&' : '?';
        const query = new URLSearchParams(params);
        return `${url}${prefix}${query}`;
    }
    _workerObjectUrl(url) {
        let result_url;
        if (url) {
            result_url = url;
        }
        else {
            const blob = new Blob([WORKER_SCRIPT], { type: 'application/javascript' });
            result_url = URL.createObjectURL(blob);
        }
        return result_url;
    }
}
class WSWebSocketDummy {
    constructor(address, _protocols, options) {
        this.binaryType = 'arraybuffer';
        this.onclose = () => { };
        this.onerror = () => { };
        this.onmessage = () => { };
        this.onopen = () => { };
        this.readyState = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.SOCKET_STATES.connecting;
        this.send = () => { };
        this.url = null;
        this.url = address;
        this.close = options.close;
    }
}
//# sourceMappingURL=RealtimeClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RealtimePresence)
/* harmony export */ });
/* unused harmony export REALTIME_PRESENCE_LISTEN_EVENTS */
/*
  This file draws heavily from https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/assets/js/phoenix/presence.js
  License: https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/LICENSE.md
*/
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function (REALTIME_PRESENCE_LISTEN_EVENTS) {
    REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
    REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
    REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
class RealtimePresence {
    /**
     * Initializes the Presence.
     *
     * @param channel - The RealtimeChannel
     * @param opts - The options,
     *        for example `{events: {state: 'state', diff: 'diff'}}`
     */
    constructor(channel, opts) {
        this.channel = channel;
        this.state = {};
        this.pendingDiffs = [];
        this.joinRef = null;
        this.caller = {
            onJoin: () => { },
            onLeave: () => { },
            onSync: () => { },
        };
        const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
            state: 'presence_state',
            diff: 'presence_diff',
        };
        this.channel._on(events.state, {}, (newState) => {
            const { onJoin, onLeave, onSync } = this.caller;
            this.joinRef = this.channel._joinRef();
            this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
            this.pendingDiffs.forEach((diff) => {
                this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            });
            this.pendingDiffs = [];
            onSync();
        });
        this.channel._on(events.diff, {}, (diff) => {
            const { onJoin, onLeave, onSync } = this.caller;
            if (this.inPendingSyncState()) {
                this.pendingDiffs.push(diff);
            }
            else {
                this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
                onSync();
            }
        });
        this.onJoin((key, currentPresences, newPresences) => {
            this.channel._trigger('presence', {
                event: 'join',
                key,
                currentPresences,
                newPresences,
            });
        });
        this.onLeave((key, currentPresences, leftPresences) => {
            this.channel._trigger('presence', {
                event: 'leave',
                key,
                currentPresences,
                leftPresences,
            });
        });
        this.onSync(() => {
            this.channel._trigger('presence', { event: 'sync' });
        });
    }
    /**
     * Used to sync the list of presences on the server with the
     * client's state.
     *
     * An optional `onJoin` and `onLeave` callback can be provided to
     * react to changes in the client's local presences across
     * disconnects and reconnects with the server.
     *
     * @internal
     */
    static syncState(currentState, newState, onJoin, onLeave) {
        const state = this.cloneDeep(currentState);
        const transformedState = this.transformState(newState);
        const joins = {};
        const leaves = {};
        this.map(state, (key, presences) => {
            if (!transformedState[key]) {
                leaves[key] = presences;
            }
        });
        this.map(transformedState, (key, newPresences) => {
            const currentPresences = state[key];
            if (currentPresences) {
                const newPresenceRefs = newPresences.map((m) => m.presence_ref);
                const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
                const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
                const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
                if (joinedPresences.length > 0) {
                    joins[key] = joinedPresences;
                }
                if (leftPresences.length > 0) {
                    leaves[key] = leftPresences;
                }
            }
            else {
                joins[key] = newPresences;
            }
        });
        return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
    }
    /**
     * Used to sync a diff of presence join and leave events from the
     * server, as they happen.
     *
     * Like `syncState`, `syncDiff` accepts optional `onJoin` and
     * `onLeave` callbacks to react to a user joining or leaving from a
     * device.
     *
     * @internal
     */
    static syncDiff(state, diff, onJoin, onLeave) {
        const { joins, leaves } = {
            joins: this.transformState(diff.joins),
            leaves: this.transformState(diff.leaves),
        };
        if (!onJoin) {
            onJoin = () => { };
        }
        if (!onLeave) {
            onLeave = () => { };
        }
        this.map(joins, (key, newPresences) => {
            var _a;
            const currentPresences = (_a = state[key]) !== null && _a !== void 0 ? _a : [];
            state[key] = this.cloneDeep(newPresences);
            if (currentPresences.length > 0) {
                const joinedPresenceRefs = state[key].map((m) => m.presence_ref);
                const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
                state[key].unshift(...curPresences);
            }
            onJoin(key, currentPresences, newPresences);
        });
        this.map(leaves, (key, leftPresences) => {
            let currentPresences = state[key];
            if (!currentPresences)
                return;
            const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
            currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
            state[key] = currentPresences;
            onLeave(key, currentPresences, leftPresences);
            if (currentPresences.length === 0)
                delete state[key];
        });
        return state;
    }
    /** @internal */
    static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key) => func(key, obj[key]));
    }
    /**
     * Remove 'metas' key
     * Change 'phx_ref' to 'presence_ref'
     * Remove 'phx_ref' and 'phx_ref_prev'
     *
     * @example
     * // returns {
     *  abc123: [
     *    { presence_ref: '2', user_id: 1 },
     *    { presence_ref: '3', user_id: 2 }
     *  ]
     * }
     * RealtimePresence.transformState({
     *  abc123: {
     *    metas: [
     *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
     *      { phx_ref: '3', user_id: 2 }
     *    ]
     *  }
     * })
     *
     * @internal
     */
    static transformState(state) {
        state = this.cloneDeep(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key) => {
            const presences = state[key];
            if ('metas' in presences) {
                newState[key] = presences.metas.map((presence) => {
                    presence['presence_ref'] = presence['phx_ref'];
                    delete presence['phx_ref'];
                    delete presence['phx_ref_prev'];
                    return presence;
                });
            }
            else {
                newState[key] = presences;
            }
            return newState;
        }, {});
    }
    /** @internal */
    static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    /** @internal */
    onJoin(callback) {
        this.caller.onJoin = callback;
    }
    /** @internal */
    onLeave(callback) {
        this.caller.onLeave = callback;
    }
    /** @internal */
    onSync(callback) {
        this.caller.onSync = callback;
    }
    /** @internal */
    inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
    }
}
//# sourceMappingURL=RealtimePresence.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RealtimeClient: () => (/* reexport safe */ _RealtimeClient__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _RealtimeClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RealtimeClient */ "./node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js");
/* harmony import */ var _RealtimeChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RealtimeChannel */ "./node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js");
/* harmony import */ var _RealtimePresence__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RealtimePresence */ "./node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js");




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/constants.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/constants.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHANNEL_EVENTS: () => (/* binding */ CHANNEL_EVENTS),
/* harmony export */   CHANNEL_STATES: () => (/* binding */ CHANNEL_STATES),
/* harmony export */   CONNECTION_STATE: () => (/* binding */ CONNECTION_STATE),
/* harmony export */   DEFAULT_HEADERS: () => (/* binding */ DEFAULT_HEADERS),
/* harmony export */   DEFAULT_TIMEOUT: () => (/* binding */ DEFAULT_TIMEOUT),
/* harmony export */   SOCKET_STATES: () => (/* binding */ SOCKET_STATES),
/* harmony export */   TRANSPORTS: () => (/* binding */ TRANSPORTS),
/* harmony export */   VSN: () => (/* binding */ VSN),
/* harmony export */   WS_CLOSE_NORMAL: () => (/* binding */ WS_CLOSE_NORMAL)
/* harmony export */ });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/@supabase/realtime-js/dist/module/lib/version.js");

const DEFAULT_HEADERS = { 'X-Client-Info': `realtime-js/${_version__WEBPACK_IMPORTED_MODULE_0__.version}` };
const VSN = '1.0.0';
const DEFAULT_TIMEOUT = 10000;
const WS_CLOSE_NORMAL = 1000;
var SOCKET_STATES;
(function (SOCKET_STATES) {
    SOCKET_STATES[SOCKET_STATES["connecting"] = 0] = "connecting";
    SOCKET_STATES[SOCKET_STATES["open"] = 1] = "open";
    SOCKET_STATES[SOCKET_STATES["closing"] = 2] = "closing";
    SOCKET_STATES[SOCKET_STATES["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function (CHANNEL_STATES) {
    CHANNEL_STATES["closed"] = "closed";
    CHANNEL_STATES["errored"] = "errored";
    CHANNEL_STATES["joined"] = "joined";
    CHANNEL_STATES["joining"] = "joining";
    CHANNEL_STATES["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function (CHANNEL_EVENTS) {
    CHANNEL_EVENTS["close"] = "phx_close";
    CHANNEL_EVENTS["error"] = "phx_error";
    CHANNEL_EVENTS["join"] = "phx_join";
    CHANNEL_EVENTS["reply"] = "phx_reply";
    CHANNEL_EVENTS["leave"] = "phx_leave";
    CHANNEL_EVENTS["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function (TRANSPORTS) {
    TRANSPORTS["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
(function (CONNECTION_STATE) {
    CONNECTION_STATE["Connecting"] = "connecting";
    CONNECTION_STATE["Open"] = "open";
    CONNECTION_STATE["Closing"] = "closing";
    CONNECTION_STATE["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/push.js":
/*!********************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/push.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Push)
/* harmony export */ });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/constants */ "./node_modules/@supabase/realtime-js/dist/module/lib/constants.js");

class Push {
    /**
     * Initializes the Push
     *
     * @param channel The Channel
     * @param event The event, for example `"phx_join"`
     * @param payload The payload, for example `{user_id: 123}`
     * @param timeout The push timeout in milliseconds
     */
    constructor(channel, event, payload = {}, timeout = _lib_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_TIMEOUT) {
        this.channel = channel;
        this.event = event;
        this.payload = payload;
        this.timeout = timeout;
        this.sent = false;
        this.timeoutTimer = undefined;
        this.ref = '';
        this.receivedResp = null;
        this.recHooks = [];
        this.refEvent = null;
    }
    resend(timeout) {
        this.timeout = timeout;
        this._cancelRefEvent();
        this.ref = '';
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
    }
    send() {
        if (this._hasReceived('timeout')) {
            return;
        }
        this.startTimeout();
        this.sent = true;
        this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload,
            ref: this.ref,
            join_ref: this.channel._joinRef(),
        });
    }
    updatePayload(payload) {
        this.payload = Object.assign(Object.assign({}, this.payload), payload);
    }
    receive(status, callback) {
        var _a;
        if (this._hasReceived(status)) {
            callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
        }
        this.recHooks.push({ status, callback });
        return this;
    }
    startTimeout() {
        if (this.timeoutTimer) {
            return;
        }
        this.ref = this.channel.socket._makeRef();
        this.refEvent = this.channel._replyEventName(this.ref);
        const callback = (payload) => {
            this._cancelRefEvent();
            this._cancelTimeout();
            this.receivedResp = payload;
            this._matchReceive(payload);
        };
        this.channel._on(this.refEvent, {}, callback);
        this.timeoutTimer = setTimeout(() => {
            this.trigger('timeout', {});
        }, this.timeout);
    }
    trigger(status, response) {
        if (this.refEvent)
            this.channel._trigger(this.refEvent, { status, response });
    }
    destroy() {
        this._cancelRefEvent();
        this._cancelTimeout();
    }
    _cancelRefEvent() {
        if (!this.refEvent) {
            return;
        }
        this.channel._off(this.refEvent, {});
    }
    _cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = undefined;
    }
    _matchReceive({ status, response, }) {
        this.recHooks
            .filter((h) => h.status === status)
            .forEach((h) => h.callback(response));
    }
    _hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
    }
}
//# sourceMappingURL=push.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/serializer.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/serializer.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Serializer)
/* harmony export */ });
// This file draws heavily from https://github.com/phoenixframework/phoenix/commit/cf098e9cf7a44ee6479d31d911a97d3c7430c6fe
// License: https://github.com/phoenixframework/phoenix/blob/master/LICENSE.md
class Serializer {
    constructor() {
        this.HEADER_LENGTH = 1;
    }
    decode(rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
            return callback(this._binaryDecode(rawPayload));
        }
        if (typeof rawPayload === 'string') {
            return callback(JSON.parse(rawPayload));
        }
        return callback({});
    }
    _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const decoder = new TextDecoder();
        return this._decodeBroadcast(buffer, view, decoder);
    }
    _decodeBroadcast(buffer, view, decoder) {
        const topicSize = view.getUint8(1);
        const eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        const event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
        return { ref: null, topic: topic, event: event, payload: data };
    }
}
//# sourceMappingURL=serializer.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/timer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/timer.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Timer)
/* harmony export */ });
/**
 * Creates a timer that accepts a `timerCalc` function to perform calculated timeout retries, such as exponential backoff.
 *
 * @example
 *    let reconnectTimer = new Timer(() => this.connect(), function(tries){
 *      return [1000, 5000, 10000][tries - 1] || 10000
 *    })
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 *    reconnectTimer.scheduleTimeout() // fires after 5000
 *    reconnectTimer.reset()
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 */
class Timer {
    constructor(callback, timerCalc) {
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = undefined;
        this.tries = 0;
        this.callback = callback;
        this.timerCalc = timerCalc;
    }
    reset() {
        this.tries = 0;
        clearTimeout(this.timer);
    }
    // Cancels any previous scheduleTimeout and schedules callback
    scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.tries = this.tries + 1;
            this.callback();
        }, this.timerCalc(this.tries + 1));
    }
}
//# sourceMappingURL=timer.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/transformers.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/transformers.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertChangeData: () => (/* binding */ convertChangeData),
/* harmony export */   httpEndpointURL: () => (/* binding */ httpEndpointURL)
/* harmony export */ });
/* unused harmony exports PostgresTypes, convertColumn, convertCell, toBoolean, toNumber, toJson, toArray, toTimestampString */
/**
 * Helpers to convert the change Payload into native JS types.
 */
// Adapted from epgsql (src/epgsql_binary.erl), this module licensed under
// 3-clause BSD found here: https://raw.githubusercontent.com/epgsql/epgsql/devel/LICENSE
var PostgresTypes;
(function (PostgresTypes) {
    PostgresTypes["abstime"] = "abstime";
    PostgresTypes["bool"] = "bool";
    PostgresTypes["date"] = "date";
    PostgresTypes["daterange"] = "daterange";
    PostgresTypes["float4"] = "float4";
    PostgresTypes["float8"] = "float8";
    PostgresTypes["int2"] = "int2";
    PostgresTypes["int4"] = "int4";
    PostgresTypes["int4range"] = "int4range";
    PostgresTypes["int8"] = "int8";
    PostgresTypes["int8range"] = "int8range";
    PostgresTypes["json"] = "json";
    PostgresTypes["jsonb"] = "jsonb";
    PostgresTypes["money"] = "money";
    PostgresTypes["numeric"] = "numeric";
    PostgresTypes["oid"] = "oid";
    PostgresTypes["reltime"] = "reltime";
    PostgresTypes["text"] = "text";
    PostgresTypes["time"] = "time";
    PostgresTypes["timestamp"] = "timestamp";
    PostgresTypes["timestamptz"] = "timestamptz";
    PostgresTypes["timetz"] = "timetz";
    PostgresTypes["tsrange"] = "tsrange";
    PostgresTypes["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
/**
 * Takes an array of columns and an object of string values then converts each string value
 * to its mapped type.
 *
 * @param {{name: String, type: String}[]} columns
 * @param {Object} record
 * @param {Object} options The map of various options that can be applied to the mapper
 * @param {Array} options.skipTypes The array of types that should not be converted
 *
 * @example convertChangeData([{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age:'33'}, {})
 * //=>{ first_name: 'Paul', age: 33 }
 */
const convertChangeData = (columns, record, options = {}) => {
    var _a;
    const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
    return Object.keys(record).reduce((acc, rec_key) => {
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
    }, {});
};
/**
 * Converts the value of an individual column.
 *
 * @param {String} columnName The column that you want to convert
 * @param {{name: String, type: String}[]} columns All of the columns
 * @param {Object} record The map of string values
 * @param {Array} skipTypes An array of types that should not be converted
 * @return {object} Useless information
 *
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, [])
 * //=> 33
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, ['int4'])
 * //=> "33"
 */
const convertColumn = (columnName, columns, record, skipTypes) => {
    const column = columns.find((x) => x.name === columnName);
    const colType = column === null || column === void 0 ? void 0 : column.type;
    const value = record[columnName];
    if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value);
    }
    return noop(value);
};
/**
 * If the value of the cell is `null`, returns null.
 * Otherwise converts the string value to the correct type.
 * @param {String} type A postgres column type
 * @param {String} value The cell value
 *
 * @example convertCell('bool', 't')
 * //=> true
 * @example convertCell('int8', '10')
 * //=> 10
 * @example convertCell('_int4', '{1,2,3,4}')
 * //=> [1,2,3,4]
 */
const convertCell = (type, value) => {
    // if data type is an array
    if (type.charAt(0) === '_') {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
    }
    // If not null, convert to correct type.
    switch (type) {
        case PostgresTypes.bool:
            return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
            return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
            return toJson(value);
        case PostgresTypes.timestamp:
            return toTimestampString(value); // Format to be consistent with PostgREST
        case PostgresTypes.abstime: // To allow users to cast it based on Timezone
        case PostgresTypes.date: // To allow users to cast it based on Timezone
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime: // To allow users to cast it based on Timezone
        case PostgresTypes.text:
        case PostgresTypes.time: // To allow users to cast it based on Timezone
        case PostgresTypes.timestamptz: // To allow users to cast it based on Timezone
        case PostgresTypes.timetz: // To allow users to cast it based on Timezone
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
            return noop(value);
        default:
            // Return the value for remaining types
            return noop(value);
    }
};
const noop = (value) => {
    return value;
};
const toBoolean = (value) => {
    switch (value) {
        case 't':
            return true;
        case 'f':
            return false;
        default:
            return value;
    }
};
const toNumber = (value) => {
    if (typeof value === 'string') {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) {
            return parsedValue;
        }
    }
    return value;
};
const toJson = (value) => {
    if (typeof value === 'string') {
        try {
            return JSON.parse(value);
        }
        catch (error) {
            console.log(`JSON parse error: ${error}`);
            return value;
        }
    }
    return value;
};
/**
 * Converts a Postgres Array into a native JS array
 *
 * @example toArray('{}', 'int4')
 * //=> []
 * @example toArray('{"[2021-01-01,2021-12-31)","(2021-01-01,2021-12-32]"}', 'daterange')
 * //=> ['[2021-01-01,2021-12-31)', '(2021-01-01,2021-12-32]']
 * @example toArray([1,2,3,4], 'int4')
 * //=> [1,2,3,4]
 */
const toArray = (value, type) => {
    if (typeof value !== 'string') {
        return value;
    }
    const lastIdx = value.length - 1;
    const closeBrace = value[lastIdx];
    const openBrace = value[0];
    // Confirm value is a Postgres array by checking curly brackets
    if (openBrace === '{' && closeBrace === '}') {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        // TODO: find a better solution to separate Postgres array data
        try {
            arr = JSON.parse('[' + valTrim + ']');
        }
        catch (_) {
            // WARNING: splitting on comma does not cover all edge cases
            arr = valTrim ? valTrim.split(',') : [];
        }
        return arr.map((val) => convertCell(type, val));
    }
    return value;
};
/**
 * Fixes timestamp to be ISO-8601. Swaps the space between the date and time for a 'T'
 * See https://github.com/supabase/supabase/issues/18
 *
 * @example toTimestampString('2019-09-10 00:00:00')
 * //=> '2019-09-10T00:00:00'
 */
const toTimestampString = (value) => {
    if (typeof value === 'string') {
        return value.replace(' ', 'T');
    }
    return value;
};
const httpEndpointURL = (socketUrl) => {
    let url = socketUrl;
    url = url.replace(/^ws/i, 'http');
    url = url.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, '');
    return url.replace(/\/+$/, '');
};
//# sourceMappingURL=transformers.js.map

/***/ }),

/***/ "./node_modules/@supabase/realtime-js/dist/module/lib/version.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@supabase/realtime-js/dist/module/lib/version.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
const version = '2.11.2';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/StorageClient.js":
/*!************************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/StorageClient.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageClient: () => (/* binding */ StorageClient)
/* harmony export */ });
/* harmony import */ var _packages_StorageFileApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./packages/StorageFileApi */ "./node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js");
/* harmony import */ var _packages_StorageBucketApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./packages/StorageBucketApi */ "./node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js");


class StorageClient extends _packages_StorageBucketApi__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(url, headers = {}, fetch) {
        super(url, headers, fetch);
    }
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */
    from(id) {
        return new _packages_StorageFileApi__WEBPACK_IMPORTED_MODULE_1__["default"](this.url, this.headers, id, this.fetch);
    }
}
//# sourceMappingURL=StorageClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/lib/constants.js":
/*!************************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/lib/constants.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_HEADERS: () => (/* binding */ DEFAULT_HEADERS)
/* harmony export */ });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/@supabase/storage-js/dist/module/lib/version.js");

const DEFAULT_HEADERS = { 'X-Client-Info': `storage-js/${_version__WEBPACK_IMPORTED_MODULE_0__.version}` };
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/lib/errors.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/lib/errors.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StorageApiError: () => (/* binding */ StorageApiError),
/* harmony export */   StorageError: () => (/* binding */ StorageError),
/* harmony export */   StorageUnknownError: () => (/* binding */ StorageUnknownError),
/* harmony export */   isStorageError: () => (/* binding */ isStorageError)
/* harmony export */ });
class StorageError extends Error {
    constructor(message) {
        super(message);
        this.__isStorageError = true;
        this.name = 'StorageError';
    }
}
function isStorageError(error) {
    return typeof error === 'object' && error !== null && '__isStorageError' in error;
}
class StorageApiError extends StorageError {
    constructor(message, status) {
        super(message);
        this.name = 'StorageApiError';
        this.status = status;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
        };
    }
}
class StorageUnknownError extends StorageError {
    constructor(message, originalError) {
        super(message);
        this.name = 'StorageUnknownError';
        this.originalError = originalError;
    }
}
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/lib/fetch.js":
/*!********************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/lib/fetch.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   head: () => (/* binding */ head),
/* harmony export */   post: () => (/* binding */ post),
/* harmony export */   put: () => (/* binding */ put),
/* harmony export */   remove: () => (/* binding */ remove)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors */ "./node_modules/@supabase/storage-js/dist/module/lib/errors.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/@supabase/storage-js/dist/module/lib/helpers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject, options) => __awaiter(void 0, void 0, void 0, function* () {
    const Res = yield (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.resolveResponse)();
    if (error instanceof Res && !(options === null || options === void 0 ? void 0 : options.noResolveJson)) {
        error
            .json()
            .then((err) => {
            reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.StorageApiError(_getErrorMessage(err), error.status || 500));
        })
            .catch((err) => {
            reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.StorageUnknownError(_getErrorMessage(err), err));
        });
    }
    else {
        reject(new _errors__WEBPACK_IMPORTED_MODULE_1__.StorageUnknownError(_getErrorMessage(error), error));
    }
});
const _getRequestParams = (method, options, parameters, body) => {
    const params = { method, headers: (options === null || options === void 0 ? void 0 : options.headers) || {} };
    if (method === 'GET') {
        return params;
    }
    params.headers = Object.assign({ 'Content-Type': 'application/json' }, options === null || options === void 0 ? void 0 : options.headers);
    if (body) {
        params.body = JSON.stringify(body);
    }
    return Object.assign(Object.assign({}, params), parameters);
};
function _handleRequest(fetcher, method, url, options, parameters, body) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fetcher(url, _getRequestParams(method, options, parameters, body))
                .then((result) => {
                if (!result.ok)
                    throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson)
                    return result;
                return result.json();
            })
                .then((data) => resolve(data))
                .catch((error) => handleError(error, reject, options));
        });
    });
}
function get(fetcher, url, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'GET', url, options, parameters);
    });
}
function post(fetcher, url, body, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'POST', url, options, parameters, body);
    });
}
function put(fetcher, url, body, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'PUT', url, options, parameters, body);
    });
}
function head(fetcher, url, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'HEAD', url, Object.assign(Object.assign({}, options), { noResolveJson: true }), parameters);
    });
}
function remove(fetcher, url, body, options, parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        return _handleRequest(fetcher, 'DELETE', url, options, parameters, body);
    });
}
//# sourceMappingURL=fetch.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/lib/helpers.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/lib/helpers.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   recursiveToCamel: () => (/* binding */ recursiveToCamel),
/* harmony export */   resolveFetch: () => (/* binding */ resolveFetch),
/* harmony export */   resolveResponse: () => (/* binding */ resolveResponse)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = (...args) => Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @supabase/node-fetch */ "./node_modules/@supabase/node-fetch/browser.js")).then(({ default: fetch }) => fetch(...args));
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
const resolveResponse = () => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof Response === 'undefined') {
        // @ts-ignore
        return (yield Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @supabase/node-fetch */ "./node_modules/@supabase/node-fetch/browser.js"))).Response;
    }
    return Response;
});
const recursiveToCamel = (item) => {
    if (Array.isArray(item)) {
        return item.map((el) => recursiveToCamel(el));
    }
    else if (typeof item === 'function' || item !== Object(item)) {
        return item;
    }
    const result = {};
    Object.entries(item).forEach(([key, value]) => {
        const newKey = key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, ''));
        result[newKey] = recursiveToCamel(value);
    });
    return result;
};
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/lib/version.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/lib/version.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
// generated by genversion
const version = '2.7.1';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StorageBucketApi)
/* harmony export */ });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/constants */ "./node_modules/@supabase/storage-js/dist/module/lib/constants.js");
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/errors */ "./node_modules/@supabase/storage-js/dist/module/lib/errors.js");
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/fetch */ "./node_modules/@supabase/storage-js/dist/module/lib/fetch.js");
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/helpers */ "./node_modules/@supabase/storage-js/dist/module/lib/helpers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class StorageBucketApi {
    constructor(url, headers = {}, fetch) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, _lib_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_HEADERS), headers);
        this.fetch = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_1__.resolveFetch)(fetch);
    }
    /**
     * Retrieves the details of all Storage buckets within an existing project.
     */
    listBuckets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.get)(this.fetch, `${this.url}/bucket`, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Retrieves the details of an existing Storage bucket.
     *
     * @param id The unique identifier of the bucket you would like to retrieve.
     */
    getBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.get)(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a new Storage bucket
     *
     * @param id A unique identifier for the bucket you are creating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     * @returns newly created bucket id
     */
    createBucket(id, options = {
        public: false,
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/bucket`, {
                    id,
                    name: id,
                    public: options.public,
                    file_size_limit: options.fileSizeLimit,
                    allowed_mime_types: options.allowedMimeTypes,
                }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Updates a Storage bucket
     *
     * @param id A unique identifier for the bucket you are updating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     */
    updateBucket(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.put)(this.fetch, `${this.url}/bucket/${id}`, {
                    id,
                    name: id,
                    public: options.public,
                    file_size_limit: options.fileSizeLimit,
                    allowed_mime_types: options.allowedMimeTypes,
                }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Removes all objects inside a single bucket.
     *
     * @param id The unique identifier of the bucket you would like to empty.
     */
    emptyBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
     * You must first `empty()` the bucket.
     *
     * @param id The unique identifier of the bucket you would like to delete.
     */
    deleteBucket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.remove)(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_3__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
}
//# sourceMappingURL=StorageBucketApi.js.map

/***/ }),

/***/ "./node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StorageFileApi)
/* harmony export */ });
/* harmony import */ var _lib_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/errors */ "./node_modules/@supabase/storage-js/dist/module/lib/errors.js");
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/fetch */ "./node_modules/@supabase/storage-js/dist/module/lib/fetch.js");
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/helpers */ "./node_modules/@supabase/storage-js/dist/module/lib/helpers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const DEFAULT_SEARCH_OPTIONS = {
    limit: 100,
    offset: 0,
    sortBy: {
        column: 'name',
        order: 'asc',
    },
};
const DEFAULT_FILE_OPTIONS = {
    cacheControl: '3600',
    contentType: 'text/plain;charset=UTF-8',
    upsert: false,
};
class StorageFileApi {
    constructor(url, headers = {}, bucketId, fetch) {
        this.url = url;
        this.headers = headers;
        this.bucketId = bucketId;
        this.fetch = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_0__.resolveFetch)(fetch);
    }
    /**
     * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
     *
     * @param method HTTP method.
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    uploadOrUpdate(method, path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body;
                const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
                let headers = Object.assign(Object.assign({}, this.headers), (method === 'POST' && { 'x-upsert': String(options.upsert) }));
                const metadata = options.metadata;
                if (typeof Blob !== 'undefined' && fileBody instanceof Blob) {
                    body = new FormData();
                    body.append('cacheControl', options.cacheControl);
                    if (metadata) {
                        body.append('metadata', this.encodeMetadata(metadata));
                    }
                    body.append('', fileBody);
                }
                else if (typeof FormData !== 'undefined' && fileBody instanceof FormData) {
                    body = fileBody;
                    body.append('cacheControl', options.cacheControl);
                    if (metadata) {
                        body.append('metadata', this.encodeMetadata(metadata));
                    }
                }
                else {
                    body = fileBody;
                    headers['cache-control'] = `max-age=${options.cacheControl}`;
                    headers['content-type'] = options.contentType;
                    if (metadata) {
                        headers['x-metadata'] = this.toBase64(this.encodeMetadata(metadata));
                    }
                }
                if (fileOptions === null || fileOptions === void 0 ? void 0 : fileOptions.headers) {
                    headers = Object.assign(Object.assign({}, headers), fileOptions.headers);
                }
                const cleanPath = this._removeEmptyFolders(path);
                const _path = this._getFinalPath(cleanPath);
                const res = yield this.fetch(`${this.url}/object/${_path}`, Object.assign({ method, body: body, headers }, ((options === null || options === void 0 ? void 0 : options.duplex) ? { duplex: options.duplex } : {})));
                const data = yield res.json();
                if (res.ok) {
                    return {
                        data: { path: cleanPath, id: data.Id, fullPath: data.Key },
                        error: null,
                    };
                }
                else {
                    const error = data;
                    return { data: null, error };
                }
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Uploads a file to an existing bucket.
     *
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    upload(path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadOrUpdate('POST', path, fileBody, fileOptions);
        });
    }
    /**
     * Upload a file with a token generated from `createSignedUploadUrl`.
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param token The token generated from `createSignedUploadUrl`
     * @param fileBody The body of the file to be stored in the bucket.
     */
    uploadToSignedUrl(path, token, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanPath = this._removeEmptyFolders(path);
            const _path = this._getFinalPath(cleanPath);
            const url = new URL(this.url + `/object/upload/sign/${_path}`);
            url.searchParams.set('token', token);
            try {
                let body;
                const options = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
                const headers = Object.assign(Object.assign({}, this.headers), { 'x-upsert': String(options.upsert) });
                if (typeof Blob !== 'undefined' && fileBody instanceof Blob) {
                    body = new FormData();
                    body.append('cacheControl', options.cacheControl);
                    body.append('', fileBody);
                }
                else if (typeof FormData !== 'undefined' && fileBody instanceof FormData) {
                    body = fileBody;
                    body.append('cacheControl', options.cacheControl);
                }
                else {
                    body = fileBody;
                    headers['cache-control'] = `max-age=${options.cacheControl}`;
                    headers['content-type'] = options.contentType;
                }
                const res = yield this.fetch(url.toString(), {
                    method: 'PUT',
                    body: body,
                    headers,
                });
                const data = yield res.json();
                if (res.ok) {
                    return {
                        data: { path: cleanPath, fullPath: data.Key },
                        error: null,
                    };
                }
                else {
                    const error = data;
                    return { data: null, error };
                }
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a signed upload URL.
     * Signed upload URLs can be used to upload files to the bucket without further authentication.
     * They are valid for 2 hours.
     * @param path The file path, including the current file name. For example `folder/image.png`.
     * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
     */
    createSignedUploadUrl(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _path = this._getFinalPath(path);
                const headers = Object.assign({}, this.headers);
                if (options === null || options === void 0 ? void 0 : options.upsert) {
                    headers['x-upsert'] = 'true';
                }
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, { headers });
                const url = new URL(this.url + data.url);
                const token = url.searchParams.get('token');
                if (!token) {
                    throw new _lib_errors__WEBPACK_IMPORTED_MODULE_1__.StorageError('No token returned by API');
                }
                return { data: { signedUrl: url.toString(), path, token }, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Replaces an existing file at the specified path with a new one.
     *
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
     * @param fileBody The body of the file to be stored in the bucket.
     */
    update(path, fileBody, fileOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadOrUpdate('PUT', path, fileBody, fileOptions);
        });
    }
    /**
     * Moves an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
     * @param options The destination options.
     */
    move(fromPath, toPath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/move`, {
                    bucketId: this.bucketId,
                    sourceKey: fromPath,
                    destinationKey: toPath,
                    destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket,
                }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Copies an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
     * @param options The destination options.
     */
    copy(fromPath, toPath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/copy`, {
                    bucketId: this.bucketId,
                    sourceKey: fromPath,
                    destinationKey: toPath,
                    destinationBucket: options === null || options === void 0 ? void 0 : options.destinationBucket,
                }, { headers: this.headers });
                return { data: { path: data.Key }, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param path The file path, including the current file name. For example `folder/image.png`.
     * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */
    createSignedUrl(path, expiresIn, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let _path = this._getFinalPath(path);
                let data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, ((options === null || options === void 0 ? void 0 : options.transform) ? { transform: options.transform } : {})), { headers: this.headers });
                const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download)
                    ? `&download=${options.download === true ? '' : options.download}`
                    : '';
                const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
                data = { signedUrl };
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
     * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     */
    createSignedUrls(paths, expiresIn, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
                const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download)
                    ? `&download=${options.download === true ? '' : options.download}`
                    : '';
                return {
                    data: data.map((datum) => (Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL
                            ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`)
                            : null }))),
                    error: null,
                };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
     *
     * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
     * @param options.transform Transform the asset before serving it to the client.
     */
    download(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== 'undefined';
            const renderPath = wantsTransformation ? 'render/image/authenticated' : 'object';
            const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
            const queryString = transformationQuery ? `?${transformationQuery}` : '';
            try {
                const _path = this._getFinalPath(path);
                const res = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.get)(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
                    headers: this.headers,
                    noResolveJson: true,
                });
                const data = yield res.blob();
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Retrieves the details of an existing file.
     * @param path
     */
    info(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const _path = this._getFinalPath(path);
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.get)(this.fetch, `${this.url}/object/info/${_path}`, {
                    headers: this.headers,
                });
                return { data: (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_0__.recursiveToCamel)(data), error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Checks the existence of a file.
     * @param path
     */
    exists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const _path = this._getFinalPath(path);
            try {
                yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.head)(this.fetch, `${this.url}/object/${_path}`, {
                    headers: this.headers,
                });
                return { data: true, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error) && error instanceof _lib_errors__WEBPACK_IMPORTED_MODULE_1__.StorageUnknownError) {
                    const originalError = error.originalError;
                    if ([400, 404].includes(originalError === null || originalError === void 0 ? void 0 : originalError.status)) {
                        return { data: false, error };
                    }
                }
                throw error;
            }
        });
    }
    /**
     * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
     * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
     *
     * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
     * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */
    getPublicUrl(path, options) {
        const _path = this._getFinalPath(path);
        const _queryString = [];
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download)
            ? `download=${options.download === true ? '' : options.download}`
            : '';
        if (downloadQueryParam !== '') {
            _queryString.push(downloadQueryParam);
        }
        const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== 'undefined';
        const renderPath = wantsTransformation ? 'render/image' : 'object';
        const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
        if (transformationQuery !== '') {
            _queryString.push(transformationQuery);
        }
        let queryString = _queryString.join('&');
        if (queryString !== '') {
            queryString = `?${queryString}`;
        }
        return {
            data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) },
        };
    }
    /**
     * Deletes files within the same bucket
     *
     * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
     */
    remove(paths) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.remove)(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    /**
     * Get file metadata
     * @param id the file id to retrieve metadata
     */
    // async getMetadata(
    //   id: string
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Update file metadata
     * @param id the file id to update metadata
     * @param meta the new file metadata
     */
    // async updateMetadata(
    //   id: string,
    //   meta: Metadata
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await post(
    //       this.fetch,
    //       `${this.url}/metadata/${id}`,
    //       { ...meta },
    //       { headers: this.headers }
    //     )
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Lists all the files within a bucket.
     * @param path The folder path.
     */
    list(path, options, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), { prefix: path || '' });
                const data = yield (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_2__.post)(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
                return { data, error: null };
            }
            catch (error) {
                if ((0,_lib_errors__WEBPACK_IMPORTED_MODULE_1__.isStorageError)(error)) {
                    return { data: null, error };
                }
                throw error;
            }
        });
    }
    encodeMetadata(metadata) {
        return JSON.stringify(metadata);
    }
    toBase64(data) {
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(data).toString('base64');
        }
        return btoa(data);
    }
    _getFinalPath(path) {
        return `${this.bucketId}/${path}`;
    }
    _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, '').replace(/\/+/g, '/');
    }
    transformOptsToQueryString(transform) {
        const params = [];
        if (transform.width) {
            params.push(`width=${transform.width}`);
        }
        if (transform.height) {
            params.push(`height=${transform.height}`);
        }
        if (transform.resize) {
            params.push(`resize=${transform.resize}`);
        }
        if (transform.format) {
            params.push(`format=${transform.format}`);
        }
        if (transform.quality) {
            params.push(`quality=${transform.quality}`);
        }
        return params.join('&');
    }
}
//# sourceMappingURL=StorageFileApi.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SupabaseClient)
/* harmony export */ });
/* harmony import */ var _supabase_functions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @supabase/functions-js */ "./node_modules/@supabase/functions-js/dist/module/FunctionsClient.js");
/* harmony import */ var _supabase_postgrest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/postgrest-js */ "./node_modules/@supabase/postgrest-js/dist/esm/wrapper.mjs");
/* harmony import */ var _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/realtime-js */ "./node_modules/@supabase/realtime-js/dist/module/index.js");
/* harmony import */ var _supabase_storage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @supabase/storage-js */ "./node_modules/@supabase/storage-js/dist/module/StorageClient.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/constants */ "./node_modules/@supabase/supabase-js/dist/module/lib/constants.js");
/* harmony import */ var _lib_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/fetch */ "./node_modules/@supabase/supabase-js/dist/module/lib/fetch.js");
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/helpers */ "./node_modules/@supabase/supabase-js/dist/module/lib/helpers.js");
/* harmony import */ var _lib_SupabaseAuthClient__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/SupabaseAuthClient */ "./node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








/**
 * Supabase Client.
 *
 * An isomorphic Javascript client for interacting with Postgres.
 */
class SupabaseClient {
    /**
     * Create a new client for use in the browser.
     * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
     * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
     * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
     * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
     * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
     * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
     * @param options.realtime Options passed along to realtime-js constructor.
     * @param options.global.fetch A custom fetch implementation.
     * @param options.global.headers Any additional headers to send with each network request.
     */
    constructor(supabaseUrl, supabaseKey, options) {
        var _a, _b, _c;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        if (!supabaseUrl)
            throw new Error('supabaseUrl is required.');
        if (!supabaseKey)
            throw new Error('supabaseKey is required.');
        const _supabaseUrl = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_2__.stripTrailingSlash)(supabaseUrl);
        this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, 'ws');
        this.authUrl = `${_supabaseUrl}/auth/v1`;
        this.storageUrl = `${_supabaseUrl}/storage/v1`;
        this.functionsUrl = `${_supabaseUrl}/functions/v1`;
        // default storage key uses the supabase project ref as a namespace
        const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split('.')[0]}-auth-token`;
        const DEFAULTS = {
            db: _lib_constants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_DB_OPTIONS,
            realtime: _lib_constants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_REALTIME_OPTIONS,
            auth: Object.assign(Object.assign({}, _lib_constants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
            global: _lib_constants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_GLOBAL_OPTIONS,
        };
        const settings = (0,_lib_helpers__WEBPACK_IMPORTED_MODULE_2__.applySettingDefaults)(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.storageKey = (_a = settings.auth.storageKey) !== null && _a !== void 0 ? _a : '';
        this.headers = (_b = settings.global.headers) !== null && _b !== void 0 ? _b : {};
        if (!settings.accessToken) {
            this.auth = this._initSupabaseAuthClient((_c = settings.auth) !== null && _c !== void 0 ? _c : {}, this.headers, settings.global.fetch);
        }
        else {
            this.accessToken = settings.accessToken;
            this.auth = new Proxy({}, {
                get: (_, prop) => {
                    throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(prop)} is not possible`);
                },
            });
        }
        this.fetch = (0,_lib_fetch__WEBPACK_IMPORTED_MODULE_4__.fetchWithAuth)(supabaseKey, this._getAccessToken.bind(this), settings.global.fetch);
        this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, settings.realtime));
        this.rest = new _supabase_postgrest_js__WEBPACK_IMPORTED_MODULE_0__.PostgrestClient(`${_supabaseUrl}/rest/v1`, {
            headers: this.headers,
            schema: settings.db.schema,
            fetch: this.fetch,
        });
        if (!settings.accessToken) {
            this._listenForAuthEvents();
        }
    }
    /**
     * Supabase Functions allows you to deploy and invoke edge functions.
     */
    get functions() {
        return new _supabase_functions_js__WEBPACK_IMPORTED_MODULE_5__.FunctionsClient(this.functionsUrl, {
            headers: this.headers,
            customFetch: this.fetch,
        });
    }
    /**
     * Supabase Storage allows you to manage user-generated content, such as photos or videos.
     */
    get storage() {
        return new _supabase_storage_js__WEBPACK_IMPORTED_MODULE_6__.StorageClient(this.storageUrl, this.headers, this.fetch);
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */
    from(relation) {
        return this.rest.from(relation);
    }
    // NOTE: signatures must be kept in sync with PostgrestClient.schema
    /**
     * Select a schema to query or perform an function (rpc) call.
     *
     * The schema needs to be on the list of exposed schemas inside Supabase.
     *
     * @param schema - The schema to query
     */
    schema(schema) {
        return this.rest.schema(schema);
    }
    // NOTE: signatures must be kept in sync with PostgrestClient.rpc
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.get - When set to `true`, the function will be called with
     * read-only access mode.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    rpc(fn, args = {}, options = {}) {
        return this.rest.rpc(fn, args, options);
    }
    /**
     * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
     *
     * @param {string} name - The name of the Realtime channel.
     * @param {Object} opts - The options to pass to the Realtime channel.
     *
     */
    channel(name, opts = { config: {} }) {
        return this.realtime.channel(name, opts);
    }
    /**
     * Returns all Realtime channels.
     */
    getChannels() {
        return this.realtime.getChannels();
    }
    /**
     * Unsubscribes and removes Realtime channel from Realtime client.
     *
     * @param {RealtimeChannel} channel - The name of the Realtime channel.
     *
     */
    removeChannel(channel) {
        return this.realtime.removeChannel(channel);
    }
    /**
     * Unsubscribes and removes all Realtime channels from Realtime client.
     */
    removeAllChannels() {
        return this.realtime.removeAllChannels();
    }
    _getAccessToken() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.accessToken) {
                return yield this.accessToken();
            }
            const { data } = yield this.auth.getSession();
            return (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : null;
        });
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, storageKey, flowType, lock, debug, }, headers, fetch) {
        const authHeaders = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`,
        };
        return new _lib_SupabaseAuthClient__WEBPACK_IMPORTED_MODULE_7__.SupabaseAuthClient({
            url: this.authUrl,
            headers: Object.assign(Object.assign({}, authHeaders), headers),
            storageKey: storageKey,
            autoRefreshToken,
            persistSession,
            detectSessionInUrl,
            storage,
            flowType,
            lock,
            debug,
            fetch,
            // auth checks if there is a custom authorizaiton header using this flag
            // so it knows whether to return an error when getUser is called with no session
            hasCustomAuthorizationHeader: 'Authorization' in this.headers,
        });
    }
    _initRealtimeClient(options) {
        return new _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_1__.RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options), { params: Object.assign({ apikey: this.supabaseKey }, options === null || options === void 0 ? void 0 : options.params) }));
    }
    _listenForAuthEvents() {
        let data = this.auth.onAuthStateChange((event, session) => {
            this._handleTokenChanged(event, 'CLIENT', session === null || session === void 0 ? void 0 : session.access_token);
        });
        return data;
    }
    _handleTokenChanged(event, source, token) {
        if ((event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') &&
            this.changedAccessToken !== token) {
            this.changedAccessToken = token;
        }
        else if (event === 'SIGNED_OUT') {
            this.realtime.setAuth();
            if (source == 'STORAGE')
                this.auth.signOut();
            this.changedAccessToken = undefined;
        }
    }
}
//# sourceMappingURL=SupabaseClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createClient: () => (/* binding */ createClient)
/* harmony export */ });
/* harmony import */ var _SupabaseClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SupabaseClient */ "./node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js");
/* harmony import */ var _supabase_auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/auth-js */ "./node_modules/@supabase/auth-js/dist/module/index.js");
/* harmony import */ var _supabase_postgrest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/postgrest-js */ "./node_modules/@supabase/postgrest-js/dist/esm/wrapper.mjs");
/* harmony import */ var _supabase_realtime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @supabase/realtime-js */ "./node_modules/@supabase/realtime-js/dist/module/index.js");






/**
 * Creates a new Supabase Client.
 */
const createClient = (supabaseUrl, supabaseKey, options) => {
    return new _SupabaseClient__WEBPACK_IMPORTED_MODULE_3__["default"](supabaseUrl, supabaseKey, options);
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SupabaseAuthClient: () => (/* binding */ SupabaseAuthClient)
/* harmony export */ });
/* harmony import */ var _supabase_auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/auth-js */ "./node_modules/@supabase/auth-js/dist/module/index.js");

class SupabaseAuthClient extends _supabase_auth_js__WEBPACK_IMPORTED_MODULE_0__.AuthClient {
    constructor(options) {
        super(options);
    }
}
//# sourceMappingURL=SupabaseAuthClient.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/lib/constants.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/lib/constants.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_AUTH_OPTIONS: () => (/* binding */ DEFAULT_AUTH_OPTIONS),
/* harmony export */   DEFAULT_DB_OPTIONS: () => (/* binding */ DEFAULT_DB_OPTIONS),
/* harmony export */   DEFAULT_GLOBAL_OPTIONS: () => (/* binding */ DEFAULT_GLOBAL_OPTIONS),
/* harmony export */   DEFAULT_REALTIME_OPTIONS: () => (/* binding */ DEFAULT_REALTIME_OPTIONS)
/* harmony export */ });
/* unused harmony export DEFAULT_HEADERS */
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./node_modules/@supabase/supabase-js/dist/module/lib/version.js");

let JS_ENV = '';
// @ts-ignore
if (typeof Deno !== 'undefined') {
    JS_ENV = 'deno';
}
else if (typeof document !== 'undefined') {
    JS_ENV = 'web';
}
else if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    JS_ENV = 'react-native';
}
else {
    JS_ENV = 'node';
}
const DEFAULT_HEADERS = { 'X-Client-Info': `supabase-js-${JS_ENV}/${_version__WEBPACK_IMPORTED_MODULE_0__.version}` };
const DEFAULT_GLOBAL_OPTIONS = {
    headers: DEFAULT_HEADERS,
};
const DEFAULT_DB_OPTIONS = {
    schema: 'public',
};
const DEFAULT_AUTH_OPTIONS = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
};
const DEFAULT_REALTIME_OPTIONS = {};
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/lib/fetch.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/lib/fetch.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchWithAuth: () => (/* binding */ fetchWithAuth)
/* harmony export */ });
/* unused harmony exports resolveFetch, resolveHeadersConstructor */
/* harmony import */ var _supabase_node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/node-fetch */ "./node_modules/@supabase/node-fetch/browser.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore

const resolveFetch = (customFetch) => {
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    }
    else if (typeof fetch === 'undefined') {
        _fetch = _supabase_node_fetch__WEBPACK_IMPORTED_MODULE_0__["default"];
    }
    else {
        _fetch = fetch;
    }
    return (...args) => _fetch(...args);
};
const resolveHeadersConstructor = () => {
    if (typeof Headers === 'undefined') {
        return _supabase_node_fetch__WEBPACK_IMPORTED_MODULE_0__.Headers;
    }
    return Headers;
};
const fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
    const fetch = resolveFetch(customFetch);
    const HeadersConstructor = resolveHeadersConstructor();
    return (input, init) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const accessToken = (_a = (yield getAccessToken())) !== null && _a !== void 0 ? _a : supabaseKey;
        let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
        if (!headers.has('apikey')) {
            headers.set('apikey', supabaseKey);
        }
        if (!headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return fetch(input, Object.assign(Object.assign({}, init), { headers }));
    });
};
//# sourceMappingURL=fetch.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/lib/helpers.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/lib/helpers.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applySettingDefaults: () => (/* binding */ applySettingDefaults),
/* harmony export */   stripTrailingSlash: () => (/* binding */ stripTrailingSlash)
/* harmony export */ });
/* unused harmony exports uuid, isBrowser */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
function stripTrailingSlash(url) {
    return url.replace(/\/$/, '');
}
const isBrowser = () => typeof window !== 'undefined';
function applySettingDefaults(options, defaults) {
    const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions, } = options;
    const { db: DEFAULT_DB_OPTIONS, auth: DEFAULT_AUTH_OPTIONS, realtime: DEFAULT_REALTIME_OPTIONS, global: DEFAULT_GLOBAL_OPTIONS, } = defaults;
    const result = {
        db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS), dbOptions),
        auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), authOptions),
        realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS), realtimeOptions),
        global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS), globalOptions),
        accessToken: () => __awaiter(this, void 0, void 0, function* () { return ''; }),
    };
    if (options.accessToken) {
        result.accessToken = options.accessToken;
    }
    else {
        // hack around Required<>
        delete result.accessToken;
    }
    return result;
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/@supabase/supabase-js/dist/module/lib/version.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@supabase/supabase-js/dist/module/lib/version.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
const version = '2.49.4';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./src/js/auth/auth.js":
/*!*****************************!*\
  !*** ./src/js/auth/auth.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideLoading: () => (/* binding */ hideLoading),
/* harmony export */   showError: () => (/* binding */ showError),
/* harmony export */   showLoading: () => (/* binding */ showLoading),
/* harmony export */   showStatus: () => (/* binding */ showStatus)
/* harmony export */ });
/* unused harmony exports IS_LOCAL, API_URLS, setCurrentUser, getCurrentUser, logout, isLoggedIn, hideElement, showElement */
// src/auth/auth.js
/**
 * Authentication Module - Base
 * @module auth
 * @description Base module for authentication with common functions and configuration
 * @version 0.0.3
 *
 * @changelog
 * - 0.0.3 (2025-05-13): Modified the authentication state management to use Supabase Auth system.
 * - 0.0.2 (2025-05-13): Reorganization into separate modules
 * - 0.0.1 (2025-05-03): Initial creation
 */

// --- API URL Definitions ---
const IS_LOCAL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1";

const API_URLS = {
  HANDLE_CONFIRMATION: IS_LOCAL
    ? "http://127.0.0.1:5001/urbandocs/us-central1/handle_confirmation"
    : "https://handle-confirmation-up3k3hddtq-uc.a.run.app",

  HANDLE_SIGNUP: IS_LOCAL
    ? "http://127.0.0.1:5001/urbandocs/us-central1/handle_signup"
    : "https://handle-signup-up3k3hddtq-uc.a.run.app",

  HANDLE_LOGIN: IS_LOCAL
    ? "http://127.0.0.1:5001/urbandocs/us-central1/handle_login"
    : "https://handle-login-up3k3hddtq-uc.a.run.app",
};

// Global authentication state
let currentUser = null;

/**
 * Sets the current user
 * @param {Object} user - User data
 */
function setCurrentUser(user) {
  currentUser = user;
  // Possible storage in localStorage/sessionStorage
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}

/**
 * Retrieves the current user
 * @returns {Object|null} The current user or null
 */
function getCurrentUser() {
  // If no user in memory, try to retrieve it from storage
  if (!currentUser) {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        currentUser = JSON.parse(storedUser);
      } catch (e) {
        console.error("Error retrieving user:", e);
        localStorage.removeItem("currentUser");
      }
    }
  }

  return currentUser;
}

/**
 * Logs out the user
 */
function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  // Redirect to the home page after logout
  window.location.href = "/";
}

/**
 * Checks if the user is logged in
 * @returns {boolean} True if the user is logged in
 */
function isLoggedIn() {
  return getCurrentUser() !== null;
}

/**
 * Displays an error message
 * @param {string} message - Error message to display
 * @param {string} elementId - ID of the element where to display the error
 */
function showError(message, elementId = "errorMessage") {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.innerHTML = message;
    errorElement.classList.remove("hidden");
  } else {
    console.error("Error element not found:", elementId);
  }
}

/**
 * Displays a status message
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, info, warning, danger)
 * @param {string} elementId - ID of the element where to display the message
 */
function showStatus(
  message,
  type = "info",
  elementId = "statusMessage"
) {
  const statusElement = document.getElementById(elementId);
  if (statusElement) {
    statusElement.textContent = message;

    // Remove all alert-* classes
    statusElement.classList.forEach((className) => {
      if (className.startsWith("alert-")) {
        statusElement.classList.remove(className);
      }
    });

    // Add the class corresponding to the type
    statusElement.classList.add(`alert-${type}`);
    statusElement.classList.remove("hidden");
  } else {
    console.error("Status element not found:", elementId);
  }
}

/**
 * Hides an element
 * @param {string} elementId - ID of the element to hide
 */
function hideElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add("hidden");
  }
}

/**
 * Shows an element
 * @param {string} elementId - ID of the element to show
 */
function showElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove("hidden");
  }
}

/**
 * Shows the loading indicator
 * @param {string} buttonId - ID of the button
 * @param {string} spinnerId - ID of the spinner
 */
function showLoading(buttonId, spinnerId) {
  const button = document.getElementById(buttonId);
  const spinner = document.getElementById(spinnerId);

  if (button) button.disabled = true;
  if (spinner) spinner.classList.remove("hidden");
}

/**
 * Hides the loading indicator
 * @param {string} buttonId - ID of the button
 * @param {string} spinnerId - ID of the spinner
 */
function hideLoading(buttonId, spinnerId) {
  const button = document.getElementById(buttonId);
  const spinner = document.getElementById(spinnerId);

  if (button) button.disabled = false;
  if (spinner) spinner.classList.add("hidden");
}

// Export the necessary functions and variables
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  API_URLS,
  IS_LOCAL,
  getCurrentUser,
  setCurrentUser,
  logout,
  isLoggedIn,
  showError,
  showStatus,
  hideElement,
  showElement,
  showLoading,
  hideLoading,
});


/***/ }),

/***/ "./src/js/auth/forgotten-password.js":
/*!*******************************************!*\
  !*** ./src/js/auth/forgotten-password.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initForgotPasswordPage: () => (/* binding */ initForgotPasswordPage)
/* harmony export */ });
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../supabase-client.js */ "./src/js/supabase-client.js");
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth/auth.js");



function initForgotPasswordPage() {
  const resetForm = document.getElementById("resetForm");
  const errorMessage = document.getElementById("errorMessage");
  const statusMessage = document.getElementById("statusMessage");

  if (resetForm) {
    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset messages
      if (errorMessage) {
        errorMessage.classList.add("hidden");
        errorMessage.textContent = "";
      }
      if (statusMessage) {
        statusMessage.classList.add("hidden");
        statusMessage.textContent = "";
      }

      const email = document.getElementById("email").value.trim();

      // Basic validation
      if (!email) {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.showError)("Veuillez entrer votre adresse email.");
        return;
      }

      // Show loading state
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.showLoading)("resetBtn", "resetSpinner");

      try {
        const { error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/update-password`,
        });

        if (error) throw error;

        // Show success message
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.showStatus)(
          "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.",
          "success"
        );

        // Hide the form
        resetForm.classList.add("hidden");
      } catch (error) {
        console.error("Password reset error:", error);
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.showError)("Une erreur est survenue. Veuillez réessayer plus tard.");
      } finally {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_1__.hideLoading)("resetBtn", "resetSpinner");
      }
    });
  }
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  initForgotPasswordPage,
});


/***/ }),

/***/ "./src/js/supabase-client.js":
/*!***********************************!*\
  !*** ./src/js/supabase-client.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supabase: () => (/* binding */ supabase)
/* harmony export */ });
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ "./node_modules/@supabase/supabase-js/dist/module/index.js");
/**
 * Supabase Client
 * @module supabase-client
 * @description This module handles the Supabase client initialization and configuration.
 * @version 0.0.1
 * @author GreyPanda
 *
 * @changelog
 * - 0.0.1 (2025-05-09): Initial version with basic Supabase client initialization.
 */



const supabaseUrl = "https://ofeyssipibktmbfebibo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZXlzc2lwaWJrdG1iZmViaWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjUwOTQsImV4cCI6MjA1OTUwMTA5NH0.w71CAKfolktzRl-TmLVhHYaEbhCfVk4A7YraEUCglrU";

console.log("[supabase-client.js] Initializing Supabase client...");
const client = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);
console.log("[supabase-client.js] Supabase client instance created:", client);
if (client && client.auth) {
  console.log("[supabase-client.js] client.auth object:", client.auth);
  console.log(
    "[supabase-client.js] typeof client.auth.onAuthStateChanged:",
    typeof client.auth.onAuthStateChanged
  );
} else {
  console.error(
    "[supabase-client.js] Supabase client or client.auth is not initialized correctly!"
  );
}

const supabase = client;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "js/" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "urbandocs_webapp:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"forgottenPassword": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkurbandocs_webapp"] = self["webpackChunkurbandocs_webapp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************************************!*\
  !*** ./src/js/entries/forgotten-password.js ***!
  \**********************************************/
/* harmony import */ var _auth_forgotten_password_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/forgotten-password.js */ "./src/js/auth/forgotten-password.js");


document.addEventListener("DOMContentLoaded", () => {
  (0,_auth_forgotten_password_js__WEBPACK_IMPORTED_MODULE_0__.initForgotPasswordPage)();
  console.log("Forgot password page initialized");
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQSxpQ0FBaUM7O1dBRWpDO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTCxlQUFlO1dBQ2Y7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7V0FDQTtXQUNBOzs7Ozs7Ozs7OztBQ3JGdUU7O0FBRXZFO0FBQ0EsRUFBRSxtRkFBc0I7QUFDeEI7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9BdXRoQWRtaW5BcGkuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9BdXRoQ2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvR29UcnVlQWRtaW5BcGkuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9Hb1RydWVDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi9iYXNlNjR1cmwuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9saWIvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvbGliL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi9mZXRjaC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi9oZWxwZXJzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvbGliL2xvY2FsLXN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9saWIvbG9ja3MuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9saWIvcG9seWZpbGxzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvbGliL3R5cGVzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvZnVuY3Rpb25zLWpzL2Rpc3QvbW9kdWxlL0Z1bmN0aW9uc0NsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9mdW5jdGlvbnMtanMvZGlzdC9tb2R1bGUvaGVscGVyLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2Z1bmN0aW9ucy1qcy9kaXN0L21vZHVsZS90eXBlcy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9ub2RlLWZldGNoL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL1Bvc3RncmVzdEJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL1Bvc3RncmVzdENsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMvZGlzdC9janMvUG9zdGdyZXN0RXJyb3IuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL1Bvc3RncmVzdEZpbHRlckJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL1Bvc3RncmVzdFF1ZXJ5QnVpbGRlci5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMvZGlzdC9janMvUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlci5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMvZGlzdC9janMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L2Nqcy9pbmRleC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMvZGlzdC9janMvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMvZGlzdC9lc20vd3JhcHBlci5tanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvUmVhbHRpbWVDaGFubmVsLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL1JlYWx0aW1lQ2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL1JlYWx0aW1lUHJlc2VuY2UuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9saWIvcHVzaC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9saWIvc2VyaWFsaXplci5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9saWIvdGltZXIuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL3RyYW5zZm9ybWVycy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9saWIvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdG9yYWdlLWpzL2Rpc3QvbW9kdWxlL1N0b3JhZ2VDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9saWIvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvbGliL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdG9yYWdlLWpzL2Rpc3QvbW9kdWxlL2xpYi9mZXRjaC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdG9yYWdlLWpzL2Rpc3QvbW9kdWxlL2xpYi9oZWxwZXJzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9wYWNrYWdlcy9TdG9yYWdlQnVja2V0QXBpLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvcGFja2FnZXMvU3RvcmFnZUZpbGVBcGkuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMvZGlzdC9tb2R1bGUvU3VwYWJhc2VDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMvZGlzdC9tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMvZGlzdC9tb2R1bGUvbGliL1N1cGFiYXNlQXV0aENsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdXBhYmFzZS1qcy9kaXN0L21vZHVsZS9saWIvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N1cGFiYXNlLWpzL2Rpc3QvbW9kdWxlL2xpYi9mZXRjaC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdXBhYmFzZS1qcy9kaXN0L21vZHVsZS9saWIvaGVscGVycy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdXBhYmFzZS1qcy9kaXN0L21vZHVsZS9saWIvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2F1dGgvYXV0aC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2F1dGgvZm9yZ290dGVuLXBhc3N3b3JkLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvc3VwYWJhc2UtY2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvZW50cmllcy9mb3Jnb3R0ZW4tcGFzc3dvcmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdvVHJ1ZUFkbWluQXBpIGZyb20gJy4vR29UcnVlQWRtaW5BcGknO1xuY29uc3QgQXV0aEFkbWluQXBpID0gR29UcnVlQWRtaW5BcGk7XG5leHBvcnQgZGVmYXVsdCBBdXRoQWRtaW5BcGk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BdXRoQWRtaW5BcGkuanMubWFwIiwiaW1wb3J0IEdvVHJ1ZUNsaWVudCBmcm9tICcuL0dvVHJ1ZUNsaWVudCc7XG5jb25zdCBBdXRoQ2xpZW50ID0gR29UcnVlQ2xpZW50O1xuZXhwb3J0IGRlZmF1bHQgQXV0aENsaWVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUF1dGhDbGllbnQuanMubWFwIiwidmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgX2dlbmVyYXRlTGlua1Jlc3BvbnNlLCBfbm9SZXNvbHZlSnNvblJlc3BvbnNlLCBfcmVxdWVzdCwgX3VzZXJSZXNwb25zZSwgfSBmcm9tICcuL2xpYi9mZXRjaCc7XG5pbXBvcnQgeyByZXNvbHZlRmV0Y2ggfSBmcm9tICcuL2xpYi9oZWxwZXJzJztcbmltcG9ydCB7IGlzQXV0aEVycm9yIH0gZnJvbSAnLi9saWIvZXJyb3JzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvVHJ1ZUFkbWluQXBpIHtcbiAgICBjb25zdHJ1Y3Rvcih7IHVybCA9ICcnLCBoZWFkZXJzID0ge30sIGZldGNoLCB9KSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICB0aGlzLmZldGNoID0gcmVzb2x2ZUZldGNoKGZldGNoKTtcbiAgICAgICAgdGhpcy5tZmEgPSB7XG4gICAgICAgICAgICBsaXN0RmFjdG9yczogdGhpcy5fbGlzdEZhY3RvcnMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGRlbGV0ZUZhY3RvcjogdGhpcy5fZGVsZXRlRmFjdG9yLmJpbmQodGhpcyksXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBsb2dnZWQtaW4gc2Vzc2lvbi5cbiAgICAgKiBAcGFyYW0gand0IEEgdmFsaWQsIGxvZ2dlZC1pbiBKV1QuXG4gICAgICogQHBhcmFtIHNjb3BlIFRoZSBsb2dvdXQgc29wZS5cbiAgICAgKi9cbiAgICBhc3luYyBzaWduT3V0KGp3dCwgc2NvcGUgPSAnZ2xvYmFsJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vbG9nb3V0P3Njb3BlPSR7c2NvcGV9YCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBqd3QsXG4gICAgICAgICAgICAgICAgbm9SZXNvbHZlSnNvbjogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYW4gaW52aXRlIGxpbmsgdG8gYW4gZW1haWwgYWRkcmVzcy5cbiAgICAgKiBAcGFyYW0gZW1haWwgVGhlIGVtYWlsIGFkZHJlc3Mgb2YgdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgQWRkaXRpb25hbCBvcHRpb25zIHRvIGJlIGluY2x1ZGVkIHdoZW4gaW52aXRpbmcuXG4gICAgICovXG4gICAgYXN5bmMgaW52aXRlVXNlckJ5RW1haWwoZW1haWwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L2ludml0ZWAsIHtcbiAgICAgICAgICAgICAgICBib2R5OiB7IGVtYWlsLCBkYXRhOiBvcHRpb25zLmRhdGEgfSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogb3B0aW9ucy5yZWRpcmVjdFRvLFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgZW1haWwgbGlua3MgYW5kIE9UUHMgdG8gYmUgc2VudCB2aWEgYSBjdXN0b20gZW1haWwgcHJvdmlkZXIuXG4gICAgICogQHBhcmFtIGVtYWlsIFRoZSB1c2VyJ3MgZW1haWwuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucGFzc3dvcmQgVXNlciBwYXNzd29yZC4gRm9yIHNpZ251cCBvbmx5LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRhdGEgT3B0aW9uYWwgdXNlciBtZXRhZGF0YS4gRm9yIHNpZ251cCBvbmx5LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnJlZGlyZWN0VG8gVGhlIHJlZGlyZWN0IHVybCB3aGljaCBzaG91bGQgYmUgYXBwZW5kZWQgdG8gdGhlIGdlbmVyYXRlZCBsaW5rXG4gICAgICovXG4gICAgYXN5bmMgZ2VuZXJhdGVMaW5rKHBhcmFtcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSBwYXJhbXMsIHJlc3QgPSBfX3Jlc3QocGFyYW1zLCBbXCJvcHRpb25zXCJdKTtcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHJlc3QpLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmICgnbmV3RW1haWwnIGluIHJlc3QpIHtcbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIG5ld0VtYWlsIHdpdGggbmV3X2VtYWlsIGluIHJlcXVlc3QgYm9keVxuICAgICAgICAgICAgICAgIGJvZHkubmV3X2VtYWlsID0gcmVzdCA9PT0gbnVsbCB8fCByZXN0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXN0Lm5ld0VtYWlsO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBib2R5WyduZXdFbWFpbCddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L2FkbWluL2dlbmVyYXRlX2xpbmtgLCB7XG4gICAgICAgICAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgeGZvcm06IF9nZW5lcmF0ZUxpbmtSZXNwb25zZSxcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucmVkaXJlY3RUbyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gVXNlciBBZG1pbiBBUElcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHVzZXIuXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYSBzZXJ2ZXIuIE5ldmVyIGV4cG9zZSB5b3VyIGBzZXJ2aWNlX3JvbGVgIGtleSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKi9cbiAgICBhc3luYyBjcmVhdGVVc2VyKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9hZG1pbi91c2Vyc2AsIHtcbiAgICAgICAgICAgICAgICBib2R5OiBhdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3VzZXJSZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGEgbGlzdCBvZiB1c2Vycy5cbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIGEgc2VydmVyLiBOZXZlciBleHBvc2UgeW91ciBgc2VydmljZV9yb2xlYCBrZXkgaW4gdGhlIGJyb3dzZXIuXG4gICAgICogQHBhcmFtIHBhcmFtcyBBbiBvYmplY3Qgd2hpY2ggc3VwcG9ydHMgYHBhZ2VgIGFuZCBgcGVyUGFnZWAgYXMgbnVtYmVycywgdG8gYWx0ZXIgdGhlIHBhZ2luYXRlZCByZXN1bHRzLlxuICAgICAqL1xuICAgIGFzeW5jIGxpc3RVc2VycyhwYXJhbXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IHsgbmV4dFBhZ2U6IG51bGwsIGxhc3RQYWdlOiAwLCB0b3RhbDogMCB9O1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnR0VUJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzYCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBub1Jlc29sdmVKc29uOiB0cnVlLFxuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2U6IChfYiA9IChfYSA9IHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5wYWdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJycsXG4gICAgICAgICAgICAgICAgICAgIHBlcl9wYWdlOiAoX2QgPSAoX2MgPSBwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMucGVyUGFnZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnRvU3RyaW5nKCkpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6ICcnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeGZvcm06IF9ub1Jlc29sdmVKc29uUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5lcnJvcilcbiAgICAgICAgICAgICAgICB0aHJvdyByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgY29uc3QgdG90YWwgPSAoX2UgPSByZXNwb25zZS5oZWFkZXJzLmdldCgneC10b3RhbC1jb3VudCcpKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiAwO1xuICAgICAgICAgICAgY29uc3QgbGlua3MgPSAoX2cgPSAoX2YgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnbGluaycpKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Yuc3BsaXQoJywnKSkgIT09IG51bGwgJiYgX2cgIT09IHZvaWQgMCA/IF9nIDogW107XG4gICAgICAgICAgICBpZiAobGlua3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHBhcnNlSW50KGxpbmsuc3BsaXQoJzsnKVswXS5zcGxpdCgnPScpWzFdLnN1YnN0cmluZygwLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbCA9IEpTT04ucGFyc2UobGluay5zcGxpdCgnOycpWzFdLnNwbGl0KCc9JylbMV0pO1xuICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uW2Ake3JlbH1QYWdlYF0gPSBwYWdlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHBhZ2luYXRpb24udG90YWwgPSBwYXJzZUludCh0b3RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHVzZXJzKSwgcGFnaW5hdGlvbiksIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyczogW10gfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB1c2VyIGJ5IGlkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHVpZCBUaGUgdXNlcidzIHVuaXF1ZSBpZGVudGlmaWVyXG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBhIHNlcnZlci4gTmV2ZXIgZXhwb3NlIHlvdXIgYHNlcnZpY2Vfcm9sZWAga2V5IGluIHRoZSBicm93c2VyLlxuICAgICAqL1xuICAgIGFzeW5jIGdldFVzZXJCeUlkKHVpZCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdHRVQnLCBgJHt0aGlzLnVybH0vYWRtaW4vdXNlcnMvJHt1aWR9YCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3VzZXJSZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgdXNlciBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIGF0dHJpYnV0ZXMgVGhlIGRhdGEgeW91IHdhbnQgdG8gdXBkYXRlLlxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYSBzZXJ2ZXIuIE5ldmVyIGV4cG9zZSB5b3VyIGBzZXJ2aWNlX3JvbGVgIGtleSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVVc2VyQnlJZCh1aWQsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUFVUJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzLyR7dWlkfWAsIHtcbiAgICAgICAgICAgICAgICBib2R5OiBhdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3VzZXJSZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsZXRlIGEgdXNlci4gUmVxdWlyZXMgYSBgc2VydmljZV9yb2xlYCBrZXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgVGhlIHVzZXIgaWQgeW91IHdhbnQgdG8gcmVtb3ZlLlxuICAgICAqIEBwYXJhbSBzaG91bGRTb2Z0RGVsZXRlIElmIHRydWUsIHRoZW4gdGhlIHVzZXIgd2lsbCBiZSBzb2Z0LWRlbGV0ZWQgZnJvbSB0aGUgYXV0aCBzY2hlbWEuIFNvZnQgZGVsZXRpb24gYWxsb3dzIHVzZXIgaWRlbnRpZmljYXRpb24gZnJvbSB0aGUgaGFzaGVkIHVzZXIgSUQgYnV0IGlzIG5vdCByZXZlcnNpYmxlLlxuICAgICAqIERlZmF1bHRzIHRvIGZhbHNlIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LlxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYSBzZXJ2ZXIuIE5ldmVyIGV4cG9zZSB5b3VyIGBzZXJ2aWNlX3JvbGVgIGtleSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGVVc2VyKGlkLCBzaG91bGRTb2Z0RGVsZXRlID0gZmFsc2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnREVMRVRFJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzLyR7aWR9YCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3VsZF9zb2Z0X2RlbGV0ZTogc2hvdWxkU29mdERlbGV0ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBfbGlzdEZhY3RvcnMocGFyYW1zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnR0VUJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzLyR7cGFyYW1zLnVzZXJJZH0vZmFjdG9yc2AsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgeGZvcm06IChmYWN0b3JzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgZmFjdG9ycyB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIF9kZWxldGVGYWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0RFTEVURScsIGAke3RoaXMudXJsfS9hZG1pbi91c2Vycy8ke3BhcmFtcy51c2VySWR9L2ZhY3RvcnMvJHtwYXJhbXMuaWR9YCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Hb1RydWVBZG1pbkFwaS5qcy5tYXAiLCJpbXBvcnQgR29UcnVlQWRtaW5BcGkgZnJvbSAnLi9Hb1RydWVBZG1pbkFwaSc7XG5pbXBvcnQgeyBERUZBVUxUX0hFQURFUlMsIEVYUElSWV9NQVJHSU5fTVMsIEFVVE9fUkVGUkVTSF9USUNLX0RVUkFUSU9OX01TLCBBVVRPX1JFRlJFU0hfVElDS19USFJFU0hPTEQsIEdPVFJVRV9VUkwsIFNUT1JBR0VfS0VZLCBKV0tTX1RUTCwgfSBmcm9tICcuL2xpYi9jb25zdGFudHMnO1xuaW1wb3J0IHsgQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yLCBBdXRoUEtDRUdyYW50Q29kZUV4Y2hhbmdlRXJyb3IsIEF1dGhJbnZhbGlkQ3JlZGVudGlhbHNFcnJvciwgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IsIEF1dGhJbnZhbGlkVG9rZW5SZXNwb25zZUVycm9yLCBBdXRoVW5rbm93bkVycm9yLCBpc0F1dGhBcGlFcnJvciwgaXNBdXRoRXJyb3IsIGlzQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IsIGlzQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IsIGlzQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yLCBBdXRoSW52YWxpZEp3dEVycm9yLCB9IGZyb20gJy4vbGliL2Vycm9ycyc7XG5pbXBvcnQgeyBfcmVxdWVzdCwgX3Nlc3Npb25SZXNwb25zZSwgX3Nlc3Npb25SZXNwb25zZVBhc3N3b3JkLCBfdXNlclJlc3BvbnNlLCBfc3NvUmVzcG9uc2UsIH0gZnJvbSAnLi9saWIvZmV0Y2gnO1xuaW1wb3J0IHsgRGVmZXJyZWQsIGdldEl0ZW1Bc3luYywgaXNCcm93c2VyLCByZW1vdmVJdGVtQXN5bmMsIHJlc29sdmVGZXRjaCwgc2V0SXRlbUFzeW5jLCB1dWlkLCByZXRyeWFibGUsIHNsZWVwLCBzdXBwb3J0c0xvY2FsU3RvcmFnZSwgcGFyc2VQYXJhbWV0ZXJzRnJvbVVSTCwgZ2V0Q29kZUNoYWxsZW5nZUFuZE1ldGhvZCwgZ2V0QWxnb3JpdGhtLCB2YWxpZGF0ZUV4cCwgZGVjb2RlSldULCB9IGZyb20gJy4vbGliL2hlbHBlcnMnO1xuaW1wb3J0IHsgbG9jYWxTdG9yYWdlQWRhcHRlciwgbWVtb3J5TG9jYWxTdG9yYWdlQWRhcHRlciB9IGZyb20gJy4vbGliL2xvY2FsLXN0b3JhZ2UnO1xuaW1wb3J0IHsgcG9seWZpbGxHbG9iYWxUaGlzIH0gZnJvbSAnLi9saWIvcG9seWZpbGxzJztcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL2xpYi92ZXJzaW9uJztcbmltcG9ydCB7IExvY2tBY3F1aXJlVGltZW91dEVycm9yLCBuYXZpZ2F0b3JMb2NrIH0gZnJvbSAnLi9saWIvbG9ja3MnO1xuaW1wb3J0IHsgc3RyaW5nVG9VaW50OEFycmF5IH0gZnJvbSAnLi9saWIvYmFzZTY0dXJsJztcbnBvbHlmaWxsR2xvYmFsVGhpcygpOyAvLyBNYWtlIFwiZ2xvYmFsVGhpc1wiIGF2YWlsYWJsZVxuY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHVybDogR09UUlVFX1VSTCxcbiAgICBzdG9yYWdlS2V5OiBTVE9SQUdFX0tFWSxcbiAgICBhdXRvUmVmcmVzaFRva2VuOiB0cnVlLFxuICAgIHBlcnNpc3RTZXNzaW9uOiB0cnVlLFxuICAgIGRldGVjdFNlc3Npb25JblVybDogdHJ1ZSxcbiAgICBoZWFkZXJzOiBERUZBVUxUX0hFQURFUlMsXG4gICAgZmxvd1R5cGU6ICdpbXBsaWNpdCcsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIGhhc0N1c3RvbUF1dGhvcml6YXRpb25IZWFkZXI6IGZhbHNlLFxufTtcbmFzeW5jIGZ1bmN0aW9uIGxvY2tOb09wKG5hbWUsIGFjcXVpcmVUaW1lb3V0LCBmbikge1xuICAgIHJldHVybiBhd2FpdCBmbigpO1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29UcnVlQ2xpZW50IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgY2xpZW50IGZvciB1c2UgaW4gdGhlIGJyb3dzZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB0aGlzLm1lbW9yeVN0b3JhZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuYXV0b1JlZnJlc2hUaWNrZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2sgPSBudWxsO1xuICAgICAgICB0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZCA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgYXN5bmMgY2xpZW50IGluaXRpYWxpemF0aW9uLlxuICAgICAgICAgKiBXaGVuIG51bGwgb3Igbm90IHlldCByZXNvbHZlZCB0aGUgYXV0aCBzdGF0ZSBpcyBgdW5rbm93bmBcbiAgICAgICAgICogT25jZSByZXNvbHZlZCB0aGUgdGhlIGF1dGggc3RhdGUgaXMga25vd24gYW5kIGl0J3Mgc2F2ZSB0byBjYWxsIGFueSBmdXJ0aGVyIGNsaWVudCBtZXRob2RzLlxuICAgICAgICAgKiBLZWVwIGV4dHJhIGNhcmUgdG8gbmV2ZXIgcmVqZWN0IG9yIHRocm93IHVuY2F1Z2h0IGVycm9yc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbml0aWFsaXplUHJvbWlzZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZGV0ZWN0U2Vzc2lvbkluVXJsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oYXNDdXN0b21BdXRob3JpemF0aW9uSGVhZGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3VwcHJlc3NHZXRTZXNzaW9uV2FybmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvY2tBY3F1aXJlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBlbmRpbmdJbkxvY2sgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZWQgdG8gYnJvYWRjYXN0IHN0YXRlIGNoYW5nZSBldmVudHMgdG8gb3RoZXIgdGFicyBsaXN0ZW5pbmcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmJyb2FkY2FzdENoYW5uZWwgPSBudWxsO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IGNvbnNvbGUubG9nO1xuICAgICAgICB0aGlzLmluc3RhbmNlSUQgPSBHb1RydWVDbGllbnQubmV4dEluc3RhbmNlSUQ7XG4gICAgICAgIEdvVHJ1ZUNsaWVudC5uZXh0SW5zdGFuY2VJRCArPSAxO1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZUlEID4gMCAmJiBpc0Jyb3dzZXIoKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdNdWx0aXBsZSBHb1RydWVDbGllbnQgaW5zdGFuY2VzIGRldGVjdGVkIGluIHRoZSBzYW1lIGJyb3dzZXIgY29udGV4dC4gSXQgaXMgbm90IGFuIGVycm9yLCBidXQgdGhpcyBzaG91bGQgYmUgYXZvaWRlZCBhcyBpdCBtYXkgcHJvZHVjZSB1bmRlZmluZWQgYmVoYXZpb3Igd2hlbiB1c2VkIGNvbmN1cnJlbnRseSB1bmRlciB0aGUgc2FtZSBzdG9yYWdlIGtleS4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TKSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMubG9nRGVidWdNZXNzYWdlcyA9ICEhc2V0dGluZ3MuZGVidWc7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MuZGVidWcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gc2V0dGluZ3MuZGVidWc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZXJzaXN0U2Vzc2lvbiA9IHNldHRpbmdzLnBlcnNpc3RTZXNzaW9uO1xuICAgICAgICB0aGlzLnN0b3JhZ2VLZXkgPSBzZXR0aW5ncy5zdG9yYWdlS2V5O1xuICAgICAgICB0aGlzLmF1dG9SZWZyZXNoVG9rZW4gPSBzZXR0aW5ncy5hdXRvUmVmcmVzaFRva2VuO1xuICAgICAgICB0aGlzLmFkbWluID0gbmV3IEdvVHJ1ZUFkbWluQXBpKHtcbiAgICAgICAgICAgIHVybDogc2V0dGluZ3MudXJsLFxuICAgICAgICAgICAgaGVhZGVyczogc2V0dGluZ3MuaGVhZGVycyxcbiAgICAgICAgICAgIGZldGNoOiBzZXR0aW5ncy5mZXRjaCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudXJsID0gc2V0dGluZ3MudXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBzZXR0aW5ncy5oZWFkZXJzO1xuICAgICAgICB0aGlzLmZldGNoID0gcmVzb2x2ZUZldGNoKHNldHRpbmdzLmZldGNoKTtcbiAgICAgICAgdGhpcy5sb2NrID0gc2V0dGluZ3MubG9jayB8fCBsb2NrTm9PcDtcbiAgICAgICAgdGhpcy5kZXRlY3RTZXNzaW9uSW5VcmwgPSBzZXR0aW5ncy5kZXRlY3RTZXNzaW9uSW5Vcmw7XG4gICAgICAgIHRoaXMuZmxvd1R5cGUgPSBzZXR0aW5ncy5mbG93VHlwZTtcbiAgICAgICAgdGhpcy5oYXNDdXN0b21BdXRob3JpemF0aW9uSGVhZGVyID0gc2V0dGluZ3MuaGFzQ3VzdG9tQXV0aG9yaXphdGlvbkhlYWRlcjtcbiAgICAgICAgaWYgKHNldHRpbmdzLmxvY2spIHtcbiAgICAgICAgICAgIHRoaXMubG9jayA9IHNldHRpbmdzLmxvY2s7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNCcm93c2VyKCkgJiYgKChfYSA9IGdsb2JhbFRoaXMgPT09IG51bGwgfHwgZ2xvYmFsVGhpcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZ2xvYmFsVGhpcy5uYXZpZ2F0b3IpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sb2NrcykpIHtcbiAgICAgICAgICAgIHRoaXMubG9jayA9IG5hdmlnYXRvckxvY2s7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvY2sgPSBsb2NrTm9PcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmp3a3MgPSB7IGtleXM6IFtdIH07XG4gICAgICAgIHRoaXMuandrc19jYWNoZWRfYXQgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjtcbiAgICAgICAgdGhpcy5tZmEgPSB7XG4gICAgICAgICAgICB2ZXJpZnk6IHRoaXMuX3ZlcmlmeS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZW5yb2xsOiB0aGlzLl9lbnJvbGwuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHVuZW5yb2xsOiB0aGlzLl91bmVucm9sbC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2hhbGxlbmdlOiB0aGlzLl9jaGFsbGVuZ2UuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGxpc3RGYWN0b3JzOiB0aGlzLl9saXN0RmFjdG9ycy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY2hhbGxlbmdlQW5kVmVyaWZ5OiB0aGlzLl9jaGFsbGVuZ2VBbmRWZXJpZnkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGdldEF1dGhlbnRpY2F0b3JBc3N1cmFuY2VMZXZlbDogdGhpcy5fZ2V0QXV0aGVudGljYXRvckFzc3VyYW5jZUxldmVsLmJpbmQodGhpcyksXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnBlcnNpc3RTZXNzaW9uKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3Muc3RvcmFnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IHNldHRpbmdzLnN0b3JhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydHNMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSBsb2NhbFN0b3JhZ2VBZGFwdGVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW1vcnlTdG9yYWdlID0ge307XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IG1lbW9yeUxvY2FsU3RvcmFnZUFkYXB0ZXIodGhpcy5tZW1vcnlTdG9yYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lbW9yeVN0b3JhZ2UgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IG1lbW9yeUxvY2FsU3RvcmFnZUFkYXB0ZXIodGhpcy5tZW1vcnlTdG9yYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCcm93c2VyKCkgJiYgZ2xvYmFsVGhpcy5Ccm9hZGNhc3RDaGFubmVsICYmIHRoaXMucGVyc2lzdFNlc3Npb24gJiYgdGhpcy5zdG9yYWdlS2V5KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0Q2hhbm5lbCA9IG5ldyBnbG9iYWxUaGlzLkJyb2FkY2FzdENoYW5uZWwodGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGNyZWF0ZSBhIG5ldyBCcm9hZGNhc3RDaGFubmVsLCBtdWx0aS10YWIgc3RhdGUgY2hhbmdlcyB3aWxsIG5vdCBiZSBhdmFpbGFibGUnLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIChfYiA9IHRoaXMuYnJvYWRjYXN0Q2hhbm5lbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygncmVjZWl2ZWQgYnJvYWRjYXN0IG5vdGlmaWNhdGlvbiBmcm9tIG90aGVyIHRhYiBvciBjbGllbnQnLCBldmVudCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoZXZlbnQuZGF0YS5ldmVudCwgZXZlbnQuZGF0YS5zZXNzaW9uLCBmYWxzZSk7IC8vIGJyb2FkY2FzdCA9IGZhbHNlIHNvIHdlIGRvbid0IGdldCBhbiBlbmRsZXNzIGxvb3Agb2YgbWVzc2FnZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICAgIH1cbiAgICBfZGVidWcoLi4uYXJncykge1xuICAgICAgICBpZiAodGhpcy5sb2dEZWJ1Z01lc3NhZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcihgR29UcnVlQ2xpZW50QCR7dGhpcy5pbnN0YW5jZUlEfSAoJHt2ZXJzaW9ufSkgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9YCwgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBjbGllbnQgc2Vzc2lvbiBlaXRoZXIgZnJvbSB0aGUgdXJsIG9yIGZyb20gc3RvcmFnZS5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBhdXRvbWF0aWNhbGx5IGNhbGxlZCB3aGVuIGluc3RhbnRpYXRpbmcgdGhlIGNsaWVudCwgYnV0IHNob3VsZCBhbHNvIGJlIGNhbGxlZFxuICAgICAqIG1hbnVhbGx5IHdoZW4gY2hlY2tpbmcgZm9yIGFuIGVycm9yIGZyb20gYW4gYXV0aCByZWRpcmVjdCAob2F1dGgsIG1hZ2ljbGluaywgcGFzc3dvcmQgcmVjb3ZlcnksIGV0YykuXG4gICAgICovXG4gICAgYXN5bmMgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZVByb21pc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2luaXRpYWxpemUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSU1QT1JUQU5UOlxuICAgICAqIDEuIE5ldmVyIHRocm93IGluIHRoaXMgbWV0aG9kLCBhcyBpdCBpcyBjYWxsZWQgZnJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAgKiAyLiBOZXZlciByZXR1cm4gYSBzZXNzaW9uIGZyb20gdGhpcyBtZXRob2QgYXMgaXQgd291bGQgYmUgY2FjaGVkIG92ZXJcbiAgICAgKiAgICB0aGUgd2hvbGUgbGlmZXRpbWUgb2YgdGhlIGNsaWVudFxuICAgICAqL1xuICAgIGFzeW5jIF9pbml0aWFsaXplKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBwYXJzZVBhcmFtZXRlcnNGcm9tVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgIGxldCBjYWxsYmFja1VybFR5cGUgPSAnbm9uZSc7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNJbXBsaWNpdEdyYW50Q2FsbGJhY2socGFyYW1zKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrVXJsVHlwZSA9ICdpbXBsaWNpdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhd2FpdCB0aGlzLl9pc1BLQ0VDYWxsYmFjayhwYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tVcmxUeXBlID0gJ3BrY2UnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBdHRlbXB0IHRvIGdldCB0aGUgc2Vzc2lvbiBmcm9tIHRoZSBVUkwgb25seSBpZiB0aGVzZSBjb25kaXRpb25zIGFyZSBmdWxmaWxsZWRcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBOb3RlOiBJZiB0aGUgVVJMIGlzbid0IG9uZSBvZiB0aGUgY2FsbGJhY2sgdXJsIHR5cGVzIChpbXBsaWNpdCBvciBwa2NlKSxcbiAgICAgICAgICAgICAqIHRoZW4gdGhlcmUgY291bGQgYmUgYW4gZXhpc3Rpbmcgc2Vzc2lvbiBzbyB3ZSBkb24ndCB3YW50IHRvIHByZW1hdHVyZWx5IHJlbW92ZSBpdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoaXNCcm93c2VyKCkgJiYgdGhpcy5kZXRlY3RTZXNzaW9uSW5VcmwgJiYgY2FsbGJhY2tVcmxUeXBlICE9PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCB0aGlzLl9nZXRTZXNzaW9uRnJvbVVSTChwYXJhbXMsIGNhbGxiYWNrVXJsVHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2luaXRpYWxpemUoKScsICdlcnJvciBkZXRlY3Rpbmcgc2Vzc2lvbiBmcm9tIFVSTCcsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gKF9hID0gZXJyb3IuZGV0YWlscykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JDb2RlID09PSAnaWRlbnRpdHlfYWxyZWFkeV9leGlzdHMnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDb2RlID09PSAnaWRlbnRpdHlfbm90X2ZvdW5kJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ29kZSA9PT0gJ3NpbmdsZV9pZGVudGl0eV9ub3RfZGVsZXRhYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gZmFpbGVkIGxvZ2luIGF0dGVtcHQgdmlhIHVybCxcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIG9sZCBzZXNzaW9uIGFzIGluIHZlcmlmeU90cCwgc2lnblVwIGFuZCBzaWduSW5XaXRoKlxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgc2Vzc2lvbiwgcmVkaXJlY3RUeXBlIH0gPSBkYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2luaXRpYWxpemUoKScsICdkZXRlY3RlZCBzZXNzaW9uIGluIFVSTCcsIHNlc3Npb24sICdyZWRpcmVjdCB0eXBlJywgcmVkaXJlY3RUeXBlKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZGlyZWN0VHlwZSA9PT0gJ3JlY292ZXJ5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1BBU1NXT1JEX1JFQ09WRVJZJywgc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbm8gbG9naW4gYXR0ZW1wdCB2aWEgY2FsbGJhY2sgdXJsIHRyeSB0byByZWNvdmVyIHNlc3Npb24gZnJvbSBzdG9yYWdlXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9yZWNvdmVyQW5kUmVmcmVzaCgpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBlcnJvcjogbmV3IEF1dGhVbmtub3duRXJyb3IoJ1VuZXhwZWN0ZWQgZXJyb3IgZHVyaW5nIGluaXRpYWxpemF0aW9uJywgZXJyb3IpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2luaXRpYWxpemUoKScsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGFub255bW91cyB1c2VyLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBzZXNzaW9uIHdoZXJlIHRoZSBpc19hbm9ueW1vdXMgY2xhaW0gaW4gdGhlIGFjY2VzcyB0b2tlbiBKV1Qgc2V0IHRvIHRydWVcbiAgICAgKi9cbiAgICBhc3luYyBzaWduSW5Bbm9ueW1vdXNseShjcmVkZW50aWFscykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3NpZ251cGAsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiAoX2IgPSAoX2EgPSBjcmVkZW50aWFscyA9PT0gbnVsbCB8fCBjcmVkZW50aWFscyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRhdGEpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHt9LFxuICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiAoX2MgPSBjcmVkZW50aWFscyA9PT0gbnVsbCB8fCBjcmVkZW50aWFscyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHJlcztcbiAgICAgICAgICAgIGlmIChlcnJvciB8fCAhZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBkYXRhLnNlc3Npb247XG4gICAgICAgICAgICBjb25zdCB1c2VyID0gZGF0YS51c2VyO1xuICAgICAgICAgICAgaWYgKGRhdGEuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9JTicsIHNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyLCBzZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHVzZXIuXG4gICAgICpcbiAgICAgKiBCZSBhd2FyZSB0aGF0IGlmIGEgdXNlciBhY2NvdW50IGV4aXN0cyBpbiB0aGUgc3lzdGVtIHlvdSBtYXkgZ2V0IGJhY2sgYW5cbiAgICAgKiBlcnJvciBtZXNzYWdlIHRoYXQgYXR0ZW1wdHMgdG8gaGlkZSB0aGlzIGluZm9ybWF0aW9uIGZyb20gdGhlIHVzZXIuXG4gICAgICogVGhpcyBtZXRob2QgaGFzIHN1cHBvcnQgZm9yIFBLQ0UgdmlhIGVtYWlsIHNpZ251cHMuIFRoZSBQS0NFIGZsb3cgY2Fubm90IGJlIHVzZWQgd2hlbiBhdXRvY29uZmlybSBpcyBlbmFibGVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBsb2dnZWQtaW4gc2Vzc2lvbiBpZiB0aGUgc2VydmVyIGhhcyBcImF1dG9jb25maXJtXCIgT05cbiAgICAgKiBAcmV0dXJucyBBIHVzZXIgaWYgdGhlIHNlcnZlciBoYXMgXCJhdXRvY29uZmlybVwiIE9GRlxuICAgICAqL1xuICAgIGFzeW5jIHNpZ25VcChjcmVkZW50aWFscykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXM7XG4gICAgICAgICAgICBpZiAoJ2VtYWlsJyBpbiBjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCBvcHRpb25zIH0gPSBjcmVkZW50aWFscztcbiAgICAgICAgICAgICAgICBsZXQgY29kZUNoYWxsZW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IGNvZGVDaGFsbGVuZ2VNZXRob2QgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZsb3dUeXBlID09PSAncGtjZScpIHtcbiAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICBbY29kZUNoYWxsZW5nZSwgY29kZUNoYWxsZW5nZU1ldGhvZF0gPSBhd2FpdCBnZXRDb2RlQ2hhbGxlbmdlQW5kTWV0aG9kKHRoaXMuc3RvcmFnZSwgdGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vc2lnbnVwYCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5lbWFpbFJlZGlyZWN0VG8sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGF0YSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlX2NoYWxsZW5nZTogY29kZUNoYWxsZW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogY29kZUNoYWxsZW5nZU1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgncGhvbmUnIGluIGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBwaG9uZSwgcGFzc3dvcmQsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgIHJlcyA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3NpZ251cGAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKF9iID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRhdGEpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogKF9jID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNoYW5uZWwpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6ICdzbXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgZWl0aGVyIGFuIGVtYWlsIG9yIHBob25lIG51bWJlciBhbmQgYSBwYXNzd29yZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzO1xuICAgICAgICAgICAgaWYgKGVycm9yIHx8ICFkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yOiBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGRhdGEuc2Vzc2lvbjtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBkYXRhLnVzZXI7XG4gICAgICAgICAgICBpZiAoZGF0YS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgc2Vzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXIsIHNlc3Npb24gfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvZyBpbiBhbiBleGlzdGluZyB1c2VyIHdpdGggYW4gZW1haWwgYW5kIHBhc3N3b3JkIG9yIHBob25lIGFuZCBwYXNzd29yZC5cbiAgICAgKlxuICAgICAqIEJlIGF3YXJlIHRoYXQgeW91IG1heSBnZXQgYmFjayBhbiBlcnJvciBtZXNzYWdlIHRoYXQgd2lsbCBub3QgZGlzdGluZ3Vpc2hcbiAgICAgKiBiZXR3ZWVuIHRoZSBjYXNlcyB3aGVyZSB0aGUgYWNjb3VudCBkb2VzIG5vdCBleGlzdCBvciB0aGF0IHRoZVxuICAgICAqIGVtYWlsL3Bob25lIGFuZCBwYXNzd29yZCBjb21iaW5hdGlvbiBpcyB3cm9uZyBvciB0aGF0IHRoZSBhY2NvdW50IGNhbiBvbmx5XG4gICAgICogYmUgYWNjZXNzZWQgdmlhIHNvY2lhbCBsb2dpbi5cbiAgICAgKi9cbiAgICBhc3luYyBzaWduSW5XaXRoUGFzc3dvcmQoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZXM7XG4gICAgICAgICAgICBpZiAoJ2VtYWlsJyBpbiBjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCBvcHRpb25zIH0gPSBjcmVkZW50aWFscztcbiAgICAgICAgICAgICAgICByZXMgPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS90b2tlbj9ncmFudF90eXBlPXBhc3N3b3JkYCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgncGhvbmUnIGluIGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBwaG9uZSwgcGFzc3dvcmQsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgIHJlcyA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3Rva2VuP2dyYW50X3R5cGU9cGFzc3dvcmRgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2VQYXNzd29yZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgZWl0aGVyIGFuIGVtYWlsIG9yIHBob25lIG51bWJlciBhbmQgYSBwYXNzd29yZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzO1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghZGF0YSB8fCAhZGF0YS5zZXNzaW9uIHx8ICFkYXRhLnVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3I6IG5ldyBBdXRoSW52YWxpZFRva2VuUmVzcG9uc2VFcnJvcigpIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7IHVzZXI6IGRhdGEudXNlciwgc2Vzc2lvbjogZGF0YS5zZXNzaW9uIH0sIChkYXRhLndlYWtfcGFzc3dvcmQgPyB7IHdlYWtQYXNzd29yZDogZGF0YS53ZWFrX3Bhc3N3b3JkIH0gOiBudWxsKSksXG4gICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9nIGluIGFuIGV4aXN0aW5nIHVzZXIgdmlhIGEgdGhpcmQtcGFydHkgcHJvdmlkZXIuXG4gICAgICogVGhpcyBtZXRob2Qgc3VwcG9ydHMgdGhlIFBLQ0UgZmxvdy5cbiAgICAgKi9cbiAgICBhc3luYyBzaWduSW5XaXRoT0F1dGgoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5faGFuZGxlUHJvdmlkZXJTaWduSW4oY3JlZGVudGlhbHMucHJvdmlkZXIsIHtcbiAgICAgICAgICAgIHJlZGlyZWN0VG86IChfYSA9IGNyZWRlbnRpYWxzLm9wdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZWRpcmVjdFRvLFxuICAgICAgICAgICAgc2NvcGVzOiAoX2IgPSBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc2NvcGVzLFxuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IChfYyA9IGNyZWRlbnRpYWxzLm9wdGlvbnMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5xdWVyeVBhcmFtcyxcbiAgICAgICAgICAgIHNraXBCcm93c2VyUmVkaXJlY3Q6IChfZCA9IGNyZWRlbnRpYWxzLm9wdGlvbnMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5za2lwQnJvd3NlclJlZGlyZWN0LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9nIGluIGFuIGV4aXN0aW5nIHVzZXIgYnkgZXhjaGFuZ2luZyBhbiBBdXRoIENvZGUgaXNzdWVkIGR1cmluZyB0aGUgUEtDRSBmbG93LlxuICAgICAqL1xuICAgIGFzeW5jIGV4Y2hhbmdlQ29kZUZvclNlc3Npb24oYXV0aENvZGUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXhjaGFuZ2VDb2RlRm9yU2Vzc2lvbihhdXRoQ29kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBfZXhjaGFuZ2VDb2RlRm9yU2Vzc2lvbihhdXRoQ29kZSkge1xuICAgICAgICBjb25zdCBzdG9yYWdlSXRlbSA9IGF3YWl0IGdldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIGAke3RoaXMuc3RvcmFnZUtleX0tY29kZS12ZXJpZmllcmApO1xuICAgICAgICBjb25zdCBbY29kZVZlcmlmaWVyLCByZWRpcmVjdFR5cGVdID0gKHN0b3JhZ2VJdGVtICE9PSBudWxsICYmIHN0b3JhZ2VJdGVtICE9PSB2b2lkIDAgPyBzdG9yYWdlSXRlbSA6ICcnKS5zcGxpdCgnLycpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vdG9rZW4/Z3JhbnRfdHlwZT1wa2NlYCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgIGF1dGhfY29kZTogYXV0aENvZGUsXG4gICAgICAgICAgICAgICAgICAgIGNvZGVfdmVyaWZpZXI6IGNvZGVWZXJpZmllcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCByZW1vdmVJdGVtQXN5bmModGhpcy5zdG9yYWdlLCBgJHt0aGlzLnN0b3JhZ2VLZXl9LWNvZGUtdmVyaWZpZXJgKTtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkYXRhIHx8ICFkYXRhLnNlc3Npb24gfHwgIWRhdGEudXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCwgcmVkaXJlY3RUeXBlOiBudWxsIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBuZXcgQXV0aEludmFsaWRUb2tlblJlc3BvbnNlRXJyb3IoKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9JTicsIGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGRhdGEpLCB7IHJlZGlyZWN0VHlwZTogcmVkaXJlY3RUeXBlICE9PSBudWxsICYmIHJlZGlyZWN0VHlwZSAhPT0gdm9pZCAwID8gcmVkaXJlY3RUeXBlIDogbnVsbCB9KSwgZXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwsIHJlZGlyZWN0VHlwZTogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxsb3dzIHNpZ25pbmcgaW4gd2l0aCBhbiBPSURDIElEIHRva2VuLiBUaGUgYXV0aGVudGljYXRpb24gcHJvdmlkZXIgdXNlZFxuICAgICAqIHNob3VsZCBiZSBlbmFibGVkIGFuZCBjb25maWd1cmVkLlxuICAgICAqL1xuICAgIGFzeW5jIHNpZ25JbldpdGhJZFRva2VuKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMsIHByb3ZpZGVyLCB0b2tlbiwgYWNjZXNzX3Rva2VuLCBub25jZSB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS90b2tlbj9ncmFudF90eXBlPWlkX3Rva2VuYCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLFxuICAgICAgICAgICAgICAgICAgICBpZF90b2tlbjogdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICAgICAgbm9uY2UsXG4gICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSByZXM7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFkYXRhIHx8ICFkYXRhLnNlc3Npb24gfHwgIWRhdGEudXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogbmV3IEF1dGhJbnZhbGlkVG9rZW5SZXNwb25zZUVycm9yKCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLnNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvZyBpbiBhIHVzZXIgdXNpbmcgbWFnaWNsaW5rIG9yIGEgb25lLXRpbWUgcGFzc3dvcmQgKE9UUCkuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgYHt7IC5Db25maXJtYXRpb25VUkwgfX1gIHZhcmlhYmxlIGlzIHNwZWNpZmllZCBpbiB0aGUgZW1haWwgdGVtcGxhdGUsIGEgbWFnaWNsaW5rIHdpbGwgYmUgc2VudC5cbiAgICAgKiBJZiB0aGUgYHt7IC5Ub2tlbiB9fWAgdmFyaWFibGUgaXMgc3BlY2lmaWVkIGluIHRoZSBlbWFpbCB0ZW1wbGF0ZSwgYW4gT1RQIHdpbGwgYmUgc2VudC5cbiAgICAgKiBJZiB5b3UncmUgdXNpbmcgcGhvbmUgc2lnbi1pbnMsIG9ubHkgYW4gT1RQIHdpbGwgYmUgc2VudC4gWW91IHdvbid0IGJlIGFibGUgdG8gc2VuZCBhIG1hZ2ljbGluayBmb3IgcGhvbmUgc2lnbi1pbnMuXG4gICAgICpcbiAgICAgKiBCZSBhd2FyZSB0aGF0IHlvdSBtYXkgZ2V0IGJhY2sgYW4gZXJyb3IgbWVzc2FnZSB0aGF0IHdpbGwgbm90IGRpc3Rpbmd1aXNoXG4gICAgICogYmV0d2VlbiB0aGUgY2FzZXMgd2hlcmUgdGhlIGFjY291bnQgZG9lcyBub3QgZXhpc3Qgb3IsIHRoYXQgdGhlIGFjY291bnRcbiAgICAgKiBjYW4gb25seSBiZSBhY2Nlc3NlZCB2aWEgc29jaWFsIGxvZ2luLlxuICAgICAqXG4gICAgICogRG8gbm90ZSB0aGF0IHlvdSB3aWxsIG5lZWQgdG8gY29uZmlndXJlIGEgV2hhdHNhcHAgc2VuZGVyIG9uIFR3aWxpb1xuICAgICAqIGlmIHlvdSBhcmUgdXNpbmcgcGhvbmUgc2lnbiBpbiB3aXRoIHRoZSAnd2hhdHNhcHAnIGNoYW5uZWwuIFRoZSB3aGF0c2FwcFxuICAgICAqIGNoYW5uZWwgaXMgbm90IHN1cHBvcnRlZCBvbiBvdGhlciBwcm92aWRlcnNcbiAgICAgKiBhdCB0aGlzIHRpbWUuXG4gICAgICogVGhpcyBtZXRob2Qgc3VwcG9ydHMgUEtDRSB3aGVuIGFuIGVtYWlsIGlzIHBhc3NlZC5cbiAgICAgKi9cbiAgICBhc3luYyBzaWduSW5XaXRoT3RwKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoJ2VtYWlsJyBpbiBjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZW1haWwsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgY29kZUNoYWxsZW5nZU1ldGhvZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdwa2NlJykge1xuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgIFtjb2RlQ2hhbGxlbmdlLCBjb2RlQ2hhbGxlbmdlTWV0aG9kXSA9IGF3YWl0IGdldENvZGVDaGFsbGVuZ2VBbmRNZXRob2QodGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9vdHBgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGF0YSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVfdXNlcjogKF9iID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNob3VsZENyZWF0ZVVzZXIpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlX2NoYWxsZW5nZTogY29kZUNoYWxsZW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogY29kZUNoYWxsZW5nZU1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmVtYWlsUmVkaXJlY3RUbyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgncGhvbmUnIGluIGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBwaG9uZSwgb3B0aW9ucyB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vb3RwYCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKF9jID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRhdGEpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlX3VzZXI6IChfZCA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zaG91bGRDcmVhdGVVc2VyKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogKF9lID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNoYW5uZWwpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6ICdzbXMnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCwgbWVzc2FnZUlkOiBkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEubWVzc2FnZV9pZCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbnZhbGlkQ3JlZGVudGlhbHNFcnJvcignWW91IG11c3QgcHJvdmlkZSBlaXRoZXIgYW4gZW1haWwgb3IgcGhvbmUgbnVtYmVyLicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9nIGluIGEgdXNlciBnaXZlbiBhIFVzZXIgc3VwcGxpZWQgT1RQIG9yIFRva2VuSGFzaCByZWNlaXZlZCB0aHJvdWdoIG1vYmlsZSBvciBlbWFpbC5cbiAgICAgKi9cbiAgICBhc3luYyB2ZXJpZnlPdHAocGFyYW1zKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVkaXJlY3RUbyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGxldCBjYXB0Y2hhVG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoJ29wdGlvbnMnIGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG8gPSAoX2EgPSBwYXJhbXMub3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlZGlyZWN0VG87XG4gICAgICAgICAgICAgICAgY2FwdGNoYVRva2VuID0gKF9iID0gcGFyYW1zLm9wdGlvbnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYXB0Y2hhVG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS92ZXJpZnlgLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIGJvZHk6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKSwgeyBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBjYXB0Y2hhVG9rZW4gfSB9KSxcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvLFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQgb24gdG9rZW4gdmVyaWZpY2F0aW9uLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGRhdGEuc2Vzc2lvbjtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBkYXRhLnVzZXI7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbiA9PT0gbnVsbCB8fCBzZXNzaW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uLmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKHNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKHBhcmFtcy50eXBlID09ICdyZWNvdmVyeScgPyAnUEFTU1dPUkRfUkVDT1ZFUlknIDogJ1NJR05FRF9JTicsIHNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyLCBzZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyBhIHNpbmdsZS1zaWduIG9uIHVzaW5nIGFuIGVudGVycHJpc2UgSWRlbnRpdHkgUHJvdmlkZXIuIEFcbiAgICAgKiBzdWNjZXNzZnVsIFNTTyBhdHRlbXB0IHdpbGwgcmVkaXJlY3QgdGhlIGN1cnJlbnQgcGFnZSB0byB0aGUgaWRlbnRpdHlcbiAgICAgKiBwcm92aWRlciBhdXRob3JpemF0aW9uIHBhZ2UuIFRoZSByZWRpcmVjdCBVUkwgaXMgaW1wbGVtZW50YXRpb24gYW5kIFNTT1xuICAgICAqIHByb3RvY29sIHNwZWNpZmljLlxuICAgICAqXG4gICAgICogWW91IGNhbiB1c2UgaXQgYnkgcHJvdmlkaW5nIGEgU1NPIGRvbWFpbi4gVHlwaWNhbGx5IHlvdSBjYW4gZXh0cmFjdCB0aGlzXG4gICAgICogZG9tYWluIGJ5IGFza2luZyB1c2VycyBmb3IgdGhlaXIgZW1haWwgYWRkcmVzcy4gSWYgdGhpcyBkb21haW4gaXNcbiAgICAgKiByZWdpc3RlcmVkIG9uIHRoZSBBdXRoIGluc3RhbmNlIHRoZSByZWRpcmVjdCB3aWxsIHVzZSB0aGF0IG9yZ2FuaXphdGlvbidzXG4gICAgICogY3VycmVudGx5IGFjdGl2ZSBTU08gSWRlbnRpdHkgUHJvdmlkZXIgZm9yIHRoZSBsb2dpbi5cbiAgICAgKlxuICAgICAqIElmIHlvdSBoYXZlIGJ1aWx0IGFuIG9yZ2FuaXphdGlvbi1zcGVjaWZpYyBsb2dpbiBwYWdlLCB5b3UgY2FuIHVzZSB0aGVcbiAgICAgKiBvcmdhbml6YXRpb24ncyBTU08gSWRlbnRpdHkgUHJvdmlkZXIgVVVJRCBkaXJlY3RseSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGFzeW5jIHNpZ25JbldpdGhTU08ocGFyYW1zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGNvZGVDaGFsbGVuZ2UgPSBudWxsO1xuICAgICAgICAgICAgbGV0IGNvZGVDaGFsbGVuZ2VNZXRob2QgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdwa2NlJykge1xuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICBbY29kZUNoYWxsZW5nZSwgY29kZUNoYWxsZW5nZU1ldGhvZF0gPSBhd2FpdCBnZXRDb2RlQ2hhbGxlbmdlQW5kTWV0aG9kKHRoaXMuc3RvcmFnZSwgdGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9zc29gLCB7XG4gICAgICAgICAgICAgICAgYm9keTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCAoJ3Byb3ZpZGVySWQnIGluIHBhcmFtcyA/IHsgcHJvdmlkZXJfaWQ6IHBhcmFtcy5wcm92aWRlcklkIH0gOiBudWxsKSksICgnZG9tYWluJyBpbiBwYXJhbXMgPyB7IGRvbWFpbjogcGFyYW1zLmRvbWFpbiB9IDogbnVsbCkpLCB7IHJlZGlyZWN0X3RvOiAoX2IgPSAoX2EgPSBwYXJhbXMub3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlZGlyZWN0VG8pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHVuZGVmaW5lZCB9KSwgKCgoX2MgPSBwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMub3B0aW9ucykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmNhcHRjaGFUb2tlbilcbiAgICAgICAgICAgICAgICAgICAgPyB7IGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IHBhcmFtcy5vcHRpb25zLmNhcHRjaGFUb2tlbiB9IH1cbiAgICAgICAgICAgICAgICAgICAgOiBudWxsKSksIHsgc2tpcF9odHRwX3JlZGlyZWN0OiB0cnVlLCBjb2RlX2NoYWxsZW5nZTogY29kZUNoYWxsZW5nZSwgY29kZV9jaGFsbGVuZ2VfbWV0aG9kOiBjb2RlQ2hhbGxlbmdlTWV0aG9kIH0pLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3Nzb1Jlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcmVhdXRoZW50aWNhdGlvbiBPVFAgdG8gdGhlIHVzZXIncyBlbWFpbCBvciBwaG9uZSBudW1iZXIuXG4gICAgICogUmVxdWlyZXMgdGhlIHVzZXIgdG8gYmUgc2lnbmVkLWluLlxuICAgICAqL1xuICAgIGFzeW5jIHJlYXV0aGVudGljYXRlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZWF1dGhlbnRpY2F0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgX3JlYXV0aGVudGljYXRlKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogeyBzZXNzaW9uIH0sIGVycm9yOiBzZXNzaW9uRXJyb3IsIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgc2Vzc2lvbkVycm9yO1xuICAgICAgICAgICAgICAgIGlmICghc2Vzc2lvbilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0dFVCcsIGAke3RoaXMudXJsfS9yZWF1dGhlbnRpY2F0ZWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IHNlc3Npb24uYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNlbmRzIGFuIGV4aXN0aW5nIHNpZ251cCBjb25maXJtYXRpb24gZW1haWwsIGVtYWlsIGNoYW5nZSBlbWFpbCwgU01TIE9UUCBvciBwaG9uZSBjaGFuZ2UgT1RQLlxuICAgICAqL1xuICAgIGFzeW5jIHJlc2VuZChjcmVkZW50aWFscykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZW5kcG9pbnQgPSBgJHt0aGlzLnVybH0vcmVzZW5kYDtcbiAgICAgICAgICAgIGlmICgnZW1haWwnIGluIGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgdHlwZSwgb3B0aW9ucyB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBlbmRwb2ludCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmVtYWlsUmVkaXJlY3RUbyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCdwaG9uZScgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBob25lLCB0eXBlLCBvcHRpb25zIH0gPSBjcmVkZW50aWFscztcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGVuZHBvaW50LCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCwgbWVzc2FnZUlkOiBkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEubWVzc2FnZV9pZCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbnZhbGlkQ3JlZGVudGlhbHNFcnJvcignWW91IG11c3QgcHJvdmlkZSBlaXRoZXIgYW4gZW1haWwgb3IgcGhvbmUgbnVtYmVyIGFuZCBhIHR5cGUnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNlc3Npb24sIHJlZnJlc2hpbmcgaXQgaWYgbmVjZXNzYXJ5LlxuICAgICAqXG4gICAgICogVGhlIHNlc3Npb24gcmV0dXJuZWQgY2FuIGJlIG51bGwgaWYgdGhlIHNlc3Npb24gaXMgbm90IGRldGVjdGVkIHdoaWNoIGNhbiBoYXBwZW4gaW4gdGhlIGV2ZW50IGEgdXNlciBpcyBub3Qgc2lnbmVkLWluIG9yIGhhcyBsb2dnZWQgb3V0LlxuICAgICAqXG4gICAgICogKipJTVBPUlRBTlQ6KiogVGhpcyBtZXRob2QgbG9hZHMgdmFsdWVzIGRpcmVjdGx5IGZyb20gdGhlIHN0b3JhZ2UgYXR0YWNoZWRcbiAgICAgKiB0byB0aGUgY2xpZW50LiBJZiB0aGF0IHN0b3JhZ2UgaXMgYmFzZWQgb24gcmVxdWVzdCBjb29raWVzIGZvciBleGFtcGxlLFxuICAgICAqIHRoZSB2YWx1ZXMgaW4gaXQgbWF5IG5vdCBiZSBhdXRoZW50aWMgYW5kIHRoZXJlZm9yZSBpdCdzIHN0cm9uZ2x5IGFkdmlzZWRcbiAgICAgKiBhZ2FpbnN0IHVzaW5nIHRoaXMgbWV0aG9kIGFuZCBpdHMgcmVzdWx0cyBpbiBzdWNoIGNpcmN1bXN0YW5jZXMuIEEgd2FybmluZ1xuICAgICAqIHdpbGwgYmUgZW1pdHRlZCBpZiB0aGlzIGlzIGRldGVjdGVkLiBVc2Uge0BsaW5rICNnZXRVc2VyKCl9IGluc3RlYWQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0U2Vzc2lvbigpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBY3F1aXJlcyBhIGdsb2JhbCBsb2NrIGJhc2VkIG9uIHRoZSBzdG9yYWdlIGtleS5cbiAgICAgKi9cbiAgICBhc3luYyBfYWNxdWlyZUxvY2soYWNxdWlyZVRpbWVvdXQsIGZuKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX2FjcXVpcmVMb2NrJywgJ2JlZ2luJywgYWNxdWlyZVRpbWVvdXQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9ja0FjcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdCA9IHRoaXMucGVuZGluZ0luTG9jay5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnBlbmRpbmdJbkxvY2tbdGhpcy5wZW5kaW5nSW5Mb2NrLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICAgICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgbGFzdDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGZuKCk7XG4gICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdJbkxvY2sucHVzaCgoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBqdXN0IGNhcmUgaWYgaXQgZmluaXNoZWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5sb2NrKGBsb2NrOiR7dGhpcy5zdG9yYWdlS2V5fWAsIGFjcXVpcmVUaW1lb3V0LCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfYWNxdWlyZUxvY2snLCAnbG9jayBhY3F1aXJlZCBmb3Igc3RvcmFnZSBrZXknLCB0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9ja0FjcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm4oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nSW5Mb2NrLnB1c2goKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBqdXN0IGNhcmUgaWYgaXQgZmluaXNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkoKSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCBkcmFpbmluZyB0aGUgcXVldWUgdW50aWwgdGhlcmUncyBub3RoaW5nIHRvIHdhaXQgb25cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMucGVuZGluZ0luTG9jay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhaXRPbiA9IFsuLi50aGlzLnBlbmRpbmdJbkxvY2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwod2FpdE9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0luTG9jay5zcGxpY2UoMCwgd2FpdE9uLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2FjcXVpcmVMb2NrJywgJ2xvY2sgcmVsZWFzZWQgZm9yIHN0b3JhZ2Uga2V5JywgdGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NrQWNxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2FjcXVpcmVMb2NrJywgJ2VuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZSBpbnN0ZWFkIG9mIHtAbGluayAjZ2V0U2Vzc2lvbn0gaW5zaWRlIHRoZSBsaWJyYXJ5LiBJdCBpc1xuICAgICAqIHNlbWFudGljYWxseSB1c3VhbGx5IHdoYXQgeW91IHdhbnQsIGFzIGdldHRpbmcgYSBzZXNzaW9uIGludm9sdmVzIHNvbWVcbiAgICAgKiBwcm9jZXNzaW5nIGFmdGVyd2FyZHMgdGhhdCByZXF1aXJlcyBvbmx5IG9uZSBjbGllbnQgb3BlcmF0aW5nIG9uIHRoZVxuICAgICAqIHNlc3Npb24gYXQgb25jZSBhY3Jvc3MgbXVsdGlwbGUgdGFicyBvciBwcm9jZXNzZXMuXG4gICAgICovXG4gICAgYXN5bmMgX3VzZVNlc3Npb24oZm4pIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfdXNlU2Vzc2lvbicsICdiZWdpbicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gdGhlIHVzZSBvZiBfX2xvYWRTZXNzaW9uIGhlcmUgaXMgdGhlIG9ubHkgY29ycmVjdCB1c2Ugb2YgdGhlIGZ1bmN0aW9uIVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fX2xvYWRTZXNzaW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZm4ocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX3VzZVNlc3Npb24nLCAnZW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTkVWRVIgVVNFIERJUkVDVExZIVxuICAgICAqXG4gICAgICogQWx3YXlzIHVzZSB7QGxpbmsgI191c2VTZXNzaW9ufS5cbiAgICAgKi9cbiAgICBhc3luYyBfX2xvYWRTZXNzaW9uKCkge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI19fbG9hZFNlc3Npb24oKScsICdiZWdpbicpO1xuICAgICAgICBpZiAoIXRoaXMubG9ja0FjcXVpcmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19fbG9hZFNlc3Npb24oKScsICd1c2VkIG91dHNpZGUgb2YgYW4gYWNxdWlyZWQgbG9jayEnLCBuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2Vzc2lvbiA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCBtYXliZVNlc3Npb24gPSBhd2FpdCBnZXRJdGVtQXN5bmModGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNnZXRTZXNzaW9uKCknLCAnc2Vzc2lvbiBmcm9tIHN0b3JhZ2UnLCBtYXliZVNlc3Npb24pO1xuICAgICAgICAgICAgaWYgKG1heWJlU2Vzc2lvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1ZhbGlkU2Vzc2lvbihtYXliZVNlc3Npb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZXNzaW9uID0gbWF5YmVTZXNzaW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNnZXRTZXNzaW9uKCknLCAnc2Vzc2lvbiBmcm9tIHN0b3JhZ2UgaXMgbm90IHZhbGlkJyk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3JlbW92ZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uOiBudWxsIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBIHNlc3Npb24gaXMgY29uc2lkZXJlZCBleHBpcmVkIGJlZm9yZSB0aGUgYWNjZXNzIHRva2VuIF9hY3R1YWxseV9cbiAgICAgICAgICAgIC8vIGV4cGlyZXMuIFdoZW4gdGhlIGF1dG9SZWZyZXNoVG9rZW4gb3B0aW9uIGlzIG9mZiAob3Igd2hlbiB0aGUgdGFiIGlzXG4gICAgICAgICAgICAvLyBpbiB0aGUgYmFja2dyb3VuZCksIHZlcnkgZWFnZXIgdXNlcnMgb2YgZ2V0U2Vzc2lvbigpIC0tIGxpa2VcbiAgICAgICAgICAgIC8vIHJlYWx0aW1lLWpzIC0tIG1pZ2h0IHNlbmQgYSB2YWxpZCBKV1Qgd2hpY2ggd2lsbCBleHBpcmUgYnkgdGhlIHRpbWUgaXRcbiAgICAgICAgICAgIC8vIHJlYWNoZXMgdGhlIHNlcnZlci5cbiAgICAgICAgICAgIGNvbnN0IGhhc0V4cGlyZWQgPSBjdXJyZW50U2Vzc2lvbi5leHBpcmVzX2F0XG4gICAgICAgICAgICAgICAgPyBjdXJyZW50U2Vzc2lvbi5leHBpcmVzX2F0ICogMTAwMCAtIERhdGUubm93KCkgPCBFWFBJUllfTUFSR0lOX01TXG4gICAgICAgICAgICAgICAgOiBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX19sb2FkU2Vzc2lvbigpJywgYHNlc3Npb24gaGFzJHtoYXNFeHBpcmVkID8gJycgOiAnIG5vdCd9IGV4cGlyZWRgLCAnZXhwaXJlc19hdCcsIGN1cnJlbnRTZXNzaW9uLmV4cGlyZXNfYXQpO1xuICAgICAgICAgICAgaWYgKCFoYXNFeHBpcmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RvcmFnZS5pc1NlcnZlcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3VwcHJlc3NXYXJuaW5nID0gdGhpcy5zdXBwcmVzc0dldFNlc3Npb25XYXJuaW5nO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm94eVNlc3Npb24gPSBuZXcgUHJveHkoY3VycmVudFNlc3Npb24sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN1cHByZXNzV2FybmluZyAmJiBwcm9wID09PSAndXNlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25seSBzaG93IHdhcm5pbmcgd2hlbiB0aGUgdXNlciBvYmplY3QgaXMgYmVpbmcgYWNjZXNzZWQgZnJvbSB0aGUgc2VydmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignVXNpbmcgdGhlIHVzZXIgb2JqZWN0IGFzIHJldHVybmVkIGZyb20gc3VwYWJhc2UuYXV0aC5nZXRTZXNzaW9uKCkgb3IgZnJvbSBzb21lIHN1cGFiYXNlLmF1dGgub25BdXRoU3RhdGVDaGFuZ2UoKSBldmVudHMgY291bGQgYmUgaW5zZWN1cmUhIFRoaXMgdmFsdWUgY29tZXMgZGlyZWN0bHkgZnJvbSB0aGUgc3RvcmFnZSBtZWRpdW0gKHVzdWFsbHkgY29va2llcyBvbiB0aGUgc2VydmVyKSBhbmQgbWF5IG5vdCBiZSBhdXRoZW50aWMuIFVzZSBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKSBpbnN0ZWFkIHdoaWNoIGF1dGhlbnRpY2F0ZXMgdGhlIGRhdGEgYnkgY29udGFjdGluZyB0aGUgU3VwYWJhc2UgQXV0aCBzZXJ2ZXIuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHByZXNzV2FybmluZyA9IHRydWU7IC8vIGtlZXBzIHRoaXMgcHJveHkgaW5zdGFuY2UgZnJvbSBsb2dnaW5nIGFkZGl0aW9uYWwgd2FybmluZ3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXBwcmVzc0dldFNlc3Npb25XYXJuaW5nID0gdHJ1ZTsgLy8ga2VlcHMgdGhpcyBjbGllbnQncyBmdXR1cmUgcHJveHkgaW5zdGFuY2VzIGZyb20gd2FybmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlc3Npb24gPSBwcm94eVNlc3Npb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbjogY3VycmVudFNlc3Npb24gfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgc2Vzc2lvbiwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuX2NhbGxSZWZyZXNoVG9rZW4oY3VycmVudFNlc3Npb24ucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbiB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfX2xvYWRTZXNzaW9uKCknLCAnZW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB1c2VyIGRldGFpbHMgaWYgdGhlcmUgaXMgYW4gZXhpc3Rpbmcgc2Vzc2lvbi4gVGhpcyBtZXRob2RcbiAgICAgKiBwZXJmb3JtcyBhIG5ldHdvcmsgcmVxdWVzdCB0byB0aGUgU3VwYWJhc2UgQXV0aCBzZXJ2ZXIsIHNvIHRoZSByZXR1cm5lZFxuICAgICAqIHZhbHVlIGlzIGF1dGhlbnRpYyBhbmQgY2FuIGJlIHVzZWQgdG8gYmFzZSBhdXRob3JpemF0aW9uIHJ1bGVzIG9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGp3dCBUYWtlcyBpbiBhbiBvcHRpb25hbCBhY2Nlc3MgdG9rZW4gSldULiBJZiBubyBKV1QgaXMgcHJvdmlkZWQsIHRoZSBKV1QgZnJvbSB0aGUgY3VycmVudCBzZXNzaW9uIGlzIHVzZWQuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0VXNlcihqd3QpIHtcbiAgICAgICAgaWYgKGp3dCkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2dldFVzZXIoand0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2dldFVzZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGFzeW5jIF9nZXRVc2VyKGp3dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGp3dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnR0VUJywgYCR7dGhpcy51cmx9L3VzZXJgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgand0OiBqd3QsXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJldHVybnMgYW4gZXJyb3IgaWYgdGhlcmUgaXMgbm8gYWNjZXNzX3Rva2VuIG9yIGN1c3RvbSBhdXRob3JpemF0aW9uIGhlYWRlclxuICAgICAgICAgICAgICAgIGlmICghKChfYSA9IGRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc190b2tlbikgJiYgIXRoaXMuaGFzQ3VzdG9tQXV0aG9yaXphdGlvbkhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3I6IG5ldyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcigpIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnR0VUJywgYCR7dGhpcy51cmx9L3VzZXJgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgand0OiAoX2MgPSAoX2IgPSBkYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hY2Nlc3NfdG9rZW4pICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF91c2VyUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSldUIGNvbnRhaW5zIGEgYHNlc3Npb25faWRgIHdoaWNoIGRvZXMgbm90IGNvcnJlc3BvbmQgdG8gYW4gYWN0aXZlXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlc3Npb24gaW4gdGhlIGRhdGFiYXNlLCBpbmRpY2F0aW5nIHRoZSB1c2VyIGlzIHNpZ25lZCBvdXQuXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3JlbW92ZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVtb3ZlSXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgYCR7dGhpcy5zdG9yYWdlS2V5fS1jb2RlLXZlcmlmaWVyYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB1c2VyIGRhdGEgZm9yIGEgbG9nZ2VkIGluIHVzZXIuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlVXNlcihhdHRyaWJ1dGVzLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXBkYXRlVXNlcihhdHRyaWJ1dGVzLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIF91cGRhdGVVc2VyKGF0dHJpYnV0ZXMsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogc2Vzc2lvbkRhdGEsIGVycm9yOiBzZXNzaW9uRXJyb3IgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IHNlc3Npb25FcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFzZXNzaW9uRGF0YS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gc2Vzc2lvbkRhdGEuc2Vzc2lvbjtcbiAgICAgICAgICAgICAgICBsZXQgY29kZUNoYWxsZW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IGNvZGVDaGFsbGVuZ2VNZXRob2QgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZsb3dUeXBlID09PSAncGtjZScgJiYgYXR0cmlidXRlcy5lbWFpbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgW2NvZGVDaGFsbGVuZ2UsIGNvZGVDaGFsbGVuZ2VNZXRob2RdID0gYXdhaXQgZ2V0Q29kZUNoYWxsZW5nZUFuZE1ldGhvZCh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3I6IHVzZXJFcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BVVCcsIGAke3RoaXMudXJsfS91c2VyYCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5lbWFpbFJlZGlyZWN0VG8sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYXR0cmlidXRlcyksIHsgY29kZV9jaGFsbGVuZ2U6IGNvZGVDaGFsbGVuZ2UsIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogY29kZUNoYWxsZW5nZU1ldGhvZCB9KSxcbiAgICAgICAgICAgICAgICAgICAgand0OiBzZXNzaW9uLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF91c2VyUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJFcnJvcilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgdXNlckVycm9yO1xuICAgICAgICAgICAgICAgIHNlc3Npb24udXNlciA9IGRhdGEudXNlcjtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnVVNFUl9VUERBVEVEJywgc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBzZXNzaW9uLnVzZXIgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2Vzc2lvbiBkYXRhIGZyb20gdGhlIGN1cnJlbnQgc2Vzc2lvbi4gSWYgdGhlIGN1cnJlbnQgc2Vzc2lvbiBpcyBleHBpcmVkLCBzZXRTZXNzaW9uIHdpbGwgdGFrZSBjYXJlIG9mIHJlZnJlc2hpbmcgaXQgdG8gb2J0YWluIGEgbmV3IHNlc3Npb24uXG4gICAgICogSWYgdGhlIHJlZnJlc2ggdG9rZW4gb3IgYWNjZXNzIHRva2VuIGluIHRoZSBjdXJyZW50IHNlc3Npb24gaXMgaW52YWxpZCwgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gICAgICogQHBhcmFtIGN1cnJlbnRTZXNzaW9uIFRoZSBjdXJyZW50IHNlc3Npb24gdGhhdCBtaW5pbWFsbHkgY29udGFpbnMgYW4gYWNjZXNzIHRva2VuIGFuZCByZWZyZXNoIHRva2VuLlxuICAgICAqL1xuICAgIGFzeW5jIHNldFNlc3Npb24oY3VycmVudFNlc3Npb24pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fc2V0U2Vzc2lvbihjdXJyZW50U2Vzc2lvbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBfc2V0U2Vzc2lvbihjdXJyZW50U2Vzc2lvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50U2Vzc2lvbi5hY2Nlc3NfdG9rZW4gfHwgIWN1cnJlbnRTZXNzaW9uLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRpbWVOb3cgPSBEYXRlLm5vdygpIC8gMTAwMDtcbiAgICAgICAgICAgIGxldCBleHBpcmVzQXQgPSB0aW1lTm93O1xuICAgICAgICAgICAgbGV0IGhhc0V4cGlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHNlc3Npb24gPSBudWxsO1xuICAgICAgICAgICAgY29uc3QgeyBwYXlsb2FkIH0gPSBkZWNvZGVKV1QoY3VycmVudFNlc3Npb24uYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgICAgIGlmIChwYXlsb2FkLmV4cCkge1xuICAgICAgICAgICAgICAgIGV4cGlyZXNBdCA9IHBheWxvYWQuZXhwO1xuICAgICAgICAgICAgICAgIGhhc0V4cGlyZWQgPSBleHBpcmVzQXQgPD0gdGltZU5vdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXNFeHBpcmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzZXNzaW9uOiByZWZyZXNoZWRTZXNzaW9uLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5fY2FsbFJlZnJlc2hUb2tlbihjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yOiBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJlZnJlc2hlZFNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlc3Npb24gPSByZWZyZXNoZWRTZXNzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5fZ2V0VXNlcihjdXJyZW50U2Vzc2lvbi5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2Vzc2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiBjdXJyZW50U2Vzc2lvbi5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IGN1cnJlbnRTZXNzaW9uLnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGRhdGEudXNlcixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5fdHlwZTogJ2JlYXJlcicsXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyZXNfaW46IGV4cGlyZXNBdCAtIHRpbWVOb3csXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyZXNfYXQ6IGV4cGlyZXNBdCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKHNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBzZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogc2Vzc2lvbi51c2VyLCBzZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uOiBudWxsLCB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IHNlc3Npb24sIHJlZ2FyZGxlc3Mgb2YgZXhwaXJ5IHN0YXR1cy5cbiAgICAgKiBUYWtlcyBpbiBhbiBvcHRpb25hbCBjdXJyZW50IHNlc3Npb24uIElmIG5vdCBwYXNzZWQgaW4sIHRoZW4gcmVmcmVzaFNlc3Npb24oKSB3aWxsIGF0dGVtcHQgdG8gcmV0cmlldmUgaXQgZnJvbSBnZXRTZXNzaW9uKCkuXG4gICAgICogSWYgdGhlIGN1cnJlbnQgc2Vzc2lvbidzIHJlZnJlc2ggdG9rZW4gaXMgaW52YWxpZCwgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gICAgICogQHBhcmFtIGN1cnJlbnRTZXNzaW9uIFRoZSBjdXJyZW50IHNlc3Npb24uIElmIHBhc3NlZCBpbiwgaXQgbXVzdCBjb250YWluIGEgcmVmcmVzaCB0b2tlbi5cbiAgICAgKi9cbiAgICBhc3luYyByZWZyZXNoU2Vzc2lvbihjdXJyZW50U2Vzc2lvbikge1xuICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9yZWZyZXNoU2Vzc2lvbihjdXJyZW50U2Vzc2lvbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBfcmVmcmVzaFNlc3Npb24oY3VycmVudFNlc3Npb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50U2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlc3Npb24gPSAoX2EgPSBkYXRhLnNlc3Npb24pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoY3VycmVudFNlc3Npb24gPT09IG51bGwgfHwgY3VycmVudFNlc3Npb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1cnJlbnRTZXNzaW9uLnJlZnJlc2hfdG9rZW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB7IHNlc3Npb24sIGVycm9yIH0gPSBhd2FpdCB0aGlzLl9jYWxsUmVmcmVzaFRva2VuKGN1cnJlbnRTZXNzaW9uLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3I6IGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBzZXNzaW9uLnVzZXIsIHNlc3Npb24gfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgc2Vzc2lvbiBkYXRhIGZyb20gYSBVUkwgc3RyaW5nXG4gICAgICovXG4gICAgYXN5bmMgX2dldFNlc3Npb25Gcm9tVVJMKHBhcmFtcywgY2FsbGJhY2tVcmxUeXBlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIWlzQnJvd3NlcigpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IoJ05vIGJyb3dzZXIgZGV0ZWN0ZWQuJyk7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGFuIGVycm9yIGluIHRoZSBVUkwsIGl0IGRvZXNuJ3QgbWF0dGVyIHdoYXQgZmxvdyBpdCBpcywgd2UganVzdCByZXR1cm4gdGhlIGVycm9yLlxuICAgICAgICAgICAgaWYgKHBhcmFtcy5lcnJvciB8fCBwYXJhbXMuZXJyb3JfZGVzY3JpcHRpb24gfHwgcGFyYW1zLmVycm9yX2NvZGUpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGUgZXJyb3IgY2xhc3MgcmV0dXJuZWQgaW1wbGllcyB0aGF0IHRoZSByZWRpcmVjdCBpcyBmcm9tIGFuIGltcGxpY2l0IGdyYW50IGZsb3dcbiAgICAgICAgICAgICAgICAvLyBidXQgaXQgY291bGQgYWxzbyBiZSBmcm9tIGEgcmVkaXJlY3QgZXJyb3IgZnJvbSBhIFBLQ0UgZmxvdy5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yKHBhcmFtcy5lcnJvcl9kZXNjcmlwdGlvbiB8fCAnRXJyb3IgaW4gVVJMIHdpdGggdW5zcGVjaWZpZWQgZXJyb3JfZGVzY3JpcHRpb24nLCB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBwYXJhbXMuZXJyb3IgfHwgJ3Vuc3BlY2lmaWVkX2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgY29kZTogcGFyYW1zLmVycm9yX2NvZGUgfHwgJ3Vuc3BlY2lmaWVkX2NvZGUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2hlY2tzIGZvciBtaXNtYXRjaGVzIGJldHdlZW4gdGhlIGZsb3dUeXBlIGluaXRpYWxpc2VkIGluIHRoZSBjbGllbnQgYW5kIHRoZSBVUkwgcGFyYW1ldGVyc1xuICAgICAgICAgICAgc3dpdGNoIChjYWxsYmFja1VybFR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdpbXBsaWNpdCc6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZsb3dUeXBlID09PSAncGtjZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoUEtDRUdyYW50Q29kZUV4Y2hhbmdlRXJyb3IoJ05vdCBhIHZhbGlkIFBLQ0UgZmxvdyB1cmwuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGtjZSc6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZsb3dUeXBlID09PSAnaW1wbGljaXQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yKCdOb3QgYSB2YWxpZCBpbXBsaWNpdCBncmFudCBmbG93IHVybC4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIHRoZXJlJ3Mgbm8gbWlzbWF0Y2ggc28gd2UgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNpbmNlIHRoaXMgaXMgYSByZWRpcmVjdCBmb3IgUEtDRSwgd2UgYXR0ZW1wdCB0byByZXRyaWV2ZSB0aGUgY29kZSBmcm9tIHRoZSBVUkwgZm9yIHRoZSBjb2RlIGV4Y2hhbmdlXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tVcmxUeXBlID09PSAncGtjZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19pbml0aWFsaXplKCknLCAnYmVnaW4nLCAnaXMgUEtDRSBmbG93JywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJhbXMuY29kZSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhQS0NFR3JhbnRDb2RlRXhjaGFuZ2VFcnJvcignTm8gY29kZSBkZXRlY3RlZC4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCB0aGlzLl9leGNoYW5nZUNvZGVGb3JTZXNzaW9uKHBhcmFtcy5jb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuZGVsZXRlKCdjb2RlJyk7XG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHdpbmRvdy5oaXN0b3J5LnN0YXRlLCAnJywgdXJsLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbjogZGF0YS5zZXNzaW9uLCByZWRpcmVjdFR5cGU6IG51bGwgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgcHJvdmlkZXJfdG9rZW4sIHByb3ZpZGVyX3JlZnJlc2hfdG9rZW4sIGFjY2Vzc190b2tlbiwgcmVmcmVzaF90b2tlbiwgZXhwaXJlc19pbiwgZXhwaXJlc19hdCwgdG9rZW5fdHlwZSwgfSA9IHBhcmFtcztcbiAgICAgICAgICAgIGlmICghYWNjZXNzX3Rva2VuIHx8ICFleHBpcmVzX2luIHx8ICFyZWZyZXNoX3Rva2VuIHx8ICF0b2tlbl90eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvcignTm8gc2Vzc2lvbiBkZWZpbmVkIGluIFVSTCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGltZU5vdyA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICAgICAgY29uc3QgZXhwaXJlc0luID0gcGFyc2VJbnQoZXhwaXJlc19pbik7XG4gICAgICAgICAgICBsZXQgZXhwaXJlc0F0ID0gdGltZU5vdyArIGV4cGlyZXNJbjtcbiAgICAgICAgICAgIGlmIChleHBpcmVzX2F0KSB7XG4gICAgICAgICAgICAgICAgZXhwaXJlc0F0ID0gcGFyc2VJbnQoZXhwaXJlc19hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhY3R1YWxseUV4cGlyZXNJbiA9IGV4cGlyZXNBdCAtIHRpbWVOb3c7XG4gICAgICAgICAgICBpZiAoYWN0dWFsbHlFeHBpcmVzSW4gKiAxMDAwIDw9IEFVVE9fUkVGUkVTSF9USUNLX0RVUkFUSU9OX01TKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBAc3VwYWJhc2UvZ290cnVlLWpzOiBTZXNzaW9uIGFzIHJldHJpZXZlZCBmcm9tIFVSTCBleHBpcmVzIGluICR7YWN0dWFsbHlFeHBpcmVzSW59cywgc2hvdWxkIGhhdmUgYmVlbiBjbG9zZXIgdG8gJHtleHBpcmVzSW59c2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaXNzdWVkQXQgPSBleHBpcmVzQXQgLSBleHBpcmVzSW47XG4gICAgICAgICAgICBpZiAodGltZU5vdyAtIGlzc3VlZEF0ID49IDEyMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQHN1cGFiYXNlL2dvdHJ1ZS1qczogU2Vzc2lvbiBhcyByZXRyaWV2ZWQgZnJvbSBVUkwgd2FzIGlzc3VlZCBvdmVyIDEyMHMgYWdvLCBVUkwgY291bGQgYmUgc3RhbGUnLCBpc3N1ZWRBdCwgZXhwaXJlc0F0LCB0aW1lTm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRpbWVOb3cgLSBpc3N1ZWRBdCA8IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0BzdXBhYmFzZS9nb3RydWUtanM6IFNlc3Npb24gYXMgcmV0cmlldmVkIGZyb20gVVJMIHdhcyBpc3N1ZWQgaW4gdGhlIGZ1dHVyZT8gQ2hlY2sgdGhlIGRldmljZSBjbG9jayBmb3Igc2tldycsIGlzc3VlZEF0LCBleHBpcmVzQXQsIHRpbWVOb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5fZ2V0VXNlcihhY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IHtcbiAgICAgICAgICAgICAgICBwcm92aWRlcl90b2tlbixcbiAgICAgICAgICAgICAgICBwcm92aWRlcl9yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICBleHBpcmVzX2luOiBleHBpcmVzSW4sXG4gICAgICAgICAgICAgICAgZXhwaXJlc19hdDogZXhwaXJlc0F0LFxuICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgdG9rZW5fdHlwZSxcbiAgICAgICAgICAgICAgICB1c2VyOiBkYXRhLnVzZXIsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRva2VucyBmcm9tIFVSTFxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJztcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2dldFNlc3Npb25Gcm9tVVJMKCknLCAnY2xlYXJpbmcgd2luZG93LmxvY2F0aW9uLmhhc2gnKTtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbiwgcmVkaXJlY3RUeXBlOiBwYXJhbXMudHlwZSB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbjogbnVsbCwgcmVkaXJlY3RUeXBlOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgVVJMIGNvbnRhaW5zIHBhcmFtZXRlcnMgZ2l2ZW4gYnkgYW4gaW1wbGljaXQgb2F1dGggZ3JhbnQgZmxvdyAoaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzY3NDkuaHRtbCNzZWN0aW9uLTQuMilcbiAgICAgKi9cbiAgICBfaXNJbXBsaWNpdEdyYW50Q2FsbGJhY2socGFyYW1zKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHBhcmFtcy5hY2Nlc3NfdG9rZW4gfHwgcGFyYW1zLmVycm9yX2Rlc2NyaXB0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IFVSTCBhbmQgYmFja2luZyBzdG9yYWdlIGNvbnRhaW4gcGFyYW1ldGVycyBnaXZlbiBieSBhIFBLQ0UgZmxvd1xuICAgICAqL1xuICAgIGFzeW5jIF9pc1BLQ0VDYWxsYmFjayhwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFN0b3JhZ2VDb250ZW50ID0gYXdhaXQgZ2V0SXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgYCR7dGhpcy5zdG9yYWdlS2V5fS1jb2RlLXZlcmlmaWVyYCk7XG4gICAgICAgIHJldHVybiAhIShwYXJhbXMuY29kZSAmJiBjdXJyZW50U3RvcmFnZUNvbnRlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNpZGUgYSBicm93c2VyIGNvbnRleHQsIGBzaWduT3V0KClgIHdpbGwgcmVtb3ZlIHRoZSBsb2dnZWQgaW4gdXNlciBmcm9tIHRoZSBicm93c2VyIHNlc3Npb24gYW5kIGxvZyB0aGVtIG91dCAtIHJlbW92aW5nIGFsbCBpdGVtcyBmcm9tIGxvY2Fsc3RvcmFnZSBhbmQgdGhlbiB0cmlnZ2VyIGEgYFwiU0lHTkVEX09VVFwiYCBldmVudC5cbiAgICAgKlxuICAgICAqIEZvciBzZXJ2ZXItc2lkZSBtYW5hZ2VtZW50LCB5b3UgY2FuIHJldm9rZSBhbGwgcmVmcmVzaCB0b2tlbnMgZm9yIGEgdXNlciBieSBwYXNzaW5nIGEgdXNlcidzIEpXVCB0aHJvdWdoIHRvIGBhdXRoLmFwaS5zaWduT3V0KEpXVDogc3RyaW5nKWAuXG4gICAgICogVGhlcmUgaXMgbm8gd2F5IHRvIHJldm9rZSBhIHVzZXIncyBhY2Nlc3MgdG9rZW4gand0IHVudGlsIGl0IGV4cGlyZXMuIEl0IGlzIHJlY29tbWVuZGVkIHRvIHNldCBhIHNob3J0ZXIgZXhwaXJ5IG9uIHRoZSBqd3QgZm9yIHRoaXMgcmVhc29uLlxuICAgICAqXG4gICAgICogSWYgdXNpbmcgYG90aGVyc2Agc2NvcGUsIG5vIGBTSUdORURfT1VUYCBldmVudCBpcyBmaXJlZCFcbiAgICAgKi9cbiAgICBhc3luYyBzaWduT3V0KG9wdGlvbnMgPSB7IHNjb3BlOiAnZ2xvYmFsJyB9KSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3NpZ25PdXQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBfc2lnbk91dCh7IHNjb3BlIH0gPSB7IHNjb3BlOiAnZ2xvYmFsJyB9KSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3I6IHNlc3Npb25FcnJvciB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBzZXNzaW9uRXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gKF9hID0gZGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgdGhpcy5hZG1pbi5zaWduT3V0KGFjY2Vzc1Rva2VuLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSA0MDRzIHNpbmNlIHVzZXIgbWlnaHQgbm90IGV4aXN0IGFueW1vcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIDQwMXMgc2luY2UgYW4gaW52YWxpZCBvciBleHBpcmVkIEpXVCBzaG91bGQgc2lnbiBvdXQgdGhlIGN1cnJlbnQgc2Vzc2lvblxuICAgICAgICAgICAgICAgICAgICBpZiAoIShpc0F1dGhBcGlFcnJvcihlcnJvcikgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChlcnJvci5zdGF0dXMgPT09IDQwNCB8fCBlcnJvci5zdGF0dXMgPT09IDQwMSB8fCBlcnJvci5zdGF0dXMgPT09IDQwMykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjb3BlICE9PSAnb3RoZXJzJykge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3JlbW92ZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICBhd2FpdCByZW1vdmVJdGVtQXN5bmModGhpcy5zdG9yYWdlLCBgJHt0aGlzLnN0b3JhZ2VLZXl9LWNvZGUtdmVyaWZpZXJgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBudWxsIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWNlaXZlIGEgbm90aWZpY2F0aW9uIGV2ZXJ5IHRpbWUgYW4gYXV0aCBldmVudCBoYXBwZW5zLlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgd2hlbiBhbiBhdXRoIGV2ZW50IGhhcHBlbnMuXG4gICAgICovXG4gICAgb25BdXRoU3RhdGVDaGFuZ2UoY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgaWQgPSB1dWlkKCk7XG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICB1bnN1YnNjcmliZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjdW5zdWJzY3JpYmUoKScsICdzdGF0ZSBjaGFuZ2UgY2FsbGJhY2sgd2l0aCBpZCByZW1vdmVkJywgaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VFbWl0dGVycy5kZWxldGUoaWQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNvbkF1dGhTdGF0ZUNoYW5nZSgpJywgJ3JlZ2lzdGVyZWQgY2FsbGJhY2sgd2l0aCBpZCcsIGlkKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUVtaXR0ZXJzLnNldChpZCwgc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXRJbml0aWFsU2Vzc2lvbihpZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzdWJzY3JpcHRpb24gfSB9O1xuICAgIH1cbiAgICBhc3luYyBfZW1pdEluaXRpYWxTZXNzaW9uKGlkKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogeyBzZXNzaW9uIH0sIGVycm9yLCB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgYXdhaXQgKChfYSA9IHRoaXMuc3RhdGVDaGFuZ2VFbWl0dGVycy5nZXQoaWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbGJhY2soJ0lOSVRJQUxfU0VTU0lPTicsIHNlc3Npb24pKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnSU5JVElBTF9TRVNTSU9OJywgJ2NhbGxiYWNrIGlkJywgaWQsICdzZXNzaW9uJywgc2Vzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgKChfYiA9IHRoaXMuc3RhdGVDaGFuZ2VFbWl0dGVycy5nZXQoaWQpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbGJhY2soJ0lOSVRJQUxfU0VTU0lPTicsIG51bGwpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnSU5JVElBTF9TRVNTSU9OJywgJ2NhbGxiYWNrIGlkJywgaWQsICdlcnJvcicsIGVycik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBwYXNzd29yZCByZXNldCByZXF1ZXN0IHRvIGFuIGVtYWlsIGFkZHJlc3MuIFRoaXMgbWV0aG9kIHN1cHBvcnRzIHRoZSBQS0NFIGZsb3cuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW1haWwgVGhlIGVtYWlsIGFkZHJlc3Mgb2YgdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVkaXJlY3RUbyBUaGUgVVJMIHRvIHNlbmQgdGhlIHVzZXIgdG8gYWZ0ZXIgdGhleSBjbGljayB0aGUgcGFzc3dvcmQgcmVzZXQgbGluay5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jYXB0Y2hhVG9rZW4gVmVyaWZpY2F0aW9uIHRva2VuIHJlY2VpdmVkIHdoZW4gdGhlIHVzZXIgY29tcGxldGVzIHRoZSBjYXB0Y2hhIG9uIHRoZSBzaXRlLlxuICAgICAqL1xuICAgIGFzeW5jIHJlc2V0UGFzc3dvcmRGb3JFbWFpbChlbWFpbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlID0gbnVsbDtcbiAgICAgICAgbGV0IGNvZGVDaGFsbGVuZ2VNZXRob2QgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5mbG93VHlwZSA9PT0gJ3BrY2UnKSB7XG4gICAgICAgICAgICA7XG4gICAgICAgICAgICBbY29kZUNoYWxsZW5nZSwgY29kZUNoYWxsZW5nZU1ldGhvZF0gPSBhd2FpdCBnZXRDb2RlQ2hhbGxlbmdlQW5kTWV0aG9kKHRoaXMuc3RvcmFnZSwgdGhpcy5zdG9yYWdlS2V5LCB0cnVlIC8vIGlzUGFzc3dvcmRSZWNvdmVyeVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3JlY292ZXJgLCB7XG4gICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2U6IGNvZGVDaGFsbGVuZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogY29kZUNoYWxsZW5nZU1ldGhvZCxcbiAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zLnJlZGlyZWN0VG8sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyBhbGwgdGhlIGlkZW50aXRpZXMgbGlua2VkIHRvIGEgdXNlci5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRVc2VySWRlbnRpdGllcygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5nZXRVc2VyKCk7XG4gICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IGlkZW50aXRpZXM6IChfYSA9IGRhdGEudXNlci5pZGVudGl0aWVzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaW5rcyBhbiBvYXV0aCBpZGVudGl0eSB0byBhbiBleGlzdGluZyB1c2VyLlxuICAgICAqIFRoaXMgbWV0aG9kIHN1cHBvcnRzIHRoZSBQS0NFIGZsb3cuXG4gICAgICovXG4gICAgYXN5bmMgbGlua0lkZW50aXR5KGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2U7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gYXdhaXQgdGhpcy5fZ2V0VXJsRm9yUHJvdmlkZXIoYCR7dGhpcy51cmx9L3VzZXIvaWRlbnRpdGllcy9hdXRob3JpemVgLCBjcmVkZW50aWFscy5wcm92aWRlciwge1xuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiAoX2EgPSBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVkaXJlY3RUbyxcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVzOiAoX2IgPSBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc2NvcGVzLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeVBhcmFtczogKF9jID0gY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICBza2lwQnJvd3NlclJlZGlyZWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnR0VUJywgdXJsLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgand0OiAoX2UgPSAoX2QgPSBkYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5hY2Nlc3NfdG9rZW4pICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgaWYgKGlzQnJvd3NlcigpICYmICEoKF9hID0gY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNraXBCcm93c2VyUmVkaXJlY3QpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbihkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEudXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgcHJvdmlkZXI6IGNyZWRlbnRpYWxzLnByb3ZpZGVyLCB1cmw6IGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS51cmwgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHByb3ZpZGVyOiBjcmVkZW50aWFscy5wcm92aWRlciwgdXJsOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbmxpbmtzIGFuIGlkZW50aXR5IGZyb20gYSB1c2VyIGJ5IGRlbGV0aW5nIGl0LiBUaGUgdXNlciB3aWxsIG5vIGxvbmdlciBiZSBhYmxlIHRvIHNpZ24gaW4gd2l0aCB0aGF0IGlkZW50aXR5IG9uY2UgaXQncyB1bmxpbmtlZC5cbiAgICAgKi9cbiAgICBhc3luYyB1bmxpbmtJZGVudGl0eShpZGVudGl0eSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdERUxFVEUnLCBgJHt0aGlzLnVybH0vdXNlci9pZGVudGl0aWVzLyR7aWRlbnRpdHkuaWRlbnRpdHlfaWR9YCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGp3dDogKF9iID0gKF9hID0gZGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWNjZXNzX3Rva2VuKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgbmV3IEpXVC5cbiAgICAgKiBAcGFyYW0gcmVmcmVzaFRva2VuIEEgdmFsaWQgcmVmcmVzaCB0b2tlbiB0aGF0IHdhcyByZXR1cm5lZCBvbiBsb2dpbi5cbiAgICAgKi9cbiAgICBhc3luYyBfcmVmcmVzaEFjY2Vzc1Rva2VuKHJlZnJlc2hUb2tlbikge1xuICAgICAgICBjb25zdCBkZWJ1Z05hbWUgPSBgI19yZWZyZXNoQWNjZXNzVG9rZW4oJHtyZWZyZXNoVG9rZW4uc3Vic3RyaW5nKDAsIDUpfS4uLilgO1xuICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdiZWdpbicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRlZEF0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIC8vIHdpbGwgYXR0ZW1wdCB0byByZWZyZXNoIHRoZSB0b2tlbiB3aXRoIGV4cG9uZW50aWFsIGJhY2tvZmZcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCByZXRyeWFibGUoYXN5bmMgKGF0dGVtcHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0ZW1wdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoMjAwICogTWF0aC5wb3coMiwgYXR0ZW1wdCAtIDEpKTsgLy8gMjAwLCA0MDAsIDgwMCwgLi4uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ3JlZnJlc2hpbmcgYXR0ZW1wdCcsIGF0dGVtcHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS90b2tlbj9ncmFudF90eXBlPXJlZnJlc2hfdG9rZW5gLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHsgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCAoYXR0ZW1wdCwgZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0QmFja09mZkludGVydmFsID0gMjAwICogTWF0aC5wb3coMiwgYXR0ZW1wdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChlcnJvciAmJlxuICAgICAgICAgICAgICAgICAgICBpc0F1dGhSZXRyeWFibGVGZXRjaEVycm9yKGVycm9yKSAmJlxuICAgICAgICAgICAgICAgICAgICAvLyByZXRyeWFibGUgb25seSBpZiB0aGUgcmVxdWVzdCBjYW4gYmUgc2VudCBiZWZvcmUgdGhlIGJhY2tvZmYgb3ZlcmZsb3dzIHRoZSB0aWNrIGR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIERhdGUubm93KCkgKyBuZXh0QmFja09mZkludGVydmFsIC0gc3RhcnRlZEF0IDwgQVVUT19SRUZSRVNIX1RJQ0tfRFVSQVRJT05fTVMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb246IG51bGwsIHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnZW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2lzVmFsaWRTZXNzaW9uKG1heWJlU2Vzc2lvbikge1xuICAgICAgICBjb25zdCBpc1ZhbGlkU2Vzc2lvbiA9IHR5cGVvZiBtYXliZVNlc3Npb24gPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICBtYXliZVNlc3Npb24gIT09IG51bGwgJiZcbiAgICAgICAgICAgICdhY2Nlc3NfdG9rZW4nIGluIG1heWJlU2Vzc2lvbiAmJlxuICAgICAgICAgICAgJ3JlZnJlc2hfdG9rZW4nIGluIG1heWJlU2Vzc2lvbiAmJlxuICAgICAgICAgICAgJ2V4cGlyZXNfYXQnIGluIG1heWJlU2Vzc2lvbjtcbiAgICAgICAgcmV0dXJuIGlzVmFsaWRTZXNzaW9uO1xuICAgIH1cbiAgICBhc3luYyBfaGFuZGxlUHJvdmlkZXJTaWduSW4ocHJvdmlkZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgdXJsID0gYXdhaXQgdGhpcy5fZ2V0VXJsRm9yUHJvdmlkZXIoYCR7dGhpcy51cmx9L2F1dGhvcml6ZWAsIHByb3ZpZGVyLCB7XG4gICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zLnJlZGlyZWN0VG8sXG4gICAgICAgICAgICBzY29wZXM6IG9wdGlvbnMuc2NvcGVzLFxuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IG9wdGlvbnMucXVlcnlQYXJhbXMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI19oYW5kbGVQcm92aWRlclNpZ25JbigpJywgJ3Byb3ZpZGVyJywgcHJvdmlkZXIsICdvcHRpb25zJywgb3B0aW9ucywgJ3VybCcsIHVybCk7XG4gICAgICAgIC8vIHRyeSB0byBvcGVuIG9uIHRoZSBicm93c2VyXG4gICAgICAgIGlmIChpc0Jyb3dzZXIoKSAmJiAhb3B0aW9ucy5za2lwQnJvd3NlclJlZGlyZWN0KSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBwcm92aWRlciwgdXJsIH0sIGVycm9yOiBudWxsIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlY292ZXJzIHRoZSBzZXNzaW9uIGZyb20gTG9jYWxTdG9yYWdlIGFuZCByZWZyZXNoZXMgdGhlIHRva2VuXG4gICAgICogTm90ZTogdGhpcyBtZXRob2QgaXMgYXN5bmMgdG8gYWNjb21tb2RhdGUgZm9yIEFzeW5jU3RvcmFnZSBlLmcuIGluIFJlYWN0IG5hdGl2ZS5cbiAgICAgKi9cbiAgICBhc3luYyBfcmVjb3ZlckFuZFJlZnJlc2goKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgZGVidWdOYW1lID0gJyNfcmVjb3ZlckFuZFJlZnJlc2goKSc7XG4gICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2JlZ2luJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2Vzc2lvbiA9IGF3YWl0IGdldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdzZXNzaW9uIGZyb20gc3RvcmFnZScsIGN1cnJlbnRTZXNzaW9uKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNWYWxpZFNlc3Npb24oY3VycmVudFNlc3Npb24pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnc2Vzc2lvbiBpcyBub3QgdmFsaWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNlc3Npb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBleHBpcmVzV2l0aE1hcmdpbiA9ICgoX2EgPSBjdXJyZW50U2Vzc2lvbi5leHBpcmVzX2F0KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBJbmZpbml0eSkgKiAxMDAwIC0gRGF0ZS5ub3coKSA8IEVYUElSWV9NQVJHSU5fTVM7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsIGBzZXNzaW9uIGhhcyR7ZXhwaXJlc1dpdGhNYXJnaW4gPyAnJyA6ICcgbm90J30gZXhwaXJlZCB3aXRoIG1hcmdpbiBvZiAke0VYUElSWV9NQVJHSU5fTVN9c2ApO1xuICAgICAgICAgICAgaWYgKGV4cGlyZXNXaXRoTWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlZnJlc2hUb2tlbiAmJiBjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHRoaXMuX2NhbGxSZWZyZXNoVG9rZW4oY3VycmVudFNlc3Npb24ucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAncmVmcmVzaCBmYWlsZWQgd2l0aCBhIG5vbi1yZXRyeWFibGUgZXJyb3IsIHJlbW92aW5nIHRoZSBzZXNzaW9uJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3JlbW92ZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5vIG5lZWQgdG8gcGVyc2lzdCBjdXJyZW50U2Vzc2lvbiBhZ2FpbiwgYXMgd2UganVzdCBsb2FkZWQgaXQgZnJvbVxuICAgICAgICAgICAgICAgIC8vIGxvY2FsIHN0b3JhZ2U7IHBlcnNpc3RpbmcgaXQgYWdhaW4gbWF5IG92ZXJ3cml0ZSBhIHZhbHVlIHNhdmVkIGJ5XG4gICAgICAgICAgICAgICAgLy8gYW5vdGhlciBjbGllbnQgd2l0aCBhY2Nlc3MgdG8gdGhlIHNhbWUgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBjdXJyZW50U2Vzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnZW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgX2NhbGxSZWZyZXNoVG9rZW4ocmVmcmVzaFRva2VuKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICghcmVmcmVzaFRva2VuKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWZyZXNoaW5nIGlzIGFscmVhZHkgaW4gcHJvZ3Jlc3NcbiAgICAgICAgaWYgKHRoaXMucmVmcmVzaGluZ0RlZmVycmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZWJ1Z05hbWUgPSBgI19jYWxsUmVmcmVzaFRva2VuKCR7cmVmcmVzaFRva2VuLnN1YnN0cmluZygwLCA1KX0uLi4pYDtcbiAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnYmVnaW4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaGluZ0RlZmVycmVkID0gbmV3IERlZmVycmVkKCk7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCB0aGlzLl9yZWZyZXNoQWNjZXNzVG9rZW4ocmVmcmVzaFRva2VuKTtcbiAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIGlmICghZGF0YS5zZXNzaW9uKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcigpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdUT0tFTl9SRUZSRVNIRUQnLCBkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyBzZXNzaW9uOiBkYXRhLnNlc3Npb24sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyBzZXNzaW9uOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIGlmICghaXNBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKF9iID0gdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBfbm90aWZ5QWxsU3Vic2NyaWJlcnMoZXZlbnQsIHNlc3Npb24sIGJyb2FkY2FzdCA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgZGVidWdOYW1lID0gYCNfbm90aWZ5QWxsU3Vic2NyaWJlcnMoJHtldmVudH0pYDtcbiAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnYmVnaW4nLCBzZXNzaW9uLCBgYnJvYWRjYXN0ID0gJHticm9hZGNhc3R9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodGhpcy5icm9hZGNhc3RDaGFubmVsICYmIGJyb2FkY2FzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnJvYWRjYXN0Q2hhbm5lbC5wb3N0TWVzc2FnZSh7IGV2ZW50LCBzZXNzaW9uIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gW107XG4gICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IEFycmF5LmZyb20odGhpcy5zdGF0ZUNoYW5nZUVtaXR0ZXJzLnZhbHVlcygpKS5tYXAoYXN5bmMgKHgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB4LmNhbGxiYWNrKGV2ZW50LCBzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVycm9ycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2VuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHNldCBjdXJyZW50U2Vzc2lvbiBhbmQgY3VycmVudFVzZXJcbiAgICAgKiBwcm9jZXNzIHRvIF9zdGFydEF1dG9SZWZyZXNoVG9rZW4gaWYgcG9zc2libGVcbiAgICAgKi9cbiAgICBhc3luYyBfc2F2ZVNlc3Npb24oc2Vzc2lvbikge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI19zYXZlU2Vzc2lvbigpJywgc2Vzc2lvbik7XG4gICAgICAgIC8vIF9zYXZlU2Vzc2lvbiBpcyBhbHdheXMgY2FsbGVkIHdoZW5ldmVyIGEgbmV3IHNlc3Npb24gaGFzIGJlZW4gYWNxdWlyZWRcbiAgICAgICAgLy8gc28gd2UgY2FuIHNhZmVseSBzdXBwcmVzcyB0aGUgd2FybmluZyByZXR1cm5lZCBieSBmdXR1cmUgZ2V0U2Vzc2lvbiBjYWxsc1xuICAgICAgICB0aGlzLnN1cHByZXNzR2V0U2Vzc2lvbldhcm5pbmcgPSB0cnVlO1xuICAgICAgICBhd2FpdCBzZXRJdGVtQXN5bmModGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXksIHNlc3Npb24pO1xuICAgIH1cbiAgICBhc3luYyBfcmVtb3ZlU2Vzc2lvbigpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfcmVtb3ZlU2Vzc2lvbigpJyk7XG4gICAgICAgIGF3YWl0IHJlbW92ZUl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfT1VUJywgbnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW55IHJlZ2lzdGVyZWQgdmlzaWJpbGl0eWNoYW5nZSBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIHtAc2VlICNzdGFydEF1dG9SZWZyZXNofVxuICAgICAqIHtAc2VlICNzdG9wQXV0b1JlZnJlc2h9XG4gICAgICovXG4gICAgX3JlbW92ZVZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX3JlbW92ZVZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2soKScpO1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMudmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjaztcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBpc0Jyb3dzZXIoKSAmJiAod2luZG93ID09PSBudWxsIHx8IHdpbmRvdyA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlbW92aW5nIHZpc2liaWxpdHljaGFuZ2UgY2FsbGJhY2sgZmFpbGVkJywgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgcHJpdmF0ZSBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgI3N0YXJ0QXV0b1JlZnJlc2h9LiBVc2UgdGhpc1xuICAgICAqIHdpdGhpbiB0aGUgbGlicmFyeS5cbiAgICAgKi9cbiAgICBhc3luYyBfc3RhcnRBdXRvUmVmcmVzaCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fc3RvcEF1dG9SZWZyZXNoKCk7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX3N0YXJ0QXV0b1JlZnJlc2goKScpO1xuICAgICAgICBjb25zdCB0aWNrZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLl9hdXRvUmVmcmVzaFRva2VuVGljaygpLCBBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTl9NUyk7XG4gICAgICAgIHRoaXMuYXV0b1JlZnJlc2hUaWNrZXIgPSB0aWNrZXI7XG4gICAgICAgIGlmICh0aWNrZXIgJiYgdHlwZW9mIHRpY2tlciA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHRpY2tlci51bnJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gdGlja2VyIGlzIGEgTm9kZUpTIFRpbWVvdXQgb2JqZWN0IHRoYXQgaGFzIGFuIGB1bnJlZmAgbWV0aG9kXG4gICAgICAgICAgICAvLyBodHRwczovL25vZGVqcy5vcmcvYXBpL3RpbWVycy5odG1sI3RpbWVvdXR1bnJlZlxuICAgICAgICAgICAgLy8gV2hlbiBhdXRvIHJlZnJlc2ggaXMgdXNlZCBpbiBOb2RlSlMgKGxpa2UgZm9yIHRlc3RpbmcpIHRoZVxuICAgICAgICAgICAgLy8gYHNldEludGVydmFsYCBpcyBwcmV2ZW50aW5nIHRoZSBwcm9jZXNzIGZyb20gYmVpbmcgbWFya2VkIGFzXG4gICAgICAgICAgICAvLyBmaW5pc2hlZCBhbmQgdGVzdHMgcnVuIGVuZGxlc3NseS4gVGhpcyBjYW4gYmUgcHJldmVudGVkIGJ5IGNhbGxpbmdcbiAgICAgICAgICAgIC8vIGB1bnJlZigpYCBvbiB0aGUgcmV0dXJuZWQgb2JqZWN0LlxuICAgICAgICAgICAgdGlja2VyLnVucmVmKCk7XG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFRTIGhhcyBubyBjb250ZXh0IG9mIERlbm9cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgRGVubyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIERlbm8udW5yZWZUaW1lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gc2ltaWxhciBsaWtlIGZvciBOb2RlSlMsIGJ1dCB3aXRoIHRoZSBEZW5vIEFQSVxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZW5vLmxhbmQvYXBpQGxhdGVzdD91bnN0YWJsZSZzPURlbm8udW5yZWZUaW1lclxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBUUyBoYXMgbm8gY29udGV4dCBvZiBEZW5vXG4gICAgICAgICAgICBEZW5vLnVucmVmVGltZXIodGlja2VyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBydW4gdGhlIHRpY2sgaW1tZWRpYXRlbHksIGJ1dCBpbiB0aGUgbmV4dCBwYXNzIG9mIHRoZSBldmVudCBsb29wIHNvIHRoYXRcbiAgICAgICAgLy8gI19pbml0aWFsaXplIGNhbiBiZSBhbGxvd2VkIHRvIGNvbXBsZXRlIHdpdGhvdXQgcmVjdXJzaXZlbHkgd2FpdGluZyBvblxuICAgICAgICAvLyBpdHNlbGZcbiAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fYXV0b1JlZnJlc2hUb2tlblRpY2soKTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIHByaXZhdGUgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rICNzdG9wQXV0b1JlZnJlc2h9LiBVc2UgdGhpc1xuICAgICAqIHdpdGhpbiB0aGUgbGlicmFyeS5cbiAgICAgKi9cbiAgICBhc3luYyBfc3RvcEF1dG9SZWZyZXNoKCkge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI19zdG9wQXV0b1JlZnJlc2goKScpO1xuICAgICAgICBjb25zdCB0aWNrZXIgPSB0aGlzLmF1dG9SZWZyZXNoVGlja2VyO1xuICAgICAgICB0aGlzLmF1dG9SZWZyZXNoVGlja2VyID0gbnVsbDtcbiAgICAgICAgaWYgKHRpY2tlcikge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aWNrZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBhbiBhdXRvLXJlZnJlc2ggcHJvY2VzcyBpbiB0aGUgYmFja2dyb3VuZC4gVGhlIHNlc3Npb24gaXMgY2hlY2tlZFxuICAgICAqIGV2ZXJ5IGZldyBzZWNvbmRzLiBDbG9zZSB0byB0aGUgdGltZSBvZiBleHBpcmF0aW9uIGEgcHJvY2VzcyBpcyBzdGFydGVkIHRvXG4gICAgICogcmVmcmVzaCB0aGUgc2Vzc2lvbi4gSWYgcmVmcmVzaGluZyBmYWlscyBpdCB3aWxsIGJlIHJldHJpZWQgZm9yIGFzIGxvbmcgYXNcbiAgICAgKiBuZWNlc3NhcnkuXG4gICAgICpcbiAgICAgKiBJZiB5b3Ugc2V0IHRoZSB7QGxpbmsgR29UcnVlQ2xpZW50T3B0aW9ucyNhdXRvUmVmcmVzaFRva2VufSB5b3UgZG9uJ3QgbmVlZFxuICAgICAqIHRvIGNhbGwgdGhpcyBmdW5jdGlvbiwgaXQgd2lsbCBiZSBjYWxsZWQgZm9yIHlvdS5cbiAgICAgKlxuICAgICAqIE9uIGJyb3dzZXJzIHRoZSByZWZyZXNoIHByb2Nlc3Mgd29ya3Mgb25seSB3aGVuIHRoZSB0YWIvd2luZG93IGlzIGluIHRoZVxuICAgICAqIGZvcmVncm91bmQgdG8gY29uc2VydmUgcmVzb3VyY2VzIGFzIHdlbGwgYXMgcHJldmVudCByYWNlIGNvbmRpdGlvbnMgYW5kXG4gICAgICogZmxvb2RpbmcgYXV0aCB3aXRoIHJlcXVlc3RzLiBJZiB5b3UgY2FsbCB0aGlzIG1ldGhvZCBhbnkgbWFuYWdlZFxuICAgICAqIHZpc2liaWxpdHkgY2hhbmdlIGNhbGxiYWNrIHdpbGwgYmUgcmVtb3ZlZCBhbmQgeW91IG11c3QgbWFuYWdlIHZpc2liaWxpdHlcbiAgICAgKiBjaGFuZ2VzIG9uIHlvdXIgb3duLlxuICAgICAqXG4gICAgICogT24gbm9uLWJyb3dzZXIgcGxhdGZvcm1zIHRoZSByZWZyZXNoIHByb2Nlc3Mgd29ya3MgKmNvbnRpbnVvdXNseSogaW4gdGhlXG4gICAgICogYmFja2dyb3VuZCwgd2hpY2ggbWF5IG5vdCBiZSBkZXNpcmFibGUuIFlvdSBzaG91bGQgaG9vayBpbnRvIHlvdXJcbiAgICAgKiBwbGF0Zm9ybSdzIGZvcmVncm91bmQgaW5kaWNhdGlvbiBtZWNoYW5pc20gYW5kIGNhbGwgdGhlc2UgbWV0aG9kc1xuICAgICAqIGFwcHJvcHJpYXRlbHkgdG8gY29uc2VydmUgcmVzb3VyY2VzLlxuICAgICAqXG4gICAgICoge0BzZWUgI3N0b3BBdXRvUmVmcmVzaH1cbiAgICAgKi9cbiAgICBhc3luYyBzdGFydEF1dG9SZWZyZXNoKCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVWaXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX3N0YXJ0QXV0b1JlZnJlc2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RvcHMgYW4gYWN0aXZlIGF1dG8gcmVmcmVzaCBwcm9jZXNzIHJ1bm5pbmcgaW4gdGhlIGJhY2tncm91bmQgKGlmIGFueSkuXG4gICAgICpcbiAgICAgKiBJZiB5b3UgY2FsbCB0aGlzIG1ldGhvZCBhbnkgbWFuYWdlZCB2aXNpYmlsaXR5IGNoYW5nZSBjYWxsYmFjayB3aWxsIGJlXG4gICAgICogcmVtb3ZlZCBhbmQgeW91IG11c3QgbWFuYWdlIHZpc2liaWxpdHkgY2hhbmdlcyBvbiB5b3VyIG93bi5cbiAgICAgKlxuICAgICAqIFNlZSB7QGxpbmsgI3N0YXJ0QXV0b1JlZnJlc2h9IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICovXG4gICAgYXN5bmMgc3RvcEF1dG9SZWZyZXNoKCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVWaXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX3N0b3BBdXRvUmVmcmVzaCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSdW5zIHRoZSBhdXRvIHJlZnJlc2ggdG9rZW4gdGljay5cbiAgICAgKi9cbiAgICBhc3luYyBfYXV0b1JlZnJlc2hUb2tlblRpY2soKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX2F1dG9SZWZyZXNoVG9rZW5UaWNrKCknLCAnYmVnaW4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKDAsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogeyBzZXNzaW9uIH0sIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLnJlZnJlc2hfdG9rZW4gfHwgIXNlc3Npb24uZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19hdXRvUmVmcmVzaFRva2VuVGljaygpJywgJ25vIHNlc3Npb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXNzaW9uIHdpbGwgZXhwaXJlIGluIHRoaXMgbWFueSB0aWNrcyAob3IgaGFzIGFscmVhZHkgZXhwaXJlZCBpZiA8PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4cGlyZXNJblRpY2tzID0gTWF0aC5mbG9vcigoc2Vzc2lvbi5leHBpcmVzX2F0ICogMTAwMCAtIG5vdykgLyBBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTl9NUyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfYXV0b1JlZnJlc2hUb2tlblRpY2soKScsIGBhY2Nlc3MgdG9rZW4gZXhwaXJlcyBpbiAke2V4cGlyZXNJblRpY2tzfSB0aWNrcywgYSB0aWNrIGxhc3RzICR7QVVUT19SRUZSRVNIX1RJQ0tfRFVSQVRJT05fTVN9bXMsIHJlZnJlc2ggdGhyZXNob2xkIGlzICR7QVVUT19SRUZSRVNIX1RJQ0tfVEhSRVNIT0xEfSB0aWNrc2ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHBpcmVzSW5UaWNrcyA8PSBBVVRPX1JFRlJFU0hfVElDS19USFJFU0hPTEQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fY2FsbFJlZnJlc2hUb2tlbihzZXNzaW9uLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBdXRvIHJlZnJlc2ggdGljayBmYWlsZWQgd2l0aCBlcnJvci4gVGhpcyBpcyBsaWtlbHkgYSB0cmFuc2llbnQgZXJyb3IuJywgZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2F1dG9SZWZyZXNoVG9rZW5UaWNrKCknLCAnZW5kJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmlzQWNxdWlyZVRpbWVvdXQgfHwgZSBpbnN0YW5jZW9mIExvY2tBY3F1aXJlVGltZW91dEVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJ2F1dG8gcmVmcmVzaCB0b2tlbiB0aWNrIGxvY2sgbm90IGF2YWlsYWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIG9uIHRoZSBicm93c2VyIC8gcGxhdGZvcm0sIHdoaWNoIGluLXR1cm4gcnVuXG4gICAgICogYWxnb3JpdGhtcyB3aGVuIHRoZSBicm93c2VyIHdpbmRvdy90YWIgYXJlIGluIGZvcmVncm91bmQuIE9uIG5vbi1icm93c2VyXG4gICAgICogcGxhdGZvcm1zIGl0IGFzc3VtZXMgYWx3YXlzIGZvcmVncm91bmQuXG4gICAgICovXG4gICAgYXN5bmMgX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UoKScpO1xuICAgICAgICBpZiAoIWlzQnJvd3NlcigpIHx8ICEod2luZG93ID09PSBudWxsIHx8IHdpbmRvdyA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaFRva2VuKSB7XG4gICAgICAgICAgICAgICAgLy8gaW4gbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRzIHRoZSByZWZyZXNoIHRva2VuIHRpY2tlciBydW5zIGFsd2F5c1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRBdXRvUmVmcmVzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2sgPSBhc3luYyAoKSA9PiBhd2FpdCB0aGlzLl9vblZpc2liaWxpdHlDaGFuZ2VkKGZhbHNlKTtcbiAgICAgICAgICAgIHdpbmRvdyA9PT0gbnVsbCB8fCB3aW5kb3cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrKTtcbiAgICAgICAgICAgIC8vIG5vdyBpbW1lZGlhdGVseSBjYWxsIHRoZSB2aXNiaWxpdHkgY2hhbmdlZCBjYWxsYmFjayB0byBzZXR1cCB3aXRoIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCB2aXNiaWxpdHkgc3RhdGVcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX29uVmlzaWJpbGl0eUNoYW5nZWQodHJ1ZSk7IC8vIGluaXRpYWwgY2FsbFxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UnLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgcmVnaXN0ZXJlZCB3aXRoIGB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScpYC5cbiAgICAgKi9cbiAgICBhc3luYyBfb25WaXNpYmlsaXR5Q2hhbmdlZChjYWxsZWRGcm9tSW5pdGlhbGl6ZSkge1xuICAgICAgICBjb25zdCBtZXRob2ROYW1lID0gYCNfb25WaXNpYmlsaXR5Q2hhbmdlZCgke2NhbGxlZEZyb21Jbml0aWFsaXplfSlgO1xuICAgICAgICB0aGlzLl9kZWJ1ZyhtZXRob2ROYW1lLCAndmlzaWJpbGl0eVN0YXRlJywgZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlKTtcbiAgICAgICAgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaFRva2VuKSB7XG4gICAgICAgICAgICAgICAgLy8gaW4gYnJvd3NlciBlbnZpcm9ubWVudHMgdGhlIHJlZnJlc2ggdG9rZW4gdGlja2VyIHJ1bnMgb25seSBvbiBmb2N1c2VkIHRhYnNcbiAgICAgICAgICAgICAgICAvLyB3aGljaCBwcmV2ZW50cyByYWNlIGNvbmRpdGlvbnNcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9SZWZyZXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNhbGxlZEZyb21Jbml0aWFsaXplKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FsbGVkIHdoZW4gdGhlIHZpc2liaWxpdHkgaGFzIGNoYW5nZWQsIGkuZS4gdGhlIGJyb3dzZXJcbiAgICAgICAgICAgICAgICAvLyB0cmFuc2l0aW9uZWQgZnJvbSBoaWRkZW4gLT4gdmlzaWJsZSBzbyB3ZSBuZWVkIHRvIHNlZSBpZiB0aGUgc2Vzc2lvblxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBiZSByZWNvdmVyZWQgaW1tZWRpYXRlbHkuLi4gYnV0IHRvIGRvIHRoYXQgd2UgbmVlZCB0byBhY3F1aXJlXG4gICAgICAgICAgICAgICAgLy8gdGhlIGxvY2sgZmlyc3QgYXN5bmNocm9ub3VzbHlcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgIT09ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcobWV0aG9kTmFtZSwgJ2FjcXVpcmVkIHRoZSBsb2NrIHRvIHJlY292ZXIgdGhlIHNlc3Npb24sIGJ1dCB0aGUgYnJvd3NlciB2aXNpYmlsaXR5U3RhdGUgaXMgbm8gbG9uZ2VyIHZpc2libGUsIGFib3J0aW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2aXNpYmlsaXR5IGhhcyBjaGFuZ2VkIHdoaWxlIHdhaXRpbmcgZm9yIHRoZSBsb2NrLCBhYm9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY292ZXIgdGhlIHNlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVjb3ZlckFuZFJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaFRva2VuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RvcEF1dG9SZWZyZXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHRoZSByZWxldmFudCBsb2dpbiBVUkwgZm9yIGEgdGhpcmQtcGFydHkgcHJvdmlkZXIuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVkaXJlY3RUbyBBIFVSTCBvciBtb2JpbGUgYWRkcmVzcyB0byBzZW5kIHRoZSB1c2VyIHRvIGFmdGVyIHRoZXkgYXJlIGNvbmZpcm1lZC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5zY29wZXMgQSBzcGFjZS1zZXBhcmF0ZWQgbGlzdCBvZiBzY29wZXMgZ3JhbnRlZCB0byB0aGUgT0F1dGggYXBwbGljYXRpb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMucXVlcnlQYXJhbXMgQW4gb2JqZWN0IG9mIGtleS12YWx1ZSBwYWlycyBjb250YWluaW5nIHF1ZXJ5IHBhcmFtZXRlcnMgZ3JhbnRlZCB0byB0aGUgT0F1dGggYXBwbGljYXRpb24uXG4gICAgICovXG4gICAgYXN5bmMgX2dldFVybEZvclByb3ZpZGVyKHVybCwgcHJvdmlkZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gW2Bwcm92aWRlcj0ke2VuY29kZVVSSUNvbXBvbmVudChwcm92aWRlcil9YF07XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucmVkaXJlY3RUbykge1xuICAgICAgICAgICAgdXJsUGFyYW1zLnB1c2goYHJlZGlyZWN0X3RvPSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMucmVkaXJlY3RUbyl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zY29wZXMpIHtcbiAgICAgICAgICAgIHVybFBhcmFtcy5wdXNoKGBzY29wZXM9JHtlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5zY29wZXMpfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZsb3dUeXBlID09PSAncGtjZScpIHtcbiAgICAgICAgICAgIGNvbnN0IFtjb2RlQ2hhbGxlbmdlLCBjb2RlQ2hhbGxlbmdlTWV0aG9kXSA9IGF3YWl0IGdldENvZGVDaGFsbGVuZ2VBbmRNZXRob2QodGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgY29uc3QgZmxvd1BhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlOiBgJHtlbmNvZGVVUklDb21wb25lbnQoY29kZUNoYWxsZW5nZSl9YCxcbiAgICAgICAgICAgICAgICBjb2RlX2NoYWxsZW5nZV9tZXRob2Q6IGAke2VuY29kZVVSSUNvbXBvbmVudChjb2RlQ2hhbGxlbmdlTWV0aG9kKX1gLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB1cmxQYXJhbXMucHVzaChmbG93UGFyYW1zLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucXVlcnlQYXJhbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhvcHRpb25zLnF1ZXJ5UGFyYW1zKTtcbiAgICAgICAgICAgIHVybFBhcmFtcy5wdXNoKHF1ZXJ5LnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuc2tpcEJyb3dzZXJSZWRpcmVjdCkge1xuICAgICAgICAgICAgdXJsUGFyYW1zLnB1c2goYHNraXBfaHR0cF9yZWRpcmVjdD0ke29wdGlvbnMuc2tpcEJyb3dzZXJSZWRpcmVjdH1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7dXJsfT8ke3VybFBhcmFtcy5qb2luKCcmJyl9YDtcbiAgICB9XG4gICAgYXN5bmMgX3VuZW5yb2xsKHBhcmFtcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHNlc3Npb25EYXRhLCBlcnJvcjogc2Vzc2lvbkVycm9yIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogc2Vzc2lvbkVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnREVMRVRFJywgYCR7dGhpcy51cmx9L2ZhY3RvcnMvJHtwYXJhbXMuZmFjdG9ySWR9YCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGp3dDogKF9hID0gc2Vzc2lvbkRhdGEgPT09IG51bGwgfHwgc2Vzc2lvbkRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb25EYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgX2Vucm9sbChwYXJhbXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogc2Vzc2lvbkRhdGEsIGVycm9yOiBzZXNzaW9uRXJyb3IgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yOiBzZXNzaW9uRXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IE9iamVjdC5hc3NpZ24oeyBmcmllbmRseV9uYW1lOiBwYXJhbXMuZnJpZW5kbHlOYW1lLCBmYWN0b3JfdHlwZTogcGFyYW1zLmZhY3RvclR5cGUgfSwgKHBhcmFtcy5mYWN0b3JUeXBlID09PSAncGhvbmUnID8geyBwaG9uZTogcGFyYW1zLnBob25lIH0gOiB7IGlzc3VlcjogcGFyYW1zLmlzc3VlciB9KSk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vZmFjdG9yc2AsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IChfYSA9IHNlc3Npb25EYXRhID09PSBudWxsIHx8IHNlc3Npb25EYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uRGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmZhY3RvclR5cGUgPT09ICd0b3RwJyAmJiAoKF9iID0gZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLnRvdHApID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5xcl9jb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnRvdHAucXJfY29kZSA9IGBkYXRhOmltYWdlL3N2Zyt4bWw7dXRmLTgsJHtkYXRhLnRvdHAucXJfY29kZX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHtAc2VlIEdvVHJ1ZU1GQUFwaSN2ZXJpZnl9XG4gICAgICovXG4gICAgYXN5bmMgX3ZlcmlmeShwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHNlc3Npb25EYXRhLCBlcnJvcjogc2Vzc2lvbkVycm9yIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yOiBzZXNzaW9uRXJyb3IgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9mYWN0b3JzLyR7cGFyYW1zLmZhY3RvcklkfS92ZXJpZnlgLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB7IGNvZGU6IHBhcmFtcy5jb2RlLCBjaGFsbGVuZ2VfaWQ6IHBhcmFtcy5jaGFsbGVuZ2VJZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgand0OiAoX2EgPSBzZXNzaW9uRGF0YSA9PT0gbnVsbCB8fCBzZXNzaW9uRGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbkRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihPYmplY3QuYXNzaWduKHsgZXhwaXJlc19hdDogTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCkgKyBkYXRhLmV4cGlyZXNfaW4gfSwgZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnTUZBX0NIQUxMRU5HRV9WRVJJRklFRCcsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHtAc2VlIEdvVHJ1ZU1GQUFwaSNjaGFsbGVuZ2V9XG4gICAgICovXG4gICAgYXN5bmMgX2NoYWxsZW5nZShwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHNlc3Npb25EYXRhLCBlcnJvcjogc2Vzc2lvbkVycm9yIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yOiBzZXNzaW9uRXJyb3IgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vZmFjdG9ycy8ke3BhcmFtcy5mYWN0b3JJZH0vY2hhbGxlbmdlYCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogeyBjaGFubmVsOiBwYXJhbXMuY2hhbm5lbCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgand0OiAoX2EgPSBzZXNzaW9uRGF0YSA9PT0gbnVsbCB8fCBzZXNzaW9uRGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbkRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICoge0BzZWUgR29UcnVlTUZBQXBpI2NoYWxsZW5nZUFuZFZlcmlmeX1cbiAgICAgKi9cbiAgICBhc3luYyBfY2hhbGxlbmdlQW5kVmVyaWZ5KHBhcmFtcykge1xuICAgICAgICAvLyBib3RoIF9jaGFsbGVuZ2UgYW5kIF92ZXJpZnkgaW5kZXBlbmRlbnRseSBhY3F1aXJlIHRoZSBsb2NrLCBzbyBubyBuZWVkXG4gICAgICAgIC8vIHRvIGFjcXVpcmUgaXQgaGVyZVxuICAgICAgICBjb25zdCB7IGRhdGE6IGNoYWxsZW5nZURhdGEsIGVycm9yOiBjaGFsbGVuZ2VFcnJvciB9ID0gYXdhaXQgdGhpcy5fY2hhbGxlbmdlKHtcbiAgICAgICAgICAgIGZhY3RvcklkOiBwYXJhbXMuZmFjdG9ySWQsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2hhbGxlbmdlRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yOiBjaGFsbGVuZ2VFcnJvciB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl92ZXJpZnkoe1xuICAgICAgICAgICAgZmFjdG9ySWQ6IHBhcmFtcy5mYWN0b3JJZCxcbiAgICAgICAgICAgIGNoYWxsZW5nZUlkOiBjaGFsbGVuZ2VEYXRhLmlkLFxuICAgICAgICAgICAgY29kZTogcGFyYW1zLmNvZGUsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiB7QHNlZSBHb1RydWVNRkFBcGkjbGlzdEZhY3RvcnN9XG4gICAgICovXG4gICAgYXN5bmMgX2xpc3RGYWN0b3JzKCkge1xuICAgICAgICAvLyB1c2UgI2dldFVzZXIgaW5zdGVhZCBvZiAjX2dldFVzZXIgYXMgdGhlIGZvcm1lciBhY3F1aXJlcyBhIGxvY2tcbiAgICAgICAgY29uc3QgeyBkYXRhOiB7IHVzZXIgfSwgZXJyb3I6IHVzZXJFcnJvciwgfSA9IGF3YWl0IHRoaXMuZ2V0VXNlcigpO1xuICAgICAgICBpZiAodXNlckVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogdXNlckVycm9yIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmFjdG9ycyA9ICh1c2VyID09PSBudWxsIHx8IHVzZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHVzZXIuZmFjdG9ycykgfHwgW107XG4gICAgICAgIGNvbnN0IHRvdHAgPSBmYWN0b3JzLmZpbHRlcigoZmFjdG9yKSA9PiBmYWN0b3IuZmFjdG9yX3R5cGUgPT09ICd0b3RwJyAmJiBmYWN0b3Iuc3RhdHVzID09PSAndmVyaWZpZWQnKTtcbiAgICAgICAgY29uc3QgcGhvbmUgPSBmYWN0b3JzLmZpbHRlcigoZmFjdG9yKSA9PiBmYWN0b3IuZmFjdG9yX3R5cGUgPT09ICdwaG9uZScgJiYgZmFjdG9yLnN0YXR1cyA9PT0gJ3ZlcmlmaWVkJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgYWxsOiBmYWN0b3JzLFxuICAgICAgICAgICAgICAgIHRvdHAsXG4gICAgICAgICAgICAgICAgcGhvbmUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHtAc2VlIEdvVHJ1ZU1GQUFwaSNnZXRBdXRoZW50aWNhdG9yQXNzdXJhbmNlTGV2ZWx9XG4gICAgICovXG4gICAgYXN5bmMgX2dldEF1dGhlbnRpY2F0b3JBc3N1cmFuY2VMZXZlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHsgc2Vzc2lvbiB9LCBlcnJvcjogc2Vzc2lvbkVycm9yLCB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IHNlc3Npb25FcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgY3VycmVudExldmVsOiBudWxsLCBuZXh0TGV2ZWw6IG51bGwsIGN1cnJlbnRBdXRoZW50aWNhdGlvbk1ldGhvZHM6IFtdIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyBwYXlsb2FkIH0gPSBkZWNvZGVKV1Qoc2Vzc2lvbi5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50TGV2ZWwgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmFhbCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50TGV2ZWwgPSBwYXlsb2FkLmFhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG5leHRMZXZlbCA9IGN1cnJlbnRMZXZlbDtcbiAgICAgICAgICAgICAgICBjb25zdCB2ZXJpZmllZEZhY3RvcnMgPSAoX2IgPSAoX2EgPSBzZXNzaW9uLnVzZXIuZmFjdG9ycykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZpbHRlcigoZmFjdG9yKSA9PiBmYWN0b3Iuc3RhdHVzID09PSAndmVyaWZpZWQnKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogW107XG4gICAgICAgICAgICAgICAgaWYgKHZlcmlmaWVkRmFjdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRMZXZlbCA9ICdhYWwyJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEF1dGhlbnRpY2F0aW9uTWV0aG9kcyA9IHBheWxvYWQuYW1yIHx8IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgY3VycmVudExldmVsLCBuZXh0TGV2ZWwsIGN1cnJlbnRBdXRoZW50aWNhdGlvbk1ldGhvZHMgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgZmV0Y2hKd2soa2lkLCBqd2tzID0geyBrZXlzOiBbXSB9KSB7XG4gICAgICAgIC8vIHRyeSBmZXRjaGluZyBmcm9tIHRoZSBzdXBwbGllZCBqd2tzXG4gICAgICAgIGxldCBqd2sgPSBqd2tzLmtleXMuZmluZCgoa2V5KSA9PiBrZXkua2lkID09PSBraWQpO1xuICAgICAgICBpZiAoandrKSB7XG4gICAgICAgICAgICByZXR1cm4gandrO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRyeSBmZXRjaGluZyBmcm9tIGNhY2hlXG4gICAgICAgIGp3ayA9IHRoaXMuandrcy5rZXlzLmZpbmQoKGtleSkgPT4ga2V5LmtpZCA9PT0ga2lkKTtcbiAgICAgICAgLy8gandrIGV4aXN0cyBhbmQgandrcyBpc24ndCBzdGFsZVxuICAgICAgICBpZiAoandrICYmIHRoaXMuandrc19jYWNoZWRfYXQgKyBKV0tTX1RUTCA+IERhdGUubm93KCkpIHtcbiAgICAgICAgICAgIHJldHVybiBqd2s7XG4gICAgICAgIH1cbiAgICAgICAgLy8gandrIGlzbid0IGNhY2hlZCBpbiBtZW1vcnkgc28gd2UgbmVlZCB0byBmZXRjaCBpdCBmcm9tIHRoZSB3ZWxsLWtub3duIGVuZHBvaW50XG4gICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdHRVQnLCBgJHt0aGlzLnVybH0vLndlbGwta25vd24vandrcy5qc29uYCwge1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRhdGEua2V5cyB8fCBkYXRhLmtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRKd3RFcnJvcignSldLUyBpcyBlbXB0eScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuandrcyA9IGRhdGE7XG4gICAgICAgIHRoaXMuandrc19jYWNoZWRfYXQgPSBEYXRlLm5vdygpO1xuICAgICAgICAvLyBGaW5kIHRoZSBzaWduaW5nIGtleVxuICAgICAgICBqd2sgPSBkYXRhLmtleXMuZmluZCgoa2V5KSA9PiBrZXkua2lkID09PSBraWQpO1xuICAgICAgICBpZiAoIWp3aykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbnZhbGlkSnd0RXJyb3IoJ05vIG1hdGNoaW5nIHNpZ25pbmcga2V5IGZvdW5kIGluIEpXS1MnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gandrO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAZXhwZXJpbWVudGFsIFRoaXMgbWV0aG9kIG1heSBjaGFuZ2UgaW4gZnV0dXJlIHZlcnNpb25zLlxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXRzIHRoZSBjbGFpbXMgZnJvbSBhIEpXVC4gSWYgdGhlIEpXVCBpcyBzeW1tZXRyaWMgSldUcywgaXQgd2lsbCBjYWxsIGdldFVzZXIoKSB0byB2ZXJpZnkgYWdhaW5zdCB0aGUgc2VydmVyLiBJZiB0aGUgSldUIGlzIGFzeW1tZXRyaWMsIGl0IHdpbGwgYmUgdmVyaWZpZWQgYWdhaW5zdCB0aGUgSldLUyB1c2luZyB0aGUgV2ViQ3J5cHRvIEFQSS5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRDbGFpbXMoand0LCBqd2tzID0geyBrZXlzOiBbXSB9KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgdG9rZW4gPSBqd3Q7XG4gICAgICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5nZXRTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIHx8ICFkYXRhLnNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBkYXRhLnNlc3Npb24uYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBoZWFkZXIsIHBheWxvYWQsIHNpZ25hdHVyZSwgcmF3OiB7IGhlYWRlcjogcmF3SGVhZGVyLCBwYXlsb2FkOiByYXdQYXlsb2FkIH0sIH0gPSBkZWNvZGVKV1QodG9rZW4pO1xuICAgICAgICAgICAgLy8gUmVqZWN0IGV4cGlyZWQgSldUc1xuICAgICAgICAgICAgdmFsaWRhdGVFeHAocGF5bG9hZC5leHApO1xuICAgICAgICAgICAgLy8gSWYgc3ltbWV0cmljIGFsZ29yaXRobSBvciBXZWJDcnlwdG8gQVBJIGlzIHVuYXZhaWxhYmxlLCBmYWxsYmFjayB0byBnZXRVc2VyKClcbiAgICAgICAgICAgIGlmICghaGVhZGVyLmtpZCB8fFxuICAgICAgICAgICAgICAgIGhlYWRlci5hbGcgPT09ICdIUzI1NicgfHxcbiAgICAgICAgICAgICAgICAhKCdjcnlwdG8nIGluIGdsb2JhbFRoaXMgJiYgJ3N1YnRsZScgaW4gZ2xvYmFsVGhpcy5jcnlwdG8pKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgdGhpcy5nZXRVc2VyKHRva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGdldFVzZXIgc3VjY2VlZHMgc28gdGhlIGNsYWltcyBpbiB0aGUgSldUIGNhbiBiZSB0cnVzdGVkXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhaW1zOiBwYXlsb2FkLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYWxnb3JpdGhtID0gZ2V0QWxnb3JpdGhtKGhlYWRlci5hbGcpO1xuICAgICAgICAgICAgY29uc3Qgc2lnbmluZ0tleSA9IGF3YWl0IHRoaXMuZmV0Y2hKd2soaGVhZGVyLmtpZCwgandrcyk7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IEpXSyB0byBDcnlwdG9LZXlcbiAgICAgICAgICAgIGNvbnN0IHB1YmxpY0tleSA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCdqd2snLCBzaWduaW5nS2V5LCBhbGdvcml0aG0sIHRydWUsIFtcbiAgICAgICAgICAgICAgICAndmVyaWZ5JyxcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgLy8gVmVyaWZ5IHRoZSBzaWduYXR1cmVcbiAgICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBjcnlwdG8uc3VidGxlLnZlcmlmeShhbGdvcml0aG0sIHB1YmxpY0tleSwgc2lnbmF0dXJlLCBzdHJpbmdUb1VpbnQ4QXJyYXkoYCR7cmF3SGVhZGVyfS4ke3Jhd1BheWxvYWR9YCkpO1xuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbnZhbGlkSnd0RXJyb3IoJ0ludmFsaWQgSldUIHNpZ25hdHVyZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgdmVyaWZpY2F0aW9uIHN1Y2NlZWRzLCBkZWNvZGUgYW5kIHJldHVybiBjbGFpbXNcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBjbGFpbXM6IHBheWxvYWQsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbkdvVHJ1ZUNsaWVudC5uZXh0SW5zdGFuY2VJRCA9IDA7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Hb1RydWVDbGllbnQuanMubWFwIiwiaW1wb3J0IEdvVHJ1ZUFkbWluQXBpIGZyb20gJy4vR29UcnVlQWRtaW5BcGknO1xuaW1wb3J0IEdvVHJ1ZUNsaWVudCBmcm9tICcuL0dvVHJ1ZUNsaWVudCc7XG5pbXBvcnQgQXV0aEFkbWluQXBpIGZyb20gJy4vQXV0aEFkbWluQXBpJztcbmltcG9ydCBBdXRoQ2xpZW50IGZyb20gJy4vQXV0aENsaWVudCc7XG5leHBvcnQgeyBHb1RydWVBZG1pbkFwaSwgR29UcnVlQ2xpZW50LCBBdXRoQWRtaW5BcGksIEF1dGhDbGllbnQgfTtcbmV4cG9ydCAqIGZyb20gJy4vbGliL3R5cGVzJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2Vycm9ycyc7XG5leHBvcnQgeyBuYXZpZ2F0b3JMb2NrLCBOYXZpZ2F0b3JMb2NrQWNxdWlyZVRpbWVvdXRFcnJvciwgaW50ZXJuYWxzIGFzIGxvY2tJbnRlcm5hbHMsIH0gZnJvbSAnLi9saWIvbG9ja3MnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLyoqXG4gKiBBdm9pZCBtb2RpZnlpbmcgdGhpcyBmaWxlLiBJdCdzIHBhcnQgb2ZcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBhYmFzZS1jb21tdW5pdHkvYmFzZTY0dXJsLWpzLiAgU3VibWl0IGFsbCBmaXhlcyBvblxuICogdGhhdCByZXBvIVxuICovXG4vKipcbiAqIEFuIGFycmF5IG9mIGNoYXJhY3RlcnMgdGhhdCBlbmNvZGUgNiBiaXRzIGludG8gYSBCYXNlNjQtVVJMIGFscGhhYmV0XG4gKiBjaGFyYWN0ZXIuXG4gKi9cbmNvbnN0IFRPX0JBU0U2NFVSTCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS1fJy5zcGxpdCgnJyk7XG4vKipcbiAqIEFuIGFycmF5IG9mIGNoYXJhY3RlcnMgdGhhdCBjYW4gYXBwZWFyIGluIGEgQmFzZTY0LVVSTCBlbmNvZGVkIHN0cmluZyBidXRcbiAqIHNob3VsZCBiZSBpZ25vcmVkLlxuICovXG5jb25zdCBJR05PUkVfQkFTRTY0VVJMID0gJyBcXHRcXG5cXHI9Jy5zcGxpdCgnJyk7XG4vKipcbiAqIEFuIGFycmF5IG9mIDEyOCBudW1iZXJzIHRoYXQgbWFwIGEgQmFzZTY0LVVSTCBjaGFyYWN0ZXIgdG8gNiBiaXRzLCBvciBpZiAtMlxuICogdXNlZCB0byBza2lwIHRoZSBjaGFyYWN0ZXIsIG9yIGlmIC0xIHVzZWQgdG8gZXJyb3Igb3V0LlxuICovXG5jb25zdCBGUk9NX0JBU0U2NFVSTCA9ICgoKSA9PiB7XG4gICAgY29uc3QgY2hhck1hcCA9IG5ldyBBcnJheSgxMjgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhck1hcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjaGFyTWFwW2ldID0gLTE7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgSUdOT1JFX0JBU0U2NFVSTC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjaGFyTWFwW0lHTk9SRV9CQVNFNjRVUkxbaV0uY2hhckNvZGVBdCgwKV0gPSAtMjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBUT19CQVNFNjRVUkwubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY2hhck1hcFtUT19CQVNFNjRVUkxbaV0uY2hhckNvZGVBdCgwKV0gPSBpO1xuICAgIH1cbiAgICByZXR1cm4gY2hhck1hcDtcbn0pKCk7XG4vKipcbiAqIENvbnZlcnRzIGEgYnl0ZSB0byBhIEJhc2U2NC1VUkwgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSBieXRlIFRoZSBieXRlIHRvIGNvbnZlcnQsIG9yIG51bGwgdG8gZmx1c2ggYXQgdGhlIGVuZCBvZiB0aGUgYnl0ZSBzZXF1ZW5jZS5cbiAqIEBwYXJhbSBzdGF0ZSBUaGUgQmFzZTY0IGNvbnZlcnNpb24gc3RhdGUuIFBhc3MgYW4gaW5pdGlhbCB2YWx1ZSBvZiBgeyBxdWV1ZTogMCwgcXVldWVkQml0czogMCB9YC5cbiAqIEBwYXJhbSBlbWl0IEEgZnVuY3Rpb24gY2FsbGVkIHdpdGggdGhlIG5leHQgQmFzZTY0IGNoYXJhY3RlciB3aGVuIHJlYWR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnl0ZVRvQmFzZTY0VVJMKGJ5dGUsIHN0YXRlLCBlbWl0KSB7XG4gICAgaWYgKGJ5dGUgIT09IG51bGwpIHtcbiAgICAgICAgc3RhdGUucXVldWUgPSAoc3RhdGUucXVldWUgPDwgOCkgfCBieXRlO1xuICAgICAgICBzdGF0ZS5xdWV1ZWRCaXRzICs9IDg7XG4gICAgICAgIHdoaWxlIChzdGF0ZS5xdWV1ZWRCaXRzID49IDYpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IChzdGF0ZS5xdWV1ZSA+PiAoc3RhdGUucXVldWVkQml0cyAtIDYpKSAmIDYzO1xuICAgICAgICAgICAgZW1pdChUT19CQVNFNjRVUkxbcG9zXSk7XG4gICAgICAgICAgICBzdGF0ZS5xdWV1ZWRCaXRzIC09IDY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdGUucXVldWVkQml0cyA+IDApIHtcbiAgICAgICAgc3RhdGUucXVldWUgPSBzdGF0ZS5xdWV1ZSA8PCAoNiAtIHN0YXRlLnF1ZXVlZEJpdHMpO1xuICAgICAgICBzdGF0ZS5xdWV1ZWRCaXRzID0gNjtcbiAgICAgICAgd2hpbGUgKHN0YXRlLnF1ZXVlZEJpdHMgPj0gNikge1xuICAgICAgICAgICAgY29uc3QgcG9zID0gKHN0YXRlLnF1ZXVlID4+IChzdGF0ZS5xdWV1ZWRCaXRzIC0gNikpICYgNjM7XG4gICAgICAgICAgICBlbWl0KFRPX0JBU0U2NFVSTFtwb3NdKTtcbiAgICAgICAgICAgIHN0YXRlLnF1ZXVlZEJpdHMgLT0gNjtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQ29udmVydHMgYSBTdHJpbmcgY2hhciBjb2RlIChleHRyYWN0ZWQgdXNpbmcgYHN0cmluZy5jaGFyQ29kZUF0KHBvc2l0aW9uKWApIHRvIGEgc2VxdWVuY2Ugb2YgQmFzZTY0LVVSTCBjaGFyYWN0ZXJzLlxuICpcbiAqIEBwYXJhbSBjaGFyQ29kZSBUaGUgY2hhciBjb2RlIG9mIHRoZSBKYXZhU2NyaXB0IHN0cmluZy5cbiAqIEBwYXJhbSBzdGF0ZSBUaGUgQmFzZTY0IHN0YXRlLiBQYXNzIGFuIGluaXRpYWwgdmFsdWUgb2YgYHsgcXVldWU6IDAsIHF1ZXVlZEJpdHM6IDAgfWAuXG4gKiBAcGFyYW0gZW1pdCBBIGZ1bmN0aW9uIGNhbGxlZCB3aXRoIHRoZSBuZXh0IGJ5dGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBieXRlRnJvbUJhc2U2NFVSTChjaGFyQ29kZSwgc3RhdGUsIGVtaXQpIHtcbiAgICBjb25zdCBiaXRzID0gRlJPTV9CQVNFNjRVUkxbY2hhckNvZGVdO1xuICAgIGlmIChiaXRzID4gLTEpIHtcbiAgICAgICAgLy8gdmFsaWQgQmFzZTY0LVVSTCBjaGFyYWN0ZXJcbiAgICAgICAgc3RhdGUucXVldWUgPSAoc3RhdGUucXVldWUgPDwgNikgfCBiaXRzO1xuICAgICAgICBzdGF0ZS5xdWV1ZWRCaXRzICs9IDY7XG4gICAgICAgIHdoaWxlIChzdGF0ZS5xdWV1ZWRCaXRzID49IDgpIHtcbiAgICAgICAgICAgIGVtaXQoKHN0YXRlLnF1ZXVlID4+IChzdGF0ZS5xdWV1ZWRCaXRzIC0gOCkpICYgMHhmZik7XG4gICAgICAgICAgICBzdGF0ZS5xdWV1ZWRCaXRzIC09IDg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoYml0cyA9PT0gLTIpIHtcbiAgICAgICAgLy8gaWdub3JlIHNwYWNlcywgdGFicywgbmV3bGluZXMsID1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIEJhc2U2NC1VUkwgY2hhcmFjdGVyIFwiJHtTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXJDb2RlKX1cImApO1xuICAgIH1cbn1cbi8qKlxuICogQ29udmVydHMgYSBKYXZhU2NyaXB0IHN0cmluZyAod2hpY2ggbWF5IGluY2x1ZGUgYW55IHZhbGlkIGNoYXJhY3RlcikgaW50byBhXG4gKiBCYXNlNjQtVVJMIGVuY29kZWQgc3RyaW5nLiBUaGUgc3RyaW5nIGlzIGZpcnN0IGVuY29kZWQgaW4gVVRGLTggd2hpY2ggaXNcbiAqIHRoZW4gZW5jb2RlZCBhcyBCYXNlNjQtVVJMLlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9CYXNlNjRVUkwoc3RyKSB7XG4gICAgY29uc3QgYmFzZTY0ID0gW107XG4gICAgY29uc3QgZW1pdHRlciA9IChjaGFyKSA9PiB7XG4gICAgICAgIGJhc2U2NC5wdXNoKGNoYXIpO1xuICAgIH07XG4gICAgY29uc3Qgc3RhdGUgPSB7IHF1ZXVlOiAwLCBxdWV1ZWRCaXRzOiAwIH07XG4gICAgc3RyaW5nVG9VVEY4KHN0ciwgKGJ5dGUpID0+IHtcbiAgICAgICAgYnl0ZVRvQmFzZTY0VVJMKGJ5dGUsIHN0YXRlLCBlbWl0dGVyKTtcbiAgICB9KTtcbiAgICBieXRlVG9CYXNlNjRVUkwobnVsbCwgc3RhdGUsIGVtaXR0ZXIpO1xuICAgIHJldHVybiBiYXNlNjQuam9pbignJyk7XG59XG4vKipcbiAqIENvbnZlcnRzIGEgQmFzZTY0LVVSTCBlbmNvZGVkIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBzdHJpbmcuIEl0IGlzIGFzc3VtZWRcbiAqIHRoYXQgdGhlIHVuZGVybHlpbmcgc3RyaW5nIGhhcyBiZWVuIGVuY29kZWQgYXMgVVRGLTguXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgQmFzZTY0LVVSTCBlbmNvZGVkIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0Zyb21CYXNlNjRVUkwoc3RyKSB7XG4gICAgY29uc3QgY29udiA9IFtdO1xuICAgIGNvbnN0IHV0ZjhFbWl0ID0gKGNvZGVwb2ludCkgPT4ge1xuICAgICAgICBjb252LnB1c2goU3RyaW5nLmZyb21Db2RlUG9pbnQoY29kZXBvaW50KSk7XG4gICAgfTtcbiAgICBjb25zdCB1dGY4U3RhdGUgPSB7XG4gICAgICAgIHV0ZjhzZXE6IDAsXG4gICAgICAgIGNvZGVwb2ludDogMCxcbiAgICB9O1xuICAgIGNvbnN0IGI2NFN0YXRlID0geyBxdWV1ZTogMCwgcXVldWVkQml0czogMCB9O1xuICAgIGNvbnN0IGJ5dGVFbWl0ID0gKGJ5dGUpID0+IHtcbiAgICAgICAgc3RyaW5nRnJvbVVURjgoYnl0ZSwgdXRmOFN0YXRlLCB1dGY4RW1pdCk7XG4gICAgfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBieXRlRnJvbUJhc2U2NFVSTChzdHIuY2hhckNvZGVBdChpKSwgYjY0U3RhdGUsIGJ5dGVFbWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnYuam9pbignJyk7XG59XG4vKipcbiAqIENvbnZlcnRzIGEgVW5pY29kZSBjb2RlcG9pbnQgdG8gYSBtdWx0aS1ieXRlIFVURi04IHNlcXVlbmNlLlxuICpcbiAqIEBwYXJhbSBjb2RlcG9pbnQgVGhlIFVuaWNvZGUgY29kZXBvaW50LlxuICogQHBhcmFtIGVtaXQgICAgICBGdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaCBVVEYtOCBieXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgY29kZXBvaW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29kZXBvaW50VG9VVEY4KGNvZGVwb2ludCwgZW1pdCkge1xuICAgIGlmIChjb2RlcG9pbnQgPD0gMHg3Zikge1xuICAgICAgICBlbWl0KGNvZGVwb2ludCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29kZXBvaW50IDw9IDB4N2ZmKSB7XG4gICAgICAgIGVtaXQoMHhjMCB8IChjb2RlcG9pbnQgPj4gNikpO1xuICAgICAgICBlbWl0KDB4ODAgfCAoY29kZXBvaW50ICYgMHgzZikpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvZGVwb2ludCA8PSAweGZmZmYpIHtcbiAgICAgICAgZW1pdCgweGUwIHwgKGNvZGVwb2ludCA+PiAxMikpO1xuICAgICAgICBlbWl0KDB4ODAgfCAoKGNvZGVwb2ludCA+PiA2KSAmIDB4M2YpKTtcbiAgICAgICAgZW1pdCgweDgwIHwgKGNvZGVwb2ludCAmIDB4M2YpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb2RlcG9pbnQgPD0gMHgxMGZmZmYpIHtcbiAgICAgICAgZW1pdCgweGYwIHwgKGNvZGVwb2ludCA+PiAxOCkpO1xuICAgICAgICBlbWl0KDB4ODAgfCAoKGNvZGVwb2ludCA+PiAxMikgJiAweDNmKSk7XG4gICAgICAgIGVtaXQoMHg4MCB8ICgoY29kZXBvaW50ID4+IDYpICYgMHgzZikpO1xuICAgICAgICBlbWl0KDB4ODAgfCAoY29kZXBvaW50ICYgMHgzZikpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgVW5yZWNvZ25pemVkIFVuaWNvZGUgY29kZXBvaW50OiAke2NvZGVwb2ludC50b1N0cmluZygxNil9YCk7XG59XG4vKipcbiAqIENvbnZlcnRzIGEgSmF2YVNjcmlwdCBzdHJpbmcgdG8gYSBzZXF1ZW5jZSBvZiBVVEYtOCBieXRlcy5cbiAqXG4gKiBAcGFyYW0gc3RyICBUaGUgc3RyaW5nIHRvIGNvbnZlcnQgdG8gVVRGLTguXG4gKiBAcGFyYW0gZW1pdCBGdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaCBVVEYtOCBieXRlIG9mIHRoZSBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb1VURjgoc3RyLCBlbWl0KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgbGV0IGNvZGVwb2ludCA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoY29kZXBvaW50ID4gMHhkN2ZmICYmIGNvZGVwb2ludCA8PSAweGRiZmYpIHtcbiAgICAgICAgICAgIC8vIG1vc3QgVVRGLTE2IGNvZGVwb2ludHMgYXJlIFVuaWNvZGUgY29kZXBvaW50cywgZXhjZXB0IHZhbHVlcyBpbiB0aGlzXG4gICAgICAgICAgICAvLyByYW5nZSB3aGVyZSB0aGUgbmV4dCBVVEYtMTYgY29kZXBvaW50IG5lZWRzIHRvIGJlIGNvbWJpbmVkIHdpdGggdGhlXG4gICAgICAgICAgICAvLyBjdXJyZW50IG9uZSB0byBnZXQgdGhlIFVuaWNvZGUgY29kZXBvaW50XG4gICAgICAgICAgICBjb25zdCBoaWdoU3Vycm9nYXRlID0gKChjb2RlcG9pbnQgLSAweGQ4MDApICogMHg0MDApICYgMHhmZmZmO1xuICAgICAgICAgICAgY29uc3QgbG93U3Vycm9nYXRlID0gKHN0ci5jaGFyQ29kZUF0KGkgKyAxKSAtIDB4ZGMwMCkgJiAweGZmZmY7XG4gICAgICAgICAgICBjb2RlcG9pbnQgPSAobG93U3Vycm9nYXRlIHwgaGlnaFN1cnJvZ2F0ZSkgKyAweDEwMDAwO1xuICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvZGVwb2ludFRvVVRGOChjb2RlcG9pbnQsIGVtaXQpO1xuICAgIH1cbn1cbi8qKlxuICogQ29udmVydHMgYSBVVEYtOCBieXRlIHRvIGEgVW5pY29kZSBjb2RlcG9pbnQuXG4gKlxuICogQHBhcmFtIGJ5dGUgIFRoZSBVVEYtOCBieXRlIG5leHQgaW4gdGhlIHNlcXVlbmNlLlxuICogQHBhcmFtIHN0YXRlIFRoZSBzaGFyZWQgc3RhdGUgYmV0d2VlbiBjb25zZWN1dGl2ZSBVVEYtOCBieXRlcyBpbiB0aGVcbiAqICAgICAgICAgICAgICBzZXF1ZW5jZSwgYW4gb2JqZWN0IHdpdGggdGhlIHNoYXBlIGB7IHV0ZjhzZXE6IDAsIGNvZGVwb2ludDogMCB9YC5cbiAqIEBwYXJhbSBlbWl0ICBGdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaCBjb2RlcG9pbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdGcm9tVVRGOChieXRlLCBzdGF0ZSwgZW1pdCkge1xuICAgIGlmIChzdGF0ZS51dGY4c2VxID09PSAwKSB7XG4gICAgICAgIGlmIChieXRlIDw9IDB4N2YpIHtcbiAgICAgICAgICAgIGVtaXQoYnl0ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gY291bnQgdGhlIG51bWJlciBvZiAxIGxlYWRpbmcgYml0cyB1bnRpbCB5b3UgcmVhY2ggMFxuICAgICAgICBmb3IgKGxldCBsZWFkaW5nQml0ID0gMTsgbGVhZGluZ0JpdCA8IDY7IGxlYWRpbmdCaXQgKz0gMSkge1xuICAgICAgICAgICAgaWYgKCgoYnl0ZSA+PiAoNyAtIGxlYWRpbmdCaXQpKSAmIDEpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUudXRmOHNlcSA9IGxlYWRpbmdCaXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXRlLnV0ZjhzZXEgPT09IDIpIHtcbiAgICAgICAgICAgIHN0YXRlLmNvZGVwb2ludCA9IGJ5dGUgJiAzMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZS51dGY4c2VxID09PSAzKSB7XG4gICAgICAgICAgICBzdGF0ZS5jb2RlcG9pbnQgPSBieXRlICYgMTU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhdGUudXRmOHNlcSA9PT0gNCkge1xuICAgICAgICAgICAgc3RhdGUuY29kZXBvaW50ID0gYnl0ZSAmIDc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgVVRGLTggc2VxdWVuY2UnKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS51dGY4c2VxIC09IDE7XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXRlLnV0ZjhzZXEgPiAwKSB7XG4gICAgICAgIGlmIChieXRlIDw9IDB4N2YpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBVVEYtOCBzZXF1ZW5jZScpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLmNvZGVwb2ludCA9IChzdGF0ZS5jb2RlcG9pbnQgPDwgNikgfCAoYnl0ZSAmIDYzKTtcbiAgICAgICAgc3RhdGUudXRmOHNlcSAtPSAxO1xuICAgICAgICBpZiAoc3RhdGUudXRmOHNlcSA9PT0gMCkge1xuICAgICAgICAgICAgZW1pdChzdGF0ZS5jb2RlcG9pbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb25zIHRvIGNvbnZlcnQgZGlmZmVyZW50IHR5cGVzIG9mIHN0cmluZ3MgdG8gVWludDhBcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmFzZTY0VXJsVG9VaW50OEFycmF5KHN0cikge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGNvbnN0IHN0YXRlID0geyBxdWV1ZTogMCwgcXVldWVkQml0czogMCB9O1xuICAgIGNvbnN0IG9uQnl0ZSA9IChieXRlKSA9PiB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGJ5dGUpO1xuICAgIH07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYnl0ZUZyb21CYXNlNjRVUkwoc3RyLmNoYXJDb2RlQXQoaSksIHN0YXRlLCBvbkJ5dGUpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb1VpbnQ4QXJyYXkoc3RyKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgc3RyaW5nVG9VVEY4KHN0ciwgKGJ5dGUpID0+IHJlc3VsdC5wdXNoKGJ5dGUpKTtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2U2NHVybC5qcy5tYXAiLCJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uJztcbi8qKiBDdXJyZW50IHNlc3Npb24gd2lsbCBiZSBjaGVja2VkIGZvciByZWZyZXNoIGF0IHRoaXMgaW50ZXJ2YWwuICovXG5leHBvcnQgY29uc3QgQVVUT19SRUZSRVNIX1RJQ0tfRFVSQVRJT05fTVMgPSAzMCAqIDEwMDA7XG4vKipcbiAqIEEgdG9rZW4gcmVmcmVzaCB3aWxsIGJlIGF0dGVtcHRlZCB0aGlzIG1hbnkgdGlja3MgYmVmb3JlIHRoZSBjdXJyZW50IHNlc3Npb24gZXhwaXJlcy4gKi9cbmV4cG9ydCBjb25zdCBBVVRPX1JFRlJFU0hfVElDS19USFJFU0hPTEQgPSAzO1xuLypcbiAqIEVhcmxpZXN0IHRpbWUgYmVmb3JlIGFuIGFjY2VzcyB0b2tlbiBleHBpcmVzIHRoYXQgdGhlIHNlc3Npb24gc2hvdWxkIGJlIHJlZnJlc2hlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IEVYUElSWV9NQVJHSU5fTVMgPSBBVVRPX1JFRlJFU0hfVElDS19USFJFU0hPTEQgKiBBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTl9NUztcbmV4cG9ydCBjb25zdCBHT1RSVUVfVVJMID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6OTk5OSc7XG5leHBvcnQgY29uc3QgU1RPUkFHRV9LRVkgPSAnc3VwYWJhc2UuYXV0aC50b2tlbic7XG5leHBvcnQgY29uc3QgQVVESUVOQ0UgPSAnJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX0hFQURFUlMgPSB7ICdYLUNsaWVudC1JbmZvJzogYGdvdHJ1ZS1qcy8ke3ZlcnNpb259YCB9O1xuZXhwb3J0IGNvbnN0IE5FVFdPUktfRkFJTFVSRSA9IHtcbiAgICBNQVhfUkVUUklFUzogMTAsXG4gICAgUkVUUllfSU5URVJWQUw6IDIsIC8vIGluIGRlY2lzZWNvbmRzXG59O1xuZXhwb3J0IGNvbnN0IEFQSV9WRVJTSU9OX0hFQURFUl9OQU1FID0gJ1gtU3VwYWJhc2UtQXBpLVZlcnNpb24nO1xuZXhwb3J0IGNvbnN0IEFQSV9WRVJTSU9OUyA9IHtcbiAgICAnMjAyNC0wMS0wMSc6IHtcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLnBhcnNlKCcyMDI0LTAxLTAxVDAwOjAwOjAwLjBaJyksXG4gICAgICAgIG5hbWU6ICcyMDI0LTAxLTAxJyxcbiAgICB9LFxufTtcbmV4cG9ydCBjb25zdCBCQVNFNjRVUkxfUkVHRVggPSAvXihbYS16MC05Xy1dezR9KSooJHxbYS16MC05Xy1dezN9JHxbYS16MC05Xy1dezJ9JCkkL2k7XG5leHBvcnQgY29uc3QgSldLU19UVEwgPSA2MDAwMDA7IC8vIDEwIG1pbnV0ZXNcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCJleHBvcnQgY2xhc3MgQXV0aEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHN0YXR1cywgY29kZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5fX2lzQXV0aEVycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ0F1dGhFcnJvcic7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhFcnJvcihlcnJvcikge1xuICAgIHJldHVybiB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnICYmIGVycm9yICE9PSBudWxsICYmICdfX2lzQXV0aEVycm9yJyBpbiBlcnJvcjtcbn1cbmV4cG9ydCBjbGFzcyBBdXRoQXBpRXJyb3IgZXh0ZW5kcyBBdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHN0YXR1cywgY29kZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCBzdGF0dXMsIGNvZGUpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnQXV0aEFwaUVycm9yJztcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQXV0aEFwaUVycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuIGlzQXV0aEVycm9yKGVycm9yKSAmJiBlcnJvci5uYW1lID09PSAnQXV0aEFwaUVycm9yJztcbn1cbmV4cG9ydCBjbGFzcyBBdXRoVW5rbm93bkVycm9yIGV4dGVuZHMgQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBvcmlnaW5hbEVycm9yKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnQXV0aFVua25vd25FcnJvcic7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFcnJvciA9IG9yaWdpbmFsRXJyb3I7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEN1c3RvbUF1dGhFcnJvciBleHRlbmRzIEF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgbmFtZSwgc3RhdHVzLCBjb2RlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsIHN0YXR1cywgY29kZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvciBleHRlbmRzIEN1c3RvbUF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdBdXRoIHNlc3Npb24gbWlzc2luZyEnLCAnQXV0aFNlc3Npb25NaXNzaW5nRXJyb3InLCA0MDAsIHVuZGVmaW5lZCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4gaXNBdXRoRXJyb3IoZXJyb3IpICYmIGVycm9yLm5hbWUgPT09ICdBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcic7XG59XG5leHBvcnQgY2xhc3MgQXV0aEludmFsaWRUb2tlblJlc3BvbnNlRXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignQXV0aCBzZXNzaW9uIG9yIHVzZXIgbWlzc2luZycsICdBdXRoSW52YWxpZFRva2VuUmVzcG9uc2VFcnJvcicsIDUwMCwgdW5kZWZpbmVkKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQXV0aEludmFsaWRDcmVkZW50aWFsc0Vycm9yIGV4dGVuZHMgQ3VzdG9tQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3InLCA0MDAsIHVuZGVmaW5lZCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEF1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvciBleHRlbmRzIEN1c3RvbUF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgZGV0YWlscyA9IG51bGwpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgJ0F1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvcicsIDUwMCwgdW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gbnVsbDtcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuZGV0YWlscyxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4gaXNBdXRoRXJyb3IoZXJyb3IpICYmIGVycm9yLm5hbWUgPT09ICdBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3InO1xufVxuZXhwb3J0IGNsYXNzIEF1dGhQS0NFR3JhbnRDb2RlRXhjaGFuZ2VFcnJvciBleHRlbmRzIEN1c3RvbUF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgZGV0YWlscyA9IG51bGwpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgJ0F1dGhQS0NFR3JhbnRDb2RlRXhjaGFuZ2VFcnJvcicsIDUwMCwgdW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gbnVsbDtcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgIGRldGFpbHM6IHRoaXMuZGV0YWlscyxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHN0YXR1cykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnQXV0aFJldHJ5YWJsZUZldGNoRXJyb3InLCBzdGF0dXMsIHVuZGVmaW5lZCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4gaXNBdXRoRXJyb3IoZXJyb3IpICYmIGVycm9yLm5hbWUgPT09ICdBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcic7XG59XG4vKipcbiAqIFRoaXMgZXJyb3IgaXMgdGhyb3duIG9uIGNlcnRhaW4gbWV0aG9kcyB3aGVuIHRoZSBwYXNzd29yZCB1c2VkIGlzIGRlZW1lZFxuICogd2Vhay4gSW5zcGVjdCB0aGUgcmVhc29ucyB0byBpZGVudGlmeSB3aGF0IHBhc3N3b3JkIHN0cmVuZ3RoIHJ1bGVzIGFyZVxuICogaW5hZGVxdWF0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhXZWFrUGFzc3dvcmRFcnJvciBleHRlbmRzIEN1c3RvbUF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgc3RhdHVzLCByZWFzb25zKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdBdXRoV2Vha1Bhc3N3b3JkRXJyb3InLCBzdGF0dXMsICd3ZWFrX3Bhc3N3b3JkJyk7XG4gICAgICAgIHRoaXMucmVhc29ucyA9IHJlYXNvbnM7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQXV0aFdlYWtQYXNzd29yZEVycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuIGlzQXV0aEVycm9yKGVycm9yKSAmJiBlcnJvci5uYW1lID09PSAnQXV0aFdlYWtQYXNzd29yZEVycm9yJztcbn1cbmV4cG9ydCBjbGFzcyBBdXRoSW52YWxpZEp3dEVycm9yIGV4dGVuZHMgQ3VzdG9tQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdBdXRoSW52YWxpZEp3dEVycm9yJywgNDAwLCAnaW52YWxpZF9qd3QnKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvcnMuanMubWFwIiwidmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgQVBJX1ZFUlNJT05TLCBBUElfVkVSU0lPTl9IRUFERVJfTkFNRSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGV4cGlyZXNBdCwgbG9va3NMaWtlRmV0Y2hSZXNwb25zZSwgcGFyc2VSZXNwb25zZUFQSVZlcnNpb24gfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgQXV0aEFwaUVycm9yLCBBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvciwgQXV0aFdlYWtQYXNzd29yZEVycm9yLCBBdXRoVW5rbm93bkVycm9yLCBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvciwgfSBmcm9tICcuL2Vycm9ycyc7XG5jb25zdCBfZ2V0RXJyb3JNZXNzYWdlID0gKGVycikgPT4gZXJyLm1zZyB8fCBlcnIubWVzc2FnZSB8fCBlcnIuZXJyb3JfZGVzY3JpcHRpb24gfHwgZXJyLmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGVycik7XG5jb25zdCBORVRXT1JLX0VSUk9SX0NPREVTID0gWzUwMiwgNTAzLCA1MDRdO1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICghbG9va3NMaWtlRmV0Y2hSZXNwb25zZShlcnJvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF1dGhSZXRyeWFibGVGZXRjaEVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZXJyb3IpLCAwKTtcbiAgICB9XG4gICAgaWYgKE5FVFdPUktfRVJST1JfQ09ERVMuaW5jbHVkZXMoZXJyb3Iuc3RhdHVzKSkge1xuICAgICAgICAvLyBzdGF0dXMgaW4gNTAwLi4uNTk5IHJhbmdlIC0gc2VydmVyIGhhZCBhbiBlcnJvciwgcmVxdWVzdCBtaWdodCBiZSByZXRyeWVkLlxuICAgICAgICB0aHJvdyBuZXcgQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IoX2dldEVycm9yTWVzc2FnZShlcnJvciksIGVycm9yLnN0YXR1cyk7XG4gICAgfVxuICAgIGxldCBkYXRhO1xuICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBhd2FpdCBlcnJvci5qc29uKCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBBdXRoVW5rbm93bkVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZSksIGUpO1xuICAgIH1cbiAgICBsZXQgZXJyb3JDb2RlID0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHJlc3BvbnNlQVBJVmVyc2lvbiA9IHBhcnNlUmVzcG9uc2VBUElWZXJzaW9uKGVycm9yKTtcbiAgICBpZiAocmVzcG9uc2VBUElWZXJzaW9uICYmXG4gICAgICAgIHJlc3BvbnNlQVBJVmVyc2lvbi5nZXRUaW1lKCkgPj0gQVBJX1ZFUlNJT05TWycyMDI0LTAxLTAxJ10udGltZXN0YW1wICYmXG4gICAgICAgIHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJlxuICAgICAgICBkYXRhICYmXG4gICAgICAgIHR5cGVvZiBkYXRhLmNvZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGVycm9yQ29kZSA9IGRhdGEuY29kZTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmIGRhdGEgJiYgdHlwZW9mIGRhdGEuZXJyb3JfY29kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZXJyb3JDb2RlID0gZGF0YS5lcnJvcl9jb2RlO1xuICAgIH1cbiAgICBpZiAoIWVycm9yQ29kZSkge1xuICAgICAgICAvLyBMZWdhY3kgc3VwcG9ydCBmb3Igd2VhayBwYXNzd29yZCBlcnJvcnMsIHdoZW4gdGhlcmUgd2VyZSBubyBlcnJvciBjb2Rlc1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICBkYXRhICYmXG4gICAgICAgICAgICB0eXBlb2YgZGF0YS53ZWFrX3Bhc3N3b3JkID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgZGF0YS53ZWFrX3Bhc3N3b3JkICYmXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KGRhdGEud2Vha19wYXNzd29yZC5yZWFzb25zKSAmJlxuICAgICAgICAgICAgZGF0YS53ZWFrX3Bhc3N3b3JkLnJlYXNvbnMubGVuZ3RoICYmXG4gICAgICAgICAgICBkYXRhLndlYWtfcGFzc3dvcmQucmVhc29ucy5yZWR1Y2UoKGEsIGkpID0+IGEgJiYgdHlwZW9mIGkgPT09ICdzdHJpbmcnLCB0cnVlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhXZWFrUGFzc3dvcmRFcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGRhdGEpLCBlcnJvci5zdGF0dXMsIGRhdGEud2Vha19wYXNzd29yZC5yZWFzb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChlcnJvckNvZGUgPT09ICd3ZWFrX3Bhc3N3b3JkJykge1xuICAgICAgICB0aHJvdyBuZXcgQXV0aFdlYWtQYXNzd29yZEVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZGF0YSksIGVycm9yLnN0YXR1cywgKChfYSA9IGRhdGEud2Vha19wYXNzd29yZCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlYXNvbnMpIHx8IFtdKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXJyb3JDb2RlID09PSAnc2Vzc2lvbl9ub3RfZm91bmQnKSB7XG4gICAgICAgIC8vIFRoZSBgc2Vzc2lvbl9pZGAgaW5zaWRlIHRoZSBKV1QgZG9lcyBub3QgY29ycmVzcG9uZCB0byBhIHJvdyBpbiB0aGVcbiAgICAgICAgLy8gYHNlc3Npb25zYCB0YWJsZS4gVGhpcyB1c3VhbGx5IG1lYW5zIHRoZSB1c2VyIGhhcyBzaWduZWQgb3V0LCBoYXMgYmVlblxuICAgICAgICAvLyBkZWxldGVkLCBvciB0aGVpciBzZXNzaW9uIGhhcyBzb21laG93IGJlZW4gdGVybWluYXRlZC5cbiAgICAgICAgdGhyb3cgbmV3IEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKCk7XG4gICAgfVxuICAgIHRocm93IG5ldyBBdXRoQXBpRXJyb3IoX2dldEVycm9yTWVzc2FnZShkYXRhKSwgZXJyb3Iuc3RhdHVzIHx8IDUwMCwgZXJyb3JDb2RlKTtcbn1cbmNvbnN0IF9nZXRSZXF1ZXN0UGFyYW1zID0gKG1ldGhvZCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgbWV0aG9kLCBoZWFkZXJzOiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhlYWRlcnMpIHx8IHt9IH07XG4gICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG4gICAgcGFyYW1zLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnIH0sIG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBwYXJhbXMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcyksIHBhcmFtZXRlcnMpO1xufTtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBfcmVxdWVzdChmZXRjaGVyLCBtZXRob2QsIHVybCwgb3B0aW9ucykge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGlmICghaGVhZGVyc1tBUElfVkVSU0lPTl9IRUFERVJfTkFNRV0pIHtcbiAgICAgICAgaGVhZGVyc1tBUElfVkVSU0lPTl9IRUFERVJfTkFNRV0gPSBBUElfVkVSU0lPTlNbJzIwMjQtMDEtMDEnXS5uYW1lO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmp3dCkge1xuICAgICAgICBoZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7b3B0aW9ucy5qd3R9YDtcbiAgICB9XG4gICAgY29uc3QgcXMgPSAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucXVlcnkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9O1xuICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucmVkaXJlY3RUbykge1xuICAgICAgICBxc1sncmVkaXJlY3RfdG8nXSA9IG9wdGlvbnMucmVkaXJlY3RUbztcbiAgICB9XG4gICAgY29uc3QgcXVlcnlTdHJpbmcgPSBPYmplY3Qua2V5cyhxcykubGVuZ3RoID8gJz8nICsgbmV3IFVSTFNlYXJjaFBhcmFtcyhxcykudG9TdHJpbmcoKSA6ICcnO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCBtZXRob2QsIHVybCArIHF1ZXJ5U3RyaW5nLCB7XG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIG5vUmVzb2x2ZUpzb246IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5ub1Jlc29sdmVKc29uLFxuICAgIH0sIHt9LCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuYm9keSk7XG4gICAgcmV0dXJuIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMueGZvcm0pID8gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnhmb3JtKGRhdGEpIDogeyBkYXRhOiBPYmplY3QuYXNzaWduKHt9LCBkYXRhKSwgZXJyb3I6IG51bGwgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIF9oYW5kbGVSZXF1ZXN0KGZldGNoZXIsIG1ldGhvZCwgdXJsLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KSB7XG4gICAgY29uc3QgcmVxdWVzdFBhcmFtcyA9IF9nZXRSZXF1ZXN0UGFyYW1zKG1ldGhvZCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSk7XG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgICByZXN1bHQgPSBhd2FpdCBmZXRjaGVyKHVybCwgT2JqZWN0LmFzc2lnbih7fSwgcmVxdWVzdFBhcmFtcykpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAvLyBmZXRjaCBmYWlsZWQsIGxpa2VseSBkdWUgdG8gYSBuZXR3b3JrIG9yIENPUlMgZXJyb3JcbiAgICAgICAgdGhyb3cgbmV3IEF1dGhSZXRyeWFibGVGZXRjaEVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZSksIDApO1xuICAgIH1cbiAgICBpZiAoIXJlc3VsdC5vaykge1xuICAgICAgICBhd2FpdCBoYW5kbGVFcnJvcihyZXN1bHQpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLm5vUmVzb2x2ZUpzb24pIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3VsdC5qc29uKCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGF3YWl0IGhhbmRsZUVycm9yKGUpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBfc2Vzc2lvblJlc3BvbnNlKGRhdGEpIHtcbiAgICB2YXIgX2E7XG4gICAgbGV0IHNlc3Npb24gPSBudWxsO1xuICAgIGlmIChoYXNTZXNzaW9uKGRhdGEpKSB7XG4gICAgICAgIHNlc3Npb24gPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgaWYgKCFkYXRhLmV4cGlyZXNfYXQpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZXhwaXJlc19hdCA9IGV4cGlyZXNBdChkYXRhLmV4cGlyZXNfaW4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHVzZXIgPSAoX2EgPSBkYXRhLnVzZXIpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGRhdGE7XG4gICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uLCB1c2VyIH0sIGVycm9yOiBudWxsIH07XG59XG5leHBvcnQgZnVuY3Rpb24gX3Nlc3Npb25SZXNwb25zZVBhc3N3b3JkKGRhdGEpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IF9zZXNzaW9uUmVzcG9uc2UoZGF0YSk7XG4gICAgaWYgKCFyZXNwb25zZS5lcnJvciAmJlxuICAgICAgICBkYXRhLndlYWtfcGFzc3dvcmQgJiZcbiAgICAgICAgdHlwZW9mIGRhdGEud2Vha19wYXNzd29yZCA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgQXJyYXkuaXNBcnJheShkYXRhLndlYWtfcGFzc3dvcmQucmVhc29ucykgJiZcbiAgICAgICAgZGF0YS53ZWFrX3Bhc3N3b3JkLnJlYXNvbnMubGVuZ3RoICYmXG4gICAgICAgIGRhdGEud2Vha19wYXNzd29yZC5tZXNzYWdlICYmXG4gICAgICAgIHR5cGVvZiBkYXRhLndlYWtfcGFzc3dvcmQubWVzc2FnZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgZGF0YS53ZWFrX3Bhc3N3b3JkLnJlYXNvbnMucmVkdWNlKChhLCBpKSA9PiBhICYmIHR5cGVvZiBpID09PSAnc3RyaW5nJywgdHJ1ZSkpIHtcbiAgICAgICAgcmVzcG9uc2UuZGF0YS53ZWFrX3Bhc3N3b3JkID0gZGF0YS53ZWFrX3Bhc3N3b3JkO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2U7XG59XG5leHBvcnQgZnVuY3Rpb24gX3VzZXJSZXNwb25zZShkYXRhKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHVzZXIgPSAoX2EgPSBkYXRhLnVzZXIpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGRhdGE7XG4gICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyIH0sIGVycm9yOiBudWxsIH07XG59XG5leHBvcnQgZnVuY3Rpb24gX3Nzb1Jlc3BvbnNlKGRhdGEpIHtcbiAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIF9nZW5lcmF0ZUxpbmtSZXNwb25zZShkYXRhKSB7XG4gICAgY29uc3QgeyBhY3Rpb25fbGluaywgZW1haWxfb3RwLCBoYXNoZWRfdG9rZW4sIHJlZGlyZWN0X3RvLCB2ZXJpZmljYXRpb25fdHlwZSB9ID0gZGF0YSwgcmVzdCA9IF9fcmVzdChkYXRhLCBbXCJhY3Rpb25fbGlua1wiLCBcImVtYWlsX290cFwiLCBcImhhc2hlZF90b2tlblwiLCBcInJlZGlyZWN0X3RvXCIsIFwidmVyaWZpY2F0aW9uX3R5cGVcIl0pO1xuICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7XG4gICAgICAgIGFjdGlvbl9saW5rLFxuICAgICAgICBlbWFpbF9vdHAsXG4gICAgICAgIGhhc2hlZF90b2tlbixcbiAgICAgICAgcmVkaXJlY3RfdG8sXG4gICAgICAgIHZlcmlmaWNhdGlvbl90eXBlLFxuICAgIH07XG4gICAgY29uc3QgdXNlciA9IE9iamVjdC5hc3NpZ24oe30sIHJlc3QpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMsXG4gICAgICAgICAgICB1c2VyLFxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogbnVsbCxcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIF9ub1Jlc29sdmVKc29uUmVzcG9uc2UoZGF0YSkge1xuICAgIHJldHVybiBkYXRhO1xufVxuLyoqXG4gKiBoYXNTZXNzaW9uIGNoZWNrcyBpZiB0aGUgcmVzcG9uc2Ugb2JqZWN0IGNvbnRhaW5zIGEgdmFsaWQgc2Vzc2lvblxuICogQHBhcmFtIGRhdGEgQSByZXNwb25zZSBvYmplY3RcbiAqIEByZXR1cm5zIHRydWUgaWYgYSBzZXNzaW9uIGlzIGluIHRoZSByZXNwb25zZVxuICovXG5mdW5jdGlvbiBoYXNTZXNzaW9uKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YS5hY2Nlc3NfdG9rZW4gJiYgZGF0YS5yZWZyZXNoX3Rva2VuICYmIGRhdGEuZXhwaXJlc19pbjtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZldGNoLmpzLm1hcCIsImltcG9ydCB7IEFQSV9WRVJTSU9OX0hFQURFUl9OQU1FLCBCQVNFNjRVUkxfUkVHRVggfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBdXRoSW52YWxpZEp3dEVycm9yIH0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHsgYmFzZTY0VXJsVG9VaW50OEFycmF5LCBzdHJpbmdGcm9tQmFzZTY0VVJMIH0gZnJvbSAnLi9iYXNlNjR1cmwnO1xuZXhwb3J0IGZ1bmN0aW9uIGV4cGlyZXNBdChleHBpcmVzSW4pIHtcbiAgICBjb25zdCB0aW1lTm93ID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgcmV0dXJuIHRpbWVOb3cgKyBleHBpcmVzSW47XG59XG5leHBvcnQgZnVuY3Rpb24gdXVpZCgpIHtcbiAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgICAgICBjb25zdCByID0gKE1hdGgucmFuZG9tKCkgKiAxNikgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogKHIgJiAweDMpIHwgMHg4O1xuICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgfSk7XG59XG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCkgPT4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbmNvbnN0IGxvY2FsU3RvcmFnZVdyaXRlVGVzdHMgPSB7XG4gICAgdGVzdGVkOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG59O1xuLyoqXG4gKiBDaGVja3Mgd2hldGhlciBsb2NhbFN0b3JhZ2UgaXMgc3VwcG9ydGVkIG9uIHRoaXMgYnJvd3Nlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHN1cHBvcnRzTG9jYWxTdG9yYWdlID0gKCkgPT4ge1xuICAgIGlmICghaXNCcm93c2VyKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMubG9jYWxTdG9yYWdlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIERPTSBleGNlcHRpb24gd2hlbiBhY2Nlc3NpbmcgYGxvY2FsU3RvcmFnZWBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobG9jYWxTdG9yYWdlV3JpdGVUZXN0cy50ZXN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZVdyaXRlVGVzdHMud3JpdGFibGU7XG4gICAgfVxuICAgIGNvbnN0IHJhbmRvbUtleSA9IGBsc3d0LSR7TWF0aC5yYW5kb20oKX0ke01hdGgucmFuZG9tKCl9YDtcbiAgICB0cnkge1xuICAgICAgICBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHJhbmRvbUtleSwgcmFuZG9tS2V5KTtcbiAgICAgICAgZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShyYW5kb21LZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzLnRlc3RlZCA9IHRydWU7XG4gICAgICAgIGxvY2FsU3RvcmFnZVdyaXRlVGVzdHMud3JpdGFibGUgPSB0cnVlO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAvLyBsb2NhbFN0b3JhZ2UgY2FuJ3QgYmUgd3JpdHRlbiB0b1xuICAgICAgICAvLyBodHRwczovL3d3dy5jaHJvbWl1bS5vcmcvZm9yLXRlc3RlcnMvYnVnLXJlcG9ydGluZy1ndWlkZWxpbmVzL3VuY2F1Z2h0LXNlY3VyaXR5ZXJyb3ItZmFpbGVkLXRvLXJlYWQtdGhlLWxvY2Fsc3RvcmFnZS1wcm9wZXJ0eS1mcm9tLXdpbmRvdy1hY2Nlc3MtaXMtZGVuaWVkLWZvci10aGlzLWRvY3VtZW50XG4gICAgICAgIGxvY2FsU3RvcmFnZVdyaXRlVGVzdHMudGVzdGVkID0gdHJ1ZTtcbiAgICAgICAgbG9jYWxTdG9yYWdlV3JpdGVUZXN0cy53cml0YWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlV3JpdGVUZXN0cy53cml0YWJsZTtcbn07XG4vKipcbiAqIEV4dHJhY3RzIHBhcmFtZXRlcnMgZW5jb2RlZCBpbiB0aGUgVVJMIGJvdGggaW4gdGhlIHF1ZXJ5IGFuZCBmcmFnbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUGFyYW1ldGVyc0Zyb21VUkwoaHJlZikge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoaHJlZik7XG4gICAgaWYgKHVybC5oYXNoICYmIHVybC5oYXNoWzBdID09PSAnIycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGhhc2hTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5oYXNoLnN1YnN0cmluZygxKSk7XG4gICAgICAgICAgICBoYXNoU2VhcmNoUGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIGhhc2ggaXMgbm90IGEgcXVlcnkgc3RyaW5nXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gc2VhcmNoIHBhcmFtZXRlcnMgdGFrZSBwcmVjZWRlbmNlIG92ZXIgaGFzaCBwYXJhbWV0ZXJzXG4gICAgdXJsLnNlYXJjaFBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBjb25zdCByZXNvbHZlRmV0Y2ggPSAoY3VzdG9tRmV0Y2gpID0+IHtcbiAgICBsZXQgX2ZldGNoO1xuICAgIGlmIChjdXN0b21GZXRjaCkge1xuICAgICAgICBfZmV0Y2ggPSBjdXN0b21GZXRjaDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGZldGNoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBfZmV0Y2ggPSAoLi4uYXJncykgPT4gaW1wb3J0KCdAc3VwYWJhc2Uvbm9kZS1mZXRjaCcpLnRoZW4oKHsgZGVmYXVsdDogZmV0Y2ggfSkgPT4gZmV0Y2goLi4uYXJncykpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgX2ZldGNoID0gZmV0Y2g7XG4gICAgfVxuICAgIHJldHVybiAoLi4uYXJncykgPT4gX2ZldGNoKC4uLmFyZ3MpO1xufTtcbmV4cG9ydCBjb25zdCBsb29rc0xpa2VGZXRjaFJlc3BvbnNlID0gKG1heWJlUmVzcG9uc2UpID0+IHtcbiAgICByZXR1cm4gKHR5cGVvZiBtYXliZVJlc3BvbnNlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICBtYXliZVJlc3BvbnNlICE9PSBudWxsICYmXG4gICAgICAgICdzdGF0dXMnIGluIG1heWJlUmVzcG9uc2UgJiZcbiAgICAgICAgJ29rJyBpbiBtYXliZVJlc3BvbnNlICYmXG4gICAgICAgICdqc29uJyBpbiBtYXliZVJlc3BvbnNlICYmXG4gICAgICAgIHR5cGVvZiBtYXliZVJlc3BvbnNlLmpzb24gPT09ICdmdW5jdGlvbicpO1xufTtcbi8vIFN0b3JhZ2UgaGVscGVyc1xuZXhwb3J0IGNvbnN0IHNldEl0ZW1Bc3luYyA9IGFzeW5jIChzdG9yYWdlLCBrZXksIGRhdGEpID0+IHtcbiAgICBhd2FpdCBzdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59O1xuZXhwb3J0IGNvbnN0IGdldEl0ZW1Bc3luYyA9IGFzeW5jIChzdG9yYWdlLCBrZXkpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGF3YWl0IHN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHJlbW92ZUl0ZW1Bc3luYyA9IGFzeW5jIChzdG9yYWdlLCBrZXkpID0+IHtcbiAgICBhd2FpdCBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbn07XG4vKipcbiAqIEEgZGVmZXJyZWQgcmVwcmVzZW50cyBzb21lIGFzeW5jaHJvbm91cyB3b3JrIHRoYXQgaXMgbm90IHlldCBmaW5pc2hlZCwgd2hpY2hcbiAqIG1heSBvciBtYXkgbm90IGN1bG1pbmF0ZSBpbiBhIHZhbHVlLlxuICogVGFrZW4gZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL21pa2Utbm9ydGgvdHlwZXMvYmxvYi9tYXN0ZXIvc3JjL2FzeW5jLnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWZlcnJlZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXh0cmEtc2VtaVxuICAgICAgICA7XG4gICAgICAgIHRoaXMucHJvbWlzZSA9IG5ldyBEZWZlcnJlZC5wcm9taXNlQ29uc3RydWN0b3IoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4dHJhLXNlbWlcbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlcztcbiAgICAgICAgICAgIHRoaXMucmVqZWN0ID0gcmVqO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5EZWZlcnJlZC5wcm9taXNlQ29uc3RydWN0b3IgPSBQcm9taXNlO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZUpXVCh0b2tlbikge1xuICAgIGNvbnN0IHBhcnRzID0gdG9rZW4uc3BsaXQoJy4nKTtcbiAgICBpZiAocGFydHMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZEp3dEVycm9yKCdJbnZhbGlkIEpXVCBzdHJ1Y3R1cmUnKTtcbiAgICB9XG4gICAgLy8gUmVnZXggY2hlY2tzIGZvciBiYXNlNjR1cmwgZm9ybWF0XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIUJBU0U2NFVSTF9SRUdFWC50ZXN0KHBhcnRzW2ldKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbnZhbGlkSnd0RXJyb3IoJ0pXVCBub3QgaW4gYmFzZTY0dXJsIGZvcm1hdCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIC8vIHVzaW5nIGJhc2U2NHVybCBsaWJcbiAgICAgICAgaGVhZGVyOiBKU09OLnBhcnNlKHN0cmluZ0Zyb21CYXNlNjRVUkwocGFydHNbMF0pKSxcbiAgICAgICAgcGF5bG9hZDogSlNPTi5wYXJzZShzdHJpbmdGcm9tQmFzZTY0VVJMKHBhcnRzWzFdKSksXG4gICAgICAgIHNpZ25hdHVyZTogYmFzZTY0VXJsVG9VaW50OEFycmF5KHBhcnRzWzJdKSxcbiAgICAgICAgcmF3OiB7XG4gICAgICAgICAgICBoZWFkZXI6IHBhcnRzWzBdLFxuICAgICAgICAgICAgcGF5bG9hZDogcGFydHNbMV0sXG4gICAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gZGF0YTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBudWxsIGFmdGVyIHNvbWUgdGltZS5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNsZWVwKHRpbWUpIHtcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKGFjY2VwdCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGFjY2VwdChudWxsKSwgdGltZSk7XG4gICAgfSk7XG59XG4vKipcbiAqIENvbnZlcnRzIHRoZSBwcm92aWRlZCBhc3luYyBmdW5jdGlvbiBpbnRvIGEgcmV0cnlhYmxlIGZ1bmN0aW9uLiBFYWNoIHJlc3VsdFxuICogb3IgdGhyb3duIGVycm9yIGlzIHNlbnQgdG8gdGhlIGlzUmV0cnlhYmxlIGZ1bmN0aW9uIHdoaWNoIHNob3VsZCByZXR1cm4gdHJ1ZVxuICogaWYgdGhlIGZ1bmN0aW9uIHNob3VsZCBydW4gYWdhaW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXRyeWFibGUoZm4sIGlzUmV0cnlhYmxlKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChhY2NlcHQsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4dHJhLXNlbWlcbiAgICAgICAgO1xuICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgYXR0ZW1wdCA9IDA7IGF0dGVtcHQgPCBJbmZpbml0eTsgYXR0ZW1wdCsrKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZm4oYXR0ZW1wdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNSZXRyeWFibGUoYXR0ZW1wdCwgbnVsbCwgcmVzdWx0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1JldHJ5YWJsZShhdHRlbXB0LCBlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9taXNlO1xufVxuZnVuY3Rpb24gZGVjMmhleChkZWMpIHtcbiAgICByZXR1cm4gKCcwJyArIGRlYy50b1N0cmluZygxNikpLnN1YnN0cigtMik7XG59XG4vLyBGdW5jdGlvbnMgYmVsb3cgdGFrZW4gZnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjMzMDk0MDkvY3JlYXRpbmctYS1jb2RlLXZlcmlmaWVyLWFuZC1jaGFsbGVuZ2UtZm9yLXBrY2UtYXV0aC1vbi1zcG90aWZ5LWFwaS1pbi1yZWFjdGpzXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVQS0NFVmVyaWZpZXIoKSB7XG4gICAgY29uc3QgdmVyaWZpZXJMZW5ndGggPSA1NjtcbiAgICBjb25zdCBhcnJheSA9IG5ldyBVaW50MzJBcnJheSh2ZXJpZmllckxlbmd0aCk7XG4gICAgaWYgKHR5cGVvZiBjcnlwdG8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnN0IGNoYXJTZXQgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODktLl9+JztcbiAgICAgICAgY29uc3QgY2hhclNldExlbiA9IGNoYXJTZXQubGVuZ3RoO1xuICAgICAgICBsZXQgdmVyaWZpZXIgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJpZmllckxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2ZXJpZmllciArPSBjaGFyU2V0LmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyU2V0TGVuKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZlcmlmaWVyO1xuICAgIH1cbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGFycmF5KTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcnJheSwgZGVjMmhleCkuam9pbignJyk7XG59XG5hc3luYyBmdW5jdGlvbiBzaGEyNTYocmFuZG9tU3RyaW5nKSB7XG4gICAgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgIGNvbnN0IGVuY29kZWREYXRhID0gZW5jb2Rlci5lbmNvZGUocmFuZG9tU3RyaW5nKTtcbiAgICBjb25zdCBoYXNoID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoJ1NIQS0yNTYnLCBlbmNvZGVkRGF0YSk7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShoYXNoKTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShieXRlcylcbiAgICAgICAgLm1hcCgoYykgPT4gU3RyaW5nLmZyb21DaGFyQ29kZShjKSlcbiAgICAgICAgLmpvaW4oJycpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlUEtDRUNoYWxsZW5nZSh2ZXJpZmllcikge1xuICAgIGNvbnN0IGhhc0NyeXB0b1N1cHBvcnQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2YgY3J5cHRvLnN1YnRsZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIFRleHRFbmNvZGVyICE9PSAndW5kZWZpbmVkJztcbiAgICBpZiAoIWhhc0NyeXB0b1N1cHBvcnQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXZWJDcnlwdG8gQVBJIGlzIG5vdCBzdXBwb3J0ZWQuIENvZGUgY2hhbGxlbmdlIG1ldGhvZCB3aWxsIGRlZmF1bHQgdG8gdXNlIHBsYWluIGluc3RlYWQgb2Ygc2hhMjU2LicpO1xuICAgICAgICByZXR1cm4gdmVyaWZpZXI7XG4gICAgfVxuICAgIGNvbnN0IGhhc2hlZCA9IGF3YWl0IHNoYTI1Nih2ZXJpZmllcik7XG4gICAgcmV0dXJuIGJ0b2EoaGFzaGVkKS5yZXBsYWNlKC9cXCsvZywgJy0nKS5yZXBsYWNlKC9cXC8vZywgJ18nKS5yZXBsYWNlKC89KyQvLCAnJyk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29kZUNoYWxsZW5nZUFuZE1ldGhvZChzdG9yYWdlLCBzdG9yYWdlS2V5LCBpc1Bhc3N3b3JkUmVjb3ZlcnkgPSBmYWxzZSkge1xuICAgIGNvbnN0IGNvZGVWZXJpZmllciA9IGdlbmVyYXRlUEtDRVZlcmlmaWVyKCk7XG4gICAgbGV0IHN0b3JlZENvZGVWZXJpZmllciA9IGNvZGVWZXJpZmllcjtcbiAgICBpZiAoaXNQYXNzd29yZFJlY292ZXJ5KSB7XG4gICAgICAgIHN0b3JlZENvZGVWZXJpZmllciArPSAnL1BBU1NXT1JEX1JFQ09WRVJZJztcbiAgICB9XG4gICAgYXdhaXQgc2V0SXRlbUFzeW5jKHN0b3JhZ2UsIGAke3N0b3JhZ2VLZXl9LWNvZGUtdmVyaWZpZXJgLCBzdG9yZWRDb2RlVmVyaWZpZXIpO1xuICAgIGNvbnN0IGNvZGVDaGFsbGVuZ2UgPSBhd2FpdCBnZW5lcmF0ZVBLQ0VDaGFsbGVuZ2UoY29kZVZlcmlmaWVyKTtcbiAgICBjb25zdCBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gY29kZVZlcmlmaWVyID09PSBjb2RlQ2hhbGxlbmdlID8gJ3BsYWluJyA6ICdzMjU2JztcbiAgICByZXR1cm4gW2NvZGVDaGFsbGVuZ2UsIGNvZGVDaGFsbGVuZ2VNZXRob2RdO1xufVxuLyoqIFBhcnNlcyB0aGUgQVBJIHZlcnNpb24gd2hpY2ggaXMgMllZWS1NTS1ERC4gKi9cbmNvbnN0IEFQSV9WRVJTSU9OX1JFR0VYID0gL14yWzAtOV17M30tKDBbMS05XXwxWzAtMl0pLSgwWzEtOV18MVswLTldfDJbMC05XXwzWzAtMV0pJC9pO1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUmVzcG9uc2VBUElWZXJzaW9uKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgYXBpVmVyc2lvbiA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KEFQSV9WRVJTSU9OX0hFQURFUl9OQU1FKTtcbiAgICBpZiAoIWFwaVZlcnNpb24pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICghYXBpVmVyc2lvbi5tYXRjaChBUElfVkVSU0lPTl9SRUdFWCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShgJHthcGlWZXJzaW9ufVQwMDowMDowMC4wWmApO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRXhwKGV4cCkge1xuICAgIGlmICghZXhwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBleHAgY2xhaW0nKTtcbiAgICB9XG4gICAgY29uc3QgdGltZU5vdyA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIGlmIChleHAgPD0gdGltZU5vdykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pXVCBoYXMgZXhwaXJlZCcpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGdvcml0aG0oYWxnKSB7XG4gICAgc3dpdGNoIChhbGcpIHtcbiAgICAgICAgY2FzZSAnUlMyNTYnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnUlNBU1NBLVBLQ1MxLXYxXzUnLFxuICAgICAgICAgICAgICAgIGhhc2g6IHsgbmFtZTogJ1NIQS0yNTYnIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlICdFUzI1Nic6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdFQ0RTQScsXG4gICAgICAgICAgICAgICAgbmFtZWRDdXJ2ZTogJ1AtMjU2JyxcbiAgICAgICAgICAgICAgICBoYXNoOiB7IG5hbWU6ICdTSEEtMjU2JyB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhbGcgY2xhaW0nKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oZWxwZXJzLmpzLm1hcCIsImltcG9ydCB7IHN1cHBvcnRzTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9oZWxwZXJzJztcbi8qKlxuICogUHJvdmlkZXMgc2FmZSBhY2Nlc3MgdG8gdGhlIGdsb2JhbFRoaXMubG9jYWxTdG9yYWdlIHByb3BlcnR5LlxuICovXG5leHBvcnQgY29uc3QgbG9jYWxTdG9yYWdlQWRhcHRlciA9IHtcbiAgICBnZXRJdGVtOiAoa2V5KSA9PiB7XG4gICAgICAgIGlmICghc3VwcG9ydHNMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdsb2JhbFRoaXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICB9LFxuICAgIHNldEl0ZW06IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICghc3VwcG9ydHNMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGdsb2JhbFRoaXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgfSxcbiAgICByZW1vdmVJdGVtOiAoa2V5KSA9PiB7XG4gICAgICAgIGlmICghc3VwcG9ydHNMb2NhbFN0b3JhZ2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGdsb2JhbFRoaXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICB9LFxufTtcbi8qKlxuICogUmV0dXJucyBhIGxvY2FsU3RvcmFnZS1saWtlIG9iamVjdCB0aGF0IHN0b3JlcyB0aGUga2V5LXZhbHVlIHBhaXJzIGluXG4gKiBtZW1vcnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZW1vcnlMb2NhbFN0b3JhZ2VBZGFwdGVyKHN0b3JlID0ge30pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJdGVtOiAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc3RvcmVba2V5XSB8fCBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBzZXRJdGVtOiAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgc3RvcmVba2V5XSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICByZW1vdmVJdGVtOiAoa2V5KSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgc3RvcmVba2V5XTtcbiAgICAgICAgfSxcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9jYWwtc3RvcmFnZS5qcy5tYXAiLCJpbXBvcnQgeyBzdXBwb3J0c0xvY2FsU3RvcmFnZSB9IGZyb20gJy4vaGVscGVycyc7XG4vKipcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IGludGVybmFscyA9IHtcbiAgICAvKipcbiAgICAgKiBAZXhwZXJpbWVudGFsXG4gICAgICovXG4gICAgZGVidWc6ICEhKGdsb2JhbFRoaXMgJiZcbiAgICAgICAgc3VwcG9ydHNMb2NhbFN0b3JhZ2UoKSAmJlxuICAgICAgICBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZSAmJlxuICAgICAgICBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdXBhYmFzZS5nb3RydWUtanMubG9ja3MuZGVidWcnKSA9PT0gJ3RydWUnKSxcbn07XG4vKipcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIGEgbG9jayBjYW5ub3QgYmUgYWNxdWlyZWQgYWZ0ZXIgc29tZSBhbW91bnQgb2YgdGltZS5cbiAqXG4gKiBVc2UgdGhlIHtAbGluayAjaXNBY3F1aXJlVGltZW91dH0gcHJvcGVydHkgaW5zdGVhZCBvZiBjaGVja2luZyB3aXRoIGBpbnN0YW5jZW9mYC5cbiAqL1xuZXhwb3J0IGNsYXNzIExvY2tBY3F1aXJlVGltZW91dEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuaXNBY3F1aXJlVGltZW91dCA9IHRydWU7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRvckxvY2tBY3F1aXJlVGltZW91dEVycm9yIGV4dGVuZHMgTG9ja0FjcXVpcmVUaW1lb3V0RXJyb3Ige1xufVxuZXhwb3J0IGNsYXNzIFByb2Nlc3NMb2NrQWNxdWlyZVRpbWVvdXRFcnJvciBleHRlbmRzIExvY2tBY3F1aXJlVGltZW91dEVycm9yIHtcbn1cbi8qKlxuICogSW1wbGVtZW50cyBhIGdsb2JhbCBleGNsdXNpdmUgbG9jayB1c2luZyB0aGUgTmF2aWdhdG9yIExvY2tNYW5hZ2VyIEFQSS4gSXRcbiAqIGlzIGF2YWlsYWJsZSBvbiBhbGwgYnJvd3NlcnMgcmVsZWFzZWQgYWZ0ZXIgMjAyMi0wMy0xNSB3aXRoIFNhZmFyaSBiZWluZyB0aGVcbiAqIGxhc3Qgb25lIHRvIHJlbGVhc2Ugc3VwcG9ydC4gSWYgdGhlIEFQSSBpcyBub3QgYXZhaWxhYmxlLCB0aGlzIGZ1bmN0aW9uIHdpbGxcbiAqIHRocm93LiBNYWtlIHN1cmUgeW91IGNoZWNrIGF2YWlsYWJsaWxpdHkgYmVmb3JlIGNvbmZpZ3VyaW5nIHtAbGlua1xuICogR29UcnVlQ2xpZW50fS5cbiAqXG4gKiBZb3UgY2FuIHR1cm4gb24gZGVidWdnaW5nIGJ5IHNldHRpbmcgdGhlIGBzdXBhYmFzZS5nb3RydWUtanMubG9ja3MuZGVidWdgXG4gKiBsb2NhbCBzdG9yYWdlIGl0ZW0gdG8gYHRydWVgLlxuICpcbiAqIEludGVybmFsczpcbiAqXG4gKiBTaW5jZSB0aGUgTG9ja01hbmFnZXIgQVBJIGRvZXMgbm90IHByZXNlcnZlIHN0YWNrIHRyYWNlcyBmb3IgdGhlIGFzeW5jXG4gKiBmdW5jdGlvbiBwYXNzZWQgaW4gdGhlIGByZXF1ZXN0YCBtZXRob2QsIGEgdHJpY2sgaXMgdXNlZCB3aGVyZSBhY3F1aXJpbmcgdGhlXG4gKiBsb2NrIHJlbGVhc2VzIGEgcHJldmlvdXNseSBzdGFydGVkIHByb21pc2UgdG8gcnVuIHRoZSBvcGVyYXRpb24gaW4gdGhlIGBmbmBcbiAqIGZ1bmN0aW9uLiBUaGUgbG9jayB3YWl0cyBmb3IgdGhhdCBwcm9taXNlIHRvIGZpbmlzaCAod2l0aCBvciB3aXRob3V0IGVycm9yKSxcbiAqIHdoaWxlIHRoZSBmdW5jdGlvbiB3aWxsIGZpbmFsbHkgd2FpdCBmb3IgdGhlIHJlc3VsdCBhbnl3YXkuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgbG9jayB0byBiZSBhY3F1aXJlZC5cbiAqIEBwYXJhbSBhY3F1aXJlVGltZW91dCBJZiBuZWdhdGl2ZSwgbm8gdGltZW91dC4gSWYgMCBhbiBlcnJvciBpcyB0aHJvd24gaWZcbiAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgbG9jayBjYW4ndCBiZSBhY3F1aXJlZCB3aXRob3V0IHdhaXRpbmcuIElmIHBvc2l0aXZlLCB0aGUgbG9jayBhY3F1aXJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgd2lsbCB0aW1lIG91dCBhZnRlciBzbyBtYW55IG1pbGxpc2Vjb25kcy4gQW4gZXJyb3IgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICBhIHRpbWVvdXQgaWYgaXQgaGFzIGBpc0FjcXVpcmVUaW1lb3V0YCBzZXQgdG8gdHJ1ZS5cbiAqIEBwYXJhbSBmbiBUaGUgb3BlcmF0aW9uIHRvIHJ1biBvbmNlIHRoZSBsb2NrIGlzIGFjcXVpcmVkLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbmF2aWdhdG9yTG9jayhuYW1lLCBhY3F1aXJlVGltZW91dCwgZm4pIHtcbiAgICBpZiAoaW50ZXJuYWxzLmRlYnVnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdAc3VwYWJhc2UvZ290cnVlLWpzOiBuYXZpZ2F0b3JMb2NrOiBhY3F1aXJlIGxvY2snLCBuYW1lLCBhY3F1aXJlVGltZW91dCk7XG4gICAgfVxuICAgIGNvbnN0IGFib3J0Q29udHJvbGxlciA9IG5ldyBnbG9iYWxUaGlzLkFib3J0Q29udHJvbGxlcigpO1xuICAgIGlmIChhY3F1aXJlVGltZW91dCA+IDApIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBhYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgICAgIGlmIChpbnRlcm5hbHMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQHN1cGFiYXNlL2dvdHJ1ZS1qczogbmF2aWdhdG9yTG9jayBhY3F1aXJlIHRpbWVkIG91dCcsIG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBhY3F1aXJlVGltZW91dCk7XG4gICAgfVxuICAgIC8vIE1ETiBhcnRpY2xlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTG9ja01hbmFnZXIvcmVxdWVzdFxuICAgIC8vIFdyYXBwaW5nIG5hdmlnYXRvci5sb2Nrcy5yZXF1ZXN0KCkgd2l0aCBhIHBsYWluIFByb21pc2UgaXMgZG9uZSBhcyBzb21lXG4gICAgLy8gbGlicmFyaWVzIGxpa2Ugem9uZS5qcyBwYXRjaCB0aGUgUHJvbWlzZSBvYmplY3QgdG8gdHJhY2sgdGhlIGV4ZWN1dGlvblxuICAgIC8vIGNvbnRleHQuIEhvd2V2ZXIsIGl0IGFwcGVhcnMgdGhhdCBtb3N0IGJyb3dzZXJzIHVzZSBhbiBpbnRlcm5hbCBwcm9taXNlXG4gICAgLy8gaW1wbGVtZW50YXRpb24gd2hlbiB1c2luZyB0aGUgbmF2aWdhdG9yLmxvY2tzLnJlcXVlc3QoKSBBUEkgY2F1c2luZyB0aGVtXG4gICAgLy8gdG8gbG9zZSBjb250ZXh0IGFuZCBlbWl0IGNvbmZ1c2luZyBsb2cgbWVzc2FnZXMgb3IgYnJlYWsgY2VydGFpbiBmZWF0dXJlcy5cbiAgICAvLyBUaGlzIHdyYXBwaW5nIGlzIGJlbGlldmVkIHRvIGhlbHAgem9uZS5qcyB0cmFjayB0aGUgZXhlY3V0aW9uIGNvbnRleHRcbiAgICAvLyBiZXR0ZXIuXG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gZ2xvYmFsVGhpcy5uYXZpZ2F0b3IubG9ja3MucmVxdWVzdChuYW1lLCBhY3F1aXJlVGltZW91dCA9PT0gMFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG1vZGU6ICdleGNsdXNpdmUnLFxuICAgICAgICAgICAgaWZBdmFpbGFibGU6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBtb2RlOiAnZXhjbHVzaXZlJyxcbiAgICAgICAgICAgIHNpZ25hbDogYWJvcnRDb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgfSwgYXN5bmMgKGxvY2spID0+IHtcbiAgICAgICAgaWYgKGxvY2spIHtcbiAgICAgICAgICAgIGlmIChpbnRlcm5hbHMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQHN1cGFiYXNlL2dvdHJ1ZS1qczogbmF2aWdhdG9yTG9jazogYWNxdWlyZWQnLCBuYW1lLCBsb2NrLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgZm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcm5hbHMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0BzdXBhYmFzZS9nb3RydWUtanM6IG5hdmlnYXRvckxvY2s6IHJlbGVhc2VkJywgbmFtZSwgbG9jay5uYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWNxdWlyZVRpbWVvdXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJuYWxzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdAc3VwYWJhc2UvZ290cnVlLWpzOiBuYXZpZ2F0b3JMb2NrOiBub3QgaW1tZWRpYXRlbHkgYXZhaWxhYmxlJywgbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOYXZpZ2F0b3JMb2NrQWNxdWlyZVRpbWVvdXRFcnJvcihgQWNxdWlyaW5nIGFuIGV4Y2x1c2l2ZSBOYXZpZ2F0b3IgTG9ja01hbmFnZXIgbG9jayBcIiR7bmFtZX1cIiBpbW1lZGlhdGVseSBmYWlsZWRgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcm5hbHMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdsb2JhbFRoaXMubmF2aWdhdG9yLmxvY2tzLnF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQHN1cGFiYXNlL2dvdHJ1ZS1qczogTmF2aWdhdG9yIExvY2tNYW5hZ2VyIHN0YXRlJywgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAnICAnKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQHN1cGFiYXNlL2dvdHJ1ZS1qczogRXJyb3Igd2hlbiBxdWVyeWluZyBOYXZpZ2F0b3IgTG9ja01hbmFnZXIgc3RhdGUnLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBCcm93c2VyIGlzIG5vdCBmb2xsb3dpbmcgdGhlIE5hdmlnYXRvciBMb2NrTWFuYWdlciBzcGVjLCBpdFxuICAgICAgICAgICAgICAgIC8vIHJldHVybmVkIGEgbnVsbCBsb2NrIHdoZW4gd2UgZGlkbid0IHVzZSBpZkF2YWlsYWJsZS4gU28gd2UgY2FuXG4gICAgICAgICAgICAgICAgLy8gcHJldGVuZCB0aGUgbG9jayBpcyBhY3F1aXJlZCBpbiB0aGUgbmFtZSBvZiBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAgICAgLy8gYW5kIHVzZXIgZXhwZXJpZW5jZSBhbmQganVzdCBydW4gdGhlIGZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQHN1cGFiYXNlL2dvdHJ1ZS1qczogTmF2aWdhdG9yIExvY2tNYW5hZ2VyIHJldHVybmVkIGEgbnVsbCBsb2NrIHdoZW4gdXNpbmcgI3JlcXVlc3Qgd2l0aG91dCBpZkF2YWlsYWJsZSBzZXQgdG8gdHJ1ZSwgaXQgYXBwZWFycyB0aGlzIGJyb3dzZXIgaXMgbm90IGZvbGxvd2luZyB0aGUgTG9ja01hbmFnZXIgc3BlYyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTG9ja01hbmFnZXIvcmVxdWVzdCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkpO1xufVxuY29uc3QgUFJPQ0VTU19MT0NLUyA9IHt9O1xuLyoqXG4gKiBJbXBsZW1lbnRzIGEgZ2xvYmFsIGV4Y2x1c2l2ZSBsb2NrIHRoYXQgd29ya3Mgb25seSBpbiB0aGUgY3VycmVudCBwcm9jZXNzLlxuICogVXNlZnVsIGZvciBlbnZpcm9ubWVudHMgbGlrZSBSZWFjdCBOYXRpdmUgb3Igb3RoZXIgbm9uLWJyb3dzZXJcbiAqIHNpbmdsZS1wcm9jZXNzIChpLmUuIG5vIGNvbmNlcHQgb2YgXCJ0YWJzXCIpIGVudmlyb25tZW50cy5cbiAqXG4gKiBVc2Uge0BsaW5rICNuYXZpZ2F0b3JMb2NrfSBpbiBicm93c2VyIGVudmlyb25tZW50cy5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBsb2NrIHRvIGJlIGFjcXVpcmVkLlxuICogQHBhcmFtIGFjcXVpcmVUaW1lb3V0IElmIG5lZ2F0aXZlLCBubyB0aW1lb3V0LiBJZiAwIGFuIGVycm9yIGlzIHRocm93biBpZlxuICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBsb2NrIGNhbid0IGJlIGFjcXVpcmVkIHdpdGhvdXQgd2FpdGluZy4gSWYgcG9zaXRpdmUsIHRoZSBsb2NrIGFjcXVpcmVcbiAqICAgICAgICAgICAgICAgICAgICAgICB3aWxsIHRpbWUgb3V0IGFmdGVyIHNvIG1hbnkgbWlsbGlzZWNvbmRzLiBBbiBlcnJvciBpc1xuICogICAgICAgICAgICAgICAgICAgICAgIGEgdGltZW91dCBpZiBpdCBoYXMgYGlzQWNxdWlyZVRpbWVvdXRgIHNldCB0byB0cnVlLlxuICogQHBhcmFtIGZuIFRoZSBvcGVyYXRpb24gdG8gcnVuIG9uY2UgdGhlIGxvY2sgaXMgYWNxdWlyZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzTG9jayhuYW1lLCBhY3F1aXJlVGltZW91dCwgZm4pIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgcHJldmlvdXNPcGVyYXRpb24gPSAoX2EgPSBQUk9DRVNTX0xPQ0tTW25hbWVdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBjb25zdCBjdXJyZW50T3BlcmF0aW9uID0gUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgcHJldmlvdXNPcGVyYXRpb24uY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgLy8gaWdub3JlIGVycm9yIG9mIHByZXZpb3VzIG9wZXJhdGlvbiB0aGF0IHdlJ3JlIHdhaXRpbmcgdG8gZmluaXNoXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSksXG4gICAgICAgIGFjcXVpcmVUaW1lb3V0ID49IDBcbiAgICAgICAgICAgID8gbmV3IFByb21pc2UoKF8sIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IFByb2Nlc3NMb2NrQWNxdWlyZVRpbWVvdXRFcnJvcihgQWNxdXJpbmcgcHJvY2VzcyBsb2NrIHdpdGggbmFtZSBcIiR7bmFtZX1cIiB0aW1lZCBvdXRgKSk7XG4gICAgICAgICAgICAgICAgfSwgYWNxdWlyZVRpbWVvdXQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDogbnVsbCxcbiAgICBdLmZpbHRlcigoeCkgPT4geCkpXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBpZiAoZSAmJiBlLmlzQWNxdWlyZVRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSlcbiAgICAgICAgLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyBwcmV2aW91cyBvcGVyYXRpb25zIGZpbmlzaGVkIGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmFjZSBvbiB0aGUgYWNxdWlyZVxuICAgICAgICAvLyB0aW1lb3V0LCBzbyB0aGUgY3VycmVudCBvcGVyYXRpb24gY2FuIGZpbmFsbHkgc3RhcnRcbiAgICAgICAgcmV0dXJuIGF3YWl0IGZuKCk7XG4gICAgfSk7XG4gICAgUFJPQ0VTU19MT0NLU1tuYW1lXSA9IGN1cnJlbnRPcGVyYXRpb24uY2F0Y2goYXN5bmMgKGUpID0+IHtcbiAgICAgICAgaWYgKGUgJiYgZS5pc0FjcXVpcmVUaW1lb3V0KSB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgY3VycmVudCBvcGVyYXRpb24gdGltZWQgb3V0LCBpdCBkb2Vzbid0IG1lYW4gdGhhdCB0aGUgcHJldmlvdXNcbiAgICAgICAgICAgIC8vIG9wZXJhdGlvbiBmaW5pc2hlZCwgc28gd2UgbmVlZCBjb250bnVlIHdhaXRpbmcgZm9yIGl0IHRvIGZpbmlzaFxuICAgICAgICAgICAgYXdhaXQgcHJldmlvdXNPcGVyYXRpb247XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgIH0pO1xuICAgIC8vIGZpbmFsbHkgd2FpdCBmb3IgdGhlIGN1cnJlbnQgb3BlcmF0aW9uIHRvIGZpbmlzaCBzdWNjZXNzZnVsbHksIHdpdGggYW5cbiAgICAvLyBlcnJvciBvciB3aXRoIGFuIGFjcXVpcmUgdGltZW91dCBlcnJvclxuICAgIHJldHVybiBhd2FpdCBjdXJyZW50T3BlcmF0aW9uO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9ja3MuanMubWFwIiwiLyoqXG4gKiBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvZ2xvYmFsdGhpc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcG9seWZpbGxHbG9iYWxUaGlzKCkge1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpXG4gICAgICAgIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgJ19fbWFnaWNfXycsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgJ0FsbG93IGFjY2VzcyB0byBtYWdpYydcbiAgICAgICAgX19tYWdpY19fLmdsb2JhbFRoaXMgPSBfX21hZ2ljX187XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgJ0FsbG93IGFjY2VzcyB0byBtYWdpYydcbiAgICAgICAgZGVsZXRlIE9iamVjdC5wcm90b3R5cGUuX19tYWdpY19fO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yICdBbGxvdyBhY2Nlc3MgdG8gZ2xvYmFscydcbiAgICAgICAgICAgIHNlbGYuZ2xvYmFsVGhpcyA9IHNlbGY7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb2x5ZmlsbHMuanMubWFwIiwiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwiZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMi42OS4xJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlcnNpb24uanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyByZXNvbHZlRmV0Y2ggfSBmcm9tICcuL2hlbHBlcic7XG5pbXBvcnQgeyBGdW5jdGlvbnNGZXRjaEVycm9yLCBGdW5jdGlvbnNIdHRwRXJyb3IsIEZ1bmN0aW9uc1JlbGF5RXJyb3IsIEZ1bmN0aW9uUmVnaW9uLCB9IGZyb20gJy4vdHlwZXMnO1xuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uc0NsaWVudCB7XG4gICAgY29uc3RydWN0b3IodXJsLCB7IGhlYWRlcnMgPSB7fSwgY3VzdG9tRmV0Y2gsIHJlZ2lvbiA9IEZ1bmN0aW9uUmVnaW9uLkFueSwgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICB0aGlzLnJlZ2lvbiA9IHJlZ2lvbjtcbiAgICAgICAgdGhpcy5mZXRjaCA9IHJlc29sdmVGZXRjaChjdXN0b21GZXRjaCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGF1dGhvcml6YXRpb24gaGVhZGVyXG4gICAgICogQHBhcmFtIHRva2VuIC0gdGhlIG5ldyBqd3QgdG9rZW4gc2VudCBpbiB0aGUgYXV0aG9yaXNhdGlvbiBoZWFkZXJcbiAgICAgKi9cbiAgICBzZXRBdXRoKHRva2VuKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludm9rZXMgYSBmdW5jdGlvblxuICAgICAqIEBwYXJhbSBmdW5jdGlvbk5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgRnVuY3Rpb24gdG8gaW52b2tlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgaW52b2tpbmcgdGhlIEZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGludm9rZShmdW5jdGlvbk5hbWUsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgaGVhZGVycywgbWV0aG9kLCBib2R5OiBmdW5jdGlvbkFyZ3MgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgbGV0IF9oZWFkZXJzID0ge307XG4gICAgICAgICAgICAgICAgbGV0IHsgcmVnaW9uIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgIGlmICghcmVnaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbiA9IHRoaXMucmVnaW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVnaW9uICYmIHJlZ2lvbiAhPT0gJ2FueScpIHtcbiAgICAgICAgICAgICAgICAgICAgX2hlYWRlcnNbJ3gtcmVnaW9uJ10gPSByZWdpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBib2R5O1xuICAgICAgICAgICAgICAgIGlmIChmdW5jdGlvbkFyZ3MgJiZcbiAgICAgICAgICAgICAgICAgICAgKChoZWFkZXJzICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpKSB8fCAhaGVhZGVycykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZnVuY3Rpb25BcmdzIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uQXJncyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHdvcmsgZm9yIEZpbGUgYXMgRmlsZSBpbmhlcml0cyBCbG9iXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbHNvIHdvcmtzIGZvciBBcnJheUJ1ZmZlciBhcyBpdCBpcyB0aGUgc2FtZSB1bmRlcmx5aW5nIHN0cnVjdHVyZSBhcyBhIEJsb2JcbiAgICAgICAgICAgICAgICAgICAgICAgIF9oZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keSA9IGZ1bmN0aW9uQXJncztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZnVuY3Rpb25BcmdzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGxhaW4gc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBfaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAndGV4dC9wbGFpbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gZnVuY3Rpb25BcmdzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgZnVuY3Rpb25BcmdzIGluc3RhbmNlb2YgRm9ybURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IHNldCBjb250ZW50LXR5cGUgaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVxdWVzdCB3aWxsIGF1dG9tYXRpY2FsbHkgYWRkIHRoZSByaWdodCBib3VuZGFyeSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keSA9IGZ1bmN0aW9uQXJncztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQsIGFzc3VtZSB0aGlzIGlzIEpTT05cbiAgICAgICAgICAgICAgICAgICAgICAgIF9oZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShmdW5jdGlvbkFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgdGhpcy5mZXRjaChgJHt0aGlzLnVybH0vJHtmdW5jdGlvbk5hbWV9YCwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCB8fCAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIC8vIGhlYWRlcnMgcHJpb3JpdHkgaXMgKGhpZ2ggdG8gbG93KTpcbiAgICAgICAgICAgICAgICAgICAgLy8gMS4gaW52b2tlLWxldmVsIGhlYWRlcnNcbiAgICAgICAgICAgICAgICAgICAgLy8gMi4gY2xpZW50LWxldmVsIGhlYWRlcnNcbiAgICAgICAgICAgICAgICAgICAgLy8gMy4gZGVmYXVsdCBDb250ZW50LVR5cGUgaGVhZGVyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBfaGVhZGVycyksIHRoaXMuaGVhZGVycyksIGhlYWRlcnMpLFxuICAgICAgICAgICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChmZXRjaEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBGdW5jdGlvbnNGZXRjaEVycm9yKGZldGNoRXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzUmVsYXlFcnJvciA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCd4LXJlbGF5LWVycm9yJyk7XG4gICAgICAgICAgICAgICAgaWYgKGlzUmVsYXlFcnJvciAmJiBpc1JlbGF5RXJyb3IgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRnVuY3Rpb25zUmVsYXlFcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEZ1bmN0aW9uc0h0dHBFcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZVR5cGUgPSAoKF9hID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAndGV4dC9wbGFpbicpLnNwbGl0KCc7JylbMF0udHJpbSgpO1xuICAgICAgICAgICAgICAgIGxldCBkYXRhO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVR5cGUgPT09ICdhcHBsaWNhdGlvbi9qc29uJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZVR5cGUgPT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB5aWVsZCByZXNwb25zZS5ibG9iKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQvZXZlbnQtc3RyZWFtJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ211bHRpcGFydC9mb3JtLWRhdGEnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB5aWVsZCByZXNwb25zZS5mb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCB0byB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB5aWVsZCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1GdW5jdGlvbnNDbGllbnQuanMubWFwIiwiZXhwb3J0IGNvbnN0IHJlc29sdmVGZXRjaCA9IChjdXN0b21GZXRjaCkgPT4ge1xuICAgIGxldCBfZmV0Y2g7XG4gICAgaWYgKGN1c3RvbUZldGNoKSB7XG4gICAgICAgIF9mZXRjaCA9IGN1c3RvbUZldGNoO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZmV0Y2ggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIF9mZXRjaCA9ICguLi5hcmdzKSA9PiBpbXBvcnQoJ0BzdXBhYmFzZS9ub2RlLWZldGNoJykudGhlbigoeyBkZWZhdWx0OiBmZXRjaCB9KSA9PiBmZXRjaCguLi5hcmdzKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBfZmV0Y2goLi4uYXJncyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVyLmpzLm1hcCIsImV4cG9ydCBjbGFzcyBGdW5jdGlvbnNFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBuYW1lID0gJ0Z1bmN0aW9uc0Vycm9yJywgY29udGV4dCkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgRnVuY3Rpb25zRmV0Y2hFcnJvciBleHRlbmRzIEZ1bmN0aW9uc0Vycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKCdGYWlsZWQgdG8gc2VuZCBhIHJlcXVlc3QgdG8gdGhlIEVkZ2UgRnVuY3Rpb24nLCAnRnVuY3Rpb25zRmV0Y2hFcnJvcicsIGNvbnRleHQpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbnNSZWxheUVycm9yIGV4dGVuZHMgRnVuY3Rpb25zRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoJ1JlbGF5IEVycm9yIGludm9raW5nIHRoZSBFZGdlIEZ1bmN0aW9uJywgJ0Z1bmN0aW9uc1JlbGF5RXJyb3InLCBjb250ZXh0KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgRnVuY3Rpb25zSHR0cEVycm9yIGV4dGVuZHMgRnVuY3Rpb25zRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoJ0VkZ2UgRnVuY3Rpb24gcmV0dXJuZWQgYSBub24tMnh4IHN0YXR1cyBjb2RlJywgJ0Z1bmN0aW9uc0h0dHBFcnJvcicsIGNvbnRleHQpO1xuICAgIH1cbn1cbi8vIERlZmluZSB0aGUgZW51bSBmb3IgdGhlICdyZWdpb24nIHByb3BlcnR5XG5leHBvcnQgdmFyIEZ1bmN0aW9uUmVnaW9uO1xuKGZ1bmN0aW9uIChGdW5jdGlvblJlZ2lvbikge1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiQW55XCJdID0gXCJhbnlcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkFwTm9ydGhlYXN0MVwiXSA9IFwiYXAtbm9ydGhlYXN0LTFcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkFwTm9ydGhlYXN0MlwiXSA9IFwiYXAtbm9ydGhlYXN0LTJcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkFwU291dGgxXCJdID0gXCJhcC1zb3V0aC0xXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJBcFNvdXRoZWFzdDFcIl0gPSBcImFwLXNvdXRoZWFzdC0xXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJBcFNvdXRoZWFzdDJcIl0gPSBcImFwLXNvdXRoZWFzdC0yXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJDYUNlbnRyYWwxXCJdID0gXCJjYS1jZW50cmFsLTFcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkV1Q2VudHJhbDFcIl0gPSBcImV1LWNlbnRyYWwtMVwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiRXVXZXN0MVwiXSA9IFwiZXUtd2VzdC0xXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJFdVdlc3QyXCJdID0gXCJldS13ZXN0LTJcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkV1V2VzdDNcIl0gPSBcImV1LXdlc3QtM1wiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiU2FFYXN0MVwiXSA9IFwic2EtZWFzdC0xXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJVc0Vhc3QxXCJdID0gXCJ1cy1lYXN0LTFcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIlVzV2VzdDFcIl0gPSBcInVzLXdlc3QtMVwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiVXNXZXN0MlwiXSA9IFwidXMtd2VzdC0yXCI7XG59KShGdW5jdGlvblJlZ2lvbiB8fCAoRnVuY3Rpb25SZWdpb24gPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHJlZjogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtZ2xvYmFsXG52YXIgZ2V0R2xvYmFsID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gdGhlIG9ubHkgcmVsaWFibGUgbWVhbnMgdG8gZ2V0IHRoZSBnbG9iYWwgb2JqZWN0IGlzXG4gICAgLy8gYEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKClgXG4gICAgLy8gSG93ZXZlciwgdGhpcyBjYXVzZXMgQ1NQIHZpb2xhdGlvbnMgaW4gQ2hyb21lIGFwcHMuXG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gc2VsZjsgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gd2luZG93OyB9XG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBnbG9iYWw7IH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuYWJsZSB0byBsb2NhdGUgZ2xvYmFsIG9iamVjdCcpO1xufVxuXG52YXIgZ2xvYmFsT2JqZWN0ID0gZ2V0R2xvYmFsKCk7XG5cbmV4cG9ydCBjb25zdCBmZXRjaCA9IGdsb2JhbE9iamVjdC5mZXRjaDtcblxuZXhwb3J0IGRlZmF1bHQgZ2xvYmFsT2JqZWN0LmZldGNoLmJpbmQoZ2xvYmFsT2JqZWN0KTtcblxuZXhwb3J0IGNvbnN0IEhlYWRlcnMgPSBnbG9iYWxPYmplY3QuSGVhZGVycztcbmV4cG9ydCBjb25zdCBSZXF1ZXN0ID0gZ2xvYmFsT2JqZWN0LlJlcXVlc3Q7XG5leHBvcnQgY29uc3QgUmVzcG9uc2UgPSBnbG9iYWxPYmplY3QuUmVzcG9uc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIEB0cy1pZ25vcmVcbmNvbnN0IG5vZGVfZmV0Y2hfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiQHN1cGFiYXNlL25vZGUtZmV0Y2hcIikpO1xuY29uc3QgUG9zdGdyZXN0RXJyb3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RFcnJvclwiKSk7XG5jbGFzcyBQb3N0Z3Jlc3RCdWlsZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihidWlsZGVyKSB7XG4gICAgICAgIHRoaXMuc2hvdWxkVGhyb3dPbkVycm9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWV0aG9kID0gYnVpbGRlci5tZXRob2Q7XG4gICAgICAgIHRoaXMudXJsID0gYnVpbGRlci51cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGJ1aWxkZXIuaGVhZGVycztcbiAgICAgICAgdGhpcy5zY2hlbWEgPSBidWlsZGVyLnNjaGVtYTtcbiAgICAgICAgdGhpcy5ib2R5ID0gYnVpbGRlci5ib2R5O1xuICAgICAgICB0aGlzLnNob3VsZFRocm93T25FcnJvciA9IGJ1aWxkZXIuc2hvdWxkVGhyb3dPbkVycm9yO1xuICAgICAgICB0aGlzLnNpZ25hbCA9IGJ1aWxkZXIuc2lnbmFsO1xuICAgICAgICB0aGlzLmlzTWF5YmVTaW5nbGUgPSBidWlsZGVyLmlzTWF5YmVTaW5nbGU7XG4gICAgICAgIGlmIChidWlsZGVyLmZldGNoKSB7XG4gICAgICAgICAgICB0aGlzLmZldGNoID0gYnVpbGRlci5mZXRjaDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgZmV0Y2ggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmZldGNoID0gbm9kZV9mZXRjaF8xLmRlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZldGNoID0gZmV0Y2g7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgdGhlcmUncyBhbiBlcnJvciB3aXRoIHRoZSBxdWVyeSwgdGhyb3dPbkVycm9yIHdpbGwgcmVqZWN0IHRoZSBwcm9taXNlIGJ5XG4gICAgICogdGhyb3dpbmcgdGhlIGVycm9yIGluc3RlYWQgb2YgcmV0dXJuaW5nIGl0IGFzIHBhcnQgb2YgYSBzdWNjZXNzZnVsIHJlc3BvbnNlLlxuICAgICAqXG4gICAgICoge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBhYmFzZS9zdXBhYmFzZS1qcy9pc3N1ZXMvOTJ9XG4gICAgICovXG4gICAgdGhyb3dPbkVycm9yKCkge1xuICAgICAgICB0aGlzLnNob3VsZFRocm93T25FcnJvciA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgYW4gSFRUUCBoZWFkZXIgZm9yIHRoZSByZXF1ZXN0LlxuICAgICAqL1xuICAgIHNldEhlYWRlcihuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhlYWRlcnMpO1xuICAgICAgICB0aGlzLmhlYWRlcnNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgLy8gaHR0cHM6Ly9wb3N0Z3Jlc3Qub3JnL2VuL3N0YWJsZS9hcGkuaHRtbCNzd2l0Y2hpbmctc2NoZW1hc1xuICAgICAgICBpZiAodGhpcy5zY2hlbWEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gc2tpcFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKFsnR0VUJywgJ0hFQUQnXS5pbmNsdWRlcyh0aGlzLm1ldGhvZCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1snQWNjZXB0LVByb2ZpbGUnXSA9IHRoaXMuc2NoZW1hO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydDb250ZW50LVByb2ZpbGUnXSA9IHRoaXMuc2NoZW1hO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1ldGhvZCAhPT0gJ0dFVCcgJiYgdGhpcy5tZXRob2QgIT09ICdIRUFEJykge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgfVxuICAgICAgICAvLyBOT1RFOiBJbnZva2Ugdy9vIGB0aGlzYCB0byBhdm9pZCBpbGxlZ2FsIGludm9jYXRpb24gZXJyb3IuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBhYmFzZS9wb3N0Z3Jlc3QtanMvcHVsbC8yNDdcbiAgICAgICAgY29uc3QgX2ZldGNoID0gdGhpcy5mZXRjaDtcbiAgICAgICAgbGV0IHJlcyA9IF9mZXRjaCh0aGlzLnVybC50b1N0cmluZygpLCB7XG4gICAgICAgICAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodGhpcy5ib2R5KSxcbiAgICAgICAgICAgIHNpZ25hbDogdGhpcy5zaWduYWwsXG4gICAgICAgIH0pLnRoZW4oYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICBsZXQgZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBudWxsO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSByZXMuc3RhdHVzO1xuICAgICAgICAgICAgbGV0IHN0YXR1c1RleHQgPSByZXMuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZXRob2QgIT09ICdIRUFEJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmVmZXI6IHJldHVybj1taW5pbWFsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5oZWFkZXJzWydBY2NlcHQnXSA9PT0gJ3RleHQvY3N2Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5oZWFkZXJzWydBY2NlcHQnXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQnXS5pbmNsdWRlcygnYXBwbGljYXRpb24vdm5kLnBncnN0LnBsYW4rdGV4dCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gYm9keTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50SGVhZGVyID0gKF9hID0gdGhpcy5oZWFkZXJzWydQcmVmZXInXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hdGNoKC9jb3VudD0oZXhhY3R8cGxhbm5lZHxlc3RpbWF0ZWQpLyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudFJhbmdlID0gKF9iID0gcmVzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXJhbmdlJykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudEhlYWRlciAmJiBjb250ZW50UmFuZ2UgJiYgY29udGVudFJhbmdlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSBwYXJzZUludChjb250ZW50UmFuZ2VbMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBUZW1wb3JhcnkgcGFydGlhbCBmaXggZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBhYmFzZS9wb3N0Z3Jlc3QtanMvaXNzdWVzLzM2MVxuICAgICAgICAgICAgICAgIC8vIElzc3VlIHBlcnNpc3RzIGUuZy4gZm9yIGAuaW5zZXJ0KFsuLi5dKS5zZWxlY3QoKS5tYXliZVNpbmdsZSgpYFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTWF5YmVTaW5nbGUgJiYgdGhpcy5tZXRob2QgPT09ICdHRVQnICYmIEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL1Bvc3RnUkVTVC9wb3N0Z3Jlc3QvYmxvYi9hODY3ZDc5YzQyNDE5YWYxNmMxOGMzZmIwMTllYmE4ZGY5OTI2MjZmL3NyYy9Qb3N0Z1JFU1QvRXJyb3IuaHMjTDU1M1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6ICdQR1JTVDExNicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogYFJlc3VsdHMgY29udGFpbiAke2RhdGEubGVuZ3RofSByb3dzLCBhcHBsaWNhdGlvbi92bmQucGdyc3Qub2JqZWN0K2pzb24gcmVxdWlyZXMgMSByb3dgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ0pTT04gb2JqZWN0IHJlcXVlc3RlZCwgbXVsdGlwbGUgKG9yIG5vKSByb3dzIHJldHVybmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDQwNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSAnTm90IEFjY2VwdGFibGUnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gZGF0YVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcy50ZXh0KCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBKU09OLnBhcnNlKGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vc3VwYWJhc2UvcG9zdGdyZXN0LWpzL2lzc3Vlcy8yOTVcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZXJyb3IpICYmIHJlcy5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMjAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9ICdPSyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKF9kKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBhYmFzZS9wb3N0Z3Jlc3QtanMvaXNzdWVzLzI5NVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gNDA0ICYmIGJvZHkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAyMDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gJ05vIENvbnRlbnQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYm9keSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yICYmIHRoaXMuaXNNYXliZVNpbmdsZSAmJiAoKF9jID0gZXJyb3IgPT09IG51bGwgfHwgZXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGVycm9yLmRldGFpbHMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5pbmNsdWRlcygnMCByb3dzJykpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMjAwO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gJ09LJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yICYmIHRoaXMuc2hvdWxkVGhyb3dPbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQb3N0Z3Jlc3RFcnJvcl8xLmRlZmF1bHQoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBvc3RncmVzdFJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgY291bnQsXG4gICAgICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RncmVzdFJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0aGlzLnNob3VsZFRocm93T25FcnJvcikge1xuICAgICAgICAgICAgcmVzID0gcmVzLmNhdGNoKChmZXRjaEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgJHsoX2EgPSBmZXRjaEVycm9yID09PSBudWxsIHx8IGZldGNoRXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZldGNoRXJyb3IubmFtZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ0ZldGNoRXJyb3InfTogJHtmZXRjaEVycm9yID09PSBudWxsIHx8IGZldGNoRXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZldGNoRXJyb3IubWVzc2FnZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsczogYCR7KF9iID0gZmV0Y2hFcnJvciA9PT0gbnVsbCB8fCBmZXRjaEVycm9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmZXRjaEVycm9yLnN0YWNrKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJ31gLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGludDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiBgJHsoX2MgPSBmZXRjaEVycm9yID09PSBudWxsIHx8IGZldGNoRXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZldGNoRXJyb3IuY29kZSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogJyd9YCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogMCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogJycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLnRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgdHlwZSBvZiB0aGUgcmV0dXJuZWQgYGRhdGFgLlxuICAgICAqXG4gICAgICogQHR5cGVQYXJhbSBOZXdSZXN1bHQgLSBUaGUgbmV3IHJlc3VsdCB0eXBlIHRvIG92ZXJyaWRlIHdpdGhcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2Ugb3ZlcnJpZGVUeXBlczx5b3VyVHlwZSwgeyBtZXJnZTogZmFsc2UgfT4oKSBtZXRob2QgYXQgdGhlIGVuZCBvZiB5b3VyIGNhbGwgY2hhaW4gaW5zdGVhZFxuICAgICAqL1xuICAgIHJldHVybnMoKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgdHlwZSBvZiB0aGUgcmV0dXJuZWQgYGRhdGFgIGZpZWxkIGluIHRoZSByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIEB0eXBlUGFyYW0gTmV3UmVzdWx0IC0gVGhlIG5ldyB0eXBlIHRvIGNhc3QgdGhlIHJlc3BvbnNlIGRhdGEgdG9cbiAgICAgKiBAdHlwZVBhcmFtIE9wdGlvbnMgLSBPcHRpb25hbCB0eXBlIGNvbmZpZ3VyYXRpb24gKGRlZmF1bHRzIHRvIHsgbWVyZ2U6IHRydWUgfSlcbiAgICAgKiBAdHlwZVBhcmFtIE9wdGlvbnMubWVyZ2UgLSBXaGVuIHRydWUsIG1lcmdlcyB0aGUgbmV3IHR5cGUgd2l0aCBleGlzdGluZyByZXR1cm4gdHlwZS4gV2hlbiBmYWxzZSwgcmVwbGFjZXMgdGhlIGV4aXN0aW5nIHR5cGVzIGVudGlyZWx5IChkZWZhdWx0cyB0byB0cnVlKVxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIC8vIE1lcmdlIHdpdGggZXhpc3RpbmcgdHlwZXMgKGRlZmF1bHQgYmVoYXZpb3IpXG4gICAgICogY29uc3QgcXVlcnkgPSBzdXBhYmFzZVxuICAgICAqICAgLmZyb20oJ3VzZXJzJylcbiAgICAgKiAgIC5zZWxlY3QoKVxuICAgICAqICAgLm92ZXJyaWRlVHlwZXM8eyBjdXN0b21fZmllbGQ6IHN0cmluZyB9PigpXG4gICAgICpcbiAgICAgKiAvLyBSZXBsYWNlIGV4aXN0aW5nIHR5cGVzIGNvbXBsZXRlbHlcbiAgICAgKiBjb25zdCByZXBsYWNlUXVlcnkgPSBzdXBhYmFzZVxuICAgICAqICAgLmZyb20oJ3VzZXJzJylcbiAgICAgKiAgIC5zZWxlY3QoKVxuICAgICAqICAgLm92ZXJyaWRlVHlwZXM8eyBpZDogbnVtYmVyOyBuYW1lOiBzdHJpbmcgfSwgeyBtZXJnZTogZmFsc2UgfT4oKVxuICAgICAqIGBgYFxuICAgICAqIEByZXR1cm5zIEEgUG9zdGdyZXN0QnVpbGRlciBpbnN0YW5jZSB3aXRoIHRoZSBuZXcgdHlwZVxuICAgICAqL1xuICAgIG92ZXJyaWRlVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFBvc3RncmVzdEJ1aWxkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qb3N0Z3Jlc3RCdWlsZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUG9zdGdyZXN0UXVlcnlCdWlsZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0UXVlcnlCdWlsZGVyXCIpKTtcbmNvbnN0IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXCIpKTtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xuLyoqXG4gKiBQb3N0Z1JFU1QgY2xpZW50LlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0YWJhc2UgLSBUeXBlcyBmb3IgdGhlIHNjaGVtYSBmcm9tIHRoZSBbdHlwZVxuICogZ2VuZXJhdG9yXShodHRwczovL3N1cGFiYXNlLmNvbS9kb2NzL3JlZmVyZW5jZS9qYXZhc2NyaXB0L25leHQvdHlwZXNjcmlwdC1zdXBwb3J0KVxuICpcbiAqIEB0eXBlUGFyYW0gU2NoZW1hTmFtZSAtIFBvc3RncmVzIHNjaGVtYSB0byBzd2l0Y2ggdG8uIE11c3QgYmUgYSBzdHJpbmdcbiAqIGxpdGVyYWwsIHRoZSBzYW1lIG9uZSBwYXNzZWQgdG8gdGhlIGNvbnN0cnVjdG9yLiBJZiB0aGUgc2NoZW1hIGlzIG5vdFxuICogYFwicHVibGljXCJgLCB0aGlzIG11c3QgYmUgc3VwcGxpZWQgbWFudWFsbHkuXG4gKi9cbmNsYXNzIFBvc3RncmVzdENsaWVudCB7XG4gICAgLy8gVE9ETzogQWRkIGJhY2sgc2hvdWxkVGhyb3dPbkVycm9yIG9uY2Ugd2UgZmlndXJlIG91dCB0aGUgdHlwaW5nc1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBQb3N0Z1JFU1QgY2xpZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHVybCAtIFVSTCBvZiB0aGUgUG9zdGdSRVNUIGVuZHBvaW50XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaGVhZGVycyAtIEN1c3RvbSBoZWFkZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMuc2NoZW1hIC0gUG9zdGdyZXMgc2NoZW1hIHRvIHN3aXRjaCB0b1xuICAgICAqIEBwYXJhbSBvcHRpb25zLmZldGNoIC0gQ3VzdG9tIGZldGNoXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodXJsLCB7IGhlYWRlcnMgPSB7fSwgc2NoZW1hLCBmZXRjaCwgfSA9IHt9KSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNvbnN0YW50c18xLkRFRkFVTFRfSEVBREVSUyksIGhlYWRlcnMpO1xuICAgICAgICB0aGlzLnNjaGVtYU5hbWUgPSBzY2hlbWE7XG4gICAgICAgIHRoaXMuZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHF1ZXJ5IG9uIGEgdGFibGUgb3IgYSB2aWV3LlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlbGF0aW9uIC0gVGhlIHRhYmxlIG9yIHZpZXcgbmFtZSB0byBxdWVyeVxuICAgICAqL1xuICAgIGZyb20ocmVsYXRpb24pIHtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChgJHt0aGlzLnVybH0vJHtyZWxhdGlvbn1gKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXJfMS5kZWZhdWx0KHVybCwge1xuICAgICAgICAgICAgaGVhZGVyczogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oZWFkZXJzKSxcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWFOYW1lLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgYSBzY2hlbWEgdG8gcXVlcnkgb3IgcGVyZm9ybSBhbiBmdW5jdGlvbiAocnBjKSBjYWxsLlxuICAgICAqXG4gICAgICogVGhlIHNjaGVtYSBuZWVkcyB0byBiZSBvbiB0aGUgbGlzdCBvZiBleHBvc2VkIHNjaGVtYXMgaW5zaWRlIFN1cGFiYXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSAtIFRoZSBzY2hlbWEgdG8gcXVlcnlcbiAgICAgKi9cbiAgICBzY2hlbWEoc2NoZW1hKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9zdGdyZXN0Q2xpZW50KHRoaXMudXJsLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWEsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBmdW5jdGlvbiBjYWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZuIC0gVGhlIGZ1bmN0aW9uIG5hbWUgdG8gY2FsbFxuICAgICAqIEBwYXJhbSBhcmdzIC0gVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBmdW5jdGlvbiBjYWxsXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaGVhZCAtIFdoZW4gc2V0IHRvIGB0cnVlYCwgYGRhdGFgIHdpbGwgbm90IGJlIHJldHVybmVkLlxuICAgICAqIFVzZWZ1bCBpZiB5b3Ugb25seSBuZWVkIHRoZSBjb3VudC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5nZXQgLSBXaGVuIHNldCB0byBgdHJ1ZWAsIHRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoXG4gICAgICogcmVhZC1vbmx5IGFjY2VzcyBtb2RlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvdW50IC0gQ291bnQgYWxnb3JpdGhtIHRvIHVzZSB0byBjb3VudCByb3dzIHJldHVybmVkIGJ5IHRoZVxuICAgICAqIGZ1bmN0aW9uLiBPbmx5IGFwcGxpY2FibGUgZm9yIFtzZXQtcmV0dXJuaW5nXG4gICAgICogZnVuY3Rpb25zXShodHRwczovL3d3dy5wb3N0Z3Jlc3FsLm9yZy9kb2NzL2N1cnJlbnQvZnVuY3Rpb25zLXNyZi5odG1sKS5cbiAgICAgKlxuICAgICAqIGBcImV4YWN0XCJgOiBFeGFjdCBidXQgc2xvdyBjb3VudCBhbGdvcml0aG0uIFBlcmZvcm1zIGEgYENPVU5UKCopYCB1bmRlciB0aGVcbiAgICAgKiBob29kLlxuICAgICAqXG4gICAgICogYFwicGxhbm5lZFwiYDogQXBwcm94aW1hdGVkIGJ1dCBmYXN0IGNvdW50IGFsZ29yaXRobS4gVXNlcyB0aGUgUG9zdGdyZXNcbiAgICAgKiBzdGF0aXN0aWNzIHVuZGVyIHRoZSBob29kLlxuICAgICAqXG4gICAgICogYFwiZXN0aW1hdGVkXCJgOiBVc2VzIGV4YWN0IGNvdW50IGZvciBsb3cgbnVtYmVycyBhbmQgcGxhbm5lZCBjb3VudCBmb3IgaGlnaFxuICAgICAqIG51bWJlcnMuXG4gICAgICovXG4gICAgcnBjKGZuLCBhcmdzID0ge30sIHsgaGVhZCA9IGZhbHNlLCBnZXQgPSBmYWxzZSwgY291bnQsIH0gPSB7fSkge1xuICAgICAgICBsZXQgbWV0aG9kO1xuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGAke3RoaXMudXJsfS9ycGMvJHtmbn1gKTtcbiAgICAgICAgbGV0IGJvZHk7XG4gICAgICAgIGlmIChoZWFkIHx8IGdldCkge1xuICAgICAgICAgICAgbWV0aG9kID0gaGVhZCA/ICdIRUFEJyA6ICdHRVQnO1xuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoYXJncylcbiAgICAgICAgICAgICAgICAvLyBwYXJhbXMgd2l0aCB1bmRlZmluZWQgdmFsdWUgbmVlZHMgdG8gYmUgZmlsdGVyZWQgb3V0LCBvdGhlcndpc2UgaXQnbGxcbiAgICAgICAgICAgICAgICAvLyBzaG93IHVwIGFzIGA/cGFyYW09dW5kZWZpbmVkYFxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKFtfLCB2YWx1ZV0pID0+IHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgdmFsdWVzIG5lZWQgc3BlY2lhbCBzeW50YXhcbiAgICAgICAgICAgICAgICAubWFwKChbbmFtZSwgdmFsdWVdKSA9PiBbbmFtZSwgQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBgeyR7dmFsdWUuam9pbignLCcpfX1gIDogYCR7dmFsdWV9YF0pXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKFtuYW1lLCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1ldGhvZCA9ICdQT1NUJztcbiAgICAgICAgICAgIGJvZHkgPSBhcmdzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhlYWRlcnMpO1xuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ1ByZWZlciddID0gYGNvdW50PSR7Y291bnR9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hTmFtZSxcbiAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgICAgIGFsbG93RW1wdHk6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQb3N0Z3Jlc3RDbGllbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qb3N0Z3Jlc3RDbGllbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vKipcbiAqIEVycm9yIGZvcm1hdFxuICpcbiAqIHtAbGluayBodHRwczovL3Bvc3RncmVzdC5vcmcvZW4vc3RhYmxlL2FwaS5odG1sP2hpZ2hsaWdodD1vcHRpb25zI2Vycm9ycy1hbmQtaHR0cC1zdGF0dXMtY29kZXN9XG4gKi9cbmNsYXNzIFBvc3RncmVzdEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dC5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ1Bvc3RncmVzdEVycm9yJztcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gY29udGV4dC5kZXRhaWxzO1xuICAgICAgICB0aGlzLmhpbnQgPSBjb250ZXh0LmhpbnQ7XG4gICAgICAgIHRoaXMuY29kZSA9IGNvbnRleHQuY29kZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQb3N0Z3Jlc3RFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBvc3RncmVzdEVycm9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXJcIikpO1xuY2xhc3MgUG9zdGdyZXN0RmlsdGVyQnVpbGRlciBleHRlbmRzIFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXJfMS5kZWZhdWx0IHtcbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgaXMgZXF1YWwgdG8gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIFRvIGNoZWNrIGlmIHRoZSB2YWx1ZSBvZiBgY29sdW1uYCBpcyBOVUxMLCB5b3Ugc2hvdWxkIHVzZSBgLmlzKClgIGluc3RlYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBlcShjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgZXEuJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpcyBub3QgZXF1YWwgdG8gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIG5lcShjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgbmVxLiR7dmFsdWV9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgaXMgZ3JlYXRlciB0aGFuIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBndChjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgZ3QuJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGd0ZShjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgZ3RlLiR7dmFsdWV9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgaXMgbGVzcyB0aGFuIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBsdChjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgbHQuJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGx0ZShjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgbHRlLiR7dmFsdWV9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgbWF0Y2hlcyBgcGF0dGVybmAgY2FzZS1zZW5zaXRpdmVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBwYXR0ZXJuIC0gVGhlIHBhdHRlcm4gdG8gbWF0Y2ggd2l0aFxuICAgICAqL1xuICAgIGxpa2UoY29sdW1uLCBwYXR0ZXJuKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgbGlrZS4ke3BhdHRlcm59YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgbWF0Y2hlcyBhbGwgb2YgYHBhdHRlcm5zYCBjYXNlLXNlbnNpdGl2ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHBhdHRlcm5zIC0gVGhlIHBhdHRlcm5zIHRvIG1hdGNoIHdpdGhcbiAgICAgKi9cbiAgICBsaWtlQWxsT2YoY29sdW1uLCBwYXR0ZXJucykge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGxpa2UoYWxsKS57JHtwYXR0ZXJucy5qb2luKCcsJyl9fWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIG1hdGNoZXMgYW55IG9mIGBwYXR0ZXJuc2AgY2FzZS1zZW5zaXRpdmVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBwYXR0ZXJucyAtIFRoZSBwYXR0ZXJucyB0byBtYXRjaCB3aXRoXG4gICAgICovXG4gICAgbGlrZUFueU9mKGNvbHVtbiwgcGF0dGVybnMpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBsaWtlKGFueSkueyR7cGF0dGVybnMuam9pbignLCcpfX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBtYXRjaGVzIGBwYXR0ZXJuYCBjYXNlLWluc2Vuc2l0aXZlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcGF0dGVybiAtIFRoZSBwYXR0ZXJuIHRvIG1hdGNoIHdpdGhcbiAgICAgKi9cbiAgICBpbGlrZShjb2x1bW4sIHBhdHRlcm4pIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBpbGlrZS4ke3BhdHRlcm59YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgbWF0Y2hlcyBhbGwgb2YgYHBhdHRlcm5zYCBjYXNlLWluc2Vuc2l0aXZlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcGF0dGVybnMgLSBUaGUgcGF0dGVybnMgdG8gbWF0Y2ggd2l0aFxuICAgICAqL1xuICAgIGlsaWtlQWxsT2YoY29sdW1uLCBwYXR0ZXJucykge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGlsaWtlKGFsbCkueyR7cGF0dGVybnMuam9pbignLCcpfX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBtYXRjaGVzIGFueSBvZiBgcGF0dGVybnNgIGNhc2UtaW5zZW5zaXRpdmVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBwYXR0ZXJucyAtIFRoZSBwYXR0ZXJucyB0byBtYXRjaCB3aXRoXG4gICAgICovXG4gICAgaWxpa2VBbnlPZihjb2x1bW4sIHBhdHRlcm5zKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgaWxpa2UoYW55KS57JHtwYXR0ZXJucy5qb2luKCcsJyl9fWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIElTIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBGb3Igbm9uLWJvb2xlYW4gY29sdW1ucywgdGhpcyBpcyBvbmx5IHJlbGV2YW50IGZvciBjaGVja2luZyBpZiB0aGUgdmFsdWUgb2ZcbiAgICAgKiBgY29sdW1uYCBpcyBOVUxMIGJ5IHNldHRpbmcgYHZhbHVlYCB0byBgbnVsbGAuXG4gICAgICpcbiAgICAgKiBGb3IgYm9vbGVhbiBjb2x1bW5zLCB5b3UgY2FuIGFsc28gc2V0IGB2YWx1ZWAgdG8gYHRydWVgIG9yIGBmYWxzZWAgYW5kIGl0XG4gICAgICogd2lsbCBiZWhhdmUgdGhlIHNhbWUgd2F5IGFzIGAuZXEoKWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBpcyhjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgaXMuJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpcyBpbmNsdWRlZCBpbiB0aGUgYHZhbHVlc2AgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWVzIC0gVGhlIHZhbHVlcyBhcnJheSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGluKGNvbHVtbiwgdmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IGNsZWFuZWRWYWx1ZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQodmFsdWVzKSlcbiAgICAgICAgICAgIC5tYXAoKHMpID0+IHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBwb3N0Z3Jlc3QgcmVzZXJ2ZWQgY2hhcmFjdGVyc1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9wb3N0Z3Jlc3Qub3JnL2VuL3Y3LjAuMC9hcGkuaHRtbCNyZXNlcnZlZC1jaGFyYWN0ZXJzXG4gICAgICAgICAgICBpZiAodHlwZW9mIHMgPT09ICdzdHJpbmcnICYmIG5ldyBSZWdFeHAoJ1ssKCldJykudGVzdChzKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gYFwiJHtzfVwiYDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7c31gO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJywnKTtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBpbi4oJHtjbGVhbmVkVmFsdWVzfSlgKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ubHkgcmVsZXZhbnQgZm9yIGpzb25iLCBhcnJheSwgYW5kIHJhbmdlIGNvbHVtbnMuIE1hdGNoIG9ubHkgcm93cyB3aGVyZVxuICAgICAqIGBjb2x1bW5gIGNvbnRhaW5zIGV2ZXJ5IGVsZW1lbnQgYXBwZWFyaW5nIGluIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGpzb25iLCBhcnJheSwgb3IgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBqc29uYiwgYXJyYXksIG9yIHJhbmdlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgY29udGFpbnMoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gcmFuZ2UgdHlwZXMgY2FuIGJlIGluY2x1c2l2ZSAnWycsICddJyBvciBleGNsdXNpdmUgJygnLCAnKScgc28ganVzdFxuICAgICAgICAgICAgLy8ga2VlcCBpdCBzaW1wbGUgYW5kIGFjY2VwdCBhIHN0cmluZ1xuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBjcy4ke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBhcnJheVxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBjcy57JHt2YWx1ZS5qb2luKCcsJyl9fWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8ganNvblxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBjcy4ke0pTT04uc3RyaW5naWZ5KHZhbHVlKX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IganNvbmIsIGFycmF5LCBhbmQgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlXG4gICAgICogZXZlcnkgZWxlbWVudCBhcHBlYXJpbmcgaW4gYGNvbHVtbmAgaXMgY29udGFpbmVkIGJ5IGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGpzb25iLCBhcnJheSwgb3IgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBqc29uYiwgYXJyYXksIG9yIHJhbmdlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgY29udGFpbmVkQnkoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gcmFuZ2VcbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgY2QuJHt2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gYXJyYXlcbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgY2QueyR7dmFsdWUuam9pbignLCcpfX1gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGpzb25cbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgY2QuJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ubHkgcmVsZXZhbnQgZm9yIHJhbmdlIGNvbHVtbnMuIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBldmVyeSBlbGVtZW50IGluXG4gICAgICogYGNvbHVtbmAgaXMgZ3JlYXRlciB0aGFuIGFueSBlbGVtZW50IGluIGByYW5nZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIHJhbmdlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICByYW5nZUd0KGNvbHVtbiwgcmFuZ2UpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBzci4ke3JhbmdlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlIGV2ZXJ5IGVsZW1lbnQgaW5cbiAgICAgKiBgY29sdW1uYCBpcyBlaXRoZXIgY29udGFpbmVkIGluIGByYW5nZWAgb3IgZ3JlYXRlciB0aGFuIGFueSBlbGVtZW50IGluXG4gICAgICogYHJhbmdlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSByYW5nZSAtIFRoZSByYW5nZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIHJhbmdlR3RlKGNvbHVtbiwgcmFuZ2UpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBueGwuJHtyYW5nZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ubHkgcmVsZXZhbnQgZm9yIHJhbmdlIGNvbHVtbnMuIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBldmVyeSBlbGVtZW50IGluXG4gICAgICogYGNvbHVtbmAgaXMgbGVzcyB0aGFuIGFueSBlbGVtZW50IGluIGByYW5nZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIHJhbmdlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICByYW5nZUx0KGNvbHVtbiwgcmFuZ2UpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBzbC4ke3JhbmdlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlIGV2ZXJ5IGVsZW1lbnQgaW5cbiAgICAgKiBgY29sdW1uYCBpcyBlaXRoZXIgY29udGFpbmVkIGluIGByYW5nZWAgb3IgbGVzcyB0aGFuIGFueSBlbGVtZW50IGluXG4gICAgICogYHJhbmdlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSByYW5nZSAtIFRoZSByYW5nZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIHJhbmdlTHRlKGNvbHVtbiwgcmFuZ2UpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBueHIuJHtyYW5nZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ubHkgcmVsZXZhbnQgZm9yIHJhbmdlIGNvbHVtbnMuIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpc1xuICAgICAqIG11dHVhbGx5IGV4Y2x1c2l2ZSB0byBgcmFuZ2VgIGFuZCB0aGVyZSBjYW4gYmUgbm8gZWxlbWVudCBiZXR3ZWVuIHRoZSB0d29cbiAgICAgKiByYW5nZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIHJhbmdlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICByYW5nZUFkamFjZW50KGNvbHVtbiwgcmFuZ2UpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBhZGouJHtyYW5nZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ubHkgcmVsZXZhbnQgZm9yIGFycmF5IGFuZCByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmVcbiAgICAgKiBgY29sdW1uYCBhbmQgYHZhbHVlYCBoYXZlIGFuIGVsZW1lbnQgaW4gY29tbW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBhcnJheSBvciByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIGFycmF5IG9yIHJhbmdlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgb3ZlcmxhcHMoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gcmFuZ2VcbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgb3YuJHt2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGFycmF5XG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYG92Lnske3ZhbHVlLmpvaW4oJywnKX19YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ubHkgcmVsZXZhbnQgZm9yIHRleHQgYW5kIHRzdmVjdG9yIGNvbHVtbnMuIE1hdGNoIG9ubHkgcm93cyB3aGVyZVxuICAgICAqIGBjb2x1bW5gIG1hdGNoZXMgdGhlIHF1ZXJ5IHN0cmluZyBpbiBgcXVlcnlgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSB0ZXh0IG9yIHRzdmVjdG9yIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBUaGUgcXVlcnkgdGV4dCB0byBtYXRjaCB3aXRoXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY29uZmlnIC0gVGhlIHRleHQgc2VhcmNoIGNvbmZpZ3VyYXRpb24gdG8gdXNlXG4gICAgICogQHBhcmFtIG9wdGlvbnMudHlwZSAtIENoYW5nZSBob3cgdGhlIGBxdWVyeWAgdGV4dCBpcyBpbnRlcnByZXRlZFxuICAgICAqL1xuICAgIHRleHRTZWFyY2goY29sdW1uLCBxdWVyeSwgeyBjb25maWcsIHR5cGUgfSA9IHt9KSB7XG4gICAgICAgIGxldCB0eXBlUGFydCA9ICcnO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3BsYWluJykge1xuICAgICAgICAgICAgdHlwZVBhcnQgPSAncGwnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdwaHJhc2UnKSB7XG4gICAgICAgICAgICB0eXBlUGFydCA9ICdwaCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3dlYnNlYXJjaCcpIHtcbiAgICAgICAgICAgIHR5cGVQYXJ0ID0gJ3cnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbmZpZ1BhcnQgPSBjb25maWcgPT09IHVuZGVmaW5lZCA/ICcnIDogYCgke2NvbmZpZ30pYDtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGAke3R5cGVQYXJ0fWZ0cyR7Y29uZmlnUGFydH0uJHtxdWVyeX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBlYWNoIGNvbHVtbiBpbiBgcXVlcnlgIGtleXMgaXMgZXF1YWwgdG8gaXRzXG4gICAgICogYXNzb2NpYXRlZCB2YWx1ZS4gU2hvcnRoYW5kIGZvciBtdWx0aXBsZSBgLmVxKClgcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBxdWVyeSAtIFRoZSBvYmplY3QgdG8gZmlsdGVyIHdpdGgsIHdpdGggY29sdW1uIG5hbWVzIGFzIGtleXMgbWFwcGVkXG4gICAgICogdG8gdGhlaXIgZmlsdGVyIHZhbHVlc1xuICAgICAqL1xuICAgIG1hdGNoKHF1ZXJ5KSB7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKHF1ZXJ5KS5mb3JFYWNoKChbY29sdW1uLCB2YWx1ZV0pID0+IHtcbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgZXEuJHt2YWx1ZX1gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hpY2ggZG9lc24ndCBzYXRpc2Z5IHRoZSBmaWx0ZXIuXG4gICAgICpcbiAgICAgKiBVbmxpa2UgbW9zdCBmaWx0ZXJzLCBgb3BlYXJhdG9yYCBhbmQgYHZhbHVlYCBhcmUgdXNlZCBhcy1pcyBhbmQgbmVlZCB0b1xuICAgICAqIGZvbGxvdyBbUG9zdGdSRVNUXG4gICAgICogc3ludGF4XShodHRwczovL3Bvc3RncmVzdC5vcmcvZW4vc3RhYmxlL2FwaS5odG1sI29wZXJhdG9ycykuIFlvdSBhbHNvIG5lZWRcbiAgICAgKiB0byBtYWtlIHN1cmUgdGhleSBhcmUgcHJvcGVybHkgc2FuaXRpemVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIG9wZXJhdG9yIC0gVGhlIG9wZXJhdG9yIHRvIGJlIG5lZ2F0ZWQgdG8gZmlsdGVyIHdpdGgsIGZvbGxvd2luZ1xuICAgICAqIFBvc3RnUkVTVCBzeW50YXhcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZmlsdGVyIHdpdGgsIGZvbGxvd2luZyBQb3N0Z1JFU1Qgc3ludGF4XG4gICAgICovXG4gICAgbm90KGNvbHVtbiwgb3BlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgbm90LiR7b3BlcmF0b3J9LiR7dmFsdWV9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hpY2ggc2F0aXNmeSBhdCBsZWFzdCBvbmUgb2YgdGhlIGZpbHRlcnMuXG4gICAgICpcbiAgICAgKiBVbmxpa2UgbW9zdCBmaWx0ZXJzLCBgZmlsdGVyc2AgaXMgdXNlZCBhcy1pcyBhbmQgbmVlZHMgdG8gZm9sbG93IFtQb3N0Z1JFU1RcbiAgICAgKiBzeW50YXhdKGh0dHBzOi8vcG9zdGdyZXN0Lm9yZy9lbi9zdGFibGUvYXBpLmh0bWwjb3BlcmF0b3JzKS4gWW91IGFsc28gbmVlZFxuICAgICAqIHRvIG1ha2Ugc3VyZSBpdCdzIHByb3Blcmx5IHNhbml0aXplZC5cbiAgICAgKlxuICAgICAqIEl0J3MgY3VycmVudGx5IG5vdCBwb3NzaWJsZSB0byBkbyBhbiBgLm9yKClgIGZpbHRlciBhY3Jvc3MgbXVsdGlwbGUgdGFibGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZpbHRlcnMgLSBUaGUgZmlsdGVycyB0byB1c2UsIGZvbGxvd2luZyBQb3N0Z1JFU1Qgc3ludGF4XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVmZXJlbmNlZFRhYmxlIC0gU2V0IHRoaXMgdG8gZmlsdGVyIG9uIHJlZmVyZW5jZWQgdGFibGVzXG4gICAgICogaW5zdGVhZCBvZiB0aGUgcGFyZW50IHRhYmxlXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZm9yZWlnblRhYmxlIC0gRGVwcmVjYXRlZCwgdXNlIGByZWZlcmVuY2VkVGFibGVgIGluc3RlYWRcbiAgICAgKi9cbiAgICBvcihmaWx0ZXJzLCB7IGZvcmVpZ25UYWJsZSwgcmVmZXJlbmNlZFRhYmxlID0gZm9yZWlnblRhYmxlLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3Qga2V5ID0gcmVmZXJlbmNlZFRhYmxlID8gYCR7cmVmZXJlbmNlZFRhYmxlfS5vcmAgOiAnb3InO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGtleSwgYCgke2ZpbHRlcnN9KWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoaWNoIHNhdGlzZnkgdGhlIGZpbHRlci4gVGhpcyBpcyBhbiBlc2NhcGUgaGF0Y2ggLSB5b3VcbiAgICAgKiBzaG91bGQgdXNlIHRoZSBzcGVjaWZpYyBmaWx0ZXIgbWV0aG9kcyB3aGVyZXZlciBwb3NzaWJsZS5cbiAgICAgKlxuICAgICAqIFVubGlrZSBtb3N0IGZpbHRlcnMsIGBvcGVhcmF0b3JgIGFuZCBgdmFsdWVgIGFyZSB1c2VkIGFzLWlzIGFuZCBuZWVkIHRvXG4gICAgICogZm9sbG93IFtQb3N0Z1JFU1RcbiAgICAgKiBzeW50YXhdKGh0dHBzOi8vcG9zdGdyZXN0Lm9yZy9lbi9zdGFibGUvYXBpLmh0bWwjb3BlcmF0b3JzKS4gWW91IGFsc28gbmVlZFxuICAgICAqIHRvIG1ha2Ugc3VyZSB0aGV5IGFyZSBwcm9wZXJseSBzYW5pdGl6ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gb3BlcmF0b3IgLSBUaGUgb3BlcmF0b3IgdG8gZmlsdGVyIHdpdGgsIGZvbGxvd2luZyBQb3N0Z1JFU1Qgc3ludGF4XG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoLCBmb2xsb3dpbmcgUG9zdGdSRVNUIHN5bnRheFxuICAgICAqL1xuICAgIGZpbHRlcihjb2x1bW4sIG9wZXJhdG9yLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYCR7b3BlcmF0b3J9LiR7dmFsdWV9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFBvc3RncmVzdEZpbHRlckJ1aWxkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdEZpbHRlckJ1aWxkZXJcIikpO1xuY2xhc3MgUG9zdGdyZXN0UXVlcnlCdWlsZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIHsgaGVhZGVycyA9IHt9LCBzY2hlbWEsIGZldGNoLCB9KSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5mZXRjaCA9IGZldGNoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgU0VMRUNUIHF1ZXJ5IG9uIHRoZSB0YWJsZSBvciB2aWV3LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbnMgLSBUaGUgY29sdW1ucyB0byByZXRyaWV2ZSwgc2VwYXJhdGVkIGJ5IGNvbW1hcy4gQ29sdW1ucyBjYW4gYmUgcmVuYW1lZCB3aGVuIHJldHVybmVkIHdpdGggYGN1c3RvbU5hbWU6Y29sdW1uTmFtZWBcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaGVhZCAtIFdoZW4gc2V0IHRvIGB0cnVlYCwgYGRhdGFgIHdpbGwgbm90IGJlIHJldHVybmVkLlxuICAgICAqIFVzZWZ1bCBpZiB5b3Ugb25seSBuZWVkIHRoZSBjb3VudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvdW50IC0gQ291bnQgYWxnb3JpdGhtIHRvIHVzZSB0byBjb3VudCByb3dzIGluIHRoZSB0YWJsZSBvciB2aWV3LlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKi9cbiAgICBzZWxlY3QoY29sdW1ucywgeyBoZWFkID0gZmFsc2UsIGNvdW50LCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaGVhZCA/ICdIRUFEJyA6ICdHRVQnO1xuICAgICAgICAvLyBSZW1vdmUgd2hpdGVzcGFjZXMgZXhjZXB0IHdoZW4gcXVvdGVkXG4gICAgICAgIGxldCBxdW90ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2xlYW5lZENvbHVtbnMgPSAoY29sdW1ucyAhPT0gbnVsbCAmJiBjb2x1bW5zICE9PSB2b2lkIDAgPyBjb2x1bW5zIDogJyonKVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgaWYgKC9cXHMvLnRlc3QoYykgJiYgIXF1b3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgcXVvdGVkID0gIXF1b3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdzZWxlY3QnLCBjbGVhbmVkQ29sdW1ucyk7XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSA9IGBjb3VudD0ke2NvdW50fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICAgICAgYWxsb3dFbXB0eTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIElOU0VSVCBpbnRvIHRoZSB0YWJsZSBvciB2aWV3LlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgaW5zZXJ0ZWQgcm93cyBhcmUgbm90IHJldHVybmVkLiBUbyByZXR1cm4gaXQsIGNoYWluIHRoZSBjYWxsXG4gICAgICogd2l0aCBgLnNlbGVjdCgpYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgdmFsdWVzIHRvIGluc2VydC4gUGFzcyBhbiBvYmplY3QgdG8gaW5zZXJ0IGEgc2luZ2xlIHJvd1xuICAgICAqIG9yIGFuIGFycmF5IHRvIGluc2VydCBtdWx0aXBsZSByb3dzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb3VudCAtIENvdW50IGFsZ29yaXRobSB0byB1c2UgdG8gY291bnQgaW5zZXJ0ZWQgcm93cy5cbiAgICAgKlxuICAgICAqIGBcImV4YWN0XCJgOiBFeGFjdCBidXQgc2xvdyBjb3VudCBhbGdvcml0aG0uIFBlcmZvcm1zIGEgYENPVU5UKCopYCB1bmRlciB0aGVcbiAgICAgKiBob29kLlxuICAgICAqXG4gICAgICogYFwicGxhbm5lZFwiYDogQXBwcm94aW1hdGVkIGJ1dCBmYXN0IGNvdW50IGFsZ29yaXRobS4gVXNlcyB0aGUgUG9zdGdyZXNcbiAgICAgKiBzdGF0aXN0aWNzIHVuZGVyIHRoZSBob29kLlxuICAgICAqXG4gICAgICogYFwiZXN0aW1hdGVkXCJgOiBVc2VzIGV4YWN0IGNvdW50IGZvciBsb3cgbnVtYmVycyBhbmQgcGxhbm5lZCBjb3VudCBmb3IgaGlnaFxuICAgICAqIG51bWJlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kZWZhdWx0VG9OdWxsIC0gTWFrZSBtaXNzaW5nIGZpZWxkcyBkZWZhdWx0IHRvIGBudWxsYC5cbiAgICAgKiBPdGhlcndpc2UsIHVzZSB0aGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGNvbHVtbi4gT25seSBhcHBsaWVzIGZvciBidWxrXG4gICAgICogaW5zZXJ0cy5cbiAgICAgKi9cbiAgICBpbnNlcnQodmFsdWVzLCB7IGNvdW50LCBkZWZhdWx0VG9OdWxsID0gdHJ1ZSwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9ICdQT1NUJztcbiAgICAgICAgY29uc3QgcHJlZmVyc0hlYWRlcnMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2godGhpcy5oZWFkZXJzWydQcmVmZXInXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKGBjb3VudD0ke2NvdW50fWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVmYXVsdFRvTnVsbCkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaCgnbWlzc2luZz1kZWZhdWx0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSA9IHByZWZlcnNIZWFkZXJzLmpvaW4oJywnKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IHZhbHVlcy5yZWR1Y2UoKGFjYywgeCkgPT4gYWNjLmNvbmNhdChPYmplY3Qua2V5cyh4KSksIFtdKTtcbiAgICAgICAgICAgIGlmIChjb2x1bW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1bmlxdWVDb2x1bW5zID0gWy4uLm5ldyBTZXQoY29sdW1ucyldLm1hcCgoY29sdW1uKSA9PiBgXCIke2NvbHVtbn1cImApO1xuICAgICAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2NvbHVtbnMnLCB1bmlxdWVDb2x1bW5zLmpvaW4oJywnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIGJvZHk6IHZhbHVlcyxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICAgICAgYWxsb3dFbXB0eTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIFVQU0VSVCBvbiB0aGUgdGFibGUgb3Igdmlldy4gRGVwZW5kaW5nIG9uIHRoZSBjb2x1bW4ocykgcGFzc2VkXG4gICAgICogdG8gYG9uQ29uZmxpY3RgLCBgLnVwc2VydCgpYCBhbGxvd3MgeW91IHRvIHBlcmZvcm0gdGhlIGVxdWl2YWxlbnQgb2ZcbiAgICAgKiBgLmluc2VydCgpYCBpZiBhIHJvdyB3aXRoIHRoZSBjb3JyZXNwb25kaW5nIGBvbkNvbmZsaWN0YCBjb2x1bW5zIGRvZXNuJ3RcbiAgICAgKiBleGlzdCwgb3IgaWYgaXQgZG9lcyBleGlzdCwgcGVyZm9ybSBhbiBhbHRlcm5hdGl2ZSBhY3Rpb24gZGVwZW5kaW5nIG9uXG4gICAgICogYGlnbm9yZUR1cGxpY2F0ZXNgLlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgdXBzZXJ0ZWQgcm93cyBhcmUgbm90IHJldHVybmVkLiBUbyByZXR1cm4gaXQsIGNoYWluIHRoZSBjYWxsXG4gICAgICogd2l0aCBgLnNlbGVjdCgpYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgdmFsdWVzIHRvIHVwc2VydCB3aXRoLiBQYXNzIGFuIG9iamVjdCB0byB1cHNlcnQgYVxuICAgICAqIHNpbmdsZSByb3cgb3IgYW4gYXJyYXkgdG8gdXBzZXJ0IG11bHRpcGxlIHJvd3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLm9uQ29uZmxpY3QgLSBDb21tYS1zZXBhcmF0ZWQgVU5JUVVFIGNvbHVtbihzKSB0byBzcGVjaWZ5IGhvd1xuICAgICAqIGR1cGxpY2F0ZSByb3dzIGFyZSBkZXRlcm1pbmVkLiBUd28gcm93cyBhcmUgZHVwbGljYXRlcyBpZiBhbGwgdGhlXG4gICAgICogYG9uQ29uZmxpY3RgIGNvbHVtbnMgYXJlIGVxdWFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaWdub3JlRHVwbGljYXRlcyAtIElmIGB0cnVlYCwgZHVwbGljYXRlIHJvd3MgYXJlIGlnbm9yZWQuIElmXG4gICAgICogYGZhbHNlYCwgZHVwbGljYXRlIHJvd3MgYXJlIG1lcmdlZCB3aXRoIGV4aXN0aW5nIHJvd3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb3VudCAtIENvdW50IGFsZ29yaXRobSB0byB1c2UgdG8gY291bnQgdXBzZXJ0ZWQgcm93cy5cbiAgICAgKlxuICAgICAqIGBcImV4YWN0XCJgOiBFeGFjdCBidXQgc2xvdyBjb3VudCBhbGdvcml0aG0uIFBlcmZvcm1zIGEgYENPVU5UKCopYCB1bmRlciB0aGVcbiAgICAgKiBob29kLlxuICAgICAqXG4gICAgICogYFwicGxhbm5lZFwiYDogQXBwcm94aW1hdGVkIGJ1dCBmYXN0IGNvdW50IGFsZ29yaXRobS4gVXNlcyB0aGUgUG9zdGdyZXNcbiAgICAgKiBzdGF0aXN0aWNzIHVuZGVyIHRoZSBob29kLlxuICAgICAqXG4gICAgICogYFwiZXN0aW1hdGVkXCJgOiBVc2VzIGV4YWN0IGNvdW50IGZvciBsb3cgbnVtYmVycyBhbmQgcGxhbm5lZCBjb3VudCBmb3IgaGlnaFxuICAgICAqIG51bWJlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kZWZhdWx0VG9OdWxsIC0gTWFrZSBtaXNzaW5nIGZpZWxkcyBkZWZhdWx0IHRvIGBudWxsYC5cbiAgICAgKiBPdGhlcndpc2UsIHVzZSB0aGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGNvbHVtbi4gVGhpcyBvbmx5IGFwcGxpZXMgd2hlblxuICAgICAqIGluc2VydGluZyBuZXcgcm93cywgbm90IHdoZW4gbWVyZ2luZyB3aXRoIGV4aXN0aW5nIHJvd3MgdW5kZXJcbiAgICAgKiBgaWdub3JlRHVwbGljYXRlczogZmFsc2VgLiBUaGlzIGFsc28gb25seSBhcHBsaWVzIHdoZW4gZG9pbmcgYnVsayB1cHNlcnRzLlxuICAgICAqL1xuICAgIHVwc2VydCh2YWx1ZXMsIHsgb25Db25mbGljdCwgaWdub3JlRHVwbGljYXRlcyA9IGZhbHNlLCBjb3VudCwgZGVmYXVsdFRvTnVsbCA9IHRydWUsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBtZXRob2QgPSAnUE9TVCc7XG4gICAgICAgIGNvbnN0IHByZWZlcnNIZWFkZXJzID0gW2ByZXNvbHV0aW9uPSR7aWdub3JlRHVwbGljYXRlcyA/ICdpZ25vcmUnIDogJ21lcmdlJ30tZHVwbGljYXRlc2BdO1xuICAgICAgICBpZiAob25Db25mbGljdCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldCgnb25fY29uZmxpY3QnLCBvbkNvbmZsaWN0KTtcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2godGhpcy5oZWFkZXJzWydQcmVmZXInXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKGBjb3VudD0ke2NvdW50fWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVmYXVsdFRvTnVsbCkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaCgnbWlzc2luZz1kZWZhdWx0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSA9IHByZWZlcnNIZWFkZXJzLmpvaW4oJywnKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IHZhbHVlcy5yZWR1Y2UoKGFjYywgeCkgPT4gYWNjLmNvbmNhdChPYmplY3Qua2V5cyh4KSksIFtdKTtcbiAgICAgICAgICAgIGlmIChjb2x1bW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1bmlxdWVDb2x1bW5zID0gWy4uLm5ldyBTZXQoY29sdW1ucyldLm1hcCgoY29sdW1uKSA9PiBgXCIke2NvbHVtbn1cImApO1xuICAgICAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2NvbHVtbnMnLCB1bmlxdWVDb2x1bW5zLmpvaW4oJywnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIGJvZHk6IHZhbHVlcyxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICAgICAgYWxsb3dFbXB0eTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFuIFVQREFURSBvbiB0aGUgdGFibGUgb3Igdmlldy5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIHVwZGF0ZWQgcm93cyBhcmUgbm90IHJldHVybmVkLiBUbyByZXR1cm4gaXQsIGNoYWluIHRoZSBjYWxsXG4gICAgICogd2l0aCBgLnNlbGVjdCgpYCBhZnRlciBmaWx0ZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlcyAtIFRoZSB2YWx1ZXMgdG8gdXBkYXRlIHdpdGhcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY291bnQgLSBDb3VudCBhbGdvcml0aG0gdG8gdXNlIHRvIGNvdW50IHVwZGF0ZWQgcm93cy5cbiAgICAgKlxuICAgICAqIGBcImV4YWN0XCJgOiBFeGFjdCBidXQgc2xvdyBjb3VudCBhbGdvcml0aG0uIFBlcmZvcm1zIGEgYENPVU5UKCopYCB1bmRlciB0aGVcbiAgICAgKiBob29kLlxuICAgICAqXG4gICAgICogYFwicGxhbm5lZFwiYDogQXBwcm94aW1hdGVkIGJ1dCBmYXN0IGNvdW50IGFsZ29yaXRobS4gVXNlcyB0aGUgUG9zdGdyZXNcbiAgICAgKiBzdGF0aXN0aWNzIHVuZGVyIHRoZSBob29kLlxuICAgICAqXG4gICAgICogYFwiZXN0aW1hdGVkXCJgOiBVc2VzIGV4YWN0IGNvdW50IGZvciBsb3cgbnVtYmVycyBhbmQgcGxhbm5lZCBjb3VudCBmb3IgaGlnaFxuICAgICAqIG51bWJlcnMuXG4gICAgICovXG4gICAgdXBkYXRlKHZhbHVlcywgeyBjb3VudCwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9ICdQQVRDSCc7XG4gICAgICAgIGNvbnN0IHByZWZlcnNIZWFkZXJzID0gW107XG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaChgY291bnQ9JHtjb3VudH1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddID0gcHJlZmVyc0hlYWRlcnMuam9pbignLCcpO1xuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgYm9keTogdmFsdWVzLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgICAgICBhbGxvd0VtcHR5OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBERUxFVEUgb24gdGhlIHRhYmxlIG9yIHZpZXcuXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCBkZWxldGVkIHJvd3MgYXJlIG5vdCByZXR1cm5lZC4gVG8gcmV0dXJuIGl0LCBjaGFpbiB0aGUgY2FsbFxuICAgICAqIHdpdGggYC5zZWxlY3QoKWAgYWZ0ZXIgZmlsdGVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY291bnQgLSBDb3VudCBhbGdvcml0aG0gdG8gdXNlIHRvIGNvdW50IGRlbGV0ZWQgcm93cy5cbiAgICAgKlxuICAgICAqIGBcImV4YWN0XCJgOiBFeGFjdCBidXQgc2xvdyBjb3VudCBhbGdvcml0aG0uIFBlcmZvcm1zIGEgYENPVU5UKCopYCB1bmRlciB0aGVcbiAgICAgKiBob29kLlxuICAgICAqXG4gICAgICogYFwicGxhbm5lZFwiYDogQXBwcm94aW1hdGVkIGJ1dCBmYXN0IGNvdW50IGFsZ29yaXRobS4gVXNlcyB0aGUgUG9zdGdyZXNcbiAgICAgKiBzdGF0aXN0aWNzIHVuZGVyIHRoZSBob29kLlxuICAgICAqXG4gICAgICogYFwiZXN0aW1hdGVkXCJgOiBVc2VzIGV4YWN0IGNvdW50IGZvciBsb3cgbnVtYmVycyBhbmQgcGxhbm5lZCBjb3VudCBmb3IgaGlnaFxuICAgICAqIG51bWJlcnMuXG4gICAgICovXG4gICAgZGVsZXRlKHsgY291bnQsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBtZXRob2QgPSAnREVMRVRFJztcbiAgICAgICAgY29uc3QgcHJlZmVyc0hlYWRlcnMgPSBbXTtcbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKGBjb3VudD0ke2NvdW50fWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy51bnNoaWZ0KHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVhZGVyc1snUHJlZmVyJ10gPSBwcmVmZXJzSGVhZGVycy5qb2luKCcsJyk7XG4gICAgICAgIHJldHVybiBuZXcgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xLmRlZmF1bHQoe1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgICAgIGFsbG93RW1wdHk6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qb3N0Z3Jlc3RRdWVyeUJ1aWxkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBQb3N0Z3Jlc3RCdWlsZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0QnVpbGRlclwiKSk7XG5jbGFzcyBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyIGV4dGVuZHMgUG9zdGdyZXN0QnVpbGRlcl8xLmRlZmF1bHQge1xuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBTRUxFQ1Qgb24gdGhlIHF1ZXJ5IHJlc3VsdC5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIGAuaW5zZXJ0KClgLCBgLnVwZGF0ZSgpYCwgYC51cHNlcnQoKWAsIGFuZCBgLmRlbGV0ZSgpYCBkbyBub3RcbiAgICAgKiByZXR1cm4gbW9kaWZpZWQgcm93cy4gQnkgY2FsbGluZyB0aGlzIG1ldGhvZCwgbW9kaWZpZWQgcm93cyBhcmUgcmV0dXJuZWQgaW5cbiAgICAgKiBgZGF0YWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1ucyAtIFRoZSBjb2x1bW5zIHRvIHJldHJpZXZlLCBzZXBhcmF0ZWQgYnkgY29tbWFzXG4gICAgICovXG4gICAgc2VsZWN0KGNvbHVtbnMpIHtcbiAgICAgICAgLy8gUmVtb3ZlIHdoaXRlc3BhY2VzIGV4Y2VwdCB3aGVuIHF1b3RlZFxuICAgICAgICBsZXQgcXVvdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNsZWFuZWRDb2x1bW5zID0gKGNvbHVtbnMgIT09IG51bGwgJiYgY29sdW1ucyAhPT0gdm9pZCAwID8gY29sdW1ucyA6ICcqJylcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5tYXAoKGMpID0+IHtcbiAgICAgICAgICAgIGlmICgvXFxzLy50ZXN0KGMpICYmICFxdW90ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYyA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgIHF1b3RlZCA9ICFxdW90ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldCgnc2VsZWN0JywgY2xlYW5lZENvbHVtbnMpO1xuICAgICAgICBpZiAodGhpcy5oZWFkZXJzWydQcmVmZXInXSkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSArPSAnLCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSArPSAncmV0dXJuPXJlcHJlc2VudGF0aW9uJztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9yZGVyIHRoZSBxdWVyeSByZXN1bHQgYnkgYGNvbHVtbmAuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIGNhbGwgdGhpcyBtZXRob2QgbXVsdGlwbGUgdGltZXMgdG8gb3JkZXIgYnkgbXVsdGlwbGUgY29sdW1ucy5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gb3JkZXIgcmVmZXJlbmNlZCB0YWJsZXMsIGJ1dCBpdCBvbmx5IGFmZmVjdHMgdGhlIG9yZGVyaW5nIG9mIHRoZVxuICAgICAqIHBhcmVudCB0YWJsZSBpZiB5b3UgdXNlIGAhaW5uZXJgIGluIHRoZSBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIG9yZGVyIGJ5XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYXNjZW5kaW5nIC0gSWYgYHRydWVgLCB0aGUgcmVzdWx0IHdpbGwgYmUgaW4gYXNjZW5kaW5nIG9yZGVyXG4gICAgICogQHBhcmFtIG9wdGlvbnMubnVsbHNGaXJzdCAtIElmIGB0cnVlYCwgYG51bGxgcyBhcHBlYXIgZmlyc3QuIElmIGBmYWxzZWAsXG4gICAgICogYG51bGxgcyBhcHBlYXIgbGFzdC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWZlcmVuY2VkVGFibGUgLSBTZXQgdGhpcyB0byBvcmRlciBhIHJlZmVyZW5jZWQgdGFibGUgYnlcbiAgICAgKiBpdHMgY29sdW1uc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLmZvcmVpZ25UYWJsZSAtIERlcHJlY2F0ZWQsIHVzZSBgb3B0aW9ucy5yZWZlcmVuY2VkVGFibGVgXG4gICAgICogaW5zdGVhZFxuICAgICAqL1xuICAgIG9yZGVyKGNvbHVtbiwgeyBhc2NlbmRpbmcgPSB0cnVlLCBudWxsc0ZpcnN0LCBmb3JlaWduVGFibGUsIHJlZmVyZW5jZWRUYWJsZSA9IGZvcmVpZ25UYWJsZSwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHJlZmVyZW5jZWRUYWJsZSA/IGAke3JlZmVyZW5jZWRUYWJsZX0ub3JkZXJgIDogJ29yZGVyJztcbiAgICAgICAgY29uc3QgZXhpc3RpbmdPcmRlciA9IHRoaXMudXJsLnNlYXJjaFBhcmFtcy5nZXQoa2V5KTtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldChrZXksIGAke2V4aXN0aW5nT3JkZXIgPyBgJHtleGlzdGluZ09yZGVyfSxgIDogJyd9JHtjb2x1bW59LiR7YXNjZW5kaW5nID8gJ2FzYycgOiAnZGVzYyd9JHtudWxsc0ZpcnN0ID09PSB1bmRlZmluZWQgPyAnJyA6IG51bGxzRmlyc3QgPyAnLm51bGxzZmlyc3QnIDogJy5udWxsc2xhc3QnfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGltaXQgdGhlIHF1ZXJ5IHJlc3VsdCBieSBgY291bnRgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvdW50IC0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHJvd3MgdG8gcmV0dXJuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVmZXJlbmNlZFRhYmxlIC0gU2V0IHRoaXMgdG8gbGltaXQgcm93cyBvZiByZWZlcmVuY2VkXG4gICAgICogdGFibGVzIGluc3RlYWQgb2YgdGhlIHBhcmVudCB0YWJsZVxuICAgICAqIEBwYXJhbSBvcHRpb25zLmZvcmVpZ25UYWJsZSAtIERlcHJlY2F0ZWQsIHVzZSBgb3B0aW9ucy5yZWZlcmVuY2VkVGFibGVgXG4gICAgICogaW5zdGVhZFxuICAgICAqL1xuICAgIGxpbWl0KGNvdW50LCB7IGZvcmVpZ25UYWJsZSwgcmVmZXJlbmNlZFRhYmxlID0gZm9yZWlnblRhYmxlLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3Qga2V5ID0gdHlwZW9mIHJlZmVyZW5jZWRUYWJsZSA9PT0gJ3VuZGVmaW5lZCcgPyAnbGltaXQnIDogYCR7cmVmZXJlbmNlZFRhYmxlfS5saW1pdGA7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5LCBgJHtjb3VudH1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpbWl0IHRoZSBxdWVyeSByZXN1bHQgYnkgc3RhcnRpbmcgYXQgYW4gb2Zmc2V0IGBmcm9tYCBhbmQgZW5kaW5nIGF0IHRoZSBvZmZzZXQgYHRvYC5cbiAgICAgKiBPbmx5IHJlY29yZHMgd2l0aGluIHRoaXMgcmFuZ2UgYXJlIHJldHVybmVkLlxuICAgICAqIFRoaXMgcmVzcGVjdHMgdGhlIHF1ZXJ5IG9yZGVyIGFuZCBpZiB0aGVyZSBpcyBubyBvcmRlciBjbGF1c2UgdGhlIHJhbmdlIGNvdWxkIGJlaGF2ZSB1bmV4cGVjdGVkbHkuXG4gICAgICogVGhlIGBmcm9tYCBhbmQgYHRvYCB2YWx1ZXMgYXJlIDAtYmFzZWQgYW5kIGluY2x1c2l2ZTogYHJhbmdlKDEsIDMpYCB3aWxsIGluY2x1ZGUgdGhlIHNlY29uZCwgdGhpcmRcbiAgICAgKiBhbmQgZm91cnRoIHJvd3Mgb2YgdGhlIHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGZyb20gLSBUaGUgc3RhcnRpbmcgaW5kZXggZnJvbSB3aGljaCB0byBsaW1pdCB0aGUgcmVzdWx0XG4gICAgICogQHBhcmFtIHRvIC0gVGhlIGxhc3QgaW5kZXggdG8gd2hpY2ggdG8gbGltaXQgdGhlIHJlc3VsdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLnJlZmVyZW5jZWRUYWJsZSAtIFNldCB0aGlzIHRvIGxpbWl0IHJvd3Mgb2YgcmVmZXJlbmNlZFxuICAgICAqIHRhYmxlcyBpbnN0ZWFkIG9mIHRoZSBwYXJlbnQgdGFibGVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5mb3JlaWduVGFibGUgLSBEZXByZWNhdGVkLCB1c2UgYG9wdGlvbnMucmVmZXJlbmNlZFRhYmxlYFxuICAgICAqIGluc3RlYWRcbiAgICAgKi9cbiAgICByYW5nZShmcm9tLCB0bywgeyBmb3JlaWduVGFibGUsIHJlZmVyZW5jZWRUYWJsZSA9IGZvcmVpZ25UYWJsZSwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGtleU9mZnNldCA9IHR5cGVvZiByZWZlcmVuY2VkVGFibGUgPT09ICd1bmRlZmluZWQnID8gJ29mZnNldCcgOiBgJHtyZWZlcmVuY2VkVGFibGV9Lm9mZnNldGA7XG4gICAgICAgIGNvbnN0IGtleUxpbWl0ID0gdHlwZW9mIHJlZmVyZW5jZWRUYWJsZSA9PT0gJ3VuZGVmaW5lZCcgPyAnbGltaXQnIDogYCR7cmVmZXJlbmNlZFRhYmxlfS5saW1pdGA7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5T2Zmc2V0LCBgJHtmcm9tfWApO1xuICAgICAgICAvLyBSYW5nZSBpcyBpbmNsdXNpdmUsIHNvIGFkZCAxXG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5TGltaXQsIGAke3RvIC0gZnJvbSArIDF9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIEFib3J0U2lnbmFsIGZvciB0aGUgZmV0Y2ggcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzaWduYWwgLSBUaGUgQWJvcnRTaWduYWwgdG8gdXNlIGZvciB0aGUgZmV0Y2ggcmVxdWVzdFxuICAgICAqL1xuICAgIGFib3J0U2lnbmFsKHNpZ25hbCkge1xuICAgICAgICB0aGlzLnNpZ25hbCA9IHNpZ25hbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBgZGF0YWAgYXMgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQgb2YgYW4gYXJyYXkgb2Ygb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIFF1ZXJ5IHJlc3VsdCBtdXN0IGJlIG9uZSByb3cgKGUuZy4gdXNpbmcgYC5saW1pdCgxKWApLCBvdGhlcndpc2UgdGhpc1xuICAgICAqIHJldHVybnMgYW4gZXJyb3IuXG4gICAgICovXG4gICAgc2luZ2xlKCkge1xuICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID0gJ2FwcGxpY2F0aW9uL3ZuZC5wZ3JzdC5vYmplY3QranNvbic7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYGRhdGFgIGFzIGEgc2luZ2xlIG9iamVjdCBpbnN0ZWFkIG9mIGFuIGFycmF5IG9mIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBRdWVyeSByZXN1bHQgbXVzdCBiZSB6ZXJvIG9yIG9uZSByb3cgKGUuZy4gdXNpbmcgYC5saW1pdCgxKWApLCBvdGhlcndpc2VcbiAgICAgKiB0aGlzIHJldHVybnMgYW4gZXJyb3IuXG4gICAgICovXG4gICAgbWF5YmVTaW5nbGUoKSB7XG4gICAgICAgIC8vIFRlbXBvcmFyeSBwYXJ0aWFsIGZpeCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3Bvc3RncmVzdC1qcy9pc3N1ZXMvMzYxXG4gICAgICAgIC8vIElzc3VlIHBlcnNpc3RzIGUuZy4gZm9yIGAuaW5zZXJ0KFsuLi5dKS5zZWxlY3QoKS5tYXliZVNpbmdsZSgpYFxuICAgICAgICBpZiAodGhpcy5tZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi92bmQucGdyc3Qub2JqZWN0K2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNNYXliZVNpbmdsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYGRhdGFgIGFzIGEgc3RyaW5nIGluIENTViBmb3JtYXQuXG4gICAgICovXG4gICAgY3N2KCkge1xuICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID0gJ3RleHQvY3N2JztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBgZGF0YWAgYXMgYW4gb2JqZWN0IGluIFtHZW9KU09OXShodHRwczovL2dlb2pzb24ub3JnKSBmb3JtYXQuXG4gICAgICovXG4gICAgZ2VvanNvbigpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9nZW8ranNvbic7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYGRhdGFgIGFzIHRoZSBFWFBMQUlOIHBsYW4gZm9yIHRoZSBxdWVyeS5cbiAgICAgKlxuICAgICAqIFlvdSBuZWVkIHRvIGVuYWJsZSB0aGVcbiAgICAgKiBbZGJfcGxhbl9lbmFibGVkXShodHRwczovL3N1cGFiYXNlLmNvbS9kb2NzL2d1aWRlcy9kYXRhYmFzZS9kZWJ1Z2dpbmctcGVyZm9ybWFuY2UjZW5hYmxpbmctZXhwbGFpbilcbiAgICAgKiBzZXR0aW5nIGJlZm9yZSB1c2luZyB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYW5hbHl6ZSAtIElmIGB0cnVlYCwgdGhlIHF1ZXJ5IHdpbGwgYmUgZXhlY3V0ZWQgYW5kIHRoZVxuICAgICAqIGFjdHVhbCBydW4gdGltZSB3aWxsIGJlIHJldHVybmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy52ZXJib3NlIC0gSWYgYHRydWVgLCB0aGUgcXVlcnkgaWRlbnRpZmllciB3aWxsIGJlIHJldHVybmVkXG4gICAgICogYW5kIGBkYXRhYCB3aWxsIGluY2x1ZGUgdGhlIG91dHB1dCBjb2x1bW5zIG9mIHRoZSBxdWVyeVxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuc2V0dGluZ3MgLSBJZiBgdHJ1ZWAsIGluY2x1ZGUgaW5mb3JtYXRpb24gb24gY29uZmlndXJhdGlvblxuICAgICAqIHBhcmFtZXRlcnMgdGhhdCBhZmZlY3QgcXVlcnkgcGxhbm5pbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmJ1ZmZlcnMgLSBJZiBgdHJ1ZWAsIGluY2x1ZGUgaW5mb3JtYXRpb24gb24gYnVmZmVyIHVzYWdlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy53YWwgLSBJZiBgdHJ1ZWAsIGluY2x1ZGUgaW5mb3JtYXRpb24gb24gV0FMIHJlY29yZCBnZW5lcmF0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5mb3JtYXQgLSBUaGUgZm9ybWF0IG9mIHRoZSBvdXRwdXQsIGNhbiBiZSBgXCJ0ZXh0XCJgIChkZWZhdWx0KVxuICAgICAqIG9yIGBcImpzb25cImBcbiAgICAgKi9cbiAgICBleHBsYWluKHsgYW5hbHl6ZSA9IGZhbHNlLCB2ZXJib3NlID0gZmFsc2UsIHNldHRpbmdzID0gZmFsc2UsIGJ1ZmZlcnMgPSBmYWxzZSwgd2FsID0gZmFsc2UsIGZvcm1hdCA9ICd0ZXh0JywgfSA9IHt9KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtcbiAgICAgICAgICAgIGFuYWx5emUgPyAnYW5hbHl6ZScgOiBudWxsLFxuICAgICAgICAgICAgdmVyYm9zZSA/ICd2ZXJib3NlJyA6IG51bGwsXG4gICAgICAgICAgICBzZXR0aW5ncyA/ICdzZXR0aW5ncycgOiBudWxsLFxuICAgICAgICAgICAgYnVmZmVycyA/ICdidWZmZXJzJyA6IG51bGwsXG4gICAgICAgICAgICB3YWwgPyAnd2FsJyA6IG51bGwsXG4gICAgICAgIF1cbiAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgICAgIC5qb2luKCd8Jyk7XG4gICAgICAgIC8vIEFuIEFjY2VwdCBoZWFkZXIgY2FuIGNhcnJ5IG11bHRpcGxlIG1lZGlhIHR5cGVzIGJ1dCBwb3N0Z3Jlc3QtanMgYWx3YXlzIHNlbmRzIG9uZVxuICAgICAgICBjb25zdCBmb3JNZWRpYXR5cGUgPSAoX2EgPSB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIHRoaXMuaGVhZGVyc1snQWNjZXB0J10gPSBgYXBwbGljYXRpb24vdm5kLnBncnN0LnBsYW4rJHtmb3JtYXR9OyBmb3I9XCIke2Zvck1lZGlhdHlwZX1cIjsgb3B0aW9ucz0ke29wdGlvbnN9O2A7XG4gICAgICAgIGlmIChmb3JtYXQgPT09ICdqc29uJylcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm9sbGJhY2sgdGhlIHF1ZXJ5LlxuICAgICAqXG4gICAgICogYGRhdGFgIHdpbGwgc3RpbGwgYmUgcmV0dXJuZWQsIGJ1dCB0aGUgcXVlcnkgaXMgbm90IGNvbW1pdHRlZC5cbiAgICAgKi9cbiAgICByb2xsYmFjaygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoKChfYSA9IHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnKS50cmltKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSArPSAnLHR4PXJvbGxiYWNrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1snUHJlZmVyJ10gPSAndHg9cm9sbGJhY2snO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgdHlwZSBvZiB0aGUgcmV0dXJuZWQgYGRhdGFgLlxuICAgICAqXG4gICAgICogQHR5cGVQYXJhbSBOZXdSZXN1bHQgLSBUaGUgbmV3IHJlc3VsdCB0eXBlIHRvIG92ZXJyaWRlIHdpdGhcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2Ugb3ZlcnJpZGVUeXBlczx5b3VyVHlwZSwgeyBtZXJnZTogZmFsc2UgfT4oKSBtZXRob2QgYXQgdGhlIGVuZCBvZiB5b3VyIGNhbGwgY2hhaW4gaW5zdGVhZFxuICAgICAqL1xuICAgIHJldHVybnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ERUZBVUxUX0hFQURFUlMgPSB2b2lkIDA7XG5jb25zdCB2ZXJzaW9uXzEgPSByZXF1aXJlKFwiLi92ZXJzaW9uXCIpO1xuZXhwb3J0cy5ERUZBVUxUX0hFQURFUlMgPSB7ICdYLUNsaWVudC1JbmZvJzogYHBvc3RncmVzdC1qcy8ke3ZlcnNpb25fMS52ZXJzaW9ufWAgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUG9zdGdyZXN0RXJyb3IgPSBleHBvcnRzLlBvc3RncmVzdEJ1aWxkZXIgPSBleHBvcnRzLlBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIgPSBleHBvcnRzLlBvc3RncmVzdEZpbHRlckJ1aWxkZXIgPSBleHBvcnRzLlBvc3RncmVzdFF1ZXJ5QnVpbGRlciA9IGV4cG9ydHMuUG9zdGdyZXN0Q2xpZW50ID0gdm9pZCAwO1xuLy8gQWx3YXlzIHVwZGF0ZSB3cmFwcGVyLm1qcyB3aGVuIHVwZGF0aW5nIHRoaXMgZmlsZS5cbmNvbnN0IFBvc3RncmVzdENsaWVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdENsaWVudFwiKSk7XG5leHBvcnRzLlBvc3RncmVzdENsaWVudCA9IFBvc3RncmVzdENsaWVudF8xLmRlZmF1bHQ7XG5jb25zdCBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RRdWVyeUJ1aWxkZXJcIikpO1xuZXhwb3J0cy5Qb3N0Z3Jlc3RRdWVyeUJ1aWxkZXIgPSBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXJfMS5kZWZhdWx0O1xuY29uc3QgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdEZpbHRlckJ1aWxkZXJcIikpO1xuZXhwb3J0cy5Qb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyID0gUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xLmRlZmF1bHQ7XG5jb25zdCBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlclwiKSk7XG5leHBvcnRzLlBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIgPSBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyXzEuZGVmYXVsdDtcbmNvbnN0IFBvc3RncmVzdEJ1aWxkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RCdWlsZGVyXCIpKTtcbmV4cG9ydHMuUG9zdGdyZXN0QnVpbGRlciA9IFBvc3RncmVzdEJ1aWxkZXJfMS5kZWZhdWx0O1xuY29uc3QgUG9zdGdyZXN0RXJyb3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RFcnJvclwiKSk7XG5leHBvcnRzLlBvc3RncmVzdEVycm9yID0gUG9zdGdyZXN0RXJyb3JfMS5kZWZhdWx0O1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICAgIFBvc3RncmVzdENsaWVudDogUG9zdGdyZXN0Q2xpZW50XzEuZGVmYXVsdCxcbiAgICBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXI6IFBvc3RncmVzdFF1ZXJ5QnVpbGRlcl8xLmRlZmF1bHQsXG4gICAgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcjogUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xLmRlZmF1bHQsXG4gICAgUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcjogUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcl8xLmRlZmF1bHQsXG4gICAgUG9zdGdyZXN0QnVpbGRlcjogUG9zdGdyZXN0QnVpbGRlcl8xLmRlZmF1bHQsXG4gICAgUG9zdGdyZXN0RXJyb3I6IFBvc3RncmVzdEVycm9yXzEuZGVmYXVsdCxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudmVyc2lvbiA9IHZvaWQgMDtcbmV4cG9ydHMudmVyc2lvbiA9ICcwLjAuMC1hdXRvbWF0ZWQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVyc2lvbi5qcy5tYXAiLCJpbXBvcnQgaW5kZXggZnJvbSAnLi4vY2pzL2luZGV4LmpzJ1xuY29uc3Qge1xuICBQb3N0Z3Jlc3RDbGllbnQsXG4gIFBvc3RncmVzdFF1ZXJ5QnVpbGRlcixcbiAgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcixcbiAgUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcixcbiAgUG9zdGdyZXN0QnVpbGRlcixcbiAgUG9zdGdyZXN0RXJyb3IsXG59ID0gaW5kZXhcblxuZXhwb3J0IHtcbiAgUG9zdGdyZXN0QnVpbGRlcixcbiAgUG9zdGdyZXN0Q2xpZW50LFxuICBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyLFxuICBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXIsXG4gIFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIsXG4gIFBvc3RncmVzdEVycm9yLFxufVxuXG4vLyBjb21wYXRpYmlsaXR5IHdpdGggQ0pTIG91dHB1dFxuZXhwb3J0IGRlZmF1bHQge1xuICBQb3N0Z3Jlc3RDbGllbnQsXG4gIFBvc3RncmVzdFF1ZXJ5QnVpbGRlcixcbiAgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcixcbiAgUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcixcbiAgUG9zdGdyZXN0QnVpbGRlcixcbiAgUG9zdGdyZXN0RXJyb3IsXG59XG4iLCJpbXBvcnQgeyBDSEFOTkVMX0VWRU5UUywgQ0hBTk5FTF9TVEFURVMgfSBmcm9tICcuL2xpYi9jb25zdGFudHMnO1xuaW1wb3J0IFB1c2ggZnJvbSAnLi9saWIvcHVzaCc7XG5pbXBvcnQgVGltZXIgZnJvbSAnLi9saWIvdGltZXInO1xuaW1wb3J0IFJlYWx0aW1lUHJlc2VuY2UgZnJvbSAnLi9SZWFsdGltZVByZXNlbmNlJztcbmltcG9ydCAqIGFzIFRyYW5zZm9ybWVycyBmcm9tICcuL2xpYi90cmFuc2Zvcm1lcnMnO1xuaW1wb3J0IHsgaHR0cEVuZHBvaW50VVJMIH0gZnJvbSAnLi9saWIvdHJhbnNmb3JtZXJzJztcbmV4cG9ydCB2YXIgUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlQ7XG4oZnVuY3Rpb24gKFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UKSB7XG4gICAgUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlRbXCJBTExcIl0gPSBcIipcIjtcbiAgICBSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVFtcIklOU0VSVFwiXSA9IFwiSU5TRVJUXCI7XG4gICAgUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlRbXCJVUERBVEVcIl0gPSBcIlVQREFURVwiO1xuICAgIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UW1wiREVMRVRFXCJdID0gXCJERUxFVEVcIjtcbn0pKFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UIHx8IChSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVCA9IHt9KSk7XG5leHBvcnQgdmFyIFJFQUxUSU1FX0xJU1RFTl9UWVBFUztcbihmdW5jdGlvbiAoUkVBTFRJTUVfTElTVEVOX1RZUEVTKSB7XG4gICAgUkVBTFRJTUVfTElTVEVOX1RZUEVTW1wiQlJPQURDQVNUXCJdID0gXCJicm9hZGNhc3RcIjtcbiAgICBSRUFMVElNRV9MSVNURU5fVFlQRVNbXCJQUkVTRU5DRVwiXSA9IFwicHJlc2VuY2VcIjtcbiAgICBSRUFMVElNRV9MSVNURU5fVFlQRVNbXCJQT1NUR1JFU19DSEFOR0VTXCJdID0gXCJwb3N0Z3Jlc19jaGFuZ2VzXCI7XG4gICAgUkVBTFRJTUVfTElTVEVOX1RZUEVTW1wiU1lTVEVNXCJdID0gXCJzeXN0ZW1cIjtcbn0pKFJFQUxUSU1FX0xJU1RFTl9UWVBFUyB8fCAoUkVBTFRJTUVfTElTVEVOX1RZUEVTID0ge30pKTtcbmV4cG9ydCB2YXIgUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUztcbihmdW5jdGlvbiAoUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUykge1xuICAgIFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVNbXCJTVUJTQ1JJQkVEXCJdID0gXCJTVUJTQ1JJQkVEXCI7XG4gICAgUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFU1tcIlRJTUVEX09VVFwiXSA9IFwiVElNRURfT1VUXCI7XG4gICAgUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFU1tcIkNMT1NFRFwiXSA9IFwiQ0xPU0VEXCI7XG4gICAgUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFU1tcIkNIQU5ORUxfRVJST1JcIl0gPSBcIkNIQU5ORUxfRVJST1JcIjtcbn0pKFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMgfHwgKFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IFJFQUxUSU1FX0NIQU5ORUxfU1RBVEVTID0gQ0hBTk5FTF9TVEFURVM7XG4vKiogQSBjaGFubmVsIGlzIHRoZSBiYXNpYyBidWlsZGluZyBibG9jayBvZiBSZWFsdGltZVxuICogYW5kIG5hcnJvd3MgdGhlIHNjb3BlIG9mIGRhdGEgZmxvdyB0byBzdWJzY3JpYmVkIGNsaWVudHMuXG4gKiBZb3UgY2FuIHRoaW5rIG9mIGEgY2hhbm5lbCBhcyBhIGNoYXRyb29tIHdoZXJlIHBhcnRpY2lwYW50cyBhcmUgYWJsZSB0byBzZWUgd2hvJ3Mgb25saW5lXG4gKiBhbmQgc2VuZCBhbmQgcmVjZWl2ZSBtZXNzYWdlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVhbHRpbWVDaGFubmVsIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAvKiogVG9waWMgbmFtZSBjYW4gYmUgYW55IHN0cmluZy4gKi9cbiAgICB0b3BpYywgcGFyYW1zID0geyBjb25maWc6IHt9IH0sIHNvY2tldCkge1xuICAgICAgICB0aGlzLnRvcGljID0gdG9waWM7XG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgICAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICAgICAgdGhpcy5iaW5kaW5ncyA9IHt9O1xuICAgICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkO1xuICAgICAgICB0aGlzLmpvaW5lZE9uY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wdXNoQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuc3ViVG9waWMgPSB0b3BpYy5yZXBsYWNlKC9ecmVhbHRpbWU6L2ksICcnKTtcbiAgICAgICAgdGhpcy5wYXJhbXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBicm9hZGNhc3Q6IHsgYWNrOiBmYWxzZSwgc2VsZjogZmFsc2UgfSxcbiAgICAgICAgICAgIHByZXNlbmNlOiB7IGtleTogJycgfSxcbiAgICAgICAgICAgIHByaXZhdGU6IGZhbHNlLFxuICAgICAgICB9LCBwYXJhbXMuY29uZmlnKTtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGhpcy5zb2NrZXQudGltZW91dDtcbiAgICAgICAgdGhpcy5qb2luUHVzaCA9IG5ldyBQdXNoKHRoaXMsIENIQU5ORUxfRVZFTlRTLmpvaW4sIHRoaXMucGFyYW1zLCB0aGlzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLnJlam9pblRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHRoaXMuX3Jlam9pblVudGlsQ29ubmVjdGVkKCksIHRoaXMuc29ja2V0LnJlY29ubmVjdEFmdGVyTXMpO1xuICAgICAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoJ29rJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5lZDtcbiAgICAgICAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMucHVzaEJ1ZmZlci5mb3JFYWNoKChwdXNoRXZlbnQpID0+IHB1c2hFdmVudC5zZW5kKCkpO1xuICAgICAgICAgICAgdGhpcy5wdXNoQnVmZmVyID0gW107XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vbkNsb3NlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmxvZygnY2hhbm5lbCcsIGBjbG9zZSAke3RoaXMudG9waWN9ICR7dGhpcy5fam9pblJlZigpfWApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmNsb3NlZDtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Ll9yZW1vdmUodGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vbkVycm9yKChyZWFzb24pID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0xlYXZpbmcoKSB8fCB0aGlzLl9pc0Nsb3NlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zb2NrZXQubG9nKCdjaGFubmVsJywgYGVycm9yICR7dGhpcy50b3BpY31gLCByZWFzb24pO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmVycm9yZWQ7XG4gICAgICAgICAgICB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKCd0aW1lb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0pvaW5pbmcoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmxvZygnY2hhbm5lbCcsIGB0aW1lb3V0ICR7dGhpcy50b3BpY31gLCB0aGlzLmpvaW5QdXNoLnRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmVycm9yZWQ7XG4gICAgICAgICAgICB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb24oQ0hBTk5FTF9FVkVOVFMucmVwbHksIHt9LCAocGF5bG9hZCwgcmVmKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyKHRoaXMuX3JlcGx5RXZlbnROYW1lKHJlZiksIHBheWxvYWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcmVzZW5jZSA9IG5ldyBSZWFsdGltZVByZXNlbmNlKHRoaXMpO1xuICAgICAgICB0aGlzLmJyb2FkY2FzdEVuZHBvaW50VVJMID1cbiAgICAgICAgICAgIGh0dHBFbmRwb2ludFVSTCh0aGlzLnNvY2tldC5lbmRQb2ludCkgKyAnL2FwaS9icm9hZGNhc3QnO1xuICAgICAgICB0aGlzLnByaXZhdGUgPSB0aGlzLnBhcmFtcy5jb25maWcucHJpdmF0ZSB8fCBmYWxzZTtcbiAgICB9XG4gICAgLyoqIFN1YnNjcmliZSByZWdpc3RlcnMgeW91ciBjbGllbnQgd2l0aCB0aGUgc2VydmVyICovXG4gICAgc3Vic2NyaWJlKGNhbGxiYWNrLCB0aW1lb3V0ID0gdGhpcy50aW1lb3V0KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICghdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmpvaW5lZE9uY2UpIHtcbiAgICAgICAgICAgIHRocm93IGB0cmllZCB0byBzdWJzY3JpYmUgbXVsdGlwbGUgdGltZXMuICdzdWJzY3JpYmUnIGNhbiBvbmx5IGJlIGNhbGxlZCBhIHNpbmdsZSB0aW1lIHBlciBjaGFubmVsIGluc3RhbmNlYDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29uZmlnOiB7IGJyb2FkY2FzdCwgcHJlc2VuY2UsIHByaXZhdGU6IGlzUHJpdmF0ZSB9LCB9ID0gdGhpcy5wYXJhbXM7XG4gICAgICAgICAgICB0aGlzLl9vbkVycm9yKChlKSA9PiBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FsbGJhY2soUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUy5DSEFOTkVMX0VSUk9SLCBlKSk7XG4gICAgICAgICAgICB0aGlzLl9vbkNsb3NlKCgpID0+IGNhbGxiYWNrID09PSBudWxsIHx8IGNhbGxiYWNrID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYWxsYmFjayhSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTLkNMT1NFRCkpO1xuICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW5QYXlsb2FkID0ge307XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgYnJvYWRjYXN0LFxuICAgICAgICAgICAgICAgIHByZXNlbmNlLFxuICAgICAgICAgICAgICAgIHBvc3RncmVzX2NoYW5nZXM6IChfYiA9IChfYSA9IHRoaXMuYmluZGluZ3MucG9zdGdyZXNfY2hhbmdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1hcCgocikgPT4gci5maWx0ZXIpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBbXSxcbiAgICAgICAgICAgICAgICBwcml2YXRlOiBpc1ByaXZhdGUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuc29ja2V0LmFjY2Vzc1Rva2VuVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlblBheWxvYWQuYWNjZXNzX3Rva2VuID0gdGhpcy5zb2NrZXQuYWNjZXNzVG9rZW5WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlSm9pblBheWxvYWQoT2JqZWN0LmFzc2lnbih7IGNvbmZpZyB9LCBhY2Nlc3NUb2tlblBheWxvYWQpKTtcbiAgICAgICAgICAgIHRoaXMuam9pbmVkT25jZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9yZWpvaW4odGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLmpvaW5QdXNoXG4gICAgICAgICAgICAgICAgLnJlY2VpdmUoJ29rJywgYXN5bmMgKHsgcG9zdGdyZXNfY2hhbmdlcyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0LnNldEF1dGgoKTtcbiAgICAgICAgICAgICAgICBpZiAocG9zdGdyZXNfY2hhbmdlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID09PSBudWxsIHx8IGNhbGxiYWNrID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYWxsYmFjayhSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTLlNVQlNDUklCRUQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGllbnRQb3N0Z3Jlc0JpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5wb3N0Z3Jlc19jaGFuZ2VzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiaW5kaW5nc0xlbiA9IChfYSA9IGNsaWVudFBvc3RncmVzQmluZGluZ3MgPT09IG51bGwgfHwgY2xpZW50UG9zdGdyZXNCaW5kaW5ncyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2xpZW50UG9zdGdyZXNCaW5kaW5ncy5sZW5ndGgpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Bvc3RncmVzQmluZGluZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kaW5nc0xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGllbnRQb3N0Z3Jlc0JpbmRpbmcgPSBjbGllbnRQb3N0Z3Jlc0JpbmRpbmdzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBmaWx0ZXI6IHsgZXZlbnQsIHNjaGVtYSwgdGFibGUsIGZpbHRlciB9LCB9ID0gY2xpZW50UG9zdGdyZXNCaW5kaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VydmVyUG9zdGdyZXNGaWx0ZXIgPSBwb3N0Z3Jlc19jaGFuZ2VzICYmIHBvc3RncmVzX2NoYW5nZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmVyUG9zdGdyZXNGaWx0ZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlci5ldmVudCA9PT0gZXZlbnQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlci5zY2hlbWEgPT09IHNjaGVtYSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBvc3RncmVzRmlsdGVyLnRhYmxlID09PSB0YWJsZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBvc3RncmVzRmlsdGVyLmZpbHRlciA9PT0gZmlsdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zdGdyZXNCaW5kaW5ncy5wdXNoKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY2xpZW50UG9zdGdyZXNCaW5kaW5nKSwgeyBpZDogc2VydmVyUG9zdGdyZXNGaWx0ZXIuaWQgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID09PSBudWxsIHx8IGNhbGxiYWNrID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYWxsYmFjayhSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTLkNIQU5ORUxfRVJST1IsIG5ldyBFcnJvcignbWlzbWF0Y2ggYmV0d2VlbiBzZXJ2ZXIgYW5kIGNsaWVudCBiaW5kaW5ncyBmb3IgcG9zdGdyZXMgY2hhbmdlcycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kaW5ncy5wb3N0Z3Jlc19jaGFuZ2VzID0gbmV3UG9zdGdyZXNCaW5kaW5ncztcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUy5TVUJTQ1JJQkVEKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnJlY2VpdmUoJ2Vycm9yJywgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbGxiYWNrKFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMuQ0hBTk5FTF9FUlJPUiwgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KE9iamVjdC52YWx1ZXMoZXJyb3IpLmpvaW4oJywgJykgfHwgJ2Vycm9yJykpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5yZWNlaXZlKCd0aW1lb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID09PSBudWxsIHx8IGNhbGxiYWNrID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYWxsYmFjayhSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTLlRJTUVEX09VVCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHByZXNlbmNlU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByZXNlbmNlLnN0YXRlO1xuICAgIH1cbiAgICBhc3luYyB0cmFjayhwYXlsb2FkLCBvcHRzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VuZCh7XG4gICAgICAgICAgICB0eXBlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXZlbnQ6ICd0cmFjaycsXG4gICAgICAgICAgICBwYXlsb2FkLFxuICAgICAgICB9LCBvcHRzLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0KTtcbiAgICB9XG4gICAgYXN5bmMgdW50cmFjayhvcHRzID0ge30pIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2VuZCh7XG4gICAgICAgICAgICB0eXBlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXZlbnQ6ICd1bnRyYWNrJyxcbiAgICAgICAgfSwgb3B0cyk7XG4gICAgfVxuICAgIG9uKHR5cGUsIGZpbHRlciwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uKHR5cGUsIGZpbHRlciwgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UgaW50byB0aGUgY2hhbm5lbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcmdzIEFyZ3VtZW50cyB0byBzZW5kIHRvIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0gYXJncy50eXBlIFRoZSB0eXBlIG9mIGV2ZW50IHRvIHNlbmRcbiAgICAgKiBAcGFyYW0gYXJncy5ldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgYmVpbmcgc2VudFxuICAgICAqIEBwYXJhbSBhcmdzLnBheWxvYWQgUGF5bG9hZCB0byBiZSBzZW50XG4gICAgICogQHBhcmFtIG9wdHMgT3B0aW9ucyB0byBiZSB1c2VkIGR1cmluZyB0aGUgc2VuZCBwcm9jZXNzXG4gICAgICovXG4gICAgYXN5bmMgc2VuZChhcmdzLCBvcHRzID0ge30pIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKCF0aGlzLl9jYW5QdXNoKCkgJiYgYXJncy50eXBlID09PSAnYnJvYWRjYXN0Jykge1xuICAgICAgICAgICAgY29uc3QgeyBldmVudCwgcGF5bG9hZDogZW5kcG9pbnRfcGF5bG9hZCB9ID0gYXJncztcbiAgICAgICAgICAgIGNvbnN0IGF1dGhvcml6YXRpb24gPSB0aGlzLnNvY2tldC5hY2Nlc3NUb2tlblZhbHVlXG4gICAgICAgICAgICAgICAgPyBgQmVhcmVyICR7dGhpcy5zb2NrZXQuYWNjZXNzVG9rZW5WYWx1ZX1gXG4gICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBhdXRob3JpemF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBhcGlrZXk6IHRoaXMuc29ja2V0LmFwaUtleSA/IHRoaXMuc29ja2V0LmFwaUtleSA6ICcnLFxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcGljOiB0aGlzLnN1YlRvcGljLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQ6IGVuZHBvaW50X3BheWxvYWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZTogdGhpcy5wcml2YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5fZmV0Y2hXaXRoVGltZW91dCh0aGlzLmJyb2FkY2FzdEVuZHBvaW50VVJMLCBvcHRpb25zLCAoX2EgPSBvcHRzLnRpbWVvdXQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgKChfYiA9IHJlc3BvbnNlLmJvZHkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYW5jZWwoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rID8gJ29rJyA6ICdlcnJvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IubmFtZSA9PT0gJ0Fib3J0RXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndGltZWQgb3V0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgICAgIGNvbnN0IHB1c2ggPSB0aGlzLl9wdXNoKGFyZ3MudHlwZSwgYXJncywgb3B0cy50aW1lb3V0IHx8IHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MudHlwZSA9PT0gJ2Jyb2FkY2FzdCcgJiYgISgoX2MgPSAoX2IgPSAoX2EgPSB0aGlzLnBhcmFtcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbmZpZykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmJyb2FkY2FzdCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmFjaykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnb2snKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHVzaC5yZWNlaXZlKCdvaycsICgpID0+IHJlc29sdmUoJ29rJykpO1xuICAgICAgICAgICAgICAgIHB1c2gucmVjZWl2ZSgnZXJyb3InLCAoKSA9PiByZXNvbHZlKCdlcnJvcicpKTtcbiAgICAgICAgICAgICAgICBwdXNoLnJlY2VpdmUoJ3RpbWVvdXQnLCAoKSA9PiByZXNvbHZlKCd0aW1lZCBvdXQnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVKb2luUGF5bG9hZChwYXlsb2FkKSB7XG4gICAgICAgIHRoaXMuam9pblB1c2gudXBkYXRlUGF5bG9hZChwYXlsb2FkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGVhdmVzIHRoZSBjaGFubmVsLlxuICAgICAqXG4gICAgICogVW5zdWJzY3JpYmVzIGZyb20gc2VydmVyIGV2ZW50cywgYW5kIGluc3RydWN0cyBjaGFubmVsIHRvIHRlcm1pbmF0ZSBvbiBzZXJ2ZXIuXG4gICAgICogVHJpZ2dlcnMgb25DbG9zZSgpIGhvb2tzLlxuICAgICAqXG4gICAgICogVG8gcmVjZWl2ZSBsZWF2ZSBhY2tub3dsZWRnZW1lbnRzLCB1c2UgdGhlIGEgYHJlY2VpdmVgIGhvb2sgdG8gYmluZCB0byB0aGUgc2VydmVyIGFjaywgaWU6XG4gICAgICogY2hhbm5lbC51bnN1YnNjcmliZSgpLnJlY2VpdmUoXCJva1wiLCAoKSA9PiBhbGVydChcImxlZnQhXCIpIClcbiAgICAgKi9cbiAgICB1bnN1YnNjcmliZSh0aW1lb3V0ID0gdGhpcy50aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5sZWF2aW5nO1xuICAgICAgICBjb25zdCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQubG9nKCdjaGFubmVsJywgYGxlYXZlICR7dGhpcy50b3BpY31gKTtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIoQ0hBTk5FTF9FVkVOVFMuY2xvc2UsICdsZWF2ZScsIHRoaXMuX2pvaW5SZWYoKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKTtcbiAgICAgICAgLy8gRGVzdHJveSBqb2luUHVzaCB0byBhdm9pZCBjb25uZWN0aW9uIHRpbWVvdXRzIGR1cmluZyB1bnNjcmlwdGlvbiBwaGFzZVxuICAgICAgICB0aGlzLmpvaW5QdXNoLmRlc3Ryb3koKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwge30sIHRpbWVvdXQpO1xuICAgICAgICAgICAgbGVhdmVQdXNoXG4gICAgICAgICAgICAgICAgLnJlY2VpdmUoJ29rJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCdvaycpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAucmVjZWl2ZSgndGltZW91dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgndGltZWQgb3V0Jyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5yZWNlaXZlKCdlcnJvcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCdlcnJvcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZWF2ZVB1c2guc2VuZCgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYW5QdXNoKCkpIHtcbiAgICAgICAgICAgICAgICBsZWF2ZVB1c2gudHJpZ2dlcignb2snLCB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgYXN5bmMgX2ZldGNoV2l0aFRpbWVvdXQodXJsLCBvcHRpb25zLCB0aW1lb3V0KSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgIGNvbnN0IGlkID0gc2V0VGltZW91dCgoKSA9PiBjb250cm9sbGVyLmFib3J0KCksIHRpbWVvdXQpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuc29ja2V0LmZldGNoKHVybCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH0pKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX3B1c2goZXZlbnQsIHBheWxvYWQsIHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmpvaW5lZE9uY2UpIHtcbiAgICAgICAgICAgIHRocm93IGB0cmllZCB0byBwdXNoICcke2V2ZW50fScgdG8gJyR7dGhpcy50b3BpY30nIGJlZm9yZSBqb2luaW5nLiBVc2UgY2hhbm5lbC5zdWJzY3JpYmUoKSBiZWZvcmUgcHVzaGluZyBldmVudHNgO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwdXNoRXZlbnQgPSBuZXcgUHVzaCh0aGlzLCBldmVudCwgcGF5bG9hZCwgdGltZW91dCk7XG4gICAgICAgIGlmICh0aGlzLl9jYW5QdXNoKCkpIHtcbiAgICAgICAgICAgIHB1c2hFdmVudC5zZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwdXNoRXZlbnQuc3RhcnRUaW1lb3V0KCk7XG4gICAgICAgICAgICB0aGlzLnB1c2hCdWZmZXIucHVzaChwdXNoRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwdXNoRXZlbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRhYmxlIG1lc3NhZ2UgaG9va1xuICAgICAqXG4gICAgICogUmVjZWl2ZXMgYWxsIGV2ZW50cyBmb3Igc3BlY2lhbGl6ZWQgbWVzc2FnZSBoYW5kbGluZyBiZWZvcmUgZGlzcGF0Y2hpbmcgdG8gdGhlIGNoYW5uZWwgY2FsbGJhY2tzLlxuICAgICAqIE11c3QgcmV0dXJuIHRoZSBwYXlsb2FkLCBtb2RpZmllZCBvciB1bm1vZGlmaWVkLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgX29uTWVzc2FnZShfZXZlbnQsIHBheWxvYWQsIF9yZWYpIHtcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfaXNNZW1iZXIodG9waWMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9waWMgPT09IHRvcGljO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX2pvaW5SZWYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmpvaW5QdXNoLnJlZjtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF90cmlnZ2VyKHR5cGUsIHBheWxvYWQsIHJlZikge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCB0eXBlTG93ZXIgPSB0eXBlLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IHsgY2xvc2UsIGVycm9yLCBsZWF2ZSwgam9pbiB9ID0gQ0hBTk5FTF9FVkVOVFM7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IFtjbG9zZSwgZXJyb3IsIGxlYXZlLCBqb2luXTtcbiAgICAgICAgaWYgKHJlZiAmJiBldmVudHMuaW5kZXhPZih0eXBlTG93ZXIpID49IDAgJiYgcmVmICE9PSB0aGlzLl9qb2luUmVmKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaGFuZGxlZFBheWxvYWQgPSB0aGlzLl9vbk1lc3NhZ2UodHlwZUxvd2VyLCBwYXlsb2FkLCByZWYpO1xuICAgICAgICBpZiAocGF5bG9hZCAmJiAhaGFuZGxlZFBheWxvYWQpIHtcbiAgICAgICAgICAgIHRocm93ICdjaGFubmVsIG9uTWVzc2FnZSBjYWxsYmFja3MgbXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWQnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChbJ2luc2VydCcsICd1cGRhdGUnLCAnZGVsZXRlJ10uaW5jbHVkZXModHlwZUxvd2VyKSkge1xuICAgICAgICAgICAgKF9hID0gdGhpcy5iaW5kaW5ncy5wb3N0Z3Jlc19jaGFuZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZmlsdGVyKChiaW5kKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoKF9hID0gYmluZC5maWx0ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ldmVudCkgPT09ICcqJyB8fFxuICAgICAgICAgICAgICAgICAgICAoKF9jID0gKF9iID0gYmluZC5maWx0ZXIpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5ldmVudCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnRvTG9jYWxlTG93ZXJDYXNlKCkpID09PSB0eXBlTG93ZXIpO1xuICAgICAgICAgICAgfSkubWFwKChiaW5kKSA9PiBiaW5kLmNhbGxiYWNrKGhhbmRsZWRQYXlsb2FkLCByZWYpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIChfYiA9IHRoaXMuYmluZGluZ3NbdHlwZUxvd2VyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mO1xuICAgICAgICAgICAgICAgIGlmIChbJ2Jyb2FkY2FzdCcsICdwcmVzZW5jZScsICdwb3N0Z3Jlc19jaGFuZ2VzJ10uaW5jbHVkZXModHlwZUxvd2VyKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ2lkJyBpbiBiaW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiaW5kSWQgPSBiaW5kLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmluZEV2ZW50ID0gKF9hID0gYmluZC5maWx0ZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ldmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoYmluZElkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKChfYiA9IHBheWxvYWQuaWRzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaW5jbHVkZXMoYmluZElkKSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmluZEV2ZW50ID09PSAnKicgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJpbmRFdmVudCA9PT0gbnVsbCB8fCBiaW5kRXZlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJpbmRFdmVudC50b0xvY2FsZUxvd2VyQ2FzZSgpKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoX2MgPSBwYXlsb2FkLmRhdGEpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50eXBlLnRvTG9jYWxlTG93ZXJDYXNlKCkpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiaW5kRXZlbnQgPSAoX2UgPSAoX2QgPSBiaW5kID09PSBudWxsIHx8IGJpbmQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJpbmQuZmlsdGVyKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuZXZlbnQpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChiaW5kRXZlbnQgPT09ICcqJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRFdmVudCA9PT0gKChfZiA9IHBheWxvYWQgPT09IG51bGwgfHwgcGF5bG9hZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGF5bG9hZC5ldmVudCkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnRvTG9jYWxlTG93ZXJDYXNlKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJpbmQudHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpID09PSB0eXBlTG93ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkubWFwKChiaW5kKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVkUGF5bG9hZCA9PT0gJ29iamVjdCcgJiYgJ2lkcycgaW4gaGFuZGxlZFBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zdGdyZXNDaGFuZ2VzID0gaGFuZGxlZFBheWxvYWQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzY2hlbWEsIHRhYmxlLCBjb21taXRfdGltZXN0YW1wLCB0eXBlLCBlcnJvcnMgfSA9IHBvc3RncmVzQ2hhbmdlcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5yaWNoZWRQYXlsb2FkID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hOiBzY2hlbWEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZTogdGFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21taXRfdGltZXN0YW1wOiBjb21taXRfdGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3OiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnM6IGVycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlZFBheWxvYWQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGVucmljaGVkUGF5bG9hZCksIHRoaXMuX2dldFBheWxvYWRSZWNvcmRzKHBvc3RncmVzQ2hhbmdlcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBiaW5kLmNhbGxiYWNrKGhhbmRsZWRQYXlsb2FkLCByZWYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9pc0Nsb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmNsb3NlZDtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9pc0pvaW5lZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmpvaW5lZDtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9pc0pvaW5pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5qb2luaW5nO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX2lzTGVhdmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmxlYXZpbmc7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfcmVwbHlFdmVudE5hbWUocmVmKSB7XG4gICAgICAgIHJldHVybiBgY2hhbl9yZXBseV8ke3JlZn1gO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX29uKHR5cGUsIGZpbHRlciwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgdHlwZUxvd2VyID0gdHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBiaW5kaW5nID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZUxvd2VyLFxuICAgICAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmJpbmRpbmdzW3R5cGVMb3dlcl0pIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3NbdHlwZUxvd2VyXS5wdXNoKGJpbmRpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nc1t0eXBlTG93ZXJdID0gW2JpbmRpbmddO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX29mZih0eXBlLCBmaWx0ZXIpIHtcbiAgICAgICAgY29uc3QgdHlwZUxvd2VyID0gdHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICB0aGlzLmJpbmRpbmdzW3R5cGVMb3dlcl0gPSB0aGlzLmJpbmRpbmdzW3R5cGVMb3dlcl0uZmlsdGVyKChiaW5kKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICByZXR1cm4gISgoKF9hID0gYmluZC50eXBlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9Mb2NhbGVMb3dlckNhc2UoKSkgPT09IHR5cGVMb3dlciAmJlxuICAgICAgICAgICAgICAgIFJlYWx0aW1lQ2hhbm5lbC5pc0VxdWFsKGJpbmQuZmlsdGVyLCBmaWx0ZXIpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgc3RhdGljIGlzRXF1YWwob2JqMSwgb2JqMikge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMob2JqMSkubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhvYmoyKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gb2JqMSkge1xuICAgICAgICAgICAgaWYgKG9iajFba10gIT09IG9iajJba10pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfcmVqb2luVW50aWxDb25uZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCk7XG4gICAgICAgIGlmICh0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWpvaW4oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2hhbm5lbCBjbG9zZXMuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBfb25DbG9zZShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9vbihDSEFOTkVMX0VWRU5UUy5jbG9zZSwge30sIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNoYW5uZWwgZW5jb3VudGVyZXMgYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBfb25FcnJvcihjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9vbihDSEFOTkVMX0VWRU5UUy5lcnJvciwge30sIChyZWFzb24pID0+IGNhbGxiYWNrKHJlYXNvbikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc29ja2V0IGlzIGNvbm5lY3RlZCBhbmQgdGhlIGNoYW5uZWwgaGFzIGJlZW4gam9pbmVkLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgX2NhblB1c2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpICYmIHRoaXMuX2lzSm9pbmVkKCk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfcmVqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzTGVhdmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb2NrZXQuX2xlYXZlT3BlblRvcGljKHRoaXMudG9waWMpO1xuICAgICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmluZztcbiAgICAgICAgdGhpcy5qb2luUHVzaC5yZXNlbmQodGltZW91dCk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfZ2V0UGF5bG9hZFJlY29yZHMocGF5bG9hZCkge1xuICAgICAgICBjb25zdCByZWNvcmRzID0ge1xuICAgICAgICAgICAgbmV3OiB7fSxcbiAgICAgICAgICAgIG9sZDoge30sXG4gICAgICAgIH07XG4gICAgICAgIGlmIChwYXlsb2FkLnR5cGUgPT09ICdJTlNFUlQnIHx8IHBheWxvYWQudHlwZSA9PT0gJ1VQREFURScpIHtcbiAgICAgICAgICAgIHJlY29yZHMubmV3ID0gVHJhbnNmb3JtZXJzLmNvbnZlcnRDaGFuZ2VEYXRhKHBheWxvYWQuY29sdW1ucywgcGF5bG9hZC5yZWNvcmQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLnR5cGUgPT09ICdVUERBVEUnIHx8IHBheWxvYWQudHlwZSA9PT0gJ0RFTEVURScpIHtcbiAgICAgICAgICAgIHJlY29yZHMub2xkID0gVHJhbnNmb3JtZXJzLmNvbnZlcnRDaGFuZ2VEYXRhKHBheWxvYWQuY29sdW1ucywgcGF5bG9hZC5vbGRfcmVjb3JkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjb3JkcztcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWFsdGltZUNoYW5uZWwuanMubWFwIiwiaW1wb3J0IHsgQ0hBTk5FTF9FVkVOVFMsIENPTk5FQ1RJT05fU1RBVEUsIERFRkFVTFRfSEVBREVSUywgREVGQVVMVF9USU1FT1VULCBTT0NLRVRfU1RBVEVTLCBUUkFOU1BPUlRTLCBWU04sIFdTX0NMT1NFX05PUk1BTCwgfSBmcm9tICcuL2xpYi9jb25zdGFudHMnO1xuaW1wb3J0IFNlcmlhbGl6ZXIgZnJvbSAnLi9saWIvc2VyaWFsaXplcic7XG5pbXBvcnQgVGltZXIgZnJvbSAnLi9saWIvdGltZXInO1xuaW1wb3J0IHsgaHR0cEVuZHBvaW50VVJMIH0gZnJvbSAnLi9saWIvdHJhbnNmb3JtZXJzJztcbmltcG9ydCBSZWFsdGltZUNoYW5uZWwgZnJvbSAnLi9SZWFsdGltZUNoYW5uZWwnO1xuY29uc3Qgbm9vcCA9ICgpID0+IHsgfTtcbmNvbnN0IE5BVElWRV9XRUJTT0NLRVRfQVZBSUxBQkxFID0gdHlwZW9mIFdlYlNvY2tldCAhPT0gJ3VuZGVmaW5lZCc7XG5jb25zdCBXT1JLRVJfU0NSSVBUID0gYFxuICBhZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZSkgPT4ge1xuICAgIGlmIChlLmRhdGEuZXZlbnQgPT09IFwic3RhcnRcIikge1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gcG9zdE1lc3NhZ2UoeyBldmVudDogXCJrZWVwQWxpdmVcIiB9KSwgZS5kYXRhLmludGVydmFsKTtcbiAgICB9XG4gIH0pO2A7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFsdGltZUNsaWVudCB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIFNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbmRQb2ludCBUaGUgc3RyaW5nIFdlYlNvY2tldCBlbmRwb2ludCwgaWUsIFwid3M6Ly9leGFtcGxlLmNvbS9zb2NrZXRcIiwgXCJ3c3M6Ly9leGFtcGxlLmNvbVwiLCBcIi9zb2NrZXRcIiAoaW5oZXJpdGVkIGhvc3QgJiBwcm90b2NvbClcbiAgICAgKiBAcGFyYW0gaHR0cEVuZHBvaW50IFRoZSBzdHJpbmcgSFRUUCBlbmRwb2ludCwgaWUsIFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLCBcIi9cIiAoaW5oZXJpdGVkIGhvc3QgJiBwcm90b2NvbClcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50cmFuc3BvcnQgVGhlIFdlYnNvY2tldCBUcmFuc3BvcnQsIGZvciBleGFtcGxlIFdlYlNvY2tldC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50aW1lb3V0IFRoZSBkZWZhdWx0IHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIHRyaWdnZXIgcHVzaCB0aW1lb3V0cy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5wYXJhbXMgVGhlIG9wdGlvbmFsIHBhcmFtcyB0byBwYXNzIHdoZW4gY29ubmVjdGluZy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5oZWFkZXJzIFRoZSBvcHRpb25hbCBoZWFkZXJzIHRvIHBhc3Mgd2hlbiBjb25uZWN0aW5nLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmhlYXJ0YmVhdEludGVydmFsTXMgVGhlIG1pbGxpc2VjIGludGVydmFsIHRvIHNlbmQgYSBoZWFydGJlYXQgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5sb2dnZXIgVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLCBpZTogbG9nZ2VyOiAoa2luZCwgbXNnLCBkYXRhKSA9PiB7IGNvbnNvbGUubG9nKGAke2tpbmR9OiAke21zZ31gLCBkYXRhKSB9XG4gICAgICogQHBhcmFtIG9wdGlvbnMuZW5jb2RlIFRoZSBmdW5jdGlvbiB0byBlbmNvZGUgb3V0Z29pbmcgbWVzc2FnZXMuIERlZmF1bHRzIHRvIEpTT046IChwYXlsb2FkLCBjYWxsYmFjaykgPT4gY2FsbGJhY2soSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZGVjb2RlIFRoZSBmdW5jdGlvbiB0byBkZWNvZGUgaW5jb21pbmcgbWVzc2FnZXMuIERlZmF1bHRzIHRvIFNlcmlhbGl6ZXIncyBkZWNvZGUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVjb25uZWN0QWZ0ZXJNcyBoZSBvcHRpb25hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG1pbGxzZWMgcmVjb25uZWN0IGludGVydmFsLiBEZWZhdWx0cyB0byBzdGVwcGVkIGJhY2tvZmYgb2ZmLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLndvcmtlciBVc2UgV2ViIFdvcmtlciB0byBzZXQgYSBzaWRlIGZsb3cuIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLndvcmtlclVybCBUaGUgVVJMIG9mIHRoZSB3b3JrZXIgc2NyaXB0LiBEZWZhdWx0cyB0byBodHRwczovL3JlYWx0aW1lLnN1cGFiYXNlLmNvbS93b3JrZXIuanMgdGhhdCBpbmNsdWRlcyBhIGhlYXJ0YmVhdCBldmVudCBjYWxsIHRvIGtlZXAgdGhlIGNvbm5lY3Rpb24gYWxpdmUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZW5kUG9pbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuVmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLmFwaUtleSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hhbm5lbHMgPSBbXTtcbiAgICAgICAgdGhpcy5lbmRQb2ludCA9ICcnO1xuICAgICAgICB0aGlzLmh0dHBFbmRwb2ludCA9ICcnO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBERUZBVUxUX0hFQURFUlM7XG4gICAgICAgIHRoaXMucGFyYW1zID0ge307XG4gICAgICAgIHRoaXMudGltZW91dCA9IERFRkFVTFRfVElNRU9VVDtcbiAgICAgICAgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zID0gMzAwMDA7XG4gICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGw7XG4gICAgICAgIHRoaXMucmVmID0gMDtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBub29wO1xuICAgICAgICB0aGlzLmNvbm4gPSBudWxsO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZXJpYWxpemVyID0gbmV3IFNlcmlhbGl6ZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyA9IHtcbiAgICAgICAgICAgIG9wZW46IFtdLFxuICAgICAgICAgICAgY2xvc2U6IFtdLFxuICAgICAgICAgICAgZXJyb3I6IFtdLFxuICAgICAgICAgICAgbWVzc2FnZTogW10sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogVXNlIGVpdGhlciBjdXN0b20gZmV0Y2gsIGlmIHByb3ZpZGVkLCBvciBkZWZhdWx0IGZldGNoIHRvIG1ha2UgSFRUUCByZXF1ZXN0c1xuICAgICAgICAgKlxuICAgICAgICAgKiBAaW50ZXJuYWxcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3Jlc29sdmVGZXRjaCA9IChjdXN0b21GZXRjaCkgPT4ge1xuICAgICAgICAgICAgbGV0IF9mZXRjaDtcbiAgICAgICAgICAgIGlmIChjdXN0b21GZXRjaCkge1xuICAgICAgICAgICAgICAgIF9mZXRjaCA9IGN1c3RvbUZldGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGZldGNoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIF9mZXRjaCA9ICguLi5hcmdzKSA9PiBpbXBvcnQoJ0BzdXBhYmFzZS9ub2RlLWZldGNoJykudGhlbigoeyBkZWZhdWx0OiBmZXRjaCB9KSA9PiBmZXRjaCguLi5hcmdzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBfZmV0Y2ggPSBmZXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4gX2ZldGNoKC4uLmFyZ3MpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVuZFBvaW50ID0gYCR7ZW5kUG9pbnR9LyR7VFJBTlNQT1JUUy53ZWJzb2NrZXR9YDtcbiAgICAgICAgdGhpcy5odHRwRW5kcG9pbnQgPSBodHRwRW5kcG9pbnRVUkwoZW5kUG9pbnQpO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRyYW5zcG9ydCkge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBvcHRpb25zLnRyYW5zcG9ydDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnBhcmFtcylcbiAgICAgICAgICAgIHRoaXMucGFyYW1zID0gb3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhZGVycylcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oZWFkZXJzKSwgb3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy50aW1lb3V0KVxuICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmxvZ2dlcilcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gb3B0aW9ucy5sb2dnZXI7XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgICAgICAgICAgIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyA9IG9wdGlvbnMuaGVhcnRiZWF0SW50ZXJ2YWxNcztcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW5WYWx1ZSA9IChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5wYXJhbXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hcGlrZXk7XG4gICAgICAgIGlmIChhY2Nlc3NUb2tlblZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuVmFsdWUgPSBhY2Nlc3NUb2tlblZhbHVlO1xuICAgICAgICAgICAgdGhpcy5hcGlLZXkgPSBhY2Nlc3NUb2tlblZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjb25uZWN0QWZ0ZXJNcyA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucmVjb25uZWN0QWZ0ZXJNcylcbiAgICAgICAgICAgID8gb3B0aW9ucy5yZWNvbm5lY3RBZnRlck1zXG4gICAgICAgICAgICA6ICh0cmllcykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMCwgMTAwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB0aGlzLmVuY29kZSA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZW5jb2RlKVxuICAgICAgICAgICAgPyBvcHRpb25zLmVuY29kZVxuICAgICAgICAgICAgOiAocGF5bG9hZCwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWNvZGUgPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRlY29kZSlcbiAgICAgICAgICAgID8gb3B0aW9ucy5kZWNvZGVcbiAgICAgICAgICAgIDogdGhpcy5zZXJpYWxpemVyLmRlY29kZS5iaW5kKHRoaXMuc2VyaWFsaXplcik7XG4gICAgICAgIHRoaXMucmVjb25uZWN0VGltZXIgPSBuZXcgVGltZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3QoKTtcbiAgICAgICAgfSwgdGhpcy5yZWNvbm5lY3RBZnRlck1zKTtcbiAgICAgICAgdGhpcy5mZXRjaCA9IHRoaXMuX3Jlc29sdmVGZXRjaChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZmV0Y2gpO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLndvcmtlcikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICF3aW5kb3cuV29ya2VyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWIgV29ya2VyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud29ya2VyID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy53b3JrZXIpIHx8IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy53b3JrZXJVcmwgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMud29ya2VyVXJsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWNjZXNzVG9rZW4gPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmFjY2Vzc1Rva2VuKSB8fCBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb25uZWN0cyB0aGUgc29ja2V0LCB1bmxlc3MgYWxyZWFkeSBjb25uZWN0ZWQuXG4gICAgICovXG4gICAgY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgICAgICAgICAgdGhpcy5jb25uID0gbmV3IHRoaXMudHJhbnNwb3J0KHRoaXMuZW5kcG9pbnRVUkwoKSwgdW5kZWZpbmVkLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE5BVElWRV9XRUJTT0NLRVRfQVZBSUxBQkxFKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm4gPSBuZXcgV2ViU29ja2V0KHRoaXMuZW5kcG9pbnRVUkwoKSk7XG4gICAgICAgICAgICB0aGlzLnNldHVwQ29ubmVjdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29ubiA9IG5ldyBXU1dlYlNvY2tldER1bW15KHRoaXMuZW5kcG9pbnRVUkwoKSwgdW5kZWZpbmVkLCB7XG4gICAgICAgICAgICBjbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubiA9IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgaW1wb3J0KCd3cycpLnRoZW4oKHsgZGVmYXVsdDogV1MgfSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb25uID0gbmV3IFdTKHRoaXMuZW5kcG9pbnRVUkwoKSwgdW5kZWZpbmVkLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNldHVwQ29ubmVjdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgVVJMIG9mIHRoZSB3ZWJzb2NrZXQuXG4gICAgICogQHJldHVybnMgc3RyaW5nIFRoZSBVUkwgb2YgdGhlIHdlYnNvY2tldC5cbiAgICAgKi9cbiAgICBlbmRwb2ludFVSTCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGVuZFBhcmFtcyh0aGlzLmVuZFBvaW50LCBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBhcmFtcywgeyB2c246IFZTTiB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29kZSBBIG51bWVyaWMgc3RhdHVzIGNvZGUgdG8gc2VuZCBvbiBkaXNjb25uZWN0LlxuICAgICAqIEBwYXJhbSByZWFzb24gQSBjdXN0b20gcmVhc29uIGZvciB0aGUgZGlzY29ubmVjdC5cbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KGNvZGUsIHJlYXNvbikge1xuICAgICAgICBpZiAodGhpcy5jb25uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm4ub25jbG9zZSA9IGZ1bmN0aW9uICgpIHsgfTsgLy8gbm9vcFxuICAgICAgICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm4uY2xvc2UoY29kZSwgcmVhc29uICE9PSBudWxsICYmIHJlYXNvbiAhPT0gdm9pZCAwID8gcmVhc29uIDogJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbm4gPSBudWxsO1xuICAgICAgICAgICAgLy8gcmVtb3ZlIG9wZW4gaGFuZGxlc1xuICAgICAgICAgICAgdGhpcy5oZWFydGJlYXRUaW1lciAmJiBjbGVhckludGVydmFsKHRoaXMuaGVhcnRiZWF0VGltZXIpO1xuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGNyZWF0ZWQgY2hhbm5lbHNcbiAgICAgKi9cbiAgICBnZXRDaGFubmVscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlcyBhbmQgcmVtb3ZlcyBhIHNpbmdsZSBjaGFubmVsXG4gICAgICogQHBhcmFtIGNoYW5uZWwgQSBSZWFsdGltZUNoYW5uZWwgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBhc3luYyByZW1vdmVDaGFubmVsKGNoYW5uZWwpIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gYXdhaXQgY2hhbm5lbC51bnN1YnNjcmliZSgpO1xuICAgICAgICBpZiAodGhpcy5jaGFubmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlcyBhbmQgcmVtb3ZlcyBhbGwgY2hhbm5lbHNcbiAgICAgKi9cbiAgICBhc3luYyByZW1vdmVBbGxDaGFubmVscygpIHtcbiAgICAgICAgY29uc3QgdmFsdWVzXzEgPSBhd2FpdCBQcm9taXNlLmFsbCh0aGlzLmNoYW5uZWxzLm1hcCgoY2hhbm5lbCkgPT4gY2hhbm5lbC51bnN1YnNjcmliZSgpKSk7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICByZXR1cm4gdmFsdWVzXzE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvZ3MgdGhlIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBGb3IgY3VzdG9taXplZCBsb2dnaW5nLCBgdGhpcy5sb2dnZXJgIGNhbiBiZSBvdmVycmlkZGVuLlxuICAgICAqL1xuICAgIGxvZyhraW5kLCBtc2csIGRhdGEpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIoa2luZCwgbXNnLCBkYXRhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgc29ja2V0LlxuICAgICAqL1xuICAgIGNvbm5lY3Rpb25TdGF0ZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmNvbm4gJiYgdGhpcy5jb25uLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nOlxuICAgICAgICAgICAgICAgIHJldHVybiBDT05ORUNUSU9OX1NUQVRFLkNvbm5lY3Rpbmc7XG4gICAgICAgICAgICBjYXNlIFNPQ0tFVF9TVEFURVMub3BlbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gQ09OTkVDVElPTl9TVEFURS5PcGVuO1xuICAgICAgICAgICAgY2FzZSBTT0NLRVRfU1RBVEVTLmNsb3Npbmc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RJT05fU1RBVEUuQ2xvc2luZztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RJT05fU1RBVEUuQ2xvc2VkO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlzIHRoZSBjb25uZWN0aW9uIGlzIG9wZW4uXG4gICAgICovXG4gICAgaXNDb25uZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb25TdGF0ZSgpID09PSBDT05ORUNUSU9OX1NUQVRFLk9wZW47XG4gICAgfVxuICAgIGNoYW5uZWwodG9waWMsIHBhcmFtcyA9IHsgY29uZmlnOiB7fSB9KSB7XG4gICAgICAgIGNvbnN0IGNoYW4gPSBuZXcgUmVhbHRpbWVDaGFubmVsKGByZWFsdGltZToke3RvcGljfWAsIHBhcmFtcywgdGhpcyk7XG4gICAgICAgIHRoaXMuY2hhbm5lbHMucHVzaChjaGFuKTtcbiAgICAgICAgcmV0dXJuIGNoYW47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2ggb3V0IGEgbWVzc2FnZSBpZiB0aGUgc29ja2V0IGlzIGNvbm5lY3RlZC5cbiAgICAgKlxuICAgICAqIElmIHRoZSBzb2NrZXQgaXMgbm90IGNvbm5lY3RlZCwgdGhlIG1lc3NhZ2UgZ2V0cyBlbnF1ZXVlZCB3aXRoaW4gYSBsb2NhbCBidWZmZXIsIGFuZCBzZW50IG91dCB3aGVuIGEgY29ubmVjdGlvbiBpcyBuZXh0IGVzdGFibGlzaGVkLlxuICAgICAqL1xuICAgIHB1c2goZGF0YSkge1xuICAgICAgICBjb25zdCB7IHRvcGljLCBldmVudCwgcGF5bG9hZCwgcmVmIH0gPSBkYXRhO1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW5jb2RlKGRhdGEsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgKF9hID0gdGhpcy5jb25uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2VuZChyZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubG9nKCdwdXNoJywgYCR7dG9waWN9ICR7ZXZlbnR9ICgke3JlZn0pYCwgcGF5bG9hZCk7XG4gICAgICAgIGlmICh0aGlzLmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgSldUIGFjY2VzcyB0b2tlbiB1c2VkIGZvciBjaGFubmVsIHN1YnNjcmlwdGlvbiBhdXRob3JpemF0aW9uIGFuZCBSZWFsdGltZSBSTFMuXG4gICAgICpcbiAgICAgKiBJZiBwYXJhbSBpcyBudWxsIGl0IHdpbGwgdXNlIHRoZSBgYWNjZXNzVG9rZW5gIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIHRoZSB0b2tlbiBzZXQgb24gdGhlIGNsaWVudC5cbiAgICAgKlxuICAgICAqIE9uIGNhbGxiYWNrIHVzZWQsIGl0IHdpbGwgc2V0IHRoZSB2YWx1ZSBvZiB0aGUgdG9rZW4gaW50ZXJuYWwgdG8gdGhlIGNsaWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0b2tlbiBBIEpXVCBzdHJpbmcgdG8gb3ZlcnJpZGUgdGhlIHRva2VuIHNldCBvbiB0aGUgY2xpZW50LlxuICAgICAqL1xuICAgIGFzeW5jIHNldEF1dGgodG9rZW4gPSBudWxsKSB7XG4gICAgICAgIGxldCB0b2tlblRvU2VuZCA9IHRva2VuIHx8XG4gICAgICAgICAgICAodGhpcy5hY2Nlc3NUb2tlbiAmJiAoYXdhaXQgdGhpcy5hY2Nlc3NUb2tlbigpKSkgfHxcbiAgICAgICAgICAgIHRoaXMuYWNjZXNzVG9rZW5WYWx1ZTtcbiAgICAgICAgaWYgKHRva2VuVG9TZW5kKSB7XG4gICAgICAgICAgICBsZXQgcGFyc2VkID0gbnVsbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkID0gSlNPTi5wYXJzZShhdG9iKHRva2VuVG9TZW5kLnNwbGl0KCcuJylbMV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChfZXJyb3IpIHsgfVxuICAgICAgICAgICAgaWYgKHBhcnNlZCAmJiBwYXJzZWQuZXhwKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vdyA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgICAgICAgICAgICAgIGxldCB2YWxpZCA9IG5vdyAtIHBhcnNlZC5leHAgPCAwO1xuICAgICAgICAgICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2coJ2F1dGgnLCBgSW52YWxpZEpXVFRva2VuOiBJbnZhbGlkIHZhbHVlIGZvciBKV1QgY2xhaW0gXCJleHBcIiB3aXRoIHZhbHVlICR7cGFyc2VkLmV4cH1gKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBJbnZhbGlkSldUVG9rZW46IEludmFsaWQgdmFsdWUgZm9yIEpXVCBjbGFpbSBcImV4cFwiIHdpdGggdmFsdWUgJHtwYXJzZWQuZXhwfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWNjZXNzVG9rZW5WYWx1ZSA9IHRva2VuVG9TZW5kO1xuICAgICAgICAgICAgdGhpcy5jaGFubmVscy5mb3JFYWNoKChjaGFubmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgdG9rZW5Ub1NlbmQgJiYgY2hhbm5lbC51cGRhdGVKb2luUGF5bG9hZCh7IGFjY2Vzc190b2tlbjogdG9rZW5Ub1NlbmQgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5uZWwuam9pbmVkT25jZSAmJiBjaGFubmVsLl9pc0pvaW5lZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5uZWwuX3B1c2goQ0hBTk5FTF9FVkVOVFMuYWNjZXNzX3Rva2VuLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW46IHRva2VuVG9TZW5kLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGhlYXJ0YmVhdCBtZXNzYWdlIGlmIHRoZSBzb2NrZXQgaXMgY29ubmVjdGVkLlxuICAgICAqL1xuICAgIGFzeW5jIHNlbmRIZWFydGJlYXQoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5sb2coJ3RyYW5zcG9ydCcsICdoZWFydGJlYXQgdGltZW91dC4gQXR0ZW1wdGluZyB0byByZS1lc3RhYmxpc2ggY29ubmVjdGlvbicpO1xuICAgICAgICAgICAgKF9hID0gdGhpcy5jb25uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xvc2UoV1NfQ0xPU0VfTk9STUFMLCAnaGVhcmJlYXQgdGltZW91dCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IHRoaXMuX21ha2VSZWYoKTtcbiAgICAgICAgdGhpcy5wdXNoKHtcbiAgICAgICAgICAgIHRvcGljOiAncGhvZW5peCcsXG4gICAgICAgICAgICBldmVudDogJ2hlYXJ0YmVhdCcsXG4gICAgICAgICAgICBwYXlsb2FkOiB7fSxcbiAgICAgICAgICAgIHJlZjogdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRBdXRoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZsdXNoZXMgc2VuZCBidWZmZXJcbiAgICAgKi9cbiAgICBmbHVzaFNlbmRCdWZmZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29ubmVjdGVkKCkgJiYgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soKSk7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG5leHQgbWVzc2FnZSByZWYsIGFjY291bnRpbmcgZm9yIG92ZXJmbG93c1xuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgX21ha2VSZWYoKSB7XG4gICAgICAgIGxldCBuZXdSZWYgPSB0aGlzLnJlZiArIDE7XG4gICAgICAgIGlmIChuZXdSZWYgPT09IHRoaXMucmVmKSB7XG4gICAgICAgICAgICB0aGlzLnJlZiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlZiA9IG5ld1JlZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZWYudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5zdWJzY3JpYmUgZnJvbSBjaGFubmVscyB3aXRoIHRoZSBzcGVjaWZpZWQgdG9waWMuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBfbGVhdmVPcGVuVG9waWModG9waWMpIHtcbiAgICAgICAgbGV0IGR1cENoYW5uZWwgPSB0aGlzLmNoYW5uZWxzLmZpbmQoKGMpID0+IGMudG9waWMgPT09IHRvcGljICYmIChjLl9pc0pvaW5lZCgpIHx8IGMuX2lzSm9pbmluZygpKSk7XG4gICAgICAgIGlmIChkdXBDaGFubmVsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygndHJhbnNwb3J0JywgYGxlYXZpbmcgZHVwbGljYXRlIHRvcGljIFwiJHt0b3BpY31cImApO1xuICAgICAgICAgICAgZHVwQ2hhbm5lbC51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBzdWJzY3JpcHRpb24gZnJvbSB0aGUgc29ja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5uZWwgQW4gb3BlbiBzdWJzY3JpcHRpb24uXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBfcmVtb3ZlKGNoYW5uZWwpIHtcbiAgICAgICAgdGhpcy5jaGFubmVscyA9IHRoaXMuY2hhbm5lbHMuZmlsdGVyKChjKSA9PiBjLl9qb2luUmVmKCkgIT09IGNoYW5uZWwuX2pvaW5SZWYoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgY29ubmVjdGlvbiBoYW5kbGVycy5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHNldHVwQ29ubmVjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubikge1xuICAgICAgICAgICAgdGhpcy5jb25uLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgdGhpcy5jb25uLm9ub3BlbiA9ICgpID0+IHRoaXMuX29uQ29ubk9wZW4oKTtcbiAgICAgICAgICAgIHRoaXMuY29ubi5vbmVycm9yID0gKGVycm9yKSA9PiB0aGlzLl9vbkNvbm5FcnJvcihlcnJvcik7XG4gICAgICAgICAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gKGV2ZW50KSA9PiB0aGlzLl9vbkNvbm5NZXNzYWdlKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuY29ubi5vbmNsb3NlID0gKGV2ZW50KSA9PiB0aGlzLl9vbkNvbm5DbG9zZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9vbkNvbm5NZXNzYWdlKHJhd01lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5kZWNvZGUocmF3TWVzc2FnZS5kYXRhLCAobXNnKSA9PiB7XG4gICAgICAgICAgICBsZXQgeyB0b3BpYywgZXZlbnQsIHBheWxvYWQsIHJlZiB9ID0gbXNnO1xuICAgICAgICAgICAgaWYgKHJlZiAmJiByZWYgPT09IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZikge1xuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvZygncmVjZWl2ZScsIGAke3BheWxvYWQuc3RhdHVzIHx8ICcnfSAke3RvcGljfSAke2V2ZW50fSAkeyhyZWYgJiYgJygnICsgcmVmICsgJyknKSB8fCAnJ31gLCBwYXlsb2FkKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbHNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChjaGFubmVsKSA9PiBjaGFubmVsLl9pc01lbWJlcih0b3BpYykpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGNoYW5uZWwpID0+IGNoYW5uZWwuX3RyaWdnZXIoZXZlbnQsIHBheWxvYWQsIHJlZikpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhtc2cpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBhc3luYyBfb25Db25uT3BlbigpIHtcbiAgICAgICAgdGhpcy5sb2coJ3RyYW5zcG9ydCcsIGBjb25uZWN0ZWQgdG8gJHt0aGlzLmVuZHBvaW50VVJMKCl9YCk7XG4gICAgICAgIHRoaXMuZmx1c2hTZW5kQnVmZmVyKCk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKTtcbiAgICAgICAgaWYgKCF0aGlzLndvcmtlcikge1xuICAgICAgICAgICAgdGhpcy5oZWFydGJlYXRUaW1lciAmJiBjbGVhckludGVydmFsKHRoaXMuaGVhcnRiZWF0VGltZXIpO1xuICAgICAgICAgICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IHNldEludGVydmFsKCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMud29ya2VyVXJsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ3dvcmtlcicsIGBzdGFydGluZyB3b3JrZXIgZm9yIGZyb20gJHt0aGlzLndvcmtlclVybH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCd3b3JrZXInLCBgc3RhcnRpbmcgZGVmYXVsdCB3b3JrZXJgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9iamVjdFVybCA9IHRoaXMuX3dvcmtlck9iamVjdFVybCh0aGlzLndvcmtlclVybCk7XG4gICAgICAgICAgICB0aGlzLndvcmtlclJlZiA9IG5ldyBXb3JrZXIob2JqZWN0VXJsKTtcbiAgICAgICAgICAgIHRoaXMud29ya2VyUmVmLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnd29ya2VyJywgJ3dvcmtlciBlcnJvcicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMud29ya2VyUmVmLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMud29ya2VyUmVmLm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSAna2VlcEFsaXZlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRIZWFydGJlYXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy53b3JrZXJSZWYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIGV2ZW50OiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgIGludGVydmFsOiB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm9wZW4uZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKCkpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX29uQ29ubkNsb3NlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMubG9nKCd0cmFuc3BvcnQnLCAnY2xvc2UnLCBldmVudCk7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuRXJyb3IoKTtcbiAgICAgICAgdGhpcy5oZWFydGJlYXRUaW1lciAmJiBjbGVhckludGVydmFsKHRoaXMuaGVhcnRiZWF0VGltZXIpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmNsb3NlLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhldmVudCkpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX29uQ29ubkVycm9yKGVycm9yKSB7XG4gICAgICAgIHRoaXMubG9nKCd0cmFuc3BvcnQnLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5FcnJvcigpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmVycm9yLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhlcnJvcikpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX3RyaWdnZXJDaGFuRXJyb3IoKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbHMuZm9yRWFjaCgoY2hhbm5lbCkgPT4gY2hhbm5lbC5fdHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5lcnJvcikpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX2FwcGVuZFBhcmFtcyh1cmwsIHBhcmFtcykge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJlZml4ID0gdXJsLm1hdGNoKC9cXD8vKSA/ICcmJyA6ICc/JztcbiAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBgJHt1cmx9JHtwcmVmaXh9JHtxdWVyeX1gO1xuICAgIH1cbiAgICBfd29ya2VyT2JqZWN0VXJsKHVybCkge1xuICAgICAgICBsZXQgcmVzdWx0X3VybDtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgcmVzdWx0X3VybCA9IHVybDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbV09SS0VSX1NDUklQVF0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnIH0pO1xuICAgICAgICAgICAgcmVzdWx0X3VybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdF91cmw7XG4gICAgfVxufVxuY2xhc3MgV1NXZWJTb2NrZXREdW1teSB7XG4gICAgY29uc3RydWN0b3IoYWRkcmVzcywgX3Byb3RvY29scywgb3B0aW9ucykge1xuICAgICAgICB0aGlzLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICB0aGlzLm9uY2xvc2UgPSAoKSA9PiB7IH07XG4gICAgICAgIHRoaXMub25lcnJvciA9ICgpID0+IHsgfTtcbiAgICAgICAgdGhpcy5vbm1lc3NhZ2UgPSAoKSA9PiB7IH07XG4gICAgICAgIHRoaXMub25vcGVuID0gKCkgPT4geyB9O1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNvbm5lY3Rpbmc7XG4gICAgICAgIHRoaXMuc2VuZCA9ICgpID0+IHsgfTtcbiAgICAgICAgdGhpcy51cmwgPSBudWxsO1xuICAgICAgICB0aGlzLnVybCA9IGFkZHJlc3M7XG4gICAgICAgIHRoaXMuY2xvc2UgPSBvcHRpb25zLmNsb3NlO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlYWx0aW1lQ2xpZW50LmpzLm1hcCIsIi8qXG4gIFRoaXMgZmlsZSBkcmF3cyBoZWF2aWx5IGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Bob2VuaXhmcmFtZXdvcmsvcGhvZW5peC9ibG9iL2QzNDRlYzBhNzMyYWI0ZWUyMDQyMTViMzFkZTY5Y2Y0YmU3MmUzYmYvYXNzZXRzL2pzL3Bob2VuaXgvcHJlc2VuY2UuanNcbiAgTGljZW5zZTogaHR0cHM6Ly9naXRodWIuY29tL3Bob2VuaXhmcmFtZXdvcmsvcGhvZW5peC9ibG9iL2QzNDRlYzBhNzMyYWI0ZWUyMDQyMTViMzFkZTY5Y2Y0YmU3MmUzYmYvTElDRU5TRS5tZFxuKi9cbmV4cG9ydCB2YXIgUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UUztcbihmdW5jdGlvbiAoUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UUykge1xuICAgIFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFNbXCJTWU5DXCJdID0gXCJzeW5jXCI7XG4gICAgUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UU1tcIkpPSU5cIl0gPSBcImpvaW5cIjtcbiAgICBSRUFMVElNRV9QUkVTRU5DRV9MSVNURU5fRVZFTlRTW1wiTEVBVkVcIl0gPSBcImxlYXZlXCI7XG59KShSRUFMVElNRV9QUkVTRU5DRV9MSVNURU5fRVZFTlRTIHx8IChSRUFMVElNRV9QUkVTRU5DRV9MSVNURU5fRVZFTlRTID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWx0aW1lUHJlc2VuY2Uge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBQcmVzZW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFubmVsIC0gVGhlIFJlYWx0aW1lQ2hhbm5lbFxuICAgICAqIEBwYXJhbSBvcHRzIC0gVGhlIG9wdGlvbnMsXG4gICAgICogICAgICAgIGZvciBleGFtcGxlIGB7ZXZlbnRzOiB7c3RhdGU6ICdzdGF0ZScsIGRpZmY6ICdkaWZmJ319YFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNoYW5uZWwsIG9wdHMpIHtcbiAgICAgICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdO1xuICAgICAgICB0aGlzLmpvaW5SZWYgPSBudWxsO1xuICAgICAgICB0aGlzLmNhbGxlciA9IHtcbiAgICAgICAgICAgIG9uSm9pbjogKCkgPT4geyB9LFxuICAgICAgICAgICAgb25MZWF2ZTogKCkgPT4geyB9LFxuICAgICAgICAgICAgb25TeW5jOiAoKSA9PiB7IH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IChvcHRzID09PSBudWxsIHx8IG9wdHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdHMuZXZlbnRzKSB8fCB7XG4gICAgICAgICAgICBzdGF0ZTogJ3ByZXNlbmNlX3N0YXRlJyxcbiAgICAgICAgICAgIGRpZmY6ICdwcmVzZW5jZV9kaWZmJyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jaGFubmVsLl9vbihldmVudHMuc3RhdGUsIHt9LCAobmV3U3RhdGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb25Kb2luLCBvbkxlYXZlLCBvblN5bmMgfSA9IHRoaXMuY2FsbGVyO1xuICAgICAgICAgICAgdGhpcy5qb2luUmVmID0gdGhpcy5jaGFubmVsLl9qb2luUmVmKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gUmVhbHRpbWVQcmVzZW5jZS5zeW5jU3RhdGUodGhpcy5zdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSk7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdEaWZmcy5mb3JFYWNoKChkaWZmKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFJlYWx0aW1lUHJlc2VuY2Uuc3luY0RpZmYodGhpcy5zdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXTtcbiAgICAgICAgICAgIG9uU3luYygpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jaGFubmVsLl9vbihldmVudHMuZGlmZiwge30sIChkaWZmKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IG9uSm9pbiwgb25MZWF2ZSwgb25TeW5jIH0gPSB0aGlzLmNhbGxlcjtcbiAgICAgICAgICAgIGlmICh0aGlzLmluUGVuZGluZ1N5bmNTdGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMucHVzaChkaWZmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBSZWFsdGltZVByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSk7XG4gICAgICAgICAgICAgICAgb25TeW5jKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uSm9pbigoa2V5LCBjdXJyZW50UHJlc2VuY2VzLCBuZXdQcmVzZW5jZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbC5fdHJpZ2dlcigncHJlc2VuY2UnLCB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdqb2luJyxcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgY3VycmVudFByZXNlbmNlcyxcbiAgICAgICAgICAgICAgICBuZXdQcmVzZW5jZXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25MZWF2ZSgoa2V5LCBjdXJyZW50UHJlc2VuY2VzLCBsZWZ0UHJlc2VuY2VzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwuX3RyaWdnZXIoJ3ByZXNlbmNlJywge1xuICAgICAgICAgICAgICAgIGV2ZW50OiAnbGVhdmUnLFxuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJlc2VuY2VzLFxuICAgICAgICAgICAgICAgIGxlZnRQcmVzZW5jZXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25TeW5jKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbC5fdHJpZ2dlcigncHJlc2VuY2UnLCB7IGV2ZW50OiAnc3luYycgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHN5bmMgdGhlIGxpc3Qgb2YgcHJlc2VuY2VzIG9uIHRoZSBzZXJ2ZXIgd2l0aCB0aGVcbiAgICAgKiBjbGllbnQncyBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEFuIG9wdGlvbmFsIGBvbkpvaW5gIGFuZCBgb25MZWF2ZWAgY2FsbGJhY2sgY2FuIGJlIHByb3ZpZGVkIHRvXG4gICAgICogcmVhY3QgdG8gY2hhbmdlcyBpbiB0aGUgY2xpZW50J3MgbG9jYWwgcHJlc2VuY2VzIGFjcm9zc1xuICAgICAqIGRpc2Nvbm5lY3RzIGFuZCByZWNvbm5lY3RzIHdpdGggdGhlIHNlcnZlci5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHN0YXRpYyBzeW5jU3RhdGUoY3VycmVudFN0YXRlLCBuZXdTdGF0ZSwgb25Kb2luLCBvbkxlYXZlKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5jbG9uZURlZXAoY3VycmVudFN0YXRlKTtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtZWRTdGF0ZSA9IHRoaXMudHJhbnNmb3JtU3RhdGUobmV3U3RhdGUpO1xuICAgICAgICBjb25zdCBqb2lucyA9IHt9O1xuICAgICAgICBjb25zdCBsZWF2ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5tYXAoc3RhdGUsIChrZXksIHByZXNlbmNlcykgPT4ge1xuICAgICAgICAgICAgaWYgKCF0cmFuc2Zvcm1lZFN0YXRlW2tleV0pIHtcbiAgICAgICAgICAgICAgICBsZWF2ZXNba2V5XSA9IHByZXNlbmNlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWFwKHRyYW5zZm9ybWVkU3RhdGUsIChrZXksIG5ld1ByZXNlbmNlcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFByZXNlbmNlcyA9IHN0YXRlW2tleV07XG4gICAgICAgICAgICBpZiAoY3VycmVudFByZXNlbmNlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ByZXNlbmNlUmVmcyA9IG5ld1ByZXNlbmNlcy5tYXAoKG0pID0+IG0ucHJlc2VuY2VfcmVmKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJQcmVzZW5jZVJlZnMgPSBjdXJyZW50UHJlc2VuY2VzLm1hcCgobSkgPT4gbS5wcmVzZW5jZV9yZWYpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGpvaW5lZFByZXNlbmNlcyA9IG5ld1ByZXNlbmNlcy5maWx0ZXIoKG0pID0+IGN1clByZXNlbmNlUmVmcy5pbmRleE9mKG0ucHJlc2VuY2VfcmVmKSA8IDApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRQcmVzZW5jZXMgPSBjdXJyZW50UHJlc2VuY2VzLmZpbHRlcigobSkgPT4gbmV3UHJlc2VuY2VSZWZzLmluZGV4T2YobS5wcmVzZW5jZV9yZWYpIDwgMCk7XG4gICAgICAgICAgICAgICAgaWYgKGpvaW5lZFByZXNlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGpvaW5zW2tleV0gPSBqb2luZWRQcmVzZW5jZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsZWZ0UHJlc2VuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGVhdmVzW2tleV0gPSBsZWZ0UHJlc2VuY2VzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGpvaW5zW2tleV0gPSBuZXdQcmVzZW5jZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5zeW5jRGlmZihzdGF0ZSwgeyBqb2lucywgbGVhdmVzIH0sIG9uSm9pbiwgb25MZWF2ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gc3luYyBhIGRpZmYgb2YgcHJlc2VuY2Ugam9pbiBhbmQgbGVhdmUgZXZlbnRzIGZyb20gdGhlXG4gICAgICogc2VydmVyLCBhcyB0aGV5IGhhcHBlbi5cbiAgICAgKlxuICAgICAqIExpa2UgYHN5bmNTdGF0ZWAsIGBzeW5jRGlmZmAgYWNjZXB0cyBvcHRpb25hbCBgb25Kb2luYCBhbmRcbiAgICAgKiBgb25MZWF2ZWAgY2FsbGJhY2tzIHRvIHJlYWN0IHRvIGEgdXNlciBqb2luaW5nIG9yIGxlYXZpbmcgZnJvbSBhXG4gICAgICogZGV2aWNlLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgc3RhdGljIHN5bmNEaWZmKHN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpIHtcbiAgICAgICAgY29uc3QgeyBqb2lucywgbGVhdmVzIH0gPSB7XG4gICAgICAgICAgICBqb2luczogdGhpcy50cmFuc2Zvcm1TdGF0ZShkaWZmLmpvaW5zKSxcbiAgICAgICAgICAgIGxlYXZlczogdGhpcy50cmFuc2Zvcm1TdGF0ZShkaWZmLmxlYXZlcyksXG4gICAgICAgIH07XG4gICAgICAgIGlmICghb25Kb2luKSB7XG4gICAgICAgICAgICBvbkpvaW4gPSAoKSA9PiB7IH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvbkxlYXZlKSB7XG4gICAgICAgICAgICBvbkxlYXZlID0gKCkgPT4geyB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwKGpvaW5zLCAoa2V5LCBuZXdQcmVzZW5jZXMpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQcmVzZW5jZXMgPSAoX2EgPSBzdGF0ZVtrZXldKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXTtcbiAgICAgICAgICAgIHN0YXRlW2tleV0gPSB0aGlzLmNsb25lRGVlcChuZXdQcmVzZW5jZXMpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRQcmVzZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGpvaW5lZFByZXNlbmNlUmVmcyA9IHN0YXRlW2tleV0ubWFwKChtKSA9PiBtLnByZXNlbmNlX3JlZik7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VyUHJlc2VuY2VzID0gY3VycmVudFByZXNlbmNlcy5maWx0ZXIoKG0pID0+IGpvaW5lZFByZXNlbmNlUmVmcy5pbmRleE9mKG0ucHJlc2VuY2VfcmVmKSA8IDApO1xuICAgICAgICAgICAgICAgIHN0YXRlW2tleV0udW5zaGlmdCguLi5jdXJQcmVzZW5jZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25Kb2luKGtleSwgY3VycmVudFByZXNlbmNlcywgbmV3UHJlc2VuY2VzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWFwKGxlYXZlcywgKGtleSwgbGVmdFByZXNlbmNlcykgPT4ge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZXMgPSBzdGF0ZVtrZXldO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50UHJlc2VuY2VzKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IHByZXNlbmNlUmVmc1RvUmVtb3ZlID0gbGVmdFByZXNlbmNlcy5tYXAoKG0pID0+IG0ucHJlc2VuY2VfcmVmKTtcbiAgICAgICAgICAgIGN1cnJlbnRQcmVzZW5jZXMgPSBjdXJyZW50UHJlc2VuY2VzLmZpbHRlcigobSkgPT4gcHJlc2VuY2VSZWZzVG9SZW1vdmUuaW5kZXhPZihtLnByZXNlbmNlX3JlZikgPCAwKTtcbiAgICAgICAgICAgIHN0YXRlW2tleV0gPSBjdXJyZW50UHJlc2VuY2VzO1xuICAgICAgICAgICAgb25MZWF2ZShrZXksIGN1cnJlbnRQcmVzZW5jZXMsIGxlZnRQcmVzZW5jZXMpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRQcmVzZW5jZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzdGF0ZVtrZXldO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgc3RhdGljIG1hcChvYmosIGZ1bmMpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubWFwKChrZXkpID0+IGZ1bmMoa2V5LCBvYmpba2V5XSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgJ21ldGFzJyBrZXlcbiAgICAgKiBDaGFuZ2UgJ3BoeF9yZWYnIHRvICdwcmVzZW5jZV9yZWYnXG4gICAgICogUmVtb3ZlICdwaHhfcmVmJyBhbmQgJ3BoeF9yZWZfcHJldidcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gcmV0dXJucyB7XG4gICAgICogIGFiYzEyMzogW1xuICAgICAqICAgIHsgcHJlc2VuY2VfcmVmOiAnMicsIHVzZXJfaWQ6IDEgfSxcbiAgICAgKiAgICB7IHByZXNlbmNlX3JlZjogJzMnLCB1c2VyX2lkOiAyIH1cbiAgICAgKiAgXVxuICAgICAqIH1cbiAgICAgKiBSZWFsdGltZVByZXNlbmNlLnRyYW5zZm9ybVN0YXRlKHtcbiAgICAgKiAgYWJjMTIzOiB7XG4gICAgICogICAgbWV0YXM6IFtcbiAgICAgKiAgICAgIHsgcGh4X3JlZjogJzInLCBwaHhfcmVmX3ByZXY6ICcxJyB1c2VyX2lkOiAxIH0sXG4gICAgICogICAgICB7IHBoeF9yZWY6ICczJywgdXNlcl9pZDogMiB9XG4gICAgICogICAgXVxuICAgICAqICB9XG4gICAgICogfSlcbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHN0YXRpYyB0cmFuc2Zvcm1TdGF0ZShzdGF0ZSkge1xuICAgICAgICBzdGF0ZSA9IHRoaXMuY2xvbmVEZWVwKHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHN0YXRlKS5yZWR1Y2UoKG5ld1N0YXRlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByZXNlbmNlcyA9IHN0YXRlW2tleV07XG4gICAgICAgICAgICBpZiAoJ21ldGFzJyBpbiBwcmVzZW5jZXMpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVtrZXldID0gcHJlc2VuY2VzLm1ldGFzLm1hcCgocHJlc2VuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcHJlc2VuY2VbJ3ByZXNlbmNlX3JlZiddID0gcHJlc2VuY2VbJ3BoeF9yZWYnXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHByZXNlbmNlWydwaHhfcmVmJ107XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwcmVzZW5jZVsncGh4X3JlZl9wcmV2J107XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmVzZW5jZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlW2tleV0gPSBwcmVzZW5jZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHN0YXRpYyBjbG9uZURlZXAob2JqKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgb25Kb2luKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FsbGVyLm9uSm9pbiA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgb25MZWF2ZShjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNhbGxlci5vbkxlYXZlID0gY2FsbGJhY2s7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBvblN5bmMoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsZXIub25TeW5jID0gY2FsbGJhY2s7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBpblBlbmRpbmdTeW5jU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5qb2luUmVmIHx8IHRoaXMuam9pblJlZiAhPT0gdGhpcy5jaGFubmVsLl9qb2luUmVmKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVhbHRpbWVQcmVzZW5jZS5qcy5tYXAiLCJpbXBvcnQgUmVhbHRpbWVDbGllbnQgZnJvbSAnLi9SZWFsdGltZUNsaWVudCc7XG5pbXBvcnQgUmVhbHRpbWVDaGFubmVsLCB7IFJFQUxUSU1FX0xJU1RFTl9UWVBFUywgUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlQsIFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMsIFJFQUxUSU1FX0NIQU5ORUxfU1RBVEVTLCB9IGZyb20gJy4vUmVhbHRpbWVDaGFubmVsJztcbmltcG9ydCBSZWFsdGltZVByZXNlbmNlLCB7IFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFMsIH0gZnJvbSAnLi9SZWFsdGltZVByZXNlbmNlJztcbmV4cG9ydCB7IFJlYWx0aW1lUHJlc2VuY2UsIFJlYWx0aW1lQ2hhbm5lbCwgUmVhbHRpbWVDbGllbnQsIFJFQUxUSU1FX0xJU1RFTl9UWVBFUywgUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlQsIFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFMsIFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMsIFJFQUxUSU1FX0NIQU5ORUxfU1RBVEVTLCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbic7XG5leHBvcnQgY29uc3QgREVGQVVMVF9IRUFERVJTID0geyAnWC1DbGllbnQtSW5mbyc6IGByZWFsdGltZS1qcy8ke3ZlcnNpb259YCB9O1xuZXhwb3J0IGNvbnN0IFZTTiA9ICcxLjAuMCc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FT1VUID0gMTAwMDA7XG5leHBvcnQgY29uc3QgV1NfQ0xPU0VfTk9STUFMID0gMTAwMDtcbmV4cG9ydCB2YXIgU09DS0VUX1NUQVRFUztcbihmdW5jdGlvbiAoU09DS0VUX1NUQVRFUykge1xuICAgIFNPQ0tFVF9TVEFURVNbU09DS0VUX1NUQVRFU1tcImNvbm5lY3RpbmdcIl0gPSAwXSA9IFwiY29ubmVjdGluZ1wiO1xuICAgIFNPQ0tFVF9TVEFURVNbU09DS0VUX1NUQVRFU1tcIm9wZW5cIl0gPSAxXSA9IFwib3BlblwiO1xuICAgIFNPQ0tFVF9TVEFURVNbU09DS0VUX1NUQVRFU1tcImNsb3NpbmdcIl0gPSAyXSA9IFwiY2xvc2luZ1wiO1xuICAgIFNPQ0tFVF9TVEFURVNbU09DS0VUX1NUQVRFU1tcImNsb3NlZFwiXSA9IDNdID0gXCJjbG9zZWRcIjtcbn0pKFNPQ0tFVF9TVEFURVMgfHwgKFNPQ0tFVF9TVEFURVMgPSB7fSkpO1xuZXhwb3J0IHZhciBDSEFOTkVMX1NUQVRFUztcbihmdW5jdGlvbiAoQ0hBTk5FTF9TVEFURVMpIHtcbiAgICBDSEFOTkVMX1NUQVRFU1tcImNsb3NlZFwiXSA9IFwiY2xvc2VkXCI7XG4gICAgQ0hBTk5FTF9TVEFURVNbXCJlcnJvcmVkXCJdID0gXCJlcnJvcmVkXCI7XG4gICAgQ0hBTk5FTF9TVEFURVNbXCJqb2luZWRcIl0gPSBcImpvaW5lZFwiO1xuICAgIENIQU5ORUxfU1RBVEVTW1wiam9pbmluZ1wiXSA9IFwiam9pbmluZ1wiO1xuICAgIENIQU5ORUxfU1RBVEVTW1wibGVhdmluZ1wiXSA9IFwibGVhdmluZ1wiO1xufSkoQ0hBTk5FTF9TVEFURVMgfHwgKENIQU5ORUxfU1RBVEVTID0ge30pKTtcbmV4cG9ydCB2YXIgQ0hBTk5FTF9FVkVOVFM7XG4oZnVuY3Rpb24gKENIQU5ORUxfRVZFTlRTKSB7XG4gICAgQ0hBTk5FTF9FVkVOVFNbXCJjbG9zZVwiXSA9IFwicGh4X2Nsb3NlXCI7XG4gICAgQ0hBTk5FTF9FVkVOVFNbXCJlcnJvclwiXSA9IFwicGh4X2Vycm9yXCI7XG4gICAgQ0hBTk5FTF9FVkVOVFNbXCJqb2luXCJdID0gXCJwaHhfam9pblwiO1xuICAgIENIQU5ORUxfRVZFTlRTW1wicmVwbHlcIl0gPSBcInBoeF9yZXBseVwiO1xuICAgIENIQU5ORUxfRVZFTlRTW1wibGVhdmVcIl0gPSBcInBoeF9sZWF2ZVwiO1xuICAgIENIQU5ORUxfRVZFTlRTW1wiYWNjZXNzX3Rva2VuXCJdID0gXCJhY2Nlc3NfdG9rZW5cIjtcbn0pKENIQU5ORUxfRVZFTlRTIHx8IChDSEFOTkVMX0VWRU5UUyA9IHt9KSk7XG5leHBvcnQgdmFyIFRSQU5TUE9SVFM7XG4oZnVuY3Rpb24gKFRSQU5TUE9SVFMpIHtcbiAgICBUUkFOU1BPUlRTW1wid2Vic29ja2V0XCJdID0gXCJ3ZWJzb2NrZXRcIjtcbn0pKFRSQU5TUE9SVFMgfHwgKFRSQU5TUE9SVFMgPSB7fSkpO1xuZXhwb3J0IHZhciBDT05ORUNUSU9OX1NUQVRFO1xuKGZ1bmN0aW9uIChDT05ORUNUSU9OX1NUQVRFKSB7XG4gICAgQ09OTkVDVElPTl9TVEFURVtcIkNvbm5lY3RpbmdcIl0gPSBcImNvbm5lY3RpbmdcIjtcbiAgICBDT05ORUNUSU9OX1NUQVRFW1wiT3BlblwiXSA9IFwib3BlblwiO1xuICAgIENPTk5FQ1RJT05fU1RBVEVbXCJDbG9zaW5nXCJdID0gXCJjbG9zaW5nXCI7XG4gICAgQ09OTkVDVElPTl9TVEFURVtcIkNsb3NlZFwiXSA9IFwiY2xvc2VkXCI7XG59KShDT05ORUNUSU9OX1NUQVRFIHx8IChDT05ORUNUSU9OX1NUQVRFID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCJpbXBvcnQgeyBERUZBVUxUX1RJTUVPVVQgfSBmcm9tICcuLi9saWIvY29uc3RhbnRzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1c2gge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBQdXNoXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbm5lbCBUaGUgQ2hhbm5lbFxuICAgICAqIEBwYXJhbSBldmVudCBUaGUgZXZlbnQsIGZvciBleGFtcGxlIGBcInBoeF9qb2luXCJgXG4gICAgICogQHBhcmFtIHBheWxvYWQgVGhlIHBheWxvYWQsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogMTIzfWBcbiAgICAgKiBAcGFyYW0gdGltZW91dCBUaGUgcHVzaCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNoYW5uZWwsIGV2ZW50LCBwYXlsb2FkID0ge30sIHRpbWVvdXQgPSBERUZBVUxUX1RJTUVPVVQpIHtcbiAgICAgICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbDtcbiAgICAgICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICAgICAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgICAgICB0aGlzLnNlbnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aW1lb3V0VGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucmVmID0gJyc7XG4gICAgICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWNIb29rcyA9IFtdO1xuICAgICAgICB0aGlzLnJlZkV2ZW50ID0gbnVsbDtcbiAgICB9XG4gICAgcmVzZW5kKHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICAgICAgdGhpcy5fY2FuY2VsUmVmRXZlbnQoKTtcbiAgICAgICAgdGhpcy5yZWYgPSAnJztcbiAgICAgICAgdGhpcy5yZWZFdmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZW50ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VuZCgpO1xuICAgIH1cbiAgICBzZW5kKCkge1xuICAgICAgICBpZiAodGhpcy5faGFzUmVjZWl2ZWQoJ3RpbWVvdXQnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lb3V0KCk7XG4gICAgICAgIHRoaXMuc2VudCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hhbm5lbC5zb2NrZXQucHVzaCh7XG4gICAgICAgICAgICB0b3BpYzogdGhpcy5jaGFubmVsLnRvcGljLFxuICAgICAgICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICAgICAgICBwYXlsb2FkOiB0aGlzLnBheWxvYWQsXG4gICAgICAgICAgICByZWY6IHRoaXMucmVmLFxuICAgICAgICAgICAgam9pbl9yZWY6IHRoaXMuY2hhbm5lbC5fam9pblJlZigpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdXBkYXRlUGF5bG9hZChwYXlsb2FkKSB7XG4gICAgICAgIHRoaXMucGF5bG9hZCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYXlsb2FkKSwgcGF5bG9hZCk7XG4gICAgfVxuICAgIHJlY2VpdmUoc3RhdHVzLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLl9oYXNSZWNlaXZlZChzdGF0dXMpKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygoX2EgPSB0aGlzLnJlY2VpdmVkUmVzcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY0hvb2tzLnB1c2goeyBzdGF0dXMsIGNhbGxiYWNrIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc3RhcnRUaW1lb3V0KCkge1xuICAgICAgICBpZiAodGhpcy50aW1lb3V0VGltZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZiA9IHRoaXMuY2hhbm5lbC5zb2NrZXQuX21ha2VSZWYoKTtcbiAgICAgICAgdGhpcy5yZWZFdmVudCA9IHRoaXMuY2hhbm5lbC5fcmVwbHlFdmVudE5hbWUodGhpcy5yZWYpO1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9IChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxSZWZFdmVudCgpO1xuICAgICAgICAgICAgdGhpcy5fY2FuY2VsVGltZW91dCgpO1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBwYXlsb2FkO1xuICAgICAgICAgICAgdGhpcy5fbWF0Y2hSZWNlaXZlKHBheWxvYWQpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNoYW5uZWwuX29uKHRoaXMucmVmRXZlbnQsIHt9LCBjYWxsYmFjayk7XG4gICAgICAgIHRoaXMudGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3RpbWVvdXQnLCB7fSk7XG4gICAgICAgIH0sIHRoaXMudGltZW91dCk7XG4gICAgfVxuICAgIHRyaWdnZXIoc3RhdHVzLCByZXNwb25zZSkge1xuICAgICAgICBpZiAodGhpcy5yZWZFdmVudClcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbC5fdHJpZ2dlcih0aGlzLnJlZkV2ZW50LCB7IHN0YXR1cywgcmVzcG9uc2UgfSk7XG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2NhbmNlbFJlZkV2ZW50KCk7XG4gICAgICAgIHRoaXMuX2NhbmNlbFRpbWVvdXQoKTtcbiAgICB9XG4gICAgX2NhbmNlbFJlZkV2ZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMucmVmRXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5uZWwuX29mZih0aGlzLnJlZkV2ZW50LCB7fSk7XG4gICAgfVxuICAgIF9jYW5jZWxUaW1lb3V0KCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0VGltZXIpO1xuICAgICAgICB0aGlzLnRpbWVvdXRUaW1lciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgX21hdGNoUmVjZWl2ZSh7IHN0YXR1cywgcmVzcG9uc2UsIH0pIHtcbiAgICAgICAgdGhpcy5yZWNIb29rc1xuICAgICAgICAgICAgLmZpbHRlcigoaCkgPT4gaC5zdGF0dXMgPT09IHN0YXR1cylcbiAgICAgICAgICAgIC5mb3JFYWNoKChoKSA9PiBoLmNhbGxiYWNrKHJlc3BvbnNlKSk7XG4gICAgfVxuICAgIF9oYXNSZWNlaXZlZChzdGF0dXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjZWl2ZWRSZXNwICYmIHRoaXMucmVjZWl2ZWRSZXNwLnN0YXR1cyA9PT0gc3RhdHVzO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1c2guanMubWFwIiwiLy8gVGhpcyBmaWxlIGRyYXdzIGhlYXZpbHkgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vcGhvZW5peGZyYW1ld29yay9waG9lbml4L2NvbW1pdC9jZjA5OGU5Y2Y3YTQ0ZWU2NDc5ZDMxZDkxMWE5N2QzYzc0MzBjNmZlXG4vLyBMaWNlbnNlOiBodHRwczovL2dpdGh1Yi5jb20vcGhvZW5peGZyYW1ld29yay9waG9lbml4L2Jsb2IvbWFzdGVyL0xJQ0VOU0UubWRcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcmlhbGl6ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkhFQURFUl9MRU5HVEggPSAxO1xuICAgIH1cbiAgICBkZWNvZGUocmF3UGF5bG9hZCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHJhd1BheWxvYWQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5fYmluYXJ5RGVjb2RlKHJhd1BheWxvYWQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHJhd1BheWxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soSlNPTi5wYXJzZShyYXdQYXlsb2FkKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHt9KTtcbiAgICB9XG4gICAgX2JpbmFyeURlY29kZShidWZmZXIpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuICAgICAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKTtcbiAgICB9XG4gICAgX2RlY29kZUJyb2FkY2FzdChidWZmZXIsIHZpZXcsIGRlY29kZXIpIHtcbiAgICAgICAgY29uc3QgdG9waWNTaXplID0gdmlldy5nZXRVaW50OCgxKTtcbiAgICAgICAgY29uc3QgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCgyKTtcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMuSEVBREVSX0xFTkdUSCArIDI7XG4gICAgICAgIGNvbnN0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSk7XG4gICAgICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZTtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKTtcbiAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplO1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aCkpKTtcbiAgICAgICAgcmV0dXJuIHsgcmVmOiBudWxsLCB0b3BpYzogdG9waWMsIGV2ZW50OiBldmVudCwgcGF5bG9hZDogZGF0YSB9O1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlcmlhbGl6ZXIuanMubWFwIiwiLyoqXG4gKiBDcmVhdGVzIGEgdGltZXIgdGhhdCBhY2NlcHRzIGEgYHRpbWVyQ2FsY2AgZnVuY3Rpb24gdG8gcGVyZm9ybSBjYWxjdWxhdGVkIHRpbWVvdXQgcmV0cmllcywgc3VjaCBhcyBleHBvbmVudGlhbCBiYWNrb2ZmLlxuICpcbiAqIEBleGFtcGxlXG4gKiAgICBsZXQgcmVjb25uZWN0VGltZXIgPSBuZXcgVGltZXIoKCkgPT4gdGhpcy5jb25uZWN0KCksIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgICAgcmV0dXJuIFsxMDAwLCA1MDAwLCAxMDAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICogICAgfSlcbiAqICAgIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDEwMDBcbiAqICAgIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDUwMDBcbiAqICAgIHJlY29ubmVjdFRpbWVyLnJlc2V0KClcbiAqICAgIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDEwMDBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCB0aW1lckNhbGMpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnRpbWVyQ2FsYyA9IHRpbWVyQ2FsYztcbiAgICAgICAgdGhpcy50aW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy50cmllcyA9IDA7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy50aW1lckNhbGMgPSB0aW1lckNhbGM7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnRyaWVzID0gMDtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgIH1cbiAgICAvLyBDYW5jZWxzIGFueSBwcmV2aW91cyBzY2hlZHVsZVRpbWVvdXQgYW5kIHNjaGVkdWxlcyBjYWxsYmFja1xuICAgIHNjaGVkdWxlVGltZW91dCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRyaWVzID0gdGhpcy50cmllcyArIDE7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICAgIH0sIHRoaXMudGltZXJDYWxjKHRoaXMudHJpZXMgKyAxKSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZXIuanMubWFwIiwiLyoqXG4gKiBIZWxwZXJzIHRvIGNvbnZlcnQgdGhlIGNoYW5nZSBQYXlsb2FkIGludG8gbmF0aXZlIEpTIHR5cGVzLlxuICovXG4vLyBBZGFwdGVkIGZyb20gZXBnc3FsIChzcmMvZXBnc3FsX2JpbmFyeS5lcmwpLCB0aGlzIG1vZHVsZSBsaWNlbnNlZCB1bmRlclxuLy8gMy1jbGF1c2UgQlNEIGZvdW5kIGhlcmU6IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lcGdzcWwvZXBnc3FsL2RldmVsL0xJQ0VOU0VcbmV4cG9ydCB2YXIgUG9zdGdyZXNUeXBlcztcbihmdW5jdGlvbiAoUG9zdGdyZXNUeXBlcykge1xuICAgIFBvc3RncmVzVHlwZXNbXCJhYnN0aW1lXCJdID0gXCJhYnN0aW1lXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImJvb2xcIl0gPSBcImJvb2xcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiZGF0ZVwiXSA9IFwiZGF0ZVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJkYXRlcmFuZ2VcIl0gPSBcImRhdGVyYW5nZVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJmbG9hdDRcIl0gPSBcImZsb2F0NFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJmbG9hdDhcIl0gPSBcImZsb2F0OFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJpbnQyXCJdID0gXCJpbnQyXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImludDRcIl0gPSBcImludDRcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiaW50NHJhbmdlXCJdID0gXCJpbnQ0cmFuZ2VcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiaW50OFwiXSA9IFwiaW50OFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJpbnQ4cmFuZ2VcIl0gPSBcImludDhyYW5nZVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJqc29uXCJdID0gXCJqc29uXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImpzb25iXCJdID0gXCJqc29uYlwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJtb25leVwiXSA9IFwibW9uZXlcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wibnVtZXJpY1wiXSA9IFwibnVtZXJpY1wiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJvaWRcIl0gPSBcIm9pZFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJyZWx0aW1lXCJdID0gXCJyZWx0aW1lXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInRleHRcIl0gPSBcInRleHRcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1widGltZVwiXSA9IFwidGltZVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJ0aW1lc3RhbXBcIl0gPSBcInRpbWVzdGFtcFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJ0aW1lc3RhbXB0elwiXSA9IFwidGltZXN0YW1wdHpcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1widGltZXR6XCJdID0gXCJ0aW1ldHpcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1widHNyYW5nZVwiXSA9IFwidHNyYW5nZVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJ0c3R6cmFuZ2VcIl0gPSBcInRzdHpyYW5nZVwiO1xufSkoUG9zdGdyZXNUeXBlcyB8fCAoUG9zdGdyZXNUeXBlcyA9IHt9KSk7XG4vKipcbiAqIFRha2VzIGFuIGFycmF5IG9mIGNvbHVtbnMgYW5kIGFuIG9iamVjdCBvZiBzdHJpbmcgdmFsdWVzIHRoZW4gY29udmVydHMgZWFjaCBzdHJpbmcgdmFsdWVcbiAqIHRvIGl0cyBtYXBwZWQgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3tuYW1lOiBTdHJpbmcsIHR5cGU6IFN0cmluZ31bXX0gY29sdW1uc1xuICogQHBhcmFtIHtPYmplY3R9IHJlY29yZFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG1hcCBvZiB2YXJpb3VzIG9wdGlvbnMgdGhhdCBjYW4gYmUgYXBwbGllZCB0byB0aGUgbWFwcGVyXG4gKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnNraXBUeXBlcyBUaGUgYXJyYXkgb2YgdHlwZXMgdGhhdCBzaG91bGQgbm90IGJlIGNvbnZlcnRlZFxuICpcbiAqIEBleGFtcGxlIGNvbnZlcnRDaGFuZ2VEYXRhKFt7bmFtZTogJ2ZpcnN0X25hbWUnLCB0eXBlOiAndGV4dCd9LCB7bmFtZTogJ2FnZScsIHR5cGU6ICdpbnQ0J31dLCB7Zmlyc3RfbmFtZTogJ1BhdWwnLCBhZ2U6JzMzJ30sIHt9KVxuICogLy89PnsgZmlyc3RfbmFtZTogJ1BhdWwnLCBhZ2U6IDMzIH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRDaGFuZ2VEYXRhID0gKGNvbHVtbnMsIHJlY29yZCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHNraXBUeXBlcyA9IChfYSA9IG9wdGlvbnMuc2tpcFR5cGVzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocmVjb3JkKS5yZWR1Y2UoKGFjYywgcmVjX2tleSkgPT4ge1xuICAgICAgICBhY2NbcmVjX2tleV0gPSBjb252ZXJ0Q29sdW1uKHJlY19rZXksIGNvbHVtbnMsIHJlY29yZCwgc2tpcFR5cGVzKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyB0aGUgdmFsdWUgb2YgYW4gaW5kaXZpZHVhbCBjb2x1bW4uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNvbHVtbk5hbWUgVGhlIGNvbHVtbiB0aGF0IHlvdSB3YW50IHRvIGNvbnZlcnRcbiAqIEBwYXJhbSB7e25hbWU6IFN0cmluZywgdHlwZTogU3RyaW5nfVtdfSBjb2x1bW5zIEFsbCBvZiB0aGUgY29sdW1uc1xuICogQHBhcmFtIHtPYmplY3R9IHJlY29yZCBUaGUgbWFwIG9mIHN0cmluZyB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IHNraXBUeXBlcyBBbiBhcnJheSBvZiB0eXBlcyB0aGF0IHNob3VsZCBub3QgYmUgY29udmVydGVkXG4gKiBAcmV0dXJuIHtvYmplY3R9IFVzZWxlc3MgaW5mb3JtYXRpb25cbiAqXG4gKiBAZXhhbXBsZSBjb252ZXJ0Q29sdW1uKCdhZ2UnLCBbe25hbWU6ICdmaXJzdF9uYW1lJywgdHlwZTogJ3RleHQnfSwge25hbWU6ICdhZ2UnLCB0eXBlOiAnaW50NCd9XSwge2ZpcnN0X25hbWU6ICdQYXVsJywgYWdlOiAnMzMnfSwgW10pXG4gKiAvLz0+IDMzXG4gKiBAZXhhbXBsZSBjb252ZXJ0Q29sdW1uKCdhZ2UnLCBbe25hbWU6ICdmaXJzdF9uYW1lJywgdHlwZTogJ3RleHQnfSwge25hbWU6ICdhZ2UnLCB0eXBlOiAnaW50NCd9XSwge2ZpcnN0X25hbWU6ICdQYXVsJywgYWdlOiAnMzMnfSwgWydpbnQ0J10pXG4gKiAvLz0+IFwiMzNcIlxuICovXG5leHBvcnQgY29uc3QgY29udmVydENvbHVtbiA9IChjb2x1bW5OYW1lLCBjb2x1bW5zLCByZWNvcmQsIHNraXBUeXBlcykgPT4ge1xuICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbnMuZmluZCgoeCkgPT4geC5uYW1lID09PSBjb2x1bW5OYW1lKTtcbiAgICBjb25zdCBjb2xUeXBlID0gY29sdW1uID09PSBudWxsIHx8IGNvbHVtbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sdW1uLnR5cGU7XG4gICAgY29uc3QgdmFsdWUgPSByZWNvcmRbY29sdW1uTmFtZV07XG4gICAgaWYgKGNvbFR5cGUgJiYgIXNraXBUeXBlcy5pbmNsdWRlcyhjb2xUeXBlKSkge1xuICAgICAgICByZXR1cm4gY29udmVydENlbGwoY29sVHlwZSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gbm9vcCh2YWx1ZSk7XG59O1xuLyoqXG4gKiBJZiB0aGUgdmFsdWUgb2YgdGhlIGNlbGwgaXMgYG51bGxgLCByZXR1cm5zIG51bGwuXG4gKiBPdGhlcndpc2UgY29udmVydHMgdGhlIHN0cmluZyB2YWx1ZSB0byB0aGUgY29ycmVjdCB0eXBlLlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgQSBwb3N0Z3JlcyBjb2x1bW4gdHlwZVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFRoZSBjZWxsIHZhbHVlXG4gKlxuICogQGV4YW1wbGUgY29udmVydENlbGwoJ2Jvb2wnLCAndCcpXG4gKiAvLz0+IHRydWVcbiAqIEBleGFtcGxlIGNvbnZlcnRDZWxsKCdpbnQ4JywgJzEwJylcbiAqIC8vPT4gMTBcbiAqIEBleGFtcGxlIGNvbnZlcnRDZWxsKCdfaW50NCcsICd7MSwyLDMsNH0nKVxuICogLy89PiBbMSwyLDMsNF1cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRDZWxsID0gKHR5cGUsIHZhbHVlKSA9PiB7XG4gICAgLy8gaWYgZGF0YSB0eXBlIGlzIGFuIGFycmF5XG4gICAgaWYgKHR5cGUuY2hhckF0KDApID09PSAnXycpIHtcbiAgICAgICAgY29uc3QgZGF0YVR5cGUgPSB0eXBlLnNsaWNlKDEsIHR5cGUubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHRvQXJyYXkodmFsdWUsIGRhdGFUeXBlKTtcbiAgICB9XG4gICAgLy8gSWYgbm90IG51bGwsIGNvbnZlcnQgdG8gY29ycmVjdCB0eXBlLlxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuYm9vbDpcbiAgICAgICAgICAgIHJldHVybiB0b0Jvb2xlYW4odmFsdWUpO1xuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuZmxvYXQ0OlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuZmxvYXQ4OlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuaW50MjpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmludDQ6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5pbnQ4OlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMubnVtZXJpYzpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLm9pZDpcbiAgICAgICAgICAgIHJldHVybiB0b051bWJlcih2YWx1ZSk7XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5qc29uOlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuanNvbmI6XG4gICAgICAgICAgICByZXR1cm4gdG9Kc29uKHZhbHVlKTtcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnRpbWVzdGFtcDpcbiAgICAgICAgICAgIHJldHVybiB0b1RpbWVzdGFtcFN0cmluZyh2YWx1ZSk7IC8vIEZvcm1hdCB0byBiZSBjb25zaXN0ZW50IHdpdGggUG9zdGdSRVNUXG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5hYnN0aW1lOiAvLyBUbyBhbGxvdyB1c2VycyB0byBjYXN0IGl0IGJhc2VkIG9uIFRpbWV6b25lXG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5kYXRlOiAvLyBUbyBhbGxvdyB1c2VycyB0byBjYXN0IGl0IGJhc2VkIG9uIFRpbWV6b25lXG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5kYXRlcmFuZ2U6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5pbnQ0cmFuZ2U6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5pbnQ4cmFuZ2U6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5tb25leTpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnJlbHRpbWU6IC8vIFRvIGFsbG93IHVzZXJzIHRvIGNhc3QgaXQgYmFzZWQgb24gVGltZXpvbmVcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnRleHQ6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy50aW1lOiAvLyBUbyBhbGxvdyB1c2VycyB0byBjYXN0IGl0IGJhc2VkIG9uIFRpbWV6b25lXG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy50aW1lc3RhbXB0ejogLy8gVG8gYWxsb3cgdXNlcnMgdG8gY2FzdCBpdCBiYXNlZCBvbiBUaW1lem9uZVxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMudGltZXR6OiAvLyBUbyBhbGxvdyB1c2VycyB0byBjYXN0IGl0IGJhc2VkIG9uIFRpbWV6b25lXG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy50c3JhbmdlOlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMudHN0enJhbmdlOlxuICAgICAgICAgICAgcmV0dXJuIG5vb3AodmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSB2YWx1ZSBmb3IgcmVtYWluaW5nIHR5cGVzXG4gICAgICAgICAgICByZXR1cm4gbm9vcCh2YWx1ZSk7XG4gICAgfVxufTtcbmNvbnN0IG5vb3AgPSAodmFsdWUpID0+IHtcbiAgICByZXR1cm4gdmFsdWU7XG59O1xuZXhwb3J0IGNvbnN0IHRvQm9vbGVhbiA9ICh2YWx1ZSkgPT4ge1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY2FzZSAnZic6XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCB0b051bWJlciA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgIGlmICghTnVtYmVyLmlzTmFOKHBhcnNlZFZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlZFZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgdG9Kc29uID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBKU09OIHBhcnNlIGVycm9yOiAke2Vycm9yfWApO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn07XG4vKipcbiAqIENvbnZlcnRzIGEgUG9zdGdyZXMgQXJyYXkgaW50byBhIG5hdGl2ZSBKUyBhcnJheVxuICpcbiAqIEBleGFtcGxlIHRvQXJyYXkoJ3t9JywgJ2ludDQnKVxuICogLy89PiBbXVxuICogQGV4YW1wbGUgdG9BcnJheSgne1wiWzIwMjEtMDEtMDEsMjAyMS0xMi0zMSlcIixcIigyMDIxLTAxLTAxLDIwMjEtMTItMzJdXCJ9JywgJ2RhdGVyYW5nZScpXG4gKiAvLz0+IFsnWzIwMjEtMDEtMDEsMjAyMS0xMi0zMSknLCAnKDIwMjEtMDEtMDEsMjAyMS0xMi0zMl0nXVxuICogQGV4YW1wbGUgdG9BcnJheShbMSwyLDMsNF0sICdpbnQ0JylcbiAqIC8vPT4gWzEsMiwzLDRdXG4gKi9cbmV4cG9ydCBjb25zdCB0b0FycmF5ID0gKHZhbHVlLCB0eXBlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBjb25zdCBsYXN0SWR4ID0gdmFsdWUubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBjbG9zZUJyYWNlID0gdmFsdWVbbGFzdElkeF07XG4gICAgY29uc3Qgb3BlbkJyYWNlID0gdmFsdWVbMF07XG4gICAgLy8gQ29uZmlybSB2YWx1ZSBpcyBhIFBvc3RncmVzIGFycmF5IGJ5IGNoZWNraW5nIGN1cmx5IGJyYWNrZXRzXG4gICAgaWYgKG9wZW5CcmFjZSA9PT0gJ3snICYmIGNsb3NlQnJhY2UgPT09ICd9Jykge1xuICAgICAgICBsZXQgYXJyO1xuICAgICAgICBjb25zdCB2YWxUcmltID0gdmFsdWUuc2xpY2UoMSwgbGFzdElkeCk7XG4gICAgICAgIC8vIFRPRE86IGZpbmQgYSBiZXR0ZXIgc29sdXRpb24gdG8gc2VwYXJhdGUgUG9zdGdyZXMgYXJyYXkgZGF0YVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXJyID0gSlNPTi5wYXJzZSgnWycgKyB2YWxUcmltICsgJ10nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoXykge1xuICAgICAgICAgICAgLy8gV0FSTklORzogc3BsaXR0aW5nIG9uIGNvbW1hIGRvZXMgbm90IGNvdmVyIGFsbCBlZGdlIGNhc2VzXG4gICAgICAgICAgICBhcnIgPSB2YWxUcmltID8gdmFsVHJpbS5zcGxpdCgnLCcpIDogW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyci5tYXAoKHZhbCkgPT4gY29udmVydENlbGwodHlwZSwgdmFsKSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn07XG4vKipcbiAqIEZpeGVzIHRpbWVzdGFtcCB0byBiZSBJU08tODYwMS4gU3dhcHMgdGhlIHNwYWNlIGJldHdlZW4gdGhlIGRhdGUgYW5kIHRpbWUgZm9yIGEgJ1QnXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3N1cGFiYXNlL2lzc3Vlcy8xOFxuICpcbiAqIEBleGFtcGxlIHRvVGltZXN0YW1wU3RyaW5nKCcyMDE5LTA5LTEwIDAwOjAwOjAwJylcbiAqIC8vPT4gJzIwMTktMDktMTBUMDA6MDA6MDAnXG4gKi9cbmV4cG9ydCBjb25zdCB0b1RpbWVzdGFtcFN0cmluZyA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKCcgJywgJ1QnKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCBodHRwRW5kcG9pbnRVUkwgPSAoc29ja2V0VXJsKSA9PiB7XG4gICAgbGV0IHVybCA9IHNvY2tldFVybDtcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgvXndzL2ksICdodHRwJyk7XG4gICAgdXJsID0gdXJsLnJlcGxhY2UoLyhcXC9zb2NrZXRcXC93ZWJzb2NrZXR8XFwvc29ja2V0fFxcL3dlYnNvY2tldClcXC8/JC9pLCAnJyk7XG4gICAgcmV0dXJuIHVybC5yZXBsYWNlKC9cXC8rJC8sICcnKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmFuc2Zvcm1lcnMuanMubWFwIiwiZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMi4xMS4yJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlcnNpb24uanMubWFwIiwiaW1wb3J0IFN0b3JhZ2VGaWxlQXBpIGZyb20gJy4vcGFja2FnZXMvU3RvcmFnZUZpbGVBcGknO1xuaW1wb3J0IFN0b3JhZ2VCdWNrZXRBcGkgZnJvbSAnLi9wYWNrYWdlcy9TdG9yYWdlQnVja2V0QXBpJztcbmV4cG9ydCBjbGFzcyBTdG9yYWdlQ2xpZW50IGV4dGVuZHMgU3RvcmFnZUJ1Y2tldEFwaSB7XG4gICAgY29uc3RydWN0b3IodXJsLCBoZWFkZXJzID0ge30sIGZldGNoKSB7XG4gICAgICAgIHN1cGVyKHVybCwgaGVhZGVycywgZmV0Y2gpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGZpbGUgb3BlcmF0aW9uIGluIGEgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFRoZSBidWNrZXQgaWQgdG8gb3BlcmF0ZSBvbi5cbiAgICAgKi9cbiAgICBmcm9tKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RvcmFnZUZpbGVBcGkodGhpcy51cmwsIHRoaXMuaGVhZGVycywgaWQsIHRoaXMuZmV0Y2gpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0b3JhZ2VDbGllbnQuanMubWFwIiwiaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbic7XG5leHBvcnQgY29uc3QgREVGQVVMVF9IRUFERVJTID0geyAnWC1DbGllbnQtSW5mbyc6IGBzdG9yYWdlLWpzLyR7dmVyc2lvbn1gIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwiZXhwb3J0IGNsYXNzIFN0b3JhZ2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLl9faXNTdG9yYWdlRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLm5hbWUgPSAnU3RvcmFnZUVycm9yJztcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTdG9yYWdlRXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4gdHlwZW9mIGVycm9yID09PSAnb2JqZWN0JyAmJiBlcnJvciAhPT0gbnVsbCAmJiAnX19pc1N0b3JhZ2VFcnJvcicgaW4gZXJyb3I7XG59XG5leHBvcnQgY2xhc3MgU3RvcmFnZUFwaUVycm9yIGV4dGVuZHMgU3RvcmFnZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdTdG9yYWdlQXBpRXJyb3InO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgU3RvcmFnZVVua25vd25FcnJvciBleHRlbmRzIFN0b3JhZ2VFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgb3JpZ2luYWxFcnJvcikge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ1N0b3JhZ2VVbmtub3duRXJyb3InO1xuICAgICAgICB0aGlzLm9yaWdpbmFsRXJyb3IgPSBvcmlnaW5hbEVycm9yO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9ycy5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IFN0b3JhZ2VBcGlFcnJvciwgU3RvcmFnZVVua25vd25FcnJvciB9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7IHJlc29sdmVSZXNwb25zZSB9IGZyb20gJy4vaGVscGVycyc7XG5jb25zdCBfZ2V0RXJyb3JNZXNzYWdlID0gKGVycikgPT4gZXJyLm1zZyB8fCBlcnIubWVzc2FnZSB8fCBlcnIuZXJyb3JfZGVzY3JpcHRpb24gfHwgZXJyLmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGVycik7XG5jb25zdCBoYW5kbGVFcnJvciA9IChlcnJvciwgcmVqZWN0LCBvcHRpb25zKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBSZXMgPSB5aWVsZCByZXNvbHZlUmVzcG9uc2UoKTtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBSZXMgJiYgIShvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubm9SZXNvbHZlSnNvbikpIHtcbiAgICAgICAgZXJyb3JcbiAgICAgICAgICAgIC5qc29uKClcbiAgICAgICAgICAgIC50aGVuKChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgU3RvcmFnZUFwaUVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZXJyKSwgZXJyb3Iuc3RhdHVzIHx8IDUwMCkpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgU3RvcmFnZVVua25vd25FcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGVyciksIGVycikpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlamVjdChuZXcgU3RvcmFnZVVua25vd25FcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGVycm9yKSwgZXJyb3IpKTtcbiAgICB9XG59KTtcbmNvbnN0IF9nZXRSZXF1ZXN0UGFyYW1zID0gKG1ldGhvZCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSkgPT4ge1xuICAgIGNvbnN0IHBhcmFtcyA9IHsgbWV0aG9kLCBoZWFkZXJzOiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhlYWRlcnMpIHx8IHt9IH07XG4gICAgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG4gICAgcGFyYW1zLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhZGVycyk7XG4gICAgaWYgKGJvZHkpIHtcbiAgICAgICAgcGFyYW1zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKSwgcGFyYW1ldGVycyk7XG59O1xuZnVuY3Rpb24gX2hhbmRsZVJlcXVlc3QoZmV0Y2hlciwgbWV0aG9kLCB1cmwsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZmV0Y2hlcih1cmwsIF9nZXRSZXF1ZXN0UGFyYW1zKG1ldGhvZCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0Lm9rKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5ub1Jlc29sdmVKc29uKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4gcmVzb2x2ZShkYXRhKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBoYW5kbGVFcnJvcihlcnJvciwgcmVqZWN0LCBvcHRpb25zKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldChmZXRjaGVyLCB1cmwsIG9wdGlvbnMsIHBhcmFtZXRlcnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICByZXR1cm4gX2hhbmRsZVJlcXVlc3QoZmV0Y2hlciwgJ0dFVCcsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycyk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcG9zdChmZXRjaGVyLCB1cmwsIGJvZHksIG9wdGlvbnMsIHBhcmFtZXRlcnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICByZXR1cm4gX2hhbmRsZVJlcXVlc3QoZmV0Y2hlciwgJ1BPU1QnLCB1cmwsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHB1dChmZXRjaGVyLCB1cmwsIGJvZHksIG9wdGlvbnMsIHBhcmFtZXRlcnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICByZXR1cm4gX2hhbmRsZVJlcXVlc3QoZmV0Y2hlciwgJ1BVVCcsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGVhZChmZXRjaGVyLCB1cmwsIG9wdGlvbnMsIHBhcmFtZXRlcnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICByZXR1cm4gX2hhbmRsZVJlcXVlc3QoZmV0Y2hlciwgJ0hFQUQnLCB1cmwsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgbm9SZXNvbHZlSnNvbjogdHJ1ZSB9KSwgcGFyYW1ldGVycyk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlKGZldGNoZXIsIHVybCwgYm9keSwgb3B0aW9ucywgcGFyYW1ldGVycykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCAnREVMRVRFJywgdXJsLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZldGNoLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IHJlc29sdmVGZXRjaCA9IChjdXN0b21GZXRjaCkgPT4ge1xuICAgIGxldCBfZmV0Y2g7XG4gICAgaWYgKGN1c3RvbUZldGNoKSB7XG4gICAgICAgIF9mZXRjaCA9IGN1c3RvbUZldGNoO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZmV0Y2ggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIF9mZXRjaCA9ICguLi5hcmdzKSA9PiBpbXBvcnQoJ0BzdXBhYmFzZS9ub2RlLWZldGNoJykudGhlbigoeyBkZWZhdWx0OiBmZXRjaCB9KSA9PiBmZXRjaCguLi5hcmdzKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBfZmV0Y2goLi4uYXJncyk7XG59O1xuZXhwb3J0IGNvbnN0IHJlc29sdmVSZXNwb25zZSA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGlmICh0eXBlb2YgUmVzcG9uc2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuICh5aWVsZCBpbXBvcnQoJ0BzdXBhYmFzZS9ub2RlLWZldGNoJykpLlJlc3BvbnNlO1xuICAgIH1cbiAgICByZXR1cm4gUmVzcG9uc2U7XG59KTtcbmV4cG9ydCBjb25zdCByZWN1cnNpdmVUb0NhbWVsID0gKGl0ZW0pID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgICByZXR1cm4gaXRlbS5tYXAoKGVsKSA9PiByZWN1cnNpdmVUb0NhbWVsKGVsKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnZnVuY3Rpb24nIHx8IGl0ZW0gIT09IE9iamVjdChpdGVtKSkge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgT2JqZWN0LmVudHJpZXMoaXRlbSkuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGtleS5yZXBsYWNlKC8oWy1fXVthLXpdKS9naSwgKGMpID0+IGMudG9VcHBlckNhc2UoKS5yZXBsYWNlKC9bLV9dL2csICcnKSk7XG4gICAgICAgIHJlc3VsdFtuZXdLZXldID0gcmVjdXJzaXZlVG9DYW1lbCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oZWxwZXJzLmpzLm1hcCIsIi8vIGdlbmVyYXRlZCBieSBnZW52ZXJzaW9uXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcyLjcuMSc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZXJzaW9uLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgREVGQVVMVF9IRUFERVJTIH0gZnJvbSAnLi4vbGliL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBpc1N0b3JhZ2VFcnJvciB9IGZyb20gJy4uL2xpYi9lcnJvcnMnO1xuaW1wb3J0IHsgZ2V0LCBwb3N0LCBwdXQsIHJlbW92ZSB9IGZyb20gJy4uL2xpYi9mZXRjaCc7XG5pbXBvcnQgeyByZXNvbHZlRmV0Y2ggfSBmcm9tICcuLi9saWIvaGVscGVycyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlQnVja2V0QXBpIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIGhlYWRlcnMgPSB7fSwgZmV0Y2gpIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9IRUFERVJTKSwgaGVhZGVycyk7XG4gICAgICAgIHRoaXMuZmV0Y2ggPSByZXNvbHZlRmV0Y2goZmV0Y2gpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGRldGFpbHMgb2YgYWxsIFN0b3JhZ2UgYnVja2V0cyB3aXRoaW4gYW4gZXhpc3RpbmcgcHJvamVjdC5cbiAgICAgKi9cbiAgICBsaXN0QnVja2V0cygpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIGdldCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vYnVja2V0YCwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGRldGFpbHMgb2YgYW4gZXhpc3RpbmcgU3RvcmFnZSBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBidWNrZXQgeW91IHdvdWxkIGxpa2UgdG8gcmV0cmlldmUuXG4gICAgICovXG4gICAgZ2V0QnVja2V0KGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBnZXQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L2J1Y2tldC8ke2lkfWAsIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBTdG9yYWdlIGJ1Y2tldFxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIEEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBidWNrZXQgeW91IGFyZSBjcmVhdGluZy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5wdWJsaWMgVGhlIHZpc2liaWxpdHkgb2YgdGhlIGJ1Y2tldC4gUHVibGljIGJ1Y2tldHMgZG9uJ3QgcmVxdWlyZSBhbiBhdXRob3JpemF0aW9uIHRva2VuIHRvIGRvd25sb2FkIG9iamVjdHMsIGJ1dCBzdGlsbCByZXF1aXJlIGEgdmFsaWQgdG9rZW4gZm9yIGFsbCBvdGhlciBvcGVyYXRpb25zLiBCeSBkZWZhdWx0LCBidWNrZXRzIGFyZSBwcml2YXRlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmZpbGVTaXplTGltaXQgc3BlY2lmaWVzIHRoZSBtYXggZmlsZSBzaXplIGluIGJ5dGVzIHRoYXQgY2FuIGJlIHVwbG9hZGVkIHRvIHRoaXMgYnVja2V0LlxuICAgICAqIFRoZSBnbG9iYWwgZmlsZSBzaXplIGxpbWl0IHRha2VzIHByZWNlZGVuY2Ugb3ZlciB0aGlzIHZhbHVlLlxuICAgICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIG51bGwsIHdoaWNoIGRvZXNuJ3Qgc2V0IGEgcGVyIGJ1Y2tldCBmaWxlIHNpemUgbGltaXQuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYWxsb3dlZE1pbWVUeXBlcyBzcGVjaWZpZXMgdGhlIGFsbG93ZWQgbWltZSB0eXBlcyB0aGF0IHRoaXMgYnVja2V0IGNhbiBhY2NlcHQgZHVyaW5nIHVwbG9hZC5cbiAgICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBudWxsLCB3aGljaCBhbGxvd3MgZmlsZXMgd2l0aCBhbGwgbWltZSB0eXBlcyB0byBiZSB1cGxvYWRlZC5cbiAgICAgKiBFYWNoIG1pbWUgdHlwZSBzcGVjaWZpZWQgY2FuIGJlIGEgd2lsZGNhcmQsIGUuZy4gaW1hZ2UvKiwgb3IgYSBzcGVjaWZpYyBtaW1lIHR5cGUsIGUuZy4gaW1hZ2UvcG5nLlxuICAgICAqIEByZXR1cm5zIG5ld2x5IGNyZWF0ZWQgYnVja2V0IGlkXG4gICAgICovXG4gICAgY3JlYXRlQnVja2V0KGlkLCBvcHRpb25zID0ge1xuICAgICAgICBwdWJsaWM6IGZhbHNlLFxuICAgIH0pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L2J1Y2tldGAsIHtcbiAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGlkLFxuICAgICAgICAgICAgICAgICAgICBwdWJsaWM6IG9wdGlvbnMucHVibGljLFxuICAgICAgICAgICAgICAgICAgICBmaWxlX3NpemVfbGltaXQ6IG9wdGlvbnMuZmlsZVNpemVMaW1pdCxcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZF9taW1lX3R5cGVzOiBvcHRpb25zLmFsbG93ZWRNaW1lVHlwZXMsXG4gICAgICAgICAgICAgICAgfSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIGEgU3RvcmFnZSBidWNrZXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBBIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgYnVja2V0IHlvdSBhcmUgdXBkYXRpbmcuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucHVibGljIFRoZSB2aXNpYmlsaXR5IG9mIHRoZSBidWNrZXQuIFB1YmxpYyBidWNrZXRzIGRvbid0IHJlcXVpcmUgYW4gYXV0aG9yaXphdGlvbiB0b2tlbiB0byBkb3dubG9hZCBvYmplY3RzLCBidXQgc3RpbGwgcmVxdWlyZSBhIHZhbGlkIHRva2VuIGZvciBhbGwgb3RoZXIgb3BlcmF0aW9ucy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5maWxlU2l6ZUxpbWl0IHNwZWNpZmllcyB0aGUgbWF4IGZpbGUgc2l6ZSBpbiBieXRlcyB0aGF0IGNhbiBiZSB1cGxvYWRlZCB0byB0aGlzIGJ1Y2tldC5cbiAgICAgKiBUaGUgZ2xvYmFsIGZpbGUgc2l6ZSBsaW1pdCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgdGhpcyB2YWx1ZS5cbiAgICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBudWxsLCB3aGljaCBkb2Vzbid0IHNldCBhIHBlciBidWNrZXQgZmlsZSBzaXplIGxpbWl0LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmFsbG93ZWRNaW1lVHlwZXMgc3BlY2lmaWVzIHRoZSBhbGxvd2VkIG1pbWUgdHlwZXMgdGhhdCB0aGlzIGJ1Y2tldCBjYW4gYWNjZXB0IGR1cmluZyB1cGxvYWQuXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgbnVsbCwgd2hpY2ggYWxsb3dzIGZpbGVzIHdpdGggYWxsIG1pbWUgdHlwZXMgdG8gYmUgdXBsb2FkZWQuXG4gICAgICogRWFjaCBtaW1lIHR5cGUgc3BlY2lmaWVkIGNhbiBiZSBhIHdpbGRjYXJkLCBlLmcuIGltYWdlLyosIG9yIGEgc3BlY2lmaWMgbWltZSB0eXBlLCBlLmcuIGltYWdlL3BuZy5cbiAgICAgKi9cbiAgICB1cGRhdGVCdWNrZXQoaWQsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHB1dCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vYnVja2V0LyR7aWR9YCwge1xuICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogaWQsXG4gICAgICAgICAgICAgICAgICAgIHB1YmxpYzogb3B0aW9ucy5wdWJsaWMsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVfc2l6ZV9saW1pdDogb3B0aW9ucy5maWxlU2l6ZUxpbWl0LFxuICAgICAgICAgICAgICAgICAgICBhbGxvd2VkX21pbWVfdHlwZXM6IG9wdGlvbnMuYWxsb3dlZE1pbWVUeXBlcyxcbiAgICAgICAgICAgICAgICB9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIG9iamVjdHMgaW5zaWRlIGEgc2luZ2xlIGJ1Y2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBUaGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGJ1Y2tldCB5b3Ugd291bGQgbGlrZSB0byBlbXB0eS5cbiAgICAgKi9cbiAgICBlbXB0eUJ1Y2tldChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vYnVja2V0LyR7aWR9L2VtcHR5YCwge30sIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhbiBleGlzdGluZyBidWNrZXQuIEEgYnVja2V0IGNhbid0IGJlIGRlbGV0ZWQgd2l0aCBleGlzdGluZyBvYmplY3RzIGluc2lkZSBpdC5cbiAgICAgKiBZb3UgbXVzdCBmaXJzdCBgZW1wdHkoKWAgdGhlIGJ1Y2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBUaGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGJ1Y2tldCB5b3Ugd291bGQgbGlrZSB0byBkZWxldGUuXG4gICAgICovXG4gICAgZGVsZXRlQnVja2V0KGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZW1vdmUodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L2J1Y2tldC8ke2lkfWAsIHt9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3RvcmFnZUJ1Y2tldEFwaS5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IGlzU3RvcmFnZUVycm9yLCBTdG9yYWdlRXJyb3IsIFN0b3JhZ2VVbmtub3duRXJyb3IgfSBmcm9tICcuLi9saWIvZXJyb3JzJztcbmltcG9ydCB7IGdldCwgaGVhZCwgcG9zdCwgcmVtb3ZlIH0gZnJvbSAnLi4vbGliL2ZldGNoJztcbmltcG9ydCB7IHJlY3Vyc2l2ZVRvQ2FtZWwsIHJlc29sdmVGZXRjaCB9IGZyb20gJy4uL2xpYi9oZWxwZXJzJztcbmNvbnN0IERFRkFVTFRfU0VBUkNIX09QVElPTlMgPSB7XG4gICAgbGltaXQ6IDEwMCxcbiAgICBvZmZzZXQ6IDAsXG4gICAgc29ydEJ5OiB7XG4gICAgICAgIGNvbHVtbjogJ25hbWUnLFxuICAgICAgICBvcmRlcjogJ2FzYycsXG4gICAgfSxcbn07XG5jb25zdCBERUZBVUxUX0ZJTEVfT1BUSU9OUyA9IHtcbiAgICBjYWNoZUNvbnRyb2w6ICczNjAwJyxcbiAgICBjb250ZW50VHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcsXG4gICAgdXBzZXJ0OiBmYWxzZSxcbn07XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlRmlsZUFwaSB7XG4gICAgY29uc3RydWN0b3IodXJsLCBoZWFkZXJzID0ge30sIGJ1Y2tldElkLCBmZXRjaCkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgdGhpcy5idWNrZXRJZCA9IGJ1Y2tldElkO1xuICAgICAgICB0aGlzLmZldGNoID0gcmVzb2x2ZUZldGNoKGZldGNoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBsb2FkcyBhIGZpbGUgdG8gYW4gZXhpc3RpbmcgYnVja2V0IG9yIHJlcGxhY2VzIGFuIGV4aXN0aW5nIGZpbGUgYXQgdGhlIHNwZWNpZmllZCBwYXRoIHdpdGggYSBuZXcgb25lLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1ldGhvZCBIVFRQIG1ldGhvZC5cbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgcmVsYXRpdmUgZmlsZSBwYXRoLiBTaG91bGQgYmUgb2YgdGhlIGZvcm1hdCBgZm9sZGVyL3N1YmZvbGRlci9maWxlbmFtZS5wbmdgLiBUaGUgYnVja2V0IG11c3QgYWxyZWFkeSBleGlzdCBiZWZvcmUgYXR0ZW1wdGluZyB0byB1cGxvYWQuXG4gICAgICogQHBhcmFtIGZpbGVCb2R5IFRoZSBib2R5IG9mIHRoZSBmaWxlIHRvIGJlIHN0b3JlZCBpbiB0aGUgYnVja2V0LlxuICAgICAqL1xuICAgIHVwbG9hZE9yVXBkYXRlKG1ldGhvZCwgcGF0aCwgZmlsZUJvZHksIGZpbGVPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBib2R5O1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfRklMRV9PUFRJT05TKSwgZmlsZU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGxldCBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhlYWRlcnMpLCAobWV0aG9kID09PSAnUE9TVCcgJiYgeyAneC11cHNlcnQnOiBTdHJpbmcob3B0aW9ucy51cHNlcnQpIH0pKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IG9wdGlvbnMubWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlQm9keSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCgnY2FjaGVDb250cm9sJywgb3B0aW9ucy5jYWNoZUNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCdtZXRhZGF0YScsIHRoaXMuZW5jb2RlTWV0YWRhdGEobWV0YWRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCgnJywgZmlsZUJvZHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIGZpbGVCb2R5IGluc3RhbmNlb2YgRm9ybURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IGZpbGVCb2R5O1xuICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCgnY2FjaGVDb250cm9sJywgb3B0aW9ucy5jYWNoZUNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCdtZXRhZGF0YScsIHRoaXMuZW5jb2RlTWV0YWRhdGEobWV0YWRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IGZpbGVCb2R5O1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzWydjYWNoZS1jb250cm9sJ10gPSBgbWF4LWFnZT0ke29wdGlvbnMuY2FjaGVDb250cm9sfWA7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gb3B0aW9ucy5jb250ZW50VHlwZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzWyd4LW1ldGFkYXRhJ10gPSB0aGlzLnRvQmFzZTY0KHRoaXMuZW5jb2RlTWV0YWRhdGEobWV0YWRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlsZU9wdGlvbnMgPT09IG51bGwgfHwgZmlsZU9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZpbGVPcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgaGVhZGVycyksIGZpbGVPcHRpb25zLmhlYWRlcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhblBhdGggPSB0aGlzLl9yZW1vdmVFbXB0eUZvbGRlcnMocGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgoY2xlYW5QYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB5aWVsZCB0aGlzLmZldGNoKGAke3RoaXMudXJsfS9vYmplY3QvJHtfcGF0aH1gLCBPYmplY3QuYXNzaWduKHsgbWV0aG9kLCBib2R5OiBib2R5LCBoZWFkZXJzIH0sICgob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmR1cGxleCkgPyB7IGR1cGxleDogb3B0aW9ucy5kdXBsZXggfSA6IHt9KSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgcGF0aDogY2xlYW5QYXRoLCBpZDogZGF0YS5JZCwgZnVsbFBhdGg6IGRhdGEuS2V5IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBsb2FkcyBhIGZpbGUgdG8gYW4gZXhpc3RpbmcgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggVGhlIGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBmaWxlIG5hbWUuIFNob3VsZCBiZSBvZiB0aGUgZm9ybWF0IGBmb2xkZXIvc3ViZm9sZGVyL2ZpbGVuYW1lLnBuZ2AuIFRoZSBidWNrZXQgbXVzdCBhbHJlYWR5IGV4aXN0IGJlZm9yZSBhdHRlbXB0aW5nIHRvIHVwbG9hZC5cbiAgICAgKiBAcGFyYW0gZmlsZUJvZHkgVGhlIGJvZHkgb2YgdGhlIGZpbGUgdG8gYmUgc3RvcmVkIGluIHRoZSBidWNrZXQuXG4gICAgICovXG4gICAgdXBsb2FkKHBhdGgsIGZpbGVCb2R5LCBmaWxlT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkT3JVcGRhdGUoJ1BPU1QnLCBwYXRoLCBmaWxlQm9keSwgZmlsZU9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBsb2FkIGEgZmlsZSB3aXRoIGEgdG9rZW4gZ2VuZXJhdGVkIGZyb20gYGNyZWF0ZVNpZ25lZFVwbG9hZFVybGAuXG4gICAgICogQHBhcmFtIHBhdGggVGhlIGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBmaWxlIG5hbWUuIFNob3VsZCBiZSBvZiB0aGUgZm9ybWF0IGBmb2xkZXIvc3ViZm9sZGVyL2ZpbGVuYW1lLnBuZ2AuIFRoZSBidWNrZXQgbXVzdCBhbHJlYWR5IGV4aXN0IGJlZm9yZSBhdHRlbXB0aW5nIHRvIHVwbG9hZC5cbiAgICAgKiBAcGFyYW0gdG9rZW4gVGhlIHRva2VuIGdlbmVyYXRlZCBmcm9tIGBjcmVhdGVTaWduZWRVcGxvYWRVcmxgXG4gICAgICogQHBhcmFtIGZpbGVCb2R5IFRoZSBib2R5IG9mIHRoZSBmaWxlIHRvIGJlIHN0b3JlZCBpbiB0aGUgYnVja2V0LlxuICAgICAqL1xuICAgIHVwbG9hZFRvU2lnbmVkVXJsKHBhdGgsIHRva2VuLCBmaWxlQm9keSwgZmlsZU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsZWFuUGF0aCA9IHRoaXMuX3JlbW92ZUVtcHR5Rm9sZGVycyhwYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IF9wYXRoID0gdGhpcy5fZ2V0RmluYWxQYXRoKGNsZWFuUGF0aCk7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHRoaXMudXJsICsgYC9vYmplY3QvdXBsb2FkL3NpZ24vJHtfcGF0aH1gKTtcbiAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KCd0b2tlbicsIHRva2VuKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyB1cHNlcnQ6IERFRkFVTFRfRklMRV9PUFRJT05TLnVwc2VydCB9LCBmaWxlT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oZWFkZXJzKSwgeyAneC11cHNlcnQnOiBTdHJpbmcob3B0aW9ucy51cHNlcnQpIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZUJvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJ2NhY2hlQ29udHJvbCcsIG9wdGlvbnMuY2FjaGVDb250cm9sKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJycsIGZpbGVCb2R5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlQm9keSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBmaWxlQm9keTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJ2NhY2hlQ29udHJvbCcsIG9wdGlvbnMuY2FjaGVDb250cm9sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBmaWxlQm9keTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1snY2FjaGUtY29udHJvbCddID0gYG1heC1hZ2U9JHtvcHRpb25zLmNhY2hlQ29udHJvbH1gO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzWydjb250ZW50LXR5cGUnXSA9IG9wdGlvbnMuY29udGVudFR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIHRoaXMuZmV0Y2godXJsLnRvU3RyaW5nKCksIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHBhdGg6IGNsZWFuUGF0aCwgZnVsbFBhdGg6IGRhdGEuS2V5IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHNpZ25lZCB1cGxvYWQgVVJMLlxuICAgICAqIFNpZ25lZCB1cGxvYWQgVVJMcyBjYW4gYmUgdXNlZCB0byB1cGxvYWQgZmlsZXMgdG8gdGhlIGJ1Y2tldCB3aXRob3V0IGZ1cnRoZXIgYXV0aGVudGljYXRpb24uXG4gICAgICogVGhleSBhcmUgdmFsaWQgZm9yIDIgaG91cnMuXG4gICAgICogQHBhcmFtIHBhdGggVGhlIGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBjdXJyZW50IGZpbGUgbmFtZS4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS5wbmdgLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnVwc2VydCBJZiBzZXQgdG8gdHJ1ZSwgYWxsb3dzIHRoZSBmaWxlIHRvIGJlIG92ZXJ3cml0dGVuIGlmIGl0IGFscmVhZHkgZXhpc3RzLlxuICAgICAqL1xuICAgIGNyZWF0ZVNpZ25lZFVwbG9hZFVybChwYXRoLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBfcGF0aCA9IHRoaXMuX2dldEZpbmFsUGF0aChwYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oZWFkZXJzKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnVwc2VydCkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzWyd4LXVwc2VydCddID0gJ3RydWUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0L3VwbG9hZC9zaWduLyR7X3BhdGh9YCwge30sIHsgaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHRoaXMudXJsICsgZGF0YS51cmwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3RvcmFnZUVycm9yKCdObyB0b2tlbiByZXR1cm5lZCBieSBBUEknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzaWduZWRVcmw6IHVybC50b1N0cmluZygpLCBwYXRoLCB0b2tlbiB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIGFuIGV4aXN0aW5nIGZpbGUgYXQgdGhlIHNwZWNpZmllZCBwYXRoIHdpdGggYSBuZXcgb25lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggVGhlIHJlbGF0aXZlIGZpbGUgcGF0aC4gU2hvdWxkIGJlIG9mIHRoZSBmb3JtYXQgYGZvbGRlci9zdWJmb2xkZXIvZmlsZW5hbWUucG5nYC4gVGhlIGJ1Y2tldCBtdXN0IGFscmVhZHkgZXhpc3QgYmVmb3JlIGF0dGVtcHRpbmcgdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSBmaWxlQm9keSBUaGUgYm9keSBvZiB0aGUgZmlsZSB0byBiZSBzdG9yZWQgaW4gdGhlIGJ1Y2tldC5cbiAgICAgKi9cbiAgICB1cGRhdGUocGF0aCwgZmlsZUJvZHksIGZpbGVPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRPclVwZGF0ZSgnUFVUJywgcGF0aCwgZmlsZUJvZHksIGZpbGVPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1vdmVzIGFuIGV4aXN0aW5nIGZpbGUgdG8gYSBuZXcgcGF0aCBpbiB0aGUgc2FtZSBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnJvbVBhdGggVGhlIG9yaWdpbmFsIGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBjdXJyZW50IGZpbGUgbmFtZS4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS5wbmdgLlxuICAgICAqIEBwYXJhbSB0b1BhdGggVGhlIG5ldyBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgbmV3IGZpbGUgbmFtZS4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS1uZXcucG5nYC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgZGVzdGluYXRpb24gb3B0aW9ucy5cbiAgICAgKi9cbiAgICBtb3ZlKGZyb21QYXRoLCB0b1BhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC9tb3ZlYCwge1xuICAgICAgICAgICAgICAgICAgICBidWNrZXRJZDogdGhpcy5idWNrZXRJZCxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlS2V5OiBmcm9tUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25LZXk6IHRvUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kZXN0aW5hdGlvbkJ1Y2tldCxcbiAgICAgICAgICAgICAgICB9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvcGllcyBhbiBleGlzdGluZyBmaWxlIHRvIGEgbmV3IHBhdGggaW4gdGhlIHNhbWUgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGZyb21QYXRoIFRoZSBvcmlnaW5hbCBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgY3VycmVudCBmaWxlIG5hbWUuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UucG5nYC5cbiAgICAgKiBAcGFyYW0gdG9QYXRoIFRoZSBuZXcgZmlsZSBwYXRoLCBpbmNsdWRpbmcgdGhlIG5ldyBmaWxlIG5hbWUuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UtY29weS5wbmdgLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIFRoZSBkZXN0aW5hdGlvbiBvcHRpb25zLlxuICAgICAqL1xuICAgIGNvcHkoZnJvbVBhdGgsIHRvUGF0aCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0L2NvcHlgLCB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Y2tldElkOiB0aGlzLmJ1Y2tldElkLFxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VLZXk6IGZyb21QYXRoLFxuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbktleTogdG9QYXRoLFxuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRlc3RpbmF0aW9uQnVja2V0LFxuICAgICAgICAgICAgICAgIH0sIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgcGF0aDogZGF0YS5LZXkgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgc2lnbmVkIFVSTC4gVXNlIGEgc2lnbmVkIFVSTCB0byBzaGFyZSBhIGZpbGUgZm9yIGEgZml4ZWQgYW1vdW50IG9mIHRpbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgZmlsZSBwYXRoLCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZmlsZSBuYW1lLiBGb3IgZXhhbXBsZSBgZm9sZGVyL2ltYWdlLnBuZ2AuXG4gICAgICogQHBhcmFtIGV4cGlyZXNJbiBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdW50aWwgdGhlIHNpZ25lZCBVUkwgZXhwaXJlcy4gRm9yIGV4YW1wbGUsIGA2MGAgZm9yIGEgVVJMIHdoaWNoIGlzIHZhbGlkIGZvciBvbmUgbWludXRlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRvd25sb2FkIHRyaWdnZXJzIHRoZSBmaWxlIGFzIGEgZG93bmxvYWQgaWYgc2V0IHRvIHRydWUuIFNldCB0aGlzIHBhcmFtZXRlciBhcyB0aGUgbmFtZSBvZiB0aGUgZmlsZSBpZiB5b3Ugd2FudCB0byB0cmlnZ2VyIHRoZSBkb3dubG9hZCB3aXRoIGEgZGlmZmVyZW50IGZpbGVuYW1lLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRyYW5zZm9ybSBUcmFuc2Zvcm0gdGhlIGFzc2V0IGJlZm9yZSBzZXJ2aW5nIGl0IHRvIHRoZSBjbGllbnQuXG4gICAgICovXG4gICAgY3JlYXRlU2lnbmVkVXJsKHBhdGgsIGV4cGlyZXNJbiwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgocGF0aCk7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB5aWVsZCBwb3N0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9vYmplY3Qvc2lnbi8ke19wYXRofWAsIE9iamVjdC5hc3NpZ24oeyBleHBpcmVzSW4gfSwgKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudHJhbnNmb3JtKSA/IHsgdHJhbnNmb3JtOiBvcHRpb25zLnRyYW5zZm9ybSB9IDoge30pKSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZG93bmxvYWRRdWVyeVBhcmFtID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kb3dubG9hZClcbiAgICAgICAgICAgICAgICAgICAgPyBgJmRvd25sb2FkPSR7b3B0aW9ucy5kb3dubG9hZCA9PT0gdHJ1ZSA/ICcnIDogb3B0aW9ucy5kb3dubG9hZH1gXG4gICAgICAgICAgICAgICAgICAgIDogJyc7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2lnbmVkVXJsID0gZW5jb2RlVVJJKGAke3RoaXMudXJsfSR7ZGF0YS5zaWduZWRVUkx9JHtkb3dubG9hZFF1ZXJ5UGFyYW19YCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHsgc2lnbmVkVXJsIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIG11bHRpcGxlIHNpZ25lZCBVUkxzLiBVc2UgYSBzaWduZWQgVVJMIHRvIHNoYXJlIGEgZmlsZSBmb3IgYSBmaXhlZCBhbW91bnQgb2YgdGltZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRocyBUaGUgZmlsZSBwYXRocyB0byBiZSBkb3dubG9hZGVkLCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZmlsZSBuYW1lcy4gRm9yIGV4YW1wbGUgYFsnZm9sZGVyL2ltYWdlLnBuZycsICdmb2xkZXIyL2ltYWdlMi5wbmcnXWAuXG4gICAgICogQHBhcmFtIGV4cGlyZXNJbiBUaGUgbnVtYmVyIG9mIHNlY29uZHMgdW50aWwgdGhlIHNpZ25lZCBVUkxzIGV4cGlyZS4gRm9yIGV4YW1wbGUsIGA2MGAgZm9yIFVSTHMgd2hpY2ggYXJlIHZhbGlkIGZvciBvbmUgbWludXRlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRvd25sb2FkIHRyaWdnZXJzIHRoZSBmaWxlIGFzIGEgZG93bmxvYWQgaWYgc2V0IHRvIHRydWUuIFNldCB0aGlzIHBhcmFtZXRlciBhcyB0aGUgbmFtZSBvZiB0aGUgZmlsZSBpZiB5b3Ugd2FudCB0byB0cmlnZ2VyIHRoZSBkb3dubG9hZCB3aXRoIGEgZGlmZmVyZW50IGZpbGVuYW1lLlxuICAgICAqL1xuICAgIGNyZWF0ZVNpZ25lZFVybHMocGF0aHMsIGV4cGlyZXNJbiwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0L3NpZ24vJHt0aGlzLmJ1Y2tldElkfWAsIHsgZXhwaXJlc0luLCBwYXRocyB9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBkb3dubG9hZFF1ZXJ5UGFyYW0gPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRvd25sb2FkKVxuICAgICAgICAgICAgICAgICAgICA/IGAmZG93bmxvYWQ9JHtvcHRpb25zLmRvd25sb2FkID09PSB0cnVlID8gJycgOiBvcHRpb25zLmRvd25sb2FkfWBcbiAgICAgICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLm1hcCgoZGF0dW0pID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGRhdHVtKSwgeyBzaWduZWRVcmw6IGRhdHVtLnNpZ25lZFVSTFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZW5jb2RlVVJJKGAke3RoaXMudXJsfSR7ZGF0dW0uc2lnbmVkVVJMfSR7ZG93bmxvYWRRdWVyeVBhcmFtfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsIH0pKSksXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRG93bmxvYWRzIGEgZmlsZSBmcm9tIGEgcHJpdmF0ZSBidWNrZXQuIEZvciBwdWJsaWMgYnVja2V0cywgbWFrZSBhIHJlcXVlc3QgdG8gdGhlIFVSTCByZXR1cm5lZCBmcm9tIGBnZXRQdWJsaWNVcmxgIGluc3RlYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgZnVsbCBwYXRoIGFuZCBmaWxlIG5hbWUgb2YgdGhlIGZpbGUgdG8gYmUgZG93bmxvYWRlZC4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS5wbmdgLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRyYW5zZm9ybSBUcmFuc2Zvcm0gdGhlIGFzc2V0IGJlZm9yZSBzZXJ2aW5nIGl0IHRvIHRoZSBjbGllbnQuXG4gICAgICovXG4gICAgZG93bmxvYWQocGF0aCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3Qgd2FudHNUcmFuc2Zvcm1hdGlvbiA9IHR5cGVvZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRyYW5zZm9ybSkgIT09ICd1bmRlZmluZWQnO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyUGF0aCA9IHdhbnRzVHJhbnNmb3JtYXRpb24gPyAncmVuZGVyL2ltYWdlL2F1dGhlbnRpY2F0ZWQnIDogJ29iamVjdCc7XG4gICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1hdGlvblF1ZXJ5ID0gdGhpcy50cmFuc2Zvcm1PcHRzVG9RdWVyeVN0cmluZygob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRyYW5zZm9ybSkgfHwge30pO1xuICAgICAgICAgICAgY29uc3QgcXVlcnlTdHJpbmcgPSB0cmFuc2Zvcm1hdGlvblF1ZXJ5ID8gYD8ke3RyYW5zZm9ybWF0aW9uUXVlcnl9YCA6ICcnO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfcGF0aCA9IHRoaXMuX2dldEZpbmFsUGF0aChwYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB5aWVsZCBnZXQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9LyR7cmVuZGVyUGF0aH0vJHtfcGF0aH0ke3F1ZXJ5U3RyaW5nfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBub1Jlc29sdmVKc29uOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXMuYmxvYigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBkZXRhaWxzIG9mIGFuIGV4aXN0aW5nIGZpbGUuXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKi9cbiAgICBpbmZvKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IF9wYXRoID0gdGhpcy5fZ2V0RmluYWxQYXRoKHBhdGgpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgZ2V0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9vYmplY3QvaW5mby8ke19wYXRofWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHJlY3Vyc2l2ZVRvQ2FtZWwoZGF0YSksIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRoZSBleGlzdGVuY2Ugb2YgYSBmaWxlLlxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICovXG4gICAgZXhpc3RzKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IF9wYXRoID0gdGhpcy5fZ2V0RmluYWxQYXRoKHBhdGgpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB5aWVsZCBoZWFkKHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9vYmplY3QvJHtfcGF0aH1gLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB0cnVlLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSAmJiBlcnJvciBpbnN0YW5jZW9mIFN0b3JhZ2VVbmtub3duRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxFcnJvciA9IGVycm9yLm9yaWdpbmFsRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIGlmIChbNDAwLCA0MDRdLmluY2x1ZGVzKG9yaWdpbmFsRXJyb3IgPT09IG51bGwgfHwgb3JpZ2luYWxFcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3JpZ2luYWxFcnJvci5zdGF0dXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBmYWxzZSwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2ltcGxlIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGdldCB0aGUgVVJMIGZvciBhbiBhc3NldCBpbiBhIHB1YmxpYyBidWNrZXQuIElmIHlvdSBkbyBub3Qgd2FudCB0byB1c2UgdGhpcyBmdW5jdGlvbiwgeW91IGNhbiBjb25zdHJ1Y3QgdGhlIHB1YmxpYyBVUkwgYnkgY29uY2F0ZW5hdGluZyB0aGUgYnVja2V0IFVSTCB3aXRoIHRoZSBwYXRoIHRvIHRoZSBhc3NldC5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGRvZXMgbm90IHZlcmlmeSBpZiB0aGUgYnVja2V0IGlzIHB1YmxpYy4gSWYgYSBwdWJsaWMgVVJMIGlzIGNyZWF0ZWQgZm9yIGEgYnVja2V0IHdoaWNoIGlzIG5vdCBwdWJsaWMsIHlvdSB3aWxsIG5vdCBiZSBhYmxlIHRvIGRvd25sb2FkIHRoZSBhc3NldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBwYXRoIGFuZCBuYW1lIG9mIHRoZSBmaWxlIHRvIGdlbmVyYXRlIHRoZSBwdWJsaWMgVVJMIGZvci4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS5wbmdgLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRvd25sb2FkIFRyaWdnZXJzIHRoZSBmaWxlIGFzIGEgZG93bmxvYWQgaWYgc2V0IHRvIHRydWUuIFNldCB0aGlzIHBhcmFtZXRlciBhcyB0aGUgbmFtZSBvZiB0aGUgZmlsZSBpZiB5b3Ugd2FudCB0byB0cmlnZ2VyIHRoZSBkb3dubG9hZCB3aXRoIGEgZGlmZmVyZW50IGZpbGVuYW1lLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRyYW5zZm9ybSBUcmFuc2Zvcm0gdGhlIGFzc2V0IGJlZm9yZSBzZXJ2aW5nIGl0IHRvIHRoZSBjbGllbnQuXG4gICAgICovXG4gICAgZ2V0UHVibGljVXJsKHBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgocGF0aCk7XG4gICAgICAgIGNvbnN0IF9xdWVyeVN0cmluZyA9IFtdO1xuICAgICAgICBjb25zdCBkb3dubG9hZFF1ZXJ5UGFyYW0gPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRvd25sb2FkKVxuICAgICAgICAgICAgPyBgZG93bmxvYWQ9JHtvcHRpb25zLmRvd25sb2FkID09PSB0cnVlID8gJycgOiBvcHRpb25zLmRvd25sb2FkfWBcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIGlmIChkb3dubG9hZFF1ZXJ5UGFyYW0gIT09ICcnKSB7XG4gICAgICAgICAgICBfcXVlcnlTdHJpbmcucHVzaChkb3dubG9hZFF1ZXJ5UGFyYW0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdhbnRzVHJhbnNmb3JtYXRpb24gPSB0eXBlb2YgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy50cmFuc2Zvcm0pICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgY29uc3QgcmVuZGVyUGF0aCA9IHdhbnRzVHJhbnNmb3JtYXRpb24gPyAncmVuZGVyL2ltYWdlJyA6ICdvYmplY3QnO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1hdGlvblF1ZXJ5ID0gdGhpcy50cmFuc2Zvcm1PcHRzVG9RdWVyeVN0cmluZygob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRyYW5zZm9ybSkgfHwge30pO1xuICAgICAgICBpZiAodHJhbnNmb3JtYXRpb25RdWVyeSAhPT0gJycpIHtcbiAgICAgICAgICAgIF9xdWVyeVN0cmluZy5wdXNoKHRyYW5zZm9ybWF0aW9uUXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBxdWVyeVN0cmluZyA9IF9xdWVyeVN0cmluZy5qb2luKCcmJyk7XG4gICAgICAgIGlmIChxdWVyeVN0cmluZyAhPT0gJycpIHtcbiAgICAgICAgICAgIHF1ZXJ5U3RyaW5nID0gYD8ke3F1ZXJ5U3RyaW5nfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHsgcHVibGljVXJsOiBlbmNvZGVVUkkoYCR7dGhpcy51cmx9LyR7cmVuZGVyUGF0aH0vcHVibGljLyR7X3BhdGh9JHtxdWVyeVN0cmluZ31gKSB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGZpbGVzIHdpdGhpbiB0aGUgc2FtZSBidWNrZXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRocyBBbiBhcnJheSBvZiBmaWxlcyB0byBkZWxldGUsIGluY2x1ZGluZyB0aGUgcGF0aCBhbmQgZmlsZSBuYW1lLiBGb3IgZXhhbXBsZSBbYCdmb2xkZXIvaW1hZ2UucG5nJ2BdLlxuICAgICAqL1xuICAgIHJlbW92ZShwYXRocykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVtb3ZlKHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9vYmplY3QvJHt0aGlzLmJ1Y2tldElkfWAsIHsgcHJlZml4ZXM6IHBhdGhzIH0sIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGZpbGUgbWV0YWRhdGFcbiAgICAgKiBAcGFyYW0gaWQgdGhlIGZpbGUgaWQgdG8gcmV0cmlldmUgbWV0YWRhdGFcbiAgICAgKi9cbiAgICAvLyBhc3luYyBnZXRNZXRhZGF0YShcbiAgICAvLyAgIGlkOiBzdHJpbmdcbiAgICAvLyApOiBQcm9taXNlPFxuICAgIC8vICAgfCB7XG4gICAgLy8gICAgICAgZGF0YTogTWV0YWRhdGFcbiAgICAvLyAgICAgICBlcnJvcjogbnVsbFxuICAgIC8vICAgICB9XG4gICAgLy8gICB8IHtcbiAgICAvLyAgICAgICBkYXRhOiBudWxsXG4gICAgLy8gICAgICAgZXJyb3I6IFN0b3JhZ2VFcnJvclxuICAgIC8vICAgICB9XG4gICAgLy8gPiB7XG4gICAgLy8gICB0cnkge1xuICAgIC8vICAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9tZXRhZGF0YS8ke2lkfWAsIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pXG4gICAgLy8gICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH1cbiAgICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAvLyAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgdGhyb3cgZXJyb3JcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIGZpbGUgbWV0YWRhdGFcbiAgICAgKiBAcGFyYW0gaWQgdGhlIGZpbGUgaWQgdG8gdXBkYXRlIG1ldGFkYXRhXG4gICAgICogQHBhcmFtIG1ldGEgdGhlIG5ldyBmaWxlIG1ldGFkYXRhXG4gICAgICovXG4gICAgLy8gYXN5bmMgdXBkYXRlTWV0YWRhdGEoXG4gICAgLy8gICBpZDogc3RyaW5nLFxuICAgIC8vICAgbWV0YTogTWV0YWRhdGFcbiAgICAvLyApOiBQcm9taXNlPFxuICAgIC8vICAgfCB7XG4gICAgLy8gICAgICAgZGF0YTogTWV0YWRhdGFcbiAgICAvLyAgICAgICBlcnJvcjogbnVsbFxuICAgIC8vICAgICB9XG4gICAgLy8gICB8IHtcbiAgICAvLyAgICAgICBkYXRhOiBudWxsXG4gICAgLy8gICAgICAgZXJyb3I6IFN0b3JhZ2VFcnJvclxuICAgIC8vICAgICB9XG4gICAgLy8gPiB7XG4gICAgLy8gICB0cnkge1xuICAgIC8vICAgICBjb25zdCBkYXRhID0gYXdhaXQgcG9zdChcbiAgICAvLyAgICAgICB0aGlzLmZldGNoLFxuICAgIC8vICAgICAgIGAke3RoaXMudXJsfS9tZXRhZGF0YS8ke2lkfWAsXG4gICAgLy8gICAgICAgeyAuLi5tZXRhIH0sXG4gICAgLy8gICAgICAgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfVxuICAgIC8vICAgICApXG4gICAgLy8gICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH1cbiAgICAvLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAvLyAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgdGhyb3cgZXJyb3JcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgLyoqXG4gICAgICogTGlzdHMgYWxsIHRoZSBmaWxlcyB3aXRoaW4gYSBidWNrZXQuXG4gICAgICogQHBhcmFtIHBhdGggVGhlIGZvbGRlciBwYXRoLlxuICAgICAqL1xuICAgIGxpc3QocGF0aCwgb3B0aW9ucywgcGFyYW1ldGVycykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VBUkNIX09QVElPTlMpLCBvcHRpb25zKSwgeyBwcmVmaXg6IHBhdGggfHwgJycgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC9saXN0LyR7dGhpcy5idWNrZXRJZH1gLCBib2R5LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9LCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVuY29kZU1ldGFkYXRhKG1ldGFkYXRhKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSk7XG4gICAgfVxuICAgIHRvQmFzZTY0KGRhdGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBCdWZmZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oZGF0YSkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidG9hKGRhdGEpO1xuICAgIH1cbiAgICBfZ2V0RmluYWxQYXRoKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuYnVja2V0SWR9LyR7cGF0aH1gO1xuICAgIH1cbiAgICBfcmVtb3ZlRW1wdHlGb2xkZXJzKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXlxcL3xcXC8kL2csICcnKS5yZXBsYWNlKC9cXC8rL2csICcvJyk7XG4gICAgfVxuICAgIHRyYW5zZm9ybU9wdHNUb1F1ZXJ5U3RyaW5nKHRyYW5zZm9ybSkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBbXTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybS53aWR0aCkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goYHdpZHRoPSR7dHJhbnNmb3JtLndpZHRofWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2Zvcm0uaGVpZ2h0KSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChgaGVpZ2h0PSR7dHJhbnNmb3JtLmhlaWdodH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNmb3JtLnJlc2l6ZSkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goYHJlc2l6ZT0ke3RyYW5zZm9ybS5yZXNpemV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zZm9ybS5mb3JtYXQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGBmb3JtYXQ9JHt0cmFuc2Zvcm0uZm9ybWF0fWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2Zvcm0ucXVhbGl0eSkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goYHF1YWxpdHk9JHt0cmFuc2Zvcm0ucXVhbGl0eX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zLmpvaW4oJyYnKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdG9yYWdlRmlsZUFwaS5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IEZ1bmN0aW9uc0NsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9mdW5jdGlvbnMtanMnO1xuaW1wb3J0IHsgUG9zdGdyZXN0Q2xpZW50LCB9IGZyb20gJ0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMnO1xuaW1wb3J0IHsgUmVhbHRpbWVDbGllbnQsIH0gZnJvbSAnQHN1cGFiYXNlL3JlYWx0aW1lLWpzJztcbmltcG9ydCB7IFN0b3JhZ2VDbGllbnQgYXMgU3VwYWJhc2VTdG9yYWdlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N0b3JhZ2UtanMnO1xuaW1wb3J0IHsgREVGQVVMVF9HTE9CQUxfT1BUSU9OUywgREVGQVVMVF9EQl9PUFRJT05TLCBERUZBVUxUX0FVVEhfT1BUSU9OUywgREVGQVVMVF9SRUFMVElNRV9PUFRJT05TLCB9IGZyb20gJy4vbGliL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBmZXRjaFdpdGhBdXRoIH0gZnJvbSAnLi9saWIvZmV0Y2gnO1xuaW1wb3J0IHsgc3RyaXBUcmFpbGluZ1NsYXNoLCBhcHBseVNldHRpbmdEZWZhdWx0cyB9IGZyb20gJy4vbGliL2hlbHBlcnMnO1xuaW1wb3J0IHsgU3VwYWJhc2VBdXRoQ2xpZW50IH0gZnJvbSAnLi9saWIvU3VwYWJhc2VBdXRoQ2xpZW50Jztcbi8qKlxuICogU3VwYWJhc2UgQ2xpZW50LlxuICpcbiAqIEFuIGlzb21vcnBoaWMgSmF2YXNjcmlwdCBjbGllbnQgZm9yIGludGVyYWN0aW5nIHdpdGggUG9zdGdyZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cGFiYXNlQ2xpZW50IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgY2xpZW50IGZvciB1c2UgaW4gdGhlIGJyb3dzZXIuXG4gICAgICogQHBhcmFtIHN1cGFiYXNlVXJsIFRoZSB1bmlxdWUgU3VwYWJhc2UgVVJMIHdoaWNoIGlzIHN1cHBsaWVkIHdoZW4geW91IGNyZWF0ZSBhIG5ldyBwcm9qZWN0IGluIHlvdXIgcHJvamVjdCBkYXNoYm9hcmQuXG4gICAgICogQHBhcmFtIHN1cGFiYXNlS2V5IFRoZSB1bmlxdWUgU3VwYWJhc2UgS2V5IHdoaWNoIGlzIHN1cHBsaWVkIHdoZW4geW91IGNyZWF0ZSBhIG5ldyBwcm9qZWN0IGluIHlvdXIgcHJvamVjdCBkYXNoYm9hcmQuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZGIuc2NoZW1hIFlvdSBjYW4gc3dpdGNoIGluIGJldHdlZW4gc2NoZW1hcy4gVGhlIHNjaGVtYSBuZWVkcyB0byBiZSBvbiB0aGUgbGlzdCBvZiBleHBvc2VkIHNjaGVtYXMgaW5zaWRlIFN1cGFiYXNlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmF1dGguYXV0b1JlZnJlc2hUb2tlbiBTZXQgdG8gXCJ0cnVlXCIgaWYgeW91IHdhbnQgdG8gYXV0b21hdGljYWxseSByZWZyZXNoIHRoZSB0b2tlbiBiZWZvcmUgZXhwaXJpbmcuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYXV0aC5wZXJzaXN0U2Vzc2lvbiBTZXQgdG8gXCJ0cnVlXCIgaWYgeW91IHdhbnQgdG8gYXV0b21hdGljYWxseSBzYXZlIHRoZSB1c2VyIHNlc3Npb24gaW50byBsb2NhbCBzdG9yYWdlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmF1dGguZGV0ZWN0U2Vzc2lvbkluVXJsIFNldCB0byBcInRydWVcIiBpZiB5b3Ugd2FudCB0byBhdXRvbWF0aWNhbGx5IGRldGVjdHMgT0F1dGggZ3JhbnRzIGluIHRoZSBVUkwgYW5kIHNpZ25zIGluIHRoZSB1c2VyLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnJlYWx0aW1lIE9wdGlvbnMgcGFzc2VkIGFsb25nIHRvIHJlYWx0aW1lLWpzIGNvbnN0cnVjdG9yLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmdsb2JhbC5mZXRjaCBBIGN1c3RvbSBmZXRjaCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5nbG9iYWwuaGVhZGVycyBBbnkgYWRkaXRpb25hbCBoZWFkZXJzIHRvIHNlbmQgd2l0aCBlYWNoIG5ldHdvcmsgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihzdXBhYmFzZVVybCwgc3VwYWJhc2VLZXksIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHRoaXMuc3VwYWJhc2VVcmwgPSBzdXBhYmFzZVVybDtcbiAgICAgICAgdGhpcy5zdXBhYmFzZUtleSA9IHN1cGFiYXNlS2V5O1xuICAgICAgICBpZiAoIXN1cGFiYXNlVXJsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdXBhYmFzZVVybCBpcyByZXF1aXJlZC4nKTtcbiAgICAgICAgaWYgKCFzdXBhYmFzZUtleSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc3VwYWJhc2VLZXkgaXMgcmVxdWlyZWQuJyk7XG4gICAgICAgIGNvbnN0IF9zdXBhYmFzZVVybCA9IHN0cmlwVHJhaWxpbmdTbGFzaChzdXBhYmFzZVVybCk7XG4gICAgICAgIHRoaXMucmVhbHRpbWVVcmwgPSBgJHtfc3VwYWJhc2VVcmx9L3JlYWx0aW1lL3YxYC5yZXBsYWNlKC9eaHR0cC9pLCAnd3MnKTtcbiAgICAgICAgdGhpcy5hdXRoVXJsID0gYCR7X3N1cGFiYXNlVXJsfS9hdXRoL3YxYDtcbiAgICAgICAgdGhpcy5zdG9yYWdlVXJsID0gYCR7X3N1cGFiYXNlVXJsfS9zdG9yYWdlL3YxYDtcbiAgICAgICAgdGhpcy5mdW5jdGlvbnNVcmwgPSBgJHtfc3VwYWJhc2VVcmx9L2Z1bmN0aW9ucy92MWA7XG4gICAgICAgIC8vIGRlZmF1bHQgc3RvcmFnZSBrZXkgdXNlcyB0aGUgc3VwYWJhc2UgcHJvamVjdCByZWYgYXMgYSBuYW1lc3BhY2VcbiAgICAgICAgY29uc3QgZGVmYXVsdFN0b3JhZ2VLZXkgPSBgc2ItJHtuZXcgVVJMKHRoaXMuYXV0aFVybCkuaG9zdG5hbWUuc3BsaXQoJy4nKVswXX0tYXV0aC10b2tlbmA7XG4gICAgICAgIGNvbnN0IERFRkFVTFRTID0ge1xuICAgICAgICAgICAgZGI6IERFRkFVTFRfREJfT1BUSU9OUyxcbiAgICAgICAgICAgIHJlYWx0aW1lOiBERUZBVUxUX1JFQUxUSU1FX09QVElPTlMsXG4gICAgICAgICAgICBhdXRoOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfQVVUSF9PUFRJT05TKSwgeyBzdG9yYWdlS2V5OiBkZWZhdWx0U3RvcmFnZUtleSB9KSxcbiAgICAgICAgICAgIGdsb2JhbDogREVGQVVMVF9HTE9CQUxfT1BUSU9OUyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBhcHBseVNldHRpbmdEZWZhdWx0cyhvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCA/IG9wdGlvbnMgOiB7fSwgREVGQVVMVFMpO1xuICAgICAgICB0aGlzLnN0b3JhZ2VLZXkgPSAoX2EgPSBzZXR0aW5ncy5hdXRoLnN0b3JhZ2VLZXkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSAoX2IgPSBzZXR0aW5ncy5nbG9iYWwuaGVhZGVycykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoge307XG4gICAgICAgIGlmICghc2V0dGluZ3MuYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aCA9IHRoaXMuX2luaXRTdXBhYmFzZUF1dGhDbGllbnQoKF9jID0gc2V0dGluZ3MuYXV0aCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDoge30sIHRoaXMuaGVhZGVycywgc2V0dGluZ3MuZ2xvYmFsLmZldGNoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWNjZXNzVG9rZW4gPSBzZXR0aW5ncy5hY2Nlc3NUb2tlbjtcbiAgICAgICAgICAgIHRoaXMuYXV0aCA9IG5ldyBQcm94eSh7fSwge1xuICAgICAgICAgICAgICAgIGdldDogKF8sIHByb3ApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBAc3VwYWJhc2Uvc3VwYWJhc2UtanM6IFN1cGFiYXNlIENsaWVudCBpcyBjb25maWd1cmVkIHdpdGggdGhlIGFjY2Vzc1Rva2VuIG9wdGlvbiwgYWNjZXNzaW5nIHN1cGFiYXNlLmF1dGguJHtTdHJpbmcocHJvcCl9IGlzIG5vdCBwb3NzaWJsZWApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZldGNoID0gZmV0Y2hXaXRoQXV0aChzdXBhYmFzZUtleSwgdGhpcy5fZ2V0QWNjZXNzVG9rZW4uYmluZCh0aGlzKSwgc2V0dGluZ3MuZ2xvYmFsLmZldGNoKTtcbiAgICAgICAgdGhpcy5yZWFsdGltZSA9IHRoaXMuX2luaXRSZWFsdGltZUNsaWVudChPYmplY3QuYXNzaWduKHsgaGVhZGVyczogdGhpcy5oZWFkZXJzLCBhY2Nlc3NUb2tlbjogdGhpcy5fZ2V0QWNjZXNzVG9rZW4uYmluZCh0aGlzKSB9LCBzZXR0aW5ncy5yZWFsdGltZSkpO1xuICAgICAgICB0aGlzLnJlc3QgPSBuZXcgUG9zdGdyZXN0Q2xpZW50KGAke19zdXBhYmFzZVVybH0vcmVzdC92MWAsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYTogc2V0dGluZ3MuZGIuc2NoZW1hLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXNldHRpbmdzLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5Gb3JBdXRoRXZlbnRzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU3VwYWJhc2UgRnVuY3Rpb25zIGFsbG93cyB5b3UgdG8gZGVwbG95IGFuZCBpbnZva2UgZWRnZSBmdW5jdGlvbnMuXG4gICAgICovXG4gICAgZ2V0IGZ1bmN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbnNDbGllbnQodGhpcy5mdW5jdGlvbnNVcmwsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIGN1c3RvbUZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3VwYWJhc2UgU3RvcmFnZSBhbGxvd3MgeW91IHRvIG1hbmFnZSB1c2VyLWdlbmVyYXRlZCBjb250ZW50LCBzdWNoIGFzIHBob3RvcyBvciB2aWRlb3MuXG4gICAgICovXG4gICAgZ2V0IHN0b3JhZ2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3VwYWJhc2VTdG9yYWdlQ2xpZW50KHRoaXMuc3RvcmFnZVVybCwgdGhpcy5oZWFkZXJzLCB0aGlzLmZldGNoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHF1ZXJ5IG9uIGEgdGFibGUgb3IgYSB2aWV3LlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlbGF0aW9uIC0gVGhlIHRhYmxlIG9yIHZpZXcgbmFtZSB0byBxdWVyeVxuICAgICAqL1xuICAgIGZyb20ocmVsYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5mcm9tKHJlbGF0aW9uKTtcbiAgICB9XG4gICAgLy8gTk9URTogc2lnbmF0dXJlcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIFBvc3RncmVzdENsaWVudC5zY2hlbWFcbiAgICAvKipcbiAgICAgKiBTZWxlY3QgYSBzY2hlbWEgdG8gcXVlcnkgb3IgcGVyZm9ybSBhbiBmdW5jdGlvbiAocnBjKSBjYWxsLlxuICAgICAqXG4gICAgICogVGhlIHNjaGVtYSBuZWVkcyB0byBiZSBvbiB0aGUgbGlzdCBvZiBleHBvc2VkIHNjaGVtYXMgaW5zaWRlIFN1cGFiYXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSAtIFRoZSBzY2hlbWEgdG8gcXVlcnlcbiAgICAgKi9cbiAgICBzY2hlbWEoc2NoZW1hKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3Quc2NoZW1hKHNjaGVtYSk7XG4gICAgfVxuICAgIC8vIE5PVEU6IHNpZ25hdHVyZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCBQb3N0Z3Jlc3RDbGllbnQucnBjXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm4gLSBUaGUgZnVuY3Rpb24gbmFtZSB0byBjYWxsXG4gICAgICogQHBhcmFtIGFyZ3MgLSBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGZ1bmN0aW9uIGNhbGxcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5oZWFkIC0gV2hlbiBzZXQgdG8gYHRydWVgLCBgZGF0YWAgd2lsbCBub3QgYmUgcmV0dXJuZWQuXG4gICAgICogVXNlZnVsIGlmIHlvdSBvbmx5IG5lZWQgdGhlIGNvdW50LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmdldCAtIFdoZW4gc2V0IHRvIGB0cnVlYCwgdGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGhcbiAgICAgKiByZWFkLW9ubHkgYWNjZXNzIG1vZGUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY291bnQgLSBDb3VudCBhbGdvcml0aG0gdG8gdXNlIHRvIGNvdW50IHJvd3MgcmV0dXJuZWQgYnkgdGhlXG4gICAgICogZnVuY3Rpb24uIE9ubHkgYXBwbGljYWJsZSBmb3IgW3NldC1yZXR1cm5pbmdcbiAgICAgKiBmdW5jdGlvbnNdKGh0dHBzOi8vd3d3LnBvc3RncmVzcWwub3JnL2RvY3MvY3VycmVudC9mdW5jdGlvbnMtc3JmLmh0bWwpLlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKi9cbiAgICBycGMoZm4sIGFyZ3MgPSB7fSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3QucnBjKGZuLCBhcmdzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFJlYWx0aW1lIGNoYW5uZWwgd2l0aCBCcm9hZGNhc3QsIFByZXNlbmNlLCBhbmQgUG9zdGdyZXMgQ2hhbmdlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIFJlYWx0aW1lIGNoYW5uZWwuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBUaGUgb3B0aW9ucyB0byBwYXNzIHRvIHRoZSBSZWFsdGltZSBjaGFubmVsLlxuICAgICAqXG4gICAgICovXG4gICAgY2hhbm5lbChuYW1lLCBvcHRzID0geyBjb25maWc6IHt9IH0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhbHRpbWUuY2hhbm5lbChuYW1lLCBvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgUmVhbHRpbWUgY2hhbm5lbHMuXG4gICAgICovXG4gICAgZ2V0Q2hhbm5lbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWx0aW1lLmdldENoYW5uZWxzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlcyBhbmQgcmVtb3ZlcyBSZWFsdGltZSBjaGFubmVsIGZyb20gUmVhbHRpbWUgY2xpZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFsdGltZUNoYW5uZWx9IGNoYW5uZWwgLSBUaGUgbmFtZSBvZiB0aGUgUmVhbHRpbWUgY2hhbm5lbC5cbiAgICAgKlxuICAgICAqL1xuICAgIHJlbW92ZUNoYW5uZWwoY2hhbm5lbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFsdGltZS5yZW1vdmVDaGFubmVsKGNoYW5uZWwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZXMgYW5kIHJlbW92ZXMgYWxsIFJlYWx0aW1lIGNoYW5uZWxzIGZyb20gUmVhbHRpbWUgY2xpZW50LlxuICAgICAqL1xuICAgIHJlbW92ZUFsbENoYW5uZWxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFsdGltZS5yZW1vdmVBbGxDaGFubmVscygpO1xuICAgIH1cbiAgICBfZ2V0QWNjZXNzVG9rZW4oKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY2Nlc3NUb2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB5aWVsZCB0aGlzLmFjY2Vzc1Rva2VuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHlpZWxkIHRoaXMuYXV0aC5nZXRTZXNzaW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gKF9iID0gKF9hID0gZGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWNjZXNzX3Rva2VuKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2luaXRTdXBhYmFzZUF1dGhDbGllbnQoeyBhdXRvUmVmcmVzaFRva2VuLCBwZXJzaXN0U2Vzc2lvbiwgZGV0ZWN0U2Vzc2lvbkluVXJsLCBzdG9yYWdlLCBzdG9yYWdlS2V5LCBmbG93VHlwZSwgbG9jaywgZGVidWcsIH0sIGhlYWRlcnMsIGZldGNoKSB7XG4gICAgICAgIGNvbnN0IGF1dGhIZWFkZXJzID0ge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMuc3VwYWJhc2VLZXl9YCxcbiAgICAgICAgICAgIGFwaWtleTogYCR7dGhpcy5zdXBhYmFzZUtleX1gLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IFN1cGFiYXNlQXV0aENsaWVudCh7XG4gICAgICAgICAgICB1cmw6IHRoaXMuYXV0aFVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgYXV0aEhlYWRlcnMpLCBoZWFkZXJzKSxcbiAgICAgICAgICAgIHN0b3JhZ2VLZXk6IHN0b3JhZ2VLZXksXG4gICAgICAgICAgICBhdXRvUmVmcmVzaFRva2VuLFxuICAgICAgICAgICAgcGVyc2lzdFNlc3Npb24sXG4gICAgICAgICAgICBkZXRlY3RTZXNzaW9uSW5VcmwsXG4gICAgICAgICAgICBzdG9yYWdlLFxuICAgICAgICAgICAgZmxvd1R5cGUsXG4gICAgICAgICAgICBsb2NrLFxuICAgICAgICAgICAgZGVidWcsXG4gICAgICAgICAgICBmZXRjaCxcbiAgICAgICAgICAgIC8vIGF1dGggY2hlY2tzIGlmIHRoZXJlIGlzIGEgY3VzdG9tIGF1dGhvcml6YWl0b24gaGVhZGVyIHVzaW5nIHRoaXMgZmxhZ1xuICAgICAgICAgICAgLy8gc28gaXQga25vd3Mgd2hldGhlciB0byByZXR1cm4gYW4gZXJyb3Igd2hlbiBnZXRVc2VyIGlzIGNhbGxlZCB3aXRoIG5vIHNlc3Npb25cbiAgICAgICAgICAgIGhhc0N1c3RvbUF1dGhvcml6YXRpb25IZWFkZXI6ICdBdXRob3JpemF0aW9uJyBpbiB0aGlzLmhlYWRlcnMsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfaW5pdFJlYWx0aW1lQ2xpZW50KG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWFsdGltZUNsaWVudCh0aGlzLnJlYWx0aW1lVXJsLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IHBhcmFtczogT2JqZWN0LmFzc2lnbih7IGFwaWtleTogdGhpcy5zdXBhYmFzZUtleSB9LCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucGFyYW1zKSB9KSk7XG4gICAgfVxuICAgIF9saXN0ZW5Gb3JBdXRoRXZlbnRzKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZSgoZXZlbnQsIHNlc3Npb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZVRva2VuQ2hhbmdlZChldmVudCwgJ0NMSUVOVCcsIHNlc3Npb24gPT09IG51bGwgfHwgc2Vzc2lvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbi5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIF9oYW5kbGVUb2tlbkNoYW5nZWQoZXZlbnQsIHNvdXJjZSwgdG9rZW4pIHtcbiAgICAgICAgaWYgKChldmVudCA9PT0gJ1RPS0VOX1JFRlJFU0hFRCcgfHwgZXZlbnQgPT09ICdTSUdORURfSU4nKSAmJlxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkQWNjZXNzVG9rZW4gIT09IHRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZWRBY2Nlc3NUb2tlbiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50ID09PSAnU0lHTkVEX09VVCcpIHtcbiAgICAgICAgICAgIHRoaXMucmVhbHRpbWUuc2V0QXV0aCgpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSA9PSAnU1RPUkFHRScpXG4gICAgICAgICAgICAgICAgdGhpcy5hdXRoLnNpZ25PdXQoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZEFjY2Vzc1Rva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3VwYWJhc2VDbGllbnQuanMubWFwIiwiaW1wb3J0IFN1cGFiYXNlQ2xpZW50IGZyb20gJy4vU3VwYWJhc2VDbGllbnQnO1xuZXhwb3J0ICogZnJvbSAnQHN1cGFiYXNlL2F1dGgtanMnO1xuZXhwb3J0IHsgUG9zdGdyZXN0RXJyb3IsIH0gZnJvbSAnQHN1cGFiYXNlL3Bvc3RncmVzdC1qcyc7XG5leHBvcnQgeyBGdW5jdGlvbnNIdHRwRXJyb3IsIEZ1bmN0aW9uc0ZldGNoRXJyb3IsIEZ1bmN0aW9uc1JlbGF5RXJyb3IsIEZ1bmN0aW9uc0Vycm9yLCBGdW5jdGlvblJlZ2lvbiwgfSBmcm9tICdAc3VwYWJhc2UvZnVuY3Rpb25zLWpzJztcbmV4cG9ydCAqIGZyb20gJ0BzdXBhYmFzZS9yZWFsdGltZS1qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFN1cGFiYXNlQ2xpZW50IH0gZnJvbSAnLi9TdXBhYmFzZUNsaWVudCc7XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgU3VwYWJhc2UgQ2xpZW50LlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlQ2xpZW50ID0gKHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSwgb3B0aW9ucykgPT4ge1xuICAgIHJldHVybiBuZXcgU3VwYWJhc2VDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlS2V5LCBvcHRpb25zKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgeyBBdXRoQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL2F1dGgtanMnO1xuZXhwb3J0IGNsYXNzIFN1cGFiYXNlQXV0aENsaWVudCBleHRlbmRzIEF1dGhDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3VwYWJhc2VBdXRoQ2xpZW50LmpzLm1hcCIsImltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xubGV0IEpTX0VOViA9ICcnO1xuLy8gQHRzLWlnbm9yZVxuaWYgKHR5cGVvZiBEZW5vICE9PSAndW5kZWZpbmVkJykge1xuICAgIEpTX0VOViA9ICdkZW5vJztcbn1cbmVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBKU19FTlYgPSAnd2ViJztcbn1cbmVsc2UgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgSlNfRU5WID0gJ3JlYWN0LW5hdGl2ZSc7XG59XG5lbHNlIHtcbiAgICBKU19FTlYgPSAnbm9kZSc7XG59XG5leHBvcnQgY29uc3QgREVGQVVMVF9IRUFERVJTID0geyAnWC1DbGllbnQtSW5mbyc6IGBzdXBhYmFzZS1qcy0ke0pTX0VOVn0vJHt2ZXJzaW9ufWAgfTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0dMT0JBTF9PUFRJT05TID0ge1xuICAgIGhlYWRlcnM6IERFRkFVTFRfSEVBREVSUyxcbn07XG5leHBvcnQgY29uc3QgREVGQVVMVF9EQl9PUFRJT05TID0ge1xuICAgIHNjaGVtYTogJ3B1YmxpYycsXG59O1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQVVUSF9PUFRJT05TID0ge1xuICAgIGF1dG9SZWZyZXNoVG9rZW46IHRydWUsXG4gICAgcGVyc2lzdFNlc3Npb246IHRydWUsXG4gICAgZGV0ZWN0U2Vzc2lvbkluVXJsOiB0cnVlLFxuICAgIGZsb3dUeXBlOiAnaW1wbGljaXQnLFxufTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX1JFQUxUSU1FX09QVElPTlMgPSB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBub2RlRmV0Y2gsIHsgSGVhZGVycyBhcyBOb2RlRmV0Y2hIZWFkZXJzIH0gZnJvbSAnQHN1cGFiYXNlL25vZGUtZmV0Y2gnO1xuZXhwb3J0IGNvbnN0IHJlc29sdmVGZXRjaCA9IChjdXN0b21GZXRjaCkgPT4ge1xuICAgIGxldCBfZmV0Y2g7XG4gICAgaWYgKGN1c3RvbUZldGNoKSB7XG4gICAgICAgIF9mZXRjaCA9IGN1c3RvbUZldGNoO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZmV0Y2ggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIF9mZXRjaCA9IG5vZGVGZXRjaDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF9mZXRjaCA9IGZldGNoO1xuICAgIH1cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IF9mZXRjaCguLi5hcmdzKTtcbn07XG5leHBvcnQgY29uc3QgcmVzb2x2ZUhlYWRlcnNDb25zdHJ1Y3RvciA9ICgpID0+IHtcbiAgICBpZiAodHlwZW9mIEhlYWRlcnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBOb2RlRmV0Y2hIZWFkZXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGVhZGVycztcbn07XG5leHBvcnQgY29uc3QgZmV0Y2hXaXRoQXV0aCA9IChzdXBhYmFzZUtleSwgZ2V0QWNjZXNzVG9rZW4sIGN1c3RvbUZldGNoKSA9PiB7XG4gICAgY29uc3QgZmV0Y2ggPSByZXNvbHZlRmV0Y2goY3VzdG9tRmV0Y2gpO1xuICAgIGNvbnN0IEhlYWRlcnNDb25zdHJ1Y3RvciA9IHJlc29sdmVIZWFkZXJzQ29uc3RydWN0b3IoKTtcbiAgICByZXR1cm4gKGlucHV0LCBpbml0KSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IChfYSA9ICh5aWVsZCBnZXRBY2Nlc3NUb2tlbigpKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogc3VwYWJhc2VLZXk7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnNDb25zdHJ1Y3Rvcihpbml0ID09PSBudWxsIHx8IGluaXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGluaXQuaGVhZGVycyk7XG4gICAgICAgIGlmICghaGVhZGVycy5oYXMoJ2FwaWtleScpKSB7XG4gICAgICAgICAgICBoZWFkZXJzLnNldCgnYXBpa2V5Jywgc3VwYWJhc2VLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGVhZGVycy5oYXMoJ0F1dGhvcml6YXRpb24nKSkge1xuICAgICAgICAgICAgaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZldGNoKGlucHV0LCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGluaXQpLCB7IGhlYWRlcnMgfSkpO1xuICAgIH0pO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZldGNoLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgdmFyIHIgPSAoTWF0aC5yYW5kb20oKSAqIDE2KSB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MykgfCAweDg7XG4gICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcFRyYWlsaW5nU2xhc2godXJsKSB7XG4gICAgcmV0dXJuIHVybC5yZXBsYWNlKC9cXC8kLywgJycpO1xufVxuZXhwb3J0IGNvbnN0IGlzQnJvd3NlciA9ICgpID0+IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5U2V0dGluZ0RlZmF1bHRzKG9wdGlvbnMsIGRlZmF1bHRzKSB7XG4gICAgY29uc3QgeyBkYjogZGJPcHRpb25zLCBhdXRoOiBhdXRoT3B0aW9ucywgcmVhbHRpbWU6IHJlYWx0aW1lT3B0aW9ucywgZ2xvYmFsOiBnbG9iYWxPcHRpb25zLCB9ID0gb3B0aW9ucztcbiAgICBjb25zdCB7IGRiOiBERUZBVUxUX0RCX09QVElPTlMsIGF1dGg6IERFRkFVTFRfQVVUSF9PUFRJT05TLCByZWFsdGltZTogREVGQVVMVF9SRUFMVElNRV9PUFRJT05TLCBnbG9iYWw6IERFRkFVTFRfR0xPQkFMX09QVElPTlMsIH0gPSBkZWZhdWx0cztcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgIGRiOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfREJfT1BUSU9OUyksIGRiT3B0aW9ucyksXG4gICAgICAgIGF1dGg6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9BVVRIX09QVElPTlMpLCBhdXRoT3B0aW9ucyksXG4gICAgICAgIHJlYWx0aW1lOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfUkVBTFRJTUVfT1BUSU9OUyksIHJlYWx0aW1lT3B0aW9ucyksXG4gICAgICAgIGdsb2JhbDogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0dMT0JBTF9PUFRJT05TKSwgZ2xvYmFsT3B0aW9ucyksXG4gICAgICAgIGFjY2Vzc1Rva2VuOiAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiAnJzsgfSksXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucy5hY2Nlc3NUb2tlbikge1xuICAgICAgICByZXN1bHQuYWNjZXNzVG9rZW4gPSBvcHRpb25zLmFjY2Vzc1Rva2VuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gaGFjayBhcm91bmQgUmVxdWlyZWQ8PlxuICAgICAgICBkZWxldGUgcmVzdWx0LmFjY2Vzc1Rva2VuO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVycy5qcy5tYXAiLCJleHBvcnQgY29uc3QgdmVyc2lvbiA9ICcyLjQ5LjQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVyc2lvbi5qcy5tYXAiLCIvLyBzcmMvYXV0aC9hdXRoLmpzXG4vKipcbiAqIEF1dGhlbnRpY2F0aW9uIE1vZHVsZSAtIEJhc2VcbiAqIEBtb2R1bGUgYXV0aFxuICogQGRlc2NyaXB0aW9uIEJhc2UgbW9kdWxlIGZvciBhdXRoZW50aWNhdGlvbiB3aXRoIGNvbW1vbiBmdW5jdGlvbnMgYW5kIGNvbmZpZ3VyYXRpb25cbiAqIEB2ZXJzaW9uIDAuMC4zXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuMyAoMjAyNS0wNS0xMyk6IE1vZGlmaWVkIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0ZSBtYW5hZ2VtZW50IHRvIHVzZSBTdXBhYmFzZSBBdXRoIHN5c3RlbS5cbiAqIC0gMC4wLjIgKDIwMjUtMDUtMTMpOiBSZW9yZ2FuaXphdGlvbiBpbnRvIHNlcGFyYXRlIG1vZHVsZXNcbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDMpOiBJbml0aWFsIGNyZWF0aW9uXG4gKi9cblxuLy8gLS0tIEFQSSBVUkwgRGVmaW5pdGlvbnMgLS0tXG5leHBvcnQgY29uc3QgSVNfTE9DQUwgPVxuICBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIiB8fCBsb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCIxMjcuMC4wLjFcIjtcblxuZXhwb3J0IGNvbnN0IEFQSV9VUkxTID0ge1xuICBIQU5ETEVfQ09ORklSTUFUSU9OOiBJU19MT0NBTFxuICAgID8gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDEvdXJiYW5kb2NzL3VzLWNlbnRyYWwxL2hhbmRsZV9jb25maXJtYXRpb25cIlxuICAgIDogXCJodHRwczovL2hhbmRsZS1jb25maXJtYXRpb24tdXAzazNoZGR0cS11Yy5hLnJ1bi5hcHBcIixcblxuICBIQU5ETEVfU0lHTlVQOiBJU19MT0NBTFxuICAgID8gXCJodHRwOi8vMTI3LjAuMC4xOjUwMDEvdXJiYW5kb2NzL3VzLWNlbnRyYWwxL2hhbmRsZV9zaWdudXBcIlxuICAgIDogXCJodHRwczovL2hhbmRsZS1zaWdudXAtdXAzazNoZGR0cS11Yy5hLnJ1bi5hcHBcIixcblxuICBIQU5ETEVfTE9HSU46IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX2xvZ2luXCJcbiAgICA6IFwiaHR0cHM6Ly9oYW5kbGUtbG9naW4tdXAzazNoZGR0cS11Yy5hLnJ1bi5hcHBcIixcbn07XG5cbi8vIEdsb2JhbCBhdXRoZW50aWNhdGlvbiBzdGF0ZVxubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHVzZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyIC0gVXNlciBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50VXNlcih1c2VyKSB7XG4gIGN1cnJlbnRVc2VyID0gdXNlcjtcbiAgLy8gUG9zc2libGUgc3RvcmFnZSBpbiBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2VcbiAgaWYgKHVzZXIpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICB9XG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHVzZXJcbiAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH0gVGhlIGN1cnJlbnQgdXNlciBvciBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcigpIHtcbiAgLy8gSWYgbm8gdXNlciBpbiBtZW1vcnksIHRyeSB0byByZXRyaWV2ZSBpdCBmcm9tIHN0b3JhZ2VcbiAgaWYgKCFjdXJyZW50VXNlcikge1xuICAgIGNvbnN0IHN0b3JlZFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgIGlmIChzdG9yZWRVc2VyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjdXJyZW50VXNlciA9IEpTT04ucGFyc2Uoc3RvcmVkVXNlcik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciByZXRyaWV2aW5nIHVzZXI6XCIsIGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50VXNlcjtcbn1cblxuLyoqXG4gKiBMb2dzIG91dCB0aGUgdXNlclxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9nb3V0KCkge1xuICBjdXJyZW50VXNlciA9IG51bGw7XG4gIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gIC8vIFJlZGlyZWN0IHRvIHRoZSBob21lIHBhZ2UgYWZ0ZXIgbG9nb3V0XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xvZ2dlZEluKCkge1xuICByZXR1cm4gZ2V0Q3VycmVudFVzZXIoKSAhPT0gbnVsbDtcbn1cblxuLyoqXG4gKiBEaXNwbGF5cyBhbiBlcnJvciBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIEVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIGVycm9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IobWVzc2FnZSwgZWxlbWVudElkID0gXCJlcnJvck1lc3NhZ2VcIikge1xuICBjb25zdCBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZXJyb3JFbGVtZW50KSB7XG4gICAgZXJyb3JFbGVtZW50LmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGxheXMgYSBzdGF0dXMgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBNZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gTWVzc2FnZSB0eXBlIChzdWNjZXNzLCBpbmZvLCB3YXJuaW5nLCBkYW5nZXIpXG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgd2hlcmUgdG8gZGlzcGxheSB0aGUgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd1N0YXR1cyhcbiAgbWVzc2FnZSxcbiAgdHlwZSA9IFwiaW5mb1wiLFxuICBlbGVtZW50SWQgPSBcInN0YXR1c01lc3NhZ2VcIlxuKSB7XG4gIGNvbnN0IHN0YXR1c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoc3RhdHVzRWxlbWVudCkge1xuICAgIHN0YXR1c0VsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCBhbGVydC0qIGNsYXNzZXNcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgIGlmIChjbGFzc05hbWUuc3RhcnRzV2l0aChcImFsZXJ0LVwiKSkge1xuICAgICAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgY2xhc3MgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZVxuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LmFkZChgYWxlcnQtJHt0eXBlfWApO1xuICAgIHN0YXR1c0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiU3RhdHVzIGVsZW1lbnQgbm90IGZvdW5kOlwiLCBlbGVtZW50SWQpO1xuICB9XG59XG5cbi8qKlxuICogSGlkZXMgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIGhpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZWxlbWVudElkIC0gSUQgb2YgdGhlIGVsZW1lbnQgdG8gc2hvd1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0VsZW1lbnQoZWxlbWVudElkKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xuICBpZiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3dzIHRoZSBsb2FkaW5nIGluZGljYXRvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvbklkIC0gSUQgb2YgdGhlIGJ1dHRvblxuICogQHBhcmFtIHtzdHJpbmd9IHNwaW5uZXJJZCAtIElEIG9mIHRoZSBzcGlubmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93TG9hZGluZyhidXR0b25JZCwgc3Bpbm5lcklkKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJ1dHRvbklkKTtcbiAgY29uc3Qgc3Bpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNwaW5uZXJJZCk7XG5cbiAgaWYgKGJ1dHRvbikgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn1cblxuLyoqXG4gKiBIaWRlcyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZUxvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoc3Bpbm5lcikgc3Bpbm5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufVxuXG4vLyBFeHBvcnQgdGhlIG5lY2Vzc2FyeSBmdW5jdGlvbnMgYW5kIHZhcmlhYmxlc1xuZXhwb3J0IGRlZmF1bHQge1xuICBBUElfVVJMUyxcbiAgSVNfTE9DQUwsXG4gIGdldEN1cnJlbnRVc2VyLFxuICBzZXRDdXJyZW50VXNlcixcbiAgbG9nb3V0LFxuICBpc0xvZ2dlZEluLFxuICBzaG93RXJyb3IsXG4gIHNob3dTdGF0dXMsXG4gIGhpZGVFbGVtZW50LFxuICBzaG93RWxlbWVudCxcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufTtcbiIsImltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4uL3N1cGFiYXNlLWNsaWVudC5qc1wiO1xuaW1wb3J0IHsgc2hvd0Vycm9yLCBzaG93U3RhdHVzLCBzaG93TG9hZGluZywgaGlkZUxvYWRpbmcgfSBmcm9tIFwiLi9hdXRoLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0Rm9yZ290UGFzc3dvcmRQYWdlKCkge1xuICBjb25zdCByZXNldEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc2V0Rm9ybVwiKTtcbiAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvck1lc3NhZ2VcIik7XG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c01lc3NhZ2VcIik7XG5cbiAgaWYgKHJlc2V0Rm9ybSkge1xuICAgIHJlc2V0Rm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFzeW5jIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIC8vIFJlc2V0IG1lc3NhZ2VzXG4gICAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICBlcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXR1c01lc3NhZ2UpIHtcbiAgICAgICAgc3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlLnRyaW0oKTtcblxuICAgICAgLy8gQmFzaWMgdmFsaWRhdGlvblxuICAgICAgaWYgKCFlbWFpbCkge1xuICAgICAgICBzaG93RXJyb3IoXCJWZXVpbGxleiBlbnRyZXIgdm90cmUgYWRyZXNzZSBlbWFpbC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgICBzaG93TG9hZGluZyhcInJlc2V0QnRuXCIsIFwicmVzZXRTcGlubmVyXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnJlc2V0UGFzc3dvcmRGb3JFbWFpbChlbWFpbCwge1xuICAgICAgICAgIHJlZGlyZWN0VG86IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L3VwZGF0ZS1wYXNzd29yZGAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG5cbiAgICAgICAgLy8gU2hvdyBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgc2hvd1N0YXR1cyhcbiAgICAgICAgICBcIlNpIHVuIGNvbXB0ZSBleGlzdGUgYXZlYyBjZXQgZW1haWwsIHZvdXMgcmVjZXZyZXogdW4gbGllbiBkZSByw6lpbml0aWFsaXNhdGlvbi5cIixcbiAgICAgICAgICBcInN1Y2Nlc3NcIlxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEhpZGUgdGhlIGZvcm1cbiAgICAgICAgcmVzZXRGb3JtLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiUGFzc3dvcmQgcmVzZXQgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgc2hvd0Vycm9yKFwiVW5lIGVycmV1ciBlc3Qgc3VydmVudWUuIFZldWlsbGV6IHLDqWVzc2F5ZXIgcGx1cyB0YXJkLlwiKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGhpZGVMb2FkaW5nKFwicmVzZXRCdG5cIiwgXCJyZXNldFNwaW5uZXJcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbml0Rm9yZ290UGFzc3dvcmRQYWdlLFxufTtcbiIsIi8qKlxuICogU3VwYWJhc2UgQ2xpZW50XG4gKiBAbW9kdWxlIHN1cGFiYXNlLWNsaWVudFxuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIFN1cGFiYXNlIGNsaWVudCBpbml0aWFsaXphdGlvbiBhbmQgY29uZmlndXJhdGlvbi5cbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDkpOiBJbml0aWFsIHZlcnNpb24gd2l0aCBiYXNpYyBTdXBhYmFzZSBjbGllbnQgaW5pdGlhbGl6YXRpb24uXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiO1xuXG5jb25zdCBzdXBhYmFzZVVybCA9IFwiaHR0cHM6Ly9vZmV5c3NpcGlia3RtYmZlYmliby5zdXBhYmFzZS5jb1wiO1xuY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID1cbiAgXCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUp6ZFhCaFltRnpaU0lzSW5KbFppSTZJbTltWlhsemMybHdhV0pyZEcxaVptVmlhV0p2SWl3aWNtOXNaU0k2SW1GdWIyNGlMQ0pwWVhRaU9qRTNORE01TWpVd09UUXNJbVY0Y0NJNk1qQTFPVFV3TVRBNU5IMC53NzFDQUtmb2xrdHpSbC1UbUxWaEhZYUViaENmVms0QTdZcmFFVUNnbHJVXCI7XG5cbmNvbnNvbGUubG9nKFwiW3N1cGFiYXNlLWNsaWVudC5qc10gSW5pdGlhbGl6aW5nIFN1cGFiYXNlIGNsaWVudC4uLlwiKTtcbmNvbnN0IGNsaWVudCA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VBbm9uS2V5KTtcbmNvbnNvbGUubG9nKFwiW3N1cGFiYXNlLWNsaWVudC5qc10gU3VwYWJhc2UgY2xpZW50IGluc3RhbmNlIGNyZWF0ZWQ6XCIsIGNsaWVudCk7XG5pZiAoY2xpZW50ICYmIGNsaWVudC5hdXRoKSB7XG4gIGNvbnNvbGUubG9nKFwiW3N1cGFiYXNlLWNsaWVudC5qc10gY2xpZW50LmF1dGggb2JqZWN0OlwiLCBjbGllbnQuYXV0aCk7XG4gIGNvbnNvbGUubG9nKFxuICAgIFwiW3N1cGFiYXNlLWNsaWVudC5qc10gdHlwZW9mIGNsaWVudC5hdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZDpcIixcbiAgICB0eXBlb2YgY2xpZW50LmF1dGgub25BdXRoU3RhdGVDaGFuZ2VkXG4gICk7XG59IGVsc2Uge1xuICBjb25zb2xlLmVycm9yKFxuICAgIFwiW3N1cGFiYXNlLWNsaWVudC5qc10gU3VwYWJhc2UgY2xpZW50IG9yIGNsaWVudC5hdXRoIGlzIG5vdCBpbml0aWFsaXplZCBjb3JyZWN0bHkhXCJcbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY2xpZW50O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwianMvXCIgKyBjaHVua0lkICsgXCIuYnVuZGxlLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcInVyYmFuZG9jc193ZWJhcHA6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoL15ibG9iOi8sIFwiXCIpLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybCArIFwiLi4vXCI7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiZm9yZ290dGVuUGFzc3dvcmRcIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt1cmJhbmRvY3Nfd2ViYXBwXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3VyYmFuZG9jc193ZWJhcHBcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsImltcG9ydCB7IGluaXRGb3Jnb3RQYXNzd29yZFBhZ2UgfSBmcm9tIFwiLi4vYXV0aC9mb3Jnb3R0ZW4tcGFzc3dvcmQuanNcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBpbml0Rm9yZ290UGFzc3dvcmRQYWdlKCk7XG4gIGNvbnNvbGUubG9nKFwiRm9yZ290IHBhc3N3b3JkIHBhZ2UgaW5pdGlhbGl6ZWRcIik7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==