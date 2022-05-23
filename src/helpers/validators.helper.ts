export class EntityValidator {
  isEntityValid(
    scope: unknown,
    paramsOfTheEntity: string[],
    validators: { [key: string]: Validator[] },
  ): string[] {
    return paramsOfTheEntity
      .map((param) => this.isFieldValid(scope[param], validators[param]))
      .filter((validatorResponse) => validatorResponse !== null);
  }

  isFieldValid(field, validators: Validator[]): null | string {
    return validators.reduce<string>((status, validator) => {
      const isValid = validator.validate(field);
      return isValid == null ? status : isValid;
    }, null);
  }
}

export abstract class Validator {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  abstract validate(param): string | null;
}

export class NotNullValidator extends Validator {
  constructor(message) {
    super(message);
  }

  validate(value): string | null {
    return value == null || value == undefined ? this.message : null;
  }
}

export class GreaterThanValidator extends Validator {
  min: number;
  constructor(message, min) {
    super(message);
    this.min = min;
  }

  validate(value): string | null {
    return value == null || value == undefined || value <= this.min
      ? this.message
      : null;
  }
}

export class NumberValidator extends Validator {
  constructor(message) {
    super(message);
  }

  validate(value): string | null {
    try {
      if (typeof value == 'string') {
        value = parseInt(value);
      }
      return typeof value != 'number' ? this.message : null;
    } catch (e) {
      return this.message;
    }
  }
}
