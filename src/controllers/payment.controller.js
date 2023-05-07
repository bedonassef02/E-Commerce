class PaymentController {


    async sayHi(name) {
        return `Hi ${name}`
    }

    async index(req, res) {
        res.json(await this.sayHi("Bedo"))
    }


}

module.exports = {PaymentController}