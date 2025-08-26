import { defineStore } from "pinia";
import {setUserCookie, setAccessToken, setRolesCookie, resetAllCookies, accessToken, getUser, getRoles} from "~/composables/useCookies.js";
export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: accessToken() || null,
        user: getUser() || null,
        roles: getRoles() || null,
    }),
    getters: {
        isLoggedIn: (state) => {
            return !!state.token && !!state.user;
        },
    },
    actions: {
        async setToken(token) {
            this.token = token;
            setAccessToken(token);
        },
        async setUser(user) {
            this.user = user;
            setUserCookie(user);
        },
        async setRoles(roles) {
            this.roles = mergeRolePermissions(roles);
            setRolesCookie(roles)
        },
        async clearAuth() {
            this.user = null;
            this.token = null;
            resetAllCookies();
        },

        async login(payload) {
            const { data, error, execute, refresh } = await postData(
                "auth/login",
                payload
            );
            if (data) {
                await this.setToken(data.value?.token);
                if (data.value?.user?.roles) {
                    await this.setRoles(data.value?.user?.roles)
                    delete data.value.user.roles
                }
                await this.setUser(data.value?.user);
            }
            return { data, error, execute, refresh };
        },
        async register(payload) {
            const { data, error, execute, refresh } = await postData(
                "auth/signup",
                payload
            );
            if (data) {
                await this.setToken(data.value?.token);
                await this.setUser(data.value?.user);
            }
            return { data, error, execute, refresh };
        },
        async getLoggedUser() {
            const { data, error, execute, refresh } = await getData("auth/profile");
            if (data) {
                if (data.value?.roles) {
                    await this.setRoles(data.value?.roles)
                    delete data.value.roles;
                }
                await this.setUser(data.value);
            }
            console.log('Updated user in store:', this.user);
            console.log('Updated user in cookie:', getUser());
            return { data, error, execute, refresh };
        },
        async logout() {
            // await postData("auth/logout");
            await this.clearAuth();
        },
    },
});