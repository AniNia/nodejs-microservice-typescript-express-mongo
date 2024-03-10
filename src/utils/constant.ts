const customResourceResponse = {
    success: { statusCode: 200, message: 'Request has been processed successfully.' },
    reqCreated: { statusCode: 201, message: 'Record has been created successfully.' },
    recordNotFound: { statusCode: 404, message: 'No record found.' },
    serverError: { statusCode: 500, message: 'Internal server error.' },
    reqValidationError: { statusCode: 422, message: 'Data validation failed.' },
};

module.exports = customResourceResponse;