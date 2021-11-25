import dataStore from '@/DataStore';

const userInfo = dataStore.getUserInfo();

export function hasPermission(permission: string) {
  return userInfo.permissions.includes(permission);
}
