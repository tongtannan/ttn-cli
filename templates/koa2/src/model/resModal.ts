class BaseModal {
  private data: any;
  private message: string | null = null;

  constructor(data: any, message: string | null) {
    if (typeof data === 'string') {
      this.message = data;
      message = null;
      data = null;
    }

    if (data) this.data = data;

    if (message) this.message = message;
  }
}

class SuccessModal extends BaseModal {
  private code: number;

  constructor(data: any, message: string) {
    super(data, message);
    this.code = 0;
  }
}

class ErrorModal extends BaseModal {
  private code: number;

  constructor(data: any, message: string) {
    super(data, message);
    this.code = -1;
  }
}

module.exports = {
  SuccessModal,
  ErrorModal,
};
