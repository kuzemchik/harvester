import required from './required'
import selectValidation from './select'
import datetimeValidation from './datetime'
import numberValidation from './number'
import hasManyValidation from './has_many'
import stringValidation from './string'

// This validation shouldn't have to concern itself with type enforcement
// because that should be handled by the actual type-specific inputs
// themselves, so we can assume we're getting a value that is either empty or
// of the correct type. This validation will only be concerned with business
// logic validations that may be present in a column's config (e.g., required
// for any type, max/min for numbers, etc.)
//
// We want to be able to support multiple simultaneous errors for a single
// field because we want the UI to be able to guide a user to completely fix
// their input, not lead them through a maze of successive errors. Because we
// want to support multiple errors throwing probably isn't the right approach.
//
// Should errors force the input value to be empty, or should we allow the bad
// input to show up and have errors simply block submission?

function typedValidation(schema, value) {
  switch (schema.type) {
    case 'select':
      return selectValidation(schema, value)
    case 'datetime':
      return datetimeValidation(schema, value)
    case 'number':
      return numberValidation(schema, value)
    case 'string':
      return stringValidation(schema, value)
    default:
      return []
  }
}

export function validatePrimitive(schema, value, formSchema) {
  const { config } = schema
  const errors = []
  if (config.required) errors.push(required(value))
  if (value || value === 0) {
    errors.push(...typedValidation(schema, value, formSchema))
  }
  return errors.filter(e => e)
}

export default function validate(schema, value, formSchema) {
  switch (schema.type) {
    case 'has_many':
      return hasManyValidation(schema, value, formSchema)
    default:
      return validatePrimitive(schema, value, formSchema)
  }
}
