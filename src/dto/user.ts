export enum UserRoleEnum {
  ROLE_ORG = 'ROLE_ORG',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
  ROLE_STUDENT = 'ROLE_STUDENT',
}

export interface IUser {
  userID: number;
  email: string;
  firstName: string | undefined;
  lastName: string | undefined;
  phoneNumber: string;
  mateLevel: string;
  profilePictureUrl: string;
  bio: string;
  country: string;
  stateOrProvince: string;
  city: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  inAppNotifications: boolean;
  twoFactorAuthenticationEnabled: boolean;
  authorities: UserRoleEnum[];
  universityName: string;
  universityCountry: string;
  universityStateOrProvince: string;
  universityCity: string;
  organisationName: string | undefined;
  organisationId: number | undefined;
}
