

const request = require('request')

let sess;

exports.login = (req, res) => {
    console.log("login: ", JSON.stringify(req.body))
    let errors = [];
    console.log(typeof req.body)
    for (let [key, value] of Object.entries(req.body)) {
        // console.log(`${key}: ${value}`);
        if (value === "") {
            errors.push(`${key} is required.`)
        }
        let regxEmail = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email);
        if (regxEmail) {
            errors.push("Email is not valid.")
        }
        let regxPassword = !/^[a-zA-Z]\w{3,14}$/.test(req.body.password)
        if (regxPassword) {
            errors.push("Password is not valid.")

        }


        return errors

    }
}

exports.cart = (req, res) => {
    console.log("cart: ", JSON.stringify(req.body))
    let errors = [];
    console.log(typeof req.body)
    for (let [key, value] of Object.entries(req.body)) {
        // console.log(`${key}: ${value}`);
        if (value === "") {
            errors.push(`${key} is required.`)
        }


        return errors

    }
}
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.")
}

exports.cartStorage = (req, res) => {
    sess = req.session
    res.status(200).send({
        sess: sess,
    })
}

/* This method returns a promise */
exports.getApiCall = (options) => {
    return new Promise((resolve, reject) => {

        function callback(error, response, body) {
            console.log(JSON.parse(body));
            if (body.length > 0) {
                if (!options.uri) {
                    return self.emit('error', new Error('options.uri is a required argument'))
                }
                if (!error) {
                    // const info = JSON.parse(body);
                    // console.log(info);
                    resolve(body)
                    return body
                }
            } else {
                if (error) reject(error)
            }
        }
        request(options, callback);

    })

}
