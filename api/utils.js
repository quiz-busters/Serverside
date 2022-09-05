exports.errorHandler = (error) => {
    if (error.errors) {
        return  Object?.values(error?.errors)[0]?.message;
    }
    return  error.message;
}