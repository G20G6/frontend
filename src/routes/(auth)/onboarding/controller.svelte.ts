import { onboardingUsers } from "./model";

export const getOnboardingUser = (user_type: string) => onboardingUsers.find((user) => user.type === user_type);
