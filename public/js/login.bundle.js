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
/* harmony export */   API_URLS: () => (/* binding */ API_URLS),
/* harmony export */   hideLoading: () => (/* binding */ hideLoading),
/* harmony export */   setCurrentUser: () => (/* binding */ setCurrentUser),
/* harmony export */   showError: () => (/* binding */ showError),
/* harmony export */   showLoading: () => (/* binding */ showLoading),
/* harmony export */   showStatus: () => (/* binding */ showStatus)
/* harmony export */ });
/* unused harmony exports IS_LOCAL, getCurrentUser, logout, isLoggedIn, hideElement, showElement */
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
  window.location.href = "/index";
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

/***/ "./src/js/auth/login.js":
/*!******************************!*\
  !*** ./src/js/auth/login.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initLoginPage: () => (/* binding */ initLoginPage)
/* harmony export */ });
/* unused harmony export login */
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth/auth.js");
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../supabase-client.js */ "./src/js/supabase-client.js");
// src/js/login.js
/**
 * Firebase Login
 * @module login
 * @description This module handles user login functionality using Supabase Authentication.
 * @version 0.0.4
 * @author GreyPanda
 * @todo Add phone number authentication & password reset functionality.
 *
 * @changelog
 * - 0.0.4 (2025-05-13): Ensure status message is also hidden on new submit.
 * - 0.0.3 (2025-05-08): Implemented actual login with Firebase function, added password visibility toggle.
 * - 0.0.2 (2025-05-08): Refactored to handle Supabase authentification.
 * - 0.0.1 (2025-04-27): Login functionality implemented using Firebase Authentication.
 */




/**
 * Initializes the login page
 */
function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  // Set up password visibility toggle
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Toggle icon
      const iconElement = togglePasswordBtn.querySelector("i");
      if (type === "password") {
        iconElement.classList.remove("bi-eye");
        iconElement.classList.add("bi-eye-slash");
      } else {
        iconElement.classList.remove("bi-eye-slash");
        iconElement.classList.add("bi-eye");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset messages
      if (errorMessage) {
        errorMessage.classList.add("hidden");
        errorMessage.textContent = "";
      }
      // Ensure status message is also hidden on new submit
      const statusMessageElement = document.getElementById("statusMessage");
      if (statusMessageElement) {
        statusMessageElement.classList.add("hidden");
        statusMessageElement.textContent = "";
      }

      // Get form values
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Basic validation
      if (!email || !password) {
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Veuillez remplir tous les champs.");
        return;
      }

      // Show loading state
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("loginBtn", "loginSpinner");

      try {
        // Call login function
        await login(email, password);
      } catch (error) {
        console.error("Login error:", error);
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(
          error.message || "La connexion a échoué. Vérifiez vos identifiants."
        );
      } finally {
        // Reset button state
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("loginBtn", "loginSpinner");
      }
    });
  }
}

/**
 * Logs in a user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise resolved with the user data on success
 */
async function login(email, password) {
  try {
    // Create request data
    const requestData = {
      email: email,
      password: password,
    };

    // Call Firebase function
    const response = await fetch(_auth_js__WEBPACK_IMPORTED_MODULE_0__.API_URLS.HANDLE_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    // Parse response
    const responseData = await response.json();

    // Check for error in response
    if (!response.ok) {
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      throw new Error(`Erreur serveur: ${response.status}`);
    }

    // Store user data and session tokens
    if (
      responseData.session &&
      responseData.session.access_token &&
      responseData.session.refresh_token
    ) {
      console.log(
        "[login.js] Attempting to set Supabase session with tokens:",
        responseData.session
      );
      const { error: sessionError } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.auth.setSession({
        access_token: responseData.session.access_token,
        refresh_token: responseData.session.refresh_token,
      });
      if (sessionError) {
        console.error(
          "[login.js] Error setting Supabase session:",
          sessionError
        );
        throw new Error("La session utilisateur n'a pas pu être initialisée.");
      }
      console.log("[login.js] Supabase session set successfully.");
    } else if (responseData.user && !responseData.session) {
      console.warn(
        "Login response contained user data but no session. User will not be logged in on client-side Supabase."
      );
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.setCurrentUser)(responseData.user);
      throw new Error("Données de session manquantes après la connexion.");
    } else {
      console.error(
        "Login error: Missing session data from backend response",
        responseData
      );
      throw new Error("Données de session manquantes après la connexion.");
    }

    // Show success message before redirect
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showStatus)("Connexion réussie! Redirection...", "success");

    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = "/index";
    }, 1000);

    return responseData.user;
  } catch (error) {
    // Log and re-throw the error to be handled by the caller
    console.error("Login error:", error);
    throw error;
  }
}


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
/******/ 			"login": 0
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
/*!*********************************!*\
  !*** ./src/js/entries/login.js ***!
  \*********************************/
/* harmony import */ var _auth_login_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/login.js */ "./src/js/auth/login.js");
// src/entries/signup.js
/**
 * Login Entry Point
 *
 * This module serves as the entry point for the login page.
 */

// Import our login module


// Initialize login page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize login page
  (0,_auth_login_js__WEBPACK_IMPORTED_MODULE_0__.initLoginPage)();

  console.log("Login page initialized");
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ2lEOztBQUVqRDtBQUNBO0FBQ0E7QUFDQSxFQUFFLDZEQUFhOztBQUVmO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvQXV0aEFkbWluQXBpLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvQXV0aENsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL0dvVHJ1ZUFkbWluQXBpLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvR29UcnVlQ2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9saWIvYmFzZTY0dXJsLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9saWIvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9saWIvaGVscGVycy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi9sb2NhbC1zdG9yYWdlLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvbGliL2xvY2tzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvbGliL3BvbHlmaWxscy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi90eXBlcy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi92ZXJzaW9uLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2Z1bmN0aW9ucy1qcy9kaXN0L21vZHVsZS9GdW5jdGlvbnNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvZnVuY3Rpb25zLWpzL2Rpc3QvbW9kdWxlL2hlbHBlci5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9mdW5jdGlvbnMtanMvZGlzdC9tb2R1bGUvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvbm9kZS1mZXRjaC9icm93c2VyLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L2Nqcy9Qb3N0Z3Jlc3RCdWlsZGVyLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L2Nqcy9Qb3N0Z3Jlc3RDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL1Bvc3RncmVzdEVycm9yLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L2Nqcy9Qb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L2Nqcy9Qb3N0Z3Jlc3RRdWVyeUJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL1Bvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMvZGlzdC9janMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvZXNtL3dyYXBwZXIubWpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL1JlYWx0aW1lQ2hhbm5lbC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9SZWFsdGltZUNsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9SZWFsdGltZVByZXNlbmNlLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL2xpYi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL3B1c2guanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL3NlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL3RpbWVyLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL2xpYi90cmFuc2Zvcm1lcnMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9TdG9yYWdlQ2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdG9yYWdlLWpzL2Rpc3QvbW9kdWxlL2xpYi9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9saWIvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9saWIvaGVscGVycy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdG9yYWdlLWpzL2Rpc3QvbW9kdWxlL2xpYi92ZXJzaW9uLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvcGFja2FnZXMvU3RvcmFnZUJ1Y2tldEFwaS5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdG9yYWdlLWpzL2Rpc3QvbW9kdWxlL3BhY2thZ2VzL1N0b3JhZ2VGaWxlQXBpLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N1cGFiYXNlLWpzL2Rpc3QvbW9kdWxlL1N1cGFiYXNlQ2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N1cGFiYXNlLWpzL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N1cGFiYXNlLWpzL2Rpc3QvbW9kdWxlL2xpYi9TdXBhYmFzZUF1dGhDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMvZGlzdC9tb2R1bGUvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdXBhYmFzZS1qcy9kaXN0L21vZHVsZS9saWIvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMvZGlzdC9tb2R1bGUvbGliL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMvZGlzdC9tb2R1bGUvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL2F1dGguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL2xvZ2luLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvc3VwYWJhc2UtY2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9zcmMvanMvZW50cmllcy9sb2dpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR29UcnVlQWRtaW5BcGkgZnJvbSAnLi9Hb1RydWVBZG1pbkFwaSc7XG5jb25zdCBBdXRoQWRtaW5BcGkgPSBHb1RydWVBZG1pbkFwaTtcbmV4cG9ydCBkZWZhdWx0IEF1dGhBZG1pbkFwaTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUF1dGhBZG1pbkFwaS5qcy5tYXAiLCJpbXBvcnQgR29UcnVlQ2xpZW50IGZyb20gJy4vR29UcnVlQ2xpZW50JztcbmNvbnN0IEF1dGhDbGllbnQgPSBHb1RydWVDbGllbnQ7XG5leHBvcnQgZGVmYXVsdCBBdXRoQ2xpZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXV0aENsaWVudC5qcy5tYXAiLCJ2YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBfZ2VuZXJhdGVMaW5rUmVzcG9uc2UsIF9ub1Jlc29sdmVKc29uUmVzcG9uc2UsIF9yZXF1ZXN0LCBfdXNlclJlc3BvbnNlLCB9IGZyb20gJy4vbGliL2ZldGNoJztcbmltcG9ydCB7IHJlc29sdmVGZXRjaCB9IGZyb20gJy4vbGliL2hlbHBlcnMnO1xuaW1wb3J0IHsgaXNBdXRoRXJyb3IgfSBmcm9tICcuL2xpYi9lcnJvcnMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29UcnVlQWRtaW5BcGkge1xuICAgIGNvbnN0cnVjdG9yKHsgdXJsID0gJycsIGhlYWRlcnMgPSB7fSwgZmV0Y2gsIH0pIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIHRoaXMuZmV0Y2ggPSByZXNvbHZlRmV0Y2goZmV0Y2gpO1xuICAgICAgICB0aGlzLm1mYSA9IHtcbiAgICAgICAgICAgIGxpc3RGYWN0b3JzOiB0aGlzLl9saXN0RmFjdG9ycy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZGVsZXRlRmFjdG9yOiB0aGlzLl9kZWxldGVGYWN0b3IuYmluZCh0aGlzKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGxvZ2dlZC1pbiBzZXNzaW9uLlxuICAgICAqIEBwYXJhbSBqd3QgQSB2YWxpZCwgbG9nZ2VkLWluIEpXVC5cbiAgICAgKiBAcGFyYW0gc2NvcGUgVGhlIGxvZ291dCBzb3BlLlxuICAgICAqL1xuICAgIGFzeW5jIHNpZ25PdXQoand0LCBzY29wZSA9ICdnbG9iYWwnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9sb2dvdXQ/c2NvcGU9JHtzY29wZX1gLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIGp3dCxcbiAgICAgICAgICAgICAgICBub1Jlc29sdmVKc29uOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhbiBpbnZpdGUgbGluayB0byBhbiBlbWFpbCBhZGRyZXNzLlxuICAgICAqIEBwYXJhbSBlbWFpbCBUaGUgZW1haWwgYWRkcmVzcyBvZiB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBBZGRpdGlvbmFsIG9wdGlvbnMgdG8gYmUgaW5jbHVkZWQgd2hlbiBpbnZpdGluZy5cbiAgICAgKi9cbiAgICBhc3luYyBpbnZpdGVVc2VyQnlFbWFpbChlbWFpbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vaW52aXRlYCwge1xuICAgICAgICAgICAgICAgIGJvZHk6IHsgZW1haWwsIGRhdGE6IG9wdGlvbnMuZGF0YSB9LFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zLnJlZGlyZWN0VG8sXG4gICAgICAgICAgICAgICAgeGZvcm06IF91c2VyUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBlbWFpbCBsaW5rcyBhbmQgT1RQcyB0byBiZSBzZW50IHZpYSBhIGN1c3RvbSBlbWFpbCBwcm92aWRlci5cbiAgICAgKiBAcGFyYW0gZW1haWwgVGhlIHVzZXIncyBlbWFpbC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5wYXNzd29yZCBVc2VyIHBhc3N3b3JkLiBGb3Igc2lnbnVwIG9ubHkuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZGF0YSBPcHRpb25hbCB1c2VyIG1ldGFkYXRhLiBGb3Igc2lnbnVwIG9ubHkuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVkaXJlY3RUbyBUaGUgcmVkaXJlY3QgdXJsIHdoaWNoIHNob3VsZCBiZSBhcHBlbmRlZCB0byB0aGUgZ2VuZXJhdGVkIGxpbmtcbiAgICAgKi9cbiAgICBhc3luYyBnZW5lcmF0ZUxpbmsocGFyYW1zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHBhcmFtcywgcmVzdCA9IF9fcmVzdChwYXJhbXMsIFtcIm9wdGlvbnNcIl0pO1xuICAgICAgICAgICAgY29uc3QgYm9keSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcmVzdCksIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKCduZXdFbWFpbCcgaW4gcmVzdCkge1xuICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgbmV3RW1haWwgd2l0aCBuZXdfZW1haWwgaW4gcmVxdWVzdCBib2R5XG4gICAgICAgICAgICAgICAgYm9keS5uZXdfZW1haWwgPSByZXN0ID09PSBudWxsIHx8IHJlc3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlc3QubmV3RW1haWw7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGJvZHlbJ25ld0VtYWlsJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vYWRtaW4vZ2VuZXJhdGVfbGlua2AsIHtcbiAgICAgICAgICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX2dlbmVyYXRlTGlua1Jlc3BvbnNlLFxuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5yZWRpcmVjdFRvLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllczogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBVc2VyIEFkbWluIEFQSVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgdXNlci5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBhIHNlcnZlci4gTmV2ZXIgZXhwb3NlIHlvdXIgYHNlcnZpY2Vfcm9sZWAga2V5IGluIHRoZSBicm93c2VyLlxuICAgICAqL1xuICAgIGFzeW5jIGNyZWF0ZVVzZXIoYXR0cmlidXRlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzYCwge1xuICAgICAgICAgICAgICAgIGJvZHk6IGF0dHJpYnV0ZXMsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIHVzZXJzLlxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYSBzZXJ2ZXIuIE5ldmVyIGV4cG9zZSB5b3VyIGBzZXJ2aWNlX3JvbGVgIGtleSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKiBAcGFyYW0gcGFyYW1zIEFuIG9iamVjdCB3aGljaCBzdXBwb3J0cyBgcGFnZWAgYW5kIGBwZXJQYWdlYCBhcyBudW1iZXJzLCB0byBhbHRlciB0aGUgcGFnaW5hdGVkIHJlc3VsdHMuXG4gICAgICovXG4gICAgYXN5bmMgbGlzdFVzZXJzKHBhcmFtcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2c7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0geyBuZXh0UGFnZTogbnVsbCwgbGFzdFBhZ2U6IDAsIHRvdGFsOiAwIH07XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdHRVQnLCBgJHt0aGlzLnVybH0vYWRtaW4vdXNlcnNgLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIG5vUmVzb2x2ZUpzb246IHRydWUsXG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgcGFnZTogKF9iID0gKF9hID0gcGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLnBhZ2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgcGVyX3BhZ2U6IChfZCA9IChfYyA9IHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5wZXJQYWdlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MudG9TdHJpbmcoKSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogJycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX25vUmVzb2x2ZUpzb25SZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKVxuICAgICAgICAgICAgICAgIHRocm93IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBjb25zdCB0b3RhbCA9IChfZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCd4LXRvdGFsLWNvdW50JykpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IDA7XG4gICAgICAgICAgICBjb25zdCBsaW5rcyA9IChfZyA9IChfZiA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdsaW5rJykpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5zcGxpdCgnLCcpKSAhPT0gbnVsbCAmJiBfZyAhPT0gdm9pZCAwID8gX2cgOiBbXTtcbiAgICAgICAgICAgIGlmIChsaW5rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gcGFyc2VJbnQobGluay5zcGxpdCgnOycpWzBdLnNwbGl0KCc9JylbMV0uc3Vic3RyaW5nKDAsIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVsID0gSlNPTi5wYXJzZShsaW5rLnNwbGl0KCc7JylbMV0uc3BsaXQoJz0nKVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25bYCR7cmVsfVBhZ2VgXSA9IHBhZ2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbi50b3RhbCA9IHBhcnNlSW50KHRvdGFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdXNlcnMpLCBwYWdpbmF0aW9uKSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXJzOiBbXSB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHVzZXIgYnkgaWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdWlkIFRoZSB1c2VyJ3MgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIGEgc2VydmVyLiBOZXZlciBleHBvc2UgeW91ciBgc2VydmljZV9yb2xlYCBrZXkgaW4gdGhlIGJyb3dzZXIuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0VXNlckJ5SWQodWlkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0dFVCcsIGAke3RoaXMudXJsfS9hZG1pbi91c2Vycy8ke3VpZH1gLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB1c2VyIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlcyBUaGUgZGF0YSB5b3Ugd2FudCB0byB1cGRhdGUuXG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBhIHNlcnZlci4gTmV2ZXIgZXhwb3NlIHlvdXIgYHNlcnZpY2Vfcm9sZWAga2V5IGluIHRoZSBicm93c2VyLlxuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZVVzZXJCeUlkKHVpZCwgYXR0cmlidXRlcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQVVQnLCBgJHt0aGlzLnVybH0vYWRtaW4vdXNlcnMvJHt1aWR9YCwge1xuICAgICAgICAgICAgICAgIGJvZHk6IGF0dHJpYnV0ZXMsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxldGUgYSB1c2VyLiBSZXF1aXJlcyBhIGBzZXJ2aWNlX3JvbGVgIGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBUaGUgdXNlciBpZCB5b3Ugd2FudCB0byByZW1vdmUuXG4gICAgICogQHBhcmFtIHNob3VsZFNvZnREZWxldGUgSWYgdHJ1ZSwgdGhlbiB0aGUgdXNlciB3aWxsIGJlIHNvZnQtZGVsZXRlZCBmcm9tIHRoZSBhdXRoIHNjaGVtYS4gU29mdCBkZWxldGlvbiBhbGxvd3MgdXNlciBpZGVudGlmaWNhdGlvbiBmcm9tIHRoZSBoYXNoZWQgdXNlciBJRCBidXQgaXMgbm90IHJldmVyc2libGUuXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkuXG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBhIHNlcnZlci4gTmV2ZXIgZXhwb3NlIHlvdXIgYHNlcnZpY2Vfcm9sZWAga2V5IGluIHRoZSBicm93c2VyLlxuICAgICAqL1xuICAgIGFzeW5jIGRlbGV0ZVVzZXIoaWQsIHNob3VsZFNvZnREZWxldGUgPSBmYWxzZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdERUxFVEUnLCBgJHt0aGlzLnVybH0vYWRtaW4vdXNlcnMvJHtpZH1gLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkX3NvZnRfZGVsZXRlOiBzaG91bGRTb2Z0RGVsZXRlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeGZvcm06IF91c2VyUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIF9saXN0RmFjdG9ycyhwYXJhbXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdHRVQnLCBgJHt0aGlzLnVybH0vYWRtaW4vdXNlcnMvJHtwYXJhbXMudXNlcklkfS9mYWN0b3JzYCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB4Zm9ybTogKGZhY3RvcnMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBmYWN0b3JzIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgX2RlbGV0ZUZhY3RvcihwYXJhbXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnREVMRVRFJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzLyR7cGFyYW1zLnVzZXJJZH0vZmFjdG9ycy8ke3BhcmFtcy5pZH1gLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUdvVHJ1ZUFkbWluQXBpLmpzLm1hcCIsImltcG9ydCBHb1RydWVBZG1pbkFwaSBmcm9tICcuL0dvVHJ1ZUFkbWluQXBpJztcbmltcG9ydCB7IERFRkFVTFRfSEVBREVSUywgRVhQSVJZX01BUkdJTl9NUywgQVVUT19SRUZSRVNIX1RJQ0tfRFVSQVRJT05fTVMsIEFVVE9fUkVGUkVTSF9USUNLX1RIUkVTSE9MRCwgR09UUlVFX1VSTCwgU1RPUkFHRV9LRVksIEpXS1NfVFRMLCB9IGZyb20gJy4vbGliL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IsIEF1dGhQS0NFR3JhbnRDb2RlRXhjaGFuZ2VFcnJvciwgQXV0aEludmFsaWRDcmVkZW50aWFsc0Vycm9yLCBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvciwgQXV0aEludmFsaWRUb2tlblJlc3BvbnNlRXJyb3IsIEF1dGhVbmtub3duRXJyb3IsIGlzQXV0aEFwaUVycm9yLCBpc0F1dGhFcnJvciwgaXNBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvciwgaXNBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvciwgaXNBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IsIEF1dGhJbnZhbGlkSnd0RXJyb3IsIH0gZnJvbSAnLi9saWIvZXJyb3JzJztcbmltcG9ydCB7IF9yZXF1ZXN0LCBfc2Vzc2lvblJlc3BvbnNlLCBfc2Vzc2lvblJlc3BvbnNlUGFzc3dvcmQsIF91c2VyUmVzcG9uc2UsIF9zc29SZXNwb25zZSwgfSBmcm9tICcuL2xpYi9mZXRjaCc7XG5pbXBvcnQgeyBEZWZlcnJlZCwgZ2V0SXRlbUFzeW5jLCBpc0Jyb3dzZXIsIHJlbW92ZUl0ZW1Bc3luYywgcmVzb2x2ZUZldGNoLCBzZXRJdGVtQXN5bmMsIHV1aWQsIHJldHJ5YWJsZSwgc2xlZXAsIHN1cHBvcnRzTG9jYWxTdG9yYWdlLCBwYXJzZVBhcmFtZXRlcnNGcm9tVVJMLCBnZXRDb2RlQ2hhbGxlbmdlQW5kTWV0aG9kLCBnZXRBbGdvcml0aG0sIHZhbGlkYXRlRXhwLCBkZWNvZGVKV1QsIH0gZnJvbSAnLi9saWIvaGVscGVycyc7XG5pbXBvcnQgeyBsb2NhbFN0b3JhZ2VBZGFwdGVyLCBtZW1vcnlMb2NhbFN0b3JhZ2VBZGFwdGVyIH0gZnJvbSAnLi9saWIvbG9jYWwtc3RvcmFnZSc7XG5pbXBvcnQgeyBwb2x5ZmlsbEdsb2JhbFRoaXMgfSBmcm9tICcuL2xpYi9wb2x5ZmlsbHMnO1xuaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vbGliL3ZlcnNpb24nO1xuaW1wb3J0IHsgTG9ja0FjcXVpcmVUaW1lb3V0RXJyb3IsIG5hdmlnYXRvckxvY2sgfSBmcm9tICcuL2xpYi9sb2Nrcyc7XG5pbXBvcnQgeyBzdHJpbmdUb1VpbnQ4QXJyYXkgfSBmcm9tICcuL2xpYi9iYXNlNjR1cmwnO1xucG9seWZpbGxHbG9iYWxUaGlzKCk7IC8vIE1ha2UgXCJnbG9iYWxUaGlzXCIgYXZhaWxhYmxlXG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgdXJsOiBHT1RSVUVfVVJMLFxuICAgIHN0b3JhZ2VLZXk6IFNUT1JBR0VfS0VZLFxuICAgIGF1dG9SZWZyZXNoVG9rZW46IHRydWUsXG4gICAgcGVyc2lzdFNlc3Npb246IHRydWUsXG4gICAgZGV0ZWN0U2Vzc2lvbkluVXJsOiB0cnVlLFxuICAgIGhlYWRlcnM6IERFRkFVTFRfSEVBREVSUyxcbiAgICBmbG93VHlwZTogJ2ltcGxpY2l0JyxcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgaGFzQ3VzdG9tQXV0aG9yaXphdGlvbkhlYWRlcjogZmFsc2UsXG59O1xuYXN5bmMgZnVuY3Rpb24gbG9ja05vT3AobmFtZSwgYWNxdWlyZVRpbWVvdXQsIGZuKSB7XG4gICAgcmV0dXJuIGF3YWl0IGZuKCk7XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb1RydWVDbGllbnQge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBjbGllbnQgZm9yIHVzZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMubWVtb3J5U3RvcmFnZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VFbWl0dGVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5hdXRvUmVmcmVzaFRpY2tlciA9IG51bGw7XG4gICAgICAgIHRoaXMudmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjayA9IG51bGw7XG4gICAgICAgIHRoaXMucmVmcmVzaGluZ0RlZmVycmVkID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBhc3luYyBjbGllbnQgaW5pdGlhbGl6YXRpb24uXG4gICAgICAgICAqIFdoZW4gbnVsbCBvciBub3QgeWV0IHJlc29sdmVkIHRoZSBhdXRoIHN0YXRlIGlzIGB1bmtub3duYFxuICAgICAgICAgKiBPbmNlIHJlc29sdmVkIHRoZSB0aGUgYXV0aCBzdGF0ZSBpcyBrbm93biBhbmQgaXQncyBzYXZlIHRvIGNhbGwgYW55IGZ1cnRoZXIgY2xpZW50IG1ldGhvZHMuXG4gICAgICAgICAqIEtlZXAgZXh0cmEgY2FyZSB0byBuZXZlciByZWplY3Qgb3IgdGhyb3cgdW5jYXVnaHQgZXJyb3JzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluaXRpYWxpemVQcm9taXNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5kZXRlY3RTZXNzaW9uSW5VcmwgPSB0cnVlO1xuICAgICAgICB0aGlzLmhhc0N1c3RvbUF1dGhvcml6YXRpb25IZWFkZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdXBwcmVzc0dldFNlc3Npb25XYXJuaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9ja0FjcXVpcmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGVuZGluZ0luTG9jayA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogVXNlZCB0byBicm9hZGNhc3Qgc3RhdGUgY2hhbmdlIGV2ZW50cyB0byBvdGhlciB0YWJzIGxpc3RlbmluZy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYnJvYWRjYXN0Q2hhbm5lbCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gY29uc29sZS5sb2c7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VJRCA9IEdvVHJ1ZUNsaWVudC5uZXh0SW5zdGFuY2VJRDtcbiAgICAgICAgR29UcnVlQ2xpZW50Lm5leHRJbnN0YW5jZUlEICs9IDE7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlSUQgPiAwICYmIGlzQnJvd3NlcigpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ011bHRpcGxlIEdvVHJ1ZUNsaWVudCBpbnN0YW5jZXMgZGV0ZWN0ZWQgaW4gdGhlIHNhbWUgYnJvd3NlciBjb250ZXh0LiBJdCBpcyBub3QgYW4gZXJyb3IsIGJ1dCB0aGlzIHNob3VsZCBiZSBhdm9pZGVkIGFzIGl0IG1heSBwcm9kdWNlIHVuZGVmaW5lZCBiZWhhdmlvciB3aGVuIHVzZWQgY29uY3VycmVudGx5IHVuZGVyIHRoZSBzYW1lIHN0b3JhZ2Uga2V5LicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX09QVElPTlMpLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5sb2dEZWJ1Z01lc3NhZ2VzID0gISFzZXR0aW5ncy5kZWJ1ZztcbiAgICAgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5kZWJ1ZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIgPSBzZXR0aW5ncy5kZWJ1ZztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlcnNpc3RTZXNzaW9uID0gc2V0dGluZ3MucGVyc2lzdFNlc3Npb247XG4gICAgICAgIHRoaXMuc3RvcmFnZUtleSA9IHNldHRpbmdzLnN0b3JhZ2VLZXk7XG4gICAgICAgIHRoaXMuYXV0b1JlZnJlc2hUb2tlbiA9IHNldHRpbmdzLmF1dG9SZWZyZXNoVG9rZW47XG4gICAgICAgIHRoaXMuYWRtaW4gPSBuZXcgR29UcnVlQWRtaW5BcGkoe1xuICAgICAgICAgICAgdXJsOiBzZXR0aW5ncy51cmwsXG4gICAgICAgICAgICBoZWFkZXJzOiBzZXR0aW5ncy5oZWFkZXJzLFxuICAgICAgICAgICAgZmV0Y2g6IHNldHRpbmdzLmZldGNoLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cmwgPSBzZXR0aW5ncy51cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IHNldHRpbmdzLmhlYWRlcnM7XG4gICAgICAgIHRoaXMuZmV0Y2ggPSByZXNvbHZlRmV0Y2goc2V0dGluZ3MuZmV0Y2gpO1xuICAgICAgICB0aGlzLmxvY2sgPSBzZXR0aW5ncy5sb2NrIHx8IGxvY2tOb09wO1xuICAgICAgICB0aGlzLmRldGVjdFNlc3Npb25JblVybCA9IHNldHRpbmdzLmRldGVjdFNlc3Npb25JblVybDtcbiAgICAgICAgdGhpcy5mbG93VHlwZSA9IHNldHRpbmdzLmZsb3dUeXBlO1xuICAgICAgICB0aGlzLmhhc0N1c3RvbUF1dGhvcml6YXRpb25IZWFkZXIgPSBzZXR0aW5ncy5oYXNDdXN0b21BdXRob3JpemF0aW9uSGVhZGVyO1xuICAgICAgICBpZiAoc2V0dGluZ3MubG9jaykge1xuICAgICAgICAgICAgdGhpcy5sb2NrID0gc2V0dGluZ3MubG9jaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0Jyb3dzZXIoKSAmJiAoKF9hID0gZ2xvYmFsVGhpcyA9PT0gbnVsbCB8fCBnbG9iYWxUaGlzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBnbG9iYWxUaGlzLm5hdmlnYXRvcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxvY2tzKSkge1xuICAgICAgICAgICAgdGhpcy5sb2NrID0gbmF2aWdhdG9yTG9jaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9jayA9IGxvY2tOb09wO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuandrcyA9IHsga2V5czogW10gfTtcbiAgICAgICAgdGhpcy5qd2tzX2NhY2hlZF9hdCA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSO1xuICAgICAgICB0aGlzLm1mYSA9IHtcbiAgICAgICAgICAgIHZlcmlmeTogdGhpcy5fdmVyaWZ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICBlbnJvbGw6IHRoaXMuX2Vucm9sbC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdW5lbnJvbGw6IHRoaXMuX3VuZW5yb2xsLmJpbmQodGhpcyksXG4gICAgICAgICAgICBjaGFsbGVuZ2U6IHRoaXMuX2NoYWxsZW5nZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgbGlzdEZhY3RvcnM6IHRoaXMuX2xpc3RGYWN0b3JzLmJpbmQodGhpcyksXG4gICAgICAgICAgICBjaGFsbGVuZ2VBbmRWZXJpZnk6IHRoaXMuX2NoYWxsZW5nZUFuZFZlcmlmeS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZ2V0QXV0aGVudGljYXRvckFzc3VyYW5jZUxldmVsOiB0aGlzLl9nZXRBdXRoZW50aWNhdG9yQXNzdXJhbmNlTGV2ZWwuYmluZCh0aGlzKSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMucGVyc2lzdFNlc3Npb24pIHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5zdG9yYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlID0gc2V0dGluZ3Muc3RvcmFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0c0xvY2FsU3RvcmFnZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IGxvY2FsU3RvcmFnZUFkYXB0ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbW9yeVN0b3JhZ2UgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlID0gbWVtb3J5TG9jYWxTdG9yYWdlQWRhcHRlcih0aGlzLm1lbW9yeVN0b3JhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWVtb3J5U3RvcmFnZSA9IHt9O1xuICAgICAgICAgICAgdGhpcy5zdG9yYWdlID0gbWVtb3J5TG9jYWxTdG9yYWdlQWRhcHRlcih0aGlzLm1lbW9yeVN0b3JhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Jyb3dzZXIoKSAmJiBnbG9iYWxUaGlzLkJyb2FkY2FzdENoYW5uZWwgJiYgdGhpcy5wZXJzaXN0U2Vzc2lvbiAmJiB0aGlzLnN0b3JhZ2VLZXkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5icm9hZGNhc3RDaGFubmVsID0gbmV3IGdsb2JhbFRoaXMuQnJvYWRjYXN0Q2hhbm5lbCh0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIGEgbmV3IEJyb2FkY2FzdENoYW5uZWwsIG11bHRpLXRhYiBzdGF0ZSBjaGFuZ2VzIHdpbGwgbm90IGJlIGF2YWlsYWJsZScsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKF9iID0gdGhpcy5icm9hZGNhc3RDaGFubmVsKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGFzeW5jIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCdyZWNlaXZlZCBicm9hZGNhc3Qgbm90aWZpY2F0aW9uIGZyb20gb3RoZXIgdGFiIG9yIGNsaWVudCcsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycyhldmVudC5kYXRhLmV2ZW50LCBldmVudC5kYXRhLnNlc3Npb24sIGZhbHNlKTsgLy8gYnJvYWRjYXN0ID0gZmFsc2Ugc28gd2UgZG9uJ3QgZ2V0IGFuIGVuZGxlc3MgbG9vcCBvZiBtZXNzYWdlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuICAgIF9kZWJ1ZyguLi5hcmdzKSB7XG4gICAgICAgIGlmICh0aGlzLmxvZ0RlYnVnTWVzc2FnZXMpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKGBHb1RydWVDbGllbnRAJHt0aGlzLmluc3RhbmNlSUR9ICgke3ZlcnNpb259KSAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX1gLCAuLi5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGNsaWVudCBzZXNzaW9uIGVpdGhlciBmcm9tIHRoZSB1cmwgb3IgZnJvbSBzdG9yYWdlLlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGF1dG9tYXRpY2FsbHkgY2FsbGVkIHdoZW4gaW5zdGFudGlhdGluZyB0aGUgY2xpZW50LCBidXQgc2hvdWxkIGFsc28gYmUgY2FsbGVkXG4gICAgICogbWFudWFsbHkgd2hlbiBjaGVja2luZyBmb3IgYW4gZXJyb3IgZnJvbSBhbiBhdXRoIHJlZGlyZWN0IChvYXV0aCwgbWFnaWNsaW5rLCBwYXNzd29yZCByZWNvdmVyeSwgZXRjKS5cbiAgICAgKi9cbiAgICBhc3luYyBpbml0aWFsaXplKCkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplUHJvbWlzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0aWFsaXplUHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5faW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJTVBPUlRBTlQ6XG4gICAgICogMS4gTmV2ZXIgdGhyb3cgaW4gdGhpcyBtZXRob2QsIGFzIGl0IGlzIGNhbGxlZCBmcm9tIHRoZSBjb25zdHJ1Y3RvclxuICAgICAqIDIuIE5ldmVyIHJldHVybiBhIHNlc3Npb24gZnJvbSB0aGlzIG1ldGhvZCBhcyBpdCB3b3VsZCBiZSBjYWNoZWQgb3ZlclxuICAgICAqICAgIHRoZSB3aG9sZSBsaWZldGltZSBvZiB0aGUgY2xpZW50XG4gICAgICovXG4gICAgYXN5bmMgX2luaXRpYWxpemUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHBhcnNlUGFyYW1ldGVyc0Zyb21VUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgbGV0IGNhbGxiYWNrVXJsVHlwZSA9ICdub25lJztcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0ltcGxpY2l0R3JhbnRDYWxsYmFjayhwYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tVcmxUeXBlID0gJ2ltcGxpY2l0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGF3YWl0IHRoaXMuX2lzUEtDRUNhbGxiYWNrKHBhcmFtcykpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja1VybFR5cGUgPSAncGtjZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEF0dGVtcHQgdG8gZ2V0IHRoZSBzZXNzaW9uIGZyb20gdGhlIFVSTCBvbmx5IGlmIHRoZXNlIGNvbmRpdGlvbnMgYXJlIGZ1bGZpbGxlZFxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIE5vdGU6IElmIHRoZSBVUkwgaXNuJ3Qgb25lIG9mIHRoZSBjYWxsYmFjayB1cmwgdHlwZXMgKGltcGxpY2l0IG9yIHBrY2UpLFxuICAgICAgICAgICAgICogdGhlbiB0aGVyZSBjb3VsZCBiZSBhbiBleGlzdGluZyBzZXNzaW9uIHNvIHdlIGRvbid0IHdhbnQgdG8gcHJlbWF0dXJlbHkgcmVtb3ZlIGl0XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmIChpc0Jyb3dzZXIoKSAmJiB0aGlzLmRldGVjdFNlc3Npb25JblVybCAmJiBjYWxsYmFja1VybFR5cGUgIT09ICdub25lJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuX2dldFNlc3Npb25Gcm9tVVJMKHBhcmFtcywgY2FsbGJhY2tVcmxUeXBlKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfaW5pdGlhbGl6ZSgpJywgJ2Vycm9yIGRldGVjdGluZyBzZXNzaW9uIGZyb20gVVJMJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPSAoX2EgPSBlcnJvci5kZXRhaWxzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvckNvZGUgPT09ICdpZGVudGl0eV9hbHJlYWR5X2V4aXN0cycgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNvZGUgPT09ICdpZGVudGl0eV9ub3RfZm91bmQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDb2RlID09PSAnc2luZ2xlX2lkZW50aXR5X25vdF9kZWxldGFibGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBmYWlsZWQgbG9naW4gYXR0ZW1wdCB2aWEgdXJsLFxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgb2xkIHNlc3Npb24gYXMgaW4gdmVyaWZ5T3RwLCBzaWduVXAgYW5kIHNpZ25JbldpdGgqXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3JlbW92ZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzZXNzaW9uLCByZWRpcmVjdFR5cGUgfSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfaW5pdGlhbGl6ZSgpJywgJ2RldGVjdGVkIHNlc3Npb24gaW4gVVJMJywgc2Vzc2lvbiwgJ3JlZGlyZWN0IHR5cGUnLCByZWRpcmVjdFR5cGUpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKHNlc3Npb24pO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3RUeXBlID09PSAncmVjb3ZlcnknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnUEFTU1dPUkRfUkVDT1ZFUlknLCBzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBubyBsb2dpbiBhdHRlbXB0IHZpYSBjYWxsYmFjayB1cmwgdHJ5IHRvIHJlY292ZXIgc2Vzc2lvbiBmcm9tIHN0b3JhZ2VcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3JlY292ZXJBbmRSZWZyZXNoKCk7XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGVycm9yOiBuZXcgQXV0aFVua25vd25FcnJvcignVW5leHBlY3RlZCBlcnJvciBkdXJpbmcgaW5pdGlhbGl6YXRpb24nLCBlcnJvciksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5faGFuZGxlVmlzaWJpbGl0eUNoYW5nZSgpO1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfaW5pdGlhbGl6ZSgpJywgJ2VuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgYW5vbnltb3VzIHVzZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHNlc3Npb24gd2hlcmUgdGhlIGlzX2Fub255bW91cyBjbGFpbSBpbiB0aGUgYWNjZXNzIHRva2VuIEpXVCBzZXQgdG8gdHJ1ZVxuICAgICAqL1xuICAgIGFzeW5jIHNpZ25JbkFub255bW91c2x5KGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vc2lnbnVwYCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IChfYiA9IChfYSA9IGNyZWRlbnRpYWxzID09PSBudWxsIHx8IGNyZWRlbnRpYWxzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGF0YSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoge30sXG4gICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IChfYyA9IGNyZWRlbnRpYWxzID09PSBudWxsIHx8IGNyZWRlbnRpYWxzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzO1xuICAgICAgICAgICAgaWYgKGVycm9yIHx8ICFkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yOiBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGRhdGEuc2Vzc2lvbjtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBkYXRhLnVzZXI7XG4gICAgICAgICAgICBpZiAoZGF0YS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgc2Vzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXIsIHNlc3Npb24gfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgdXNlci5cbiAgICAgKlxuICAgICAqIEJlIGF3YXJlIHRoYXQgaWYgYSB1c2VyIGFjY291bnQgZXhpc3RzIGluIHRoZSBzeXN0ZW0geW91IG1heSBnZXQgYmFjayBhblxuICAgICAqIGVycm9yIG1lc3NhZ2UgdGhhdCBhdHRlbXB0cyB0byBoaWRlIHRoaXMgaW5mb3JtYXRpb24gZnJvbSB0aGUgdXNlci5cbiAgICAgKiBUaGlzIG1ldGhvZCBoYXMgc3VwcG9ydCBmb3IgUEtDRSB2aWEgZW1haWwgc2lnbnVwcy4gVGhlIFBLQ0UgZmxvdyBjYW5ub3QgYmUgdXNlZCB3aGVuIGF1dG9jb25maXJtIGlzIGVuYWJsZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIGxvZ2dlZC1pbiBzZXNzaW9uIGlmIHRoZSBzZXJ2ZXIgaGFzIFwiYXV0b2NvbmZpcm1cIiBPTlxuICAgICAqIEByZXR1cm5zIEEgdXNlciBpZiB0aGUgc2VydmVyIGhhcyBcImF1dG9jb25maXJtXCIgT0ZGXG4gICAgICovXG4gICAgYXN5bmMgc2lnblVwKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcztcbiAgICAgICAgICAgIGlmICgnZW1haWwnIGluIGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgY29kZUNoYWxsZW5nZU1ldGhvZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdwa2NlJykge1xuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgIFtjb2RlQ2hhbGxlbmdlLCBjb2RlQ2hhbGxlbmdlTWV0aG9kXSA9IGF3YWl0IGdldENvZGVDaGFsbGVuZ2VBbmRNZXRob2QodGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXMgPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9zaWdudXBgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmVtYWlsUmVkaXJlY3RUbyxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kYXRhKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlOiBjb2RlQ2hhbGxlbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2VfbWV0aG9kOiBjb2RlQ2hhbGxlbmdlTWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCdwaG9uZScgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBob25lLCBwYXNzd29yZCwgb3B0aW9ucyB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICAgICAgcmVzID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vc2lnbnVwYCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoX2IgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGF0YSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiAoX2MgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2hhbm5lbCkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogJ3NtcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbnZhbGlkQ3JlZGVudGlhbHNFcnJvcignWW91IG11c3QgcHJvdmlkZSBlaXRoZXIgYW4gZW1haWwgb3IgcGhvbmUgbnVtYmVyIGFuZCBhIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSByZXM7XG4gICAgICAgICAgICBpZiAoZXJyb3IgfHwgIWRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3I6IGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gZGF0YS5zZXNzaW9uO1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGRhdGEudXNlcjtcbiAgICAgICAgICAgIGlmIChkYXRhLnNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBzZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlciwgc2Vzc2lvbiB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9nIGluIGFuIGV4aXN0aW5nIHVzZXIgd2l0aCBhbiBlbWFpbCBhbmQgcGFzc3dvcmQgb3IgcGhvbmUgYW5kIHBhc3N3b3JkLlxuICAgICAqXG4gICAgICogQmUgYXdhcmUgdGhhdCB5b3UgbWF5IGdldCBiYWNrIGFuIGVycm9yIG1lc3NhZ2UgdGhhdCB3aWxsIG5vdCBkaXN0aW5ndWlzaFxuICAgICAqIGJldHdlZW4gdGhlIGNhc2VzIHdoZXJlIHRoZSBhY2NvdW50IGRvZXMgbm90IGV4aXN0IG9yIHRoYXQgdGhlXG4gICAgICogZW1haWwvcGhvbmUgYW5kIHBhc3N3b3JkIGNvbWJpbmF0aW9uIGlzIHdyb25nIG9yIHRoYXQgdGhlIGFjY291bnQgY2FuIG9ubHlcbiAgICAgKiBiZSBhY2Nlc3NlZCB2aWEgc29jaWFsIGxvZ2luLlxuICAgICAqL1xuICAgIGFzeW5jIHNpZ25JbldpdGhQYXNzd29yZChjcmVkZW50aWFscykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlcztcbiAgICAgICAgICAgIGlmICgnZW1haWwnIGluIGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgIHJlcyA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3Rva2VuP2dyYW50X3R5cGU9cGFzc3dvcmRgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2VQYXNzd29yZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCdwaG9uZScgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBob25lLCBwYXNzd29yZCwgb3B0aW9ucyB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICAgICAgcmVzID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vdG9rZW4/Z3JhbnRfdHlwZT1wYXNzd29yZGAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZVBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbnZhbGlkQ3JlZGVudGlhbHNFcnJvcignWW91IG11c3QgcHJvdmlkZSBlaXRoZXIgYW4gZW1haWwgb3IgcGhvbmUgbnVtYmVyIGFuZCBhIHBhc3N3b3JkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSByZXM7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFkYXRhIHx8ICFkYXRhLnNlc3Npb24gfHwgIWRhdGEudXNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogbmV3IEF1dGhJbnZhbGlkVG9rZW5SZXNwb25zZUVycm9yKCkgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLnNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkYXRhOiBPYmplY3QuYXNzaWduKHsgdXNlcjogZGF0YS51c2VyLCBzZXNzaW9uOiBkYXRhLnNlc3Npb24gfSwgKGRhdGEud2Vha19wYXNzd29yZCA/IHsgd2Vha1Bhc3N3b3JkOiBkYXRhLndlYWtfcGFzc3dvcmQgfSA6IG51bGwpKSxcbiAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2cgaW4gYW4gZXhpc3RpbmcgdXNlciB2aWEgYSB0aGlyZC1wYXJ0eSBwcm92aWRlci5cbiAgICAgKiBUaGlzIG1ldGhvZCBzdXBwb3J0cyB0aGUgUEtDRSBmbG93LlxuICAgICAqL1xuICAgIGFzeW5jIHNpZ25JbldpdGhPQXV0aChjcmVkZW50aWFscykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9oYW5kbGVQcm92aWRlclNpZ25JbihjcmVkZW50aWFscy5wcm92aWRlciwge1xuICAgICAgICAgICAgcmVkaXJlY3RUbzogKF9hID0gY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlZGlyZWN0VG8sXG4gICAgICAgICAgICBzY29wZXM6IChfYiA9IGNyZWRlbnRpYWxzLm9wdGlvbnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zY29wZXMsXG4gICAgICAgICAgICBxdWVyeVBhcmFtczogKF9jID0gY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgc2tpcEJyb3dzZXJSZWRpcmVjdDogKF9kID0gY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnNraXBCcm93c2VyUmVkaXJlY3QsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2cgaW4gYW4gZXhpc3RpbmcgdXNlciBieSBleGNoYW5naW5nIGFuIEF1dGggQ29kZSBpc3N1ZWQgZHVyaW5nIHRoZSBQS0NFIGZsb3cuXG4gICAgICovXG4gICAgYXN5bmMgZXhjaGFuZ2VDb2RlRm9yU2Vzc2lvbihhdXRoQ29kZSkge1xuICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICByZXR1cm4gdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9leGNoYW5nZUNvZGVGb3JTZXNzaW9uKGF1dGhDb2RlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIF9leGNoYW5nZUNvZGVGb3JTZXNzaW9uKGF1dGhDb2RlKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2VJdGVtID0gYXdhaXQgZ2V0SXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgYCR7dGhpcy5zdG9yYWdlS2V5fS1jb2RlLXZlcmlmaWVyYCk7XG4gICAgICAgIGNvbnN0IFtjb2RlVmVyaWZpZXIsIHJlZGlyZWN0VHlwZV0gPSAoc3RvcmFnZUl0ZW0gIT09IG51bGwgJiYgc3RvcmFnZUl0ZW0gIT09IHZvaWQgMCA/IHN0b3JhZ2VJdGVtIDogJycpLnNwbGl0KCcvJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS90b2tlbj9ncmFudF90eXBlPXBrY2VgLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aF9jb2RlOiBhdXRoQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgY29kZV92ZXJpZmllcjogY29kZVZlcmlmaWVyLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHJlbW92ZUl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIGAke3RoaXMuc3RvcmFnZUtleX0tY29kZS12ZXJpZmllcmApO1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgIWRhdGEuc2Vzc2lvbiB8fCAhZGF0YS51c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsLCByZWRpcmVjdFR5cGU6IG51bGwgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG5ldyBBdXRoSW52YWxpZFRva2VuUmVzcG9uc2VFcnJvcigpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZGF0YSksIHsgcmVkaXJlY3RUeXBlOiByZWRpcmVjdFR5cGUgIT09IG51bGwgJiYgcmVkaXJlY3RUeXBlICE9PSB2b2lkIDAgPyByZWRpcmVjdFR5cGUgOiBudWxsIH0pLCBlcnJvciB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCwgcmVkaXJlY3RUeXBlOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGxvd3Mgc2lnbmluZyBpbiB3aXRoIGFuIE9JREMgSUQgdG9rZW4uIFRoZSBhdXRoZW50aWNhdGlvbiBwcm92aWRlciB1c2VkXG4gICAgICogc2hvdWxkIGJlIGVuYWJsZWQgYW5kIGNvbmZpZ3VyZWQuXG4gICAgICovXG4gICAgYXN5bmMgc2lnbkluV2l0aElkVG9rZW4oY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucywgcHJvdmlkZXIsIHRva2VuLCBhY2Nlc3NfdG9rZW4sIG5vbmNlIH0gPSBjcmVkZW50aWFscztcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3Rva2VuP2dyYW50X3R5cGU9aWRfdG9rZW5gLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIsXG4gICAgICAgICAgICAgICAgICAgIGlkX3Rva2VuOiB0b2tlbixcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICBub25jZSxcbiAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHJlcztcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIWRhdGEgfHwgIWRhdGEuc2Vzc2lvbiB8fCAhZGF0YS51c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBuZXcgQXV0aEludmFsaWRUb2tlblJlc3BvbnNlRXJyb3IoKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9JTicsIGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvciB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9nIGluIGEgdXNlciB1c2luZyBtYWdpY2xpbmsgb3IgYSBvbmUtdGltZSBwYXNzd29yZCAoT1RQKS5cbiAgICAgKlxuICAgICAqIElmIHRoZSBge3sgLkNvbmZpcm1hdGlvblVSTCB9fWAgdmFyaWFibGUgaXMgc3BlY2lmaWVkIGluIHRoZSBlbWFpbCB0ZW1wbGF0ZSwgYSBtYWdpY2xpbmsgd2lsbCBiZSBzZW50LlxuICAgICAqIElmIHRoZSBge3sgLlRva2VuIH19YCB2YXJpYWJsZSBpcyBzcGVjaWZpZWQgaW4gdGhlIGVtYWlsIHRlbXBsYXRlLCBhbiBPVFAgd2lsbCBiZSBzZW50LlxuICAgICAqIElmIHlvdSdyZSB1c2luZyBwaG9uZSBzaWduLWlucywgb25seSBhbiBPVFAgd2lsbCBiZSBzZW50LiBZb3Ugd29uJ3QgYmUgYWJsZSB0byBzZW5kIGEgbWFnaWNsaW5rIGZvciBwaG9uZSBzaWduLWlucy5cbiAgICAgKlxuICAgICAqIEJlIGF3YXJlIHRoYXQgeW91IG1heSBnZXQgYmFjayBhbiBlcnJvciBtZXNzYWdlIHRoYXQgd2lsbCBub3QgZGlzdGluZ3Vpc2hcbiAgICAgKiBiZXR3ZWVuIHRoZSBjYXNlcyB3aGVyZSB0aGUgYWNjb3VudCBkb2VzIG5vdCBleGlzdCBvciwgdGhhdCB0aGUgYWNjb3VudFxuICAgICAqIGNhbiBvbmx5IGJlIGFjY2Vzc2VkIHZpYSBzb2NpYWwgbG9naW4uXG4gICAgICpcbiAgICAgKiBEbyBub3RlIHRoYXQgeW91IHdpbGwgbmVlZCB0byBjb25maWd1cmUgYSBXaGF0c2FwcCBzZW5kZXIgb24gVHdpbGlvXG4gICAgICogaWYgeW91IGFyZSB1c2luZyBwaG9uZSBzaWduIGluIHdpdGggdGhlICd3aGF0c2FwcCcgY2hhbm5lbC4gVGhlIHdoYXRzYXBwXG4gICAgICogY2hhbm5lbCBpcyBub3Qgc3VwcG9ydGVkIG9uIG90aGVyIHByb3ZpZGVyc1xuICAgICAqIGF0IHRoaXMgdGltZS5cbiAgICAgKiBUaGlzIG1ldGhvZCBzdXBwb3J0cyBQS0NFIHdoZW4gYW4gZW1haWwgaXMgcGFzc2VkLlxuICAgICAqL1xuICAgIGFzeW5jIHNpZ25JbldpdGhPdHAoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICgnZW1haWwnIGluIGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlbWFpbCwgb3B0aW9ucyB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICAgICAgbGV0IGNvZGVDaGFsbGVuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mbG93VHlwZSA9PT0gJ3BrY2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgW2NvZGVDaGFsbGVuZ2UsIGNvZGVDaGFsbGVuZ2VNZXRob2RdID0gYXdhaXQgZ2V0Q29kZUNoYWxsZW5nZUFuZE1ldGhvZCh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L290cGAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kYXRhKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZV91c2VyOiAoX2IgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuc2hvdWxkQ3JlYXRlVXNlcikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlOiBjb2RlQ2hhbGxlbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2VfbWV0aG9kOiBjb2RlQ2hhbGxlbmdlTWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZW1haWxSZWRpcmVjdFRvLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCdwaG9uZScgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBob25lLCBvcHRpb25zIH0gPSBjcmVkZW50aWFscztcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9vdHBgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoX2MgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGF0YSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVfdXNlcjogKF9kID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNob3VsZENyZWF0ZVVzZXIpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiAoX2UgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2hhbm5lbCkgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogJ3NtcycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsLCBtZXNzYWdlSWQ6IGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5tZXNzYWdlX2lkIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRDcmVkZW50aWFsc0Vycm9yKCdZb3UgbXVzdCBwcm92aWRlIGVpdGhlciBhbiBlbWFpbCBvciBwaG9uZSBudW1iZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2cgaW4gYSB1c2VyIGdpdmVuIGEgVXNlciBzdXBwbGllZCBPVFAgb3IgVG9rZW5IYXNoIHJlY2VpdmVkIHRocm91Z2ggbW9iaWxlIG9yIGVtYWlsLlxuICAgICAqL1xuICAgIGFzeW5jIHZlcmlmeU90cChwYXJhbXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZWRpcmVjdFRvID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgbGV0IGNhcHRjaGFUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICgnb3B0aW9ucycgaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbyA9IChfYSA9IHBhcmFtcy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVkaXJlY3RUbztcbiAgICAgICAgICAgICAgICBjYXB0Y2hhVG9rZW4gPSAoX2IgPSBwYXJhbXMub3B0aW9ucykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhcHRjaGFUb2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3ZlcmlmeWAsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgYm9keTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCB7IGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IGNhcHRjaGFUb2tlbiB9IH0pLFxuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG8sXG4gICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCBvbiB0b2tlbiB2ZXJpZmljYXRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gZGF0YS5zZXNzaW9uO1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGRhdGEudXNlcjtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uID09PSBudWxsIHx8IHNlc3Npb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb24uYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMocGFyYW1zLnR5cGUgPT0gJ3JlY292ZXJ5JyA/ICdQQVNTV09SRF9SRUNPVkVSWScgOiAnU0lHTkVEX0lOJywgc2Vzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXIsIHNlc3Npb24gfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHRzIGEgc2luZ2xlLXNpZ24gb24gdXNpbmcgYW4gZW50ZXJwcmlzZSBJZGVudGl0eSBQcm92aWRlci4gQVxuICAgICAqIHN1Y2Nlc3NmdWwgU1NPIGF0dGVtcHQgd2lsbCByZWRpcmVjdCB0aGUgY3VycmVudCBwYWdlIHRvIHRoZSBpZGVudGl0eVxuICAgICAqIHByb3ZpZGVyIGF1dGhvcml6YXRpb24gcGFnZS4gVGhlIHJlZGlyZWN0IFVSTCBpcyBpbXBsZW1lbnRhdGlvbiBhbmQgU1NPXG4gICAgICogcHJvdG9jb2wgc3BlY2lmaWMuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIHVzZSBpdCBieSBwcm92aWRpbmcgYSBTU08gZG9tYWluLiBUeXBpY2FsbHkgeW91IGNhbiBleHRyYWN0IHRoaXNcbiAgICAgKiBkb21haW4gYnkgYXNraW5nIHVzZXJzIGZvciB0aGVpciBlbWFpbCBhZGRyZXNzLiBJZiB0aGlzIGRvbWFpbiBpc1xuICAgICAqIHJlZ2lzdGVyZWQgb24gdGhlIEF1dGggaW5zdGFuY2UgdGhlIHJlZGlyZWN0IHdpbGwgdXNlIHRoYXQgb3JnYW5pemF0aW9uJ3NcbiAgICAgKiBjdXJyZW50bHkgYWN0aXZlIFNTTyBJZGVudGl0eSBQcm92aWRlciBmb3IgdGhlIGxvZ2luLlxuICAgICAqXG4gICAgICogSWYgeW91IGhhdmUgYnVpbHQgYW4gb3JnYW5pemF0aW9uLXNwZWNpZmljIGxvZ2luIHBhZ2UsIHlvdSBjYW4gdXNlIHRoZVxuICAgICAqIG9yZ2FuaXphdGlvbidzIFNTTyBJZGVudGl0eSBQcm92aWRlciBVVUlEIGRpcmVjdGx5IGluc3RlYWQuXG4gICAgICovXG4gICAgYXN5bmMgc2lnbkluV2l0aFNTTyhwYXJhbXMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgY29kZUNoYWxsZW5nZSA9IG51bGw7XG4gICAgICAgICAgICBsZXQgY29kZUNoYWxsZW5nZU1ldGhvZCA9IG51bGw7XG4gICAgICAgICAgICBpZiAodGhpcy5mbG93VHlwZSA9PT0gJ3BrY2UnKSB7XG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIFtjb2RlQ2hhbGxlbmdlLCBjb2RlQ2hhbGxlbmdlTWV0aG9kXSA9IGF3YWl0IGdldENvZGVDaGFsbGVuZ2VBbmRNZXRob2QodGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3Nzb2AsIHtcbiAgICAgICAgICAgICAgICBib2R5OiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sICgncHJvdmlkZXJJZCcgaW4gcGFyYW1zID8geyBwcm92aWRlcl9pZDogcGFyYW1zLnByb3ZpZGVySWQgfSA6IG51bGwpKSwgKCdkb21haW4nIGluIHBhcmFtcyA/IHsgZG9tYWluOiBwYXJhbXMuZG9tYWluIH0gOiBudWxsKSksIHsgcmVkaXJlY3RfdG86IChfYiA9IChfYSA9IHBhcmFtcy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVkaXJlY3RUbykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogdW5kZWZpbmVkIH0pLCAoKChfYyA9IHBhcmFtcyA9PT0gbnVsbCB8fCBwYXJhbXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmFtcy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY2FwdGNoYVRva2VuKVxuICAgICAgICAgICAgICAgICAgICA/IHsgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogcGFyYW1zLm9wdGlvbnMuY2FwdGNoYVRva2VuIH0gfVxuICAgICAgICAgICAgICAgICAgICA6IG51bGwpKSwgeyBza2lwX2h0dHBfcmVkaXJlY3Q6IHRydWUsIGNvZGVfY2hhbGxlbmdlOiBjb2RlQ2hhbGxlbmdlLCBjb2RlX2NoYWxsZW5nZV9tZXRob2Q6IGNvZGVDaGFsbGVuZ2VNZXRob2QgfSksXG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfc3NvUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSByZWF1dGhlbnRpY2F0aW9uIE9UUCB0byB0aGUgdXNlcidzIGVtYWlsIG9yIHBob25lIG51bWJlci5cbiAgICAgKiBSZXF1aXJlcyB0aGUgdXNlciB0byBiZSBzaWduZWQtaW4uXG4gICAgICovXG4gICAgYXN5bmMgcmVhdXRoZW50aWNhdGUoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3JlYXV0aGVudGljYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBfcmVhdXRoZW50aWNhdGUoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiB7IHNlc3Npb24gfSwgZXJyb3I6IHNlc3Npb25FcnJvciwgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBzZXNzaW9uRXJyb3I7XG4gICAgICAgICAgICAgICAgaWYgKCFzZXNzaW9uKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnR0VUJywgYCR7dGhpcy51cmx9L3JlYXV0aGVudGljYXRlYCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGp3dDogc2Vzc2lvbi5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2VuZHMgYW4gZXhpc3Rpbmcgc2lnbnVwIGNvbmZpcm1hdGlvbiBlbWFpbCwgZW1haWwgY2hhbmdlIGVtYWlsLCBTTVMgT1RQIG9yIHBob25lIGNoYW5nZSBPVFAuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZW5kKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBlbmRwb2ludCA9IGAke3RoaXMudXJsfS9yZXNlbmRgO1xuICAgICAgICAgICAgaWYgKCdlbWFpbCcgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVtYWlsLCB0eXBlLCBvcHRpb25zIH0gPSBjcmVkZW50aWFscztcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGVuZHBvaW50LCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZW1haWxSZWRpcmVjdFRvLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoJ3Bob25lJyBpbiBjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGhvbmUsIHR5cGUsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgZW5kcG9pbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsLCBtZXNzYWdlSWQ6IGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS5tZXNzYWdlX2lkIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRDcmVkZW50aWFsc0Vycm9yKCdZb3UgbXVzdCBwcm92aWRlIGVpdGhlciBhbiBlbWFpbCBvciBwaG9uZSBudW1iZXIgYW5kIGEgdHlwZScpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc2Vzc2lvbiwgcmVmcmVzaGluZyBpdCBpZiBuZWNlc3NhcnkuXG4gICAgICpcbiAgICAgKiBUaGUgc2Vzc2lvbiByZXR1cm5lZCBjYW4gYmUgbnVsbCBpZiB0aGUgc2Vzc2lvbiBpcyBub3QgZGV0ZWN0ZWQgd2hpY2ggY2FuIGhhcHBlbiBpbiB0aGUgZXZlbnQgYSB1c2VyIGlzIG5vdCBzaWduZWQtaW4gb3IgaGFzIGxvZ2dlZCBvdXQuXG4gICAgICpcbiAgICAgKiAqKklNUE9SVEFOVDoqKiBUaGlzIG1ldGhvZCBsb2FkcyB2YWx1ZXMgZGlyZWN0bHkgZnJvbSB0aGUgc3RvcmFnZSBhdHRhY2hlZFxuICAgICAqIHRvIHRoZSBjbGllbnQuIElmIHRoYXQgc3RvcmFnZSBpcyBiYXNlZCBvbiByZXF1ZXN0IGNvb2tpZXMgZm9yIGV4YW1wbGUsXG4gICAgICogdGhlIHZhbHVlcyBpbiBpdCBtYXkgbm90IGJlIGF1dGhlbnRpYyBhbmQgdGhlcmVmb3JlIGl0J3Mgc3Ryb25nbHkgYWR2aXNlZFxuICAgICAqIGFnYWluc3QgdXNpbmcgdGhpcyBtZXRob2QgYW5kIGl0cyByZXN1bHRzIGluIHN1Y2ggY2lyY3Vtc3RhbmNlcy4gQSB3YXJuaW5nXG4gICAgICogd2lsbCBiZSBlbWl0dGVkIGlmIHRoaXMgaXMgZGV0ZWN0ZWQuIFVzZSB7QGxpbmsgI2dldFVzZXIoKX0gaW5zdGVhZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRTZXNzaW9uKCkge1xuICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFjcXVpcmVzIGEgZ2xvYmFsIGxvY2sgYmFzZWQgb24gdGhlIHN0b3JhZ2Uga2V5LlxuICAgICAqL1xuICAgIGFzeW5jIF9hY3F1aXJlTG9jayhhY3F1aXJlVGltZW91dCwgZm4pIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfYWNxdWlyZUxvY2snLCAnYmVnaW4nLCBhY3F1aXJlVGltZW91dCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sb2NrQWNxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5wZW5kaW5nSW5Mb2NrLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMucGVuZGluZ0luTG9ja1t0aGlzLnBlbmRpbmdJbkxvY2subGVuZ3RoIC0gMV1cbiAgICAgICAgICAgICAgICAgICAgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBsYXN0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgZm4oKTtcbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0luTG9jay5wdXNoKChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIGp1c3QgY2FyZSBpZiBpdCBmaW5pc2hlZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmxvY2soYGxvY2s6JHt0aGlzLnN0b3JhZ2VLZXl9YCwgYWNxdWlyZVRpbWVvdXQsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19hY3F1aXJlTG9jaycsICdsb2NrIGFjcXVpcmVkIGZvciBzdG9yYWdlIGtleScsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NrQWNxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdJbkxvY2sucHVzaCgoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIGp1c3QgY2FyZSBpZiBpdCBmaW5pc2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSgpKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAvLyBrZWVwIGRyYWluaW5nIHRoZSBxdWV1ZSB1bnRpbCB0aGVyZSdzIG5vdGhpbmcgdG8gd2FpdCBvblxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5wZW5kaW5nSW5Mb2NrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2FpdE9uID0gWy4uLnRoaXMucGVuZGluZ0luTG9ja107XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh3YWl0T24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nSW5Mb2NrLnNwbGljZSgwLCB3YWl0T24ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfYWNxdWlyZUxvY2snLCAnbG9jayByZWxlYXNlZCBmb3Igc3RvcmFnZSBrZXknLCB0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2tBY3F1aXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfYWNxdWlyZUxvY2snLCAnZW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlIGluc3RlYWQgb2Yge0BsaW5rICNnZXRTZXNzaW9ufSBpbnNpZGUgdGhlIGxpYnJhcnkuIEl0IGlzXG4gICAgICogc2VtYW50aWNhbGx5IHVzdWFsbHkgd2hhdCB5b3Ugd2FudCwgYXMgZ2V0dGluZyBhIHNlc3Npb24gaW52b2x2ZXMgc29tZVxuICAgICAqIHByb2Nlc3NpbmcgYWZ0ZXJ3YXJkcyB0aGF0IHJlcXVpcmVzIG9ubHkgb25lIGNsaWVudCBvcGVyYXRpbmcgb24gdGhlXG4gICAgICogc2Vzc2lvbiBhdCBvbmNlIGFjcm9zcyBtdWx0aXBsZSB0YWJzIG9yIHByb2Nlc3Nlcy5cbiAgICAgKi9cbiAgICBhc3luYyBfdXNlU2Vzc2lvbihmbikge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI191c2VTZXNzaW9uJywgJ2JlZ2luJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyB0aGUgdXNlIG9mIF9fbG9hZFNlc3Npb24gaGVyZSBpcyB0aGUgb25seSBjb3JyZWN0IHVzZSBvZiB0aGUgZnVuY3Rpb24hXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLl9fbG9hZFNlc3Npb24oKTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBmbihyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfdXNlU2Vzc2lvbicsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBORVZFUiBVU0UgRElSRUNUTFkhXG4gICAgICpcbiAgICAgKiBBbHdheXMgdXNlIHtAbGluayAjX3VzZVNlc3Npb259LlxuICAgICAqL1xuICAgIGFzeW5jIF9fbG9hZFNlc3Npb24oKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX19sb2FkU2Vzc2lvbigpJywgJ2JlZ2luJyk7XG4gICAgICAgIGlmICghdGhpcy5sb2NrQWNxdWlyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX19sb2FkU2Vzc2lvbigpJywgJ3VzZWQgb3V0c2lkZSBvZiBhbiBhY3F1aXJlZCBsb2NrIScsIG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRTZXNzaW9uID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IG1heWJlU2Vzc2lvbiA9IGF3YWl0IGdldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI2dldFNlc3Npb24oKScsICdzZXNzaW9uIGZyb20gc3RvcmFnZScsIG1heWJlU2Vzc2lvbik7XG4gICAgICAgICAgICBpZiAobWF5YmVTZXNzaW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVmFsaWRTZXNzaW9uKG1heWJlU2Vzc2lvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNlc3Npb24gPSBtYXliZVNlc3Npb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI2dldFNlc3Npb24oKScsICdzZXNzaW9uIGZyb20gc3RvcmFnZSBpcyBub3QgdmFsaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY3VycmVudFNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb246IG51bGwgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEEgc2Vzc2lvbiBpcyBjb25zaWRlcmVkIGV4cGlyZWQgYmVmb3JlIHRoZSBhY2Nlc3MgdG9rZW4gX2FjdHVhbGx5X1xuICAgICAgICAgICAgLy8gZXhwaXJlcy4gV2hlbiB0aGUgYXV0b1JlZnJlc2hUb2tlbiBvcHRpb24gaXMgb2ZmIChvciB3aGVuIHRoZSB0YWIgaXNcbiAgICAgICAgICAgIC8vIGluIHRoZSBiYWNrZ3JvdW5kKSwgdmVyeSBlYWdlciB1c2VycyBvZiBnZXRTZXNzaW9uKCkgLS0gbGlrZVxuICAgICAgICAgICAgLy8gcmVhbHRpbWUtanMgLS0gbWlnaHQgc2VuZCBhIHZhbGlkIEpXVCB3aGljaCB3aWxsIGV4cGlyZSBieSB0aGUgdGltZSBpdFxuICAgICAgICAgICAgLy8gcmVhY2hlcyB0aGUgc2VydmVyLlxuICAgICAgICAgICAgY29uc3QgaGFzRXhwaXJlZCA9IGN1cnJlbnRTZXNzaW9uLmV4cGlyZXNfYXRcbiAgICAgICAgICAgICAgICA/IGN1cnJlbnRTZXNzaW9uLmV4cGlyZXNfYXQgKiAxMDAwIC0gRGF0ZS5ub3coKSA8IEVYUElSWV9NQVJHSU5fTVNcbiAgICAgICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfX2xvYWRTZXNzaW9uKCknLCBgc2Vzc2lvbiBoYXMke2hhc0V4cGlyZWQgPyAnJyA6ICcgbm90J30gZXhwaXJlZGAsICdleHBpcmVzX2F0JywgY3VycmVudFNlc3Npb24uZXhwaXJlc19hdCk7XG4gICAgICAgICAgICBpZiAoIWhhc0V4cGlyZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdG9yYWdlLmlzU2VydmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdXBwcmVzc1dhcm5pbmcgPSB0aGlzLnN1cHByZXNzR2V0U2Vzc2lvbldhcm5pbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5U2Vzc2lvbiA9IG5ldyBQcm94eShjdXJyZW50U2Vzc2lvbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3VwcHJlc3NXYXJuaW5nICYmIHByb3AgPT09ICd1c2VyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IHNob3cgd2FybmluZyB3aGVuIHRoZSB1c2VyIG9iamVjdCBpcyBiZWluZyBhY2Nlc3NlZCBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdVc2luZyB0aGUgdXNlciBvYmplY3QgYXMgcmV0dXJuZWQgZnJvbSBzdXBhYmFzZS5hdXRoLmdldFNlc3Npb24oKSBvciBmcm9tIHNvbWUgc3VwYWJhc2UuYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZSgpIGV2ZW50cyBjb3VsZCBiZSBpbnNlY3VyZSEgVGhpcyB2YWx1ZSBjb21lcyBkaXJlY3RseSBmcm9tIHRoZSBzdG9yYWdlIG1lZGl1bSAodXN1YWxseSBjb29raWVzIG9uIHRoZSBzZXJ2ZXIpIGFuZCBtYXkgbm90IGJlIGF1dGhlbnRpYy4gVXNlIHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpIGluc3RlYWQgd2hpY2ggYXV0aGVudGljYXRlcyB0aGUgZGF0YSBieSBjb250YWN0aW5nIHRoZSBTdXBhYmFzZSBBdXRoIHNlcnZlci4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcHJlc3NXYXJuaW5nID0gdHJ1ZTsgLy8ga2VlcHMgdGhpcyBwcm94eSBpbnN0YW5jZSBmcm9tIGxvZ2dpbmcgYWRkaXRpb25hbCB3YXJuaW5nc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cHByZXNzR2V0U2Vzc2lvbldhcm5pbmcgPSB0cnVlOyAvLyBrZWVwcyB0aGlzIGNsaWVudCdzIGZ1dHVyZSBwcm94eSBpbnN0YW5jZXMgZnJvbSB3YXJuaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2Vzc2lvbiA9IHByb3h5U2Vzc2lvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uOiBjdXJyZW50U2Vzc2lvbiB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBzZXNzaW9uLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5fY2FsbFJlZnJlc2hUb2tlbihjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19fbG9hZFNlc3Npb24oKScsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHVzZXIgZGV0YWlscyBpZiB0aGVyZSBpcyBhbiBleGlzdGluZyBzZXNzaW9uLiBUaGlzIG1ldGhvZFxuICAgICAqIHBlcmZvcm1zIGEgbmV0d29yayByZXF1ZXN0IHRvIHRoZSBTdXBhYmFzZSBBdXRoIHNlcnZlciwgc28gdGhlIHJldHVybmVkXG4gICAgICogdmFsdWUgaXMgYXV0aGVudGljIGFuZCBjYW4gYmUgdXNlZCB0byBiYXNlIGF1dGhvcml6YXRpb24gcnVsZXMgb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gand0IFRha2VzIGluIGFuIG9wdGlvbmFsIGFjY2VzcyB0b2tlbiBKV1QuIElmIG5vIEpXVCBpcyBwcm92aWRlZCwgdGhlIEpXVCBmcm9tIHRoZSBjdXJyZW50IHNlc3Npb24gaXMgdXNlZC5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRVc2VyKGp3dCkge1xuICAgICAgICBpZiAoand0KSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2V0VXNlcihqd3QpO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2V0VXNlcigpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgYXN5bmMgX2dldFVzZXIoand0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoand0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdHRVQnLCBgJHt0aGlzLnVybH0vdXNlcmAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IGp3dCxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF91c2VyUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJucyBhbiBlcnJvciBpZiB0aGVyZSBpcyBubyBhY2Nlc3NfdG9rZW4gb3IgY3VzdG9tIGF1dGhvcml6YXRpb24gaGVhZGVyXG4gICAgICAgICAgICAgICAgaWYgKCEoKF9hID0gZGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWNjZXNzX3Rva2VuKSAmJiAhdGhpcy5oYXNDdXN0b21BdXRob3JpemF0aW9uSGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCB9LCBlcnJvcjogbmV3IEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKCkgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdHRVQnLCBgJHt0aGlzLnVybH0vdXNlcmAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IChfYyA9IChfYiA9IGRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFjY2Vzc190b2tlbikgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3VzZXJSZXNwb25zZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBKV1QgY29udGFpbnMgYSBgc2Vzc2lvbl9pZGAgd2hpY2ggZG9lcyBub3QgY29ycmVzcG9uZCB0byBhbiBhY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgLy8gc2Vzc2lvbiBpbiB0aGUgZGF0YWJhc2UsIGluZGljYXRpbmcgdGhlIHVzZXIgaXMgc2lnbmVkIG91dC5cbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCByZW1vdmVJdGVtQXN5bmModGhpcy5zdG9yYWdlLCBgJHt0aGlzLnN0b3JhZ2VLZXl9LWNvZGUtdmVyaWZpZXJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHVzZXIgZGF0YSBmb3IgYSBsb2dnZWQgaW4gdXNlci5cbiAgICAgKi9cbiAgICBhc3luYyB1cGRhdGVVc2VyKGF0dHJpYnV0ZXMsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91cGRhdGVVc2VyKGF0dHJpYnV0ZXMsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgX3VwZGF0ZVVzZXIoYXR0cmlidXRlcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiBzZXNzaW9uRGF0YSwgZXJyb3I6IHNlc3Npb25FcnJvciB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgc2Vzc2lvbkVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXNlc3Npb25EYXRhLnNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBzZXNzaW9uRGF0YS5zZXNzaW9uO1xuICAgICAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgY29kZUNoYWxsZW5nZU1ldGhvZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdwa2NlJyAmJiBhdHRyaWJ1dGVzLmVtYWlsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICBbY29kZUNoYWxsZW5nZSwgY29kZUNoYWxsZW5nZU1ldGhvZF0gPSBhd2FpdCBnZXRDb2RlQ2hhbGxlbmdlQW5kTWV0aG9kKHRoaXMuc3RvcmFnZSwgdGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvcjogdXNlckVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUFVUJywgYCR7dGhpcy51cmx9L3VzZXJgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmVtYWlsUmVkaXJlY3RUbyxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhdHRyaWJ1dGVzKSwgeyBjb2RlX2NoYWxsZW5nZTogY29kZUNoYWxsZW5nZSwgY29kZV9jaGFsbGVuZ2VfbWV0aG9kOiBjb2RlQ2hhbGxlbmdlTWV0aG9kIH0pLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IHNlc3Npb24uYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3VzZXJSZXNwb25zZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodXNlckVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyB1c2VyRXJyb3I7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi51c2VyID0gZGF0YS51c2VyO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKHNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdVU0VSX1VQREFURUQnLCBzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IHNlc3Npb24udXNlciB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzZXNzaW9uIGRhdGEgZnJvbSB0aGUgY3VycmVudCBzZXNzaW9uLiBJZiB0aGUgY3VycmVudCBzZXNzaW9uIGlzIGV4cGlyZWQsIHNldFNlc3Npb24gd2lsbCB0YWtlIGNhcmUgb2YgcmVmcmVzaGluZyBpdCB0byBvYnRhaW4gYSBuZXcgc2Vzc2lvbi5cbiAgICAgKiBJZiB0aGUgcmVmcmVzaCB0b2tlbiBvciBhY2Nlc3MgdG9rZW4gaW4gdGhlIGN1cnJlbnQgc2Vzc2lvbiBpcyBpbnZhbGlkLCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAgICAgKiBAcGFyYW0gY3VycmVudFNlc3Npb24gVGhlIGN1cnJlbnQgc2Vzc2lvbiB0aGF0IG1pbmltYWxseSBjb250YWlucyBhbiBhY2Nlc3MgdG9rZW4gYW5kIHJlZnJlc2ggdG9rZW4uXG4gICAgICovXG4gICAgYXN5bmMgc2V0U2Vzc2lvbihjdXJyZW50U2Vzc2lvbikge1xuICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9zZXRTZXNzaW9uKGN1cnJlbnRTZXNzaW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIF9zZXRTZXNzaW9uKGN1cnJlbnRTZXNzaW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRTZXNzaW9uLmFjY2Vzc190b2tlbiB8fCAhY3VycmVudFNlc3Npb24ucmVmcmVzaF90b2tlbikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGltZU5vdyA9IERhdGUubm93KCkgLyAxMDAwO1xuICAgICAgICAgICAgbGV0IGV4cGlyZXNBdCA9IHRpbWVOb3c7XG4gICAgICAgICAgICBsZXQgaGFzRXhwaXJlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgc2Vzc2lvbiA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCB7IHBheWxvYWQgfSA9IGRlY29kZUpXVChjdXJyZW50U2Vzc2lvbi5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICAgICAgaWYgKHBheWxvYWQuZXhwKSB7XG4gICAgICAgICAgICAgICAgZXhwaXJlc0F0ID0gcGF5bG9hZC5leHA7XG4gICAgICAgICAgICAgICAgaGFzRXhwaXJlZCA9IGV4cGlyZXNBdCA8PSB0aW1lTm93O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc0V4cGlyZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHNlc3Npb246IHJlZnJlc2hlZFNlc3Npb24sIGVycm9yIH0gPSBhd2FpdCB0aGlzLl9jYWxsUmVmcmVzaFRva2VuKGN1cnJlbnRTZXNzaW9uLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3I6IGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcmVmcmVzaGVkU2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2Vzc2lvbiA9IHJlZnJlc2hlZFNlc3Npb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCB0aGlzLl9nZXRVc2VyKGN1cnJlbnRTZXNzaW9uLmFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXNzaW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW46IGN1cnJlbnRTZXNzaW9uLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogY3VycmVudFNlc3Npb24ucmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZGF0YS51c2VyLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbl90eXBlOiAnYmVhcmVyJyxcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJlc19pbjogZXhwaXJlc0F0IC0gdGltZU5vdyxcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJlc19hdDogZXhwaXJlc0F0LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9JTicsIHNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBzZXNzaW9uLnVzZXIsIHNlc3Npb24gfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb246IG51bGwsIHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgc2Vzc2lvbiwgcmVnYXJkbGVzcyBvZiBleHBpcnkgc3RhdHVzLlxuICAgICAqIFRha2VzIGluIGFuIG9wdGlvbmFsIGN1cnJlbnQgc2Vzc2lvbi4gSWYgbm90IHBhc3NlZCBpbiwgdGhlbiByZWZyZXNoU2Vzc2lvbigpIHdpbGwgYXR0ZW1wdCB0byByZXRyaWV2ZSBpdCBmcm9tIGdldFNlc3Npb24oKS5cbiAgICAgKiBJZiB0aGUgY3VycmVudCBzZXNzaW9uJ3MgcmVmcmVzaCB0b2tlbiBpcyBpbnZhbGlkLCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAgICAgKiBAcGFyYW0gY3VycmVudFNlc3Npb24gVGhlIGN1cnJlbnQgc2Vzc2lvbi4gSWYgcGFzc2VkIGluLCBpdCBtdXN0IGNvbnRhaW4gYSByZWZyZXNoIHRva2VuLlxuICAgICAqL1xuICAgIGFzeW5jIHJlZnJlc2hTZXNzaW9uKGN1cnJlbnRTZXNzaW9uKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3JlZnJlc2hTZXNzaW9uKGN1cnJlbnRTZXNzaW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIF9yZWZyZXNoU2Vzc2lvbihjdXJyZW50U2Vzc2lvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2Vzc2lvbiA9IChfYSA9IGRhdGEuc2Vzc2lvbikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIShjdXJyZW50U2Vzc2lvbiA9PT0gbnVsbCB8fCBjdXJyZW50U2Vzc2lvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VycmVudFNlc3Npb24ucmVmcmVzaF90b2tlbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgc2Vzc2lvbiwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuX2NhbGxSZWZyZXNoVG9rZW4oY3VycmVudFNlc3Npb24ucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFzZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IHNlc3Npb24udXNlciwgc2Vzc2lvbiB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZXNzaW9uIGRhdGEgZnJvbSBhIFVSTCBzdHJpbmdcbiAgICAgKi9cbiAgICBhc3luYyBfZ2V0U2Vzc2lvbkZyb21VUkwocGFyYW1zLCBjYWxsYmFja1VybFR5cGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghaXNCcm93c2VyKCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvcignTm8gYnJvd3NlciBkZXRlY3RlZC4nKTtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYW4gZXJyb3IgaW4gdGhlIFVSTCwgaXQgZG9lc24ndCBtYXR0ZXIgd2hhdCBmbG93IGl0IGlzLCB3ZSBqdXN0IHJldHVybiB0aGUgZXJyb3IuXG4gICAgICAgICAgICBpZiAocGFyYW1zLmVycm9yIHx8IHBhcmFtcy5lcnJvcl9kZXNjcmlwdGlvbiB8fCBwYXJhbXMuZXJyb3JfY29kZSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBlcnJvciBjbGFzcyByZXR1cm5lZCBpbXBsaWVzIHRoYXQgdGhlIHJlZGlyZWN0IGlzIGZyb20gYW4gaW1wbGljaXQgZ3JhbnQgZmxvd1xuICAgICAgICAgICAgICAgIC8vIGJ1dCBpdCBjb3VsZCBhbHNvIGJlIGZyb20gYSByZWRpcmVjdCBlcnJvciBmcm9tIGEgUEtDRSBmbG93LlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IocGFyYW1zLmVycm9yX2Rlc2NyaXB0aW9uIHx8ICdFcnJvciBpbiBVUkwgd2l0aCB1bnNwZWNpZmllZCBlcnJvcl9kZXNjcmlwdGlvbicsIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHBhcmFtcy5lcnJvciB8fCAndW5zcGVjaWZpZWRfZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICBjb2RlOiBwYXJhbXMuZXJyb3JfY29kZSB8fCAndW5zcGVjaWZpZWRfY29kZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDaGVja3MgZm9yIG1pc21hdGNoZXMgYmV0d2VlbiB0aGUgZmxvd1R5cGUgaW5pdGlhbGlzZWQgaW4gdGhlIGNsaWVudCBhbmQgdGhlIFVSTCBwYXJhbWV0ZXJzXG4gICAgICAgICAgICBzd2l0Y2ggKGNhbGxiYWNrVXJsVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2ltcGxpY2l0JzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdwa2NlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhQS0NFR3JhbnRDb2RlRXhjaGFuZ2VFcnJvcignTm90IGEgdmFsaWQgUEtDRSBmbG93IHVybC4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwa2NlJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdpbXBsaWNpdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IoJ05vdCBhIHZhbGlkIGltcGxpY2l0IGdyYW50IGZsb3cgdXJsLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUncyBubyBtaXNtYXRjaCBzbyB3ZSBjb250aW51ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2luY2UgdGhpcyBpcyBhIHJlZGlyZWN0IGZvciBQS0NFLCB3ZSBhdHRlbXB0IHRvIHJldHJpZXZlIHRoZSBjb2RlIGZyb20gdGhlIFVSTCBmb3IgdGhlIGNvZGUgZXhjaGFuZ2VcbiAgICAgICAgICAgIGlmIChjYWxsYmFja1VybFR5cGUgPT09ICdwa2NlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2luaXRpYWxpemUoKScsICdiZWdpbicsICdpcyBQS0NFIGZsb3cnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcmFtcy5jb2RlKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFBLQ0VHcmFudENvZGVFeGNoYW5nZUVycm9yKCdObyBjb2RlIGRldGVjdGVkLicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuX2V4Y2hhbmdlQ29kZUZvclNlc3Npb24ocGFyYW1zLmNvZGUpO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUoJ2NvZGUnKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUod2luZG93Lmhpc3Rvcnkuc3RhdGUsICcnLCB1cmwudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uOiBkYXRhLnNlc3Npb24sIHJlZGlyZWN0VHlwZTogbnVsbCB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBwcm92aWRlcl90b2tlbiwgcHJvdmlkZXJfcmVmcmVzaF90b2tlbiwgYWNjZXNzX3Rva2VuLCByZWZyZXNoX3Rva2VuLCBleHBpcmVzX2luLCBleHBpcmVzX2F0LCB0b2tlbl90eXBlLCB9ID0gcGFyYW1zO1xuICAgICAgICAgICAgaWYgKCFhY2Nlc3NfdG9rZW4gfHwgIWV4cGlyZXNfaW4gfHwgIXJlZnJlc2hfdG9rZW4gfHwgIXRva2VuX3R5cGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yKCdObyBzZXNzaW9uIGRlZmluZWQgaW4gVVJMJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0aW1lTm93ID0gTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgICAgICBjb25zdCBleHBpcmVzSW4gPSBwYXJzZUludChleHBpcmVzX2luKTtcbiAgICAgICAgICAgIGxldCBleHBpcmVzQXQgPSB0aW1lTm93ICsgZXhwaXJlc0luO1xuICAgICAgICAgICAgaWYgKGV4cGlyZXNfYXQpIHtcbiAgICAgICAgICAgICAgICBleHBpcmVzQXQgPSBwYXJzZUludChleHBpcmVzX2F0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbGx5RXhwaXJlc0luID0gZXhwaXJlc0F0IC0gdGltZU5vdztcbiAgICAgICAgICAgIGlmIChhY3R1YWxseUV4cGlyZXNJbiAqIDEwMDAgPD0gQVVUT19SRUZSRVNIX1RJQ0tfRFVSQVRJT05fTVMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEBzdXBhYmFzZS9nb3RydWUtanM6IFNlc3Npb24gYXMgcmV0cmlldmVkIGZyb20gVVJMIGV4cGlyZXMgaW4gJHthY3R1YWxseUV4cGlyZXNJbn1zLCBzaG91bGQgaGF2ZSBiZWVuIGNsb3NlciB0byAke2V4cGlyZXNJbn1zYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpc3N1ZWRBdCA9IGV4cGlyZXNBdCAtIGV4cGlyZXNJbjtcbiAgICAgICAgICAgIGlmICh0aW1lTm93IC0gaXNzdWVkQXQgPj0gMTIwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdAc3VwYWJhc2UvZ290cnVlLWpzOiBTZXNzaW9uIGFzIHJldHJpZXZlZCBmcm9tIFVSTCB3YXMgaXNzdWVkIG92ZXIgMTIwcyBhZ28sIFVSTCBjb3VsZCBiZSBzdGFsZScsIGlzc3VlZEF0LCBleHBpcmVzQXQsIHRpbWVOb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGltZU5vdyAtIGlzc3VlZEF0IDwgMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQHN1cGFiYXNlL2dvdHJ1ZS1qczogU2Vzc2lvbiBhcyByZXRyaWV2ZWQgZnJvbSBVUkwgd2FzIGlzc3VlZCBpbiB0aGUgZnV0dXJlPyBDaGVjayB0aGUgZGV2aWNlIGNsb2NrIGZvciBza2V3JywgaXNzdWVkQXQsIGV4cGlyZXNBdCwgdGltZU5vdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCB0aGlzLl9nZXRVc2VyKGFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0ge1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyX3Rva2VuLFxuICAgICAgICAgICAgICAgIHByb3ZpZGVyX3JlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIGV4cGlyZXNfaW46IGV4cGlyZXNJbixcbiAgICAgICAgICAgICAgICBleHBpcmVzX2F0OiBleHBpcmVzQXQsXG4gICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgICAgICB0b2tlbl90eXBlLFxuICAgICAgICAgICAgICAgIHVzZXI6IGRhdGEudXNlcixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBSZW1vdmUgdG9rZW5zIGZyb20gVVJMXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnO1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfZ2V0U2Vzc2lvbkZyb21VUkwoKScsICdjbGVhcmluZyB3aW5kb3cubG9jYXRpb24uaGFzaCcpO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uLCByZWRpcmVjdFR5cGU6IHBhcmFtcy50eXBlIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uOiBudWxsLCByZWRpcmVjdFR5cGU6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBVUkwgY29udGFpbnMgcGFyYW1ldGVycyBnaXZlbiBieSBhbiBpbXBsaWNpdCBvYXV0aCBncmFudCBmbG93IChodHRwczovL3d3dy5yZmMtZWRpdG9yLm9yZy9yZmMvcmZjNjc0OS5odG1sI3NlY3Rpb24tNC4yKVxuICAgICAqL1xuICAgIF9pc0ltcGxpY2l0R3JhbnRDYWxsYmFjayhwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4ocGFyYW1zLmFjY2Vzc190b2tlbiB8fCBwYXJhbXMuZXJyb3JfZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgVVJMIGFuZCBiYWNraW5nIHN0b3JhZ2UgY29udGFpbiBwYXJhbWV0ZXJzIGdpdmVuIGJ5IGEgUEtDRSBmbG93XG4gICAgICovXG4gICAgYXN5bmMgX2lzUEtDRUNhbGxiYWNrKHBhcmFtcykge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RvcmFnZUNvbnRlbnQgPSBhd2FpdCBnZXRJdGVtQXN5bmModGhpcy5zdG9yYWdlLCBgJHt0aGlzLnN0b3JhZ2VLZXl9LWNvZGUtdmVyaWZpZXJgKTtcbiAgICAgICAgcmV0dXJuICEhKHBhcmFtcy5jb2RlICYmIGN1cnJlbnRTdG9yYWdlQ29udGVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluc2lkZSBhIGJyb3dzZXIgY29udGV4dCwgYHNpZ25PdXQoKWAgd2lsbCByZW1vdmUgdGhlIGxvZ2dlZCBpbiB1c2VyIGZyb20gdGhlIGJyb3dzZXIgc2Vzc2lvbiBhbmQgbG9nIHRoZW0gb3V0IC0gcmVtb3ZpbmcgYWxsIGl0ZW1zIGZyb20gbG9jYWxzdG9yYWdlIGFuZCB0aGVuIHRyaWdnZXIgYSBgXCJTSUdORURfT1VUXCJgIGV2ZW50LlxuICAgICAqXG4gICAgICogRm9yIHNlcnZlci1zaWRlIG1hbmFnZW1lbnQsIHlvdSBjYW4gcmV2b2tlIGFsbCByZWZyZXNoIHRva2VucyBmb3IgYSB1c2VyIGJ5IHBhc3NpbmcgYSB1c2VyJ3MgSldUIHRocm91Z2ggdG8gYGF1dGguYXBpLnNpZ25PdXQoSldUOiBzdHJpbmcpYC5cbiAgICAgKiBUaGVyZSBpcyBubyB3YXkgdG8gcmV2b2tlIGEgdXNlcidzIGFjY2VzcyB0b2tlbiBqd3QgdW50aWwgaXQgZXhwaXJlcy4gSXQgaXMgcmVjb21tZW5kZWQgdG8gc2V0IGEgc2hvcnRlciBleHBpcnkgb24gdGhlIGp3dCBmb3IgdGhpcyByZWFzb24uXG4gICAgICpcbiAgICAgKiBJZiB1c2luZyBgb3RoZXJzYCBzY29wZSwgbm8gYFNJR05FRF9PVVRgIGV2ZW50IGlzIGZpcmVkIVxuICAgICAqL1xuICAgIGFzeW5jIHNpZ25PdXQob3B0aW9ucyA9IHsgc2NvcGU6ICdnbG9iYWwnIH0pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fc2lnbk91dChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIF9zaWduT3V0KHsgc2NvcGUgfSA9IHsgc2NvcGU6ICdnbG9iYWwnIH0pIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvcjogc2Vzc2lvbkVycm9yIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IHNlc3Npb25FcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSAoX2EgPSBkYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICBpZiAoYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCB0aGlzLmFkbWluLnNpZ25PdXQoYWNjZXNzVG9rZW4sIHNjb3BlKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIDQwNHMgc2luY2UgdXNlciBtaWdodCBub3QgZXhpc3QgYW55bW9yZVxuICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgNDAxcyBzaW5jZSBhbiBpbnZhbGlkIG9yIGV4cGlyZWQgSldUIHNob3VsZCBzaWduIG91dCB0aGUgY3VycmVudCBzZXNzaW9uXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGlzQXV0aEFwaUVycm9yKGVycm9yKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yLnN0YXR1cyA9PT0gNDA0IHx8IGVycm9yLnN0YXR1cyA9PT0gNDAxIHx8IGVycm9yLnN0YXR1cyA9PT0gNDAzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2NvcGUgIT09ICdvdGhlcnMnKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHJlbW92ZUl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIGAke3RoaXMuc3RvcmFnZUtleX0tY29kZS12ZXJpZmllcmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlY2VpdmUgYSBub3RpZmljYXRpb24gZXZlcnkgdGltZSBhbiBhdXRoIGV2ZW50IGhhcHBlbnMuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIGFuIGF1dGggZXZlbnQgaGFwcGVucy5cbiAgICAgKi9cbiAgICBvbkF1dGhTdGF0ZUNoYW5nZShjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBpZCA9IHV1aWQoKTtcbiAgICAgICAgY29uc3Qgc3Vic2NyaXB0aW9uID0ge1xuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJyN1bnN1YnNjcmliZSgpJywgJ3N0YXRlIGNoYW5nZSBjYWxsYmFjayB3aXRoIGlkIHJlbW92ZWQnLCBpZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUVtaXR0ZXJzLmRlbGV0ZShpZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI29uQXV0aFN0YXRlQ2hhbmdlKCknLCAncmVnaXN0ZXJlZCBjYWxsYmFjayB3aXRoIGlkJywgaWQpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMuc2V0KGlkLCBzdWJzY3JpcHRpb24pO1xuICAgICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdEluaXRpYWxTZXNzaW9uKGlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuICAgICAgICByZXR1cm4geyBkYXRhOiB7IHN1YnNjcmlwdGlvbiB9IH07XG4gICAgfVxuICAgIGFzeW5jIF9lbWl0SW5pdGlhbFNlc3Npb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiB7IHNlc3Npb24gfSwgZXJyb3IsIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICBhd2FpdCAoKF9hID0gdGhpcy5zdGF0ZUNoYW5nZUVtaXR0ZXJzLmdldChpZCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsYmFjaygnSU5JVElBTF9TRVNTSU9OJywgc2Vzc2lvbikpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCdJTklUSUFMX1NFU1NJT04nLCAnY2FsbGJhY2sgaWQnLCBpZCwgJ3Nlc3Npb24nLCBzZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCAoKF9iID0gdGhpcy5zdGF0ZUNoYW5nZUVtaXR0ZXJzLmdldChpZCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsYmFjaygnSU5JVElBTF9TRVNTSU9OJywgbnVsbCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCdJTklUSUFMX1NFU1NJT04nLCAnY2FsbGJhY2sgaWQnLCBpZCwgJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHBhc3N3b3JkIHJlc2V0IHJlcXVlc3QgdG8gYW4gZW1haWwgYWRkcmVzcy4gVGhpcyBtZXRob2Qgc3VwcG9ydHMgdGhlIFBLQ0UgZmxvdy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbWFpbCBUaGUgZW1haWwgYWRkcmVzcyBvZiB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWRpcmVjdFRvIFRoZSBVUkwgdG8gc2VuZCB0aGUgdXNlciB0byBhZnRlciB0aGV5IGNsaWNrIHRoZSBwYXNzd29yZCByZXNldCBsaW5rLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNhcHRjaGFUb2tlbiBWZXJpZmljYXRpb24gdG9rZW4gcmVjZWl2ZWQgd2hlbiB0aGUgdXNlciBjb21wbGV0ZXMgdGhlIGNhcHRjaGEgb24gdGhlIHNpdGUuXG4gICAgICovXG4gICAgYXN5bmMgcmVzZXRQYXNzd29yZEZvckVtYWlsKGVtYWlsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0IGNvZGVDaGFsbGVuZ2UgPSBudWxsO1xuICAgICAgICBsZXQgY29kZUNoYWxsZW5nZU1ldGhvZCA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmZsb3dUeXBlID09PSAncGtjZScpIHtcbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgIFtjb2RlQ2hhbGxlbmdlLCBjb2RlQ2hhbGxlbmdlTWV0aG9kXSA9IGF3YWl0IGdldENvZGVDaGFsbGVuZ2VBbmRNZXRob2QodGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXksIHRydWUgLy8gaXNQYXNzd29yZFJlY292ZXJ5XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vcmVjb3ZlcmAsIHtcbiAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBjb2RlX2NoYWxsZW5nZTogY29kZUNoYWxsZW5nZSxcbiAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2VfbWV0aG9kOiBjb2RlQ2hhbGxlbmdlTWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMucmVkaXJlY3RUbyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIGFsbCB0aGUgaWRlbnRpdGllcyBsaW5rZWQgdG8gYSB1c2VyLlxuICAgICAqL1xuICAgIGFzeW5jIGdldFVzZXJJZGVudGl0aWVzKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCB0aGlzLmdldFVzZXIoKTtcbiAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgaWRlbnRpdGllczogKF9hID0gZGF0YS51c2VyLmlkZW50aXRpZXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpbmtzIGFuIG9hdXRoIGlkZW50aXR5IHRvIGFuIGV4aXN0aW5nIHVzZXIuXG4gICAgICogVGhpcyBtZXRob2Qgc3VwcG9ydHMgdGhlIFBLQ0UgZmxvdy5cbiAgICAgKi9cbiAgICBhc3luYyBsaW5rSWRlbnRpdHkoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBhd2FpdCB0aGlzLl9nZXRVcmxGb3JQcm92aWRlcihgJHt0aGlzLnVybH0vdXNlci9pZGVudGl0aWVzL2F1dGhvcml6ZWAsIGNyZWRlbnRpYWxzLnByb3ZpZGVyLCB7XG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IChfYSA9IGNyZWRlbnRpYWxzLm9wdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZWRpcmVjdFRvLFxuICAgICAgICAgICAgICAgICAgICBzY29wZXM6IChfYiA9IGNyZWRlbnRpYWxzLm9wdGlvbnMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zY29wZXMsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiAoX2MgPSBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucXVlcnlQYXJhbXMsXG4gICAgICAgICAgICAgICAgICAgIHNraXBCcm93c2VyUmVkaXJlY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdHRVQnLCB1cmwsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IChfZSA9IChfZCA9IGRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmFjY2Vzc190b2tlbikgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICBpZiAoaXNCcm93c2VyKCkgJiYgISgoX2EgPSBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2tpcEJyb3dzZXJSZWRpcmVjdCkpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS51cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBwcm92aWRlcjogY3JlZGVudGlhbHMucHJvdmlkZXIsIHVybDogZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLnVybCB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgcHJvdmlkZXI6IGNyZWRlbnRpYWxzLnByb3ZpZGVyLCB1cmw6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVubGlua3MgYW4gaWRlbnRpdHkgZnJvbSBhIHVzZXIgYnkgZGVsZXRpbmcgaXQuIFRoZSB1c2VyIHdpbGwgbm8gbG9uZ2VyIGJlIGFibGUgdG8gc2lnbiBpbiB3aXRoIHRoYXQgaWRlbnRpdHkgb25jZSBpdCdzIHVubGlua2VkLlxuICAgICAqL1xuICAgIGFzeW5jIHVubGlua0lkZW50aXR5KGlkZW50aXR5KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0RFTEVURScsIGAke3RoaXMudXJsfS91c2VyL2lkZW50aXRpZXMvJHtpZGVudGl0eS5pZGVudGl0eV9pZH1gLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgand0OiAoX2IgPSAoX2EgPSBkYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW4pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBuZXcgSldULlxuICAgICAqIEBwYXJhbSByZWZyZXNoVG9rZW4gQSB2YWxpZCByZWZyZXNoIHRva2VuIHRoYXQgd2FzIHJldHVybmVkIG9uIGxvZ2luLlxuICAgICAqL1xuICAgIGFzeW5jIF9yZWZyZXNoQWNjZXNzVG9rZW4ocmVmcmVzaFRva2VuKSB7XG4gICAgICAgIGNvbnN0IGRlYnVnTmFtZSA9IGAjX3JlZnJlc2hBY2Nlc3NUb2tlbigke3JlZnJlc2hUb2tlbi5zdWJzdHJpbmcoMCwgNSl9Li4uKWA7XG4gICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2JlZ2luJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydGVkQXQgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgLy8gd2lsbCBhdHRlbXB0IHRvIHJlZnJlc2ggdGhlIHRva2VuIHdpdGggZXhwb25lbnRpYWwgYmFja29mZlxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJldHJ5YWJsZShhc3luYyAoYXR0ZW1wdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhdHRlbXB0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzbGVlcCgyMDAgKiBNYXRoLnBvdygyLCBhdHRlbXB0IC0gMSkpOyAvLyAyMDAsIDQwMCwgODAwLCAuLi5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAncmVmcmVzaGluZyBhdHRlbXB0JywgYXR0ZW1wdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3Rva2VuP2dyYW50X3R5cGU9cmVmcmVzaF90b2tlbmAsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogeyByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIChhdHRlbXB0LCBlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRCYWNrT2ZmSW50ZXJ2YWwgPSAyMDAgKiBNYXRoLnBvdygyLCBhdHRlbXB0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGVycm9yICYmXG4gICAgICAgICAgICAgICAgICAgIGlzQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IoZXJyb3IpICYmXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHJ5YWJsZSBvbmx5IGlmIHRoZSByZXF1ZXN0IGNhbiBiZSBzZW50IGJlZm9yZSB0aGUgYmFja29mZiBvdmVyZmxvd3MgdGhlIHRpY2sgZHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgRGF0ZS5ub3coKSArIG5leHRCYWNrT2ZmSW50ZXJ2YWwgLSBzdGFydGVkQXQgPCBBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTl9NUyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbjogbnVsbCwgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfaXNWYWxpZFNlc3Npb24obWF5YmVTZXNzaW9uKSB7XG4gICAgICAgIGNvbnN0IGlzVmFsaWRTZXNzaW9uID0gdHlwZW9mIG1heWJlU2Vzc2lvbiA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIG1heWJlU2Vzc2lvbiAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgJ2FjY2Vzc190b2tlbicgaW4gbWF5YmVTZXNzaW9uICYmXG4gICAgICAgICAgICAncmVmcmVzaF90b2tlbicgaW4gbWF5YmVTZXNzaW9uICYmXG4gICAgICAgICAgICAnZXhwaXJlc19hdCcgaW4gbWF5YmVTZXNzaW9uO1xuICAgICAgICByZXR1cm4gaXNWYWxpZFNlc3Npb247XG4gICAgfVxuICAgIGFzeW5jIF9oYW5kbGVQcm92aWRlclNpZ25Jbihwcm92aWRlciwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB1cmwgPSBhd2FpdCB0aGlzLl9nZXRVcmxGb3JQcm92aWRlcihgJHt0aGlzLnVybH0vYXV0aG9yaXplYCwgcHJvdmlkZXIsIHtcbiAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMucmVkaXJlY3RUbyxcbiAgICAgICAgICAgIHNjb3Blczogb3B0aW9ucy5zY29wZXMsXG4gICAgICAgICAgICBxdWVyeVBhcmFtczogb3B0aW9ucy5xdWVyeVBhcmFtcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX2hhbmRsZVByb3ZpZGVyU2lnbkluKCknLCAncHJvdmlkZXInLCBwcm92aWRlciwgJ29wdGlvbnMnLCBvcHRpb25zLCAndXJsJywgdXJsKTtcbiAgICAgICAgLy8gdHJ5IHRvIG9wZW4gb24gdGhlIGJyb3dzZXJcbiAgICAgICAgaWYgKGlzQnJvd3NlcigpICYmICFvcHRpb25zLnNraXBCcm93c2VyUmVkaXJlY3QpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24odXJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkYXRhOiB7IHByb3ZpZGVyLCB1cmwgfSwgZXJyb3I6IG51bGwgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVjb3ZlcnMgdGhlIHNlc3Npb24gZnJvbSBMb2NhbFN0b3JhZ2UgYW5kIHJlZnJlc2hlcyB0aGUgdG9rZW5cbiAgICAgKiBOb3RlOiB0aGlzIG1ldGhvZCBpcyBhc3luYyB0byBhY2NvbW1vZGF0ZSBmb3IgQXN5bmNTdG9yYWdlIGUuZy4gaW4gUmVhY3QgbmF0aXZlLlxuICAgICAqL1xuICAgIGFzeW5jIF9yZWNvdmVyQW5kUmVmcmVzaCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBkZWJ1Z05hbWUgPSAnI19yZWNvdmVyQW5kUmVmcmVzaCgpJztcbiAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnYmVnaW4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTZXNzaW9uID0gYXdhaXQgZ2V0SXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgdGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ3Nlc3Npb24gZnJvbSBzdG9yYWdlJywgY3VycmVudFNlc3Npb24pO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1ZhbGlkU2Vzc2lvbihjdXJyZW50U2Vzc2lvbikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdzZXNzaW9uIGlzIG5vdCB2YWxpZCcpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U2Vzc2lvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGV4cGlyZXNXaXRoTWFyZ2luID0gKChfYSA9IGN1cnJlbnRTZXNzaW9uLmV4cGlyZXNfYXQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IEluZmluaXR5KSAqIDEwMDAgLSBEYXRlLm5vdygpIDwgRVhQSVJZX01BUkdJTl9NUztcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgYHNlc3Npb24gaGFzJHtleHBpcmVzV2l0aE1hcmdpbiA/ICcnIDogJyBub3QnfSBleHBpcmVkIHdpdGggbWFyZ2luIG9mICR7RVhQSVJZX01BUkdJTl9NU31zYCk7XG4gICAgICAgICAgICBpZiAoZXhwaXJlc1dpdGhNYXJnaW4pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaFRva2VuICYmIGN1cnJlbnRTZXNzaW9uLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgdGhpcy5fY2FsbFJlZnJlc2hUb2tlbihjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdyZWZyZXNoIGZhaWxlZCB3aXRoIGEgbm9uLXJldHJ5YWJsZSBlcnJvciwgcmVtb3ZpbmcgdGhlIHNlc3Npb24nLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gbmVlZCB0byBwZXJzaXN0IGN1cnJlbnRTZXNzaW9uIGFnYWluLCBhcyB3ZSBqdXN0IGxvYWRlZCBpdCBmcm9tXG4gICAgICAgICAgICAgICAgLy8gbG9jYWwgc3RvcmFnZTsgcGVyc2lzdGluZyBpdCBhZ2FpbiBtYXkgb3ZlcndyaXRlIGEgdmFsdWUgc2F2ZWQgYnlcbiAgICAgICAgICAgICAgICAvLyBhbm90aGVyIGNsaWVudCB3aXRoIGFjY2VzcyB0byB0aGUgc2FtZSBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9JTicsIGN1cnJlbnRTZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdlcnJvcicsIGVycik7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBfY2FsbFJlZnJlc2hUb2tlbihyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKCFyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlZnJlc2hpbmcgaXMgYWxyZWFkeSBpbiBwcm9ncmVzc1xuICAgICAgICBpZiAodGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlYnVnTmFtZSA9IGAjX2NhbGxSZWZyZXNoVG9rZW4oJHtyZWZyZXNoVG9rZW4uc3Vic3RyaW5nKDAsIDUpfS4uLilgO1xuICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdiZWdpbicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuX3JlZnJlc2hBY2Nlc3NUb2tlbihyZWZyZXNoVG9rZW4pO1xuICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgaWYgKCFkYXRhLnNlc3Npb24pXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1RPS0VOX1JFRlJFU0hFRCcsIGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IHNlc3Npb246IGRhdGEuc2Vzc2lvbiwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaGluZ0RlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7IHNlc3Npb246IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgaWYgKCFpc0F1dGhSZXRyeWFibGVGZXRjaEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIChfYSA9IHRoaXMucmVmcmVzaGluZ0RlZmVycmVkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoX2IgPSB0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaGluZ0RlZmVycmVkID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2VuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIF9ub3RpZnlBbGxTdWJzY3JpYmVycyhldmVudCwgc2Vzc2lvbiwgYnJvYWRjYXN0ID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBkZWJ1Z05hbWUgPSBgI19ub3RpZnlBbGxTdWJzY3JpYmVycygke2V2ZW50fSlgO1xuICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdiZWdpbicsIHNlc3Npb24sIGBicm9hZGNhc3QgPSAke2Jyb2FkY2FzdH1gKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJyb2FkY2FzdENoYW5uZWwgJiYgYnJvYWRjYXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5icm9hZGNhc3RDaGFubmVsLnBvc3RNZXNzYWdlKHsgZXZlbnQsIHNlc3Npb24gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2VzID0gQXJyYXkuZnJvbSh0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMudmFsdWVzKCkpLm1hcChhc3luYyAoeCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHguY2FsbGJhY2soZXZlbnQsIHNlc3Npb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXJyb3JzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3JzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnZW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogc2V0IGN1cnJlbnRTZXNzaW9uIGFuZCBjdXJyZW50VXNlclxuICAgICAqIHByb2Nlc3MgdG8gX3N0YXJ0QXV0b1JlZnJlc2hUb2tlbiBpZiBwb3NzaWJsZVxuICAgICAqL1xuICAgIGFzeW5jIF9zYXZlU2Vzc2lvbihzZXNzaW9uKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX3NhdmVTZXNzaW9uKCknLCBzZXNzaW9uKTtcbiAgICAgICAgLy8gX3NhdmVTZXNzaW9uIGlzIGFsd2F5cyBjYWxsZWQgd2hlbmV2ZXIgYSBuZXcgc2Vzc2lvbiBoYXMgYmVlbiBhY3F1aXJlZFxuICAgICAgICAvLyBzbyB3ZSBjYW4gc2FmZWx5IHN1cHByZXNzIHRoZSB3YXJuaW5nIHJldHVybmVkIGJ5IGZ1dHVyZSBnZXRTZXNzaW9uIGNhbGxzXG4gICAgICAgIHRoaXMuc3VwcHJlc3NHZXRTZXNzaW9uV2FybmluZyA9IHRydWU7XG4gICAgICAgIGF3YWl0IHNldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSwgc2Vzc2lvbik7XG4gICAgfVxuICAgIGFzeW5jIF9yZW1vdmVTZXNzaW9uKCkge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI19yZW1vdmVTZXNzaW9uKCknKTtcbiAgICAgICAgYXdhaXQgcmVtb3ZlSXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgdGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9PVVQnLCBudWxsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbnkgcmVnaXN0ZXJlZCB2aXNpYmlsaXR5Y2hhbmdlIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICoge0BzZWUgI3N0YXJ0QXV0b1JlZnJlc2h9XG4gICAgICoge0BzZWUgI3N0b3BBdXRvUmVmcmVzaH1cbiAgICAgKi9cbiAgICBfcmVtb3ZlVmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfcmVtb3ZlVmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjaygpJyk7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2sgPSBudWxsO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIGlzQnJvd3NlcigpICYmICh3aW5kb3cgPT09IG51bGwgfHwgd2luZG93ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncmVtb3ZpbmcgdmlzaWJpbGl0eWNoYW5nZSBjYWxsYmFjayBmYWlsZWQnLCBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBwcml2YXRlIGltcGxlbWVudGF0aW9uIG9mIHtAbGluayAjc3RhcnRBdXRvUmVmcmVzaH0uIFVzZSB0aGlzXG4gICAgICogd2l0aGluIHRoZSBsaWJyYXJ5LlxuICAgICAqL1xuICAgIGFzeW5jIF9zdGFydEF1dG9SZWZyZXNoKCkge1xuICAgICAgICBhd2FpdCB0aGlzLl9zdG9wQXV0b1JlZnJlc2goKTtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfc3RhcnRBdXRvUmVmcmVzaCgpJyk7XG4gICAgICAgIGNvbnN0IHRpY2tlciA9IHNldEludGVydmFsKCgpID0+IHRoaXMuX2F1dG9SZWZyZXNoVG9rZW5UaWNrKCksIEFVVE9fUkVGUkVTSF9USUNLX0RVUkFUSU9OX01TKTtcbiAgICAgICAgdGhpcy5hdXRvUmVmcmVzaFRpY2tlciA9IHRpY2tlcjtcbiAgICAgICAgaWYgKHRpY2tlciAmJiB0eXBlb2YgdGlja2VyID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGlja2VyLnVucmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyB0aWNrZXIgaXMgYSBOb2RlSlMgVGltZW91dCBvYmplY3QgdGhhdCBoYXMgYW4gYHVucmVmYCBtZXRob2RcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvdGltZXJzLmh0bWwjdGltZW91dHVucmVmXG4gICAgICAgICAgICAvLyBXaGVuIGF1dG8gcmVmcmVzaCBpcyB1c2VkIGluIE5vZGVKUyAobGlrZSBmb3IgdGVzdGluZykgdGhlXG4gICAgICAgICAgICAvLyBgc2V0SW50ZXJ2YWxgIGlzIHByZXZlbnRpbmcgdGhlIHByb2Nlc3MgZnJvbSBiZWluZyBtYXJrZWQgYXNcbiAgICAgICAgICAgIC8vIGZpbmlzaGVkIGFuZCB0ZXN0cyBydW4gZW5kbGVzc2x5LiBUaGlzIGNhbiBiZSBwcmV2ZW50ZWQgYnkgY2FsbGluZ1xuICAgICAgICAgICAgLy8gYHVucmVmKClgIG9uIHRoZSByZXR1cm5lZCBvYmplY3QuXG4gICAgICAgICAgICB0aWNrZXIudW5yZWYoKTtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgaGFzIG5vIGNvbnRleHQgb2YgRGVub1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBEZW5vICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgRGVuby51bnJlZlRpbWVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBzaW1pbGFyIGxpa2UgZm9yIE5vZGVKUywgYnV0IHdpdGggdGhlIERlbm8gQVBJXG4gICAgICAgICAgICAvLyBodHRwczovL2Rlbm8ubGFuZC9hcGlAbGF0ZXN0P3Vuc3RhYmxlJnM9RGVuby51bnJlZlRpbWVyXG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFRTIGhhcyBubyBjb250ZXh0IG9mIERlbm9cbiAgICAgICAgICAgIERlbm8udW5yZWZUaW1lcih0aWNrZXIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJ1biB0aGUgdGljayBpbW1lZGlhdGVseSwgYnV0IGluIHRoZSBuZXh0IHBhc3Mgb2YgdGhlIGV2ZW50IGxvb3Agc28gdGhhdFxuICAgICAgICAvLyAjX2luaXRpYWxpemUgY2FuIGJlIGFsbG93ZWQgdG8gY29tcGxldGUgd2l0aG91dCByZWN1cnNpdmVseSB3YWl0aW5nIG9uXG4gICAgICAgIC8vIGl0c2VsZlxuICAgICAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9hdXRvUmVmcmVzaFRva2VuVGljaygpO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgcHJpdmF0ZSBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgI3N0b3BBdXRvUmVmcmVzaH0uIFVzZSB0aGlzXG4gICAgICogd2l0aGluIHRoZSBsaWJyYXJ5LlxuICAgICAqL1xuICAgIGFzeW5jIF9zdG9wQXV0b1JlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX3N0b3BBdXRvUmVmcmVzaCgpJyk7XG4gICAgICAgIGNvbnN0IHRpY2tlciA9IHRoaXMuYXV0b1JlZnJlc2hUaWNrZXI7XG4gICAgICAgIHRoaXMuYXV0b1JlZnJlc2hUaWNrZXIgPSBudWxsO1xuICAgICAgICBpZiAodGlja2VyKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpY2tlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIGFuIGF1dG8tcmVmcmVzaCBwcm9jZXNzIGluIHRoZSBiYWNrZ3JvdW5kLiBUaGUgc2Vzc2lvbiBpcyBjaGVja2VkXG4gICAgICogZXZlcnkgZmV3IHNlY29uZHMuIENsb3NlIHRvIHRoZSB0aW1lIG9mIGV4cGlyYXRpb24gYSBwcm9jZXNzIGlzIHN0YXJ0ZWQgdG9cbiAgICAgKiByZWZyZXNoIHRoZSBzZXNzaW9uLiBJZiByZWZyZXNoaW5nIGZhaWxzIGl0IHdpbGwgYmUgcmV0cmllZCBmb3IgYXMgbG9uZyBhc1xuICAgICAqIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIElmIHlvdSBzZXQgdGhlIHtAbGluayBHb1RydWVDbGllbnRPcHRpb25zI2F1dG9SZWZyZXNoVG9rZW59IHlvdSBkb24ndCBuZWVkXG4gICAgICogdG8gY2FsbCB0aGlzIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCBmb3IgeW91LlxuICAgICAqXG4gICAgICogT24gYnJvd3NlcnMgdGhlIHJlZnJlc2ggcHJvY2VzcyB3b3JrcyBvbmx5IHdoZW4gdGhlIHRhYi93aW5kb3cgaXMgaW4gdGhlXG4gICAgICogZm9yZWdyb3VuZCB0byBjb25zZXJ2ZSByZXNvdXJjZXMgYXMgd2VsbCBhcyBwcmV2ZW50IHJhY2UgY29uZGl0aW9ucyBhbmRcbiAgICAgKiBmbG9vZGluZyBhdXRoIHdpdGggcmVxdWVzdHMuIElmIHlvdSBjYWxsIHRoaXMgbWV0aG9kIGFueSBtYW5hZ2VkXG4gICAgICogdmlzaWJpbGl0eSBjaGFuZ2UgY2FsbGJhY2sgd2lsbCBiZSByZW1vdmVkIGFuZCB5b3UgbXVzdCBtYW5hZ2UgdmlzaWJpbGl0eVxuICAgICAqIGNoYW5nZXMgb24geW91ciBvd24uXG4gICAgICpcbiAgICAgKiBPbiBub24tYnJvd3NlciBwbGF0Zm9ybXMgdGhlIHJlZnJlc2ggcHJvY2VzcyB3b3JrcyAqY29udGludW91c2x5KiBpbiB0aGVcbiAgICAgKiBiYWNrZ3JvdW5kLCB3aGljaCBtYXkgbm90IGJlIGRlc2lyYWJsZS4gWW91IHNob3VsZCBob29rIGludG8geW91clxuICAgICAqIHBsYXRmb3JtJ3MgZm9yZWdyb3VuZCBpbmRpY2F0aW9uIG1lY2hhbmlzbSBhbmQgY2FsbCB0aGVzZSBtZXRob2RzXG4gICAgICogYXBwcm9wcmlhdGVseSB0byBjb25zZXJ2ZSByZXNvdXJjZXMuXG4gICAgICpcbiAgICAgKiB7QHNlZSAjc3RvcEF1dG9SZWZyZXNofVxuICAgICAqL1xuICAgIGFzeW5jIHN0YXJ0QXV0b1JlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZVZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2soKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fc3RhcnRBdXRvUmVmcmVzaCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhbiBhY3RpdmUgYXV0byByZWZyZXNoIHByb2Nlc3MgcnVubmluZyBpbiB0aGUgYmFja2dyb3VuZCAoaWYgYW55KS5cbiAgICAgKlxuICAgICAqIElmIHlvdSBjYWxsIHRoaXMgbWV0aG9kIGFueSBtYW5hZ2VkIHZpc2liaWxpdHkgY2hhbmdlIGNhbGxiYWNrIHdpbGwgYmVcbiAgICAgKiByZW1vdmVkIGFuZCB5b3UgbXVzdCBtYW5hZ2UgdmlzaWJpbGl0eSBjaGFuZ2VzIG9uIHlvdXIgb3duLlxuICAgICAqXG4gICAgICogU2VlIHtAbGluayAjc3RhcnRBdXRvUmVmcmVzaH0gZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgKi9cbiAgICBhc3luYyBzdG9wQXV0b1JlZnJlc2goKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZVZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2soKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fc3RvcEF1dG9SZWZyZXNoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJ1bnMgdGhlIGF1dG8gcmVmcmVzaCB0b2tlbiB0aWNrLlxuICAgICAqL1xuICAgIGFzeW5jIF9hdXRvUmVmcmVzaFRva2VuVGljaygpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfYXV0b1JlZnJlc2hUb2tlblRpY2soKScsICdiZWdpbicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soMCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiB7IHNlc3Npb24gfSwgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlc3Npb24gfHwgIXNlc3Npb24ucmVmcmVzaF90b2tlbiB8fCAhc2Vzc2lvbi5leHBpcmVzX2F0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2F1dG9SZWZyZXNoVG9rZW5UaWNrKCknLCAnbm8gc2Vzc2lvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlc3Npb24gd2lsbCBleHBpcmUgaW4gdGhpcyBtYW55IHRpY2tzIChvciBoYXMgYWxyZWFkeSBleHBpcmVkIGlmIDw9IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwaXJlc0luVGlja3MgPSBNYXRoLmZsb29yKChzZXNzaW9uLmV4cGlyZXNfYXQgKiAxMDAwIC0gbm93KSAvIEFVVE9fUkVGUkVTSF9USUNLX0RVUkFUSU9OX01TKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19hdXRvUmVmcmVzaFRva2VuVGljaygpJywgYGFjY2VzcyB0b2tlbiBleHBpcmVzIGluICR7ZXhwaXJlc0luVGlja3N9IHRpY2tzLCBhIHRpY2sgbGFzdHMgJHtBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTl9NU31tcywgcmVmcmVzaCB0aHJlc2hvbGQgaXMgJHtBVVRPX1JFRlJFU0hfVElDS19USFJFU0hPTER9IHRpY2tzYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4cGlyZXNJblRpY2tzIDw9IEFVVE9fUkVGUkVTSF9USUNLX1RIUkVTSE9MRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9jYWxsUmVmcmVzaFRva2VuKHNlc3Npb24ucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0F1dG8gcmVmcmVzaCB0aWNrIGZhaWxlZCB3aXRoIGVycm9yLiBUaGlzIGlzIGxpa2VseSBhIHRyYW5zaWVudCBlcnJvci4nLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfYXV0b1JlZnJlc2hUb2tlblRpY2soKScsICdlbmQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGUuaXNBY3F1aXJlVGltZW91dCB8fCBlIGluc3RhbmNlb2YgTG9ja0FjcXVpcmVUaW1lb3V0RXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnYXV0byByZWZyZXNoIHRva2VuIHRpY2sgbG9jayBub3QgYXZhaWxhYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBjYWxsYmFja3Mgb24gdGhlIGJyb3dzZXIgLyBwbGF0Zm9ybSwgd2hpY2ggaW4tdHVybiBydW5cbiAgICAgKiBhbGdvcml0aG1zIHdoZW4gdGhlIGJyb3dzZXIgd2luZG93L3RhYiBhcmUgaW4gZm9yZWdyb3VuZC4gT24gbm9uLWJyb3dzZXJcbiAgICAgKiBwbGF0Zm9ybXMgaXQgYXNzdW1lcyBhbHdheXMgZm9yZWdyb3VuZC5cbiAgICAgKi9cbiAgICBhc3luYyBfaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSgpJyk7XG4gICAgICAgIGlmICghaXNCcm93c2VyKCkgfHwgISh3aW5kb3cgPT09IG51bGwgfHwgd2luZG93ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9SZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAvLyBpbiBub24tYnJvd3NlciBlbnZpcm9ubWVudHMgdGhlIHJlZnJlc2ggdG9rZW4gdGlja2VyIHJ1bnMgYWx3YXlzXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEF1dG9SZWZyZXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjayA9IGFzeW5jICgpID0+IGF3YWl0IHRoaXMuX29uVmlzaWJpbGl0eUNoYW5nZWQoZmFsc2UpO1xuICAgICAgICAgICAgd2luZG93ID09PSBudWxsIHx8IHdpbmRvdyA9PT0gdm9pZCAwID8gdm9pZCAwIDogd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCB0aGlzLnZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2spO1xuICAgICAgICAgICAgLy8gbm93IGltbWVkaWF0ZWx5IGNhbGwgdGhlIHZpc2JpbGl0eSBjaGFuZ2VkIGNhbGxiYWNrIHRvIHNldHVwIHdpdGggdGhlXG4gICAgICAgICAgICAvLyBjdXJyZW50IHZpc2JpbGl0eSBzdGF0ZVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fb25WaXNpYmlsaXR5Q2hhbmdlZCh0cnVlKTsgLy8gaW5pdGlhbCBjYWxsXG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdfaGFuZGxlVmlzaWJpbGl0eUNoYW5nZScsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayByZWdpc3RlcmVkIHdpdGggYHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJylgLlxuICAgICAqL1xuICAgIGFzeW5jIF9vblZpc2liaWxpdHlDaGFuZ2VkKGNhbGxlZEZyb21Jbml0aWFsaXplKSB7XG4gICAgICAgIGNvbnN0IG1ldGhvZE5hbWUgPSBgI19vblZpc2liaWxpdHlDaGFuZ2VkKCR7Y2FsbGVkRnJvbUluaXRpYWxpemV9KWA7XG4gICAgICAgIHRoaXMuX2RlYnVnKG1ldGhvZE5hbWUsICd2aXNpYmlsaXR5U3RhdGUnLCBkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUpO1xuICAgICAgICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9SZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAvLyBpbiBicm93c2VyIGVudmlyb25tZW50cyB0aGUgcmVmcmVzaCB0b2tlbiB0aWNrZXIgcnVucyBvbmx5IG9uIGZvY3VzZWQgdGFic1xuICAgICAgICAgICAgICAgIC8vIHdoaWNoIHByZXZlbnRzIHJhY2UgY29uZGl0aW9uc1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0QXV0b1JlZnJlc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY2FsbGVkRnJvbUluaXRpYWxpemUpIHtcbiAgICAgICAgICAgICAgICAvLyBjYWxsZWQgd2hlbiB0aGUgdmlzaWJpbGl0eSBoYXMgY2hhbmdlZCwgaS5lLiB0aGUgYnJvd3NlclxuICAgICAgICAgICAgICAgIC8vIHRyYW5zaXRpb25lZCBmcm9tIGhpZGRlbiAtPiB2aXNpYmxlIHNvIHdlIG5lZWQgdG8gc2VlIGlmIHRoZSBzZXNzaW9uXG4gICAgICAgICAgICAgICAgLy8gc2hvdWxkIGJlIHJlY292ZXJlZCBpbW1lZGlhdGVseS4uLiBidXQgdG8gZG8gdGhhdCB3ZSBuZWVkIHRvIGFjcXVpcmVcbiAgICAgICAgICAgICAgICAvLyB0aGUgbG9jayBmaXJzdCBhc3luY2hyb25vdXNseVxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSAhPT0gJ3Zpc2libGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhtZXRob2ROYW1lLCAnYWNxdWlyZWQgdGhlIGxvY2sgdG8gcmVjb3ZlciB0aGUgc2Vzc2lvbiwgYnV0IHRoZSBicm93c2VyIHZpc2liaWxpdHlTdGF0ZSBpcyBubyBsb25nZXIgdmlzaWJsZSwgYWJvcnRpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZpc2liaWxpdHkgaGFzIGNoYW5nZWQgd2hpbGUgd2FpdGluZyBmb3IgdGhlIGxvY2ssIGFib3J0XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjb3ZlciB0aGUgc2Vzc2lvblxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZWNvdmVyQW5kUmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9SZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdG9wQXV0b1JlZnJlc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgdGhlIHJlbGV2YW50IGxvZ2luIFVSTCBmb3IgYSB0aGlyZC1wYXJ0eSBwcm92aWRlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWRpcmVjdFRvIEEgVVJMIG9yIG1vYmlsZSBhZGRyZXNzIHRvIHNlbmQgdGhlIHVzZXIgdG8gYWZ0ZXIgdGhleSBhcmUgY29uZmlybWVkLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnNjb3BlcyBBIHNwYWNlLXNlcGFyYXRlZCBsaXN0IG9mIHNjb3BlcyBncmFudGVkIHRvIHRoZSBPQXV0aCBhcHBsaWNhdGlvbi5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5xdWVyeVBhcmFtcyBBbiBvYmplY3Qgb2Yga2V5LXZhbHVlIHBhaXJzIGNvbnRhaW5pbmcgcXVlcnkgcGFyYW1ldGVycyBncmFudGVkIHRvIHRoZSBPQXV0aCBhcHBsaWNhdGlvbi5cbiAgICAgKi9cbiAgICBhc3luYyBfZ2V0VXJsRm9yUHJvdmlkZXIodXJsLCBwcm92aWRlciwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBbYHByb3ZpZGVyPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHByb3ZpZGVyKX1gXTtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5yZWRpcmVjdFRvKSB7XG4gICAgICAgICAgICB1cmxQYXJhbXMucHVzaChgcmVkaXJlY3RfdG89JHtlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5yZWRpcmVjdFRvKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNjb3Blcykge1xuICAgICAgICAgICAgdXJsUGFyYW1zLnB1c2goYHNjb3Blcz0ke2VuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLnNjb3Blcyl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdwa2NlJykge1xuICAgICAgICAgICAgY29uc3QgW2NvZGVDaGFsbGVuZ2UsIGNvZGVDaGFsbGVuZ2VNZXRob2RdID0gYXdhaXQgZ2V0Q29kZUNoYWxsZW5nZUFuZE1ldGhvZCh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICBjb25zdCBmbG93UGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2U6IGAke2VuY29kZVVSSUNvbXBvbmVudChjb2RlQ2hhbGxlbmdlKX1gLFxuICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvZGVDaGFsbGVuZ2VNZXRob2QpfWAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHVybFBhcmFtcy5wdXNoKGZsb3dQYXJhbXMudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5xdWVyeVBhcmFtcykge1xuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKG9wdGlvbnMucXVlcnlQYXJhbXMpO1xuICAgICAgICAgICAgdXJsUGFyYW1zLnB1c2gocXVlcnkudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5za2lwQnJvd3NlclJlZGlyZWN0KSB7XG4gICAgICAgICAgICB1cmxQYXJhbXMucHVzaChgc2tpcF9odHRwX3JlZGlyZWN0PSR7b3B0aW9ucy5za2lwQnJvd3NlclJlZGlyZWN0fWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHt1cmx9PyR7dXJsUGFyYW1zLmpvaW4oJyYnKX1gO1xuICAgIH1cbiAgICBhc3luYyBfdW5lbnJvbGwocGFyYW1zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogc2Vzc2lvbkRhdGEsIGVycm9yOiBzZXNzaW9uRXJyb3IgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yOiBzZXNzaW9uRXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdERUxFVEUnLCBgJHt0aGlzLnVybH0vZmFjdG9ycy8ke3BhcmFtcy5mYWN0b3JJZH1gLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgand0OiAoX2EgPSBzZXNzaW9uRGF0YSA9PT0gbnVsbCB8fCBzZXNzaW9uRGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbkRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBfZW5yb2xsKHBhcmFtcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiBzZXNzaW9uRGF0YSwgZXJyb3I6IHNlc3Npb25FcnJvciB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IHNlc3Npb25FcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gT2JqZWN0LmFzc2lnbih7IGZyaWVuZGx5X25hbWU6IHBhcmFtcy5mcmllbmRseU5hbWUsIGZhY3Rvcl90eXBlOiBwYXJhbXMuZmFjdG9yVHlwZSB9LCAocGFyYW1zLmZhY3RvclR5cGUgPT09ICdwaG9uZScgPyB7IHBob25lOiBwYXJhbXMucGhvbmUgfSA6IHsgaXNzdWVyOiBwYXJhbXMuaXNzdWVyIH0pKTtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9mYWN0b3JzYCwge1xuICAgICAgICAgICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGp3dDogKF9hID0gc2Vzc2lvbkRhdGEgPT09IG51bGwgfHwgc2Vzc2lvbkRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb25EYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZmFjdG9yVHlwZSA9PT0gJ3RvdHAnICYmICgoX2IgPSBkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEudG90cCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnFyX2NvZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEudG90cC5xcl9jb2RlID0gYGRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGYtOCwke2RhdGEudG90cC5xcl9jb2RlfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICoge0BzZWUgR29UcnVlTUZBQXBpI3ZlcmlmeX1cbiAgICAgKi9cbiAgICBhc3luYyBfdmVyaWZ5KHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogc2Vzc2lvbkRhdGEsIGVycm9yOiBzZXNzaW9uRXJyb3IgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IHNlc3Npb25FcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L2ZhY3RvcnMvJHtwYXJhbXMuZmFjdG9ySWR9L3ZlcmlmeWAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHsgY29kZTogcGFyYW1zLmNvZGUsIGNoYWxsZW5nZV9pZDogcGFyYW1zLmNoYWxsZW5nZUlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBqd3Q6IChfYSA9IHNlc3Npb25EYXRhID09PSBudWxsIHx8IHNlc3Npb25EYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uRGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKE9iamVjdC5hc3NpZ24oeyBleHBpcmVzX2F0OiBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKSArIGRhdGEuZXhwaXJlc19pbiB9LCBkYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdNRkFfQ0hBTExFTkdFX1ZFUklGSUVEJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICoge0BzZWUgR29UcnVlTUZBQXBpI2NoYWxsZW5nZX1cbiAgICAgKi9cbiAgICBhc3luYyBfY2hhbGxlbmdlKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogc2Vzc2lvbkRhdGEsIGVycm9yOiBzZXNzaW9uRXJyb3IgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IHNlc3Npb25FcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9mYWN0b3JzLyR7cGFyYW1zLmZhY3RvcklkfS9jaGFsbGVuZ2VgLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB7IGNoYW5uZWw6IHBhcmFtcy5jaGFubmVsIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBqd3Q6IChfYSA9IHNlc3Npb25EYXRhID09PSBudWxsIHx8IHNlc3Npb25EYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uRGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiB7QHNlZSBHb1RydWVNRkFBcGkjY2hhbGxlbmdlQW5kVmVyaWZ5fVxuICAgICAqL1xuICAgIGFzeW5jIF9jaGFsbGVuZ2VBbmRWZXJpZnkocGFyYW1zKSB7XG4gICAgICAgIC8vIGJvdGggX2NoYWxsZW5nZSBhbmQgX3ZlcmlmeSBpbmRlcGVuZGVudGx5IGFjcXVpcmUgdGhlIGxvY2ssIHNvIG5vIG5lZWRcbiAgICAgICAgLy8gdG8gYWNxdWlyZSBpdCBoZXJlXG4gICAgICAgIGNvbnN0IHsgZGF0YTogY2hhbGxlbmdlRGF0YSwgZXJyb3I6IGNoYWxsZW5nZUVycm9yIH0gPSBhd2FpdCB0aGlzLl9jaGFsbGVuZ2Uoe1xuICAgICAgICAgICAgZmFjdG9ySWQ6IHBhcmFtcy5mYWN0b3JJZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjaGFsbGVuZ2VFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IGNoYWxsZW5nZUVycm9yIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3ZlcmlmeSh7XG4gICAgICAgICAgICBmYWN0b3JJZDogcGFyYW1zLmZhY3RvcklkLFxuICAgICAgICAgICAgY2hhbGxlbmdlSWQ6IGNoYWxsZW5nZURhdGEuaWQsXG4gICAgICAgICAgICBjb2RlOiBwYXJhbXMuY29kZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHtAc2VlIEdvVHJ1ZU1GQUFwaSNsaXN0RmFjdG9yc31cbiAgICAgKi9cbiAgICBhc3luYyBfbGlzdEZhY3RvcnMoKSB7XG4gICAgICAgIC8vIHVzZSAjZ2V0VXNlciBpbnN0ZWFkIG9mICNfZ2V0VXNlciBhcyB0aGUgZm9ybWVyIGFjcXVpcmVzIGEgbG9ja1xuICAgICAgICBjb25zdCB7IGRhdGE6IHsgdXNlciB9LCBlcnJvcjogdXNlckVycm9yLCB9ID0gYXdhaXQgdGhpcy5nZXRVc2VyKCk7XG4gICAgICAgIGlmICh1c2VyRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yOiB1c2VyRXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmYWN0b3JzID0gKHVzZXIgPT09IG51bGwgfHwgdXNlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlci5mYWN0b3JzKSB8fCBbXTtcbiAgICAgICAgY29uc3QgdG90cCA9IGZhY3RvcnMuZmlsdGVyKChmYWN0b3IpID0+IGZhY3Rvci5mYWN0b3JfdHlwZSA9PT0gJ3RvdHAnICYmIGZhY3Rvci5zdGF0dXMgPT09ICd2ZXJpZmllZCcpO1xuICAgICAgICBjb25zdCBwaG9uZSA9IGZhY3RvcnMuZmlsdGVyKChmYWN0b3IpID0+IGZhY3Rvci5mYWN0b3JfdHlwZSA9PT0gJ3Bob25lJyAmJiBmYWN0b3Iuc3RhdHVzID09PSAndmVyaWZpZWQnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBhbGw6IGZhY3RvcnMsXG4gICAgICAgICAgICAgICAgdG90cCxcbiAgICAgICAgICAgICAgICBwaG9uZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICoge0BzZWUgR29UcnVlTUZBQXBpI2dldEF1dGhlbnRpY2F0b3JBc3N1cmFuY2VMZXZlbH1cbiAgICAgKi9cbiAgICBhc3luYyBfZ2V0QXV0aGVudGljYXRvckFzc3VyYW5jZUxldmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YTogeyBzZXNzaW9uIH0sIGVycm9yOiBzZXNzaW9uRXJyb3IsIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogc2Vzc2lvbkVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBjdXJyZW50TGV2ZWw6IG51bGwsIG5leHRMZXZlbDogbnVsbCwgY3VycmVudEF1dGhlbnRpY2F0aW9uTWV0aG9kczogW10gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB7IHBheWxvYWQgfSA9IGRlY29kZUpXVChzZXNzaW9uLmFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRMZXZlbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMZXZlbCA9IHBheWxvYWQuYWFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbmV4dExldmVsID0gY3VycmVudExldmVsO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZlcmlmaWVkRmFjdG9ycyA9IChfYiA9IChfYSA9IHNlc3Npb24udXNlci5mYWN0b3JzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZmlsdGVyKChmYWN0b3IpID0+IGZhY3Rvci5zdGF0dXMgPT09ICd2ZXJpZmllZCcpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBbXTtcbiAgICAgICAgICAgICAgICBpZiAodmVyaWZpZWRGYWN0b3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dExldmVsID0gJ2FhbDInO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50QXV0aGVudGljYXRpb25NZXRob2RzID0gcGF5bG9hZC5hbXIgfHwgW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBjdXJyZW50TGV2ZWwsIG5leHRMZXZlbCwgY3VycmVudEF1dGhlbnRpY2F0aW9uTWV0aG9kcyB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBmZXRjaEp3ayhraWQsIGp3a3MgPSB7IGtleXM6IFtdIH0pIHtcbiAgICAgICAgLy8gdHJ5IGZldGNoaW5nIGZyb20gdGhlIHN1cHBsaWVkIGp3a3NcbiAgICAgICAgbGV0IGp3ayA9IGp3a3Mua2V5cy5maW5kKChrZXkpID0+IGtleS5raWQgPT09IGtpZCk7XG4gICAgICAgIGlmIChqd2spIHtcbiAgICAgICAgICAgIHJldHVybiBqd2s7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHJ5IGZldGNoaW5nIGZyb20gY2FjaGVcbiAgICAgICAgandrID0gdGhpcy5qd2tzLmtleXMuZmluZCgoa2V5KSA9PiBrZXkua2lkID09PSBraWQpO1xuICAgICAgICAvLyBqd2sgZXhpc3RzIGFuZCBqd2tzIGlzbid0IHN0YWxlXG4gICAgICAgIGlmIChqd2sgJiYgdGhpcy5qd2tzX2NhY2hlZF9hdCArIEpXS1NfVFRMID4gRGF0ZS5ub3coKSkge1xuICAgICAgICAgICAgcmV0dXJuIGp3aztcbiAgICAgICAgfVxuICAgICAgICAvLyBqd2sgaXNuJ3QgY2FjaGVkIGluIG1lbW9yeSBzbyB3ZSBuZWVkIHRvIGZldGNoIGl0IGZyb20gdGhlIHdlbGwta25vd24gZW5kcG9pbnRcbiAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0dFVCcsIGAke3RoaXMudXJsfS8ud2VsbC1rbm93bi9qd2tzLmpzb25gLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGF0YS5rZXlzIHx8IGRhdGEua2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZEp3dEVycm9yKCdKV0tTIGlzIGVtcHR5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5qd2tzID0gZGF0YTtcbiAgICAgICAgdGhpcy5qd2tzX2NhY2hlZF9hdCA9IERhdGUubm93KCk7XG4gICAgICAgIC8vIEZpbmQgdGhlIHNpZ25pbmcga2V5XG4gICAgICAgIGp3ayA9IGRhdGEua2V5cy5maW5kKChrZXkpID0+IGtleS5raWQgPT09IGtpZCk7XG4gICAgICAgIGlmICghandrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRKd3RFcnJvcignTm8gbWF0Y2hpbmcgc2lnbmluZyBrZXkgZm91bmQgaW4gSldLUycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqd2s7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBleHBlcmltZW50YWwgVGhpcyBtZXRob2QgbWF5IGNoYW5nZSBpbiBmdXR1cmUgdmVyc2lvbnMuXG4gICAgICogQGRlc2NyaXB0aW9uIEdldHMgdGhlIGNsYWltcyBmcm9tIGEgSldULiBJZiB0aGUgSldUIGlzIHN5bW1ldHJpYyBKV1RzLCBpdCB3aWxsIGNhbGwgZ2V0VXNlcigpIHRvIHZlcmlmeSBhZ2FpbnN0IHRoZSBzZXJ2ZXIuIElmIHRoZSBKV1QgaXMgYXN5bW1ldHJpYywgaXQgd2lsbCBiZSB2ZXJpZmllZCBhZ2FpbnN0IHRoZSBKV0tTIHVzaW5nIHRoZSBXZWJDcnlwdG8gQVBJLlxuICAgICAqL1xuICAgIGFzeW5jIGdldENsYWltcyhqd3QsIGp3a3MgPSB7IGtleXM6IFtdIH0pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB0b2tlbiA9IGp3dDtcbiAgICAgICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCB0aGlzLmdldFNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgfHwgIWRhdGEuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0b2tlbiA9IGRhdGEuc2Vzc2lvbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGhlYWRlciwgcGF5bG9hZCwgc2lnbmF0dXJlLCByYXc6IHsgaGVhZGVyOiByYXdIZWFkZXIsIHBheWxvYWQ6IHJhd1BheWxvYWQgfSwgfSA9IGRlY29kZUpXVCh0b2tlbik7XG4gICAgICAgICAgICAvLyBSZWplY3QgZXhwaXJlZCBKV1RzXG4gICAgICAgICAgICB2YWxpZGF0ZUV4cChwYXlsb2FkLmV4cCk7XG4gICAgICAgICAgICAvLyBJZiBzeW1tZXRyaWMgYWxnb3JpdGhtIG9yIFdlYkNyeXB0byBBUEkgaXMgdW5hdmFpbGFibGUsIGZhbGxiYWNrIHRvIGdldFVzZXIoKVxuICAgICAgICAgICAgaWYgKCFoZWFkZXIua2lkIHx8XG4gICAgICAgICAgICAgICAgaGVhZGVyLmFsZyA9PT0gJ0hTMjU2JyB8fFxuICAgICAgICAgICAgICAgICEoJ2NyeXB0bycgaW4gZ2xvYmFsVGhpcyAmJiAnc3VidGxlJyBpbiBnbG9iYWxUaGlzLmNyeXB0bykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCB0aGlzLmdldFVzZXIodG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZ2V0VXNlciBzdWNjZWVkcyBzbyB0aGUgY2xhaW1zIGluIHRoZSBKV1QgY2FuIGJlIHRydXN0ZWRcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFpbXM6IHBheWxvYWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhbGdvcml0aG0gPSBnZXRBbGdvcml0aG0oaGVhZGVyLmFsZyk7XG4gICAgICAgICAgICBjb25zdCBzaWduaW5nS2V5ID0gYXdhaXQgdGhpcy5mZXRjaEp3ayhoZWFkZXIua2lkLCBqd2tzKTtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgSldLIHRvIENyeXB0b0tleVxuICAgICAgICAgICAgY29uc3QgcHVibGljS2V5ID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoJ2p3aycsIHNpZ25pbmdLZXksIGFsZ29yaXRobSwgdHJ1ZSwgW1xuICAgICAgICAgICAgICAgICd2ZXJpZnknLFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAvLyBWZXJpZnkgdGhlIHNpZ25hdHVyZVxuICAgICAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGNyeXB0by5zdWJ0bGUudmVyaWZ5KGFsZ29yaXRobSwgcHVibGljS2V5LCBzaWduYXR1cmUsIHN0cmluZ1RvVWludDhBcnJheShgJHtyYXdIZWFkZXJ9LiR7cmF3UGF5bG9hZH1gKSk7XG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRKd3RFcnJvcignSW52YWxpZCBKV1Qgc2lnbmF0dXJlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB2ZXJpZmljYXRpb24gc3VjY2VlZHMsIGRlY29kZSBhbmQgcmV0dXJuIGNsYWltc1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsYWltczogcGF5bG9hZCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxufVxuR29UcnVlQ2xpZW50Lm5leHRJbnN0YW5jZUlEID0gMDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUdvVHJ1ZUNsaWVudC5qcy5tYXAiLCJpbXBvcnQgR29UcnVlQWRtaW5BcGkgZnJvbSAnLi9Hb1RydWVBZG1pbkFwaSc7XG5pbXBvcnQgR29UcnVlQ2xpZW50IGZyb20gJy4vR29UcnVlQ2xpZW50JztcbmltcG9ydCBBdXRoQWRtaW5BcGkgZnJvbSAnLi9BdXRoQWRtaW5BcGknO1xuaW1wb3J0IEF1dGhDbGllbnQgZnJvbSAnLi9BdXRoQ2xpZW50JztcbmV4cG9ydCB7IEdvVHJ1ZUFkbWluQXBpLCBHb1RydWVDbGllbnQsIEF1dGhBZG1pbkFwaSwgQXV0aENsaWVudCB9O1xuZXhwb3J0ICogZnJvbSAnLi9saWIvdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZXJyb3JzJztcbmV4cG9ydCB7IG5hdmlnYXRvckxvY2ssIE5hdmlnYXRvckxvY2tBY3F1aXJlVGltZW91dEVycm9yLCBpbnRlcm5hbHMgYXMgbG9ja0ludGVybmFscywgfSBmcm9tICcuL2xpYi9sb2Nrcyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvKipcbiAqIEF2b2lkIG1vZGlmeWluZyB0aGlzIGZpbGUuIEl0J3MgcGFydCBvZlxuICogaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlLWNvbW11bml0eS9iYXNlNjR1cmwtanMuICBTdWJtaXQgYWxsIGZpeGVzIG9uXG4gKiB0aGF0IHJlcG8hXG4gKi9cbi8qKlxuICogQW4gYXJyYXkgb2YgY2hhcmFjdGVycyB0aGF0IGVuY29kZSA2IGJpdHMgaW50byBhIEJhc2U2NC1VUkwgYWxwaGFiZXRcbiAqIGNoYXJhY3Rlci5cbiAqL1xuY29uc3QgVE9fQkFTRTY0VVJMID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LV8nLnNwbGl0KCcnKTtcbi8qKlxuICogQW4gYXJyYXkgb2YgY2hhcmFjdGVycyB0aGF0IGNhbiBhcHBlYXIgaW4gYSBCYXNlNjQtVVJMIGVuY29kZWQgc3RyaW5nIGJ1dFxuICogc2hvdWxkIGJlIGlnbm9yZWQuXG4gKi9cbmNvbnN0IElHTk9SRV9CQVNFNjRVUkwgPSAnIFxcdFxcblxccj0nLnNwbGl0KCcnKTtcbi8qKlxuICogQW4gYXJyYXkgb2YgMTI4IG51bWJlcnMgdGhhdCBtYXAgYSBCYXNlNjQtVVJMIGNoYXJhY3RlciB0byA2IGJpdHMsIG9yIGlmIC0yXG4gKiB1c2VkIHRvIHNraXAgdGhlIGNoYXJhY3Rlciwgb3IgaWYgLTEgdXNlZCB0byBlcnJvciBvdXQuXG4gKi9cbmNvbnN0IEZST01fQkFTRTY0VVJMID0gKCgpID0+IHtcbiAgICBjb25zdCBjaGFyTWFwID0gbmV3IEFycmF5KDEyOCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyTWFwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNoYXJNYXBbaV0gPSAtMTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBJR05PUkVfQkFTRTY0VVJMLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNoYXJNYXBbSUdOT1JFX0JBU0U2NFVSTFtpXS5jaGFyQ29kZUF0KDApXSA9IC0yO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IFRPX0JBU0U2NFVSTC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjaGFyTWFwW1RPX0JBU0U2NFVSTFtpXS5jaGFyQ29kZUF0KDApXSA9IGk7XG4gICAgfVxuICAgIHJldHVybiBjaGFyTWFwO1xufSkoKTtcbi8qKlxuICogQ29udmVydHMgYSBieXRlIHRvIGEgQmFzZTY0LVVSTCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIGJ5dGUgVGhlIGJ5dGUgdG8gY29udmVydCwgb3IgbnVsbCB0byBmbHVzaCBhdCB0aGUgZW5kIG9mIHRoZSBieXRlIHNlcXVlbmNlLlxuICogQHBhcmFtIHN0YXRlIFRoZSBCYXNlNjQgY29udmVyc2lvbiBzdGF0ZS4gUGFzcyBhbiBpbml0aWFsIHZhbHVlIG9mIGB7IHF1ZXVlOiAwLCBxdWV1ZWRCaXRzOiAwIH1gLlxuICogQHBhcmFtIGVtaXQgQSBmdW5jdGlvbiBjYWxsZWQgd2l0aCB0aGUgbmV4dCBCYXNlNjQgY2hhcmFjdGVyIHdoZW4gcmVhZHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBieXRlVG9CYXNlNjRVUkwoYnl0ZSwgc3RhdGUsIGVtaXQpIHtcbiAgICBpZiAoYnl0ZSAhPT0gbnVsbCkge1xuICAgICAgICBzdGF0ZS5xdWV1ZSA9IChzdGF0ZS5xdWV1ZSA8PCA4KSB8IGJ5dGU7XG4gICAgICAgIHN0YXRlLnF1ZXVlZEJpdHMgKz0gODtcbiAgICAgICAgd2hpbGUgKHN0YXRlLnF1ZXVlZEJpdHMgPj0gNikge1xuICAgICAgICAgICAgY29uc3QgcG9zID0gKHN0YXRlLnF1ZXVlID4+IChzdGF0ZS5xdWV1ZWRCaXRzIC0gNikpICYgNjM7XG4gICAgICAgICAgICBlbWl0KFRPX0JBU0U2NFVSTFtwb3NdKTtcbiAgICAgICAgICAgIHN0YXRlLnF1ZXVlZEJpdHMgLT0gNjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChzdGF0ZS5xdWV1ZWRCaXRzID4gMCkge1xuICAgICAgICBzdGF0ZS5xdWV1ZSA9IHN0YXRlLnF1ZXVlIDw8ICg2IC0gc3RhdGUucXVldWVkQml0cyk7XG4gICAgICAgIHN0YXRlLnF1ZXVlZEJpdHMgPSA2O1xuICAgICAgICB3aGlsZSAoc3RhdGUucXVldWVkQml0cyA+PSA2KSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSAoc3RhdGUucXVldWUgPj4gKHN0YXRlLnF1ZXVlZEJpdHMgLSA2KSkgJiA2MztcbiAgICAgICAgICAgIGVtaXQoVE9fQkFTRTY0VVJMW3Bvc10pO1xuICAgICAgICAgICAgc3RhdGUucXVldWVkQml0cyAtPSA2O1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBDb252ZXJ0cyBhIFN0cmluZyBjaGFyIGNvZGUgKGV4dHJhY3RlZCB1c2luZyBgc3RyaW5nLmNoYXJDb2RlQXQocG9zaXRpb24pYCkgdG8gYSBzZXF1ZW5jZSBvZiBCYXNlNjQtVVJMIGNoYXJhY3RlcnMuXG4gKlxuICogQHBhcmFtIGNoYXJDb2RlIFRoZSBjaGFyIGNvZGUgb2YgdGhlIEphdmFTY3JpcHQgc3RyaW5nLlxuICogQHBhcmFtIHN0YXRlIFRoZSBCYXNlNjQgc3RhdGUuIFBhc3MgYW4gaW5pdGlhbCB2YWx1ZSBvZiBgeyBxdWV1ZTogMCwgcXVldWVkQml0czogMCB9YC5cbiAqIEBwYXJhbSBlbWl0IEEgZnVuY3Rpb24gY2FsbGVkIHdpdGggdGhlIG5leHQgYnl0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVGcm9tQmFzZTY0VVJMKGNoYXJDb2RlLCBzdGF0ZSwgZW1pdCkge1xuICAgIGNvbnN0IGJpdHMgPSBGUk9NX0JBU0U2NFVSTFtjaGFyQ29kZV07XG4gICAgaWYgKGJpdHMgPiAtMSkge1xuICAgICAgICAvLyB2YWxpZCBCYXNlNjQtVVJMIGNoYXJhY3RlclxuICAgICAgICBzdGF0ZS5xdWV1ZSA9IChzdGF0ZS5xdWV1ZSA8PCA2KSB8IGJpdHM7XG4gICAgICAgIHN0YXRlLnF1ZXVlZEJpdHMgKz0gNjtcbiAgICAgICAgd2hpbGUgKHN0YXRlLnF1ZXVlZEJpdHMgPj0gOCkge1xuICAgICAgICAgICAgZW1pdCgoc3RhdGUucXVldWUgPj4gKHN0YXRlLnF1ZXVlZEJpdHMgLSA4KSkgJiAweGZmKTtcbiAgICAgICAgICAgIHN0YXRlLnF1ZXVlZEJpdHMgLT0gODtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChiaXRzID09PSAtMikge1xuICAgICAgICAvLyBpZ25vcmUgc3BhY2VzLCB0YWJzLCBuZXdsaW5lcywgPVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgQmFzZTY0LVVSTCBjaGFyYWN0ZXIgXCIke1N0cmluZy5mcm9tQ2hhckNvZGUoY2hhckNvZGUpfVwiYCk7XG4gICAgfVxufVxuLyoqXG4gKiBDb252ZXJ0cyBhIEphdmFTY3JpcHQgc3RyaW5nICh3aGljaCBtYXkgaW5jbHVkZSBhbnkgdmFsaWQgY2hhcmFjdGVyKSBpbnRvIGFcbiAqIEJhc2U2NC1VUkwgZW5jb2RlZCBzdHJpbmcuIFRoZSBzdHJpbmcgaXMgZmlyc3QgZW5jb2RlZCBpbiBVVEYtOCB3aGljaCBpc1xuICogdGhlbiBlbmNvZGVkIGFzIEJhc2U2NC1VUkwuXG4gKlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdUb0Jhc2U2NFVSTChzdHIpIHtcbiAgICBjb25zdCBiYXNlNjQgPSBbXTtcbiAgICBjb25zdCBlbWl0dGVyID0gKGNoYXIpID0+IHtcbiAgICAgICAgYmFzZTY0LnB1c2goY2hhcik7XG4gICAgfTtcbiAgICBjb25zdCBzdGF0ZSA9IHsgcXVldWU6IDAsIHF1ZXVlZEJpdHM6IDAgfTtcbiAgICBzdHJpbmdUb1VURjgoc3RyLCAoYnl0ZSkgPT4ge1xuICAgICAgICBieXRlVG9CYXNlNjRVUkwoYnl0ZSwgc3RhdGUsIGVtaXR0ZXIpO1xuICAgIH0pO1xuICAgIGJ5dGVUb0Jhc2U2NFVSTChudWxsLCBzdGF0ZSwgZW1pdHRlcik7XG4gICAgcmV0dXJuIGJhc2U2NC5qb2luKCcnKTtcbn1cbi8qKlxuICogQ29udmVydHMgYSBCYXNlNjQtVVJMIGVuY29kZWQgc3RyaW5nIGludG8gYSBKYXZhU2NyaXB0IHN0cmluZy4gSXQgaXMgYXNzdW1lZFxuICogdGhhdCB0aGUgdW5kZXJseWluZyBzdHJpbmcgaGFzIGJlZW4gZW5jb2RlZCBhcyBVVEYtOC5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBCYXNlNjQtVVJMIGVuY29kZWQgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nRnJvbUJhc2U2NFVSTChzdHIpIHtcbiAgICBjb25zdCBjb252ID0gW107XG4gICAgY29uc3QgdXRmOEVtaXQgPSAoY29kZXBvaW50KSA9PiB7XG4gICAgICAgIGNvbnYucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludChjb2RlcG9pbnQpKTtcbiAgICB9O1xuICAgIGNvbnN0IHV0ZjhTdGF0ZSA9IHtcbiAgICAgICAgdXRmOHNlcTogMCxcbiAgICAgICAgY29kZXBvaW50OiAwLFxuICAgIH07XG4gICAgY29uc3QgYjY0U3RhdGUgPSB7IHF1ZXVlOiAwLCBxdWV1ZWRCaXRzOiAwIH07XG4gICAgY29uc3QgYnl0ZUVtaXQgPSAoYnl0ZSkgPT4ge1xuICAgICAgICBzdHJpbmdGcm9tVVRGOChieXRlLCB1dGY4U3RhdGUsIHV0ZjhFbWl0KTtcbiAgICB9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGJ5dGVGcm9tQmFzZTY0VVJMKHN0ci5jaGFyQ29kZUF0KGkpLCBiNjRTdGF0ZSwgYnl0ZUVtaXQpO1xuICAgIH1cbiAgICByZXR1cm4gY29udi5qb2luKCcnKTtcbn1cbi8qKlxuICogQ29udmVydHMgYSBVbmljb2RlIGNvZGVwb2ludCB0byBhIG11bHRpLWJ5dGUgVVRGLTggc2VxdWVuY2UuXG4gKlxuICogQHBhcmFtIGNvZGVwb2ludCBUaGUgVW5pY29kZSBjb2RlcG9pbnQuXG4gKiBAcGFyYW0gZW1pdCAgICAgIEZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoIFVURi04IGJ5dGUgdGhhdCByZXByZXNlbnRzIHRoZSBjb2RlcG9pbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2RlcG9pbnRUb1VURjgoY29kZXBvaW50LCBlbWl0KSB7XG4gICAgaWYgKGNvZGVwb2ludCA8PSAweDdmKSB7XG4gICAgICAgIGVtaXQoY29kZXBvaW50KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb2RlcG9pbnQgPD0gMHg3ZmYpIHtcbiAgICAgICAgZW1pdCgweGMwIHwgKGNvZGVwb2ludCA+PiA2KSk7XG4gICAgICAgIGVtaXQoMHg4MCB8IChjb2RlcG9pbnQgJiAweDNmKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29kZXBvaW50IDw9IDB4ZmZmZikge1xuICAgICAgICBlbWl0KDB4ZTAgfCAoY29kZXBvaW50ID4+IDEyKSk7XG4gICAgICAgIGVtaXQoMHg4MCB8ICgoY29kZXBvaW50ID4+IDYpICYgMHgzZikpO1xuICAgICAgICBlbWl0KDB4ODAgfCAoY29kZXBvaW50ICYgMHgzZikpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvZGVwb2ludCA8PSAweDEwZmZmZikge1xuICAgICAgICBlbWl0KDB4ZjAgfCAoY29kZXBvaW50ID4+IDE4KSk7XG4gICAgICAgIGVtaXQoMHg4MCB8ICgoY29kZXBvaW50ID4+IDEyKSAmIDB4M2YpKTtcbiAgICAgICAgZW1pdCgweDgwIHwgKChjb2RlcG9pbnQgPj4gNikgJiAweDNmKSk7XG4gICAgICAgIGVtaXQoMHg4MCB8IChjb2RlcG9pbnQgJiAweDNmKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnJlY29nbml6ZWQgVW5pY29kZSBjb2RlcG9pbnQ6ICR7Y29kZXBvaW50LnRvU3RyaW5nKDE2KX1gKTtcbn1cbi8qKlxuICogQ29udmVydHMgYSBKYXZhU2NyaXB0IHN0cmluZyB0byBhIHNlcXVlbmNlIG9mIFVURi04IGJ5dGVzLlxuICpcbiAqIEBwYXJhbSBzdHIgIFRoZSBzdHJpbmcgdG8gY29udmVydCB0byBVVEYtOC5cbiAqIEBwYXJhbSBlbWl0IEZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoIFVURi04IGJ5dGUgb2YgdGhlIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvVVRGOChzdHIsIGVtaXQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBsZXQgY29kZXBvaW50ID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjb2RlcG9pbnQgPiAweGQ3ZmYgJiYgY29kZXBvaW50IDw9IDB4ZGJmZikge1xuICAgICAgICAgICAgLy8gbW9zdCBVVEYtMTYgY29kZXBvaW50cyBhcmUgVW5pY29kZSBjb2RlcG9pbnRzLCBleGNlcHQgdmFsdWVzIGluIHRoaXNcbiAgICAgICAgICAgIC8vIHJhbmdlIHdoZXJlIHRoZSBuZXh0IFVURi0xNiBjb2RlcG9pbnQgbmVlZHMgdG8gYmUgY29tYmluZWQgd2l0aCB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgb25lIHRvIGdldCB0aGUgVW5pY29kZSBjb2RlcG9pbnRcbiAgICAgICAgICAgIGNvbnN0IGhpZ2hTdXJyb2dhdGUgPSAoKGNvZGVwb2ludCAtIDB4ZDgwMCkgKiAweDQwMCkgJiAweGZmZmY7XG4gICAgICAgICAgICBjb25zdCBsb3dTdXJyb2dhdGUgPSAoc3RyLmNoYXJDb2RlQXQoaSArIDEpIC0gMHhkYzAwKSAmIDB4ZmZmZjtcbiAgICAgICAgICAgIGNvZGVwb2ludCA9IChsb3dTdXJyb2dhdGUgfCBoaWdoU3Vycm9nYXRlKSArIDB4MTAwMDA7XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgY29kZXBvaW50VG9VVEY4KGNvZGVwb2ludCwgZW1pdCk7XG4gICAgfVxufVxuLyoqXG4gKiBDb252ZXJ0cyBhIFVURi04IGJ5dGUgdG8gYSBVbmljb2RlIGNvZGVwb2ludC5cbiAqXG4gKiBAcGFyYW0gYnl0ZSAgVGhlIFVURi04IGJ5dGUgbmV4dCBpbiB0aGUgc2VxdWVuY2UuXG4gKiBAcGFyYW0gc3RhdGUgVGhlIHNoYXJlZCBzdGF0ZSBiZXR3ZWVuIGNvbnNlY3V0aXZlIFVURi04IGJ5dGVzIGluIHRoZVxuICogICAgICAgICAgICAgIHNlcXVlbmNlLCBhbiBvYmplY3Qgd2l0aCB0aGUgc2hhcGUgYHsgdXRmOHNlcTogMCwgY29kZXBvaW50OiAwIH1gLlxuICogQHBhcmFtIGVtaXQgIEZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoIGNvZGVwb2ludC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0Zyb21VVEY4KGJ5dGUsIHN0YXRlLCBlbWl0KSB7XG4gICAgaWYgKHN0YXRlLnV0ZjhzZXEgPT09IDApIHtcbiAgICAgICAgaWYgKGJ5dGUgPD0gMHg3Zikge1xuICAgICAgICAgICAgZW1pdChieXRlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb3VudCB0aGUgbnVtYmVyIG9mIDEgbGVhZGluZyBiaXRzIHVudGlsIHlvdSByZWFjaCAwXG4gICAgICAgIGZvciAobGV0IGxlYWRpbmdCaXQgPSAxOyBsZWFkaW5nQml0IDwgNjsgbGVhZGluZ0JpdCArPSAxKSB7XG4gICAgICAgICAgICBpZiAoKChieXRlID4+ICg3IC0gbGVhZGluZ0JpdCkpICYgMSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS51dGY4c2VxID0gbGVhZGluZ0JpdDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUudXRmOHNlcSA9PT0gMikge1xuICAgICAgICAgICAgc3RhdGUuY29kZXBvaW50ID0gYnl0ZSAmIDMxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLnV0ZjhzZXEgPT09IDMpIHtcbiAgICAgICAgICAgIHN0YXRlLmNvZGVwb2ludCA9IGJ5dGUgJiAxNTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZS51dGY4c2VxID09PSA0KSB7XG4gICAgICAgICAgICBzdGF0ZS5jb2RlcG9pbnQgPSBieXRlICYgNztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBVVEYtOCBzZXF1ZW5jZScpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLnV0ZjhzZXEgLT0gMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdGUudXRmOHNlcSA+IDApIHtcbiAgICAgICAgaWYgKGJ5dGUgPD0gMHg3Zikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFVURi04IHNlcXVlbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuY29kZXBvaW50ID0gKHN0YXRlLmNvZGVwb2ludCA8PCA2KSB8IChieXRlICYgNjMpO1xuICAgICAgICBzdGF0ZS51dGY4c2VxIC09IDE7XG4gICAgICAgIGlmIChzdGF0ZS51dGY4c2VxID09PSAwKSB7XG4gICAgICAgICAgICBlbWl0KHN0YXRlLmNvZGVwb2ludCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbnMgdG8gY29udmVydCBkaWZmZXJlbnQgdHlwZXMgb2Ygc3RyaW5ncyB0byBVaW50OEFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiYXNlNjRVcmxUb1VpbnQ4QXJyYXkoc3RyKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgY29uc3Qgc3RhdGUgPSB7IHF1ZXVlOiAwLCBxdWV1ZWRCaXRzOiAwIH07XG4gICAgY29uc3Qgb25CeXRlID0gKGJ5dGUpID0+IHtcbiAgICAgICAgcmVzdWx0LnB1c2goYnl0ZSk7XG4gICAgfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBieXRlRnJvbUJhc2U2NFVSTChzdHIuY2hhckNvZGVBdChpKSwgc3RhdGUsIG9uQnl0ZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVWludDhBcnJheShyZXN1bHQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvVWludDhBcnJheShzdHIpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBzdHJpbmdUb1VURjgoc3RyLCAoYnl0ZSkgPT4gcmVzdWx0LnB1c2goYnl0ZSkpO1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShyZXN1bHQpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZTY0dXJsLmpzLm1hcCIsImltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xuLyoqIEN1cnJlbnQgc2Vzc2lvbiB3aWxsIGJlIGNoZWNrZWQgZm9yIHJlZnJlc2ggYXQgdGhpcyBpbnRlcnZhbC4gKi9cbmV4cG9ydCBjb25zdCBBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTl9NUyA9IDMwICogMTAwMDtcbi8qKlxuICogQSB0b2tlbiByZWZyZXNoIHdpbGwgYmUgYXR0ZW1wdGVkIHRoaXMgbWFueSB0aWNrcyBiZWZvcmUgdGhlIGN1cnJlbnQgc2Vzc2lvbiBleHBpcmVzLiAqL1xuZXhwb3J0IGNvbnN0IEFVVE9fUkVGUkVTSF9USUNLX1RIUkVTSE9MRCA9IDM7XG4vKlxuICogRWFybGllc3QgdGltZSBiZWZvcmUgYW4gYWNjZXNzIHRva2VuIGV4cGlyZXMgdGhhdCB0aGUgc2Vzc2lvbiBzaG91bGQgYmUgcmVmcmVzaGVkLlxuICovXG5leHBvcnQgY29uc3QgRVhQSVJZX01BUkdJTl9NUyA9IEFVVE9fUkVGUkVTSF9USUNLX1RIUkVTSE9MRCAqIEFVVE9fUkVGUkVTSF9USUNLX0RVUkFUSU9OX01TO1xuZXhwb3J0IGNvbnN0IEdPVFJVRV9VUkwgPSAnaHR0cDovL2xvY2FsaG9zdDo5OTk5JztcbmV4cG9ydCBjb25zdCBTVE9SQUdFX0tFWSA9ICdzdXBhYmFzZS5hdXRoLnRva2VuJztcbmV4cG9ydCBjb25zdCBBVURJRU5DRSA9ICcnO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfSEVBREVSUyA9IHsgJ1gtQ2xpZW50LUluZm8nOiBgZ290cnVlLWpzLyR7dmVyc2lvbn1gIH07XG5leHBvcnQgY29uc3QgTkVUV09SS19GQUlMVVJFID0ge1xuICAgIE1BWF9SRVRSSUVTOiAxMCxcbiAgICBSRVRSWV9JTlRFUlZBTDogMiwgLy8gaW4gZGVjaXNlY29uZHNcbn07XG5leHBvcnQgY29uc3QgQVBJX1ZFUlNJT05fSEVBREVSX05BTUUgPSAnWC1TdXBhYmFzZS1BcGktVmVyc2lvbic7XG5leHBvcnQgY29uc3QgQVBJX1ZFUlNJT05TID0ge1xuICAgICcyMDI0LTAxLTAxJzoge1xuICAgICAgICB0aW1lc3RhbXA6IERhdGUucGFyc2UoJzIwMjQtMDEtMDFUMDA6MDA6MDAuMFonKSxcbiAgICAgICAgbmFtZTogJzIwMjQtMDEtMDEnLFxuICAgIH0sXG59O1xuZXhwb3J0IGNvbnN0IEJBU0U2NFVSTF9SRUdFWCA9IC9eKFthLXowLTlfLV17NH0pKigkfFthLXowLTlfLV17M30kfFthLXowLTlfLV17Mn0kKSQvaTtcbmV4cG9ydCBjb25zdCBKV0tTX1RUTCA9IDYwMDAwMDsgLy8gMTAgbWludXRlc1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsImV4cG9ydCBjbGFzcyBBdXRoRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgc3RhdHVzLCBjb2RlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLl9faXNBdXRoRXJyb3IgPSB0cnVlO1xuICAgICAgICB0aGlzLm5hbWUgPSAnQXV0aEVycm9yJztcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMuY29kZSA9IGNvZGU7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQXV0aEVycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlcnJvciA9PT0gJ29iamVjdCcgJiYgZXJyb3IgIT09IG51bGwgJiYgJ19faXNBdXRoRXJyb3InIGluIGVycm9yO1xufVxuZXhwb3J0IGNsYXNzIEF1dGhBcGlFcnJvciBleHRlbmRzIEF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgc3RhdHVzLCBjb2RlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsIHN0YXR1cywgY29kZSk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdBdXRoQXBpRXJyb3InO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoQXBpRXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4gaXNBdXRoRXJyb3IoZXJyb3IpICYmIGVycm9yLm5hbWUgPT09ICdBdXRoQXBpRXJyb3InO1xufVxuZXhwb3J0IGNsYXNzIEF1dGhVbmtub3duRXJyb3IgZXh0ZW5kcyBBdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIG9yaWdpbmFsRXJyb3IpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdBdXRoVW5rbm93bkVycm9yJztcbiAgICAgICAgdGhpcy5vcmlnaW5hbEVycm9yID0gb3JpZ2luYWxFcnJvcjtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQ3VzdG9tQXV0aEVycm9yIGV4dGVuZHMgQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBuYW1lLCBzdGF0dXMsIGNvZGUpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgc3RhdHVzLCBjb2RlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yIGV4dGVuZHMgQ3VzdG9tQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0F1dGggc2Vzc2lvbiBtaXNzaW5nIScsICdBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcicsIDQwMCwgdW5kZWZpbmVkKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcihlcnJvcikge1xuICAgIHJldHVybiBpc0F1dGhFcnJvcihlcnJvcikgJiYgZXJyb3IubmFtZSA9PT0gJ0F1dGhTZXNzaW9uTWlzc2luZ0Vycm9yJztcbn1cbmV4cG9ydCBjbGFzcyBBdXRoSW52YWxpZFRva2VuUmVzcG9uc2VFcnJvciBleHRlbmRzIEN1c3RvbUF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdBdXRoIHNlc3Npb24gb3IgdXNlciBtaXNzaW5nJywgJ0F1dGhJbnZhbGlkVG9rZW5SZXNwb25zZUVycm9yJywgNTAwLCB1bmRlZmluZWQpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgJ0F1dGhJbnZhbGlkQ3JlZGVudGlhbHNFcnJvcicsIDQwMCwgdW5kZWZpbmVkKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yIGV4dGVuZHMgQ3VzdG9tQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBkZXRhaWxzID0gbnVsbCkge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yJywgNTAwLCB1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBudWxsO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgZGV0YWlsczogdGhpcy5kZXRhaWxzLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvcihlcnJvcikge1xuICAgIHJldHVybiBpc0F1dGhFcnJvcihlcnJvcikgJiYgZXJyb3IubmFtZSA9PT0gJ0F1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvcic7XG59XG5leHBvcnQgY2xhc3MgQXV0aFBLQ0VHcmFudENvZGVFeGNoYW5nZUVycm9yIGV4dGVuZHMgQ3VzdG9tQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBkZXRhaWxzID0gbnVsbCkge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnQXV0aFBLQ0VHcmFudENvZGVFeGNoYW5nZUVycm9yJywgNTAwLCB1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBudWxsO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgZGV0YWlsczogdGhpcy5kZXRhaWxzLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvciBleHRlbmRzIEN1c3RvbUF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgc3RhdHVzKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcicsIHN0YXR1cywgdW5kZWZpbmVkKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcihlcnJvcikge1xuICAgIHJldHVybiBpc0F1dGhFcnJvcihlcnJvcikgJiYgZXJyb3IubmFtZSA9PT0gJ0F1dGhSZXRyeWFibGVGZXRjaEVycm9yJztcbn1cbi8qKlxuICogVGhpcyBlcnJvciBpcyB0aHJvd24gb24gY2VydGFpbiBtZXRob2RzIHdoZW4gdGhlIHBhc3N3b3JkIHVzZWQgaXMgZGVlbWVkXG4gKiB3ZWFrLiBJbnNwZWN0IHRoZSByZWFzb25zIHRvIGlkZW50aWZ5IHdoYXQgcGFzc3dvcmQgc3RyZW5ndGggcnVsZXMgYXJlXG4gKiBpbmFkZXF1YXRlLlxuICovXG5leHBvcnQgY2xhc3MgQXV0aFdlYWtQYXNzd29yZEVycm9yIGV4dGVuZHMgQ3VzdG9tQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMsIHJlYXNvbnMpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgJ0F1dGhXZWFrUGFzc3dvcmRFcnJvcicsIHN0YXR1cywgJ3dlYWtfcGFzc3dvcmQnKTtcbiAgICAgICAgdGhpcy5yZWFzb25zID0gcmVhc29ucztcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoV2Vha1Bhc3N3b3JkRXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4gaXNBdXRoRXJyb3IoZXJyb3IpICYmIGVycm9yLm5hbWUgPT09ICdBdXRoV2Vha1Bhc3N3b3JkRXJyb3InO1xufVxuZXhwb3J0IGNsYXNzIEF1dGhJbnZhbGlkSnd0RXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgJ0F1dGhJbnZhbGlkSnd0RXJyb3InLCA0MDAsICdpbnZhbGlkX2p3dCcpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVycm9ycy5qcy5tYXAiLCJ2YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBBUElfVkVSU0lPTlMsIEFQSV9WRVJTSU9OX0hFQURFUl9OQU1FIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZXhwaXJlc0F0LCBsb29rc0xpa2VGZXRjaFJlc3BvbnNlLCBwYXJzZVJlc3BvbnNlQVBJVmVyc2lvbiB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBBdXRoQXBpRXJyb3IsIEF1dGhSZXRyeWFibGVGZXRjaEVycm9yLCBBdXRoV2Vha1Bhc3N3b3JkRXJyb3IsIEF1dGhVbmtub3duRXJyb3IsIEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yLCB9IGZyb20gJy4vZXJyb3JzJztcbmNvbnN0IF9nZXRFcnJvck1lc3NhZ2UgPSAoZXJyKSA9PiBlcnIubXNnIHx8IGVyci5tZXNzYWdlIHx8IGVyci5lcnJvcl9kZXNjcmlwdGlvbiB8fCBlcnIuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoZXJyKTtcbmNvbnN0IE5FVFdPUktfRVJST1JfQ09ERVMgPSBbNTAyLCA1MDMsIDUwNF07XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCFsb29rc0xpa2VGZXRjaFJlc3BvbnNlKGVycm9yKSkge1xuICAgICAgICB0aHJvdyBuZXcgQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IoX2dldEVycm9yTWVzc2FnZShlcnJvciksIDApO1xuICAgIH1cbiAgICBpZiAoTkVUV09SS19FUlJPUl9DT0RFUy5pbmNsdWRlcyhlcnJvci5zdGF0dXMpKSB7XG4gICAgICAgIC8vIHN0YXR1cyBpbiA1MDAuLi41OTkgcmFuZ2UgLSBzZXJ2ZXIgaGFkIGFuIGVycm9yLCByZXF1ZXN0IG1pZ2h0IGJlIHJldHJ5ZWQuXG4gICAgICAgIHRocm93IG5ldyBBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGVycm9yKSwgZXJyb3Iuc3RhdHVzKTtcbiAgICB9XG4gICAgbGV0IGRhdGE7XG4gICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IGF3YWl0IGVycm9yLmpzb24oKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF1dGhVbmtub3duRXJyb3IoX2dldEVycm9yTWVzc2FnZShlKSwgZSk7XG4gICAgfVxuICAgIGxldCBlcnJvckNvZGUgPSB1bmRlZmluZWQ7XG4gICAgY29uc3QgcmVzcG9uc2VBUElWZXJzaW9uID0gcGFyc2VSZXNwb25zZUFQSVZlcnNpb24oZXJyb3IpO1xuICAgIGlmIChyZXNwb25zZUFQSVZlcnNpb24gJiZcbiAgICAgICAgcmVzcG9uc2VBUElWZXJzaW9uLmdldFRpbWUoKSA+PSBBUElfVkVSU0lPTlNbJzIwMjQtMDEtMDEnXS50aW1lc3RhbXAgJiZcbiAgICAgICAgdHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmXG4gICAgICAgIGRhdGEgJiZcbiAgICAgICAgdHlwZW9mIGRhdGEuY29kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZXJyb3JDb2RlID0gZGF0YS5jb2RlO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgZGF0YSAmJiB0eXBlb2YgZGF0YS5lcnJvcl9jb2RlID09PSAnc3RyaW5nJykge1xuICAgICAgICBlcnJvckNvZGUgPSBkYXRhLmVycm9yX2NvZGU7XG4gICAgfVxuICAgIGlmICghZXJyb3JDb2RlKSB7XG4gICAgICAgIC8vIExlZ2FjeSBzdXBwb3J0IGZvciB3ZWFrIHBhc3N3b3JkIGVycm9ycywgd2hlbiB0aGVyZSB3ZXJlIG5vIGVycm9yIGNvZGVzXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIGRhdGEgJiZcbiAgICAgICAgICAgIHR5cGVvZiBkYXRhLndlYWtfcGFzc3dvcmQgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICBkYXRhLndlYWtfcGFzc3dvcmQgJiZcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoZGF0YS53ZWFrX3Bhc3N3b3JkLnJlYXNvbnMpICYmXG4gICAgICAgICAgICBkYXRhLndlYWtfcGFzc3dvcmQucmVhc29ucy5sZW5ndGggJiZcbiAgICAgICAgICAgIGRhdGEud2Vha19wYXNzd29yZC5yZWFzb25zLnJlZHVjZSgoYSwgaSkgPT4gYSAmJiB0eXBlb2YgaSA9PT0gJ3N0cmluZycsIHRydWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFdlYWtQYXNzd29yZEVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZGF0YSksIGVycm9yLnN0YXR1cywgZGF0YS53ZWFrX3Bhc3N3b3JkLnJlYXNvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGVycm9yQ29kZSA9PT0gJ3dlYWtfcGFzc3dvcmQnKSB7XG4gICAgICAgIHRocm93IG5ldyBBdXRoV2Vha1Bhc3N3b3JkRXJyb3IoX2dldEVycm9yTWVzc2FnZShkYXRhKSwgZXJyb3Iuc3RhdHVzLCAoKF9hID0gZGF0YS53ZWFrX3Bhc3N3b3JkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVhc29ucykgfHwgW10pO1xuICAgIH1cbiAgICBlbHNlIGlmIChlcnJvckNvZGUgPT09ICdzZXNzaW9uX25vdF9mb3VuZCcpIHtcbiAgICAgICAgLy8gVGhlIGBzZXNzaW9uX2lkYCBpbnNpZGUgdGhlIEpXVCBkb2VzIG5vdCBjb3JyZXNwb25kIHRvIGEgcm93IGluIHRoZVxuICAgICAgICAvLyBgc2Vzc2lvbnNgIHRhYmxlLiBUaGlzIHVzdWFsbHkgbWVhbnMgdGhlIHVzZXIgaGFzIHNpZ25lZCBvdXQsIGhhcyBiZWVuXG4gICAgICAgIC8vIGRlbGV0ZWQsIG9yIHRoZWlyIHNlc3Npb24gaGFzIHNvbWVob3cgYmVlbiB0ZXJtaW5hdGVkLlxuICAgICAgICB0aHJvdyBuZXcgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEF1dGhBcGlFcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGRhdGEpLCBlcnJvci5zdGF0dXMgfHwgNTAwLCBlcnJvckNvZGUpO1xufVxuY29uc3QgX2dldFJlcXVlc3RQYXJhbXMgPSAobWV0aG9kLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0geyBtZXRob2QsIGhlYWRlcnM6IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhZGVycykgfHwge30gfTtcbiAgICBpZiAobWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbiAgICBwYXJhbXMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcgfSwgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhlYWRlcnMpO1xuICAgIHBhcmFtcy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKSwgcGFyYW1ldGVycyk7XG59O1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIF9yZXF1ZXN0KGZldGNoZXIsIG1ldGhvZCwgdXJsLCBvcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IGhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhZGVycyk7XG4gICAgaWYgKCFoZWFkZXJzW0FQSV9WRVJTSU9OX0hFQURFUl9OQU1FXSkge1xuICAgICAgICBoZWFkZXJzW0FQSV9WRVJTSU9OX0hFQURFUl9OQU1FXSA9IEFQSV9WRVJTSU9OU1snMjAyNC0wMS0wMSddLm5hbWU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuand0KSB7XG4gICAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHtvcHRpb25zLmp3dH1gO1xuICAgIH1cbiAgICBjb25zdCBxcyA9IChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5xdWVyeSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDoge307XG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5yZWRpcmVjdFRvKSB7XG4gICAgICAgIHFzWydyZWRpcmVjdF90byddID0gb3B0aW9ucy5yZWRpcmVjdFRvO1xuICAgIH1cbiAgICBjb25zdCBxdWVyeVN0cmluZyA9IE9iamVjdC5rZXlzKHFzKS5sZW5ndGggPyAnPycgKyBuZXcgVVJMU2VhcmNoUGFyYW1zKHFzKS50b1N0cmluZygpIDogJyc7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IF9oYW5kbGVSZXF1ZXN0KGZldGNoZXIsIG1ldGhvZCwgdXJsICsgcXVlcnlTdHJpbmcsIHtcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgbm9SZXNvbHZlSnNvbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLm5vUmVzb2x2ZUpzb24sXG4gICAgfSwge30sIG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5ib2R5KTtcbiAgICByZXR1cm4gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy54Zm9ybSkgPyBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMueGZvcm0oZGF0YSkgOiB7IGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpLCBlcnJvcjogbnVsbCB9O1xufVxuYXN5bmMgZnVuY3Rpb24gX2hhbmRsZVJlcXVlc3QoZmV0Y2hlciwgbWV0aG9kLCB1cmwsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpIHtcbiAgICBjb25zdCByZXF1ZXN0UGFyYW1zID0gX2dldFJlcXVlc3RQYXJhbXMobWV0aG9kLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KTtcbiAgICBsZXQgcmVzdWx0O1xuICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IGZldGNoZXIodXJsLCBPYmplY3QuYXNzaWduKHt9LCByZXF1ZXN0UGFyYW1zKSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIC8vIGZldGNoIGZhaWxlZCwgbGlrZWx5IGR1ZSB0byBhIG5ldHdvcmsgb3IgQ09SUyBlcnJvclxuICAgICAgICB0aHJvdyBuZXcgQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IoX2dldEVycm9yTWVzc2FnZShlKSwgMCk7XG4gICAgfVxuICAgIGlmICghcmVzdWx0Lm9rKSB7XG4gICAgICAgIGF3YWl0IGhhbmRsZUVycm9yKHJlc3VsdCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubm9SZXNvbHZlSnNvbikge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgcmVzdWx0Lmpzb24oKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgYXdhaXQgaGFuZGxlRXJyb3IoZSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIF9zZXNzaW9uUmVzcG9uc2UoZGF0YSkge1xuICAgIHZhciBfYTtcbiAgICBsZXQgc2Vzc2lvbiA9IG51bGw7XG4gICAgaWYgKGhhc1Nlc3Npb24oZGF0YSkpIHtcbiAgICAgICAgc2Vzc2lvbiA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICBpZiAoIWRhdGEuZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5leHBpcmVzX2F0ID0gZXhwaXJlc0F0KGRhdGEuZXhwaXJlc19pbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgdXNlciA9IChfYSA9IGRhdGEudXNlcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZGF0YTtcbiAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb24sIHVzZXIgfSwgZXJyb3I6IG51bGwgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBfc2Vzc2lvblJlc3BvbnNlUGFzc3dvcmQoZGF0YSkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gX3Nlc3Npb25SZXNwb25zZShkYXRhKTtcbiAgICBpZiAoIXJlc3BvbnNlLmVycm9yICYmXG4gICAgICAgIGRhdGEud2Vha19wYXNzd29yZCAmJlxuICAgICAgICB0eXBlb2YgZGF0YS53ZWFrX3Bhc3N3b3JkID09PSAnb2JqZWN0JyAmJlxuICAgICAgICBBcnJheS5pc0FycmF5KGRhdGEud2Vha19wYXNzd29yZC5yZWFzb25zKSAmJlxuICAgICAgICBkYXRhLndlYWtfcGFzc3dvcmQucmVhc29ucy5sZW5ndGggJiZcbiAgICAgICAgZGF0YS53ZWFrX3Bhc3N3b3JkLm1lc3NhZ2UgJiZcbiAgICAgICAgdHlwZW9mIGRhdGEud2Vha19wYXNzd29yZC5tZXNzYWdlID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBkYXRhLndlYWtfcGFzc3dvcmQucmVhc29ucy5yZWR1Y2UoKGEsIGkpID0+IGEgJiYgdHlwZW9mIGkgPT09ICdzdHJpbmcnLCB0cnVlKSkge1xuICAgICAgICByZXNwb25zZS5kYXRhLndlYWtfcGFzc3dvcmQgPSBkYXRhLndlYWtfcGFzc3dvcmQ7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBfdXNlclJlc3BvbnNlKGRhdGEpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgdXNlciA9IChfYSA9IGRhdGEudXNlcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZGF0YTtcbiAgICByZXR1cm4geyBkYXRhOiB7IHVzZXIgfSwgZXJyb3I6IG51bGwgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBfc3NvUmVzcG9uc2UoZGF0YSkge1xuICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG59XG5leHBvcnQgZnVuY3Rpb24gX2dlbmVyYXRlTGlua1Jlc3BvbnNlKGRhdGEpIHtcbiAgICBjb25zdCB7IGFjdGlvbl9saW5rLCBlbWFpbF9vdHAsIGhhc2hlZF90b2tlbiwgcmVkaXJlY3RfdG8sIHZlcmlmaWNhdGlvbl90eXBlIH0gPSBkYXRhLCByZXN0ID0gX19yZXN0KGRhdGEsIFtcImFjdGlvbl9saW5rXCIsIFwiZW1haWxfb3RwXCIsIFwiaGFzaGVkX3Rva2VuXCIsIFwicmVkaXJlY3RfdG9cIiwgXCJ2ZXJpZmljYXRpb25fdHlwZVwiXSk7XG4gICAgY29uc3QgcHJvcGVydGllcyA9IHtcbiAgICAgICAgYWN0aW9uX2xpbmssXG4gICAgICAgIGVtYWlsX290cCxcbiAgICAgICAgaGFzaGVkX3Rva2VuLFxuICAgICAgICByZWRpcmVjdF90byxcbiAgICAgICAgdmVyaWZpY2F0aW9uX3R5cGUsXG4gICAgfTtcbiAgICBjb25zdCB1c2VyID0gT2JqZWN0LmFzc2lnbih7fSwgcmVzdCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcHJvcGVydGllcyxcbiAgICAgICAgICAgIHVzZXIsXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gX25vUmVzb2x2ZUpzb25SZXNwb25zZShkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIGhhc1Nlc3Npb24gY2hlY2tzIGlmIHRoZSByZXNwb25zZSBvYmplY3QgY29udGFpbnMgYSB2YWxpZCBzZXNzaW9uXG4gKiBAcGFyYW0gZGF0YSBBIHJlc3BvbnNlIG9iamVjdFxuICogQHJldHVybnMgdHJ1ZSBpZiBhIHNlc3Npb24gaXMgaW4gdGhlIHJlc3BvbnNlXG4gKi9cbmZ1bmN0aW9uIGhhc1Nlc3Npb24oZGF0YSkge1xuICAgIHJldHVybiBkYXRhLmFjY2Vzc190b2tlbiAmJiBkYXRhLnJlZnJlc2hfdG9rZW4gJiYgZGF0YS5leHBpcmVzX2luO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmV0Y2guanMubWFwIiwiaW1wb3J0IHsgQVBJX1ZFUlNJT05fSEVBREVSX05BTUUsIEJBU0U2NFVSTF9SRUdFWCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IEF1dGhJbnZhbGlkSnd0RXJyb3IgfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQgeyBiYXNlNjRVcmxUb1VpbnQ4QXJyYXksIHN0cmluZ0Zyb21CYXNlNjRVUkwgfSBmcm9tICcuL2Jhc2U2NHVybCc7XG5leHBvcnQgZnVuY3Rpb24gZXhwaXJlc0F0KGV4cGlyZXNJbikge1xuICAgIGNvbnN0IHRpbWVOb3cgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICByZXR1cm4gdGltZU5vdyArIGV4cGlyZXNJbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGNvbnN0IHIgPSAoTWF0aC5yYW5kb20oKSAqIDE2KSB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MykgfCAweDg7XG4gICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXIgPSAoKSA9PiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuY29uc3QgbG9jYWxTdG9yYWdlV3JpdGVUZXN0cyA9IHtcbiAgICB0ZXN0ZWQ6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbn07XG4vKipcbiAqIENoZWNrcyB3aGV0aGVyIGxvY2FsU3RvcmFnZSBpcyBzdXBwb3J0ZWQgb24gdGhpcyBicm93c2VyLlxuICovXG5leHBvcnQgY29uc3Qgc3VwcG9ydHNMb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgaWYgKCFpc0Jyb3dzZXIoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRE9NIGV4Y2VwdGlvbiB3aGVuIGFjY2Vzc2luZyBgbG9jYWxTdG9yYWdlYFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzLnRlc3RlZCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlV3JpdGVUZXN0cy53cml0YWJsZTtcbiAgICB9XG4gICAgY29uc3QgcmFuZG9tS2V5ID0gYGxzd3QtJHtNYXRoLnJhbmRvbSgpfSR7TWF0aC5yYW5kb20oKX1gO1xuICAgIHRyeSB7XG4gICAgICAgIGdsb2JhbFRoaXMubG9jYWxTdG9yYWdlLnNldEl0ZW0ocmFuZG9tS2V5LCByYW5kb21LZXkpO1xuICAgICAgICBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHJhbmRvbUtleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZVdyaXRlVGVzdHMudGVzdGVkID0gdHJ1ZTtcbiAgICAgICAgbG9jYWxTdG9yYWdlV3JpdGVUZXN0cy53cml0YWJsZSA9IHRydWU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGxvY2FsU3RvcmFnZSBjYW4ndCBiZSB3cml0dGVuIHRvXG4gICAgICAgIC8vIGh0dHBzOi8vd3d3LmNocm9taXVtLm9yZy9mb3ItdGVzdGVycy9idWctcmVwb3J0aW5nLWd1aWRlbGluZXMvdW5jYXVnaHQtc2VjdXJpdHllcnJvci1mYWlsZWQtdG8tcmVhZC10aGUtbG9jYWxzdG9yYWdlLXByb3BlcnR5LWZyb20td2luZG93LWFjY2Vzcy1pcy1kZW5pZWQtZm9yLXRoaXMtZG9jdW1lbnRcbiAgICAgICAgbG9jYWxTdG9yYWdlV3JpdGVUZXN0cy50ZXN0ZWQgPSB0cnVlO1xuICAgICAgICBsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzLndyaXRhYmxlO1xufTtcbi8qKlxuICogRXh0cmFjdHMgcGFyYW1ldGVycyBlbmNvZGVkIGluIHRoZSBVUkwgYm90aCBpbiB0aGUgcXVlcnkgYW5kIGZyYWdtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VQYXJhbWV0ZXJzRnJvbVVSTChocmVmKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChocmVmKTtcbiAgICBpZiAodXJsLmhhc2ggJiYgdXJsLmhhc2hbMF0gPT09ICcjJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgaGFzaFNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsLmhhc2guc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgICAgIGhhc2hTZWFyY2hQYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gaGFzaCBpcyBub3QgYSBxdWVyeSBzdHJpbmdcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBzZWFyY2ggcGFyYW1ldGVycyB0YWtlIHByZWNlZGVuY2Ugb3ZlciBoYXNoIHBhcmFtZXRlcnNcbiAgICB1cmwuc2VhcmNoUGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGNvbnN0IHJlc29sdmVGZXRjaCA9IChjdXN0b21GZXRjaCkgPT4ge1xuICAgIGxldCBfZmV0Y2g7XG4gICAgaWYgKGN1c3RvbUZldGNoKSB7XG4gICAgICAgIF9mZXRjaCA9IGN1c3RvbUZldGNoO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZmV0Y2ggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIF9mZXRjaCA9ICguLi5hcmdzKSA9PiBpbXBvcnQoJ0BzdXBhYmFzZS9ub2RlLWZldGNoJykudGhlbigoeyBkZWZhdWx0OiBmZXRjaCB9KSA9PiBmZXRjaCguLi5hcmdzKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBfZmV0Y2goLi4uYXJncyk7XG59O1xuZXhwb3J0IGNvbnN0IGxvb2tzTGlrZUZldGNoUmVzcG9uc2UgPSAobWF5YmVSZXNwb25zZSkgPT4ge1xuICAgIHJldHVybiAodHlwZW9mIG1heWJlUmVzcG9uc2UgPT09ICdvYmplY3QnICYmXG4gICAgICAgIG1heWJlUmVzcG9uc2UgIT09IG51bGwgJiZcbiAgICAgICAgJ3N0YXR1cycgaW4gbWF5YmVSZXNwb25zZSAmJlxuICAgICAgICAnb2snIGluIG1heWJlUmVzcG9uc2UgJiZcbiAgICAgICAgJ2pzb24nIGluIG1heWJlUmVzcG9uc2UgJiZcbiAgICAgICAgdHlwZW9mIG1heWJlUmVzcG9uc2UuanNvbiA9PT0gJ2Z1bmN0aW9uJyk7XG59O1xuLy8gU3RvcmFnZSBoZWxwZXJzXG5leHBvcnQgY29uc3Qgc2V0SXRlbUFzeW5jID0gYXN5bmMgKHN0b3JhZ2UsIGtleSwgZGF0YSkgPT4ge1xuICAgIGF3YWl0IHN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbn07XG5leHBvcnQgY29uc3QgZ2V0SXRlbUFzeW5jID0gYXN5bmMgKHN0b3JhZ2UsIGtleSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgcmVtb3ZlSXRlbUFzeW5jID0gYXN5bmMgKHN0b3JhZ2UsIGtleSkgPT4ge1xuICAgIGF3YWl0IHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xufTtcbi8qKlxuICogQSBkZWZlcnJlZCByZXByZXNlbnRzIHNvbWUgYXN5bmNocm9ub3VzIHdvcmsgdGhhdCBpcyBub3QgeWV0IGZpbmlzaGVkLCB3aGljaFxuICogbWF5IG9yIG1heSBub3QgY3VsbWluYXRlIGluIGEgdmFsdWUuXG4gKiBUYWtlbiBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vbWlrZS1ub3J0aC90eXBlcy9ibG9iL21hc3Rlci9zcmMvYXN5bmMudHNcbiAqL1xuZXhwb3J0IGNsYXNzIERlZmVycmVkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHRyYS1zZW1pXG4gICAgICAgIDtcbiAgICAgICAgdGhpcy5wcm9taXNlID0gbmV3IERlZmVycmVkLnByb21pc2VDb25zdHJ1Y3RvcigocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXh0cmEtc2VtaVxuICAgICAgICAgICAgO1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5yZWplY3QgPSByZWo7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbkRlZmVycmVkLnByb21pc2VDb25zdHJ1Y3RvciA9IFByb21pc2U7XG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlSldUKHRva2VuKSB7XG4gICAgY29uc3QgcGFydHMgPSB0b2tlbi5zcGxpdCgnLicpO1xuICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF1dGhJbnZhbGlkSnd0RXJyb3IoJ0ludmFsaWQgSldUIHN0cnVjdHVyZScpO1xuICAgIH1cbiAgICAvLyBSZWdleCBjaGVja3MgZm9yIGJhc2U2NHVybCBmb3JtYXRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghQkFTRTY0VVJMX1JFR0VYLnRlc3QocGFydHNbaV0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRKd3RFcnJvcignSldUIG5vdCBpbiBiYXNlNjR1cmwgZm9ybWF0Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgLy8gdXNpbmcgYmFzZTY0dXJsIGxpYlxuICAgICAgICBoZWFkZXI6IEpTT04ucGFyc2Uoc3RyaW5nRnJvbUJhc2U2NFVSTChwYXJ0c1swXSkpLFxuICAgICAgICBwYXlsb2FkOiBKU09OLnBhcnNlKHN0cmluZ0Zyb21CYXNlNjRVUkwocGFydHNbMV0pKSxcbiAgICAgICAgc2lnbmF0dXJlOiBiYXNlNjRVcmxUb1VpbnQ4QXJyYXkocGFydHNbMl0pLFxuICAgICAgICByYXc6IHtcbiAgICAgICAgICAgIGhlYWRlcjogcGFydHNbMF0sXG4gICAgICAgICAgICBwYXlsb2FkOiBwYXJ0c1sxXSxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBkYXRhO1xufVxuLyoqXG4gKiBDcmVhdGVzIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIG51bGwgYWZ0ZXIgc29tZSB0aW1lLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgoYWNjZXB0KSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYWNjZXB0KG51bGwpLCB0aW1lKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ29udmVydHMgdGhlIHByb3ZpZGVkIGFzeW5jIGZ1bmN0aW9uIGludG8gYSByZXRyeWFibGUgZnVuY3Rpb24uIEVhY2ggcmVzdWx0XG4gKiBvciB0aHJvd24gZXJyb3IgaXMgc2VudCB0byB0aGUgaXNSZXRyeWFibGUgZnVuY3Rpb24gd2hpY2ggc2hvdWxkIHJldHVybiB0cnVlXG4gKiBpZiB0aGUgZnVuY3Rpb24gc2hvdWxkIHJ1biBhZ2Fpbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJldHJ5YWJsZShmbiwgaXNSZXRyeWFibGUpIHtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKGFjY2VwdCwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXh0cmEtc2VtaVxuICAgICAgICA7XG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBhdHRlbXB0ID0gMDsgYXR0ZW1wdCA8IEluZmluaXR5OyBhdHRlbXB0KyspIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmbihhdHRlbXB0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1JldHJ5YWJsZShhdHRlbXB0LCBudWxsLCByZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzUmV0cnlhYmxlKGF0dGVtcHQsIGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBkZWMyaGV4KGRlYykge1xuICAgIHJldHVybiAoJzAnICsgZGVjLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKTtcbn1cbi8vIEZ1bmN0aW9ucyBiZWxvdyB0YWtlbiBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MzMwOTQwOS9jcmVhdGluZy1hLWNvZGUtdmVyaWZpZXItYW5kLWNoYWxsZW5nZS1mb3ItcGtjZS1hdXRoLW9uLXNwb3RpZnktYXBpLWluLXJlYWN0anNcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBLQ0VWZXJpZmllcigpIHtcbiAgICBjb25zdCB2ZXJpZmllckxlbmd0aCA9IDU2O1xuICAgIGNvbnN0IGFycmF5ID0gbmV3IFVpbnQzMkFycmF5KHZlcmlmaWVyTGVuZ3RoKTtcbiAgICBpZiAodHlwZW9mIGNyeXB0byA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc3QgY2hhclNldCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OS0uX34nO1xuICAgICAgICBjb25zdCBjaGFyU2V0TGVuID0gY2hhclNldC5sZW5ndGg7XG4gICAgICAgIGxldCB2ZXJpZmllciA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcmlmaWVyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZlcmlmaWVyICs9IGNoYXJTZXQuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJTZXRMZW4pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmVyaWZpZXI7XG4gICAgfVxuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYXJyYXkpO1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFycmF5LCBkZWMyaGV4KS5qb2luKCcnKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNoYTI1NihyYW5kb21TdHJpbmcpIHtcbiAgICBjb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgY29uc3QgZW5jb2RlZERhdGEgPSBlbmNvZGVyLmVuY29kZShyYW5kb21TdHJpbmcpO1xuICAgIGNvbnN0IGhhc2ggPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdCgnU0hBLTI1NicsIGVuY29kZWREYXRhKTtcbiAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGhhc2gpO1xuICAgIHJldHVybiBBcnJheS5mcm9tKGJ5dGVzKVxuICAgICAgICAubWFwKChjKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpKVxuICAgICAgICAuam9pbignJyk7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVQS0NFQ2hhbGxlbmdlKHZlcmlmaWVyKSB7XG4gICAgY29uc3QgaGFzQ3J5cHRvU3VwcG9ydCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBjcnlwdG8uc3VidGxlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2YgVGV4dEVuY29kZXIgIT09ICd1bmRlZmluZWQnO1xuICAgIGlmICghaGFzQ3J5cHRvU3VwcG9ydCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1dlYkNyeXB0byBBUEkgaXMgbm90IHN1cHBvcnRlZC4gQ29kZSBjaGFsbGVuZ2UgbWV0aG9kIHdpbGwgZGVmYXVsdCB0byB1c2UgcGxhaW4gaW5zdGVhZCBvZiBzaGEyNTYuJyk7XG4gICAgICAgIHJldHVybiB2ZXJpZmllcjtcbiAgICB9XG4gICAgY29uc3QgaGFzaGVkID0gYXdhaXQgc2hhMjU2KHZlcmlmaWVyKTtcbiAgICByZXR1cm4gYnRvYShoYXNoZWQpLnJlcGxhY2UoL1xcKy9nLCAnLScpLnJlcGxhY2UoL1xcLy9nLCAnXycpLnJlcGxhY2UoLz0rJC8sICcnKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDb2RlQ2hhbGxlbmdlQW5kTWV0aG9kKHN0b3JhZ2UsIHN0b3JhZ2VLZXksIGlzUGFzc3dvcmRSZWNvdmVyeSA9IGZhbHNlKSB7XG4gICAgY29uc3QgY29kZVZlcmlmaWVyID0gZ2VuZXJhdGVQS0NFVmVyaWZpZXIoKTtcbiAgICBsZXQgc3RvcmVkQ29kZVZlcmlmaWVyID0gY29kZVZlcmlmaWVyO1xuICAgIGlmIChpc1Bhc3N3b3JkUmVjb3ZlcnkpIHtcbiAgICAgICAgc3RvcmVkQ29kZVZlcmlmaWVyICs9ICcvUEFTU1dPUkRfUkVDT1ZFUlknO1xuICAgIH1cbiAgICBhd2FpdCBzZXRJdGVtQXN5bmMoc3RvcmFnZSwgYCR7c3RvcmFnZUtleX0tY29kZS12ZXJpZmllcmAsIHN0b3JlZENvZGVWZXJpZmllcik7XG4gICAgY29uc3QgY29kZUNoYWxsZW5nZSA9IGF3YWl0IGdlbmVyYXRlUEtDRUNoYWxsZW5nZShjb2RlVmVyaWZpZXIpO1xuICAgIGNvbnN0IGNvZGVDaGFsbGVuZ2VNZXRob2QgPSBjb2RlVmVyaWZpZXIgPT09IGNvZGVDaGFsbGVuZ2UgPyAncGxhaW4nIDogJ3MyNTYnO1xuICAgIHJldHVybiBbY29kZUNoYWxsZW5nZSwgY29kZUNoYWxsZW5nZU1ldGhvZF07XG59XG4vKiogUGFyc2VzIHRoZSBBUEkgdmVyc2lvbiB3aGljaCBpcyAyWVlZLU1NLURELiAqL1xuY29uc3QgQVBJX1ZFUlNJT05fUkVHRVggPSAvXjJbMC05XXszfS0oMFsxLTldfDFbMC0yXSktKDBbMS05XXwxWzAtOV18MlswLTldfDNbMC0xXSkkL2k7XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VSZXNwb25zZUFQSVZlcnNpb24ocmVzcG9uc2UpIHtcbiAgICBjb25zdCBhcGlWZXJzaW9uID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoQVBJX1ZFUlNJT05fSEVBREVSX05BTUUpO1xuICAgIGlmICghYXBpVmVyc2lvbikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKCFhcGlWZXJzaW9uLm1hdGNoKEFQSV9WRVJTSU9OX1JFR0VYKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGAke2FwaVZlcnNpb259VDAwOjAwOjAwLjBaYCk7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVFeHAoZXhwKSB7XG4gICAgaWYgKCFleHApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGV4cCBjbGFpbScpO1xuICAgIH1cbiAgICBjb25zdCB0aW1lTm93ID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgaWYgKGV4cCA8PSB0aW1lTm93KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSldUIGhhcyBleHBpcmVkJyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsZ29yaXRobShhbGcpIHtcbiAgICBzd2l0Y2ggKGFsZykge1xuICAgICAgICBjYXNlICdSUzI1Nic6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdSU0FTU0EtUEtDUzEtdjFfNScsXG4gICAgICAgICAgICAgICAgaGFzaDogeyBuYW1lOiAnU0hBLTI1NicgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgJ0VTMjU2JzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ0VDRFNBJyxcbiAgICAgICAgICAgICAgICBuYW1lZEN1cnZlOiAnUC0yNTYnLFxuICAgICAgICAgICAgICAgIGhhc2g6IHsgbmFtZTogJ1NIQS0yNTYnIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFsZyBjbGFpbScpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlcnMuanMubWFwIiwiaW1wb3J0IHsgc3VwcG9ydHNMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL2hlbHBlcnMnO1xuLyoqXG4gKiBQcm92aWRlcyBzYWZlIGFjY2VzcyB0byB0aGUgZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2UgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBjb25zdCBsb2NhbFN0b3JhZ2VBZGFwdGVyID0ge1xuICAgIGdldEl0ZW06IChrZXkpID0+IHtcbiAgICAgICAgaWYgKCFzdXBwb3J0c0xvY2FsU3RvcmFnZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgIH0sXG4gICAgc2V0SXRlbTogKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKCFzdXBwb3J0c0xvY2FsU3RvcmFnZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICB9LFxuICAgIHJlbW92ZUl0ZW06IChrZXkpID0+IHtcbiAgICAgICAgaWYgKCFzdXBwb3J0c0xvY2FsU3RvcmFnZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH0sXG59O1xuLyoqXG4gKiBSZXR1cm5zIGEgbG9jYWxTdG9yYWdlLWxpa2Ugb2JqZWN0IHRoYXQgc3RvcmVzIHRoZSBrZXktdmFsdWUgcGFpcnMgaW5cbiAqIG1lbW9yeS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lbW9yeUxvY2FsU3RvcmFnZUFkYXB0ZXIoc3RvcmUgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldEl0ZW06IChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdG9yZVtrZXldIHx8IG51bGw7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEl0ZW06IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBzdG9yZVtrZXldID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZUl0ZW06IChrZXkpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSBzdG9yZVtrZXldO1xuICAgICAgICB9LFxuICAgIH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2NhbC1zdG9yYWdlLmpzLm1hcCIsImltcG9ydCB7IHN1cHBvcnRzTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9oZWxwZXJzJztcbi8qKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY29uc3QgaW50ZXJuYWxzID0ge1xuICAgIC8qKlxuICAgICAqIEBleHBlcmltZW50YWxcbiAgICAgKi9cbiAgICBkZWJ1ZzogISEoZ2xvYmFsVGhpcyAmJlxuICAgICAgICBzdXBwb3J0c0xvY2FsU3RvcmFnZSgpICYmXG4gICAgICAgIGdsb2JhbFRoaXMubG9jYWxTdG9yYWdlICYmXG4gICAgICAgIGdsb2JhbFRoaXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N1cGFiYXNlLmdvdHJ1ZS1qcy5sb2Nrcy5kZWJ1ZycpID09PSAndHJ1ZScpLFxufTtcbi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gYSBsb2NrIGNhbm5vdCBiZSBhY3F1aXJlZCBhZnRlciBzb21lIGFtb3VudCBvZiB0aW1lLlxuICpcbiAqIFVzZSB0aGUge0BsaW5rICNpc0FjcXVpcmVUaW1lb3V0fSBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGNoZWNraW5nIHdpdGggYGluc3RhbmNlb2ZgLlxuICovXG5leHBvcnQgY2xhc3MgTG9ja0FjcXVpcmVUaW1lb3V0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5pc0FjcXVpcmVUaW1lb3V0ID0gdHJ1ZTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgTmF2aWdhdG9yTG9ja0FjcXVpcmVUaW1lb3V0RXJyb3IgZXh0ZW5kcyBMb2NrQWNxdWlyZVRpbWVvdXRFcnJvciB7XG59XG5leHBvcnQgY2xhc3MgUHJvY2Vzc0xvY2tBY3F1aXJlVGltZW91dEVycm9yIGV4dGVuZHMgTG9ja0FjcXVpcmVUaW1lb3V0RXJyb3Ige1xufVxuLyoqXG4gKiBJbXBsZW1lbnRzIGEgZ2xvYmFsIGV4Y2x1c2l2ZSBsb2NrIHVzaW5nIHRoZSBOYXZpZ2F0b3IgTG9ja01hbmFnZXIgQVBJLiBJdFxuICogaXMgYXZhaWxhYmxlIG9uIGFsbCBicm93c2VycyByZWxlYXNlZCBhZnRlciAyMDIyLTAzLTE1IHdpdGggU2FmYXJpIGJlaW5nIHRoZVxuICogbGFzdCBvbmUgdG8gcmVsZWFzZSBzdXBwb3J0LiBJZiB0aGUgQVBJIGlzIG5vdCBhdmFpbGFibGUsIHRoaXMgZnVuY3Rpb24gd2lsbFxuICogdGhyb3cuIE1ha2Ugc3VyZSB5b3UgY2hlY2sgYXZhaWxhYmxpbGl0eSBiZWZvcmUgY29uZmlndXJpbmcge0BsaW5rXG4gKiBHb1RydWVDbGllbnR9LlxuICpcbiAqIFlvdSBjYW4gdHVybiBvbiBkZWJ1Z2dpbmcgYnkgc2V0dGluZyB0aGUgYHN1cGFiYXNlLmdvdHJ1ZS1qcy5sb2Nrcy5kZWJ1Z2BcbiAqIGxvY2FsIHN0b3JhZ2UgaXRlbSB0byBgdHJ1ZWAuXG4gKlxuICogSW50ZXJuYWxzOlxuICpcbiAqIFNpbmNlIHRoZSBMb2NrTWFuYWdlciBBUEkgZG9lcyBub3QgcHJlc2VydmUgc3RhY2sgdHJhY2VzIGZvciB0aGUgYXN5bmNcbiAqIGZ1bmN0aW9uIHBhc3NlZCBpbiB0aGUgYHJlcXVlc3RgIG1ldGhvZCwgYSB0cmljayBpcyB1c2VkIHdoZXJlIGFjcXVpcmluZyB0aGVcbiAqIGxvY2sgcmVsZWFzZXMgYSBwcmV2aW91c2x5IHN0YXJ0ZWQgcHJvbWlzZSB0byBydW4gdGhlIG9wZXJhdGlvbiBpbiB0aGUgYGZuYFxuICogZnVuY3Rpb24uIFRoZSBsb2NrIHdhaXRzIGZvciB0aGF0IHByb21pc2UgdG8gZmluaXNoICh3aXRoIG9yIHdpdGhvdXQgZXJyb3IpLFxuICogd2hpbGUgdGhlIGZ1bmN0aW9uIHdpbGwgZmluYWxseSB3YWl0IGZvciB0aGUgcmVzdWx0IGFueXdheS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBsb2NrIHRvIGJlIGFjcXVpcmVkLlxuICogQHBhcmFtIGFjcXVpcmVUaW1lb3V0IElmIG5lZ2F0aXZlLCBubyB0aW1lb3V0LiBJZiAwIGFuIGVycm9yIGlzIHRocm93biBpZlxuICogICAgICAgICAgICAgICAgICAgICAgIHRoZSBsb2NrIGNhbid0IGJlIGFjcXVpcmVkIHdpdGhvdXQgd2FpdGluZy4gSWYgcG9zaXRpdmUsIHRoZSBsb2NrIGFjcXVpcmVcbiAqICAgICAgICAgICAgICAgICAgICAgICB3aWxsIHRpbWUgb3V0IGFmdGVyIHNvIG1hbnkgbWlsbGlzZWNvbmRzLiBBbiBlcnJvciBpc1xuICogICAgICAgICAgICAgICAgICAgICAgIGEgdGltZW91dCBpZiBpdCBoYXMgYGlzQWNxdWlyZVRpbWVvdXRgIHNldCB0byB0cnVlLlxuICogQHBhcmFtIGZuIFRoZSBvcGVyYXRpb24gdG8gcnVuIG9uY2UgdGhlIGxvY2sgaXMgYWNxdWlyZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBuYXZpZ2F0b3JMb2NrKG5hbWUsIGFjcXVpcmVUaW1lb3V0LCBmbikge1xuICAgIGlmIChpbnRlcm5hbHMuZGVidWcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0BzdXBhYmFzZS9nb3RydWUtanM6IG5hdmlnYXRvckxvY2s6IGFjcXVpcmUgbG9jaycsIG5hbWUsIGFjcXVpcmVUaW1lb3V0KTtcbiAgICB9XG4gICAgY29uc3QgYWJvcnRDb250cm9sbGVyID0gbmV3IGdsb2JhbFRoaXMuQWJvcnRDb250cm9sbGVyKCk7XG4gICAgaWYgKGFjcXVpcmVUaW1lb3V0ID4gMCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICAgICAgaWYgKGludGVybmFscy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdAc3VwYWJhc2UvZ290cnVlLWpzOiBuYXZpZ2F0b3JMb2NrIGFjcXVpcmUgdGltZWQgb3V0JywgbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGFjcXVpcmVUaW1lb3V0KTtcbiAgICB9XG4gICAgLy8gTUROIGFydGljbGU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Mb2NrTWFuYWdlci9yZXF1ZXN0XG4gICAgLy8gV3JhcHBpbmcgbmF2aWdhdG9yLmxvY2tzLnJlcXVlc3QoKSB3aXRoIGEgcGxhaW4gUHJvbWlzZSBpcyBkb25lIGFzIHNvbWVcbiAgICAvLyBsaWJyYXJpZXMgbGlrZSB6b25lLmpzIHBhdGNoIHRoZSBQcm9taXNlIG9iamVjdCB0byB0cmFjayB0aGUgZXhlY3V0aW9uXG4gICAgLy8gY29udGV4dC4gSG93ZXZlciwgaXQgYXBwZWFycyB0aGF0IG1vc3QgYnJvd3NlcnMgdXNlIGFuIGludGVybmFsIHByb21pc2VcbiAgICAvLyBpbXBsZW1lbnRhdGlvbiB3aGVuIHVzaW5nIHRoZSBuYXZpZ2F0b3IubG9ja3MucmVxdWVzdCgpIEFQSSBjYXVzaW5nIHRoZW1cbiAgICAvLyB0byBsb3NlIGNvbnRleHQgYW5kIGVtaXQgY29uZnVzaW5nIGxvZyBtZXNzYWdlcyBvciBicmVhayBjZXJ0YWluIGZlYXR1cmVzLlxuICAgIC8vIFRoaXMgd3JhcHBpbmcgaXMgYmVsaWV2ZWQgdG8gaGVscCB6b25lLmpzIHRyYWNrIHRoZSBleGVjdXRpb24gY29udGV4dFxuICAgIC8vIGJldHRlci5cbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiBnbG9iYWxUaGlzLm5hdmlnYXRvci5sb2Nrcy5yZXF1ZXN0KG5hbWUsIGFjcXVpcmVUaW1lb3V0ID09PSAwXG4gICAgICAgID8ge1xuICAgICAgICAgICAgbW9kZTogJ2V4Y2x1c2l2ZScsXG4gICAgICAgICAgICBpZkF2YWlsYWJsZTogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIG1vZGU6ICdleGNsdXNpdmUnLFxuICAgICAgICAgICAgc2lnbmFsOiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9LCBhc3luYyAobG9jaykgPT4ge1xuICAgICAgICBpZiAobG9jaykge1xuICAgICAgICAgICAgaWYgKGludGVybmFscy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdAc3VwYWJhc2UvZ290cnVlLWpzOiBuYXZpZ2F0b3JMb2NrOiBhY3F1aXJlZCcsIG5hbWUsIGxvY2submFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKGludGVybmFscy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQHN1cGFiYXNlL2dvdHJ1ZS1qczogbmF2aWdhdG9yTG9jazogcmVsZWFzZWQnLCBuYW1lLCBsb2NrLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhY3F1aXJlVGltZW91dCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcm5hbHMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0BzdXBhYmFzZS9nb3RydWUtanM6IG5hdmlnYXRvckxvY2s6IG5vdCBpbW1lZGlhdGVseSBhdmFpbGFibGUnLCBuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5hdmlnYXRvckxvY2tBY3F1aXJlVGltZW91dEVycm9yKGBBY3F1aXJpbmcgYW4gZXhjbHVzaXZlIE5hdmlnYXRvciBMb2NrTWFuYWdlciBsb2NrIFwiJHtuYW1lfVwiIGltbWVkaWF0ZWx5IGZhaWxlZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGludGVybmFscy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2xvYmFsVGhpcy5uYXZpZ2F0b3IubG9ja3MucXVlcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdAc3VwYWJhc2UvZ290cnVlLWpzOiBOYXZpZ2F0b3IgTG9ja01hbmFnZXIgc3RhdGUnLCBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsICcgICcpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdAc3VwYWJhc2UvZ290cnVlLWpzOiBFcnJvciB3aGVuIHF1ZXJ5aW5nIE5hdmlnYXRvciBMb2NrTWFuYWdlciBzdGF0ZScsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEJyb3dzZXIgaXMgbm90IGZvbGxvd2luZyB0aGUgTmF2aWdhdG9yIExvY2tNYW5hZ2VyIHNwZWMsIGl0XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuZWQgYSBudWxsIGxvY2sgd2hlbiB3ZSBkaWRuJ3QgdXNlIGlmQXZhaWxhYmxlLiBTbyB3ZSBjYW5cbiAgICAgICAgICAgICAgICAvLyBwcmV0ZW5kIHRoZSBsb2NrIGlzIGFjcXVpcmVkIGluIHRoZSBuYW1lIG9mIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgICAgICAvLyBhbmQgdXNlciBleHBlcmllbmNlIGFuZCBqdXN0IHJ1biB0aGUgZnVuY3Rpb24uXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdAc3VwYWJhc2UvZ290cnVlLWpzOiBOYXZpZ2F0b3IgTG9ja01hbmFnZXIgcmV0dXJuZWQgYSBudWxsIGxvY2sgd2hlbiB1c2luZyAjcmVxdWVzdCB3aXRob3V0IGlmQXZhaWxhYmxlIHNldCB0byB0cnVlLCBpdCBhcHBlYXJzIHRoaXMgYnJvd3NlciBpcyBub3QgZm9sbG93aW5nIHRoZSBMb2NrTWFuYWdlciBzcGVjIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Mb2NrTWFuYWdlci9yZXF1ZXN0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSk7XG59XG5jb25zdCBQUk9DRVNTX0xPQ0tTID0ge307XG4vKipcbiAqIEltcGxlbWVudHMgYSBnbG9iYWwgZXhjbHVzaXZlIGxvY2sgdGhhdCB3b3JrcyBvbmx5IGluIHRoZSBjdXJyZW50IHByb2Nlc3MuXG4gKiBVc2VmdWwgZm9yIGVudmlyb25tZW50cyBsaWtlIFJlYWN0IE5hdGl2ZSBvciBvdGhlciBub24tYnJvd3NlclxuICogc2luZ2xlLXByb2Nlc3MgKGkuZS4gbm8gY29uY2VwdCBvZiBcInRhYnNcIikgZW52aXJvbm1lbnRzLlxuICpcbiAqIFVzZSB7QGxpbmsgI25hdmlnYXRvckxvY2t9IGluIGJyb3dzZXIgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGxvY2sgdG8gYmUgYWNxdWlyZWQuXG4gKiBAcGFyYW0gYWNxdWlyZVRpbWVvdXQgSWYgbmVnYXRpdmUsIG5vIHRpbWVvdXQuIElmIDAgYW4gZXJyb3IgaXMgdGhyb3duIGlmXG4gKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGxvY2sgY2FuJ3QgYmUgYWNxdWlyZWQgd2l0aG91dCB3YWl0aW5nLiBJZiBwb3NpdGl2ZSwgdGhlIGxvY2sgYWNxdWlyZVxuICogICAgICAgICAgICAgICAgICAgICAgIHdpbGwgdGltZSBvdXQgYWZ0ZXIgc28gbWFueSBtaWxsaXNlY29uZHMuIEFuIGVycm9yIGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgYSB0aW1lb3V0IGlmIGl0IGhhcyBgaXNBY3F1aXJlVGltZW91dGAgc2V0IHRvIHRydWUuXG4gKiBAcGFyYW0gZm4gVGhlIG9wZXJhdGlvbiB0byBydW4gb25jZSB0aGUgbG9jayBpcyBhY3F1aXJlZC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NMb2NrKG5hbWUsIGFjcXVpcmVUaW1lb3V0LCBmbikge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBwcmV2aW91c09wZXJhdGlvbiA9IChfYSA9IFBST0NFU1NfTE9DS1NbbmFtZV0pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGNvbnN0IGN1cnJlbnRPcGVyYXRpb24gPSBQcm9taXNlLnJhY2UoW1xuICAgICAgICBwcmV2aW91c09wZXJhdGlvbi5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBpZ25vcmUgZXJyb3Igb2YgcHJldmlvdXMgb3BlcmF0aW9uIHRoYXQgd2UncmUgd2FpdGluZyB0byBmaW5pc2hcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KSxcbiAgICAgICAgYWNxdWlyZVRpbWVvdXQgPj0gMFxuICAgICAgICAgICAgPyBuZXcgUHJvbWlzZSgoXywgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgUHJvY2Vzc0xvY2tBY3F1aXJlVGltZW91dEVycm9yKGBBY3F1cmluZyBwcm9jZXNzIGxvY2sgd2l0aCBuYW1lIFwiJHtuYW1lfVwiIHRpbWVkIG91dGApKTtcbiAgICAgICAgICAgICAgICB9LCBhY3F1aXJlVGltZW91dCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBudWxsLFxuICAgIF0uZmlsdGVyKCh4KSA9PiB4KSlcbiAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgIGlmIChlICYmIGUuaXNBY3F1aXJlVGltZW91dCkge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9KVxuICAgICAgICAudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vIHByZXZpb3VzIG9wZXJhdGlvbnMgZmluaXNoZWQgYW5kIHdlIGRpZG4ndCBnZXQgYSByYWNlIG9uIHRoZSBhY3F1aXJlXG4gICAgICAgIC8vIHRpbWVvdXQsIHNvIHRoZSBjdXJyZW50IG9wZXJhdGlvbiBjYW4gZmluYWxseSBzdGFydFxuICAgICAgICByZXR1cm4gYXdhaXQgZm4oKTtcbiAgICB9KTtcbiAgICBQUk9DRVNTX0xPQ0tTW25hbWVdID0gY3VycmVudE9wZXJhdGlvbi5jYXRjaChhc3luYyAoZSkgPT4ge1xuICAgICAgICBpZiAoZSAmJiBlLmlzQWNxdWlyZVRpbWVvdXQpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IG9wZXJhdGlvbiB0aW1lZCBvdXQsIGl0IGRvZXNuJ3QgbWVhbiB0aGF0IHRoZSBwcmV2aW91c1xuICAgICAgICAgICAgLy8gb3BlcmF0aW9uIGZpbmlzaGVkLCBzbyB3ZSBuZWVkIGNvbnRudWUgd2FpdGluZyBmb3IgaXQgdG8gZmluaXNoXG4gICAgICAgICAgICBhd2FpdCBwcmV2aW91c09wZXJhdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGU7XG4gICAgfSk7XG4gICAgLy8gZmluYWxseSB3YWl0IGZvciB0aGUgY3VycmVudCBvcGVyYXRpb24gdG8gZmluaXNoIHN1Y2Nlc3NmdWxseSwgd2l0aCBhblxuICAgIC8vIGVycm9yIG9yIHdpdGggYW4gYWNxdWlyZSB0aW1lb3V0IGVycm9yXG4gICAgcmV0dXJuIGF3YWl0IGN1cnJlbnRPcGVyYXRpb247XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sb2Nrcy5qcy5tYXAiLCIvKipcbiAqIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9nbG9iYWx0aGlzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwb2x5ZmlsbEdsb2JhbFRoaXMoKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnX19tYWdpY19fJywge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAnQWxsb3cgYWNjZXNzIHRvIG1hZ2ljJ1xuICAgICAgICBfX21hZ2ljX18uZ2xvYmFsVGhpcyA9IF9fbWFnaWNfXztcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAnQWxsb3cgYWNjZXNzIHRvIG1hZ2ljJ1xuICAgICAgICBkZWxldGUgT2JqZWN0LnByb3RvdHlwZS5fX21hZ2ljX187XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgJ0FsbG93IGFjY2VzcyB0byBnbG9iYWxzJ1xuICAgICAgICAgICAgc2VsZi5nbG9iYWxUaGlzID0gc2VsZjtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvbHlmaWxscy5qcy5tYXAiLCJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJleHBvcnQgY29uc3QgdmVyc2lvbiA9ICcyLjY5LjEnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVyc2lvbi5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IHJlc29sdmVGZXRjaCB9IGZyb20gJy4vaGVscGVyJztcbmltcG9ydCB7IEZ1bmN0aW9uc0ZldGNoRXJyb3IsIEZ1bmN0aW9uc0h0dHBFcnJvciwgRnVuY3Rpb25zUmVsYXlFcnJvciwgRnVuY3Rpb25SZWdpb24sIH0gZnJvbSAnLi90eXBlcyc7XG5leHBvcnQgY2xhc3MgRnVuY3Rpb25zQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIHsgaGVhZGVycyA9IHt9LCBjdXN0b21GZXRjaCwgcmVnaW9uID0gRnVuY3Rpb25SZWdpb24uQW55LCB9ID0ge30pIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIHRoaXMucmVnaW9uID0gcmVnaW9uO1xuICAgICAgICB0aGlzLmZldGNoID0gcmVzb2x2ZUZldGNoKGN1c3RvbUZldGNoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgYXV0aG9yaXphdGlvbiBoZWFkZXJcbiAgICAgKiBAcGFyYW0gdG9rZW4gLSB0aGUgbmV3IGp3dCB0b2tlbiBzZW50IGluIHRoZSBhdXRob3Jpc2F0aW9uIGhlYWRlclxuICAgICAqL1xuICAgIHNldEF1dGgodG9rZW4pIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW52b2tlcyBhIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIGZ1bmN0aW9uTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBGdW5jdGlvbiB0byBpbnZva2UuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25zIGZvciBpbnZva2luZyB0aGUgRnVuY3Rpb24uXG4gICAgICovXG4gICAgaW52b2tlKGZ1bmN0aW9uTmFtZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBoZWFkZXJzLCBtZXRob2QsIGJvZHk6IGZ1bmN0aW9uQXJncyB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgICBsZXQgX2hlYWRlcnMgPSB7fTtcbiAgICAgICAgICAgICAgICBsZXQgeyByZWdpb24gfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWdpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uID0gdGhpcy5yZWdpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZWdpb24gJiYgcmVnaW9uICE9PSAnYW55Jykge1xuICAgICAgICAgICAgICAgICAgICBfaGVhZGVyc1sneC1yZWdpb24nXSA9IHJlZ2lvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKGZ1bmN0aW9uQXJncyAmJlxuICAgICAgICAgICAgICAgICAgICAoKGhlYWRlcnMgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoZWFkZXJzLCAnQ29udGVudC1UeXBlJykpIHx8ICFoZWFkZXJzKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBmdW5jdGlvbkFyZ3MgaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb25BcmdzIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgd29yayBmb3IgRmlsZSBhcyBGaWxlIGluaGVyaXRzIEJsb2JcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsc28gd29ya3MgZm9yIEFycmF5QnVmZmVyIGFzIGl0IGlzIHRoZSBzYW1lIHVuZGVybHlpbmcgc3RydWN0dXJlIGFzIGEgQmxvYlxuICAgICAgICAgICAgICAgICAgICAgICAgX2hlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gZnVuY3Rpb25BcmdzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmdW5jdGlvbkFyZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwbGFpbiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIF9oZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICd0ZXh0L3BsYWluJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgPSBmdW5jdGlvbkFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyAmJiBmdW5jdGlvbkFyZ3MgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2V0IGNvbnRlbnQtdHlwZSBoZWFkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXF1ZXN0IHdpbGwgYXV0b21hdGljYWxseSBhZGQgdGhlIHJpZ2h0IGJvdW5kYXJ5IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gZnVuY3Rpb25BcmdzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCwgYXNzdW1lIHRoaXMgaXMgSlNPTlxuICAgICAgICAgICAgICAgICAgICAgICAgX2hlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGZ1bmN0aW9uQXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCB0aGlzLmZldGNoKGAke3RoaXMudXJsfS8ke2Z1bmN0aW9uTmFtZX1gLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kIHx8ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVhZGVycyBwcmlvcml0eSBpcyAoaGlnaCB0byBsb3cpOlxuICAgICAgICAgICAgICAgICAgICAvLyAxLiBpbnZva2UtbGV2ZWwgaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAvLyAyLiBjbGllbnQtbGV2ZWwgaGVhZGVyc1xuICAgICAgICAgICAgICAgICAgICAvLyAzLiBkZWZhdWx0IENvbnRlbnQtVHlwZSBoZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIF9oZWFkZXJzKSwgdGhpcy5oZWFkZXJzKSwgaGVhZGVycyksXG4gICAgICAgICAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGZldGNoRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEZ1bmN0aW9uc0ZldGNoRXJyb3IoZmV0Y2hFcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNSZWxheUVycm9yID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ3gtcmVsYXktZXJyb3InKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNSZWxheUVycm9yICYmIGlzUmVsYXlFcnJvciA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBGdW5jdGlvbnNSZWxheUVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRnVuY3Rpb25zSHR0cEVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlVHlwZSA9ICgoX2EgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICd0ZXh0L3BsYWluJykuc3BsaXQoJzsnKVswXS50cmltKCk7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2VUeXBlID09PSAndGV4dC9ldmVudC1zdHJlYW0nKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2VUeXBlID09PSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHRvIHRleHRcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZ1bmN0aW9uc0NsaWVudC5qcy5tYXAiLCJleHBvcnQgY29uc3QgcmVzb2x2ZUZldGNoID0gKGN1c3RvbUZldGNoKSA9PiB7XG4gICAgbGV0IF9mZXRjaDtcbiAgICBpZiAoY3VzdG9tRmV0Y2gpIHtcbiAgICAgICAgX2ZldGNoID0gY3VzdG9tRmV0Y2g7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgX2ZldGNoID0gKC4uLmFyZ3MpID0+IGltcG9ydCgnQHN1cGFiYXNlL25vZGUtZmV0Y2gnKS50aGVuKCh7IGRlZmF1bHQ6IGZldGNoIH0pID0+IGZldGNoKC4uLmFyZ3MpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF9mZXRjaCA9IGZldGNoO1xuICAgIH1cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IF9mZXRjaCguLi5hcmdzKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oZWxwZXIuanMubWFwIiwiZXhwb3J0IGNsYXNzIEZ1bmN0aW9uc0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIG5hbWUgPSAnRnVuY3Rpb25zRXJyb3InLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbnNGZXRjaEVycm9yIGV4dGVuZHMgRnVuY3Rpb25zRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoJ0ZhaWxlZCB0byBzZW5kIGEgcmVxdWVzdCB0byB0aGUgRWRnZSBGdW5jdGlvbicsICdGdW5jdGlvbnNGZXRjaEVycm9yJywgY29udGV4dCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uc1JlbGF5RXJyb3IgZXh0ZW5kcyBGdW5jdGlvbnNFcnJvciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcignUmVsYXkgRXJyb3IgaW52b2tpbmcgdGhlIEVkZ2UgRnVuY3Rpb24nLCAnRnVuY3Rpb25zUmVsYXlFcnJvcicsIGNvbnRleHQpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbnNIdHRwRXJyb3IgZXh0ZW5kcyBGdW5jdGlvbnNFcnJvciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcignRWRnZSBGdW5jdGlvbiByZXR1cm5lZCBhIG5vbi0yeHggc3RhdHVzIGNvZGUnLCAnRnVuY3Rpb25zSHR0cEVycm9yJywgY29udGV4dCk7XG4gICAgfVxufVxuLy8gRGVmaW5lIHRoZSBlbnVtIGZvciB0aGUgJ3JlZ2lvbicgcHJvcGVydHlcbmV4cG9ydCB2YXIgRnVuY3Rpb25SZWdpb247XG4oZnVuY3Rpb24gKEZ1bmN0aW9uUmVnaW9uKSB7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJBbnlcIl0gPSBcImFueVwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiQXBOb3J0aGVhc3QxXCJdID0gXCJhcC1ub3J0aGVhc3QtMVwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiQXBOb3J0aGVhc3QyXCJdID0gXCJhcC1ub3J0aGVhc3QtMlwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiQXBTb3V0aDFcIl0gPSBcImFwLXNvdXRoLTFcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkFwU291dGhlYXN0MVwiXSA9IFwiYXAtc291dGhlYXN0LTFcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkFwU291dGhlYXN0MlwiXSA9IFwiYXAtc291dGhlYXN0LTJcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkNhQ2VudHJhbDFcIl0gPSBcImNhLWNlbnRyYWwtMVwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiRXVDZW50cmFsMVwiXSA9IFwiZXUtY2VudHJhbC0xXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJFdVdlc3QxXCJdID0gXCJldS13ZXN0LTFcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkV1V2VzdDJcIl0gPSBcImV1LXdlc3QtMlwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiRXVXZXN0M1wiXSA9IFwiZXUtd2VzdC0zXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJTYUVhc3QxXCJdID0gXCJzYS1lYXN0LTFcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIlVzRWFzdDFcIl0gPSBcInVzLWVhc3QtMVwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiVXNXZXN0MVwiXSA9IFwidXMtd2VzdC0xXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJVc1dlc3QyXCJdID0gXCJ1cy13ZXN0LTJcIjtcbn0pKEZ1bmN0aW9uUmVnaW9uIHx8IChGdW5jdGlvblJlZ2lvbiA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gcmVmOiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1nbG9iYWxcbnZhciBnZXRHbG9iYWwgPSBmdW5jdGlvbigpIHtcbiAgICAvLyB0aGUgb25seSByZWxpYWJsZSBtZWFucyB0byBnZXQgdGhlIGdsb2JhbCBvYmplY3QgaXNcbiAgICAvLyBgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKWBcbiAgICAvLyBIb3dldmVyLCB0aGlzIGNhdXNlcyBDU1AgdmlvbGF0aW9ucyBpbiBDaHJvbWUgYXBwcy5cbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBzZWxmOyB9XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiB3aW5kb3c7IH1cbiAgICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGdsb2JhbDsgfVxuICAgIHRocm93IG5ldyBFcnJvcigndW5hYmxlIHRvIGxvY2F0ZSBnbG9iYWwgb2JqZWN0Jyk7XG59XG5cbnZhciBnbG9iYWxPYmplY3QgPSBnZXRHbG9iYWwoKTtcblxuZXhwb3J0IGNvbnN0IGZldGNoID0gZ2xvYmFsT2JqZWN0LmZldGNoO1xuXG5leHBvcnQgZGVmYXVsdCBnbG9iYWxPYmplY3QuZmV0Y2guYmluZChnbG9iYWxPYmplY3QpO1xuXG5leHBvcnQgY29uc3QgSGVhZGVycyA9IGdsb2JhbE9iamVjdC5IZWFkZXJzO1xuZXhwb3J0IGNvbnN0IFJlcXVlc3QgPSBnbG9iYWxPYmplY3QuUmVxdWVzdDtcbmV4cG9ydCBjb25zdCBSZXNwb25zZSA9IGdsb2JhbE9iamVjdC5SZXNwb25zZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLy8gQHRzLWlnbm9yZVxuY29uc3Qgbm9kZV9mZXRjaF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJAc3VwYWJhc2Uvbm9kZS1mZXRjaFwiKSk7XG5jb25zdCBQb3N0Z3Jlc3RFcnJvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdEVycm9yXCIpKTtcbmNsYXNzIFBvc3RncmVzdEJ1aWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKGJ1aWxkZXIpIHtcbiAgICAgICAgdGhpcy5zaG91bGRUaHJvd09uRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBidWlsZGVyLm1ldGhvZDtcbiAgICAgICAgdGhpcy51cmwgPSBidWlsZGVyLnVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gYnVpbGRlci5oZWFkZXJzO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IGJ1aWxkZXIuc2NoZW1hO1xuICAgICAgICB0aGlzLmJvZHkgPSBidWlsZGVyLmJvZHk7XG4gICAgICAgIHRoaXMuc2hvdWxkVGhyb3dPbkVycm9yID0gYnVpbGRlci5zaG91bGRUaHJvd09uRXJyb3I7XG4gICAgICAgIHRoaXMuc2lnbmFsID0gYnVpbGRlci5zaWduYWw7XG4gICAgICAgIHRoaXMuaXNNYXliZVNpbmdsZSA9IGJ1aWxkZXIuaXNNYXliZVNpbmdsZTtcbiAgICAgICAgaWYgKGJ1aWxkZXIuZmV0Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2ggPSBidWlsZGVyLmZldGNoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2ggPSBub2RlX2ZldGNoXzEuZGVmYXVsdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmV0Y2ggPSBmZXRjaDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiB0aGVyZSdzIGFuIGVycm9yIHdpdGggdGhlIHF1ZXJ5LCB0aHJvd09uRXJyb3Igd2lsbCByZWplY3QgdGhlIHByb21pc2UgYnlcbiAgICAgKiB0aHJvd2luZyB0aGUgZXJyb3IgaW5zdGVhZCBvZiByZXR1cm5pbmcgaXQgYXMgcGFydCBvZiBhIHN1Y2Nlc3NmdWwgcmVzcG9uc2UuXG4gICAgICpcbiAgICAgKiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3N1cGFiYXNlLWpzL2lzc3Vlcy85Mn1cbiAgICAgKi9cbiAgICB0aHJvd09uRXJyb3IoKSB7XG4gICAgICAgIHRoaXMuc2hvdWxkVGhyb3dPbkVycm9yID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBhbiBIVFRQIGhlYWRlciBmb3IgdGhlIHJlcXVlc3QuXG4gICAgICovXG4gICAgc2V0SGVhZGVyKG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaGVhZGVycyk7XG4gICAgICAgIHRoaXMuaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCkge1xuICAgICAgICAvLyBodHRwczovL3Bvc3RncmVzdC5vcmcvZW4vc3RhYmxlL2FwaS5odG1sI3N3aXRjaGluZy1zY2hlbWFzXG4gICAgICAgIGlmICh0aGlzLnNjaGVtYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBza2lwXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoWydHRVQnLCAnSEVBRCddLmluY2x1ZGVzKHRoaXMubWV0aG9kKSkge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQtUHJvZmlsZSddID0gdGhpcy5zY2hlbWE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ0NvbnRlbnQtUHJvZmlsZSddID0gdGhpcy5zY2hlbWE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWV0aG9kICE9PSAnR0VUJyAmJiB0aGlzLm1ldGhvZCAhPT0gJ0hFQUQnKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5PVEU6IEludm9rZSB3L28gYHRoaXNgIHRvIGF2b2lkIGlsbGVnYWwgaW52b2NhdGlvbiBlcnJvci5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3Bvc3RncmVzdC1qcy9wdWxsLzI0N1xuICAgICAgICBjb25zdCBfZmV0Y2ggPSB0aGlzLmZldGNoO1xuICAgICAgICBsZXQgcmVzID0gX2ZldGNoKHRoaXMudXJsLnRvU3RyaW5nKCksIHtcbiAgICAgICAgICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0aGlzLmJvZHkpLFxuICAgICAgICAgICAgc2lnbmFsOiB0aGlzLnNpZ25hbCxcbiAgICAgICAgfSkudGhlbihhc3luYyAocmVzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgIGxldCBlcnJvciA9IG51bGw7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IG51bGw7XG4gICAgICAgICAgICBsZXQgY291bnQgPSBudWxsO1xuICAgICAgICAgICAgbGV0IHN0YXR1cyA9IHJlcy5zdGF0dXM7XG4gICAgICAgICAgICBsZXQgc3RhdHVzVGV4dCA9IHJlcy5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1ldGhvZCAhPT0gJ0hFQUQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXMudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm9keSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByZWZlcjogcmV0dXJuPW1pbmltYWxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID09PSAndGV4dC9jc3YnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gYm9keTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmhlYWRlcnNbJ0FjY2VwdCddICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddLmluY2x1ZGVzKCdhcHBsaWNhdGlvbi92bmQucGdyc3QucGxhbit0ZXh0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBib2R5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY291bnRIZWFkZXIgPSAoX2EgPSB0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWF0Y2goL2NvdW50PShleGFjdHxwbGFubmVkfGVzdGltYXRlZCkvKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50UmFuZ2UgPSAoX2IgPSByZXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtcmFuZ2UnKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50SGVhZGVyICYmIGNvbnRlbnRSYW5nZSAmJiBjb250ZW50UmFuZ2UubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IHBhcnNlSW50KGNvbnRlbnRSYW5nZVsxXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFRlbXBvcmFyeSBwYXJ0aWFsIGZpeCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3Bvc3RncmVzdC1qcy9pc3N1ZXMvMzYxXG4gICAgICAgICAgICAgICAgLy8gSXNzdWUgcGVyc2lzdHMgZS5nLiBmb3IgYC5pbnNlcnQoWy4uLl0pLnNlbGVjdCgpLm1heWJlU2luZ2xlKClgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNNYXliZVNpbmdsZSAmJiB0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgJiYgQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vUG9zdGdSRVNUL3Bvc3RncmVzdC9ibG9iL2E4NjdkNzljNDI0MTlhZjE2YzE4YzNmYjAxOWViYThkZjk5MjYyNmYvc3JjL1Bvc3RnUkVTVC9FcnJvci5ocyNMNTUzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogJ1BHUlNUMTE2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiBgUmVzdWx0cyBjb250YWluICR7ZGF0YS5sZW5ndGh9IHJvd3MsIGFwcGxpY2F0aW9uL3ZuZC5wZ3JzdC5vYmplY3QranNvbiByZXF1aXJlcyAxIHJvd2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGludDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnSlNPTiBvYmplY3QgcmVxdWVzdGVkLCBtdWx0aXBsZSAob3Igbm8pIHJvd3MgcmV0dXJuZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gNDA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9ICdOb3QgQWNjZXB0YWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzLnRleHQoKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBhYmFzZS9wb3N0Z3Jlc3QtanMvaXNzdWVzLzI5NVxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlcnJvcikgJiYgcmVzLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAyMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gJ09LJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoX2QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3Bvc3RncmVzdC1qcy9pc3N1ZXMvMjk1XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSA0MDQgJiYgYm9keSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDIwNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSAnTm8gQ29udGVudCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBib2R5LFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgdGhpcy5pc01heWJlU2luZ2xlICYmICgoX2MgPSBlcnJvciA9PT0gbnVsbCB8fCBlcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZXJyb3IuZGV0YWlscykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmluY2x1ZGVzKCcwIHJvd3MnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSAyMDA7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSAnT0snO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgdGhpcy5zaG91bGRUaHJvd09uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBvc3RncmVzdEVycm9yXzEuZGVmYXVsdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcG9zdGdyZXN0UmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgICBjb3VudCxcbiAgICAgICAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgICAgICAgc3RhdHVzVGV4dCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gcG9zdGdyZXN0UmVzcG9uc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkVGhyb3dPbkVycm9yKSB7XG4gICAgICAgICAgICByZXMgPSByZXMuY2F0Y2goKGZldGNoRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGAkeyhfYSA9IGZldGNoRXJyb3IgPT09IG51bGwgfHwgZmV0Y2hFcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmV0Y2hFcnJvci5uYW1lKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnRmV0Y2hFcnJvcid9OiAke2ZldGNoRXJyb3IgPT09IG51bGwgfHwgZmV0Y2hFcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmV0Y2hFcnJvci5tZXNzYWdlfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiBgJHsoX2IgPSBmZXRjaEVycm9yID09PSBudWxsIHx8IGZldGNoRXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZldGNoRXJyb3Iuc3RhY2spICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaW50OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGU6IGAkeyhfYyA9IGZldGNoRXJyb3IgPT09IG51bGwgfHwgZmV0Y2hFcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmV0Y2hFcnJvci5jb2RlKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiAnJ31gLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBjb3VudDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAwLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiAnJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXMudGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSB0eXBlIG9mIHRoZSByZXR1cm5lZCBgZGF0YWAuXG4gICAgICpcbiAgICAgKiBAdHlwZVBhcmFtIE5ld1Jlc3VsdCAtIFRoZSBuZXcgcmVzdWx0IHR5cGUgdG8gb3ZlcnJpZGUgd2l0aFxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBvdmVycmlkZVR5cGVzPHlvdXJUeXBlLCB7IG1lcmdlOiBmYWxzZSB9PigpIG1ldGhvZCBhdCB0aGUgZW5kIG9mIHlvdXIgY2FsbCBjaGFpbiBpbnN0ZWFkXG4gICAgICovXG4gICAgcmV0dXJucygpIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSB0eXBlIG9mIHRoZSByZXR1cm5lZCBgZGF0YWAgZmllbGQgaW4gdGhlIHJlc3BvbnNlLlxuICAgICAqXG4gICAgICogQHR5cGVQYXJhbSBOZXdSZXN1bHQgLSBUaGUgbmV3IHR5cGUgdG8gY2FzdCB0aGUgcmVzcG9uc2UgZGF0YSB0b1xuICAgICAqIEB0eXBlUGFyYW0gT3B0aW9ucyAtIE9wdGlvbmFsIHR5cGUgY29uZmlndXJhdGlvbiAoZGVmYXVsdHMgdG8geyBtZXJnZTogdHJ1ZSB9KVxuICAgICAqIEB0eXBlUGFyYW0gT3B0aW9ucy5tZXJnZSAtIFdoZW4gdHJ1ZSwgbWVyZ2VzIHRoZSBuZXcgdHlwZSB3aXRoIGV4aXN0aW5nIHJldHVybiB0eXBlLiBXaGVuIGZhbHNlLCByZXBsYWNlcyB0aGUgZXhpc3RpbmcgdHlwZXMgZW50aXJlbHkgKGRlZmF1bHRzIHRvIHRydWUpXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogLy8gTWVyZ2Ugd2l0aCBleGlzdGluZyB0eXBlcyAoZGVmYXVsdCBiZWhhdmlvcilcbiAgICAgKiBjb25zdCBxdWVyeSA9IHN1cGFiYXNlXG4gICAgICogICAuZnJvbSgndXNlcnMnKVxuICAgICAqICAgLnNlbGVjdCgpXG4gICAgICogICAub3ZlcnJpZGVUeXBlczx7IGN1c3RvbV9maWVsZDogc3RyaW5nIH0+KClcbiAgICAgKlxuICAgICAqIC8vIFJlcGxhY2UgZXhpc3RpbmcgdHlwZXMgY29tcGxldGVseVxuICAgICAqIGNvbnN0IHJlcGxhY2VRdWVyeSA9IHN1cGFiYXNlXG4gICAgICogICAuZnJvbSgndXNlcnMnKVxuICAgICAqICAgLnNlbGVjdCgpXG4gICAgICogICAub3ZlcnJpZGVUeXBlczx7IGlkOiBudW1iZXI7IG5hbWU6IHN0cmluZyB9LCB7IG1lcmdlOiBmYWxzZSB9PigpXG4gICAgICogYGBgXG4gICAgICogQHJldHVybnMgQSBQb3N0Z3Jlc3RCdWlsZGVyIGluc3RhbmNlIHdpdGggdGhlIG5ldyB0eXBlXG4gICAgICovXG4gICAgb3ZlcnJpZGVUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUG9zdGdyZXN0QnVpbGRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBvc3RncmVzdEJ1aWxkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RRdWVyeUJ1aWxkZXJcIikpO1xuY29uc3QgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdEZpbHRlckJ1aWxkZXJcIikpO1xuY29uc3QgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XG4vKipcbiAqIFBvc3RnUkVTVCBjbGllbnQuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRhYmFzZSAtIFR5cGVzIGZvciB0aGUgc2NoZW1hIGZyb20gdGhlIFt0eXBlXG4gKiBnZW5lcmF0b3JdKGh0dHBzOi8vc3VwYWJhc2UuY29tL2RvY3MvcmVmZXJlbmNlL2phdmFzY3JpcHQvbmV4dC90eXBlc2NyaXB0LXN1cHBvcnQpXG4gKlxuICogQHR5cGVQYXJhbSBTY2hlbWFOYW1lIC0gUG9zdGdyZXMgc2NoZW1hIHRvIHN3aXRjaCB0by4gTXVzdCBiZSBhIHN0cmluZ1xuICogbGl0ZXJhbCwgdGhlIHNhbWUgb25lIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IuIElmIHRoZSBzY2hlbWEgaXMgbm90XG4gKiBgXCJwdWJsaWNcImAsIHRoaXMgbXVzdCBiZSBzdXBwbGllZCBtYW51YWxseS5cbiAqL1xuY2xhc3MgUG9zdGdyZXN0Q2xpZW50IHtcbiAgICAvLyBUT0RPOiBBZGQgYmFjayBzaG91bGRUaHJvd09uRXJyb3Igb25jZSB3ZSBmaWd1cmUgb3V0IHRoZSB0eXBpbmdzXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFBvc3RnUkVTVCBjbGllbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdXJsIC0gVVJMIG9mIHRoZSBQb3N0Z1JFU1QgZW5kcG9pbnRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5oZWFkZXJzIC0gQ3VzdG9tIGhlYWRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5zY2hlbWEgLSBQb3N0Z3JlcyBzY2hlbWEgdG8gc3dpdGNoIHRvXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZmV0Y2ggLSBDdXN0b20gZmV0Y2hcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmwsIHsgaGVhZGVycyA9IHt9LCBzY2hlbWEsIGZldGNoLCB9ID0ge30pIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY29uc3RhbnRzXzEuREVGQVVMVF9IRUFERVJTKSwgaGVhZGVycyk7XG4gICAgICAgIHRoaXMuc2NoZW1hTmFtZSA9IHNjaGVtYTtcbiAgICAgICAgdGhpcy5mZXRjaCA9IGZldGNoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgcXVlcnkgb24gYSB0YWJsZSBvciBhIHZpZXcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVsYXRpb24gLSBUaGUgdGFibGUgb3IgdmlldyBuYW1lIHRvIHF1ZXJ5XG4gICAgICovXG4gICAgZnJvbShyZWxhdGlvbikge1xuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGAke3RoaXMudXJsfS8ke3JlbGF0aW9ufWApO1xuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdFF1ZXJ5QnVpbGRlcl8xLmRlZmF1bHQodXJsLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhlYWRlcnMpLFxuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYU5hbWUsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBhIHNjaGVtYSB0byBxdWVyeSBvciBwZXJmb3JtIGFuIGZ1bmN0aW9uIChycGMpIGNhbGwuXG4gICAgICpcbiAgICAgKiBUaGUgc2NoZW1hIG5lZWRzIHRvIGJlIG9uIHRoZSBsaXN0IG9mIGV4cG9zZWQgc2NoZW1hcyBpbnNpZGUgU3VwYWJhc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIC0gVGhlIHNjaGVtYSB0byBxdWVyeVxuICAgICAqL1xuICAgIHNjaGVtYShzY2hlbWEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RDbGllbnQodGhpcy51cmwsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYSxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZm4gLSBUaGUgZnVuY3Rpb24gbmFtZSB0byBjYWxsXG4gICAgICogQHBhcmFtIGFyZ3MgLSBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGZ1bmN0aW9uIGNhbGxcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5oZWFkIC0gV2hlbiBzZXQgdG8gYHRydWVgLCBgZGF0YWAgd2lsbCBub3QgYmUgcmV0dXJuZWQuXG4gICAgICogVXNlZnVsIGlmIHlvdSBvbmx5IG5lZWQgdGhlIGNvdW50LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmdldCAtIFdoZW4gc2V0IHRvIGB0cnVlYCwgdGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGhcbiAgICAgKiByZWFkLW9ubHkgYWNjZXNzIG1vZGUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY291bnQgLSBDb3VudCBhbGdvcml0aG0gdG8gdXNlIHRvIGNvdW50IHJvd3MgcmV0dXJuZWQgYnkgdGhlXG4gICAgICogZnVuY3Rpb24uIE9ubHkgYXBwbGljYWJsZSBmb3IgW3NldC1yZXR1cm5pbmdcbiAgICAgKiBmdW5jdGlvbnNdKGh0dHBzOi8vd3d3LnBvc3RncmVzcWwub3JnL2RvY3MvY3VycmVudC9mdW5jdGlvbnMtc3JmLmh0bWwpLlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKi9cbiAgICBycGMoZm4sIGFyZ3MgPSB7fSwgeyBoZWFkID0gZmFsc2UsIGdldCA9IGZhbHNlLCBjb3VudCwgfSA9IHt9KSB7XG4gICAgICAgIGxldCBtZXRob2Q7XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYCR7dGhpcy51cmx9L3JwYy8ke2ZufWApO1xuICAgICAgICBsZXQgYm9keTtcbiAgICAgICAgaWYgKGhlYWQgfHwgZ2V0KSB7XG4gICAgICAgICAgICBtZXRob2QgPSBoZWFkID8gJ0hFQUQnIDogJ0dFVCc7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhhcmdzKVxuICAgICAgICAgICAgICAgIC8vIHBhcmFtcyB3aXRoIHVuZGVmaW5lZCB2YWx1ZSBuZWVkcyB0byBiZSBmaWx0ZXJlZCBvdXQsIG90aGVyd2lzZSBpdCdsbFxuICAgICAgICAgICAgICAgIC8vIHNob3cgdXAgYXMgYD9wYXJhbT11bmRlZmluZWRgXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoW18sIHZhbHVlXSkgPT4gdmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAvLyBhcnJheSB2YWx1ZXMgbmVlZCBzcGVjaWFsIHN5bnRheFxuICAgICAgICAgICAgICAgIC5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IFtuYW1lLCBBcnJheS5pc0FycmF5KHZhbHVlKSA/IGB7JHt2YWx1ZS5qb2luKCcsJyl9fWAgOiBgJHt2YWx1ZX1gXSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWV0aG9kID0gJ1BPU1QnO1xuICAgICAgICAgICAgYm9keSA9IGFyZ3M7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaGVhZGVycyk7XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgaGVhZGVyc1snUHJlZmVyJ10gPSBgY291bnQ9JHtjb3VudH1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xLmRlZmF1bHQoe1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWFOYW1lLFxuICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICAgICAgYWxsb3dFbXB0eTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFBvc3RncmVzdENsaWVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBvc3RncmVzdENsaWVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogRXJyb3IgZm9ybWF0XG4gKlxuICoge0BsaW5rIGh0dHBzOi8vcG9zdGdyZXN0Lm9yZy9lbi9zdGFibGUvYXBpLmh0bWw/aGlnaGxpZ2h0PW9wdGlvbnMjZXJyb3JzLWFuZC1odHRwLXN0YXR1cy1jb2Rlc31cbiAqL1xuY2xhc3MgUG9zdGdyZXN0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0Lm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnUG9zdGdyZXN0RXJyb3InO1xuICAgICAgICB0aGlzLmRldGFpbHMgPSBjb250ZXh0LmRldGFpbHM7XG4gICAgICAgIHRoaXMuaGludCA9IGNvbnRleHQuaGludDtcbiAgICAgICAgdGhpcy5jb2RlID0gY29udGV4dC5jb2RlO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFBvc3RncmVzdEVycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9zdGdyZXN0RXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlclwiKSk7XG5jbGFzcyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyIGV4dGVuZHMgUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcl8xLmRlZmF1bHQge1xuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpcyBlcXVhbCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogVG8gY2hlY2sgaWYgdGhlIHZhbHVlIG9mIGBjb2x1bW5gIGlzIE5VTEwsIHlvdSBzaG91bGQgdXNlIGAuaXMoKWAgaW5zdGVhZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGVxKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBlcS4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIG5vdCBlcXVhbCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgbmVxKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBuZXEuJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpcyBncmVhdGVyIHRoYW4gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGd0KGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBndC4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgZ3RlKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBndGUuJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBpcyBsZXNzIHRoYW4gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGx0KGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBsdC4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgbHRlKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBsdGUuJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBtYXRjaGVzIGBwYXR0ZXJuYCBjYXNlLXNlbnNpdGl2ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHBhdHRlcm4gLSBUaGUgcGF0dGVybiB0byBtYXRjaCB3aXRoXG4gICAgICovXG4gICAgbGlrZShjb2x1bW4sIHBhdHRlcm4pIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBsaWtlLiR7cGF0dGVybn1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBtYXRjaGVzIGFsbCBvZiBgcGF0dGVybnNgIGNhc2Utc2Vuc2l0aXZlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcGF0dGVybnMgLSBUaGUgcGF0dGVybnMgdG8gbWF0Y2ggd2l0aFxuICAgICAqL1xuICAgIGxpa2VBbGxPZihjb2x1bW4sIHBhdHRlcm5zKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgbGlrZShhbGwpLnske3BhdHRlcm5zLmpvaW4oJywnKX19YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgbWF0Y2hlcyBhbnkgb2YgYHBhdHRlcm5zYCBjYXNlLXNlbnNpdGl2ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHBhdHRlcm5zIC0gVGhlIHBhdHRlcm5zIHRvIG1hdGNoIHdpdGhcbiAgICAgKi9cbiAgICBsaWtlQW55T2YoY29sdW1uLCBwYXR0ZXJucykge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGxpa2UoYW55KS57JHtwYXR0ZXJucy5qb2luKCcsJyl9fWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIG1hdGNoZXMgYHBhdHRlcm5gIGNhc2UtaW5zZW5zaXRpdmVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBwYXR0ZXJuIC0gVGhlIHBhdHRlcm4gdG8gbWF0Y2ggd2l0aFxuICAgICAqL1xuICAgIGlsaWtlKGNvbHVtbiwgcGF0dGVybikge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGlsaWtlLiR7cGF0dGVybn1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBtYXRjaGVzIGFsbCBvZiBgcGF0dGVybnNgIGNhc2UtaW5zZW5zaXRpdmVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBwYXR0ZXJucyAtIFRoZSBwYXR0ZXJucyB0byBtYXRjaCB3aXRoXG4gICAgICovXG4gICAgaWxpa2VBbGxPZihjb2x1bW4sIHBhdHRlcm5zKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgaWxpa2UoYWxsKS57JHtwYXR0ZXJucy5qb2luKCcsJyl9fWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIG1hdGNoZXMgYW55IG9mIGBwYXR0ZXJuc2AgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHBhdHRlcm5zIC0gVGhlIHBhdHRlcm5zIHRvIG1hdGNoIHdpdGhcbiAgICAgKi9cbiAgICBpbGlrZUFueU9mKGNvbHVtbiwgcGF0dGVybnMpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBpbGlrZShhbnkpLnske3BhdHRlcm5zLmpvaW4oJywnKX19YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgSVMgYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEZvciBub24tYm9vbGVhbiBjb2x1bW5zLCB0aGlzIGlzIG9ubHkgcmVsZXZhbnQgZm9yIGNoZWNraW5nIGlmIHRoZSB2YWx1ZSBvZlxuICAgICAqIGBjb2x1bW5gIGlzIE5VTEwgYnkgc2V0dGluZyBgdmFsdWVgIHRvIGBudWxsYC5cbiAgICAgKlxuICAgICAqIEZvciBib29sZWFuIGNvbHVtbnMsIHlvdSBjYW4gYWxzbyBzZXQgYHZhbHVlYCB0byBgdHJ1ZWAgb3IgYGZhbHNlYCBhbmQgaXRcbiAgICAgKiB3aWxsIGJlaGF2ZSB0aGUgc2FtZSB3YXkgYXMgYC5lcSgpYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGlzKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBpcy4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIGluY2x1ZGVkIGluIHRoZSBgdmFsdWVzYCBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgdmFsdWVzIGFycmF5IHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgaW4oY29sdW1uLCB2YWx1ZXMpIHtcbiAgICAgICAgY29uc3QgY2xlYW5lZFZhbHVlcyA9IEFycmF5LmZyb20obmV3IFNldCh2YWx1ZXMpKVxuICAgICAgICAgICAgLm1hcCgocykgPT4ge1xuICAgICAgICAgICAgLy8gaGFuZGxlIHBvc3RncmVzdCByZXNlcnZlZCBjaGFyYWN0ZXJzXG4gICAgICAgICAgICAvLyBodHRwczovL3Bvc3RncmVzdC5vcmcvZW4vdjcuMC4wL2FwaS5odG1sI3Jlc2VydmVkLWNoYXJhY3RlcnNcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcyA9PT0gJ3N0cmluZycgJiYgbmV3IFJlZ0V4cCgnWywoKV0nKS50ZXN0KHMpKVxuICAgICAgICAgICAgICAgIHJldHVybiBgXCIke3N9XCJgO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtzfWA7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignLCcpO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGluLigke2NsZWFuZWRWYWx1ZXN9KWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IganNvbmIsIGFycmF5LCBhbmQgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlXG4gICAgICogYGNvbHVtbmAgY29udGFpbnMgZXZlcnkgZWxlbWVudCBhcHBlYXJpbmcgaW4gYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUganNvbmIsIGFycmF5LCBvciByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIGpzb25iLCBhcnJheSwgb3IgcmFuZ2UgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBjb250YWlucyhjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyByYW5nZSB0eXBlcyBjYW4gYmUgaW5jbHVzaXZlICdbJywgJ10nIG9yIGV4Y2x1c2l2ZSAnKCcsICcpJyBzbyBqdXN0XG4gICAgICAgICAgICAvLyBrZWVwIGl0IHNpbXBsZSBhbmQgYWNjZXB0IGEgc3RyaW5nXG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGNzLiR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIGFycmF5XG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGNzLnske3ZhbHVlLmpvaW4oJywnKX19YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBqc29uXG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGNzLiR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciBqc29uYiwgYXJyYXksIGFuZCByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmVcbiAgICAgKiBldmVyeSBlbGVtZW50IGFwcGVhcmluZyBpbiBgY29sdW1uYCBpcyBjb250YWluZWQgYnkgYHZhbHVlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUganNvbmIsIGFycmF5LCBvciByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIGpzb25iLCBhcnJheSwgb3IgcmFuZ2UgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBjb250YWluZWRCeShjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyByYW5nZVxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBjZC4ke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBhcnJheVxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBjZC57JHt2YWx1ZS5qb2luKCcsJyl9fWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8ganNvblxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBjZC4ke0pTT04uc3RyaW5naWZ5KHZhbHVlKX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlIGV2ZXJ5IGVsZW1lbnQgaW5cbiAgICAgKiBgY29sdW1uYCBpcyBncmVhdGVyIHRoYW4gYW55IGVsZW1lbnQgaW4gYHJhbmdlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSByYW5nZSAtIFRoZSByYW5nZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIHJhbmdlR3QoY29sdW1uLCByYW5nZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYHNyLiR7cmFuZ2V9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgZXZlcnkgZWxlbWVudCBpblxuICAgICAqIGBjb2x1bW5gIGlzIGVpdGhlciBjb250YWluZWQgaW4gYHJhbmdlYCBvciBncmVhdGVyIHRoYW4gYW55IGVsZW1lbnQgaW5cbiAgICAgKiBgcmFuZ2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHJhbmdlIC0gVGhlIHJhbmdlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgcmFuZ2VHdGUoY29sdW1uLCByYW5nZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYG54bC4ke3JhbmdlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlIGV2ZXJ5IGVsZW1lbnQgaW5cbiAgICAgKiBgY29sdW1uYCBpcyBsZXNzIHRoYW4gYW55IGVsZW1lbnQgaW4gYHJhbmdlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSByYW5nZSAtIFRoZSByYW5nZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIHJhbmdlTHQoY29sdW1uLCByYW5nZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYHNsLiR7cmFuZ2V9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgZXZlcnkgZWxlbWVudCBpblxuICAgICAqIGBjb2x1bW5gIGlzIGVpdGhlciBjb250YWluZWQgaW4gYHJhbmdlYCBvciBsZXNzIHRoYW4gYW55IGVsZW1lbnQgaW5cbiAgICAgKiBgcmFuZ2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHJhbmdlIC0gVGhlIHJhbmdlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgcmFuZ2VMdGUoY29sdW1uLCByYW5nZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYG54ci4ke3JhbmdlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzXG4gICAgICogbXV0dWFsbHkgZXhjbHVzaXZlIHRvIGByYW5nZWAgYW5kIHRoZXJlIGNhbiBiZSBubyBlbGVtZW50IGJldHdlZW4gdGhlIHR3b1xuICAgICAqIHJhbmdlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSByYW5nZSAtIFRoZSByYW5nZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIHJhbmdlQWRqYWNlbnQoY29sdW1uLCByYW5nZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGFkai4ke3JhbmdlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgYXJyYXkgYW5kIHJhbmdlIGNvbHVtbnMuIE1hdGNoIG9ubHkgcm93cyB3aGVyZVxuICAgICAqIGBjb2x1bW5gIGFuZCBgdmFsdWVgIGhhdmUgYW4gZWxlbWVudCBpbiBjb21tb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGFycmF5IG9yIHJhbmdlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgYXJyYXkgb3IgcmFuZ2UgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBvdmVybGFwcyhjb2x1bW4sIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyByYW5nZVxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBvdi4ke3ZhbHVlfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gYXJyYXlcbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgb3YueyR7dmFsdWUuam9pbignLCcpfX1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT25seSByZWxldmFudCBmb3IgdGV4dCBhbmQgdHN2ZWN0b3IgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlXG4gICAgICogYGNvbHVtbmAgbWF0Y2hlcyB0aGUgcXVlcnkgc3RyaW5nIGluIGBxdWVyeWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIHRleHQgb3IgdHN2ZWN0b3IgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBxdWVyeSAtIFRoZSBxdWVyeSB0ZXh0IHRvIG1hdGNoIHdpdGhcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb25maWcgLSBUaGUgdGV4dCBzZWFyY2ggY29uZmlndXJhdGlvbiB0byB1c2VcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50eXBlIC0gQ2hhbmdlIGhvdyB0aGUgYHF1ZXJ5YCB0ZXh0IGlzIGludGVycHJldGVkXG4gICAgICovXG4gICAgdGV4dFNlYXJjaChjb2x1bW4sIHF1ZXJ5LCB7IGNvbmZpZywgdHlwZSB9ID0ge30pIHtcbiAgICAgICAgbGV0IHR5cGVQYXJ0ID0gJyc7XG4gICAgICAgIGlmICh0eXBlID09PSAncGxhaW4nKSB7XG4gICAgICAgICAgICB0eXBlUGFydCA9ICdwbCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3BocmFzZScpIHtcbiAgICAgICAgICAgIHR5cGVQYXJ0ID0gJ3BoJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnd2Vic2VhcmNoJykge1xuICAgICAgICAgICAgdHlwZVBhcnQgPSAndyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29uZmlnUGFydCA9IGNvbmZpZyA9PT0gdW5kZWZpbmVkID8gJycgOiBgKCR7Y29uZmlnfSlgO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYCR7dHlwZVBhcnR9ZnRzJHtjb25maWdQYXJ0fS4ke3F1ZXJ5fWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGVhY2ggY29sdW1uIGluIGBxdWVyeWAga2V5cyBpcyBlcXVhbCB0byBpdHNcbiAgICAgKiBhc3NvY2lhdGVkIHZhbHVlLiBTaG9ydGhhbmQgZm9yIG11bHRpcGxlIGAuZXEoKWBzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gVGhlIG9iamVjdCB0byBmaWx0ZXIgd2l0aCwgd2l0aCBjb2x1bW4gbmFtZXMgYXMga2V5cyBtYXBwZWRcbiAgICAgKiB0byB0aGVpciBmaWx0ZXIgdmFsdWVzXG4gICAgICovXG4gICAgbWF0Y2gocXVlcnkpIHtcbiAgICAgICAgT2JqZWN0LmVudHJpZXMocXVlcnkpLmZvckVhY2goKFtjb2x1bW4sIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBlcS4ke3ZhbHVlfWApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGljaCBkb2Vzbid0IHNhdGlzZnkgdGhlIGZpbHRlci5cbiAgICAgKlxuICAgICAqIFVubGlrZSBtb3N0IGZpbHRlcnMsIGBvcGVhcmF0b3JgIGFuZCBgdmFsdWVgIGFyZSB1c2VkIGFzLWlzIGFuZCBuZWVkIHRvXG4gICAgICogZm9sbG93IFtQb3N0Z1JFU1RcbiAgICAgKiBzeW50YXhdKGh0dHBzOi8vcG9zdGdyZXN0Lm9yZy9lbi9zdGFibGUvYXBpLmh0bWwjb3BlcmF0b3JzKS4gWW91IGFsc28gbmVlZFxuICAgICAqIHRvIG1ha2Ugc3VyZSB0aGV5IGFyZSBwcm9wZXJseSBzYW5pdGl6ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gb3BlcmF0b3IgLSBUaGUgb3BlcmF0b3IgdG8gYmUgbmVnYXRlZCB0byBmaWx0ZXIgd2l0aCwgZm9sbG93aW5nXG4gICAgICogUG9zdGdSRVNUIHN5bnRheFxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aCwgZm9sbG93aW5nIFBvc3RnUkVTVCBzeW50YXhcbiAgICAgKi9cbiAgICBub3QoY29sdW1uLCBvcGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBub3QuJHtvcGVyYXRvcn0uJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGljaCBzYXRpc2Z5IGF0IGxlYXN0IG9uZSBvZiB0aGUgZmlsdGVycy5cbiAgICAgKlxuICAgICAqIFVubGlrZSBtb3N0IGZpbHRlcnMsIGBmaWx0ZXJzYCBpcyB1c2VkIGFzLWlzIGFuZCBuZWVkcyB0byBmb2xsb3cgW1Bvc3RnUkVTVFxuICAgICAqIHN5bnRheF0oaHR0cHM6Ly9wb3N0Z3Jlc3Qub3JnL2VuL3N0YWJsZS9hcGkuaHRtbCNvcGVyYXRvcnMpLiBZb3UgYWxzbyBuZWVkXG4gICAgICogdG8gbWFrZSBzdXJlIGl0J3MgcHJvcGVybHkgc2FuaXRpemVkLlxuICAgICAqXG4gICAgICogSXQncyBjdXJyZW50bHkgbm90IHBvc3NpYmxlIHRvIGRvIGFuIGAub3IoKWAgZmlsdGVyIGFjcm9zcyBtdWx0aXBsZSB0YWJsZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmlsdGVycyAtIFRoZSBmaWx0ZXJzIHRvIHVzZSwgZm9sbG93aW5nIFBvc3RnUkVTVCBzeW50YXhcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWZlcmVuY2VkVGFibGUgLSBTZXQgdGhpcyB0byBmaWx0ZXIgb24gcmVmZXJlbmNlZCB0YWJsZXNcbiAgICAgKiBpbnN0ZWFkIG9mIHRoZSBwYXJlbnQgdGFibGVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5mb3JlaWduVGFibGUgLSBEZXByZWNhdGVkLCB1c2UgYHJlZmVyZW5jZWRUYWJsZWAgaW5zdGVhZFxuICAgICAqL1xuICAgIG9yKGZpbHRlcnMsIHsgZm9yZWlnblRhYmxlLCByZWZlcmVuY2VkVGFibGUgPSBmb3JlaWduVGFibGUsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBrZXkgPSByZWZlcmVuY2VkVGFibGUgPyBgJHtyZWZlcmVuY2VkVGFibGV9Lm9yYCA6ICdvcic7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCBgKCR7ZmlsdGVyc30pYCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hpY2ggc2F0aXNmeSB0aGUgZmlsdGVyLiBUaGlzIGlzIGFuIGVzY2FwZSBoYXRjaCAtIHlvdVxuICAgICAqIHNob3VsZCB1c2UgdGhlIHNwZWNpZmljIGZpbHRlciBtZXRob2RzIHdoZXJldmVyIHBvc3NpYmxlLlxuICAgICAqXG4gICAgICogVW5saWtlIG1vc3QgZmlsdGVycywgYG9wZWFyYXRvcmAgYW5kIGB2YWx1ZWAgYXJlIHVzZWQgYXMtaXMgYW5kIG5lZWQgdG9cbiAgICAgKiBmb2xsb3cgW1Bvc3RnUkVTVFxuICAgICAqIHN5bnRheF0oaHR0cHM6Ly9wb3N0Z3Jlc3Qub3JnL2VuL3N0YWJsZS9hcGkuaHRtbCNvcGVyYXRvcnMpLiBZb3UgYWxzbyBuZWVkXG4gICAgICogdG8gbWFrZSBzdXJlIHRoZXkgYXJlIHByb3Blcmx5IHNhbml0aXplZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBvcGVyYXRvciAtIFRoZSBvcGVyYXRvciB0byBmaWx0ZXIgd2l0aCwgZm9sbG93aW5nIFBvc3RnUkVTVCBzeW50YXhcbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZmlsdGVyIHdpdGgsIGZvbGxvd2luZyBQb3N0Z1JFU1Qgc3ludGF4XG4gICAgICovXG4gICAgZmlsdGVyKGNvbHVtbiwgb3BlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgJHtvcGVyYXRvcn0uJHt2YWx1ZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUG9zdGdyZXN0RmlsdGVyQnVpbGRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBvc3RncmVzdEZpbHRlckJ1aWxkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0RmlsdGVyQnVpbGRlclwiKSk7XG5jbGFzcyBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgeyBoZWFkZXJzID0ge30sIHNjaGVtYSwgZmV0Y2gsIH0pIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hO1xuICAgICAgICB0aGlzLmZldGNoID0gZmV0Y2g7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBTRUxFQ1QgcXVlcnkgb24gdGhlIHRhYmxlIG9yIHZpZXcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1ucyAtIFRoZSBjb2x1bW5zIHRvIHJldHJpZXZlLCBzZXBhcmF0ZWQgYnkgY29tbWFzLiBDb2x1bW5zIGNhbiBiZSByZW5hbWVkIHdoZW4gcmV0dXJuZWQgd2l0aCBgY3VzdG9tTmFtZTpjb2x1bW5OYW1lYFxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5oZWFkIC0gV2hlbiBzZXQgdG8gYHRydWVgLCBgZGF0YWAgd2lsbCBub3QgYmUgcmV0dXJuZWQuXG4gICAgICogVXNlZnVsIGlmIHlvdSBvbmx5IG5lZWQgdGhlIGNvdW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY291bnQgLSBDb3VudCBhbGdvcml0aG0gdG8gdXNlIHRvIGNvdW50IHJvd3MgaW4gdGhlIHRhYmxlIG9yIHZpZXcuXG4gICAgICpcbiAgICAgKiBgXCJleGFjdFwiYDogRXhhY3QgYnV0IHNsb3cgY291bnQgYWxnb3JpdGhtLiBQZXJmb3JtcyBhIGBDT1VOVCgqKWAgdW5kZXIgdGhlXG4gICAgICogaG9vZC5cbiAgICAgKlxuICAgICAqIGBcInBsYW5uZWRcImA6IEFwcHJveGltYXRlZCBidXQgZmFzdCBjb3VudCBhbGdvcml0aG0uIFVzZXMgdGhlIFBvc3RncmVzXG4gICAgICogc3RhdGlzdGljcyB1bmRlciB0aGUgaG9vZC5cbiAgICAgKlxuICAgICAqIGBcImVzdGltYXRlZFwiYDogVXNlcyBleGFjdCBjb3VudCBmb3IgbG93IG51bWJlcnMgYW5kIHBsYW5uZWQgY291bnQgZm9yIGhpZ2hcbiAgICAgKiBudW1iZXJzLlxuICAgICAqL1xuICAgIHNlbGVjdChjb2x1bW5zLCB7IGhlYWQgPSBmYWxzZSwgY291bnQsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBoZWFkID8gJ0hFQUQnIDogJ0dFVCc7XG4gICAgICAgIC8vIFJlbW92ZSB3aGl0ZXNwYWNlcyBleGNlcHQgd2hlbiBxdW90ZWRcbiAgICAgICAgbGV0IHF1b3RlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjbGVhbmVkQ29sdW1ucyA9IChjb2x1bW5zICE9PSBudWxsICYmIGNvbHVtbnMgIT09IHZvaWQgMCA/IGNvbHVtbnMgOiAnKicpXG4gICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAubWFwKChjKSA9PiB7XG4gICAgICAgICAgICBpZiAoL1xccy8udGVzdChjKSAmJiAhcXVvdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICBxdW90ZWQgPSAhcXVvdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3NlbGVjdCcsIGNsZWFuZWRDb2x1bW5zKTtcbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddID0gYGNvdW50PSR7Y291bnR9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgICAgICBhbGxvd0VtcHR5OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gSU5TRVJUIGludG8gdGhlIHRhYmxlIG9yIHZpZXcuXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCBpbnNlcnRlZCByb3dzIGFyZSBub3QgcmV0dXJuZWQuIFRvIHJldHVybiBpdCwgY2hhaW4gdGhlIGNhbGxcbiAgICAgKiB3aXRoIGAuc2VsZWN0KClgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlcyAtIFRoZSB2YWx1ZXMgdG8gaW5zZXJ0LiBQYXNzIGFuIG9iamVjdCB0byBpbnNlcnQgYSBzaW5nbGUgcm93XG4gICAgICogb3IgYW4gYXJyYXkgdG8gaW5zZXJ0IG11bHRpcGxlIHJvd3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvdW50IC0gQ291bnQgYWxnb3JpdGhtIHRvIHVzZSB0byBjb3VudCBpbnNlcnRlZCByb3dzLlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRlZmF1bHRUb051bGwgLSBNYWtlIG1pc3NpbmcgZmllbGRzIGRlZmF1bHQgdG8gYG51bGxgLlxuICAgICAqIE90aGVyd2lzZSwgdXNlIHRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgY29sdW1uLiBPbmx5IGFwcGxpZXMgZm9yIGJ1bGtcbiAgICAgKiBpbnNlcnRzLlxuICAgICAqL1xuICAgIGluc2VydCh2YWx1ZXMsIHsgY291bnQsIGRlZmF1bHRUb051bGwgPSB0cnVlLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gJ1BPU1QnO1xuICAgICAgICBjb25zdCBwcmVmZXJzSGVhZGVycyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5oZWFkZXJzWydQcmVmZXInXSkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaCh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2goYGNvdW50PSR7Y291bnR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWZhdWx0VG9OdWxsKSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKCdtaXNzaW5nPWRlZmF1bHQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddID0gcHJlZmVyc0hlYWRlcnMuam9pbignLCcpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gdmFsdWVzLnJlZHVjZSgoYWNjLCB4KSA9PiBhY2MuY29uY2F0KE9iamVjdC5rZXlzKHgpKSwgW10pO1xuICAgICAgICAgICAgaWYgKGNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXF1ZUNvbHVtbnMgPSBbLi4ubmV3IFNldChjb2x1bW5zKV0ubWFwKChjb2x1bW4pID0+IGBcIiR7Y29sdW1ufVwiYCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldCgnY29sdW1ucycsIHVuaXF1ZUNvbHVtbnMuam9pbignLCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgYm9keTogdmFsdWVzLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgICAgICBhbGxvd0VtcHR5OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gVVBTRVJUIG9uIHRoZSB0YWJsZSBvciB2aWV3LiBEZXBlbmRpbmcgb24gdGhlIGNvbHVtbihzKSBwYXNzZWRcbiAgICAgKiB0byBgb25Db25mbGljdGAsIGAudXBzZXJ0KClgIGFsbG93cyB5b3UgdG8gcGVyZm9ybSB0aGUgZXF1aXZhbGVudCBvZlxuICAgICAqIGAuaW5zZXJ0KClgIGlmIGEgcm93IHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgYG9uQ29uZmxpY3RgIGNvbHVtbnMgZG9lc24ndFxuICAgICAqIGV4aXN0LCBvciBpZiBpdCBkb2VzIGV4aXN0LCBwZXJmb3JtIGFuIGFsdGVybmF0aXZlIGFjdGlvbiBkZXBlbmRpbmcgb25cbiAgICAgKiBgaWdub3JlRHVwbGljYXRlc2AuXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCB1cHNlcnRlZCByb3dzIGFyZSBub3QgcmV0dXJuZWQuIFRvIHJldHVybiBpdCwgY2hhaW4gdGhlIGNhbGxcbiAgICAgKiB3aXRoIGAuc2VsZWN0KClgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlcyAtIFRoZSB2YWx1ZXMgdG8gdXBzZXJ0IHdpdGguIFBhc3MgYW4gb2JqZWN0IHRvIHVwc2VydCBhXG4gICAgICogc2luZ2xlIHJvdyBvciBhbiBhcnJheSB0byB1cHNlcnQgbXVsdGlwbGUgcm93cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMub25Db25mbGljdCAtIENvbW1hLXNlcGFyYXRlZCBVTklRVUUgY29sdW1uKHMpIHRvIHNwZWNpZnkgaG93XG4gICAgICogZHVwbGljYXRlIHJvd3MgYXJlIGRldGVybWluZWQuIFR3byByb3dzIGFyZSBkdXBsaWNhdGVzIGlmIGFsbCB0aGVcbiAgICAgKiBgb25Db25mbGljdGAgY29sdW1ucyBhcmUgZXF1YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5pZ25vcmVEdXBsaWNhdGVzIC0gSWYgYHRydWVgLCBkdXBsaWNhdGUgcm93cyBhcmUgaWdub3JlZC4gSWZcbiAgICAgKiBgZmFsc2VgLCBkdXBsaWNhdGUgcm93cyBhcmUgbWVyZ2VkIHdpdGggZXhpc3Rpbmcgcm93cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvdW50IC0gQ291bnQgYWxnb3JpdGhtIHRvIHVzZSB0byBjb3VudCB1cHNlcnRlZCByb3dzLlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRlZmF1bHRUb051bGwgLSBNYWtlIG1pc3NpbmcgZmllbGRzIGRlZmF1bHQgdG8gYG51bGxgLlxuICAgICAqIE90aGVyd2lzZSwgdXNlIHRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgY29sdW1uLiBUaGlzIG9ubHkgYXBwbGllcyB3aGVuXG4gICAgICogaW5zZXJ0aW5nIG5ldyByb3dzLCBub3Qgd2hlbiBtZXJnaW5nIHdpdGggZXhpc3Rpbmcgcm93cyB1bmRlclxuICAgICAqIGBpZ25vcmVEdXBsaWNhdGVzOiBmYWxzZWAuIFRoaXMgYWxzbyBvbmx5IGFwcGxpZXMgd2hlbiBkb2luZyBidWxrIHVwc2VydHMuXG4gICAgICovXG4gICAgdXBzZXJ0KHZhbHVlcywgeyBvbkNvbmZsaWN0LCBpZ25vcmVEdXBsaWNhdGVzID0gZmFsc2UsIGNvdW50LCBkZWZhdWx0VG9OdWxsID0gdHJ1ZSwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9ICdQT1NUJztcbiAgICAgICAgY29uc3QgcHJlZmVyc0hlYWRlcnMgPSBbYHJlc29sdXRpb249JHtpZ25vcmVEdXBsaWNhdGVzID8gJ2lnbm9yZScgOiAnbWVyZ2UnfS1kdXBsaWNhdGVzYF07XG4gICAgICAgIGlmIChvbkNvbmZsaWN0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdvbl9jb25mbGljdCcsIG9uQ29uZmxpY3QpO1xuICAgICAgICBpZiAodGhpcy5oZWFkZXJzWydQcmVmZXInXSkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaCh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2goYGNvdW50PSR7Y291bnR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWZhdWx0VG9OdWxsKSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKCdtaXNzaW5nPWRlZmF1bHQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddID0gcHJlZmVyc0hlYWRlcnMuam9pbignLCcpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gdmFsdWVzLnJlZHVjZSgoYWNjLCB4KSA9PiBhY2MuY29uY2F0KE9iamVjdC5rZXlzKHgpKSwgW10pO1xuICAgICAgICAgICAgaWYgKGNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVuaXF1ZUNvbHVtbnMgPSBbLi4ubmV3IFNldChjb2x1bW5zKV0ubWFwKChjb2x1bW4pID0+IGBcIiR7Y29sdW1ufVwiYCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldCgnY29sdW1ucycsIHVuaXF1ZUNvbHVtbnMuam9pbignLCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgYm9keTogdmFsdWVzLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgICAgICBhbGxvd0VtcHR5OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYW4gVVBEQVRFIG9uIHRoZSB0YWJsZSBvciB2aWV3LlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgdXBkYXRlZCByb3dzIGFyZSBub3QgcmV0dXJuZWQuIFRvIHJldHVybiBpdCwgY2hhaW4gdGhlIGNhbGxcbiAgICAgKiB3aXRoIGAuc2VsZWN0KClgIGFmdGVyIGZpbHRlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byB1cGRhdGUgd2l0aFxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb3VudCAtIENvdW50IGFsZ29yaXRobSB0byB1c2UgdG8gY291bnQgdXBkYXRlZCByb3dzLlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKi9cbiAgICB1cGRhdGUodmFsdWVzLCB7IGNvdW50LCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gJ1BBVENIJztcbiAgICAgICAgY29uc3QgcHJlZmVyc0hlYWRlcnMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2godGhpcy5oZWFkZXJzWydQcmVmZXInXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKGBjb3VudD0ke2NvdW50fWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVhZGVyc1snUHJlZmVyJ10gPSBwcmVmZXJzSGVhZGVycy5qb2luKCcsJyk7XG4gICAgICAgIHJldHVybiBuZXcgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xLmRlZmF1bHQoe1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICBib2R5OiB2YWx1ZXMsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgICAgIGFsbG93RW1wdHk6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIERFTEVURSBvbiB0aGUgdGFibGUgb3Igdmlldy5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIGRlbGV0ZWQgcm93cyBhcmUgbm90IHJldHVybmVkLiBUbyByZXR1cm4gaXQsIGNoYWluIHRoZSBjYWxsXG4gICAgICogd2l0aCBgLnNlbGVjdCgpYCBhZnRlciBmaWx0ZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb3VudCAtIENvdW50IGFsZ29yaXRobSB0byB1c2UgdG8gY291bnQgZGVsZXRlZCByb3dzLlxuICAgICAqXG4gICAgICogYFwiZXhhY3RcImA6IEV4YWN0IGJ1dCBzbG93IGNvdW50IGFsZ29yaXRobS4gUGVyZm9ybXMgYSBgQ09VTlQoKilgIHVuZGVyIHRoZVxuICAgICAqIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJwbGFubmVkXCJgOiBBcHByb3hpbWF0ZWQgYnV0IGZhc3QgY291bnQgYWxnb3JpdGhtLiBVc2VzIHRoZSBQb3N0Z3Jlc1xuICAgICAqIHN0YXRpc3RpY3MgdW5kZXIgdGhlIGhvb2QuXG4gICAgICpcbiAgICAgKiBgXCJlc3RpbWF0ZWRcImA6IFVzZXMgZXhhY3QgY291bnQgZm9yIGxvdyBudW1iZXJzIGFuZCBwbGFubmVkIGNvdW50IGZvciBoaWdoXG4gICAgICogbnVtYmVycy5cbiAgICAgKi9cbiAgICBkZWxldGUoeyBjb3VudCwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9ICdERUxFVEUnO1xuICAgICAgICBjb25zdCBwcmVmZXJzSGVhZGVycyA9IFtdO1xuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2goYGNvdW50PSR7Y291bnR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnVuc2hpZnQodGhpcy5oZWFkZXJzWydQcmVmZXInXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSA9IHByZWZlcnNIZWFkZXJzLmpvaW4oJywnKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICAgICAgYWxsb3dFbXB0eTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFBvc3RncmVzdFF1ZXJ5QnVpbGRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBvc3RncmVzdFF1ZXJ5QnVpbGRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFBvc3RncmVzdEJ1aWxkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RCdWlsZGVyXCIpKTtcbmNsYXNzIFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIgZXh0ZW5kcyBQb3N0Z3Jlc3RCdWlsZGVyXzEuZGVmYXVsdCB7XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIFNFTEVDVCBvbiB0aGUgcXVlcnkgcmVzdWx0LlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgYC5pbnNlcnQoKWAsIGAudXBkYXRlKClgLCBgLnVwc2VydCgpYCwgYW5kIGAuZGVsZXRlKClgIGRvIG5vdFxuICAgICAqIHJldHVybiBtb2RpZmllZCByb3dzLiBCeSBjYWxsaW5nIHRoaXMgbWV0aG9kLCBtb2RpZmllZCByb3dzIGFyZSByZXR1cm5lZCBpblxuICAgICAqIGBkYXRhYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW5zIC0gVGhlIGNvbHVtbnMgdG8gcmV0cmlldmUsIHNlcGFyYXRlZCBieSBjb21tYXNcbiAgICAgKi9cbiAgICBzZWxlY3QoY29sdW1ucykge1xuICAgICAgICAvLyBSZW1vdmUgd2hpdGVzcGFjZXMgZXhjZXB0IHdoZW4gcXVvdGVkXG4gICAgICAgIGxldCBxdW90ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2xlYW5lZENvbHVtbnMgPSAoY29sdW1ucyAhPT0gbnVsbCAmJiBjb2x1bW5zICE9PSB2b2lkIDAgPyBjb2x1bW5zIDogJyonKVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLm1hcCgoYykgPT4ge1xuICAgICAgICAgICAgaWYgKC9cXHMvLnRlc3QoYykgJiYgIXF1b3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgcXVvdGVkID0gIXF1b3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdzZWxlY3QnLCBjbGVhbmVkQ29sdW1ucyk7XG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddICs9ICcsJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddICs9ICdyZXR1cm49cmVwcmVzZW50YXRpb24nO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3JkZXIgdGhlIHF1ZXJ5IHJlc3VsdCBieSBgY29sdW1uYC5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gY2FsbCB0aGlzIG1ldGhvZCBtdWx0aXBsZSB0aW1lcyB0byBvcmRlciBieSBtdWx0aXBsZSBjb2x1bW5zLlxuICAgICAqXG4gICAgICogWW91IGNhbiBvcmRlciByZWZlcmVuY2VkIHRhYmxlcywgYnV0IGl0IG9ubHkgYWZmZWN0cyB0aGUgb3JkZXJpbmcgb2YgdGhlXG4gICAgICogcGFyZW50IHRhYmxlIGlmIHlvdSB1c2UgYCFpbm5lcmAgaW4gdGhlIHF1ZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gb3JkZXIgYnlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hc2NlbmRpbmcgLSBJZiBgdHJ1ZWAsIHRoZSByZXN1bHQgd2lsbCBiZSBpbiBhc2NlbmRpbmcgb3JkZXJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5udWxsc0ZpcnN0IC0gSWYgYHRydWVgLCBgbnVsbGBzIGFwcGVhciBmaXJzdC4gSWYgYGZhbHNlYCxcbiAgICAgKiBgbnVsbGBzIGFwcGVhciBsYXN0LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnJlZmVyZW5jZWRUYWJsZSAtIFNldCB0aGlzIHRvIG9yZGVyIGEgcmVmZXJlbmNlZCB0YWJsZSBieVxuICAgICAqIGl0cyBjb2x1bW5zXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZm9yZWlnblRhYmxlIC0gRGVwcmVjYXRlZCwgdXNlIGBvcHRpb25zLnJlZmVyZW5jZWRUYWJsZWBcbiAgICAgKiBpbnN0ZWFkXG4gICAgICovXG4gICAgb3JkZXIoY29sdW1uLCB7IGFzY2VuZGluZyA9IHRydWUsIG51bGxzRmlyc3QsIGZvcmVpZ25UYWJsZSwgcmVmZXJlbmNlZFRhYmxlID0gZm9yZWlnblRhYmxlLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3Qga2V5ID0gcmVmZXJlbmNlZFRhYmxlID8gYCR7cmVmZXJlbmNlZFRhYmxlfS5vcmRlcmAgOiAnb3JkZXInO1xuICAgICAgICBjb25zdCBleGlzdGluZ09yZGVyID0gdGhpcy51cmwuc2VhcmNoUGFyYW1zLmdldChrZXkpO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KGtleSwgYCR7ZXhpc3RpbmdPcmRlciA/IGAke2V4aXN0aW5nT3JkZXJ9LGAgOiAnJ30ke2NvbHVtbn0uJHthc2NlbmRpbmcgPyAnYXNjJyA6ICdkZXNjJ30ke251bGxzRmlyc3QgPT09IHVuZGVmaW5lZCA/ICcnIDogbnVsbHNGaXJzdCA/ICcubnVsbHNmaXJzdCcgOiAnLm51bGxzbGFzdCd9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaW1pdCB0aGUgcXVlcnkgcmVzdWx0IGJ5IGBjb3VudGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY291bnQgLSBUaGUgbWF4aW11bSBudW1iZXIgb2Ygcm93cyB0byByZXR1cm5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWZlcmVuY2VkVGFibGUgLSBTZXQgdGhpcyB0byBsaW1pdCByb3dzIG9mIHJlZmVyZW5jZWRcbiAgICAgKiB0YWJsZXMgaW5zdGVhZCBvZiB0aGUgcGFyZW50IHRhYmxlXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZm9yZWlnblRhYmxlIC0gRGVwcmVjYXRlZCwgdXNlIGBvcHRpb25zLnJlZmVyZW5jZWRUYWJsZWBcbiAgICAgKiBpbnN0ZWFkXG4gICAgICovXG4gICAgbGltaXQoY291bnQsIHsgZm9yZWlnblRhYmxlLCByZWZlcmVuY2VkVGFibGUgPSBmb3JlaWduVGFibGUsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBrZXkgPSB0eXBlb2YgcmVmZXJlbmNlZFRhYmxlID09PSAndW5kZWZpbmVkJyA/ICdsaW1pdCcgOiBgJHtyZWZlcmVuY2VkVGFibGV9LmxpbWl0YDtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldChrZXksIGAke2NvdW50fWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGltaXQgdGhlIHF1ZXJ5IHJlc3VsdCBieSBzdGFydGluZyBhdCBhbiBvZmZzZXQgYGZyb21gIGFuZCBlbmRpbmcgYXQgdGhlIG9mZnNldCBgdG9gLlxuICAgICAqIE9ubHkgcmVjb3JkcyB3aXRoaW4gdGhpcyByYW5nZSBhcmUgcmV0dXJuZWQuXG4gICAgICogVGhpcyByZXNwZWN0cyB0aGUgcXVlcnkgb3JkZXIgYW5kIGlmIHRoZXJlIGlzIG5vIG9yZGVyIGNsYXVzZSB0aGUgcmFuZ2UgY291bGQgYmVoYXZlIHVuZXhwZWN0ZWRseS5cbiAgICAgKiBUaGUgYGZyb21gIGFuZCBgdG9gIHZhbHVlcyBhcmUgMC1iYXNlZCBhbmQgaW5jbHVzaXZlOiBgcmFuZ2UoMSwgMylgIHdpbGwgaW5jbHVkZSB0aGUgc2Vjb25kLCB0aGlyZFxuICAgICAqIGFuZCBmb3VydGggcm93cyBvZiB0aGUgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnJvbSAtIFRoZSBzdGFydGluZyBpbmRleCBmcm9tIHdoaWNoIHRvIGxpbWl0IHRoZSByZXN1bHRcbiAgICAgKiBAcGFyYW0gdG8gLSBUaGUgbGFzdCBpbmRleCB0byB3aGljaCB0byBsaW1pdCB0aGUgcmVzdWx0XG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVmZXJlbmNlZFRhYmxlIC0gU2V0IHRoaXMgdG8gbGltaXQgcm93cyBvZiByZWZlcmVuY2VkXG4gICAgICogdGFibGVzIGluc3RlYWQgb2YgdGhlIHBhcmVudCB0YWJsZVxuICAgICAqIEBwYXJhbSBvcHRpb25zLmZvcmVpZ25UYWJsZSAtIERlcHJlY2F0ZWQsIHVzZSBgb3B0aW9ucy5yZWZlcmVuY2VkVGFibGVgXG4gICAgICogaW5zdGVhZFxuICAgICAqL1xuICAgIHJhbmdlKGZyb20sIHRvLCB7IGZvcmVpZ25UYWJsZSwgcmVmZXJlbmNlZFRhYmxlID0gZm9yZWlnblRhYmxlLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3Qga2V5T2Zmc2V0ID0gdHlwZW9mIHJlZmVyZW5jZWRUYWJsZSA9PT0gJ3VuZGVmaW5lZCcgPyAnb2Zmc2V0JyA6IGAke3JlZmVyZW5jZWRUYWJsZX0ub2Zmc2V0YDtcbiAgICAgICAgY29uc3Qga2V5TGltaXQgPSB0eXBlb2YgcmVmZXJlbmNlZFRhYmxlID09PSAndW5kZWZpbmVkJyA/ICdsaW1pdCcgOiBgJHtyZWZlcmVuY2VkVGFibGV9LmxpbWl0YDtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldChrZXlPZmZzZXQsIGAke2Zyb219YCk7XG4gICAgICAgIC8vIFJhbmdlIGlzIGluY2x1c2l2ZSwgc28gYWRkIDFcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldChrZXlMaW1pdCwgYCR7dG8gLSBmcm9tICsgMX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgQWJvcnRTaWduYWwgZm9yIHRoZSBmZXRjaCByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNpZ25hbCAtIFRoZSBBYm9ydFNpZ25hbCB0byB1c2UgZm9yIHRoZSBmZXRjaCByZXF1ZXN0XG4gICAgICovXG4gICAgYWJvcnRTaWduYWwoc2lnbmFsKSB7XG4gICAgICAgIHRoaXMuc2lnbmFsID0gc2lnbmFsO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGBkYXRhYCBhcyBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCBvZiBhbiBhcnJheSBvZiBvYmplY3RzLlxuICAgICAqXG4gICAgICogUXVlcnkgcmVzdWx0IG11c3QgYmUgb25lIHJvdyAoZS5nLiB1c2luZyBgLmxpbWl0KDEpYCksIG90aGVyd2lzZSB0aGlzXG4gICAgICogcmV0dXJucyBhbiBlcnJvci5cbiAgICAgKi9cbiAgICBzaW5nbGUoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyc1snQWNjZXB0J10gPSAnYXBwbGljYXRpb24vdm5kLnBncnN0Lm9iamVjdCtqc29uJztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBgZGF0YWAgYXMgYSBzaW5nbGUgb2JqZWN0IGluc3RlYWQgb2YgYW4gYXJyYXkgb2Ygb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIFF1ZXJ5IHJlc3VsdCBtdXN0IGJlIHplcm8gb3Igb25lIHJvdyAoZS5nLiB1c2luZyBgLmxpbWl0KDEpYCksIG90aGVyd2lzZVxuICAgICAqIHRoaXMgcmV0dXJucyBhbiBlcnJvci5cbiAgICAgKi9cbiAgICBtYXliZVNpbmdsZSgpIHtcbiAgICAgICAgLy8gVGVtcG9yYXJ5IHBhcnRpYWwgZml4IGZvciBodHRwczovL2dpdGh1Yi5jb20vc3VwYWJhc2UvcG9zdGdyZXN0LWpzL2lzc3Vlcy8zNjFcbiAgICAgICAgLy8gSXNzdWUgcGVyc2lzdHMgZS5nLiBmb3IgYC5pbnNlcnQoWy4uLl0pLnNlbGVjdCgpLm1heWJlU2luZ2xlKClgXG4gICAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1snQWNjZXB0J10gPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID0gJ2FwcGxpY2F0aW9uL3ZuZC5wZ3JzdC5vYmplY3QranNvbic7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc01heWJlU2luZ2xlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBgZGF0YWAgYXMgYSBzdHJpbmcgaW4gQ1NWIGZvcm1hdC5cbiAgICAgKi9cbiAgICBjc3YoKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyc1snQWNjZXB0J10gPSAndGV4dC9jc3YnO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGBkYXRhYCBhcyBhbiBvYmplY3QgaW4gW0dlb0pTT05dKGh0dHBzOi8vZ2VvanNvbi5vcmcpIGZvcm1hdC5cbiAgICAgKi9cbiAgICBnZW9qc29uKCkge1xuICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID0gJ2FwcGxpY2F0aW9uL2dlbytqc29uJztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBgZGF0YWAgYXMgdGhlIEVYUExBSU4gcGxhbiBmb3IgdGhlIHF1ZXJ5LlxuICAgICAqXG4gICAgICogWW91IG5lZWQgdG8gZW5hYmxlIHRoZVxuICAgICAqIFtkYl9wbGFuX2VuYWJsZWRdKGh0dHBzOi8vc3VwYWJhc2UuY29tL2RvY3MvZ3VpZGVzL2RhdGFiYXNlL2RlYnVnZ2luZy1wZXJmb3JtYW5jZSNlbmFibGluZy1leHBsYWluKVxuICAgICAqIHNldHRpbmcgYmVmb3JlIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hbmFseXplIC0gSWYgYHRydWVgLCB0aGUgcXVlcnkgd2lsbCBiZSBleGVjdXRlZCBhbmQgdGhlXG4gICAgICogYWN0dWFsIHJ1biB0aW1lIHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnZlcmJvc2UgLSBJZiBgdHJ1ZWAsIHRoZSBxdWVyeSBpZGVudGlmaWVyIHdpbGwgYmUgcmV0dXJuZWRcbiAgICAgKiBhbmQgYGRhdGFgIHdpbGwgaW5jbHVkZSB0aGUgb3V0cHV0IGNvbHVtbnMgb2YgdGhlIHF1ZXJ5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5zZXR0aW5ncyAtIElmIGB0cnVlYCwgaW5jbHVkZSBpbmZvcm1hdGlvbiBvbiBjb25maWd1cmF0aW9uXG4gICAgICogcGFyYW1ldGVycyB0aGF0IGFmZmVjdCBxdWVyeSBwbGFubmluZ1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYnVmZmVycyAtIElmIGB0cnVlYCwgaW5jbHVkZSBpbmZvcm1hdGlvbiBvbiBidWZmZXIgdXNhZ2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLndhbCAtIElmIGB0cnVlYCwgaW5jbHVkZSBpbmZvcm1hdGlvbiBvbiBXQUwgcmVjb3JkIGdlbmVyYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmZvcm1hdCAtIFRoZSBmb3JtYXQgb2YgdGhlIG91dHB1dCwgY2FuIGJlIGBcInRleHRcImAgKGRlZmF1bHQpXG4gICAgICogb3IgYFwianNvblwiYFxuICAgICAqL1xuICAgIGV4cGxhaW4oeyBhbmFseXplID0gZmFsc2UsIHZlcmJvc2UgPSBmYWxzZSwgc2V0dGluZ3MgPSBmYWxzZSwgYnVmZmVycyA9IGZhbHNlLCB3YWwgPSBmYWxzZSwgZm9ybWF0ID0gJ3RleHQnLCB9ID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW1xuICAgICAgICAgICAgYW5hbHl6ZSA/ICdhbmFseXplJyA6IG51bGwsXG4gICAgICAgICAgICB2ZXJib3NlID8gJ3ZlcmJvc2UnIDogbnVsbCxcbiAgICAgICAgICAgIHNldHRpbmdzID8gJ3NldHRpbmdzJyA6IG51bGwsXG4gICAgICAgICAgICBidWZmZXJzID8gJ2J1ZmZlcnMnIDogbnVsbCxcbiAgICAgICAgICAgIHdhbCA/ICd3YWwnIDogbnVsbCxcbiAgICAgICAgXVxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgICAgICAgLmpvaW4oJ3wnKTtcbiAgICAgICAgLy8gQW4gQWNjZXB0IGhlYWRlciBjYW4gY2FycnkgbXVsdGlwbGUgbWVkaWEgdHlwZXMgYnV0IHBvc3RncmVzdC1qcyBhbHdheXMgc2VuZHMgb25lXG4gICAgICAgIGNvbnN0IGZvck1lZGlhdHlwZSA9IChfYSA9IHRoaXMuaGVhZGVyc1snQWNjZXB0J10pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQnXSA9IGBhcHBsaWNhdGlvbi92bmQucGdyc3QucGxhbiske2Zvcm1hdH07IGZvcj1cIiR7Zm9yTWVkaWF0eXBlfVwiOyBvcHRpb25zPSR7b3B0aW9uc307YDtcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2pzb24nKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb2xsYmFjayB0aGUgcXVlcnkuXG4gICAgICpcbiAgICAgKiBgZGF0YWAgd2lsbCBzdGlsbCBiZSByZXR1cm5lZCwgYnV0IHRoZSBxdWVyeSBpcyBub3QgY29tbWl0dGVkLlxuICAgICAqL1xuICAgIHJvbGxiYWNrKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICgoKF9hID0gdGhpcy5oZWFkZXJzWydQcmVmZXInXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJycpLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddICs9ICcsdHg9cm9sbGJhY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSA9ICd0eD1yb2xsYmFjayc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHRoZSB0eXBlIG9mIHRoZSByZXR1cm5lZCBgZGF0YWAuXG4gICAgICpcbiAgICAgKiBAdHlwZVBhcmFtIE5ld1Jlc3VsdCAtIFRoZSBuZXcgcmVzdWx0IHR5cGUgdG8gb3ZlcnJpZGUgd2l0aFxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBvdmVycmlkZVR5cGVzPHlvdXJUeXBlLCB7IG1lcmdlOiBmYWxzZSB9PigpIG1ldGhvZCBhdCB0aGUgZW5kIG9mIHlvdXIgY2FsbCBjaGFpbiBpbnN0ZWFkXG4gICAgICovXG4gICAgcmV0dXJucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRFRkFVTFRfSEVBREVSUyA9IHZvaWQgMDtcbmNvbnN0IHZlcnNpb25fMSA9IHJlcXVpcmUoXCIuL3ZlcnNpb25cIik7XG5leHBvcnRzLkRFRkFVTFRfSEVBREVSUyA9IHsgJ1gtQ2xpZW50LUluZm8nOiBgcG9zdGdyZXN0LWpzLyR7dmVyc2lvbl8xLnZlcnNpb259YCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Qb3N0Z3Jlc3RFcnJvciA9IGV4cG9ydHMuUG9zdGdyZXN0QnVpbGRlciA9IGV4cG9ydHMuUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlciA9IGV4cG9ydHMuUG9zdGdyZXN0RmlsdGVyQnVpbGRlciA9IGV4cG9ydHMuUG9zdGdyZXN0UXVlcnlCdWlsZGVyID0gZXhwb3J0cy5Qb3N0Z3Jlc3RDbGllbnQgPSB2b2lkIDA7XG4vLyBBbHdheXMgdXBkYXRlIHdyYXBwZXIubWpzIHdoZW4gdXBkYXRpbmcgdGhpcyBmaWxlLlxuY29uc3QgUG9zdGdyZXN0Q2xpZW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0Q2xpZW50XCIpKTtcbmV4cG9ydHMuUG9zdGdyZXN0Q2xpZW50ID0gUG9zdGdyZXN0Q2xpZW50XzEuZGVmYXVsdDtcbmNvbnN0IFBvc3RncmVzdFF1ZXJ5QnVpbGRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdFF1ZXJ5QnVpbGRlclwiKSk7XG5leHBvcnRzLlBvc3RncmVzdFF1ZXJ5QnVpbGRlciA9IFBvc3RncmVzdFF1ZXJ5QnVpbGRlcl8xLmRlZmF1bHQ7XG5jb25zdCBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0RmlsdGVyQnVpbGRlclwiKSk7XG5leHBvcnRzLlBvc3RncmVzdEZpbHRlckJ1aWxkZXIgPSBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEuZGVmYXVsdDtcbmNvbnN0IFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyXCIpKTtcbmV4cG9ydHMuUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlciA9IFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXJfMS5kZWZhdWx0O1xuY29uc3QgUG9zdGdyZXN0QnVpbGRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdEJ1aWxkZXJcIikpO1xuZXhwb3J0cy5Qb3N0Z3Jlc3RCdWlsZGVyID0gUG9zdGdyZXN0QnVpbGRlcl8xLmRlZmF1bHQ7XG5jb25zdCBQb3N0Z3Jlc3RFcnJvcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdEVycm9yXCIpKTtcbmV4cG9ydHMuUG9zdGdyZXN0RXJyb3IgPSBQb3N0Z3Jlc3RFcnJvcl8xLmRlZmF1bHQ7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gICAgUG9zdGdyZXN0Q2xpZW50OiBQb3N0Z3Jlc3RDbGllbnRfMS5kZWZhdWx0LFxuICAgIFBvc3RncmVzdFF1ZXJ5QnVpbGRlcjogUG9zdGdyZXN0UXVlcnlCdWlsZGVyXzEuZGVmYXVsdCxcbiAgICBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyOiBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEuZGVmYXVsdCxcbiAgICBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyOiBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyXzEuZGVmYXVsdCxcbiAgICBQb3N0Z3Jlc3RCdWlsZGVyOiBQb3N0Z3Jlc3RCdWlsZGVyXzEuZGVmYXVsdCxcbiAgICBQb3N0Z3Jlc3RFcnJvcjogUG9zdGdyZXN0RXJyb3JfMS5kZWZhdWx0LFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy52ZXJzaW9uID0gdm9pZCAwO1xuZXhwb3J0cy52ZXJzaW9uID0gJzAuMC4wLWF1dG9tYXRlZCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZXJzaW9uLmpzLm1hcCIsImltcG9ydCBpbmRleCBmcm9tICcuLi9janMvaW5kZXguanMnXG5jb25zdCB7XG4gIFBvc3RncmVzdENsaWVudCxcbiAgUG9zdGdyZXN0UXVlcnlCdWlsZGVyLFxuICBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyLFxuICBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyLFxuICBQb3N0Z3Jlc3RCdWlsZGVyLFxuICBQb3N0Z3Jlc3RFcnJvcixcbn0gPSBpbmRleFxuXG5leHBvcnQge1xuICBQb3N0Z3Jlc3RCdWlsZGVyLFxuICBQb3N0Z3Jlc3RDbGllbnQsXG4gIFBvc3RncmVzdEZpbHRlckJ1aWxkZXIsXG4gIFBvc3RncmVzdFF1ZXJ5QnVpbGRlcixcbiAgUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcixcbiAgUG9zdGdyZXN0RXJyb3IsXG59XG5cbi8vIGNvbXBhdGliaWxpdHkgd2l0aCBDSlMgb3V0cHV0XG5leHBvcnQgZGVmYXVsdCB7XG4gIFBvc3RncmVzdENsaWVudCxcbiAgUG9zdGdyZXN0UXVlcnlCdWlsZGVyLFxuICBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyLFxuICBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyLFxuICBQb3N0Z3Jlc3RCdWlsZGVyLFxuICBQb3N0Z3Jlc3RFcnJvcixcbn1cbiIsImltcG9ydCB7IENIQU5ORUxfRVZFTlRTLCBDSEFOTkVMX1NUQVRFUyB9IGZyb20gJy4vbGliL2NvbnN0YW50cyc7XG5pbXBvcnQgUHVzaCBmcm9tICcuL2xpYi9wdXNoJztcbmltcG9ydCBUaW1lciBmcm9tICcuL2xpYi90aW1lcic7XG5pbXBvcnQgUmVhbHRpbWVQcmVzZW5jZSBmcm9tICcuL1JlYWx0aW1lUHJlc2VuY2UnO1xuaW1wb3J0ICogYXMgVHJhbnNmb3JtZXJzIGZyb20gJy4vbGliL3RyYW5zZm9ybWVycyc7XG5pbXBvcnQgeyBodHRwRW5kcG9pbnRVUkwgfSBmcm9tICcuL2xpYi90cmFuc2Zvcm1lcnMnO1xuZXhwb3J0IHZhciBSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVDtcbihmdW5jdGlvbiAoUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlQpIHtcbiAgICBSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVFtcIkFMTFwiXSA9IFwiKlwiO1xuICAgIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UW1wiSU5TRVJUXCJdID0gXCJJTlNFUlRcIjtcbiAgICBSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVFtcIlVQREFURVwiXSA9IFwiVVBEQVRFXCI7XG4gICAgUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlRbXCJERUxFVEVcIl0gPSBcIkRFTEVURVwiO1xufSkoUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlQgfHwgKFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UID0ge30pKTtcbmV4cG9ydCB2YXIgUkVBTFRJTUVfTElTVEVOX1RZUEVTO1xuKGZ1bmN0aW9uIChSRUFMVElNRV9MSVNURU5fVFlQRVMpIHtcbiAgICBSRUFMVElNRV9MSVNURU5fVFlQRVNbXCJCUk9BRENBU1RcIl0gPSBcImJyb2FkY2FzdFwiO1xuICAgIFJFQUxUSU1FX0xJU1RFTl9UWVBFU1tcIlBSRVNFTkNFXCJdID0gXCJwcmVzZW5jZVwiO1xuICAgIFJFQUxUSU1FX0xJU1RFTl9UWVBFU1tcIlBPU1RHUkVTX0NIQU5HRVNcIl0gPSBcInBvc3RncmVzX2NoYW5nZXNcIjtcbiAgICBSRUFMVElNRV9MSVNURU5fVFlQRVNbXCJTWVNURU1cIl0gPSBcInN5c3RlbVwiO1xufSkoUkVBTFRJTUVfTElTVEVOX1RZUEVTIHx8IChSRUFMVElNRV9MSVNURU5fVFlQRVMgPSB7fSkpO1xuZXhwb3J0IHZhciBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTO1xuKGZ1bmN0aW9uIChSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTKSB7XG4gICAgUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFU1tcIlNVQlNDUklCRURcIl0gPSBcIlNVQlNDUklCRURcIjtcbiAgICBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTW1wiVElNRURfT1VUXCJdID0gXCJUSU1FRF9PVVRcIjtcbiAgICBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTW1wiQ0xPU0VEXCJdID0gXCJDTE9TRURcIjtcbiAgICBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTW1wiQ0hBTk5FTF9FUlJPUlwiXSA9IFwiQ0hBTk5FTF9FUlJPUlwiO1xufSkoUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUyB8fCAoUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUyA9IHt9KSk7XG5leHBvcnQgY29uc3QgUkVBTFRJTUVfQ0hBTk5FTF9TVEFURVMgPSBDSEFOTkVMX1NUQVRFUztcbi8qKiBBIGNoYW5uZWwgaXMgdGhlIGJhc2ljIGJ1aWxkaW5nIGJsb2NrIG9mIFJlYWx0aW1lXG4gKiBhbmQgbmFycm93cyB0aGUgc2NvcGUgb2YgZGF0YSBmbG93IHRvIHN1YnNjcmliZWQgY2xpZW50cy5cbiAqIFlvdSBjYW4gdGhpbmsgb2YgYSBjaGFubmVsIGFzIGEgY2hhdHJvb20gd2hlcmUgcGFydGljaXBhbnRzIGFyZSBhYmxlIHRvIHNlZSB3aG8ncyBvbmxpbmVcbiAqIGFuZCBzZW5kIGFuZCByZWNlaXZlIG1lc3NhZ2VzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFsdGltZUNoYW5uZWwge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBUb3BpYyBuYW1lIGNhbiBiZSBhbnkgc3RyaW5nLiAqL1xuICAgIHRvcGljLCBwYXJhbXMgPSB7IGNvbmZpZzoge30gfSwgc29ja2V0KSB7XG4gICAgICAgIHRoaXMudG9waWMgPSB0b3BpYztcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xuICAgICAgICB0aGlzLmJpbmRpbmdzID0ge307XG4gICAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5jbG9zZWQ7XG4gICAgICAgIHRoaXMuam9pbmVkT25jZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnB1c2hCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zdWJUb3BpYyA9IHRvcGljLnJlcGxhY2UoL15yZWFsdGltZTovaSwgJycpO1xuICAgICAgICB0aGlzLnBhcmFtcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGJyb2FkY2FzdDogeyBhY2s6IGZhbHNlLCBzZWxmOiBmYWxzZSB9LFxuICAgICAgICAgICAgcHJlc2VuY2U6IHsga2V5OiAnJyB9LFxuICAgICAgICAgICAgcHJpdmF0ZTogZmFsc2UsXG4gICAgICAgIH0sIHBhcmFtcy5jb25maWcpO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLnNvY2tldC50aW1lb3V0O1xuICAgICAgICB0aGlzLmpvaW5QdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMuam9pbiwgdGhpcy5wYXJhbXMsIHRoaXMudGltZW91dCk7XG4gICAgICAgIHRoaXMucmVqb2luVGltZXIgPSBuZXcgVGltZXIoKCkgPT4gdGhpcy5fcmVqb2luVW50aWxDb25uZWN0ZWQoKSwgdGhpcy5zb2NrZXQucmVjb25uZWN0QWZ0ZXJNcyk7XG4gICAgICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZSgnb2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmVkO1xuICAgICAgICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5wdXNoQnVmZmVyLmZvckVhY2goKHB1c2hFdmVudCkgPT4gcHVzaEV2ZW50LnNlbmQoKSk7XG4gICAgICAgICAgICB0aGlzLnB1c2hCdWZmZXIgPSBbXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29uQ2xvc2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQubG9nKCdjaGFubmVsJywgYGNsb3NlICR7dGhpcy50b3BpY30gJHt0aGlzLl9qb2luUmVmKCl9YCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkO1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQuX3JlbW92ZSh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29uRXJyb3IoKHJlYXNvbikgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzTGVhdmluZygpIHx8IHRoaXMuX2lzQ2xvc2VkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5sb2coJ2NoYW5uZWwnLCBgZXJyb3IgJHt0aGlzLnRvcGljfWAsIHJlYXNvbik7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZDtcbiAgICAgICAgICAgIHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoJ3RpbWVvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzSm9pbmluZygpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zb2NrZXQubG9nKCdjaGFubmVsJywgYHRpbWVvdXQgJHt0aGlzLnRvcGljfWAsIHRoaXMuam9pblB1c2gudGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZDtcbiAgICAgICAgICAgIHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vbihDSEFOTkVMX0VWRU5UUy5yZXBseSwge30sIChwYXlsb2FkLCByZWYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXIodGhpcy5fcmVwbHlFdmVudE5hbWUocmVmKSwgcGF5bG9hZCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByZXNlbmNlID0gbmV3IFJlYWx0aW1lUHJlc2VuY2UodGhpcyk7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0RW5kcG9pbnRVUkwgPVxuICAgICAgICAgICAgaHR0cEVuZHBvaW50VVJMKHRoaXMuc29ja2V0LmVuZFBvaW50KSArICcvYXBpL2Jyb2FkY2FzdCc7XG4gICAgICAgIHRoaXMucHJpdmF0ZSA9IHRoaXMucGFyYW1zLmNvbmZpZy5wcml2YXRlIHx8IGZhbHNlO1xuICAgIH1cbiAgICAvKiogU3Vic2NyaWJlIHJlZ2lzdGVycyB5b3VyIGNsaWVudCB3aXRoIHRoZSBzZXJ2ZXIgKi9cbiAgICBzdWJzY3JpYmUoY2FsbGJhY2ssIHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgaWYgKCF0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuam9pbmVkT25jZSkge1xuICAgICAgICAgICAgdGhyb3cgYHRyaWVkIHRvIHN1YnNjcmliZSBtdWx0aXBsZSB0aW1lcy4gJ3N1YnNjcmliZScgY2FuIG9ubHkgYmUgY2FsbGVkIGEgc2luZ2xlIHRpbWUgcGVyIGNoYW5uZWwgaW5zdGFuY2VgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgeyBjb25maWc6IHsgYnJvYWRjYXN0LCBwcmVzZW5jZSwgcHJpdmF0ZTogaXNQcml2YXRlIH0sIH0gPSB0aGlzLnBhcmFtcztcbiAgICAgICAgICAgIHRoaXMuX29uRXJyb3IoKGUpID0+IGNhbGxiYWNrID09PSBudWxsIHx8IGNhbGxiYWNrID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYWxsYmFjayhSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTLkNIQU5ORUxfRVJST1IsIGUpKTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2xvc2UoKCkgPT4gY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbGxiYWNrKFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMuQ0xPU0VEKSk7XG4gICAgICAgICAgICBjb25zdCBhY2Nlc3NUb2tlblBheWxvYWQgPSB7fTtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBicm9hZGNhc3QsXG4gICAgICAgICAgICAgICAgcHJlc2VuY2UsXG4gICAgICAgICAgICAgICAgcG9zdGdyZXNfY2hhbmdlczogKF9iID0gKF9hID0gdGhpcy5iaW5kaW5ncy5wb3N0Z3Jlc19jaGFuZ2VzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKChyKSA9PiByLmZpbHRlcikpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFtdLFxuICAgICAgICAgICAgICAgIHByaXZhdGU6IGlzUHJpdmF0ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5zb2NrZXQuYWNjZXNzVG9rZW5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuUGF5bG9hZC5hY2Nlc3NfdG9rZW4gPSB0aGlzLnNvY2tldC5hY2Nlc3NUb2tlblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVKb2luUGF5bG9hZChPYmplY3QuYXNzaWduKHsgY29uZmlnIH0sIGFjY2Vzc1Rva2VuUGF5bG9hZCkpO1xuICAgICAgICAgICAgdGhpcy5qb2luZWRPbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Jlam9pbih0aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuam9pblB1c2hcbiAgICAgICAgICAgICAgICAucmVjZWl2ZSgnb2snLCBhc3luYyAoeyBwb3N0Z3Jlc19jaGFuZ2VzIH0pID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXQuc2V0QXV0aCgpO1xuICAgICAgICAgICAgICAgIGlmIChwb3N0Z3Jlc19jaGFuZ2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbGxiYWNrKFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMuU1VCU0NSSUJFRCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsaWVudFBvc3RncmVzQmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLnBvc3RncmVzX2NoYW5nZXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJpbmRpbmdzTGVuID0gKF9hID0gY2xpZW50UG9zdGdyZXNCaW5kaW5ncyA9PT0gbnVsbCB8fCBjbGllbnRQb3N0Z3Jlc0JpbmRpbmdzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjbGllbnRQb3N0Z3Jlc0JpbmRpbmdzLmxlbmd0aCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UG9zdGdyZXNCaW5kaW5ncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRpbmdzTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsaWVudFBvc3RncmVzQmluZGluZyA9IGNsaWVudFBvc3RncmVzQmluZGluZ3NbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGZpbHRlcjogeyBldmVudCwgc2NoZW1hLCB0YWJsZSwgZmlsdGVyIH0sIH0gPSBjbGllbnRQb3N0Z3Jlc0JpbmRpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlciA9IHBvc3RncmVzX2NoYW5nZXMgJiYgcG9zdGdyZXNfY2hhbmdlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBvc3RncmVzRmlsdGVyLmV2ZW50ID09PSBldmVudCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBvc3RncmVzRmlsdGVyLnNjaGVtYSA9PT0gc2NoZW1hICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUG9zdGdyZXNGaWx0ZXIudGFibGUgPT09IHRhYmxlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUG9zdGdyZXNGaWx0ZXIuZmlsdGVyID09PSBmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3N0Z3Jlc0JpbmRpbmdzLnB1c2goT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjbGllbnRQb3N0Z3Jlc0JpbmRpbmcpLCB7IGlkOiBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlci5pZCB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbGxiYWNrKFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMuQ0hBTk5FTF9FUlJPUiwgbmV3IEVycm9yKCdtaXNtYXRjaCBiZXR3ZWVuIHNlcnZlciBhbmQgY2xpZW50IGJpbmRpbmdzIGZvciBwb3N0Z3JlcyBjaGFuZ2VzJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmRpbmdzLnBvc3RncmVzX2NoYW5nZXMgPSBuZXdQb3N0Z3Jlc0JpbmRpbmdzO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTLlNVQlNDUklCRUQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAucmVjZWl2ZSgnZXJyb3InLCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FsbGJhY2soUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUy5DSEFOTkVMX0VSUk9SLCBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoT2JqZWN0LnZhbHVlcyhlcnJvcikuam9pbignLCAnKSB8fCAnZXJyb3InKSkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnJlY2VpdmUoJ3RpbWVvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbGxiYWNrKFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMuVElNRURfT1VUKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcHJlc2VuY2VTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJlc2VuY2Uuc3RhdGU7XG4gICAgfVxuICAgIGFzeW5jIHRyYWNrKHBheWxvYWQsIG9wdHMgPSB7fSkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kKHtcbiAgICAgICAgICAgIHR5cGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBldmVudDogJ3RyYWNrJyxcbiAgICAgICAgICAgIHBheWxvYWQsXG4gICAgICAgIH0sIG9wdHMudGltZW91dCB8fCB0aGlzLnRpbWVvdXQpO1xuICAgIH1cbiAgICBhc3luYyB1bnRyYWNrKG9wdHMgPSB7fSkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZW5kKHtcbiAgICAgICAgICAgIHR5cGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBldmVudDogJ3VudHJhY2snLFxuICAgICAgICB9LCBvcHRzKTtcbiAgICB9XG4gICAgb24odHlwZSwgZmlsdGVyLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5fb24odHlwZSwgZmlsdGVyLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZSBpbnRvIHRoZSBjaGFubmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGFyZ3MgQXJndW1lbnRzIHRvIHNlbmQgdG8gY2hhbm5lbFxuICAgICAqIEBwYXJhbSBhcmdzLnR5cGUgVGhlIHR5cGUgb2YgZXZlbnQgdG8gc2VuZFxuICAgICAqIEBwYXJhbSBhcmdzLmV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCBiZWluZyBzZW50XG4gICAgICogQHBhcmFtIGFyZ3MucGF5bG9hZCBQYXlsb2FkIHRvIGJlIHNlbnRcbiAgICAgKiBAcGFyYW0gb3B0cyBPcHRpb25zIHRvIGJlIHVzZWQgZHVyaW5nIHRoZSBzZW5kIHByb2Nlc3NcbiAgICAgKi9cbiAgICBhc3luYyBzZW5kKGFyZ3MsIG9wdHMgPSB7fSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoIXRoaXMuX2NhblB1c2goKSAmJiBhcmdzLnR5cGUgPT09ICdicm9hZGNhc3QnKSB7XG4gICAgICAgICAgICBjb25zdCB7IGV2ZW50LCBwYXlsb2FkOiBlbmRwb2ludF9wYXlsb2FkIH0gPSBhcmdzO1xuICAgICAgICAgICAgY29uc3QgYXV0aG9yaXphdGlvbiA9IHRoaXMuc29ja2V0LmFjY2Vzc1Rva2VuVmFsdWVcbiAgICAgICAgICAgICAgICA/IGBCZWFyZXIgJHt0aGlzLnNvY2tldC5hY2Nlc3NUb2tlblZhbHVlfWBcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGF1dGhvcml6YXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGFwaWtleTogdGhpcy5zb2NrZXQuYXBpS2V5ID8gdGhpcy5zb2NrZXQuYXBpS2V5IDogJycsXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9waWM6IHRoaXMuc3ViVG9waWMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDogZW5kcG9pbnRfcGF5bG9hZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlOiB0aGlzLnByaXZhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLl9mZXRjaFdpdGhUaW1lb3V0KHRoaXMuYnJvYWRjYXN0RW5kcG9pbnRVUkwsIG9wdGlvbnMsIChfYSA9IG9wdHMudGltZW91dCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgICAgICBhd2FpdCAoKF9iID0gcmVzcG9uc2UuYm9keSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbmNlbCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2sgPyAnb2snIDogJ2Vycm9yJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvci5uYW1lID09PSAnQWJvcnRFcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd0aW1lZCBvdXQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgICAgICAgICAgY29uc3QgcHVzaCA9IHRoaXMuX3B1c2goYXJncy50eXBlLCBhcmdzLCBvcHRzLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy50eXBlID09PSAnYnJvYWRjYXN0JyAmJiAhKChfYyA9IChfYiA9IChfYSA9IHRoaXMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29uZmlnKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYnJvYWRjYXN0KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdvaycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwdXNoLnJlY2VpdmUoJ29rJywgKCkgPT4gcmVzb2x2ZSgnb2snKSk7XG4gICAgICAgICAgICAgICAgcHVzaC5yZWNlaXZlKCdlcnJvcicsICgpID0+IHJlc29sdmUoJ2Vycm9yJykpO1xuICAgICAgICAgICAgICAgIHB1c2gucmVjZWl2ZSgndGltZW91dCcsICgpID0+IHJlc29sdmUoJ3RpbWVkIG91dCcpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZUpvaW5QYXlsb2FkKHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5qb2luUHVzaC51cGRhdGVQYXlsb2FkKHBheWxvYWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMZWF2ZXMgdGhlIGNoYW5uZWwuXG4gICAgICpcbiAgICAgKiBVbnN1YnNjcmliZXMgZnJvbSBzZXJ2ZXIgZXZlbnRzLCBhbmQgaW5zdHJ1Y3RzIGNoYW5uZWwgdG8gdGVybWluYXRlIG9uIHNlcnZlci5cbiAgICAgKiBUcmlnZ2VycyBvbkNsb3NlKCkgaG9va3MuXG4gICAgICpcbiAgICAgKiBUbyByZWNlaXZlIGxlYXZlIGFja25vd2xlZGdlbWVudHMsIHVzZSB0aGUgYSBgcmVjZWl2ZWAgaG9vayB0byBiaW5kIHRvIHRoZSBzZXJ2ZXIgYWNrLCBpZTpcbiAgICAgKiBjaGFubmVsLnVuc3Vic2NyaWJlKCkucmVjZWl2ZShcIm9rXCIsICgpID0+IGFsZXJ0KFwibGVmdCFcIikgKVxuICAgICAqL1xuICAgIHVuc3Vic2NyaWJlKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmxlYXZpbmc7XG4gICAgICAgIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5sb2coJ2NoYW5uZWwnLCBgbGVhdmUgJHt0aGlzLnRvcGljfWApO1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgJ2xlYXZlJywgdGhpcy5fam9pblJlZigpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpO1xuICAgICAgICAvLyBEZXN0cm95IGpvaW5QdXNoIHRvIGF2b2lkIGNvbm5lY3Rpb24gdGltZW91dHMgZHVyaW5nIHVuc2NyaXB0aW9uIHBoYXNlXG4gICAgICAgIHRoaXMuam9pblB1c2guZGVzdHJveSgpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxlYXZlUHVzaCA9IG5ldyBQdXNoKHRoaXMsIENIQU5ORUxfRVZFTlRTLmxlYXZlLCB7fSwgdGltZW91dCk7XG4gICAgICAgICAgICBsZWF2ZVB1c2hcbiAgICAgICAgICAgICAgICAucmVjZWl2ZSgnb2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoJ29rJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5yZWNlaXZlKCd0aW1lb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCd0aW1lZCBvdXQnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnJlY2VpdmUoJ2Vycm9yJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxlYXZlUHVzaC5zZW5kKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NhblB1c2goKSkge1xuICAgICAgICAgICAgICAgIGxlYXZlUHVzaC50cmlnZ2VyKCdvaycsIHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBhc3luYyBfZmV0Y2hXaXRoVGltZW91dCh1cmwsIG9wdGlvbnMsIHRpbWVvdXQpIHtcbiAgICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgY29uc3QgaWQgPSBzZXRUaW1lb3V0KCgpID0+IGNvbnRyb2xsZXIuYWJvcnQoKSwgdGltZW91dCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zb2NrZXQuZmV0Y2godXJsLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IHNpZ25hbDogY29udHJvbGxlci5zaWduYWwgfSkpO1xuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfcHVzaChldmVudCwgcGF5bG9hZCwgdGltZW91dCA9IHRoaXMudGltZW91dCkge1xuICAgICAgICBpZiAoIXRoaXMuam9pbmVkT25jZSkge1xuICAgICAgICAgICAgdGhyb3cgYHRyaWVkIHRvIHB1c2ggJyR7ZXZlbnR9JyB0byAnJHt0aGlzLnRvcGljfScgYmVmb3JlIGpvaW5pbmcuIFVzZSBjaGFubmVsLnN1YnNjcmliZSgpIGJlZm9yZSBwdXNoaW5nIGV2ZW50c2A7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHB1c2hFdmVudCA9IG5ldyBQdXNoKHRoaXMsIGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0KTtcbiAgICAgICAgaWYgKHRoaXMuX2NhblB1c2goKSkge1xuICAgICAgICAgICAgcHVzaEV2ZW50LnNlbmQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHB1c2hFdmVudC5zdGFydFRpbWVvdXQoKTtcbiAgICAgICAgICAgIHRoaXMucHVzaEJ1ZmZlci5wdXNoKHB1c2hFdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHB1c2hFdmVudDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGFibGUgbWVzc2FnZSBob29rXG4gICAgICpcbiAgICAgKiBSZWNlaXZlcyBhbGwgZXZlbnRzIGZvciBzcGVjaWFsaXplZCBtZXNzYWdlIGhhbmRsaW5nIGJlZm9yZSBkaXNwYXRjaGluZyB0byB0aGUgY2hhbm5lbCBjYWxsYmFja3MuXG4gICAgICogTXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWQuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBfb25NZXNzYWdlKF9ldmVudCwgcGF5bG9hZCwgX3JlZikge1xuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9pc01lbWJlcih0b3BpYykge1xuICAgICAgICByZXR1cm4gdGhpcy50b3BpYyA9PT0gdG9waWM7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfam9pblJlZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuam9pblB1c2gucmVmO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX3RyaWdnZXIodHlwZSwgcGF5bG9hZCwgcmVmKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHR5cGVMb3dlciA9IHR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgeyBjbG9zZSwgZXJyb3IsIGxlYXZlLCBqb2luIH0gPSBDSEFOTkVMX0VWRU5UUztcbiAgICAgICAgY29uc3QgZXZlbnRzID0gW2Nsb3NlLCBlcnJvciwgbGVhdmUsIGpvaW5dO1xuICAgICAgICBpZiAocmVmICYmIGV2ZW50cy5pbmRleE9mKHR5cGVMb3dlcikgPj0gMCAmJiByZWYgIT09IHRoaXMuX2pvaW5SZWYoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBoYW5kbGVkUGF5bG9hZCA9IHRoaXMuX29uTWVzc2FnZSh0eXBlTG93ZXIsIHBheWxvYWQsIHJlZik7XG4gICAgICAgIGlmIChwYXlsb2FkICYmICFoYW5kbGVkUGF5bG9hZCkge1xuICAgICAgICAgICAgdGhyb3cgJ2NoYW5uZWwgb25NZXNzYWdlIGNhbGxiYWNrcyBtdXN0IHJldHVybiB0aGUgcGF5bG9hZCwgbW9kaWZpZWQgb3IgdW5tb2RpZmllZCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFsnaW5zZXJ0JywgJ3VwZGF0ZScsICdkZWxldGUnXS5pbmNsdWRlcyh0eXBlTG93ZXIpKSB7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLmJpbmRpbmdzLnBvc3RncmVzX2NoYW5nZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5maWx0ZXIoKGJpbmQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgICAgICByZXR1cm4gKCgoX2EgPSBiaW5kLmZpbHRlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmV2ZW50KSA9PT0gJyonIHx8XG4gICAgICAgICAgICAgICAgICAgICgoX2MgPSAoX2IgPSBiaW5kLmZpbHRlcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmV2ZW50KSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MudG9Mb2NhbGVMb3dlckNhc2UoKSkgPT09IHR5cGVMb3dlcik7XG4gICAgICAgICAgICB9KS5tYXAoKGJpbmQpID0+IGJpbmQuY2FsbGJhY2soaGFuZGxlZFBheWxvYWQsIHJlZikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgKF9iID0gdGhpcy5iaW5kaW5nc1t0eXBlTG93ZXJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZmlsdGVyKChiaW5kKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2Y7XG4gICAgICAgICAgICAgICAgaWYgKFsnYnJvYWRjYXN0JywgJ3ByZXNlbmNlJywgJ3Bvc3RncmVzX2NoYW5nZXMnXS5pbmNsdWRlcyh0eXBlTG93ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgnaWQnIGluIGJpbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJpbmRJZCA9IGJpbmQuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiaW5kRXZlbnQgPSAoX2EgPSBiaW5kLmZpbHRlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmV2ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChiaW5kSWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKF9iID0gcGF5bG9hZC5pZHMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5pbmNsdWRlcyhiaW5kSWQpKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChiaW5kRXZlbnQgPT09ICcqJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoYmluZEV2ZW50ID09PSBudWxsIHx8IGJpbmRFdmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmluZEV2ZW50LnRvTG9jYWxlTG93ZXJDYXNlKCkpID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChfYyA9IHBheWxvYWQuZGF0YSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJpbmRFdmVudCA9IChfZSA9IChfZCA9IGJpbmQgPT09IG51bGwgfHwgYmluZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogYmluZC5maWx0ZXIpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5ldmVudCkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGJpbmRFdmVudCA9PT0gJyonIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZEV2ZW50ID09PSAoKF9mID0gcGF5bG9hZCA9PT0gbnVsbCB8fCBwYXlsb2FkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXlsb2FkLmV2ZW50KSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YudG9Mb2NhbGVMb3dlckNhc2UoKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmluZC50eXBlLnRvTG9jYWxlTG93ZXJDYXNlKCkgPT09IHR5cGVMb3dlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5tYXAoKGJpbmQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGhhbmRsZWRQYXlsb2FkID09PSAnb2JqZWN0JyAmJiAnaWRzJyBpbiBoYW5kbGVkUGF5bG9hZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3N0Z3Jlc0NoYW5nZXMgPSBoYW5kbGVkUGF5bG9hZC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHNjaGVtYSwgdGFibGUsIGNvbW1pdF90aW1lc3RhbXAsIHR5cGUsIGVycm9ycyB9ID0gcG9zdGdyZXNDaGFuZ2VzO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnJpY2hlZFBheWxvYWQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlbWE6IHNjaGVtYSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlOiB0YWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1pdF90aW1lc3RhbXA6IGNvbW1pdF90aW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudFR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXc6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yczogZXJyb3JzLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVkUGF5bG9hZCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZW5yaWNoZWRQYXlsb2FkKSwgdGhpcy5fZ2V0UGF5bG9hZFJlY29yZHMocG9zdGdyZXNDaGFuZ2VzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJpbmQuY2FsbGJhY2soaGFuZGxlZFBheWxvYWQsIHJlZik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX2lzQ2xvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX2lzSm9pbmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmVkO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX2lzSm9pbmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmpvaW5pbmc7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfaXNMZWF2aW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMubGVhdmluZztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9yZXBseUV2ZW50TmFtZShyZWYpIHtcbiAgICAgICAgcmV0dXJuIGBjaGFuX3JlcGx5XyR7cmVmfWA7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfb24odHlwZSwgZmlsdGVyLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCB0eXBlTG93ZXIgPSB0eXBlLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGJpbmRpbmcgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlTG93ZXIsXG4gICAgICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuYmluZGluZ3NbdHlwZUxvd2VyXSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kaW5nc1t0eXBlTG93ZXJdLnB1c2goYmluZGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzW3R5cGVMb3dlcl0gPSBbYmluZGluZ107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfb2ZmKHR5cGUsIGZpbHRlcikge1xuICAgICAgICBjb25zdCB0eXBlTG93ZXIgPSB0eXBlLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIHRoaXMuYmluZGluZ3NbdHlwZUxvd2VyXSA9IHRoaXMuYmluZGluZ3NbdHlwZUxvd2VyXS5maWx0ZXIoKGJpbmQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiAhKCgoX2EgPSBiaW5kLnR5cGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b0xvY2FsZUxvd2VyQ2FzZSgpKSA9PT0gdHlwZUxvd2VyICYmXG4gICAgICAgICAgICAgICAgUmVhbHRpbWVDaGFubmVsLmlzRXF1YWwoYmluZC5maWx0ZXIsIGZpbHRlcikpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBzdGF0aWMgaXNFcXVhbChvYmoxLCBvYmoyKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhvYmoxKS5sZW5ndGggIT09IE9iamVjdC5rZXlzKG9iajIpLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgayBpbiBvYmoxKSB7XG4gICAgICAgICAgICBpZiAob2JqMVtrXSAhPT0gb2JqMltrXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9yZWpvaW5VbnRpbENvbm5lY3RlZCgpIHtcbiAgICAgICAgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKTtcbiAgICAgICAgaWYgKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlam9pbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjaGFubmVsIGNsb3Nlcy5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9vbkNsb3NlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX29uKENIQU5ORUxfRVZFTlRTLmNsb3NlLCB7fSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2hhbm5lbCBlbmNvdW50ZXJlcyBhbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9vbkVycm9yKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX29uKENIQU5ORUxfRVZFTlRTLmVycm9yLCB7fSwgKHJlYXNvbikgPT4gY2FsbGJhY2socmVhc29uKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzb2NrZXQgaXMgY29ubmVjdGVkIGFuZCB0aGUgY2hhbm5lbCBoYXMgYmVlbiBqb2luZWQuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBfY2FuUHVzaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkgJiYgdGhpcy5faXNKb2luZWQoKTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9yZWpvaW4odGltZW91dCA9IHRoaXMudGltZW91dCkge1xuICAgICAgICBpZiAodGhpcy5faXNMZWF2aW5nKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvY2tldC5fbGVhdmVPcGVuVG9waWModGhpcy50b3BpYyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5qb2luaW5nO1xuICAgICAgICB0aGlzLmpvaW5QdXNoLnJlc2VuZCh0aW1lb3V0KTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9nZXRQYXlsb2FkUmVjb3JkcyhwYXlsb2FkKSB7XG4gICAgICAgIGNvbnN0IHJlY29yZHMgPSB7XG4gICAgICAgICAgICBuZXc6IHt9LFxuICAgICAgICAgICAgb2xkOiB7fSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHBheWxvYWQudHlwZSA9PT0gJ0lOU0VSVCcgfHwgcGF5bG9hZC50eXBlID09PSAnVVBEQVRFJykge1xuICAgICAgICAgICAgcmVjb3Jkcy5uZXcgPSBUcmFuc2Zvcm1lcnMuY29udmVydENoYW5nZURhdGEocGF5bG9hZC5jb2x1bW5zLCBwYXlsb2FkLnJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQudHlwZSA9PT0gJ1VQREFURScgfHwgcGF5bG9hZC50eXBlID09PSAnREVMRVRFJykge1xuICAgICAgICAgICAgcmVjb3Jkcy5vbGQgPSBUcmFuc2Zvcm1lcnMuY29udmVydENoYW5nZURhdGEocGF5bG9hZC5jb2x1bW5zLCBwYXlsb2FkLm9sZF9yZWNvcmQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWNvcmRzO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlYWx0aW1lQ2hhbm5lbC5qcy5tYXAiLCJpbXBvcnQgeyBDSEFOTkVMX0VWRU5UUywgQ09OTkVDVElPTl9TVEFURSwgREVGQVVMVF9IRUFERVJTLCBERUZBVUxUX1RJTUVPVVQsIFNPQ0tFVF9TVEFURVMsIFRSQU5TUE9SVFMsIFZTTiwgV1NfQ0xPU0VfTk9STUFMLCB9IGZyb20gJy4vbGliL2NvbnN0YW50cyc7XG5pbXBvcnQgU2VyaWFsaXplciBmcm9tICcuL2xpYi9zZXJpYWxpemVyJztcbmltcG9ydCBUaW1lciBmcm9tICcuL2xpYi90aW1lcic7XG5pbXBvcnQgeyBodHRwRW5kcG9pbnRVUkwgfSBmcm9tICcuL2xpYi90cmFuc2Zvcm1lcnMnO1xuaW1wb3J0IFJlYWx0aW1lQ2hhbm5lbCBmcm9tICcuL1JlYWx0aW1lQ2hhbm5lbCc7XG5jb25zdCBub29wID0gKCkgPT4geyB9O1xuY29uc3QgTkFUSVZFX1dFQlNPQ0tFVF9BVkFJTEFCTEUgPSB0eXBlb2YgV2ViU29ja2V0ICE9PSAndW5kZWZpbmVkJztcbmNvbnN0IFdPUktFUl9TQ1JJUFQgPSBgXG4gIGFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChlKSA9PiB7XG4gICAgaWYgKGUuZGF0YS5ldmVudCA9PT0gXCJzdGFydFwiKSB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiBwb3N0TWVzc2FnZSh7IGV2ZW50OiBcImtlZXBBbGl2ZVwiIH0pLCBlLmRhdGEuaW50ZXJ2YWwpO1xuICAgIH1cbiAgfSk7YDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWx0aW1lQ2xpZW50IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgU29ja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGVuZFBvaW50IFRoZSBzdHJpbmcgV2ViU29ja2V0IGVuZHBvaW50LCBpZSwgXCJ3czovL2V4YW1wbGUuY29tL3NvY2tldFwiLCBcIndzczovL2V4YW1wbGUuY29tXCIsIFwiL3NvY2tldFwiIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICAgICAqIEBwYXJhbSBodHRwRW5kcG9pbnQgVGhlIHN0cmluZyBIVFRQIGVuZHBvaW50LCBpZSwgXCJodHRwczovL2V4YW1wbGUuY29tXCIsIFwiL1wiIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRyYW5zcG9ydCBUaGUgV2Vic29ja2V0IFRyYW5zcG9ydCwgZm9yIGV4YW1wbGUgV2ViU29ja2V0LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnRpbWVvdXQgVGhlIGRlZmF1bHQgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gdHJpZ2dlciBwdXNoIHRpbWVvdXRzLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnBhcmFtcyBUaGUgb3B0aW9uYWwgcGFyYW1zIHRvIHBhc3Mgd2hlbiBjb25uZWN0aW5nLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmhlYWRlcnMgVGhlIG9wdGlvbmFsIGhlYWRlcnMgdG8gcGFzcyB3aGVuIGNvbm5lY3RpbmcuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaGVhcnRiZWF0SW50ZXJ2YWxNcyBUaGUgbWlsbGlzZWMgaW50ZXJ2YWwgdG8gc2VuZCBhIGhlYXJ0YmVhdCBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmxvZ2dlciBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gZm9yIHNwZWNpYWxpemVkIGxvZ2dpbmcsIGllOiBsb2dnZXI6IChraW5kLCBtc2csIGRhdGEpID0+IHsgY29uc29sZS5sb2coYCR7a2luZH06ICR7bXNnfWAsIGRhdGEpIH1cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5lbmNvZGUgVGhlIGZ1bmN0aW9uIHRvIGVuY29kZSBvdXRnb2luZyBtZXNzYWdlcy4gRGVmYXVsdHMgdG8gSlNPTjogKHBheWxvYWQsIGNhbGxiYWNrKSA9PiBjYWxsYmFjayhKU09OLnN0cmluZ2lmeShwYXlsb2FkKSlcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kZWNvZGUgVGhlIGZ1bmN0aW9uIHRvIGRlY29kZSBpbmNvbWluZyBtZXNzYWdlcy4gRGVmYXVsdHMgdG8gU2VyaWFsaXplcidzIGRlY29kZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWNvbm5lY3RBZnRlck1zIGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWlsbHNlYyByZWNvbm5lY3QgaW50ZXJ2YWwuIERlZmF1bHRzIHRvIHN0ZXBwZWQgYmFja29mZiBvZmYuXG4gICAgICogQHBhcmFtIG9wdGlvbnMud29ya2VyIFVzZSBXZWIgV29ya2VyIHRvIHNldCBhIHNpZGUgZmxvdy4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICogQHBhcmFtIG9wdGlvbnMud29ya2VyVXJsIFRoZSBVUkwgb2YgdGhlIHdvcmtlciBzY3JpcHQuIERlZmF1bHRzIHRvIGh0dHBzOi8vcmVhbHRpbWUuc3VwYWJhc2UuY29tL3dvcmtlci5qcyB0aGF0IGluY2x1ZGVzIGEgaGVhcnRiZWF0IGV2ZW50IGNhbGwgdG8ga2VlcCB0aGUgY29ubmVjdGlvbiBhbGl2ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlbmRQb2ludCwgb3B0aW9ucykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRoaXMuYWNjZXNzVG9rZW5WYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuYXBpS2V5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jaGFubmVscyA9IFtdO1xuICAgICAgICB0aGlzLmVuZFBvaW50ID0gJyc7XG4gICAgICAgIHRoaXMuaHR0cEVuZHBvaW50ID0gJyc7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IERFRkFVTFRfSEVBREVSUztcbiAgICAgICAgdGhpcy5wYXJhbXMgPSB7fTtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gREVGQVVMVF9USU1FT1VUO1xuICAgICAgICB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMgPSAzMDAwMDtcbiAgICAgICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWYgPSAwO1xuICAgICAgICB0aGlzLmxvZ2dlciA9IG5vb3A7XG4gICAgICAgIHRoaXMuY29ubiA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnNlcmlhbGl6ZXIgPSBuZXcgU2VyaWFsaXplcigpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzID0ge1xuICAgICAgICAgICAgb3BlbjogW10sXG4gICAgICAgICAgICBjbG9zZTogW10sXG4gICAgICAgICAgICBlcnJvcjogW10sXG4gICAgICAgICAgICBtZXNzYWdlOiBbXSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2UgZWl0aGVyIGN1c3RvbSBmZXRjaCwgaWYgcHJvdmlkZWQsIG9yIGRlZmF1bHQgZmV0Y2ggdG8gbWFrZSBIVFRQIHJlcXVlc3RzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBpbnRlcm5hbFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcmVzb2x2ZUZldGNoID0gKGN1c3RvbUZldGNoKSA9PiB7XG4gICAgICAgICAgICBsZXQgX2ZldGNoO1xuICAgICAgICAgICAgaWYgKGN1c3RvbUZldGNoKSB7XG4gICAgICAgICAgICAgICAgX2ZldGNoID0gY3VzdG9tRmV0Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZmV0Y2ggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgX2ZldGNoID0gKC4uLmFyZ3MpID0+IGltcG9ydCgnQHN1cGFiYXNlL25vZGUtZmV0Y2gnKS50aGVuKCh7IGRlZmF1bHQ6IGZldGNoIH0pID0+IGZldGNoKC4uLmFyZ3MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIF9mZXRjaCA9IGZldGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiBfZmV0Y2goLi4uYXJncyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZW5kUG9pbnQgPSBgJHtlbmRQb2ludH0vJHtUUkFOU1BPUlRTLndlYnNvY2tldH1gO1xuICAgICAgICB0aGlzLmh0dHBFbmRwb2ludCA9IGh0dHBFbmRwb2ludFVSTChlbmRQb2ludCk7XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IG9wdGlvbnMudHJhbnNwb3J0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucGFyYW1zKVxuICAgICAgICAgICAgdGhpcy5wYXJhbXMgPSBvcHRpb25zLnBhcmFtcztcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5oZWFkZXJzKVxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhlYWRlcnMpLCBvcHRpb25zLmhlYWRlcnMpO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRpbWVvdXQpXG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubG9nZ2VyKVxuICAgICAgICAgICAgdGhpcy5sb2dnZXIgPSBvcHRpb25zLmxvZ2dlcjtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICAgICAgICAgICAgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zID0gb3B0aW9ucy5oZWFydGJlYXRJbnRlcnZhbE1zO1xuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlblZhbHVlID0gKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnBhcmFtcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFwaWtleTtcbiAgICAgICAgaWYgKGFjY2Vzc1Rva2VuVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYWNjZXNzVG9rZW5WYWx1ZSA9IGFjY2Vzc1Rva2VuVmFsdWU7XG4gICAgICAgICAgICB0aGlzLmFwaUtleSA9IGFjY2Vzc1Rva2VuVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWNvbm5lY3RBZnRlck1zID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5yZWNvbm5lY3RBZnRlck1zKVxuICAgICAgICAgICAgPyBvcHRpb25zLnJlY29ubmVjdEFmdGVyTXNcbiAgICAgICAgICAgIDogKHRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsxMDAwLCAyMDAwLCA1MDAwLCAxMDAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIHRoaXMuZW5jb2RlID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5lbmNvZGUpXG4gICAgICAgICAgICA/IG9wdGlvbnMuZW5jb2RlXG4gICAgICAgICAgICA6IChwYXlsb2FkLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB0aGlzLmRlY29kZSA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGVjb2RlKVxuICAgICAgICAgICAgPyBvcHRpb25zLmRlY29kZVxuICAgICAgICAgICAgOiB0aGlzLnNlcmlhbGl6ZXIuZGVjb2RlLmJpbmQodGhpcy5zZXJpYWxpemVyKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgICAgICB9LCB0aGlzLnJlY29ubmVjdEFmdGVyTXMpO1xuICAgICAgICB0aGlzLmZldGNoID0gdGhpcy5fcmVzb2x2ZUZldGNoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5mZXRjaCk7XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMud29ya2VyKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgIXdpbmRvdy5Xb3JrZXIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYiBXb3JrZXIgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53b3JrZXIgPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLndvcmtlcikgfHwgZmFsc2U7XG4gICAgICAgICAgICB0aGlzLndvcmtlclVybCA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy53b3JrZXJVcmw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuYWNjZXNzVG9rZW4pIHx8IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbm5lY3RzIHRoZSBzb2NrZXQsIHVubGVzcyBhbHJlYWR5IGNvbm5lY3RlZC5cbiAgICAgKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLmNvbm4gPSBuZXcgdGhpcy50cmFuc3BvcnQodGhpcy5lbmRwb2ludFVSTCgpLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTkFUSVZFX1dFQlNPQ0tFVF9BVkFJTEFCTEUpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubiA9IG5ldyBXZWJTb2NrZXQodGhpcy5lbmRwb2ludFVSTCgpKTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBDb25uZWN0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25uID0gbmV3IFdTV2ViU29ja2V0RHVtbXkodGhpcy5lbmRwb2ludFVSTCgpLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uID0gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBpbXBvcnQoJ3dzJykudGhlbigoeyBkZWZhdWx0OiBXUyB9KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbm4gPSBuZXcgV1ModGhpcy5lbmRwb2ludFVSTCgpLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0dXBDb25uZWN0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBVUkwgb2YgdGhlIHdlYnNvY2tldC5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgVGhlIFVSTCBvZiB0aGUgd2Vic29ja2V0LlxuICAgICAqL1xuICAgIGVuZHBvaW50VVJMKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXBwZW5kUGFyYW1zKHRoaXMuZW5kUG9pbnQsIE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFyYW1zLCB7IHZzbjogVlNOIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2RlIEEgbnVtZXJpYyBzdGF0dXMgY29kZSB0byBzZW5kIG9uIGRpc2Nvbm5lY3QuXG4gICAgICogQHBhcmFtIHJlYXNvbiBBIGN1c3RvbSByZWFzb24gZm9yIHRoZSBkaXNjb25uZWN0LlxuICAgICAqL1xuICAgIGRpc2Nvbm5lY3QoY29kZSwgcmVhc29uKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm4pIHtcbiAgICAgICAgICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZnVuY3Rpb24gKCkgeyB9OyAvLyBub29wXG4gICAgICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubi5jbG9zZShjb2RlLCByZWFzb24gIT09IG51bGwgJiYgcmVhc29uICE9PSB2b2lkIDAgPyByZWFzb24gOiAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm4uY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29ubiA9IG51bGw7XG4gICAgICAgICAgICAvLyByZW1vdmUgb3BlbiBoYW5kbGVzXG4gICAgICAgICAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyICYmIGNsZWFySW50ZXJ2YWwodGhpcy5oZWFydGJlYXRUaW1lcik7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgY3JlYXRlZCBjaGFubmVsc1xuICAgICAqL1xuICAgIGdldENoYW5uZWxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFubmVscztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5zdWJzY3JpYmVzIGFuZCByZW1vdmVzIGEgc2luZ2xlIGNoYW5uZWxcbiAgICAgKiBAcGFyYW0gY2hhbm5lbCBBIFJlYWx0aW1lQ2hhbm5lbCBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUNoYW5uZWwoY2hhbm5lbCkge1xuICAgICAgICBjb25zdCBzdGF0dXMgPSBhd2FpdCBjaGFubmVsLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGlmICh0aGlzLmNoYW5uZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5zdWJzY3JpYmVzIGFuZCByZW1vdmVzIGFsbCBjaGFubmVsc1xuICAgICAqL1xuICAgIGFzeW5jIHJlbW92ZUFsbENoYW5uZWxzKCkge1xuICAgICAgICBjb25zdCB2YWx1ZXNfMSA9IGF3YWl0IFByb21pc2UuYWxsKHRoaXMuY2hhbm5lbHMubWFwKChjaGFubmVsKSA9PiBjaGFubmVsLnVuc3Vic2NyaWJlKCkpKTtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgIHJldHVybiB2YWx1ZXNfMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9ncyB0aGUgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEZvciBjdXN0b21pemVkIGxvZ2dpbmcsIGB0aGlzLmxvZ2dlcmAgY2FuIGJlIG92ZXJyaWRkZW4uXG4gICAgICovXG4gICAgbG9nKGtpbmQsIG1zZywgZGF0YSkge1xuICAgICAgICB0aGlzLmxvZ2dlcihraW5kLCBtc2csIGRhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBzb2NrZXQuXG4gICAgICovXG4gICAgY29ubmVjdGlvblN0YXRlKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuY29ubiAmJiB0aGlzLmNvbm4ucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBTT0NLRVRfU1RBVEVTLmNvbm5lY3Rpbmc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RJT05fU1RBVEUuQ29ubmVjdGluZztcbiAgICAgICAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5vcGVuOlxuICAgICAgICAgICAgICAgIHJldHVybiBDT05ORUNUSU9OX1NUQVRFLk9wZW47XG4gICAgICAgICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY2xvc2luZzpcbiAgICAgICAgICAgICAgICByZXR1cm4gQ09OTkVDVElPTl9TVEFURS5DbG9zaW5nO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gQ09OTkVDVElPTl9TVEFURS5DbG9zZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaXMgdGhlIGNvbm5lY3Rpb24gaXMgb3Blbi5cbiAgICAgKi9cbiAgICBpc0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvblN0YXRlKCkgPT09IENPTk5FQ1RJT05fU1RBVEUuT3BlbjtcbiAgICB9XG4gICAgY2hhbm5lbCh0b3BpYywgcGFyYW1zID0geyBjb25maWc6IHt9IH0pIHtcbiAgICAgICAgY29uc3QgY2hhbiA9IG5ldyBSZWFsdGltZUNoYW5uZWwoYHJlYWx0aW1lOiR7dG9waWN9YCwgcGFyYW1zLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jaGFubmVscy5wdXNoKGNoYW4pO1xuICAgICAgICByZXR1cm4gY2hhbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaCBvdXQgYSBtZXNzYWdlIGlmIHRoZSBzb2NrZXQgaXMgY29ubmVjdGVkLlxuICAgICAqXG4gICAgICogSWYgdGhlIHNvY2tldCBpcyBub3QgY29ubmVjdGVkLCB0aGUgbWVzc2FnZSBnZXRzIGVucXVldWVkIHdpdGhpbiBhIGxvY2FsIGJ1ZmZlciwgYW5kIHNlbnQgb3V0IHdoZW4gYSBjb25uZWN0aW9uIGlzIG5leHQgZXN0YWJsaXNoZWQuXG4gICAgICovXG4gICAgcHVzaChkYXRhKSB7XG4gICAgICAgIGNvbnN0IHsgdG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYgfSA9IGRhdGE7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbmNvZGUoZGF0YSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLmNvbm4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZW5kKHJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5sb2coJ3B1c2gnLCBgJHt0b3BpY30gJHtldmVudH0gKCR7cmVmfSlgLCBwYXlsb2FkKTtcbiAgICAgICAgaWYgKHRoaXMuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBKV1QgYWNjZXNzIHRva2VuIHVzZWQgZm9yIGNoYW5uZWwgc3Vic2NyaXB0aW9uIGF1dGhvcml6YXRpb24gYW5kIFJlYWx0aW1lIFJMUy5cbiAgICAgKlxuICAgICAqIElmIHBhcmFtIGlzIG51bGwgaXQgd2lsbCB1c2UgdGhlIGBhY2Nlc3NUb2tlbmAgY2FsbGJhY2sgZnVuY3Rpb24gb3IgdGhlIHRva2VuIHNldCBvbiB0aGUgY2xpZW50LlxuICAgICAqXG4gICAgICogT24gY2FsbGJhY2sgdXNlZCwgaXQgd2lsbCBzZXQgdGhlIHZhbHVlIG9mIHRoZSB0b2tlbiBpbnRlcm5hbCB0byB0aGUgY2xpZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHRva2VuIEEgSldUIHN0cmluZyB0byBvdmVycmlkZSB0aGUgdG9rZW4gc2V0IG9uIHRoZSBjbGllbnQuXG4gICAgICovXG4gICAgYXN5bmMgc2V0QXV0aCh0b2tlbiA9IG51bGwpIHtcbiAgICAgICAgbGV0IHRva2VuVG9TZW5kID0gdG9rZW4gfHxcbiAgICAgICAgICAgICh0aGlzLmFjY2Vzc1Rva2VuICYmIChhd2FpdCB0aGlzLmFjY2Vzc1Rva2VuKCkpKSB8fFxuICAgICAgICAgICAgdGhpcy5hY2Nlc3NUb2tlblZhbHVlO1xuICAgICAgICBpZiAodG9rZW5Ub1NlbmQpIHtcbiAgICAgICAgICAgIGxldCBwYXJzZWQgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJzZWQgPSBKU09OLnBhcnNlKGF0b2IodG9rZW5Ub1NlbmQuc3BsaXQoJy4nKVsxXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKF9lcnJvcikgeyB9XG4gICAgICAgICAgICBpZiAocGFyc2VkICYmIHBhcnNlZC5leHApIHtcbiAgICAgICAgICAgICAgICBsZXQgbm93ID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbGlkID0gbm93IC0gcGFyc2VkLmV4cCA8IDA7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZygnYXV0aCcsIGBJbnZhbGlkSldUVG9rZW46IEludmFsaWQgdmFsdWUgZm9yIEpXVCBjbGFpbSBcImV4cFwiIHdpdGggdmFsdWUgJHtwYXJzZWQuZXhwfWApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYEludmFsaWRKV1RUb2tlbjogSW52YWxpZCB2YWx1ZSBmb3IgSldUIGNsYWltIFwiZXhwXCIgd2l0aCB2YWx1ZSAke3BhcnNlZC5leHB9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hY2Nlc3NUb2tlblZhbHVlID0gdG9rZW5Ub1NlbmQ7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWxzLmZvckVhY2goKGNoYW5uZWwpID0+IHtcbiAgICAgICAgICAgICAgICB0b2tlblRvU2VuZCAmJiBjaGFubmVsLnVwZGF0ZUpvaW5QYXlsb2FkKHsgYWNjZXNzX3Rva2VuOiB0b2tlblRvU2VuZCB9KTtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbm5lbC5qb2luZWRPbmNlICYmIGNoYW5uZWwuX2lzSm9pbmVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5fcHVzaChDSEFOTkVMX0VWRU5UUy5hY2Nlc3NfdG9rZW4sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogdG9rZW5Ub1NlbmQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgaGVhcnRiZWF0IG1lc3NhZ2UgaWYgdGhlIHNvY2tldCBpcyBjb25uZWN0ZWQuXG4gICAgICovXG4gICAgYXN5bmMgc2VuZEhlYXJ0YmVhdCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIXRoaXMuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxvZygndHJhbnNwb3J0JywgJ2hlYXJ0YmVhdCB0aW1lb3V0LiBBdHRlbXB0aW5nIHRvIHJlLWVzdGFibGlzaCBjb25uZWN0aW9uJyk7XG4gICAgICAgICAgICAoX2EgPSB0aGlzLmNvbm4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbG9zZShXU19DTE9TRV9OT1JNQUwsICdoZWFyYmVhdCB0aW1lb3V0Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gdGhpcy5fbWFrZVJlZigpO1xuICAgICAgICB0aGlzLnB1c2goe1xuICAgICAgICAgICAgdG9waWM6ICdwaG9lbml4JyxcbiAgICAgICAgICAgIGV2ZW50OiAnaGVhcnRiZWF0JyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHt9LFxuICAgICAgICAgICAgcmVmOiB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldEF1dGgoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmx1c2hlcyBzZW5kIGJ1ZmZlclxuICAgICAqL1xuICAgIGZsdXNoU2VuZEJ1ZmZlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjaygpKTtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbmV4dCBtZXNzYWdlIHJlZiwgYWNjb3VudGluZyBmb3Igb3ZlcmZsb3dzXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBfbWFrZVJlZigpIHtcbiAgICAgICAgbGV0IG5ld1JlZiA9IHRoaXMucmVmICsgMTtcbiAgICAgICAgaWYgKG5ld1JlZiA9PT0gdGhpcy5yZWYpIHtcbiAgICAgICAgICAgIHRoaXMucmVmID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVmID0gbmV3UmVmO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlZi50b1N0cmluZygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZSBmcm9tIGNoYW5uZWxzIHdpdGggdGhlIHNwZWNpZmllZCB0b3BpYy5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9sZWF2ZU9wZW5Ub3BpYyh0b3BpYykge1xuICAgICAgICBsZXQgZHVwQ2hhbm5lbCA9IHRoaXMuY2hhbm5lbHMuZmluZCgoYykgPT4gYy50b3BpYyA9PT0gdG9waWMgJiYgKGMuX2lzSm9pbmVkKCkgfHwgYy5faXNKb2luaW5nKCkpKTtcbiAgICAgICAgaWYgKGR1cENoYW5uZWwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCd0cmFuc3BvcnQnLCBgbGVhdmluZyBkdXBsaWNhdGUgdG9waWMgXCIke3RvcGljfVwiYCk7XG4gICAgICAgICAgICBkdXBDaGFubmVsLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIHN1YnNjcmlwdGlvbiBmcm9tIHRoZSBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbm5lbCBBbiBvcGVuIHN1YnNjcmlwdGlvbi5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9yZW1vdmUoY2hhbm5lbCkge1xuICAgICAgICB0aGlzLmNoYW5uZWxzID0gdGhpcy5jaGFubmVscy5maWx0ZXIoKGMpID0+IGMuX2pvaW5SZWYoKSAhPT0gY2hhbm5lbC5fam9pblJlZigpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBjb25uZWN0aW9uIGhhbmRsZXJzLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgc2V0dXBDb25uZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5jb25uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm4uYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgICAgICB0aGlzLmNvbm4ub25vcGVuID0gKCkgPT4gdGhpcy5fb25Db25uT3BlbigpO1xuICAgICAgICAgICAgdGhpcy5jb25uLm9uZXJyb3IgPSAoZXJyb3IpID0+IHRoaXMuX29uQ29ubkVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIHRoaXMuY29ubi5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHRoaXMuX29uQ29ubk1lc3NhZ2UoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5jb25uLm9uY2xvc2UgPSAoZXZlbnQpID0+IHRoaXMuX29uQ29ubkNsb3NlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX29uQ29ubk1lc3NhZ2UocmF3TWVzc2FnZSkge1xuICAgICAgICB0aGlzLmRlY29kZShyYXdNZXNzYWdlLmRhdGEsIChtc2cpID0+IHtcbiAgICAgICAgICAgIGxldCB7IHRvcGljLCBldmVudCwgcGF5bG9hZCwgcmVmIH0gPSBtc2c7XG4gICAgICAgICAgICBpZiAocmVmICYmIHJlZiA9PT0gdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9nKCdyZWNlaXZlJywgYCR7cGF5bG9hZC5zdGF0dXMgfHwgJyd9ICR7dG9waWN9ICR7ZXZlbnR9ICR7KHJlZiAmJiAnKCcgKyByZWYgKyAnKScpIHx8ICcnfWAsIHBheWxvYWQpO1xuICAgICAgICAgICAgdGhpcy5jaGFubmVsc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGNoYW5uZWwpID0+IGNoYW5uZWwuX2lzTWVtYmVyKHRvcGljKSlcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoY2hhbm5lbCkgPT4gY2hhbm5lbC5fdHJpZ2dlcihldmVudCwgcGF5bG9hZCwgcmVmKSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2UuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKG1zZykpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIGFzeW5jIF9vbkNvbm5PcGVuKCkge1xuICAgICAgICB0aGlzLmxvZygndHJhbnNwb3J0JywgYGNvbm5lY3RlZCB0byAke3RoaXMuZW5kcG9pbnRVUkwoKX1gKTtcbiAgICAgICAgdGhpcy5mbHVzaFNlbmRCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpO1xuICAgICAgICBpZiAoIXRoaXMud29ya2VyKSB7XG4gICAgICAgICAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyICYmIGNsZWFySW50ZXJ2YWwodGhpcy5oZWFydGJlYXRUaW1lcik7XG4gICAgICAgICAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5zZW5kSGVhcnRiZWF0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy53b3JrZXJVcmwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnd29ya2VyJywgYHN0YXJ0aW5nIHdvcmtlciBmb3IgZnJvbSAke3RoaXMud29ya2VyVXJsfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ3dvcmtlcicsIGBzdGFydGluZyBkZWZhdWx0IHdvcmtlcmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0VXJsID0gdGhpcy5fd29ya2VyT2JqZWN0VXJsKHRoaXMud29ya2VyVXJsKTtcbiAgICAgICAgICAgIHRoaXMud29ya2VyUmVmID0gbmV3IFdvcmtlcihvYmplY3RVcmwpO1xuICAgICAgICAgICAgdGhpcy53b3JrZXJSZWYub25lcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCd3b3JrZXInLCAnd29ya2VyIGVycm9yJywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy53b3JrZXJSZWYudGVybWluYXRlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy53b3JrZXJSZWYub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09ICdrZWVwQWxpdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZEhlYXJ0YmVhdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLndvcmtlclJlZi5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWw6IHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soKSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfb25Db25uQ2xvc2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5sb2coJ3RyYW5zcG9ydCcsICdjbG9zZScsIGV2ZW50KTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5FcnJvcigpO1xuICAgICAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyICYmIGNsZWFySW50ZXJ2YWwodGhpcy5oZWFydGJlYXRUaW1lcik7XG4gICAgICAgIHRoaXMucmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKGV2ZW50KSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfb25Db25uRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5sb2coJ3RyYW5zcG9ydCcsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLl90cmlnZ2VyQ2hhbkVycm9yKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKGVycm9yKSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfdHJpZ2dlckNoYW5FcnJvcigpIHtcbiAgICAgICAgdGhpcy5jaGFubmVscy5mb3JFYWNoKChjaGFubmVsKSA9PiBjaGFubmVsLl90cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmVycm9yKSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfYXBwZW5kUGFyYW1zKHVybCwgcGFyYW1zKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmVmaXggPSB1cmwubWF0Y2goL1xcPy8pID8gJyYnIDogJz8nO1xuICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIGAke3VybH0ke3ByZWZpeH0ke3F1ZXJ5fWA7XG4gICAgfVxuICAgIF93b3JrZXJPYmplY3RVcmwodXJsKSB7XG4gICAgICAgIGxldCByZXN1bHRfdXJsO1xuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICByZXN1bHRfdXJsID0gdXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtXT1JLRVJfU0NSSVBUXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vamF2YXNjcmlwdCcgfSk7XG4gICAgICAgICAgICByZXN1bHRfdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0X3VybDtcbiAgICB9XG59XG5jbGFzcyBXU1dlYlNvY2tldER1bW15IHtcbiAgICBjb25zdHJ1Y3RvcihhZGRyZXNzLCBfcHJvdG9jb2xzLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgIHRoaXMub25jbG9zZSA9ICgpID0+IHsgfTtcbiAgICAgICAgdGhpcy5vbmVycm9yID0gKCkgPT4geyB9O1xuICAgICAgICB0aGlzLm9ubWVzc2FnZSA9ICgpID0+IHsgfTtcbiAgICAgICAgdGhpcy5vbm9wZW4gPSAoKSA9PiB7IH07XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZztcbiAgICAgICAgdGhpcy5zZW5kID0gKCkgPT4geyB9O1xuICAgICAgICB0aGlzLnVybCA9IG51bGw7XG4gICAgICAgIHRoaXMudXJsID0gYWRkcmVzcztcbiAgICAgICAgdGhpcy5jbG9zZSA9IG9wdGlvbnMuY2xvc2U7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVhbHRpbWVDbGllbnQuanMubWFwIiwiLypcbiAgVGhpcyBmaWxlIGRyYXdzIGhlYXZpbHkgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vcGhvZW5peGZyYW1ld29yay9waG9lbml4L2Jsb2IvZDM0NGVjMGE3MzJhYjRlZTIwNDIxNWIzMWRlNjljZjRiZTcyZTNiZi9hc3NldHMvanMvcGhvZW5peC9wcmVzZW5jZS5qc1xuICBMaWNlbnNlOiBodHRwczovL2dpdGh1Yi5jb20vcGhvZW5peGZyYW1ld29yay9waG9lbml4L2Jsb2IvZDM0NGVjMGE3MzJhYjRlZTIwNDIxNWIzMWRlNjljZjRiZTcyZTNiZi9MSUNFTlNFLm1kXG4qL1xuZXhwb3J0IHZhciBSRUFMVElNRV9QUkVTRU5DRV9MSVNURU5fRVZFTlRTO1xuKGZ1bmN0aW9uIChSRUFMVElNRV9QUkVTRU5DRV9MSVNURU5fRVZFTlRTKSB7XG4gICAgUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UU1tcIlNZTkNcIl0gPSBcInN5bmNcIjtcbiAgICBSRUFMVElNRV9QUkVTRU5DRV9MSVNURU5fRVZFTlRTW1wiSk9JTlwiXSA9IFwiam9pblwiO1xuICAgIFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFNbXCJMRUFWRVwiXSA9IFwibGVhdmVcIjtcbn0pKFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFMgfHwgKFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFMgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVhbHRpbWVQcmVzZW5jZSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIFByZXNlbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5uZWwgLSBUaGUgUmVhbHRpbWVDaGFubmVsXG4gICAgICogQHBhcmFtIG9wdHMgLSBUaGUgb3B0aW9ucyxcbiAgICAgKiAgICAgICAgZm9yIGV4YW1wbGUgYHtldmVudHM6IHtzdGF0ZTogJ3N0YXRlJywgZGlmZjogJ2RpZmYnfX1gXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2hhbm5lbCwgb3B0cykge1xuICAgICAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsO1xuICAgICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW107XG4gICAgICAgIHRoaXMuam9pblJlZiA9IG51bGw7XG4gICAgICAgIHRoaXMuY2FsbGVyID0ge1xuICAgICAgICAgICAgb25Kb2luOiAoKSA9PiB7IH0sXG4gICAgICAgICAgICBvbkxlYXZlOiAoKSA9PiB7IH0sXG4gICAgICAgICAgICBvblN5bmM6ICgpID0+IHsgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gKG9wdHMgPT09IG51bGwgfHwgb3B0cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0cy5ldmVudHMpIHx8IHtcbiAgICAgICAgICAgIHN0YXRlOiAncHJlc2VuY2Vfc3RhdGUnLFxuICAgICAgICAgICAgZGlmZjogJ3ByZXNlbmNlX2RpZmYnLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNoYW5uZWwuX29uKGV2ZW50cy5zdGF0ZSwge30sIChuZXdTdGF0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBvbkpvaW4sIG9uTGVhdmUsIG9uU3luYyB9ID0gdGhpcy5jYWxsZXI7XG4gICAgICAgICAgICB0aGlzLmpvaW5SZWYgPSB0aGlzLmNoYW5uZWwuX2pvaW5SZWYoKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBSZWFsdGltZVByZXNlbmNlLnN5bmNTdGF0ZSh0aGlzLnN0YXRlLCBuZXdTdGF0ZSwgb25Kb2luLCBvbkxlYXZlKTtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0RpZmZzLmZvckVhY2goKGRpZmYpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gUmVhbHRpbWVQcmVzZW5jZS5zeW5jRGlmZih0aGlzLnN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdO1xuICAgICAgICAgICAgb25TeW5jKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNoYW5uZWwuX29uKGV2ZW50cy5kaWZmLCB7fSwgKGRpZmYpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb25Kb2luLCBvbkxlYXZlLCBvblN5bmMgfSA9IHRoaXMuY2FsbGVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5QZW5kaW5nU3luY1N0YXRlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdEaWZmcy5wdXNoKGRpZmYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFJlYWx0aW1lUHJlc2VuY2Uuc3luY0RpZmYodGhpcy5zdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKTtcbiAgICAgICAgICAgICAgICBvblN5bmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25Kb2luKChrZXksIGN1cnJlbnRQcmVzZW5jZXMsIG5ld1ByZXNlbmNlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFubmVsLl90cmlnZ2VyKCdwcmVzZW5jZScsIHtcbiAgICAgICAgICAgICAgICBldmVudDogJ2pvaW4nLFxuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJlc2VuY2VzLFxuICAgICAgICAgICAgICAgIG5ld1ByZXNlbmNlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkxlYXZlKChrZXksIGN1cnJlbnRQcmVzZW5jZXMsIGxlZnRQcmVzZW5jZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbC5fdHJpZ2dlcigncHJlc2VuY2UnLCB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdsZWF2ZScsXG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcmVzZW5jZXMsXG4gICAgICAgICAgICAgICAgbGVmdFByZXNlbmNlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vblN5bmMoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFubmVsLl90cmlnZ2VyKCdwcmVzZW5jZScsIHsgZXZlbnQ6ICdzeW5jJyB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gc3luYyB0aGUgbGlzdCBvZiBwcmVzZW5jZXMgb24gdGhlIHNlcnZlciB3aXRoIHRoZVxuICAgICAqIGNsaWVudCdzIHN0YXRlLlxuICAgICAqXG4gICAgICogQW4gb3B0aW9uYWwgYG9uSm9pbmAgYW5kIGBvbkxlYXZlYCBjYWxsYmFjayBjYW4gYmUgcHJvdmlkZWQgdG9cbiAgICAgKiByZWFjdCB0byBjaGFuZ2VzIGluIHRoZSBjbGllbnQncyBsb2NhbCBwcmVzZW5jZXMgYWNyb3NzXG4gICAgICogZGlzY29ubmVjdHMgYW5kIHJlY29ubmVjdHMgd2l0aCB0aGUgc2VydmVyLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgc3RhdGljIHN5bmNTdGF0ZShjdXJyZW50U3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmNsb25lRGVlcChjdXJyZW50U3RhdGUpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZFN0YXRlID0gdGhpcy50cmFuc2Zvcm1TdGF0ZShuZXdTdGF0ZSk7XG4gICAgICAgIGNvbnN0IGpvaW5zID0ge307XG4gICAgICAgIGNvbnN0IGxlYXZlcyA9IHt9O1xuICAgICAgICB0aGlzLm1hcChzdGF0ZSwgKGtleSwgcHJlc2VuY2VzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRyYW5zZm9ybWVkU3RhdGVba2V5XSkge1xuICAgICAgICAgICAgICAgIGxlYXZlc1trZXldID0gcHJlc2VuY2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tYXAodHJhbnNmb3JtZWRTdGF0ZSwgKGtleSwgbmV3UHJlc2VuY2VzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UHJlc2VuY2VzID0gc3RhdGVba2V5XTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UHJlc2VuY2VzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UHJlc2VuY2VSZWZzID0gbmV3UHJlc2VuY2VzLm1hcCgobSkgPT4gbS5wcmVzZW5jZV9yZWYpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1clByZXNlbmNlUmVmcyA9IGN1cnJlbnRQcmVzZW5jZXMubWFwKChtKSA9PiBtLnByZXNlbmNlX3JlZik7XG4gICAgICAgICAgICAgICAgY29uc3Qgam9pbmVkUHJlc2VuY2VzID0gbmV3UHJlc2VuY2VzLmZpbHRlcigobSkgPT4gY3VyUHJlc2VuY2VSZWZzLmluZGV4T2YobS5wcmVzZW5jZV9yZWYpIDwgMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGVmdFByZXNlbmNlcyA9IGN1cnJlbnRQcmVzZW5jZXMuZmlsdGVyKChtKSA9PiBuZXdQcmVzZW5jZVJlZnMuaW5kZXhPZihtLnByZXNlbmNlX3JlZikgPCAwKTtcbiAgICAgICAgICAgICAgICBpZiAoam9pbmVkUHJlc2VuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgam9pbnNba2V5XSA9IGpvaW5lZFByZXNlbmNlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxlZnRQcmVzZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZWF2ZXNba2V5XSA9IGxlZnRQcmVzZW5jZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNEaWZmKHN0YXRlLCB7IGpvaW5zLCBsZWF2ZXMgfSwgb25Kb2luLCBvbkxlYXZlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBzeW5jIGEgZGlmZiBvZiBwcmVzZW5jZSBqb2luIGFuZCBsZWF2ZSBldmVudHMgZnJvbSB0aGVcbiAgICAgKiBzZXJ2ZXIsIGFzIHRoZXkgaGFwcGVuLlxuICAgICAqXG4gICAgICogTGlrZSBgc3luY1N0YXRlYCwgYHN5bmNEaWZmYCBhY2NlcHRzIG9wdGlvbmFsIGBvbkpvaW5gIGFuZFxuICAgICAqIGBvbkxlYXZlYCBjYWxsYmFja3MgdG8gcmVhY3QgdG8gYSB1c2VyIGpvaW5pbmcgb3IgbGVhdmluZyBmcm9tIGFcbiAgICAgKiBkZXZpY2UuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBzdGF0aWMgc3luY0RpZmYoc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSkge1xuICAgICAgICBjb25zdCB7IGpvaW5zLCBsZWF2ZXMgfSA9IHtcbiAgICAgICAgICAgIGpvaW5zOiB0aGlzLnRyYW5zZm9ybVN0YXRlKGRpZmYuam9pbnMpLFxuICAgICAgICAgICAgbGVhdmVzOiB0aGlzLnRyYW5zZm9ybVN0YXRlKGRpZmYubGVhdmVzKSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFvbkpvaW4pIHtcbiAgICAgICAgICAgIG9uSm9pbiA9ICgpID0+IHsgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9uTGVhdmUpIHtcbiAgICAgICAgICAgIG9uTGVhdmUgPSAoKSA9PiB7IH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXAoam9pbnMsIChrZXksIG5ld1ByZXNlbmNlcykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFByZXNlbmNlcyA9IChfYSA9IHN0YXRlW2tleV0pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdO1xuICAgICAgICAgICAgc3RhdGVba2V5XSA9IHRoaXMuY2xvbmVEZWVwKG5ld1ByZXNlbmNlcyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFByZXNlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgam9pbmVkUHJlc2VuY2VSZWZzID0gc3RhdGVba2V5XS5tYXAoKG0pID0+IG0ucHJlc2VuY2VfcmVmKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJQcmVzZW5jZXMgPSBjdXJyZW50UHJlc2VuY2VzLmZpbHRlcigobSkgPT4gam9pbmVkUHJlc2VuY2VSZWZzLmluZGV4T2YobS5wcmVzZW5jZV9yZWYpIDwgMCk7XG4gICAgICAgICAgICAgICAgc3RhdGVba2V5XS51bnNoaWZ0KC4uLmN1clByZXNlbmNlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkpvaW4oa2V5LCBjdXJyZW50UHJlc2VuY2VzLCBuZXdQcmVzZW5jZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tYXAobGVhdmVzLCAoa2V5LCBsZWZ0UHJlc2VuY2VzKSA9PiB7XG4gICAgICAgICAgICBsZXQgY3VycmVudFByZXNlbmNlcyA9IHN0YXRlW2tleV07XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRQcmVzZW5jZXMpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgcHJlc2VuY2VSZWZzVG9SZW1vdmUgPSBsZWZ0UHJlc2VuY2VzLm1hcCgobSkgPT4gbS5wcmVzZW5jZV9yZWYpO1xuICAgICAgICAgICAgY3VycmVudFByZXNlbmNlcyA9IGN1cnJlbnRQcmVzZW5jZXMuZmlsdGVyKChtKSA9PiBwcmVzZW5jZVJlZnNUb1JlbW92ZS5pbmRleE9mKG0ucHJlc2VuY2VfcmVmKSA8IDApO1xuICAgICAgICAgICAgc3RhdGVba2V5XSA9IGN1cnJlbnRQcmVzZW5jZXM7XG4gICAgICAgICAgICBvbkxlYXZlKGtleSwgY3VycmVudFByZXNlbmNlcywgbGVmdFByZXNlbmNlcyk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFByZXNlbmNlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBzdGF0aWMgbWFwKG9iaiwgZnVuYykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5tYXAoKGtleSkgPT4gZnVuYyhrZXksIG9ialtrZXldKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSAnbWV0YXMnIGtleVxuICAgICAqIENoYW5nZSAncGh4X3JlZicgdG8gJ3ByZXNlbmNlX3JlZidcbiAgICAgKiBSZW1vdmUgJ3BoeF9yZWYnIGFuZCAncGh4X3JlZl9wcmV2J1xuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyByZXR1cm5zIHtcbiAgICAgKiAgYWJjMTIzOiBbXG4gICAgICogICAgeyBwcmVzZW5jZV9yZWY6ICcyJywgdXNlcl9pZDogMSB9LFxuICAgICAqICAgIHsgcHJlc2VuY2VfcmVmOiAnMycsIHVzZXJfaWQ6IDIgfVxuICAgICAqICBdXG4gICAgICogfVxuICAgICAqIFJlYWx0aW1lUHJlc2VuY2UudHJhbnNmb3JtU3RhdGUoe1xuICAgICAqICBhYmMxMjM6IHtcbiAgICAgKiAgICBtZXRhczogW1xuICAgICAqICAgICAgeyBwaHhfcmVmOiAnMicsIHBoeF9yZWZfcHJldjogJzEnIHVzZXJfaWQ6IDEgfSxcbiAgICAgKiAgICAgIHsgcGh4X3JlZjogJzMnLCB1c2VyX2lkOiAyIH1cbiAgICAgKiAgICBdXG4gICAgICogIH1cbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgc3RhdGljIHRyYW5zZm9ybVN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHN0YXRlID0gdGhpcy5jbG9uZURlZXAoc3RhdGUpO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3RhdGUpLnJlZHVjZSgobmV3U3RhdGUsIGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJlc2VuY2VzID0gc3RhdGVba2V5XTtcbiAgICAgICAgICAgIGlmICgnbWV0YXMnIGluIHByZXNlbmNlcykge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlW2tleV0gPSBwcmVzZW5jZXMubWV0YXMubWFwKChwcmVzZW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwcmVzZW5jZVsncHJlc2VuY2VfcmVmJ10gPSBwcmVzZW5jZVsncGh4X3JlZiddO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcHJlc2VuY2VbJ3BoeF9yZWYnXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHByZXNlbmNlWydwaHhfcmVmX3ByZXYnXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXNlbmNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGVba2V5XSA9IHByZXNlbmNlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgICAgfSwge30pO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgc3RhdGljIGNsb25lRGVlcChvYmopIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBvbkpvaW4oY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsZXIub25Kb2luID0gY2FsbGJhY2s7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBvbkxlYXZlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FsbGVyLm9uTGVhdmUgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIG9uU3luYyhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNhbGxlci5vblN5bmMgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIGluUGVuZGluZ1N5bmNTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmpvaW5SZWYgfHwgdGhpcy5qb2luUmVmICE9PSB0aGlzLmNoYW5uZWwuX2pvaW5SZWYoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWFsdGltZVByZXNlbmNlLmpzLm1hcCIsImltcG9ydCBSZWFsdGltZUNsaWVudCBmcm9tICcuL1JlYWx0aW1lQ2xpZW50JztcbmltcG9ydCBSZWFsdGltZUNoYW5uZWwsIHsgUkVBTFRJTUVfTElTVEVOX1RZUEVTLCBSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVCwgUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUywgUkVBTFRJTUVfQ0hBTk5FTF9TVEFURVMsIH0gZnJvbSAnLi9SZWFsdGltZUNoYW5uZWwnO1xuaW1wb3J0IFJlYWx0aW1lUHJlc2VuY2UsIHsgUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UUywgfSBmcm9tICcuL1JlYWx0aW1lUHJlc2VuY2UnO1xuZXhwb3J0IHsgUmVhbHRpbWVQcmVzZW5jZSwgUmVhbHRpbWVDaGFubmVsLCBSZWFsdGltZUNsaWVudCwgUkVBTFRJTUVfTElTVEVOX1RZUEVTLCBSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVCwgUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UUywgUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUywgUkVBTFRJTUVfQ0hBTk5FTF9TVEFURVMsIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX0hFQURFUlMgPSB7ICdYLUNsaWVudC1JbmZvJzogYHJlYWx0aW1lLWpzLyR7dmVyc2lvbn1gIH07XG5leHBvcnQgY29uc3QgVlNOID0gJzEuMC4wJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDAwMDtcbmV4cG9ydCBjb25zdCBXU19DTE9TRV9OT1JNQUwgPSAxMDAwO1xuZXhwb3J0IHZhciBTT0NLRVRfU1RBVEVTO1xuKGZ1bmN0aW9uIChTT0NLRVRfU1RBVEVTKSB7XG4gICAgU09DS0VUX1NUQVRFU1tTT0NLRVRfU1RBVEVTW1wiY29ubmVjdGluZ1wiXSA9IDBdID0gXCJjb25uZWN0aW5nXCI7XG4gICAgU09DS0VUX1NUQVRFU1tTT0NLRVRfU1RBVEVTW1wib3BlblwiXSA9IDFdID0gXCJvcGVuXCI7XG4gICAgU09DS0VUX1NUQVRFU1tTT0NLRVRfU1RBVEVTW1wiY2xvc2luZ1wiXSA9IDJdID0gXCJjbG9zaW5nXCI7XG4gICAgU09DS0VUX1NUQVRFU1tTT0NLRVRfU1RBVEVTW1wiY2xvc2VkXCJdID0gM10gPSBcImNsb3NlZFwiO1xufSkoU09DS0VUX1NUQVRFUyB8fCAoU09DS0VUX1NUQVRFUyA9IHt9KSk7XG5leHBvcnQgdmFyIENIQU5ORUxfU1RBVEVTO1xuKGZ1bmN0aW9uIChDSEFOTkVMX1NUQVRFUykge1xuICAgIENIQU5ORUxfU1RBVEVTW1wiY2xvc2VkXCJdID0gXCJjbG9zZWRcIjtcbiAgICBDSEFOTkVMX1NUQVRFU1tcImVycm9yZWRcIl0gPSBcImVycm9yZWRcIjtcbiAgICBDSEFOTkVMX1NUQVRFU1tcImpvaW5lZFwiXSA9IFwiam9pbmVkXCI7XG4gICAgQ0hBTk5FTF9TVEFURVNbXCJqb2luaW5nXCJdID0gXCJqb2luaW5nXCI7XG4gICAgQ0hBTk5FTF9TVEFURVNbXCJsZWF2aW5nXCJdID0gXCJsZWF2aW5nXCI7XG59KShDSEFOTkVMX1NUQVRFUyB8fCAoQ0hBTk5FTF9TVEFURVMgPSB7fSkpO1xuZXhwb3J0IHZhciBDSEFOTkVMX0VWRU5UUztcbihmdW5jdGlvbiAoQ0hBTk5FTF9FVkVOVFMpIHtcbiAgICBDSEFOTkVMX0VWRU5UU1tcImNsb3NlXCJdID0gXCJwaHhfY2xvc2VcIjtcbiAgICBDSEFOTkVMX0VWRU5UU1tcImVycm9yXCJdID0gXCJwaHhfZXJyb3JcIjtcbiAgICBDSEFOTkVMX0VWRU5UU1tcImpvaW5cIl0gPSBcInBoeF9qb2luXCI7XG4gICAgQ0hBTk5FTF9FVkVOVFNbXCJyZXBseVwiXSA9IFwicGh4X3JlcGx5XCI7XG4gICAgQ0hBTk5FTF9FVkVOVFNbXCJsZWF2ZVwiXSA9IFwicGh4X2xlYXZlXCI7XG4gICAgQ0hBTk5FTF9FVkVOVFNbXCJhY2Nlc3NfdG9rZW5cIl0gPSBcImFjY2Vzc190b2tlblwiO1xufSkoQ0hBTk5FTF9FVkVOVFMgfHwgKENIQU5ORUxfRVZFTlRTID0ge30pKTtcbmV4cG9ydCB2YXIgVFJBTlNQT1JUUztcbihmdW5jdGlvbiAoVFJBTlNQT1JUUykge1xuICAgIFRSQU5TUE9SVFNbXCJ3ZWJzb2NrZXRcIl0gPSBcIndlYnNvY2tldFwiO1xufSkoVFJBTlNQT1JUUyB8fCAoVFJBTlNQT1JUUyA9IHt9KSk7XG5leHBvcnQgdmFyIENPTk5FQ1RJT05fU1RBVEU7XG4oZnVuY3Rpb24gKENPTk5FQ1RJT05fU1RBVEUpIHtcbiAgICBDT05ORUNUSU9OX1NUQVRFW1wiQ29ubmVjdGluZ1wiXSA9IFwiY29ubmVjdGluZ1wiO1xuICAgIENPTk5FQ1RJT05fU1RBVEVbXCJPcGVuXCJdID0gXCJvcGVuXCI7XG4gICAgQ09OTkVDVElPTl9TVEFURVtcIkNsb3NpbmdcIl0gPSBcImNsb3NpbmdcIjtcbiAgICBDT05ORUNUSU9OX1NUQVRFW1wiQ2xvc2VkXCJdID0gXCJjbG9zZWRcIjtcbn0pKENPTk5FQ1RJT05fU1RBVEUgfHwgKENPTk5FQ1RJT05fU1RBVEUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsImltcG9ydCB7IERFRkFVTFRfVElNRU9VVCB9IGZyb20gJy4uL2xpYi9jb25zdGFudHMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVzaCB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIFB1c2hcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFubmVsIFRoZSBDaGFubmVsXG4gICAgICogQHBhcmFtIGV2ZW50IFRoZSBldmVudCwgZm9yIGV4YW1wbGUgYFwicGh4X2pvaW5cImBcbiAgICAgKiBAcGFyYW0gcGF5bG9hZCBUaGUgcGF5bG9hZCwgZm9yIGV4YW1wbGUgYHt1c2VyX2lkOiAxMjN9YFxuICAgICAqIEBwYXJhbSB0aW1lb3V0IFRoZSBwdXNoIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2hhbm5lbCwgZXZlbnQsIHBheWxvYWQgPSB7fSwgdGltZW91dCA9IERFRkFVTFRfVElNRU9VVCkge1xuICAgICAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsO1xuICAgICAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuc2VudCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbWVvdXRUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5yZWYgPSAnJztcbiAgICAgICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBudWxsO1xuICAgICAgICB0aGlzLnJlY0hvb2tzID0gW107XG4gICAgICAgIHRoaXMucmVmRXZlbnQgPSBudWxsO1xuICAgIH1cbiAgICByZXNlbmQodGltZW91dCkge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgICAgICB0aGlzLl9jYW5jZWxSZWZFdmVudCgpO1xuICAgICAgICB0aGlzLnJlZiA9ICcnO1xuICAgICAgICB0aGlzLnJlZkV2ZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZW5kKCk7XG4gICAgfVxuICAgIHNlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNSZWNlaXZlZCgndGltZW91dCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFydFRpbWVvdXQoKTtcbiAgICAgICAgdGhpcy5zZW50ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGFubmVsLnNvY2tldC5wdXNoKHtcbiAgICAgICAgICAgIHRvcGljOiB0aGlzLmNoYW5uZWwudG9waWMsXG4gICAgICAgICAgICBldmVudDogdGhpcy5ldmVudCxcbiAgICAgICAgICAgIHBheWxvYWQ6IHRoaXMucGF5bG9hZCxcbiAgICAgICAgICAgIHJlZjogdGhpcy5yZWYsXG4gICAgICAgICAgICBqb2luX3JlZjogdGhpcy5jaGFubmVsLl9qb2luUmVmKCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGVQYXlsb2FkKHBheWxvYWQpIHtcbiAgICAgICAgdGhpcy5wYXlsb2FkID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBheWxvYWQpLCBwYXlsb2FkKTtcbiAgICB9XG4gICAgcmVjZWl2ZShzdGF0dXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHRoaXMuX2hhc1JlY2VpdmVkKHN0YXR1cykpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKChfYSA9IHRoaXMucmVjZWl2ZWRSZXNwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVjSG9va3MucHVzaCh7IHN0YXR1cywgY2FsbGJhY2sgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzdGFydFRpbWVvdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXRUaW1lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmID0gdGhpcy5jaGFubmVsLnNvY2tldC5fbWFrZVJlZigpO1xuICAgICAgICB0aGlzLnJlZkV2ZW50ID0gdGhpcy5jaGFubmVsLl9yZXBseUV2ZW50TmFtZSh0aGlzLnJlZik7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKHBheWxvYWQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NhbmNlbFJlZkV2ZW50KCk7XG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxUaW1lb3V0KCk7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IHBheWxvYWQ7XG4gICAgICAgICAgICB0aGlzLl9tYXRjaFJlY2VpdmUocGF5bG9hZCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2hhbm5lbC5fb24odGhpcy5yZWZFdmVudCwge30sIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy50aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcigndGltZW91dCcsIHt9KTtcbiAgICAgICAgfSwgdGhpcy50aW1lb3V0KTtcbiAgICB9XG4gICAgdHJpZ2dlcihzdGF0dXMsIHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZkV2ZW50KVxuICAgICAgICAgICAgdGhpcy5jaGFubmVsLl90cmlnZ2VyKHRoaXMucmVmRXZlbnQsIHsgc3RhdHVzLCByZXNwb25zZSB9KTtcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fY2FuY2VsUmVmRXZlbnQoKTtcbiAgICAgICAgdGhpcy5fY2FuY2VsVGltZW91dCgpO1xuICAgIH1cbiAgICBfY2FuY2VsUmVmRXZlbnQoKSB7XG4gICAgICAgIGlmICghdGhpcy5yZWZFdmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbm5lbC5fb2ZmKHRoaXMucmVmRXZlbnQsIHt9KTtcbiAgICB9XG4gICAgX2NhbmNlbFRpbWVvdXQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRUaW1lcik7XG4gICAgICAgIHRoaXMudGltZW91dFRpbWVyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBfbWF0Y2hSZWNlaXZlKHsgc3RhdHVzLCByZXNwb25zZSwgfSkge1xuICAgICAgICB0aGlzLnJlY0hvb2tzXG4gICAgICAgICAgICAuZmlsdGVyKChoKSA9PiBoLnN0YXR1cyA9PT0gc3RhdHVzKVxuICAgICAgICAgICAgLmZvckVhY2goKGgpID0+IGguY2FsbGJhY2socmVzcG9uc2UpKTtcbiAgICB9XG4gICAgX2hhc1JlY2VpdmVkKHN0YXR1cykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWNlaXZlZFJlc3AgJiYgdGhpcy5yZWNlaXZlZFJlc3Auc3RhdHVzID09PSBzdGF0dXM7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVzaC5qcy5tYXAiLCIvLyBUaGlzIGZpbGUgZHJhd3MgaGVhdmlseSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXgvY29tbWl0L2NmMDk4ZTljZjdhNDRlZTY0NzlkMzFkOTExYTk3ZDNjNzQzMGM2ZmVcbi8vIExpY2Vuc2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXgvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VyaWFsaXplciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuSEVBREVSX0xFTkdUSCA9IDE7XG4gICAgfVxuICAgIGRlY29kZShyYXdQYXlsb2FkLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAocmF3UGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLl9iaW5hcnlEZWNvZGUocmF3UGF5bG9hZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmF3UGF5bG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhKU09OLnBhcnNlKHJhd1BheWxvYWQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soe30pO1xuICAgIH1cbiAgICBfYmluYXJ5RGVjb2RlKGJ1ZmZlcikge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gICAgICAgIGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlY29kZUJyb2FkY2FzdChidWZmZXIsIHZpZXcsIGRlY29kZXIpO1xuICAgIH1cbiAgICBfZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2Rlcikge1xuICAgICAgICBjb25zdCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDEpO1xuICAgICAgICBjb25zdCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDIpO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgMjtcbiAgICAgICAgY29uc3QgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKTtcbiAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplO1xuICAgICAgICBjb25zdCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpO1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemU7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKSkpO1xuICAgICAgICByZXR1cm4geyByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhIH07XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VyaWFsaXplci5qcy5tYXAiLCIvKipcbiAqIENyZWF0ZXMgYSB0aW1lciB0aGF0IGFjY2VwdHMgYSBgdGltZXJDYWxjYCBmdW5jdGlvbiB0byBwZXJmb3JtIGNhbGN1bGF0ZWQgdGltZW91dCByZXRyaWVzLCBzdWNoIGFzIGV4cG9uZW50aWFsIGJhY2tvZmYuXG4gKlxuICogQGV4YW1wbGVcbiAqICAgIGxldCByZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB0aGlzLmNvbm5lY3QoKSwgZnVuY3Rpb24odHJpZXMpe1xuICogICAgICByZXR1cm4gWzEwMDAsIDUwMDAsIDEwMDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiAgICB9KVxuICogICAgcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICogICAgcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgNTAwMFxuICogICAgcmVjb25uZWN0VGltZXIucmVzZXQoKVxuICogICAgcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lciB7XG4gICAgY29uc3RydWN0b3IoY2FsbGJhY2ssIHRpbWVyQ2FsYykge1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMudGltZXJDYWxjID0gdGltZXJDYWxjO1xuICAgICAgICB0aGlzLnRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnRyaWVzID0gMDtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLnRpbWVyQ2FsYyA9IHRpbWVyQ2FsYztcbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMudHJpZXMgPSAwO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgfVxuICAgIC8vIENhbmNlbHMgYW55IHByZXZpb3VzIHNjaGVkdWxlVGltZW91dCBhbmQgc2NoZWR1bGVzIGNhbGxiYWNrXG4gICAgc2NoZWR1bGVUaW1lb3V0KCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJpZXMgPSB0aGlzLnRyaWVzICsgMTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgfSwgdGhpcy50aW1lckNhbGModGhpcy50cmllcyArIDEpKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lci5qcy5tYXAiLCIvKipcbiAqIEhlbHBlcnMgdG8gY29udmVydCB0aGUgY2hhbmdlIFBheWxvYWQgaW50byBuYXRpdmUgSlMgdHlwZXMuXG4gKi9cbi8vIEFkYXB0ZWQgZnJvbSBlcGdzcWwgKHNyYy9lcGdzcWxfYmluYXJ5LmVybCksIHRoaXMgbW9kdWxlIGxpY2Vuc2VkIHVuZGVyXG4vLyAzLWNsYXVzZSBCU0QgZm91bmQgaGVyZTogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2VwZ3NxbC9lcGdzcWwvZGV2ZWwvTElDRU5TRVxuZXhwb3J0IHZhciBQb3N0Z3Jlc1R5cGVzO1xuKGZ1bmN0aW9uIChQb3N0Z3Jlc1R5cGVzKSB7XG4gICAgUG9zdGdyZXNUeXBlc1tcImFic3RpbWVcIl0gPSBcImFic3RpbWVcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiYm9vbFwiXSA9IFwiYm9vbFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJkYXRlXCJdID0gXCJkYXRlXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImRhdGVyYW5nZVwiXSA9IFwiZGF0ZXJhbmdlXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImZsb2F0NFwiXSA9IFwiZmxvYXQ0XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImZsb2F0OFwiXSA9IFwiZmxvYXQ4XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImludDJcIl0gPSBcImludDJcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiaW50NFwiXSA9IFwiaW50NFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJpbnQ0cmFuZ2VcIl0gPSBcImludDRyYW5nZVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJpbnQ4XCJdID0gXCJpbnQ4XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImludDhyYW5nZVwiXSA9IFwiaW50OHJhbmdlXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImpzb25cIl0gPSBcImpzb25cIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wianNvbmJcIl0gPSBcImpzb25iXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcIm1vbmV5XCJdID0gXCJtb25leVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJudW1lcmljXCJdID0gXCJudW1lcmljXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcIm9pZFwiXSA9IFwib2lkXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInJlbHRpbWVcIl0gPSBcInJlbHRpbWVcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1widGV4dFwiXSA9IFwidGV4dFwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJ0aW1lXCJdID0gXCJ0aW1lXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInRpbWVzdGFtcFwiXSA9IFwidGltZXN0YW1wXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInRpbWVzdGFtcHR6XCJdID0gXCJ0aW1lc3RhbXB0elwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJ0aW1ldHpcIl0gPSBcInRpbWV0elwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJ0c3JhbmdlXCJdID0gXCJ0c3JhbmdlXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInRzdHpyYW5nZVwiXSA9IFwidHN0enJhbmdlXCI7XG59KShQb3N0Z3Jlc1R5cGVzIHx8IChQb3N0Z3Jlc1R5cGVzID0ge30pKTtcbi8qKlxuICogVGFrZXMgYW4gYXJyYXkgb2YgY29sdW1ucyBhbmQgYW4gb2JqZWN0IG9mIHN0cmluZyB2YWx1ZXMgdGhlbiBjb252ZXJ0cyBlYWNoIHN0cmluZyB2YWx1ZVxuICogdG8gaXRzIG1hcHBlZCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7e25hbWU6IFN0cmluZywgdHlwZTogU3RyaW5nfVtdfSBjb2x1bW5zXG4gKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgbWFwIG9mIHZhcmlvdXMgb3B0aW9ucyB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvIHRoZSBtYXBwZXJcbiAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuc2tpcFR5cGVzIFRoZSBhcnJheSBvZiB0eXBlcyB0aGF0IHNob3VsZCBub3QgYmUgY29udmVydGVkXG4gKlxuICogQGV4YW1wbGUgY29udmVydENoYW5nZURhdGEoW3tuYW1lOiAnZmlyc3RfbmFtZScsIHR5cGU6ICd0ZXh0J30sIHtuYW1lOiAnYWdlJywgdHlwZTogJ2ludDQnfV0sIHtmaXJzdF9uYW1lOiAnUGF1bCcsIGFnZTonMzMnfSwge30pXG4gKiAvLz0+eyBmaXJzdF9uYW1lOiAnUGF1bCcsIGFnZTogMzMgfVxuICovXG5leHBvcnQgY29uc3QgY29udmVydENoYW5nZURhdGEgPSAoY29sdW1ucywgcmVjb3JkLCBvcHRpb25zID0ge30pID0+IHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3Qgc2tpcFR5cGVzID0gKF9hID0gb3B0aW9ucy5za2lwVHlwZXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFtdO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhyZWNvcmQpLnJlZHVjZSgoYWNjLCByZWNfa2V5KSA9PiB7XG4gICAgICAgIGFjY1tyZWNfa2V5XSA9IGNvbnZlcnRDb2x1bW4ocmVjX2tleSwgY29sdW1ucywgcmVjb3JkLCBza2lwVHlwZXMpO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4vKipcbiAqIENvbnZlcnRzIHRoZSB2YWx1ZSBvZiBhbiBpbmRpdmlkdWFsIGNvbHVtbi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY29sdW1uTmFtZSBUaGUgY29sdW1uIHRoYXQgeW91IHdhbnQgdG8gY29udmVydFxuICogQHBhcmFtIHt7bmFtZTogU3RyaW5nLCB0eXBlOiBTdHJpbmd9W119IGNvbHVtbnMgQWxsIG9mIHRoZSBjb2x1bW5zXG4gKiBAcGFyYW0ge09iamVjdH0gcmVjb3JkIFRoZSBtYXAgb2Ygc3RyaW5nIHZhbHVlc1xuICogQHBhcmFtIHtBcnJheX0gc2tpcFR5cGVzIEFuIGFycmF5IG9mIHR5cGVzIHRoYXQgc2hvdWxkIG5vdCBiZSBjb252ZXJ0ZWRcbiAqIEByZXR1cm4ge29iamVjdH0gVXNlbGVzcyBpbmZvcm1hdGlvblxuICpcbiAqIEBleGFtcGxlIGNvbnZlcnRDb2x1bW4oJ2FnZScsIFt7bmFtZTogJ2ZpcnN0X25hbWUnLCB0eXBlOiAndGV4dCd9LCB7bmFtZTogJ2FnZScsIHR5cGU6ICdpbnQ0J31dLCB7Zmlyc3RfbmFtZTogJ1BhdWwnLCBhZ2U6ICczMyd9LCBbXSlcbiAqIC8vPT4gMzNcbiAqIEBleGFtcGxlIGNvbnZlcnRDb2x1bW4oJ2FnZScsIFt7bmFtZTogJ2ZpcnN0X25hbWUnLCB0eXBlOiAndGV4dCd9LCB7bmFtZTogJ2FnZScsIHR5cGU6ICdpbnQ0J31dLCB7Zmlyc3RfbmFtZTogJ1BhdWwnLCBhZ2U6ICczMyd9LCBbJ2ludDQnXSlcbiAqIC8vPT4gXCIzM1wiXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0Q29sdW1uID0gKGNvbHVtbk5hbWUsIGNvbHVtbnMsIHJlY29yZCwgc2tpcFR5cGVzKSA9PiB7XG4gICAgY29uc3QgY29sdW1uID0gY29sdW1ucy5maW5kKCh4KSA9PiB4Lm5hbWUgPT09IGNvbHVtbk5hbWUpO1xuICAgIGNvbnN0IGNvbFR5cGUgPSBjb2x1bW4gPT09IG51bGwgfHwgY29sdW1uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2x1bW4udHlwZTtcbiAgICBjb25zdCB2YWx1ZSA9IHJlY29yZFtjb2x1bW5OYW1lXTtcbiAgICBpZiAoY29sVHlwZSAmJiAhc2tpcFR5cGVzLmluY2x1ZGVzKGNvbFR5cGUpKSB7XG4gICAgICAgIHJldHVybiBjb252ZXJ0Q2VsbChjb2xUeXBlLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBub29wKHZhbHVlKTtcbn07XG4vKipcbiAqIElmIHRoZSB2YWx1ZSBvZiB0aGUgY2VsbCBpcyBgbnVsbGAsIHJldHVybnMgbnVsbC5cbiAqIE90aGVyd2lzZSBjb252ZXJ0cyB0aGUgc3RyaW5nIHZhbHVlIHRvIHRoZSBjb3JyZWN0IHR5cGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBBIHBvc3RncmVzIGNvbHVtbiB0eXBlXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVGhlIGNlbGwgdmFsdWVcbiAqXG4gKiBAZXhhbXBsZSBjb252ZXJ0Q2VsbCgnYm9vbCcsICd0JylcbiAqIC8vPT4gdHJ1ZVxuICogQGV4YW1wbGUgY29udmVydENlbGwoJ2ludDgnLCAnMTAnKVxuICogLy89PiAxMFxuICogQGV4YW1wbGUgY29udmVydENlbGwoJ19pbnQ0JywgJ3sxLDIsMyw0fScpXG4gKiAvLz0+IFsxLDIsMyw0XVxuICovXG5leHBvcnQgY29uc3QgY29udmVydENlbGwgPSAodHlwZSwgdmFsdWUpID0+IHtcbiAgICAvLyBpZiBkYXRhIHR5cGUgaXMgYW4gYXJyYXlcbiAgICBpZiAodHlwZS5jaGFyQXQoMCkgPT09ICdfJykge1xuICAgICAgICBjb25zdCBkYXRhVHlwZSA9IHR5cGUuc2xpY2UoMSwgdHlwZS5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gdG9BcnJheSh2YWx1ZSwgZGF0YVR5cGUpO1xuICAgIH1cbiAgICAvLyBJZiBub3QgbnVsbCwgY29udmVydCB0byBjb3JyZWN0IHR5cGUuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5ib29sOlxuICAgICAgICAgICAgcmV0dXJuIHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5mbG9hdDQ6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5mbG9hdDg6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5pbnQyOlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuaW50NDpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmludDg6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5udW1lcmljOlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMub2lkOlxuICAgICAgICAgICAgcmV0dXJuIHRvTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmpzb246XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5qc29uYjpcbiAgICAgICAgICAgIHJldHVybiB0b0pzb24odmFsdWUpO1xuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMudGltZXN0YW1wOlxuICAgICAgICAgICAgcmV0dXJuIHRvVGltZXN0YW1wU3RyaW5nKHZhbHVlKTsgLy8gRm9ybWF0IHRvIGJlIGNvbnNpc3RlbnQgd2l0aCBQb3N0Z1JFU1RcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmFic3RpbWU6IC8vIFRvIGFsbG93IHVzZXJzIHRvIGNhc3QgaXQgYmFzZWQgb24gVGltZXpvbmVcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmRhdGU6IC8vIFRvIGFsbG93IHVzZXJzIHRvIGNhc3QgaXQgYmFzZWQgb24gVGltZXpvbmVcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmRhdGVyYW5nZTpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmludDRyYW5nZTpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmludDhyYW5nZTpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLm1vbmV5OlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMucmVsdGltZTogLy8gVG8gYWxsb3cgdXNlcnMgdG8gY2FzdCBpdCBiYXNlZCBvbiBUaW1lem9uZVxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMudGV4dDpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnRpbWU6IC8vIFRvIGFsbG93IHVzZXJzIHRvIGNhc3QgaXQgYmFzZWQgb24gVGltZXpvbmVcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnRpbWVzdGFtcHR6OiAvLyBUbyBhbGxvdyB1c2VycyB0byBjYXN0IGl0IGJhc2VkIG9uIFRpbWV6b25lXG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy50aW1ldHo6IC8vIFRvIGFsbG93IHVzZXJzIHRvIGNhc3QgaXQgYmFzZWQgb24gVGltZXpvbmVcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnRzcmFuZ2U6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy50c3R6cmFuZ2U6XG4gICAgICAgICAgICByZXR1cm4gbm9vcCh2YWx1ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHZhbHVlIGZvciByZW1haW5pbmcgdHlwZXNcbiAgICAgICAgICAgIHJldHVybiBub29wKHZhbHVlKTtcbiAgICB9XG59O1xuY29uc3Qgbm9vcCA9ICh2YWx1ZSkgPT4ge1xuICAgIHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgdG9Cb29sZWFuID0gKHZhbHVlKSA9PiB7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlICd0JzpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjYXNlICdmJzpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHRvTnVtYmVyID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4ocGFyc2VkVmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCB0b0pzb24gPSAodmFsdWUpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEpTT04gcGFyc2UgZXJyb3I6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbi8qKlxuICogQ29udmVydHMgYSBQb3N0Z3JlcyBBcnJheSBpbnRvIGEgbmF0aXZlIEpTIGFycmF5XG4gKlxuICogQGV4YW1wbGUgdG9BcnJheSgne30nLCAnaW50NCcpXG4gKiAvLz0+IFtdXG4gKiBAZXhhbXBsZSB0b0FycmF5KCd7XCJbMjAyMS0wMS0wMSwyMDIxLTEyLTMxKVwiLFwiKDIwMjEtMDEtMDEsMjAyMS0xMi0zMl1cIn0nLCAnZGF0ZXJhbmdlJylcbiAqIC8vPT4gWydbMjAyMS0wMS0wMSwyMDIxLTEyLTMxKScsICcoMjAyMS0wMS0wMSwyMDIxLTEyLTMyXSddXG4gKiBAZXhhbXBsZSB0b0FycmF5KFsxLDIsMyw0XSwgJ2ludDQnKVxuICogLy89PiBbMSwyLDMsNF1cbiAqL1xuZXhwb3J0IGNvbnN0IHRvQXJyYXkgPSAodmFsdWUsIHR5cGUpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IGxhc3RJZHggPSB2YWx1ZS5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGNsb3NlQnJhY2UgPSB2YWx1ZVtsYXN0SWR4XTtcbiAgICBjb25zdCBvcGVuQnJhY2UgPSB2YWx1ZVswXTtcbiAgICAvLyBDb25maXJtIHZhbHVlIGlzIGEgUG9zdGdyZXMgYXJyYXkgYnkgY2hlY2tpbmcgY3VybHkgYnJhY2tldHNcbiAgICBpZiAob3BlbkJyYWNlID09PSAneycgJiYgY2xvc2VCcmFjZSA9PT0gJ30nKSB7XG4gICAgICAgIGxldCBhcnI7XG4gICAgICAgIGNvbnN0IHZhbFRyaW0gPSB2YWx1ZS5zbGljZSgxLCBsYXN0SWR4KTtcbiAgICAgICAgLy8gVE9ETzogZmluZCBhIGJldHRlciBzb2x1dGlvbiB0byBzZXBhcmF0ZSBQb3N0Z3JlcyBhcnJheSBkYXRhXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhcnIgPSBKU09OLnBhcnNlKCdbJyArIHZhbFRyaW0gKyAnXScpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChfKSB7XG4gICAgICAgICAgICAvLyBXQVJOSU5HOiBzcGxpdHRpbmcgb24gY29tbWEgZG9lcyBub3QgY292ZXIgYWxsIGVkZ2UgY2FzZXNcbiAgICAgICAgICAgIGFyciA9IHZhbFRyaW0gPyB2YWxUcmltLnNwbGl0KCcsJykgOiBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyLm1hcCgodmFsKSA9PiBjb252ZXJ0Q2VsbCh0eXBlLCB2YWwpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbi8qKlxuICogRml4ZXMgdGltZXN0YW1wIHRvIGJlIElTTy04NjAxLiBTd2FwcyB0aGUgc3BhY2UgYmV0d2VlbiB0aGUgZGF0ZSBhbmQgdGltZSBmb3IgYSAnVCdcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vc3VwYWJhc2Uvc3VwYWJhc2UvaXNzdWVzLzE4XG4gKlxuICogQGV4YW1wbGUgdG9UaW1lc3RhbXBTdHJpbmcoJzIwMTktMDktMTAgMDA6MDA6MDAnKVxuICogLy89PiAnMjAxOS0wOS0xMFQwMDowMDowMCdcbiAqL1xuZXhwb3J0IGNvbnN0IHRvVGltZXN0YW1wU3RyaW5nID0gKHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoJyAnLCAnVCcpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuZXhwb3J0IGNvbnN0IGh0dHBFbmRwb2ludFVSTCA9IChzb2NrZXRVcmwpID0+IHtcbiAgICBsZXQgdXJsID0gc29ja2V0VXJsO1xuICAgIHVybCA9IHVybC5yZXBsYWNlKC9ed3MvaSwgJ2h0dHAnKTtcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgvKFxcL3NvY2tldFxcL3dlYnNvY2tldHxcXC9zb2NrZXR8XFwvd2Vic29ja2V0KVxcLz8kL2ksICcnKTtcbiAgICByZXR1cm4gdXJsLnJlcGxhY2UoL1xcLyskLywgJycpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyYW5zZm9ybWVycy5qcy5tYXAiLCJleHBvcnQgY29uc3QgdmVyc2lvbiA9ICcyLjExLjInO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVyc2lvbi5qcy5tYXAiLCJpbXBvcnQgU3RvcmFnZUZpbGVBcGkgZnJvbSAnLi9wYWNrYWdlcy9TdG9yYWdlRmlsZUFwaSc7XG5pbXBvcnQgU3RvcmFnZUJ1Y2tldEFwaSBmcm9tICcuL3BhY2thZ2VzL1N0b3JhZ2VCdWNrZXRBcGknO1xuZXhwb3J0IGNsYXNzIFN0b3JhZ2VDbGllbnQgZXh0ZW5kcyBTdG9yYWdlQnVja2V0QXBpIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIGhlYWRlcnMgPSB7fSwgZmV0Y2gpIHtcbiAgICAgICAgc3VwZXIodXJsLCBoZWFkZXJzLCBmZXRjaCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gZmlsZSBvcGVyYXRpb24gaW4gYSBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgVGhlIGJ1Y2tldCBpZCB0byBvcGVyYXRlIG9uLlxuICAgICAqL1xuICAgIGZyb20oaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdG9yYWdlRmlsZUFwaSh0aGlzLnVybCwgdGhpcy5oZWFkZXJzLCBpZCwgdGhpcy5mZXRjaCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3RvcmFnZUNsaWVudC5qcy5tYXAiLCJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX0hFQURFUlMgPSB7ICdYLUNsaWVudC1JbmZvJzogYHN0b3JhZ2UtanMvJHt2ZXJzaW9ufWAgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnN0YW50cy5qcy5tYXAiLCJleHBvcnQgY2xhc3MgU3RvcmFnZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuX19pc1N0b3JhZ2VFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMubmFtZSA9ICdTdG9yYWdlRXJyb3InO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1N0b3JhZ2VFcnJvcihlcnJvcikge1xuICAgIHJldHVybiB0eXBlb2YgZXJyb3IgPT09ICdvYmplY3QnICYmIGVycm9yICE9PSBudWxsICYmICdfX2lzU3RvcmFnZUVycm9yJyBpbiBlcnJvcjtcbn1cbmV4cG9ydCBjbGFzcyBTdG9yYWdlQXBpRXJyb3IgZXh0ZW5kcyBTdG9yYWdlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHN0YXR1cykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ1N0b3JhZ2VBcGlFcnJvcic7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBTdG9yYWdlVW5rbm93bkVycm9yIGV4dGVuZHMgU3RvcmFnZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBvcmlnaW5hbEVycm9yKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnU3RvcmFnZVVua25vd25FcnJvcic7XG4gICAgICAgIHRoaXMub3JpZ2luYWxFcnJvciA9IG9yaWdpbmFsRXJyb3I7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JzLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgU3RvcmFnZUFwaUVycm9yLCBTdG9yYWdlVW5rbm93bkVycm9yIH0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHsgcmVzb2x2ZVJlc3BvbnNlIH0gZnJvbSAnLi9oZWxwZXJzJztcbmNvbnN0IF9nZXRFcnJvck1lc3NhZ2UgPSAoZXJyKSA9PiBlcnIubXNnIHx8IGVyci5tZXNzYWdlIHx8IGVyci5lcnJvcl9kZXNjcmlwdGlvbiB8fCBlcnIuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoZXJyKTtcbmNvbnN0IGhhbmRsZUVycm9yID0gKGVycm9yLCByZWplY3QsIG9wdGlvbnMpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IFJlcyA9IHlpZWxkIHJlc29sdmVSZXNwb25zZSgpO1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFJlcyAmJiAhKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5ub1Jlc29sdmVKc29uKSkge1xuICAgICAgICBlcnJvclxuICAgICAgICAgICAgLmpzb24oKVxuICAgICAgICAgICAgLnRoZW4oKGVycikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBTdG9yYWdlQXBpRXJyb3IoX2dldEVycm9yTWVzc2FnZShlcnIpLCBlcnJvci5zdGF0dXMgfHwgNTAwKSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBTdG9yYWdlVW5rbm93bkVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZXJyKSwgZXJyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVqZWN0KG5ldyBTdG9yYWdlVW5rbm93bkVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZXJyb3IpLCBlcnJvcikpO1xuICAgIH1cbn0pO1xuY29uc3QgX2dldFJlcXVlc3RQYXJhbXMgPSAobWV0aG9kLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KSA9PiB7XG4gICAgY29uc3QgcGFyYW1zID0geyBtZXRob2QsIGhlYWRlcnM6IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhZGVycykgfHwge30gfTtcbiAgICBpZiAobWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cbiAgICBwYXJhbXMuaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sIG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBpZiAoYm9keSkge1xuICAgICAgICBwYXJhbXMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCBwYXJhbWV0ZXJzKTtcbn07XG5mdW5jdGlvbiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCBtZXRob2QsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBmZXRjaGVyKHVybCwgX2dldFJlcXVlc3RQYXJhbXMobWV0aG9kLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KSlcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQub2spXG4gICAgICAgICAgICAgICAgICAgIHRocm93IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLm5vUmVzb2x2ZUpzb24pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5qc29uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiByZXNvbHZlKGRhdGEpKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGhhbmRsZUVycm9yKGVycm9yLCByZWplY3QsIG9wdGlvbnMpKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0KGZldGNoZXIsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCAnR0VUJywgdXJsLCBvcHRpb25zLCBwYXJhbWV0ZXJzKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwb3N0KGZldGNoZXIsIHVybCwgYm9keSwgb3B0aW9ucywgcGFyYW1ldGVycykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCAnUE9TVCcsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcHV0KGZldGNoZXIsIHVybCwgYm9keSwgb3B0aW9ucywgcGFyYW1ldGVycykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCAnUFVUJywgdXJsLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoZWFkKGZldGNoZXIsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCAnSEVBRCcsIHVybCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBub1Jlc29sdmVKc29uOiB0cnVlIH0pLCBwYXJhbWV0ZXJzKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUoZmV0Y2hlciwgdXJsLCBib2R5LCBvcHRpb25zLCBwYXJhbWV0ZXJzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVSZXF1ZXN0KGZldGNoZXIsICdERUxFVEUnLCB1cmwsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmV0Y2guanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5leHBvcnQgY29uc3QgcmVzb2x2ZUZldGNoID0gKGN1c3RvbUZldGNoKSA9PiB7XG4gICAgbGV0IF9mZXRjaDtcbiAgICBpZiAoY3VzdG9tRmV0Y2gpIHtcbiAgICAgICAgX2ZldGNoID0gY3VzdG9tRmV0Y2g7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgX2ZldGNoID0gKC4uLmFyZ3MpID0+IGltcG9ydCgnQHN1cGFiYXNlL25vZGUtZmV0Y2gnKS50aGVuKCh7IGRlZmF1bHQ6IGZldGNoIH0pID0+IGZldGNoKC4uLmFyZ3MpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF9mZXRjaCA9IGZldGNoO1xuICAgIH1cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IF9mZXRjaCguLi5hcmdzKTtcbn07XG5leHBvcnQgY29uc3QgcmVzb2x2ZVJlc3BvbnNlID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgaWYgKHR5cGVvZiBSZXNwb25zZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gKHlpZWxkIGltcG9ydCgnQHN1cGFiYXNlL25vZGUtZmV0Y2gnKSkuUmVzcG9uc2U7XG4gICAgfVxuICAgIHJldHVybiBSZXNwb25zZTtcbn0pO1xuZXhwb3J0IGNvbnN0IHJlY3Vyc2l2ZVRvQ2FtZWwgPSAoaXRlbSkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBpdGVtLm1hcCgoZWwpID0+IHJlY3Vyc2l2ZVRvQ2FtZWwoZWwpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09ICdmdW5jdGlvbicgfHwgaXRlbSAhPT0gT2JqZWN0KGl0ZW0pKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBPYmplY3QuZW50cmllcyhpdGVtKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgY29uc3QgbmV3S2V5ID0ga2V5LnJlcGxhY2UoLyhbLV9dW2Etel0pL2dpLCAoYykgPT4gYy50b1VwcGVyQ2FzZSgpLnJlcGxhY2UoL1stX10vZywgJycpKTtcbiAgICAgICAgcmVzdWx0W25ld0tleV0gPSByZWN1cnNpdmVUb0NhbWVsKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlcnMuanMubWFwIiwiLy8gZ2VuZXJhdGVkIGJ5IGdlbnZlcnNpb25cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzIuNy4xJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlcnNpb24uanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBERUZBVUxUX0hFQURFUlMgfSBmcm9tICcuLi9saWIvY29uc3RhbnRzJztcbmltcG9ydCB7IGlzU3RvcmFnZUVycm9yIH0gZnJvbSAnLi4vbGliL2Vycm9ycyc7XG5pbXBvcnQgeyBnZXQsIHBvc3QsIHB1dCwgcmVtb3ZlIH0gZnJvbSAnLi4vbGliL2ZldGNoJztcbmltcG9ydCB7IHJlc29sdmVGZXRjaCB9IGZyb20gJy4uL2xpYi9oZWxwZXJzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2VCdWNrZXRBcGkge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgaGVhZGVycyA9IHt9LCBmZXRjaCkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0hFQURFUlMpLCBoZWFkZXJzKTtcbiAgICAgICAgdGhpcy5mZXRjaCA9IHJlc29sdmVGZXRjaChmZXRjaCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgZGV0YWlscyBvZiBhbGwgU3RvcmFnZSBidWNrZXRzIHdpdGhpbiBhbiBleGlzdGluZyBwcm9qZWN0LlxuICAgICAqL1xuICAgIGxpc3RCdWNrZXRzKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgZ2V0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9idWNrZXRgLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgZGV0YWlscyBvZiBhbiBleGlzdGluZyBTdG9yYWdlIGJ1Y2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBUaGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGJ1Y2tldCB5b3Ugd291bGQgbGlrZSB0byByZXRyaWV2ZS5cbiAgICAgKi9cbiAgICBnZXRCdWNrZXQoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIGdldCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vYnVja2V0LyR7aWR9YCwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFN0b3JhZ2UgYnVja2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgQSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGJ1Y2tldCB5b3UgYXJlIGNyZWF0aW5nLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnB1YmxpYyBUaGUgdmlzaWJpbGl0eSBvZiB0aGUgYnVja2V0LiBQdWJsaWMgYnVja2V0cyBkb24ndCByZXF1aXJlIGFuIGF1dGhvcml6YXRpb24gdG9rZW4gdG8gZG93bmxvYWQgb2JqZWN0cywgYnV0IHN0aWxsIHJlcXVpcmUgYSB2YWxpZCB0b2tlbiBmb3IgYWxsIG90aGVyIG9wZXJhdGlvbnMuIEJ5IGRlZmF1bHQsIGJ1Y2tldHMgYXJlIHByaXZhdGUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZmlsZVNpemVMaW1pdCBzcGVjaWZpZXMgdGhlIG1heCBmaWxlIHNpemUgaW4gYnl0ZXMgdGhhdCBjYW4gYmUgdXBsb2FkZWQgdG8gdGhpcyBidWNrZXQuXG4gICAgICogVGhlIGdsb2JhbCBmaWxlIHNpemUgbGltaXQgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIHRoaXMgdmFsdWUuXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgbnVsbCwgd2hpY2ggZG9lc24ndCBzZXQgYSBwZXIgYnVja2V0IGZpbGUgc2l6ZSBsaW1pdC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hbGxvd2VkTWltZVR5cGVzIHNwZWNpZmllcyB0aGUgYWxsb3dlZCBtaW1lIHR5cGVzIHRoYXQgdGhpcyBidWNrZXQgY2FuIGFjY2VwdCBkdXJpbmcgdXBsb2FkLlxuICAgICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIG51bGwsIHdoaWNoIGFsbG93cyBmaWxlcyB3aXRoIGFsbCBtaW1lIHR5cGVzIHRvIGJlIHVwbG9hZGVkLlxuICAgICAqIEVhY2ggbWltZSB0eXBlIHNwZWNpZmllZCBjYW4gYmUgYSB3aWxkY2FyZCwgZS5nLiBpbWFnZS8qLCBvciBhIHNwZWNpZmljIG1pbWUgdHlwZSwgZS5nLiBpbWFnZS9wbmcuXG4gICAgICogQHJldHVybnMgbmV3bHkgY3JlYXRlZCBidWNrZXQgaWRcbiAgICAgKi9cbiAgICBjcmVhdGVCdWNrZXQoaWQsIG9wdGlvbnMgPSB7XG4gICAgICAgIHB1YmxpYzogZmFsc2UsXG4gICAgfSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vYnVja2V0YCwge1xuICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogaWQsXG4gICAgICAgICAgICAgICAgICAgIHB1YmxpYzogb3B0aW9ucy5wdWJsaWMsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVfc2l6ZV9saW1pdDogb3B0aW9ucy5maWxlU2l6ZUxpbWl0LFxuICAgICAgICAgICAgICAgICAgICBhbGxvd2VkX21pbWVfdHlwZXM6IG9wdGlvbnMuYWxsb3dlZE1pbWVUeXBlcyxcbiAgICAgICAgICAgICAgICB9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgYSBTdG9yYWdlIGJ1Y2tldFxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIEEgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBidWNrZXQgeW91IGFyZSB1cGRhdGluZy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5wdWJsaWMgVGhlIHZpc2liaWxpdHkgb2YgdGhlIGJ1Y2tldC4gUHVibGljIGJ1Y2tldHMgZG9uJ3QgcmVxdWlyZSBhbiBhdXRob3JpemF0aW9uIHRva2VuIHRvIGRvd25sb2FkIG9iamVjdHMsIGJ1dCBzdGlsbCByZXF1aXJlIGEgdmFsaWQgdG9rZW4gZm9yIGFsbCBvdGhlciBvcGVyYXRpb25zLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmZpbGVTaXplTGltaXQgc3BlY2lmaWVzIHRoZSBtYXggZmlsZSBzaXplIGluIGJ5dGVzIHRoYXQgY2FuIGJlIHVwbG9hZGVkIHRvIHRoaXMgYnVja2V0LlxuICAgICAqIFRoZSBnbG9iYWwgZmlsZSBzaXplIGxpbWl0IHRha2VzIHByZWNlZGVuY2Ugb3ZlciB0aGlzIHZhbHVlLlxuICAgICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIG51bGwsIHdoaWNoIGRvZXNuJ3Qgc2V0IGEgcGVyIGJ1Y2tldCBmaWxlIHNpemUgbGltaXQuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYWxsb3dlZE1pbWVUeXBlcyBzcGVjaWZpZXMgdGhlIGFsbG93ZWQgbWltZSB0eXBlcyB0aGF0IHRoaXMgYnVja2V0IGNhbiBhY2NlcHQgZHVyaW5nIHVwbG9hZC5cbiAgICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBudWxsLCB3aGljaCBhbGxvd3MgZmlsZXMgd2l0aCBhbGwgbWltZSB0eXBlcyB0byBiZSB1cGxvYWRlZC5cbiAgICAgKiBFYWNoIG1pbWUgdHlwZSBzcGVjaWZpZWQgY2FuIGJlIGEgd2lsZGNhcmQsIGUuZy4gaW1hZ2UvKiwgb3IgYSBzcGVjaWZpYyBtaW1lIHR5cGUsIGUuZy4gaW1hZ2UvcG5nLlxuICAgICAqL1xuICAgIHVwZGF0ZUJ1Y2tldChpZCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcHV0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9idWNrZXQvJHtpZH1gLCB7XG4gICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgcHVibGljOiBvcHRpb25zLnB1YmxpYyxcbiAgICAgICAgICAgICAgICAgICAgZmlsZV9zaXplX2xpbWl0OiBvcHRpb25zLmZpbGVTaXplTGltaXQsXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRfbWltZV90eXBlczogb3B0aW9ucy5hbGxvd2VkTWltZVR5cGVzLFxuICAgICAgICAgICAgICAgIH0sIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgb2JqZWN0cyBpbnNpZGUgYSBzaW5nbGUgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgYnVja2V0IHlvdSB3b3VsZCBsaWtlIHRvIGVtcHR5LlxuICAgICAqL1xuICAgIGVtcHR5QnVja2V0KGlkKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBwb3N0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9idWNrZXQvJHtpZH0vZW1wdHlgLCB7fSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGFuIGV4aXN0aW5nIGJ1Y2tldC4gQSBidWNrZXQgY2FuJ3QgYmUgZGVsZXRlZCB3aXRoIGV4aXN0aW5nIG9iamVjdHMgaW5zaWRlIGl0LlxuICAgICAqIFlvdSBtdXN0IGZpcnN0IGBlbXB0eSgpYCB0aGUgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgYnVja2V0IHlvdSB3b3VsZCBsaWtlIHRvIGRlbGV0ZS5cbiAgICAgKi9cbiAgICBkZWxldGVCdWNrZXQoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlbW92ZSh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vYnVja2V0LyR7aWR9YCwge30sIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdG9yYWdlQnVja2V0QXBpLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgaXNTdG9yYWdlRXJyb3IsIFN0b3JhZ2VFcnJvciwgU3RvcmFnZVVua25vd25FcnJvciB9IGZyb20gJy4uL2xpYi9lcnJvcnMnO1xuaW1wb3J0IHsgZ2V0LCBoZWFkLCBwb3N0LCByZW1vdmUgfSBmcm9tICcuLi9saWIvZmV0Y2gnO1xuaW1wb3J0IHsgcmVjdXJzaXZlVG9DYW1lbCwgcmVzb2x2ZUZldGNoIH0gZnJvbSAnLi4vbGliL2hlbHBlcnMnO1xuY29uc3QgREVGQVVMVF9TRUFSQ0hfT1BUSU9OUyA9IHtcbiAgICBsaW1pdDogMTAwLFxuICAgIG9mZnNldDogMCxcbiAgICBzb3J0Qnk6IHtcbiAgICAgICAgY29sdW1uOiAnbmFtZScsXG4gICAgICAgIG9yZGVyOiAnYXNjJyxcbiAgICB9LFxufTtcbmNvbnN0IERFRkFVTFRfRklMRV9PUFRJT05TID0ge1xuICAgIGNhY2hlQ29udHJvbDogJzM2MDAnLFxuICAgIGNvbnRlbnRUeXBlOiAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JyxcbiAgICB1cHNlcnQ6IGZhbHNlLFxufTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2VGaWxlQXBpIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwsIGhlYWRlcnMgPSB7fSwgYnVja2V0SWQsIGZldGNoKSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzO1xuICAgICAgICB0aGlzLmJ1Y2tldElkID0gYnVja2V0SWQ7XG4gICAgICAgIHRoaXMuZmV0Y2ggPSByZXNvbHZlRmV0Y2goZmV0Y2gpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGxvYWRzIGEgZmlsZSB0byBhbiBleGlzdGluZyBidWNrZXQgb3IgcmVwbGFjZXMgYW4gZXhpc3RpbmcgZmlsZSBhdCB0aGUgc3BlY2lmaWVkIHBhdGggd2l0aCBhIG5ldyBvbmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbWV0aG9kIEhUVFAgbWV0aG9kLlxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSByZWxhdGl2ZSBmaWxlIHBhdGguIFNob3VsZCBiZSBvZiB0aGUgZm9ybWF0IGBmb2xkZXIvc3ViZm9sZGVyL2ZpbGVuYW1lLnBuZ2AuIFRoZSBidWNrZXQgbXVzdCBhbHJlYWR5IGV4aXN0IGJlZm9yZSBhdHRlbXB0aW5nIHRvIHVwbG9hZC5cbiAgICAgKiBAcGFyYW0gZmlsZUJvZHkgVGhlIGJvZHkgb2YgdGhlIGZpbGUgdG8gYmUgc3RvcmVkIGluIHRoZSBidWNrZXQuXG4gICAgICovXG4gICAgdXBsb2FkT3JVcGRhdGUobWV0aG9kLCBwYXRoLCBmaWxlQm9keSwgZmlsZU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IGJvZHk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9GSUxFX09QVElPTlMpLCBmaWxlT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlcnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaGVhZGVycyksIChtZXRob2QgPT09ICdQT1NUJyAmJiB7ICd4LXVwc2VydCc6IFN0cmluZyhvcHRpb25zLnVwc2VydCkgfSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFkYXRhID0gb3B0aW9ucy5tZXRhZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGZpbGVCb2R5IGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCdjYWNoZUNvbnRyb2wnLCBvcHRpb25zLmNhY2hlQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJ21ldGFkYXRhJywgdGhpcy5lbmNvZGVNZXRhZGF0YShtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCcnLCBmaWxlQm9keSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZUJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gZmlsZUJvZHk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCdjYWNoZUNvbnRyb2wnLCBvcHRpb25zLmNhY2hlQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJ21ldGFkYXRhJywgdGhpcy5lbmNvZGVNZXRhZGF0YShtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gZmlsZUJvZHk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbJ2NhY2hlLWNvbnRyb2wnXSA9IGBtYXgtYWdlPSR7b3B0aW9ucy5jYWNoZUNvbnRyb2x9YDtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1snY29udGVudC10eXBlJ10gPSBvcHRpb25zLmNvbnRlbnRUeXBlO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbJ3gtbWV0YWRhdGEnXSA9IHRoaXMudG9CYXNlNjQodGhpcy5lbmNvZGVNZXRhZGF0YShtZXRhZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaWxlT3B0aW9ucyA9PT0gbnVsbCB8fCBmaWxlT3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmlsZU9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBoZWFkZXJzKSwgZmlsZU9wdGlvbnMuaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFuUGF0aCA9IHRoaXMuX3JlbW92ZUVtcHR5Rm9sZGVycyhwYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBfcGF0aCA9IHRoaXMuX2dldEZpbmFsUGF0aChjbGVhblBhdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIHRoaXMuZmV0Y2goYCR7dGhpcy51cmx9L29iamVjdC8ke19wYXRofWAsIE9iamVjdC5hc3NpZ24oeyBtZXRob2QsIGJvZHk6IGJvZHksIGhlYWRlcnMgfSwgKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZHVwbGV4KSA/IHsgZHVwbGV4OiBvcHRpb25zLmR1cGxleCB9IDoge30pKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBwYXRoOiBjbGVhblBhdGgsIGlkOiBkYXRhLklkLCBmdWxsUGF0aDogZGF0YS5LZXkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGxvYWRzIGEgZmlsZSB0byBhbiBleGlzdGluZyBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgZmlsZSBwYXRoLCBpbmNsdWRpbmcgdGhlIGZpbGUgbmFtZS4gU2hvdWxkIGJlIG9mIHRoZSBmb3JtYXQgYGZvbGRlci9zdWJmb2xkZXIvZmlsZW5hbWUucG5nYC4gVGhlIGJ1Y2tldCBtdXN0IGFscmVhZHkgZXhpc3QgYmVmb3JlIGF0dGVtcHRpbmcgdG8gdXBsb2FkLlxuICAgICAqIEBwYXJhbSBmaWxlQm9keSBUaGUgYm9keSBvZiB0aGUgZmlsZSB0byBiZSBzdG9yZWQgaW4gdGhlIGJ1Y2tldC5cbiAgICAgKi9cbiAgICB1cGxvYWQocGF0aCwgZmlsZUJvZHksIGZpbGVPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRPclVwZGF0ZSgnUE9TVCcsIHBhdGgsIGZpbGVCb2R5LCBmaWxlT3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGxvYWQgYSBmaWxlIHdpdGggYSB0b2tlbiBnZW5lcmF0ZWQgZnJvbSBgY3JlYXRlU2lnbmVkVXBsb2FkVXJsYC5cbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgZmlsZSBwYXRoLCBpbmNsdWRpbmcgdGhlIGZpbGUgbmFtZS4gU2hvdWxkIGJlIG9mIHRoZSBmb3JtYXQgYGZvbGRlci9zdWJmb2xkZXIvZmlsZW5hbWUucG5nYC4gVGhlIGJ1Y2tldCBtdXN0IGFscmVhZHkgZXhpc3QgYmVmb3JlIGF0dGVtcHRpbmcgdG8gdXBsb2FkLlxuICAgICAqIEBwYXJhbSB0b2tlbiBUaGUgdG9rZW4gZ2VuZXJhdGVkIGZyb20gYGNyZWF0ZVNpZ25lZFVwbG9hZFVybGBcbiAgICAgKiBAcGFyYW0gZmlsZUJvZHkgVGhlIGJvZHkgb2YgdGhlIGZpbGUgdG8gYmUgc3RvcmVkIGluIHRoZSBidWNrZXQuXG4gICAgICovXG4gICAgdXBsb2FkVG9TaWduZWRVcmwocGF0aCwgdG9rZW4sIGZpbGVCb2R5LCBmaWxlT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgY2xlYW5QYXRoID0gdGhpcy5fcmVtb3ZlRW1wdHlGb2xkZXJzKHBhdGgpO1xuICAgICAgICAgICAgY29uc3QgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgoY2xlYW5QYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwodGhpcy51cmwgKyBgL29iamVjdC91cGxvYWQvc2lnbi8ke19wYXRofWApO1xuICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3Rva2VuJywgdG9rZW4pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7IHVwc2VydDogREVGQVVMVF9GSUxFX09QVElPTlMudXBzZXJ0IH0sIGZpbGVPcHRpb25zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhlYWRlcnMpLCB7ICd4LXVwc2VydCc6IFN0cmluZyhvcHRpb25zLnVwc2VydCkgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlQm9keSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCgnY2FjaGVDb250cm9sJywgb3B0aW9ucy5jYWNoZUNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCgnJywgZmlsZUJvZHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIGZpbGVCb2R5IGluc3RhbmNlb2YgRm9ybURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IGZpbGVCb2R5O1xuICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCgnY2FjaGVDb250cm9sJywgb3B0aW9ucy5jYWNoZUNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IGZpbGVCb2R5O1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzWydjYWNoZS1jb250cm9sJ10gPSBgbWF4LWFnZT0ke29wdGlvbnMuY2FjaGVDb250cm9sfWA7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gb3B0aW9ucy5jb250ZW50VHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzID0geWllbGQgdGhpcy5mZXRjaCh1cmwudG9TdHJpbmcoKSwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBib2R5LFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHsgcGF0aDogY2xlYW5QYXRoLCBmdWxsUGF0aDogZGF0YS5LZXkgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgc2lnbmVkIHVwbG9hZCBVUkwuXG4gICAgICogU2lnbmVkIHVwbG9hZCBVUkxzIGNhbiBiZSB1c2VkIHRvIHVwbG9hZCBmaWxlcyB0byB0aGUgYnVja2V0IHdpdGhvdXQgZnVydGhlciBhdXRoZW50aWNhdGlvbi5cbiAgICAgKiBUaGV5IGFyZSB2YWxpZCBmb3IgMiBob3Vycy5cbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgZmlsZSBwYXRoLCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZmlsZSBuYW1lLiBGb3IgZXhhbXBsZSBgZm9sZGVyL2ltYWdlLnBuZ2AuXG4gICAgICogQHBhcmFtIG9wdGlvbnMudXBzZXJ0IElmIHNldCB0byB0cnVlLCBhbGxvd3MgdGhlIGZpbGUgdG8gYmUgb3ZlcndyaXR0ZW4gaWYgaXQgYWxyZWFkeSBleGlzdHMuXG4gICAgICovXG4gICAgY3JlYXRlU2lnbmVkVXBsb2FkVXJsKHBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IF9wYXRoID0gdGhpcy5fZ2V0RmluYWxQYXRoKHBhdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmhlYWRlcnMpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudXBzZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbJ3gtdXBzZXJ0J10gPSAndHJ1ZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBwb3N0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9vYmplY3QvdXBsb2FkL3NpZ24vJHtfcGF0aH1gLCB7fSwgeyBoZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwodGhpcy51cmwgKyBkYXRhLnVybCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgndG9rZW4nKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTdG9yYWdlRXJyb3IoJ05vIHRva2VuIHJldHVybmVkIGJ5IEFQSScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNpZ25lZFVybDogdXJsLnRvU3RyaW5nKCksIHBhdGgsIHRva2VuIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVwbGFjZXMgYW4gZXhpc3RpbmcgZmlsZSBhdCB0aGUgc3BlY2lmaWVkIHBhdGggd2l0aCBhIG5ldyBvbmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgcmVsYXRpdmUgZmlsZSBwYXRoLiBTaG91bGQgYmUgb2YgdGhlIGZvcm1hdCBgZm9sZGVyL3N1YmZvbGRlci9maWxlbmFtZS5wbmdgLiBUaGUgYnVja2V0IG11c3QgYWxyZWFkeSBleGlzdCBiZWZvcmUgYXR0ZW1wdGluZyB0byB1cGRhdGUuXG4gICAgICogQHBhcmFtIGZpbGVCb2R5IFRoZSBib2R5IG9mIHRoZSBmaWxlIHRvIGJlIHN0b3JlZCBpbiB0aGUgYnVja2V0LlxuICAgICAqL1xuICAgIHVwZGF0ZShwYXRoLCBmaWxlQm9keSwgZmlsZU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwbG9hZE9yVXBkYXRlKCdQVVQnLCBwYXRoLCBmaWxlQm9keSwgZmlsZU9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTW92ZXMgYW4gZXhpc3RpbmcgZmlsZSB0byBhIG5ldyBwYXRoIGluIHRoZSBzYW1lIGJ1Y2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmcm9tUGF0aCBUaGUgb3JpZ2luYWwgZmlsZSBwYXRoLCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZmlsZSBuYW1lLiBGb3IgZXhhbXBsZSBgZm9sZGVyL2ltYWdlLnBuZ2AuXG4gICAgICogQHBhcmFtIHRvUGF0aCBUaGUgbmV3IGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBuZXcgZmlsZSBuYW1lLiBGb3IgZXhhbXBsZSBgZm9sZGVyL2ltYWdlLW5ldy5wbmdgLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIFRoZSBkZXN0aW5hdGlvbiBvcHRpb25zLlxuICAgICAqL1xuICAgIG1vdmUoZnJvbVBhdGgsIHRvUGF0aCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0L21vdmVgLCB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Y2tldElkOiB0aGlzLmJ1Y2tldElkLFxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VLZXk6IGZyb21QYXRoLFxuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbktleTogdG9QYXRoLFxuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRlc3RpbmF0aW9uQnVja2V0LFxuICAgICAgICAgICAgICAgIH0sIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29waWVzIGFuIGV4aXN0aW5nIGZpbGUgdG8gYSBuZXcgcGF0aCBpbiB0aGUgc2FtZSBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnJvbVBhdGggVGhlIG9yaWdpbmFsIGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBjdXJyZW50IGZpbGUgbmFtZS4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS5wbmdgLlxuICAgICAqIEBwYXJhbSB0b1BhdGggVGhlIG5ldyBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgbmV3IGZpbGUgbmFtZS4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS1jb3B5LnBuZ2AuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGRlc3RpbmF0aW9uIG9wdGlvbnMuXG4gICAgICovXG4gICAgY29weShmcm9tUGF0aCwgdG9QYXRoLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBwb3N0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9vYmplY3QvY29weWAsIHtcbiAgICAgICAgICAgICAgICAgICAgYnVja2V0SWQ6IHRoaXMuYnVja2V0SWQsXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUtleTogZnJvbVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uS2V5OiB0b1BhdGgsXG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGVzdGluYXRpb25CdWNrZXQsXG4gICAgICAgICAgICAgICAgfSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBwYXRoOiBkYXRhLktleSB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBzaWduZWQgVVJMLiBVc2UgYSBzaWduZWQgVVJMIHRvIHNoYXJlIGEgZmlsZSBmb3IgYSBmaXhlZCBhbW91bnQgb2YgdGltZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgY3VycmVudCBmaWxlIG5hbWUuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UucG5nYC5cbiAgICAgKiBAcGFyYW0gZXhwaXJlc0luIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB1bnRpbCB0aGUgc2lnbmVkIFVSTCBleHBpcmVzLiBGb3IgZXhhbXBsZSwgYDYwYCBmb3IgYSBVUkwgd2hpY2ggaXMgdmFsaWQgZm9yIG9uZSBtaW51dGUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZG93bmxvYWQgdHJpZ2dlcnMgdGhlIGZpbGUgYXMgYSBkb3dubG9hZCBpZiBzZXQgdG8gdHJ1ZS4gU2V0IHRoaXMgcGFyYW1ldGVyIGFzIHRoZSBuYW1lIG9mIHRoZSBmaWxlIGlmIHlvdSB3YW50IHRvIHRyaWdnZXIgdGhlIGRvd25sb2FkIHdpdGggYSBkaWZmZXJlbnQgZmlsZW5hbWUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMudHJhbnNmb3JtIFRyYW5zZm9ybSB0aGUgYXNzZXQgYmVmb3JlIHNlcnZpbmcgaXQgdG8gdGhlIGNsaWVudC5cbiAgICAgKi9cbiAgICBjcmVhdGVTaWduZWRVcmwocGF0aCwgZXhwaXJlc0luLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBfcGF0aCA9IHRoaXMuX2dldEZpbmFsUGF0aChwYXRoKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC9zaWduLyR7X3BhdGh9YCwgT2JqZWN0LmFzc2lnbih7IGV4cGlyZXNJbiB9LCAoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy50cmFuc2Zvcm0pID8geyB0cmFuc2Zvcm06IG9wdGlvbnMudHJhbnNmb3JtIH0gOiB7fSkpLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBkb3dubG9hZFF1ZXJ5UGFyYW0gPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRvd25sb2FkKVxuICAgICAgICAgICAgICAgICAgICA/IGAmZG93bmxvYWQ9JHtvcHRpb25zLmRvd25sb2FkID09PSB0cnVlID8gJycgOiBvcHRpb25zLmRvd25sb2FkfWBcbiAgICAgICAgICAgICAgICAgICAgOiAnJztcbiAgICAgICAgICAgICAgICBjb25zdCBzaWduZWRVcmwgPSBlbmNvZGVVUkkoYCR7dGhpcy51cmx9JHtkYXRhLnNpZ25lZFVSTH0ke2Rvd25sb2FkUXVlcnlQYXJhbX1gKTtcbiAgICAgICAgICAgICAgICBkYXRhID0geyBzaWduZWRVcmwgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgbXVsdGlwbGUgc2lnbmVkIFVSTHMuIFVzZSBhIHNpZ25lZCBVUkwgdG8gc2hhcmUgYSBmaWxlIGZvciBhIGZpeGVkIGFtb3VudCBvZiB0aW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhzIFRoZSBmaWxlIHBhdGhzIHRvIGJlIGRvd25sb2FkZWQsIGluY2x1ZGluZyB0aGUgY3VycmVudCBmaWxlIG5hbWVzLiBGb3IgZXhhbXBsZSBgWydmb2xkZXIvaW1hZ2UucG5nJywgJ2ZvbGRlcjIvaW1hZ2UyLnBuZyddYC5cbiAgICAgKiBAcGFyYW0gZXhwaXJlc0luIFRoZSBudW1iZXIgb2Ygc2Vjb25kcyB1bnRpbCB0aGUgc2lnbmVkIFVSTHMgZXhwaXJlLiBGb3IgZXhhbXBsZSwgYDYwYCBmb3IgVVJMcyB3aGljaCBhcmUgdmFsaWQgZm9yIG9uZSBtaW51dGUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZG93bmxvYWQgdHJpZ2dlcnMgdGhlIGZpbGUgYXMgYSBkb3dubG9hZCBpZiBzZXQgdG8gdHJ1ZS4gU2V0IHRoaXMgcGFyYW1ldGVyIGFzIHRoZSBuYW1lIG9mIHRoZSBmaWxlIGlmIHlvdSB3YW50IHRvIHRyaWdnZXIgdGhlIGRvd25sb2FkIHdpdGggYSBkaWZmZXJlbnQgZmlsZW5hbWUuXG4gICAgICovXG4gICAgY3JlYXRlU2lnbmVkVXJscyhwYXRocywgZXhwaXJlc0luLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBwb3N0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9vYmplY3Qvc2lnbi8ke3RoaXMuYnVja2V0SWR9YCwgeyBleHBpcmVzSW4sIHBhdGhzIH0sIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvd25sb2FkUXVlcnlQYXJhbSA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZG93bmxvYWQpXG4gICAgICAgICAgICAgICAgICAgID8gYCZkb3dubG9hZD0ke29wdGlvbnMuZG93bmxvYWQgPT09IHRydWUgPyAnJyA6IG9wdGlvbnMuZG93bmxvYWR9YFxuICAgICAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEubWFwKChkYXR1bSkgPT4gKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZGF0dW0pLCB7IHNpZ25lZFVybDogZGF0dW0uc2lnbmVkVVJMXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBlbmNvZGVVUkkoYCR7dGhpcy51cmx9JHtkYXR1bS5zaWduZWRVUkx9JHtkb3dubG9hZFF1ZXJ5UGFyYW19YClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwgfSkpKSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEb3dubG9hZHMgYSBmaWxlIGZyb20gYSBwcml2YXRlIGJ1Y2tldC4gRm9yIHB1YmxpYyBidWNrZXRzLCBtYWtlIGEgcmVxdWVzdCB0byB0aGUgVVJMIHJldHVybmVkIGZyb20gYGdldFB1YmxpY1VybGAgaW5zdGVhZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBmdWxsIHBhdGggYW5kIGZpbGUgbmFtZSBvZiB0aGUgZmlsZSB0byBiZSBkb3dubG9hZGVkLiBGb3IgZXhhbXBsZSBgZm9sZGVyL2ltYWdlLnBuZ2AuXG4gICAgICogQHBhcmFtIG9wdGlvbnMudHJhbnNmb3JtIFRyYW5zZm9ybSB0aGUgYXNzZXQgYmVmb3JlIHNlcnZpbmcgaXQgdG8gdGhlIGNsaWVudC5cbiAgICAgKi9cbiAgICBkb3dubG9hZChwYXRoLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB3YW50c1RyYW5zZm9ybWF0aW9uID0gdHlwZW9mIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudHJhbnNmb3JtKSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgICAgICBjb25zdCByZW5kZXJQYXRoID0gd2FudHNUcmFuc2Zvcm1hdGlvbiA/ICdyZW5kZXIvaW1hZ2UvYXV0aGVudGljYXRlZCcgOiAnb2JqZWN0JztcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybWF0aW9uUXVlcnkgPSB0aGlzLnRyYW5zZm9ybU9wdHNUb1F1ZXJ5U3RyaW5nKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudHJhbnNmb3JtKSB8fCB7fSk7XG4gICAgICAgICAgICBjb25zdCBxdWVyeVN0cmluZyA9IHRyYW5zZm9ybWF0aW9uUXVlcnkgPyBgPyR7dHJhbnNmb3JtYXRpb25RdWVyeX1gIDogJyc7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IF9wYXRoID0gdGhpcy5fZ2V0RmluYWxQYXRoKHBhdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIGdldCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vJHtyZW5kZXJQYXRofS8ke19wYXRofSR7cXVlcnlTdHJpbmd9YCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIG5vUmVzb2x2ZUpzb246IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlcy5ibG9iKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGRldGFpbHMgb2YgYW4gZXhpc3RpbmcgZmlsZS5cbiAgICAgKiBAcGFyYW0gcGF0aFxuICAgICAqL1xuICAgIGluZm8ocGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgocGF0aCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBnZXQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC9pbmZvLyR7X3BhdGh9YCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogcmVjdXJzaXZlVG9DYW1lbChkYXRhKSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdGhlIGV4aXN0ZW5jZSBvZiBhIGZpbGUuXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKi9cbiAgICBleGlzdHMocGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgocGF0aCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGhlYWQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC8ke19wYXRofWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHRydWUsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpICYmIGVycm9yIGluc3RhbmNlb2YgU3RvcmFnZVVua25vd25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbEVycm9yID0gZXJyb3Iub3JpZ2luYWxFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFs0MDAsIDQwNF0uaW5jbHVkZXMob3JpZ2luYWxFcnJvciA9PT0gbnVsbCB8fCBvcmlnaW5hbEVycm9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcmlnaW5hbEVycm9yLnN0YXR1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IGZhbHNlLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaW1wbGUgY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gZ2V0IHRoZSBVUkwgZm9yIGFuIGFzc2V0IGluIGEgcHVibGljIGJ1Y2tldC4gSWYgeW91IGRvIG5vdCB3YW50IHRvIHVzZSB0aGlzIGZ1bmN0aW9uLCB5b3UgY2FuIGNvbnN0cnVjdCB0aGUgcHVibGljIFVSTCBieSBjb25jYXRlbmF0aW5nIHRoZSBidWNrZXQgVVJMIHdpdGggdGhlIHBhdGggdG8gdGhlIGFzc2V0LlxuICAgICAqIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgdmVyaWZ5IGlmIHRoZSBidWNrZXQgaXMgcHVibGljLiBJZiBhIHB1YmxpYyBVUkwgaXMgY3JlYXRlZCBmb3IgYSBidWNrZXQgd2hpY2ggaXMgbm90IHB1YmxpYywgeW91IHdpbGwgbm90IGJlIGFibGUgdG8gZG93bmxvYWQgdGhlIGFzc2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggVGhlIHBhdGggYW5kIG5hbWUgb2YgdGhlIGZpbGUgdG8gZ2VuZXJhdGUgdGhlIHB1YmxpYyBVUkwgZm9yLiBGb3IgZXhhbXBsZSBgZm9sZGVyL2ltYWdlLnBuZ2AuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZG93bmxvYWQgVHJpZ2dlcnMgdGhlIGZpbGUgYXMgYSBkb3dubG9hZCBpZiBzZXQgdG8gdHJ1ZS4gU2V0IHRoaXMgcGFyYW1ldGVyIGFzIHRoZSBuYW1lIG9mIHRoZSBmaWxlIGlmIHlvdSB3YW50IHRvIHRyaWdnZXIgdGhlIGRvd25sb2FkIHdpdGggYSBkaWZmZXJlbnQgZmlsZW5hbWUuXG4gICAgICogQHBhcmFtIG9wdGlvbnMudHJhbnNmb3JtIFRyYW5zZm9ybSB0aGUgYXNzZXQgYmVmb3JlIHNlcnZpbmcgaXQgdG8gdGhlIGNsaWVudC5cbiAgICAgKi9cbiAgICBnZXRQdWJsaWNVcmwocGF0aCwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBfcGF0aCA9IHRoaXMuX2dldEZpbmFsUGF0aChwYXRoKTtcbiAgICAgICAgY29uc3QgX3F1ZXJ5U3RyaW5nID0gW107XG4gICAgICAgIGNvbnN0IGRvd25sb2FkUXVlcnlQYXJhbSA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZG93bmxvYWQpXG4gICAgICAgICAgICA/IGBkb3dubG9hZD0ke29wdGlvbnMuZG93bmxvYWQgPT09IHRydWUgPyAnJyA6IG9wdGlvbnMuZG93bmxvYWR9YFxuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgaWYgKGRvd25sb2FkUXVlcnlQYXJhbSAhPT0gJycpIHtcbiAgICAgICAgICAgIF9xdWVyeVN0cmluZy5wdXNoKGRvd25sb2FkUXVlcnlQYXJhbSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgd2FudHNUcmFuc2Zvcm1hdGlvbiA9IHR5cGVvZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRyYW5zZm9ybSkgIT09ICd1bmRlZmluZWQnO1xuICAgICAgICBjb25zdCByZW5kZXJQYXRoID0gd2FudHNUcmFuc2Zvcm1hdGlvbiA/ICdyZW5kZXIvaW1hZ2UnIDogJ29iamVjdCc7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWF0aW9uUXVlcnkgPSB0aGlzLnRyYW5zZm9ybU9wdHNUb1F1ZXJ5U3RyaW5nKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudHJhbnNmb3JtKSB8fCB7fSk7XG4gICAgICAgIGlmICh0cmFuc2Zvcm1hdGlvblF1ZXJ5ICE9PSAnJykge1xuICAgICAgICAgICAgX3F1ZXJ5U3RyaW5nLnB1c2godHJhbnNmb3JtYXRpb25RdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHF1ZXJ5U3RyaW5nID0gX3F1ZXJ5U3RyaW5nLmpvaW4oJyYnKTtcbiAgICAgICAgaWYgKHF1ZXJ5U3RyaW5nICE9PSAnJykge1xuICAgICAgICAgICAgcXVlcnlTdHJpbmcgPSBgPyR7cXVlcnlTdHJpbmd9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogeyBwdWJsaWNVcmw6IGVuY29kZVVSSShgJHt0aGlzLnVybH0vJHtyZW5kZXJQYXRofS9wdWJsaWMvJHtfcGF0aH0ke3F1ZXJ5U3RyaW5nfWApIH0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgZmlsZXMgd2l0aGluIHRoZSBzYW1lIGJ1Y2tldFxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhzIEFuIGFycmF5IG9mIGZpbGVzIHRvIGRlbGV0ZSwgaW5jbHVkaW5nIHRoZSBwYXRoIGFuZCBmaWxlIG5hbWUuIEZvciBleGFtcGxlIFtgJ2ZvbGRlci9pbWFnZS5wbmcnYF0uXG4gICAgICovXG4gICAgcmVtb3ZlKHBhdGhzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZW1vdmUodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC8ke3RoaXMuYnVja2V0SWR9YCwgeyBwcmVmaXhlczogcGF0aHMgfSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgZmlsZSBtZXRhZGF0YVxuICAgICAqIEBwYXJhbSBpZCB0aGUgZmlsZSBpZCB0byByZXRyaWV2ZSBtZXRhZGF0YVxuICAgICAqL1xuICAgIC8vIGFzeW5jIGdldE1ldGFkYXRhKFxuICAgIC8vICAgaWQ6IHN0cmluZ1xuICAgIC8vICk6IFByb21pc2U8XG4gICAgLy8gICB8IHtcbiAgICAvLyAgICAgICBkYXRhOiBNZXRhZGF0YVxuICAgIC8vICAgICAgIGVycm9yOiBudWxsXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIHwge1xuICAgIC8vICAgICAgIGRhdGE6IG51bGxcbiAgICAvLyAgICAgICBlcnJvcjogU3RvcmFnZUVycm9yXG4gICAgLy8gICAgIH1cbiAgICAvLyA+IHtcbiAgICAvLyAgIHRyeSB7XG4gICAgLy8gICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L21ldGFkYXRhLyR7aWR9YCwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSlcbiAgICAvLyAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfVxuICAgIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgIC8vICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICB0aHJvdyBlcnJvclxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgZmlsZSBtZXRhZGF0YVxuICAgICAqIEBwYXJhbSBpZCB0aGUgZmlsZSBpZCB0byB1cGRhdGUgbWV0YWRhdGFcbiAgICAgKiBAcGFyYW0gbWV0YSB0aGUgbmV3IGZpbGUgbWV0YWRhdGFcbiAgICAgKi9cbiAgICAvLyBhc3luYyB1cGRhdGVNZXRhZGF0YShcbiAgICAvLyAgIGlkOiBzdHJpbmcsXG4gICAgLy8gICBtZXRhOiBNZXRhZGF0YVxuICAgIC8vICk6IFByb21pc2U8XG4gICAgLy8gICB8IHtcbiAgICAvLyAgICAgICBkYXRhOiBNZXRhZGF0YVxuICAgIC8vICAgICAgIGVycm9yOiBudWxsXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIHwge1xuICAgIC8vICAgICAgIGRhdGE6IG51bGxcbiAgICAvLyAgICAgICBlcnJvcjogU3RvcmFnZUVycm9yXG4gICAgLy8gICAgIH1cbiAgICAvLyA+IHtcbiAgICAvLyAgIHRyeSB7XG4gICAgLy8gICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBwb3N0KFxuICAgIC8vICAgICAgIHRoaXMuZmV0Y2gsXG4gICAgLy8gICAgICAgYCR7dGhpcy51cmx9L21ldGFkYXRhLyR7aWR9YCxcbiAgICAvLyAgICAgICB7IC4uLm1ldGEgfSxcbiAgICAvLyAgICAgICB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9XG4gICAgLy8gICAgIClcbiAgICAvLyAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfVxuICAgIC8vICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgIC8vICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICB0aHJvdyBlcnJvclxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICAvKipcbiAgICAgKiBMaXN0cyBhbGwgdGhlIGZpbGVzIHdpdGhpbiBhIGJ1Y2tldC5cbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgZm9sZGVyIHBhdGguXG4gICAgICovXG4gICAgbGlzdChwYXRoLCBvcHRpb25zLCBwYXJhbWV0ZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRUFSQ0hfT1BUSU9OUyksIG9wdGlvbnMpLCB7IHByZWZpeDogcGF0aCB8fCAnJyB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0L2xpc3QvJHt0aGlzLmJ1Y2tldElkfWAsIGJvZHksIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0sIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZW5jb2RlTWV0YWRhdGEobWV0YWRhdGEpIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG1ldGFkYXRhKTtcbiAgICB9XG4gICAgdG9CYXNlNjQoZGF0YSkge1xuICAgICAgICBpZiAodHlwZW9mIEJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBCdWZmZXIuZnJvbShkYXRhKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ0b2EoZGF0YSk7XG4gICAgfVxuICAgIF9nZXRGaW5hbFBhdGgocGF0aCkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5idWNrZXRJZH0vJHtwYXRofWA7XG4gICAgfVxuICAgIF9yZW1vdmVFbXB0eUZvbGRlcnMocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9eXFwvfFxcLyQvZywgJycpLnJlcGxhY2UoL1xcLysvZywgJy8nKTtcbiAgICB9XG4gICAgdHJhbnNmb3JtT3B0c1RvUXVlcnlTdHJpbmcodHJhbnNmb3JtKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgICBpZiAodHJhbnNmb3JtLndpZHRoKSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChgd2lkdGg9JHt0cmFuc2Zvcm0ud2lkdGh9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zZm9ybS5oZWlnaHQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGBoZWlnaHQ9JHt0cmFuc2Zvcm0uaGVpZ2h0fWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2Zvcm0ucmVzaXplKSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChgcmVzaXplPSR7dHJhbnNmb3JtLnJlc2l6ZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNmb3JtLmZvcm1hdCkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goYGZvcm1hdD0ke3RyYW5zZm9ybS5mb3JtYXR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zZm9ybS5xdWFsaXR5KSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChgcXVhbGl0eT0ke3RyYW5zZm9ybS5xdWFsaXR5fWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXMuam9pbignJicpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0b3JhZ2VGaWxlQXBpLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgRnVuY3Rpb25zQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL2Z1bmN0aW9ucy1qcyc7XG5pbXBvcnQgeyBQb3N0Z3Jlc3RDbGllbnQsIH0gZnJvbSAnQHN1cGFiYXNlL3Bvc3RncmVzdC1qcyc7XG5pbXBvcnQgeyBSZWFsdGltZUNsaWVudCwgfSBmcm9tICdAc3VwYWJhc2UvcmVhbHRpbWUtanMnO1xuaW1wb3J0IHsgU3RvcmFnZUNsaWVudCBhcyBTdXBhYmFzZVN0b3JhZ2VDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3RvcmFnZS1qcyc7XG5pbXBvcnQgeyBERUZBVUxUX0dMT0JBTF9PUFRJT05TLCBERUZBVUxUX0RCX09QVElPTlMsIERFRkFVTFRfQVVUSF9PUFRJT05TLCBERUZBVUxUX1JFQUxUSU1FX09QVElPTlMsIH0gZnJvbSAnLi9saWIvY29uc3RhbnRzJztcbmltcG9ydCB7IGZldGNoV2l0aEF1dGggfSBmcm9tICcuL2xpYi9mZXRjaCc7XG5pbXBvcnQgeyBzdHJpcFRyYWlsaW5nU2xhc2gsIGFwcGx5U2V0dGluZ0RlZmF1bHRzIH0gZnJvbSAnLi9saWIvaGVscGVycyc7XG5pbXBvcnQgeyBTdXBhYmFzZUF1dGhDbGllbnQgfSBmcm9tICcuL2xpYi9TdXBhYmFzZUF1dGhDbGllbnQnO1xuLyoqXG4gKiBTdXBhYmFzZSBDbGllbnQuXG4gKlxuICogQW4gaXNvbW9ycGhpYyBKYXZhc2NyaXB0IGNsaWVudCBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBQb3N0Z3Jlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VwYWJhc2VDbGllbnQge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBjbGllbnQgZm9yIHVzZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKiBAcGFyYW0gc3VwYWJhc2VVcmwgVGhlIHVuaXF1ZSBTdXBhYmFzZSBVUkwgd2hpY2ggaXMgc3VwcGxpZWQgd2hlbiB5b3UgY3JlYXRlIGEgbmV3IHByb2plY3QgaW4geW91ciBwcm9qZWN0IGRhc2hib2FyZC5cbiAgICAgKiBAcGFyYW0gc3VwYWJhc2VLZXkgVGhlIHVuaXF1ZSBTdXBhYmFzZSBLZXkgd2hpY2ggaXMgc3VwcGxpZWQgd2hlbiB5b3UgY3JlYXRlIGEgbmV3IHByb2plY3QgaW4geW91ciBwcm9qZWN0IGRhc2hib2FyZC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kYi5zY2hlbWEgWW91IGNhbiBzd2l0Y2ggaW4gYmV0d2VlbiBzY2hlbWFzLiBUaGUgc2NoZW1hIG5lZWRzIHRvIGJlIG9uIHRoZSBsaXN0IG9mIGV4cG9zZWQgc2NoZW1hcyBpbnNpZGUgU3VwYWJhc2UuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYXV0aC5hdXRvUmVmcmVzaFRva2VuIFNldCB0byBcInRydWVcIiBpZiB5b3Ugd2FudCB0byBhdXRvbWF0aWNhbGx5IHJlZnJlc2ggdGhlIHRva2VuIGJlZm9yZSBleHBpcmluZy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hdXRoLnBlcnNpc3RTZXNzaW9uIFNldCB0byBcInRydWVcIiBpZiB5b3Ugd2FudCB0byBhdXRvbWF0aWNhbGx5IHNhdmUgdGhlIHVzZXIgc2Vzc2lvbiBpbnRvIGxvY2FsIHN0b3JhZ2UuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuYXV0aC5kZXRlY3RTZXNzaW9uSW5VcmwgU2V0IHRvIFwidHJ1ZVwiIGlmIHlvdSB3YW50IHRvIGF1dG9tYXRpY2FsbHkgZGV0ZWN0cyBPQXV0aCBncmFudHMgaW4gdGhlIFVSTCBhbmQgc2lnbnMgaW4gdGhlIHVzZXIuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVhbHRpbWUgT3B0aW9ucyBwYXNzZWQgYWxvbmcgdG8gcmVhbHRpbWUtanMgY29uc3RydWN0b3IuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZ2xvYmFsLmZldGNoIEEgY3VzdG9tIGZldGNoIGltcGxlbWVudGF0aW9uLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmdsb2JhbC5oZWFkZXJzIEFueSBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gc2VuZCB3aXRoIGVhY2ggbmV0d29yayByZXF1ZXN0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgdGhpcy5zdXBhYmFzZVVybCA9IHN1cGFiYXNlVXJsO1xuICAgICAgICB0aGlzLnN1cGFiYXNlS2V5ID0gc3VwYWJhc2VLZXk7XG4gICAgICAgIGlmICghc3VwYWJhc2VVcmwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N1cGFiYXNlVXJsIGlzIHJlcXVpcmVkLicpO1xuICAgICAgICBpZiAoIXN1cGFiYXNlS2V5KVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdXBhYmFzZUtleSBpcyByZXF1aXJlZC4nKTtcbiAgICAgICAgY29uc3QgX3N1cGFiYXNlVXJsID0gc3RyaXBUcmFpbGluZ1NsYXNoKHN1cGFiYXNlVXJsKTtcbiAgICAgICAgdGhpcy5yZWFsdGltZVVybCA9IGAke19zdXBhYmFzZVVybH0vcmVhbHRpbWUvdjFgLnJlcGxhY2UoL15odHRwL2ksICd3cycpO1xuICAgICAgICB0aGlzLmF1dGhVcmwgPSBgJHtfc3VwYWJhc2VVcmx9L2F1dGgvdjFgO1xuICAgICAgICB0aGlzLnN0b3JhZ2VVcmwgPSBgJHtfc3VwYWJhc2VVcmx9L3N0b3JhZ2UvdjFgO1xuICAgICAgICB0aGlzLmZ1bmN0aW9uc1VybCA9IGAke19zdXBhYmFzZVVybH0vZnVuY3Rpb25zL3YxYDtcbiAgICAgICAgLy8gZGVmYXVsdCBzdG9yYWdlIGtleSB1c2VzIHRoZSBzdXBhYmFzZSBwcm9qZWN0IHJlZiBhcyBhIG5hbWVzcGFjZVxuICAgICAgICBjb25zdCBkZWZhdWx0U3RvcmFnZUtleSA9IGBzYi0ke25ldyBVUkwodGhpcy5hdXRoVXJsKS5ob3N0bmFtZS5zcGxpdCgnLicpWzBdfS1hdXRoLXRva2VuYDtcbiAgICAgICAgY29uc3QgREVGQVVMVFMgPSB7XG4gICAgICAgICAgICBkYjogREVGQVVMVF9EQl9PUFRJT05TLFxuICAgICAgICAgICAgcmVhbHRpbWU6IERFRkFVTFRfUkVBTFRJTUVfT1BUSU9OUyxcbiAgICAgICAgICAgIGF1dGg6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9BVVRIX09QVElPTlMpLCB7IHN0b3JhZ2VLZXk6IGRlZmF1bHRTdG9yYWdlS2V5IH0pLFxuICAgICAgICAgICAgZ2xvYmFsOiBERUZBVUxUX0dMT0JBTF9PUFRJT05TLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IGFwcGx5U2V0dGluZ0RlZmF1bHRzKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwID8gb3B0aW9ucyA6IHt9LCBERUZBVUxUUyk7XG4gICAgICAgIHRoaXMuc3RvcmFnZUtleSA9IChfYSA9IHNldHRpbmdzLmF1dGguc3RvcmFnZUtleSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IChfYiA9IHNldHRpbmdzLmdsb2JhbC5oZWFkZXJzKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB7fTtcbiAgICAgICAgaWYgKCFzZXR0aW5ncy5hY2Nlc3NUb2tlbikge1xuICAgICAgICAgICAgdGhpcy5hdXRoID0gdGhpcy5faW5pdFN1cGFiYXNlQXV0aENsaWVudCgoX2MgPSBzZXR0aW5ncy5hdXRoKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB7fSwgdGhpcy5oZWFkZXJzLCBzZXR0aW5ncy5nbG9iYWwuZmV0Y2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IHNldHRpbmdzLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgICAgdGhpcy5hdXRoID0gbmV3IFByb3h5KHt9LCB7XG4gICAgICAgICAgICAgICAgZ2V0OiAoXywgcHJvcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEBzdXBhYmFzZS9zdXBhYmFzZS1qczogU3VwYWJhc2UgQ2xpZW50IGlzIGNvbmZpZ3VyZWQgd2l0aCB0aGUgYWNjZXNzVG9rZW4gb3B0aW9uLCBhY2Nlc3Npbmcgc3VwYWJhc2UuYXV0aC4ke1N0cmluZyhwcm9wKX0gaXMgbm90IHBvc3NpYmxlYCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmV0Y2ggPSBmZXRjaFdpdGhBdXRoKHN1cGFiYXNlS2V5LCB0aGlzLl9nZXRBY2Nlc3NUb2tlbi5iaW5kKHRoaXMpLCBzZXR0aW5ncy5nbG9iYWwuZmV0Y2gpO1xuICAgICAgICB0aGlzLnJlYWx0aW1lID0gdGhpcy5faW5pdFJlYWx0aW1lQ2xpZW50KE9iamVjdC5hc3NpZ24oeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsIGFjY2Vzc1Rva2VuOiB0aGlzLl9nZXRBY2Nlc3NUb2tlbi5iaW5kKHRoaXMpIH0sIHNldHRpbmdzLnJlYWx0aW1lKSk7XG4gICAgICAgIHRoaXMucmVzdCA9IG5ldyBQb3N0Z3Jlc3RDbGllbnQoYCR7X3N1cGFiYXNlVXJsfS9yZXN0L3YxYCwge1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2NoZW1hOiBzZXR0aW5ncy5kYi5zY2hlbWEsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghc2V0dGluZ3MuYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbkZvckF1dGhFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdXBhYmFzZSBGdW5jdGlvbnMgYWxsb3dzIHlvdSB0byBkZXBsb3kgYW5kIGludm9rZSBlZGdlIGZ1bmN0aW9ucy5cbiAgICAgKi9cbiAgICBnZXQgZnVuY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gbmV3IEZ1bmN0aW9uc0NsaWVudCh0aGlzLmZ1bmN0aW9uc1VybCwge1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgY3VzdG9tRmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdXBhYmFzZSBTdG9yYWdlIGFsbG93cyB5b3UgdG8gbWFuYWdlIHVzZXItZ2VuZXJhdGVkIGNvbnRlbnQsIHN1Y2ggYXMgcGhvdG9zIG9yIHZpZGVvcy5cbiAgICAgKi9cbiAgICBnZXQgc3RvcmFnZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdXBhYmFzZVN0b3JhZ2VDbGllbnQodGhpcy5zdG9yYWdlVXJsLCB0aGlzLmhlYWRlcnMsIHRoaXMuZmV0Y2gpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgcXVlcnkgb24gYSB0YWJsZSBvciBhIHZpZXcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVsYXRpb24gLSBUaGUgdGFibGUgb3IgdmlldyBuYW1lIHRvIHF1ZXJ5XG4gICAgICovXG4gICAgZnJvbShyZWxhdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0LmZyb20ocmVsYXRpb24pO1xuICAgIH1cbiAgICAvLyBOT1RFOiBzaWduYXR1cmVzIG11c3QgYmUga2VwdCBpbiBzeW5jIHdpdGggUG9zdGdyZXN0Q2xpZW50LnNjaGVtYVxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBhIHNjaGVtYSB0byBxdWVyeSBvciBwZXJmb3JtIGFuIGZ1bmN0aW9uIChycGMpIGNhbGwuXG4gICAgICpcbiAgICAgKiBUaGUgc2NoZW1hIG5lZWRzIHRvIGJlIG9uIHRoZSBsaXN0IG9mIGV4cG9zZWQgc2NoZW1hcyBpbnNpZGUgU3VwYWJhc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIC0gVGhlIHNjaGVtYSB0byBxdWVyeVxuICAgICAqL1xuICAgIHNjaGVtYShzY2hlbWEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5zY2hlbWEoc2NoZW1hKTtcbiAgICB9XG4gICAgLy8gTk9URTogc2lnbmF0dXJlcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIFBvc3RncmVzdENsaWVudC5ycGNcbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgZnVuY3Rpb24gY2FsbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiAtIFRoZSBmdW5jdGlvbiBuYW1lIHRvIGNhbGxcbiAgICAgKiBAcGFyYW0gYXJncyAtIFRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgZnVuY3Rpb24gY2FsbFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLmhlYWQgLSBXaGVuIHNldCB0byBgdHJ1ZWAsIGBkYXRhYCB3aWxsIG5vdCBiZSByZXR1cm5lZC5cbiAgICAgKiBVc2VmdWwgaWYgeW91IG9ubHkgbmVlZCB0aGUgY291bnQuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZ2V0IC0gV2hlbiBzZXQgdG8gYHRydWVgLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aFxuICAgICAqIHJlYWQtb25seSBhY2Nlc3MgbW9kZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb3VudCAtIENvdW50IGFsZ29yaXRobSB0byB1c2UgdG8gY291bnQgcm93cyByZXR1cm5lZCBieSB0aGVcbiAgICAgKiBmdW5jdGlvbi4gT25seSBhcHBsaWNhYmxlIGZvciBbc2V0LXJldHVybmluZ1xuICAgICAqIGZ1bmN0aW9uc10oaHR0cHM6Ly93d3cucG9zdGdyZXNxbC5vcmcvZG9jcy9jdXJyZW50L2Z1bmN0aW9ucy1zcmYuaHRtbCkuXG4gICAgICpcbiAgICAgKiBgXCJleGFjdFwiYDogRXhhY3QgYnV0IHNsb3cgY291bnQgYWxnb3JpdGhtLiBQZXJmb3JtcyBhIGBDT1VOVCgqKWAgdW5kZXIgdGhlXG4gICAgICogaG9vZC5cbiAgICAgKlxuICAgICAqIGBcInBsYW5uZWRcImA6IEFwcHJveGltYXRlZCBidXQgZmFzdCBjb3VudCBhbGdvcml0aG0uIFVzZXMgdGhlIFBvc3RncmVzXG4gICAgICogc3RhdGlzdGljcyB1bmRlciB0aGUgaG9vZC5cbiAgICAgKlxuICAgICAqIGBcImVzdGltYXRlZFwiYDogVXNlcyBleGFjdCBjb3VudCBmb3IgbG93IG51bWJlcnMgYW5kIHBsYW5uZWQgY291bnQgZm9yIGhpZ2hcbiAgICAgKiBudW1iZXJzLlxuICAgICAqL1xuICAgIHJwYyhmbiwgYXJncyA9IHt9LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdC5ycGMoZm4sIGFyZ3MsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgUmVhbHRpbWUgY2hhbm5lbCB3aXRoIEJyb2FkY2FzdCwgUHJlc2VuY2UsIGFuZCBQb3N0Z3JlcyBDaGFuZ2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgUmVhbHRpbWUgY2hhbm5lbC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIFRoZSBvcHRpb25zIHRvIHBhc3MgdG8gdGhlIFJlYWx0aW1lIGNoYW5uZWwuXG4gICAgICpcbiAgICAgKi9cbiAgICBjaGFubmVsKG5hbWUsIG9wdHMgPSB7IGNvbmZpZzoge30gfSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFsdGltZS5jaGFubmVsKG5hbWUsIG9wdHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBSZWFsdGltZSBjaGFubmVscy5cbiAgICAgKi9cbiAgICBnZXRDaGFubmVscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhbHRpbWUuZ2V0Q2hhbm5lbHMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5zdWJzY3JpYmVzIGFuZCByZW1vdmVzIFJlYWx0aW1lIGNoYW5uZWwgZnJvbSBSZWFsdGltZSBjbGllbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWx0aW1lQ2hhbm5lbH0gY2hhbm5lbCAtIFRoZSBuYW1lIG9mIHRoZSBSZWFsdGltZSBjaGFubmVsLlxuICAgICAqXG4gICAgICovXG4gICAgcmVtb3ZlQ2hhbm5lbChjaGFubmVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWx0aW1lLnJlbW92ZUNoYW5uZWwoY2hhbm5lbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlcyBhbmQgcmVtb3ZlcyBhbGwgUmVhbHRpbWUgY2hhbm5lbHMgZnJvbSBSZWFsdGltZSBjbGllbnQuXG4gICAgICovXG4gICAgcmVtb3ZlQWxsQ2hhbm5lbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWx0aW1lLnJlbW92ZUFsbENoYW5uZWxzKCk7XG4gICAgfVxuICAgIF9nZXRBY2Nlc3NUb2tlbigpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIHRoaXMuYWNjZXNzVG9rZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSB9ID0geWllbGQgdGhpcy5hdXRoLmdldFNlc3Npb24oKTtcbiAgICAgICAgICAgIHJldHVybiAoX2IgPSAoX2EgPSBkYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW4pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfaW5pdFN1cGFiYXNlQXV0aENsaWVudCh7IGF1dG9SZWZyZXNoVG9rZW4sIHBlcnNpc3RTZXNzaW9uLCBkZXRlY3RTZXNzaW9uSW5VcmwsIHN0b3JhZ2UsIHN0b3JhZ2VLZXksIGZsb3dUeXBlLCBsb2NrLCBkZWJ1ZywgfSwgaGVhZGVycywgZmV0Y2gpIHtcbiAgICAgICAgY29uc3QgYXV0aEhlYWRlcnMgPSB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dGhpcy5zdXBhYmFzZUtleX1gLFxuICAgICAgICAgICAgYXBpa2V5OiBgJHt0aGlzLnN1cGFiYXNlS2V5fWAsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXcgU3VwYWJhc2VBdXRoQ2xpZW50KHtcbiAgICAgICAgICAgIHVybDogdGhpcy5hdXRoVXJsLFxuICAgICAgICAgICAgaGVhZGVyczogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhdXRoSGVhZGVycyksIGhlYWRlcnMpLFxuICAgICAgICAgICAgc3RvcmFnZUtleTogc3RvcmFnZUtleSxcbiAgICAgICAgICAgIGF1dG9SZWZyZXNoVG9rZW4sXG4gICAgICAgICAgICBwZXJzaXN0U2Vzc2lvbixcbiAgICAgICAgICAgIGRldGVjdFNlc3Npb25JblVybCxcbiAgICAgICAgICAgIHN0b3JhZ2UsXG4gICAgICAgICAgICBmbG93VHlwZSxcbiAgICAgICAgICAgIGxvY2ssXG4gICAgICAgICAgICBkZWJ1ZyxcbiAgICAgICAgICAgIGZldGNoLFxuICAgICAgICAgICAgLy8gYXV0aCBjaGVja3MgaWYgdGhlcmUgaXMgYSBjdXN0b20gYXV0aG9yaXphaXRvbiBoZWFkZXIgdXNpbmcgdGhpcyBmbGFnXG4gICAgICAgICAgICAvLyBzbyBpdCBrbm93cyB3aGV0aGVyIHRvIHJldHVybiBhbiBlcnJvciB3aGVuIGdldFVzZXIgaXMgY2FsbGVkIHdpdGggbm8gc2Vzc2lvblxuICAgICAgICAgICAgaGFzQ3VzdG9tQXV0aG9yaXphdGlvbkhlYWRlcjogJ0F1dGhvcml6YXRpb24nIGluIHRoaXMuaGVhZGVycyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9pbml0UmVhbHRpbWVDbGllbnQob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFJlYWx0aW1lQ2xpZW50KHRoaXMucmVhbHRpbWVVcmwsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgcGFyYW1zOiBPYmplY3QuYXNzaWduKHsgYXBpa2V5OiB0aGlzLnN1cGFiYXNlS2V5IH0sIG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5wYXJhbXMpIH0pKTtcbiAgICB9XG4gICAgX2xpc3RlbkZvckF1dGhFdmVudHMoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5hdXRoLm9uQXV0aFN0YXRlQ2hhbmdlKChldmVudCwgc2Vzc2lvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlVG9rZW5DaGFuZ2VkKGV2ZW50LCAnQ0xJRU5UJywgc2Vzc2lvbiA9PT0gbnVsbCB8fCBzZXNzaW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uLmFjY2Vzc190b2tlbik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgX2hhbmRsZVRva2VuQ2hhbmdlZChldmVudCwgc291cmNlLCB0b2tlbikge1xuICAgICAgICBpZiAoKGV2ZW50ID09PSAnVE9LRU5fUkVGUkVTSEVEJyB8fCBldmVudCA9PT0gJ1NJR05FRF9JTicpICYmXG4gICAgICAgICAgICB0aGlzLmNoYW5nZWRBY2Nlc3NUb2tlbiAhPT0gdG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZEFjY2Vzc1Rva2VuID0gdG9rZW47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQgPT09ICdTSUdORURfT1VUJykge1xuICAgICAgICAgICAgdGhpcy5yZWFsdGltZS5zZXRBdXRoKCk7XG4gICAgICAgICAgICBpZiAoc291cmNlID09ICdTVE9SQUdFJylcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGguc2lnbk91dCgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkQWNjZXNzVG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdXBhYmFzZUNsaWVudC5qcy5tYXAiLCJpbXBvcnQgU3VwYWJhc2VDbGllbnQgZnJvbSAnLi9TdXBhYmFzZUNsaWVudCc7XG5leHBvcnQgKiBmcm9tICdAc3VwYWJhc2UvYXV0aC1qcyc7XG5leHBvcnQgeyBQb3N0Z3Jlc3RFcnJvciwgfSBmcm9tICdAc3VwYWJhc2UvcG9zdGdyZXN0LWpzJztcbmV4cG9ydCB7IEZ1bmN0aW9uc0h0dHBFcnJvciwgRnVuY3Rpb25zRmV0Y2hFcnJvciwgRnVuY3Rpb25zUmVsYXlFcnJvciwgRnVuY3Rpb25zRXJyb3IsIEZ1bmN0aW9uUmVnaW9uLCB9IGZyb20gJ0BzdXBhYmFzZS9mdW5jdGlvbnMtanMnO1xuZXhwb3J0ICogZnJvbSAnQHN1cGFiYXNlL3JlYWx0aW1lLWpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3VwYWJhc2VDbGllbnQgfSBmcm9tICcuL1N1cGFiYXNlQ2xpZW50Jztcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBTdXBhYmFzZSBDbGllbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVDbGllbnQgPSAoc3VwYWJhc2VVcmwsIHN1cGFiYXNlS2V5LCBvcHRpb25zKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBTdXBhYmFzZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VLZXksIG9wdGlvbnMpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCB7IEF1dGhDbGllbnQgfSBmcm9tICdAc3VwYWJhc2UvYXV0aC1qcyc7XG5leHBvcnQgY2xhc3MgU3VwYWJhc2VBdXRoQ2xpZW50IGV4dGVuZHMgQXV0aENsaWVudCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdXBhYmFzZUF1dGhDbGllbnQuanMubWFwIiwiaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbic7XG5sZXQgSlNfRU5WID0gJyc7XG4vLyBAdHMtaWdub3JlXG5pZiAodHlwZW9mIERlbm8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgSlNfRU5WID0gJ2Rlbm8nO1xufVxuZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIEpTX0VOViA9ICd3ZWInO1xufVxuZWxzZSBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICBKU19FTlYgPSAncmVhY3QtbmF0aXZlJztcbn1cbmVsc2Uge1xuICAgIEpTX0VOViA9ICdub2RlJztcbn1cbmV4cG9ydCBjb25zdCBERUZBVUxUX0hFQURFUlMgPSB7ICdYLUNsaWVudC1JbmZvJzogYHN1cGFiYXNlLWpzLSR7SlNfRU5WfS8ke3ZlcnNpb259YCB9O1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfR0xPQkFMX09QVElPTlMgPSB7XG4gICAgaGVhZGVyczogREVGQVVMVF9IRUFERVJTLFxufTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0RCX09QVElPTlMgPSB7XG4gICAgc2NoZW1hOiAncHVibGljJyxcbn07XG5leHBvcnQgY29uc3QgREVGQVVMVF9BVVRIX09QVElPTlMgPSB7XG4gICAgYXV0b1JlZnJlc2hUb2tlbjogdHJ1ZSxcbiAgICBwZXJzaXN0U2Vzc2lvbjogdHJ1ZSxcbiAgICBkZXRlY3RTZXNzaW9uSW5Vcmw6IHRydWUsXG4gICAgZmxvd1R5cGU6ICdpbXBsaWNpdCcsXG59O1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkVBTFRJTUVfT1BUSU9OUyA9IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IG5vZGVGZXRjaCwgeyBIZWFkZXJzIGFzIE5vZGVGZXRjaEhlYWRlcnMgfSBmcm9tICdAc3VwYWJhc2Uvbm9kZS1mZXRjaCc7XG5leHBvcnQgY29uc3QgcmVzb2x2ZUZldGNoID0gKGN1c3RvbUZldGNoKSA9PiB7XG4gICAgbGV0IF9mZXRjaDtcbiAgICBpZiAoY3VzdG9tRmV0Y2gpIHtcbiAgICAgICAgX2ZldGNoID0gY3VzdG9tRmV0Y2g7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgX2ZldGNoID0gbm9kZUZldGNoO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgX2ZldGNoID0gZmV0Y2g7XG4gICAgfVxuICAgIHJldHVybiAoLi4uYXJncykgPT4gX2ZldGNoKC4uLmFyZ3MpO1xufTtcbmV4cG9ydCBjb25zdCByZXNvbHZlSGVhZGVyc0NvbnN0cnVjdG9yID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgSGVhZGVycyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIE5vZGVGZXRjaEhlYWRlcnM7XG4gICAgfVxuICAgIHJldHVybiBIZWFkZXJzO1xufTtcbmV4cG9ydCBjb25zdCBmZXRjaFdpdGhBdXRoID0gKHN1cGFiYXNlS2V5LCBnZXRBY2Nlc3NUb2tlbiwgY3VzdG9tRmV0Y2gpID0+IHtcbiAgICBjb25zdCBmZXRjaCA9IHJlc29sdmVGZXRjaChjdXN0b21GZXRjaCk7XG4gICAgY29uc3QgSGVhZGVyc0NvbnN0cnVjdG9yID0gcmVzb2x2ZUhlYWRlcnNDb25zdHJ1Y3RvcigpO1xuICAgIHJldHVybiAoaW5wdXQsIGluaXQpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gKF9hID0gKHlpZWxkIGdldEFjY2Vzc1Rva2VuKCkpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBzdXBhYmFzZUtleTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVyc0NvbnN0cnVjdG9yKGluaXQgPT09IG51bGwgfHwgaW5pdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogaW5pdC5oZWFkZXJzKTtcbiAgICAgICAgaWYgKCFoZWFkZXJzLmhhcygnYXBpa2V5JykpIHtcbiAgICAgICAgICAgIGhlYWRlcnMuc2V0KCdhcGlrZXknLCBzdXBhYmFzZUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoZWFkZXJzLmhhcygnQXV0aG9yaXphdGlvbicpKSB7XG4gICAgICAgICAgICBoZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmV0Y2goaW5wdXQsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgaW5pdCksIHsgaGVhZGVycyB9KSk7XG4gICAgfSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmV0Y2guanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gdXVpZCgpIHtcbiAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgICAgICB2YXIgciA9IChNYXRoLnJhbmRvbSgpICogMTYpIHwgMCwgdiA9IGMgPT0gJ3gnID8gciA6IChyICYgMHgzKSB8IDB4ODtcbiAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwVHJhaWxpbmdTbGFzaCh1cmwpIHtcbiAgICByZXR1cm4gdXJsLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG59XG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCkgPT4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5leHBvcnQgZnVuY3Rpb24gYXBwbHlTZXR0aW5nRGVmYXVsdHMob3B0aW9ucywgZGVmYXVsdHMpIHtcbiAgICBjb25zdCB7IGRiOiBkYk9wdGlvbnMsIGF1dGg6IGF1dGhPcHRpb25zLCByZWFsdGltZTogcmVhbHRpbWVPcHRpb25zLCBnbG9iYWw6IGdsb2JhbE9wdGlvbnMsIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHsgZGI6IERFRkFVTFRfREJfT1BUSU9OUywgYXV0aDogREVGQVVMVF9BVVRIX09QVElPTlMsIHJlYWx0aW1lOiBERUZBVUxUX1JFQUxUSU1FX09QVElPTlMsIGdsb2JhbDogREVGQVVMVF9HTE9CQUxfT1BUSU9OUywgfSA9IGRlZmF1bHRzO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgZGI6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9EQl9PUFRJT05TKSwgZGJPcHRpb25zKSxcbiAgICAgICAgYXV0aDogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0FVVEhfT1BUSU9OUyksIGF1dGhPcHRpb25zKSxcbiAgICAgICAgcmVhbHRpbWU6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9SRUFMVElNRV9PUFRJT05TKSwgcmVhbHRpbWVPcHRpb25zKSxcbiAgICAgICAgZ2xvYmFsOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfR0xPQkFMX09QVElPTlMpLCBnbG9iYWxPcHRpb25zKSxcbiAgICAgICAgYWNjZXNzVG9rZW46ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgcmV0dXJuICcnOyB9KSxcbiAgICB9O1xuICAgIGlmIChvcHRpb25zLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHJlc3VsdC5hY2Nlc3NUb2tlbiA9IG9wdGlvbnMuYWNjZXNzVG9rZW47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBoYWNrIGFyb3VuZCBSZXF1aXJlZDw+XG4gICAgICAgIGRlbGV0ZSByZXN1bHQuYWNjZXNzVG9rZW47XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oZWxwZXJzLmpzLm1hcCIsImV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzIuNDkuNCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZXJzaW9uLmpzLm1hcCIsIi8vIHNyYy9hdXRoL2F1dGguanNcbi8qKlxuICogQXV0aGVudGljYXRpb24gTW9kdWxlIC0gQmFzZVxuICogQG1vZHVsZSBhdXRoXG4gKiBAZGVzY3JpcHRpb24gQmFzZSBtb2R1bGUgZm9yIGF1dGhlbnRpY2F0aW9uIHdpdGggY29tbW9uIGZ1bmN0aW9ucyBhbmQgY29uZmlndXJhdGlvblxuICogQHZlcnNpb24gMC4wLjNcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4zICgyMDI1LTA1LTEzKTogTW9kaWZpZWQgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlIG1hbmFnZW1lbnQgdG8gdXNlIFN1cGFiYXNlIEF1dGggc3lzdGVtLlxuICogLSAwLjAuMiAoMjAyNS0wNS0xMyk6IFJlb3JnYW5pemF0aW9uIGludG8gc2VwYXJhdGUgbW9kdWxlc1xuICogLSAwLjAuMSAoMjAyNS0wNS0wMyk6IEluaXRpYWwgY3JlYXRpb25cbiAqL1xuXG4vLyAtLS0gQVBJIFVSTCBEZWZpbml0aW9ucyAtLS1cbmV4cG9ydCBjb25zdCBJU19MT0NBTCA9XG4gIGxvY2F0aW9uLmhvc3RuYW1lID09PSBcImxvY2FsaG9zdFwiIHx8IGxvY2F0aW9uLmhvc3RuYW1lID09PSBcIjEyNy4wLjAuMVwiO1xuXG5leHBvcnQgY29uc3QgQVBJX1VSTFMgPSB7XG4gIEhBTkRMRV9DT05GSVJNQVRJT046IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX2NvbmZpcm1hdGlvblwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLWNvbmZpcm1hdGlvbi11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxuXG4gIEhBTkRMRV9TSUdOVVA6IElTX0xPQ0FMXG4gICAgPyBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMS91cmJhbmRvY3MvdXMtY2VudHJhbDEvaGFuZGxlX3NpZ251cFwiXG4gICAgOiBcImh0dHBzOi8vaGFuZGxlLXNpZ251cC11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxuXG4gIEhBTkRMRV9MT0dJTjogSVNfTE9DQUxcbiAgICA/IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAxL3VyYmFuZG9jcy91cy1jZW50cmFsMS9oYW5kbGVfbG9naW5cIlxuICAgIDogXCJodHRwczovL2hhbmRsZS1sb2dpbi11cDNrM2hkZHRxLXVjLmEucnVuLmFwcFwiLFxufTtcblxuLy8gR2xvYmFsIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG5sZXQgY3VycmVudFVzZXIgPSBudWxsO1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdXNlclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXIgLSBVc2VyIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRVc2VyKHVzZXIpIHtcbiAgY3VycmVudFVzZXIgPSB1c2VyO1xuICAvLyBQb3NzaWJsZSBzdG9yYWdlIGluIGxvY2FsU3RvcmFnZS9zZXNzaW9uU3RvcmFnZVxuICBpZiAodXNlcikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudFVzZXJcIiwgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICB9IGVsc2Uge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgdXNlclxuICogQHJldHVybnMge09iamVjdHxudWxsfSBUaGUgY3VycmVudCB1c2VyIG9yIG51bGxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKCkge1xuICAvLyBJZiBubyB1c2VyIGluIG1lbW9yeSwgdHJ5IHRvIHJldHJpZXZlIGl0IGZyb20gc3RvcmFnZVxuICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgY29uc3Qgc3RvcmVkVXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgaWYgKHN0b3JlZFVzZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbnRVc2VyID0gSlNPTi5wYXJzZShzdG9yZWRVc2VyKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJldHJpZXZpbmcgdXNlcjpcIiwgZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiY3VycmVudFVzZXJcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnRVc2VyO1xufVxuXG4vKipcbiAqIExvZ3Mgb3V0IHRoZSB1c2VyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gIGN1cnJlbnRVc2VyID0gbnVsbDtcbiAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgLy8gUmVkaXJlY3QgdG8gdGhlIGhvbWUgcGFnZSBhZnRlciBsb2dvdXRcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9pbmRleFwiO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdXNlciBpcyBsb2dnZWQgaW5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpblxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMb2dnZWRJbigpIHtcbiAgcmV0dXJuIGdldEN1cnJlbnRVc2VyKCkgIT09IG51bGw7XG59XG5cbi8qKlxuICogRGlzcGxheXMgYW4gZXJyb3IgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBFcnJvciBtZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB3aGVyZSB0byBkaXNwbGF5IHRoZSBlcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1lc3NhZ2UsIGVsZW1lbnRJZCA9IFwiZXJyb3JNZXNzYWdlXCIpIHtcbiAgY29uc3QgZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVycm9yRWxlbWVudCkge1xuICAgIGVycm9yRWxlbWVudC5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBlbGVtZW50IG5vdCBmb3VuZDpcIiwgZWxlbWVudElkKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BsYXlzIGEgc3RhdHVzIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gTWVzc2FnZSB0byBkaXNwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIE1lc3NhZ2UgdHlwZSAoc3VjY2VzcywgaW5mbywgd2FybmluZywgZGFuZ2VyKVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dTdGF0dXMoXG4gIG1lc3NhZ2UsXG4gIHR5cGUgPSBcImluZm9cIixcbiAgZWxlbWVudElkID0gXCJzdGF0dXNNZXNzYWdlXCJcbikge1xuICBjb25zdCBzdGF0dXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKHN0YXR1c0VsZW1lbnQpIHtcbiAgICBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcblxuICAgIC8vIFJlbW92ZSBhbGwgYWxlcnQtKiBjbGFzc2VzXG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB7XG4gICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJhbGVydC1cIikpIHtcbiAgICAgICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgdGhlIGNsYXNzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGVcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGFsZXJ0LSR7dHlwZX1gKTtcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIlN0YXR1cyBlbGVtZW50IG5vdCBmb3VuZDpcIiwgZWxlbWVudElkKTtcbiAgfVxufVxuXG4vKipcbiAqIEhpZGVzIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB0byBoaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50SWQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbi8qKlxuICogU2hvd3MgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIHNob3dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0xvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIGlmIChzcGlubmVyKSBzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG59XG5cbi8qKlxuICogSGlkZXMgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWQgLSBJRCBvZiB0aGUgYnV0dG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3Bpbm5lcklkIC0gSUQgb2YgdGhlIHNwaW5uZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVMb2FkaW5nKGJ1dHRvbklkLCBzcGlubmVySWQpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3Bpbm5lcklkKTtcblxuICBpZiAoYnV0dG9uKSBidXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn1cblxuLy8gRXhwb3J0IHRoZSBuZWNlc3NhcnkgZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXNcbmV4cG9ydCBkZWZhdWx0IHtcbiAgQVBJX1VSTFMsXG4gIElTX0xPQ0FMLFxuICBnZXRDdXJyZW50VXNlcixcbiAgc2V0Q3VycmVudFVzZXIsXG4gIGxvZ291dCxcbiAgaXNMb2dnZWRJbixcbiAgc2hvd0Vycm9yLFxuICBzaG93U3RhdHVzLFxuICBoaWRlRWxlbWVudCxcbiAgc2hvd0VsZW1lbnQsXG4gIHNob3dMb2FkaW5nLFxuICBoaWRlTG9hZGluZyxcbn07XG4iLCIvLyBzcmMvanMvbG9naW4uanNcbi8qKlxuICogRmlyZWJhc2UgTG9naW5cbiAqIEBtb2R1bGUgbG9naW5cbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBoYW5kbGVzIHVzZXIgbG9naW4gZnVuY3Rpb25hbGl0eSB1c2luZyBTdXBhYmFzZSBBdXRoZW50aWNhdGlvbi5cbiAqIEB2ZXJzaW9uIDAuMC40XG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICogQHRvZG8gQWRkIHBob25lIG51bWJlciBhdXRoZW50aWNhdGlvbiAmIHBhc3N3b3JkIHJlc2V0IGZ1bmN0aW9uYWxpdHkuXG4gKlxuICogQGNoYW5nZWxvZ1xuICogLSAwLjAuNCAoMjAyNS0wNS0xMyk6IEVuc3VyZSBzdGF0dXMgbWVzc2FnZSBpcyBhbHNvIGhpZGRlbiBvbiBuZXcgc3VibWl0LlxuICogLSAwLjAuMyAoMjAyNS0wNS0wOCk6IEltcGxlbWVudGVkIGFjdHVhbCBsb2dpbiB3aXRoIEZpcmViYXNlIGZ1bmN0aW9uLCBhZGRlZCBwYXNzd29yZCB2aXNpYmlsaXR5IHRvZ2dsZS5cbiAqIC0gMC4wLjIgKDIwMjUtMDUtMDgpOiBSZWZhY3RvcmVkIHRvIGhhbmRsZSBTdXBhYmFzZSBhdXRoZW50aWZpY2F0aW9uLlxuICogLSAwLjAuMSAoMjAyNS0wNC0yNyk6IExvZ2luIGZ1bmN0aW9uYWxpdHkgaW1wbGVtZW50ZWQgdXNpbmcgRmlyZWJhc2UgQXV0aGVudGljYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQVBJX1VSTFMsXG4gIHNldEN1cnJlbnRVc2VyLFxuICBzaG93RXJyb3IsXG4gIHNob3dTdGF0dXMsXG4gIHNob3dMb2FkaW5nLFxuICBoaWRlTG9hZGluZyxcbn0gZnJvbSBcIi4vYXV0aC5qc1wiO1xuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiLi4vc3VwYWJhc2UtY2xpZW50LmpzXCI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIGxvZ2luIHBhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRMb2dpblBhZ2UoKSB7XG4gIGNvbnN0IGxvZ2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5Gb3JtXCIpO1xuICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVycm9yTWVzc2FnZVwiKTtcbiAgY29uc3QgdG9nZ2xlUGFzc3dvcmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZ2dsZVBhc3N3b3JkXCIpO1xuICBjb25zdCBwYXNzd29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKTtcblxuICAvLyBTZXQgdXAgcGFzc3dvcmQgdmlzaWJpbGl0eSB0b2dnbGVcbiAgaWYgKHRvZ2dsZVBhc3N3b3JkQnRuICYmIHBhc3N3b3JkSW5wdXQpIHtcbiAgICB0b2dnbGVQYXNzd29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9XG4gICAgICAgIHBhc3N3b3JkSW5wdXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSA9PT0gXCJwYXNzd29yZFwiID8gXCJ0ZXh0XCIgOiBcInBhc3N3b3JkXCI7XG4gICAgICBwYXNzd29yZElucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgdHlwZSk7XG5cbiAgICAgIC8vIFRvZ2dsZSBpY29uXG4gICAgICBjb25zdCBpY29uRWxlbWVudCA9IHRvZ2dsZVBhc3N3b3JkQnRuLnF1ZXJ5U2VsZWN0b3IoXCJpXCIpO1xuICAgICAgaWYgKHR5cGUgPT09IFwicGFzc3dvcmRcIikge1xuICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYmktZXllXCIpO1xuICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYmktZXllLXNsYXNoXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImJpLWV5ZS1zbGFzaFwiKTtcbiAgICAgICAgaWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImJpLWV5ZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmIChsb2dpbkZvcm0pIHtcbiAgICBsb2dpbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAvLyBSZXNldCBtZXNzYWdlc1xuICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIH1cbiAgICAgIC8vIEVuc3VyZSBzdGF0dXMgbWVzc2FnZSBpcyBhbHNvIGhpZGRlbiBvbiBuZXcgc3VibWl0XG4gICAgICBjb25zdCBzdGF0dXNNZXNzYWdlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhdHVzTWVzc2FnZVwiKTtcbiAgICAgIGlmIChzdGF0dXNNZXNzYWdlRWxlbWVudCkge1xuICAgICAgICBzdGF0dXNNZXNzYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICBzdGF0dXNNZXNzYWdlRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBmb3JtIHZhbHVlc1xuICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlO1xuICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuXG4gICAgICAvLyBCYXNpYyB2YWxpZGF0aW9uXG4gICAgICBpZiAoIWVtYWlsIHx8ICFwYXNzd29yZCkge1xuICAgICAgICBzaG93RXJyb3IoXCJWZXVpbGxleiByZW1wbGlyIHRvdXMgbGVzIGNoYW1wcy5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gU2hvdyBsb2FkaW5nIHN0YXRlXG4gICAgICBzaG93TG9hZGluZyhcImxvZ2luQnRuXCIsIFwibG9naW5TcGlubmVyXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBDYWxsIGxvZ2luIGZ1bmN0aW9uXG4gICAgICAgIGF3YWl0IGxvZ2luKGVtYWlsLCBwYXNzd29yZCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiTG9naW4gZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgc2hvd0Vycm9yKFxuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgXCJMYSBjb25uZXhpb24gYSDDqWNob3XDqS4gVsOpcmlmaWV6IHZvcyBpZGVudGlmaWFudHMuXCJcbiAgICAgICAgKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIC8vIFJlc2V0IGJ1dHRvbiBzdGF0ZVxuICAgICAgICBoaWRlTG9hZGluZyhcImxvZ2luQnRuXCIsIFwibG9naW5TcGlubmVyXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogTG9ncyBpbiBhIHVzZXIgd2l0aCBlbWFpbCBhbmQgcGFzc3dvcmRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbCAtIFVzZXIncyBlbWFpbFxuICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIC0gVXNlcidzIHBhc3N3b3JkXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gLSBQcm9taXNlIHJlc29sdmVkIHdpdGggdGhlIHVzZXIgZGF0YSBvbiBzdWNjZXNzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbihlbWFpbCwgcGFzc3dvcmQpIHtcbiAgdHJ5IHtcbiAgICAvLyBDcmVhdGUgcmVxdWVzdCBkYXRhXG4gICAgY29uc3QgcmVxdWVzdERhdGEgPSB7XG4gICAgICBlbWFpbDogZW1haWwsXG4gICAgICBwYXNzd29yZDogcGFzc3dvcmQsXG4gICAgfTtcblxuICAgIC8vIENhbGwgRmlyZWJhc2UgZnVuY3Rpb25cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKEFQSV9VUkxTLkhBTkRMRV9MT0dJTiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdERhdGEpLFxuICAgIH0pO1xuXG4gICAgLy8gUGFyc2UgcmVzcG9uc2VcbiAgICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAvLyBDaGVjayBmb3IgZXJyb3IgaW4gcmVzcG9uc2VcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBpZiAocmVzcG9uc2VEYXRhLmVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZURhdGEuZXJyb3IpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJldXIgc2VydmV1cjogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgLy8gU3RvcmUgdXNlciBkYXRhIGFuZCBzZXNzaW9uIHRva2Vuc1xuICAgIGlmIChcbiAgICAgIHJlc3BvbnNlRGF0YS5zZXNzaW9uICYmXG4gICAgICByZXNwb25zZURhdGEuc2Vzc2lvbi5hY2Nlc3NfdG9rZW4gJiZcbiAgICAgIHJlc3BvbnNlRGF0YS5zZXNzaW9uLnJlZnJlc2hfdG9rZW5cbiAgICApIHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIltsb2dpbi5qc10gQXR0ZW1wdGluZyB0byBzZXQgU3VwYWJhc2Ugc2Vzc2lvbiB3aXRoIHRva2VuczpcIixcbiAgICAgICAgcmVzcG9uc2VEYXRhLnNlc3Npb25cbiAgICAgICk7XG4gICAgICBjb25zdCB7IGVycm9yOiBzZXNzaW9uRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguc2V0U2Vzc2lvbih7XG4gICAgICAgIGFjY2Vzc190b2tlbjogcmVzcG9uc2VEYXRhLnNlc3Npb24uYWNjZXNzX3Rva2VuLFxuICAgICAgICByZWZyZXNoX3Rva2VuOiByZXNwb25zZURhdGEuc2Vzc2lvbi5yZWZyZXNoX3Rva2VuLFxuICAgICAgfSk7XG4gICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJbbG9naW4uanNdIEVycm9yIHNldHRpbmcgU3VwYWJhc2Ugc2Vzc2lvbjpcIixcbiAgICAgICAgICBzZXNzaW9uRXJyb3JcbiAgICAgICAgKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGEgc2Vzc2lvbiB1dGlsaXNhdGV1ciBuJ2EgcGFzIHB1IMOqdHJlIGluaXRpYWxpc8OpZS5cIik7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhcIltsb2dpbi5qc10gU3VwYWJhc2Ugc2Vzc2lvbiBzZXQgc3VjY2Vzc2Z1bGx5LlwiKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlRGF0YS51c2VyICYmICFyZXNwb25zZURhdGEuc2Vzc2lvbikge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkxvZ2luIHJlc3BvbnNlIGNvbnRhaW5lZCB1c2VyIGRhdGEgYnV0IG5vIHNlc3Npb24uIFVzZXIgd2lsbCBub3QgYmUgbG9nZ2VkIGluIG9uIGNsaWVudC1zaWRlIFN1cGFiYXNlLlwiXG4gICAgICApO1xuICAgICAgc2V0Q3VycmVudFVzZXIocmVzcG9uc2VEYXRhLnVzZXIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRG9ubsOpZXMgZGUgc2Vzc2lvbiBtYW5xdWFudGVzIGFwcsOocyBsYSBjb25uZXhpb24uXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBcIkxvZ2luIGVycm9yOiBNaXNzaW5nIHNlc3Npb24gZGF0YSBmcm9tIGJhY2tlbmQgcmVzcG9uc2VcIixcbiAgICAgICAgcmVzcG9uc2VEYXRhXG4gICAgICApO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRG9ubsOpZXMgZGUgc2Vzc2lvbiBtYW5xdWFudGVzIGFwcsOocyBsYSBjb25uZXhpb24uXCIpO1xuICAgIH1cblxuICAgIC8vIFNob3cgc3VjY2VzcyBtZXNzYWdlIGJlZm9yZSByZWRpcmVjdFxuICAgIHNob3dTdGF0dXMoXCJDb25uZXhpb24gcsOpdXNzaWUhIFJlZGlyZWN0aW9uLi4uXCIsIFwic3VjY2Vzc1wiKTtcblxuICAgIC8vIFJlZGlyZWN0IHRvIGhvbWUgcGFnZSBhZnRlciBhIHNob3J0IGRlbGF5XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2luZGV4XCI7XG4gICAgfSwgMTAwMCk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2VEYXRhLnVzZXI7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gTG9nIGFuZCByZS10aHJvdyB0aGUgZXJyb3IgdG8gYmUgaGFuZGxlZCBieSB0aGUgY2FsbGVyXG4gICAgY29uc29sZS5lcnJvcihcIkxvZ2luIGVycm9yOlwiLCBlcnJvcik7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cbiIsIi8qKlxuICogU3VwYWJhc2UgQ2xpZW50XG4gKiBAbW9kdWxlIHN1cGFiYXNlLWNsaWVudFxuICogQGRlc2NyaXB0aW9uIFRoaXMgbW9kdWxlIGhhbmRsZXMgdGhlIFN1cGFiYXNlIGNsaWVudCBpbml0aWFsaXphdGlvbiBhbmQgY29uZmlndXJhdGlvbi5cbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBAYXV0aG9yIEdyZXlQYW5kYVxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjEgKDIwMjUtMDUtMDkpOiBJbml0aWFsIHZlcnNpb24gd2l0aCBiYXNpYyBTdXBhYmFzZSBjbGllbnQgaW5pdGlhbGl6YXRpb24uXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiO1xuXG5jb25zdCBzdXBhYmFzZVVybCA9IFwiaHR0cHM6Ly9vZmV5c3NpcGlia3RtYmZlYmliby5zdXBhYmFzZS5jb1wiO1xuY29uc3Qgc3VwYWJhc2VBbm9uS2V5ID1cbiAgXCJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcGMzTWlPaUp6ZFhCaFltRnpaU0lzSW5KbFppSTZJbTltWlhsemMybHdhV0pyZEcxaVptVmlhV0p2SWl3aWNtOXNaU0k2SW1GdWIyNGlMQ0pwWVhRaU9qRTNORE01TWpVd09UUXNJbVY0Y0NJNk1qQTFPVFV3TVRBNU5IMC53NzFDQUtmb2xrdHpSbC1UbUxWaEhZYUViaENmVms0QTdZcmFFVUNnbHJVXCI7XG5cbmNvbnNvbGUubG9nKFwiW3N1cGFiYXNlLWNsaWVudC5qc10gSW5pdGlhbGl6aW5nIFN1cGFiYXNlIGNsaWVudC4uLlwiKTtcbmNvbnN0IGNsaWVudCA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VBbm9uS2V5KTtcbmNvbnNvbGUubG9nKFwiW3N1cGFiYXNlLWNsaWVudC5qc10gU3VwYWJhc2UgY2xpZW50IGluc3RhbmNlIGNyZWF0ZWQ6XCIsIGNsaWVudCk7XG5pZiAoY2xpZW50ICYmIGNsaWVudC5hdXRoKSB7XG4gIGNvbnNvbGUubG9nKFwiW3N1cGFiYXNlLWNsaWVudC5qc10gY2xpZW50LmF1dGggb2JqZWN0OlwiLCBjbGllbnQuYXV0aCk7XG4gIGNvbnNvbGUubG9nKFxuICAgIFwiW3N1cGFiYXNlLWNsaWVudC5qc10gdHlwZW9mIGNsaWVudC5hdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZDpcIixcbiAgICB0eXBlb2YgY2xpZW50LmF1dGgub25BdXRoU3RhdGVDaGFuZ2VkXG4gICk7XG59IGVsc2Uge1xuICBjb25zb2xlLmVycm9yKFxuICAgIFwiW3N1cGFiYXNlLWNsaWVudC5qc10gU3VwYWJhc2UgY2xpZW50IG9yIGNsaWVudC5hdXRoIGlzIG5vdCBpbml0aWFsaXplZCBjb3JyZWN0bHkhXCJcbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY2xpZW50O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwianMvXCIgKyBjaHVua0lkICsgXCIuYnVuZGxlLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcInVyYmFuZG9jc193ZWJhcHA6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoL15ibG9iOi8sIFwiXCIpLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybCArIFwiLi4vXCI7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibG9naW5cIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt1cmJhbmRvY3Nfd2ViYXBwXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3VyYmFuZG9jc193ZWJhcHBcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIi8vIHNyYy9lbnRyaWVzL3NpZ251cC5qc1xuLyoqXG4gKiBMb2dpbiBFbnRyeSBQb2ludFxuICpcbiAqIFRoaXMgbW9kdWxlIHNlcnZlcyBhcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBsb2dpbiBwYWdlLlxuICovXG5cbi8vIEltcG9ydCBvdXIgbG9naW4gbW9kdWxlXG5pbXBvcnQgeyBpbml0TG9naW5QYWdlIH0gZnJvbSBcIi4uL2F1dGgvbG9naW4uanNcIjtcblxuLy8gSW5pdGlhbGl6ZSBsb2dpbiBwYWdlIHdoZW4gRE9NIGlzIGxvYWRlZFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAvLyBJbml0aWFsaXplIGxvZ2luIHBhZ2VcbiAgaW5pdExvZ2luUGFnZSgpO1xuXG4gIGNvbnNvbGUubG9nKFwiTG9naW4gcGFnZSBpbml0aWFsaXplZFwiKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9