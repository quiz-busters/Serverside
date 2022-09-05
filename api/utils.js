exports.errorHandler = (error) => {
    return Object.values(error.errors)[0].message;
}
