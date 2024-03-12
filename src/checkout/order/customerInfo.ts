export interface CustomerInfoParams {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: string;
  shippingBuilding?: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingProvince?: string;
  shippingCountry: string;
  invoiceAddress: string;
  invoiceBuilding?: string;
  invoiceCity: string;
  invoicePostalCode: string;
  invoiceProvince?: string;
  invoiceCountry: string;
  useSameAddress: boolean;
}

// eslint-disable-next-line max-len
const EMAIL_REGEXP = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const PHONE_REGEXP = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
const POSTAL_CODE_REGEXP = new RegExp(/^[0-9]{3,10}$/im);

export class CustomerInfo implements CustomerInfoParams {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  shippingBuilding?: string | undefined;
  shippingCity: string;
  shippingPostalCode: string;
  shippingProvince?: string | undefined;
  shippingCountry: string;
  invoiceAddress: string;
  invoiceBuilding?: string | undefined;
  invoiceCity: string;
  invoicePostalCode: string;
  invoiceProvince?: string | undefined;
  invoiceCountry: string;
  useSameAddress: boolean;
  errors: {field: string, messageKey: 'invalid' | 'required'}[];

  constructor(params: CustomerInfoParams) {
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.email = params.email;
    this.phone = params.phone;
    this.shippingAddress = params.shippingAddress;
    this.shippingBuilding = params.shippingBuilding;
    this.shippingCity = params.shippingCity;
    this.shippingPostalCode = params.shippingPostalCode;
    this.shippingProvince = params.shippingProvince;
    this.shippingCountry = params.shippingCountry;
    this.invoiceAddress = params.invoiceAddress;
    this.invoiceBuilding = params.invoiceBuilding;
    this.invoiceCity = params.invoiceCity;
    this.invoicePostalCode = params.invoicePostalCode;
    this.invoiceProvince = params.invoiceProvince;
    this.invoiceCountry = params.invoiceCountry;
    this.useSameAddress = params.useSameAddress;

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
    if (this.shippingAddress.trim().length === 0) {
      this.errors.push({field: 'shippingAddress', messageKey: 'required'});
    }
    if (this.shippingCity.trim().length === 0) {
      this.errors.push({field: 'shippingCity', messageKey: 'required'});
    }
    if (this.shippingPostalCode.trim().length === 0) {
      this.errors.push({field: 'shippingPostalCode', messageKey: 'required'});
    }
    if (!this.useSameAddress && this.invoiceAddress.trim().length === 0) {
      this.errors.push({field: 'invoiceAddress', messageKey: 'required'});
    }
    if (!this.useSameAddress && this.invoiceCity.trim().length === 0) {
      this.errors.push({field: 'invoiceCity', messageKey: 'required'});
    }
    if (!this.useSameAddress && this.invoicePostalCode.trim().length === 0) {
      this.errors.push({field: 'invoicePostalCode', messageKey: 'required'});
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