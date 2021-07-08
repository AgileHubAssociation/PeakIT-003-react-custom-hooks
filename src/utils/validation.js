const validators = {
    required: (value) => {
        if (typeof value === 'string') {
            value = value.trim();
        }
        return !!value;
    },
    email: (value) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value),
    minLength: (value, length) => value.length >= length,
    maxLength: (value, length) => value.length <= length,
    min: (value, reference) => Number(value) >= reference,
    max: (value, reference) => Number(value) <= reference,
};

function defaultMessages(fieldName, type, constraint) {
    const messages = {
        required: `You should provide a value for "${fieldName}".`,
        email: `You should provide a valid email address.`,
        minLength: `"${fieldName}" should be at least ${constraint} characters long.`,
        maxLength: `"${fieldName}" should be at most ${constraint} characters long.`,
        min: `"${fieldName}" should be at least ${constraint}.`,
        max: `"${fieldName}" should be at most ${constraint}.`,
    };
    return messages[type];
}

class ValidationError extends Error {
    constructor(message, values, validationRules) {
        super(message);
        this.values = values;
        this.validationRules = validationRules;
    }
}

function validateInputFields(values, validationRules) {
    const errors = {};
    let hasErrors = false;

    for (const field in validationRules) {
        for (const rule of validationRules[field]) {
            if (values[field] === undefined) {
                throw new ValidationError(
                    `Validator did not get a field called "${field}"!`,
                    values,
                    validationRules
                );
            }

            if (!validators[rule.type]) {
                throw new ValidationError(
                    `There is no "${rule.type}" validator!`,
                    values,
                    validationRules
                );
            }

            if (!validators[rule.type](values[field], rule.constraint)) {
                const msg =
                    rule.message ||
                    defaultMessages(field, rule.type, rule.constraint);
                hasErrors = true;

                if (errors[field]) {
                    errors[field].push(msg);
                } else {
                    errors[field] = [msg];
                }
            }
        }
    }
    return { hasErrors, errors };
}

export { ValidationError, validateInputFields };
