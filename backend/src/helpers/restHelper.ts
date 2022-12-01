export class Info {
  code: number;
  message: string;
  type: string;
  errors: Array<String>;

  constructor(
    code: number,
    message: string,
    type: string,
    errors: Array<String> = []
  ) {
    this.code = code;
    this.message = message;
    this.type = type;
    this.errors = errors;
  }

  getArray(): {
    code: number;
    message: string;
    type: string;
    errors: Array<String>;
  } {
    return {
      code: this.code,
      message: this.message,
      type: this.type,
      errors: this.errors,
    };
  }
  getCode(): number {
    return this.code;
  }
}

interface ResponseTypesInterface {
  _ERROR_: string;
  _INFO_: string;
}
export const ResponseTypes: ResponseTypesInterface = {
  _ERROR_: "ERROR",
  _INFO_: "INFO",
};

export const compareParams: (
  paramsReq: Array<string>,
  reqBody: Object
) => String[] = (paramsReq: Array<string>, reqBody: Object): String[] => {
  let errors: Array<String> = [];
  const keys = Object.keys(reqBody);
  paramsReq.forEach((val: string): void => {
    if (!keys.includes(val)) errors.push(val);
  });
  return errors;
};

export const convertFormDataToJSON = (formdata: FormData) => {
  let object: any;
  formdata.forEach((value, key) => (object[key] = value));
  return object;
};
