class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValueIsNullError extends CustomError {}
class RoleIsNotAdminError extends ValueIsNullError {}
class CategoryDoesNotExistsError extends ValueIsNullError {}
export { ValueIsNullError, RoleIsNotAdminError, CategoryDoesNotExistsError };
