const createRequest = async (url, method, body = null) => {
    const config = useRuntimeConfig();
    const { data, status, error, refresh, clear } = await useFetch(url, {
        baseURL: config.public.baseURL,
        method: method,
        body,
        onRequest({request, options}) {
            options.headers.set('Authorization', `Bearer ${accessToken()}`)
            options.headers.set('Accept', 'application/json')
            options.headers.set('Content-Type', 'application/json')
        },
        onRequestError({}) {
            // Handle the request errors
        },
        onResponse({}) {
            // Handle the response object
        },
        onResponseError({}) {
            // Handle the response errors
        }
    });

    return {data, status, error, refresh, clear};
}

export const getData = async (url) => {
    return createRequest(url, 'GET');
};

export const postData = async (url, body) => {
    return createRequest(url, 'POST', body);
};
export const putData = async (url, body) => {
    return createRequest(url, 'PUT', body);
};

export const deleteData = async (url) => {
    return createRequest(url, 'DELETE');
};
