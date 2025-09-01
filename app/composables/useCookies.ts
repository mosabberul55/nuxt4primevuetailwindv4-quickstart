import {mergeRolePermissions} from "~/utils/permission.util";

interface CookieOptions {
    maxAge: number;
    priority: 'high' | 'low' | 'medium';
    secure: boolean;
    size: number;
    sameSite: 'strict' | 'lax' | 'none';
    default: () => string | null;
    watch: boolean;
}

const commonCookieOptions: CookieOptions = {
    maxAge: 60 * 60 * 24 * 30,
    priority: 'high',
    secure: true,
    size: 20480,
    sameSite: 'lax',
    default: () => null,
    watch: true
};

// Core composable similar to confirmation.ts style
export function useCookies() {
    const tokenCookie = useCookie<string | null>('token', commonCookieOptions);
    const userCookie = useCookie<string | null>('user', commonCookieOptions);
    const rolesCookie = useCookie<string | null>('roles', commonCookieOptions);

    const getAccessToken = () => tokenCookie.value || null;

    const parseJSONSafe = <T = unknown>(val: string | null): T | null => {
        if (!val) return null;
        try {
            return JSON.parse(val) as T;
        } catch (_) {
            return null;
        }
    };

    const getUserCookie = <T = unknown>(): T | string | null => {
        // Try to parse JSON, otherwise return raw string
        const parsed = parseJSONSafe<T>(userCookie.value);
        return parsed ?? (userCookie.value || null);
    };

    const getRolePermissionsCookie = <T = unknown[]>(): T | null => {
        // roles stored as JSON string; return parsed array or null
        return parseJSONSafe<T>(rolesCookie.value);
    };

    const setCookie = (name: string, value: string | null, options: CookieOptions = commonCookieOptions): void => {
        const c = useCookie<string | null>(name, options);
        // When value is null, Nuxt will unset cookie
        c.value = value;
    };

    const setUser = (user: unknown): boolean => {
        // Store as JSON string for consistency
        const json = typeof user === 'string' ? user : JSON.stringify(user);
        setCookie('user', json);
        return true;
    };

    const setRolePermissionsCookie = (roles: any): boolean => {
        const rolePermissions = mergeRolePermissions(roles);
        setCookie('roles', JSON.stringify(rolePermissions));
        return true;
    };

    const setAccessTokenCookie = (authorization: string | null): boolean => {
        setCookie('token', authorization ?? null);
        return true;
    };

    const resetAll = (): boolean => {
        // Remove cookies cleanly
        setCookie('token', null);
        setCookie('user', null);
        setCookie('roles', null);
        return true;
    };

    return {
        // getters
        getAccessToken, getUserCookie, getRolePermissionsCookie,
        // setters
        setCookie, setUser, setRolePermissionsCookie, setAccessTokenCookie, resetAll,
        // also expose raw refs if needed
        tokenCookie,
        userCookie,
        rolesCookie,
    };
}

// Backward-compatible named exports delegating to composable API
export function accessToken(): string | null {
    const { getAccessToken } = useCookies();
    return getAccessToken();
}

export function getUser(): any {
    const { getUserCookie } = useCookies();
    return getUserCookie();
}

export function getRolePermissions(): any[] | null {
    const { getRolePermissionsCookie } = useCookies();
    return getRolePermissionsCookie() as any[] | null;
}

export const setCookies = (name: string, value: string, options: CookieOptions = commonCookieOptions): void => {
    const { setCookie } = useCookies();
    setCookie(name, value, options);
};

export const setUserCookie = (user: any): boolean => {
    const { setUser } = useCookies();
    return setUser(user);
};

export const setRolePermissions = (roles: any): boolean => {
    const { setRolePermissionsCookie } = useCookies();
    return setRolePermissionsCookie(roles);
};

export const setAccessToken = (authorization: string): boolean => {
    const { setAccessTokenCookie } = useCookies();
    return setAccessTokenCookie(authorization);
};

export const resetAllCookies = (): boolean => {
    const { resetAll } = useCookies();
    return resetAll();
};
