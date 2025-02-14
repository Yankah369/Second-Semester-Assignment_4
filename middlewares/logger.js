export default function logger(req, _, next) {
    console.log("Request", {
        url: req.url,
        method: req.method,
        time: new Date(),
        body: req.body,
        query: req.query,
        params: req.params,
    })
    next();
}
