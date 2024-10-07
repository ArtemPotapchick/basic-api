const logger = (req, res, next) => {
    console.log(`${req.method.toUpperCase()} ${req.url} - ${new Date().toISOString()}`);
    next();
}
export default logger;