export interface CustomerInfoParams {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  building?: string;
  city: string;
  postalCode: string;
  province?: string;
  country: string;
}

// eslint-disable-next-line max-len
const EMAIL_REGEXP = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const PHONE_REGEXP = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
const POSTAL_CODE_REGEXP = new RegExp(/^[0-9]{3,10}$/im);

export class CustomerInfo implements CustomerInfoParams {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  building?: string | undefined;
  city: string;
  postalCode: string;
  province?: string | undefined;
  country: string;
  errors: {field: string, messageKey: 'invalid' | 'required'}[];

  constructor(params: CustomerInfoParams) {
    this.email = params.email;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.phone = params.phone;
    this.address = params.address;
    this.building = params.building;
    this.city = params.city;
    this.postalCode = params.postalCode;
    this.province = params.province;
    this.country = params.country;

    this.errors = [];
  }

  validate() {
    if (this.email.trim().length === 0) {
      this.errors.push({field: 'email', messageKey: 'required'});
    } else if (!EMAIL_REGEXP.test(this.email)) {
      this.errors.push({field: 'email', messageKey: 'invalid'});
    }
    if (this.firstName.trim().length === 0) {
      this.errors.push({field: 'firstName', messageKey: 'required'});
    }
    if (this.lastName.trim().length === 0) {
      this.errors.push({field: 'lastName', messageKey: 'required'});
    }
    if (this.phone.trim().length === 0) {
      this.errors.push({field: 'phone', messageKey: 'required'});
    } else if (!PHONE_REGEXP.test(this.phone)) {
      this.errors.push({field: 'phone', messageKey: 'invalid'});
    }
    if (this.address.trim().length === 0) {
      this.errors.push({field: 'address', messageKey: 'required'});
    }
    if (this.city.trim().length === 0) {
      this.errors.push({field: 'city', messageKey: 'required'});
    }
    if (this.postalCode.trim().length === 0) {
      this.errors.push({field: 'postalCode', messageKey: 'required'});
    } else if (!POSTAL_CODE_REGEXP.test(this.phone)) {
      this.errors.push({field: 'phone', messageKey: 'invalid'});
    }
  }

  fieldErrorMessage(field: string, t: (key: string) => string) {
    const messageKey = this.errors.find(error => error.field === field)?.messageKey;
    if(!messageKey) return undefined;

    return t(`form.errors.${messageKey}`);
  }
}