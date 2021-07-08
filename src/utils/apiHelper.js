import { apiBaseUrl } from '../config';

const config = {
    authHeader: null,
    standardHeaders: {
        'Content-type': 'application/json',
    },
    delete: {
        method: 'DELETE',
    },
    get headers() {
        if (this.authHeader) {
            return { ...this.standardHeaders, ...this.authHeader };
        }

        return this.standardHeaders;
    },
    get create() {
        return {
            method: 'POST',
            headers: this.headers,
        };
    },
    get update() {
        return {
            method: 'PATCH',
            headers: this.headers,
        };
    },
    get replace() {
        return {
            method: 'PUT',
            headers: this.headers,
        };
    },
};

function api(endpoint, serializer = JSON.stringify) {
    return (type, ...rest) => {
        const entityId = (typeof rest[0] !== 'object' && rest[0]) || '';
        const body = (entityId ? rest[1] : rest[0]) || '';
        const options = type !== 'read' && {
            ...config[type],
            body: body && serializer(body),
        };

        return fetch(
            `${apiBaseUrl}/${endpoint}${entityId ?? `/${entityId}`}`,
            options
        ).then(responseParser);
    };
}

class ApiError extends Error {
    constructor(status, text, resp) {
        super(status + ' ' + text + '\n\n' + resp);
    }
}

async function responseParser(res) {
    if (!res.ok) {
        const resp = await res.text();
        throw new ApiError(res.status, res.statusText, resp);
    }
    return res.json();
}

export { api };
