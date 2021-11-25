export interface UserInfo {
  username: string;
  email: string;
  avatar: string;
  permissions: Array<string>;
}

class DataStore {
  private userInfo: UserInfo;

  constructor() {
    this.userInfo = {
      username: '',
      email: '',
      avatar: '',
      permissions: [],
    };
  }

  public initData(data: any) {
    // eslint-disable-next-line
    const { username = '', email = '', pic_url = '', permissions } = data;

    this.userInfo = {
      username,
      email,
      avatar: pic_url,
      permissions,
    };
  }

  public getUserInfo(): UserInfo {
    return this.userInfo;
  }
}

export default new DataStore();
