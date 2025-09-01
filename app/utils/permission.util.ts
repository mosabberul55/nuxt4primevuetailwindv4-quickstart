import {getRolePermissions} from '~/composables/useCookies'

export function mergeRolePermissions(roles: any[]): any[] {
    const permissionsMap: Record<string, Set<string>> = {};

    if (!roles || roles.length === 0) return [];
    for (const role of roles) {
        for (const permission of role.permissions) {
            const resource = permission.resource;
            if (!permissionsMap[resource]) {
                permissionsMap[resource] = new Set();
            }
            permission.actions.forEach((action: string) => permissionsMap[resource].add(action));
        }
    }

    // Build the final array
    return Object.entries(permissionsMap).map(([resource, actionsSet]) => ({
        resource,
        actions: Array.from(actionsSet)
    }));
}

export const getAllPermissions = () => {
    return getRolePermissions();
}

//
export const canAccess = (resource: string, action: string='read'): boolean => {
    return true;
    // if (resource == 'guest') return true; // Allow guest access to all resources
    // const permissions = getAllPermissions();
    // if (!permissions) return false;
    //
    // const resourcePermissions = permissions.find((p: any) => p.resource === resource);
    // if (!resourcePermissions) return false;
    //
    // return resourcePermissions.actions.includes(action);
}