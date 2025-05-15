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
/* unused harmony exports setCurrentUser, validateSession, getCurrentUser, getCurrentUserSync, logout, isLoggedIn, isLoggedInSync, protectPage, initAuth, hideElement, showElement */
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../supabase-client.js */ "./src/js/supabase-client.js");
// src/auth/auth.js
/**
 * Authentication Module - Base
 * @module auth
 * @description Base module for authentication with common functions and configuration
 * @version 0.0.5
 *
 * @changelog
 * - 0.0.5 (2025-05-15): Added session validation and protection against stale sessions.
 * - 0.0.4 (2025-05-15): Removal of Firebase Cloud Functions constants.
 * - 0.0.3 (2025-05-13): Modified the authentication state management to use Supabase Auth system.
 * - 0.0.2 (2025-05-13): Reorganization into separate modules
 * - 0.0.1 (2025-05-03): Initial creation
 */



// Global authentication state
let currentUser = null;
let sessionValidated = false;

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
 * Validates if the current session is active with Supabase
 * @returns {Promise<boolean>} True if session is valid, false otherwise
 */
async function validateSession() {
  try {
    // Get current session from Supabase
    const {
      data: { session },
      error: sessionError,
    } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.getSession();

    // No session or error retrieving session
    if (sessionError || !session) {
      console.log("No valid session found");
      setCurrentUser(null);
      sessionValidated = false;
      return false;
    }

    // Try to refresh the token to validate it with the server
    const { error: refreshError } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.refreshSession();

    if (refreshError) {
      console.warn("Session validation failed:", refreshError);
      // Force clear the invalid session
      await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.signOut();
      setCurrentUser(null);
      sessionValidated = false;
      return false;
    }

    // Session is valid, update the current user
    setCurrentUser(session.user);
    sessionValidated = true;
    return true;
  } catch (e) {
    console.error("Session validation error:", e);
    setCurrentUser(null);
    sessionValidated = false;
    return false;
  }
}

/**
 * Retrieves the current user
 * @param {boolean} validate - Whether to validate the session with Supabase
 * @returns {Promise<Object|null>} The current user or null
 */
async function getCurrentUser(validate = true) {
  // If we need to validate and haven't done so yet
  if (validate && !sessionValidated) {
    await validateSession();
  }

  // If no validation needed or already validated
  if (!validate && !currentUser) {
    // Try to retrieve from storage if not in memory
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
 * Synchronous version of getCurrentUser for non-async contexts
 * WARNING: This may return stale data if session is invalid
 * @returns {Object|null} The current user or null
 */
function getCurrentUserSync() {
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
 * @returns {Promise<void>}
 */
async function logout() {
  try {
    // Sign out from Supabase
    await _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.signOut();

    // Clear local state
    currentUser = null;
    sessionValidated = false;
    localStorage.removeItem("currentUser");

    // Redirect to the home page after logout
    window.location.href = "/";
  } catch (error) {
    console.error("Error during logout:", error);
    // Still clear local state even if Supabase signOut fails
    currentUser = null;
    sessionValidated = false;
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }
}

/**
 * Checks if the user is logged in with valid session
 * @param {boolean} validate - Whether to validate with Supabase first
 * @returns {Promise<boolean>} True if the user is logged in with valid session
 */
async function isLoggedIn(validate = true) {
  const user = await getCurrentUser(validate);
  return user !== null;
}

/**
 * Synchronous version of isLoggedIn
 * WARNING: This may return incorrect results if session is invalid
 * @returns {boolean} True if user appears to be logged in locally
 */
function isLoggedInSync() {
  return getCurrentUserSync() !== null;
}

/**
 * Protects a page that requires authentication
 * @param {string} redirectUrl - URL to redirect if not authenticated
 * @returns {Promise<boolean>} True if authenticated, false otherwise
 */
async function protectPage(redirectUrl = "/login") {
  const isValid = await validateSession();

  if (!isValid) {
    // Redirect to login page
    window.location.href = redirectUrl;
    return false;
  }

  return true;
}

/**
 * Initializes auth on page load
 * Call this at the beginning of your app initialization
 */
async function initAuth() {
  // Validate session on page load
  await validateSession();

  // Set up auth state change listener
  _supabase_client_js__WEBPACK_IMPORTED_MODULE_0__.supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("Auth state changed:", event);

    if (event === "SIGNED_IN" && session) {
      setCurrentUser(session.user);
      sessionValidated = true;
    } else if (event === "SIGNED_OUT") {
      setCurrentUser(null);
      sessionValidated = false;
    } else if (event === "TOKEN_REFRESHED") {
      setCurrentUser(session.user);
      sessionValidated = true;
    } else if (event === "USER_UPDATED") {
      setCurrentUser(session.user);
      sessionValidated = true;
    }
  });
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
  getCurrentUser,
  getCurrentUserSync,
  setCurrentUser,
  logout,
  isLoggedIn,
  isLoggedInSync,
  validateSession,
  protectPage,
  initAuth,
  showError,
  showStatus,
  hideElement,
  showElement,
  showLoading,
  hideLoading,
});


/***/ }),

/***/ "./src/js/auth/signup.js":
/*!*******************************!*\
  !*** ./src/js/auth/signup.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initSignupPage: () => (/* binding */ initSignupPage)
/* harmony export */ });
/* unused harmony export signup */
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth/auth.js");
/* harmony import */ var _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../supabase-client.js */ "./src/js/supabase-client.js");
// src/auth/signup.js
/**
 * Signup Module
 * @module signup
 * @description Handles user registration with client-side validation using Supabase
 * @version 0.1.0
 *
 * @changelog
 * - 0.1.0 (2025-05-15): Migrated to Supabase client-side auth
 * - 0.0.3 (2025-05-13): Ensure status message is also hidden on new submit.
 * - 0.0.2 (2025-05-10): Added robust client-side email format and password complexity validation.
 * - 0.0.1 (2025-05-08): Created the signup module with basic functionality.
 */




/**
 * Initializes the signup page
 */
function initSignupPage() {
  const signupForm = document.getElementById("signupForm");
  const errorMessageDiv = document.getElementById("errorMessage");
  const statusMessage = document.getElementById("statusMessage");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Reset messages
      if (errorMessageDiv) {
        errorMessageDiv.classList.add("hidden");
        errorMessageDiv.innerHTML = "";
      }
      if (statusMessage) {
        statusMessage.classList.add("hidden");
        statusMessage.textContent = "";
      }

      // Get form values
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      let validationErrors = [];

      // --- Client-side Validation ---
      // 1. Email Format Validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        validationErrors.push("L'adresse email n'est pas valide.");
      }

      // 2. Check if passwords match
      if (password !== confirmPassword) {
        validationErrors.push("Les mots de passe ne correspondent pas.");
      }

      // 3. Password Strength Validation
      const passwordComplexityPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordComplexityPattern.test(password) || password.length < 8) {
        validationErrors.push("Le format du mot de passe est invalide.");
      }

      // --- Handle Validation Results ---
      if (validationErrors.length > 0) {
        const errorText = validationErrors.join("<br>");
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(errorText);
        return;
      }

      // Show loading state
      (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showLoading)("signupBtn", "signupSpinner");

      try {
        // Call signup function
        await signup(email, password);
      } catch (error) {
        console.error("Signup error:", error);
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showError)(
          error.message || "Une erreur est survenue lors de l'inscription."
        );
      } finally {
        // Reset button state
        (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.hideLoading)("signupBtn", "signupSpinner");
      }
    });
  } else {
    console.error(
      "CRITICAL: Signup form with ID 'signupForm' not found. Event listener not attached."
    );
  }
}

/**
 * Registers a user with email and password using Supabase
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise resolved on success
 */
async function signup(email, password) {
  try {
    // Call Supabase signup
    const { data, error } = await _supabase_client_js__WEBPACK_IMPORTED_MODULE_1__.supabase.auth.signUp({
      email,
      password,
    });

    // Check for errors
    if (error) throw new Error(error.message);

    // Check if user was created (similar to checking identities length in Python code)
    if (!data.user || data.user.identities?.length === 0) {
      throw new Error(
        "Cette adresse mail a déjà été utilisée. Veuillez utiliser une autre adresse mail."
      );
    }

    // Success case
    (0,_auth_js__WEBPACK_IMPORTED_MODULE_0__.showStatus)(
      "Identifiants valides ! Veuillez vérifier votre email pour confirmer votre inscription.",
      "success"
    );

    // Optionally hide form or redirect on success
    document.getElementById("signupForm").style.display = "none";

    return data;
  } catch (error) {
    // Handle rate limiting similar to the Python code
    if (error.message.includes("only request this after")) {
      const waitTimeMatch = error.message.match(
        /only request this after (\d+) seconds/
      );
      if (waitTimeMatch) {
        const waitTime = waitTimeMatch[1];
        throw new Error(`Veuillez réessayer dans ${waitTime} secondes.`);
      }
    }

    console.error("Signup error:", error);
    throw error;
  }
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
  initSignupPage,
  signup,
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

const client = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);

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
/******/ 			"signup": 0
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
/*!**********************************!*\
  !*** ./src/js/entries/signup.js ***!
  \**********************************/
/* harmony import */ var _auth_signup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../auth/signup.js */ "./src/js/auth/signup.js");
// src/entries/signup.js
/**
 * Signup Entry Point
 *
 * This module serves as the entry point for the signup page.
 */

// Import our signup module


// Initialize signup page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize signup page
  (0,_auth_signup_js__WEBPACK_IMPORTED_MODULE_0__.initSignupPage)();

  console.log("Signup page initialized");
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvc2lnbnVwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE4QztBQUM5QyxxQkFBcUIsdURBQWM7QUFDbkMsc0VBQWUsWUFBWSxFQUFDO0FBQzVCOzs7Ozs7Ozs7Ozs7OztBQ0gwQztBQUMxQyxtQkFBbUIscURBQVk7QUFDL0IsaUVBQWUsVUFBVSxFQUFDO0FBQzFCOzs7Ozs7Ozs7Ozs7Ozs7O0FDSEEsY0FBYyxTQUFJLElBQUksU0FBSTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxjQUFjO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDc0c7QUFDekQ7QUFDRjtBQUM1QjtBQUNmLGtCQUFrQixzQkFBc0IsVUFBVTtBQUNsRDtBQUNBO0FBQ0EscUJBQXFCLDBEQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixvREFBUSx3QkFBd0IsU0FBUyxnQkFBZ0IsTUFBTTtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBLHlCQUF5QixvREFBUSx3QkFBd0IsU0FBUztBQUNsRSx3QkFBd0IsMkJBQTJCO0FBQ25EO0FBQ0E7QUFDQSx1QkFBdUIscURBQWE7QUFDcEMsYUFBYTtBQUNiO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCLFFBQVEsWUFBWTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixVQUFVO0FBQzlCLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9EQUFRLHdCQUF3QixTQUFTO0FBQ2xFO0FBQ0E7QUFDQSx1QkFBdUIsNkRBQXFCO0FBQzVDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQVEsd0JBQXdCLFNBQVM7QUFDbEU7QUFDQTtBQUNBLHVCQUF1QixxREFBYTtBQUNwQyxhQUFhO0FBQ2I7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUIsUUFBUSxZQUFZO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLG1DQUFtQyxvREFBUSx1QkFBdUIsU0FBUztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLHVCQUF1Qiw4REFBc0I7QUFDN0MsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZELHdEQUF3RDtBQUN4RCxrQ0FBa0MsSUFBSTtBQUN0QyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLHFCQUFxQixvQ0FBb0M7QUFDekQ7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUIsUUFBUSxXQUFXO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9EQUFRLHVCQUF1QixTQUFTLGVBQWUsSUFBSTtBQUNwRjtBQUNBLHVCQUF1QixxREFBYTtBQUNwQyxhQUFhO0FBQ2I7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUIsUUFBUSxZQUFZO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9EQUFRLHVCQUF1QixTQUFTLGVBQWUsSUFBSTtBQUNwRjtBQUNBO0FBQ0EsdUJBQXVCLHFEQUFhO0FBQ3BDLGFBQWE7QUFDYjtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFXO0FBQzNCLHlCQUF5QixRQUFRLFlBQVk7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG9EQUFRLDBCQUEwQixTQUFTLGVBQWUsR0FBRztBQUN0RjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsdUJBQXVCLHFEQUFhO0FBQ3BDLGFBQWE7QUFDYjtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFXO0FBQzNCLHlCQUF5QixRQUFRLFlBQVk7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGNBQWMsUUFBUSxvREFBUSx1QkFBdUIsU0FBUyxlQUFlLGNBQWM7QUFDL0c7QUFDQTtBQUNBLDZCQUE2QixRQUFRLFNBQVM7QUFDOUMsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9EQUFRLDBCQUEwQixTQUFTLGVBQWUsY0FBYyxXQUFXLFVBQVU7QUFDNUg7QUFDQSxhQUFhO0FBQ2IscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4UThDO0FBQ3NIO0FBQzRLO0FBQy9OO0FBQ3NJO0FBQ2xLO0FBQ2hDO0FBQ2I7QUFDNkI7QUFDaEI7QUFDckQsa0VBQWtCLElBQUk7QUFDdEI7QUFDQSxTQUFTLHNEQUFVO0FBQ25CLGdCQUFnQix1REFBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxhQUFhLDJEQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHVEQUFTO0FBQzVDO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsdURBQWM7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUIsMERBQVk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsdURBQVM7QUFDMUIsd0JBQXdCLHFEQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrRUFBb0I7QUFDeEMsbUNBQW1DLG1FQUFtQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsNkVBQXlCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNkVBQXlCO0FBQ3BEO0FBQ0EsWUFBWSx1REFBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0ZBQStGO0FBQy9GLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLGlCQUFpQixHQUFHLGlEQUFPLENBQUMsSUFBSSx5QkFBeUI7QUFDakc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG9FQUFzQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1REFBUztBQUN6Qix3QkFBd0IsY0FBYztBQUN0QztBQUNBO0FBQ0Esd0JBQXdCLDZFQUFnQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0Esd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFXO0FBQzNCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EsMkJBQTJCLHlEQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsb0RBQVEsd0JBQXdCLFNBQVM7QUFDdkU7QUFDQTtBQUNBLHNNQUFzTTtBQUN0TSw0Q0FBNEMsMEpBQTBKO0FBQ3RNLGlCQUFpQjtBQUNqQix1QkFBdUIsd0RBQWdCO0FBQ3ZDLGFBQWE7QUFDYixvQkFBb0IsY0FBYztBQUNsQztBQUNBLHlCQUF5QixRQUFRLDJCQUEyQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRLGVBQWU7QUFDNUM7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUIsUUFBUSwyQkFBMkI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkJBQTJCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLHVFQUF5QjtBQUMxRjtBQUNBLDRCQUE0QixvREFBUSx3QkFBd0IsU0FBUztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUlBQXVJO0FBQ3ZJLGdEQUFnRCx1RkFBdUY7QUFDdkk7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQiwyQkFBMkIsd0RBQWdCO0FBQzNDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esd0JBQXdCLDJCQUEyQjtBQUNuRCw0QkFBNEIsb0RBQVEsd0JBQXdCLFNBQVM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1SUFBdUk7QUFDdkk7QUFDQSxnREFBZ0QsdUZBQXVGO0FBQ3ZJLHFCQUFxQjtBQUNyQiwyQkFBMkIsd0RBQWdCO0FBQzNDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsMEJBQTBCLG9FQUEyQjtBQUNyRDtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0EseUJBQXlCLFFBQVEsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVEsZUFBZTtBQUM1QztBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFXO0FBQzNCLHlCQUF5QixRQUFRLDJCQUEyQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwyQkFBMkI7QUFDbkQsNEJBQTRCLG9EQUFRLHdCQUF3QixTQUFTO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHVGQUF1RjtBQUN2SSxxQkFBcUI7QUFDckIsMkJBQTJCLGdFQUF3QjtBQUNuRCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLHdCQUF3QiwyQkFBMkI7QUFDbkQsNEJBQTRCLG9EQUFRLHdCQUF3QixTQUFTO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHVGQUF1RjtBQUN2SSxxQkFBcUI7QUFDckIsMkJBQTJCLGdFQUF3QjtBQUNuRCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLDBCQUEwQixvRUFBMkI7QUFDckQ7QUFDQSxvQkFBb0IsY0FBYztBQUNsQztBQUNBLHlCQUF5QixRQUFRLDJCQUEyQjtBQUM1RDtBQUNBO0FBQ0EseUJBQXlCLFFBQVEsMkJBQTJCLGFBQWEsc0VBQTZCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyx3Q0FBd0MsMEJBQTBCLG1DQUFtQztBQUMzSTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUIsUUFBUSwyQkFBMkI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGtDQUFrQywwREFBWSxrQkFBa0IsZ0JBQWdCO0FBQ2hGO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYyxRQUFRLG9EQUFRLHdCQUF3QixTQUFTO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLHVCQUF1Qix3REFBZ0I7QUFDdkMsYUFBYTtBQUNiLGtCQUFrQiw2REFBZSxrQkFBa0IsZ0JBQWdCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsK0NBQStDO0FBQzNFLCtCQUErQixzRUFBNkI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9DQUFvQyxXQUFXLHNGQUFzRjtBQUMxSjtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFXO0FBQzNCLHlCQUF5QixRQUFRLCtDQUErQztBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnREFBZ0Q7QUFDcEUsOEJBQThCLG9EQUFRLHdCQUF3QixTQUFTO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx1RkFBdUY7QUFDbkksaUJBQWlCO0FBQ2pCLHVCQUF1Qix3REFBZ0I7QUFDdkMsYUFBYTtBQUNiLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0EseUJBQXlCLFFBQVEsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwyQkFBMkI7QUFDdkQsK0JBQStCLHNFQUE2QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUIsUUFBUSwyQkFBMkI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSx1RUFBeUI7QUFDMUY7QUFDQSx3QkFBd0IsUUFBUSxRQUFRLG9EQUFRLHdCQUF3QixTQUFTO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLHVJQUF1STtBQUN2STtBQUNBLGdEQUFnRCx1RkFBdUY7QUFDdkk7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGlCQUFpQjtBQUNqQix5QkFBeUIsUUFBUSwyQkFBMkI7QUFDNUQ7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekMsd0JBQXdCLGNBQWMsUUFBUSxvREFBUSx3QkFBd0IsU0FBUztBQUN2RjtBQUNBO0FBQ0E7QUFDQSx1SUFBdUk7QUFDdkk7QUFDQSxnREFBZ0QsdUZBQXVGO0FBQ3ZJO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQix5QkFBeUIsUUFBUSxtR0FBbUc7QUFDcEk7QUFDQSxzQkFBc0Isb0VBQTJCO0FBQ2pEO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCLFFBQVEsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGNBQWMsUUFBUSxvREFBUSx3QkFBd0IsU0FBUztBQUNuRjtBQUNBLG9EQUFvRCxhQUFhLHdCQUF3QiwrQkFBK0I7QUFDeEg7QUFDQSx1QkFBdUIsd0RBQWdCO0FBQ3ZDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUSxlQUFlO0FBQzVDO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCLFFBQVEsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELHVFQUF5QjtBQUN0RjtBQUNBLHlCQUF5QixvREFBUSx3QkFBd0IsU0FBUztBQUNsRSw4RkFBOEYsOEJBQThCLGlDQUFpQyxrQ0FBa0Msd0JBQXdCLFlBQVkseUlBQXlJO0FBQzVXLHdCQUF3Qix3QkFBd0I7QUFDaEQsZ0NBQWdDLHFHQUFxRztBQUNySTtBQUNBLHVCQUF1QixvREFBWTtBQUNuQyxhQUFhO0FBQ2I7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVEsU0FBUyx5QkFBeUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUF1QjtBQUNyRCx3QkFBd0IsUUFBUSxRQUFRLG9EQUFRLHVCQUF1QixTQUFTO0FBQ2hGO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIseUJBQXlCLFFBQVEsMkJBQTJCO0FBQzVELGFBQWE7QUFDYjtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFXO0FBQzNCLHlCQUF5QixRQUFRLDJCQUEyQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsU0FBUztBQUN6QztBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0Msd0JBQXdCLFFBQVEsUUFBUSxvREFBUTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCx1RkFBdUY7QUFDdkkscUJBQXFCO0FBQ3JCO0FBQ0EsaUJBQWlCO0FBQ2pCLHlCQUF5QixRQUFRLDJCQUEyQjtBQUM1RDtBQUNBO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQyx3QkFBd0IsY0FBYyxRQUFRLG9EQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHVGQUF1RjtBQUN2SSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLHlCQUF5QixRQUFRLG1HQUFtRztBQUNwSTtBQUNBLHNCQUFzQixvRUFBMkI7QUFDakQ7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUIsUUFBUSwyQkFBMkI7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsa0JBQWtCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSwyQ0FBMkMsZ0JBQWdCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG1CQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsMERBQVk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixRQUFRLGVBQWU7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsNERBQWdCO0FBQ2xGO0FBQ0EsMERBQTBELDBCQUEwQjtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hELHVFQUF1RTtBQUN2RTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EseUJBQXlCLFFBQVEseUJBQXlCO0FBQzFEO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBLHlCQUF5QixRQUFRLGVBQWU7QUFDaEQ7QUFDQSxxQkFBcUIsUUFBUSxTQUFTO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsb0RBQVEsdUJBQXVCLFNBQVM7QUFDckU7QUFDQTtBQUNBLDJCQUEyQixxREFBYTtBQUN4QyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGNBQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixRQUFRLFlBQVksYUFBYSxnRUFBdUI7QUFDckY7QUFDQSw2QkFBNkIsb0RBQVEsdUJBQXVCLFNBQVM7QUFDckU7QUFDQTtBQUNBLDJCQUEyQixxREFBYTtBQUN4QyxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0Isb0JBQW9CLHNFQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNkRBQWUsa0JBQWtCLGdCQUFnQjtBQUMzRTtBQUNBLHlCQUF5QixRQUFRLFlBQVk7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQSx3QkFBd0IseUNBQXlDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdFQUF1QjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsdUVBQXlCO0FBQzFGO0FBQ0Esd0JBQXdCLHlCQUF5QixRQUFRLG9EQUFRLHVCQUF1QixTQUFTO0FBQ2pHO0FBQ0E7QUFDQSx3REFBd0QsaUJBQWlCLDJFQUEyRTtBQUNwSjtBQUNBLDJCQUEyQixxREFBYTtBQUN4QyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixRQUFRLG9CQUFvQjtBQUNyRCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUIsUUFBUSxZQUFZO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGdFQUF1QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFVBQVUsRUFBRSx1REFBUztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1DQUFtQztBQUMzRDtBQUNBLDZCQUE2QixRQUFRLDJCQUEyQjtBQUNoRTtBQUNBO0FBQ0EsNkJBQTZCLFFBQVEsMkJBQTJCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGNBQWM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixRQUFRLDZCQUE2QjtBQUMxRDtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFXO0FBQzNCLHlCQUF5QixRQUFRLDJCQUEyQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixjQUFjO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixnRUFBdUI7QUFDckQ7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0EsNkJBQTZCLFFBQVEsMkJBQTJCO0FBQ2hFO0FBQ0E7QUFDQSw2QkFBNkIsUUFBUSwyQkFBMkI7QUFDaEU7QUFDQSx5QkFBeUIsUUFBUSw2QkFBNkI7QUFDOUQsYUFBYTtBQUNiO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCLFFBQVEsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix1REFBUztBQUMxQiwwQkFBMEIsdUVBQThCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVFQUE4QjtBQUN4RDtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsdUVBQThCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVFQUE4QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsdUVBQThCO0FBQzVELHdCQUF3QixjQUFjO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsUUFBUSwyQ0FBMkM7QUFDNUU7QUFDQSxvQkFBb0IsMkdBQTJHO0FBQy9IO0FBQ0EsMEJBQTBCLHVFQUE4QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHlFQUE2QjtBQUN6RSw4RkFBOEYsa0JBQWtCLGdDQUFnQyxVQUFVO0FBQzFKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsUUFBUSxvQ0FBb0M7QUFDakU7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUIsUUFBUSxtQ0FBbUM7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QywwREFBWSxrQkFBa0IsZ0JBQWdCO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGlCQUFpQjtBQUMvQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxxQkFBcUIsUUFBUSxJQUFJLGlCQUFpQjtBQUNsRDtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsMkRBQWM7QUFDeEM7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw2REFBZSxrQkFBa0IsZ0JBQWdCO0FBQ3ZFO0FBQ0EscUJBQXFCO0FBQ3JCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsa0RBQUk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxpQkFBaUIsUUFBUTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVEsU0FBUyxXQUFXO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsdUVBQXlCO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvREFBUSx3QkFBd0IsU0FBUztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxxQ0FBcUM7QUFDakYsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGdCQUFnQix3REFBVztBQUMzQix5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYztBQUNsQztBQUNBO0FBQ0EscUJBQXFCLFFBQVEsNkVBQTZFO0FBQzFHO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsY0FBYztBQUNsQztBQUNBLHdCQUF3QixjQUFjO0FBQ3RDO0FBQ0E7QUFDQSw2REFBNkQsU0FBUztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQiw2QkFBNkIsb0RBQVE7QUFDckM7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGdCQUFnQix1REFBUztBQUN6QjtBQUNBO0FBQ0EscUJBQXFCLFFBQVEsMkZBQTJGO0FBQ3hIO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCLFFBQVEsMkNBQTJDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsY0FBYztBQUN0QztBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsb0RBQVEsMEJBQTBCLFNBQVMsbUJBQW1CLHFCQUFxQjtBQUNoSDtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFXO0FBQzNCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsNkJBQTZCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHVEQUFTO0FBQ2xDO0FBQ0EsMEJBQTBCLG1EQUFLLGtDQUFrQztBQUNqRTtBQUNBO0FBQ0EsNkJBQTZCLG9EQUFRLHdCQUF3QixTQUFTO0FBQ3RFLDRCQUE0Qiw2QkFBNkI7QUFDekQ7QUFDQSwyQkFBMkIsd0RBQWdCO0FBQzNDLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLG9CQUFvQixzRUFBeUI7QUFDN0M7QUFDQSxtRUFBbUUseUVBQTZCO0FBQ2hHLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCLFFBQVEsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELFNBQVM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxZQUFZLHVEQUFTO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUSxlQUFlO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLDBEQUFZO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5SUFBeUksNERBQWdCO0FBQ3pKLGlEQUFpRCxpQ0FBaUMseUJBQXlCLDREQUFnQixDQUFDO0FBQzVIO0FBQ0E7QUFDQSw0QkFBNEIsUUFBUTtBQUNwQztBQUNBO0FBQ0EsNkJBQTZCLHNFQUF5QjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdFQUF1QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELDZCQUE2QjtBQUM3RTtBQUNBO0FBQ0EsMENBQTBDLGtEQUFRO0FBQ2xELG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixnRUFBdUI7QUFDakQ7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFXO0FBQzNCLGlDQUFpQztBQUNqQyxxQkFBcUIsc0VBQXlCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsTUFBTTtBQUMxRCxnRUFBZ0UsVUFBVTtBQUMxRTtBQUNBO0FBQ0Esb0RBQW9ELGdCQUFnQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGdDQUFnQyxtQkFBbUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYywwREFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZEQUFlO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1REFBUztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLHdCQUF3QjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXVFLHlFQUE2QjtBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSw4Q0FBOEMsdUJBQXVCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDRDQUE0QztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5QkFBeUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsUUFBUSxTQUFTLElBQUk7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtHQUFrRyx5RUFBNkI7QUFDL0gsK0ZBQStGLGdCQUFnQixzQkFBc0IseUVBQTZCLENBQUMsMkJBQTJCLHVFQUEyQixFQUFFO0FBQzNOLGtEQUFrRCx1RUFBMkI7QUFDN0U7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxtREFBbUQsK0RBQXVCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHVEQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELHFCQUFxQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDZCQUE2QjtBQUNwRTtBQUNBLDBDQUEwQyx1Q0FBdUM7QUFDakY7QUFDQTtBQUNBLHFDQUFxQyxtQ0FBbUM7QUFDeEU7QUFDQTtBQUNBLCtEQUErRCx1RUFBeUI7QUFDeEY7QUFDQSxtQ0FBbUMsa0NBQWtDO0FBQ3JFLDBDQUEwQyx3Q0FBd0M7QUFDbEYsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDRCQUE0QjtBQUM3RTtBQUNBLGtCQUFrQixJQUFJLEdBQUcsb0JBQW9CO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUNBQXlDO0FBQ2pFO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsNkJBQTZCLG9EQUFRLDBCQUEwQixTQUFTLFdBQVcsZ0JBQWdCO0FBQ25HO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUNBQXlDO0FBQ2pFO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EsNkNBQTZDLG9FQUFvRSxxQ0FBcUMsc0JBQXNCLElBQUksdUJBQXVCO0FBQ3ZNLHdCQUF3QixjQUFjLFFBQVEsb0RBQVEsd0JBQXdCLFNBQVM7QUFDdkY7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSw0REFBNEQsUUFBUSxrQkFBa0I7QUFDdEY7QUFDQSx5QkFBeUI7QUFDekIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHlDQUF5QztBQUNyRTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLDRCQUE0QixjQUFjLFFBQVEsb0RBQVEsd0JBQXdCLFNBQVMsV0FBVyxnQkFBZ0I7QUFDdEgsZ0NBQWdDLHFEQUFxRDtBQUNyRjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EsNERBQTRELDZEQUE2RDtBQUN6SDtBQUNBLDZCQUE2QjtBQUM3QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBLG9CQUFvQix3REFBVztBQUMvQiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHlDQUF5QztBQUNyRTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLGlDQUFpQyxvREFBUSx3QkFBd0IsU0FBUyxXQUFXLGdCQUFnQjtBQUNyRyxnQ0FBZ0MseUJBQXlCO0FBQ3pEO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvQkFBb0Isd0RBQVc7QUFDL0IsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDZDQUE2QztBQUM3RDtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVEsTUFBTSxzQkFBc0I7QUFDcEQ7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUSxTQUFTLHlCQUF5QjtBQUNsRTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsdUVBQXVFO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixVQUFVLEVBQUUsdURBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsUUFBUSx1REFBdUQ7QUFDeEYsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLGlDQUFpQyxVQUFVO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsb0RBQVE7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGNBQWMsUUFBUSxvREFBUSx1QkFBdUIsU0FBUztBQUM5RTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw0REFBbUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDREQUFtQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxVQUFVO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixjQUFjO0FBQ3RDO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQ0FBbUMsd0NBQXdDLElBQUksRUFBRSx1REFBUztBQUM5RztBQUNBLFlBQVkseURBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBEQUFZO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdGQUF3RixrRUFBa0IsSUFBSSxVQUFVLEdBQUcsV0FBVztBQUN0STtBQUNBLDBCQUEwQiw0REFBbUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isd0RBQVc7QUFDM0IseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JoRThDO0FBQ0o7QUFDQTtBQUNKO0FBQzRCO0FBQ3RDO0FBQ0M7QUFDOEU7QUFDM0c7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isb0JBQW9CO0FBQ3hDO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQSxvQkFBb0IseUJBQXlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSx5QkFBeUI7QUFDbEc7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCx5QkFBeUI7QUFDdkY7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELDhCQUE4QjtBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELHVCQUF1QjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1Asb0JBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsMEJBQTBCO0FBQ2hGO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnQkFBZ0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyUG9DO0FBQ3BDO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw4QkFBOEIsNkNBQU8sQ0FBQztBQUNoRTtBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDTyxzQ0FBc0MsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUU7QUFDekUseUJBQXlCO0FBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkhBLGNBQWMsU0FBSSxJQUFJLFNBQUk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsY0FBYztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29FO0FBQ21CO0FBQzZDO0FBQ3BJO0FBQ0E7QUFDTztBQUNQO0FBQ0EsU0FBUyxnRUFBc0I7QUFDL0Isa0JBQWtCLDREQUF1QjtBQUN6QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNERBQXVCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixxREFBZ0I7QUFDbEM7QUFDQTtBQUNBLCtCQUErQixpRUFBdUI7QUFDdEQ7QUFDQSx3Q0FBd0Msb0RBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwwREFBcUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDBEQUFxQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDREQUF1QjtBQUN6QztBQUNBLGNBQWMsaURBQVk7QUFDMUI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsa0NBQWtDLGdCQUFnQjtBQUN2RjtBQUNBLHlDQUF5QztBQUN6QztBQUNPO0FBQ1A7QUFDQSxvQ0FBb0M7QUFDcEMsaUJBQWlCLCtEQUF1QjtBQUN4QyxnQkFBZ0IsK0RBQXVCLElBQUksb0RBQVk7QUFDdkQ7QUFDQTtBQUNBLDZDQUE2QyxZQUFZO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNULHlKQUF5SixzQkFBc0I7QUFDL0s7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw0REFBdUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EsaUNBQWlDLG1EQUFTO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUSxlQUFlO0FBQ3BDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLGFBQWEsUUFBUSxNQUFNO0FBQzNCO0FBQ087QUFDUCxhQUFhO0FBQ2I7QUFDTztBQUNQLFlBQVksdUVBQXVFO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZMdUU7QUFDeEI7QUFDMEI7QUFDbEU7QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjLEVBQUUsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0tBQThCLFNBQVMsZ0JBQWdCO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0Esa0JBQWtCLHdEQUFtQjtBQUNyQztBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QyxhQUFhLHVEQUFlO0FBQzVCLHNCQUFzQix3REFBbUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsK0RBQW1CO0FBQzlDLDRCQUE0QiwrREFBbUI7QUFDL0MsbUJBQW1CLGlFQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msb0JBQW9CO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG9CQUFvQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsV0FBVztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLEVBQUU7QUFDOUI7QUFDUCw0Q0FBNEMsK0RBQXVCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLFdBQVc7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvUmlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxhQUFhLDhEQUFvQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxhQUFhLDhEQUFvQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxhQUFhLDhEQUFvQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLDZDQUE2QztBQUNwRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOERBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkseUJBQXlCO0FBQ3JDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUhBQWlILEtBQUs7QUFDdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNCQUFzQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0dBQWtHLEtBQUs7QUFDdkcsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsTEE7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN6QlU7QUFDVjs7Ozs7Ozs7Ozs7OztBQ0RPO0FBQ1A7Ozs7Ozs7Ozs7Ozs7OztBQ0RBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUN3QztBQUNnRTtBQUNqRztBQUNQLHVCQUF1QixZQUFZLHdCQUF3QixrREFBYyxRQUFRLElBQUk7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFEQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxNQUFNO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0NBQXNDO0FBQzlEO0FBQ0Esc0JBQXNCLFNBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxTQUFTLEdBQUcsYUFBYTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXlFO0FBQ3pFO0FBQ0EsaUJBQWlCO0FBQ2pCLDhCQUE4Qix1REFBbUI7QUFDakQsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSw4QkFBOEIsdURBQW1CO0FBQ2pEO0FBQ0E7QUFDQSw4QkFBOEIsc0RBQWtCO0FBQ2hEO0FBQ0EsdUlBQXVJO0FBQ3ZJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqSE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGtLQUE4QixTQUFTLGdCQUFnQjtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0NBQXdDO0FBQ3pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2Qyx5Q0FBeUM7QUFDekMsZUFBZSxxQkFBTSxvQkFBb0IsT0FBTyxxQkFBTTtBQUN0RDtBQUNBOztBQUVBOztBQUVPOztBQUVQLGlFQUFlLHFDQUFxQyxFQUFDOztBQUU5QztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDckJNO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7QUFDQSxxQ0FBcUMsbUJBQU8sQ0FBQyw0RUFBc0I7QUFDbkUseUNBQXlDLG1CQUFPLENBQUMsMEZBQWtCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGFBQWE7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsNkhBQTZILElBQUksMkVBQTJFO0FBQ2hQLG9DQUFvQyxvSEFBb0g7QUFDeEo7QUFDQSxpQ0FBaUMsbUhBQW1IO0FBQ3BKLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsY0FBYztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsYUFBYTtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixzQkFBc0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixZQUFZLGNBQWMsSUFBSSxjQUFjO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7QUFDZjs7Ozs7Ozs7OztBQzVOYTtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGdEQUFnRCxtQkFBTyxDQUFDLHdHQUF5QjtBQUNqRixpREFBaUQsbUJBQU8sQ0FBQywwR0FBMEI7QUFDbkYsb0JBQW9CLG1CQUFPLENBQUMsZ0ZBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFlBQVksbUJBQW1CLElBQUk7QUFDMUQ7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVMsR0FBRyxTQUFTO0FBQ3BEO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLElBQUksb0NBQW9DLElBQUk7QUFDakU7QUFDQSwrQkFBK0IsU0FBUyxPQUFPLEdBQUc7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxFQUFFLGlCQUFpQixPQUFPLE1BQU07QUFDeEc7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0EseUNBQXlDLE1BQU07QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxrQkFBZTtBQUNmOzs7Ozs7Ozs7O0FDekhhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlO0FBQ2Y7Ozs7Ozs7Ozs7QUNqQmE7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvREFBb0QsbUJBQU8sQ0FBQyxnSEFBNkI7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsTUFBTTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsTUFBTTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsTUFBTTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsUUFBUTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsRUFBRSxvQkFBb0I7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELEVBQUUsb0JBQW9CO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxRQUFRO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxFQUFFLG9CQUFvQjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsRUFBRSxvQkFBb0I7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE1BQU07QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixFQUFFO0FBQzdCO0FBQ0EsMEJBQTBCLEVBQUU7QUFDNUIsU0FBUztBQUNUO0FBQ0Esb0RBQW9ELGNBQWM7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsTUFBTTtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsRUFBRSxpQkFBaUI7QUFDekU7QUFDQTtBQUNBO0FBQ0EsdURBQXVELHNCQUFzQjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxNQUFNO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxFQUFFLGlCQUFpQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsc0JBQXNCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELE1BQU07QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsTUFBTTtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELE1BQU07QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxNQUFNO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxNQUFNO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxFQUFFLGlCQUFpQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxlQUFlLElBQUk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsT0FBTztBQUNsRSxnREFBZ0QsU0FBUyxLQUFLLFdBQVcsR0FBRyxNQUFNO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsTUFBTTtBQUM3RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsU0FBUyxHQUFHLE1BQU07QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnREFBZ0QsSUFBSTtBQUN0RSx5Q0FBeUMsZ0JBQWdCO0FBQ3pELDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVMsR0FBRyxNQUFNO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLGtCQUFlO0FBQ2Y7Ozs7Ozs7Ozs7QUM1WGE7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpREFBaUQsbUJBQU8sQ0FBQywwR0FBMEI7QUFDbkY7QUFDQSx1QkFBdUIsWUFBWSxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1QkFBdUIsSUFBSTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsTUFBTTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwrQkFBK0IsSUFBSTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsTUFBTTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGLE9BQU87QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUVBQXFFLElBQUk7QUFDOUY7QUFDQSw4Q0FBOEMsc0NBQXNDO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxNQUFNO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0YsT0FBTztBQUN2RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVMsSUFBSTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsTUFBTTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTLElBQUk7QUFDMUI7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLE1BQU07QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxrQkFBZTtBQUNmOzs7Ozs7Ozs7O0FDOVFhO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMkNBQTJDLG1CQUFPLENBQUMsOEZBQW9CO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw4RUFBOEUsSUFBSTtBQUN0Ryx5Q0FBeUMsZ0JBQWdCO0FBQ3pEO0FBQ0EsMENBQTBDLG1CQUFtQixjQUFjLFFBQVEsRUFBRSxPQUFPLEdBQUcsMkJBQTJCLEVBQUUsMEVBQTBFO0FBQ3RNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnREFBZ0QsSUFBSTtBQUN2RSwwRUFBMEUsZ0JBQWdCO0FBQzFGLDBDQUEwQyxNQUFNO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsZ0RBQWdELElBQUk7QUFDMUUsaUZBQWlGLGdCQUFnQjtBQUNqRywrRUFBK0UsZ0JBQWdCO0FBQy9GLGdEQUFnRCxLQUFLO0FBQ3JEO0FBQ0EsK0NBQStDLGNBQWM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxxR0FBcUcsSUFBSTtBQUN2SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsU0FBUyxPQUFPLGFBQWEsR0FBRyxVQUFVLFNBQVM7QUFDbEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGNBQWM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlO0FBQ2Y7Ozs7Ozs7Ozs7QUM3TmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsdUJBQXVCO0FBQ3ZCLGtCQUFrQixtQkFBTyxDQUFDLDRFQUFXO0FBQ3JDLHVCQUF1QixLQUFLLGlDQUFpQyxrQkFBa0I7QUFDL0U7Ozs7Ozs7Ozs7QUNMYTtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHNCQUFzQixHQUFHLHdCQUF3QixHQUFHLGlDQUFpQyxHQUFHLDhCQUE4QixHQUFHLDZCQUE2QixHQUFHLHVCQUF1QjtBQUNoTDtBQUNBLDBDQUEwQyxtQkFBTyxDQUFDLDRGQUFtQjtBQUNyRSx1QkFBdUI7QUFDdkIsZ0RBQWdELG1CQUFPLENBQUMsd0dBQXlCO0FBQ2pGLDZCQUE2QjtBQUM3QixpREFBaUQsbUJBQU8sQ0FBQywwR0FBMEI7QUFDbkYsOEJBQThCO0FBQzlCLG9EQUFvRCxtQkFBTyxDQUFDLGdIQUE2QjtBQUN6RixpQ0FBaUM7QUFDakMsMkNBQTJDLG1CQUFPLENBQUMsOEZBQW9CO0FBQ3ZFLHdCQUF3QjtBQUN4Qix5Q0FBeUMsbUJBQU8sQ0FBQywwRkFBa0I7QUFDbkUsc0JBQXNCO0FBQ3RCLGtCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzNCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2YsZUFBZTtBQUNmOzs7Ozs7Ozs7Ozs7Ozs7QUNKbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLEVBQUUsMENBQUs7O0FBU1I7O0FBRUQ7QUFDQSxzRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JnRTtBQUNuQztBQUNFO0FBQ2tCO0FBQ0M7QUFDRTtBQUM5QztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdGQUF3RjtBQUNsRjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNEQUFzRDtBQUNoRDtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhEQUE4RDtBQUN4RCxnQ0FBZ0MsMERBQWM7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBLHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBEQUFjO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHlCQUF5QjtBQUNsRCx3QkFBd0IsU0FBUztBQUNqQztBQUNBLFNBQVM7QUFDVDtBQUNBLDRCQUE0QixpREFBSSxPQUFPLDBEQUFjO0FBQ3JELCtCQUErQixrREFBSztBQUNwQztBQUNBLHlCQUF5QiwwREFBYztBQUN2QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGdEQUFnRCxZQUFZLEVBQUUsZ0JBQWdCO0FBQzlFLHlCQUF5QiwwREFBYztBQUN2QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxXQUFXO0FBQzNELHlCQUF5QiwwREFBYztBQUN2QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxXQUFXO0FBQzdELHlCQUF5QiwwREFBYztBQUN2QztBQUNBLFNBQVM7QUFDVCxpQkFBaUIsMERBQWMsVUFBVTtBQUN6QztBQUNBLFNBQVM7QUFDVCw0QkFBNEIseURBQWdCO0FBQzVDO0FBQ0EsWUFBWSxrRUFBZTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsVUFBVSx5Q0FBeUMsSUFBSTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsUUFBUTtBQUMzRDtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msa0JBQWtCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGlCQUFpQjtBQUNyRDtBQUNBLGdDQUFnQyxVQUFVLDhCQUE4QixJQUFJO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRiw0QkFBNEIsNkJBQTZCO0FBQzVJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxvQkFBb0IsbUNBQW1DO0FBQ3ZEO0FBQ0EsNEJBQTRCLDZCQUE2QjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMERBQWM7QUFDbkM7QUFDQSxnREFBZ0QsV0FBVztBQUMzRCwwQkFBMEIsMERBQWM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxpREFBSSxPQUFPLDBEQUFjLFVBQVU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLGNBQWMsMkJBQTJCO0FBQzdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxNQUFNLFFBQVEsV0FBVztBQUM3RDtBQUNBLDRCQUE0QixpREFBSTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDRCQUE0QixFQUFFLDBEQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLDRCQUE0QixnREFBZ0Q7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQiwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBEQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwwREFBYztBQUM1QztBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsMERBQWM7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBEQUFjO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixJQUFJO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMERBQWMsVUFBVTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwwREFBYyxVQUFVO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwwREFBYztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsMEJBQTBCLGdFQUE4QjtBQUN4RDtBQUNBO0FBQ0EsMEJBQTBCLGdFQUE4QjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqZnVKO0FBQzdHO0FBQ1Y7QUFDcUI7QUFDTDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLG9CQUFvQjtBQUMxRDtBQUNBLEdBQUcsRUFBRTtBQUNVO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrR0FBK0csZUFBZSxLQUFLLElBQUksSUFBSTtBQUMzSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwyREFBZTtBQUN0QztBQUNBLHVCQUF1QiwyREFBZTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix1REFBVTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msa0tBQThCLFNBQVMsZ0JBQWdCO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixTQUFTLEdBQUcsc0RBQVUsV0FBVztBQUM1RCw0QkFBNEIsa0VBQWU7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrREFBSztBQUN2QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULFFBQVEsdUtBQVksU0FBUyxhQUFhO0FBQzFDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLGlCQUFpQixLQUFLLCtDQUFHLEVBQUU7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIseURBQWE7QUFDOUIsdUJBQXVCLDREQUFnQjtBQUN2QyxpQkFBaUIseURBQWE7QUFDOUIsdUJBQXVCLDREQUFnQjtBQUN2QyxpQkFBaUIseURBQWE7QUFDOUIsdUJBQXVCLDREQUFnQjtBQUN2QztBQUNBLHVCQUF1Qiw0REFBZ0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDREQUFnQjtBQUMxRDtBQUNBLDhCQUE4QixZQUFZO0FBQzFDLHlCQUF5Qix3REFBZSxhQUFhLE1BQU07QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDZCQUE2QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDRCQUE0QixPQUFPLEVBQUUsT0FBTyxHQUFHLElBQUk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0dBQXNHLFdBQVc7QUFDakgsMkdBQTJHLFdBQVc7QUFDdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsMkJBQTJCO0FBQ3RGO0FBQ0Esa0NBQWtDLDBEQUFjO0FBQ2hEO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkVBQTJFLDJEQUFlO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxNQUFNO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsK0JBQStCO0FBQzVHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxtQkFBbUI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxlQUFlO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCwwREFBYztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxnQ0FBZ0M7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHlEQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3BlQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBFQUEwRTtBQUM1RDtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsU0FBUyw4QkFBOEI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsOEJBQThCO0FBQzlCLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVCx3Q0FBd0M7QUFDeEMsb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxnREFBZ0QsZUFBZTtBQUMvRCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHNDQUFzQyxlQUFlO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnQkFBZ0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksK0JBQStCO0FBQzNDLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw0Q0FBNEM7QUFDMUQsY0FBYztBQUNkO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvTjhDO0FBQzBIO0FBQ2hGO0FBQzBIO0FBQ2xOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSm9DO0FBQzdCLDBCQUEwQixnQ0FBZ0MsNkNBQU8sQ0FBQztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHNDQUFzQztBQUNoQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0NBQXdDO0FBQ2xDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdDQUF3QztBQUNsQztBQUNQO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUMxQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRDQUE0QztBQUM3Qzs7Ozs7Ozs7Ozs7Ozs7QUN4Q21EO0FBQ3BDO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxhQUFhO0FBQzlEO0FBQ0E7QUFDQSw0Q0FBNEMsWUFBWSwyREFBZTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGtCQUFrQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0Esc0NBQXNDO0FBQ3RDLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsa0JBQWtCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwR0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0M7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDJCQUEyQixJQUFJO0FBQzNDLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsZ0NBQWdDLGlDQUFpQyxHQUFHLDBCQUEwQixJQUFJLDZCQUE2QixJQUFJO0FBQ25JLFNBQVM7QUFDVDtBQUNPLHdEQUF3RDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSwyQkFBMkIsSUFBSTtBQUMzQyxXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjtBQUNBLG1DQUFtQyxpQ0FBaUMsR0FBRywwQkFBMEIsSUFBSSw4QkFBOEI7QUFDbkk7QUFDQSxtQ0FBbUMsaUNBQWlDLEdBQUcsMEJBQTBCLElBQUksOEJBQThCO0FBQ25JO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsUUFBUTtBQUMzQztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxNQUFNO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxzQkFBc0Isb0RBQW9EO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixzQkFBc0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4Tk87QUFDUDs7Ozs7Ozs7Ozs7Ozs7O0FDRHVEO0FBQ0k7QUFDcEQsNEJBQTRCLGtFQUFnQjtBQUNuRCxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixnRUFBYztBQUNqQztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDZm9DO0FBQzdCLDBCQUEwQiwrQkFBK0IsNkNBQU8sQ0FBQztBQUN4RTs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQkEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ2dFO0FBQ3BCO0FBQzVDO0FBQ0E7QUFDQSxzQkFBc0IseURBQWU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsb0RBQWU7QUFDdEMsU0FBUztBQUNUO0FBQ0EsdUJBQXVCLHdEQUFtQjtBQUMxQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBLG1CQUFtQix3REFBbUI7QUFDdEM7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLG9DQUFvQztBQUN6RTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQSxrRkFBa0YsY0FBYyxxQkFBcUI7QUFDckgsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0tBQThCLFNBQVMsZ0JBQWdCO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLHNCQUFzQixrS0FBOEI7QUFDcEQ7QUFDQTtBQUNBLENBQUM7QUFDTTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNDQTtBQUNPO0FBQ1A7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ21EO0FBQ0o7QUFDTztBQUNSO0FBQy9CO0FBQ2YsaUNBQWlDO0FBQ2pDO0FBQ0EscURBQXFELEVBQUUsMkRBQWU7QUFDdEUscUJBQXFCLDBEQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtDQUFHLGdCQUFnQixTQUFTLFlBQVksdUJBQXVCO0FBQ2xHLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtDQUFHLGdCQUFnQixTQUFTLFVBQVUsR0FBRyxLQUFLLHVCQUF1QjtBQUN4Ryx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9CQUFvQiwyREFBYztBQUNsQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQ0FBbUMsZ0RBQUksZ0JBQWdCLFNBQVM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixJQUFJLHVCQUF1QjtBQUM1Qyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9CQUFvQiwyREFBYztBQUNsQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtDQUFHLGdCQUFnQixTQUFTLFVBQVUsR0FBRztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUksdUJBQXVCO0FBQzVDLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdEQUFJLGdCQUFnQixTQUFTLFVBQVUsR0FBRyxXQUFXLElBQUksdUJBQXVCO0FBQ25ILHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsa0RBQU0sZ0JBQWdCLFNBQVMsVUFBVSxHQUFHLEtBQUssSUFBSSx1QkFBdUI7QUFDL0cseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxvQkFBb0IsMkRBQWM7QUFDbEMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsS0EsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ2tGO0FBQzNCO0FBQ1M7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ2U7QUFDZixpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDBEQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RCw0REFBNEQseUNBQXlDLG9DQUFvQztBQUN6STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQscUJBQXFCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsU0FBUyxVQUFVLE1BQU0sbUJBQW1CLDZCQUE2QiwwRUFBMEUseUJBQXlCLElBQUk7QUFDaE87QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGtEQUFrRDtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwyREFBYztBQUNsQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsTUFBTTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QscUNBQXFDO0FBQ3JGLDhEQUE4RCxtQkFBbUIsb0NBQW9DO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQscUJBQXFCO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MscUNBQXFDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnREFBSSxnQkFBZ0IsU0FBUyxzQkFBc0IsTUFBTSxLQUFLLElBQUksU0FBUztBQUM5RztBQUNBO0FBQ0E7QUFDQSw4QkFBOEIscURBQVk7QUFDMUM7QUFDQSx5QkFBeUIsUUFBUSx3Q0FBd0M7QUFDekU7QUFDQTtBQUNBLG9CQUFvQiwyREFBYztBQUNsQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0RBQUksZ0JBQWdCLFNBQVM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsSUFBSSx1QkFBdUI7QUFDNUMseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxvQkFBb0IsMkRBQWM7QUFDbEMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGdEQUFJLGdCQUFnQixTQUFTO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUksdUJBQXVCO0FBQzVDLHlCQUF5QixRQUFRLGdCQUFnQjtBQUNqRDtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZ0RBQUksZ0JBQWdCLFNBQVMsZUFBZSxNQUFNLG1CQUFtQixXQUFXLDZFQUE2RSwrQkFBK0IsSUFBSSxNQUFNLHVCQUF1QjtBQUM5UDtBQUNBLG1DQUFtQyxrREFBa0Q7QUFDckY7QUFDQSwrQ0FBK0MsU0FBUyxFQUFFLGVBQWUsRUFBRSxtQkFBbUI7QUFDOUYseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnREFBSSxnQkFBZ0IsU0FBUyxlQUFlLGNBQWMsS0FBSyxrQkFBa0IsSUFBSSx1QkFBdUI7QUFDL0k7QUFDQSxtQ0FBbUMsa0RBQWtEO0FBQ3JGO0FBQ0E7QUFDQSw2RUFBNkUsWUFBWTtBQUN6RiwyQ0FBMkMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQjtBQUMzRixvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkRBQWM7QUFDbEMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUpBQW1KO0FBQ25KLDBEQUEwRCxvQkFBb0I7QUFDOUU7QUFDQTtBQUNBLGtDQUFrQywrQ0FBRyxnQkFBZ0IsU0FBUyxHQUFHLFdBQVcsR0FBRyxNQUFNLEVBQUUsWUFBWTtBQUNuRztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxvQkFBb0IsMkRBQWM7QUFDbEMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsK0NBQUcsZ0JBQWdCLFNBQVMsZUFBZSxNQUFNO0FBQ3BGO0FBQ0EsaUJBQWlCO0FBQ2pCLHlCQUF5QixNQUFNLDhEQUFnQjtBQUMvQztBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdEQUFJLGdCQUFnQixTQUFTLFVBQVUsTUFBTTtBQUNuRTtBQUNBLGlCQUFpQjtBQUNqQix5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9CQUFvQiwyREFBYyw0QkFBNEIsNERBQW1CO0FBQ2pGO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsa0RBQWtEO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtJQUErSTtBQUMvSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFlBQVk7QUFDMUM7QUFDQTtBQUNBLG9CQUFvQix3QkFBd0IsU0FBUyxHQUFHLFdBQVcsVUFBVSxNQUFNLEVBQUUsWUFBWSxJQUFJO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtEQUFNLGdCQUFnQixTQUFTLFVBQVUsY0FBYyxLQUFLLGlCQUFpQixJQUFJLHVCQUF1QjtBQUMzSSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLG9CQUFvQiwyREFBYztBQUNsQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxTQUFTLFlBQVksR0FBRyxLQUFLLHVCQUF1QjtBQUNyRyxvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFNBQVMsWUFBWSxHQUFHO0FBQ3hDLGVBQWUsU0FBUztBQUN4QixlQUFlO0FBQ2Y7QUFDQSxvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsdUNBQXVDLG9CQUFvQjtBQUNwSSxtQ0FBbUMsZ0RBQUksZ0JBQWdCLFNBQVMsZUFBZSxjQUFjLFdBQVcsdUJBQXVCO0FBQy9ILHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFjO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjLEdBQUcsS0FBSztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnQkFBZ0I7QUFDakQ7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBLGtDQUFrQyxpQkFBaUI7QUFDbkQ7QUFDQTtBQUNBLG1DQUFtQyxrQkFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcmlCQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDeUQ7QUFDQztBQUNGO0FBQ3NCO0FBQ2dEO0FBQ2xGO0FBQzZCO0FBQ1g7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixnRUFBa0I7QUFDL0MsOEJBQThCLGFBQWE7QUFDM0MsMEJBQTBCLGFBQWE7QUFDdkMsNkJBQTZCLGFBQWE7QUFDMUMsK0JBQStCLGFBQWE7QUFDNUM7QUFDQSx3Q0FBd0MsNkNBQTZDO0FBQ3JGO0FBQ0EsZ0JBQWdCLDhEQUFrQjtBQUNsQyxzQkFBc0Isb0VBQXdCO0FBQzlDLGdEQUFnRCxFQUFFLGdFQUFvQixLQUFLLCtCQUErQjtBQUMxRyxvQkFBb0Isa0VBQXNCO0FBQzFDO0FBQ0EseUJBQXlCLGtFQUFvQixzREFBc0Q7QUFDbkc7QUFDQTtBQUNBO0FBQ0EsNkdBQTZHO0FBQzdHO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBLGlKQUFpSixjQUFjO0FBQy9KLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQSxxQkFBcUIseURBQWE7QUFDbEMsaUVBQWlFLHFFQUFxRTtBQUN0SSx3QkFBd0IsbUVBQWUsSUFBSSxhQUFhO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1FQUFlO0FBQ2xDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwrREFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixjQUFjO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQSwyQkFBMkIsWUFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsOEJBQThCLG1HQUFtRztBQUNqSTtBQUNBLHFDQUFxQyxpQkFBaUI7QUFDdEQsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBLG1CQUFtQix1RUFBa0I7QUFDckM7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxtQkFBbUIsaUVBQWMsaURBQWlELGNBQWMsd0JBQXdCLDBCQUEwQixxRUFBcUU7QUFDdk47QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbk84QztBQUNaO0FBQ3VCO0FBQzhFO0FBQ2pHO0FBQ3VCO0FBQzdEO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsZUFBZSx1REFBYztBQUM3QjtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ1orQztBQUN4QyxpQ0FBaUMseURBQVU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTywwQkFBMEIsZ0NBQWdDLE9BQU8sR0FBRyw2Q0FBTyxDQUFDO0FBQzVFO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7Ozs7Ozs7Ozs7Ozs7OztBQzdCQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUM4RTtBQUN2RTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNERBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLGVBQWUseURBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsWUFBWTtBQUMvRDtBQUNBLDBEQUEwRCxXQUFXLFNBQVM7QUFDOUUsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzlDQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ0E7QUFDUCxZQUFZLHNGQUFzRjtBQUNsRyxZQUFZLDBIQUEwSDtBQUN0STtBQUNBLDBDQUEwQztBQUMxQyw0Q0FBNEM7QUFDNUMsZ0RBQWdEO0FBQ2hELDhDQUE4QztBQUM5QywwRUFBMEUsWUFBWTtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdENPO0FBQ1A7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWlEOztBQUVqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGtCQUFrQjtBQUMvQjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCO0FBQ0EsTUFBTSxRQUFRLHlEQUFROztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0JBQXNCLFFBQVEseURBQVE7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBLFlBQVkseURBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYSxzQkFBc0I7QUFDbkM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQSxVQUFVLHlEQUFROztBQUVsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixhQUFhLGtCQUFrQjtBQUMvQjtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLHlEQUFRO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EseUNBQXlDLEtBQUs7QUFDOUM7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQjtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0VBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeFVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUU0RTtBQUMzQjs7QUFFakQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1EQUFTO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLHFEQUFXOztBQUVqQjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRLG1EQUFTO0FBQ2pCO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRLHFEQUFXO0FBQ25CO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLGFBQWEsU0FBUztBQUN0QjtBQUNPO0FBQ1A7QUFDQTtBQUNBLFlBQVksY0FBYyxRQUFRLHlEQUFRO0FBQzFDO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxvREFBVTtBQUNkO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELFVBQVU7QUFDN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzRUFBZTtBQUNmO0FBQ0E7QUFDQSxDQUFDLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3BKRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFcUQ7O0FBRXJEO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLG1FQUFZOztBQUVwQjs7Ozs7OztVQ25CUDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRDtXQUN0RCxzQ0FBc0MsaUVBQWlFO1dBQ3ZHO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjs7Ozs7V0NSQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ0pBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsdUJBQXVCLDRCQUE0QjtXQUNuRDtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIsb0JBQW9CO1dBQ3JDO1dBQ0EsbUdBQW1HLFlBQVk7V0FDL0c7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxtRUFBbUUsaUNBQWlDO1dBQ3BHO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ3pDQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUM7O1dBRWpDO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTCxlQUFlO1dBQ2Y7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7V0FDQTtXQUNBOzs7Ozs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDbUQ7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBLEVBQUUsK0RBQWM7O0FBRWhCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvQXV0aEFkbWluQXBpLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvQXV0aENsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL0dvVHJ1ZUFkbWluQXBpLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvR29UcnVlQ2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9saWIvYmFzZTY0dXJsLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9saWIvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvYXV0aC1qcy9kaXN0L21vZHVsZS9saWIvaGVscGVycy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi9sb2NhbC1zdG9yYWdlLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvbGliL2xvY2tzLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2F1dGgtanMvZGlzdC9tb2R1bGUvbGliL3BvbHlmaWxscy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi90eXBlcy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9hdXRoLWpzL2Rpc3QvbW9kdWxlL2xpYi92ZXJzaW9uLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL2Z1bmN0aW9ucy1qcy9kaXN0L21vZHVsZS9GdW5jdGlvbnNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvZnVuY3Rpb25zLWpzL2Rpc3QvbW9kdWxlL2hlbHBlci5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9mdW5jdGlvbnMtanMvZGlzdC9tb2R1bGUvdHlwZXMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvbm9kZS1mZXRjaC9icm93c2VyLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L2Nqcy9Qb3N0Z3Jlc3RCdWlsZGVyLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L2Nqcy9Qb3N0Z3Jlc3RDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL1Bvc3RncmVzdEVycm9yLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L2Nqcy9Qb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3Bvc3RncmVzdC1qcy9kaXN0L2Nqcy9Qb3N0Z3Jlc3RRdWVyeUJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL1Bvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMvZGlzdC9janMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvY2pzL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcG9zdGdyZXN0LWpzL2Rpc3QvZXNtL3dyYXBwZXIubWpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL1JlYWx0aW1lQ2hhbm5lbC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9SZWFsdGltZUNsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9yZWFsdGltZS1qcy9kaXN0L21vZHVsZS9SZWFsdGltZVByZXNlbmNlLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL2xpYi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL3B1c2guanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL3NlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL3RpbWVyLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3JlYWx0aW1lLWpzL2Rpc3QvbW9kdWxlL2xpYi90cmFuc2Zvcm1lcnMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2UvcmVhbHRpbWUtanMvZGlzdC9tb2R1bGUvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9TdG9yYWdlQ2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdG9yYWdlLWpzL2Rpc3QvbW9kdWxlL2xpYi9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9saWIvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3RvcmFnZS1qcy9kaXN0L21vZHVsZS9saWIvaGVscGVycy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdG9yYWdlLWpzL2Rpc3QvbW9kdWxlL2xpYi92ZXJzaW9uLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N0b3JhZ2UtanMvZGlzdC9tb2R1bGUvcGFja2FnZXMvU3RvcmFnZUJ1Y2tldEFwaS5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdG9yYWdlLWpzL2Rpc3QvbW9kdWxlL3BhY2thZ2VzL1N0b3JhZ2VGaWxlQXBpLmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N1cGFiYXNlLWpzL2Rpc3QvbW9kdWxlL1N1cGFiYXNlQ2xpZW50LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N1cGFiYXNlLWpzL2Rpc3QvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvLi9ub2RlX21vZHVsZXMvQHN1cGFiYXNlL3N1cGFiYXNlLWpzL2Rpc3QvbW9kdWxlL2xpYi9TdXBhYmFzZUF1dGhDbGllbnQuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMvZGlzdC9tb2R1bGUvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vbm9kZV9tb2R1bGVzL0BzdXBhYmFzZS9zdXBhYmFzZS1qcy9kaXN0L21vZHVsZS9saWIvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMvZGlzdC9tb2R1bGUvbGliL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL25vZGVfbW9kdWxlcy9Ac3VwYWJhc2Uvc3VwYWJhc2UtanMvZGlzdC9tb2R1bGUvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL2F1dGguanMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC8uL3NyYy9qcy9hdXRoL3NpZ251cC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL3N1cGFiYXNlLWNsaWVudC5qcyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3VyYmFuZG9jc193ZWJhcHAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdXJiYW5kb2NzX3dlYmFwcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly91cmJhbmRvY3Nfd2ViYXBwLy4vc3JjL2pzL2VudHJpZXMvc2lnbnVwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHb1RydWVBZG1pbkFwaSBmcm9tICcuL0dvVHJ1ZUFkbWluQXBpJztcbmNvbnN0IEF1dGhBZG1pbkFwaSA9IEdvVHJ1ZUFkbWluQXBpO1xuZXhwb3J0IGRlZmF1bHQgQXV0aEFkbWluQXBpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXV0aEFkbWluQXBpLmpzLm1hcCIsImltcG9ydCBHb1RydWVDbGllbnQgZnJvbSAnLi9Hb1RydWVDbGllbnQnO1xuY29uc3QgQXV0aENsaWVudCA9IEdvVHJ1ZUNsaWVudDtcbmV4cG9ydCBkZWZhdWx0IEF1dGhDbGllbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BdXRoQ2xpZW50LmpzLm1hcCIsInZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IF9nZW5lcmF0ZUxpbmtSZXNwb25zZSwgX25vUmVzb2x2ZUpzb25SZXNwb25zZSwgX3JlcXVlc3QsIF91c2VyUmVzcG9uc2UsIH0gZnJvbSAnLi9saWIvZmV0Y2gnO1xuaW1wb3J0IHsgcmVzb2x2ZUZldGNoIH0gZnJvbSAnLi9saWIvaGVscGVycyc7XG5pbXBvcnQgeyBpc0F1dGhFcnJvciB9IGZyb20gJy4vbGliL2Vycm9ycyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb1RydWVBZG1pbkFwaSB7XG4gICAgY29uc3RydWN0b3IoeyB1cmwgPSAnJywgaGVhZGVycyA9IHt9LCBmZXRjaCwgfSkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgdGhpcy5mZXRjaCA9IHJlc29sdmVGZXRjaChmZXRjaCk7XG4gICAgICAgIHRoaXMubWZhID0ge1xuICAgICAgICAgICAgbGlzdEZhY3RvcnM6IHRoaXMuX2xpc3RGYWN0b3JzLmJpbmQodGhpcyksXG4gICAgICAgICAgICBkZWxldGVGYWN0b3I6IHRoaXMuX2RlbGV0ZUZhY3Rvci5iaW5kKHRoaXMpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbG9nZ2VkLWluIHNlc3Npb24uXG4gICAgICogQHBhcmFtIGp3dCBBIHZhbGlkLCBsb2dnZWQtaW4gSldULlxuICAgICAqIEBwYXJhbSBzY29wZSBUaGUgbG9nb3V0IHNvcGUuXG4gICAgICovXG4gICAgYXN5bmMgc2lnbk91dChqd3QsIHNjb3BlID0gJ2dsb2JhbCcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L2xvZ291dD9zY29wZT0ke3Njb3BlfWAsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgand0LFxuICAgICAgICAgICAgICAgIG5vUmVzb2x2ZUpzb246IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGFuIGludml0ZSBsaW5rIHRvIGFuIGVtYWlsIGFkZHJlc3MuXG4gICAgICogQHBhcmFtIGVtYWlsIFRoZSBlbWFpbCBhZGRyZXNzIG9mIHRoZSB1c2VyLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIEFkZGl0aW9uYWwgb3B0aW9ucyB0byBiZSBpbmNsdWRlZCB3aGVuIGludml0aW5nLlxuICAgICAqL1xuICAgIGFzeW5jIGludml0ZVVzZXJCeUVtYWlsKGVtYWlsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9pbnZpdGVgLCB7XG4gICAgICAgICAgICAgICAgYm9keTogeyBlbWFpbCwgZGF0YTogb3B0aW9ucy5kYXRhIH0sXG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMucmVkaXJlY3RUbyxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3VzZXJSZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGVtYWlsIGxpbmtzIGFuZCBPVFBzIHRvIGJlIHNlbnQgdmlhIGEgY3VzdG9tIGVtYWlsIHByb3ZpZGVyLlxuICAgICAqIEBwYXJhbSBlbWFpbCBUaGUgdXNlcidzIGVtYWlsLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnBhc3N3b3JkIFVzZXIgcGFzc3dvcmQuIEZvciBzaWdudXAgb25seS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kYXRhIE9wdGlvbmFsIHVzZXIgbWV0YWRhdGEuIEZvciBzaWdudXAgb25seS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWRpcmVjdFRvIFRoZSByZWRpcmVjdCB1cmwgd2hpY2ggc2hvdWxkIGJlIGFwcGVuZGVkIHRvIHRoZSBnZW5lcmF0ZWQgbGlua1xuICAgICAqL1xuICAgIGFzeW5jIGdlbmVyYXRlTGluayhwYXJhbXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gcGFyYW1zLCByZXN0ID0gX19yZXN0KHBhcmFtcywgW1wib3B0aW9uc1wiXSk7XG4gICAgICAgICAgICBjb25zdCBib2R5ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXN0KSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoJ25ld0VtYWlsJyBpbiByZXN0KSB7XG4gICAgICAgICAgICAgICAgLy8gcmVwbGFjZSBuZXdFbWFpbCB3aXRoIG5ld19lbWFpbCBpbiByZXF1ZXN0IGJvZHlcbiAgICAgICAgICAgICAgICBib2R5Lm5ld19lbWFpbCA9IHJlc3QgPT09IG51bGwgfHwgcmVzdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzdC5uZXdFbWFpbDtcbiAgICAgICAgICAgICAgICBkZWxldGUgYm9keVsnbmV3RW1haWwnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9hZG1pbi9nZW5lcmF0ZV9saW5rYCwge1xuICAgICAgICAgICAgICAgIGJvZHk6IGJvZHksXG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfZ2VuZXJhdGVMaW5rUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnJlZGlyZWN0VG8sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFVzZXIgQWRtaW4gQVBJXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyB1c2VyLlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIGEgc2VydmVyLiBOZXZlciBleHBvc2UgeW91ciBgc2VydmljZV9yb2xlYCBrZXkgaW4gdGhlIGJyb3dzZXIuXG4gICAgICovXG4gICAgYXN5bmMgY3JlYXRlVXNlcihhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vYWRtaW4vdXNlcnNgLCB7XG4gICAgICAgICAgICAgICAgYm9keTogYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgeGZvcm06IF91c2VyUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhIGxpc3Qgb2YgdXNlcnMuXG4gICAgICpcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBhIHNlcnZlci4gTmV2ZXIgZXhwb3NlIHlvdXIgYHNlcnZpY2Vfcm9sZWAga2V5IGluIHRoZSBicm93c2VyLlxuICAgICAqIEBwYXJhbSBwYXJhbXMgQW4gb2JqZWN0IHdoaWNoIHN1cHBvcnRzIGBwYWdlYCBhbmQgYHBlclBhZ2VgIGFzIG51bWJlcnMsIHRvIGFsdGVyIHRoZSBwYWdpbmF0ZWQgcmVzdWx0cy5cbiAgICAgKi9cbiAgICBhc3luYyBsaXN0VXNlcnMocGFyYW1zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSB7IG5leHRQYWdlOiBudWxsLCBsYXN0UGFnZTogMCwgdG90YWw6IDAgfTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0dFVCcsIGAke3RoaXMudXJsfS9hZG1pbi91c2Vyc2AsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgbm9SZXNvbHZlSnNvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiAoX2IgPSAoX2EgPSBwYXJhbXMgPT09IG51bGwgfHwgcGFyYW1zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJhbXMucGFnZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvU3RyaW5nKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBwZXJfcGFnZTogKF9kID0gKF9jID0gcGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLnBlclBhZ2UpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b1N0cmluZygpKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAnJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfbm9SZXNvbHZlSnNvblJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpXG4gICAgICAgICAgICAgICAgdGhyb3cgcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsID0gKF9lID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ3gtdG90YWwtY291bnQnKSkgIT09IG51bGwgJiYgX2UgIT09IHZvaWQgMCA/IF9lIDogMDtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gKF9nID0gKF9mID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2xpbmsnKSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLnNwbGl0KCcsJykpICE9PSBudWxsICYmIF9nICE9PSB2b2lkIDAgPyBfZyA6IFtdO1xuICAgICAgICAgICAgaWYgKGxpbmtzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBwYXJzZUludChsaW5rLnNwbGl0KCc7JylbMF0uc3BsaXQoJz0nKVsxXS5zdWJzdHJpbmcoMCwgMSkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWwgPSBKU09OLnBhcnNlKGxpbmsuc3BsaXQoJzsnKVsxXS5zcGxpdCgnPScpWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbltgJHtyZWx9UGFnZWBdID0gcGFnZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uLnRvdGFsID0gcGFyc2VJbnQodG90YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB1c2VycyksIHBhZ2luYXRpb24pLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcnM6IFtdIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSBpZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB1aWQgVGhlIHVzZXIncyB1bmlxdWUgaWRlbnRpZmllclxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYSBzZXJ2ZXIuIE5ldmVyIGV4cG9zZSB5b3VyIGBzZXJ2aWNlX3JvbGVgIGtleSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgKi9cbiAgICBhc3luYyBnZXRVc2VyQnlJZCh1aWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnR0VUJywgYCR7dGhpcy51cmx9L2FkbWluL3VzZXJzLyR7dWlkfWAsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgeGZvcm06IF91c2VyUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHVzZXIgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzIFRoZSBkYXRhIHlvdSB3YW50IHRvIHVwZGF0ZS5cbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIGEgc2VydmVyLiBOZXZlciBleHBvc2UgeW91ciBgc2VydmljZV9yb2xlYCBrZXkgaW4gdGhlIGJyb3dzZXIuXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlVXNlckJ5SWQodWlkLCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BVVCcsIGAke3RoaXMudXJsfS9hZG1pbi91c2Vycy8ke3VpZH1gLCB7XG4gICAgICAgICAgICAgICAgYm9keTogYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgeGZvcm06IF91c2VyUmVzcG9uc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIHVzZXIuIFJlcXVpcmVzIGEgYHNlcnZpY2Vfcm9sZWAga2V5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFRoZSB1c2VyIGlkIHlvdSB3YW50IHRvIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0gc2hvdWxkU29mdERlbGV0ZSBJZiB0cnVlLCB0aGVuIHRoZSB1c2VyIHdpbGwgYmUgc29mdC1kZWxldGVkIGZyb20gdGhlIGF1dGggc2NoZW1hLiBTb2Z0IGRlbGV0aW9uIGFsbG93cyB1c2VyIGlkZW50aWZpY2F0aW9uIGZyb20gdGhlIGhhc2hlZCB1c2VyIElEIGJ1dCBpcyBub3QgcmV2ZXJzaWJsZS5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZSBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eS5cbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIGEgc2VydmVyLiBOZXZlciBleHBvc2UgeW91ciBgc2VydmljZV9yb2xlYCBrZXkgaW4gdGhlIGJyb3dzZXIuXG4gICAgICovXG4gICAgYXN5bmMgZGVsZXRlVXNlcihpZCwgc2hvdWxkU29mdERlbGV0ZSA9IGZhbHNlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0RFTEVURScsIGAke3RoaXMudXJsfS9hZG1pbi91c2Vycy8ke2lkfWAsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICBzaG91bGRfc29mdF9kZWxldGU6IHNob3VsZFNvZnREZWxldGUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3VzZXJSZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgX2xpc3RGYWN0b3JzKHBhcmFtcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0dFVCcsIGAke3RoaXMudXJsfS9hZG1pbi91c2Vycy8ke3BhcmFtcy51c2VySWR9L2ZhY3RvcnNgLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHhmb3JtOiAoZmFjdG9ycykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IGZhY3RvcnMgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvciB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBfZGVsZXRlRmFjdG9yKHBhcmFtcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdERUxFVEUnLCBgJHt0aGlzLnVybH0vYWRtaW4vdXNlcnMvJHtwYXJhbXMudXNlcklkfS9mYWN0b3JzLyR7cGFyYW1zLmlkfWAsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9R29UcnVlQWRtaW5BcGkuanMubWFwIiwiaW1wb3J0IEdvVHJ1ZUFkbWluQXBpIGZyb20gJy4vR29UcnVlQWRtaW5BcGknO1xuaW1wb3J0IHsgREVGQVVMVF9IRUFERVJTLCBFWFBJUllfTUFSR0lOX01TLCBBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTl9NUywgQVVUT19SRUZSRVNIX1RJQ0tfVEhSRVNIT0xELCBHT1RSVUVfVVJMLCBTVE9SQUdFX0tFWSwgSldLU19UVEwsIH0gZnJvbSAnLi9saWIvY29uc3RhbnRzJztcbmltcG9ydCB7IEF1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvciwgQXV0aFBLQ0VHcmFudENvZGVFeGNoYW5nZUVycm9yLCBBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3IsIEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yLCBBdXRoSW52YWxpZFRva2VuUmVzcG9uc2VFcnJvciwgQXV0aFVua25vd25FcnJvciwgaXNBdXRoQXBpRXJyb3IsIGlzQXV0aEVycm9yLCBpc0F1dGhSZXRyeWFibGVGZXRjaEVycm9yLCBpc0F1dGhTZXNzaW9uTWlzc2luZ0Vycm9yLCBpc0F1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvciwgQXV0aEludmFsaWRKd3RFcnJvciwgfSBmcm9tICcuL2xpYi9lcnJvcnMnO1xuaW1wb3J0IHsgX3JlcXVlc3QsIF9zZXNzaW9uUmVzcG9uc2UsIF9zZXNzaW9uUmVzcG9uc2VQYXNzd29yZCwgX3VzZXJSZXNwb25zZSwgX3Nzb1Jlc3BvbnNlLCB9IGZyb20gJy4vbGliL2ZldGNoJztcbmltcG9ydCB7IERlZmVycmVkLCBnZXRJdGVtQXN5bmMsIGlzQnJvd3NlciwgcmVtb3ZlSXRlbUFzeW5jLCByZXNvbHZlRmV0Y2gsIHNldEl0ZW1Bc3luYywgdXVpZCwgcmV0cnlhYmxlLCBzbGVlcCwgc3VwcG9ydHNMb2NhbFN0b3JhZ2UsIHBhcnNlUGFyYW1ldGVyc0Zyb21VUkwsIGdldENvZGVDaGFsbGVuZ2VBbmRNZXRob2QsIGdldEFsZ29yaXRobSwgdmFsaWRhdGVFeHAsIGRlY29kZUpXVCwgfSBmcm9tICcuL2xpYi9oZWxwZXJzJztcbmltcG9ydCB7IGxvY2FsU3RvcmFnZUFkYXB0ZXIsIG1lbW9yeUxvY2FsU3RvcmFnZUFkYXB0ZXIgfSBmcm9tICcuL2xpYi9sb2NhbC1zdG9yYWdlJztcbmltcG9ydCB7IHBvbHlmaWxsR2xvYmFsVGhpcyB9IGZyb20gJy4vbGliL3BvbHlmaWxscyc7XG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi9saWIvdmVyc2lvbic7XG5pbXBvcnQgeyBMb2NrQWNxdWlyZVRpbWVvdXRFcnJvciwgbmF2aWdhdG9yTG9jayB9IGZyb20gJy4vbGliL2xvY2tzJztcbmltcG9ydCB7IHN0cmluZ1RvVWludDhBcnJheSB9IGZyb20gJy4vbGliL2Jhc2U2NHVybCc7XG5wb2x5ZmlsbEdsb2JhbFRoaXMoKTsgLy8gTWFrZSBcImdsb2JhbFRoaXNcIiBhdmFpbGFibGVcbmNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICB1cmw6IEdPVFJVRV9VUkwsXG4gICAgc3RvcmFnZUtleTogU1RPUkFHRV9LRVksXG4gICAgYXV0b1JlZnJlc2hUb2tlbjogdHJ1ZSxcbiAgICBwZXJzaXN0U2Vzc2lvbjogdHJ1ZSxcbiAgICBkZXRlY3RTZXNzaW9uSW5Vcmw6IHRydWUsXG4gICAgaGVhZGVyczogREVGQVVMVF9IRUFERVJTLFxuICAgIGZsb3dUeXBlOiAnaW1wbGljaXQnLFxuICAgIGRlYnVnOiBmYWxzZSxcbiAgICBoYXNDdXN0b21BdXRob3JpemF0aW9uSGVhZGVyOiBmYWxzZSxcbn07XG5hc3luYyBmdW5jdGlvbiBsb2NrTm9PcChuYW1lLCBhY3F1aXJlVGltZW91dCwgZm4pIHtcbiAgICByZXR1cm4gYXdhaXQgZm4oKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvVHJ1ZUNsaWVudCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGNsaWVudCBmb3IgdXNlIGluIHRoZSBicm93c2VyLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdGhpcy5tZW1vcnlTdG9yYWdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUVtaXR0ZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmF1dG9SZWZyZXNoVGlja2VyID0gbnVsbDtcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQgPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogS2VlcHMgdHJhY2sgb2YgdGhlIGFzeW5jIGNsaWVudCBpbml0aWFsaXphdGlvbi5cbiAgICAgICAgICogV2hlbiBudWxsIG9yIG5vdCB5ZXQgcmVzb2x2ZWQgdGhlIGF1dGggc3RhdGUgaXMgYHVua25vd25gXG4gICAgICAgICAqIE9uY2UgcmVzb2x2ZWQgdGhlIHRoZSBhdXRoIHN0YXRlIGlzIGtub3duIGFuZCBpdCdzIHNhdmUgdG8gY2FsbCBhbnkgZnVydGhlciBjbGllbnQgbWV0aG9kcy5cbiAgICAgICAgICogS2VlcCBleHRyYSBjYXJlIHRvIG5ldmVyIHJlamVjdCBvciB0aHJvdyB1bmNhdWdodCBlcnJvcnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVByb21pc2UgPSBudWxsO1xuICAgICAgICB0aGlzLmRldGVjdFNlc3Npb25JblVybCA9IHRydWU7XG4gICAgICAgIHRoaXMuaGFzQ3VzdG9tQXV0aG9yaXphdGlvbkhlYWRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN1cHByZXNzR2V0U2Vzc2lvbldhcm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2NrQWNxdWlyZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wZW5kaW5nSW5Mb2NrID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVc2VkIHRvIGJyb2FkY2FzdCBzdGF0ZSBjaGFuZ2UgZXZlbnRzIHRvIG90aGVyIHRhYnMgbGlzdGVuaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5icm9hZGNhc3RDaGFubmVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5sb2dnZXIgPSBjb25zb2xlLmxvZztcbiAgICAgICAgdGhpcy5pbnN0YW5jZUlEID0gR29UcnVlQ2xpZW50Lm5leHRJbnN0YW5jZUlEO1xuICAgICAgICBHb1RydWVDbGllbnQubmV4dEluc3RhbmNlSUQgKz0gMTtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VJRCA+IDAgJiYgaXNCcm93c2VyKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTXVsdGlwbGUgR29UcnVlQ2xpZW50IGluc3RhbmNlcyBkZXRlY3RlZCBpbiB0aGUgc2FtZSBicm93c2VyIGNvbnRleHQuIEl0IGlzIG5vdCBhbiBlcnJvciwgYnV0IHRoaXMgc2hvdWxkIGJlIGF2b2lkZWQgYXMgaXQgbWF5IHByb2R1Y2UgdW5kZWZpbmVkIGJlaGF2aW9yIHdoZW4gdXNlZCBjb25jdXJyZW50bHkgdW5kZXIgdGhlIHNhbWUgc3RvcmFnZSBrZXkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUyksIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmxvZ0RlYnVnTWVzc2FnZXMgPSAhIXNldHRpbmdzLmRlYnVnO1xuICAgICAgICBpZiAodHlwZW9mIHNldHRpbmdzLmRlYnVnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IHNldHRpbmdzLmRlYnVnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGVyc2lzdFNlc3Npb24gPSBzZXR0aW5ncy5wZXJzaXN0U2Vzc2lvbjtcbiAgICAgICAgdGhpcy5zdG9yYWdlS2V5ID0gc2V0dGluZ3Muc3RvcmFnZUtleTtcbiAgICAgICAgdGhpcy5hdXRvUmVmcmVzaFRva2VuID0gc2V0dGluZ3MuYXV0b1JlZnJlc2hUb2tlbjtcbiAgICAgICAgdGhpcy5hZG1pbiA9IG5ldyBHb1RydWVBZG1pbkFwaSh7XG4gICAgICAgICAgICB1cmw6IHNldHRpbmdzLnVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHNldHRpbmdzLmhlYWRlcnMsXG4gICAgICAgICAgICBmZXRjaDogc2V0dGluZ3MuZmV0Y2gsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVybCA9IHNldHRpbmdzLnVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gc2V0dGluZ3MuaGVhZGVycztcbiAgICAgICAgdGhpcy5mZXRjaCA9IHJlc29sdmVGZXRjaChzZXR0aW5ncy5mZXRjaCk7XG4gICAgICAgIHRoaXMubG9jayA9IHNldHRpbmdzLmxvY2sgfHwgbG9ja05vT3A7XG4gICAgICAgIHRoaXMuZGV0ZWN0U2Vzc2lvbkluVXJsID0gc2V0dGluZ3MuZGV0ZWN0U2Vzc2lvbkluVXJsO1xuICAgICAgICB0aGlzLmZsb3dUeXBlID0gc2V0dGluZ3MuZmxvd1R5cGU7XG4gICAgICAgIHRoaXMuaGFzQ3VzdG9tQXV0aG9yaXphdGlvbkhlYWRlciA9IHNldHRpbmdzLmhhc0N1c3RvbUF1dGhvcml6YXRpb25IZWFkZXI7XG4gICAgICAgIGlmIChzZXR0aW5ncy5sb2NrKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2sgPSBzZXR0aW5ncy5sb2NrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzQnJvd3NlcigpICYmICgoX2EgPSBnbG9iYWxUaGlzID09PSBudWxsIHx8IGdsb2JhbFRoaXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGdsb2JhbFRoaXMubmF2aWdhdG9yKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubG9ja3MpKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2sgPSBuYXZpZ2F0b3JMb2NrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2NrID0gbG9ja05vT3A7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5qd2tzID0geyBrZXlzOiBbXSB9O1xuICAgICAgICB0aGlzLmp3a3NfY2FjaGVkX2F0ID0gTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVI7XG4gICAgICAgIHRoaXMubWZhID0ge1xuICAgICAgICAgICAgdmVyaWZ5OiB0aGlzLl92ZXJpZnkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGVucm9sbDogdGhpcy5fZW5yb2xsLmJpbmQodGhpcyksXG4gICAgICAgICAgICB1bmVucm9sbDogdGhpcy5fdW5lbnJvbGwuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGNoYWxsZW5nZTogdGhpcy5fY2hhbGxlbmdlLmJpbmQodGhpcyksXG4gICAgICAgICAgICBsaXN0RmFjdG9yczogdGhpcy5fbGlzdEZhY3RvcnMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGNoYWxsZW5nZUFuZFZlcmlmeTogdGhpcy5fY2hhbGxlbmdlQW5kVmVyaWZ5LmJpbmQodGhpcyksXG4gICAgICAgICAgICBnZXRBdXRoZW50aWNhdG9yQXNzdXJhbmNlTGV2ZWw6IHRoaXMuX2dldEF1dGhlbnRpY2F0b3JBc3N1cmFuY2VMZXZlbC5iaW5kKHRoaXMpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5wZXJzaXN0U2Vzc2lvbikge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzZXR0aW5ncy5zdG9yYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRzTG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlID0gbG9jYWxTdG9yYWdlQWRhcHRlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVtb3J5U3RvcmFnZSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSBtZW1vcnlMb2NhbFN0b3JhZ2VBZGFwdGVyKHRoaXMubWVtb3J5U3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW1vcnlTdG9yYWdlID0ge307XG4gICAgICAgICAgICB0aGlzLnN0b3JhZ2UgPSBtZW1vcnlMb2NhbFN0b3JhZ2VBZGFwdGVyKHRoaXMubWVtb3J5U3RvcmFnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQnJvd3NlcigpICYmIGdsb2JhbFRoaXMuQnJvYWRjYXN0Q2hhbm5lbCAmJiB0aGlzLnBlcnNpc3RTZXNzaW9uICYmIHRoaXMuc3RvcmFnZUtleSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdENoYW5uZWwgPSBuZXcgZ2xvYmFsVGhpcy5Ccm9hZGNhc3RDaGFubmVsKHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjcmVhdGUgYSBuZXcgQnJvYWRjYXN0Q2hhbm5lbCwgbXVsdGktdGFiIHN0YXRlIGNoYW5nZXMgd2lsbCBub3QgYmUgYXZhaWxhYmxlJywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoX2IgPSB0aGlzLmJyb2FkY2FzdENoYW5uZWwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJ3JlY2VpdmVkIGJyb2FkY2FzdCBub3RpZmljYXRpb24gZnJvbSBvdGhlciB0YWIgb3IgY2xpZW50JywgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKGV2ZW50LmRhdGEuZXZlbnQsIGV2ZW50LmRhdGEuc2Vzc2lvbiwgZmFsc2UpOyAvLyBicm9hZGNhc3QgPSBmYWxzZSBzbyB3ZSBkb24ndCBnZXQgYW4gZW5kbGVzcyBsb29wIG9mIG1lc3NhZ2VzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG4gICAgX2RlYnVnKC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMubG9nRGVidWdNZXNzYWdlcykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIoYEdvVHJ1ZUNsaWVudEAke3RoaXMuaW5zdGFuY2VJRH0gKCR7dmVyc2lvbn0pICR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfWAsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgY2xpZW50IHNlc3Npb24gZWl0aGVyIGZyb20gdGhlIHVybCBvciBmcm9tIHN0b3JhZ2UuXG4gICAgICogVGhpcyBtZXRob2QgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgd2hlbiBpbnN0YW50aWF0aW5nIHRoZSBjbGllbnQsIGJ1dCBzaG91bGQgYWxzbyBiZSBjYWxsZWRcbiAgICAgKiBtYW51YWxseSB3aGVuIGNoZWNraW5nIGZvciBhbiBlcnJvciBmcm9tIGFuIGF1dGggcmVkaXJlY3QgKG9hdXRoLCBtYWdpY2xpbmssIHBhc3N3b3JkIHJlY292ZXJ5LCBldGMpLlxuICAgICAqL1xuICAgIGFzeW5jIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVQcm9taXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRpYWxpemVQcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9pbml0aWFsaXplKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElNUE9SVEFOVDpcbiAgICAgKiAxLiBOZXZlciB0aHJvdyBpbiB0aGlzIG1ldGhvZCwgYXMgaXQgaXMgY2FsbGVkIGZyb20gdGhlIGNvbnN0cnVjdG9yXG4gICAgICogMi4gTmV2ZXIgcmV0dXJuIGEgc2Vzc2lvbiBmcm9tIHRoaXMgbWV0aG9kIGFzIGl0IHdvdWxkIGJlIGNhY2hlZCBvdmVyXG4gICAgICogICAgdGhlIHdob2xlIGxpZmV0aW1lIG9mIHRoZSBjbGllbnRcbiAgICAgKi9cbiAgICBhc3luYyBfaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gcGFyc2VQYXJhbWV0ZXJzRnJvbVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICBsZXQgY2FsbGJhY2tVcmxUeXBlID0gJ25vbmUnO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzSW1wbGljaXRHcmFudENhbGxiYWNrKHBhcmFtcykpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja1VybFR5cGUgPSAnaW1wbGljaXQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXdhaXQgdGhpcy5faXNQS0NFQ2FsbGJhY2socGFyYW1zKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrVXJsVHlwZSA9ICdwa2NlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQXR0ZW1wdCB0byBnZXQgdGhlIHNlc3Npb24gZnJvbSB0aGUgVVJMIG9ubHkgaWYgdGhlc2UgY29uZGl0aW9ucyBhcmUgZnVsZmlsbGVkXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogTm90ZTogSWYgdGhlIFVSTCBpc24ndCBvbmUgb2YgdGhlIGNhbGxiYWNrIHVybCB0eXBlcyAoaW1wbGljaXQgb3IgcGtjZSksXG4gICAgICAgICAgICAgKiB0aGVuIHRoZXJlIGNvdWxkIGJlIGFuIGV4aXN0aW5nIHNlc3Npb24gc28gd2UgZG9uJ3Qgd2FudCB0byBwcmVtYXR1cmVseSByZW1vdmUgaXRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKGlzQnJvd3NlcigpICYmIHRoaXMuZGV0ZWN0U2Vzc2lvbkluVXJsICYmIGNhbGxiYWNrVXJsVHlwZSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5fZ2V0U2Vzc2lvbkZyb21VUkwocGFyYW1zLCBjYWxsYmFja1VybFR5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19pbml0aWFsaXplKCknLCAnZXJyb3IgZGV0ZWN0aW5nIHNlc3Npb24gZnJvbSBVUkwnLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0F1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IChfYSA9IGVycm9yLmRldGFpbHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yQ29kZSA9PT0gJ2lkZW50aXR5X2FscmVhZHlfZXhpc3RzJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ29kZSA9PT0gJ2lkZW50aXR5X25vdF9mb3VuZCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNvZGUgPT09ICdzaW5nbGVfaWRlbnRpdHlfbm90X2RlbGV0YWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGZhaWxlZCBsb2dpbiBhdHRlbXB0IHZpYSB1cmwsXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgc2Vzc2lvbiBhcyBpbiB2ZXJpZnlPdHAsIHNpZ25VcCBhbmQgc2lnbkluV2l0aCpcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVtb3ZlU2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB7IHNlc3Npb24sIHJlZGlyZWN0VHlwZSB9ID0gZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19pbml0aWFsaXplKCknLCAnZGV0ZWN0ZWQgc2Vzc2lvbiBpbiBVUkwnLCBzZXNzaW9uLCAncmVkaXJlY3QgdHlwZScsIHJlZGlyZWN0VHlwZSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWRpcmVjdFR5cGUgPT09ICdyZWNvdmVyeScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdQQVNTV09SRF9SRUNPVkVSWScsIHNlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9JTicsIHNlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG5vIGxvZ2luIGF0dGVtcHQgdmlhIGNhbGxiYWNrIHVybCB0cnkgdG8gcmVjb3ZlciBzZXNzaW9uIGZyb20gc3RvcmFnZVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5fcmVjb3ZlckFuZFJlZnJlc2goKTtcbiAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZXJyb3I6IG5ldyBBdXRoVW5rbm93bkVycm9yKCdVbmV4cGVjdGVkIGVycm9yIGR1cmluZyBpbml0aWFsaXphdGlvbicsIGVycm9yKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKCk7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19pbml0aWFsaXplKCknLCAnZW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBhbm9ueW1vdXMgdXNlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgc2Vzc2lvbiB3aGVyZSB0aGUgaXNfYW5vbnltb3VzIGNsYWltIGluIHRoZSBhY2Nlc3MgdG9rZW4gSldUIHNldCB0byB0cnVlXG4gICAgICovXG4gICAgYXN5bmMgc2lnbkluQW5vbnltb3VzbHkoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9zaWdudXBgLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogKF9iID0gKF9hID0gY3JlZGVudGlhbHMgPT09IG51bGwgfHwgY3JlZGVudGlhbHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNyZWRlbnRpYWxzLm9wdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kYXRhKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogKF9jID0gY3JlZGVudGlhbHMgPT09IG51bGwgfHwgY3JlZGVudGlhbHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNyZWRlbnRpYWxzLm9wdGlvbnMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSByZXM7XG4gICAgICAgICAgICBpZiAoZXJyb3IgfHwgIWRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3I6IGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gZGF0YS5zZXNzaW9uO1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGRhdGEudXNlcjtcbiAgICAgICAgICAgIGlmIChkYXRhLnNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBzZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlciwgc2Vzc2lvbiB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyB1c2VyLlxuICAgICAqXG4gICAgICogQmUgYXdhcmUgdGhhdCBpZiBhIHVzZXIgYWNjb3VudCBleGlzdHMgaW4gdGhlIHN5c3RlbSB5b3UgbWF5IGdldCBiYWNrIGFuXG4gICAgICogZXJyb3IgbWVzc2FnZSB0aGF0IGF0dGVtcHRzIHRvIGhpZGUgdGhpcyBpbmZvcm1hdGlvbiBmcm9tIHRoZSB1c2VyLlxuICAgICAqIFRoaXMgbWV0aG9kIGhhcyBzdXBwb3J0IGZvciBQS0NFIHZpYSBlbWFpbCBzaWdudXBzLiBUaGUgUEtDRSBmbG93IGNhbm5vdCBiZSB1c2VkIHdoZW4gYXV0b2NvbmZpcm0gaXMgZW5hYmxlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgbG9nZ2VkLWluIHNlc3Npb24gaWYgdGhlIHNlcnZlciBoYXMgXCJhdXRvY29uZmlybVwiIE9OXG4gICAgICogQHJldHVybnMgQSB1c2VyIGlmIHRoZSBzZXJ2ZXIgaGFzIFwiYXV0b2NvbmZpcm1cIiBPRkZcbiAgICAgKi9cbiAgICBhc3luYyBzaWduVXAoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzO1xuICAgICAgICAgICAgaWYgKCdlbWFpbCcgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgb3B0aW9ucyB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICAgICAgbGV0IGNvZGVDaGFsbGVuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mbG93VHlwZSA9PT0gJ3BrY2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgW2NvZGVDaGFsbGVuZ2UsIGNvZGVDaGFsbGVuZ2VNZXRob2RdID0gYXdhaXQgZ2V0Q29kZUNoYWxsZW5nZUFuZE1ldGhvZCh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcyA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3NpZ251cGAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZW1haWxSZWRpcmVjdFRvLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRhdGEpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2U6IGNvZGVDaGFsbGVuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlX2NoYWxsZW5nZV9tZXRob2Q6IGNvZGVDaGFsbGVuZ2VNZXRob2QsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoJ3Bob25lJyBpbiBjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGhvbmUsIHBhc3N3b3JkLCBvcHRpb25zIH0gPSBjcmVkZW50aWFscztcbiAgICAgICAgICAgICAgICByZXMgPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9zaWdudXBgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IChfYiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kYXRhKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IChfYyA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jaGFubmVsKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiAnc21zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeGZvcm06IF9zZXNzaW9uUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRDcmVkZW50aWFsc0Vycm9yKCdZb3UgbXVzdCBwcm92aWRlIGVpdGhlciBhbiBlbWFpbCBvciBwaG9uZSBudW1iZXIgYW5kIGEgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHJlcztcbiAgICAgICAgICAgIGlmIChlcnJvciB8fCAhZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBkYXRhLnNlc3Npb247XG4gICAgICAgICAgICBjb25zdCB1c2VyID0gZGF0YS51c2VyO1xuICAgICAgICAgICAgaWYgKGRhdGEuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9JTicsIHNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyLCBzZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2cgaW4gYW4gZXhpc3RpbmcgdXNlciB3aXRoIGFuIGVtYWlsIGFuZCBwYXNzd29yZCBvciBwaG9uZSBhbmQgcGFzc3dvcmQuXG4gICAgICpcbiAgICAgKiBCZSBhd2FyZSB0aGF0IHlvdSBtYXkgZ2V0IGJhY2sgYW4gZXJyb3IgbWVzc2FnZSB0aGF0IHdpbGwgbm90IGRpc3Rpbmd1aXNoXG4gICAgICogYmV0d2VlbiB0aGUgY2FzZXMgd2hlcmUgdGhlIGFjY291bnQgZG9lcyBub3QgZXhpc3Qgb3IgdGhhdCB0aGVcbiAgICAgKiBlbWFpbC9waG9uZSBhbmQgcGFzc3dvcmQgY29tYmluYXRpb24gaXMgd3Jvbmcgb3IgdGhhdCB0aGUgYWNjb3VudCBjYW4gb25seVxuICAgICAqIGJlIGFjY2Vzc2VkIHZpYSBzb2NpYWwgbG9naW4uXG4gICAgICovXG4gICAgYXN5bmMgc2lnbkluV2l0aFBhc3N3b3JkKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcmVzO1xuICAgICAgICAgICAgaWYgKCdlbWFpbCcgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgb3B0aW9ucyB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICAgICAgcmVzID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vdG9rZW4/Z3JhbnRfdHlwZT1wYXNzd29yZGAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZVBhc3N3b3JkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoJ3Bob25lJyBpbiBjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGhvbmUsIHBhc3N3b3JkLCBvcHRpb25zIH0gPSBjcmVkZW50aWFscztcbiAgICAgICAgICAgICAgICByZXMgPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS90b2tlbj9ncmFudF90eXBlPXBhc3N3b3JkYCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRDcmVkZW50aWFsc0Vycm9yKCdZb3UgbXVzdCBwcm92aWRlIGVpdGhlciBhbiBlbWFpbCBvciBwaG9uZSBudW1iZXIgYW5kIGEgcGFzc3dvcmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHJlcztcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIWRhdGEgfHwgIWRhdGEuc2Vzc2lvbiB8fCAhZGF0YS51c2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yOiBuZXcgQXV0aEludmFsaWRUb2tlblJlc3BvbnNlRXJyb3IoKSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1NJR05FRF9JTicsIGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oeyB1c2VyOiBkYXRhLnVzZXIsIHNlc3Npb246IGRhdGEuc2Vzc2lvbiB9LCAoZGF0YS53ZWFrX3Bhc3N3b3JkID8geyB3ZWFrUGFzc3dvcmQ6IGRhdGEud2Vha19wYXNzd29yZCB9IDogbnVsbCkpLFxuICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvZyBpbiBhbiBleGlzdGluZyB1c2VyIHZpYSBhIHRoaXJkLXBhcnR5IHByb3ZpZGVyLlxuICAgICAqIFRoaXMgbWV0aG9kIHN1cHBvcnRzIHRoZSBQS0NFIGZsb3cuXG4gICAgICovXG4gICAgYXN5bmMgc2lnbkluV2l0aE9BdXRoKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2hhbmRsZVByb3ZpZGVyU2lnbkluKGNyZWRlbnRpYWxzLnByb3ZpZGVyLCB7XG4gICAgICAgICAgICByZWRpcmVjdFRvOiAoX2EgPSBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucmVkaXJlY3RUbyxcbiAgICAgICAgICAgIHNjb3BlczogKF9iID0gY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnNjb3BlcyxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiAoX2MgPSBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MucXVlcnlQYXJhbXMsXG4gICAgICAgICAgICBza2lwQnJvd3NlclJlZGlyZWN0OiAoX2QgPSBjcmVkZW50aWFscy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Quc2tpcEJyb3dzZXJSZWRpcmVjdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvZyBpbiBhbiBleGlzdGluZyB1c2VyIGJ5IGV4Y2hhbmdpbmcgYW4gQXV0aCBDb2RlIGlzc3VlZCBkdXJpbmcgdGhlIFBLQ0UgZmxvdy5cbiAgICAgKi9cbiAgICBhc3luYyBleGNoYW5nZUNvZGVGb3JTZXNzaW9uKGF1dGhDb2RlKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V4Y2hhbmdlQ29kZUZvclNlc3Npb24oYXV0aENvZGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgX2V4Y2hhbmdlQ29kZUZvclNlc3Npb24oYXV0aENvZGUpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZUl0ZW0gPSBhd2FpdCBnZXRJdGVtQXN5bmModGhpcy5zdG9yYWdlLCBgJHt0aGlzLnN0b3JhZ2VLZXl9LWNvZGUtdmVyaWZpZXJgKTtcbiAgICAgICAgY29uc3QgW2NvZGVWZXJpZmllciwgcmVkaXJlY3RUeXBlXSA9IChzdG9yYWdlSXRlbSAhPT0gbnVsbCAmJiBzdG9yYWdlSXRlbSAhPT0gdm9pZCAwID8gc3RvcmFnZUl0ZW0gOiAnJykuc3BsaXQoJy8nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L3Rva2VuP2dyYW50X3R5cGU9cGtjZWAsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICBhdXRoX2NvZGU6IGF1dGhDb2RlLFxuICAgICAgICAgICAgICAgICAgICBjb2RlX3ZlcmlmaWVyOiBjb2RlVmVyaWZpZXIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgcmVtb3ZlSXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgYCR7dGhpcy5zdG9yYWdlS2V5fS1jb2RlLXZlcmlmaWVyYCk7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGF0YSB8fCAhZGF0YS5zZXNzaW9uIHx8ICFkYXRhLnVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwsIHJlZGlyZWN0VHlwZTogbnVsbCB9LFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogbmV3IEF1dGhJbnZhbGlkVG9rZW5SZXNwb25zZUVycm9yKCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLnNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX25vdGlmeUFsbFN1YnNjcmliZXJzKCdTSUdORURfSU4nLCBkYXRhLnNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBkYXRhKSwgeyByZWRpcmVjdFR5cGU6IHJlZGlyZWN0VHlwZSAhPT0gbnVsbCAmJiByZWRpcmVjdFR5cGUgIT09IHZvaWQgMCA/IHJlZGlyZWN0VHlwZSA6IG51bGwgfSksIGVycm9yIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsLCByZWRpcmVjdFR5cGU6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsbG93cyBzaWduaW5nIGluIHdpdGggYW4gT0lEQyBJRCB0b2tlbi4gVGhlIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVyIHVzZWRcbiAgICAgKiBzaG91bGQgYmUgZW5hYmxlZCBhbmQgY29uZmlndXJlZC5cbiAgICAgKi9cbiAgICBhc3luYyBzaWduSW5XaXRoSWRUb2tlbihjcmVkZW50aWFscykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgeyBvcHRpb25zLCBwcm92aWRlciwgdG9rZW4sIGFjY2Vzc190b2tlbiwgbm9uY2UgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vdG9rZW4/Z3JhbnRfdHlwZT1pZF90b2tlbmAsIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcixcbiAgICAgICAgICAgICAgICAgICAgaWRfdG9rZW46IHRva2VuLFxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIG5vbmNlLFxuICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzO1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghZGF0YSB8fCAhZGF0YS5zZXNzaW9uIHx8ICFkYXRhLnVzZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG5ldyBBdXRoSW52YWxpZFRva2VuUmVzcG9uc2VFcnJvcigpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2cgaW4gYSB1c2VyIHVzaW5nIG1hZ2ljbGluayBvciBhIG9uZS10aW1lIHBhc3N3b3JkIChPVFApLlxuICAgICAqXG4gICAgICogSWYgdGhlIGB7eyAuQ29uZmlybWF0aW9uVVJMIH19YCB2YXJpYWJsZSBpcyBzcGVjaWZpZWQgaW4gdGhlIGVtYWlsIHRlbXBsYXRlLCBhIG1hZ2ljbGluayB3aWxsIGJlIHNlbnQuXG4gICAgICogSWYgdGhlIGB7eyAuVG9rZW4gfX1gIHZhcmlhYmxlIGlzIHNwZWNpZmllZCBpbiB0aGUgZW1haWwgdGVtcGxhdGUsIGFuIE9UUCB3aWxsIGJlIHNlbnQuXG4gICAgICogSWYgeW91J3JlIHVzaW5nIHBob25lIHNpZ24taW5zLCBvbmx5IGFuIE9UUCB3aWxsIGJlIHNlbnQuIFlvdSB3b24ndCBiZSBhYmxlIHRvIHNlbmQgYSBtYWdpY2xpbmsgZm9yIHBob25lIHNpZ24taW5zLlxuICAgICAqXG4gICAgICogQmUgYXdhcmUgdGhhdCB5b3UgbWF5IGdldCBiYWNrIGFuIGVycm9yIG1lc3NhZ2UgdGhhdCB3aWxsIG5vdCBkaXN0aW5ndWlzaFxuICAgICAqIGJldHdlZW4gdGhlIGNhc2VzIHdoZXJlIHRoZSBhY2NvdW50IGRvZXMgbm90IGV4aXN0IG9yLCB0aGF0IHRoZSBhY2NvdW50XG4gICAgICogY2FuIG9ubHkgYmUgYWNjZXNzZWQgdmlhIHNvY2lhbCBsb2dpbi5cbiAgICAgKlxuICAgICAqIERvIG5vdGUgdGhhdCB5b3Ugd2lsbCBuZWVkIHRvIGNvbmZpZ3VyZSBhIFdoYXRzYXBwIHNlbmRlciBvbiBUd2lsaW9cbiAgICAgKiBpZiB5b3UgYXJlIHVzaW5nIHBob25lIHNpZ24gaW4gd2l0aCB0aGUgJ3doYXRzYXBwJyBjaGFubmVsLiBUaGUgd2hhdHNhcHBcbiAgICAgKiBjaGFubmVsIGlzIG5vdCBzdXBwb3J0ZWQgb24gb3RoZXIgcHJvdmlkZXJzXG4gICAgICogYXQgdGhpcyB0aW1lLlxuICAgICAqIFRoaXMgbWV0aG9kIHN1cHBvcnRzIFBLQ0Ugd2hlbiBhbiBlbWFpbCBpcyBwYXNzZWQuXG4gICAgICovXG4gICAgYXN5bmMgc2lnbkluV2l0aE90cChjcmVkZW50aWFscykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCdlbWFpbCcgaW4gY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGVtYWlsLCBvcHRpb25zIH0gPSBjcmVkZW50aWFscztcbiAgICAgICAgICAgICAgICBsZXQgY29kZUNoYWxsZW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IGNvZGVDaGFsbGVuZ2VNZXRob2QgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZsb3dUeXBlID09PSAncGtjZScpIHtcbiAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICBbY29kZUNoYWxsZW5nZSwgY29kZUNoYWxsZW5nZU1ldGhvZF0gPSBhd2FpdCBnZXRDb2RlQ2hhbGxlbmdlQW5kTWV0aG9kKHRoaXMuc3RvcmFnZSwgdGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vb3RwYCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmRhdGEpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlX3VzZXI6IChfYiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5zaG91bGRDcmVhdGVVc2VyKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNhcHRjaGFUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2U6IGNvZGVDaGFsbGVuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlX2NoYWxsZW5nZV9tZXRob2Q6IGNvZGVDaGFsbGVuZ2VNZXRob2QsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5lbWFpbFJlZGlyZWN0VG8sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJ3Bob25lJyBpbiBjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGhvbmUsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L290cGAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IChfYyA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kYXRhKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZV91c2VyOiAoX2QgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuc2hvdWxkQ3JlYXRlVXNlcikgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5uZWw6IChfZSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jaGFubmVsKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiAnc21zJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwsIG1lc3NhZ2VJZDogZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLm1lc3NhZ2VfaWQgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgZWl0aGVyIGFuIGVtYWlsIG9yIHBob25lIG51bWJlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvZyBpbiBhIHVzZXIgZ2l2ZW4gYSBVc2VyIHN1cHBsaWVkIE9UUCBvciBUb2tlbkhhc2ggcmVjZWl2ZWQgdGhyb3VnaCBtb2JpbGUgb3IgZW1haWwuXG4gICAgICovXG4gICAgYXN5bmMgdmVyaWZ5T3RwKHBhcmFtcykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHJlZGlyZWN0VG8gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBsZXQgY2FwdGNoYVRva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKCdvcHRpb25zJyBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvID0gKF9hID0gcGFyYW1zLm9wdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZWRpcmVjdFRvO1xuICAgICAgICAgICAgICAgIGNhcHRjaGFUb2tlbiA9IChfYiA9IHBhcmFtcy5vcHRpb25zKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FwdGNoYVRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vdmVyaWZ5YCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICBib2R5OiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcyksIHsgZ290cnVlX21ldGFfc2VjdXJpdHk6IHsgY2FwdGNoYV90b2tlbjogY2FwdGNoYVRva2VuIH0gfSksXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbyxcbiAgICAgICAgICAgICAgICB4Zm9ybTogX3Nlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkIG9uIHRva2VuIHZlcmlmaWNhdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBkYXRhLnNlc3Npb247XG4gICAgICAgICAgICBjb25zdCB1c2VyID0gZGF0YS51c2VyO1xuICAgICAgICAgICAgaWYgKHNlc3Npb24gPT09IG51bGwgfHwgc2Vzc2lvbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbi5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycyhwYXJhbXMudHlwZSA9PSAncmVjb3ZlcnknID8gJ1BBU1NXT1JEX1JFQ09WRVJZJyA6ICdTSUdORURfSU4nLCBzZXNzaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlciwgc2Vzc2lvbiB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdHMgYSBzaW5nbGUtc2lnbiBvbiB1c2luZyBhbiBlbnRlcnByaXNlIElkZW50aXR5IFByb3ZpZGVyLiBBXG4gICAgICogc3VjY2Vzc2Z1bCBTU08gYXR0ZW1wdCB3aWxsIHJlZGlyZWN0IHRoZSBjdXJyZW50IHBhZ2UgdG8gdGhlIGlkZW50aXR5XG4gICAgICogcHJvdmlkZXIgYXV0aG9yaXphdGlvbiBwYWdlLiBUaGUgcmVkaXJlY3QgVVJMIGlzIGltcGxlbWVudGF0aW9uIGFuZCBTU09cbiAgICAgKiBwcm90b2NvbCBzcGVjaWZpYy5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gdXNlIGl0IGJ5IHByb3ZpZGluZyBhIFNTTyBkb21haW4uIFR5cGljYWxseSB5b3UgY2FuIGV4dHJhY3QgdGhpc1xuICAgICAqIGRvbWFpbiBieSBhc2tpbmcgdXNlcnMgZm9yIHRoZWlyIGVtYWlsIGFkZHJlc3MuIElmIHRoaXMgZG9tYWluIGlzXG4gICAgICogcmVnaXN0ZXJlZCBvbiB0aGUgQXV0aCBpbnN0YW5jZSB0aGUgcmVkaXJlY3Qgd2lsbCB1c2UgdGhhdCBvcmdhbml6YXRpb24nc1xuICAgICAqIGN1cnJlbnRseSBhY3RpdmUgU1NPIElkZW50aXR5IFByb3ZpZGVyIGZvciB0aGUgbG9naW4uXG4gICAgICpcbiAgICAgKiBJZiB5b3UgaGF2ZSBidWlsdCBhbiBvcmdhbml6YXRpb24tc3BlY2lmaWMgbG9naW4gcGFnZSwgeW91IGNhbiB1c2UgdGhlXG4gICAgICogb3JnYW5pemF0aW9uJ3MgU1NPIElkZW50aXR5IFByb3ZpZGVyIFVVSUQgZGlyZWN0bHkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBhc3luYyBzaWduSW5XaXRoU1NPKHBhcmFtcykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLmZsb3dUeXBlID09PSAncGtjZScpIHtcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgW2NvZGVDaGFsbGVuZ2UsIGNvZGVDaGFsbGVuZ2VNZXRob2RdID0gYXdhaXQgZ2V0Q29kZUNoYWxsZW5nZUFuZE1ldGhvZCh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vc3NvYCwge1xuICAgICAgICAgICAgICAgIGJvZHk6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgKCdwcm92aWRlcklkJyBpbiBwYXJhbXMgPyB7IHByb3ZpZGVyX2lkOiBwYXJhbXMucHJvdmlkZXJJZCB9IDogbnVsbCkpLCAoJ2RvbWFpbicgaW4gcGFyYW1zID8geyBkb21haW46IHBhcmFtcy5kb21haW4gfSA6IG51bGwpKSwgeyByZWRpcmVjdF90bzogKF9iID0gKF9hID0gcGFyYW1zLm9wdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZWRpcmVjdFRvKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB1bmRlZmluZWQgfSksICgoKF9jID0gcGFyYW1zID09PSBudWxsIHx8IHBhcmFtcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyYW1zLm9wdGlvbnMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5jYXB0Y2hhVG9rZW4pXG4gICAgICAgICAgICAgICAgICAgID8geyBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBwYXJhbXMub3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSB9XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbCkpLCB7IHNraXBfaHR0cF9yZWRpcmVjdDogdHJ1ZSwgY29kZV9jaGFsbGVuZ2U6IGNvZGVDaGFsbGVuZ2UsIGNvZGVfY2hhbGxlbmdlX21ldGhvZDogY29kZUNoYWxsZW5nZU1ldGhvZCB9KSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgeGZvcm06IF9zc29SZXNwb25zZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHJlYXV0aGVudGljYXRpb24gT1RQIHRvIHRoZSB1c2VyJ3MgZW1haWwgb3IgcGhvbmUgbnVtYmVyLlxuICAgICAqIFJlcXVpcmVzIHRoZSB1c2VyIHRvIGJlIHNpZ25lZC1pbi5cbiAgICAgKi9cbiAgICBhc3luYyByZWF1dGhlbnRpY2F0ZSgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcmVhdXRoZW50aWNhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIF9yZWF1dGhlbnRpY2F0ZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHsgc2Vzc2lvbiB9LCBlcnJvcjogc2Vzc2lvbkVycm9yLCB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uRXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IHNlc3Npb25FcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAoIXNlc3Npb24pXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdHRVQnLCBgJHt0aGlzLnVybH0vcmVhdXRoZW50aWNhdGVgLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgand0OiBzZXNzaW9uLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZW5kcyBhbiBleGlzdGluZyBzaWdudXAgY29uZmlybWF0aW9uIGVtYWlsLCBlbWFpbCBjaGFuZ2UgZW1haWwsIFNNUyBPVFAgb3IgcGhvbmUgY2hhbmdlIE9UUC5cbiAgICAgKi9cbiAgICBhc3luYyByZXNlbmQoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGVuZHBvaW50ID0gYCR7dGhpcy51cmx9L3Jlc2VuZGA7XG4gICAgICAgICAgICBpZiAoJ2VtYWlsJyBpbiBjcmVkZW50aWFscykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZW1haWwsIHR5cGUsIG9wdGlvbnMgfSA9IGNyZWRlbnRpYWxzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgZW5kcG9pbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBnb3RydWVfbWV0YV9zZWN1cml0eTogeyBjYXB0Y2hhX3Rva2VuOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0VG86IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5lbWFpbFJlZGlyZWN0VG8sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgncGhvbmUnIGluIGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBwaG9uZSwgdHlwZSwgb3B0aW9ucyB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBlbmRwb2ludCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jYXB0Y2hhVG9rZW4gfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwsIG1lc3NhZ2VJZDogZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLm1lc3NhZ2VfaWQgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZENyZWRlbnRpYWxzRXJyb3IoJ1lvdSBtdXN0IHByb3ZpZGUgZWl0aGVyIGFuIGVtYWlsIG9yIHBob25lIG51bWJlciBhbmQgYSB0eXBlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXNzaW9uLCByZWZyZXNoaW5nIGl0IGlmIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIFRoZSBzZXNzaW9uIHJldHVybmVkIGNhbiBiZSBudWxsIGlmIHRoZSBzZXNzaW9uIGlzIG5vdCBkZXRlY3RlZCB3aGljaCBjYW4gaGFwcGVuIGluIHRoZSBldmVudCBhIHVzZXIgaXMgbm90IHNpZ25lZC1pbiBvciBoYXMgbG9nZ2VkIG91dC5cbiAgICAgKlxuICAgICAqICoqSU1QT1JUQU5UOioqIFRoaXMgbWV0aG9kIGxvYWRzIHZhbHVlcyBkaXJlY3RseSBmcm9tIHRoZSBzdG9yYWdlIGF0dGFjaGVkXG4gICAgICogdG8gdGhlIGNsaWVudC4gSWYgdGhhdCBzdG9yYWdlIGlzIGJhc2VkIG9uIHJlcXVlc3QgY29va2llcyBmb3IgZXhhbXBsZSxcbiAgICAgKiB0aGUgdmFsdWVzIGluIGl0IG1heSBub3QgYmUgYXV0aGVudGljIGFuZCB0aGVyZWZvcmUgaXQncyBzdHJvbmdseSBhZHZpc2VkXG4gICAgICogYWdhaW5zdCB1c2luZyB0aGlzIG1ldGhvZCBhbmQgaXRzIHJlc3VsdHMgaW4gc3VjaCBjaXJjdW1zdGFuY2VzLiBBIHdhcm5pbmdcbiAgICAgKiB3aWxsIGJlIGVtaXR0ZWQgaWYgdGhpcyBpcyBkZXRlY3RlZC4gVXNlIHtAbGluayAjZ2V0VXNlcigpfSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldFNlc3Npb24oKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWNxdWlyZXMgYSBnbG9iYWwgbG9jayBiYXNlZCBvbiB0aGUgc3RvcmFnZSBrZXkuXG4gICAgICovXG4gICAgYXN5bmMgX2FjcXVpcmVMb2NrKGFjcXVpcmVUaW1lb3V0LCBmbikge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI19hY3F1aXJlTG9jaycsICdiZWdpbicsIGFjcXVpcmVUaW1lb3V0KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxvY2tBY3F1aXJlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3QgPSB0aGlzLnBlbmRpbmdJbkxvY2subGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5wZW5kaW5nSW5Mb2NrW3RoaXMucGVuZGluZ0luTG9jay5sZW5ndGggLSAxXVxuICAgICAgICAgICAgICAgICAgICA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGxhc3Q7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBmbigpO1xuICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wZW5kaW5nSW5Mb2NrLnB1c2goKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UganVzdCBjYXJlIGlmIGl0IGZpbmlzaGVkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubG9jayhgbG9jazoke3RoaXMuc3RvcmFnZUtleX1gLCBhY3F1aXJlVGltZW91dCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2FjcXVpcmVMb2NrJywgJ2xvY2sgYWNxdWlyZWQgZm9yIHN0b3JhZ2Uga2V5JywgdGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2tBY3F1aXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZuKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0luTG9jay5wdXNoKChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UganVzdCBjYXJlIGlmIGl0IGZpbmlzaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKCkpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIGtlZXAgZHJhaW5pbmcgdGhlIHF1ZXVlIHVudGlsIHRoZXJlJ3Mgbm90aGluZyB0byB3YWl0IG9uXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLnBlbmRpbmdJbkxvY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3YWl0T24gPSBbLi4udGhpcy5wZW5kaW5nSW5Mb2NrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHdhaXRPbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdJbkxvY2suc3BsaWNlKDAsIHdhaXRPbi5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19hY3F1aXJlTG9jaycsICdsb2NrIHJlbGVhc2VkIGZvciBzdG9yYWdlIGtleScsIHRoaXMuc3RvcmFnZUtleSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9ja0FjcXVpcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19hY3F1aXJlTG9jaycsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2UgaW5zdGVhZCBvZiB7QGxpbmsgI2dldFNlc3Npb259IGluc2lkZSB0aGUgbGlicmFyeS4gSXQgaXNcbiAgICAgKiBzZW1hbnRpY2FsbHkgdXN1YWxseSB3aGF0IHlvdSB3YW50LCBhcyBnZXR0aW5nIGEgc2Vzc2lvbiBpbnZvbHZlcyBzb21lXG4gICAgICogcHJvY2Vzc2luZyBhZnRlcndhcmRzIHRoYXQgcmVxdWlyZXMgb25seSBvbmUgY2xpZW50IG9wZXJhdGluZyBvbiB0aGVcbiAgICAgKiBzZXNzaW9uIGF0IG9uY2UgYWNyb3NzIG11bHRpcGxlIHRhYnMgb3IgcHJvY2Vzc2VzLlxuICAgICAqL1xuICAgIGFzeW5jIF91c2VTZXNzaW9uKGZuKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX3VzZVNlc3Npb24nLCAnYmVnaW4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIHRoZSB1c2Ugb2YgX19sb2FkU2Vzc2lvbiBoZXJlIGlzIHRoZSBvbmx5IGNvcnJlY3QgdXNlIG9mIHRoZSBmdW5jdGlvbiFcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX19sb2FkU2Vzc2lvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGZuKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI191c2VTZXNzaW9uJywgJ2VuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5FVkVSIFVTRSBESVJFQ1RMWSFcbiAgICAgKlxuICAgICAqIEFsd2F5cyB1c2Uge0BsaW5rICNfdXNlU2Vzc2lvbn0uXG4gICAgICovXG4gICAgYXN5bmMgX19sb2FkU2Vzc2lvbigpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfX2xvYWRTZXNzaW9uKCknLCAnYmVnaW4nKTtcbiAgICAgICAgaWYgKCF0aGlzLmxvY2tBY3F1aXJlZCkge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfX2xvYWRTZXNzaW9uKCknLCAndXNlZCBvdXRzaWRlIG9mIGFuIGFjcXVpcmVkIGxvY2shJywgbmV3IEVycm9yKCkuc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudFNlc3Npb24gPSBudWxsO1xuICAgICAgICAgICAgY29uc3QgbWF5YmVTZXNzaW9uID0gYXdhaXQgZ2V0SXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgdGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjZ2V0U2Vzc2lvbigpJywgJ3Nlc3Npb24gZnJvbSBzdG9yYWdlJywgbWF5YmVTZXNzaW9uKTtcbiAgICAgICAgICAgIGlmIChtYXliZVNlc3Npb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNWYWxpZFNlc3Npb24obWF5YmVTZXNzaW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2Vzc2lvbiA9IG1heWJlU2Vzc2lvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjZ2V0U2Vzc2lvbigpJywgJ3Nlc3Npb24gZnJvbSBzdG9yYWdlIGlzIG5vdCB2YWxpZCcpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjdXJyZW50U2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQSBzZXNzaW9uIGlzIGNvbnNpZGVyZWQgZXhwaXJlZCBiZWZvcmUgdGhlIGFjY2VzcyB0b2tlbiBfYWN0dWFsbHlfXG4gICAgICAgICAgICAvLyBleHBpcmVzLiBXaGVuIHRoZSBhdXRvUmVmcmVzaFRva2VuIG9wdGlvbiBpcyBvZmYgKG9yIHdoZW4gdGhlIHRhYiBpc1xuICAgICAgICAgICAgLy8gaW4gdGhlIGJhY2tncm91bmQpLCB2ZXJ5IGVhZ2VyIHVzZXJzIG9mIGdldFNlc3Npb24oKSAtLSBsaWtlXG4gICAgICAgICAgICAvLyByZWFsdGltZS1qcyAtLSBtaWdodCBzZW5kIGEgdmFsaWQgSldUIHdoaWNoIHdpbGwgZXhwaXJlIGJ5IHRoZSB0aW1lIGl0XG4gICAgICAgICAgICAvLyByZWFjaGVzIHRoZSBzZXJ2ZXIuXG4gICAgICAgICAgICBjb25zdCBoYXNFeHBpcmVkID0gY3VycmVudFNlc3Npb24uZXhwaXJlc19hdFxuICAgICAgICAgICAgICAgID8gY3VycmVudFNlc3Npb24uZXhwaXJlc19hdCAqIDEwMDAgLSBEYXRlLm5vdygpIDwgRVhQSVJZX01BUkdJTl9NU1xuICAgICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19fbG9hZFNlc3Npb24oKScsIGBzZXNzaW9uIGhhcyR7aGFzRXhwaXJlZCA/ICcnIDogJyBub3QnfSBleHBpcmVkYCwgJ2V4cGlyZXNfYXQnLCBjdXJyZW50U2Vzc2lvbi5leHBpcmVzX2F0KTtcbiAgICAgICAgICAgIGlmICghaGFzRXhwaXJlZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0b3JhZ2UuaXNTZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1cHByZXNzV2FybmluZyA9IHRoaXMuc3VwcHJlc3NHZXRTZXNzaW9uV2FybmluZztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJveHlTZXNzaW9uID0gbmV3IFByb3h5KGN1cnJlbnRTZXNzaW9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdXBwcmVzc1dhcm5pbmcgJiYgcHJvcCA9PT0gJ3VzZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9ubHkgc2hvdyB3YXJuaW5nIHdoZW4gdGhlIHVzZXIgb2JqZWN0IGlzIGJlaW5nIGFjY2Vzc2VkIGZyb20gdGhlIHNlcnZlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VzaW5nIHRoZSB1c2VyIG9iamVjdCBhcyByZXR1cm5lZCBmcm9tIHN1cGFiYXNlLmF1dGguZ2V0U2Vzc2lvbigpIG9yIGZyb20gc29tZSBzdXBhYmFzZS5hdXRoLm9uQXV0aFN0YXRlQ2hhbmdlKCkgZXZlbnRzIGNvdWxkIGJlIGluc2VjdXJlISBUaGlzIHZhbHVlIGNvbWVzIGRpcmVjdGx5IGZyb20gdGhlIHN0b3JhZ2UgbWVkaXVtICh1c3VhbGx5IGNvb2tpZXMgb24gdGhlIHNlcnZlcikgYW5kIG1heSBub3QgYmUgYXV0aGVudGljLiBVc2Ugc3VwYWJhc2UuYXV0aC5nZXRVc2VyKCkgaW5zdGVhZCB3aGljaCBhdXRoZW50aWNhdGVzIHRoZSBkYXRhIGJ5IGNvbnRhY3RpbmcgdGhlIFN1cGFiYXNlIEF1dGggc2VydmVyLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwcmVzc1dhcm5pbmcgPSB0cnVlOyAvLyBrZWVwcyB0aGlzIHByb3h5IGluc3RhbmNlIGZyb20gbG9nZ2luZyBhZGRpdGlvbmFsIHdhcm5pbmdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VwcHJlc3NHZXRTZXNzaW9uV2FybmluZyA9IHRydWU7IC8vIGtlZXBzIHRoaXMgY2xpZW50J3MgZnV0dXJlIHByb3h5IGluc3RhbmNlcyBmcm9tIHdhcm5pbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZXNzaW9uID0gcHJveHlTZXNzaW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb246IGN1cnJlbnRTZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IHNlc3Npb24sIGVycm9yIH0gPSBhd2FpdCB0aGlzLl9jYWxsUmVmcmVzaFRva2VuKGN1cnJlbnRTZXNzaW9uLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb24gfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX19sb2FkU2Vzc2lvbigpJywgJ2VuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGN1cnJlbnQgdXNlciBkZXRhaWxzIGlmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIHNlc3Npb24uIFRoaXMgbWV0aG9kXG4gICAgICogcGVyZm9ybXMgYSBuZXR3b3JrIHJlcXVlc3QgdG8gdGhlIFN1cGFiYXNlIEF1dGggc2VydmVyLCBzbyB0aGUgcmV0dXJuZWRcbiAgICAgKiB2YWx1ZSBpcyBhdXRoZW50aWMgYW5kIGNhbiBiZSB1c2VkIHRvIGJhc2UgYXV0aG9yaXphdGlvbiBydWxlcyBvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBqd3QgVGFrZXMgaW4gYW4gb3B0aW9uYWwgYWNjZXNzIHRva2VuIEpXVC4gSWYgbm8gSldUIGlzIHByb3ZpZGVkLCB0aGUgSldUIGZyb20gdGhlIGN1cnJlbnQgc2Vzc2lvbiBpcyB1c2VkLlxuICAgICAqL1xuICAgIGFzeW5jIGdldFVzZXIoand0KSB7XG4gICAgICAgIGlmIChqd3QpIHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9nZXRVc2VyKGp3dCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9nZXRVc2VyKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBhc3luYyBfZ2V0VXNlcihqd3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChqd3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0dFVCcsIGAke3RoaXMudXJsfS91c2VyYCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGp3dDogand0LFxuICAgICAgICAgICAgICAgICAgICB4Zm9ybTogX3VzZXJSZXNwb25zZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyByZXR1cm5zIGFuIGVycm9yIGlmIHRoZXJlIGlzIG5vIGFjY2Vzc190b2tlbiBvciBjdXN0b20gYXV0aG9yaXphdGlvbiBoZWFkZXJcbiAgICAgICAgICAgICAgICBpZiAoISgoX2EgPSBkYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW4pICYmICF0aGlzLmhhc0N1c3RvbUF1dGhvcml6YXRpb25IZWFkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsIH0sIGVycm9yOiBuZXcgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoKSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0dFVCcsIGAke3RoaXMudXJsfS91c2VyYCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGp3dDogKF9jID0gKF9iID0gZGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuYWNjZXNzX3Rva2VuKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEpXVCBjb250YWlucyBhIGBzZXNzaW9uX2lkYCB3aGljaCBkb2VzIG5vdCBjb3JyZXNwb25kIHRvIGFuIGFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAvLyBzZXNzaW9uIGluIHRoZSBkYXRhYmFzZSwgaW5kaWNhdGluZyB0aGUgdXNlciBpcyBzaWduZWQgb3V0LlxuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlbW92ZUl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIGAke3RoaXMuc3RvcmFnZUtleX0tY29kZS12ZXJpZmllcmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdXNlciBkYXRhIGZvciBhIGxvZ2dlZCBpbiB1c2VyLlxuICAgICAqL1xuICAgIGFzeW5jIHVwZGF0ZVVzZXIoYXR0cmlidXRlcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VwZGF0ZVVzZXIoYXR0cmlidXRlcywgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBfdXBkYXRlVXNlcihhdHRyaWJ1dGVzLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHNlc3Npb25EYXRhLCBlcnJvcjogc2Vzc2lvbkVycm9yIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBzZXNzaW9uRXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghc2Vzc2lvbkRhdGEuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IHNlc3Npb25EYXRhLnNlc3Npb247XG4gICAgICAgICAgICAgICAgbGV0IGNvZGVDaGFsbGVuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mbG93VHlwZSA9PT0gJ3BrY2UnICYmIGF0dHJpYnV0ZXMuZW1haWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgIFtjb2RlQ2hhbGxlbmdlLCBjb2RlQ2hhbGxlbmdlTWV0aG9kXSA9IGF3YWl0IGdldENvZGVDaGFsbGVuZ2VBbmRNZXRob2QodGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yOiB1c2VyRXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQVVQnLCBgJHt0aGlzLnVybH0vdXNlcmAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZW1haWxSZWRpcmVjdFRvLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGF0dHJpYnV0ZXMpLCB7IGNvZGVfY2hhbGxlbmdlOiBjb2RlQ2hhbGxlbmdlLCBjb2RlX2NoYWxsZW5nZV9tZXRob2Q6IGNvZGVDaGFsbGVuZ2VNZXRob2QgfSksXG4gICAgICAgICAgICAgICAgICAgIGp3dDogc2Vzc2lvbi5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfdXNlclJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyRXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IHVzZXJFcnJvcjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnVzZXIgPSBkYXRhLnVzZXI7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ1VTRVJfVVBEQVRFRCcsIHNlc3Npb24pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogc2Vzc2lvbi51c2VyIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHNlc3Npb24gZGF0YSBmcm9tIHRoZSBjdXJyZW50IHNlc3Npb24uIElmIHRoZSBjdXJyZW50IHNlc3Npb24gaXMgZXhwaXJlZCwgc2V0U2Vzc2lvbiB3aWxsIHRha2UgY2FyZSBvZiByZWZyZXNoaW5nIGl0IHRvIG9idGFpbiBhIG5ldyBzZXNzaW9uLlxuICAgICAqIElmIHRoZSByZWZyZXNoIHRva2VuIG9yIGFjY2VzcyB0b2tlbiBpbiB0aGUgY3VycmVudCBzZXNzaW9uIGlzIGludmFsaWQsIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICAgICAqIEBwYXJhbSBjdXJyZW50U2Vzc2lvbiBUaGUgY3VycmVudCBzZXNzaW9uIHRoYXQgbWluaW1hbGx5IGNvbnRhaW5zIGFuIGFjY2VzcyB0b2tlbiBhbmQgcmVmcmVzaCB0b2tlbi5cbiAgICAgKi9cbiAgICBhc3luYyBzZXRTZXNzaW9uKGN1cnJlbnRTZXNzaW9uKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdGlhbGl6ZVByb21pc2U7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3NldFNlc3Npb24oY3VycmVudFNlc3Npb24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgX3NldFNlc3Npb24oY3VycmVudFNlc3Npb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghY3VycmVudFNlc3Npb24uYWNjZXNzX3Rva2VuIHx8ICFjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0aW1lTm93ID0gRGF0ZS5ub3coKSAvIDEwMDA7XG4gICAgICAgICAgICBsZXQgZXhwaXJlc0F0ID0gdGltZU5vdztcbiAgICAgICAgICAgIGxldCBoYXNFeHBpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBzZXNzaW9uID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gZGVjb2RlSldUKGN1cnJlbnRTZXNzaW9uLmFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5leHApIHtcbiAgICAgICAgICAgICAgICBleHBpcmVzQXQgPSBwYXlsb2FkLmV4cDtcbiAgICAgICAgICAgICAgICBoYXNFeHBpcmVkID0gZXhwaXJlc0F0IDw9IHRpbWVOb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzRXhwaXJlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc2Vzc2lvbjogcmVmcmVzaGVkU2Vzc2lvbiwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuX2NhbGxSZWZyZXNoVG9rZW4oY3VycmVudFNlc3Npb24ucmVmcmVzaF90b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZWZyZXNoZWRTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogbnVsbCwgc2Vzc2lvbjogbnVsbCB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXNzaW9uID0gcmVmcmVzaGVkU2Vzc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuX2dldFVzZXIoY3VycmVudFNlc3Npb24uYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlc3Npb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogY3VycmVudFNlc3Npb24uYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiBjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICB1c2VyOiBkYXRhLnVzZXIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuX3R5cGU6ICdiZWFyZXInLFxuICAgICAgICAgICAgICAgICAgICBleHBpcmVzX2luOiBleHBpcmVzQXQgLSB0aW1lTm93LFxuICAgICAgICAgICAgICAgICAgICBleHBpcmVzX2F0OiBleHBpcmVzQXQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zYXZlU2Vzc2lvbihzZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgc2Vzc2lvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IHNlc3Npb24udXNlciwgc2Vzc2lvbiB9LCBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbjogbnVsbCwgdXNlcjogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBzZXNzaW9uLCByZWdhcmRsZXNzIG9mIGV4cGlyeSBzdGF0dXMuXG4gICAgICogVGFrZXMgaW4gYW4gb3B0aW9uYWwgY3VycmVudCBzZXNzaW9uLiBJZiBub3QgcGFzc2VkIGluLCB0aGVuIHJlZnJlc2hTZXNzaW9uKCkgd2lsbCBhdHRlbXB0IHRvIHJldHJpZXZlIGl0IGZyb20gZ2V0U2Vzc2lvbigpLlxuICAgICAqIElmIHRoZSBjdXJyZW50IHNlc3Npb24ncyByZWZyZXNoIHRva2VuIGlzIGludmFsaWQsIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICAgICAqIEBwYXJhbSBjdXJyZW50U2Vzc2lvbiBUaGUgY3VycmVudCBzZXNzaW9uLiBJZiBwYXNzZWQgaW4sIGl0IG11c3QgY29udGFpbiBhIHJlZnJlc2ggdG9rZW4uXG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaFNlc3Npb24oY3VycmVudFNlc3Npb24pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2FjcXVpcmVMb2NrKC0xLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcmVmcmVzaFNlc3Npb24oY3VycmVudFNlc3Npb24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgX3JlZnJlc2hTZXNzaW9uKGN1cnJlbnRTZXNzaW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlmICghY3VycmVudFNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTZXNzaW9uID0gKF9hID0gZGF0YS5zZXNzaW9uKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghKGN1cnJlbnRTZXNzaW9uID09PSBudWxsIHx8IGN1cnJlbnRTZXNzaW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgeyBzZXNzaW9uLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5fY2FsbFJlZnJlc2hUb2tlbihjdXJyZW50U2Vzc2lvbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yOiBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyB1c2VyOiBudWxsLCBzZXNzaW9uOiBudWxsIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgdXNlcjogc2Vzc2lvbi51c2VyLCBzZXNzaW9uIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHVzZXI6IG51bGwsIHNlc3Npb246IG51bGwgfSwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHNlc3Npb24gZGF0YSBmcm9tIGEgVVJMIHN0cmluZ1xuICAgICAqL1xuICAgIGFzeW5jIF9nZXRTZXNzaW9uRnJvbVVSTChwYXJhbXMsIGNhbGxiYWNrVXJsVHlwZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFpc0Jyb3dzZXIoKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yKCdObyBicm93c2VyIGRldGVjdGVkLicpO1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhbiBlcnJvciBpbiB0aGUgVVJMLCBpdCBkb2Vzbid0IG1hdHRlciB3aGF0IGZsb3cgaXQgaXMsIHdlIGp1c3QgcmV0dXJuIHRoZSBlcnJvci5cbiAgICAgICAgICAgIGlmIChwYXJhbXMuZXJyb3IgfHwgcGFyYW1zLmVycm9yX2Rlc2NyaXB0aW9uIHx8IHBhcmFtcy5lcnJvcl9jb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGVycm9yIGNsYXNzIHJldHVybmVkIGltcGxpZXMgdGhhdCB0aGUgcmVkaXJlY3QgaXMgZnJvbSBhbiBpbXBsaWNpdCBncmFudCBmbG93XG4gICAgICAgICAgICAgICAgLy8gYnV0IGl0IGNvdWxkIGFsc28gYmUgZnJvbSBhIHJlZGlyZWN0IGVycm9yIGZyb20gYSBQS0NFIGZsb3cuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvcihwYXJhbXMuZXJyb3JfZGVzY3JpcHRpb24gfHwgJ0Vycm9yIGluIFVSTCB3aXRoIHVuc3BlY2lmaWVkIGVycm9yX2Rlc2NyaXB0aW9uJywge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogcGFyYW1zLmVycm9yIHx8ICd1bnNwZWNpZmllZF9lcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IHBhcmFtcy5lcnJvcl9jb2RlIHx8ICd1bnNwZWNpZmllZF9jb2RlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrcyBmb3IgbWlzbWF0Y2hlcyBiZXR3ZWVuIHRoZSBmbG93VHlwZSBpbml0aWFsaXNlZCBpbiB0aGUgY2xpZW50IGFuZCB0aGUgVVJMIHBhcmFtZXRlcnNcbiAgICAgICAgICAgIHN3aXRjaCAoY2FsbGJhY2tVcmxUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW1wbGljaXQnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mbG93VHlwZSA9PT0gJ3BrY2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFBLQ0VHcmFudENvZGVFeGNoYW5nZUVycm9yKCdOb3QgYSB2YWxpZCBQS0NFIGZsb3cgdXJsLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BrY2UnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mbG93VHlwZSA9PT0gJ2ltcGxpY2l0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbXBsaWNpdEdyYW50UmVkaXJlY3RFcnJvcignTm90IGEgdmFsaWQgaW1wbGljaXQgZ3JhbnQgZmxvdyB1cmwuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSdzIG5vIG1pc21hdGNoIHNvIHdlIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTaW5jZSB0aGlzIGlzIGEgcmVkaXJlY3QgZm9yIFBLQ0UsIHdlIGF0dGVtcHQgdG8gcmV0cmlldmUgdGhlIGNvZGUgZnJvbSB0aGUgVVJMIGZvciB0aGUgY29kZSBleGNoYW5nZVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrVXJsVHlwZSA9PT0gJ3BrY2UnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfaW5pdGlhbGl6ZSgpJywgJ2JlZ2luJywgJ2lzIFBLQ0UgZmxvdycsIHRydWUpO1xuICAgICAgICAgICAgICAgIGlmICghcGFyYW1zLmNvZGUpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoUEtDRUdyYW50Q29kZUV4Y2hhbmdlRXJyb3IoJ05vIGNvZGUgZGV0ZWN0ZWQuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5fZXhjaGFuZ2VDb2RlRm9yU2Vzc2lvbihwYXJhbXMuY29kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLmRlbGV0ZSgnY29kZScpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh3aW5kb3cuaGlzdG9yeS5zdGF0ZSwgJycsIHVybC50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb246IGRhdGEuc2Vzc2lvbiwgcmVkaXJlY3RUeXBlOiBudWxsIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IHByb3ZpZGVyX3Rva2VuLCBwcm92aWRlcl9yZWZyZXNoX3Rva2VuLCBhY2Nlc3NfdG9rZW4sIHJlZnJlc2hfdG9rZW4sIGV4cGlyZXNfaW4sIGV4cGlyZXNfYXQsIHRva2VuX3R5cGUsIH0gPSBwYXJhbXM7XG4gICAgICAgICAgICBpZiAoIWFjY2Vzc190b2tlbiB8fCAhZXhwaXJlc19pbiB8fCAhcmVmcmVzaF90b2tlbiB8fCAhdG9rZW5fdHlwZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IoJ05vIHNlc3Npb24gZGVmaW5lZCBpbiBVUkwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRpbWVOb3cgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgIGNvbnN0IGV4cGlyZXNJbiA9IHBhcnNlSW50KGV4cGlyZXNfaW4pO1xuICAgICAgICAgICAgbGV0IGV4cGlyZXNBdCA9IHRpbWVOb3cgKyBleHBpcmVzSW47XG4gICAgICAgICAgICBpZiAoZXhwaXJlc19hdCkge1xuICAgICAgICAgICAgICAgIGV4cGlyZXNBdCA9IHBhcnNlSW50KGV4cGlyZXNfYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYWN0dWFsbHlFeHBpcmVzSW4gPSBleHBpcmVzQXQgLSB0aW1lTm93O1xuICAgICAgICAgICAgaWYgKGFjdHVhbGx5RXhwaXJlc0luICogMTAwMCA8PSBBVVRPX1JFRlJFU0hfVElDS19EVVJBVElPTl9NUykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgQHN1cGFiYXNlL2dvdHJ1ZS1qczogU2Vzc2lvbiBhcyByZXRyaWV2ZWQgZnJvbSBVUkwgZXhwaXJlcyBpbiAke2FjdHVhbGx5RXhwaXJlc0lufXMsIHNob3VsZCBoYXZlIGJlZW4gY2xvc2VyIHRvICR7ZXhwaXJlc0lufXNgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGlzc3VlZEF0ID0gZXhwaXJlc0F0IC0gZXhwaXJlc0luO1xuICAgICAgICAgICAgaWYgKHRpbWVOb3cgLSBpc3N1ZWRBdCA+PSAxMjApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0BzdXBhYmFzZS9nb3RydWUtanM6IFNlc3Npb24gYXMgcmV0cmlldmVkIGZyb20gVVJMIHdhcyBpc3N1ZWQgb3ZlciAxMjBzIGFnbywgVVJMIGNvdWxkIGJlIHN0YWxlJywgaXNzdWVkQXQsIGV4cGlyZXNBdCwgdGltZU5vdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aW1lTm93IC0gaXNzdWVkQXQgPCAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdAc3VwYWJhc2UvZ290cnVlLWpzOiBTZXNzaW9uIGFzIHJldHJpZXZlZCBmcm9tIFVSTCB3YXMgaXNzdWVkIGluIHRoZSBmdXR1cmU/IENoZWNrIHRoZSBkZXZpY2UgY2xvY2sgZm9yIHNrZXcnLCBpc3N1ZWRBdCwgZXhwaXJlc0F0LCB0aW1lTm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuX2dldFVzZXIoYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXJfdG9rZW4sXG4gICAgICAgICAgICAgICAgcHJvdmlkZXJfcmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgICAgICBhY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgZXhwaXJlc19pbjogZXhwaXJlc0luLFxuICAgICAgICAgICAgICAgIGV4cGlyZXNfYXQ6IGV4cGlyZXNBdCxcbiAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgIHRva2VuX3R5cGUsXG4gICAgICAgICAgICAgICAgdXNlcjogZGF0YS51c2VyLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0b2tlbnMgZnJvbSBVUkxcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyc7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19nZXRTZXNzaW9uRnJvbVVSTCgpJywgJ2NsZWFyaW5nIHdpbmRvdy5sb2NhdGlvbi5oYXNoJyk7XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb24sIHJlZGlyZWN0VHlwZTogcGFyYW1zLnR5cGUgfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHNlc3Npb246IG51bGwsIHJlZGlyZWN0VHlwZTogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IFVSTCBjb250YWlucyBwYXJhbWV0ZXJzIGdpdmVuIGJ5IGFuIGltcGxpY2l0IG9hdXRoIGdyYW50IGZsb3cgKGh0dHBzOi8vd3d3LnJmYy1lZGl0b3Iub3JnL3JmYy9yZmM2NzQ5Lmh0bWwjc2VjdGlvbi00LjIpXG4gICAgICovXG4gICAgX2lzSW1wbGljaXRHcmFudENhbGxiYWNrKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihwYXJhbXMuYWNjZXNzX3Rva2VuIHx8IHBhcmFtcy5lcnJvcl9kZXNjcmlwdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBVUkwgYW5kIGJhY2tpbmcgc3RvcmFnZSBjb250YWluIHBhcmFtZXRlcnMgZ2l2ZW4gYnkgYSBQS0NFIGZsb3dcbiAgICAgKi9cbiAgICBhc3luYyBfaXNQS0NFQ2FsbGJhY2socGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdG9yYWdlQ29udGVudCA9IGF3YWl0IGdldEl0ZW1Bc3luYyh0aGlzLnN0b3JhZ2UsIGAke3RoaXMuc3RvcmFnZUtleX0tY29kZS12ZXJpZmllcmApO1xuICAgICAgICByZXR1cm4gISEocGFyYW1zLmNvZGUgJiYgY3VycmVudFN0b3JhZ2VDb250ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5zaWRlIGEgYnJvd3NlciBjb250ZXh0LCBgc2lnbk91dCgpYCB3aWxsIHJlbW92ZSB0aGUgbG9nZ2VkIGluIHVzZXIgZnJvbSB0aGUgYnJvd3NlciBzZXNzaW9uIGFuZCBsb2cgdGhlbSBvdXQgLSByZW1vdmluZyBhbGwgaXRlbXMgZnJvbSBsb2NhbHN0b3JhZ2UgYW5kIHRoZW4gdHJpZ2dlciBhIGBcIlNJR05FRF9PVVRcImAgZXZlbnQuXG4gICAgICpcbiAgICAgKiBGb3Igc2VydmVyLXNpZGUgbWFuYWdlbWVudCwgeW91IGNhbiByZXZva2UgYWxsIHJlZnJlc2ggdG9rZW5zIGZvciBhIHVzZXIgYnkgcGFzc2luZyBhIHVzZXIncyBKV1QgdGhyb3VnaCB0byBgYXV0aC5hcGkuc2lnbk91dChKV1Q6IHN0cmluZylgLlxuICAgICAqIFRoZXJlIGlzIG5vIHdheSB0byByZXZva2UgYSB1c2VyJ3MgYWNjZXNzIHRva2VuIGp3dCB1bnRpbCBpdCBleHBpcmVzLiBJdCBpcyByZWNvbW1lbmRlZCB0byBzZXQgYSBzaG9ydGVyIGV4cGlyeSBvbiB0aGUgand0IGZvciB0aGlzIHJlYXNvbi5cbiAgICAgKlxuICAgICAqIElmIHVzaW5nIGBvdGhlcnNgIHNjb3BlLCBubyBgU0lHTkVEX09VVGAgZXZlbnQgaXMgZmlyZWQhXG4gICAgICovXG4gICAgYXN5bmMgc2lnbk91dChvcHRpb25zID0geyBzY29wZTogJ2dsb2JhbCcgfSkge1xuICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9zaWduT3V0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgX3NpZ25PdXQoeyBzY29wZSB9ID0geyBzY29wZTogJ2dsb2JhbCcgfSkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yOiBzZXNzaW9uRXJyb3IgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJvcjogc2Vzc2lvbkVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IChfYSA9IGRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgIGlmIChhY2Nlc3NUb2tlbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHRoaXMuYWRtaW4uc2lnbk91dChhY2Nlc3NUb2tlbiwgc2NvcGUpO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgNDA0cyBzaW5jZSB1c2VyIG1pZ2h0IG5vdCBleGlzdCBhbnltb3JlXG4gICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSA0MDFzIHNpbmNlIGFuIGludmFsaWQgb3IgZXhwaXJlZCBKV1Qgc2hvdWxkIHNpZ24gb3V0IHRoZSBjdXJyZW50IHNlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoaXNBdXRoQXBpRXJyb3IoZXJyb3IpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3Iuc3RhdHVzID09PSA0MDQgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDEgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDMpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY29wZSAhPT0gJ290aGVycycpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgcmVtb3ZlSXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgYCR7dGhpcy5zdG9yYWdlS2V5fS1jb2RlLXZlcmlmaWVyYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBlcnJvcjogbnVsbCB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVjZWl2ZSBhIG5vdGlmaWNhdGlvbiBldmVyeSB0aW1lIGFuIGF1dGggZXZlbnQgaGFwcGVucy5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBpbnZva2VkIHdoZW4gYW4gYXV0aCBldmVudCBoYXBwZW5zLlxuICAgICAqL1xuICAgIG9uQXV0aFN0YXRlQ2hhbmdlKGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGlkID0gdXVpZCgpO1xuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgdW5zdWJzY3JpYmU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI3Vuc3Vic2NyaWJlKCknLCAnc3RhdGUgY2hhbmdlIGNhbGxiYWNrIHdpdGggaWQgcmVtb3ZlZCcsIGlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMuZGVsZXRlKGlkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjb25BdXRoU3RhdGVDaGFuZ2UoKScsICdyZWdpc3RlcmVkIGNhbGxiYWNrIHdpdGggaWQnLCBpZCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VFbWl0dGVycy5zZXQoaWQsIHN1YnNjcmlwdGlvbik7XG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmluaXRpYWxpemVQcm9taXNlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fYWNxdWlyZUxvY2soLTEsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0SW5pdGlhbFNlc3Npb24oaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHJldHVybiB7IGRhdGE6IHsgc3Vic2NyaXB0aW9uIH0gfTtcbiAgICB9XG4gICAgYXN5bmMgX2VtaXRJbml0aWFsU2Vzc2lvbihpZCkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHsgc2Vzc2lvbiB9LCBlcnJvciwgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIGF3YWl0ICgoX2EgPSB0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMuZ2V0KGlkKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGxiYWNrKCdJTklUSUFMX1NFU1NJT04nLCBzZXNzaW9uKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJ0lOSVRJQUxfU0VTU0lPTicsICdjYWxsYmFjayBpZCcsIGlkLCAnc2Vzc2lvbicsIHNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGF3YWl0ICgoX2IgPSB0aGlzLnN0YXRlQ2hhbmdlRW1pdHRlcnMuZ2V0KGlkKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGxiYWNrKCdJTklUSUFMX1NFU1NJT04nLCBudWxsKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJ0lOSVRJQUxfU0VTU0lPTicsICdjYWxsYmFjayBpZCcsIGlkLCAnZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcGFzc3dvcmQgcmVzZXQgcmVxdWVzdCB0byBhbiBlbWFpbCBhZGRyZXNzLiBUaGlzIG1ldGhvZCBzdXBwb3J0cyB0aGUgUEtDRSBmbG93LlxuICAgICAqXG4gICAgICogQHBhcmFtIGVtYWlsIFRoZSBlbWFpbCBhZGRyZXNzIG9mIHRoZSB1c2VyLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnJlZGlyZWN0VG8gVGhlIFVSTCB0byBzZW5kIHRoZSB1c2VyIHRvIGFmdGVyIHRoZXkgY2xpY2sgdGhlIHBhc3N3b3JkIHJlc2V0IGxpbmsuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY2FwdGNoYVRva2VuIFZlcmlmaWNhdGlvbiB0b2tlbiByZWNlaXZlZCB3aGVuIHRoZSB1c2VyIGNvbXBsZXRlcyB0aGUgY2FwdGNoYSBvbiB0aGUgc2l0ZS5cbiAgICAgKi9cbiAgICBhc3luYyByZXNldFBhc3N3b3JkRm9yRW1haWwoZW1haWwsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBsZXQgY29kZUNoYWxsZW5nZSA9IG51bGw7XG4gICAgICAgIGxldCBjb2RlQ2hhbGxlbmdlTWV0aG9kID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuZmxvd1R5cGUgPT09ICdwa2NlJykge1xuICAgICAgICAgICAgO1xuICAgICAgICAgICAgW2NvZGVDaGFsbGVuZ2UsIGNvZGVDaGFsbGVuZ2VNZXRob2RdID0gYXdhaXQgZ2V0Q29kZUNoYWxsZW5nZUFuZE1ldGhvZCh0aGlzLnN0b3JhZ2UsIHRoaXMuc3RvcmFnZUtleSwgdHJ1ZSAvLyBpc1Bhc3N3b3JkUmVjb3ZlcnlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnUE9TVCcsIGAke3RoaXMudXJsfS9yZWNvdmVyYCwge1xuICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgICAgIGNvZGVfY2hhbGxlbmdlOiBjb2RlQ2hhbGxlbmdlLFxuICAgICAgICAgICAgICAgICAgICBjb2RlX2NoYWxsZW5nZV9tZXRob2Q6IGNvZGVDaGFsbGVuZ2VNZXRob2QsXG4gICAgICAgICAgICAgICAgICAgIGdvdHJ1ZV9tZXRhX3NlY3VyaXR5OiB7IGNhcHRjaGFfdG9rZW46IG9wdGlvbnMuY2FwdGNoYVRva2VuIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogb3B0aW9ucy5yZWRpcmVjdFRvLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldHMgYWxsIHRoZSBpZGVudGl0aWVzIGxpbmtlZCB0byBhIHVzZXIuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0VXNlcklkZW50aXRpZXMoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuZ2V0VXNlcigpO1xuICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBpZGVudGl0aWVzOiAoX2EgPSBkYXRhLnVzZXIuaWRlbnRpdGllcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10gfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlua3MgYW4gb2F1dGggaWRlbnRpdHkgdG8gYW4gZXhpc3RpbmcgdXNlci5cbiAgICAgKiBUaGlzIG1ldGhvZCBzdXBwb3J0cyB0aGUgUEtDRSBmbG93LlxuICAgICAqL1xuICAgIGFzeW5jIGxpbmtJZGVudGl0eShjcmVkZW50aWFscykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGF3YWl0IHRoaXMuX2dldFVybEZvclByb3ZpZGVyKGAke3RoaXMudXJsfS91c2VyL2lkZW50aXRpZXMvYXV0aG9yaXplYCwgY3JlZGVudGlhbHMucHJvdmlkZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RUbzogKF9hID0gY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlZGlyZWN0VG8sXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlczogKF9iID0gY3JlZGVudGlhbHMub3B0aW9ucykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnNjb3BlcyxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlQYXJhbXM6IChfYyA9IGNyZWRlbnRpYWxzLm9wdGlvbnMpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5xdWVyeVBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgc2tpcEJyb3dzZXJSZWRpcmVjdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0dFVCcsIHVybCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGp3dDogKF9lID0gKF9kID0gZGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuYWNjZXNzX3Rva2VuKSAhPT0gbnVsbCAmJiBfZSAhPT0gdm9pZCAwID8gX2UgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIGlmIChpc0Jyb3dzZXIoKSAmJiAhKChfYSA9IGNyZWRlbnRpYWxzLm9wdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5za2lwQnJvd3NlclJlZGlyZWN0KSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oZGF0YSA9PT0gbnVsbCB8fCBkYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkYXRhLnVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHByb3ZpZGVyOiBjcmVkZW50aWFscy5wcm92aWRlciwgdXJsOiBkYXRhID09PSBudWxsIHx8IGRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRhdGEudXJsIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBwcm92aWRlcjogY3JlZGVudGlhbHMucHJvdmlkZXIsIHVybDogbnVsbCB9LCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5saW5rcyBhbiBpZGVudGl0eSBmcm9tIGEgdXNlciBieSBkZWxldGluZyBpdC4gVGhlIHVzZXIgd2lsbCBubyBsb25nZXIgYmUgYWJsZSB0byBzaWduIGluIHdpdGggdGhhdCBpZGVudGl0eSBvbmNlIGl0J3MgdW5saW5rZWQuXG4gICAgICovXG4gICAgYXN5bmMgdW5saW5rSWRlbnRpdHkoaWRlbnRpdHkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnREVMRVRFJywgYCR7dGhpcy51cmx9L3VzZXIvaWRlbnRpdGllcy8ke2lkZW50aXR5LmlkZW50aXR5X2lkfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IChfYiA9IChfYSA9IGRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc190b2tlbikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIG5ldyBKV1QuXG4gICAgICogQHBhcmFtIHJlZnJlc2hUb2tlbiBBIHZhbGlkIHJlZnJlc2ggdG9rZW4gdGhhdCB3YXMgcmV0dXJuZWQgb24gbG9naW4uXG4gICAgICovXG4gICAgYXN5bmMgX3JlZnJlc2hBY2Nlc3NUb2tlbihyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgY29uc3QgZGVidWdOYW1lID0gYCNfcmVmcmVzaEFjY2Vzc1Rva2VuKCR7cmVmcmVzaFRva2VuLnN1YnN0cmluZygwLCA1KX0uLi4pYDtcbiAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnYmVnaW4nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAvLyB3aWxsIGF0dGVtcHQgdG8gcmVmcmVzaCB0aGUgdG9rZW4gd2l0aCBleHBvbmVudGlhbCBiYWNrb2ZmXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgcmV0cnlhYmxlKGFzeW5jIChhdHRlbXB0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGVtcHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHNsZWVwKDIwMCAqIE1hdGgucG93KDIsIGF0dGVtcHQgLSAxKSk7IC8vIDIwMCwgNDAwLCA4MDAsIC4uLlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdyZWZyZXNoaW5nIGF0dGVtcHQnLCBhdHRlbXB0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vdG9rZW4/Z3JhbnRfdHlwZT1yZWZyZXNoX3Rva2VuYCwge1xuICAgICAgICAgICAgICAgICAgICBib2R5OiB7IHJlZnJlc2hfdG9rZW46IHJlZnJlc2hUb2tlbiB9LFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgIHhmb3JtOiBfc2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgKGF0dGVtcHQsIGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dEJhY2tPZmZJbnRlcnZhbCA9IDIwMCAqIE1hdGgucG93KDIsIGF0dGVtcHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoZXJyb3IgJiZcbiAgICAgICAgICAgICAgICAgICAgaXNBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcihlcnJvcikgJiZcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0cnlhYmxlIG9ubHkgaWYgdGhlIHJlcXVlc3QgY2FuIGJlIHNlbnQgYmVmb3JlIHRoZSBiYWNrb2ZmIG92ZXJmbG93cyB0aGUgdGljayBkdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBEYXRlLm5vdygpICsgbmV4dEJhY2tPZmZJbnRlcnZhbCAtIHN0YXJ0ZWRBdCA8IEFVVE9fUkVGUkVTSF9USUNLX0RVUkFUSU9OX01TKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBzZXNzaW9uOiBudWxsLCB1c2VyOiBudWxsIH0sIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2VuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9pc1ZhbGlkU2Vzc2lvbihtYXliZVNlc3Npb24pIHtcbiAgICAgICAgY29uc3QgaXNWYWxpZFNlc3Npb24gPSB0eXBlb2YgbWF5YmVTZXNzaW9uID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgbWF5YmVTZXNzaW9uICE9PSBudWxsICYmXG4gICAgICAgICAgICAnYWNjZXNzX3Rva2VuJyBpbiBtYXliZVNlc3Npb24gJiZcbiAgICAgICAgICAgICdyZWZyZXNoX3Rva2VuJyBpbiBtYXliZVNlc3Npb24gJiZcbiAgICAgICAgICAgICdleHBpcmVzX2F0JyBpbiBtYXliZVNlc3Npb247XG4gICAgICAgIHJldHVybiBpc1ZhbGlkU2Vzc2lvbjtcbiAgICB9XG4gICAgYXN5bmMgX2hhbmRsZVByb3ZpZGVyU2lnbkluKHByb3ZpZGVyLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IGF3YWl0IHRoaXMuX2dldFVybEZvclByb3ZpZGVyKGAke3RoaXMudXJsfS9hdXRob3JpemVgLCBwcm92aWRlciwge1xuICAgICAgICAgICAgcmVkaXJlY3RUbzogb3B0aW9ucy5yZWRpcmVjdFRvLFxuICAgICAgICAgICAgc2NvcGVzOiBvcHRpb25zLnNjb3BlcyxcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiBvcHRpb25zLnF1ZXJ5UGFyYW1zLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfaGFuZGxlUHJvdmlkZXJTaWduSW4oKScsICdwcm92aWRlcicsIHByb3ZpZGVyLCAnb3B0aW9ucycsIG9wdGlvbnMsICd1cmwnLCB1cmwpO1xuICAgICAgICAvLyB0cnkgdG8gb3BlbiBvbiB0aGUgYnJvd3NlclxuICAgICAgICBpZiAoaXNCcm93c2VyKCkgJiYgIW9wdGlvbnMuc2tpcEJyb3dzZXJSZWRpcmVjdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbih1cmwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRhdGE6IHsgcHJvdmlkZXIsIHVybCB9LCBlcnJvcjogbnVsbCB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWNvdmVycyB0aGUgc2Vzc2lvbiBmcm9tIExvY2FsU3RvcmFnZSBhbmQgcmVmcmVzaGVzIHRoZSB0b2tlblxuICAgICAqIE5vdGU6IHRoaXMgbWV0aG9kIGlzIGFzeW5jIHRvIGFjY29tbW9kYXRlIGZvciBBc3luY1N0b3JhZ2UgZS5nLiBpbiBSZWFjdCBuYXRpdmUuXG4gICAgICovXG4gICAgYXN5bmMgX3JlY292ZXJBbmRSZWZyZXNoKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGRlYnVnTmFtZSA9ICcjX3JlY292ZXJBbmRSZWZyZXNoKCknO1xuICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdiZWdpbicpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFNlc3Npb24gPSBhd2FpdCBnZXRJdGVtQXN5bmModGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnc2Vzc2lvbiBmcm9tIHN0b3JhZ2UnLCBjdXJyZW50U2Vzc2lvbik7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzVmFsaWRTZXNzaW9uKGN1cnJlbnRTZXNzaW9uKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ3Nlc3Npb24gaXMgbm90IHZhbGlkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTZXNzaW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3JlbW92ZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXhwaXJlc1dpdGhNYXJnaW4gPSAoKF9hID0gY3VycmVudFNlc3Npb24uZXhwaXJlc19hdCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogSW5maW5pdHkpICogMTAwMCAtIERhdGUubm93KCkgPCBFWFBJUllfTUFSR0lOX01TO1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCBgc2Vzc2lvbiBoYXMke2V4cGlyZXNXaXRoTWFyZ2luID8gJycgOiAnIG5vdCd9IGV4cGlyZWQgd2l0aCBtYXJnaW4gb2YgJHtFWFBJUllfTUFSR0lOX01TfXNgKTtcbiAgICAgICAgICAgIGlmIChleHBpcmVzV2l0aE1hcmdpbikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF1dG9SZWZyZXNoVG9rZW4gJiYgY3VycmVudFNlc3Npb24ucmVmcmVzaF90b2tlbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGVycm9yIH0gPSBhd2FpdCB0aGlzLl9jYWxsUmVmcmVzaFRva2VuKGN1cnJlbnRTZXNzaW9uLnJlZnJlc2hfdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0F1dGhSZXRyeWFibGVGZXRjaEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ3JlZnJlc2ggZmFpbGVkIHdpdGggYSBub24tcmV0cnlhYmxlIGVycm9yLCByZW1vdmluZyB0aGUgc2Vzc2lvbicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9yZW1vdmVTZXNzaW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBubyBuZWVkIHRvIHBlcnNpc3QgY3VycmVudFNlc3Npb24gYWdhaW4sIGFzIHdlIGp1c3QgbG9hZGVkIGl0IGZyb21cbiAgICAgICAgICAgICAgICAvLyBsb2NhbCBzdG9yYWdlOyBwZXJzaXN0aW5nIGl0IGFnYWluIG1heSBvdmVyd3JpdGUgYSB2YWx1ZSBzYXZlZCBieVxuICAgICAgICAgICAgICAgIC8vIGFub3RoZXIgY2xpZW50IHdpdGggYWNjZXNzIHRvIHRoZSBzYW1lIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX0lOJywgY3VycmVudFNlc3Npb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2VuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIF9jYWxsUmVmcmVzaFRva2VuKHJlZnJlc2hUb2tlbikge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoIXJlZnJlc2hUb2tlbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVmcmVzaGluZyBpcyBhbHJlYWR5IGluIHByb2dyZXNzXG4gICAgICAgIGlmICh0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaGluZ0RlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVidWdOYW1lID0gYCNfY2FsbFJlZnJlc2hUb2tlbigke3JlZnJlc2hUb2tlbi5zdWJzdHJpbmcoMCwgNSl9Li4uKWA7XG4gICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2JlZ2luJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hpbmdEZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpO1xuICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgdGhpcy5fcmVmcmVzaEFjY2Vzc1Rva2VuKHJlZnJlc2hUb2tlbik7XG4gICAgICAgICAgICBpZiAoZXJyb3IpXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICBpZiAoIWRhdGEuc2Vzc2lvbilcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3NhdmVTZXNzaW9uKGRhdGEuc2Vzc2lvbik7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnVE9LRU5fUkVGUkVTSEVEJywgZGF0YS5zZXNzaW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgc2Vzc2lvbjogZGF0YS5zZXNzaW9uLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHsgc2Vzc2lvbjogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3JlbW92ZVNlc3Npb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKF9hID0gdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIChfYiA9IHRoaXMucmVmcmVzaGluZ0RlZmVycmVkKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoaW5nRGVmZXJyZWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fZGVidWcoZGVidWdOYW1lLCAnZW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgX25vdGlmeUFsbFN1YnNjcmliZXJzKGV2ZW50LCBzZXNzaW9uLCBicm9hZGNhc3QgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGRlYnVnTmFtZSA9IGAjX25vdGlmeUFsbFN1YnNjcmliZXJzKCR7ZXZlbnR9KWA7XG4gICAgICAgIHRoaXMuX2RlYnVnKGRlYnVnTmFtZSwgJ2JlZ2luJywgc2Vzc2lvbiwgYGJyb2FkY2FzdCA9ICR7YnJvYWRjYXN0fWApO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYnJvYWRjYXN0Q2hhbm5lbCAmJiBicm9hZGNhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJyb2FkY2FzdENoYW5uZWwucG9zdE1lc3NhZ2UoeyBldmVudCwgc2Vzc2lvbiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcHJvbWlzZXMgPSBBcnJheS5mcm9tKHRoaXMuc3RhdGVDaGFuZ2VFbWl0dGVycy52YWx1ZXMoKSkubWFwKGFzeW5jICh4KSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgeC5jYWxsYmFjayhldmVudCwgc2Vzc2lvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgICAgICAgICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlcnJvcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcnNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhkZWJ1Z05hbWUsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBzZXQgY3VycmVudFNlc3Npb24gYW5kIGN1cnJlbnRVc2VyXG4gICAgICogcHJvY2VzcyB0byBfc3RhcnRBdXRvUmVmcmVzaFRva2VuIGlmIHBvc3NpYmxlXG4gICAgICovXG4gICAgYXN5bmMgX3NhdmVTZXNzaW9uKHNlc3Npb24pIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfc2F2ZVNlc3Npb24oKScsIHNlc3Npb24pO1xuICAgICAgICAvLyBfc2F2ZVNlc3Npb24gaXMgYWx3YXlzIGNhbGxlZCB3aGVuZXZlciBhIG5ldyBzZXNzaW9uIGhhcyBiZWVuIGFjcXVpcmVkXG4gICAgICAgIC8vIHNvIHdlIGNhbiBzYWZlbHkgc3VwcHJlc3MgdGhlIHdhcm5pbmcgcmV0dXJuZWQgYnkgZnV0dXJlIGdldFNlc3Npb24gY2FsbHNcbiAgICAgICAgdGhpcy5zdXBwcmVzc0dldFNlc3Npb25XYXJuaW5nID0gdHJ1ZTtcbiAgICAgICAgYXdhaXQgc2V0SXRlbUFzeW5jKHRoaXMuc3RvcmFnZSwgdGhpcy5zdG9yYWdlS2V5LCBzZXNzaW9uKTtcbiAgICB9XG4gICAgYXN5bmMgX3JlbW92ZVNlc3Npb24oKSB7XG4gICAgICAgIHRoaXMuX2RlYnVnKCcjX3JlbW92ZVNlc3Npb24oKScpO1xuICAgICAgICBhd2FpdCByZW1vdmVJdGVtQXN5bmModGhpcy5zdG9yYWdlLCB0aGlzLnN0b3JhZ2VLZXkpO1xuICAgICAgICBhd2FpdCB0aGlzLl9ub3RpZnlBbGxTdWJzY3JpYmVycygnU0lHTkVEX09VVCcsIG51bGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFueSByZWdpc3RlcmVkIHZpc2liaWxpdHljaGFuZ2UgY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiB7QHNlZSAjc3RhcnRBdXRvUmVmcmVzaH1cbiAgICAgKiB7QHNlZSAjc3RvcEF1dG9SZWZyZXNofVxuICAgICAqL1xuICAgIF9yZW1vdmVWaXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI19yZW1vdmVWaXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrKCknKTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLnZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2s7XG4gICAgICAgIHRoaXMudmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjayA9IG51bGw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgaXNCcm93c2VyKCkgJiYgKHdpbmRvdyA9PT0gbnVsbCB8fCB3aW5kb3cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdyZW1vdmluZyB2aXNpYmlsaXR5Y2hhbmdlIGNhbGxiYWNrIGZhaWxlZCcsIGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIHByaXZhdGUgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rICNzdGFydEF1dG9SZWZyZXNofS4gVXNlIHRoaXNcbiAgICAgKiB3aXRoaW4gdGhlIGxpYnJhcnkuXG4gICAgICovXG4gICAgYXN5bmMgX3N0YXJ0QXV0b1JlZnJlc2goKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3N0b3BBdXRvUmVmcmVzaCgpO1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI19zdGFydEF1dG9SZWZyZXNoKCknKTtcbiAgICAgICAgY29uc3QgdGlja2VyID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5fYXV0b1JlZnJlc2hUb2tlblRpY2soKSwgQVVUT19SRUZSRVNIX1RJQ0tfRFVSQVRJT05fTVMpO1xuICAgICAgICB0aGlzLmF1dG9SZWZyZXNoVGlja2VyID0gdGlja2VyO1xuICAgICAgICBpZiAodGlja2VyICYmIHR5cGVvZiB0aWNrZXIgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0aWNrZXIudW5yZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIHRpY2tlciBpcyBhIE5vZGVKUyBUaW1lb3V0IG9iamVjdCB0aGF0IGhhcyBhbiBgdW5yZWZgIG1ldGhvZFxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS90aW1lcnMuaHRtbCN0aW1lb3V0dW5yZWZcbiAgICAgICAgICAgIC8vIFdoZW4gYXV0byByZWZyZXNoIGlzIHVzZWQgaW4gTm9kZUpTIChsaWtlIGZvciB0ZXN0aW5nKSB0aGVcbiAgICAgICAgICAgIC8vIGBzZXRJbnRlcnZhbGAgaXMgcHJldmVudGluZyB0aGUgcHJvY2VzcyBmcm9tIGJlaW5nIG1hcmtlZCBhc1xuICAgICAgICAgICAgLy8gZmluaXNoZWQgYW5kIHRlc3RzIHJ1biBlbmRsZXNzbHkuIFRoaXMgY2FuIGJlIHByZXZlbnRlZCBieSBjYWxsaW5nXG4gICAgICAgICAgICAvLyBgdW5yZWYoKWAgb24gdGhlIHJldHVybmVkIG9iamVjdC5cbiAgICAgICAgICAgIHRpY2tlci51bnJlZigpO1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBUUyBoYXMgbm8gY29udGV4dCBvZiBEZW5vXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIERlbm8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBEZW5vLnVucmVmVGltZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIHNpbWlsYXIgbGlrZSBmb3IgTm9kZUpTLCBidXQgd2l0aCB0aGUgRGVubyBBUElcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGVuby5sYW5kL2FwaUBsYXRlc3Q/dW5zdGFibGUmcz1EZW5vLnVucmVmVGltZXJcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgaGFzIG5vIGNvbnRleHQgb2YgRGVub1xuICAgICAgICAgICAgRGVuby51bnJlZlRpbWVyKHRpY2tlcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcnVuIHRoZSB0aWNrIGltbWVkaWF0ZWx5LCBidXQgaW4gdGhlIG5leHQgcGFzcyBvZiB0aGUgZXZlbnQgbG9vcCBzbyB0aGF0XG4gICAgICAgIC8vICNfaW5pdGlhbGl6ZSBjYW4gYmUgYWxsb3dlZCB0byBjb21wbGV0ZSB3aXRob3V0IHJlY3Vyc2l2ZWx5IHdhaXRpbmcgb25cbiAgICAgICAgLy8gaXRzZWxmXG4gICAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2F1dG9SZWZyZXNoVG9rZW5UaWNrKCk7XG4gICAgICAgIH0sIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIHRoZSBwcml2YXRlIGltcGxlbWVudGF0aW9uIG9mIHtAbGluayAjc3RvcEF1dG9SZWZyZXNofS4gVXNlIHRoaXNcbiAgICAgKiB3aXRoaW4gdGhlIGxpYnJhcnkuXG4gICAgICovXG4gICAgYXN5bmMgX3N0b3BBdXRvUmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5fZGVidWcoJyNfc3RvcEF1dG9SZWZyZXNoKCknKTtcbiAgICAgICAgY29uc3QgdGlja2VyID0gdGhpcy5hdXRvUmVmcmVzaFRpY2tlcjtcbiAgICAgICAgdGhpcy5hdXRvUmVmcmVzaFRpY2tlciA9IG51bGw7XG4gICAgICAgIGlmICh0aWNrZXIpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGlja2VyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydHMgYW4gYXV0by1yZWZyZXNoIHByb2Nlc3MgaW4gdGhlIGJhY2tncm91bmQuIFRoZSBzZXNzaW9uIGlzIGNoZWNrZWRcbiAgICAgKiBldmVyeSBmZXcgc2Vjb25kcy4gQ2xvc2UgdG8gdGhlIHRpbWUgb2YgZXhwaXJhdGlvbiBhIHByb2Nlc3MgaXMgc3RhcnRlZCB0b1xuICAgICAqIHJlZnJlc2ggdGhlIHNlc3Npb24uIElmIHJlZnJlc2hpbmcgZmFpbHMgaXQgd2lsbCBiZSByZXRyaWVkIGZvciBhcyBsb25nIGFzXG4gICAgICogbmVjZXNzYXJ5LlxuICAgICAqXG4gICAgICogSWYgeW91IHNldCB0aGUge0BsaW5rIEdvVHJ1ZUNsaWVudE9wdGlvbnMjYXV0b1JlZnJlc2hUb2tlbn0geW91IGRvbid0IG5lZWRcbiAgICAgKiB0byBjYWxsIHRoaXMgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIGZvciB5b3UuXG4gICAgICpcbiAgICAgKiBPbiBicm93c2VycyB0aGUgcmVmcmVzaCBwcm9jZXNzIHdvcmtzIG9ubHkgd2hlbiB0aGUgdGFiL3dpbmRvdyBpcyBpbiB0aGVcbiAgICAgKiBmb3JlZ3JvdW5kIHRvIGNvbnNlcnZlIHJlc291cmNlcyBhcyB3ZWxsIGFzIHByZXZlbnQgcmFjZSBjb25kaXRpb25zIGFuZFxuICAgICAqIGZsb29kaW5nIGF1dGggd2l0aCByZXF1ZXN0cy4gSWYgeW91IGNhbGwgdGhpcyBtZXRob2QgYW55IG1hbmFnZWRcbiAgICAgKiB2aXNpYmlsaXR5IGNoYW5nZSBjYWxsYmFjayB3aWxsIGJlIHJlbW92ZWQgYW5kIHlvdSBtdXN0IG1hbmFnZSB2aXNpYmlsaXR5XG4gICAgICogY2hhbmdlcyBvbiB5b3VyIG93bi5cbiAgICAgKlxuICAgICAqIE9uIG5vbi1icm93c2VyIHBsYXRmb3JtcyB0aGUgcmVmcmVzaCBwcm9jZXNzIHdvcmtzICpjb250aW51b3VzbHkqIGluIHRoZVxuICAgICAqIGJhY2tncm91bmQsIHdoaWNoIG1heSBub3QgYmUgZGVzaXJhYmxlLiBZb3Ugc2hvdWxkIGhvb2sgaW50byB5b3VyXG4gICAgICogcGxhdGZvcm0ncyBmb3JlZ3JvdW5kIGluZGljYXRpb24gbWVjaGFuaXNtIGFuZCBjYWxsIHRoZXNlIG1ldGhvZHNcbiAgICAgKiBhcHByb3ByaWF0ZWx5IHRvIGNvbnNlcnZlIHJlc291cmNlcy5cbiAgICAgKlxuICAgICAqIHtAc2VlICNzdG9wQXV0b1JlZnJlc2h9XG4gICAgICovXG4gICAgYXN5bmMgc3RhcnRBdXRvUmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlVmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjaygpO1xuICAgICAgICBhd2FpdCB0aGlzLl9zdGFydEF1dG9SZWZyZXNoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0b3BzIGFuIGFjdGl2ZSBhdXRvIHJlZnJlc2ggcHJvY2VzcyBydW5uaW5nIGluIHRoZSBiYWNrZ3JvdW5kIChpZiBhbnkpLlxuICAgICAqXG4gICAgICogSWYgeW91IGNhbGwgdGhpcyBtZXRob2QgYW55IG1hbmFnZWQgdmlzaWJpbGl0eSBjaGFuZ2UgY2FsbGJhY2sgd2lsbCBiZVxuICAgICAqIHJlbW92ZWQgYW5kIHlvdSBtdXN0IG1hbmFnZSB2aXNpYmlsaXR5IGNoYW5nZXMgb24geW91ciBvd24uXG4gICAgICpcbiAgICAgKiBTZWUge0BsaW5rICNzdGFydEF1dG9SZWZyZXNofSBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAqL1xuICAgIGFzeW5jIHN0b3BBdXRvUmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlVmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjaygpO1xuICAgICAgICBhd2FpdCB0aGlzLl9zdG9wQXV0b1JlZnJlc2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUnVucyB0aGUgYXV0byByZWZyZXNoIHRva2VuIHRpY2suXG4gICAgICovXG4gICAgYXN5bmMgX2F1dG9SZWZyZXNoVG9rZW5UaWNrKCkge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI19hdXRvUmVmcmVzaFRva2VuVGljaygpJywgJ2JlZ2luJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygwLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHsgc2Vzc2lvbiB9LCB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2Vzc2lvbiB8fCAhc2Vzc2lvbi5yZWZyZXNoX3Rva2VuIHx8ICFzZXNzaW9uLmV4cGlyZXNfYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJyNfYXV0b1JlZnJlc2hUb2tlblRpY2soKScsICdubyBzZXNzaW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2Vzc2lvbiB3aWxsIGV4cGlyZSBpbiB0aGlzIG1hbnkgdGlja3MgKG9yIGhhcyBhbHJlYWR5IGV4cGlyZWQgaWYgPD0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBleHBpcmVzSW5UaWNrcyA9IE1hdGguZmxvb3IoKHNlc3Npb24uZXhwaXJlc19hdCAqIDEwMDAgLSBub3cpIC8gQVVUT19SRUZSRVNIX1RJQ0tfRFVSQVRJT05fTVMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCcjX2F1dG9SZWZyZXNoVG9rZW5UaWNrKCknLCBgYWNjZXNzIHRva2VuIGV4cGlyZXMgaW4gJHtleHBpcmVzSW5UaWNrc30gdGlja3MsIGEgdGljayBsYXN0cyAke0FVVE9fUkVGUkVTSF9USUNLX0RVUkFUSU9OX01TfW1zLCByZWZyZXNoIHRocmVzaG9sZCBpcyAke0FVVE9fUkVGUkVTSF9USUNLX1RIUkVTSE9MRH0gdGlja3NgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhwaXJlc0luVGlja3MgPD0gQVVUT19SRUZSRVNIX1RJQ0tfVEhSRVNIT0xEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2NhbGxSZWZyZXNoVG9rZW4oc2Vzc2lvbi5yZWZyZXNoX3Rva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQXV0byByZWZyZXNoIHRpY2sgZmFpbGVkIHdpdGggZXJyb3IuIFRoaXMgaXMgbGlrZWx5IGEgdHJhbnNpZW50IGVycm9yLicsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnI19hdXRvUmVmcmVzaFRva2VuVGljaygpJywgJ2VuZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5pc0FjcXVpcmVUaW1lb3V0IHx8IGUgaW5zdGFuY2VvZiBMb2NrQWNxdWlyZVRpbWVvdXRFcnJvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCdhdXRvIHJlZnJlc2ggdG9rZW4gdGljayBsb2NrIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBvbiB0aGUgYnJvd3NlciAvIHBsYXRmb3JtLCB3aGljaCBpbi10dXJuIHJ1blxuICAgICAqIGFsZ29yaXRobXMgd2hlbiB0aGUgYnJvd3NlciB3aW5kb3cvdGFiIGFyZSBpbiBmb3JlZ3JvdW5kLiBPbiBub24tYnJvd3NlclxuICAgICAqIHBsYXRmb3JtcyBpdCBhc3N1bWVzIGFsd2F5cyBmb3JlZ3JvdW5kLlxuICAgICAqL1xuICAgIGFzeW5jIF9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKCkge1xuICAgICAgICB0aGlzLl9kZWJ1ZygnI19oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKCknKTtcbiAgICAgICAgaWYgKCFpc0Jyb3dzZXIoKSB8fCAhKHdpbmRvdyA9PT0gbnVsbCB8fCB3aW5kb3cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlZnJlc2hUb2tlbikge1xuICAgICAgICAgICAgICAgIC8vIGluIG5vbi1icm93c2VyIGVudmlyb25tZW50cyB0aGUgcmVmcmVzaCB0b2tlbiB0aWNrZXIgcnVucyBhbHdheXNcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QXV0b1JlZnJlc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrID0gYXN5bmMgKCkgPT4gYXdhaXQgdGhpcy5fb25WaXNpYmlsaXR5Q2hhbmdlZChmYWxzZSk7XG4gICAgICAgICAgICB3aW5kb3cgPT09IG51bGwgfHwgd2luZG93ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIHRoaXMudmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjayk7XG4gICAgICAgICAgICAvLyBub3cgaW1tZWRpYXRlbHkgY2FsbCB0aGUgdmlzYmlsaXR5IGNoYW5nZWQgY2FsbGJhY2sgdG8gc2V0dXAgd2l0aCB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgdmlzYmlsaXR5IHN0YXRlXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9vblZpc2liaWxpdHlDaGFuZ2VkKHRydWUpOyAvLyBpbml0aWFsIGNhbGxcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ19oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlJywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHJlZ2lzdGVyZWQgd2l0aCBgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnKWAuXG4gICAgICovXG4gICAgYXN5bmMgX29uVmlzaWJpbGl0eUNoYW5nZWQoY2FsbGVkRnJvbUluaXRpYWxpemUpIHtcbiAgICAgICAgY29uc3QgbWV0aG9kTmFtZSA9IGAjX29uVmlzaWJpbGl0eUNoYW5nZWQoJHtjYWxsZWRGcm9tSW5pdGlhbGl6ZX0pYDtcbiAgICAgICAgdGhpcy5fZGVidWcobWV0aG9kTmFtZSwgJ3Zpc2liaWxpdHlTdGF0ZScsIGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSk7XG4gICAgICAgIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlZnJlc2hUb2tlbikge1xuICAgICAgICAgICAgICAgIC8vIGluIGJyb3dzZXIgZW52aXJvbm1lbnRzIHRoZSByZWZyZXNoIHRva2VuIHRpY2tlciBydW5zIG9ubHkgb24gZm9jdXNlZCB0YWJzXG4gICAgICAgICAgICAgICAgLy8gd2hpY2ggcHJldmVudHMgcmFjZSBjb25kaXRpb25zXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvUmVmcmVzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjYWxsZWRGcm9tSW5pdGlhbGl6ZSkge1xuICAgICAgICAgICAgICAgIC8vIGNhbGxlZCB3aGVuIHRoZSB2aXNpYmlsaXR5IGhhcyBjaGFuZ2VkLCBpLmUuIHRoZSBicm93c2VyXG4gICAgICAgICAgICAgICAgLy8gdHJhbnNpdGlvbmVkIGZyb20gaGlkZGVuIC0+IHZpc2libGUgc28gd2UgbmVlZCB0byBzZWUgaWYgdGhlIHNlc3Npb25cbiAgICAgICAgICAgICAgICAvLyBzaG91bGQgYmUgcmVjb3ZlcmVkIGltbWVkaWF0ZWx5Li4uIGJ1dCB0byBkbyB0aGF0IHdlIG5lZWQgdG8gYWNxdWlyZVxuICAgICAgICAgICAgICAgIC8vIHRoZSBsb2NrIGZpcnN0IGFzeW5jaHJvbm91c2x5XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0aWFsaXplUHJvbWlzZTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlICE9PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKG1ldGhvZE5hbWUsICdhY3F1aXJlZCB0aGUgbG9jayB0byByZWNvdmVyIHRoZSBzZXNzaW9uLCBidXQgdGhlIGJyb3dzZXIgdmlzaWJpbGl0eVN0YXRlIGlzIG5vIGxvbmdlciB2aXNpYmxlLCBhYm9ydGluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmlzaWJpbGl0eSBoYXMgY2hhbmdlZCB3aGlsZSB3YWl0aW5nIGZvciB0aGUgbG9jaywgYWJvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyByZWNvdmVyIHRoZSBzZXNzaW9uXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3JlY292ZXJBbmRSZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlZnJlc2hUb2tlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0b3BBdXRvUmVmcmVzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB0aGUgcmVsZXZhbnQgbG9naW4gVVJMIGZvciBhIHRoaXJkLXBhcnR5IHByb3ZpZGVyLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnJlZGlyZWN0VG8gQSBVUkwgb3IgbW9iaWxlIGFkZHJlc3MgdG8gc2VuZCB0aGUgdXNlciB0byBhZnRlciB0aGV5IGFyZSBjb25maXJtZWQuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuc2NvcGVzIEEgc3BhY2Utc2VwYXJhdGVkIGxpc3Qgb2Ygc2NvcGVzIGdyYW50ZWQgdG8gdGhlIE9BdXRoIGFwcGxpY2F0aW9uLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnF1ZXJ5UGFyYW1zIEFuIG9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnMgY29udGFpbmluZyBxdWVyeSBwYXJhbWV0ZXJzIGdyYW50ZWQgdG8gdGhlIE9BdXRoIGFwcGxpY2F0aW9uLlxuICAgICAqL1xuICAgIGFzeW5jIF9nZXRVcmxGb3JQcm92aWRlcih1cmwsIHByb3ZpZGVyLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IFtgcHJvdmlkZXI9JHtlbmNvZGVVUklDb21wb25lbnQocHJvdmlkZXIpfWBdO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnJlZGlyZWN0VG8pIHtcbiAgICAgICAgICAgIHVybFBhcmFtcy5wdXNoKGByZWRpcmVjdF90bz0ke2VuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLnJlZGlyZWN0VG8pfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuc2NvcGVzKSB7XG4gICAgICAgICAgICB1cmxQYXJhbXMucHVzaChgc2NvcGVzPSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuc2NvcGVzKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mbG93VHlwZSA9PT0gJ3BrY2UnKSB7XG4gICAgICAgICAgICBjb25zdCBbY29kZUNoYWxsZW5nZSwgY29kZUNoYWxsZW5nZU1ldGhvZF0gPSBhd2FpdCBnZXRDb2RlQ2hhbGxlbmdlQW5kTWV0aG9kKHRoaXMuc3RvcmFnZSwgdGhpcy5zdG9yYWdlS2V5KTtcbiAgICAgICAgICAgIGNvbnN0IGZsb3dQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgICAgICAgICBjb2RlX2NoYWxsZW5nZTogYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvZGVDaGFsbGVuZ2UpfWAsXG4gICAgICAgICAgICAgICAgY29kZV9jaGFsbGVuZ2VfbWV0aG9kOiBgJHtlbmNvZGVVUklDb21wb25lbnQoY29kZUNoYWxsZW5nZU1ldGhvZCl9YCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXJsUGFyYW1zLnB1c2goZmxvd1BhcmFtcy50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnF1ZXJ5UGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMob3B0aW9ucy5xdWVyeVBhcmFtcyk7XG4gICAgICAgICAgICB1cmxQYXJhbXMucHVzaChxdWVyeS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnNraXBCcm93c2VyUmVkaXJlY3QpIHtcbiAgICAgICAgICAgIHVybFBhcmFtcy5wdXNoKGBza2lwX2h0dHBfcmVkaXJlY3Q9JHtvcHRpb25zLnNraXBCcm93c2VyUmVkaXJlY3R9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3VybH0/JHt1cmxQYXJhbXMuam9pbignJicpfWA7XG4gICAgfVxuICAgIGFzeW5jIF91bmVucm9sbChwYXJhbXMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VTZXNzaW9uKGFzeW5jIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiBzZXNzaW9uRGF0YSwgZXJyb3I6IHNlc3Npb25FcnJvciB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IHNlc3Npb25FcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ0RFTEVURScsIGAke3RoaXMudXJsfS9mYWN0b3JzLyR7cGFyYW1zLmZhY3RvcklkfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBqd3Q6IChfYSA9IHNlc3Npb25EYXRhID09PSBudWxsIHx8IHNlc3Npb25EYXRhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXNzaW9uRGF0YS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNBdXRoRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIF9lbnJvbGwocGFyYW1zKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRhdGE6IHNlc3Npb25EYXRhLCBlcnJvcjogc2Vzc2lvbkVycm9yIH0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogc2Vzc2lvbkVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBPYmplY3QuYXNzaWduKHsgZnJpZW5kbHlfbmFtZTogcGFyYW1zLmZyaWVuZGx5TmFtZSwgZmFjdG9yX3R5cGU6IHBhcmFtcy5mYWN0b3JUeXBlIH0sIChwYXJhbXMuZmFjdG9yVHlwZSA9PT0gJ3Bob25lJyA/IHsgcGhvbmU6IHBhcmFtcy5waG9uZSB9IDogeyBpc3N1ZXI6IHBhcmFtcy5pc3N1ZXIgfSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L2ZhY3RvcnNgLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgand0OiAoX2EgPSBzZXNzaW9uRGF0YSA9PT0gbnVsbCB8fCBzZXNzaW9uRGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2Vzc2lvbkRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5mYWN0b3JUeXBlID09PSAndG90cCcgJiYgKChfYiA9IGRhdGEgPT09IG51bGwgfHwgZGF0YSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGF0YS50b3RwKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucXJfY29kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50b3RwLnFyX2NvZGUgPSBgZGF0YTppbWFnZS9zdmcreG1sO3V0Zi04LCR7ZGF0YS50b3RwLnFyX2NvZGV9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiB7QHNlZSBHb1RydWVNRkFBcGkjdmVyaWZ5fVxuICAgICAqL1xuICAgIGFzeW5jIF92ZXJpZnkocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiBzZXNzaW9uRGF0YSwgZXJyb3I6IHNlc3Npb25FcnJvciB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogc2Vzc2lvbkVycm9yIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgX3JlcXVlc3QodGhpcy5mZXRjaCwgJ1BPU1QnLCBgJHt0aGlzLnVybH0vZmFjdG9ycy8ke3BhcmFtcy5mYWN0b3JJZH0vdmVyaWZ5YCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogeyBjb2RlOiBwYXJhbXMuY29kZSwgY2hhbGxlbmdlX2lkOiBwYXJhbXMuY2hhbGxlbmdlSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp3dDogKF9hID0gc2Vzc2lvbkRhdGEgPT09IG51bGwgfHwgc2Vzc2lvbkRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb25EYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fc2F2ZVNlc3Npb24oT2JqZWN0LmFzc2lnbih7IGV4cGlyZXNfYXQ6IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApICsgZGF0YS5leHBpcmVzX2luIH0sIGRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fbm90aWZ5QWxsU3Vic2NyaWJlcnMoJ01GQV9DSEFMTEVOR0VfVkVSSUZJRUQnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiB7QHNlZSBHb1RydWVNRkFBcGkjY2hhbGxlbmdlfVxuICAgICAqL1xuICAgIGFzeW5jIF9jaGFsbGVuZ2UocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdXNlU2Vzc2lvbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiBzZXNzaW9uRGF0YSwgZXJyb3I6IHNlc3Npb25FcnJvciB9ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogc2Vzc2lvbkVycm9yIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IF9yZXF1ZXN0KHRoaXMuZmV0Y2gsICdQT1NUJywgYCR7dGhpcy51cmx9L2ZhY3RvcnMvJHtwYXJhbXMuZmFjdG9ySWR9L2NoYWxsZW5nZWAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHsgY2hhbm5lbDogcGFyYW1zLmNoYW5uZWwgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp3dDogKF9hID0gc2Vzc2lvbkRhdGEgPT09IG51bGwgfHwgc2Vzc2lvbkRhdGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb25EYXRhLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXV0aEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHtAc2VlIEdvVHJ1ZU1GQUFwaSNjaGFsbGVuZ2VBbmRWZXJpZnl9XG4gICAgICovXG4gICAgYXN5bmMgX2NoYWxsZW5nZUFuZFZlcmlmeShwYXJhbXMpIHtcbiAgICAgICAgLy8gYm90aCBfY2hhbGxlbmdlIGFuZCBfdmVyaWZ5IGluZGVwZW5kZW50bHkgYWNxdWlyZSB0aGUgbG9jaywgc28gbm8gbmVlZFxuICAgICAgICAvLyB0byBhY3F1aXJlIGl0IGhlcmVcbiAgICAgICAgY29uc3QgeyBkYXRhOiBjaGFsbGVuZ2VEYXRhLCBlcnJvcjogY2hhbGxlbmdlRXJyb3IgfSA9IGF3YWl0IHRoaXMuX2NoYWxsZW5nZSh7XG4gICAgICAgICAgICBmYWN0b3JJZDogcGFyYW1zLmZhY3RvcklkLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNoYWxsZW5nZUVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvcjogY2hhbGxlbmdlRXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fdmVyaWZ5KHtcbiAgICAgICAgICAgIGZhY3RvcklkOiBwYXJhbXMuZmFjdG9ySWQsXG4gICAgICAgICAgICBjaGFsbGVuZ2VJZDogY2hhbGxlbmdlRGF0YS5pZCxcbiAgICAgICAgICAgIGNvZGU6IHBhcmFtcy5jb2RlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICoge0BzZWUgR29UcnVlTUZBQXBpI2xpc3RGYWN0b3JzfVxuICAgICAqL1xuICAgIGFzeW5jIF9saXN0RmFjdG9ycygpIHtcbiAgICAgICAgLy8gdXNlICNnZXRVc2VyIGluc3RlYWQgb2YgI19nZXRVc2VyIGFzIHRoZSBmb3JtZXIgYWNxdWlyZXMgYSBsb2NrXG4gICAgICAgIGNvbnN0IHsgZGF0YTogeyB1c2VyIH0sIGVycm9yOiB1c2VyRXJyb3IsIH0gPSBhd2FpdCB0aGlzLmdldFVzZXIoKTtcbiAgICAgICAgaWYgKHVzZXJFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3I6IHVzZXJFcnJvciB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZhY3RvcnMgPSAodXNlciA9PT0gbnVsbCB8fCB1c2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VyLmZhY3RvcnMpIHx8IFtdO1xuICAgICAgICBjb25zdCB0b3RwID0gZmFjdG9ycy5maWx0ZXIoKGZhY3RvcikgPT4gZmFjdG9yLmZhY3Rvcl90eXBlID09PSAndG90cCcgJiYgZmFjdG9yLnN0YXR1cyA9PT0gJ3ZlcmlmaWVkJyk7XG4gICAgICAgIGNvbnN0IHBob25lID0gZmFjdG9ycy5maWx0ZXIoKGZhY3RvcikgPT4gZmFjdG9yLmZhY3Rvcl90eXBlID09PSAncGhvbmUnICYmIGZhY3Rvci5zdGF0dXMgPT09ICd2ZXJpZmllZCcpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGFsbDogZmFjdG9ycyxcbiAgICAgICAgICAgICAgICB0b3RwLFxuICAgICAgICAgICAgICAgIHBob25lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiB7QHNlZSBHb1RydWVNRkFBcGkjZ2V0QXV0aGVudGljYXRvckFzc3VyYW5jZUxldmVsfVxuICAgICAqL1xuICAgIGFzeW5jIF9nZXRBdXRoZW50aWNhdG9yQXNzdXJhbmNlTGV2ZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3F1aXJlTG9jaygtMSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZVNlc3Npb24oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkYXRhOiB7IHNlc3Npb24gfSwgZXJyb3I6IHNlc3Npb25FcnJvciwgfSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yOiBzZXNzaW9uRXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFzZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IGN1cnJlbnRMZXZlbDogbnVsbCwgbmV4dExldmVsOiBudWxsLCBjdXJyZW50QXV0aGVudGljYXRpb25NZXRob2RzOiBbXSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gZGVjb2RlSldUKHNlc3Npb24uYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudExldmVsID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5hYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudExldmVsID0gcGF5bG9hZC5hYWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBuZXh0TGV2ZWwgPSBjdXJyZW50TGV2ZWw7XG4gICAgICAgICAgICAgICAgY29uc3QgdmVyaWZpZWRGYWN0b3JzID0gKF9iID0gKF9hID0gc2Vzc2lvbi51c2VyLmZhY3RvcnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5maWx0ZXIoKGZhY3RvcikgPT4gZmFjdG9yLnN0YXR1cyA9PT0gJ3ZlcmlmaWVkJykpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFtdO1xuICAgICAgICAgICAgICAgIGlmICh2ZXJpZmllZEZhY3RvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0TGV2ZWwgPSAnYWFsMic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRBdXRoZW50aWNhdGlvbk1ldGhvZHMgPSBwYXlsb2FkLmFtciB8fCBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IGN1cnJlbnRMZXZlbCwgbmV4dExldmVsLCBjdXJyZW50QXV0aGVudGljYXRpb25NZXRob2RzIH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGZldGNoSndrKGtpZCwgandrcyA9IHsga2V5czogW10gfSkge1xuICAgICAgICAvLyB0cnkgZmV0Y2hpbmcgZnJvbSB0aGUgc3VwcGxpZWQgandrc1xuICAgICAgICBsZXQgandrID0gandrcy5rZXlzLmZpbmQoKGtleSkgPT4ga2V5LmtpZCA9PT0ga2lkKTtcbiAgICAgICAgaWYgKGp3aykge1xuICAgICAgICAgICAgcmV0dXJuIGp3aztcbiAgICAgICAgfVxuICAgICAgICAvLyB0cnkgZmV0Y2hpbmcgZnJvbSBjYWNoZVxuICAgICAgICBqd2sgPSB0aGlzLmp3a3Mua2V5cy5maW5kKChrZXkpID0+IGtleS5raWQgPT09IGtpZCk7XG4gICAgICAgIC8vIGp3ayBleGlzdHMgYW5kIGp3a3MgaXNuJ3Qgc3RhbGVcbiAgICAgICAgaWYgKGp3ayAmJiB0aGlzLmp3a3NfY2FjaGVkX2F0ICsgSldLU19UVEwgPiBEYXRlLm5vdygpKSB7XG4gICAgICAgICAgICByZXR1cm4gandrO1xuICAgICAgICB9XG4gICAgICAgIC8vIGp3ayBpc24ndCBjYWNoZWQgaW4gbWVtb3J5IHNvIHdlIG5lZWQgdG8gZmV0Y2ggaXQgZnJvbSB0aGUgd2VsbC1rbm93biBlbmRwb2ludFxuICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBfcmVxdWVzdCh0aGlzLmZldGNoLCAnR0VUJywgYCR7dGhpcy51cmx9Ly53ZWxsLWtub3duL2p3a3MuanNvbmAsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkYXRhLmtleXMgfHwgZGF0YS5rZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEF1dGhJbnZhbGlkSnd0RXJyb3IoJ0pXS1MgaXMgZW1wdHknKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmp3a3MgPSBkYXRhO1xuICAgICAgICB0aGlzLmp3a3NfY2FjaGVkX2F0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgLy8gRmluZCB0aGUgc2lnbmluZyBrZXlcbiAgICAgICAgandrID0gZGF0YS5rZXlzLmZpbmQoKGtleSkgPT4ga2V5LmtpZCA9PT0ga2lkKTtcbiAgICAgICAgaWYgKCFqd2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZEp3dEVycm9yKCdObyBtYXRjaGluZyBzaWduaW5nIGtleSBmb3VuZCBpbiBKV0tTJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGp3aztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGV4cGVyaW1lbnRhbCBUaGlzIG1ldGhvZCBtYXkgY2hhbmdlIGluIGZ1dHVyZSB2ZXJzaW9ucy5cbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0cyB0aGUgY2xhaW1zIGZyb20gYSBKV1QuIElmIHRoZSBKV1QgaXMgc3ltbWV0cmljIEpXVHMsIGl0IHdpbGwgY2FsbCBnZXRVc2VyKCkgdG8gdmVyaWZ5IGFnYWluc3QgdGhlIHNlcnZlci4gSWYgdGhlIEpXVCBpcyBhc3ltbWV0cmljLCBpdCB3aWxsIGJlIHZlcmlmaWVkIGFnYWluc3QgdGhlIEpXS1MgdXNpbmcgdGhlIFdlYkNyeXB0byBBUEkuXG4gICAgICovXG4gICAgYXN5bmMgZ2V0Q2xhaW1zKGp3dCwgandrcyA9IHsga2V5czogW10gfSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHRva2VuID0gand0O1xuICAgICAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHRoaXMuZ2V0U2Vzc2lvbigpO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvciB8fCAhZGF0YS5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRva2VuID0gZGF0YS5zZXNzaW9uLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgaGVhZGVyLCBwYXlsb2FkLCBzaWduYXR1cmUsIHJhdzogeyBoZWFkZXI6IHJhd0hlYWRlciwgcGF5bG9hZDogcmF3UGF5bG9hZCB9LCB9ID0gZGVjb2RlSldUKHRva2VuKTtcbiAgICAgICAgICAgIC8vIFJlamVjdCBleHBpcmVkIEpXVHNcbiAgICAgICAgICAgIHZhbGlkYXRlRXhwKHBheWxvYWQuZXhwKTtcbiAgICAgICAgICAgIC8vIElmIHN5bW1ldHJpYyBhbGdvcml0aG0gb3IgV2ViQ3J5cHRvIEFQSSBpcyB1bmF2YWlsYWJsZSwgZmFsbGJhY2sgdG8gZ2V0VXNlcigpXG4gICAgICAgICAgICBpZiAoIWhlYWRlci5raWQgfHxcbiAgICAgICAgICAgICAgICBoZWFkZXIuYWxnID09PSAnSFMyNTYnIHx8XG4gICAgICAgICAgICAgICAgISgnY3J5cHRvJyBpbiBnbG9iYWxUaGlzICYmICdzdWJ0bGUnIGluIGdsb2JhbFRoaXMuY3J5cHRvKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHRoaXMuZ2V0VXNlcih0b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBnZXRVc2VyIHN1Y2NlZWRzIHNvIHRoZSBjbGFpbXMgaW4gdGhlIEpXVCBjYW4gYmUgdHJ1c3RlZFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYWltczogcGF5bG9hZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGFsZ29yaXRobSA9IGdldEFsZ29yaXRobShoZWFkZXIuYWxnKTtcbiAgICAgICAgICAgIGNvbnN0IHNpZ25pbmdLZXkgPSBhd2FpdCB0aGlzLmZldGNoSndrKGhlYWRlci5raWQsIGp3a3MpO1xuICAgICAgICAgICAgLy8gQ29udmVydCBKV0sgdG8gQ3J5cHRvS2V5XG4gICAgICAgICAgICBjb25zdCBwdWJsaWNLZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmltcG9ydEtleSgnandrJywgc2lnbmluZ0tleSwgYWxnb3JpdGhtLCB0cnVlLCBbXG4gICAgICAgICAgICAgICAgJ3ZlcmlmeScsXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIC8vIFZlcmlmeSB0aGUgc2lnbmF0dXJlXG4gICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgY3J5cHRvLnN1YnRsZS52ZXJpZnkoYWxnb3JpdGhtLCBwdWJsaWNLZXksIHNpZ25hdHVyZSwgc3RyaW5nVG9VaW50OEFycmF5KGAke3Jhd0hlYWRlcn0uJHtyYXdQYXlsb2FkfWApKTtcbiAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZEp3dEVycm9yKCdJbnZhbGlkIEpXVCBzaWduYXR1cmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHZlcmlmaWNhdGlvbiBzdWNjZWVkcywgZGVjb2RlIGFuZCByZXR1cm4gY2xhaW1zXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xhaW1zOiBwYXlsb2FkLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIsXG4gICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0F1dGhFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9XG59XG5Hb1RydWVDbGllbnQubmV4dEluc3RhbmNlSUQgPSAwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9R29UcnVlQ2xpZW50LmpzLm1hcCIsImltcG9ydCBHb1RydWVBZG1pbkFwaSBmcm9tICcuL0dvVHJ1ZUFkbWluQXBpJztcbmltcG9ydCBHb1RydWVDbGllbnQgZnJvbSAnLi9Hb1RydWVDbGllbnQnO1xuaW1wb3J0IEF1dGhBZG1pbkFwaSBmcm9tICcuL0F1dGhBZG1pbkFwaSc7XG5pbXBvcnQgQXV0aENsaWVudCBmcm9tICcuL0F1dGhDbGllbnQnO1xuZXhwb3J0IHsgR29UcnVlQWRtaW5BcGksIEdvVHJ1ZUNsaWVudCwgQXV0aEFkbWluQXBpLCBBdXRoQ2xpZW50IH07XG5leHBvcnQgKiBmcm9tICcuL2xpYi90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9lcnJvcnMnO1xuZXhwb3J0IHsgbmF2aWdhdG9yTG9jaywgTmF2aWdhdG9yTG9ja0FjcXVpcmVUaW1lb3V0RXJyb3IsIGludGVybmFscyBhcyBsb2NrSW50ZXJuYWxzLCB9IGZyb20gJy4vbGliL2xvY2tzJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8qKlxuICogQXZvaWQgbW9kaWZ5aW5nIHRoaXMgZmlsZS4gSXQncyBwYXJ0IG9mXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3VwYWJhc2UtY29tbXVuaXR5L2Jhc2U2NHVybC1qcy4gIFN1Ym1pdCBhbGwgZml4ZXMgb25cbiAqIHRoYXQgcmVwbyFcbiAqL1xuLyoqXG4gKiBBbiBhcnJheSBvZiBjaGFyYWN0ZXJzIHRoYXQgZW5jb2RlIDYgYml0cyBpbnRvIGEgQmFzZTY0LVVSTCBhbHBoYWJldFxuICogY2hhcmFjdGVyLlxuICovXG5jb25zdCBUT19CQVNFNjRVUkwgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODktXycuc3BsaXQoJycpO1xuLyoqXG4gKiBBbiBhcnJheSBvZiBjaGFyYWN0ZXJzIHRoYXQgY2FuIGFwcGVhciBpbiBhIEJhc2U2NC1VUkwgZW5jb2RlZCBzdHJpbmcgYnV0XG4gKiBzaG91bGQgYmUgaWdub3JlZC5cbiAqL1xuY29uc3QgSUdOT1JFX0JBU0U2NFVSTCA9ICcgXFx0XFxuXFxyPScuc3BsaXQoJycpO1xuLyoqXG4gKiBBbiBhcnJheSBvZiAxMjggbnVtYmVycyB0aGF0IG1hcCBhIEJhc2U2NC1VUkwgY2hhcmFjdGVyIHRvIDYgYml0cywgb3IgaWYgLTJcbiAqIHVzZWQgdG8gc2tpcCB0aGUgY2hhcmFjdGVyLCBvciBpZiAtMSB1c2VkIHRvIGVycm9yIG91dC5cbiAqL1xuY29uc3QgRlJPTV9CQVNFNjRVUkwgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGNoYXJNYXAgPSBuZXcgQXJyYXkoMTI4KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJNYXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY2hhck1hcFtpXSA9IC0xO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IElHTk9SRV9CQVNFNjRVUkwubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY2hhck1hcFtJR05PUkVfQkFTRTY0VVJMW2ldLmNoYXJDb2RlQXQoMCldID0gLTI7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVE9fQkFTRTY0VVJMLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNoYXJNYXBbVE9fQkFTRTY0VVJMW2ldLmNoYXJDb2RlQXQoMCldID0gaTtcbiAgICB9XG4gICAgcmV0dXJuIGNoYXJNYXA7XG59KSgpO1xuLyoqXG4gKiBDb252ZXJ0cyBhIGJ5dGUgdG8gYSBCYXNlNjQtVVJMIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gYnl0ZSBUaGUgYnl0ZSB0byBjb252ZXJ0LCBvciBudWxsIHRvIGZsdXNoIGF0IHRoZSBlbmQgb2YgdGhlIGJ5dGUgc2VxdWVuY2UuXG4gKiBAcGFyYW0gc3RhdGUgVGhlIEJhc2U2NCBjb252ZXJzaW9uIHN0YXRlLiBQYXNzIGFuIGluaXRpYWwgdmFsdWUgb2YgYHsgcXVldWU6IDAsIHF1ZXVlZEJpdHM6IDAgfWAuXG4gKiBAcGFyYW0gZW1pdCBBIGZ1bmN0aW9uIGNhbGxlZCB3aXRoIHRoZSBuZXh0IEJhc2U2NCBjaGFyYWN0ZXIgd2hlbiByZWFkeS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVUb0Jhc2U2NFVSTChieXRlLCBzdGF0ZSwgZW1pdCkge1xuICAgIGlmIChieXRlICE9PSBudWxsKSB7XG4gICAgICAgIHN0YXRlLnF1ZXVlID0gKHN0YXRlLnF1ZXVlIDw8IDgpIHwgYnl0ZTtcbiAgICAgICAgc3RhdGUucXVldWVkQml0cyArPSA4O1xuICAgICAgICB3aGlsZSAoc3RhdGUucXVldWVkQml0cyA+PSA2KSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSAoc3RhdGUucXVldWUgPj4gKHN0YXRlLnF1ZXVlZEJpdHMgLSA2KSkgJiA2MztcbiAgICAgICAgICAgIGVtaXQoVE9fQkFTRTY0VVJMW3Bvc10pO1xuICAgICAgICAgICAgc3RhdGUucXVldWVkQml0cyAtPSA2O1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHN0YXRlLnF1ZXVlZEJpdHMgPiAwKSB7XG4gICAgICAgIHN0YXRlLnF1ZXVlID0gc3RhdGUucXVldWUgPDwgKDYgLSBzdGF0ZS5xdWV1ZWRCaXRzKTtcbiAgICAgICAgc3RhdGUucXVldWVkQml0cyA9IDY7XG4gICAgICAgIHdoaWxlIChzdGF0ZS5xdWV1ZWRCaXRzID49IDYpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IChzdGF0ZS5xdWV1ZSA+PiAoc3RhdGUucXVldWVkQml0cyAtIDYpKSAmIDYzO1xuICAgICAgICAgICAgZW1pdChUT19CQVNFNjRVUkxbcG9zXSk7XG4gICAgICAgICAgICBzdGF0ZS5xdWV1ZWRCaXRzIC09IDY7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIENvbnZlcnRzIGEgU3RyaW5nIGNoYXIgY29kZSAoZXh0cmFjdGVkIHVzaW5nIGBzdHJpbmcuY2hhckNvZGVBdChwb3NpdGlvbilgKSB0byBhIHNlcXVlbmNlIG9mIEJhc2U2NC1VUkwgY2hhcmFjdGVycy5cbiAqXG4gKiBAcGFyYW0gY2hhckNvZGUgVGhlIGNoYXIgY29kZSBvZiB0aGUgSmF2YVNjcmlwdCBzdHJpbmcuXG4gKiBAcGFyYW0gc3RhdGUgVGhlIEJhc2U2NCBzdGF0ZS4gUGFzcyBhbiBpbml0aWFsIHZhbHVlIG9mIGB7IHF1ZXVlOiAwLCBxdWV1ZWRCaXRzOiAwIH1gLlxuICogQHBhcmFtIGVtaXQgQSBmdW5jdGlvbiBjYWxsZWQgd2l0aCB0aGUgbmV4dCBieXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnl0ZUZyb21CYXNlNjRVUkwoY2hhckNvZGUsIHN0YXRlLCBlbWl0KSB7XG4gICAgY29uc3QgYml0cyA9IEZST01fQkFTRTY0VVJMW2NoYXJDb2RlXTtcbiAgICBpZiAoYml0cyA+IC0xKSB7XG4gICAgICAgIC8vIHZhbGlkIEJhc2U2NC1VUkwgY2hhcmFjdGVyXG4gICAgICAgIHN0YXRlLnF1ZXVlID0gKHN0YXRlLnF1ZXVlIDw8IDYpIHwgYml0cztcbiAgICAgICAgc3RhdGUucXVldWVkQml0cyArPSA2O1xuICAgICAgICB3aGlsZSAoc3RhdGUucXVldWVkQml0cyA+PSA4KSB7XG4gICAgICAgICAgICBlbWl0KChzdGF0ZS5xdWV1ZSA+PiAoc3RhdGUucXVldWVkQml0cyAtIDgpKSAmIDB4ZmYpO1xuICAgICAgICAgICAgc3RhdGUucXVldWVkQml0cyAtPSA4O1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGJpdHMgPT09IC0yKSB7XG4gICAgICAgIC8vIGlnbm9yZSBzcGFjZXMsIHRhYnMsIG5ld2xpbmVzLCA9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBCYXNlNjQtVVJMIGNoYXJhY3RlciBcIiR7U3RyaW5nLmZyb21DaGFyQ29kZShjaGFyQ29kZSl9XCJgKTtcbiAgICB9XG59XG4vKipcbiAqIENvbnZlcnRzIGEgSmF2YVNjcmlwdCBzdHJpbmcgKHdoaWNoIG1heSBpbmNsdWRlIGFueSB2YWxpZCBjaGFyYWN0ZXIpIGludG8gYVxuICogQmFzZTY0LVVSTCBlbmNvZGVkIHN0cmluZy4gVGhlIHN0cmluZyBpcyBmaXJzdCBlbmNvZGVkIGluIFVURi04IHdoaWNoIGlzXG4gKiB0aGVuIGVuY29kZWQgYXMgQmFzZTY0LVVSTC5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvQmFzZTY0VVJMKHN0cikge1xuICAgIGNvbnN0IGJhc2U2NCA9IFtdO1xuICAgIGNvbnN0IGVtaXR0ZXIgPSAoY2hhcikgPT4ge1xuICAgICAgICBiYXNlNjQucHVzaChjaGFyKTtcbiAgICB9O1xuICAgIGNvbnN0IHN0YXRlID0geyBxdWV1ZTogMCwgcXVldWVkQml0czogMCB9O1xuICAgIHN0cmluZ1RvVVRGOChzdHIsIChieXRlKSA9PiB7XG4gICAgICAgIGJ5dGVUb0Jhc2U2NFVSTChieXRlLCBzdGF0ZSwgZW1pdHRlcik7XG4gICAgfSk7XG4gICAgYnl0ZVRvQmFzZTY0VVJMKG51bGwsIHN0YXRlLCBlbWl0dGVyKTtcbiAgICByZXR1cm4gYmFzZTY0LmpvaW4oJycpO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhIEJhc2U2NC1VUkwgZW5jb2RlZCBzdHJpbmcgaW50byBhIEphdmFTY3JpcHQgc3RyaW5nLiBJdCBpcyBhc3N1bWVkXG4gKiB0aGF0IHRoZSB1bmRlcmx5aW5nIHN0cmluZyBoYXMgYmVlbiBlbmNvZGVkIGFzIFVURi04LlxuICpcbiAqIEBwYXJhbSBzdHIgVGhlIEJhc2U2NC1VUkwgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdGcm9tQmFzZTY0VVJMKHN0cikge1xuICAgIGNvbnN0IGNvbnYgPSBbXTtcbiAgICBjb25zdCB1dGY4RW1pdCA9IChjb2RlcG9pbnQpID0+IHtcbiAgICAgICAgY29udi5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KGNvZGVwb2ludCkpO1xuICAgIH07XG4gICAgY29uc3QgdXRmOFN0YXRlID0ge1xuICAgICAgICB1dGY4c2VxOiAwLFxuICAgICAgICBjb2RlcG9pbnQ6IDAsXG4gICAgfTtcbiAgICBjb25zdCBiNjRTdGF0ZSA9IHsgcXVldWU6IDAsIHF1ZXVlZEJpdHM6IDAgfTtcbiAgICBjb25zdCBieXRlRW1pdCA9IChieXRlKSA9PiB7XG4gICAgICAgIHN0cmluZ0Zyb21VVEY4KGJ5dGUsIHV0ZjhTdGF0ZSwgdXRmOEVtaXQpO1xuICAgIH07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYnl0ZUZyb21CYXNlNjRVUkwoc3RyLmNoYXJDb2RlQXQoaSksIGI2NFN0YXRlLCBieXRlRW1pdCk7XG4gICAgfVxuICAgIHJldHVybiBjb252LmpvaW4oJycpO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhIFVuaWNvZGUgY29kZXBvaW50IHRvIGEgbXVsdGktYnl0ZSBVVEYtOCBzZXF1ZW5jZS5cbiAqXG4gKiBAcGFyYW0gY29kZXBvaW50IFRoZSBVbmljb2RlIGNvZGVwb2ludC5cbiAqIEBwYXJhbSBlbWl0ICAgICAgRnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggVVRGLTggYnl0ZSB0aGF0IHJlcHJlc2VudHMgdGhlIGNvZGVwb2ludC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvZGVwb2ludFRvVVRGOChjb2RlcG9pbnQsIGVtaXQpIHtcbiAgICBpZiAoY29kZXBvaW50IDw9IDB4N2YpIHtcbiAgICAgICAgZW1pdChjb2RlcG9pbnQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvZGVwb2ludCA8PSAweDdmZikge1xuICAgICAgICBlbWl0KDB4YzAgfCAoY29kZXBvaW50ID4+IDYpKTtcbiAgICAgICAgZW1pdCgweDgwIHwgKGNvZGVwb2ludCAmIDB4M2YpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb2RlcG9pbnQgPD0gMHhmZmZmKSB7XG4gICAgICAgIGVtaXQoMHhlMCB8IChjb2RlcG9pbnQgPj4gMTIpKTtcbiAgICAgICAgZW1pdCgweDgwIHwgKChjb2RlcG9pbnQgPj4gNikgJiAweDNmKSk7XG4gICAgICAgIGVtaXQoMHg4MCB8IChjb2RlcG9pbnQgJiAweDNmKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29kZXBvaW50IDw9IDB4MTBmZmZmKSB7XG4gICAgICAgIGVtaXQoMHhmMCB8IChjb2RlcG9pbnQgPj4gMTgpKTtcbiAgICAgICAgZW1pdCgweDgwIHwgKChjb2RlcG9pbnQgPj4gMTIpICYgMHgzZikpO1xuICAgICAgICBlbWl0KDB4ODAgfCAoKGNvZGVwb2ludCA+PiA2KSAmIDB4M2YpKTtcbiAgICAgICAgZW1pdCgweDgwIHwgKGNvZGVwb2ludCAmIDB4M2YpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVucmVjb2duaXplZCBVbmljb2RlIGNvZGVwb2ludDogJHtjb2RlcG9pbnQudG9TdHJpbmcoMTYpfWApO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhIEphdmFTY3JpcHQgc3RyaW5nIHRvIGEgc2VxdWVuY2Ugb2YgVVRGLTggYnl0ZXMuXG4gKlxuICogQHBhcmFtIHN0ciAgVGhlIHN0cmluZyB0byBjb252ZXJ0IHRvIFVURi04LlxuICogQHBhcmFtIGVtaXQgRnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggVVRGLTggYnl0ZSBvZiB0aGUgc3RyaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9VVEY4KHN0ciwgZW1pdCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGxldCBjb2RlcG9pbnQgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGNvZGVwb2ludCA+IDB4ZDdmZiAmJiBjb2RlcG9pbnQgPD0gMHhkYmZmKSB7XG4gICAgICAgICAgICAvLyBtb3N0IFVURi0xNiBjb2RlcG9pbnRzIGFyZSBVbmljb2RlIGNvZGVwb2ludHMsIGV4Y2VwdCB2YWx1ZXMgaW4gdGhpc1xuICAgICAgICAgICAgLy8gcmFuZ2Ugd2hlcmUgdGhlIG5leHQgVVRGLTE2IGNvZGVwb2ludCBuZWVkcyB0byBiZSBjb21iaW5lZCB3aXRoIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBvbmUgdG8gZ2V0IHRoZSBVbmljb2RlIGNvZGVwb2ludFxuICAgICAgICAgICAgY29uc3QgaGlnaFN1cnJvZ2F0ZSA9ICgoY29kZXBvaW50IC0gMHhkODAwKSAqIDB4NDAwKSAmIDB4ZmZmZjtcbiAgICAgICAgICAgIGNvbnN0IGxvd1N1cnJvZ2F0ZSA9IChzdHIuY2hhckNvZGVBdChpICsgMSkgLSAweGRjMDApICYgMHhmZmZmO1xuICAgICAgICAgICAgY29kZXBvaW50ID0gKGxvd1N1cnJvZ2F0ZSB8IGhpZ2hTdXJyb2dhdGUpICsgMHgxMDAwMDtcbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBjb2RlcG9pbnRUb1VURjgoY29kZXBvaW50LCBlbWl0KTtcbiAgICB9XG59XG4vKipcbiAqIENvbnZlcnRzIGEgVVRGLTggYnl0ZSB0byBhIFVuaWNvZGUgY29kZXBvaW50LlxuICpcbiAqIEBwYXJhbSBieXRlICBUaGUgVVRGLTggYnl0ZSBuZXh0IGluIHRoZSBzZXF1ZW5jZS5cbiAqIEBwYXJhbSBzdGF0ZSBUaGUgc2hhcmVkIHN0YXRlIGJldHdlZW4gY29uc2VjdXRpdmUgVVRGLTggYnl0ZXMgaW4gdGhlXG4gKiAgICAgICAgICAgICAgc2VxdWVuY2UsIGFuIG9iamVjdCB3aXRoIHRoZSBzaGFwZSBgeyB1dGY4c2VxOiAwLCBjb2RlcG9pbnQ6IDAgfWAuXG4gKiBAcGFyYW0gZW1pdCAgRnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2ggY29kZXBvaW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nRnJvbVVURjgoYnl0ZSwgc3RhdGUsIGVtaXQpIHtcbiAgICBpZiAoc3RhdGUudXRmOHNlcSA9PT0gMCkge1xuICAgICAgICBpZiAoYnl0ZSA8PSAweDdmKSB7XG4gICAgICAgICAgICBlbWl0KGJ5dGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvdW50IHRoZSBudW1iZXIgb2YgMSBsZWFkaW5nIGJpdHMgdW50aWwgeW91IHJlYWNoIDBcbiAgICAgICAgZm9yIChsZXQgbGVhZGluZ0JpdCA9IDE7IGxlYWRpbmdCaXQgPCA2OyBsZWFkaW5nQml0ICs9IDEpIHtcbiAgICAgICAgICAgIGlmICgoKGJ5dGUgPj4gKDcgLSBsZWFkaW5nQml0KSkgJiAxKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0YXRlLnV0ZjhzZXEgPSBsZWFkaW5nQml0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0ZS51dGY4c2VxID09PSAyKSB7XG4gICAgICAgICAgICBzdGF0ZS5jb2RlcG9pbnQgPSBieXRlICYgMzE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhdGUudXRmOHNlcSA9PT0gMykge1xuICAgICAgICAgICAgc3RhdGUuY29kZXBvaW50ID0gYnl0ZSAmIDE1O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXRlLnV0ZjhzZXEgPT09IDQpIHtcbiAgICAgICAgICAgIHN0YXRlLmNvZGVwb2ludCA9IGJ5dGUgJiA3O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFVURi04IHNlcXVlbmNlJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUudXRmOHNlcSAtPSAxO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdGF0ZS51dGY4c2VxID4gMCkge1xuICAgICAgICBpZiAoYnl0ZSA8PSAweDdmKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgVVRGLTggc2VxdWVuY2UnKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5jb2RlcG9pbnQgPSAoc3RhdGUuY29kZXBvaW50IDw8IDYpIHwgKGJ5dGUgJiA2Myk7XG4gICAgICAgIHN0YXRlLnV0ZjhzZXEgLT0gMTtcbiAgICAgICAgaWYgKHN0YXRlLnV0ZjhzZXEgPT09IDApIHtcbiAgICAgICAgICAgIGVtaXQoc3RhdGUuY29kZXBvaW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9ucyB0byBjb252ZXJ0IGRpZmZlcmVudCB0eXBlcyBvZiBzdHJpbmdzIHRvIFVpbnQ4QXJyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJhc2U2NFVybFRvVWludDhBcnJheShzdHIpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBzdGF0ZSA9IHsgcXVldWU6IDAsIHF1ZXVlZEJpdHM6IDAgfTtcbiAgICBjb25zdCBvbkJ5dGUgPSAoYnl0ZSkgPT4ge1xuICAgICAgICByZXN1bHQucHVzaChieXRlKTtcbiAgICB9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGJ5dGVGcm9tQmFzZTY0VVJMKHN0ci5jaGFyQ29kZUF0KGkpLCBzdGF0ZSwgb25CeXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHJlc3VsdCk7XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9VaW50OEFycmF5KHN0cikge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIHN0cmluZ1RvVVRGOChzdHIsIChieXRlKSA9PiByZXN1bHQucHVzaChieXRlKSk7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHJlc3VsdCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYXNlNjR1cmwuanMubWFwIiwiaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbic7XG4vKiogQ3VycmVudCBzZXNzaW9uIHdpbGwgYmUgY2hlY2tlZCBmb3IgcmVmcmVzaCBhdCB0aGlzIGludGVydmFsLiAqL1xuZXhwb3J0IGNvbnN0IEFVVE9fUkVGUkVTSF9USUNLX0RVUkFUSU9OX01TID0gMzAgKiAxMDAwO1xuLyoqXG4gKiBBIHRva2VuIHJlZnJlc2ggd2lsbCBiZSBhdHRlbXB0ZWQgdGhpcyBtYW55IHRpY2tzIGJlZm9yZSB0aGUgY3VycmVudCBzZXNzaW9uIGV4cGlyZXMuICovXG5leHBvcnQgY29uc3QgQVVUT19SRUZSRVNIX1RJQ0tfVEhSRVNIT0xEID0gMztcbi8qXG4gKiBFYXJsaWVzdCB0aW1lIGJlZm9yZSBhbiBhY2Nlc3MgdG9rZW4gZXhwaXJlcyB0aGF0IHRoZSBzZXNzaW9uIHNob3VsZCBiZSByZWZyZXNoZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBFWFBJUllfTUFSR0lOX01TID0gQVVUT19SRUZSRVNIX1RJQ0tfVEhSRVNIT0xEICogQVVUT19SRUZSRVNIX1RJQ0tfRFVSQVRJT05fTVM7XG5leHBvcnQgY29uc3QgR09UUlVFX1VSTCA9ICdodHRwOi8vbG9jYWxob3N0Ojk5OTknO1xuZXhwb3J0IGNvbnN0IFNUT1JBR0VfS0VZID0gJ3N1cGFiYXNlLmF1dGgudG9rZW4nO1xuZXhwb3J0IGNvbnN0IEFVRElFTkNFID0gJyc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9IRUFERVJTID0geyAnWC1DbGllbnQtSW5mbyc6IGBnb3RydWUtanMvJHt2ZXJzaW9ufWAgfTtcbmV4cG9ydCBjb25zdCBORVRXT1JLX0ZBSUxVUkUgPSB7XG4gICAgTUFYX1JFVFJJRVM6IDEwLFxuICAgIFJFVFJZX0lOVEVSVkFMOiAyLCAvLyBpbiBkZWNpc2Vjb25kc1xufTtcbmV4cG9ydCBjb25zdCBBUElfVkVSU0lPTl9IRUFERVJfTkFNRSA9ICdYLVN1cGFiYXNlLUFwaS1WZXJzaW9uJztcbmV4cG9ydCBjb25zdCBBUElfVkVSU0lPTlMgPSB7XG4gICAgJzIwMjQtMDEtMDEnOiB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5wYXJzZSgnMjAyNC0wMS0wMVQwMDowMDowMC4wWicpLFxuICAgICAgICBuYW1lOiAnMjAyNC0wMS0wMScsXG4gICAgfSxcbn07XG5leHBvcnQgY29uc3QgQkFTRTY0VVJMX1JFR0VYID0gL14oW2EtejAtOV8tXXs0fSkqKCR8W2EtejAtOV8tXXszfSR8W2EtejAtOV8tXXsyfSQpJC9pO1xuZXhwb3J0IGNvbnN0IEpXS1NfVFRMID0gNjAwMDAwOyAvLyAxMCBtaW51dGVzXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwiZXhwb3J0IGNsYXNzIEF1dGhFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMsIGNvZGUpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuX19pc0F1dGhFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMubmFtZSA9ICdBdXRoRXJyb3InO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNBdXRoRXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4gdHlwZW9mIGVycm9yID09PSAnb2JqZWN0JyAmJiBlcnJvciAhPT0gbnVsbCAmJiAnX19pc0F1dGhFcnJvcicgaW4gZXJyb3I7XG59XG5leHBvcnQgY2xhc3MgQXV0aEFwaUVycm9yIGV4dGVuZHMgQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMsIGNvZGUpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgc3RhdHVzLCBjb2RlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ0F1dGhBcGlFcnJvcic7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhBcGlFcnJvcihlcnJvcikge1xuICAgIHJldHVybiBpc0F1dGhFcnJvcihlcnJvcikgJiYgZXJyb3IubmFtZSA9PT0gJ0F1dGhBcGlFcnJvcic7XG59XG5leHBvcnQgY2xhc3MgQXV0aFVua25vd25FcnJvciBleHRlbmRzIEF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgb3JpZ2luYWxFcnJvcikge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ0F1dGhVbmtub3duRXJyb3InO1xuICAgICAgICB0aGlzLm9yaWdpbmFsRXJyb3IgPSBvcmlnaW5hbEVycm9yO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBDdXN0b21BdXRoRXJyb3IgZXh0ZW5kcyBBdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIG5hbWUsIHN0YXR1cywgY29kZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCBzdGF0dXMsIGNvZGUpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignQXV0aCBzZXNzaW9uIG1pc3NpbmchJywgJ0F1dGhTZXNzaW9uTWlzc2luZ0Vycm9yJywgNDAwLCB1bmRlZmluZWQpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhTZXNzaW9uTWlzc2luZ0Vycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuIGlzQXV0aEVycm9yKGVycm9yKSAmJiBlcnJvci5uYW1lID09PSAnQXV0aFNlc3Npb25NaXNzaW5nRXJyb3InO1xufVxuZXhwb3J0IGNsYXNzIEF1dGhJbnZhbGlkVG9rZW5SZXNwb25zZUVycm9yIGV4dGVuZHMgQ3VzdG9tQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0F1dGggc2Vzc2lvbiBvciB1c2VyIG1pc3NpbmcnLCAnQXV0aEludmFsaWRUb2tlblJlc3BvbnNlRXJyb3InLCA1MDAsIHVuZGVmaW5lZCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEF1dGhJbnZhbGlkQ3JlZGVudGlhbHNFcnJvciBleHRlbmRzIEN1c3RvbUF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnQXV0aEludmFsaWRDcmVkZW50aWFsc0Vycm9yJywgNDAwLCB1bmRlZmluZWQpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGRldGFpbHMgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdBdXRoSW1wbGljaXRHcmFudFJlZGlyZWN0RXJyb3InLCA1MDAsIHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IG51bGw7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgICBkZXRhaWxzOiB0aGlzLmRldGFpbHMsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuIGlzQXV0aEVycm9yKGVycm9yKSAmJiBlcnJvci5uYW1lID09PSAnQXV0aEltcGxpY2l0R3JhbnRSZWRpcmVjdEVycm9yJztcbn1cbmV4cG9ydCBjbGFzcyBBdXRoUEtDRUdyYW50Q29kZUV4Y2hhbmdlRXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGRldGFpbHMgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UsICdBdXRoUEtDRUdyYW50Q29kZUV4Y2hhbmdlRXJyb3InLCA1MDAsIHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IG51bGw7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgICBkZXRhaWxzOiB0aGlzLmRldGFpbHMsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEF1dGhSZXRyeWFibGVGZXRjaEVycm9yIGV4dGVuZHMgQ3VzdG9tQXV0aEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBzdGF0dXMpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSwgJ0F1dGhSZXRyeWFibGVGZXRjaEVycm9yJywgc3RhdHVzLCB1bmRlZmluZWQpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhSZXRyeWFibGVGZXRjaEVycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuIGlzQXV0aEVycm9yKGVycm9yKSAmJiBlcnJvci5uYW1lID09PSAnQXV0aFJldHJ5YWJsZUZldGNoRXJyb3InO1xufVxuLyoqXG4gKiBUaGlzIGVycm9yIGlzIHRocm93biBvbiBjZXJ0YWluIG1ldGhvZHMgd2hlbiB0aGUgcGFzc3dvcmQgdXNlZCBpcyBkZWVtZWRcbiAqIHdlYWsuIEluc3BlY3QgdGhlIHJlYXNvbnMgdG8gaWRlbnRpZnkgd2hhdCBwYXNzd29yZCBzdHJlbmd0aCBydWxlcyBhcmVcbiAqIGluYWRlcXVhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRoV2Vha1Bhc3N3b3JkRXJyb3IgZXh0ZW5kcyBDdXN0b21BdXRoRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIHN0YXR1cywgcmVhc29ucykge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnQXV0aFdlYWtQYXNzd29yZEVycm9yJywgc3RhdHVzLCAnd2Vha19wYXNzd29yZCcpO1xuICAgICAgICB0aGlzLnJlYXNvbnMgPSByZWFzb25zO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0F1dGhXZWFrUGFzc3dvcmRFcnJvcihlcnJvcikge1xuICAgIHJldHVybiBpc0F1dGhFcnJvcihlcnJvcikgJiYgZXJyb3IubmFtZSA9PT0gJ0F1dGhXZWFrUGFzc3dvcmRFcnJvcic7XG59XG5leHBvcnQgY2xhc3MgQXV0aEludmFsaWRKd3RFcnJvciBleHRlbmRzIEN1c3RvbUF1dGhFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlLCAnQXV0aEludmFsaWRKd3RFcnJvcicsIDQwMCwgJ2ludmFsaWRfand0Jyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JzLmpzLm1hcCIsInZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbmltcG9ydCB7IEFQSV9WRVJTSU9OUywgQVBJX1ZFUlNJT05fSEVBREVSX05BTUUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBleHBpcmVzQXQsIGxvb2tzTGlrZUZldGNoUmVzcG9uc2UsIHBhcnNlUmVzcG9uc2VBUElWZXJzaW9uIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IEF1dGhBcGlFcnJvciwgQXV0aFJldHJ5YWJsZUZldGNoRXJyb3IsIEF1dGhXZWFrUGFzc3dvcmRFcnJvciwgQXV0aFVua25vd25FcnJvciwgQXV0aFNlc3Npb25NaXNzaW5nRXJyb3IsIH0gZnJvbSAnLi9lcnJvcnMnO1xuY29uc3QgX2dldEVycm9yTWVzc2FnZSA9IChlcnIpID0+IGVyci5tc2cgfHwgZXJyLm1lc3NhZ2UgfHwgZXJyLmVycm9yX2Rlc2NyaXB0aW9uIHx8IGVyci5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShlcnIpO1xuY29uc3QgTkVUV09SS19FUlJPUl9DT0RFUyA9IFs1MDIsIDUwMywgNTA0XTtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvcikge1xuICAgIHZhciBfYTtcbiAgICBpZiAoIWxvb2tzTGlrZUZldGNoUmVzcG9uc2UoZXJyb3IpKSB7XG4gICAgICAgIHRocm93IG5ldyBBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGVycm9yKSwgMCk7XG4gICAgfVxuICAgIGlmIChORVRXT1JLX0VSUk9SX0NPREVTLmluY2x1ZGVzKGVycm9yLnN0YXR1cykpIHtcbiAgICAgICAgLy8gc3RhdHVzIGluIDUwMC4uLjU5OSByYW5nZSAtIHNlcnZlciBoYWQgYW4gZXJyb3IsIHJlcXVlc3QgbWlnaHQgYmUgcmV0cnllZC5cbiAgICAgICAgdGhyb3cgbmV3IEF1dGhSZXRyeWFibGVGZXRjaEVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZXJyb3IpLCBlcnJvci5zdGF0dXMpO1xuICAgIH1cbiAgICBsZXQgZGF0YTtcbiAgICB0cnkge1xuICAgICAgICBkYXRhID0gYXdhaXQgZXJyb3IuanNvbigpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyBuZXcgQXV0aFVua25vd25FcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGUpLCBlKTtcbiAgICB9XG4gICAgbGV0IGVycm9yQ29kZSA9IHVuZGVmaW5lZDtcbiAgICBjb25zdCByZXNwb25zZUFQSVZlcnNpb24gPSBwYXJzZVJlc3BvbnNlQVBJVmVyc2lvbihlcnJvcik7XG4gICAgaWYgKHJlc3BvbnNlQVBJVmVyc2lvbiAmJlxuICAgICAgICByZXNwb25zZUFQSVZlcnNpb24uZ2V0VGltZSgpID49IEFQSV9WRVJTSU9OU1snMjAyNC0wMS0wMSddLnRpbWVzdGFtcCAmJlxuICAgICAgICB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgZGF0YSAmJlxuICAgICAgICB0eXBlb2YgZGF0YS5jb2RlID09PSAnc3RyaW5nJykge1xuICAgICAgICBlcnJvckNvZGUgPSBkYXRhLmNvZGU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiBkYXRhICYmIHR5cGVvZiBkYXRhLmVycm9yX2NvZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGVycm9yQ29kZSA9IGRhdGEuZXJyb3JfY29kZTtcbiAgICB9XG4gICAgaWYgKCFlcnJvckNvZGUpIHtcbiAgICAgICAgLy8gTGVnYWN5IHN1cHBvcnQgZm9yIHdlYWsgcGFzc3dvcmQgZXJyb3JzLCB3aGVuIHRoZXJlIHdlcmUgbm8gZXJyb3IgY29kZXNcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgZGF0YSAmJlxuICAgICAgICAgICAgdHlwZW9mIGRhdGEud2Vha19wYXNzd29yZCA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIGRhdGEud2Vha19wYXNzd29yZCAmJlxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShkYXRhLndlYWtfcGFzc3dvcmQucmVhc29ucykgJiZcbiAgICAgICAgICAgIGRhdGEud2Vha19wYXNzd29yZC5yZWFzb25zLmxlbmd0aCAmJlxuICAgICAgICAgICAgZGF0YS53ZWFrX3Bhc3N3b3JkLnJlYXNvbnMucmVkdWNlKChhLCBpKSA9PiBhICYmIHR5cGVvZiBpID09PSAnc3RyaW5nJywgdHJ1ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBdXRoV2Vha1Bhc3N3b3JkRXJyb3IoX2dldEVycm9yTWVzc2FnZShkYXRhKSwgZXJyb3Iuc3RhdHVzLCBkYXRhLndlYWtfcGFzc3dvcmQucmVhc29ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZXJyb3JDb2RlID09PSAnd2Vha19wYXNzd29yZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF1dGhXZWFrUGFzc3dvcmRFcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGRhdGEpLCBlcnJvci5zdGF0dXMsICgoX2EgPSBkYXRhLndlYWtfcGFzc3dvcmQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZWFzb25zKSB8fCBbXSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGVycm9yQ29kZSA9PT0gJ3Nlc3Npb25fbm90X2ZvdW5kJykge1xuICAgICAgICAvLyBUaGUgYHNlc3Npb25faWRgIGluc2lkZSB0aGUgSldUIGRvZXMgbm90IGNvcnJlc3BvbmQgdG8gYSByb3cgaW4gdGhlXG4gICAgICAgIC8vIGBzZXNzaW9uc2AgdGFibGUuIFRoaXMgdXN1YWxseSBtZWFucyB0aGUgdXNlciBoYXMgc2lnbmVkIG91dCwgaGFzIGJlZW5cbiAgICAgICAgLy8gZGVsZXRlZCwgb3IgdGhlaXIgc2Vzc2lvbiBoYXMgc29tZWhvdyBiZWVuIHRlcm1pbmF0ZWQuXG4gICAgICAgIHRocm93IG5ldyBBdXRoU2Vzc2lvbk1pc3NpbmdFcnJvcigpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQXV0aEFwaUVycm9yKF9nZXRFcnJvck1lc3NhZ2UoZGF0YSksIGVycm9yLnN0YXR1cyB8fCA1MDAsIGVycm9yQ29kZSk7XG59XG5jb25zdCBfZ2V0UmVxdWVzdFBhcmFtcyA9IChtZXRob2QsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpID0+IHtcbiAgICBjb25zdCBwYXJhbXMgPSB7IG1ldGhvZCwgaGVhZGVyczogKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5oZWFkZXJzKSB8fCB7fSB9O1xuICAgIGlmIChtZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIHBhcmFtcy5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04JyB9LCBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuaGVhZGVycyk7XG4gICAgcGFyYW1zLmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCBwYXJhbWV0ZXJzKTtcbn07XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gX3JlcXVlc3QoZmV0Y2hlciwgbWV0aG9kLCB1cmwsIG9wdGlvbnMpIHtcbiAgICB2YXIgX2E7XG4gICAgY29uc3QgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5oZWFkZXJzKTtcbiAgICBpZiAoIWhlYWRlcnNbQVBJX1ZFUlNJT05fSEVBREVSX05BTUVdKSB7XG4gICAgICAgIGhlYWRlcnNbQVBJX1ZFUlNJT05fSEVBREVSX05BTUVdID0gQVBJX1ZFUlNJT05TWycyMDI0LTAxLTAxJ10ubmFtZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5qd3QpIHtcbiAgICAgICAgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gYEJlYXJlciAke29wdGlvbnMuand0fWA7XG4gICAgfVxuICAgIGNvbnN0IHFzID0gKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnF1ZXJ5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fTtcbiAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnJlZGlyZWN0VG8pIHtcbiAgICAgICAgcXNbJ3JlZGlyZWN0X3RvJ10gPSBvcHRpb25zLnJlZGlyZWN0VG87XG4gICAgfVxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMocXMpLmxlbmd0aCA/ICc/JyArIG5ldyBVUkxTZWFyY2hQYXJhbXMocXMpLnRvU3RyaW5nKCkgOiAnJztcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgX2hhbmRsZVJlcXVlc3QoZmV0Y2hlciwgbWV0aG9kLCB1cmwgKyBxdWVyeVN0cmluZywge1xuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBub1Jlc29sdmVKc29uOiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubm9SZXNvbHZlSnNvbixcbiAgICB9LCB7fSwgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmJvZHkpO1xuICAgIHJldHVybiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnhmb3JtKSA/IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy54Zm9ybShkYXRhKSA6IHsgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgZGF0YSksIGVycm9yOiBudWxsIH07XG59XG5hc3luYyBmdW5jdGlvbiBfaGFuZGxlUmVxdWVzdChmZXRjaGVyLCBtZXRob2QsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSkge1xuICAgIGNvbnN0IHJlcXVlc3RQYXJhbXMgPSBfZ2V0UmVxdWVzdFBhcmFtcyhtZXRob2QsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgZmV0Y2hlcih1cmwsIE9iamVjdC5hc3NpZ24oe30sIHJlcXVlc3RQYXJhbXMpKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgLy8gZmV0Y2ggZmFpbGVkLCBsaWtlbHkgZHVlIHRvIGEgbmV0d29yayBvciBDT1JTIGVycm9yXG4gICAgICAgIHRocm93IG5ldyBBdXRoUmV0cnlhYmxlRmV0Y2hFcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGUpLCAwKTtcbiAgICB9XG4gICAgaWYgKCFyZXN1bHQub2spIHtcbiAgICAgICAgYXdhaXQgaGFuZGxlRXJyb3IocmVzdWx0KTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5ub1Jlc29sdmVKc29uKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhd2FpdCByZXN1bHQuanNvbigpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBhd2FpdCBoYW5kbGVFcnJvcihlKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gX3Nlc3Npb25SZXNwb25zZShkYXRhKSB7XG4gICAgdmFyIF9hO1xuICAgIGxldCBzZXNzaW9uID0gbnVsbDtcbiAgICBpZiAoaGFzU2Vzc2lvbihkYXRhKSkge1xuICAgICAgICBzZXNzaW9uID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XG4gICAgICAgIGlmICghZGF0YS5leHBpcmVzX2F0KSB7XG4gICAgICAgICAgICBzZXNzaW9uLmV4cGlyZXNfYXQgPSBleHBpcmVzQXQoZGF0YS5leHBpcmVzX2luKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB1c2VyID0gKF9hID0gZGF0YS51c2VyKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkYXRhO1xuICAgIHJldHVybiB7IGRhdGE6IHsgc2Vzc2lvbiwgdXNlciB9LCBlcnJvcjogbnVsbCB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIF9zZXNzaW9uUmVzcG9uc2VQYXNzd29yZChkYXRhKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBfc2Vzc2lvblJlc3BvbnNlKGRhdGEpO1xuICAgIGlmICghcmVzcG9uc2UuZXJyb3IgJiZcbiAgICAgICAgZGF0YS53ZWFrX3Bhc3N3b3JkICYmXG4gICAgICAgIHR5cGVvZiBkYXRhLndlYWtfcGFzc3dvcmQgPT09ICdvYmplY3QnICYmXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZGF0YS53ZWFrX3Bhc3N3b3JkLnJlYXNvbnMpICYmXG4gICAgICAgIGRhdGEud2Vha19wYXNzd29yZC5yZWFzb25zLmxlbmd0aCAmJlxuICAgICAgICBkYXRhLndlYWtfcGFzc3dvcmQubWVzc2FnZSAmJlxuICAgICAgICB0eXBlb2YgZGF0YS53ZWFrX3Bhc3N3b3JkLm1lc3NhZ2UgPT09ICdzdHJpbmcnICYmXG4gICAgICAgIGRhdGEud2Vha19wYXNzd29yZC5yZWFzb25zLnJlZHVjZSgoYSwgaSkgPT4gYSAmJiB0eXBlb2YgaSA9PT0gJ3N0cmluZycsIHRydWUpKSB7XG4gICAgICAgIHJlc3BvbnNlLmRhdGEud2Vha19wYXNzd29yZCA9IGRhdGEud2Vha19wYXNzd29yZDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIF91c2VyUmVzcG9uc2UoZGF0YSkge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCB1c2VyID0gKF9hID0gZGF0YS51c2VyKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkYXRhO1xuICAgIHJldHVybiB7IGRhdGE6IHsgdXNlciB9LCBlcnJvcjogbnVsbCB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIF9zc29SZXNwb25zZShkYXRhKSB7XG4gICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBfZ2VuZXJhdGVMaW5rUmVzcG9uc2UoZGF0YSkge1xuICAgIGNvbnN0IHsgYWN0aW9uX2xpbmssIGVtYWlsX290cCwgaGFzaGVkX3Rva2VuLCByZWRpcmVjdF90bywgdmVyaWZpY2F0aW9uX3R5cGUgfSA9IGRhdGEsIHJlc3QgPSBfX3Jlc3QoZGF0YSwgW1wiYWN0aW9uX2xpbmtcIiwgXCJlbWFpbF9vdHBcIiwgXCJoYXNoZWRfdG9rZW5cIiwgXCJyZWRpcmVjdF90b1wiLCBcInZlcmlmaWNhdGlvbl90eXBlXCJdKTtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0ge1xuICAgICAgICBhY3Rpb25fbGluayxcbiAgICAgICAgZW1haWxfb3RwLFxuICAgICAgICBoYXNoZWRfdG9rZW4sXG4gICAgICAgIHJlZGlyZWN0X3RvLFxuICAgICAgICB2ZXJpZmljYXRpb25fdHlwZSxcbiAgICB9O1xuICAgIGNvbnN0IHVzZXIgPSBPYmplY3QuYXNzaWduKHt9LCByZXN0KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICAgICAgdXNlcixcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBfbm9SZXNvbHZlSnNvblJlc3BvbnNlKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YTtcbn1cbi8qKlxuICogaGFzU2Vzc2lvbiBjaGVja3MgaWYgdGhlIHJlc3BvbnNlIG9iamVjdCBjb250YWlucyBhIHZhbGlkIHNlc3Npb25cbiAqIEBwYXJhbSBkYXRhIEEgcmVzcG9uc2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB0cnVlIGlmIGEgc2Vzc2lvbiBpcyBpbiB0aGUgcmVzcG9uc2VcbiAqL1xuZnVuY3Rpb24gaGFzU2Vzc2lvbihkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGEuYWNjZXNzX3Rva2VuICYmIGRhdGEucmVmcmVzaF90b2tlbiAmJiBkYXRhLmV4cGlyZXNfaW47XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mZXRjaC5qcy5tYXAiLCJpbXBvcnQgeyBBUElfVkVSU0lPTl9IRUFERVJfTkFNRSwgQkFTRTY0VVJMX1JFR0VYIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgQXV0aEludmFsaWRKd3RFcnJvciB9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7IGJhc2U2NFVybFRvVWludDhBcnJheSwgc3RyaW5nRnJvbUJhc2U2NFVSTCB9IGZyb20gJy4vYmFzZTY0dXJsJztcbmV4cG9ydCBmdW5jdGlvbiBleHBpcmVzQXQoZXhwaXJlc0luKSB7XG4gICAgY29uc3QgdGltZU5vdyA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDApO1xuICAgIHJldHVybiB0aW1lTm93ICsgZXhwaXJlc0luO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHV1aWQoKSB7XG4gICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgY29uc3QgciA9IChNYXRoLnJhbmRvbSgpICogMTYpIHwgMCwgdiA9IGMgPT0gJ3gnID8gciA6IChyICYgMHgzKSB8IDB4ODtcbiAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgIH0pO1xufVxuZXhwb3J0IGNvbnN0IGlzQnJvd3NlciA9ICgpID0+IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG5jb25zdCBsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzID0ge1xuICAgIHRlc3RlZDogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxufTtcbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgbG9jYWxTdG9yYWdlIGlzIHN1cHBvcnRlZCBvbiB0aGlzIGJyb3dzZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBzdXBwb3J0c0xvY2FsU3RvcmFnZSA9ICgpID0+IHtcbiAgICBpZiAoIWlzQnJvd3NlcigpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAvLyBET00gZXhjZXB0aW9uIHdoZW4gYWNjZXNzaW5nIGBsb2NhbFN0b3JhZ2VgXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGxvY2FsU3RvcmFnZVdyaXRlVGVzdHMudGVzdGVkKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzLndyaXRhYmxlO1xuICAgIH1cbiAgICBjb25zdCByYW5kb21LZXkgPSBgbHN3dC0ke01hdGgucmFuZG9tKCl9JHtNYXRoLnJhbmRvbSgpfWA7XG4gICAgdHJ5IHtcbiAgICAgICAgZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShyYW5kb21LZXksIHJhbmRvbUtleSk7XG4gICAgICAgIGdsb2JhbFRoaXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0ocmFuZG9tS2V5KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlV3JpdGVUZXN0cy50ZXN0ZWQgPSB0cnVlO1xuICAgICAgICBsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gbG9jYWxTdG9yYWdlIGNhbid0IGJlIHdyaXR0ZW4gdG9cbiAgICAgICAgLy8gaHR0cHM6Ly93d3cuY2hyb21pdW0ub3JnL2Zvci10ZXN0ZXJzL2J1Zy1yZXBvcnRpbmctZ3VpZGVsaW5lcy91bmNhdWdodC1zZWN1cml0eWVycm9yLWZhaWxlZC10by1yZWFkLXRoZS1sb2NhbHN0b3JhZ2UtcHJvcGVydHktZnJvbS13aW5kb3ctYWNjZXNzLWlzLWRlbmllZC1mb3ItdGhpcy1kb2N1bWVudFxuICAgICAgICBsb2NhbFN0b3JhZ2VXcml0ZVRlc3RzLnRlc3RlZCA9IHRydWU7XG4gICAgICAgIGxvY2FsU3RvcmFnZVdyaXRlVGVzdHMud3JpdGFibGUgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZVdyaXRlVGVzdHMud3JpdGFibGU7XG59O1xuLyoqXG4gKiBFeHRyYWN0cyBwYXJhbWV0ZXJzIGVuY29kZWQgaW4gdGhlIFVSTCBib3RoIGluIHRoZSBxdWVyeSBhbmQgZnJhZ21lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVBhcmFtZXRlcnNGcm9tVVJMKGhyZWYpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGhyZWYpO1xuICAgIGlmICh1cmwuaGFzaCAmJiB1cmwuaGFzaFswXSA9PT0gJyMnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBoYXNoU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh1cmwuaGFzaC5zdWJzdHJpbmcoMSkpO1xuICAgICAgICAgICAgaGFzaFNlYXJjaFBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBoYXNoIGlzIG5vdCBhIHF1ZXJ5IHN0cmluZ1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHNlYXJjaCBwYXJhbWV0ZXJzIHRha2UgcHJlY2VkZW5jZSBvdmVyIGhhc2ggcGFyYW1ldGVyc1xuICAgIHVybC5zZWFyY2hQYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgY29uc3QgcmVzb2x2ZUZldGNoID0gKGN1c3RvbUZldGNoKSA9PiB7XG4gICAgbGV0IF9mZXRjaDtcbiAgICBpZiAoY3VzdG9tRmV0Y2gpIHtcbiAgICAgICAgX2ZldGNoID0gY3VzdG9tRmV0Y2g7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgX2ZldGNoID0gKC4uLmFyZ3MpID0+IGltcG9ydCgnQHN1cGFiYXNlL25vZGUtZmV0Y2gnKS50aGVuKCh7IGRlZmF1bHQ6IGZldGNoIH0pID0+IGZldGNoKC4uLmFyZ3MpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIF9mZXRjaCA9IGZldGNoO1xuICAgIH1cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IF9mZXRjaCguLi5hcmdzKTtcbn07XG5leHBvcnQgY29uc3QgbG9va3NMaWtlRmV0Y2hSZXNwb25zZSA9IChtYXliZVJlc3BvbnNlKSA9PiB7XG4gICAgcmV0dXJuICh0eXBlb2YgbWF5YmVSZXNwb25zZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgbWF5YmVSZXNwb25zZSAhPT0gbnVsbCAmJlxuICAgICAgICAnc3RhdHVzJyBpbiBtYXliZVJlc3BvbnNlICYmXG4gICAgICAgICdvaycgaW4gbWF5YmVSZXNwb25zZSAmJlxuICAgICAgICAnanNvbicgaW4gbWF5YmVSZXNwb25zZSAmJlxuICAgICAgICB0eXBlb2YgbWF5YmVSZXNwb25zZS5qc29uID09PSAnZnVuY3Rpb24nKTtcbn07XG4vLyBTdG9yYWdlIGhlbHBlcnNcbmV4cG9ydCBjb25zdCBzZXRJdGVtQXN5bmMgPSBhc3luYyAoc3RvcmFnZSwga2V5LCBkYXRhKSA9PiB7XG4gICAgYXdhaXQgc3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufTtcbmV4cG9ydCBjb25zdCBnZXRJdGVtQXN5bmMgPSBhc3luYyAoc3RvcmFnZSwga2V5KSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBhd2FpdCBzdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCByZW1vdmVJdGVtQXN5bmMgPSBhc3luYyAoc3RvcmFnZSwga2V5KSA9PiB7XG4gICAgYXdhaXQgc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG59O1xuLyoqXG4gKiBBIGRlZmVycmVkIHJlcHJlc2VudHMgc29tZSBhc3luY2hyb25vdXMgd29yayB0aGF0IGlzIG5vdCB5ZXQgZmluaXNoZWQsIHdoaWNoXG4gKiBtYXkgb3IgbWF5IG5vdCBjdWxtaW5hdGUgaW4gYSB2YWx1ZS5cbiAqIFRha2VuIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlLW5vcnRoL3R5cGVzL2Jsb2IvbWFzdGVyL3NyYy9hc3luYy50c1xuICovXG5leHBvcnQgY2xhc3MgRGVmZXJyZWQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4dHJhLXNlbWlcbiAgICAgICAgO1xuICAgICAgICB0aGlzLnByb21pc2UgPSBuZXcgRGVmZXJyZWQucHJvbWlzZUNvbnN0cnVjdG9yKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHRyYS1zZW1pXG4gICAgICAgICAgICA7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmUgPSByZXM7XG4gICAgICAgICAgICB0aGlzLnJlamVjdCA9IHJlajtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuRGVmZXJyZWQucHJvbWlzZUNvbnN0cnVjdG9yID0gUHJvbWlzZTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGVKV1QodG9rZW4pIHtcbiAgICBjb25zdCBwYXJ0cyA9IHRva2VuLnNwbGl0KCcuJyk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykge1xuICAgICAgICB0aHJvdyBuZXcgQXV0aEludmFsaWRKd3RFcnJvcignSW52YWxpZCBKV1Qgc3RydWN0dXJlJyk7XG4gICAgfVxuICAgIC8vIFJlZ2V4IGNoZWNrcyBmb3IgYmFzZTY0dXJsIGZvcm1hdFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFCQVNFNjRVUkxfUkVHRVgudGVzdChwYXJ0c1tpXSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBdXRoSW52YWxpZEp3dEVycm9yKCdKV1Qgbm90IGluIGJhc2U2NHVybCBmb3JtYXQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAvLyB1c2luZyBiYXNlNjR1cmwgbGliXG4gICAgICAgIGhlYWRlcjogSlNPTi5wYXJzZShzdHJpbmdGcm9tQmFzZTY0VVJMKHBhcnRzWzBdKSksXG4gICAgICAgIHBheWxvYWQ6IEpTT04ucGFyc2Uoc3RyaW5nRnJvbUJhc2U2NFVSTChwYXJ0c1sxXSkpLFxuICAgICAgICBzaWduYXR1cmU6IGJhc2U2NFVybFRvVWludDhBcnJheShwYXJ0c1syXSksXG4gICAgICAgIHJhdzoge1xuICAgICAgICAgICAgaGVhZGVyOiBwYXJ0c1swXSxcbiAgICAgICAgICAgIHBheWxvYWQ6IHBhcnRzWzFdLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIENyZWF0ZXMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gbnVsbCBhZnRlciBzb21lIHRpbWUuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzbGVlcCh0aW1lKSB7XG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChhY2NlcHQpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhY2NlcHQobnVsbCksIHRpbWUpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgcHJvdmlkZWQgYXN5bmMgZnVuY3Rpb24gaW50byBhIHJldHJ5YWJsZSBmdW5jdGlvbi4gRWFjaCByZXN1bHRcbiAqIG9yIHRocm93biBlcnJvciBpcyBzZW50IHRvIHRoZSBpc1JldHJ5YWJsZSBmdW5jdGlvbiB3aGljaCBzaG91bGQgcmV0dXJuIHRydWVcbiAqIGlmIHRoZSBmdW5jdGlvbiBzaG91bGQgcnVuIGFnYWluLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmV0cnlhYmxlKGZuLCBpc1JldHJ5YWJsZSkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgoYWNjZXB0LCByZWplY3QpID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHRyYS1zZW1pXG4gICAgICAgIDtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IGF0dGVtcHQgPSAwOyBhdHRlbXB0IDwgSW5maW5pdHk7IGF0dGVtcHQrKykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZuKGF0dGVtcHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzUmV0cnlhYmxlKGF0dGVtcHQsIG51bGwsIHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNSZXRyeWFibGUoYXR0ZW1wdCwgZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGRlYzJoZXgoZGVjKSB7XG4gICAgcmV0dXJuICgnMCcgKyBkZWMudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpO1xufVxuLy8gRnVuY3Rpb25zIGJlbG93IHRha2VuIGZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYzMzA5NDA5L2NyZWF0aW5nLWEtY29kZS12ZXJpZmllci1hbmQtY2hhbGxlbmdlLWZvci1wa2NlLWF1dGgtb24tc3BvdGlmeS1hcGktaW4tcmVhY3Rqc1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUEtDRVZlcmlmaWVyKCkge1xuICAgIGNvbnN0IHZlcmlmaWVyTGVuZ3RoID0gNTY7XG4gICAgY29uc3QgYXJyYXkgPSBuZXcgVWludDMyQXJyYXkodmVyaWZpZXJMZW5ndGgpO1xuICAgIGlmICh0eXBlb2YgY3J5cHRvID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCBjaGFyU2V0ID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5LS5ffic7XG4gICAgICAgIGNvbnN0IGNoYXJTZXRMZW4gPSBjaGFyU2V0Lmxlbmd0aDtcbiAgICAgICAgbGV0IHZlcmlmaWVyID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVyaWZpZXJMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmVyaWZpZXIgKz0gY2hhclNldC5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhclNldExlbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZXJpZmllcjtcbiAgICB9XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhhcnJheSk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyYXksIGRlYzJoZXgpLmpvaW4oJycpO1xufVxuYXN5bmMgZnVuY3Rpb24gc2hhMjU2KHJhbmRvbVN0cmluZykge1xuICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICBjb25zdCBlbmNvZGVkRGF0YSA9IGVuY29kZXIuZW5jb2RlKHJhbmRvbVN0cmluZyk7XG4gICAgY29uc3QgaGFzaCA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KCdTSEEtMjU2JywgZW5jb2RlZERhdGEpO1xuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoaGFzaCk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYnl0ZXMpXG4gICAgICAgIC5tYXAoKGMpID0+IFN0cmluZy5mcm9tQ2hhckNvZGUoYykpXG4gICAgICAgIC5qb2luKCcnKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVBLQ0VDaGFsbGVuZ2UodmVyaWZpZXIpIHtcbiAgICBjb25zdCBoYXNDcnlwdG9TdXBwb3J0ID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIGNyeXB0by5zdWJ0bGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBUZXh0RW5jb2RlciAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgaWYgKCFoYXNDcnlwdG9TdXBwb3J0KSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV2ViQ3J5cHRvIEFQSSBpcyBub3Qgc3VwcG9ydGVkLiBDb2RlIGNoYWxsZW5nZSBtZXRob2Qgd2lsbCBkZWZhdWx0IHRvIHVzZSBwbGFpbiBpbnN0ZWFkIG9mIHNoYTI1Ni4nKTtcbiAgICAgICAgcmV0dXJuIHZlcmlmaWVyO1xuICAgIH1cbiAgICBjb25zdCBoYXNoZWQgPSBhd2FpdCBzaGEyNTYodmVyaWZpZXIpO1xuICAgIHJldHVybiBidG9hKGhhc2hlZCkucmVwbGFjZSgvXFwrL2csICctJykucmVwbGFjZSgvXFwvL2csICdfJykucmVwbGFjZSgvPSskLywgJycpO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvZGVDaGFsbGVuZ2VBbmRNZXRob2Qoc3RvcmFnZSwgc3RvcmFnZUtleSwgaXNQYXNzd29yZFJlY292ZXJ5ID0gZmFsc2UpIHtcbiAgICBjb25zdCBjb2RlVmVyaWZpZXIgPSBnZW5lcmF0ZVBLQ0VWZXJpZmllcigpO1xuICAgIGxldCBzdG9yZWRDb2RlVmVyaWZpZXIgPSBjb2RlVmVyaWZpZXI7XG4gICAgaWYgKGlzUGFzc3dvcmRSZWNvdmVyeSkge1xuICAgICAgICBzdG9yZWRDb2RlVmVyaWZpZXIgKz0gJy9QQVNTV09SRF9SRUNPVkVSWSc7XG4gICAgfVxuICAgIGF3YWl0IHNldEl0ZW1Bc3luYyhzdG9yYWdlLCBgJHtzdG9yYWdlS2V5fS1jb2RlLXZlcmlmaWVyYCwgc3RvcmVkQ29kZVZlcmlmaWVyKTtcbiAgICBjb25zdCBjb2RlQ2hhbGxlbmdlID0gYXdhaXQgZ2VuZXJhdGVQS0NFQ2hhbGxlbmdlKGNvZGVWZXJpZmllcik7XG4gICAgY29uc3QgY29kZUNoYWxsZW5nZU1ldGhvZCA9IGNvZGVWZXJpZmllciA9PT0gY29kZUNoYWxsZW5nZSA/ICdwbGFpbicgOiAnczI1Nic7XG4gICAgcmV0dXJuIFtjb2RlQ2hhbGxlbmdlLCBjb2RlQ2hhbGxlbmdlTWV0aG9kXTtcbn1cbi8qKiBQYXJzZXMgdGhlIEFQSSB2ZXJzaW9uIHdoaWNoIGlzIDJZWVktTU0tREQuICovXG5jb25zdCBBUElfVkVSU0lPTl9SRUdFWCA9IC9eMlswLTldezN9LSgwWzEtOV18MVswLTJdKS0oMFsxLTldfDFbMC05XXwyWzAtOV18M1swLTFdKSQvaTtcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJlc3BvbnNlQVBJVmVyc2lvbihyZXNwb25zZSkge1xuICAgIGNvbnN0IGFwaVZlcnNpb24gPSByZXNwb25zZS5oZWFkZXJzLmdldChBUElfVkVSU0lPTl9IRUFERVJfTkFNRSk7XG4gICAgaWYgKCFhcGlWZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoIWFwaVZlcnNpb24ubWF0Y2goQVBJX1ZFUlNJT05fUkVHRVgpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoYCR7YXBpVmVyc2lvbn1UMDA6MDA6MDAuMFpgKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUV4cChleHApIHtcbiAgICBpZiAoIWV4cCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZXhwIGNsYWltJyk7XG4gICAgfVxuICAgIGNvbnN0IHRpbWVOb3cgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICBpZiAoZXhwIDw9IHRpbWVOb3cpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdKV1QgaGFzIGV4cGlyZWQnKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxnb3JpdGhtKGFsZykge1xuICAgIHN3aXRjaCAoYWxnKSB7XG4gICAgICAgIGNhc2UgJ1JTMjU2JzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ1JTQVNTQS1QS0NTMS12MV81JyxcbiAgICAgICAgICAgICAgICBoYXNoOiB7IG5hbWU6ICdTSEEtMjU2JyB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAnRVMyNTYnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnRUNEU0EnLFxuICAgICAgICAgICAgICAgIG5hbWVkQ3VydmU6ICdQLTI1NicsXG4gICAgICAgICAgICAgICAgaGFzaDogeyBuYW1lOiAnU0hBLTI1NicgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYWxnIGNsYWltJyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVycy5qcy5tYXAiLCJpbXBvcnQgeyBzdXBwb3J0c0xvY2FsU3RvcmFnZSB9IGZyb20gJy4vaGVscGVycyc7XG4vKipcbiAqIFByb3ZpZGVzIHNhZmUgYWNjZXNzIHRvIHRoZSBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZSBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IGxvY2FsU3RvcmFnZUFkYXB0ZXIgPSB7XG4gICAgZ2V0SXRlbTogKGtleSkgPT4ge1xuICAgICAgICBpZiAoIXN1cHBvcnRzTG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfSxcbiAgICBzZXRJdGVtOiAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAoIXN1cHBvcnRzTG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogKGtleSkgPT4ge1xuICAgICAgICBpZiAoIXN1cHBvcnRzTG9jYWxTdG9yYWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxUaGlzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfSxcbn07XG4vKipcbiAqIFJldHVybnMgYSBsb2NhbFN0b3JhZ2UtbGlrZSBvYmplY3QgdGhhdCBzdG9yZXMgdGhlIGtleS12YWx1ZSBwYWlycyBpblxuICogbWVtb3J5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVtb3J5TG9jYWxTdG9yYWdlQWRhcHRlcihzdG9yZSA9IHt9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0SXRlbTogKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlW2tleV0gfHwgbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0SXRlbTogKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHN0b3JlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlSXRlbTogKGtleSkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHN0b3JlW2tleV07XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvY2FsLXN0b3JhZ2UuanMubWFwIiwiaW1wb3J0IHsgc3VwcG9ydHNMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL2hlbHBlcnMnO1xuLyoqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjb25zdCBpbnRlcm5hbHMgPSB7XG4gICAgLyoqXG4gICAgICogQGV4cGVyaW1lbnRhbFxuICAgICAqL1xuICAgIGRlYnVnOiAhIShnbG9iYWxUaGlzICYmXG4gICAgICAgIHN1cHBvcnRzTG9jYWxTdG9yYWdlKCkgJiZcbiAgICAgICAgZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2UgJiZcbiAgICAgICAgZ2xvYmFsVGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc3VwYWJhc2UuZ290cnVlLWpzLmxvY2tzLmRlYnVnJykgPT09ICd0cnVlJyksXG59O1xuLyoqXG4gKiBBbiBlcnJvciB0aHJvd24gd2hlbiBhIGxvY2sgY2Fubm90IGJlIGFjcXVpcmVkIGFmdGVyIHNvbWUgYW1vdW50IG9mIHRpbWUuXG4gKlxuICogVXNlIHRoZSB7QGxpbmsgI2lzQWNxdWlyZVRpbWVvdXR9IHByb3BlcnR5IGluc3RlYWQgb2YgY2hlY2tpbmcgd2l0aCBgaW5zdGFuY2VvZmAuXG4gKi9cbmV4cG9ydCBjbGFzcyBMb2NrQWNxdWlyZVRpbWVvdXRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmlzQWNxdWlyZVRpbWVvdXQgPSB0cnVlO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0b3JMb2NrQWNxdWlyZVRpbWVvdXRFcnJvciBleHRlbmRzIExvY2tBY3F1aXJlVGltZW91dEVycm9yIHtcbn1cbmV4cG9ydCBjbGFzcyBQcm9jZXNzTG9ja0FjcXVpcmVUaW1lb3V0RXJyb3IgZXh0ZW5kcyBMb2NrQWNxdWlyZVRpbWVvdXRFcnJvciB7XG59XG4vKipcbiAqIEltcGxlbWVudHMgYSBnbG9iYWwgZXhjbHVzaXZlIGxvY2sgdXNpbmcgdGhlIE5hdmlnYXRvciBMb2NrTWFuYWdlciBBUEkuIEl0XG4gKiBpcyBhdmFpbGFibGUgb24gYWxsIGJyb3dzZXJzIHJlbGVhc2VkIGFmdGVyIDIwMjItMDMtMTUgd2l0aCBTYWZhcmkgYmVpbmcgdGhlXG4gKiBsYXN0IG9uZSB0byByZWxlYXNlIHN1cHBvcnQuIElmIHRoZSBBUEkgaXMgbm90IGF2YWlsYWJsZSwgdGhpcyBmdW5jdGlvbiB3aWxsXG4gKiB0aHJvdy4gTWFrZSBzdXJlIHlvdSBjaGVjayBhdmFpbGFibGlsaXR5IGJlZm9yZSBjb25maWd1cmluZyB7QGxpbmtcbiAqIEdvVHJ1ZUNsaWVudH0uXG4gKlxuICogWW91IGNhbiB0dXJuIG9uIGRlYnVnZ2luZyBieSBzZXR0aW5nIHRoZSBgc3VwYWJhc2UuZ290cnVlLWpzLmxvY2tzLmRlYnVnYFxuICogbG9jYWwgc3RvcmFnZSBpdGVtIHRvIGB0cnVlYC5cbiAqXG4gKiBJbnRlcm5hbHM6XG4gKlxuICogU2luY2UgdGhlIExvY2tNYW5hZ2VyIEFQSSBkb2VzIG5vdCBwcmVzZXJ2ZSBzdGFjayB0cmFjZXMgZm9yIHRoZSBhc3luY1xuICogZnVuY3Rpb24gcGFzc2VkIGluIHRoZSBgcmVxdWVzdGAgbWV0aG9kLCBhIHRyaWNrIGlzIHVzZWQgd2hlcmUgYWNxdWlyaW5nIHRoZVxuICogbG9jayByZWxlYXNlcyBhIHByZXZpb3VzbHkgc3RhcnRlZCBwcm9taXNlIHRvIHJ1biB0aGUgb3BlcmF0aW9uIGluIHRoZSBgZm5gXG4gKiBmdW5jdGlvbi4gVGhlIGxvY2sgd2FpdHMgZm9yIHRoYXQgcHJvbWlzZSB0byBmaW5pc2ggKHdpdGggb3Igd2l0aG91dCBlcnJvciksXG4gKiB3aGlsZSB0aGUgZnVuY3Rpb24gd2lsbCBmaW5hbGx5IHdhaXQgZm9yIHRoZSByZXN1bHQgYW55d2F5LlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGxvY2sgdG8gYmUgYWNxdWlyZWQuXG4gKiBAcGFyYW0gYWNxdWlyZVRpbWVvdXQgSWYgbmVnYXRpdmUsIG5vIHRpbWVvdXQuIElmIDAgYW4gZXJyb3IgaXMgdGhyb3duIGlmXG4gKiAgICAgICAgICAgICAgICAgICAgICAgdGhlIGxvY2sgY2FuJ3QgYmUgYWNxdWlyZWQgd2l0aG91dCB3YWl0aW5nLiBJZiBwb3NpdGl2ZSwgdGhlIGxvY2sgYWNxdWlyZVxuICogICAgICAgICAgICAgICAgICAgICAgIHdpbGwgdGltZSBvdXQgYWZ0ZXIgc28gbWFueSBtaWxsaXNlY29uZHMuIEFuIGVycm9yIGlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgYSB0aW1lb3V0IGlmIGl0IGhhcyBgaXNBY3F1aXJlVGltZW91dGAgc2V0IHRvIHRydWUuXG4gKiBAcGFyYW0gZm4gVGhlIG9wZXJhdGlvbiB0byBydW4gb25jZSB0aGUgbG9jayBpcyBhY3F1aXJlZC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG5hdmlnYXRvckxvY2sobmFtZSwgYWNxdWlyZVRpbWVvdXQsIGZuKSB7XG4gICAgaWYgKGludGVybmFscy5kZWJ1Zykge1xuICAgICAgICBjb25zb2xlLmxvZygnQHN1cGFiYXNlL2dvdHJ1ZS1qczogbmF2aWdhdG9yTG9jazogYWNxdWlyZSBsb2NrJywgbmFtZSwgYWNxdWlyZVRpbWVvdXQpO1xuICAgIH1cbiAgICBjb25zdCBhYm9ydENvbnRyb2xsZXIgPSBuZXcgZ2xvYmFsVGhpcy5BYm9ydENvbnRyb2xsZXIoKTtcbiAgICBpZiAoYWNxdWlyZVRpbWVvdXQgPiAwKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgICAgICBpZiAoaW50ZXJuYWxzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0BzdXBhYmFzZS9nb3RydWUtanM6IG5hdmlnYXRvckxvY2sgYWNxdWlyZSB0aW1lZCBvdXQnLCBuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgYWNxdWlyZVRpbWVvdXQpO1xuICAgIH1cbiAgICAvLyBNRE4gYXJ0aWNsZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0xvY2tNYW5hZ2VyL3JlcXVlc3RcbiAgICAvLyBXcmFwcGluZyBuYXZpZ2F0b3IubG9ja3MucmVxdWVzdCgpIHdpdGggYSBwbGFpbiBQcm9taXNlIGlzIGRvbmUgYXMgc29tZVxuICAgIC8vIGxpYnJhcmllcyBsaWtlIHpvbmUuanMgcGF0Y2ggdGhlIFByb21pc2Ugb2JqZWN0IHRvIHRyYWNrIHRoZSBleGVjdXRpb25cbiAgICAvLyBjb250ZXh0LiBIb3dldmVyLCBpdCBhcHBlYXJzIHRoYXQgbW9zdCBicm93c2VycyB1c2UgYW4gaW50ZXJuYWwgcHJvbWlzZVxuICAgIC8vIGltcGxlbWVudGF0aW9uIHdoZW4gdXNpbmcgdGhlIG5hdmlnYXRvci5sb2Nrcy5yZXF1ZXN0KCkgQVBJIGNhdXNpbmcgdGhlbVxuICAgIC8vIHRvIGxvc2UgY29udGV4dCBhbmQgZW1pdCBjb25mdXNpbmcgbG9nIG1lc3NhZ2VzIG9yIGJyZWFrIGNlcnRhaW4gZmVhdHVyZXMuXG4gICAgLy8gVGhpcyB3cmFwcGluZyBpcyBiZWxpZXZlZCB0byBoZWxwIHpvbmUuanMgdHJhY2sgdGhlIGV4ZWN1dGlvbiBjb250ZXh0XG4gICAgLy8gYmV0dGVyLlxuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IGdsb2JhbFRoaXMubmF2aWdhdG9yLmxvY2tzLnJlcXVlc3QobmFtZSwgYWNxdWlyZVRpbWVvdXQgPT09IDBcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBtb2RlOiAnZXhjbHVzaXZlJyxcbiAgICAgICAgICAgIGlmQXZhaWxhYmxlOiB0cnVlLFxuICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgbW9kZTogJ2V4Y2x1c2l2ZScsXG4gICAgICAgICAgICBzaWduYWw6IGFib3J0Q29udHJvbGxlci5zaWduYWwsXG4gICAgICAgIH0sIGFzeW5jIChsb2NrKSA9PiB7XG4gICAgICAgIGlmIChsb2NrKSB7XG4gICAgICAgICAgICBpZiAoaW50ZXJuYWxzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0BzdXBhYmFzZS9nb3RydWUtanM6IG5hdmlnYXRvckxvY2s6IGFjcXVpcmVkJywgbmFtZSwgbG9jay5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJuYWxzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdAc3VwYWJhc2UvZ290cnVlLWpzOiBuYXZpZ2F0b3JMb2NrOiByZWxlYXNlZCcsIG5hbWUsIGxvY2submFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFjcXVpcmVUaW1lb3V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGludGVybmFscy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQHN1cGFiYXNlL2dvdHJ1ZS1qczogbmF2aWdhdG9yTG9jazogbm90IGltbWVkaWF0ZWx5IGF2YWlsYWJsZScsIG5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTmF2aWdhdG9yTG9ja0FjcXVpcmVUaW1lb3V0RXJyb3IoYEFjcXVpcmluZyBhbiBleGNsdXNpdmUgTmF2aWdhdG9yIExvY2tNYW5hZ2VyIGxvY2sgXCIke25hbWV9XCIgaW1tZWRpYXRlbHkgZmFpbGVkYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJuYWxzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnbG9iYWxUaGlzLm5hdmlnYXRvci5sb2Nrcy5xdWVyeSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0BzdXBhYmFzZS9nb3RydWUtanM6IE5hdmlnYXRvciBMb2NrTWFuYWdlciBzdGF0ZScsIEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgJyAgJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0BzdXBhYmFzZS9nb3RydWUtanM6IEVycm9yIHdoZW4gcXVlcnlpbmcgTmF2aWdhdG9yIExvY2tNYW5hZ2VyIHN0YXRlJywgZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQnJvd3NlciBpcyBub3QgZm9sbG93aW5nIHRoZSBOYXZpZ2F0b3IgTG9ja01hbmFnZXIgc3BlYywgaXRcbiAgICAgICAgICAgICAgICAvLyByZXR1cm5lZCBhIG51bGwgbG9jayB3aGVuIHdlIGRpZG4ndCB1c2UgaWZBdmFpbGFibGUuIFNvIHdlIGNhblxuICAgICAgICAgICAgICAgIC8vIHByZXRlbmQgdGhlIGxvY2sgaXMgYWNxdWlyZWQgaW4gdGhlIG5hbWUgb2YgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICAgICAgICAgIC8vIGFuZCB1c2VyIGV4cGVyaWVuY2UgYW5kIGp1c3QgcnVuIHRoZSBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0BzdXBhYmFzZS9nb3RydWUtanM6IE5hdmlnYXRvciBMb2NrTWFuYWdlciByZXR1cm5lZCBhIG51bGwgbG9jayB3aGVuIHVzaW5nICNyZXF1ZXN0IHdpdGhvdXQgaWZBdmFpbGFibGUgc2V0IHRvIHRydWUsIGl0IGFwcGVhcnMgdGhpcyBicm93c2VyIGlzIG5vdCBmb2xsb3dpbmcgdGhlIExvY2tNYW5hZ2VyIHNwZWMgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0xvY2tNYW5hZ2VyL3JlcXVlc3QnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgZm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKTtcbn1cbmNvbnN0IFBST0NFU1NfTE9DS1MgPSB7fTtcbi8qKlxuICogSW1wbGVtZW50cyBhIGdsb2JhbCBleGNsdXNpdmUgbG9jayB0aGF0IHdvcmtzIG9ubHkgaW4gdGhlIGN1cnJlbnQgcHJvY2Vzcy5cbiAqIFVzZWZ1bCBmb3IgZW52aXJvbm1lbnRzIGxpa2UgUmVhY3QgTmF0aXZlIG9yIG90aGVyIG5vbi1icm93c2VyXG4gKiBzaW5nbGUtcHJvY2VzcyAoaS5lLiBubyBjb25jZXB0IG9mIFwidGFic1wiKSBlbnZpcm9ubWVudHMuXG4gKlxuICogVXNlIHtAbGluayAjbmF2aWdhdG9yTG9ja30gaW4gYnJvd3NlciBlbnZpcm9ubWVudHMuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgbG9jayB0byBiZSBhY3F1aXJlZC5cbiAqIEBwYXJhbSBhY3F1aXJlVGltZW91dCBJZiBuZWdhdGl2ZSwgbm8gdGltZW91dC4gSWYgMCBhbiBlcnJvciBpcyB0aHJvd24gaWZcbiAqICAgICAgICAgICAgICAgICAgICAgICB0aGUgbG9jayBjYW4ndCBiZSBhY3F1aXJlZCB3aXRob3V0IHdhaXRpbmcuIElmIHBvc2l0aXZlLCB0aGUgbG9jayBhY3F1aXJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgd2lsbCB0aW1lIG91dCBhZnRlciBzbyBtYW55IG1pbGxpc2Vjb25kcy4gQW4gZXJyb3IgaXNcbiAqICAgICAgICAgICAgICAgICAgICAgICBhIHRpbWVvdXQgaWYgaXQgaGFzIGBpc0FjcXVpcmVUaW1lb3V0YCBzZXQgdG8gdHJ1ZS5cbiAqIEBwYXJhbSBmbiBUaGUgb3BlcmF0aW9uIHRvIHJ1biBvbmNlIHRoZSBsb2NrIGlzIGFjcXVpcmVkLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0xvY2sobmFtZSwgYWNxdWlyZVRpbWVvdXQsIGZuKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHByZXZpb3VzT3BlcmF0aW9uID0gKF9hID0gUFJPQ0VTU19MT0NLU1tuYW1lXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgY29uc3QgY3VycmVudE9wZXJhdGlvbiA9IFByb21pc2UucmFjZShbXG4gICAgICAgIHByZXZpb3VzT3BlcmF0aW9uLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBlcnJvciBvZiBwcmV2aW91cyBvcGVyYXRpb24gdGhhdCB3ZSdyZSB3YWl0aW5nIHRvIGZpbmlzaFxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pLFxuICAgICAgICBhY3F1aXJlVGltZW91dCA+PSAwXG4gICAgICAgICAgICA/IG5ldyBQcm9taXNlKChfLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBQcm9jZXNzTG9ja0FjcXVpcmVUaW1lb3V0RXJyb3IoYEFjcXVyaW5nIHByb2Nlc3MgbG9jayB3aXRoIG5hbWUgXCIke25hbWV9XCIgdGltZWQgb3V0YCkpO1xuICAgICAgICAgICAgICAgIH0sIGFjcXVpcmVUaW1lb3V0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgXS5maWx0ZXIoKHgpID0+IHgpKVxuICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgaWYgKGUgJiYgZS5pc0FjcXVpcmVUaW1lb3V0KSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0pXG4gICAgICAgIC50aGVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgLy8gcHJldmlvdXMgb3BlcmF0aW9ucyBmaW5pc2hlZCBhbmQgd2UgZGlkbid0IGdldCBhIHJhY2Ugb24gdGhlIGFjcXVpcmVcbiAgICAgICAgLy8gdGltZW91dCwgc28gdGhlIGN1cnJlbnQgb3BlcmF0aW9uIGNhbiBmaW5hbGx5IHN0YXJ0XG4gICAgICAgIHJldHVybiBhd2FpdCBmbigpO1xuICAgIH0pO1xuICAgIFBST0NFU1NfTE9DS1NbbmFtZV0gPSBjdXJyZW50T3BlcmF0aW9uLmNhdGNoKGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGlmIChlICYmIGUuaXNBY3F1aXJlVGltZW91dCkge1xuICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgb3BlcmF0aW9uIHRpbWVkIG91dCwgaXQgZG9lc24ndCBtZWFuIHRoYXQgdGhlIHByZXZpb3VzXG4gICAgICAgICAgICAvLyBvcGVyYXRpb24gZmluaXNoZWQsIHNvIHdlIG5lZWQgY29udG51ZSB3YWl0aW5nIGZvciBpdCB0byBmaW5pc2hcbiAgICAgICAgICAgIGF3YWl0IHByZXZpb3VzT3BlcmF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZTtcbiAgICB9KTtcbiAgICAvLyBmaW5hbGx5IHdhaXQgZm9yIHRoZSBjdXJyZW50IG9wZXJhdGlvbiB0byBmaW5pc2ggc3VjY2Vzc2Z1bGx5LCB3aXRoIGFuXG4gICAgLy8gZXJyb3Igb3Igd2l0aCBhbiBhY3F1aXJlIHRpbWVvdXQgZXJyb3JcbiAgICByZXR1cm4gYXdhaXQgY3VycmVudE9wZXJhdGlvbjtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvY2tzLmpzLm1hcCIsIi8qKlxuICogaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2dsb2JhbHRoaXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvbHlmaWxsR2xvYmFsVGhpcygpIHtcbiAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKVxuICAgICAgICByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdfX21hZ2ljX18nLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yICdBbGxvdyBhY2Nlc3MgdG8gbWFnaWMnXG4gICAgICAgIF9fbWFnaWNfXy5nbG9iYWxUaGlzID0gX19tYWdpY19fO1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yICdBbGxvdyBhY2Nlc3MgdG8gbWFnaWMnXG4gICAgICAgIGRlbGV0ZSBPYmplY3QucHJvdG90eXBlLl9fbWFnaWNfXztcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAnQWxsb3cgYWNjZXNzIHRvIGdsb2JhbHMnXG4gICAgICAgICAgICBzZWxmLmdsb2JhbFRoaXMgPSBzZWxmO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9seWZpbGxzLmpzLm1hcCIsImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsImV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzIuNjkuMSc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZXJzaW9uLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgcmVzb2x2ZUZldGNoIH0gZnJvbSAnLi9oZWxwZXInO1xuaW1wb3J0IHsgRnVuY3Rpb25zRmV0Y2hFcnJvciwgRnVuY3Rpb25zSHR0cEVycm9yLCBGdW5jdGlvbnNSZWxheUVycm9yLCBGdW5jdGlvblJlZ2lvbiwgfSBmcm9tICcuL3R5cGVzJztcbmV4cG9ydCBjbGFzcyBGdW5jdGlvbnNDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgeyBoZWFkZXJzID0ge30sIGN1c3RvbUZldGNoLCByZWdpb24gPSBGdW5jdGlvblJlZ2lvbi5BbnksIH0gPSB7fSkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgdGhpcy5yZWdpb24gPSByZWdpb247XG4gICAgICAgIHRoaXMuZmV0Y2ggPSByZXNvbHZlRmV0Y2goY3VzdG9tRmV0Y2gpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBhdXRob3JpemF0aW9uIGhlYWRlclxuICAgICAqIEBwYXJhbSB0b2tlbiAtIHRoZSBuZXcgand0IHRva2VuIHNlbnQgaW4gdGhlIGF1dGhvcmlzYXRpb24gaGVhZGVyXG4gICAgICovXG4gICAgc2V0QXV0aCh0b2tlbikge1xuICAgICAgICB0aGlzLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZva2VzIGEgZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0gZnVuY3Rpb25OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIEZ1bmN0aW9uIHRvIGludm9rZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIGludm9raW5nIHRoZSBGdW5jdGlvbi5cbiAgICAgKi9cbiAgICBpbnZva2UoZnVuY3Rpb25OYW1lLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGhlYWRlcnMsIG1ldGhvZCwgYm9keTogZnVuY3Rpb25BcmdzIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgIGxldCBfaGVhZGVycyA9IHt9O1xuICAgICAgICAgICAgICAgIGxldCB7IHJlZ2lvbiB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAoIXJlZ2lvbikge1xuICAgICAgICAgICAgICAgICAgICByZWdpb24gPSB0aGlzLnJlZ2lvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlZ2lvbiAmJiByZWdpb24gIT09ICdhbnknKSB7XG4gICAgICAgICAgICAgICAgICAgIF9oZWFkZXJzWyd4LXJlZ2lvbiddID0gcmVnaW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgYm9keTtcbiAgICAgICAgICAgICAgICBpZiAoZnVuY3Rpb25BcmdzICYmXG4gICAgICAgICAgICAgICAgICAgICgoaGVhZGVycyAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKSkgfHwgIWhlYWRlcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGZ1bmN0aW9uQXJncyBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbkFyZ3MgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCB3b3JrIGZvciBGaWxlIGFzIEZpbGUgaW5oZXJpdHMgQmxvYlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxzbyB3b3JrcyBmb3IgQXJyYXlCdWZmZXIgYXMgaXQgaXMgdGhlIHNhbWUgdW5kZXJseWluZyBzdHJ1Y3R1cmUgYXMgYSBCbG9iXG4gICAgICAgICAgICAgICAgICAgICAgICBfaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgPSBmdW5jdGlvbkFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGZ1bmN0aW9uQXJncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBsYWluIHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgX2hlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ3RleHQvcGxhaW4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9keSA9IGZ1bmN0aW9uQXJncztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIGZ1bmN0aW9uQXJncyBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCBzZXQgY29udGVudC10eXBlIGhlYWRlcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlcXVlc3Qgd2lsbCBhdXRvbWF0aWNhbGx5IGFkZCB0aGUgcmlnaHQgYm91bmRhcnkgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkgPSBmdW5jdGlvbkFyZ3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0LCBhc3N1bWUgdGhpcyBpcyBKU09OXG4gICAgICAgICAgICAgICAgICAgICAgICBfaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkoZnVuY3Rpb25BcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIHRoaXMuZmV0Y2goYCR7dGhpcy51cmx9LyR7ZnVuY3Rpb25OYW1lfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QgfHwgJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAvLyBoZWFkZXJzIHByaW9yaXR5IGlzIChoaWdoIHRvIGxvdyk6XG4gICAgICAgICAgICAgICAgICAgIC8vIDEuIGludm9rZS1sZXZlbCBoZWFkZXJzXG4gICAgICAgICAgICAgICAgICAgIC8vIDIuIGNsaWVudC1sZXZlbCBoZWFkZXJzXG4gICAgICAgICAgICAgICAgICAgIC8vIDMuIGRlZmF1bHQgQ29udGVudC1UeXBlIGhlYWRlclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgX2hlYWRlcnMpLCB0aGlzLmhlYWRlcnMpLCBoZWFkZXJzKSxcbiAgICAgICAgICAgICAgICAgICAgYm9keSxcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZmV0Y2hFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRnVuY3Rpb25zRmV0Y2hFcnJvcihmZXRjaEVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1JlbGF5RXJyb3IgPSByZXNwb25zZS5oZWFkZXJzLmdldCgneC1yZWxheS1lcnJvcicpO1xuICAgICAgICAgICAgICAgIGlmIChpc1JlbGF5RXJyb3IgJiYgaXNSZWxheUVycm9yID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEZ1bmN0aW9uc1JlbGF5RXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBGdW5jdGlvbnNIdHRwRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2VUeXBlID0gKChfYSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ3RleHQvcGxhaW4nKS5zcGxpdCgnOycpWzBdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2VUeXBlID09PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0geWllbGQgcmVzcG9uc2UuYmxvYigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZVR5cGUgPT09ICd0ZXh0L2V2ZW50LXN0cmVhbScpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZVR5cGUgPT09ICdtdWx0aXBhcnQvZm9ybS1kYXRhJykge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0geWllbGQgcmVzcG9uc2UuZm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gdGV4dFxuICAgICAgICAgICAgICAgICAgICBkYXRhID0geWllbGQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RnVuY3Rpb25zQ2xpZW50LmpzLm1hcCIsImV4cG9ydCBjb25zdCByZXNvbHZlRmV0Y2ggPSAoY3VzdG9tRmV0Y2gpID0+IHtcbiAgICBsZXQgX2ZldGNoO1xuICAgIGlmIChjdXN0b21GZXRjaCkge1xuICAgICAgICBfZmV0Y2ggPSBjdXN0b21GZXRjaDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGZldGNoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBfZmV0Y2ggPSAoLi4uYXJncykgPT4gaW1wb3J0KCdAc3VwYWJhc2Uvbm9kZS1mZXRjaCcpLnRoZW4oKHsgZGVmYXVsdDogZmV0Y2ggfSkgPT4gZmV0Y2goLi4uYXJncykpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgX2ZldGNoID0gZmV0Y2g7XG4gICAgfVxuICAgIHJldHVybiAoLi4uYXJncykgPT4gX2ZldGNoKC4uLmFyZ3MpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlci5qcy5tYXAiLCJleHBvcnQgY2xhc3MgRnVuY3Rpb25zRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgbmFtZSA9ICdGdW5jdGlvbnNFcnJvcicsIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uc0ZldGNoRXJyb3IgZXh0ZW5kcyBGdW5jdGlvbnNFcnJvciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcignRmFpbGVkIHRvIHNlbmQgYSByZXF1ZXN0IHRvIHRoZSBFZGdlIEZ1bmN0aW9uJywgJ0Z1bmN0aW9uc0ZldGNoRXJyb3InLCBjb250ZXh0KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgRnVuY3Rpb25zUmVsYXlFcnJvciBleHRlbmRzIEZ1bmN0aW9uc0Vycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKCdSZWxheSBFcnJvciBpbnZva2luZyB0aGUgRWRnZSBGdW5jdGlvbicsICdGdW5jdGlvbnNSZWxheUVycm9yJywgY29udGV4dCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEZ1bmN0aW9uc0h0dHBFcnJvciBleHRlbmRzIEZ1bmN0aW9uc0Vycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKCdFZGdlIEZ1bmN0aW9uIHJldHVybmVkIGEgbm9uLTJ4eCBzdGF0dXMgY29kZScsICdGdW5jdGlvbnNIdHRwRXJyb3InLCBjb250ZXh0KTtcbiAgICB9XG59XG4vLyBEZWZpbmUgdGhlIGVudW0gZm9yIHRoZSAncmVnaW9uJyBwcm9wZXJ0eVxuZXhwb3J0IHZhciBGdW5jdGlvblJlZ2lvbjtcbihmdW5jdGlvbiAoRnVuY3Rpb25SZWdpb24pIHtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkFueVwiXSA9IFwiYW55XCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJBcE5vcnRoZWFzdDFcIl0gPSBcImFwLW5vcnRoZWFzdC0xXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJBcE5vcnRoZWFzdDJcIl0gPSBcImFwLW5vcnRoZWFzdC0yXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJBcFNvdXRoMVwiXSA9IFwiYXAtc291dGgtMVwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiQXBTb3V0aGVhc3QxXCJdID0gXCJhcC1zb3V0aGVhc3QtMVwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiQXBTb3V0aGVhc3QyXCJdID0gXCJhcC1zb3V0aGVhc3QtMlwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiQ2FDZW50cmFsMVwiXSA9IFwiY2EtY2VudHJhbC0xXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJFdUNlbnRyYWwxXCJdID0gXCJldS1jZW50cmFsLTFcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIkV1V2VzdDFcIl0gPSBcImV1LXdlc3QtMVwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiRXVXZXN0MlwiXSA9IFwiZXUtd2VzdC0yXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJFdVdlc3QzXCJdID0gXCJldS13ZXN0LTNcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIlNhRWFzdDFcIl0gPSBcInNhLWVhc3QtMVwiO1xuICAgIEZ1bmN0aW9uUmVnaW9uW1wiVXNFYXN0MVwiXSA9IFwidXMtZWFzdC0xXCI7XG4gICAgRnVuY3Rpb25SZWdpb25bXCJVc1dlc3QxXCJdID0gXCJ1cy13ZXN0LTFcIjtcbiAgICBGdW5jdGlvblJlZ2lvbltcIlVzV2VzdDJcIl0gPSBcInVzLXdlc3QtMlwiO1xufSkoRnVuY3Rpb25SZWdpb24gfHwgKEZ1bmN0aW9uUmVnaW9uID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXR5cGVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyByZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWdsb2JhbFxudmFyIGdldEdsb2JhbCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHRoZSBvbmx5IHJlbGlhYmxlIG1lYW5zIHRvIGdldCB0aGUgZ2xvYmFsIG9iamVjdCBpc1xuICAgIC8vIGBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpYFxuICAgIC8vIEhvd2V2ZXIsIHRoaXMgY2F1c2VzIENTUCB2aW9sYXRpb25zIGluIENocm9tZSBhcHBzLlxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHNlbGY7IH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHdpbmRvdzsgfVxuICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZ2xvYmFsOyB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gbG9jYXRlIGdsb2JhbCBvYmplY3QnKTtcbn1cblxudmFyIGdsb2JhbE9iamVjdCA9IGdldEdsb2JhbCgpO1xuXG5leHBvcnQgY29uc3QgZmV0Y2ggPSBnbG9iYWxPYmplY3QuZmV0Y2g7XG5cbmV4cG9ydCBkZWZhdWx0IGdsb2JhbE9iamVjdC5mZXRjaC5iaW5kKGdsb2JhbE9iamVjdCk7XG5cbmV4cG9ydCBjb25zdCBIZWFkZXJzID0gZ2xvYmFsT2JqZWN0LkhlYWRlcnM7XG5leHBvcnQgY29uc3QgUmVxdWVzdCA9IGdsb2JhbE9iamVjdC5SZXF1ZXN0O1xuZXhwb3J0IGNvbnN0IFJlc3BvbnNlID0gZ2xvYmFsT2JqZWN0LlJlc3BvbnNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyBAdHMtaWdub3JlXG5jb25zdCBub2RlX2ZldGNoXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIkBzdXBhYmFzZS9ub2RlLWZldGNoXCIpKTtcbmNvbnN0IFBvc3RncmVzdEVycm9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0RXJyb3JcIikpO1xuY2xhc3MgUG9zdGdyZXN0QnVpbGRlciB7XG4gICAgY29uc3RydWN0b3IoYnVpbGRlcikge1xuICAgICAgICB0aGlzLnNob3VsZFRocm93T25FcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IGJ1aWxkZXIubWV0aG9kO1xuICAgICAgICB0aGlzLnVybCA9IGJ1aWxkZXIudXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBidWlsZGVyLmhlYWRlcnM7XG4gICAgICAgIHRoaXMuc2NoZW1hID0gYnVpbGRlci5zY2hlbWE7XG4gICAgICAgIHRoaXMuYm9keSA9IGJ1aWxkZXIuYm9keTtcbiAgICAgICAgdGhpcy5zaG91bGRUaHJvd09uRXJyb3IgPSBidWlsZGVyLnNob3VsZFRocm93T25FcnJvcjtcbiAgICAgICAgdGhpcy5zaWduYWwgPSBidWlsZGVyLnNpZ25hbDtcbiAgICAgICAgdGhpcy5pc01heWJlU2luZ2xlID0gYnVpbGRlci5pc01heWJlU2luZ2xlO1xuICAgICAgICBpZiAoYnVpbGRlci5mZXRjaCkge1xuICAgICAgICAgICAgdGhpcy5mZXRjaCA9IGJ1aWxkZXIuZmV0Y2g7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGZldGNoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5mZXRjaCA9IG5vZGVfZmV0Y2hfMS5kZWZhdWx0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mZXRjaCA9IGZldGNoO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIHRoZXJlJ3MgYW4gZXJyb3Igd2l0aCB0aGUgcXVlcnksIHRocm93T25FcnJvciB3aWxsIHJlamVjdCB0aGUgcHJvbWlzZSBieVxuICAgICAqIHRocm93aW5nIHRoZSBlcnJvciBpbnN0ZWFkIG9mIHJldHVybmluZyBpdCBhcyBwYXJ0IG9mIGEgc3VjY2Vzc2Z1bCByZXNwb25zZS5cbiAgICAgKlxuICAgICAqIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vc3VwYWJhc2Uvc3VwYWJhc2UtanMvaXNzdWVzLzkyfVxuICAgICAqL1xuICAgIHRocm93T25FcnJvcigpIHtcbiAgICAgICAgdGhpcy5zaG91bGRUaHJvd09uRXJyb3IgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGFuIEhUVFAgaGVhZGVyIGZvciB0aGUgcmVxdWVzdC5cbiAgICAgKi9cbiAgICBzZXRIZWFkZXIobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oZWFkZXJzKTtcbiAgICAgICAgdGhpcy5oZWFkZXJzW25hbWVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vcG9zdGdyZXN0Lm9yZy9lbi9zdGFibGUvYXBpLmh0bWwjc3dpdGNoaW5nLXNjaGVtYXNcbiAgICAgICAgaWYgKHRoaXMuc2NoZW1hID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIHNraXBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChbJ0dFVCcsICdIRUFEJ10uaW5jbHVkZXModGhpcy5tZXRob2QpKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdC1Qcm9maWxlJ10gPSB0aGlzLnNjaGVtYTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1snQ29udGVudC1Qcm9maWxlJ10gPSB0aGlzLnNjaGVtYTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tZXRob2QgIT09ICdHRVQnICYmIHRoaXMubWV0aG9kICE9PSAnSEVBRCcpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTk9URTogSW52b2tlIHcvbyBgdGhpc2AgdG8gYXZvaWQgaWxsZWdhbCBpbnZvY2F0aW9uIGVycm9yLlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc3VwYWJhc2UvcG9zdGdyZXN0LWpzL3B1bGwvMjQ3XG4gICAgICAgIGNvbnN0IF9mZXRjaCA9IHRoaXMuZmV0Y2g7XG4gICAgICAgIGxldCByZXMgPSBfZmV0Y2godGhpcy51cmwudG9TdHJpbmcoKSwge1xuICAgICAgICAgICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRoaXMuYm9keSksXG4gICAgICAgICAgICBzaWduYWw6IHRoaXMuc2lnbmFsLFxuICAgICAgICB9KS50aGVuKGFzeW5jIChyZXMpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgbGV0IGVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBkYXRhID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gcmVzLnN0YXR1cztcbiAgICAgICAgICAgIGxldCBzdGF0dXNUZXh0ID0gcmVzLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWV0aG9kICE9PSAnSEVBRCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcy50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5ID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJlZmVyOiByZXR1cm49bWluaW1hbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaGVhZGVyc1snQWNjZXB0J10gPT09ICd0ZXh0L2NzdicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBib2R5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaGVhZGVyc1snQWNjZXB0J10gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyc1snQWNjZXB0J10uaW5jbHVkZXMoJ2FwcGxpY2F0aW9uL3ZuZC5wZ3JzdC5wbGFuK3RleHQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjb3VudEhlYWRlciA9IChfYSA9IHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXRjaCgvY291bnQ9KGV4YWN0fHBsYW5uZWR8ZXN0aW1hdGVkKS8pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRSYW5nZSA9IChfYiA9IHJlcy5oZWFkZXJzLmdldCgnY29udGVudC1yYW5nZScpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRIZWFkZXIgJiYgY29udGVudFJhbmdlICYmIGNvbnRlbnRSYW5nZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gcGFyc2VJbnQoY29udGVudFJhbmdlWzFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVGVtcG9yYXJ5IHBhcnRpYWwgZml4IGZvciBodHRwczovL2dpdGh1Yi5jb20vc3VwYWJhc2UvcG9zdGdyZXN0LWpzL2lzc3Vlcy8zNjFcbiAgICAgICAgICAgICAgICAvLyBJc3N1ZSBwZXJzaXN0cyBlLmcuIGZvciBgLmluc2VydChbLi4uXSkuc2VsZWN0KCkubWF5YmVTaW5nbGUoKWBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc01heWJlU2luZ2xlICYmIHRoaXMubWV0aG9kID09PSAnR0VUJyAmJiBBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Qb3N0Z1JFU1QvcG9zdGdyZXN0L2Jsb2IvYTg2N2Q3OWM0MjQxOWFmMTZjMThjM2ZiMDE5ZWJhOGRmOTkyNjI2Zi9zcmMvUG9zdGdSRVNUL0Vycm9yLmhzI0w1NTNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOiAnUEdSU1QxMTYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IGBSZXN1bHRzIGNvbnRhaW4gJHtkYXRhLmxlbmd0aH0gcm93cywgYXBwbGljYXRpb24vdm5kLnBncnN0Lm9iamVjdCtqc29uIHJlcXVpcmVzIDEgcm93YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaW50OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdKU09OIG9iamVjdCByZXF1ZXN0ZWQsIG11bHRpcGxlIChvciBubykgcm93cyByZXR1cm5lZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSA0MDY7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0ID0gJ05vdCBBY2NlcHRhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGFbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXMudGV4dCgpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gSlNPTi5wYXJzZShib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3N1cGFiYXNlL3Bvc3RncmVzdC1qcy9pc3N1ZXMvMjk1XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVycm9yKSAmJiByZXMuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDIwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQgPSAnT0snO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChfZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vc3VwYWJhc2UvcG9zdGdyZXN0LWpzL2lzc3Vlcy8yOTVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwNCAmJiBib2R5ID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMjA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9ICdObyBDb250ZW50JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGJvZHksXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlcnJvciAmJiB0aGlzLmlzTWF5YmVTaW5nbGUgJiYgKChfYyA9IGVycm9yID09PSBudWxsIHx8IGVycm9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlcnJvci5kZXRhaWxzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaW5jbHVkZXMoJzAgcm93cycpKSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9IDIwMDtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dCA9ICdPSyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlcnJvciAmJiB0aGlzLnNob3VsZFRocm93T25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUG9zdGdyZXN0RXJyb3JfMS5kZWZhdWx0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwb3N0Z3Jlc3RSZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgIGNvdW50LFxuICAgICAgICAgICAgICAgIHN0YXR1cyxcbiAgICAgICAgICAgICAgICBzdGF0dXNUZXh0LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0Z3Jlc3RSZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGRUaHJvd09uRXJyb3IpIHtcbiAgICAgICAgICAgIHJlcyA9IHJlcy5jYXRjaCgoZmV0Y2hFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYCR7KF9hID0gZmV0Y2hFcnJvciA9PT0gbnVsbCB8fCBmZXRjaEVycm9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmZXRjaEVycm9yLm5hbWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdGZXRjaEVycm9yJ306ICR7ZmV0Y2hFcnJvciA9PT0gbnVsbCB8fCBmZXRjaEVycm9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmZXRjaEVycm9yLm1lc3NhZ2V9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHM6IGAkeyhfYiA9IGZldGNoRXJyb3IgPT09IG51bGwgfHwgZmV0Y2hFcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmV0Y2hFcnJvci5zdGFjaykgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJyd9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogYCR7KF9jID0gZmV0Y2hFcnJvciA9PT0gbnVsbCB8fCBmZXRjaEVycm9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmZXRjaEVycm9yLmNvZGUpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6ICcnfWAsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IDAsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6ICcnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcy50aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIHR5cGUgb2YgdGhlIHJldHVybmVkIGBkYXRhYC5cbiAgICAgKlxuICAgICAqIEB0eXBlUGFyYW0gTmV3UmVzdWx0IC0gVGhlIG5ldyByZXN1bHQgdHlwZSB0byBvdmVycmlkZSB3aXRoXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIG92ZXJyaWRlVHlwZXM8eW91clR5cGUsIHsgbWVyZ2U6IGZhbHNlIH0+KCkgbWV0aG9kIGF0IHRoZSBlbmQgb2YgeW91ciBjYWxsIGNoYWluIGluc3RlYWRcbiAgICAgKi9cbiAgICByZXR1cm5zKCkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIHR5cGUgb2YgdGhlIHJldHVybmVkIGBkYXRhYCBmaWVsZCBpbiB0aGUgcmVzcG9uc2UuXG4gICAgICpcbiAgICAgKiBAdHlwZVBhcmFtIE5ld1Jlc3VsdCAtIFRoZSBuZXcgdHlwZSB0byBjYXN0IHRoZSByZXNwb25zZSBkYXRhIHRvXG4gICAgICogQHR5cGVQYXJhbSBPcHRpb25zIC0gT3B0aW9uYWwgdHlwZSBjb25maWd1cmF0aW9uIChkZWZhdWx0cyB0byB7IG1lcmdlOiB0cnVlIH0pXG4gICAgICogQHR5cGVQYXJhbSBPcHRpb25zLm1lcmdlIC0gV2hlbiB0cnVlLCBtZXJnZXMgdGhlIG5ldyB0eXBlIHdpdGggZXhpc3RpbmcgcmV0dXJuIHR5cGUuIFdoZW4gZmFsc2UsIHJlcGxhY2VzIHRoZSBleGlzdGluZyB0eXBlcyBlbnRpcmVseSAoZGVmYXVsdHMgdG8gdHJ1ZSlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiAvLyBNZXJnZSB3aXRoIGV4aXN0aW5nIHR5cGVzIChkZWZhdWx0IGJlaGF2aW9yKVxuICAgICAqIGNvbnN0IHF1ZXJ5ID0gc3VwYWJhc2VcbiAgICAgKiAgIC5mcm9tKCd1c2VycycpXG4gICAgICogICAuc2VsZWN0KClcbiAgICAgKiAgIC5vdmVycmlkZVR5cGVzPHsgY3VzdG9tX2ZpZWxkOiBzdHJpbmcgfT4oKVxuICAgICAqXG4gICAgICogLy8gUmVwbGFjZSBleGlzdGluZyB0eXBlcyBjb21wbGV0ZWx5XG4gICAgICogY29uc3QgcmVwbGFjZVF1ZXJ5ID0gc3VwYWJhc2VcbiAgICAgKiAgIC5mcm9tKCd1c2VycycpXG4gICAgICogICAuc2VsZWN0KClcbiAgICAgKiAgIC5vdmVycmlkZVR5cGVzPHsgaWQ6IG51bWJlcjsgbmFtZTogc3RyaW5nIH0sIHsgbWVyZ2U6IGZhbHNlIH0+KClcbiAgICAgKiBgYGBcbiAgICAgKiBAcmV0dXJucyBBIFBvc3RncmVzdEJ1aWxkZXIgaW5zdGFuY2Ugd2l0aCB0aGUgbmV3IHR5cGVcbiAgICAgKi9cbiAgICBvdmVycmlkZVR5cGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQb3N0Z3Jlc3RCdWlsZGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9zdGdyZXN0QnVpbGRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFBvc3RncmVzdFF1ZXJ5QnVpbGRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdFF1ZXJ5QnVpbGRlclwiKSk7XG5jb25zdCBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0RmlsdGVyQnVpbGRlclwiKSk7XG5jb25zdCBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKTtcbi8qKlxuICogUG9zdGdSRVNUIGNsaWVudC5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGFiYXNlIC0gVHlwZXMgZm9yIHRoZSBzY2hlbWEgZnJvbSB0aGUgW3R5cGVcbiAqIGdlbmVyYXRvcl0oaHR0cHM6Ly9zdXBhYmFzZS5jb20vZG9jcy9yZWZlcmVuY2UvamF2YXNjcmlwdC9uZXh0L3R5cGVzY3JpcHQtc3VwcG9ydClcbiAqXG4gKiBAdHlwZVBhcmFtIFNjaGVtYU5hbWUgLSBQb3N0Z3JlcyBzY2hlbWEgdG8gc3dpdGNoIHRvLiBNdXN0IGJlIGEgc3RyaW5nXG4gKiBsaXRlcmFsLCB0aGUgc2FtZSBvbmUgcGFzc2VkIHRvIHRoZSBjb25zdHJ1Y3Rvci4gSWYgdGhlIHNjaGVtYSBpcyBub3RcbiAqIGBcInB1YmxpY1wiYCwgdGhpcyBtdXN0IGJlIHN1cHBsaWVkIG1hbnVhbGx5LlxuICovXG5jbGFzcyBQb3N0Z3Jlc3RDbGllbnQge1xuICAgIC8vIFRPRE86IEFkZCBiYWNrIHNob3VsZFRocm93T25FcnJvciBvbmNlIHdlIGZpZ3VyZSBvdXQgdGhlIHR5cGluZ3NcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgUG9zdGdSRVNUIGNsaWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB1cmwgLSBVUkwgb2YgdGhlIFBvc3RnUkVTVCBlbmRwb2ludFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLmhlYWRlcnMgLSBDdXN0b20gaGVhZGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLnNjaGVtYSAtIFBvc3RncmVzIHNjaGVtYSB0byBzd2l0Y2ggdG9cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5mZXRjaCAtIEN1c3RvbSBmZXRjaFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVybCwgeyBoZWFkZXJzID0ge30sIHNjaGVtYSwgZmV0Y2gsIH0gPSB7fSkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBjb25zdGFudHNfMS5ERUZBVUxUX0hFQURFUlMpLCBoZWFkZXJzKTtcbiAgICAgICAgdGhpcy5zY2hlbWFOYW1lID0gc2NoZW1hO1xuICAgICAgICB0aGlzLmZldGNoID0gZmV0Y2g7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBxdWVyeSBvbiBhIHRhYmxlIG9yIGEgdmlldy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWxhdGlvbiAtIFRoZSB0YWJsZSBvciB2aWV3IG5hbWUgdG8gcXVlcnlcbiAgICAgKi9cbiAgICBmcm9tKHJlbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYCR7dGhpcy51cmx9LyR7cmVsYXRpb259YCk7XG4gICAgICAgIHJldHVybiBuZXcgUG9zdGdyZXN0UXVlcnlCdWlsZGVyXzEuZGVmYXVsdCh1cmwsIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaGVhZGVycyksXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hTmFtZSxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VsZWN0IGEgc2NoZW1hIHRvIHF1ZXJ5IG9yIHBlcmZvcm0gYW4gZnVuY3Rpb24gKHJwYykgY2FsbC5cbiAgICAgKlxuICAgICAqIFRoZSBzY2hlbWEgbmVlZHMgdG8gYmUgb24gdGhlIGxpc3Qgb2YgZXhwb3NlZCBzY2hlbWFzIGluc2lkZSBTdXBhYmFzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgLSBUaGUgc2NoZW1hIHRvIHF1ZXJ5XG4gICAgICovXG4gICAgc2NoZW1hKHNjaGVtYSkge1xuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdENsaWVudCh0aGlzLnVybCwge1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2NoZW1hLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgZnVuY3Rpb24gY2FsbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmbiAtIFRoZSBmdW5jdGlvbiBuYW1lIHRvIGNhbGxcbiAgICAgKiBAcGFyYW0gYXJncyAtIFRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgZnVuY3Rpb24gY2FsbFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLmhlYWQgLSBXaGVuIHNldCB0byBgdHJ1ZWAsIGBkYXRhYCB3aWxsIG5vdCBiZSByZXR1cm5lZC5cbiAgICAgKiBVc2VmdWwgaWYgeW91IG9ubHkgbmVlZCB0aGUgY291bnQuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZ2V0IC0gV2hlbiBzZXQgdG8gYHRydWVgLCB0aGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aFxuICAgICAqIHJlYWQtb25seSBhY2Nlc3MgbW9kZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb3VudCAtIENvdW50IGFsZ29yaXRobSB0byB1c2UgdG8gY291bnQgcm93cyByZXR1cm5lZCBieSB0aGVcbiAgICAgKiBmdW5jdGlvbi4gT25seSBhcHBsaWNhYmxlIGZvciBbc2V0LXJldHVybmluZ1xuICAgICAqIGZ1bmN0aW9uc10oaHR0cHM6Ly93d3cucG9zdGdyZXNxbC5vcmcvZG9jcy9jdXJyZW50L2Z1bmN0aW9ucy1zcmYuaHRtbCkuXG4gICAgICpcbiAgICAgKiBgXCJleGFjdFwiYDogRXhhY3QgYnV0IHNsb3cgY291bnQgYWxnb3JpdGhtLiBQZXJmb3JtcyBhIGBDT1VOVCgqKWAgdW5kZXIgdGhlXG4gICAgICogaG9vZC5cbiAgICAgKlxuICAgICAqIGBcInBsYW5uZWRcImA6IEFwcHJveGltYXRlZCBidXQgZmFzdCBjb3VudCBhbGdvcml0aG0uIFVzZXMgdGhlIFBvc3RncmVzXG4gICAgICogc3RhdGlzdGljcyB1bmRlciB0aGUgaG9vZC5cbiAgICAgKlxuICAgICAqIGBcImVzdGltYXRlZFwiYDogVXNlcyBleGFjdCBjb3VudCBmb3IgbG93IG51bWJlcnMgYW5kIHBsYW5uZWQgY291bnQgZm9yIGhpZ2hcbiAgICAgKiBudW1iZXJzLlxuICAgICAqL1xuICAgIHJwYyhmbiwgYXJncyA9IHt9LCB7IGhlYWQgPSBmYWxzZSwgZ2V0ID0gZmFsc2UsIGNvdW50LCB9ID0ge30pIHtcbiAgICAgICAgbGV0IG1ldGhvZDtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChgJHt0aGlzLnVybH0vcnBjLyR7Zm59YCk7XG4gICAgICAgIGxldCBib2R5O1xuICAgICAgICBpZiAoaGVhZCB8fCBnZXQpIHtcbiAgICAgICAgICAgIG1ldGhvZCA9IGhlYWQgPyAnSEVBRCcgOiAnR0VUJztcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGFyZ3MpXG4gICAgICAgICAgICAgICAgLy8gcGFyYW1zIHdpdGggdW5kZWZpbmVkIHZhbHVlIG5lZWRzIHRvIGJlIGZpbHRlcmVkIG91dCwgb3RoZXJ3aXNlIGl0J2xsXG4gICAgICAgICAgICAgICAgLy8gc2hvdyB1cCBhcyBgP3BhcmFtPXVuZGVmaW5lZGBcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChbXywgdmFsdWVdKSA9PiB2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIC8vIGFycmF5IHZhbHVlcyBuZWVkIHNwZWNpYWwgc3ludGF4XG4gICAgICAgICAgICAgICAgLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gW25hbWUsIEFycmF5LmlzQXJyYXkodmFsdWUpID8gYHske3ZhbHVlLmpvaW4oJywnKX19YCA6IGAke3ZhbHVlfWBdKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChbbmFtZSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQobmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtZXRob2QgPSAnUE9TVCc7XG4gICAgICAgICAgICBib2R5ID0gYXJncztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oZWFkZXJzKTtcbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICBoZWFkZXJzWydQcmVmZXInXSA9IGBjb3VudD0ke2NvdW50fWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYU5hbWUsXG4gICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgICAgICBhbGxvd0VtcHR5OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUG9zdGdyZXN0Q2xpZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9zdGdyZXN0Q2xpZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBFcnJvciBmb3JtYXRcbiAqXG4gKiB7QGxpbmsgaHR0cHM6Ly9wb3N0Z3Jlc3Qub3JnL2VuL3N0YWJsZS9hcGkuaHRtbD9oaWdobGlnaHQ9b3B0aW9ucyNlcnJvcnMtYW5kLWh0dHAtc3RhdHVzLWNvZGVzfVxuICovXG5jbGFzcyBQb3N0Z3Jlc3RFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQubWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdQb3N0Z3Jlc3RFcnJvcic7XG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGNvbnRleHQuZGV0YWlscztcbiAgICAgICAgdGhpcy5oaW50ID0gY29udGV4dC5oaW50O1xuICAgICAgICB0aGlzLmNvZGUgPSBjb250ZXh0LmNvZGU7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUG9zdGdyZXN0RXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qb3N0Z3Jlc3RFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyXCIpKTtcbmNsYXNzIFBvc3RncmVzdEZpbHRlckJ1aWxkZXIgZXh0ZW5kcyBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyXzEuZGVmYXVsdCB7XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIGVxdWFsIHRvIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBUbyBjaGVjayBpZiB0aGUgdmFsdWUgb2YgYGNvbHVtbmAgaXMgTlVMTCwgeW91IHNob3VsZCB1c2UgYC5pcygpYCBpbnN0ZWFkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgZXEoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGVxLiR7dmFsdWV9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgaXMgbm90IGVxdWFsIHRvIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBuZXEoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYG5lcS4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIGdyZWF0ZXIgdGhhbiBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgZ3QoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGd0LiR7dmFsdWV9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBndGUoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGd0ZS4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIGlzIGxlc3MgdGhhbiBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgbHQoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGx0LiR7dmFsdWV9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGB2YWx1ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBsdGUoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGx0ZS4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIG1hdGNoZXMgYHBhdHRlcm5gIGNhc2Utc2Vuc2l0aXZlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcGF0dGVybiAtIFRoZSBwYXR0ZXJuIHRvIG1hdGNoIHdpdGhcbiAgICAgKi9cbiAgICBsaWtlKGNvbHVtbiwgcGF0dGVybikge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGxpa2UuJHtwYXR0ZXJufWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIG1hdGNoZXMgYWxsIG9mIGBwYXR0ZXJuc2AgY2FzZS1zZW5zaXRpdmVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBwYXR0ZXJucyAtIFRoZSBwYXR0ZXJucyB0byBtYXRjaCB3aXRoXG4gICAgICovXG4gICAgbGlrZUFsbE9mKGNvbHVtbiwgcGF0dGVybnMpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBsaWtlKGFsbCkueyR7cGF0dGVybnMuam9pbignLCcpfX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBtYXRjaGVzIGFueSBvZiBgcGF0dGVybnNgIGNhc2Utc2Vuc2l0aXZlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcGF0dGVybnMgLSBUaGUgcGF0dGVybnMgdG8gbWF0Y2ggd2l0aFxuICAgICAqL1xuICAgIGxpa2VBbnlPZihjb2x1bW4sIHBhdHRlcm5zKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgbGlrZShhbnkpLnske3BhdHRlcm5zLmpvaW4oJywnKX19YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgbWF0Y2hlcyBgcGF0dGVybmAgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHBhdHRlcm4gLSBUaGUgcGF0dGVybiB0byBtYXRjaCB3aXRoXG4gICAgICovXG4gICAgaWxpa2UoY29sdW1uLCBwYXR0ZXJuKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgaWxpa2UuJHtwYXR0ZXJufWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoZXJlIGBjb2x1bW5gIG1hdGNoZXMgYWxsIG9mIGBwYXR0ZXJuc2AgY2FzZS1pbnNlbnNpdGl2ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHBhdHRlcm5zIC0gVGhlIHBhdHRlcm5zIHRvIG1hdGNoIHdpdGhcbiAgICAgKi9cbiAgICBpbGlrZUFsbE9mKGNvbHVtbiwgcGF0dGVybnMpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBpbGlrZShhbGwpLnske3BhdHRlcm5zLmpvaW4oJywnKX19YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgbWF0Y2hlcyBhbnkgb2YgYHBhdHRlcm5zYCBjYXNlLWluc2Vuc2l0aXZlbHkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcGF0dGVybnMgLSBUaGUgcGF0dGVybnMgdG8gbWF0Y2ggd2l0aFxuICAgICAqL1xuICAgIGlsaWtlQW55T2YoY29sdW1uLCBwYXR0ZXJucykge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGlsaWtlKGFueSkueyR7cGF0dGVybnMuam9pbignLCcpfX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBgY29sdW1uYCBJUyBgdmFsdWVgLlxuICAgICAqXG4gICAgICogRm9yIG5vbi1ib29sZWFuIGNvbHVtbnMsIHRoaXMgaXMgb25seSByZWxldmFudCBmb3IgY2hlY2tpbmcgaWYgdGhlIHZhbHVlIG9mXG4gICAgICogYGNvbHVtbmAgaXMgTlVMTCBieSBzZXR0aW5nIGB2YWx1ZWAgdG8gYG51bGxgLlxuICAgICAqXG4gICAgICogRm9yIGJvb2xlYW4gY29sdW1ucywgeW91IGNhbiBhbHNvIHNldCBgdmFsdWVgIHRvIGB0cnVlYCBvciBgZmFsc2VgIGFuZCBpdFxuICAgICAqIHdpbGwgYmVoYXZlIHRoZSBzYW1lIHdheSBhcyBgLmVxKClgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgaXMoY29sdW1uLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGlzLiR7dmFsdWV9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgaXMgaW5jbHVkZWQgaW4gdGhlIGB2YWx1ZXNgIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHZhbHVlcyAtIFRoZSB2YWx1ZXMgYXJyYXkgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICBpbihjb2x1bW4sIHZhbHVlcykge1xuICAgICAgICBjb25zdCBjbGVhbmVkVmFsdWVzID0gQXJyYXkuZnJvbShuZXcgU2V0KHZhbHVlcykpXG4gICAgICAgICAgICAubWFwKChzKSA9PiB7XG4gICAgICAgICAgICAvLyBoYW5kbGUgcG9zdGdyZXN0IHJlc2VydmVkIGNoYXJhY3RlcnNcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vcG9zdGdyZXN0Lm9yZy9lbi92Ny4wLjAvYXBpLmh0bWwjcmVzZXJ2ZWQtY2hhcmFjdGVyc1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzID09PSAnc3RyaW5nJyAmJiBuZXcgUmVnRXhwKCdbLCgpXScpLnRlc3QocykpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGBcIiR7c31cImA7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3N9YDtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcsJyk7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgaW4uKCR7Y2xlYW5lZFZhbHVlc30pYCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciBqc29uYiwgYXJyYXksIGFuZCByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmVcbiAgICAgKiBgY29sdW1uYCBjb250YWlucyBldmVyeSBlbGVtZW50IGFwcGVhcmluZyBpbiBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBqc29uYiwgYXJyYXksIG9yIHJhbmdlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUganNvbmIsIGFycmF5LCBvciByYW5nZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGNvbnRhaW5zKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIHJhbmdlIHR5cGVzIGNhbiBiZSBpbmNsdXNpdmUgJ1snLCAnXScgb3IgZXhjbHVzaXZlICcoJywgJyknIHNvIGp1c3RcbiAgICAgICAgICAgIC8vIGtlZXAgaXQgc2ltcGxlIGFuZCBhY2NlcHQgYSBzdHJpbmdcbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgY3MuJHt2YWx1ZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gYXJyYXlcbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgY3MueyR7dmFsdWUuam9pbignLCcpfX1gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGpzb25cbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgY3MuJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ubHkgcmVsZXZhbnQgZm9yIGpzb25iLCBhcnJheSwgYW5kIHJhbmdlIGNvbHVtbnMuIE1hdGNoIG9ubHkgcm93cyB3aGVyZVxuICAgICAqIGV2ZXJ5IGVsZW1lbnQgYXBwZWFyaW5nIGluIGBjb2x1bW5gIGlzIGNvbnRhaW5lZCBieSBgdmFsdWVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBqc29uYiwgYXJyYXksIG9yIHJhbmdlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUganNvbmIsIGFycmF5LCBvciByYW5nZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIGNvbnRhaW5lZEJ5KGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIHJhbmdlXG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGNkLiR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIGFycmF5XG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGNkLnske3ZhbHVlLmpvaW4oJywnKX19YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBqc29uXG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGNkLiR7SlNPTi5zdHJpbmdpZnkodmFsdWUpfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgZXZlcnkgZWxlbWVudCBpblxuICAgICAqIGBjb2x1bW5gIGlzIGdyZWF0ZXIgdGhhbiBhbnkgZWxlbWVudCBpbiBgcmFuZ2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHJhbmdlIC0gVGhlIHJhbmdlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgcmFuZ2VHdChjb2x1bW4sIHJhbmdlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgc3IuJHtyYW5nZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ubHkgcmVsZXZhbnQgZm9yIHJhbmdlIGNvbHVtbnMuIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBldmVyeSBlbGVtZW50IGluXG4gICAgICogYGNvbHVtbmAgaXMgZWl0aGVyIGNvbnRhaW5lZCBpbiBgcmFuZ2VgIG9yIGdyZWF0ZXIgdGhhbiBhbnkgZWxlbWVudCBpblxuICAgICAqIGByYW5nZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIHJhbmdlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICByYW5nZUd0ZShjb2x1bW4sIHJhbmdlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgbnhsLiR7cmFuZ2V9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgZXZlcnkgZWxlbWVudCBpblxuICAgICAqIGBjb2x1bW5gIGlzIGxlc3MgdGhhbiBhbnkgZWxlbWVudCBpbiBgcmFuZ2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHJhbmdlIC0gVGhlIHJhbmdlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgcmFuZ2VMdChjb2x1bW4sIHJhbmdlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgc2wuJHtyYW5nZX1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ubHkgcmVsZXZhbnQgZm9yIHJhbmdlIGNvbHVtbnMuIE1hdGNoIG9ubHkgcm93cyB3aGVyZSBldmVyeSBlbGVtZW50IGluXG4gICAgICogYGNvbHVtbmAgaXMgZWl0aGVyIGNvbnRhaW5lZCBpbiBgcmFuZ2VgIG9yIGxlc3MgdGhhbiBhbnkgZWxlbWVudCBpblxuICAgICAqIGByYW5nZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIHJhbmdlIGNvbHVtbiB0byBmaWx0ZXIgb25cbiAgICAgKiBAcGFyYW0gcmFuZ2UgLSBUaGUgcmFuZ2UgdG8gZmlsdGVyIHdpdGhcbiAgICAgKi9cbiAgICByYW5nZUx0ZShjb2x1bW4sIHJhbmdlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgbnhyLiR7cmFuZ2V9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciByYW5nZSBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgYGNvbHVtbmAgaXNcbiAgICAgKiBtdXR1YWxseSBleGNsdXNpdmUgdG8gYHJhbmdlYCBhbmQgdGhlcmUgY2FuIGJlIG5vIGVsZW1lbnQgYmV0d2VlbiB0aGUgdHdvXG4gICAgICogcmFuZ2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSByYW5nZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHJhbmdlIC0gVGhlIHJhbmdlIHRvIGZpbHRlciB3aXRoXG4gICAgICovXG4gICAgcmFuZ2VBZGphY2VudChjb2x1bW4sIHJhbmdlKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgYWRqLiR7cmFuZ2V9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciBhcnJheSBhbmQgcmFuZ2UgY29sdW1ucy4gTWF0Y2ggb25seSByb3dzIHdoZXJlXG4gICAgICogYGNvbHVtbmAgYW5kIGB2YWx1ZWAgaGF2ZSBhbiBlbGVtZW50IGluIGNvbW1vbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgYXJyYXkgb3IgcmFuZ2UgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBhcnJheSBvciByYW5nZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aFxuICAgICAqL1xuICAgIG92ZXJsYXBzKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIHJhbmdlXG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYG92LiR7dmFsdWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBhcnJheVxuICAgICAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGBvdi57JHt2YWx1ZS5qb2luKCcsJyl9fWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbmx5IHJlbGV2YW50IGZvciB0ZXh0IGFuZCB0c3ZlY3RvciBjb2x1bW5zLiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmVcbiAgICAgKiBgY29sdW1uYCBtYXRjaGVzIHRoZSBxdWVyeSBzdHJpbmcgaW4gYHF1ZXJ5YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgdGV4dCBvciB0c3ZlY3RvciBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIHF1ZXJ5IC0gVGhlIHF1ZXJ5IHRleHQgdG8gbWF0Y2ggd2l0aFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvbmZpZyAtIFRoZSB0ZXh0IHNlYXJjaCBjb25maWd1cmF0aW9uIHRvIHVzZVxuICAgICAqIEBwYXJhbSBvcHRpb25zLnR5cGUgLSBDaGFuZ2UgaG93IHRoZSBgcXVlcnlgIHRleHQgaXMgaW50ZXJwcmV0ZWRcbiAgICAgKi9cbiAgICB0ZXh0U2VhcmNoKGNvbHVtbiwgcXVlcnksIHsgY29uZmlnLCB0eXBlIH0gPSB7fSkge1xuICAgICAgICBsZXQgdHlwZVBhcnQgPSAnJztcbiAgICAgICAgaWYgKHR5cGUgPT09ICdwbGFpbicpIHtcbiAgICAgICAgICAgIHR5cGVQYXJ0ID0gJ3BsJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAncGhyYXNlJykge1xuICAgICAgICAgICAgdHlwZVBhcnQgPSAncGgnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICd3ZWJzZWFyY2gnKSB7XG4gICAgICAgICAgICB0eXBlUGFydCA9ICd3JztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb25maWdQYXJ0ID0gY29uZmlnID09PSB1bmRlZmluZWQgPyAnJyA6IGAoJHtjb25maWd9KWA7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoY29sdW1uLCBgJHt0eXBlUGFydH1mdHMke2NvbmZpZ1BhcnR9LiR7cXVlcnl9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXRjaCBvbmx5IHJvd3Mgd2hlcmUgZWFjaCBjb2x1bW4gaW4gYHF1ZXJ5YCBrZXlzIGlzIGVxdWFsIHRvIGl0c1xuICAgICAqIGFzc29jaWF0ZWQgdmFsdWUuIFNob3J0aGFuZCBmb3IgbXVsdGlwbGUgYC5lcSgpYHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcXVlcnkgLSBUaGUgb2JqZWN0IHRvIGZpbHRlciB3aXRoLCB3aXRoIGNvbHVtbiBuYW1lcyBhcyBrZXlzIG1hcHBlZFxuICAgICAqIHRvIHRoZWlyIGZpbHRlciB2YWx1ZXNcbiAgICAgKi9cbiAgICBtYXRjaChxdWVyeSkge1xuICAgICAgICBPYmplY3QuZW50cmllcyhxdWVyeSkuZm9yRWFjaCgoW2NvbHVtbiwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYGVxLiR7dmFsdWV9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoaWNoIGRvZXNuJ3Qgc2F0aXNmeSB0aGUgZmlsdGVyLlxuICAgICAqXG4gICAgICogVW5saWtlIG1vc3QgZmlsdGVycywgYG9wZWFyYXRvcmAgYW5kIGB2YWx1ZWAgYXJlIHVzZWQgYXMtaXMgYW5kIG5lZWQgdG9cbiAgICAgKiBmb2xsb3cgW1Bvc3RnUkVTVFxuICAgICAqIHN5bnRheF0oaHR0cHM6Ly9wb3N0Z3Jlc3Qub3JnL2VuL3N0YWJsZS9hcGkuaHRtbCNvcGVyYXRvcnMpLiBZb3UgYWxzbyBuZWVkXG4gICAgICogdG8gbWFrZSBzdXJlIHRoZXkgYXJlIHByb3Blcmx5IHNhbml0aXplZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW4gLSBUaGUgY29sdW1uIHRvIGZpbHRlciBvblxuICAgICAqIEBwYXJhbSBvcGVyYXRvciAtIFRoZSBvcGVyYXRvciB0byBiZSBuZWdhdGVkIHRvIGZpbHRlciB3aXRoLCBmb2xsb3dpbmdcbiAgICAgKiBQb3N0Z1JFU1Qgc3ludGF4XG4gICAgICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIGZpbHRlciB3aXRoLCBmb2xsb3dpbmcgUG9zdGdSRVNUIHN5bnRheFxuICAgICAqL1xuICAgIG5vdChjb2x1bW4sIG9wZXJhdG9yLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKGNvbHVtbiwgYG5vdC4ke29wZXJhdG9yfS4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWF0Y2ggb25seSByb3dzIHdoaWNoIHNhdGlzZnkgYXQgbGVhc3Qgb25lIG9mIHRoZSBmaWx0ZXJzLlxuICAgICAqXG4gICAgICogVW5saWtlIG1vc3QgZmlsdGVycywgYGZpbHRlcnNgIGlzIHVzZWQgYXMtaXMgYW5kIG5lZWRzIHRvIGZvbGxvdyBbUG9zdGdSRVNUXG4gICAgICogc3ludGF4XShodHRwczovL3Bvc3RncmVzdC5vcmcvZW4vc3RhYmxlL2FwaS5odG1sI29wZXJhdG9ycykuIFlvdSBhbHNvIG5lZWRcbiAgICAgKiB0byBtYWtlIHN1cmUgaXQncyBwcm9wZXJseSBzYW5pdGl6ZWQuXG4gICAgICpcbiAgICAgKiBJdCdzIGN1cnJlbnRseSBub3QgcG9zc2libGUgdG8gZG8gYW4gYC5vcigpYCBmaWx0ZXIgYWNyb3NzIG11bHRpcGxlIHRhYmxlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmaWx0ZXJzIC0gVGhlIGZpbHRlcnMgdG8gdXNlLCBmb2xsb3dpbmcgUG9zdGdSRVNUIHN5bnRheFxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLnJlZmVyZW5jZWRUYWJsZSAtIFNldCB0aGlzIHRvIGZpbHRlciBvbiByZWZlcmVuY2VkIHRhYmxlc1xuICAgICAqIGluc3RlYWQgb2YgdGhlIHBhcmVudCB0YWJsZVxuICAgICAqIEBwYXJhbSBvcHRpb25zLmZvcmVpZ25UYWJsZSAtIERlcHJlY2F0ZWQsIHVzZSBgcmVmZXJlbmNlZFRhYmxlYCBpbnN0ZWFkXG4gICAgICovXG4gICAgb3IoZmlsdGVycywgeyBmb3JlaWduVGFibGUsIHJlZmVyZW5jZWRUYWJsZSA9IGZvcmVpZ25UYWJsZSwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHJlZmVyZW5jZWRUYWJsZSA/IGAke3JlZmVyZW5jZWRUYWJsZX0ub3JgIDogJ29yJztcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIGAoJHtmaWx0ZXJzfSlgKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1hdGNoIG9ubHkgcm93cyB3aGljaCBzYXRpc2Z5IHRoZSBmaWx0ZXIuIFRoaXMgaXMgYW4gZXNjYXBlIGhhdGNoIC0geW91XG4gICAgICogc2hvdWxkIHVzZSB0aGUgc3BlY2lmaWMgZmlsdGVyIG1ldGhvZHMgd2hlcmV2ZXIgcG9zc2libGUuXG4gICAgICpcbiAgICAgKiBVbmxpa2UgbW9zdCBmaWx0ZXJzLCBgb3BlYXJhdG9yYCBhbmQgYHZhbHVlYCBhcmUgdXNlZCBhcy1pcyBhbmQgbmVlZCB0b1xuICAgICAqIGZvbGxvdyBbUG9zdGdSRVNUXG4gICAgICogc3ludGF4XShodHRwczovL3Bvc3RncmVzdC5vcmcvZW4vc3RhYmxlL2FwaS5odG1sI29wZXJhdG9ycykuIFlvdSBhbHNvIG5lZWRcbiAgICAgKiB0byBtYWtlIHN1cmUgdGhleSBhcmUgcHJvcGVybHkgc2FuaXRpemVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbiAtIFRoZSBjb2x1bW4gdG8gZmlsdGVyIG9uXG4gICAgICogQHBhcmFtIG9wZXJhdG9yIC0gVGhlIG9wZXJhdG9yIHRvIGZpbHRlciB3aXRoLCBmb2xsb3dpbmcgUG9zdGdSRVNUIHN5bnRheFxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBmaWx0ZXIgd2l0aCwgZm9sbG93aW5nIFBvc3RnUkVTVCBzeW50YXhcbiAgICAgKi9cbiAgICBmaWx0ZXIoY29sdW1uLCBvcGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChjb2x1bW4sIGAke29wZXJhdG9yfS4ke3ZhbHVlfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9zdGdyZXN0RmlsdGVyQnVpbGRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXCIpKTtcbmNsYXNzIFBvc3RncmVzdFF1ZXJ5QnVpbGRlciB7XG4gICAgY29uc3RydWN0b3IodXJsLCB7IGhlYWRlcnMgPSB7fSwgc2NoZW1hLCBmZXRjaCwgfSkge1xuICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgdGhpcy5zY2hlbWEgPSBzY2hlbWE7XG4gICAgICAgIHRoaXMuZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIFNFTEVDVCBxdWVyeSBvbiB0aGUgdGFibGUgb3Igdmlldy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2x1bW5zIC0gVGhlIGNvbHVtbnMgdG8gcmV0cmlldmUsIHNlcGFyYXRlZCBieSBjb21tYXMuIENvbHVtbnMgY2FuIGJlIHJlbmFtZWQgd2hlbiByZXR1cm5lZCB3aXRoIGBjdXN0b21OYW1lOmNvbHVtbk5hbWVgXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmhlYWQgLSBXaGVuIHNldCB0byBgdHJ1ZWAsIGBkYXRhYCB3aWxsIG5vdCBiZSByZXR1cm5lZC5cbiAgICAgKiBVc2VmdWwgaWYgeW91IG9ubHkgbmVlZCB0aGUgY291bnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5jb3VudCAtIENvdW50IGFsZ29yaXRobSB0byB1c2UgdG8gY291bnQgcm93cyBpbiB0aGUgdGFibGUgb3Igdmlldy5cbiAgICAgKlxuICAgICAqIGBcImV4YWN0XCJgOiBFeGFjdCBidXQgc2xvdyBjb3VudCBhbGdvcml0aG0uIFBlcmZvcm1zIGEgYENPVU5UKCopYCB1bmRlciB0aGVcbiAgICAgKiBob29kLlxuICAgICAqXG4gICAgICogYFwicGxhbm5lZFwiYDogQXBwcm94aW1hdGVkIGJ1dCBmYXN0IGNvdW50IGFsZ29yaXRobS4gVXNlcyB0aGUgUG9zdGdyZXNcbiAgICAgKiBzdGF0aXN0aWNzIHVuZGVyIHRoZSBob29kLlxuICAgICAqXG4gICAgICogYFwiZXN0aW1hdGVkXCJgOiBVc2VzIGV4YWN0IGNvdW50IGZvciBsb3cgbnVtYmVycyBhbmQgcGxhbm5lZCBjb3VudCBmb3IgaGlnaFxuICAgICAqIG51bWJlcnMuXG4gICAgICovXG4gICAgc2VsZWN0KGNvbHVtbnMsIHsgaGVhZCA9IGZhbHNlLCBjb3VudCwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGhlYWQgPyAnSEVBRCcgOiAnR0VUJztcbiAgICAgICAgLy8gUmVtb3ZlIHdoaXRlc3BhY2VzIGV4Y2VwdCB3aGVuIHF1b3RlZFxuICAgICAgICBsZXQgcXVvdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNsZWFuZWRDb2x1bW5zID0gKGNvbHVtbnMgIT09IG51bGwgJiYgY29sdW1ucyAhPT0gdm9pZCAwID8gY29sdW1ucyA6ICcqJylcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5tYXAoKGMpID0+IHtcbiAgICAgICAgICAgIGlmICgvXFxzLy50ZXN0KGMpICYmICFxdW90ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYyA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgIHF1b3RlZCA9ICFxdW90ZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldCgnc2VsZWN0JywgY2xlYW5lZENvbHVtbnMpO1xuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1snUHJlZmVyJ10gPSBgY291bnQ9JHtjb3VudH1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xLmRlZmF1bHQoe1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgICAgIGFsbG93RW1wdHk6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBJTlNFUlQgaW50byB0aGUgdGFibGUgb3Igdmlldy5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIGluc2VydGVkIHJvd3MgYXJlIG5vdCByZXR1cm5lZC4gVG8gcmV0dXJuIGl0LCBjaGFpbiB0aGUgY2FsbFxuICAgICAqIHdpdGggYC5zZWxlY3QoKWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byBpbnNlcnQuIFBhc3MgYW4gb2JqZWN0IHRvIGluc2VydCBhIHNpbmdsZSByb3dcbiAgICAgKiBvciBhbiBhcnJheSB0byBpbnNlcnQgbXVsdGlwbGUgcm93cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY291bnQgLSBDb3VudCBhbGdvcml0aG0gdG8gdXNlIHRvIGNvdW50IGluc2VydGVkIHJvd3MuXG4gICAgICpcbiAgICAgKiBgXCJleGFjdFwiYDogRXhhY3QgYnV0IHNsb3cgY291bnQgYWxnb3JpdGhtLiBQZXJmb3JtcyBhIGBDT1VOVCgqKWAgdW5kZXIgdGhlXG4gICAgICogaG9vZC5cbiAgICAgKlxuICAgICAqIGBcInBsYW5uZWRcImA6IEFwcHJveGltYXRlZCBidXQgZmFzdCBjb3VudCBhbGdvcml0aG0uIFVzZXMgdGhlIFBvc3RncmVzXG4gICAgICogc3RhdGlzdGljcyB1bmRlciB0aGUgaG9vZC5cbiAgICAgKlxuICAgICAqIGBcImVzdGltYXRlZFwiYDogVXNlcyBleGFjdCBjb3VudCBmb3IgbG93IG51bWJlcnMgYW5kIHBsYW5uZWQgY291bnQgZm9yIGhpZ2hcbiAgICAgKiBudW1iZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZGVmYXVsdFRvTnVsbCAtIE1ha2UgbWlzc2luZyBmaWVsZHMgZGVmYXVsdCB0byBgbnVsbGAuXG4gICAgICogT3RoZXJ3aXNlLCB1c2UgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBjb2x1bW4uIE9ubHkgYXBwbGllcyBmb3IgYnVsa1xuICAgICAqIGluc2VydHMuXG4gICAgICovXG4gICAgaW5zZXJ0KHZhbHVlcywgeyBjb3VudCwgZGVmYXVsdFRvTnVsbCA9IHRydWUsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBtZXRob2QgPSAnUE9TVCc7XG4gICAgICAgIGNvbnN0IHByZWZlcnNIZWFkZXJzID0gW107XG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaChgY291bnQ9JHtjb3VudH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlZmF1bHRUb051bGwpIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2goJ21pc3Npbmc9ZGVmYXVsdCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVhZGVyc1snUHJlZmVyJ10gPSBwcmVmZXJzSGVhZGVycy5qb2luKCcsJyk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSB2YWx1ZXMucmVkdWNlKChhY2MsIHgpID0+IGFjYy5jb25jYXQoT2JqZWN0LmtleXMoeCkpLCBbXSk7XG4gICAgICAgICAgICBpZiAoY29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdW5pcXVlQ29sdW1ucyA9IFsuLi5uZXcgU2V0KGNvbHVtbnMpXS5tYXAoKGNvbHVtbikgPT4gYFwiJHtjb2x1bW59XCJgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdjb2x1bW5zJywgdW5pcXVlQ29sdW1ucy5qb2luKCcsJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xLmRlZmF1bHQoe1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICBib2R5OiB2YWx1ZXMsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgICAgIGFsbG93RW1wdHk6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBVUFNFUlQgb24gdGhlIHRhYmxlIG9yIHZpZXcuIERlcGVuZGluZyBvbiB0aGUgY29sdW1uKHMpIHBhc3NlZFxuICAgICAqIHRvIGBvbkNvbmZsaWN0YCwgYC51cHNlcnQoKWAgYWxsb3dzIHlvdSB0byBwZXJmb3JtIHRoZSBlcXVpdmFsZW50IG9mXG4gICAgICogYC5pbnNlcnQoKWAgaWYgYSByb3cgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBgb25Db25mbGljdGAgY29sdW1ucyBkb2Vzbid0XG4gICAgICogZXhpc3QsIG9yIGlmIGl0IGRvZXMgZXhpc3QsIHBlcmZvcm0gYW4gYWx0ZXJuYXRpdmUgYWN0aW9uIGRlcGVuZGluZyBvblxuICAgICAqIGBpZ25vcmVEdXBsaWNhdGVzYC5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIHVwc2VydGVkIHJvd3MgYXJlIG5vdCByZXR1cm5lZC4gVG8gcmV0dXJuIGl0LCBjaGFpbiB0aGUgY2FsbFxuICAgICAqIHdpdGggYC5zZWxlY3QoKWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVzIC0gVGhlIHZhbHVlcyB0byB1cHNlcnQgd2l0aC4gUGFzcyBhbiBvYmplY3QgdG8gdXBzZXJ0IGFcbiAgICAgKiBzaW5nbGUgcm93IG9yIGFuIGFycmF5IHRvIHVwc2VydCBtdWx0aXBsZSByb3dzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5vbkNvbmZsaWN0IC0gQ29tbWEtc2VwYXJhdGVkIFVOSVFVRSBjb2x1bW4ocykgdG8gc3BlY2lmeSBob3dcbiAgICAgKiBkdXBsaWNhdGUgcm93cyBhcmUgZGV0ZXJtaW5lZC4gVHdvIHJvd3MgYXJlIGR1cGxpY2F0ZXMgaWYgYWxsIHRoZVxuICAgICAqIGBvbkNvbmZsaWN0YCBjb2x1bW5zIGFyZSBlcXVhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmlnbm9yZUR1cGxpY2F0ZXMgLSBJZiBgdHJ1ZWAsIGR1cGxpY2F0ZSByb3dzIGFyZSBpZ25vcmVkLiBJZlxuICAgICAqIGBmYWxzZWAsIGR1cGxpY2F0ZSByb3dzIGFyZSBtZXJnZWQgd2l0aCBleGlzdGluZyByb3dzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuY291bnQgLSBDb3VudCBhbGdvcml0aG0gdG8gdXNlIHRvIGNvdW50IHVwc2VydGVkIHJvd3MuXG4gICAgICpcbiAgICAgKiBgXCJleGFjdFwiYDogRXhhY3QgYnV0IHNsb3cgY291bnQgYWxnb3JpdGhtLiBQZXJmb3JtcyBhIGBDT1VOVCgqKWAgdW5kZXIgdGhlXG4gICAgICogaG9vZC5cbiAgICAgKlxuICAgICAqIGBcInBsYW5uZWRcImA6IEFwcHJveGltYXRlZCBidXQgZmFzdCBjb3VudCBhbGdvcml0aG0uIFVzZXMgdGhlIFBvc3RncmVzXG4gICAgICogc3RhdGlzdGljcyB1bmRlciB0aGUgaG9vZC5cbiAgICAgKlxuICAgICAqIGBcImVzdGltYXRlZFwiYDogVXNlcyBleGFjdCBjb3VudCBmb3IgbG93IG51bWJlcnMgYW5kIHBsYW5uZWQgY291bnQgZm9yIGhpZ2hcbiAgICAgKiBudW1iZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZGVmYXVsdFRvTnVsbCAtIE1ha2UgbWlzc2luZyBmaWVsZHMgZGVmYXVsdCB0byBgbnVsbGAuXG4gICAgICogT3RoZXJ3aXNlLCB1c2UgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBjb2x1bW4uIFRoaXMgb25seSBhcHBsaWVzIHdoZW5cbiAgICAgKiBpbnNlcnRpbmcgbmV3IHJvd3MsIG5vdCB3aGVuIG1lcmdpbmcgd2l0aCBleGlzdGluZyByb3dzIHVuZGVyXG4gICAgICogYGlnbm9yZUR1cGxpY2F0ZXM6IGZhbHNlYC4gVGhpcyBhbHNvIG9ubHkgYXBwbGllcyB3aGVuIGRvaW5nIGJ1bGsgdXBzZXJ0cy5cbiAgICAgKi9cbiAgICB1cHNlcnQodmFsdWVzLCB7IG9uQ29uZmxpY3QsIGlnbm9yZUR1cGxpY2F0ZXMgPSBmYWxzZSwgY291bnQsIGRlZmF1bHRUb051bGwgPSB0cnVlLCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gJ1BPU1QnO1xuICAgICAgICBjb25zdCBwcmVmZXJzSGVhZGVycyA9IFtgcmVzb2x1dGlvbj0ke2lnbm9yZUR1cGxpY2F0ZXMgPyAnaWdub3JlJyA6ICdtZXJnZSd9LWR1cGxpY2F0ZXNgXTtcbiAgICAgICAgaWYgKG9uQ29uZmxpY3QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoJ29uX2NvbmZsaWN0Jywgb25Db25mbGljdCk7XG4gICAgICAgIGlmICh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSB7XG4gICAgICAgICAgICBwcmVmZXJzSGVhZGVycy5wdXNoKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaChgY291bnQ9JHtjb3VudH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRlZmF1bHRUb051bGwpIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2goJ21pc3Npbmc9ZGVmYXVsdCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVhZGVyc1snUHJlZmVyJ10gPSBwcmVmZXJzSGVhZGVycy5qb2luKCcsJyk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSB2YWx1ZXMucmVkdWNlKChhY2MsIHgpID0+IGFjYy5jb25jYXQoT2JqZWN0LmtleXMoeCkpLCBbXSk7XG4gICAgICAgICAgICBpZiAoY29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdW5pcXVlQ29sdW1ucyA9IFsuLi5uZXcgU2V0KGNvbHVtbnMpXS5tYXAoKGNvbHVtbikgPT4gYFwiJHtjb2x1bW59XCJgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdjb2x1bW5zJywgdW5pcXVlQ29sdW1ucy5qb2luKCcsJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcl8xLmRlZmF1bHQoe1xuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgdXJsOiB0aGlzLnVybCxcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICBib2R5OiB2YWx1ZXMsXG4gICAgICAgICAgICBmZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgICAgIGFsbG93RW1wdHk6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhbiBVUERBVEUgb24gdGhlIHRhYmxlIG9yIHZpZXcuXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCB1cGRhdGVkIHJvd3MgYXJlIG5vdCByZXR1cm5lZC4gVG8gcmV0dXJuIGl0LCBjaGFpbiB0aGUgY2FsbFxuICAgICAqIHdpdGggYC5zZWxlY3QoKWAgYWZ0ZXIgZmlsdGVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZXMgLSBUaGUgdmFsdWVzIHRvIHVwZGF0ZSB3aXRoXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvdW50IC0gQ291bnQgYWxnb3JpdGhtIHRvIHVzZSB0byBjb3VudCB1cGRhdGVkIHJvd3MuXG4gICAgICpcbiAgICAgKiBgXCJleGFjdFwiYDogRXhhY3QgYnV0IHNsb3cgY291bnQgYWxnb3JpdGhtLiBQZXJmb3JtcyBhIGBDT1VOVCgqKWAgdW5kZXIgdGhlXG4gICAgICogaG9vZC5cbiAgICAgKlxuICAgICAqIGBcInBsYW5uZWRcImA6IEFwcHJveGltYXRlZCBidXQgZmFzdCBjb3VudCBhbGdvcml0aG0uIFVzZXMgdGhlIFBvc3RncmVzXG4gICAgICogc3RhdGlzdGljcyB1bmRlciB0aGUgaG9vZC5cbiAgICAgKlxuICAgICAqIGBcImVzdGltYXRlZFwiYDogVXNlcyBleGFjdCBjb3VudCBmb3IgbG93IG51bWJlcnMgYW5kIHBsYW5uZWQgY291bnQgZm9yIGhpZ2hcbiAgICAgKiBudW1iZXJzLlxuICAgICAqL1xuICAgIHVwZGF0ZSh2YWx1ZXMsIHsgY291bnQsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBtZXRob2QgPSAnUEFUQ0gnO1xuICAgICAgICBjb25zdCBwcmVmZXJzSGVhZGVycyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5oZWFkZXJzWydQcmVmZXInXSkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaCh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICAgIHByZWZlcnNIZWFkZXJzLnB1c2goYGNvdW50PSR7Y291bnR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWFkZXJzWydQcmVmZXInXSA9IHByZWZlcnNIZWFkZXJzLmpvaW4oJywnKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIGJvZHk6IHZhbHVlcyxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICAgICAgYWxsb3dFbXB0eTogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgREVMRVRFIG9uIHRoZSB0YWJsZSBvciB2aWV3LlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgZGVsZXRlZCByb3dzIGFyZSBub3QgcmV0dXJuZWQuIFRvIHJldHVybiBpdCwgY2hhaW4gdGhlIGNhbGxcbiAgICAgKiB3aXRoIGAuc2VsZWN0KClgIGFmdGVyIGZpbHRlcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvdW50IC0gQ291bnQgYWxnb3JpdGhtIHRvIHVzZSB0byBjb3VudCBkZWxldGVkIHJvd3MuXG4gICAgICpcbiAgICAgKiBgXCJleGFjdFwiYDogRXhhY3QgYnV0IHNsb3cgY291bnQgYWxnb3JpdGhtLiBQZXJmb3JtcyBhIGBDT1VOVCgqKWAgdW5kZXIgdGhlXG4gICAgICogaG9vZC5cbiAgICAgKlxuICAgICAqIGBcInBsYW5uZWRcImA6IEFwcHJveGltYXRlZCBidXQgZmFzdCBjb3VudCBhbGdvcml0aG0uIFVzZXMgdGhlIFBvc3RncmVzXG4gICAgICogc3RhdGlzdGljcyB1bmRlciB0aGUgaG9vZC5cbiAgICAgKlxuICAgICAqIGBcImVzdGltYXRlZFwiYDogVXNlcyBleGFjdCBjb3VudCBmb3IgbG93IG51bWJlcnMgYW5kIHBsYW5uZWQgY291bnQgZm9yIGhpZ2hcbiAgICAgKiBudW1iZXJzLlxuICAgICAqL1xuICAgIGRlbGV0ZSh7IGNvdW50LCB9ID0ge30pIHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gJ0RFTEVURSc7XG4gICAgICAgIGNvbnN0IHByZWZlcnNIZWFkZXJzID0gW107XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMucHVzaChgY291bnQ9JHtjb3VudH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oZWFkZXJzWydQcmVmZXInXSkge1xuICAgICAgICAgICAgcHJlZmVyc0hlYWRlcnMudW5zaGlmdCh0aGlzLmhlYWRlcnNbJ1ByZWZlciddKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddID0gcHJlZmVyc0hlYWRlcnMuam9pbignLCcpO1xuICAgICAgICByZXR1cm4gbmV3IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMS5kZWZhdWx0KHtcbiAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgZmV0Y2g6IHRoaXMuZmV0Y2gsXG4gICAgICAgICAgICBhbGxvd0VtcHR5OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUG9zdGdyZXN0UXVlcnlCdWlsZGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9zdGdyZXN0UXVlcnlCdWlsZGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgUG9zdGdyZXN0QnVpbGRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdEJ1aWxkZXJcIikpO1xuY2xhc3MgUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlciBleHRlbmRzIFBvc3RncmVzdEJ1aWxkZXJfMS5kZWZhdWx0IHtcbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGEgU0VMRUNUIG9uIHRoZSBxdWVyeSByZXN1bHQuXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCBgLmluc2VydCgpYCwgYC51cGRhdGUoKWAsIGAudXBzZXJ0KClgLCBhbmQgYC5kZWxldGUoKWAgZG8gbm90XG4gICAgICogcmV0dXJuIG1vZGlmaWVkIHJvd3MuIEJ5IGNhbGxpbmcgdGhpcyBtZXRob2QsIG1vZGlmaWVkIHJvd3MgYXJlIHJldHVybmVkIGluXG4gICAgICogYGRhdGFgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbHVtbnMgLSBUaGUgY29sdW1ucyB0byByZXRyaWV2ZSwgc2VwYXJhdGVkIGJ5IGNvbW1hc1xuICAgICAqL1xuICAgIHNlbGVjdChjb2x1bW5zKSB7XG4gICAgICAgIC8vIFJlbW92ZSB3aGl0ZXNwYWNlcyBleGNlcHQgd2hlbiBxdW90ZWRcbiAgICAgICAgbGV0IHF1b3RlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjbGVhbmVkQ29sdW1ucyA9IChjb2x1bW5zICE9PSBudWxsICYmIGNvbHVtbnMgIT09IHZvaWQgMCA/IGNvbHVtbnMgOiAnKicpXG4gICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAubWFwKChjKSA9PiB7XG4gICAgICAgICAgICBpZiAoL1xccy8udGVzdChjKSAmJiAhcXVvdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICBxdW90ZWQgPSAhcXVvdGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3NlbGVjdCcsIGNsZWFuZWRDb2x1bW5zKTtcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyc1snUHJlZmVyJ10pIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1snUHJlZmVyJ10gKz0gJywnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGVhZGVyc1snUHJlZmVyJ10gKz0gJ3JldHVybj1yZXByZXNlbnRhdGlvbic7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcmRlciB0aGUgcXVlcnkgcmVzdWx0IGJ5IGBjb2x1bW5gLlxuICAgICAqXG4gICAgICogWW91IGNhbiBjYWxsIHRoaXMgbWV0aG9kIG11bHRpcGxlIHRpbWVzIHRvIG9yZGVyIGJ5IG11bHRpcGxlIGNvbHVtbnMuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIG9yZGVyIHJlZmVyZW5jZWQgdGFibGVzLCBidXQgaXQgb25seSBhZmZlY3RzIHRoZSBvcmRlcmluZyBvZiB0aGVcbiAgICAgKiBwYXJlbnQgdGFibGUgaWYgeW91IHVzZSBgIWlubmVyYCBpbiB0aGUgcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29sdW1uIC0gVGhlIGNvbHVtbiB0byBvcmRlciBieVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLmFzY2VuZGluZyAtIElmIGB0cnVlYCwgdGhlIHJlc3VsdCB3aWxsIGJlIGluIGFzY2VuZGluZyBvcmRlclxuICAgICAqIEBwYXJhbSBvcHRpb25zLm51bGxzRmlyc3QgLSBJZiBgdHJ1ZWAsIGBudWxsYHMgYXBwZWFyIGZpcnN0LiBJZiBgZmFsc2VgLFxuICAgICAqIGBudWxsYHMgYXBwZWFyIGxhc3QuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucmVmZXJlbmNlZFRhYmxlIC0gU2V0IHRoaXMgdG8gb3JkZXIgYSByZWZlcmVuY2VkIHRhYmxlIGJ5XG4gICAgICogaXRzIGNvbHVtbnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5mb3JlaWduVGFibGUgLSBEZXByZWNhdGVkLCB1c2UgYG9wdGlvbnMucmVmZXJlbmNlZFRhYmxlYFxuICAgICAqIGluc3RlYWRcbiAgICAgKi9cbiAgICBvcmRlcihjb2x1bW4sIHsgYXNjZW5kaW5nID0gdHJ1ZSwgbnVsbHNGaXJzdCwgZm9yZWlnblRhYmxlLCByZWZlcmVuY2VkVGFibGUgPSBmb3JlaWduVGFibGUsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBrZXkgPSByZWZlcmVuY2VkVGFibGUgPyBgJHtyZWZlcmVuY2VkVGFibGV9Lm9yZGVyYCA6ICdvcmRlcic7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nT3JkZXIgPSB0aGlzLnVybC5zZWFyY2hQYXJhbXMuZ2V0KGtleSk7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5LCBgJHtleGlzdGluZ09yZGVyID8gYCR7ZXhpc3RpbmdPcmRlcn0sYCA6ICcnfSR7Y29sdW1ufS4ke2FzY2VuZGluZyA/ICdhc2MnIDogJ2Rlc2MnfSR7bnVsbHNGaXJzdCA9PT0gdW5kZWZpbmVkID8gJycgOiBudWxsc0ZpcnN0ID8gJy5udWxsc2ZpcnN0JyA6ICcubnVsbHNsYXN0J31gKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpbWl0IHRoZSBxdWVyeSByZXN1bHQgYnkgYGNvdW50YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb3VudCAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiByb3dzIHRvIHJldHVyblxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gTmFtZWQgcGFyYW1ldGVyc1xuICAgICAqIEBwYXJhbSBvcHRpb25zLnJlZmVyZW5jZWRUYWJsZSAtIFNldCB0aGlzIHRvIGxpbWl0IHJvd3Mgb2YgcmVmZXJlbmNlZFxuICAgICAqIHRhYmxlcyBpbnN0ZWFkIG9mIHRoZSBwYXJlbnQgdGFibGVcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5mb3JlaWduVGFibGUgLSBEZXByZWNhdGVkLCB1c2UgYG9wdGlvbnMucmVmZXJlbmNlZFRhYmxlYFxuICAgICAqIGluc3RlYWRcbiAgICAgKi9cbiAgICBsaW1pdChjb3VudCwgeyBmb3JlaWduVGFibGUsIHJlZmVyZW5jZWRUYWJsZSA9IGZvcmVpZ25UYWJsZSwgfSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHR5cGVvZiByZWZlcmVuY2VkVGFibGUgPT09ICd1bmRlZmluZWQnID8gJ2xpbWl0JyA6IGAke3JlZmVyZW5jZWRUYWJsZX0ubGltaXRgO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KGtleSwgYCR7Y291bnR9YCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaW1pdCB0aGUgcXVlcnkgcmVzdWx0IGJ5IHN0YXJ0aW5nIGF0IGFuIG9mZnNldCBgZnJvbWAgYW5kIGVuZGluZyBhdCB0aGUgb2Zmc2V0IGB0b2AuXG4gICAgICogT25seSByZWNvcmRzIHdpdGhpbiB0aGlzIHJhbmdlIGFyZSByZXR1cm5lZC5cbiAgICAgKiBUaGlzIHJlc3BlY3RzIHRoZSBxdWVyeSBvcmRlciBhbmQgaWYgdGhlcmUgaXMgbm8gb3JkZXIgY2xhdXNlIHRoZSByYW5nZSBjb3VsZCBiZWhhdmUgdW5leHBlY3RlZGx5LlxuICAgICAqIFRoZSBgZnJvbWAgYW5kIGB0b2AgdmFsdWVzIGFyZSAwLWJhc2VkIGFuZCBpbmNsdXNpdmU6IGByYW5nZSgxLCAzKWAgd2lsbCBpbmNsdWRlIHRoZSBzZWNvbmQsIHRoaXJkXG4gICAgICogYW5kIGZvdXJ0aCByb3dzIG9mIHRoZSBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmcm9tIC0gVGhlIHN0YXJ0aW5nIGluZGV4IGZyb20gd2hpY2ggdG8gbGltaXQgdGhlIHJlc3VsdFxuICAgICAqIEBwYXJhbSB0byAtIFRoZSBsYXN0IGluZGV4IHRvIHdoaWNoIHRvIGxpbWl0IHRoZSByZXN1bHRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWZlcmVuY2VkVGFibGUgLSBTZXQgdGhpcyB0byBsaW1pdCByb3dzIG9mIHJlZmVyZW5jZWRcbiAgICAgKiB0YWJsZXMgaW5zdGVhZCBvZiB0aGUgcGFyZW50IHRhYmxlXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZm9yZWlnblRhYmxlIC0gRGVwcmVjYXRlZCwgdXNlIGBvcHRpb25zLnJlZmVyZW5jZWRUYWJsZWBcbiAgICAgKiBpbnN0ZWFkXG4gICAgICovXG4gICAgcmFuZ2UoZnJvbSwgdG8sIHsgZm9yZWlnblRhYmxlLCByZWZlcmVuY2VkVGFibGUgPSBmb3JlaWduVGFibGUsIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBrZXlPZmZzZXQgPSB0eXBlb2YgcmVmZXJlbmNlZFRhYmxlID09PSAndW5kZWZpbmVkJyA/ICdvZmZzZXQnIDogYCR7cmVmZXJlbmNlZFRhYmxlfS5vZmZzZXRgO1xuICAgICAgICBjb25zdCBrZXlMaW1pdCA9IHR5cGVvZiByZWZlcmVuY2VkVGFibGUgPT09ICd1bmRlZmluZWQnID8gJ2xpbWl0JyA6IGAke3JlZmVyZW5jZWRUYWJsZX0ubGltaXRgO1xuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KGtleU9mZnNldCwgYCR7ZnJvbX1gKTtcbiAgICAgICAgLy8gUmFuZ2UgaXMgaW5jbHVzaXZlLCBzbyBhZGQgMVxuICAgICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KGtleUxpbWl0LCBgJHt0byAtIGZyb20gKyAxfWApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBBYm9ydFNpZ25hbCBmb3IgdGhlIGZldGNoIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2lnbmFsIC0gVGhlIEFib3J0U2lnbmFsIHRvIHVzZSBmb3IgdGhlIGZldGNoIHJlcXVlc3RcbiAgICAgKi9cbiAgICBhYm9ydFNpZ25hbChzaWduYWwpIHtcbiAgICAgICAgdGhpcy5zaWduYWwgPSBzaWduYWw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYGRhdGFgIGFzIGEgc2luZ2xlIG9iamVjdCBpbnN0ZWFkIG9mIGFuIGFycmF5IG9mIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBRdWVyeSByZXN1bHQgbXVzdCBiZSBvbmUgcm93IChlLmcuIHVzaW5nIGAubGltaXQoMSlgKSwgb3RoZXJ3aXNlIHRoaXNcbiAgICAgKiByZXR1cm5zIGFuIGVycm9yLlxuICAgICAqL1xuICAgIHNpbmdsZSgpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi92bmQucGdyc3Qub2JqZWN0K2pzb24nO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGBkYXRhYCBhcyBhIHNpbmdsZSBvYmplY3QgaW5zdGVhZCBvZiBhbiBhcnJheSBvZiBvYmplY3RzLlxuICAgICAqXG4gICAgICogUXVlcnkgcmVzdWx0IG11c3QgYmUgemVybyBvciBvbmUgcm93IChlLmcuIHVzaW5nIGAubGltaXQoMSlgKSwgb3RoZXJ3aXNlXG4gICAgICogdGhpcyByZXR1cm5zIGFuIGVycm9yLlxuICAgICAqL1xuICAgIG1heWJlU2luZ2xlKCkge1xuICAgICAgICAvLyBUZW1wb3JhcnkgcGFydGlhbCBmaXggZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBhYmFzZS9wb3N0Z3Jlc3QtanMvaXNzdWVzLzM2MVxuICAgICAgICAvLyBJc3N1ZSBwZXJzaXN0cyBlLmcuIGZvciBgLmluc2VydChbLi4uXSkuc2VsZWN0KCkubWF5YmVTaW5nbGUoKWBcbiAgICAgICAgaWYgKHRoaXMubWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1snQWNjZXB0J10gPSAnYXBwbGljYXRpb24vdm5kLnBncnN0Lm9iamVjdCtqc29uJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzTWF5YmVTaW5nbGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGBkYXRhYCBhcyBhIHN0cmluZyBpbiBDU1YgZm9ybWF0LlxuICAgICAqL1xuICAgIGNzdigpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzWydBY2NlcHQnXSA9ICd0ZXh0L2Nzdic7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYGRhdGFgIGFzIGFuIG9iamVjdCBpbiBbR2VvSlNPTl0oaHR0cHM6Ly9nZW9qc29uLm9yZykgZm9ybWF0LlxuICAgICAqL1xuICAgIGdlb2pzb24oKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyc1snQWNjZXB0J10gPSAnYXBwbGljYXRpb24vZ2VvK2pzb24nO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGBkYXRhYCBhcyB0aGUgRVhQTEFJTiBwbGFuIGZvciB0aGUgcXVlcnkuXG4gICAgICpcbiAgICAgKiBZb3UgbmVlZCB0byBlbmFibGUgdGhlXG4gICAgICogW2RiX3BsYW5fZW5hYmxlZF0oaHR0cHM6Ly9zdXBhYmFzZS5jb20vZG9jcy9ndWlkZXMvZGF0YWJhc2UvZGVidWdnaW5nLXBlcmZvcm1hbmNlI2VuYWJsaW5nLWV4cGxhaW4pXG4gICAgICogc2V0dGluZyBiZWZvcmUgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIE5hbWVkIHBhcmFtZXRlcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmFuYWx5emUgLSBJZiBgdHJ1ZWAsIHRoZSBxdWVyeSB3aWxsIGJlIGV4ZWN1dGVkIGFuZCB0aGVcbiAgICAgKiBhY3R1YWwgcnVuIHRpbWUgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMudmVyYm9zZSAtIElmIGB0cnVlYCwgdGhlIHF1ZXJ5IGlkZW50aWZpZXIgd2lsbCBiZSByZXR1cm5lZFxuICAgICAqIGFuZCBgZGF0YWAgd2lsbCBpbmNsdWRlIHRoZSBvdXRwdXQgY29sdW1ucyBvZiB0aGUgcXVlcnlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnNldHRpbmdzIC0gSWYgYHRydWVgLCBpbmNsdWRlIGluZm9ybWF0aW9uIG9uIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBwYXJhbWV0ZXJzIHRoYXQgYWZmZWN0IHF1ZXJ5IHBsYW5uaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5idWZmZXJzIC0gSWYgYHRydWVgLCBpbmNsdWRlIGluZm9ybWF0aW9uIG9uIGJ1ZmZlciB1c2FnZVxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMud2FsIC0gSWYgYHRydWVgLCBpbmNsdWRlIGluZm9ybWF0aW9uIG9uIFdBTCByZWNvcmQgZ2VuZXJhdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZm9ybWF0IC0gVGhlIGZvcm1hdCBvZiB0aGUgb3V0cHV0LCBjYW4gYmUgYFwidGV4dFwiYCAoZGVmYXVsdClcbiAgICAgKiBvciBgXCJqc29uXCJgXG4gICAgICovXG4gICAgZXhwbGFpbih7IGFuYWx5emUgPSBmYWxzZSwgdmVyYm9zZSA9IGZhbHNlLCBzZXR0aW5ncyA9IGZhbHNlLCBidWZmZXJzID0gZmFsc2UsIHdhbCA9IGZhbHNlLCBmb3JtYXQgPSAndGV4dCcsIH0gPSB7fSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXG4gICAgICAgICAgICBhbmFseXplID8gJ2FuYWx5emUnIDogbnVsbCxcbiAgICAgICAgICAgIHZlcmJvc2UgPyAndmVyYm9zZScgOiBudWxsLFxuICAgICAgICAgICAgc2V0dGluZ3MgPyAnc2V0dGluZ3MnIDogbnVsbCxcbiAgICAgICAgICAgIGJ1ZmZlcnMgPyAnYnVmZmVycycgOiBudWxsLFxuICAgICAgICAgICAgd2FsID8gJ3dhbCcgOiBudWxsLFxuICAgICAgICBdXG4gICAgICAgICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAgICAgICAuam9pbignfCcpO1xuICAgICAgICAvLyBBbiBBY2NlcHQgaGVhZGVyIGNhbiBjYXJyeSBtdWx0aXBsZSBtZWRpYSB0eXBlcyBidXQgcG9zdGdyZXN0LWpzIGFsd2F5cyBzZW5kcyBvbmVcbiAgICAgICAgY29uc3QgZm9yTWVkaWF0eXBlID0gKF9hID0gdGhpcy5oZWFkZXJzWydBY2NlcHQnXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgICB0aGlzLmhlYWRlcnNbJ0FjY2VwdCddID0gYGFwcGxpY2F0aW9uL3ZuZC5wZ3JzdC5wbGFuKyR7Zm9ybWF0fTsgZm9yPVwiJHtmb3JNZWRpYXR5cGV9XCI7IG9wdGlvbnM9JHtvcHRpb25zfTtgO1xuICAgICAgICBpZiAoZm9ybWF0ID09PSAnanNvbicpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvbGxiYWNrIHRoZSBxdWVyeS5cbiAgICAgKlxuICAgICAqIGBkYXRhYCB3aWxsIHN0aWxsIGJlIHJldHVybmVkLCBidXQgdGhlIHF1ZXJ5IGlzIG5vdCBjb21taXR0ZWQuXG4gICAgICovXG4gICAgcm9sbGJhY2soKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCgoX2EgPSB0aGlzLmhlYWRlcnNbJ1ByZWZlciddKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJykudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyc1snUHJlZmVyJ10gKz0gJyx0eD1yb2xsYmFjayc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnNbJ1ByZWZlciddID0gJ3R4PXJvbGxiYWNrJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIHR5cGUgb2YgdGhlIHJldHVybmVkIGBkYXRhYC5cbiAgICAgKlxuICAgICAqIEB0eXBlUGFyYW0gTmV3UmVzdWx0IC0gVGhlIG5ldyByZXN1bHQgdHlwZSB0byBvdmVycmlkZSB3aXRoXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIG92ZXJyaWRlVHlwZXM8eW91clR5cGUsIHsgbWVyZ2U6IGZhbHNlIH0+KCkgbWV0aG9kIGF0IHRoZSBlbmQgb2YgeW91ciBjYWxsIGNoYWluIGluc3RlYWRcbiAgICAgKi9cbiAgICByZXR1cm5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuREVGQVVMVF9IRUFERVJTID0gdm9pZCAwO1xuY29uc3QgdmVyc2lvbl8xID0gcmVxdWlyZShcIi4vdmVyc2lvblwiKTtcbmV4cG9ydHMuREVGQVVMVF9IRUFERVJTID0geyAnWC1DbGllbnQtSW5mbyc6IGBwb3N0Z3Jlc3QtanMvJHt2ZXJzaW9uXzEudmVyc2lvbn1gIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBvc3RncmVzdEVycm9yID0gZXhwb3J0cy5Qb3N0Z3Jlc3RCdWlsZGVyID0gZXhwb3J0cy5Qb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyID0gZXhwb3J0cy5Qb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyID0gZXhwb3J0cy5Qb3N0Z3Jlc3RRdWVyeUJ1aWxkZXIgPSBleHBvcnRzLlBvc3RncmVzdENsaWVudCA9IHZvaWQgMDtcbi8vIEFsd2F5cyB1cGRhdGUgd3JhcHBlci5tanMgd2hlbiB1cGRhdGluZyB0aGlzIGZpbGUuXG5jb25zdCBQb3N0Z3Jlc3RDbGllbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RDbGllbnRcIikpO1xuZXhwb3J0cy5Qb3N0Z3Jlc3RDbGllbnQgPSBQb3N0Z3Jlc3RDbGllbnRfMS5kZWZhdWx0O1xuY29uc3QgUG9zdGdyZXN0UXVlcnlCdWlsZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0UXVlcnlCdWlsZGVyXCIpKTtcbmV4cG9ydHMuUG9zdGdyZXN0UXVlcnlCdWlsZGVyID0gUG9zdGdyZXN0UXVlcnlCdWlsZGVyXzEuZGVmYXVsdDtcbmNvbnN0IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Qb3N0Z3Jlc3RGaWx0ZXJCdWlsZGVyXCIpKTtcbmV4cG9ydHMuUG9zdGdyZXN0RmlsdGVyQnVpbGRlciA9IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMS5kZWZhdWx0O1xuY29uc3QgUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Bvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXJcIikpO1xuZXhwb3J0cy5Qb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyID0gUG9zdGdyZXN0VHJhbnNmb3JtQnVpbGRlcl8xLmRlZmF1bHQ7XG5jb25zdCBQb3N0Z3Jlc3RCdWlsZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0QnVpbGRlclwiKSk7XG5leHBvcnRzLlBvc3RncmVzdEJ1aWxkZXIgPSBQb3N0Z3Jlc3RCdWlsZGVyXzEuZGVmYXVsdDtcbmNvbnN0IFBvc3RncmVzdEVycm9yXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUG9zdGdyZXN0RXJyb3JcIikpO1xuZXhwb3J0cy5Qb3N0Z3Jlc3RFcnJvciA9IFBvc3RncmVzdEVycm9yXzEuZGVmYXVsdDtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgICBQb3N0Z3Jlc3RDbGllbnQ6IFBvc3RncmVzdENsaWVudF8xLmRlZmF1bHQsXG4gICAgUG9zdGdyZXN0UXVlcnlCdWlsZGVyOiBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXJfMS5kZWZhdWx0LFxuICAgIFBvc3RncmVzdEZpbHRlckJ1aWxkZXI6IFBvc3RncmVzdEZpbHRlckJ1aWxkZXJfMS5kZWZhdWx0LFxuICAgIFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXI6IFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXJfMS5kZWZhdWx0LFxuICAgIFBvc3RncmVzdEJ1aWxkZXI6IFBvc3RncmVzdEJ1aWxkZXJfMS5kZWZhdWx0LFxuICAgIFBvc3RncmVzdEVycm9yOiBQb3N0Z3Jlc3RFcnJvcl8xLmRlZmF1bHQsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnZlcnNpb24gPSB2b2lkIDA7XG5leHBvcnRzLnZlcnNpb24gPSAnMC4wLjAtYXV0b21hdGVkJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlcnNpb24uanMubWFwIiwiaW1wb3J0IGluZGV4IGZyb20gJy4uL2Nqcy9pbmRleC5qcydcbmNvbnN0IHtcbiAgUG9zdGdyZXN0Q2xpZW50LFxuICBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXIsXG4gIFBvc3RncmVzdEZpbHRlckJ1aWxkZXIsXG4gIFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIsXG4gIFBvc3RncmVzdEJ1aWxkZXIsXG4gIFBvc3RncmVzdEVycm9yLFxufSA9IGluZGV4XG5cbmV4cG9ydCB7XG4gIFBvc3RncmVzdEJ1aWxkZXIsXG4gIFBvc3RncmVzdENsaWVudCxcbiAgUG9zdGdyZXN0RmlsdGVyQnVpbGRlcixcbiAgUG9zdGdyZXN0UXVlcnlCdWlsZGVyLFxuICBQb3N0Z3Jlc3RUcmFuc2Zvcm1CdWlsZGVyLFxuICBQb3N0Z3Jlc3RFcnJvcixcbn1cblxuLy8gY29tcGF0aWJpbGl0eSB3aXRoIENKUyBvdXRwdXRcbmV4cG9ydCBkZWZhdWx0IHtcbiAgUG9zdGdyZXN0Q2xpZW50LFxuICBQb3N0Z3Jlc3RRdWVyeUJ1aWxkZXIsXG4gIFBvc3RncmVzdEZpbHRlckJ1aWxkZXIsXG4gIFBvc3RncmVzdFRyYW5zZm9ybUJ1aWxkZXIsXG4gIFBvc3RncmVzdEJ1aWxkZXIsXG4gIFBvc3RncmVzdEVycm9yLFxufVxuIiwiaW1wb3J0IHsgQ0hBTk5FTF9FVkVOVFMsIENIQU5ORUxfU1RBVEVTIH0gZnJvbSAnLi9saWIvY29uc3RhbnRzJztcbmltcG9ydCBQdXNoIGZyb20gJy4vbGliL3B1c2gnO1xuaW1wb3J0IFRpbWVyIGZyb20gJy4vbGliL3RpbWVyJztcbmltcG9ydCBSZWFsdGltZVByZXNlbmNlIGZyb20gJy4vUmVhbHRpbWVQcmVzZW5jZSc7XG5pbXBvcnQgKiBhcyBUcmFuc2Zvcm1lcnMgZnJvbSAnLi9saWIvdHJhbnNmb3JtZXJzJztcbmltcG9ydCB7IGh0dHBFbmRwb2ludFVSTCB9IGZyb20gJy4vbGliL3RyYW5zZm9ybWVycyc7XG5leHBvcnQgdmFyIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UO1xuKGZ1bmN0aW9uIChSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVCkge1xuICAgIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UW1wiQUxMXCJdID0gXCIqXCI7XG4gICAgUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlRbXCJJTlNFUlRcIl0gPSBcIklOU0VSVFwiO1xuICAgIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5UW1wiVVBEQVRFXCJdID0gXCJVUERBVEVcIjtcbiAgICBSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVFtcIkRFTEVURVwiXSA9IFwiREVMRVRFXCI7XG59KShSRUFMVElNRV9QT1NUR1JFU19DSEFOR0VTX0xJU1RFTl9FVkVOVCB8fCAoUkVBTFRJTUVfUE9TVEdSRVNfQ0hBTkdFU19MSVNURU5fRVZFTlQgPSB7fSkpO1xuZXhwb3J0IHZhciBSRUFMVElNRV9MSVNURU5fVFlQRVM7XG4oZnVuY3Rpb24gKFJFQUxUSU1FX0xJU1RFTl9UWVBFUykge1xuICAgIFJFQUxUSU1FX0xJU1RFTl9UWVBFU1tcIkJST0FEQ0FTVFwiXSA9IFwiYnJvYWRjYXN0XCI7XG4gICAgUkVBTFRJTUVfTElTVEVOX1RZUEVTW1wiUFJFU0VOQ0VcIl0gPSBcInByZXNlbmNlXCI7XG4gICAgUkVBTFRJTUVfTElTVEVOX1RZUEVTW1wiUE9TVEdSRVNfQ0hBTkdFU1wiXSA9IFwicG9zdGdyZXNfY2hhbmdlc1wiO1xuICAgIFJFQUxUSU1FX0xJU1RFTl9UWVBFU1tcIlNZU1RFTVwiXSA9IFwic3lzdGVtXCI7XG59KShSRUFMVElNRV9MSVNURU5fVFlQRVMgfHwgKFJFQUxUSU1FX0xJU1RFTl9UWVBFUyA9IHt9KSk7XG5leHBvcnQgdmFyIFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVM7XG4oZnVuY3Rpb24gKFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMpIHtcbiAgICBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTW1wiU1VCU0NSSUJFRFwiXSA9IFwiU1VCU0NSSUJFRFwiO1xuICAgIFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVNbXCJUSU1FRF9PVVRcIl0gPSBcIlRJTUVEX09VVFwiO1xuICAgIFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVNbXCJDTE9TRURcIl0gPSBcIkNMT1NFRFwiO1xuICAgIFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVNbXCJDSEFOTkVMX0VSUk9SXCJdID0gXCJDSEFOTkVMX0VSUk9SXCI7XG59KShSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTIHx8IChSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTID0ge30pKTtcbmV4cG9ydCBjb25zdCBSRUFMVElNRV9DSEFOTkVMX1NUQVRFUyA9IENIQU5ORUxfU1RBVEVTO1xuLyoqIEEgY2hhbm5lbCBpcyB0aGUgYmFzaWMgYnVpbGRpbmcgYmxvY2sgb2YgUmVhbHRpbWVcbiAqIGFuZCBuYXJyb3dzIHRoZSBzY29wZSBvZiBkYXRhIGZsb3cgdG8gc3Vic2NyaWJlZCBjbGllbnRzLlxuICogWW91IGNhbiB0aGluayBvZiBhIGNoYW5uZWwgYXMgYSBjaGF0cm9vbSB3aGVyZSBwYXJ0aWNpcGFudHMgYXJlIGFibGUgdG8gc2VlIHdobydzIG9ubGluZVxuICogYW5kIHNlbmQgYW5kIHJlY2VpdmUgbWVzc2FnZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWx0aW1lQ2hhbm5lbCB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgLyoqIFRvcGljIG5hbWUgY2FuIGJlIGFueSBzdHJpbmcuICovXG4gICAgdG9waWMsIHBhcmFtcyA9IHsgY29uZmlnOiB7fSB9LCBzb2NrZXQpIHtcbiAgICAgICAgdGhpcy50b3BpYyA9IHRvcGljO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgICAgIHRoaXMuYmluZGluZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmNsb3NlZDtcbiAgICAgICAgdGhpcy5qb2luZWRPbmNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnN1YlRvcGljID0gdG9waWMucmVwbGFjZSgvXnJlYWx0aW1lOi9pLCAnJyk7XG4gICAgICAgIHRoaXMucGFyYW1zLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgYnJvYWRjYXN0OiB7IGFjazogZmFsc2UsIHNlbGY6IGZhbHNlIH0sXG4gICAgICAgICAgICBwcmVzZW5jZTogeyBrZXk6ICcnIH0sXG4gICAgICAgICAgICBwcml2YXRlOiBmYWxzZSxcbiAgICAgICAgfSwgcGFyYW1zLmNvbmZpZyk7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRoaXMuc29ja2V0LnRpbWVvdXQ7XG4gICAgICAgIHRoaXMuam9pblB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5qb2luLCB0aGlzLnBhcmFtcywgdGhpcy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy5yZWpvaW5UaW1lciA9IG5ldyBUaW1lcigoKSA9PiB0aGlzLl9yZWpvaW5VbnRpbENvbm5lY3RlZCgpLCB0aGlzLnNvY2tldC5yZWNvbm5lY3RBZnRlck1zKTtcbiAgICAgICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKCdvaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5qb2luZWQ7XG4gICAgICAgICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnB1c2hCdWZmZXIuZm9yRWFjaCgocHVzaEV2ZW50KSA9PiBwdXNoRXZlbnQuc2VuZCgpKTtcbiAgICAgICAgICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb25DbG9zZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5sb2coJ2NoYW5uZWwnLCBgY2xvc2UgJHt0aGlzLnRvcGljfSAke3RoaXMuX2pvaW5SZWYoKX1gKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5jbG9zZWQ7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5fcmVtb3ZlKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fb25FcnJvcigocmVhc29uKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNMZWF2aW5nKCkgfHwgdGhpcy5faXNDbG9zZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmxvZygnY2hhbm5lbCcsIGBlcnJvciAke3RoaXMudG9waWN9YCwgcmVhc29uKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkO1xuICAgICAgICAgICAgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZSgndGltZW91dCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNKb2luaW5nKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5sb2coJ2NoYW5uZWwnLCBgdGltZW91dCAke3RoaXMudG9waWN9YCwgdGhpcy5qb2luUHVzaC50aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkO1xuICAgICAgICAgICAgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX29uKENIQU5ORUxfRVZFTlRTLnJlcGx5LCB7fSwgKHBheWxvYWQsIHJlZikgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlcih0aGlzLl9yZXBseUV2ZW50TmFtZShyZWYpLCBwYXlsb2FkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJlc2VuY2UgPSBuZXcgUmVhbHRpbWVQcmVzZW5jZSh0aGlzKTtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RFbmRwb2ludFVSTCA9XG4gICAgICAgICAgICBodHRwRW5kcG9pbnRVUkwodGhpcy5zb2NrZXQuZW5kUG9pbnQpICsgJy9hcGkvYnJvYWRjYXN0JztcbiAgICAgICAgdGhpcy5wcml2YXRlID0gdGhpcy5wYXJhbXMuY29uZmlnLnByaXZhdGUgfHwgZmFsc2U7XG4gICAgfVxuICAgIC8qKiBTdWJzY3JpYmUgcmVnaXN0ZXJzIHlvdXIgY2xpZW50IHdpdGggdGhlIHNlcnZlciAqL1xuICAgIHN1YnNjcmliZShjYWxsYmFjaywgdGltZW91dCA9IHRoaXMudGltZW91dCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoIXRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5qb2luZWRPbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBgdHJpZWQgdG8gc3Vic2NyaWJlIG11bHRpcGxlIHRpbWVzLiAnc3Vic2NyaWJlJyBjYW4gb25seSBiZSBjYWxsZWQgYSBzaW5nbGUgdGltZSBwZXIgY2hhbm5lbCBpbnN0YW5jZWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbmZpZzogeyBicm9hZGNhc3QsIHByZXNlbmNlLCBwcml2YXRlOiBpc1ByaXZhdGUgfSwgfSA9IHRoaXMucGFyYW1zO1xuICAgICAgICAgICAgdGhpcy5fb25FcnJvcigoZSkgPT4gY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbGxiYWNrKFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMuQ0hBTk5FTF9FUlJPUiwgZSkpO1xuICAgICAgICAgICAgdGhpcy5fb25DbG9zZSgoKSA9PiBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FsbGJhY2soUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUy5DTE9TRUQpKTtcbiAgICAgICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuUGF5bG9hZCA9IHt9O1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGJyb2FkY2FzdCxcbiAgICAgICAgICAgICAgICBwcmVzZW5jZSxcbiAgICAgICAgICAgICAgICBwb3N0Z3Jlc19jaGFuZ2VzOiAoX2IgPSAoX2EgPSB0aGlzLmJpbmRpbmdzLnBvc3RncmVzX2NoYW5nZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYXAoKHIpID0+IHIuZmlsdGVyKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogW10sXG4gICAgICAgICAgICAgICAgcHJpdmF0ZTogaXNQcml2YXRlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNvY2tldC5hY2Nlc3NUb2tlblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW5QYXlsb2FkLmFjY2Vzc190b2tlbiA9IHRoaXMuc29ja2V0LmFjY2Vzc1Rva2VuVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUpvaW5QYXlsb2FkKE9iamVjdC5hc3NpZ24oeyBjb25maWcgfSwgYWNjZXNzVG9rZW5QYXlsb2FkKSk7XG4gICAgICAgICAgICB0aGlzLmpvaW5lZE9uY2UgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fcmVqb2luKHRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5qb2luUHVzaFxuICAgICAgICAgICAgICAgIC5yZWNlaXZlKCdvaycsIGFzeW5jICh7IHBvc3RncmVzX2NoYW5nZXMgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldC5zZXRBdXRoKCk7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3RncmVzX2NoYW5nZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FsbGJhY2soUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUy5TVUJTQ1JJQkVEKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xpZW50UG9zdGdyZXNCaW5kaW5ncyA9IHRoaXMuYmluZGluZ3MucG9zdGdyZXNfY2hhbmdlcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmluZGluZ3NMZW4gPSAoX2EgPSBjbGllbnRQb3N0Z3Jlc0JpbmRpbmdzID09PSBudWxsIHx8IGNsaWVudFBvc3RncmVzQmluZGluZ3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNsaWVudFBvc3RncmVzQmluZGluZ3MubGVuZ3RoKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQb3N0Z3Jlc0JpbmRpbmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZGluZ3NMZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xpZW50UG9zdGdyZXNCaW5kaW5nID0gY2xpZW50UG9zdGdyZXNCaW5kaW5nc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgZmlsdGVyOiB7IGV2ZW50LCBzY2hlbWEsIHRhYmxlLCBmaWx0ZXIgfSwgfSA9IGNsaWVudFBvc3RncmVzQmluZGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcnZlclBvc3RncmVzRmlsdGVyID0gcG9zdGdyZXNfY2hhbmdlcyAmJiBwb3N0Z3Jlc19jaGFuZ2VzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZlclBvc3RncmVzRmlsdGVyICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUG9zdGdyZXNGaWx0ZXIuZXZlbnQgPT09IGV2ZW50ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUG9zdGdyZXNGaWx0ZXIuc2NoZW1hID09PSBzY2hlbWEgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlci50YWJsZSA9PT0gdGFibGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQb3N0Z3Jlc0ZpbHRlci5maWx0ZXIgPT09IGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc3RncmVzQmluZGluZ3MucHVzaChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGNsaWVudFBvc3RncmVzQmluZGluZyksIHsgaWQ6IHNlcnZlclBvc3RncmVzRmlsdGVyLmlkIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FsbGJhY2soUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUy5DSEFOTkVMX0VSUk9SLCBuZXcgRXJyb3IoJ21pc21hdGNoIGJldHdlZW4gc2VydmVyIGFuZCBjbGllbnQgYmluZGluZ3MgZm9yIHBvc3RncmVzIGNoYW5nZXMnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZGluZ3MucG9zdGdyZXNfY2hhbmdlcyA9IG5ld1Bvc3RncmVzQmluZGluZ3M7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKFJFQUxUSU1FX1NVQlNDUklCRV9TVEFURVMuU1VCU0NSSUJFRCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5yZWNlaXZlKCdlcnJvcicsIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID09PSBudWxsIHx8IGNhbGxiYWNrID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYWxsYmFjayhSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTLkNIQU5ORUxfRVJST1IsIG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShPYmplY3QudmFsdWVzKGVycm9yKS5qb2luKCcsICcpIHx8ICdlcnJvcicpKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAucmVjZWl2ZSgndGltZW91dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FsbGJhY2soUkVBTFRJTUVfU1VCU0NSSUJFX1NUQVRFUy5USU1FRF9PVVQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBwcmVzZW5jZVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVzZW5jZS5zdGF0ZTtcbiAgICB9XG4gICAgYXN5bmMgdHJhY2socGF5bG9hZCwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmQoe1xuICAgICAgICAgICAgdHlwZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGV2ZW50OiAndHJhY2snLFxuICAgICAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgfSwgb3B0cy50aW1lb3V0IHx8IHRoaXMudGltZW91dCk7XG4gICAgfVxuICAgIGFzeW5jIHVudHJhY2sob3B0cyA9IHt9KSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNlbmQoe1xuICAgICAgICAgICAgdHlwZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGV2ZW50OiAndW50cmFjaycsXG4gICAgICAgIH0sIG9wdHMpO1xuICAgIH1cbiAgICBvbih0eXBlLCBmaWx0ZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbih0eXBlLCBmaWx0ZXIsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlIGludG8gdGhlIGNoYW5uZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXJncyBBcmd1bWVudHMgdG8gc2VuZCB0byBjaGFubmVsXG4gICAgICogQHBhcmFtIGFyZ3MudHlwZSBUaGUgdHlwZSBvZiBldmVudCB0byBzZW5kXG4gICAgICogQHBhcmFtIGFyZ3MuZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IGJlaW5nIHNlbnRcbiAgICAgKiBAcGFyYW0gYXJncy5wYXlsb2FkIFBheWxvYWQgdG8gYmUgc2VudFxuICAgICAqIEBwYXJhbSBvcHRzIE9wdGlvbnMgdG8gYmUgdXNlZCBkdXJpbmcgdGhlIHNlbmQgcHJvY2Vzc1xuICAgICAqL1xuICAgIGFzeW5jIHNlbmQoYXJncywgb3B0cyA9IHt9KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICghdGhpcy5fY2FuUHVzaCgpICYmIGFyZ3MudHlwZSA9PT0gJ2Jyb2FkY2FzdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZXZlbnQsIHBheWxvYWQ6IGVuZHBvaW50X3BheWxvYWQgfSA9IGFyZ3M7XG4gICAgICAgICAgICBjb25zdCBhdXRob3JpemF0aW9uID0gdGhpcy5zb2NrZXQuYWNjZXNzVG9rZW5WYWx1ZVxuICAgICAgICAgICAgICAgID8gYEJlYXJlciAke3RoaXMuc29ja2V0LmFjY2Vzc1Rva2VuVmFsdWV9YFxuICAgICAgICAgICAgICAgIDogJyc7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYXV0aG9yaXphdGlvbixcbiAgICAgICAgICAgICAgICAgICAgYXBpa2V5OiB0aGlzLnNvY2tldC5hcGlLZXkgPyB0aGlzLnNvY2tldC5hcGlLZXkgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3BpYzogdGhpcy5zdWJUb3BpYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiBlbmRwb2ludF9wYXlsb2FkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGU6IHRoaXMucHJpdmF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuX2ZldGNoV2l0aFRpbWVvdXQodGhpcy5icm9hZGNhc3RFbmRwb2ludFVSTCwgb3B0aW9ucywgKF9hID0gb3B0cy50aW1lb3V0KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIGF3YWl0ICgoX2IgPSByZXNwb25zZS5ib2R5KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FuY2VsKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5vayA/ICdvaycgOiAnZXJyb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUgPT09ICdBYm9ydEVycm9yJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RpbWVkIG91dCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgICAgICBjb25zdCBwdXNoID0gdGhpcy5fcHVzaChhcmdzLnR5cGUsIGFyZ3MsIG9wdHMudGltZW91dCB8fCB0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLnR5cGUgPT09ICdicm9hZGNhc3QnICYmICEoKF9jID0gKF9iID0gKF9hID0gdGhpcy5wYXJhbXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb25maWcpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5icm9hZGNhc3QpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5hY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ29rJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHB1c2gucmVjZWl2ZSgnb2snLCAoKSA9PiByZXNvbHZlKCdvaycpKTtcbiAgICAgICAgICAgICAgICBwdXNoLnJlY2VpdmUoJ2Vycm9yJywgKCkgPT4gcmVzb2x2ZSgnZXJyb3InKSk7XG4gICAgICAgICAgICAgICAgcHVzaC5yZWNlaXZlKCd0aW1lb3V0JywgKCkgPT4gcmVzb2x2ZSgndGltZWQgb3V0JykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlSm9pblBheWxvYWQocGF5bG9hZCkge1xuICAgICAgICB0aGlzLmpvaW5QdXNoLnVwZGF0ZVBheWxvYWQocGF5bG9hZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExlYXZlcyB0aGUgY2hhbm5lbC5cbiAgICAgKlxuICAgICAqIFVuc3Vic2NyaWJlcyBmcm9tIHNlcnZlciBldmVudHMsIGFuZCBpbnN0cnVjdHMgY2hhbm5lbCB0byB0ZXJtaW5hdGUgb24gc2VydmVyLlxuICAgICAqIFRyaWdnZXJzIG9uQ2xvc2UoKSBob29rcy5cbiAgICAgKlxuICAgICAqIFRvIHJlY2VpdmUgbGVhdmUgYWNrbm93bGVkZ2VtZW50cywgdXNlIHRoZSBhIGByZWNlaXZlYCBob29rIHRvIGJpbmQgdG8gdGhlIHNlcnZlciBhY2ssIGllOlxuICAgICAqIGNoYW5uZWwudW5zdWJzY3JpYmUoKS5yZWNlaXZlKFwib2tcIiwgKCkgPT4gYWxlcnQoXCJsZWZ0IVwiKSApXG4gICAgICovXG4gICAgdW5zdWJzY3JpYmUodGltZW91dCA9IHRoaXMudGltZW91dCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMubGVhdmluZztcbiAgICAgICAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmxvZygnY2hhbm5lbCcsIGBsZWF2ZSAke3RoaXMudG9waWN9YCk7XG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmNsb3NlLCAnbGVhdmUnLCB0aGlzLl9qb2luUmVmKCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KCk7XG4gICAgICAgIC8vIERlc3Ryb3kgam9pblB1c2ggdG8gYXZvaWQgY29ubmVjdGlvbiB0aW1lb3V0cyBkdXJpbmcgdW5zY3JpcHRpb24gcGhhc2VcbiAgICAgICAgdGhpcy5qb2luUHVzaC5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGVhdmVQdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMubGVhdmUsIHt9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIGxlYXZlUHVzaFxuICAgICAgICAgICAgICAgIC5yZWNlaXZlKCdvaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgnb2snKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnJlY2VpdmUoJ3RpbWVvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoJ3RpbWVkIG91dCcpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAucmVjZWl2ZSgnZXJyb3InLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgnZXJyb3InKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGVhdmVQdXNoLnNlbmQoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fY2FuUHVzaCgpKSB7XG4gICAgICAgICAgICAgICAgbGVhdmVQdXNoLnRyaWdnZXIoJ29rJywge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIGFzeW5jIF9mZXRjaFdpdGhUaW1lb3V0KHVybCwgb3B0aW9ucywgdGltZW91dCkge1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgICBjb25zdCBpZCA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB0aW1lb3V0KTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnNvY2tldC5mZXRjaCh1cmwsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCB9KSk7XG4gICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9wdXNoKGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0ID0gdGhpcy50aW1lb3V0KSB7XG4gICAgICAgIGlmICghdGhpcy5qb2luZWRPbmNlKSB7XG4gICAgICAgICAgICB0aHJvdyBgdHJpZWQgdG8gcHVzaCAnJHtldmVudH0nIHRvICcke3RoaXMudG9waWN9JyBiZWZvcmUgam9pbmluZy4gVXNlIGNoYW5uZWwuc3Vic2NyaWJlKCkgYmVmb3JlIHB1c2hpbmcgZXZlbnRzYDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHVzaEV2ZW50ID0gbmV3IFB1c2godGhpcywgZXZlbnQsIHBheWxvYWQsIHRpbWVvdXQpO1xuICAgICAgICBpZiAodGhpcy5fY2FuUHVzaCgpKSB7XG4gICAgICAgICAgICBwdXNoRXZlbnQuc2VuZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcHVzaEV2ZW50LnN0YXJ0VGltZW91dCgpO1xuICAgICAgICAgICAgdGhpcy5wdXNoQnVmZmVyLnB1c2gocHVzaEV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHVzaEV2ZW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVycmlkYWJsZSBtZXNzYWdlIGhvb2tcbiAgICAgKlxuICAgICAqIFJlY2VpdmVzIGFsbCBldmVudHMgZm9yIHNwZWNpYWxpemVkIG1lc3NhZ2UgaGFuZGxpbmcgYmVmb3JlIGRpc3BhdGNoaW5nIHRvIHRoZSBjaGFubmVsIGNhbGxiYWNrcy5cbiAgICAgKiBNdXN0IHJldHVybiB0aGUgcGF5bG9hZCwgbW9kaWZpZWQgb3IgdW5tb2RpZmllZC5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9vbk1lc3NhZ2UoX2V2ZW50LCBwYXlsb2FkLCBfcmVmKSB7XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX2lzTWVtYmVyKHRvcGljKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvcGljID09PSB0b3BpYztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9qb2luUmVmKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5qb2luUHVzaC5yZWY7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfdHJpZ2dlcih0eXBlLCBwYXlsb2FkLCByZWYpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgdHlwZUxvd2VyID0gdHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB7IGNsb3NlLCBlcnJvciwgbGVhdmUsIGpvaW4gfSA9IENIQU5ORUxfRVZFTlRTO1xuICAgICAgICBjb25zdCBldmVudHMgPSBbY2xvc2UsIGVycm9yLCBsZWF2ZSwgam9pbl07XG4gICAgICAgIGlmIChyZWYgJiYgZXZlbnRzLmluZGV4T2YodHlwZUxvd2VyKSA+PSAwICYmIHJlZiAhPT0gdGhpcy5fam9pblJlZigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhhbmRsZWRQYXlsb2FkID0gdGhpcy5fb25NZXNzYWdlKHR5cGVMb3dlciwgcGF5bG9hZCwgcmVmKTtcbiAgICAgICAgaWYgKHBheWxvYWQgJiYgIWhhbmRsZWRQYXlsb2FkKSB7XG4gICAgICAgICAgICB0aHJvdyAnY2hhbm5lbCBvbk1lc3NhZ2UgY2FsbGJhY2tzIG11c3QgcmV0dXJuIHRoZSBwYXlsb2FkLCBtb2RpZmllZCBvciB1bm1vZGlmaWVkJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoWydpbnNlcnQnLCAndXBkYXRlJywgJ2RlbGV0ZSddLmluY2x1ZGVzKHR5cGVMb3dlcikpIHtcbiAgICAgICAgICAgIChfYSA9IHRoaXMuYmluZGluZ3MucG9zdGdyZXNfY2hhbmdlcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgICAgIHJldHVybiAoKChfYSA9IGJpbmQuZmlsdGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXZlbnQpID09PSAnKicgfHxcbiAgICAgICAgICAgICAgICAgICAgKChfYyA9IChfYiA9IGJpbmQuZmlsdGVyKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZXZlbnQpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy50b0xvY2FsZUxvd2VyQ2FzZSgpKSA9PT0gdHlwZUxvd2VyKTtcbiAgICAgICAgICAgIH0pLm1hcCgoYmluZCkgPT4gYmluZC5jYWxsYmFjayhoYW5kbGVkUGF5bG9hZCwgcmVmKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoX2IgPSB0aGlzLmJpbmRpbmdzW3R5cGVMb3dlcl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5maWx0ZXIoKGJpbmQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcbiAgICAgICAgICAgICAgICBpZiAoWydicm9hZGNhc3QnLCAncHJlc2VuY2UnLCAncG9zdGdyZXNfY2hhbmdlcyddLmluY2x1ZGVzKHR5cGVMb3dlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdpZCcgaW4gYmluZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmluZElkID0gYmluZC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJpbmRFdmVudCA9IChfYSA9IGJpbmQuZmlsdGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGJpbmRJZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoX2IgPSBwYXlsb2FkLmlkcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmluY2x1ZGVzKGJpbmRJZCkpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJpbmRFdmVudCA9PT0gJyonIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChiaW5kRXZlbnQgPT09IG51bGwgfHwgYmluZEV2ZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiaW5kRXZlbnQudG9Mb2NhbGVMb3dlckNhc2UoKSkgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKF9jID0gcGF5bG9hZC5kYXRhKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MudHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYmluZEV2ZW50ID0gKF9lID0gKF9kID0gYmluZCA9PT0gbnVsbCB8fCBiaW5kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBiaW5kLmZpbHRlcikgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmV2ZW50KSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoYmluZEV2ZW50ID09PSAnKicgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kRXZlbnQgPT09ICgoX2YgPSBwYXlsb2FkID09PSBudWxsIHx8IHBheWxvYWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBheWxvYWQuZXZlbnQpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi50b0xvY2FsZUxvd2VyQ2FzZSgpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5kLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gdHlwZUxvd2VyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLm1hcCgoYmluZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaGFuZGxlZFBheWxvYWQgPT09ICdvYmplY3QnICYmICdpZHMnIGluIGhhbmRsZWRQYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc3RncmVzQ2hhbmdlcyA9IGhhbmRsZWRQYXlsb2FkLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc2NoZW1hLCB0YWJsZSwgY29tbWl0X3RpbWVzdGFtcCwgdHlwZSwgZXJyb3JzIH0gPSBwb3N0Z3Jlc0NoYW5nZXM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVucmljaGVkUGF5bG9hZCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVtYTogc2NoZW1hLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGU6IHRhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0X3RpbWVzdGFtcDogY29tbWl0X3RpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldzoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGQ6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBlcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZWRQYXlsb2FkID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBlbnJpY2hlZFBheWxvYWQpLCB0aGlzLl9nZXRQYXlsb2FkUmVjb3Jkcyhwb3N0Z3Jlc0NoYW5nZXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYmluZC5jYWxsYmFjayhoYW5kbGVkUGF5bG9hZCwgcmVmKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfaXNDbG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5jbG9zZWQ7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfaXNKb2luZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5qb2luZWQ7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfaXNKb2luaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmluZztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9pc0xlYXZpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5sZWF2aW5nO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX3JlcGx5RXZlbnROYW1lKHJlZikge1xuICAgICAgICByZXR1cm4gYGNoYW5fcmVwbHlfJHtyZWZ9YDtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9vbih0eXBlLCBmaWx0ZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IHR5cGVMb3dlciA9IHR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgYmluZGluZyA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVMb3dlcixcbiAgICAgICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5iaW5kaW5nc1t0eXBlTG93ZXJdKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRpbmdzW3R5cGVMb3dlcl0ucHVzaChiaW5kaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZGluZ3NbdHlwZUxvd2VyXSA9IFtiaW5kaW5nXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9vZmYodHlwZSwgZmlsdGVyKSB7XG4gICAgICAgIGNvbnN0IHR5cGVMb3dlciA9IHR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy5iaW5kaW5nc1t0eXBlTG93ZXJdID0gdGhpcy5iaW5kaW5nc1t0eXBlTG93ZXJdLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuICEoKChfYSA9IGJpbmQudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvTG9jYWxlTG93ZXJDYXNlKCkpID09PSB0eXBlTG93ZXIgJiZcbiAgICAgICAgICAgICAgICBSZWFsdGltZUNoYW5uZWwuaXNFcXVhbChiaW5kLmZpbHRlciwgZmlsdGVyKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHN0YXRpYyBpc0VxdWFsKG9iajEsIG9iajIpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKG9iajEpLmxlbmd0aCAhPT0gT2JqZWN0LmtleXMob2JqMikubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBrIGluIG9iajEpIHtcbiAgICAgICAgICAgIGlmIChvYmoxW2tdICE9PSBvYmoyW2tdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX3Jlam9pblVudGlsQ29ubmVjdGVkKCkge1xuICAgICAgICB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpO1xuICAgICAgICBpZiAodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fcmVqb2luKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNoYW5uZWwgY2xvc2VzLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgX29uQ2xvc2UoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fb24oQ0hBTk5FTF9FVkVOVFMuY2xvc2UsIHt9LCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjaGFubmVsIGVuY291bnRlcmVzIGFuIGVycm9yLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgX29uRXJyb3IoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fb24oQ0hBTk5FTF9FVkVOVFMuZXJyb3IsIHt9LCAocmVhc29uKSA9PiBjYWxsYmFjayhyZWFzb24pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNvY2tldCBpcyBjb25uZWN0ZWQgYW5kIHRoZSBjaGFubmVsIGhhcyBiZWVuIGpvaW5lZC5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9jYW5QdXNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLl9pc0pvaW5lZCgpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX3Jlam9pbih0aW1lb3V0ID0gdGhpcy50aW1lb3V0KSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0xlYXZpbmcoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc29ja2V0Ll9sZWF2ZU9wZW5Ub3BpYyh0aGlzLnRvcGljKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5pbmc7XG4gICAgICAgIHRoaXMuam9pblB1c2gucmVzZW5kKHRpbWVvdXQpO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgX2dldFBheWxvYWRSZWNvcmRzKHBheWxvYWQpIHtcbiAgICAgICAgY29uc3QgcmVjb3JkcyA9IHtcbiAgICAgICAgICAgIG5ldzoge30sXG4gICAgICAgICAgICBvbGQ6IHt9LFxuICAgICAgICB9O1xuICAgICAgICBpZiAocGF5bG9hZC50eXBlID09PSAnSU5TRVJUJyB8fCBwYXlsb2FkLnR5cGUgPT09ICdVUERBVEUnKSB7XG4gICAgICAgICAgICByZWNvcmRzLm5ldyA9IFRyYW5zZm9ybWVycy5jb252ZXJ0Q2hhbmdlRGF0YShwYXlsb2FkLmNvbHVtbnMsIHBheWxvYWQucmVjb3JkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC50eXBlID09PSAnVVBEQVRFJyB8fCBwYXlsb2FkLnR5cGUgPT09ICdERUxFVEUnKSB7XG4gICAgICAgICAgICByZWNvcmRzLm9sZCA9IFRyYW5zZm9ybWVycy5jb252ZXJ0Q2hhbmdlRGF0YShwYXlsb2FkLmNvbHVtbnMsIHBheWxvYWQub2xkX3JlY29yZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZHM7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVhbHRpbWVDaGFubmVsLmpzLm1hcCIsImltcG9ydCB7IENIQU5ORUxfRVZFTlRTLCBDT05ORUNUSU9OX1NUQVRFLCBERUZBVUxUX0hFQURFUlMsIERFRkFVTFRfVElNRU9VVCwgU09DS0VUX1NUQVRFUywgVFJBTlNQT1JUUywgVlNOLCBXU19DTE9TRV9OT1JNQUwsIH0gZnJvbSAnLi9saWIvY29uc3RhbnRzJztcbmltcG9ydCBTZXJpYWxpemVyIGZyb20gJy4vbGliL3NlcmlhbGl6ZXInO1xuaW1wb3J0IFRpbWVyIGZyb20gJy4vbGliL3RpbWVyJztcbmltcG9ydCB7IGh0dHBFbmRwb2ludFVSTCB9IGZyb20gJy4vbGliL3RyYW5zZm9ybWVycyc7XG5pbXBvcnQgUmVhbHRpbWVDaGFubmVsIGZyb20gJy4vUmVhbHRpbWVDaGFubmVsJztcbmNvbnN0IG5vb3AgPSAoKSA9PiB7IH07XG5jb25zdCBOQVRJVkVfV0VCU09DS0VUX0FWQUlMQUJMRSA9IHR5cGVvZiBXZWJTb2NrZXQgIT09ICd1bmRlZmluZWQnO1xuY29uc3QgV09SS0VSX1NDUklQVCA9IGBcbiAgYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKGUpID0+IHtcbiAgICBpZiAoZS5kYXRhLmV2ZW50ID09PSBcInN0YXJ0XCIpIHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHBvc3RNZXNzYWdlKHsgZXZlbnQ6IFwia2VlcEFsaXZlXCIgfSksIGUuZGF0YS5pbnRlcnZhbCk7XG4gICAgfVxuICB9KTtgO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVhbHRpbWVDbGllbnQge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRoZSBTb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW5kUG9pbnQgVGhlIHN0cmluZyBXZWJTb2NrZXQgZW5kcG9pbnQsIGllLCBcIndzOi8vZXhhbXBsZS5jb20vc29ja2V0XCIsIFwid3NzOi8vZXhhbXBsZS5jb21cIiwgXCIvc29ja2V0XCIgKGluaGVyaXRlZCBob3N0ICYgcHJvdG9jb2wpXG4gICAgICogQHBhcmFtIGh0dHBFbmRwb2ludCBUaGUgc3RyaW5nIEhUVFAgZW5kcG9pbnQsIGllLCBcImh0dHBzOi8vZXhhbXBsZS5jb21cIiwgXCIvXCIgKGluaGVyaXRlZCBob3N0ICYgcHJvdG9jb2wpXG4gICAgICogQHBhcmFtIG9wdGlvbnMudHJhbnNwb3J0IFRoZSBXZWJzb2NrZXQgVHJhbnNwb3J0LCBmb3IgZXhhbXBsZSBXZWJTb2NrZXQuXG4gICAgICogQHBhcmFtIG9wdGlvbnMudGltZW91dCBUaGUgZGVmYXVsdCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byB0cmlnZ2VyIHB1c2ggdGltZW91dHMuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucGFyYW1zIFRoZSBvcHRpb25hbCBwYXJhbXMgdG8gcGFzcyB3aGVuIGNvbm5lY3RpbmcuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaGVhZGVycyBUaGUgb3B0aW9uYWwgaGVhZGVycyB0byBwYXNzIHdoZW4gY29ubmVjdGluZy5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5oZWFydGJlYXRJbnRlcnZhbE1zIFRoZSBtaWxsaXNlYyBpbnRlcnZhbCB0byBzZW5kIGEgaGVhcnRiZWF0IG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIG9wdGlvbnMubG9nZ2VyIFRoZSBvcHRpb25hbCBmdW5jdGlvbiBmb3Igc3BlY2lhbGl6ZWQgbG9nZ2luZywgaWU6IGxvZ2dlcjogKGtpbmQsIG1zZywgZGF0YSkgPT4geyBjb25zb2xlLmxvZyhgJHtraW5kfTogJHttc2d9YCwgZGF0YSkgfVxuICAgICAqIEBwYXJhbSBvcHRpb25zLmVuY29kZSBUaGUgZnVuY3Rpb24gdG8gZW5jb2RlIG91dGdvaW5nIG1lc3NhZ2VzLiBEZWZhdWx0cyB0byBKU09OOiAocGF5bG9hZCwgY2FsbGJhY2spID0+IGNhbGxiYWNrKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKVxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRlY29kZSBUaGUgZnVuY3Rpb24gdG8gZGVjb2RlIGluY29taW5nIG1lc3NhZ2VzLiBEZWZhdWx0cyB0byBTZXJpYWxpemVyJ3MgZGVjb2RlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnJlY29ubmVjdEFmdGVyTXMgaGUgb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtaWxsc2VjIHJlY29ubmVjdCBpbnRlcnZhbC4gRGVmYXVsdHMgdG8gc3RlcHBlZCBiYWNrb2ZmIG9mZi5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy53b3JrZXIgVXNlIFdlYiBXb3JrZXIgdG8gc2V0IGEgc2lkZSBmbG93LiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy53b3JrZXJVcmwgVGhlIFVSTCBvZiB0aGUgd29ya2VyIHNjcmlwdC4gRGVmYXVsdHMgdG8gaHR0cHM6Ly9yZWFsdGltZS5zdXBhYmFzZS5jb20vd29ya2VyLmpzIHRoYXQgaW5jbHVkZXMgYSBoZWFydGJlYXQgZXZlbnQgY2FsbCB0byBrZWVwIHRoZSBjb25uZWN0aW9uIGFsaXZlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVuZFBvaW50LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlblZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBudWxsO1xuICAgICAgICB0aGlzLmNoYW5uZWxzID0gW107XG4gICAgICAgIHRoaXMuZW5kUG9pbnQgPSAnJztcbiAgICAgICAgdGhpcy5odHRwRW5kcG9pbnQgPSAnJztcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gREVGQVVMVF9IRUFERVJTO1xuICAgICAgICB0aGlzLnBhcmFtcyA9IHt9O1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBERUZBVUxUX1RJTUVPVVQ7XG4gICAgICAgIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyA9IDMwMDAwO1xuICAgICAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsO1xuICAgICAgICB0aGlzLnJlZiA9IDA7XG4gICAgICAgIHRoaXMubG9nZ2VyID0gbm9vcDtcbiAgICAgICAgdGhpcy5jb25uID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuc2VyaWFsaXplciA9IG5ldyBTZXJpYWxpemVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MgPSB7XG4gICAgICAgICAgICBvcGVuOiBbXSxcbiAgICAgICAgICAgIGNsb3NlOiBbXSxcbiAgICAgICAgICAgIGVycm9yOiBbXSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IFtdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVzZSBlaXRoZXIgY3VzdG9tIGZldGNoLCBpZiBwcm92aWRlZCwgb3IgZGVmYXVsdCBmZXRjaCB0byBtYWtlIEhUVFAgcmVxdWVzdHNcbiAgICAgICAgICpcbiAgICAgICAgICogQGludGVybmFsXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9yZXNvbHZlRmV0Y2ggPSAoY3VzdG9tRmV0Y2gpID0+IHtcbiAgICAgICAgICAgIGxldCBfZmV0Y2g7XG4gICAgICAgICAgICBpZiAoY3VzdG9tRmV0Y2gpIHtcbiAgICAgICAgICAgICAgICBfZmV0Y2ggPSBjdXN0b21GZXRjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBmZXRjaCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBfZmV0Y2ggPSAoLi4uYXJncykgPT4gaW1wb3J0KCdAc3VwYWJhc2Uvbm9kZS1mZXRjaCcpLnRoZW4oKHsgZGVmYXVsdDogZmV0Y2ggfSkgPT4gZmV0Y2goLi4uYXJncykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX2ZldGNoID0gZmV0Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IF9mZXRjaCguLi5hcmdzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbmRQb2ludCA9IGAke2VuZFBvaW50fS8ke1RSQU5TUE9SVFMud2Vic29ja2V0fWA7XG4gICAgICAgIHRoaXMuaHR0cEVuZHBvaW50ID0gaHR0cEVuZHBvaW50VVJMKGVuZFBvaW50KTtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy50cmFuc3BvcnQpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gb3B0aW9ucy50cmFuc3BvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5wYXJhbXMpXG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9IG9wdGlvbnMucGFyYW1zO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhlYWRlcnMpXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaGVhZGVycyksIG9wdGlvbnMuaGVhZGVycyk7XG4gICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudGltZW91dClcbiAgICAgICAgICAgIHRoaXMudGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5sb2dnZXIpXG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyO1xuICAgICAgICBpZiAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gICAgICAgICAgICB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMgPSBvcHRpb25zLmhlYXJ0YmVhdEludGVydmFsTXM7XG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuVmFsdWUgPSAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucGFyYW1zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXBpa2V5O1xuICAgICAgICBpZiAoYWNjZXNzVG9rZW5WYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5hY2Nlc3NUb2tlblZhbHVlID0gYWNjZXNzVG9rZW5WYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuYXBpS2V5ID0gYWNjZXNzVG9rZW5WYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY29ubmVjdEFmdGVyTXMgPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnJlY29ubmVjdEFmdGVyTXMpXG4gICAgICAgICAgICA/IG9wdGlvbnMucmVjb25uZWN0QWZ0ZXJNc1xuICAgICAgICAgICAgOiAodHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzEwMDAsIDIwMDAsIDUwMDAsIDEwMDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lbmNvZGUgPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmVuY29kZSlcbiAgICAgICAgICAgID8gb3B0aW9ucy5lbmNvZGVcbiAgICAgICAgICAgIDogKHBheWxvYWQsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVjb2RlID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kZWNvZGUpXG4gICAgICAgICAgICA/IG9wdGlvbnMuZGVjb2RlXG4gICAgICAgICAgICA6IHRoaXMuc2VyaWFsaXplci5kZWNvZGUuYmluZCh0aGlzLnNlcmlhbGl6ZXIpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdFRpbWVyID0gbmV3IFRpbWVyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgICAgIH0sIHRoaXMucmVjb25uZWN0QWZ0ZXJNcyk7XG4gICAgICAgIHRoaXMuZmV0Y2ggPSB0aGlzLl9yZXNvbHZlRmV0Y2gob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmZldGNoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy53b3JrZXIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhd2luZG93Lldvcmtlcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViIFdvcmtlciBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLndvcmtlciA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMud29ya2VyKSB8fCBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMud29ya2VyVXJsID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLndvcmtlclVybDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5hY2Nlc3NUb2tlbikgfHwgbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29ubmVjdHMgdGhlIHNvY2tldCwgdW5sZXNzIGFscmVhZHkgY29ubmVjdGVkLlxuICAgICAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubiA9IG5ldyB0aGlzLnRyYW5zcG9ydCh0aGlzLmVuZHBvaW50VVJMKCksIHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChOQVRJVkVfV0VCU09DS0VUX0FWQUlMQUJMRSkge1xuICAgICAgICAgICAgdGhpcy5jb25uID0gbmV3IFdlYlNvY2tldCh0aGlzLmVuZHBvaW50VVJMKCkpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cENvbm5lY3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbm4gPSBuZXcgV1NXZWJTb2NrZXREdW1teSh0aGlzLmVuZHBvaW50VVJMKCksIHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm4gPSBudWxsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGltcG9ydCgnd3MnKS50aGVuKCh7IGRlZmF1bHQ6IFdTIH0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29ubiA9IG5ldyBXUyh0aGlzLmVuZHBvaW50VVJMKCksIHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZXR1cENvbm5lY3Rpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIFVSTCBvZiB0aGUgd2Vic29ja2V0LlxuICAgICAqIEByZXR1cm5zIHN0cmluZyBUaGUgVVJMIG9mIHRoZSB3ZWJzb2NrZXQuXG4gICAgICovXG4gICAgZW5kcG9pbnRVUkwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBlbmRQYXJhbXModGhpcy5lbmRQb2ludCwgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYXJhbXMsIHsgdnNuOiBWU04gfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvZGUgQSBudW1lcmljIHN0YXR1cyBjb2RlIHRvIHNlbmQgb24gZGlzY29ubmVjdC5cbiAgICAgKiBAcGFyYW0gcmVhc29uIEEgY3VzdG9tIHJlYXNvbiBmb3IgdGhlIGRpc2Nvbm5lY3QuXG4gICAgICovXG4gICAgZGlzY29ubmVjdChjb2RlLCByZWFzb24pIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubikge1xuICAgICAgICAgICAgdGhpcy5jb25uLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7IH07IC8vIG5vb3BcbiAgICAgICAgICAgIGlmIChjb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uLmNsb3NlKGNvZGUsIHJlYXNvbiAhPT0gbnVsbCAmJiByZWFzb24gIT09IHZvaWQgMCA/IHJlYXNvbiA6ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubi5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb25uID0gbnVsbDtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvcGVuIGhhbmRsZXNcbiAgICAgICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLmhlYXJ0YmVhdFRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBjcmVhdGVkIGNoYW5uZWxzXG4gICAgICovXG4gICAgZ2V0Q2hhbm5lbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5uZWxzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZXMgYW5kIHJlbW92ZXMgYSBzaW5nbGUgY2hhbm5lbFxuICAgICAqIEBwYXJhbSBjaGFubmVsIEEgUmVhbHRpbWVDaGFubmVsIGluc3RhbmNlXG4gICAgICovXG4gICAgYXN5bmMgcmVtb3ZlQ2hhbm5lbChjaGFubmVsKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IGF3YWl0IGNoYW5uZWwudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgaWYgKHRoaXMuY2hhbm5lbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdHVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZXMgYW5kIHJlbW92ZXMgYWxsIGNoYW5uZWxzXG4gICAgICovXG4gICAgYXN5bmMgcmVtb3ZlQWxsQ2hhbm5lbHMoKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlc18xID0gYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5jaGFubmVscy5tYXAoKGNoYW5uZWwpID0+IGNoYW5uZWwudW5zdWJzY3JpYmUoKSkpO1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlc18xO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2dzIHRoZSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogRm9yIGN1c3RvbWl6ZWQgbG9nZ2luZywgYHRoaXMubG9nZ2VyYCBjYW4gYmUgb3ZlcnJpZGRlbi5cbiAgICAgKi9cbiAgICBsb2coa2luZCwgbXNnLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyKGtpbmQsIG1zZywgZGF0YSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHNvY2tldC5cbiAgICAgKi9cbiAgICBjb25uZWN0aW9uU3RhdGUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jb25uICYmIHRoaXMuY29ubi5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZzpcbiAgICAgICAgICAgICAgICByZXR1cm4gQ09OTkVDVElPTl9TVEFURS5Db25uZWN0aW5nO1xuICAgICAgICAgICAgY2FzZSBTT0NLRVRfU1RBVEVTLm9wZW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIENPTk5FQ1RJT05fU1RBVEUuT3BlbjtcbiAgICAgICAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jbG9zaW5nOlxuICAgICAgICAgICAgICAgIHJldHVybiBDT05ORUNUSU9OX1NUQVRFLkNsb3Npbmc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBDT05ORUNUSU9OX1NUQVRFLkNsb3NlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpcyB0aGUgY29ubmVjdGlvbiBpcyBvcGVuLlxuICAgICAqL1xuICAgIGlzQ29ubmVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uU3RhdGUoKSA9PT0gQ09OTkVDVElPTl9TVEFURS5PcGVuO1xuICAgIH1cbiAgICBjaGFubmVsKHRvcGljLCBwYXJhbXMgPSB7IGNvbmZpZzoge30gfSkge1xuICAgICAgICBjb25zdCBjaGFuID0gbmV3IFJlYWx0aW1lQ2hhbm5lbChgcmVhbHRpbWU6JHt0b3BpY31gLCBwYXJhbXMsIHRoaXMpO1xuICAgICAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2hhbik7XG4gICAgICAgIHJldHVybiBjaGFuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoIG91dCBhIG1lc3NhZ2UgaWYgdGhlIHNvY2tldCBpcyBjb25uZWN0ZWQuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgc29ja2V0IGlzIG5vdCBjb25uZWN0ZWQsIHRoZSBtZXNzYWdlIGdldHMgZW5xdWV1ZWQgd2l0aGluIGEgbG9jYWwgYnVmZmVyLCBhbmQgc2VudCBvdXQgd2hlbiBhIGNvbm5lY3Rpb24gaXMgbmV4dCBlc3RhYmxpc2hlZC5cbiAgICAgKi9cbiAgICBwdXNoKGRhdGEpIHtcbiAgICAgICAgY29uc3QgeyB0b3BpYywgZXZlbnQsIHBheWxvYWQsIHJlZiB9ID0gZGF0YTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVuY29kZShkYXRhLCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIChfYSA9IHRoaXMuY29ubikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNlbmQocmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxvZygncHVzaCcsIGAke3RvcGljfSAke2V2ZW50fSAoJHtyZWZ9KWAsIHBheWxvYWQpO1xuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2goY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIEpXVCBhY2Nlc3MgdG9rZW4gdXNlZCBmb3IgY2hhbm5lbCBzdWJzY3JpcHRpb24gYXV0aG9yaXphdGlvbiBhbmQgUmVhbHRpbWUgUkxTLlxuICAgICAqXG4gICAgICogSWYgcGFyYW0gaXMgbnVsbCBpdCB3aWxsIHVzZSB0aGUgYGFjY2Vzc1Rva2VuYCBjYWxsYmFjayBmdW5jdGlvbiBvciB0aGUgdG9rZW4gc2V0IG9uIHRoZSBjbGllbnQuXG4gICAgICpcbiAgICAgKiBPbiBjYWxsYmFjayB1c2VkLCBpdCB3aWxsIHNldCB0aGUgdmFsdWUgb2YgdGhlIHRva2VuIGludGVybmFsIHRvIHRoZSBjbGllbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdG9rZW4gQSBKV1Qgc3RyaW5nIHRvIG92ZXJyaWRlIHRoZSB0b2tlbiBzZXQgb24gdGhlIGNsaWVudC5cbiAgICAgKi9cbiAgICBhc3luYyBzZXRBdXRoKHRva2VuID0gbnVsbCkge1xuICAgICAgICBsZXQgdG9rZW5Ub1NlbmQgPSB0b2tlbiB8fFxuICAgICAgICAgICAgKHRoaXMuYWNjZXNzVG9rZW4gJiYgKGF3YWl0IHRoaXMuYWNjZXNzVG9rZW4oKSkpIHx8XG4gICAgICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuVmFsdWU7XG4gICAgICAgIGlmICh0b2tlblRvU2VuZCkge1xuICAgICAgICAgICAgbGV0IHBhcnNlZCA9IG51bGw7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnNlZCA9IEpTT04ucGFyc2UoYXRvYih0b2tlblRvU2VuZC5zcGxpdCgnLicpWzFdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoX2Vycm9yKSB7IH1cbiAgICAgICAgICAgIGlmIChwYXJzZWQgJiYgcGFyc2VkLmV4cCkge1xuICAgICAgICAgICAgICAgIGxldCBub3cgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWQgPSBub3cgLSBwYXJzZWQuZXhwIDwgMDtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nKCdhdXRoJywgYEludmFsaWRKV1RUb2tlbjogSW52YWxpZCB2YWx1ZSBmb3IgSldUIGNsYWltIFwiZXhwXCIgd2l0aCB2YWx1ZSAke3BhcnNlZC5leHB9YCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgSW52YWxpZEpXVFRva2VuOiBJbnZhbGlkIHZhbHVlIGZvciBKV1QgY2xhaW0gXCJleHBcIiB3aXRoIHZhbHVlICR7cGFyc2VkLmV4cH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuVmFsdWUgPSB0b2tlblRvU2VuZDtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbHMuZm9yRWFjaCgoY2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgICAgIHRva2VuVG9TZW5kICYmIGNoYW5uZWwudXBkYXRlSm9pblBheWxvYWQoeyBhY2Nlc3NfdG9rZW46IHRva2VuVG9TZW5kIH0pO1xuICAgICAgICAgICAgICAgIGlmIChjaGFubmVsLmpvaW5lZE9uY2UgJiYgY2hhbm5lbC5faXNKb2luZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFubmVsLl9wdXNoKENIQU5ORUxfRVZFTlRTLmFjY2Vzc190b2tlbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiB0b2tlblRvU2VuZCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBoZWFydGJlYXQgbWVzc2FnZSBpZiB0aGUgc29ja2V0IGlzIGNvbm5lY3RlZC5cbiAgICAgKi9cbiAgICBhc3luYyBzZW5kSGVhcnRiZWF0KCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICghdGhpcy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZikge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubG9nKCd0cmFuc3BvcnQnLCAnaGVhcnRiZWF0IHRpbWVvdXQuIEF0dGVtcHRpbmcgdG8gcmUtZXN0YWJsaXNoIGNvbm5lY3Rpb24nKTtcbiAgICAgICAgICAgIChfYSA9IHRoaXMuY29ubikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsb3NlKFdTX0NMT1NFX05PUk1BTCwgJ2hlYXJiZWF0IHRpbWVvdXQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSB0aGlzLl9tYWtlUmVmKCk7XG4gICAgICAgIHRoaXMucHVzaCh7XG4gICAgICAgICAgICB0b3BpYzogJ3Bob2VuaXgnLFxuICAgICAgICAgICAgZXZlbnQ6ICdoZWFydGJlYXQnLFxuICAgICAgICAgICAgcGF5bG9hZDoge30sXG4gICAgICAgICAgICByZWY6IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZixcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0QXV0aCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGbHVzaGVzIHNlbmQgYnVmZmVyXG4gICAgICovXG4gICAgZmx1c2hTZW5kQnVmZmVyKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCgpICYmIHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKCkpO1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBuZXh0IG1lc3NhZ2UgcmVmLCBhY2NvdW50aW5nIGZvciBvdmVyZmxvd3NcbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9tYWtlUmVmKCkge1xuICAgICAgICBsZXQgbmV3UmVmID0gdGhpcy5yZWYgKyAxO1xuICAgICAgICBpZiAobmV3UmVmID09PSB0aGlzLnJlZikge1xuICAgICAgICAgICAgdGhpcy5yZWYgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWYgPSBuZXdSZWY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVmLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuc3Vic2NyaWJlIGZyb20gY2hhbm5lbHMgd2l0aCB0aGUgc3BlY2lmaWVkIHRvcGljLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgX2xlYXZlT3BlblRvcGljKHRvcGljKSB7XG4gICAgICAgIGxldCBkdXBDaGFubmVsID0gdGhpcy5jaGFubmVscy5maW5kKChjKSA9PiBjLnRvcGljID09PSB0b3BpYyAmJiAoYy5faXNKb2luZWQoKSB8fCBjLl9pc0pvaW5pbmcoKSkpO1xuICAgICAgICBpZiAoZHVwQ2hhbm5lbCkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ3RyYW5zcG9ydCcsIGBsZWF2aW5nIGR1cGxpY2F0ZSB0b3BpYyBcIiR7dG9waWN9XCJgKTtcbiAgICAgICAgICAgIGR1cENoYW5uZWwudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgc3Vic2NyaXB0aW9uIGZyb20gdGhlIHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjaGFubmVsIEFuIG9wZW4gc3Vic2NyaXB0aW9uLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgX3JlbW92ZShjaGFubmVsKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbHMgPSB0aGlzLmNoYW5uZWxzLmZpbHRlcigoYykgPT4gYy5fam9pblJlZigpICE9PSBjaGFubmVsLl9qb2luUmVmKCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGNvbm5lY3Rpb24gaGFuZGxlcnMuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBzZXR1cENvbm5lY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm4pIHtcbiAgICAgICAgICAgIHRoaXMuY29ubi5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgICAgIHRoaXMuY29ubi5vbm9wZW4gPSAoKSA9PiB0aGlzLl9vbkNvbm5PcGVuKCk7XG4gICAgICAgICAgICB0aGlzLmNvbm4ub25lcnJvciA9IChlcnJvcikgPT4gdGhpcy5fb25Db25uRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5jb25uLm9ubWVzc2FnZSA9IChldmVudCkgPT4gdGhpcy5fb25Db25uTWVzc2FnZShldmVudCk7XG4gICAgICAgICAgICB0aGlzLmNvbm4ub25jbG9zZSA9IChldmVudCkgPT4gdGhpcy5fb25Db25uQ2xvc2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfb25Db25uTWVzc2FnZShyYXdNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZGVjb2RlKHJhd01lc3NhZ2UuZGF0YSwgKG1zZykgPT4ge1xuICAgICAgICAgICAgbGV0IHsgdG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYgfSA9IG1zZztcbiAgICAgICAgICAgIGlmIChyZWYgJiYgcmVmID09PSB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2coJ3JlY2VpdmUnLCBgJHtwYXlsb2FkLnN0YXR1cyB8fCAnJ30gJHt0b3BpY30gJHtldmVudH0gJHsocmVmICYmICcoJyArIHJlZiArICcpJykgfHwgJyd9YCwgcGF5bG9hZCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWxzXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoY2hhbm5lbCkgPT4gY2hhbm5lbC5faXNNZW1iZXIodG9waWMpKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChjaGFubmVsKSA9PiBjaGFubmVsLl90cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYpKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZS5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2sobXNnKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgYXN5bmMgX29uQ29ubk9wZW4oKSB7XG4gICAgICAgIHRoaXMubG9nKCd0cmFuc3BvcnQnLCBgY29ubmVjdGVkIHRvICR7dGhpcy5lbmRwb2ludFVSTCgpfWApO1xuICAgICAgICB0aGlzLmZsdXNoU2VuZEJ1ZmZlcigpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnJlc2V0KCk7XG4gICAgICAgIGlmICghdGhpcy53b3JrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLmhlYXJ0YmVhdFRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnNlbmRIZWFydGJlYXQoKSwgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndvcmtlclVybCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCd3b3JrZXInLCBgc3RhcnRpbmcgd29ya2VyIGZvciBmcm9tICR7dGhpcy53b3JrZXJVcmx9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnd29ya2VyJywgYHN0YXJ0aW5nIGRlZmF1bHQgd29ya2VyYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBvYmplY3RVcmwgPSB0aGlzLl93b3JrZXJPYmplY3RVcmwodGhpcy53b3JrZXJVcmwpO1xuICAgICAgICAgICAgdGhpcy53b3JrZXJSZWYgPSBuZXcgV29ya2VyKG9iamVjdFVybCk7XG4gICAgICAgICAgICB0aGlzLndvcmtlclJlZi5vbmVycm9yID0gKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ3dvcmtlcicsICd3b3JrZXIgZXJyb3InLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB0aGlzLndvcmtlclJlZi50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLndvcmtlclJlZi5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gJ2tlZXBBbGl2ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kSGVhcnRiZWF0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMud29ya2VyUmVmLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBldmVudDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICBpbnRlcnZhbDogdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5vcGVuLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjaygpKTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9vbkNvbm5DbG9zZShldmVudCkge1xuICAgICAgICB0aGlzLmxvZygndHJhbnNwb3J0JywgJ2Nsb3NlJywgZXZlbnQpO1xuICAgICAgICB0aGlzLl90cmlnZ2VyQ2hhbkVycm9yKCk7XG4gICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgJiYgY2xlYXJJbnRlcnZhbCh0aGlzLmhlYXJ0YmVhdFRpbWVyKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5jbG9zZS5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soZXZlbnQpKTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9vbkNvbm5FcnJvcihlcnJvcikge1xuICAgICAgICB0aGlzLmxvZygndHJhbnNwb3J0JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuRXJyb3IoKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5lcnJvci5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soZXJyb3IpKTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF90cmlnZ2VyQ2hhbkVycm9yKCkge1xuICAgICAgICB0aGlzLmNoYW5uZWxzLmZvckVhY2goKGNoYW5uZWwpID0+IGNoYW5uZWwuX3RyaWdnZXIoQ0hBTk5FTF9FVkVOVFMuZXJyb3IpKTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9hcHBlbmRQYXJhbXModXJsLCBwYXJhbXMpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IHVybC5tYXRjaCgvXFw/LykgPyAnJicgOiAnPyc7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMpO1xuICAgICAgICByZXR1cm4gYCR7dXJsfSR7cHJlZml4fSR7cXVlcnl9YDtcbiAgICB9XG4gICAgX3dvcmtlck9iamVjdFVybCh1cmwpIHtcbiAgICAgICAgbGV0IHJlc3VsdF91cmw7XG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIHJlc3VsdF91cmwgPSB1cmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW1dPUktFUl9TQ1JJUFRdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0JyB9KTtcbiAgICAgICAgICAgIHJlc3VsdF91cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRfdXJsO1xuICAgIH1cbn1cbmNsYXNzIFdTV2ViU29ja2V0RHVtbXkge1xuICAgIGNvbnN0cnVjdG9yKGFkZHJlc3MsIF9wcm90b2NvbHMsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgdGhpcy5vbmNsb3NlID0gKCkgPT4geyB9O1xuICAgICAgICB0aGlzLm9uZXJyb3IgPSAoKSA9PiB7IH07XG4gICAgICAgIHRoaXMub25tZXNzYWdlID0gKCkgPT4geyB9O1xuICAgICAgICB0aGlzLm9ub3BlbiA9ICgpID0+IHsgfTtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nO1xuICAgICAgICB0aGlzLnNlbmQgPSAoKSA9PiB7IH07XG4gICAgICAgIHRoaXMudXJsID0gbnVsbDtcbiAgICAgICAgdGhpcy51cmwgPSBhZGRyZXNzO1xuICAgICAgICB0aGlzLmNsb3NlID0gb3B0aW9ucy5jbG9zZTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWFsdGltZUNsaWVudC5qcy5tYXAiLCIvKlxuICBUaGlzIGZpbGUgZHJhd3MgaGVhdmlseSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXgvYmxvYi9kMzQ0ZWMwYTczMmFiNGVlMjA0MjE1YjMxZGU2OWNmNGJlNzJlM2JmL2Fzc2V0cy9qcy9waG9lbml4L3ByZXNlbmNlLmpzXG4gIExpY2Vuc2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXgvYmxvYi9kMzQ0ZWMwYTczMmFiNGVlMjA0MjE1YjMxZGU2OWNmNGJlNzJlM2JmL0xJQ0VOU0UubWRcbiovXG5leHBvcnQgdmFyIFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFM7XG4oZnVuY3Rpb24gKFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFMpIHtcbiAgICBSRUFMVElNRV9QUkVTRU5DRV9MSVNURU5fRVZFTlRTW1wiU1lOQ1wiXSA9IFwic3luY1wiO1xuICAgIFJFQUxUSU1FX1BSRVNFTkNFX0xJU1RFTl9FVkVOVFNbXCJKT0lOXCJdID0gXCJqb2luXCI7XG4gICAgUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UU1tcIkxFQVZFXCJdID0gXCJsZWF2ZVwiO1xufSkoUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UUyB8fCAoUkVBTFRJTUVfUFJFU0VOQ0VfTElTVEVOX0VWRU5UUyA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFsdGltZVByZXNlbmNlIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgUHJlc2VuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY2hhbm5lbCAtIFRoZSBSZWFsdGltZUNoYW5uZWxcbiAgICAgKiBAcGFyYW0gb3B0cyAtIFRoZSBvcHRpb25zLFxuICAgICAqICAgICAgICBmb3IgZXhhbXBsZSBge2V2ZW50czoge3N0YXRlOiAnc3RhdGUnLCBkaWZmOiAnZGlmZid9fWBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsLCBvcHRzKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXTtcbiAgICAgICAgdGhpcy5qb2luUmVmID0gbnVsbDtcbiAgICAgICAgdGhpcy5jYWxsZXIgPSB7XG4gICAgICAgICAgICBvbkpvaW46ICgpID0+IHsgfSxcbiAgICAgICAgICAgIG9uTGVhdmU6ICgpID0+IHsgfSxcbiAgICAgICAgICAgIG9uU3luYzogKCkgPT4geyB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBldmVudHMgPSAob3B0cyA9PT0gbnVsbCB8fCBvcHRzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRzLmV2ZW50cykgfHwge1xuICAgICAgICAgICAgc3RhdGU6ICdwcmVzZW5jZV9zdGF0ZScsXG4gICAgICAgICAgICBkaWZmOiAncHJlc2VuY2VfZGlmZicsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2hhbm5lbC5fb24oZXZlbnRzLnN0YXRlLCB7fSwgKG5ld1N0YXRlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IG9uSm9pbiwgb25MZWF2ZSwgb25TeW5jIH0gPSB0aGlzLmNhbGxlcjtcbiAgICAgICAgICAgIHRoaXMuam9pblJlZiA9IHRoaXMuY2hhbm5lbC5fam9pblJlZigpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFJlYWx0aW1lUHJlc2VuY2Uuc3luY1N0YXRlKHRoaXMuc3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMuZm9yRWFjaCgoZGlmZikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBSZWFsdGltZVByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW107XG4gICAgICAgICAgICBvblN5bmMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2hhbm5lbC5fb24oZXZlbnRzLmRpZmYsIHt9LCAoZGlmZikgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBvbkpvaW4sIG9uTGVhdmUsIG9uU3luYyB9ID0gdGhpcy5jYWxsZXI7XG4gICAgICAgICAgICBpZiAodGhpcy5pblBlbmRpbmdTeW5jU3RhdGUoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0RpZmZzLnB1c2goZGlmZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gUmVhbHRpbWVQcmVzZW5jZS5zeW5jRGlmZih0aGlzLnN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpO1xuICAgICAgICAgICAgICAgIG9uU3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkpvaW4oKGtleSwgY3VycmVudFByZXNlbmNlcywgbmV3UHJlc2VuY2VzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwuX3RyaWdnZXIoJ3ByZXNlbmNlJywge1xuICAgICAgICAgICAgICAgIGV2ZW50OiAnam9pbicsXG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcmVzZW5jZXMsXG4gICAgICAgICAgICAgICAgbmV3UHJlc2VuY2VzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uTGVhdmUoKGtleSwgY3VycmVudFByZXNlbmNlcywgbGVmdFByZXNlbmNlcykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFubmVsLl90cmlnZ2VyKCdwcmVzZW5jZScsIHtcbiAgICAgICAgICAgICAgICBldmVudDogJ2xlYXZlJyxcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgY3VycmVudFByZXNlbmNlcyxcbiAgICAgICAgICAgICAgICBsZWZ0UHJlc2VuY2VzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uU3luYygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwuX3RyaWdnZXIoJ3ByZXNlbmNlJywgeyBldmVudDogJ3N5bmMnIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBzeW5jIHRoZSBsaXN0IG9mIHByZXNlbmNlcyBvbiB0aGUgc2VydmVyIHdpdGggdGhlXG4gICAgICogY2xpZW50J3Mgc3RhdGUuXG4gICAgICpcbiAgICAgKiBBbiBvcHRpb25hbCBgb25Kb2luYCBhbmQgYG9uTGVhdmVgIGNhbGxiYWNrIGNhbiBiZSBwcm92aWRlZCB0b1xuICAgICAqIHJlYWN0IHRvIGNoYW5nZXMgaW4gdGhlIGNsaWVudCdzIGxvY2FsIHByZXNlbmNlcyBhY3Jvc3NcbiAgICAgKiBkaXNjb25uZWN0cyBhbmQgcmVjb25uZWN0cyB3aXRoIHRoZSBzZXJ2ZXIuXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBzdGF0aWMgc3luY1N0YXRlKGN1cnJlbnRTdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuY2xvbmVEZWVwKGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkU3RhdGUgPSB0aGlzLnRyYW5zZm9ybVN0YXRlKG5ld1N0YXRlKTtcbiAgICAgICAgY29uc3Qgam9pbnMgPSB7fTtcbiAgICAgICAgY29uc3QgbGVhdmVzID0ge307XG4gICAgICAgIHRoaXMubWFwKHN0YXRlLCAoa2V5LCBwcmVzZW5jZXMpID0+IHtcbiAgICAgICAgICAgIGlmICghdHJhbnNmb3JtZWRTdGF0ZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgbGVhdmVzW2tleV0gPSBwcmVzZW5jZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1hcCh0cmFuc2Zvcm1lZFN0YXRlLCAoa2V5LCBuZXdQcmVzZW5jZXMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQcmVzZW5jZXMgPSBzdGF0ZVtrZXldO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRQcmVzZW5jZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQcmVzZW5jZVJlZnMgPSBuZXdQcmVzZW5jZXMubWFwKChtKSA9PiBtLnByZXNlbmNlX3JlZik7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VyUHJlc2VuY2VSZWZzID0gY3VycmVudFByZXNlbmNlcy5tYXAoKG0pID0+IG0ucHJlc2VuY2VfcmVmKTtcbiAgICAgICAgICAgICAgICBjb25zdCBqb2luZWRQcmVzZW5jZXMgPSBuZXdQcmVzZW5jZXMuZmlsdGVyKChtKSA9PiBjdXJQcmVzZW5jZVJlZnMuaW5kZXhPZihtLnByZXNlbmNlX3JlZikgPCAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0UHJlc2VuY2VzID0gY3VycmVudFByZXNlbmNlcy5maWx0ZXIoKG0pID0+IG5ld1ByZXNlbmNlUmVmcy5pbmRleE9mKG0ucHJlc2VuY2VfcmVmKSA8IDApO1xuICAgICAgICAgICAgICAgIGlmIChqb2luZWRQcmVzZW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBqb2luc1trZXldID0gam9pbmVkUHJlc2VuY2VzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGVmdFByZXNlbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlYXZlc1trZXldID0gbGVmdFByZXNlbmNlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBqb2luc1trZXldID0gbmV3UHJlc2VuY2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3luY0RpZmYoc3RhdGUsIHsgam9pbnMsIGxlYXZlcyB9LCBvbkpvaW4sIG9uTGVhdmUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHN5bmMgYSBkaWZmIG9mIHByZXNlbmNlIGpvaW4gYW5kIGxlYXZlIGV2ZW50cyBmcm9tIHRoZVxuICAgICAqIHNlcnZlciwgYXMgdGhleSBoYXBwZW4uXG4gICAgICpcbiAgICAgKiBMaWtlIGBzeW5jU3RhdGVgLCBgc3luY0RpZmZgIGFjY2VwdHMgb3B0aW9uYWwgYG9uSm9pbmAgYW5kXG4gICAgICogYG9uTGVhdmVgIGNhbGxiYWNrcyB0byByZWFjdCB0byBhIHVzZXIgam9pbmluZyBvciBsZWF2aW5nIGZyb20gYVxuICAgICAqIGRldmljZS5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHN0YXRpYyBzeW5jRGlmZihzdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKSB7XG4gICAgICAgIGNvbnN0IHsgam9pbnMsIGxlYXZlcyB9ID0ge1xuICAgICAgICAgICAgam9pbnM6IHRoaXMudHJhbnNmb3JtU3RhdGUoZGlmZi5qb2lucyksXG4gICAgICAgICAgICBsZWF2ZXM6IHRoaXMudHJhbnNmb3JtU3RhdGUoZGlmZi5sZWF2ZXMpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoIW9uSm9pbikge1xuICAgICAgICAgICAgb25Kb2luID0gKCkgPT4geyB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghb25MZWF2ZSkge1xuICAgICAgICAgICAgb25MZWF2ZSA9ICgpID0+IHsgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcChqb2lucywgKGtleSwgbmV3UHJlc2VuY2VzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UHJlc2VuY2VzID0gKF9hID0gc3RhdGVba2V5XSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW107XG4gICAgICAgICAgICBzdGF0ZVtrZXldID0gdGhpcy5jbG9uZURlZXAobmV3UHJlc2VuY2VzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UHJlc2VuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBqb2luZWRQcmVzZW5jZVJlZnMgPSBzdGF0ZVtrZXldLm1hcCgobSkgPT4gbS5wcmVzZW5jZV9yZWYpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1clByZXNlbmNlcyA9IGN1cnJlbnRQcmVzZW5jZXMuZmlsdGVyKChtKSA9PiBqb2luZWRQcmVzZW5jZVJlZnMuaW5kZXhPZihtLnByZXNlbmNlX3JlZikgPCAwKTtcbiAgICAgICAgICAgICAgICBzdGF0ZVtrZXldLnVuc2hpZnQoLi4uY3VyUHJlc2VuY2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uSm9pbihrZXksIGN1cnJlbnRQcmVzZW5jZXMsIG5ld1ByZXNlbmNlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm1hcChsZWF2ZXMsIChrZXksIGxlZnRQcmVzZW5jZXMpID0+IHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50UHJlc2VuY2VzID0gc3RhdGVba2V5XTtcbiAgICAgICAgICAgIGlmICghY3VycmVudFByZXNlbmNlcylcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBwcmVzZW5jZVJlZnNUb1JlbW92ZSA9IGxlZnRQcmVzZW5jZXMubWFwKChtKSA9PiBtLnByZXNlbmNlX3JlZik7XG4gICAgICAgICAgICBjdXJyZW50UHJlc2VuY2VzID0gY3VycmVudFByZXNlbmNlcy5maWx0ZXIoKG0pID0+IHByZXNlbmNlUmVmc1RvUmVtb3ZlLmluZGV4T2YobS5wcmVzZW5jZV9yZWYpIDwgMCk7XG4gICAgICAgICAgICBzdGF0ZVtrZXldID0gY3VycmVudFByZXNlbmNlcztcbiAgICAgICAgICAgIG9uTGVhdmUoa2V5LCBjdXJyZW50UHJlc2VuY2VzLCBsZWZ0UHJlc2VuY2VzKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UHJlc2VuY2VzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICBkZWxldGUgc3RhdGVba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIHN0YXRpYyBtYXAob2JqLCBmdW5jKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLm1hcCgoa2V5KSA9PiBmdW5jKGtleSwgb2JqW2tleV0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlICdtZXRhcycga2V5XG4gICAgICogQ2hhbmdlICdwaHhfcmVmJyB0byAncHJlc2VuY2VfcmVmJ1xuICAgICAqIFJlbW92ZSAncGh4X3JlZicgYW5kICdwaHhfcmVmX3ByZXYnXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHJldHVybnMge1xuICAgICAqICBhYmMxMjM6IFtcbiAgICAgKiAgICB7IHByZXNlbmNlX3JlZjogJzInLCB1c2VyX2lkOiAxIH0sXG4gICAgICogICAgeyBwcmVzZW5jZV9yZWY6ICczJywgdXNlcl9pZDogMiB9XG4gICAgICogIF1cbiAgICAgKiB9XG4gICAgICogUmVhbHRpbWVQcmVzZW5jZS50cmFuc2Zvcm1TdGF0ZSh7XG4gICAgICogIGFiYzEyMzoge1xuICAgICAqICAgIG1ldGFzOiBbXG4gICAgICogICAgICB7IHBoeF9yZWY6ICcyJywgcGh4X3JlZl9wcmV2OiAnMScgdXNlcl9pZDogMSB9LFxuICAgICAqICAgICAgeyBwaHhfcmVmOiAnMycsIHVzZXJfaWQ6IDIgfVxuICAgICAqICAgIF1cbiAgICAgKiAgfVxuICAgICAqIH0pXG4gICAgICpcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhbnNmb3JtU3RhdGUoc3RhdGUpIHtcbiAgICAgICAgc3RhdGUgPSB0aGlzLmNsb25lRGVlcChzdGF0ZSk7XG4gICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzdGF0ZSkucmVkdWNlKChuZXdTdGF0ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcmVzZW5jZXMgPSBzdGF0ZVtrZXldO1xuICAgICAgICAgICAgaWYgKCdtZXRhcycgaW4gcHJlc2VuY2VzKSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGVba2V5XSA9IHByZXNlbmNlcy5tZXRhcy5tYXAoKHByZXNlbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHByZXNlbmNlWydwcmVzZW5jZV9yZWYnXSA9IHByZXNlbmNlWydwaHhfcmVmJ107XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBwcmVzZW5jZVsncGh4X3JlZiddO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcHJlc2VuY2VbJ3BoeF9yZWZfcHJldiddO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJlc2VuY2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVtrZXldID0gcHJlc2VuY2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBzdGF0aWMgY2xvbmVEZWVwKG9iaikge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIG9uSm9pbihjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNhbGxlci5vbkpvaW4gPSBjYWxsYmFjaztcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIG9uTGVhdmUoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsZXIub25MZWF2ZSA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgb25TeW5jKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FsbGVyLm9uU3luYyA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICAvKiogQGludGVybmFsICovXG4gICAgaW5QZW5kaW5nU3luY1N0YXRlKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuam9pblJlZiB8fCB0aGlzLmpvaW5SZWYgIT09IHRoaXMuY2hhbm5lbC5fam9pblJlZigpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlYWx0aW1lUHJlc2VuY2UuanMubWFwIiwiaW1wb3J0IFJlYWx0aW1lQ2xpZW50IGZyb20gJy4vUmVhbHRpbWVDbGllbnQnO1xuaW1wb3J0IFJlYWx0aW1lQ2hhbm5lbCwgeyBSRUFMVElNRV9MSVNURU5fVFlQRVMsIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5ULCBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTLCBSRUFMVElNRV9DSEFOTkVMX1NUQVRFUywgfSBmcm9tICcuL1JlYWx0aW1lQ2hhbm5lbCc7XG5pbXBvcnQgUmVhbHRpbWVQcmVzZW5jZSwgeyBSRUFMVElNRV9QUkVTRU5DRV9MSVNURU5fRVZFTlRTLCB9IGZyb20gJy4vUmVhbHRpbWVQcmVzZW5jZSc7XG5leHBvcnQgeyBSZWFsdGltZVByZXNlbmNlLCBSZWFsdGltZUNoYW5uZWwsIFJlYWx0aW1lQ2xpZW50LCBSRUFMVElNRV9MSVNURU5fVFlQRVMsIFJFQUxUSU1FX1BPU1RHUkVTX0NIQU5HRVNfTElTVEVOX0VWRU5ULCBSRUFMVElNRV9QUkVTRU5DRV9MSVNURU5fRVZFTlRTLCBSRUFMVElNRV9TVUJTQ1JJQkVfU1RBVEVTLCBSRUFMVElNRV9DSEFOTkVMX1NUQVRFUywgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfSEVBREVSUyA9IHsgJ1gtQ2xpZW50LUluZm8nOiBgcmVhbHRpbWUtanMvJHt2ZXJzaW9ufWAgfTtcbmV4cG9ydCBjb25zdCBWU04gPSAnMS4wLjAnO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfVElNRU9VVCA9IDEwMDAwO1xuZXhwb3J0IGNvbnN0IFdTX0NMT1NFX05PUk1BTCA9IDEwMDA7XG5leHBvcnQgdmFyIFNPQ0tFVF9TVEFURVM7XG4oZnVuY3Rpb24gKFNPQ0tFVF9TVEFURVMpIHtcbiAgICBTT0NLRVRfU1RBVEVTW1NPQ0tFVF9TVEFURVNbXCJjb25uZWN0aW5nXCJdID0gMF0gPSBcImNvbm5lY3RpbmdcIjtcbiAgICBTT0NLRVRfU1RBVEVTW1NPQ0tFVF9TVEFURVNbXCJvcGVuXCJdID0gMV0gPSBcIm9wZW5cIjtcbiAgICBTT0NLRVRfU1RBVEVTW1NPQ0tFVF9TVEFURVNbXCJjbG9zaW5nXCJdID0gMl0gPSBcImNsb3NpbmdcIjtcbiAgICBTT0NLRVRfU1RBVEVTW1NPQ0tFVF9TVEFURVNbXCJjbG9zZWRcIl0gPSAzXSA9IFwiY2xvc2VkXCI7XG59KShTT0NLRVRfU1RBVEVTIHx8IChTT0NLRVRfU1RBVEVTID0ge30pKTtcbmV4cG9ydCB2YXIgQ0hBTk5FTF9TVEFURVM7XG4oZnVuY3Rpb24gKENIQU5ORUxfU1RBVEVTKSB7XG4gICAgQ0hBTk5FTF9TVEFURVNbXCJjbG9zZWRcIl0gPSBcImNsb3NlZFwiO1xuICAgIENIQU5ORUxfU1RBVEVTW1wiZXJyb3JlZFwiXSA9IFwiZXJyb3JlZFwiO1xuICAgIENIQU5ORUxfU1RBVEVTW1wiam9pbmVkXCJdID0gXCJqb2luZWRcIjtcbiAgICBDSEFOTkVMX1NUQVRFU1tcImpvaW5pbmdcIl0gPSBcImpvaW5pbmdcIjtcbiAgICBDSEFOTkVMX1NUQVRFU1tcImxlYXZpbmdcIl0gPSBcImxlYXZpbmdcIjtcbn0pKENIQU5ORUxfU1RBVEVTIHx8IChDSEFOTkVMX1NUQVRFUyA9IHt9KSk7XG5leHBvcnQgdmFyIENIQU5ORUxfRVZFTlRTO1xuKGZ1bmN0aW9uIChDSEFOTkVMX0VWRU5UUykge1xuICAgIENIQU5ORUxfRVZFTlRTW1wiY2xvc2VcIl0gPSBcInBoeF9jbG9zZVwiO1xuICAgIENIQU5ORUxfRVZFTlRTW1wiZXJyb3JcIl0gPSBcInBoeF9lcnJvclwiO1xuICAgIENIQU5ORUxfRVZFTlRTW1wiam9pblwiXSA9IFwicGh4X2pvaW5cIjtcbiAgICBDSEFOTkVMX0VWRU5UU1tcInJlcGx5XCJdID0gXCJwaHhfcmVwbHlcIjtcbiAgICBDSEFOTkVMX0VWRU5UU1tcImxlYXZlXCJdID0gXCJwaHhfbGVhdmVcIjtcbiAgICBDSEFOTkVMX0VWRU5UU1tcImFjY2Vzc190b2tlblwiXSA9IFwiYWNjZXNzX3Rva2VuXCI7XG59KShDSEFOTkVMX0VWRU5UUyB8fCAoQ0hBTk5FTF9FVkVOVFMgPSB7fSkpO1xuZXhwb3J0IHZhciBUUkFOU1BPUlRTO1xuKGZ1bmN0aW9uIChUUkFOU1BPUlRTKSB7XG4gICAgVFJBTlNQT1JUU1tcIndlYnNvY2tldFwiXSA9IFwid2Vic29ja2V0XCI7XG59KShUUkFOU1BPUlRTIHx8IChUUkFOU1BPUlRTID0ge30pKTtcbmV4cG9ydCB2YXIgQ09OTkVDVElPTl9TVEFURTtcbihmdW5jdGlvbiAoQ09OTkVDVElPTl9TVEFURSkge1xuICAgIENPTk5FQ1RJT05fU1RBVEVbXCJDb25uZWN0aW5nXCJdID0gXCJjb25uZWN0aW5nXCI7XG4gICAgQ09OTkVDVElPTl9TVEFURVtcIk9wZW5cIl0gPSBcIm9wZW5cIjtcbiAgICBDT05ORUNUSU9OX1NUQVRFW1wiQ2xvc2luZ1wiXSA9IFwiY2xvc2luZ1wiO1xuICAgIENPTk5FQ1RJT05fU1RBVEVbXCJDbG9zZWRcIl0gPSBcImNsb3NlZFwiO1xufSkoQ09OTkVDVElPTl9TVEFURSB8fCAoQ09OTkVDVElPTl9TVEFURSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwiaW1wb3J0IHsgREVGQVVMVF9USU1FT1VUIH0gZnJvbSAnLi4vbGliL2NvbnN0YW50cyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdXNoIHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgUHVzaFxuICAgICAqXG4gICAgICogQHBhcmFtIGNoYW5uZWwgVGhlIENoYW5uZWxcbiAgICAgKiBAcGFyYW0gZXZlbnQgVGhlIGV2ZW50LCBmb3IgZXhhbXBsZSBgXCJwaHhfam9pblwiYFxuICAgICAqIEBwYXJhbSBwYXlsb2FkIFRoZSBwYXlsb2FkLCBmb3IgZXhhbXBsZSBge3VzZXJfaWQ6IDEyM31gXG4gICAgICogQHBhcmFtIHRpbWVvdXQgVGhlIHB1c2ggdGltZW91dCBpbiBtaWxsaXNlY29uZHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihjaGFubmVsLCBldmVudCwgcGF5bG9hZCA9IHt9LCB0aW1lb3V0ID0gREVGQVVMVF9USU1FT1VUKSB7XG4gICAgICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XG4gICAgICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICAgICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZDtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICAgICAgdGhpcy5zZW50ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGltZW91dFRpbWVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnJlZiA9ICcnO1xuICAgICAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGw7XG4gICAgICAgIHRoaXMucmVjSG9va3MgPSBbXTtcbiAgICAgICAgdGhpcy5yZWZFdmVudCA9IG51bGw7XG4gICAgfVxuICAgIHJlc2VuZCh0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuX2NhbmNlbFJlZkV2ZW50KCk7XG4gICAgICAgIHRoaXMucmVmID0gJyc7XG4gICAgICAgIHRoaXMucmVmRXZlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VudCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbmQoKTtcbiAgICB9XG4gICAgc2VuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc1JlY2VpdmVkKCd0aW1lb3V0JykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXJ0VGltZW91dCgpO1xuICAgICAgICB0aGlzLnNlbnQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNoYW5uZWwuc29ja2V0LnB1c2goe1xuICAgICAgICAgICAgdG9waWM6IHRoaXMuY2hhbm5lbC50b3BpYyxcbiAgICAgICAgICAgIGV2ZW50OiB0aGlzLmV2ZW50LFxuICAgICAgICAgICAgcGF5bG9hZDogdGhpcy5wYXlsb2FkLFxuICAgICAgICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgICAgICAgIGpvaW5fcmVmOiB0aGlzLmNoYW5uZWwuX2pvaW5SZWYoKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwZGF0ZVBheWxvYWQocGF5bG9hZCkge1xuICAgICAgICB0aGlzLnBheWxvYWQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGF5bG9hZCksIHBheWxvYWQpO1xuICAgIH1cbiAgICByZWNlaXZlKHN0YXR1cywgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodGhpcy5faGFzUmVjZWl2ZWQoc3RhdHVzKSkge1xuICAgICAgICAgICAgY2FsbGJhY2soKF9hID0gdGhpcy5yZWNlaXZlZFJlc3ApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWNIb29rcy5wdXNoKHsgc3RhdHVzLCBjYWxsYmFjayB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHN0YXJ0VGltZW91dCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dFRpbWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWYgPSB0aGlzLmNoYW5uZWwuc29ja2V0Ll9tYWtlUmVmKCk7XG4gICAgICAgIHRoaXMucmVmRXZlbnQgPSB0aGlzLmNoYW5uZWwuX3JlcGx5RXZlbnROYW1lKHRoaXMucmVmKTtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAocGF5bG9hZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY2FuY2VsUmVmRXZlbnQoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbmNlbFRpbWVvdXQoKTtcbiAgICAgICAgICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gcGF5bG9hZDtcbiAgICAgICAgICAgIHRoaXMuX21hdGNoUmVjZWl2ZShwYXlsb2FkKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jaGFubmVsLl9vbih0aGlzLnJlZkV2ZW50LCB7fSwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLnRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd0aW1lb3V0Jywge30pO1xuICAgICAgICB9LCB0aGlzLnRpbWVvdXQpO1xuICAgIH1cbiAgICB0cmlnZ2VyKHN0YXR1cywgcmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHRoaXMucmVmRXZlbnQpXG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwuX3RyaWdnZXIodGhpcy5yZWZFdmVudCwgeyBzdGF0dXMsIHJlc3BvbnNlIH0pO1xuICAgIH1cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9jYW5jZWxSZWZFdmVudCgpO1xuICAgICAgICB0aGlzLl9jYW5jZWxUaW1lb3V0KCk7XG4gICAgfVxuICAgIF9jYW5jZWxSZWZFdmVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnJlZkV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFubmVsLl9vZmYodGhpcy5yZWZFdmVudCwge30pO1xuICAgIH1cbiAgICBfY2FuY2VsVGltZW91dCgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dFRpbWVyKTtcbiAgICAgICAgdGhpcy50aW1lb3V0VGltZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIF9tYXRjaFJlY2VpdmUoeyBzdGF0dXMsIHJlc3BvbnNlLCB9KSB7XG4gICAgICAgIHRoaXMucmVjSG9va3NcbiAgICAgICAgICAgIC5maWx0ZXIoKGgpID0+IGguc3RhdHVzID09PSBzdGF0dXMpXG4gICAgICAgICAgICAuZm9yRWFjaCgoaCkgPT4gaC5jYWxsYmFjayhyZXNwb25zZSkpO1xuICAgIH1cbiAgICBfaGFzUmVjZWl2ZWQoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlY2VpdmVkUmVzcCAmJiB0aGlzLnJlY2VpdmVkUmVzcC5zdGF0dXMgPT09IHN0YXR1cztcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdXNoLmpzLm1hcCIsIi8vIFRoaXMgZmlsZSBkcmF3cyBoZWF2aWx5IGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Bob2VuaXhmcmFtZXdvcmsvcGhvZW5peC9jb21taXQvY2YwOThlOWNmN2E0NGVlNjQ3OWQzMWQ5MTFhOTdkM2M3NDMwYzZmZVxuLy8gTGljZW5zZTogaHR0cHM6Ly9naXRodWIuY29tL3Bob2VuaXhmcmFtZXdvcmsvcGhvZW5peC9ibG9iL21hc3Rlci9MSUNFTlNFLm1kXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJpYWxpemVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5IRUFERVJfTEVOR1RIID0gMTtcbiAgICB9XG4gICAgZGVjb2RlKHJhd1BheWxvYWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChyYXdQYXlsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuX2JpbmFyeURlY29kZShyYXdQYXlsb2FkKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiByYXdQYXlsb2FkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKEpTT04ucGFyc2UocmF3UGF5bG9hZCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxsYmFjayh7fSk7XG4gICAgfVxuICAgIF9iaW5hcnlEZWNvZGUoYnVmZmVyKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgICAgICAgY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2Rlcik7XG4gICAgfVxuICAgIF9kZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKSB7XG4gICAgICAgIGNvbnN0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSk7XG4gICAgICAgIGNvbnN0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoMik7XG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyAyO1xuICAgICAgICBjb25zdCB0b3BpYyA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHRvcGljU2l6ZSkpO1xuICAgICAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemU7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgZXZlbnRTaXplKSk7XG4gICAgICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZTtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpKSk7XG4gICAgICAgIHJldHVybiB7IHJlZjogbnVsbCwgdG9waWM6IHRvcGljLCBldmVudDogZXZlbnQsIHBheWxvYWQ6IGRhdGEgfTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXJpYWxpemVyLmpzLm1hcCIsIi8qKlxuICogQ3JlYXRlcyBhIHRpbWVyIHRoYXQgYWNjZXB0cyBhIGB0aW1lckNhbGNgIGZ1bmN0aW9uIHRvIHBlcmZvcm0gY2FsY3VsYXRlZCB0aW1lb3V0IHJldHJpZXMsIHN1Y2ggYXMgZXhwb25lbnRpYWwgYmFja29mZi5cbiAqXG4gKiBAZXhhbXBsZVxuICogICAgbGV0IHJlY29ubmVjdFRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHRoaXMuY29ubmVjdCgpLCBmdW5jdGlvbih0cmllcyl7XG4gKiAgICAgIHJldHVybiBbMTAwMCwgNTAwMCwgMTAwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAqICAgIH0pXG4gKiAgICByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciAxMDAwXG4gKiAgICByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciA1MDAwXG4gKiAgICByZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gKiAgICByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciAxMDAwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyIHtcbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgdGltZXJDYWxjKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy50aW1lckNhbGMgPSB0aW1lckNhbGM7XG4gICAgICAgIHRoaXMudGltZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudHJpZXMgPSAwO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMudGltZXJDYWxjID0gdGltZXJDYWxjO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy50cmllcyA9IDA7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICB9XG4gICAgLy8gQ2FuY2VscyBhbnkgcHJldmlvdXMgc2NoZWR1bGVUaW1lb3V0IGFuZCBzY2hlZHVsZXMgY2FsbGJhY2tcbiAgICBzY2hlZHVsZVRpbWVvdXQoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50cmllcyA9IHRoaXMudHJpZXMgKyAxO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgICB9LCB0aGlzLnRpbWVyQ2FsYyh0aGlzLnRyaWVzICsgMSkpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRpbWVyLmpzLm1hcCIsIi8qKlxuICogSGVscGVycyB0byBjb252ZXJ0IHRoZSBjaGFuZ2UgUGF5bG9hZCBpbnRvIG5hdGl2ZSBKUyB0eXBlcy5cbiAqL1xuLy8gQWRhcHRlZCBmcm9tIGVwZ3NxbCAoc3JjL2VwZ3NxbF9iaW5hcnkuZXJsKSwgdGhpcyBtb2R1bGUgbGljZW5zZWQgdW5kZXJcbi8vIDMtY2xhdXNlIEJTRCBmb3VuZCBoZXJlOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZXBnc3FsL2VwZ3NxbC9kZXZlbC9MSUNFTlNFXG5leHBvcnQgdmFyIFBvc3RncmVzVHlwZXM7XG4oZnVuY3Rpb24gKFBvc3RncmVzVHlwZXMpIHtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiYWJzdGltZVwiXSA9IFwiYWJzdGltZVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJib29sXCJdID0gXCJib29sXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImRhdGVcIl0gPSBcImRhdGVcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiZGF0ZXJhbmdlXCJdID0gXCJkYXRlcmFuZ2VcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiZmxvYXQ0XCJdID0gXCJmbG9hdDRcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiZmxvYXQ4XCJdID0gXCJmbG9hdDhcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiaW50MlwiXSA9IFwiaW50MlwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJpbnQ0XCJdID0gXCJpbnQ0XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImludDRyYW5nZVwiXSA9IFwiaW50NHJhbmdlXCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcImludDhcIl0gPSBcImludDhcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wiaW50OHJhbmdlXCJdID0gXCJpbnQ4cmFuZ2VcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wianNvblwiXSA9IFwianNvblwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJqc29uYlwiXSA9IFwianNvbmJcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wibW9uZXlcIl0gPSBcIm1vbmV5XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcIm51bWVyaWNcIl0gPSBcIm51bWVyaWNcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wib2lkXCJdID0gXCJvaWRcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1wicmVsdGltZVwiXSA9IFwicmVsdGltZVwiO1xuICAgIFBvc3RncmVzVHlwZXNbXCJ0ZXh0XCJdID0gXCJ0ZXh0XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInRpbWVcIl0gPSBcInRpbWVcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1widGltZXN0YW1wXCJdID0gXCJ0aW1lc3RhbXBcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1widGltZXN0YW1wdHpcIl0gPSBcInRpbWVzdGFtcHR6XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInRpbWV0elwiXSA9IFwidGltZXR6XCI7XG4gICAgUG9zdGdyZXNUeXBlc1tcInRzcmFuZ2VcIl0gPSBcInRzcmFuZ2VcIjtcbiAgICBQb3N0Z3Jlc1R5cGVzW1widHN0enJhbmdlXCJdID0gXCJ0c3R6cmFuZ2VcIjtcbn0pKFBvc3RncmVzVHlwZXMgfHwgKFBvc3RncmVzVHlwZXMgPSB7fSkpO1xuLyoqXG4gKiBUYWtlcyBhbiBhcnJheSBvZiBjb2x1bW5zIGFuZCBhbiBvYmplY3Qgb2Ygc3RyaW5nIHZhbHVlcyB0aGVuIGNvbnZlcnRzIGVhY2ggc3RyaW5nIHZhbHVlXG4gKiB0byBpdHMgbWFwcGVkIHR5cGUuXG4gKlxuICogQHBhcmFtIHt7bmFtZTogU3RyaW5nLCB0eXBlOiBTdHJpbmd9W119IGNvbHVtbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBtYXAgb2YgdmFyaW91cyBvcHRpb25zIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gdGhlIG1hcHBlclxuICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5za2lwVHlwZXMgVGhlIGFycmF5IG9mIHR5cGVzIHRoYXQgc2hvdWxkIG5vdCBiZSBjb252ZXJ0ZWRcbiAqXG4gKiBAZXhhbXBsZSBjb252ZXJ0Q2hhbmdlRGF0YShbe25hbWU6ICdmaXJzdF9uYW1lJywgdHlwZTogJ3RleHQnfSwge25hbWU6ICdhZ2UnLCB0eXBlOiAnaW50NCd9XSwge2ZpcnN0X25hbWU6ICdQYXVsJywgYWdlOiczMyd9LCB7fSlcbiAqIC8vPT57IGZpcnN0X25hbWU6ICdQYXVsJywgYWdlOiAzMyB9XG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0Q2hhbmdlRGF0YSA9IChjb2x1bW5zLCByZWNvcmQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCBza2lwVHlwZXMgPSAoX2EgPSBvcHRpb25zLnNraXBUeXBlcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW107XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHJlY29yZCkucmVkdWNlKChhY2MsIHJlY19rZXkpID0+IHtcbiAgICAgICAgYWNjW3JlY19rZXldID0gY29udmVydENvbHVtbihyZWNfa2V5LCBjb2x1bW5zLCByZWNvcmQsIHNraXBUeXBlcyk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbi8qKlxuICogQ29udmVydHMgdGhlIHZhbHVlIG9mIGFuIGluZGl2aWR1YWwgY29sdW1uLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb2x1bW5OYW1lIFRoZSBjb2x1bW4gdGhhdCB5b3Ugd2FudCB0byBjb252ZXJ0XG4gKiBAcGFyYW0ge3tuYW1lOiBTdHJpbmcsIHR5cGU6IFN0cmluZ31bXX0gY29sdW1ucyBBbGwgb2YgdGhlIGNvbHVtbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWNvcmQgVGhlIG1hcCBvZiBzdHJpbmcgdmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSBza2lwVHlwZXMgQW4gYXJyYXkgb2YgdHlwZXMgdGhhdCBzaG91bGQgbm90IGJlIGNvbnZlcnRlZFxuICogQHJldHVybiB7b2JqZWN0fSBVc2VsZXNzIGluZm9ybWF0aW9uXG4gKlxuICogQGV4YW1wbGUgY29udmVydENvbHVtbignYWdlJywgW3tuYW1lOiAnZmlyc3RfbmFtZScsIHR5cGU6ICd0ZXh0J30sIHtuYW1lOiAnYWdlJywgdHlwZTogJ2ludDQnfV0sIHtmaXJzdF9uYW1lOiAnUGF1bCcsIGFnZTogJzMzJ30sIFtdKVxuICogLy89PiAzM1xuICogQGV4YW1wbGUgY29udmVydENvbHVtbignYWdlJywgW3tuYW1lOiAnZmlyc3RfbmFtZScsIHR5cGU6ICd0ZXh0J30sIHtuYW1lOiAnYWdlJywgdHlwZTogJ2ludDQnfV0sIHtmaXJzdF9uYW1lOiAnUGF1bCcsIGFnZTogJzMzJ30sIFsnaW50NCddKVxuICogLy89PiBcIjMzXCJcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRDb2x1bW4gPSAoY29sdW1uTmFtZSwgY29sdW1ucywgcmVjb3JkLCBza2lwVHlwZXMpID0+IHtcbiAgICBjb25zdCBjb2x1bW4gPSBjb2x1bW5zLmZpbmQoKHgpID0+IHgubmFtZSA9PT0gY29sdW1uTmFtZSk7XG4gICAgY29uc3QgY29sVHlwZSA9IGNvbHVtbiA9PT0gbnVsbCB8fCBjb2x1bW4gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbHVtbi50eXBlO1xuICAgIGNvbnN0IHZhbHVlID0gcmVjb3JkW2NvbHVtbk5hbWVdO1xuICAgIGlmIChjb2xUeXBlICYmICFza2lwVHlwZXMuaW5jbHVkZXMoY29sVHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGNvbnZlcnRDZWxsKGNvbFR5cGUsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vb3AodmFsdWUpO1xufTtcbi8qKlxuICogSWYgdGhlIHZhbHVlIG9mIHRoZSBjZWxsIGlzIGBudWxsYCwgcmV0dXJucyBudWxsLlxuICogT3RoZXJ3aXNlIGNvbnZlcnRzIHRoZSBzdHJpbmcgdmFsdWUgdG8gdGhlIGNvcnJlY3QgdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIEEgcG9zdGdyZXMgY29sdW1uIHR5cGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBUaGUgY2VsbCB2YWx1ZVxuICpcbiAqIEBleGFtcGxlIGNvbnZlcnRDZWxsKCdib29sJywgJ3QnKVxuICogLy89PiB0cnVlXG4gKiBAZXhhbXBsZSBjb252ZXJ0Q2VsbCgnaW50OCcsICcxMCcpXG4gKiAvLz0+IDEwXG4gKiBAZXhhbXBsZSBjb252ZXJ0Q2VsbCgnX2ludDQnLCAnezEsMiwzLDR9JylcbiAqIC8vPT4gWzEsMiwzLDRdXG4gKi9cbmV4cG9ydCBjb25zdCBjb252ZXJ0Q2VsbCA9ICh0eXBlLCB2YWx1ZSkgPT4ge1xuICAgIC8vIGlmIGRhdGEgdHlwZSBpcyBhbiBhcnJheVxuICAgIGlmICh0eXBlLmNoYXJBdCgwKSA9PT0gJ18nKSB7XG4gICAgICAgIGNvbnN0IGRhdGFUeXBlID0gdHlwZS5zbGljZSgxLCB0eXBlLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiB0b0FycmF5KHZhbHVlLCBkYXRhVHlwZSk7XG4gICAgfVxuICAgIC8vIElmIG5vdCBudWxsLCBjb252ZXJ0IHRvIGNvcnJlY3QgdHlwZS5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmJvb2w6XG4gICAgICAgICAgICByZXR1cm4gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmZsb2F0NDpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmZsb2F0ODpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmludDI6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5pbnQ0OlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuaW50ODpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLm51bWVyaWM6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5vaWQ6XG4gICAgICAgICAgICByZXR1cm4gdG9OdW1iZXIodmFsdWUpO1xuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuanNvbjpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLmpzb25iOlxuICAgICAgICAgICAgcmV0dXJuIHRvSnNvbih2YWx1ZSk7XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy50aW1lc3RhbXA6XG4gICAgICAgICAgICByZXR1cm4gdG9UaW1lc3RhbXBTdHJpbmcodmFsdWUpOyAvLyBGb3JtYXQgdG8gYmUgY29uc2lzdGVudCB3aXRoIFBvc3RnUkVTVFxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuYWJzdGltZTogLy8gVG8gYWxsb3cgdXNlcnMgdG8gY2FzdCBpdCBiYXNlZCBvbiBUaW1lem9uZVxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuZGF0ZTogLy8gVG8gYWxsb3cgdXNlcnMgdG8gY2FzdCBpdCBiYXNlZCBvbiBUaW1lem9uZVxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuZGF0ZXJhbmdlOlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuaW50NHJhbmdlOlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMuaW50OHJhbmdlOlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMubW9uZXk6XG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy5yZWx0aW1lOiAvLyBUbyBhbGxvdyB1c2VycyB0byBjYXN0IGl0IGJhc2VkIG9uIFRpbWV6b25lXG4gICAgICAgIGNhc2UgUG9zdGdyZXNUeXBlcy50ZXh0OlxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMudGltZTogLy8gVG8gYWxsb3cgdXNlcnMgdG8gY2FzdCBpdCBiYXNlZCBvbiBUaW1lem9uZVxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMudGltZXN0YW1wdHo6IC8vIFRvIGFsbG93IHVzZXJzIHRvIGNhc3QgaXQgYmFzZWQgb24gVGltZXpvbmVcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnRpbWV0ejogLy8gVG8gYWxsb3cgdXNlcnMgdG8gY2FzdCBpdCBiYXNlZCBvbiBUaW1lem9uZVxuICAgICAgICBjYXNlIFBvc3RncmVzVHlwZXMudHNyYW5nZTpcbiAgICAgICAgY2FzZSBQb3N0Z3Jlc1R5cGVzLnRzdHpyYW5nZTpcbiAgICAgICAgICAgIHJldHVybiBub29wKHZhbHVlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgdmFsdWUgZm9yIHJlbWFpbmluZyB0eXBlc1xuICAgICAgICAgICAgcmV0dXJuIG5vb3AodmFsdWUpO1xuICAgIH1cbn07XG5jb25zdCBub29wID0gKHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbmV4cG9ydCBjb25zdCB0b0Jvb2xlYW4gPSAodmFsdWUpID0+IHtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ3QnOlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNhc2UgJ2YnOlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgdG9OdW1iZXIgPSAodmFsdWUpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICBpZiAoIU51bWJlci5pc05hTihwYXJzZWRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZWRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuZXhwb3J0IGNvbnN0IHRvSnNvbiA9ICh2YWx1ZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgSlNPTiBwYXJzZSBlcnJvcjogJHtlcnJvcn1gKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuLyoqXG4gKiBDb252ZXJ0cyBhIFBvc3RncmVzIEFycmF5IGludG8gYSBuYXRpdmUgSlMgYXJyYXlcbiAqXG4gKiBAZXhhbXBsZSB0b0FycmF5KCd7fScsICdpbnQ0JylcbiAqIC8vPT4gW11cbiAqIEBleGFtcGxlIHRvQXJyYXkoJ3tcIlsyMDIxLTAxLTAxLDIwMjEtMTItMzEpXCIsXCIoMjAyMS0wMS0wMSwyMDIxLTEyLTMyXVwifScsICdkYXRlcmFuZ2UnKVxuICogLy89PiBbJ1syMDIxLTAxLTAxLDIwMjEtMTItMzEpJywgJygyMDIxLTAxLTAxLDIwMjEtMTItMzJdJ11cbiAqIEBleGFtcGxlIHRvQXJyYXkoWzEsMiwzLDRdLCAnaW50NCcpXG4gKiAvLz0+IFsxLDIsMyw0XVxuICovXG5leHBvcnQgY29uc3QgdG9BcnJheSA9ICh2YWx1ZSwgdHlwZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY29uc3QgbGFzdElkeCA9IHZhbHVlLmxlbmd0aCAtIDE7XG4gICAgY29uc3QgY2xvc2VCcmFjZSA9IHZhbHVlW2xhc3RJZHhdO1xuICAgIGNvbnN0IG9wZW5CcmFjZSA9IHZhbHVlWzBdO1xuICAgIC8vIENvbmZpcm0gdmFsdWUgaXMgYSBQb3N0Z3JlcyBhcnJheSBieSBjaGVja2luZyBjdXJseSBicmFja2V0c1xuICAgIGlmIChvcGVuQnJhY2UgPT09ICd7JyAmJiBjbG9zZUJyYWNlID09PSAnfScpIHtcbiAgICAgICAgbGV0IGFycjtcbiAgICAgICAgY29uc3QgdmFsVHJpbSA9IHZhbHVlLnNsaWNlKDEsIGxhc3RJZHgpO1xuICAgICAgICAvLyBUT0RPOiBmaW5kIGEgYmV0dGVyIHNvbHV0aW9uIHRvIHNlcGFyYXRlIFBvc3RncmVzIGFycmF5IGRhdGFcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGFyciA9IEpTT04ucGFyc2UoJ1snICsgdmFsVHJpbSArICddJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKF8pIHtcbiAgICAgICAgICAgIC8vIFdBUk5JTkc6IHNwbGl0dGluZyBvbiBjb21tYSBkb2VzIG5vdCBjb3ZlciBhbGwgZWRnZSBjYXNlc1xuICAgICAgICAgICAgYXJyID0gdmFsVHJpbSA/IHZhbFRyaW0uc3BsaXQoJywnKSA6IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnIubWFwKCh2YWwpID0+IGNvbnZlcnRDZWxsKHR5cGUsIHZhbCkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuLyoqXG4gKiBGaXhlcyB0aW1lc3RhbXAgdG8gYmUgSVNPLTg2MDEuIFN3YXBzIHRoZSBzcGFjZSBiZXR3ZWVuIHRoZSBkYXRlIGFuZCB0aW1lIGZvciBhICdUJ1xuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBhYmFzZS9zdXBhYmFzZS9pc3N1ZXMvMThcbiAqXG4gKiBAZXhhbXBsZSB0b1RpbWVzdGFtcFN0cmluZygnMjAxOS0wOS0xMCAwMDowMDowMCcpXG4gKiAvLz0+ICcyMDE5LTA5LTEwVDAwOjAwOjAwJ1xuICovXG5leHBvcnQgY29uc3QgdG9UaW1lc3RhbXBTdHJpbmcgPSAodmFsdWUpID0+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgnICcsICdUJyk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgaHR0cEVuZHBvaW50VVJMID0gKHNvY2tldFVybCkgPT4ge1xuICAgIGxldCB1cmwgPSBzb2NrZXRVcmw7XG4gICAgdXJsID0gdXJsLnJlcGxhY2UoL153cy9pLCAnaHR0cCcpO1xuICAgIHVybCA9IHVybC5yZXBsYWNlKC8oXFwvc29ja2V0XFwvd2Vic29ja2V0fFxcL3NvY2tldHxcXC93ZWJzb2NrZXQpXFwvPyQvaSwgJycpO1xuICAgIHJldHVybiB1cmwucmVwbGFjZSgvXFwvKyQvLCAnJyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJhbnNmb3JtZXJzLmpzLm1hcCIsImV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzIuMTEuMic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZXJzaW9uLmpzLm1hcCIsImltcG9ydCBTdG9yYWdlRmlsZUFwaSBmcm9tICcuL3BhY2thZ2VzL1N0b3JhZ2VGaWxlQXBpJztcbmltcG9ydCBTdG9yYWdlQnVja2V0QXBpIGZyb20gJy4vcGFja2FnZXMvU3RvcmFnZUJ1Y2tldEFwaSc7XG5leHBvcnQgY2xhc3MgU3RvcmFnZUNsaWVudCBleHRlbmRzIFN0b3JhZ2VCdWNrZXRBcGkge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgaGVhZGVycyA9IHt9LCBmZXRjaCkge1xuICAgICAgICBzdXBlcih1cmwsIGhlYWRlcnMsIGZldGNoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBmaWxlIG9wZXJhdGlvbiBpbiBhIGJ1Y2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBUaGUgYnVja2V0IGlkIHRvIG9wZXJhdGUgb24uXG4gICAgICovXG4gICAgZnJvbShpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFN0b3JhZ2VGaWxlQXBpKHRoaXMudXJsLCB0aGlzLmhlYWRlcnMsIGlkLCB0aGlzLmZldGNoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdG9yYWdlQ2xpZW50LmpzLm1hcCIsImltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfSEVBREVSUyA9IHsgJ1gtQ2xpZW50LUluZm8nOiBgc3RvcmFnZS1qcy8ke3ZlcnNpb259YCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsImV4cG9ydCBjbGFzcyBTdG9yYWdlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5fX2lzU3RvcmFnZUVycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5uYW1lID0gJ1N0b3JhZ2VFcnJvcic7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RvcmFnZUVycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlcnJvciA9PT0gJ29iamVjdCcgJiYgZXJyb3IgIT09IG51bGwgJiYgJ19faXNTdG9yYWdlRXJyb3InIGluIGVycm9yO1xufVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VBcGlFcnJvciBleHRlbmRzIFN0b3JhZ2VFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgc3RhdHVzKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnU3RvcmFnZUFwaUVycm9yJztcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgfVxuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VVbmtub3duRXJyb3IgZXh0ZW5kcyBTdG9yYWdlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIG9yaWdpbmFsRXJyb3IpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9ICdTdG9yYWdlVW5rbm93bkVycm9yJztcbiAgICAgICAgdGhpcy5vcmlnaW5hbEVycm9yID0gb3JpZ2luYWxFcnJvcjtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvcnMuanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBTdG9yYWdlQXBpRXJyb3IsIFN0b3JhZ2VVbmtub3duRXJyb3IgfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQgeyByZXNvbHZlUmVzcG9uc2UgfSBmcm9tICcuL2hlbHBlcnMnO1xuY29uc3QgX2dldEVycm9yTWVzc2FnZSA9IChlcnIpID0+IGVyci5tc2cgfHwgZXJyLm1lc3NhZ2UgfHwgZXJyLmVycm9yX2Rlc2NyaXB0aW9uIHx8IGVyci5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShlcnIpO1xuY29uc3QgaGFuZGxlRXJyb3IgPSAoZXJyb3IsIHJlamVjdCwgb3B0aW9ucykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgUmVzID0geWllbGQgcmVzb2x2ZVJlc3BvbnNlKCk7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgUmVzICYmICEob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLm5vUmVzb2x2ZUpzb24pKSB7XG4gICAgICAgIGVycm9yXG4gICAgICAgICAgICAuanNvbigpXG4gICAgICAgICAgICAudGhlbigoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QobmV3IFN0b3JhZ2VBcGlFcnJvcihfZ2V0RXJyb3JNZXNzYWdlKGVyciksIGVycm9yLnN0YXR1cyB8fCA1MDApKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZWplY3QobmV3IFN0b3JhZ2VVbmtub3duRXJyb3IoX2dldEVycm9yTWVzc2FnZShlcnIpLCBlcnIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZWplY3QobmV3IFN0b3JhZ2VVbmtub3duRXJyb3IoX2dldEVycm9yTWVzc2FnZShlcnJvciksIGVycm9yKSk7XG4gICAgfVxufSk7XG5jb25zdCBfZ2V0UmVxdWVzdFBhcmFtcyA9IChtZXRob2QsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpID0+IHtcbiAgICBjb25zdCBwYXJhbXMgPSB7IG1ldGhvZCwgaGVhZGVyczogKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5oZWFkZXJzKSB8fCB7fSB9O1xuICAgIGlmIChtZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuICAgIHBhcmFtcy5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmhlYWRlcnMpO1xuICAgIGlmIChib2R5KSB7XG4gICAgICAgIHBhcmFtcy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHBhcmFtcyksIHBhcmFtZXRlcnMpO1xufTtcbmZ1bmN0aW9uIF9oYW5kbGVSZXF1ZXN0KGZldGNoZXIsIG1ldGhvZCwgdXJsLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGZldGNoZXIodXJsLCBfZ2V0UmVxdWVzdFBhcmFtcyhtZXRob2QsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5vaylcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgcmVzdWx0O1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubm9SZXNvbHZlSnNvbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHJlc29sdmUoZGF0YSkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gaGFuZGxlRXJyb3IoZXJyb3IsIHJlamVjdCwgb3B0aW9ucykpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXQoZmV0Y2hlciwgdXJsLCBvcHRpb25zLCBwYXJhbWV0ZXJzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVSZXF1ZXN0KGZldGNoZXIsICdHRVQnLCB1cmwsIG9wdGlvbnMsIHBhcmFtZXRlcnMpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBvc3QoZmV0Y2hlciwgdXJsLCBib2R5LCBvcHRpb25zLCBwYXJhbWV0ZXJzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVSZXF1ZXN0KGZldGNoZXIsICdQT1NUJywgdXJsLCBvcHRpb25zLCBwYXJhbWV0ZXJzLCBib2R5KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwdXQoZmV0Y2hlciwgdXJsLCBib2R5LCBvcHRpb25zLCBwYXJhbWV0ZXJzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVSZXF1ZXN0KGZldGNoZXIsICdQVVQnLCB1cmwsIG9wdGlvbnMsIHBhcmFtZXRlcnMsIGJvZHkpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhlYWQoZmV0Y2hlciwgdXJsLCBvcHRpb25zLCBwYXJhbWV0ZXJzKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVSZXF1ZXN0KGZldGNoZXIsICdIRUFEJywgdXJsLCBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IG5vUmVzb2x2ZUpzb246IHRydWUgfSksIHBhcmFtZXRlcnMpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShmZXRjaGVyLCB1cmwsIGJvZHksIG9wdGlvbnMsIHBhcmFtZXRlcnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICByZXR1cm4gX2hhbmRsZVJlcXVlc3QoZmV0Y2hlciwgJ0RFTEVURScsIHVybCwgb3B0aW9ucywgcGFyYW1ldGVycywgYm9keSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mZXRjaC5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmV4cG9ydCBjb25zdCByZXNvbHZlRmV0Y2ggPSAoY3VzdG9tRmV0Y2gpID0+IHtcbiAgICBsZXQgX2ZldGNoO1xuICAgIGlmIChjdXN0b21GZXRjaCkge1xuICAgICAgICBfZmV0Y2ggPSBjdXN0b21GZXRjaDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGZldGNoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBfZmV0Y2ggPSAoLi4uYXJncykgPT4gaW1wb3J0KCdAc3VwYWJhc2Uvbm9kZS1mZXRjaCcpLnRoZW4oKHsgZGVmYXVsdDogZmV0Y2ggfSkgPT4gZmV0Y2goLi4uYXJncykpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgX2ZldGNoID0gZmV0Y2g7XG4gICAgfVxuICAgIHJldHVybiAoLi4uYXJncykgPT4gX2ZldGNoKC4uLmFyZ3MpO1xufTtcbmV4cG9ydCBjb25zdCByZXNvbHZlUmVzcG9uc2UgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBpZiAodHlwZW9mIFJlc3BvbnNlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiAoeWllbGQgaW1wb3J0KCdAc3VwYWJhc2Uvbm9kZS1mZXRjaCcpKS5SZXNwb25zZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3BvbnNlO1xufSk7XG5leHBvcnQgY29uc3QgcmVjdXJzaXZlVG9DYW1lbCA9IChpdGVtKSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ubWFwKChlbCkgPT4gcmVjdXJzaXZlVG9DYW1lbChlbCkpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gJ2Z1bmN0aW9uJyB8fCBpdGVtICE9PSBPYmplY3QoaXRlbSkpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIE9iamVjdC5lbnRyaWVzKGl0ZW0pLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdLZXkgPSBrZXkucmVwbGFjZSgvKFstX11bYS16XSkvZ2ksIChjKSA9PiBjLnRvVXBwZXJDYXNlKCkucmVwbGFjZSgvWy1fXS9nLCAnJykpO1xuICAgICAgICByZXN1bHRbbmV3S2V5XSA9IHJlY3Vyc2l2ZVRvQ2FtZWwodmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVycy5qcy5tYXAiLCIvLyBnZW5lcmF0ZWQgYnkgZ2VudmVyc2lvblxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMi43LjEnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVyc2lvbi5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IERFRkFVTFRfSEVBREVSUyB9IGZyb20gJy4uL2xpYi9jb25zdGFudHMnO1xuaW1wb3J0IHsgaXNTdG9yYWdlRXJyb3IgfSBmcm9tICcuLi9saWIvZXJyb3JzJztcbmltcG9ydCB7IGdldCwgcG9zdCwgcHV0LCByZW1vdmUgfSBmcm9tICcuLi9saWIvZmV0Y2gnO1xuaW1wb3J0IHsgcmVzb2x2ZUZldGNoIH0gZnJvbSAnLi4vbGliL2hlbHBlcnMnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZUJ1Y2tldEFwaSB7XG4gICAgY29uc3RydWN0b3IodXJsLCBoZWFkZXJzID0ge30sIGZldGNoKSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfSEVBREVSUyksIGhlYWRlcnMpO1xuICAgICAgICB0aGlzLmZldGNoID0gcmVzb2x2ZUZldGNoKGZldGNoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBkZXRhaWxzIG9mIGFsbCBTdG9yYWdlIGJ1Y2tldHMgd2l0aGluIGFuIGV4aXN0aW5nIHByb2plY3QuXG4gICAgICovXG4gICAgbGlzdEJ1Y2tldHMoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBnZXQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L2J1Y2tldGAsIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBkZXRhaWxzIG9mIGFuIGV4aXN0aW5nIFN0b3JhZ2UgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgYnVja2V0IHlvdSB3b3VsZCBsaWtlIHRvIHJldHJpZXZlLlxuICAgICAqL1xuICAgIGdldEJ1Y2tldChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgZ2V0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9idWNrZXQvJHtpZH1gLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgU3RvcmFnZSBidWNrZXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBBIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgYnVja2V0IHlvdSBhcmUgY3JlYXRpbmcuXG4gICAgICogQHBhcmFtIG9wdGlvbnMucHVibGljIFRoZSB2aXNpYmlsaXR5IG9mIHRoZSBidWNrZXQuIFB1YmxpYyBidWNrZXRzIGRvbid0IHJlcXVpcmUgYW4gYXV0aG9yaXphdGlvbiB0b2tlbiB0byBkb3dubG9hZCBvYmplY3RzLCBidXQgc3RpbGwgcmVxdWlyZSBhIHZhbGlkIHRva2VuIGZvciBhbGwgb3RoZXIgb3BlcmF0aW9ucy4gQnkgZGVmYXVsdCwgYnVja2V0cyBhcmUgcHJpdmF0ZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5maWxlU2l6ZUxpbWl0IHNwZWNpZmllcyB0aGUgbWF4IGZpbGUgc2l6ZSBpbiBieXRlcyB0aGF0IGNhbiBiZSB1cGxvYWRlZCB0byB0aGlzIGJ1Y2tldC5cbiAgICAgKiBUaGUgZ2xvYmFsIGZpbGUgc2l6ZSBsaW1pdCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgdGhpcyB2YWx1ZS5cbiAgICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBudWxsLCB3aGljaCBkb2Vzbid0IHNldCBhIHBlciBidWNrZXQgZmlsZSBzaXplIGxpbWl0LlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmFsbG93ZWRNaW1lVHlwZXMgc3BlY2lmaWVzIHRoZSBhbGxvd2VkIG1pbWUgdHlwZXMgdGhhdCB0aGlzIGJ1Y2tldCBjYW4gYWNjZXB0IGR1cmluZyB1cGxvYWQuXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgbnVsbCwgd2hpY2ggYWxsb3dzIGZpbGVzIHdpdGggYWxsIG1pbWUgdHlwZXMgdG8gYmUgdXBsb2FkZWQuXG4gICAgICogRWFjaCBtaW1lIHR5cGUgc3BlY2lmaWVkIGNhbiBiZSBhIHdpbGRjYXJkLCBlLmcuIGltYWdlLyosIG9yIGEgc3BlY2lmaWMgbWltZSB0eXBlLCBlLmcuIGltYWdlL3BuZy5cbiAgICAgKiBAcmV0dXJucyBuZXdseSBjcmVhdGVkIGJ1Y2tldCBpZFxuICAgICAqL1xuICAgIGNyZWF0ZUJ1Y2tldChpZCwgb3B0aW9ucyA9IHtcbiAgICAgICAgcHVibGljOiBmYWxzZSxcbiAgICB9KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBwb3N0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9idWNrZXRgLCB7XG4gICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgcHVibGljOiBvcHRpb25zLnB1YmxpYyxcbiAgICAgICAgICAgICAgICAgICAgZmlsZV9zaXplX2xpbWl0OiBvcHRpb25zLmZpbGVTaXplTGltaXQsXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRfbWltZV90eXBlczogb3B0aW9ucy5hbGxvd2VkTWltZVR5cGVzLFxuICAgICAgICAgICAgICAgIH0sIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBhIFN0b3JhZ2UgYnVja2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgQSB1bmlxdWUgaWRlbnRpZmllciBmb3IgdGhlIGJ1Y2tldCB5b3UgYXJlIHVwZGF0aW5nLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLnB1YmxpYyBUaGUgdmlzaWJpbGl0eSBvZiB0aGUgYnVja2V0LiBQdWJsaWMgYnVja2V0cyBkb24ndCByZXF1aXJlIGFuIGF1dGhvcml6YXRpb24gdG9rZW4gdG8gZG93bmxvYWQgb2JqZWN0cywgYnV0IHN0aWxsIHJlcXVpcmUgYSB2YWxpZCB0b2tlbiBmb3IgYWxsIG90aGVyIG9wZXJhdGlvbnMuXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZmlsZVNpemVMaW1pdCBzcGVjaWZpZXMgdGhlIG1heCBmaWxlIHNpemUgaW4gYnl0ZXMgdGhhdCBjYW4gYmUgdXBsb2FkZWQgdG8gdGhpcyBidWNrZXQuXG4gICAgICogVGhlIGdsb2JhbCBmaWxlIHNpemUgbGltaXQgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIHRoaXMgdmFsdWUuXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgbnVsbCwgd2hpY2ggZG9lc24ndCBzZXQgYSBwZXIgYnVja2V0IGZpbGUgc2l6ZSBsaW1pdC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hbGxvd2VkTWltZVR5cGVzIHNwZWNpZmllcyB0aGUgYWxsb3dlZCBtaW1lIHR5cGVzIHRoYXQgdGhpcyBidWNrZXQgY2FuIGFjY2VwdCBkdXJpbmcgdXBsb2FkLlxuICAgICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIG51bGwsIHdoaWNoIGFsbG93cyBmaWxlcyB3aXRoIGFsbCBtaW1lIHR5cGVzIHRvIGJlIHVwbG9hZGVkLlxuICAgICAqIEVhY2ggbWltZSB0eXBlIHNwZWNpZmllZCBjYW4gYmUgYSB3aWxkY2FyZCwgZS5nLiBpbWFnZS8qLCBvciBhIHNwZWNpZmljIG1pbWUgdHlwZSwgZS5nLiBpbWFnZS9wbmcuXG4gICAgICovXG4gICAgdXBkYXRlQnVja2V0KGlkLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBwdXQodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L2J1Y2tldC8ke2lkfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGlkLFxuICAgICAgICAgICAgICAgICAgICBwdWJsaWM6IG9wdGlvbnMucHVibGljLFxuICAgICAgICAgICAgICAgICAgICBmaWxlX3NpemVfbGltaXQ6IG9wdGlvbnMuZmlsZVNpemVMaW1pdCxcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dlZF9taW1lX3R5cGVzOiBvcHRpb25zLmFsbG93ZWRNaW1lVHlwZXMsXG4gICAgICAgICAgICAgICAgfSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBvYmplY3RzIGluc2lkZSBhIHNpbmdsZSBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBidWNrZXQgeW91IHdvdWxkIGxpa2UgdG8gZW1wdHkuXG4gICAgICovXG4gICAgZW1wdHlCdWNrZXQoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L2J1Y2tldC8ke2lkfS9lbXB0eWAsIHt9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYW4gZXhpc3RpbmcgYnVja2V0LiBBIGJ1Y2tldCBjYW4ndCBiZSBkZWxldGVkIHdpdGggZXhpc3Rpbmcgb2JqZWN0cyBpbnNpZGUgaXQuXG4gICAgICogWW91IG11c3QgZmlyc3QgYGVtcHR5KClgIHRoZSBidWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBidWNrZXQgeW91IHdvdWxkIGxpa2UgdG8gZGVsZXRlLlxuICAgICAqL1xuICAgIGRlbGV0ZUJ1Y2tldChpZCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVtb3ZlKHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9idWNrZXQvJHtpZH1gLCB7fSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN0b3JhZ2VCdWNrZXRBcGkuanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBpc1N0b3JhZ2VFcnJvciwgU3RvcmFnZUVycm9yLCBTdG9yYWdlVW5rbm93bkVycm9yIH0gZnJvbSAnLi4vbGliL2Vycm9ycyc7XG5pbXBvcnQgeyBnZXQsIGhlYWQsIHBvc3QsIHJlbW92ZSB9IGZyb20gJy4uL2xpYi9mZXRjaCc7XG5pbXBvcnQgeyByZWN1cnNpdmVUb0NhbWVsLCByZXNvbHZlRmV0Y2ggfSBmcm9tICcuLi9saWIvaGVscGVycyc7XG5jb25zdCBERUZBVUxUX1NFQVJDSF9PUFRJT05TID0ge1xuICAgIGxpbWl0OiAxMDAsXG4gICAgb2Zmc2V0OiAwLFxuICAgIHNvcnRCeToge1xuICAgICAgICBjb2x1bW46ICduYW1lJyxcbiAgICAgICAgb3JkZXI6ICdhc2MnLFxuICAgIH0sXG59O1xuY29uc3QgREVGQVVMVF9GSUxFX09QVElPTlMgPSB7XG4gICAgY2FjaGVDb250cm9sOiAnMzYwMCcsXG4gICAgY29udGVudFR5cGU6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnLFxuICAgIHVwc2VydDogZmFsc2UsXG59O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZUZpbGVBcGkge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgaGVhZGVycyA9IHt9LCBidWNrZXRJZCwgZmV0Y2gpIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgIHRoaXMuYnVja2V0SWQgPSBidWNrZXRJZDtcbiAgICAgICAgdGhpcy5mZXRjaCA9IHJlc29sdmVGZXRjaChmZXRjaCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwbG9hZHMgYSBmaWxlIHRvIGFuIGV4aXN0aW5nIGJ1Y2tldCBvciByZXBsYWNlcyBhbiBleGlzdGluZyBmaWxlIGF0IHRoZSBzcGVjaWZpZWQgcGF0aCB3aXRoIGEgbmV3IG9uZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtZXRob2QgSFRUUCBtZXRob2QuXG4gICAgICogQHBhcmFtIHBhdGggVGhlIHJlbGF0aXZlIGZpbGUgcGF0aC4gU2hvdWxkIGJlIG9mIHRoZSBmb3JtYXQgYGZvbGRlci9zdWJmb2xkZXIvZmlsZW5hbWUucG5nYC4gVGhlIGJ1Y2tldCBtdXN0IGFscmVhZHkgZXhpc3QgYmVmb3JlIGF0dGVtcHRpbmcgdG8gdXBsb2FkLlxuICAgICAqIEBwYXJhbSBmaWxlQm9keSBUaGUgYm9keSBvZiB0aGUgZmlsZSB0byBiZSBzdG9yZWQgaW4gdGhlIGJ1Y2tldC5cbiAgICAgKi9cbiAgICB1cGxvYWRPclVwZGF0ZShtZXRob2QsIHBhdGgsIGZpbGVCb2R5LCBmaWxlT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgYm9keTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0ZJTEVfT1BUSU9OUyksIGZpbGVPcHRpb25zKTtcbiAgICAgICAgICAgICAgICBsZXQgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5oZWFkZXJzKSwgKG1ldGhvZCA9PT0gJ1BPU1QnICYmIHsgJ3gtdXBzZXJ0JzogU3RyaW5nKG9wdGlvbnMudXBzZXJ0KSB9KSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSBvcHRpb25zLm1ldGFkYXRhO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZUJvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJ2NhY2hlQ29udHJvbCcsIG9wdGlvbnMuY2FjaGVDb250cm9sKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCgnbWV0YWRhdGEnLCB0aGlzLmVuY29kZU1ldGFkYXRhKG1ldGFkYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJycsIGZpbGVCb2R5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlQm9keSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBmaWxlQm9keTtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5hcHBlbmQoJ2NhY2hlQ29udHJvbCcsIG9wdGlvbnMuY2FjaGVDb250cm9sKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LmFwcGVuZCgnbWV0YWRhdGEnLCB0aGlzLmVuY29kZU1ldGFkYXRhKG1ldGFkYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkgPSBmaWxlQm9keTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1snY2FjaGUtY29udHJvbCddID0gYG1heC1hZ2U9JHtvcHRpb25zLmNhY2hlQ29udHJvbH1gO1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzWydjb250ZW50LXR5cGUnXSA9IG9wdGlvbnMuY29udGVudFR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1sneC1tZXRhZGF0YSddID0gdGhpcy50b0Jhc2U2NCh0aGlzLmVuY29kZU1ldGFkYXRhKG1ldGFkYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbGVPcHRpb25zID09PSBudWxsIHx8IGZpbGVPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmaWxlT3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGhlYWRlcnMpLCBmaWxlT3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY2xlYW5QYXRoID0gdGhpcy5fcmVtb3ZlRW1wdHlGb2xkZXJzKHBhdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IF9wYXRoID0gdGhpcy5fZ2V0RmluYWxQYXRoKGNsZWFuUGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzID0geWllbGQgdGhpcy5mZXRjaChgJHt0aGlzLnVybH0vb2JqZWN0LyR7X3BhdGh9YCwgT2JqZWN0LmFzc2lnbih7IG1ldGhvZCwgYm9keTogYm9keSwgaGVhZGVycyB9LCAoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kdXBsZXgpID8geyBkdXBsZXg6IG9wdGlvbnMuZHVwbGV4IH0gOiB7fSkpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzLmpzb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHBhdGg6IGNsZWFuUGF0aCwgaWQ6IGRhdGEuSWQsIGZ1bGxQYXRoOiBkYXRhLktleSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwbG9hZHMgYSBmaWxlIHRvIGFuIGV4aXN0aW5nIGJ1Y2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgZmlsZSBuYW1lLiBTaG91bGQgYmUgb2YgdGhlIGZvcm1hdCBgZm9sZGVyL3N1YmZvbGRlci9maWxlbmFtZS5wbmdgLiBUaGUgYnVja2V0IG11c3QgYWxyZWFkeSBleGlzdCBiZWZvcmUgYXR0ZW1wdGluZyB0byB1cGxvYWQuXG4gICAgICogQHBhcmFtIGZpbGVCb2R5IFRoZSBib2R5IG9mIHRoZSBmaWxlIHRvIGJlIHN0b3JlZCBpbiB0aGUgYnVja2V0LlxuICAgICAqL1xuICAgIHVwbG9hZChwYXRoLCBmaWxlQm9keSwgZmlsZU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwbG9hZE9yVXBkYXRlKCdQT1NUJywgcGF0aCwgZmlsZUJvZHksIGZpbGVPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwbG9hZCBhIGZpbGUgd2l0aCBhIHRva2VuIGdlbmVyYXRlZCBmcm9tIGBjcmVhdGVTaWduZWRVcGxvYWRVcmxgLlxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgZmlsZSBuYW1lLiBTaG91bGQgYmUgb2YgdGhlIGZvcm1hdCBgZm9sZGVyL3N1YmZvbGRlci9maWxlbmFtZS5wbmdgLiBUaGUgYnVja2V0IG11c3QgYWxyZWFkeSBleGlzdCBiZWZvcmUgYXR0ZW1wdGluZyB0byB1cGxvYWQuXG4gICAgICogQHBhcmFtIHRva2VuIFRoZSB0b2tlbiBnZW5lcmF0ZWQgZnJvbSBgY3JlYXRlU2lnbmVkVXBsb2FkVXJsYFxuICAgICAqIEBwYXJhbSBmaWxlQm9keSBUaGUgYm9keSBvZiB0aGUgZmlsZSB0byBiZSBzdG9yZWQgaW4gdGhlIGJ1Y2tldC5cbiAgICAgKi9cbiAgICB1cGxvYWRUb1NpZ25lZFVybChwYXRoLCB0b2tlbiwgZmlsZUJvZHksIGZpbGVPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBjbGVhblBhdGggPSB0aGlzLl9yZW1vdmVFbXB0eUZvbGRlcnMocGF0aCk7XG4gICAgICAgICAgICBjb25zdCBfcGF0aCA9IHRoaXMuX2dldEZpbmFsUGF0aChjbGVhblBhdGgpO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh0aGlzLnVybCArIGAvb2JqZWN0L3VwbG9hZC9zaWduLyR7X3BhdGh9YCk7XG4gICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldCgndG9rZW4nLCB0b2tlbik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBib2R5O1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgdXBzZXJ0OiBERUZBVUxUX0ZJTEVfT1BUSU9OUy51cHNlcnQgfSwgZmlsZU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaGVhZGVycyksIHsgJ3gtdXBzZXJ0JzogU3RyaW5nKG9wdGlvbnMudXBzZXJ0KSB9KTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGZpbGVCb2R5IGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCdjYWNoZUNvbnRyb2wnLCBvcHRpb25zLmNhY2hlQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCcnLCBmaWxlQm9keSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZUJvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gZmlsZUJvZHk7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuYXBwZW5kKCdjYWNoZUNvbnRyb2wnLCBvcHRpb25zLmNhY2hlQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBib2R5ID0gZmlsZUJvZHk7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbJ2NhY2hlLWNvbnRyb2wnXSA9IGBtYXgtYWdlPSR7b3B0aW9ucy5jYWNoZUNvbnRyb2x9YDtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1snY29udGVudC10eXBlJ10gPSBvcHRpb25zLmNvbnRlbnRUeXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB5aWVsZCB0aGlzLmZldGNoKHVybC50b1N0cmluZygpLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IGJvZHksXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlcy5qc29uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5vaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBwYXRoOiBjbGVhblBhdGgsIGZ1bGxQYXRoOiBkYXRhLktleSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBzaWduZWQgdXBsb2FkIFVSTC5cbiAgICAgKiBTaWduZWQgdXBsb2FkIFVSTHMgY2FuIGJlIHVzZWQgdG8gdXBsb2FkIGZpbGVzIHRvIHRoZSBidWNrZXQgd2l0aG91dCBmdXJ0aGVyIGF1dGhlbnRpY2F0aW9uLlxuICAgICAqIFRoZXkgYXJlIHZhbGlkIGZvciAyIGhvdXJzLlxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgY3VycmVudCBmaWxlIG5hbWUuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UucG5nYC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy51cHNlcnQgSWYgc2V0IHRvIHRydWUsIGFsbG93cyB0aGUgZmlsZSB0byBiZSBvdmVyd3JpdHRlbiBpZiBpdCBhbHJlYWR5IGV4aXN0cy5cbiAgICAgKi9cbiAgICBjcmVhdGVTaWduZWRVcGxvYWRVcmwocGF0aCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgocGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy51cHNlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1sneC11cHNlcnQnXSA9ICd0cnVlJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC91cGxvYWQvc2lnbi8ke19wYXRofWAsIHt9LCB7IGhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh0aGlzLnVybCArIGRhdGEudXJsKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCd0b2tlbicpO1xuICAgICAgICAgICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN0b3JhZ2VFcnJvcignTm8gdG9rZW4gcmV0dXJuZWQgYnkgQVBJJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHsgc2lnbmVkVXJsOiB1cmwudG9TdHJpbmcoKSwgcGF0aCwgdG9rZW4gfSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyBhbiBleGlzdGluZyBmaWxlIGF0IHRoZSBzcGVjaWZpZWQgcGF0aCB3aXRoIGEgbmV3IG9uZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSByZWxhdGl2ZSBmaWxlIHBhdGguIFNob3VsZCBiZSBvZiB0aGUgZm9ybWF0IGBmb2xkZXIvc3ViZm9sZGVyL2ZpbGVuYW1lLnBuZ2AuIFRoZSBidWNrZXQgbXVzdCBhbHJlYWR5IGV4aXN0IGJlZm9yZSBhdHRlbXB0aW5nIHRvIHVwZGF0ZS5cbiAgICAgKiBAcGFyYW0gZmlsZUJvZHkgVGhlIGJvZHkgb2YgdGhlIGZpbGUgdG8gYmUgc3RvcmVkIGluIHRoZSBidWNrZXQuXG4gICAgICovXG4gICAgdXBkYXRlKHBhdGgsIGZpbGVCb2R5LCBmaWxlT3B0aW9ucykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkT3JVcGRhdGUoJ1BVVCcsIHBhdGgsIGZpbGVCb2R5LCBmaWxlT3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBhbiBleGlzdGluZyBmaWxlIHRvIGEgbmV3IHBhdGggaW4gdGhlIHNhbWUgYnVja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGZyb21QYXRoIFRoZSBvcmlnaW5hbCBmaWxlIHBhdGgsIGluY2x1ZGluZyB0aGUgY3VycmVudCBmaWxlIG5hbWUuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UucG5nYC5cbiAgICAgKiBAcGFyYW0gdG9QYXRoIFRoZSBuZXcgZmlsZSBwYXRoLCBpbmNsdWRpbmcgdGhlIG5ldyBmaWxlIG5hbWUuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UtbmV3LnBuZ2AuXG4gICAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGRlc3RpbmF0aW9uIG9wdGlvbnMuXG4gICAgICovXG4gICAgbW92ZShmcm9tUGF0aCwgdG9QYXRoLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBwb3N0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9vYmplY3QvbW92ZWAsIHtcbiAgICAgICAgICAgICAgICAgICAgYnVja2V0SWQ6IHRoaXMuYnVja2V0SWQsXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUtleTogZnJvbVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uS2V5OiB0b1BhdGgsXG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZGVzdGluYXRpb25CdWNrZXQsXG4gICAgICAgICAgICAgICAgfSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgYW4gZXhpc3RpbmcgZmlsZSB0byBhIG5ldyBwYXRoIGluIHRoZSBzYW1lIGJ1Y2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmcm9tUGF0aCBUaGUgb3JpZ2luYWwgZmlsZSBwYXRoLCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZmlsZSBuYW1lLiBGb3IgZXhhbXBsZSBgZm9sZGVyL2ltYWdlLnBuZ2AuXG4gICAgICogQHBhcmFtIHRvUGF0aCBUaGUgbmV3IGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBuZXcgZmlsZSBuYW1lLiBGb3IgZXhhbXBsZSBgZm9sZGVyL2ltYWdlLWNvcHkucG5nYC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgZGVzdGluYXRpb24gb3B0aW9ucy5cbiAgICAgKi9cbiAgICBjb3B5KGZyb21QYXRoLCB0b1BhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC9jb3B5YCwge1xuICAgICAgICAgICAgICAgICAgICBidWNrZXRJZDogdGhpcy5idWNrZXRJZCxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlS2V5OiBmcm9tUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25LZXk6IHRvUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kZXN0aW5hdGlvbkJ1Y2tldCxcbiAgICAgICAgICAgICAgICB9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7IHBhdGg6IGRhdGEuS2V5IH0sIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHNpZ25lZCBVUkwuIFVzZSBhIHNpZ25lZCBVUkwgdG8gc2hhcmUgYSBmaWxlIGZvciBhIGZpeGVkIGFtb3VudCBvZiB0aW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggVGhlIGZpbGUgcGF0aCwgaW5jbHVkaW5nIHRoZSBjdXJyZW50IGZpbGUgbmFtZS4gRm9yIGV4YW1wbGUgYGZvbGRlci9pbWFnZS5wbmdgLlxuICAgICAqIEBwYXJhbSBleHBpcmVzSW4gVGhlIG51bWJlciBvZiBzZWNvbmRzIHVudGlsIHRoZSBzaWduZWQgVVJMIGV4cGlyZXMuIEZvciBleGFtcGxlLCBgNjBgIGZvciBhIFVSTCB3aGljaCBpcyB2YWxpZCBmb3Igb25lIG1pbnV0ZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kb3dubG9hZCB0cmlnZ2VycyB0aGUgZmlsZSBhcyBhIGRvd25sb2FkIGlmIHNldCB0byB0cnVlLiBTZXQgdGhpcyBwYXJhbWV0ZXIgYXMgdGhlIG5hbWUgb2YgdGhlIGZpbGUgaWYgeW91IHdhbnQgdG8gdHJpZ2dlciB0aGUgZG93bmxvYWQgd2l0aCBhIGRpZmZlcmVudCBmaWxlbmFtZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50cmFuc2Zvcm0gVHJhbnNmb3JtIHRoZSBhc3NldCBiZWZvcmUgc2VydmluZyBpdCB0byB0aGUgY2xpZW50LlxuICAgICAqL1xuICAgIGNyZWF0ZVNpZ25lZFVybChwYXRoLCBleHBpcmVzSW4sIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbGV0IF9wYXRoID0gdGhpcy5fZ2V0RmluYWxQYXRoKHBhdGgpO1xuICAgICAgICAgICAgICAgIGxldCBkYXRhID0geWllbGQgcG9zdCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0L3NpZ24vJHtfcGF0aH1gLCBPYmplY3QuYXNzaWduKHsgZXhwaXJlc0luIH0sICgob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnRyYW5zZm9ybSkgPyB7IHRyYW5zZm9ybTogb3B0aW9ucy50cmFuc2Zvcm0gfSA6IHt9KSksIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvd25sb2FkUXVlcnlQYXJhbSA9IChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZG93bmxvYWQpXG4gICAgICAgICAgICAgICAgICAgID8gYCZkb3dubG9hZD0ke29wdGlvbnMuZG93bmxvYWQgPT09IHRydWUgPyAnJyA6IG9wdGlvbnMuZG93bmxvYWR9YFxuICAgICAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpZ25lZFVybCA9IGVuY29kZVVSSShgJHt0aGlzLnVybH0ke2RhdGEuc2lnbmVkVVJMfSR7ZG93bmxvYWRRdWVyeVBhcmFtfWApO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7IHNpZ25lZFVybCB9O1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGVycm9yOiBudWxsIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG51bGwsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBtdWx0aXBsZSBzaWduZWQgVVJMcy4gVXNlIGEgc2lnbmVkIFVSTCB0byBzaGFyZSBhIGZpbGUgZm9yIGEgZml4ZWQgYW1vdW50IG9mIHRpbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aHMgVGhlIGZpbGUgcGF0aHMgdG8gYmUgZG93bmxvYWRlZCwgaW5jbHVkaW5nIHRoZSBjdXJyZW50IGZpbGUgbmFtZXMuIEZvciBleGFtcGxlIGBbJ2ZvbGRlci9pbWFnZS5wbmcnLCAnZm9sZGVyMi9pbWFnZTIucG5nJ11gLlxuICAgICAqIEBwYXJhbSBleHBpcmVzSW4gVGhlIG51bWJlciBvZiBzZWNvbmRzIHVudGlsIHRoZSBzaWduZWQgVVJMcyBleHBpcmUuIEZvciBleGFtcGxlLCBgNjBgIGZvciBVUkxzIHdoaWNoIGFyZSB2YWxpZCBmb3Igb25lIG1pbnV0ZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kb3dubG9hZCB0cmlnZ2VycyB0aGUgZmlsZSBhcyBhIGRvd25sb2FkIGlmIHNldCB0byB0cnVlLiBTZXQgdGhpcyBwYXJhbWV0ZXIgYXMgdGhlIG5hbWUgb2YgdGhlIGZpbGUgaWYgeW91IHdhbnQgdG8gdHJpZ2dlciB0aGUgZG93bmxvYWQgd2l0aCBhIGRpZmZlcmVudCBmaWxlbmFtZS5cbiAgICAgKi9cbiAgICBjcmVhdGVTaWduZWRVcmxzKHBhdGhzLCBleHBpcmVzSW4sIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHBvc3QodGhpcy5mZXRjaCwgYCR7dGhpcy51cmx9L29iamVjdC9zaWduLyR7dGhpcy5idWNrZXRJZH1gLCB7IGV4cGlyZXNJbiwgcGF0aHMgfSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZG93bmxvYWRRdWVyeVBhcmFtID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kb3dubG9hZClcbiAgICAgICAgICAgICAgICAgICAgPyBgJmRvd25sb2FkPSR7b3B0aW9ucy5kb3dubG9hZCA9PT0gdHJ1ZSA/ICcnIDogb3B0aW9ucy5kb3dubG9hZH1gXG4gICAgICAgICAgICAgICAgICAgIDogJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YS5tYXAoKGRhdHVtKSA9PiAoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBkYXR1bSksIHsgc2lnbmVkVXJsOiBkYXR1bS5zaWduZWRVUkxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVuY29kZVVSSShgJHt0aGlzLnVybH0ke2RhdHVtLnNpZ25lZFVSTH0ke2Rvd25sb2FkUXVlcnlQYXJhbX1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCB9KSkpLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERvd25sb2FkcyBhIGZpbGUgZnJvbSBhIHByaXZhdGUgYnVja2V0LiBGb3IgcHVibGljIGJ1Y2tldHMsIG1ha2UgYSByZXF1ZXN0IHRvIHRoZSBVUkwgcmV0dXJuZWQgZnJvbSBgZ2V0UHVibGljVXJsYCBpbnN0ZWFkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggVGhlIGZ1bGwgcGF0aCBhbmQgZmlsZSBuYW1lIG9mIHRoZSBmaWxlIHRvIGJlIGRvd25sb2FkZWQuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UucG5nYC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50cmFuc2Zvcm0gVHJhbnNmb3JtIHRoZSBhc3NldCBiZWZvcmUgc2VydmluZyBpdCB0byB0aGUgY2xpZW50LlxuICAgICAqL1xuICAgIGRvd25sb2FkKHBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHdhbnRzVHJhbnNmb3JtYXRpb24gPSB0eXBlb2YgKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy50cmFuc2Zvcm0pICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgICAgIGNvbnN0IHJlbmRlclBhdGggPSB3YW50c1RyYW5zZm9ybWF0aW9uID8gJ3JlbmRlci9pbWFnZS9hdXRoZW50aWNhdGVkJyA6ICdvYmplY3QnO1xuICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtYXRpb25RdWVyeSA9IHRoaXMudHJhbnNmb3JtT3B0c1RvUXVlcnlTdHJpbmcoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy50cmFuc2Zvcm0pIHx8IHt9KTtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gdHJhbnNmb3JtYXRpb25RdWVyeSA/IGA/JHt0cmFuc2Zvcm1hdGlvblF1ZXJ5fWAgOiAnJztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3BhdGggPSB0aGlzLl9nZXRGaW5hbFBhdGgocGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzID0geWllbGQgZ2V0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS8ke3JlbmRlclBhdGh9LyR7X3BhdGh9JHtxdWVyeVN0cmluZ31gLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgbm9SZXNvbHZlSnNvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzLmJsb2IoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgZGV0YWlscyBvZiBhbiBleGlzdGluZyBmaWxlLlxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICovXG4gICAgaW5mbyhwYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBfcGF0aCA9IHRoaXMuX2dldEZpbmFsUGF0aChwYXRoKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIGdldCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0L2luZm8vJHtfcGF0aH1gLCB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiByZWN1cnNpdmVUb0NhbWVsKGRhdGEpLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB0aGUgZXhpc3RlbmNlIG9mIGEgZmlsZS5cbiAgICAgKiBAcGFyYW0gcGF0aFxuICAgICAqL1xuICAgIGV4aXN0cyhwYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBfcGF0aCA9IHRoaXMuX2dldEZpbmFsUGF0aChwYXRoKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeWllbGQgaGVhZCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0LyR7X3BhdGh9YCwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogdHJ1ZSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikgJiYgZXJyb3IgaW5zdGFuY2VvZiBTdG9yYWdlVW5rbm93bkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsRXJyb3IgPSBlcnJvci5vcmlnaW5hbEVycm9yO1xuICAgICAgICAgICAgICAgICAgICBpZiAoWzQwMCwgNDA0XS5pbmNsdWRlcyhvcmlnaW5hbEVycm9yID09PSBudWxsIHx8IG9yaWdpbmFsRXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9yaWdpbmFsRXJyb3Iuc3RhdHVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogZmFsc2UsIGVycm9yIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpbXBsZSBjb252ZW5pZW5jZSBmdW5jdGlvbiB0byBnZXQgdGhlIFVSTCBmb3IgYW4gYXNzZXQgaW4gYSBwdWJsaWMgYnVja2V0LiBJZiB5b3UgZG8gbm90IHdhbnQgdG8gdXNlIHRoaXMgZnVuY3Rpb24sIHlvdSBjYW4gY29uc3RydWN0IHRoZSBwdWJsaWMgVVJMIGJ5IGNvbmNhdGVuYXRpbmcgdGhlIGJ1Y2tldCBVUkwgd2l0aCB0aGUgcGF0aCB0byB0aGUgYXNzZXQuXG4gICAgICogVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCB2ZXJpZnkgaWYgdGhlIGJ1Y2tldCBpcyBwdWJsaWMuIElmIGEgcHVibGljIFVSTCBpcyBjcmVhdGVkIGZvciBhIGJ1Y2tldCB3aGljaCBpcyBub3QgcHVibGljLCB5b3Ugd2lsbCBub3QgYmUgYWJsZSB0byBkb3dubG9hZCB0aGUgYXNzZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCBhbmQgbmFtZSBvZiB0aGUgZmlsZSB0byBnZW5lcmF0ZSB0aGUgcHVibGljIFVSTCBmb3IuIEZvciBleGFtcGxlIGBmb2xkZXIvaW1hZ2UucG5nYC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kb3dubG9hZCBUcmlnZ2VycyB0aGUgZmlsZSBhcyBhIGRvd25sb2FkIGlmIHNldCB0byB0cnVlLiBTZXQgdGhpcyBwYXJhbWV0ZXIgYXMgdGhlIG5hbWUgb2YgdGhlIGZpbGUgaWYgeW91IHdhbnQgdG8gdHJpZ2dlciB0aGUgZG93bmxvYWQgd2l0aCBhIGRpZmZlcmVudCBmaWxlbmFtZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy50cmFuc2Zvcm0gVHJhbnNmb3JtIHRoZSBhc3NldCBiZWZvcmUgc2VydmluZyBpdCB0byB0aGUgY2xpZW50LlxuICAgICAqL1xuICAgIGdldFB1YmxpY1VybChwYXRoLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IF9wYXRoID0gdGhpcy5fZ2V0RmluYWxQYXRoKHBhdGgpO1xuICAgICAgICBjb25zdCBfcXVlcnlTdHJpbmcgPSBbXTtcbiAgICAgICAgY29uc3QgZG93bmxvYWRRdWVyeVBhcmFtID0gKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5kb3dubG9hZClcbiAgICAgICAgICAgID8gYGRvd25sb2FkPSR7b3B0aW9ucy5kb3dubG9hZCA9PT0gdHJ1ZSA/ICcnIDogb3B0aW9ucy5kb3dubG9hZH1gXG4gICAgICAgICAgICA6ICcnO1xuICAgICAgICBpZiAoZG93bmxvYWRRdWVyeVBhcmFtICE9PSAnJykge1xuICAgICAgICAgICAgX3F1ZXJ5U3RyaW5nLnB1c2goZG93bmxvYWRRdWVyeVBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3YW50c1RyYW5zZm9ybWF0aW9uID0gdHlwZW9mIChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudHJhbnNmb3JtKSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGNvbnN0IHJlbmRlclBhdGggPSB3YW50c1RyYW5zZm9ybWF0aW9uID8gJ3JlbmRlci9pbWFnZScgOiAnb2JqZWN0JztcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtYXRpb25RdWVyeSA9IHRoaXMudHJhbnNmb3JtT3B0c1RvUXVlcnlTdHJpbmcoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy50cmFuc2Zvcm0pIHx8IHt9KTtcbiAgICAgICAgaWYgKHRyYW5zZm9ybWF0aW9uUXVlcnkgIT09ICcnKSB7XG4gICAgICAgICAgICBfcXVlcnlTdHJpbmcucHVzaCh0cmFuc2Zvcm1hdGlvblF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcXVlcnlTdHJpbmcgPSBfcXVlcnlTdHJpbmcuam9pbignJicpO1xuICAgICAgICBpZiAocXVlcnlTdHJpbmcgIT09ICcnKSB7XG4gICAgICAgICAgICBxdWVyeVN0cmluZyA9IGA/JHtxdWVyeVN0cmluZ31gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB7IHB1YmxpY1VybDogZW5jb2RlVVJJKGAke3RoaXMudXJsfS8ke3JlbmRlclBhdGh9L3B1YmxpYy8ke19wYXRofSR7cXVlcnlTdHJpbmd9YCkgfSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBmaWxlcyB3aXRoaW4gdGhlIHNhbWUgYnVja2V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aHMgQW4gYXJyYXkgb2YgZmlsZXMgdG8gZGVsZXRlLCBpbmNsdWRpbmcgdGhlIHBhdGggYW5kIGZpbGUgbmFtZS4gRm9yIGV4YW1wbGUgW2AnZm9sZGVyL2ltYWdlLnBuZydgXS5cbiAgICAgKi9cbiAgICByZW1vdmUocGF0aHMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlbW92ZSh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vb2JqZWN0LyR7dGhpcy5idWNrZXRJZH1gLCB7IHByZWZpeGVzOiBwYXRocyB9LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBudWxsLCBlcnJvciB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBmaWxlIG1ldGFkYXRhXG4gICAgICogQHBhcmFtIGlkIHRoZSBmaWxlIGlkIHRvIHJldHJpZXZlIG1ldGFkYXRhXG4gICAgICovXG4gICAgLy8gYXN5bmMgZ2V0TWV0YWRhdGEoXG4gICAgLy8gICBpZDogc3RyaW5nXG4gICAgLy8gKTogUHJvbWlzZTxcbiAgICAvLyAgIHwge1xuICAgIC8vICAgICAgIGRhdGE6IE1ldGFkYXRhXG4gICAgLy8gICAgICAgZXJyb3I6IG51bGxcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfCB7XG4gICAgLy8gICAgICAgZGF0YTogbnVsbFxuICAgIC8vICAgICAgIGVycm9yOiBTdG9yYWdlRXJyb3JcbiAgICAvLyAgICAgfVxuICAgIC8vID4ge1xuICAgIC8vICAgdHJ5IHtcbiAgICAvLyAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldCh0aGlzLmZldGNoLCBgJHt0aGlzLnVybH0vbWV0YWRhdGEvJHtpZH1gLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KVxuICAgIC8vICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9XG4gICAgLy8gICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgLy8gICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHRocm93IGVycm9yXG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBmaWxlIG1ldGFkYXRhXG4gICAgICogQHBhcmFtIGlkIHRoZSBmaWxlIGlkIHRvIHVwZGF0ZSBtZXRhZGF0YVxuICAgICAqIEBwYXJhbSBtZXRhIHRoZSBuZXcgZmlsZSBtZXRhZGF0YVxuICAgICAqL1xuICAgIC8vIGFzeW5jIHVwZGF0ZU1ldGFkYXRhKFxuICAgIC8vICAgaWQ6IHN0cmluZyxcbiAgICAvLyAgIG1ldGE6IE1ldGFkYXRhXG4gICAgLy8gKTogUHJvbWlzZTxcbiAgICAvLyAgIHwge1xuICAgIC8vICAgICAgIGRhdGE6IE1ldGFkYXRhXG4gICAgLy8gICAgICAgZXJyb3I6IG51bGxcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfCB7XG4gICAgLy8gICAgICAgZGF0YTogbnVsbFxuICAgIC8vICAgICAgIGVycm9yOiBTdG9yYWdlRXJyb3JcbiAgICAvLyAgICAgfVxuICAgIC8vID4ge1xuICAgIC8vICAgdHJ5IHtcbiAgICAvLyAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHBvc3QoXG4gICAgLy8gICAgICAgdGhpcy5mZXRjaCxcbiAgICAvLyAgICAgICBgJHt0aGlzLnVybH0vbWV0YWRhdGEvJHtpZH1gLFxuICAgIC8vICAgICAgIHsgLi4ubWV0YSB9LFxuICAgIC8vICAgICAgIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH1cbiAgICAvLyAgICAgKVxuICAgIC8vICAgICByZXR1cm4geyBkYXRhLCBlcnJvcjogbnVsbCB9XG4gICAgLy8gICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vICAgICBpZiAoaXNTdG9yYWdlRXJyb3IoZXJyb3IpKSB7XG4gICAgLy8gICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHRocm93IGVycm9yXG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIC8qKlxuICAgICAqIExpc3RzIGFsbCB0aGUgZmlsZXMgd2l0aGluIGEgYnVja2V0LlxuICAgICAqIEBwYXJhbSBwYXRoIFRoZSBmb2xkZXIgcGF0aC5cbiAgICAgKi9cbiAgICBsaXN0KHBhdGgsIG9wdGlvbnMsIHBhcmFtZXRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFQVJDSF9PUFRJT05TKSwgb3B0aW9ucyksIHsgcHJlZml4OiBwYXRoIHx8ICcnIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBwb3N0KHRoaXMuZmV0Y2gsIGAke3RoaXMudXJsfS9vYmplY3QvbGlzdC8ke3RoaXMuYnVja2V0SWR9YCwgYm9keSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSwgcGFyYW1ldGVycyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgZXJyb3I6IG51bGwgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbnVsbCwgZXJyb3IgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbmNvZGVNZXRhZGF0YShtZXRhZGF0YSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpO1xuICAgIH1cbiAgICB0b0Jhc2U2NChkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgQnVmZmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGRhdGEpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnRvYShkYXRhKTtcbiAgICB9XG4gICAgX2dldEZpbmFsUGF0aChwYXRoKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmJ1Y2tldElkfS8ke3BhdGh9YDtcbiAgICB9XG4gICAgX3JlbW92ZUVtcHR5Rm9sZGVycyhwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL15cXC98XFwvJC9nLCAnJykucmVwbGFjZSgvXFwvKy9nLCAnLycpO1xuICAgIH1cbiAgICB0cmFuc2Zvcm1PcHRzVG9RdWVyeVN0cmluZyh0cmFuc2Zvcm0pIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICAgIGlmICh0cmFuc2Zvcm0ud2lkdGgpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGB3aWR0aD0ke3RyYW5zZm9ybS53aWR0aH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNmb3JtLmhlaWdodCkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goYGhlaWdodD0ke3RyYW5zZm9ybS5oZWlnaHR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zZm9ybS5yZXNpemUpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGByZXNpemU9JHt0cmFuc2Zvcm0ucmVzaXplfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2Zvcm0uZm9ybWF0KSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChgZm9ybWF0PSR7dHJhbnNmb3JtLmZvcm1hdH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNmb3JtLnF1YWxpdHkpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKGBxdWFsaXR5PSR7dHJhbnNmb3JtLnF1YWxpdHl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmFtcy5qb2luKCcmJyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3RvcmFnZUZpbGVBcGkuanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBGdW5jdGlvbnNDbGllbnQgfSBmcm9tICdAc3VwYWJhc2UvZnVuY3Rpb25zLWpzJztcbmltcG9ydCB7IFBvc3RncmVzdENsaWVudCwgfSBmcm9tICdAc3VwYWJhc2UvcG9zdGdyZXN0LWpzJztcbmltcG9ydCB7IFJlYWx0aW1lQ2xpZW50LCB9IGZyb20gJ0BzdXBhYmFzZS9yZWFsdGltZS1qcyc7XG5pbXBvcnQgeyBTdG9yYWdlQ2xpZW50IGFzIFN1cGFiYXNlU3RvcmFnZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdG9yYWdlLWpzJztcbmltcG9ydCB7IERFRkFVTFRfR0xPQkFMX09QVElPTlMsIERFRkFVTFRfREJfT1BUSU9OUywgREVGQVVMVF9BVVRIX09QVElPTlMsIERFRkFVTFRfUkVBTFRJTUVfT1BUSU9OUywgfSBmcm9tICcuL2xpYi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZmV0Y2hXaXRoQXV0aCB9IGZyb20gJy4vbGliL2ZldGNoJztcbmltcG9ydCB7IHN0cmlwVHJhaWxpbmdTbGFzaCwgYXBwbHlTZXR0aW5nRGVmYXVsdHMgfSBmcm9tICcuL2xpYi9oZWxwZXJzJztcbmltcG9ydCB7IFN1cGFiYXNlQXV0aENsaWVudCB9IGZyb20gJy4vbGliL1N1cGFiYXNlQXV0aENsaWVudCc7XG4vKipcbiAqIFN1cGFiYXNlIENsaWVudC5cbiAqXG4gKiBBbiBpc29tb3JwaGljIEphdmFzY3JpcHQgY2xpZW50IGZvciBpbnRlcmFjdGluZyB3aXRoIFBvc3RncmVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdXBhYmFzZUNsaWVudCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGNsaWVudCBmb3IgdXNlIGluIHRoZSBicm93c2VyLlxuICAgICAqIEBwYXJhbSBzdXBhYmFzZVVybCBUaGUgdW5pcXVlIFN1cGFiYXNlIFVSTCB3aGljaCBpcyBzdXBwbGllZCB3aGVuIHlvdSBjcmVhdGUgYSBuZXcgcHJvamVjdCBpbiB5b3VyIHByb2plY3QgZGFzaGJvYXJkLlxuICAgICAqIEBwYXJhbSBzdXBhYmFzZUtleSBUaGUgdW5pcXVlIFN1cGFiYXNlIEtleSB3aGljaCBpcyBzdXBwbGllZCB3aGVuIHlvdSBjcmVhdGUgYSBuZXcgcHJvamVjdCBpbiB5b3VyIHByb2plY3QgZGFzaGJvYXJkLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmRiLnNjaGVtYSBZb3UgY2FuIHN3aXRjaCBpbiBiZXR3ZWVuIHNjaGVtYXMuIFRoZSBzY2hlbWEgbmVlZHMgdG8gYmUgb24gdGhlIGxpc3Qgb2YgZXhwb3NlZCBzY2hlbWFzIGluc2lkZSBTdXBhYmFzZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hdXRoLmF1dG9SZWZyZXNoVG9rZW4gU2V0IHRvIFwidHJ1ZVwiIGlmIHlvdSB3YW50IHRvIGF1dG9tYXRpY2FsbHkgcmVmcmVzaCB0aGUgdG9rZW4gYmVmb3JlIGV4cGlyaW5nLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmF1dGgucGVyc2lzdFNlc3Npb24gU2V0IHRvIFwidHJ1ZVwiIGlmIHlvdSB3YW50IHRvIGF1dG9tYXRpY2FsbHkgc2F2ZSB0aGUgdXNlciBzZXNzaW9uIGludG8gbG9jYWwgc3RvcmFnZS5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5hdXRoLmRldGVjdFNlc3Npb25JblVybCBTZXQgdG8gXCJ0cnVlXCIgaWYgeW91IHdhbnQgdG8gYXV0b21hdGljYWxseSBkZXRlY3RzIE9BdXRoIGdyYW50cyBpbiB0aGUgVVJMIGFuZCBzaWducyBpbiB0aGUgdXNlci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5yZWFsdGltZSBPcHRpb25zIHBhc3NlZCBhbG9uZyB0byByZWFsdGltZS1qcyBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5nbG9iYWwuZmV0Y2ggQSBjdXN0b20gZmV0Y2ggaW1wbGVtZW50YXRpb24uXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZ2xvYmFsLmhlYWRlcnMgQW55IGFkZGl0aW9uYWwgaGVhZGVycyB0byBzZW5kIHdpdGggZWFjaCBuZXR3b3JrIHJlcXVlc3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc3VwYWJhc2VVcmwsIHN1cGFiYXNlS2V5LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICB0aGlzLnN1cGFiYXNlVXJsID0gc3VwYWJhc2VVcmw7XG4gICAgICAgIHRoaXMuc3VwYWJhc2VLZXkgPSBzdXBhYmFzZUtleTtcbiAgICAgICAgaWYgKCFzdXBhYmFzZVVybClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc3VwYWJhc2VVcmwgaXMgcmVxdWlyZWQuJyk7XG4gICAgICAgIGlmICghc3VwYWJhc2VLZXkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N1cGFiYXNlS2V5IGlzIHJlcXVpcmVkLicpO1xuICAgICAgICBjb25zdCBfc3VwYWJhc2VVcmwgPSBzdHJpcFRyYWlsaW5nU2xhc2goc3VwYWJhc2VVcmwpO1xuICAgICAgICB0aGlzLnJlYWx0aW1lVXJsID0gYCR7X3N1cGFiYXNlVXJsfS9yZWFsdGltZS92MWAucmVwbGFjZSgvXmh0dHAvaSwgJ3dzJyk7XG4gICAgICAgIHRoaXMuYXV0aFVybCA9IGAke19zdXBhYmFzZVVybH0vYXV0aC92MWA7XG4gICAgICAgIHRoaXMuc3RvcmFnZVVybCA9IGAke19zdXBhYmFzZVVybH0vc3RvcmFnZS92MWA7XG4gICAgICAgIHRoaXMuZnVuY3Rpb25zVXJsID0gYCR7X3N1cGFiYXNlVXJsfS9mdW5jdGlvbnMvdjFgO1xuICAgICAgICAvLyBkZWZhdWx0IHN0b3JhZ2Uga2V5IHVzZXMgdGhlIHN1cGFiYXNlIHByb2plY3QgcmVmIGFzIGEgbmFtZXNwYWNlXG4gICAgICAgIGNvbnN0IGRlZmF1bHRTdG9yYWdlS2V5ID0gYHNiLSR7bmV3IFVSTCh0aGlzLmF1dGhVcmwpLmhvc3RuYW1lLnNwbGl0KCcuJylbMF19LWF1dGgtdG9rZW5gO1xuICAgICAgICBjb25zdCBERUZBVUxUUyA9IHtcbiAgICAgICAgICAgIGRiOiBERUZBVUxUX0RCX09QVElPTlMsXG4gICAgICAgICAgICByZWFsdGltZTogREVGQVVMVF9SRUFMVElNRV9PUFRJT05TLFxuICAgICAgICAgICAgYXV0aDogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0FVVEhfT1BUSU9OUyksIHsgc3RvcmFnZUtleTogZGVmYXVsdFN0b3JhZ2VLZXkgfSksXG4gICAgICAgICAgICBnbG9iYWw6IERFRkFVTFRfR0xPQkFMX09QVElPTlMsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXBwbHlTZXR0aW5nRGVmYXVsdHMob3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgPyBvcHRpb25zIDoge30sIERFRkFVTFRTKTtcbiAgICAgICAgdGhpcy5zdG9yYWdlS2V5ID0gKF9hID0gc2V0dGluZ3MuYXV0aC5zdG9yYWdlS2V5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gKF9iID0gc2V0dGluZ3MuZ2xvYmFsLmhlYWRlcnMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHt9O1xuICAgICAgICBpZiAoIXNldHRpbmdzLmFjY2Vzc1Rva2VuKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGggPSB0aGlzLl9pbml0U3VwYWJhc2VBdXRoQ2xpZW50KChfYyA9IHNldHRpbmdzLmF1dGgpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IHt9LCB0aGlzLmhlYWRlcnMsIHNldHRpbmdzLmdsb2JhbC5mZXRjaCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuID0gc2V0dGluZ3MuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICB0aGlzLmF1dGggPSBuZXcgUHJveHkoe30sIHtcbiAgICAgICAgICAgICAgICBnZXQ6IChfLCBwcm9wKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQHN1cGFiYXNlL3N1cGFiYXNlLWpzOiBTdXBhYmFzZSBDbGllbnQgaXMgY29uZmlndXJlZCB3aXRoIHRoZSBhY2Nlc3NUb2tlbiBvcHRpb24sIGFjY2Vzc2luZyBzdXBhYmFzZS5hdXRoLiR7U3RyaW5nKHByb3ApfSBpcyBub3QgcG9zc2libGVgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mZXRjaCA9IGZldGNoV2l0aEF1dGgoc3VwYWJhc2VLZXksIHRoaXMuX2dldEFjY2Vzc1Rva2VuLmJpbmQodGhpcyksIHNldHRpbmdzLmdsb2JhbC5mZXRjaCk7XG4gICAgICAgIHRoaXMucmVhbHRpbWUgPSB0aGlzLl9pbml0UmVhbHRpbWVDbGllbnQoT2JqZWN0LmFzc2lnbih7IGhlYWRlcnM6IHRoaXMuaGVhZGVycywgYWNjZXNzVG9rZW46IHRoaXMuX2dldEFjY2Vzc1Rva2VuLmJpbmQodGhpcykgfSwgc2V0dGluZ3MucmVhbHRpbWUpKTtcbiAgICAgICAgdGhpcy5yZXN0ID0gbmV3IFBvc3RncmVzdENsaWVudChgJHtfc3VwYWJhc2VVcmx9L3Jlc3QvdjFgLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBzY2hlbWE6IHNldHRpbmdzLmRiLnNjaGVtYSxcbiAgICAgICAgICAgIGZldGNoOiB0aGlzLmZldGNoLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFzZXR0aW5ncy5hY2Nlc3NUb2tlbikge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuRm9yQXV0aEV2ZW50cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1cGFiYXNlIEZ1bmN0aW9ucyBhbGxvd3MgeW91IHRvIGRlcGxveSBhbmQgaW52b2tlIGVkZ2UgZnVuY3Rpb25zLlxuICAgICAqL1xuICAgIGdldCBmdW5jdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb25zQ2xpZW50KHRoaXMuZnVuY3Rpb25zVXJsLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBjdXN0b21GZXRjaDogdGhpcy5mZXRjaCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1cGFiYXNlIFN0b3JhZ2UgYWxsb3dzIHlvdSB0byBtYW5hZ2UgdXNlci1nZW5lcmF0ZWQgY29udGVudCwgc3VjaCBhcyBwaG90b3Mgb3IgdmlkZW9zLlxuICAgICAqL1xuICAgIGdldCBzdG9yYWdlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFN1cGFiYXNlU3RvcmFnZUNsaWVudCh0aGlzLnN0b3JhZ2VVcmwsIHRoaXMuaGVhZGVycywgdGhpcy5mZXRjaCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBxdWVyeSBvbiBhIHRhYmxlIG9yIGEgdmlldy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWxhdGlvbiAtIFRoZSB0YWJsZSBvciB2aWV3IG5hbWUgdG8gcXVlcnlcbiAgICAgKi9cbiAgICBmcm9tKHJlbGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3QuZnJvbShyZWxhdGlvbik7XG4gICAgfVxuICAgIC8vIE5PVEU6IHNpZ25hdHVyZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCBQb3N0Z3Jlc3RDbGllbnQuc2NoZW1hXG4gICAgLyoqXG4gICAgICogU2VsZWN0IGEgc2NoZW1hIHRvIHF1ZXJ5IG9yIHBlcmZvcm0gYW4gZnVuY3Rpb24gKHJwYykgY2FsbC5cbiAgICAgKlxuICAgICAqIFRoZSBzY2hlbWEgbmVlZHMgdG8gYmUgb24gdGhlIGxpc3Qgb2YgZXhwb3NlZCBzY2hlbWFzIGluc2lkZSBTdXBhYmFzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgLSBUaGUgc2NoZW1hIHRvIHF1ZXJ5XG4gICAgICovXG4gICAgc2NoZW1hKHNjaGVtYSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0LnNjaGVtYShzY2hlbWEpO1xuICAgIH1cbiAgICAvLyBOT1RFOiBzaWduYXR1cmVzIG11c3QgYmUga2VwdCBpbiBzeW5jIHdpdGggUG9zdGdyZXN0Q2xpZW50LnJwY1xuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBmdW5jdGlvbiBjYWxsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZuIC0gVGhlIGZ1bmN0aW9uIG5hbWUgdG8gY2FsbFxuICAgICAqIEBwYXJhbSBhcmdzIC0gVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBmdW5jdGlvbiBjYWxsXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBOYW1lZCBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIG9wdGlvbnMuaGVhZCAtIFdoZW4gc2V0IHRvIGB0cnVlYCwgYGRhdGFgIHdpbGwgbm90IGJlIHJldHVybmVkLlxuICAgICAqIFVzZWZ1bCBpZiB5b3Ugb25seSBuZWVkIHRoZSBjb3VudC5cbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5nZXQgLSBXaGVuIHNldCB0byBgdHJ1ZWAsIHRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aXRoXG4gICAgICogcmVhZC1vbmx5IGFjY2VzcyBtb2RlLlxuICAgICAqIEBwYXJhbSBvcHRpb25zLmNvdW50IC0gQ291bnQgYWxnb3JpdGhtIHRvIHVzZSB0byBjb3VudCByb3dzIHJldHVybmVkIGJ5IHRoZVxuICAgICAqIGZ1bmN0aW9uLiBPbmx5IGFwcGxpY2FibGUgZm9yIFtzZXQtcmV0dXJuaW5nXG4gICAgICogZnVuY3Rpb25zXShodHRwczovL3d3dy5wb3N0Z3Jlc3FsLm9yZy9kb2NzL2N1cnJlbnQvZnVuY3Rpb25zLXNyZi5odG1sKS5cbiAgICAgKlxuICAgICAqIGBcImV4YWN0XCJgOiBFeGFjdCBidXQgc2xvdyBjb3VudCBhbGdvcml0aG0uIFBlcmZvcm1zIGEgYENPVU5UKCopYCB1bmRlciB0aGVcbiAgICAgKiBob29kLlxuICAgICAqXG4gICAgICogYFwicGxhbm5lZFwiYDogQXBwcm94aW1hdGVkIGJ1dCBmYXN0IGNvdW50IGFsZ29yaXRobS4gVXNlcyB0aGUgUG9zdGdyZXNcbiAgICAgKiBzdGF0aXN0aWNzIHVuZGVyIHRoZSBob29kLlxuICAgICAqXG4gICAgICogYFwiZXN0aW1hdGVkXCJgOiBVc2VzIGV4YWN0IGNvdW50IGZvciBsb3cgbnVtYmVycyBhbmQgcGxhbm5lZCBjb3VudCBmb3IgaGlnaFxuICAgICAqIG51bWJlcnMuXG4gICAgICovXG4gICAgcnBjKGZuLCBhcmdzID0ge30sIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN0LnJwYyhmbiwgYXJncywgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBSZWFsdGltZSBjaGFubmVsIHdpdGggQnJvYWRjYXN0LCBQcmVzZW5jZSwgYW5kIFBvc3RncmVzIENoYW5nZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBSZWFsdGltZSBjaGFubmVsLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gVGhlIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgUmVhbHRpbWUgY2hhbm5lbC5cbiAgICAgKlxuICAgICAqL1xuICAgIGNoYW5uZWwobmFtZSwgb3B0cyA9IHsgY29uZmlnOiB7fSB9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWx0aW1lLmNoYW5uZWwobmFtZSwgb3B0cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIFJlYWx0aW1lIGNoYW5uZWxzLlxuICAgICAqL1xuICAgIGdldENoYW5uZWxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFsdGltZS5nZXRDaGFubmVscygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZXMgYW5kIHJlbW92ZXMgUmVhbHRpbWUgY2hhbm5lbCBmcm9tIFJlYWx0aW1lIGNsaWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVhbHRpbWVDaGFubmVsfSBjaGFubmVsIC0gVGhlIG5hbWUgb2YgdGhlIFJlYWx0aW1lIGNoYW5uZWwuXG4gICAgICpcbiAgICAgKi9cbiAgICByZW1vdmVDaGFubmVsKGNoYW5uZWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhbHRpbWUucmVtb3ZlQ2hhbm5lbChjaGFubmVsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5zdWJzY3JpYmVzIGFuZCByZW1vdmVzIGFsbCBSZWFsdGltZSBjaGFubmVscyBmcm9tIFJlYWx0aW1lIGNsaWVudC5cbiAgICAgKi9cbiAgICByZW1vdmVBbGxDaGFubmVscygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhbHRpbWUucmVtb3ZlQWxsQ2hhbm5lbHMoKTtcbiAgICB9XG4gICAgX2dldEFjY2Vzc1Rva2VuKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgdGhpcy5hY2Nlc3NUb2tlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBkYXRhIH0gPSB5aWVsZCB0aGlzLmF1dGguZ2V0U2Vzc2lvbigpO1xuICAgICAgICAgICAgcmV0dXJuIChfYiA9IChfYSA9IGRhdGEuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFjY2Vzc190b2tlbikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9pbml0U3VwYWJhc2VBdXRoQ2xpZW50KHsgYXV0b1JlZnJlc2hUb2tlbiwgcGVyc2lzdFNlc3Npb24sIGRldGVjdFNlc3Npb25JblVybCwgc3RvcmFnZSwgc3RvcmFnZUtleSwgZmxvd1R5cGUsIGxvY2ssIGRlYnVnLCB9LCBoZWFkZXJzLCBmZXRjaCkge1xuICAgICAgICBjb25zdCBhdXRoSGVhZGVycyA9IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0aGlzLnN1cGFiYXNlS2V5fWAsXG4gICAgICAgICAgICBhcGlrZXk6IGAke3RoaXMuc3VwYWJhc2VLZXl9YCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBTdXBhYmFzZUF1dGhDbGllbnQoe1xuICAgICAgICAgICAgdXJsOiB0aGlzLmF1dGhVcmwsXG4gICAgICAgICAgICBoZWFkZXJzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGF1dGhIZWFkZXJzKSwgaGVhZGVycyksXG4gICAgICAgICAgICBzdG9yYWdlS2V5OiBzdG9yYWdlS2V5LFxuICAgICAgICAgICAgYXV0b1JlZnJlc2hUb2tlbixcbiAgICAgICAgICAgIHBlcnNpc3RTZXNzaW9uLFxuICAgICAgICAgICAgZGV0ZWN0U2Vzc2lvbkluVXJsLFxuICAgICAgICAgICAgc3RvcmFnZSxcbiAgICAgICAgICAgIGZsb3dUeXBlLFxuICAgICAgICAgICAgbG9jayxcbiAgICAgICAgICAgIGRlYnVnLFxuICAgICAgICAgICAgZmV0Y2gsXG4gICAgICAgICAgICAvLyBhdXRoIGNoZWNrcyBpZiB0aGVyZSBpcyBhIGN1c3RvbSBhdXRob3JpemFpdG9uIGhlYWRlciB1c2luZyB0aGlzIGZsYWdcbiAgICAgICAgICAgIC8vIHNvIGl0IGtub3dzIHdoZXRoZXIgdG8gcmV0dXJuIGFuIGVycm9yIHdoZW4gZ2V0VXNlciBpcyBjYWxsZWQgd2l0aCBubyBzZXNzaW9uXG4gICAgICAgICAgICBoYXNDdXN0b21BdXRob3JpemF0aW9uSGVhZGVyOiAnQXV0aG9yaXphdGlvbicgaW4gdGhpcy5oZWFkZXJzLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2luaXRSZWFsdGltZUNsaWVudChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVhbHRpbWVDbGllbnQodGhpcy5yZWFsdGltZVVybCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBwYXJhbXM6IE9iamVjdC5hc3NpZ24oeyBhcGlrZXk6IHRoaXMuc3VwYWJhc2VLZXkgfSwgb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnBhcmFtcykgfSkpO1xuICAgIH1cbiAgICBfbGlzdGVuRm9yQXV0aEV2ZW50cygpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmF1dGgub25BdXRoU3RhdGVDaGFuZ2UoKGV2ZW50LCBzZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVUb2tlbkNoYW5nZWQoZXZlbnQsICdDTElFTlQnLCBzZXNzaW9uID09PSBudWxsIHx8IHNlc3Npb24gPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNlc3Npb24uYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBfaGFuZGxlVG9rZW5DaGFuZ2VkKGV2ZW50LCBzb3VyY2UsIHRva2VuKSB7XG4gICAgICAgIGlmICgoZXZlbnQgPT09ICdUT0tFTl9SRUZSRVNIRUQnIHx8IGV2ZW50ID09PSAnU0lHTkVEX0lOJykgJiZcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZEFjY2Vzc1Rva2VuICE9PSB0b2tlbikge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VkQWNjZXNzVG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudCA9PT0gJ1NJR05FRF9PVVQnKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWx0aW1lLnNldEF1dGgoKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgPT0gJ1NUT1JBR0UnKVxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aC5zaWduT3V0KCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZWRBY2Nlc3NUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1cGFiYXNlQ2xpZW50LmpzLm1hcCIsImltcG9ydCBTdXBhYmFzZUNsaWVudCBmcm9tICcuL1N1cGFiYXNlQ2xpZW50JztcbmV4cG9ydCAqIGZyb20gJ0BzdXBhYmFzZS9hdXRoLWpzJztcbmV4cG9ydCB7IFBvc3RncmVzdEVycm9yLCB9IGZyb20gJ0BzdXBhYmFzZS9wb3N0Z3Jlc3QtanMnO1xuZXhwb3J0IHsgRnVuY3Rpb25zSHR0cEVycm9yLCBGdW5jdGlvbnNGZXRjaEVycm9yLCBGdW5jdGlvbnNSZWxheUVycm9yLCBGdW5jdGlvbnNFcnJvciwgRnVuY3Rpb25SZWdpb24sIH0gZnJvbSAnQHN1cGFiYXNlL2Z1bmN0aW9ucy1qcyc7XG5leHBvcnQgKiBmcm9tICdAc3VwYWJhc2UvcmVhbHRpbWUtanMnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdXBhYmFzZUNsaWVudCB9IGZyb20gJy4vU3VwYWJhc2VDbGllbnQnO1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFN1cGFiYXNlIENsaWVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUNsaWVudCA9IChzdXBhYmFzZVVybCwgc3VwYWJhc2VLZXksIG9wdGlvbnMpID0+IHtcbiAgICByZXR1cm4gbmV3IFN1cGFiYXNlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUtleSwgb3B0aW9ucyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiaW1wb3J0IHsgQXV0aENsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9hdXRoLWpzJztcbmV4cG9ydCBjbGFzcyBTdXBhYmFzZUF1dGhDbGllbnQgZXh0ZW5kcyBBdXRoQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1cGFiYXNlQXV0aENsaWVudC5qcy5tYXAiLCJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uJztcbmxldCBKU19FTlYgPSAnJztcbi8vIEB0cy1pZ25vcmVcbmlmICh0eXBlb2YgRGVubyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBKU19FTlYgPSAnZGVubyc7XG59XG5lbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgSlNfRU5WID0gJ3dlYic7XG59XG5lbHNlIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIEpTX0VOViA9ICdyZWFjdC1uYXRpdmUnO1xufVxuZWxzZSB7XG4gICAgSlNfRU5WID0gJ25vZGUnO1xufVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfSEVBREVSUyA9IHsgJ1gtQ2xpZW50LUluZm8nOiBgc3VwYWJhc2UtanMtJHtKU19FTlZ9LyR7dmVyc2lvbn1gIH07XG5leHBvcnQgY29uc3QgREVGQVVMVF9HTE9CQUxfT1BUSU9OUyA9IHtcbiAgICBoZWFkZXJzOiBERUZBVUxUX0hFQURFUlMsXG59O1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfREJfT1BUSU9OUyA9IHtcbiAgICBzY2hlbWE6ICdwdWJsaWMnLFxufTtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0FVVEhfT1BUSU9OUyA9IHtcbiAgICBhdXRvUmVmcmVzaFRva2VuOiB0cnVlLFxuICAgIHBlcnNpc3RTZXNzaW9uOiB0cnVlLFxuICAgIGRldGVjdFNlc3Npb25JblVybDogdHJ1ZSxcbiAgICBmbG93VHlwZTogJ2ltcGxpY2l0Jyxcbn07XG5leHBvcnQgY29uc3QgREVGQVVMVF9SRUFMVElNRV9PUFRJT05TID0ge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25zdGFudHMuanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgbm9kZUZldGNoLCB7IEhlYWRlcnMgYXMgTm9kZUZldGNoSGVhZGVycyB9IGZyb20gJ0BzdXBhYmFzZS9ub2RlLWZldGNoJztcbmV4cG9ydCBjb25zdCByZXNvbHZlRmV0Y2ggPSAoY3VzdG9tRmV0Y2gpID0+IHtcbiAgICBsZXQgX2ZldGNoO1xuICAgIGlmIChjdXN0b21GZXRjaCkge1xuICAgICAgICBfZmV0Y2ggPSBjdXN0b21GZXRjaDtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGZldGNoID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBfZmV0Y2ggPSBub2RlRmV0Y2g7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBfZmV0Y2ggPSBmZXRjaDtcbiAgICB9XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiBfZmV0Y2goLi4uYXJncyk7XG59O1xuZXhwb3J0IGNvbnN0IHJlc29sdmVIZWFkZXJzQ29uc3RydWN0b3IgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBIZWFkZXJzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gTm9kZUZldGNoSGVhZGVycztcbiAgICB9XG4gICAgcmV0dXJuIEhlYWRlcnM7XG59O1xuZXhwb3J0IGNvbnN0IGZldGNoV2l0aEF1dGggPSAoc3VwYWJhc2VLZXksIGdldEFjY2Vzc1Rva2VuLCBjdXN0b21GZXRjaCkgPT4ge1xuICAgIGNvbnN0IGZldGNoID0gcmVzb2x2ZUZldGNoKGN1c3RvbUZldGNoKTtcbiAgICBjb25zdCBIZWFkZXJzQ29uc3RydWN0b3IgPSByZXNvbHZlSGVhZGVyc0NvbnN0cnVjdG9yKCk7XG4gICAgcmV0dXJuIChpbnB1dCwgaW5pdCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSAoX2EgPSAoeWllbGQgZ2V0QWNjZXNzVG9rZW4oKSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHN1cGFiYXNlS2V5O1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzQ29uc3RydWN0b3IoaW5pdCA9PT0gbnVsbCB8fCBpbml0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpbml0LmhlYWRlcnMpO1xuICAgICAgICBpZiAoIWhlYWRlcnMuaGFzKCdhcGlrZXknKSkge1xuICAgICAgICAgICAgaGVhZGVycy5zZXQoJ2FwaWtleScsIHN1cGFiYXNlS2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWhlYWRlcnMuaGFzKCdBdXRob3JpemF0aW9uJykpIHtcbiAgICAgICAgICAgIGhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke2FjY2Vzc1Rva2VufWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmZXRjaChpbnB1dCwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpbml0KSwgeyBoZWFkZXJzIH0pKTtcbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mZXRjaC5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmV4cG9ydCBmdW5jdGlvbiB1dWlkKCkge1xuICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHZhciByID0gKE1hdGgucmFuZG9tKCkgKiAxNikgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogKHIgJiAweDMpIHwgMHg4O1xuICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gc3RyaXBUcmFpbGluZ1NsYXNoKHVybCkge1xuICAgIHJldHVybiB1cmwucmVwbGFjZSgvXFwvJC8sICcnKTtcbn1cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXIgPSAoKSA9PiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmV4cG9ydCBmdW5jdGlvbiBhcHBseVNldHRpbmdEZWZhdWx0cyhvcHRpb25zLCBkZWZhdWx0cykge1xuICAgIGNvbnN0IHsgZGI6IGRiT3B0aW9ucywgYXV0aDogYXV0aE9wdGlvbnMsIHJlYWx0aW1lOiByZWFsdGltZU9wdGlvbnMsIGdsb2JhbDogZ2xvYmFsT3B0aW9ucywgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgeyBkYjogREVGQVVMVF9EQl9PUFRJT05TLCBhdXRoOiBERUZBVUxUX0FVVEhfT1BUSU9OUywgcmVhbHRpbWU6IERFRkFVTFRfUkVBTFRJTUVfT1BUSU9OUywgZ2xvYmFsOiBERUZBVUxUX0dMT0JBTF9PUFRJT05TLCB9ID0gZGVmYXVsdHM7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICBkYjogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0RCX09QVElPTlMpLCBkYk9wdGlvbnMpLFxuICAgICAgICBhdXRoOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfQVVUSF9PUFRJT05TKSwgYXV0aE9wdGlvbnMpLFxuICAgICAgICByZWFsdGltZTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1JFQUxUSU1FX09QVElPTlMpLCByZWFsdGltZU9wdGlvbnMpLFxuICAgICAgICBnbG9iYWw6IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9HTE9CQUxfT1BUSU9OUyksIGdsb2JhbE9wdGlvbnMpLFxuICAgICAgICBhY2Nlc3NUb2tlbjogKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4gJyc7IH0pLFxuICAgIH07XG4gICAgaWYgKG9wdGlvbnMuYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgcmVzdWx0LmFjY2Vzc1Rva2VuID0gb3B0aW9ucy5hY2Nlc3NUb2tlbjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIGhhY2sgYXJvdW5kIFJlcXVpcmVkPD5cbiAgICAgICAgZGVsZXRlIHJlc3VsdC5hY2Nlc3NUb2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlcnMuanMubWFwIiwiZXhwb3J0IGNvbnN0IHZlcnNpb24gPSAnMi40OS40Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlcnNpb24uanMubWFwIiwiLy8gc3JjL2F1dGgvYXV0aC5qc1xuLyoqXG4gKiBBdXRoZW50aWNhdGlvbiBNb2R1bGUgLSBCYXNlXG4gKiBAbW9kdWxlIGF1dGhcbiAqIEBkZXNjcmlwdGlvbiBCYXNlIG1vZHVsZSBmb3IgYXV0aGVudGljYXRpb24gd2l0aCBjb21tb24gZnVuY3Rpb25zIGFuZCBjb25maWd1cmF0aW9uXG4gKiBAdmVyc2lvbiAwLjAuNVxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4wLjUgKDIwMjUtMDUtMTUpOiBBZGRlZCBzZXNzaW9uIHZhbGlkYXRpb24gYW5kIHByb3RlY3Rpb24gYWdhaW5zdCBzdGFsZSBzZXNzaW9ucy5cbiAqIC0gMC4wLjQgKDIwMjUtMDUtMTUpOiBSZW1vdmFsIG9mIEZpcmViYXNlIENsb3VkIEZ1bmN0aW9ucyBjb25zdGFudHMuXG4gKiAtIDAuMC4zICgyMDI1LTA1LTEzKTogTW9kaWZpZWQgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlIG1hbmFnZW1lbnQgdG8gdXNlIFN1cGFiYXNlIEF1dGggc3lzdGVtLlxuICogLSAwLjAuMiAoMjAyNS0wNS0xMyk6IFJlb3JnYW5pemF0aW9uIGludG8gc2VwYXJhdGUgbW9kdWxlc1xuICogLSAwLjAuMSAoMjAyNS0wNS0wMyk6IEluaXRpYWwgY3JlYXRpb25cbiAqL1xuXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gXCIuLi9zdXBhYmFzZS1jbGllbnQuanNcIjtcblxuLy8gR2xvYmFsIGF1dGhlbnRpY2F0aW9uIHN0YXRlXG5sZXQgY3VycmVudFVzZXIgPSBudWxsO1xubGV0IHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHVzZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSB1c2VyIC0gVXNlciBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50VXNlcih1c2VyKSB7XG4gIGN1cnJlbnRVc2VyID0gdXNlcjtcbiAgLy8gUG9zc2libGUgc3RvcmFnZSBpbiBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2VcbiAgaWYgKHVzZXIpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRVc2VyXCIsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgfSBlbHNlIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICB9XG59XG5cbi8qKlxuICogVmFsaWRhdGVzIGlmIHRoZSBjdXJyZW50IHNlc3Npb24gaXMgYWN0aXZlIHdpdGggU3VwYWJhc2VcbiAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBUcnVlIGlmIHNlc3Npb24gaXMgdmFsaWQsIGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmFsaWRhdGVTZXNzaW9uKCkge1xuICB0cnkge1xuICAgIC8vIEdldCBjdXJyZW50IHNlc3Npb24gZnJvbSBTdXBhYmFzZVxuICAgIGNvbnN0IHtcbiAgICAgIGRhdGE6IHsgc2Vzc2lvbiB9LFxuICAgICAgZXJyb3I6IHNlc3Npb25FcnJvcixcbiAgICB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5nZXRTZXNzaW9uKCk7XG5cbiAgICAvLyBObyBzZXNzaW9uIG9yIGVycm9yIHJldHJpZXZpbmcgc2Vzc2lvblxuICAgIGlmIChzZXNzaW9uRXJyb3IgfHwgIXNlc3Npb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTm8gdmFsaWQgc2Vzc2lvbiBmb3VuZFwiKTtcbiAgICAgIHNldEN1cnJlbnRVc2VyKG51bGwpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFRyeSB0byByZWZyZXNoIHRoZSB0b2tlbiB0byB2YWxpZGF0ZSBpdCB3aXRoIHRoZSBzZXJ2ZXJcbiAgICBjb25zdCB7IGVycm9yOiByZWZyZXNoRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGgucmVmcmVzaFNlc3Npb24oKTtcblxuICAgIGlmIChyZWZyZXNoRXJyb3IpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlNlc3Npb24gdmFsaWRhdGlvbiBmYWlsZWQ6XCIsIHJlZnJlc2hFcnJvcik7XG4gICAgICAvLyBGb3JjZSBjbGVhciB0aGUgaW52YWxpZCBzZXNzaW9uXG4gICAgICBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25PdXQoKTtcbiAgICAgIHNldEN1cnJlbnRVc2VyKG51bGwpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFNlc3Npb24gaXMgdmFsaWQsIHVwZGF0ZSB0aGUgY3VycmVudCB1c2VyXG4gICAgc2V0Q3VycmVudFVzZXIoc2Vzc2lvbi51c2VyKTtcbiAgICBzZXNzaW9uVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJTZXNzaW9uIHZhbGlkYXRpb24gZXJyb3I6XCIsIGUpO1xuICAgIHNldEN1cnJlbnRVc2VyKG51bGwpO1xuICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgdXNlclxuICogQHBhcmFtIHtib29sZWFufSB2YWxpZGF0ZSAtIFdoZXRoZXIgdG8gdmFsaWRhdGUgdGhlIHNlc3Npb24gd2l0aCBTdXBhYmFzZVxuICogQHJldHVybnMge1Byb21pc2U8T2JqZWN0fG51bGw+fSBUaGUgY3VycmVudCB1c2VyIG9yIG51bGxcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyKHZhbGlkYXRlID0gdHJ1ZSkge1xuICAvLyBJZiB3ZSBuZWVkIHRvIHZhbGlkYXRlIGFuZCBoYXZlbid0IGRvbmUgc28geWV0XG4gIGlmICh2YWxpZGF0ZSAmJiAhc2Vzc2lvblZhbGlkYXRlZCkge1xuICAgIGF3YWl0IHZhbGlkYXRlU2Vzc2lvbigpO1xuICB9XG5cbiAgLy8gSWYgbm8gdmFsaWRhdGlvbiBuZWVkZWQgb3IgYWxyZWFkeSB2YWxpZGF0ZWRcbiAgaWYgKCF2YWxpZGF0ZSAmJiAhY3VycmVudFVzZXIpIHtcbiAgICAvLyBUcnkgdG8gcmV0cmlldmUgZnJvbSBzdG9yYWdlIGlmIG5vdCBpbiBtZW1vcnlcbiAgICBjb25zdCBzdG9yZWRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICBpZiAoc3RvcmVkVXNlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHN0b3JlZFVzZXIpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmV0cmlldmluZyB1c2VyOlwiLCBlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY3VycmVudFVzZXI7XG59XG5cbi8qKlxuICogU3luY2hyb25vdXMgdmVyc2lvbiBvZiBnZXRDdXJyZW50VXNlciBmb3Igbm9uLWFzeW5jIGNvbnRleHRzXG4gKiBXQVJOSU5HOiBUaGlzIG1heSByZXR1cm4gc3RhbGUgZGF0YSBpZiBzZXNzaW9uIGlzIGludmFsaWRcbiAqIEByZXR1cm5zIHtPYmplY3R8bnVsbH0gVGhlIGN1cnJlbnQgdXNlciBvciBudWxsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50VXNlclN5bmMoKSB7XG4gIGlmICghY3VycmVudFVzZXIpIHtcbiAgICBjb25zdCBzdG9yZWRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICBpZiAoc3RvcmVkVXNlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY3VycmVudFVzZXIgPSBKU09OLnBhcnNlKHN0b3JlZFVzZXIpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgcmV0cmlldmluZyB1c2VyOlwiLCBlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJjdXJyZW50VXNlclwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY3VycmVudFVzZXI7XG59XG5cbi8qKlxuICogTG9ncyBvdXQgdGhlIHVzZXJcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nb3V0KCkge1xuICB0cnkge1xuICAgIC8vIFNpZ24gb3V0IGZyb20gU3VwYWJhc2VcbiAgICBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25PdXQoKTtcblxuICAgIC8vIENsZWFyIGxvY2FsIHN0YXRlXG4gICAgY3VycmVudFVzZXIgPSBudWxsO1xuICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuXG4gICAgLy8gUmVkaXJlY3QgdG8gdGhlIGhvbWUgcGFnZSBhZnRlciBsb2dvdXRcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkdXJpbmcgbG9nb3V0OlwiLCBlcnJvcik7XG4gICAgLy8gU3RpbGwgY2xlYXIgbG9jYWwgc3RhdGUgZXZlbiBpZiBTdXBhYmFzZSBzaWduT3V0IGZhaWxzXG4gICAgY3VycmVudFVzZXIgPSBudWxsO1xuICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcImN1cnJlbnRVc2VyXCIpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvXCI7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluIHdpdGggdmFsaWQgc2Vzc2lvblxuICogQHBhcmFtIHtib29sZWFufSB2YWxpZGF0ZSAtIFdoZXRoZXIgdG8gdmFsaWRhdGUgd2l0aCBTdXBhYmFzZSBmaXJzdFxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFRydWUgaWYgdGhlIHVzZXIgaXMgbG9nZ2VkIGluIHdpdGggdmFsaWQgc2Vzc2lvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaXNMb2dnZWRJbih2YWxpZGF0ZSA9IHRydWUpIHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKHZhbGlkYXRlKTtcbiAgcmV0dXJuIHVzZXIgIT09IG51bGw7XG59XG5cbi8qKlxuICogU3luY2hyb25vdXMgdmVyc2lvbiBvZiBpc0xvZ2dlZEluXG4gKiBXQVJOSU5HOiBUaGlzIG1heSByZXR1cm4gaW5jb3JyZWN0IHJlc3VsdHMgaWYgc2Vzc2lvbiBpcyBpbnZhbGlkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB1c2VyIGFwcGVhcnMgdG8gYmUgbG9nZ2VkIGluIGxvY2FsbHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTG9nZ2VkSW5TeW5jKCkge1xuICByZXR1cm4gZ2V0Q3VycmVudFVzZXJTeW5jKCkgIT09IG51bGw7XG59XG5cbi8qKlxuICogUHJvdGVjdHMgYSBwYWdlIHRoYXQgcmVxdWlyZXMgYXV0aGVudGljYXRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSByZWRpcmVjdFVybCAtIFVSTCB0byByZWRpcmVjdCBpZiBub3QgYXV0aGVudGljYXRlZFxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFRydWUgaWYgYXV0aGVudGljYXRlZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm90ZWN0UGFnZShyZWRpcmVjdFVybCA9IFwiL2xvZ2luXCIpIHtcbiAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IHZhbGlkYXRlU2Vzc2lvbigpO1xuXG4gIGlmICghaXNWYWxpZCkge1xuICAgIC8vIFJlZGlyZWN0IHRvIGxvZ2luIHBhZ2VcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0VXJsO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGF1dGggb24gcGFnZSBsb2FkXG4gKiBDYWxsIHRoaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyIGFwcCBpbml0aWFsaXphdGlvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdEF1dGgoKSB7XG4gIC8vIFZhbGlkYXRlIHNlc3Npb24gb24gcGFnZSBsb2FkXG4gIGF3YWl0IHZhbGlkYXRlU2Vzc2lvbigpO1xuXG4gIC8vIFNldCB1cCBhdXRoIHN0YXRlIGNoYW5nZSBsaXN0ZW5lclxuICBzdXBhYmFzZS5hdXRoLm9uQXV0aFN0YXRlQ2hhbmdlKGFzeW5jIChldmVudCwgc2Vzc2lvbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiQXV0aCBzdGF0ZSBjaGFuZ2VkOlwiLCBldmVudCk7XG5cbiAgICBpZiAoZXZlbnQgPT09IFwiU0lHTkVEX0lOXCIgJiYgc2Vzc2lvbikge1xuICAgICAgc2V0Q3VycmVudFVzZXIoc2Vzc2lvbi51c2VyKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQgPT09IFwiU0lHTkVEX09VVFwiKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihudWxsKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcIlRPS0VOX1JFRlJFU0hFRFwiKSB7XG4gICAgICBzZXRDdXJyZW50VXNlcihzZXNzaW9uLnVzZXIpO1xuICAgICAgc2Vzc2lvblZhbGlkYXRlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChldmVudCA9PT0gXCJVU0VSX1VQREFURURcIikge1xuICAgICAgc2V0Q3VycmVudFVzZXIoc2Vzc2lvbi51c2VyKTtcbiAgICAgIHNlc3Npb25WYWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogRGlzcGxheXMgYW4gZXJyb3IgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBFcnJvciBtZXNzYWdlIHRvIGRpc3BsYXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB3aGVyZSB0byBkaXNwbGF5IHRoZSBlcnJvclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1lc3NhZ2UsIGVsZW1lbnRJZCA9IFwiZXJyb3JNZXNzYWdlXCIpIHtcbiAgY29uc3QgZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVycm9yRWxlbWVudCkge1xuICAgIGVycm9yRWxlbWVudC5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBlbGVtZW50IG5vdCBmb3VuZDpcIiwgZWxlbWVudElkKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BsYXlzIGEgc3RhdHVzIG1lc3NhZ2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gTWVzc2FnZSB0byBkaXNwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIE1lc3NhZ2UgdHlwZSAoc3VjY2VzcywgaW5mbywgd2FybmluZywgZGFuZ2VyKVxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHdoZXJlIHRvIGRpc3BsYXkgdGhlIG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dTdGF0dXMoXG4gIG1lc3NhZ2UsXG4gIHR5cGUgPSBcImluZm9cIixcbiAgZWxlbWVudElkID0gXCJzdGF0dXNNZXNzYWdlXCJcbikge1xuICBjb25zdCBzdGF0dXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKHN0YXR1c0VsZW1lbnQpIHtcbiAgICBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcblxuICAgIC8vIFJlbW92ZSBhbGwgYWxlcnQtKiBjbGFzc2VzXG4gICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB7XG4gICAgICBpZiAoY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJhbGVydC1cIikpIHtcbiAgICAgICAgc3RhdHVzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgdGhlIGNsYXNzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGVcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5hZGQoYGFsZXJ0LSR7dHlwZX1gKTtcbiAgICBzdGF0dXNFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcihcIlN0YXR1cyBlbGVtZW50IG5vdCBmb3VuZDpcIiwgZWxlbWVudElkKTtcbiAgfVxufVxuXG4vKipcbiAqIEhpZGVzIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbGVtZW50SWQgLSBJRCBvZiB0aGUgZWxlbWVudCB0byBoaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50SWQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gIGlmIChlbGVtZW50KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbi8qKlxuICogU2hvd3MgYW4gZWxlbWVudFxuICogQHBhcmFtIHtzdHJpbmd9IGVsZW1lbnRJZCAtIElEIG9mIHRoZSBlbGVtZW50IHRvIHNob3dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnRJZCkge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG93cyB0aGUgbG9hZGluZyBpbmRpY2F0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBidXR0b25JZCAtIElEIG9mIHRoZSBidXR0b25cbiAqIEBwYXJhbSB7c3RyaW5nfSBzcGlubmVySWQgLSBJRCBvZiB0aGUgc3Bpbm5lclxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0xvYWRpbmcoYnV0dG9uSWQsIHNwaW5uZXJJZCkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b25JZCk7XG4gIGNvbnN0IHNwaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcGlubmVySWQpO1xuXG4gIGlmIChidXR0b24pIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIGlmIChzcGlubmVyKSBzcGlubmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG59XG5cbi8qKlxuICogSGlkZXMgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gYnV0dG9uSWQgLSBJRCBvZiB0aGUgYnV0dG9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3Bpbm5lcklkIC0gSUQgb2YgdGhlIHNwaW5uZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZGVMb2FkaW5nKGJ1dHRvbklkLCBzcGlubmVySWQpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYnV0dG9uSWQpO1xuICBjb25zdCBzcGlubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3Bpbm5lcklkKTtcblxuICBpZiAoYnV0dG9uKSBidXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgaWYgKHNwaW5uZXIpIHNwaW5uZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn1cblxuLy8gRXhwb3J0IHRoZSBuZWNlc3NhcnkgZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXNcbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q3VycmVudFVzZXIsXG4gIGdldEN1cnJlbnRVc2VyU3luYyxcbiAgc2V0Q3VycmVudFVzZXIsXG4gIGxvZ291dCxcbiAgaXNMb2dnZWRJbixcbiAgaXNMb2dnZWRJblN5bmMsXG4gIHZhbGlkYXRlU2Vzc2lvbixcbiAgcHJvdGVjdFBhZ2UsXG4gIGluaXRBdXRoLFxuICBzaG93RXJyb3IsXG4gIHNob3dTdGF0dXMsXG4gIGhpZGVFbGVtZW50LFxuICBzaG93RWxlbWVudCxcbiAgc2hvd0xvYWRpbmcsXG4gIGhpZGVMb2FkaW5nLFxufTtcbiIsIi8vIHNyYy9hdXRoL3NpZ251cC5qc1xuLyoqXG4gKiBTaWdudXAgTW9kdWxlXG4gKiBAbW9kdWxlIHNpZ251cFxuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdXNlciByZWdpc3RyYXRpb24gd2l0aCBjbGllbnQtc2lkZSB2YWxpZGF0aW9uIHVzaW5nIFN1cGFiYXNlXG4gKiBAdmVyc2lvbiAwLjEuMFxuICpcbiAqIEBjaGFuZ2Vsb2dcbiAqIC0gMC4xLjAgKDIwMjUtMDUtMTUpOiBNaWdyYXRlZCB0byBTdXBhYmFzZSBjbGllbnQtc2lkZSBhdXRoXG4gKiAtIDAuMC4zICgyMDI1LTA1LTEzKTogRW5zdXJlIHN0YXR1cyBtZXNzYWdlIGlzIGFsc28gaGlkZGVuIG9uIG5ldyBzdWJtaXQuXG4gKiAtIDAuMC4yICgyMDI1LTA1LTEwKTogQWRkZWQgcm9idXN0IGNsaWVudC1zaWRlIGVtYWlsIGZvcm1hdCBhbmQgcGFzc3dvcmQgY29tcGxleGl0eSB2YWxpZGF0aW9uLlxuICogLSAwLjAuMSAoMjAyNS0wNS0wOCk6IENyZWF0ZWQgdGhlIHNpZ251cCBtb2R1bGUgd2l0aCBiYXNpYyBmdW5jdGlvbmFsaXR5LlxuICovXG5cbmltcG9ydCB7IHNob3dFcnJvciwgc2hvd1N0YXR1cywgc2hvd0xvYWRpbmcsIGhpZGVMb2FkaW5nIH0gZnJvbSBcIi4vYXV0aC5qc1wiO1xuaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tIFwiLi4vc3VwYWJhc2UtY2xpZW50LmpzXCI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIHNpZ251cCBwYWdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbml0U2lnbnVwUGFnZSgpIHtcbiAgY29uc3Qgc2lnbnVwRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbnVwRm9ybVwiKTtcbiAgY29uc3QgZXJyb3JNZXNzYWdlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnJvck1lc3NhZ2VcIik7XG4gIGNvbnN0IHN0YXR1c01lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXR1c01lc3NhZ2VcIik7XG5cbiAgaWYgKHNpZ251cEZvcm0pIHtcbiAgICBzaWdudXBGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgLy8gUmVzZXQgbWVzc2FnZXNcbiAgICAgIGlmIChlcnJvck1lc3NhZ2VEaXYpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlRGl2LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIGVycm9yTWVzc2FnZURpdi5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXR1c01lc3NhZ2UpIHtcbiAgICAgICAgc3RhdHVzTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IGZvcm0gdmFsdWVzXG4gICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWUudHJpbSgpO1xuICAgICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuICAgICAgY29uc3QgY29uZmlybVBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25maXJtUGFzc3dvcmRcIikudmFsdWU7XG5cbiAgICAgIGxldCB2YWxpZGF0aW9uRXJyb3JzID0gW107XG5cbiAgICAgIC8vIC0tLSBDbGllbnQtc2lkZSBWYWxpZGF0aW9uIC0tLVxuICAgICAgLy8gMS4gRW1haWwgRm9ybWF0IFZhbGlkYXRpb25cbiAgICAgIGNvbnN0IGVtYWlsUGF0dGVybiA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvO1xuICAgICAgaWYgKCFlbWFpbFBhdHRlcm4udGVzdChlbWFpbCkpIHtcbiAgICAgICAgdmFsaWRhdGlvbkVycm9ycy5wdXNoKFwiTCdhZHJlc3NlIGVtYWlsIG4nZXN0IHBhcyB2YWxpZGUuXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyAyLiBDaGVjayBpZiBwYXNzd29yZHMgbWF0Y2hcbiAgICAgIGlmIChwYXNzd29yZCAhPT0gY29uZmlybVBhc3N3b3JkKSB7XG4gICAgICAgIHZhbGlkYXRpb25FcnJvcnMucHVzaChcIkxlcyBtb3RzIGRlIHBhc3NlIG5lIGNvcnJlc3BvbmRlbnQgcGFzLlwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gMy4gUGFzc3dvcmQgU3RyZW5ndGggVmFsaWRhdGlvblxuICAgICAgY29uc3QgcGFzc3dvcmRDb21wbGV4aXR5UGF0dGVybiA9IC9eKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qXFxkKS4rJC87XG4gICAgICBpZiAoIXBhc3N3b3JkQ29tcGxleGl0eVBhdHRlcm4udGVzdChwYXNzd29yZCkgfHwgcGFzc3dvcmQubGVuZ3RoIDwgOCkge1xuICAgICAgICB2YWxpZGF0aW9uRXJyb3JzLnB1c2goXCJMZSBmb3JtYXQgZHUgbW90IGRlIHBhc3NlIGVzdCBpbnZhbGlkZS5cIik7XG4gICAgICB9XG5cbiAgICAgIC8vIC0tLSBIYW5kbGUgVmFsaWRhdGlvbiBSZXN1bHRzIC0tLVxuICAgICAgaWYgKHZhbGlkYXRpb25FcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBlcnJvclRleHQgPSB2YWxpZGF0aW9uRXJyb3JzLmpvaW4oXCI8YnI+XCIpO1xuICAgICAgICBzaG93RXJyb3IoZXJyb3JUZXh0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBTaG93IGxvYWRpbmcgc3RhdGVcbiAgICAgIHNob3dMb2FkaW5nKFwic2lnbnVwQnRuXCIsIFwic2lnbnVwU3Bpbm5lclwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ2FsbCBzaWdudXAgZnVuY3Rpb25cbiAgICAgICAgYXdhaXQgc2lnbnVwKGVtYWlsLCBwYXNzd29yZCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiU2lnbnVwIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIHNob3dFcnJvcihcbiAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IFwiVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsJ2luc2NyaXB0aW9uLlwiXG4gICAgICAgICk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICAvLyBSZXNldCBidXR0b24gc3RhdGVcbiAgICAgICAgaGlkZUxvYWRpbmcoXCJzaWdudXBCdG5cIiwgXCJzaWdudXBTcGlubmVyXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBcIkNSSVRJQ0FMOiBTaWdudXAgZm9ybSB3aXRoIElEICdzaWdudXBGb3JtJyBub3QgZm91bmQuIEV2ZW50IGxpc3RlbmVyIG5vdCBhdHRhY2hlZC5cIlxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZWdpc3RlcnMgYSB1c2VyIHdpdGggZW1haWwgYW5kIHBhc3N3b3JkIHVzaW5nIFN1cGFiYXNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZW1haWwgLSBVc2VyJ3MgZW1haWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCAtIFVzZXIncyBwYXNzd29yZFxuICogQHJldHVybnMge1Byb21pc2V9IC0gUHJvbWlzZSByZXNvbHZlZCBvbiBzdWNjZXNzXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaWdudXAoZW1haWwsIHBhc3N3b3JkKSB7XG4gIHRyeSB7XG4gICAgLy8gQ2FsbCBTdXBhYmFzZSBzaWdudXBcbiAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25VcCh7XG4gICAgICBlbWFpbCxcbiAgICAgIHBhc3N3b3JkLFxuICAgIH0pO1xuXG4gICAgLy8gQ2hlY2sgZm9yIGVycm9yc1xuICAgIGlmIChlcnJvcikgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuXG4gICAgLy8gQ2hlY2sgaWYgdXNlciB3YXMgY3JlYXRlZCAoc2ltaWxhciB0byBjaGVja2luZyBpZGVudGl0aWVzIGxlbmd0aCBpbiBQeXRob24gY29kZSlcbiAgICBpZiAoIWRhdGEudXNlciB8fCBkYXRhLnVzZXIuaWRlbnRpdGllcz8ubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ2V0dGUgYWRyZXNzZSBtYWlsIGEgZMOpasOgIMOpdMOpIHV0aWxpc8OpZS4gVmV1aWxsZXogdXRpbGlzZXIgdW5lIGF1dHJlIGFkcmVzc2UgbWFpbC5cIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBTdWNjZXNzIGNhc2VcbiAgICBzaG93U3RhdHVzKFxuICAgICAgXCJJZGVudGlmaWFudHMgdmFsaWRlcyAhIFZldWlsbGV6IHbDqXJpZmllciB2b3RyZSBlbWFpbCBwb3VyIGNvbmZpcm1lciB2b3RyZSBpbnNjcmlwdGlvbi5cIixcbiAgICAgIFwic3VjY2Vzc1wiXG4gICAgKTtcblxuICAgIC8vIE9wdGlvbmFsbHkgaGlkZSBmb3JtIG9yIHJlZGlyZWN0IG9uIHN1Y2Nlc3NcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ251cEZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gSGFuZGxlIHJhdGUgbGltaXRpbmcgc2ltaWxhciB0byB0aGUgUHl0aG9uIGNvZGVcbiAgICBpZiAoZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcIm9ubHkgcmVxdWVzdCB0aGlzIGFmdGVyXCIpKSB7XG4gICAgICBjb25zdCB3YWl0VGltZU1hdGNoID0gZXJyb3IubWVzc2FnZS5tYXRjaChcbiAgICAgICAgL29ubHkgcmVxdWVzdCB0aGlzIGFmdGVyIChcXGQrKSBzZWNvbmRzL1xuICAgICAgKTtcbiAgICAgIGlmICh3YWl0VGltZU1hdGNoKSB7XG4gICAgICAgIGNvbnN0IHdhaXRUaW1lID0gd2FpdFRpbWVNYXRjaFsxXTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBWZXVpbGxleiByw6llc3NheWVyIGRhbnMgJHt3YWl0VGltZX0gc2Vjb25kZXMuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5lcnJvcihcIlNpZ251cCBlcnJvcjpcIiwgZXJyb3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5pdFNpZ251cFBhZ2UsXG4gIHNpZ251cCxcbn07XG4iLCIvKipcbiAqIFN1cGFiYXNlIENsaWVudFxuICogQG1vZHVsZSBzdXBhYmFzZS1jbGllbnRcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIG1vZHVsZSBoYW5kbGVzIHRoZSBTdXBhYmFzZSBjbGllbnQgaW5pdGlhbGl6YXRpb24gYW5kIGNvbmZpZ3VyYXRpb24uXG4gKiBAdmVyc2lvbiAwLjAuMVxuICogQGF1dGhvciBHcmV5UGFuZGFcbiAqXG4gKiBAY2hhbmdlbG9nXG4gKiAtIDAuMC4xICgyMDI1LTA1LTA5KTogSW5pdGlhbCB2ZXJzaW9uIHdpdGggYmFzaWMgU3VwYWJhc2UgY2xpZW50IGluaXRpYWxpemF0aW9uLlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcblxuY29uc3Qgc3VwYWJhc2VVcmwgPSBcImh0dHBzOi8vb2ZleXNzaXBpYmt0bWJmZWJpYm8uc3VwYWJhc2UuY29cIjtcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9XG4gIFwiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW05bVpYbHpjMmx3YVdKcmRHMWlabVZpYVdKdklpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzTkRNNU1qVXdPVFFzSW1WNGNDSTZNakExT1RVd01UQTVOSDAudzcxQ0FLZm9sa3R6UmwtVG1MVmhIWWFFYmhDZlZrNEE3WXJhRVVDZ2xyVVwiO1xuXG5jb25zdCBjbGllbnQgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSk7XG5cbmV4cG9ydCBjb25zdCBzdXBhYmFzZSA9IGNsaWVudDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mID8gKG9iaikgPT4gKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKSA6IChvYmopID0+IChvYmouX19wcm90b19fKTtcbnZhciBsZWFmUHJvdG90eXBlcztcbi8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuLy8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4vLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbi8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuLy8gbW9kZSAmIDE2OiByZXR1cm4gdmFsdWUgd2hlbiBpdCdzIFByb21pc2UtbGlrZVxuLy8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuX193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcblx0aWYobW9kZSAmIDEpIHZhbHVlID0gdGhpcyh2YWx1ZSk7XG5cdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG5cdGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcblx0XHRpZigobW9kZSAmIDQpICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcblx0XHRpZigobW9kZSAmIDE2KSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlO1xuXHR9XG5cdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG5cdHZhciBkZWYgPSB7fTtcblx0bGVhZlByb3RvdHlwZXMgPSBsZWFmUHJvdG90eXBlcyB8fCBbbnVsbCwgZ2V0UHJvdG8oe30pLCBnZXRQcm90byhbXSksIGdldFByb3RvKGdldFByb3RvKV07XG5cdGZvcih2YXIgY3VycmVudCA9IG1vZGUgJiAyICYmIHZhbHVlOyB0eXBlb2YgY3VycmVudCA9PSAnb2JqZWN0JyAmJiAhfmxlYWZQcm90b3R5cGVzLmluZGV4T2YoY3VycmVudCk7IGN1cnJlbnQgPSBnZXRQcm90byhjdXJyZW50KSkge1xuXHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN1cnJlbnQpLmZvckVhY2goKGtleSkgPT4gKGRlZltrZXldID0gKCkgPT4gKHZhbHVlW2tleV0pKSk7XG5cdH1cblx0ZGVmWydkZWZhdWx0J10gPSAoKSA9PiAodmFsdWUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGRlZik7XG5cdHJldHVybiBucztcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcImpzL1wiICsgY2h1bmtJZCArIFwiLmJ1bmRsZS5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJ1cmJhbmRvY3Nfd2ViYXBwOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0NSSVBUJylcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC9eYmxvYjovLCBcIlwiKS5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmwgKyBcIi4uL1wiOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcInNpZ251cFwiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgPyBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gOiB1bmRlZmluZWQ7XG5cdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG5cdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gKGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdKSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YVsxXShlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCwgXCJjaHVuay1cIiArIGNodW5rSWQsIGNodW5rSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblxufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3VyYmFuZG9jc193ZWJhcHBcIl0gPSBzZWxmW1wid2VicGFja0NodW5rdXJiYW5kb2NzX3dlYmFwcFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiLy8gc3JjL2VudHJpZXMvc2lnbnVwLmpzXG4vKipcbiAqIFNpZ251cCBFbnRyeSBQb2ludFxuICpcbiAqIFRoaXMgbW9kdWxlIHNlcnZlcyBhcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBzaWdudXAgcGFnZS5cbiAqL1xuXG4vLyBJbXBvcnQgb3VyIHNpZ251cCBtb2R1bGVcbmltcG9ydCB7IGluaXRTaWdudXBQYWdlIH0gZnJvbSBcIi4uL2F1dGgvc2lnbnVwLmpzXCI7XG5cbi8vIEluaXRpYWxpemUgc2lnbnVwIHBhZ2Ugd2hlbiBET00gaXMgbG9hZGVkXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIC8vIEluaXRpYWxpemUgc2lnbnVwIHBhZ2VcbiAgaW5pdFNpZ251cFBhZ2UoKTtcblxuICBjb25zb2xlLmxvZyhcIlNpZ251cCBwYWdlIGluaXRpYWxpemVkXCIpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=