import { dashboardUsers } from "./model";

export const dashboardState = $state({
    
});


export const getDashboardUser = (type: string) => {
    return dashboardUsers.find((user) => user.type === type.toLowerCase());
}