import { dashboardUsers } from "./model";

export const dashboardState = $state({
    user_type: 'business' // Possible values: 'tourist', 'business', 'tour-guide', 'data-collector'
});


export const getDashboardUser = (type: string) => {
    return dashboardUsers.find((user) => user.type === type?.toLowerCase());
}