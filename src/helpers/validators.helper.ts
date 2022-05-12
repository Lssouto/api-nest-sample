export class EntityValidator {
  isEntityValid(
    scope: unknown,
    paramsOfTheEntity: string[],
    validators: { [key: string]: Validator[] },
  ): string[] {
    return paramsOfTheEntity
      .map((param) => {
        return validators[param].reduce<string>((status, validator) => {
          const isValid = validator.validate(scope[param]);
          return isValid == null ? status : isValid;
        }, null);
      })
      .filter((validatorResponse) => validatorResponse !== null);
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
