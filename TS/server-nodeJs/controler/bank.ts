import * as http from 'http'
import * as data from '../static/data.json'
import { IBank, IProduct } from '../interfaces/app-interfaces'
import { BaseHandler } from './baseHandler'
import { genericResponseMessage } from '../utils/responseSerializer'
import { reqError, resError } from '../utils/EreqReserrorEventListener'
import { prepareBody } from '../utils/prepareBody'
import { IResponce } from '../interfaces/app-interfaces'
import { isLargeFile } from '../utils/isLargFile'
import { isCorrectFields } from '../utils/isCorrectFields'



export class BankDetailsHandler extends BaseHandler {
    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        super()
        this.req = req
        this.res = res
    }

    get(): void {
        global.counter++

        let body: any = [];
        this.req.on('error', (err) => {
            reqError(this.res, err)
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            this.res.on('error', (err) => {
                resError(this.res, err)
            });

            try {
                isLargeFile(Buffer.concat(body).toString())

                body = prepareBody(body)
                isCorrectFields(body, 'name')
                this.res.writeHead(200, { 'Content-Type': 'application/json' })

                let bankDetails: IBank
                let flag = false
                for (let i = 0; i < data.users.length; i++) {
                    if (data.users[i].name == body.name) {
                        bankDetails = data.users[i].bankAccount
                        flag = true
                        let serialized: IResponce = genericResponseMessage(200, 'Bank details fetched successfull', global.counter, bankDetails)
                        this.res.write(JSON.stringify(serialized))
                        break
                    }
                }

                if (!flag) {
                    let serialized: IResponce = genericResponseMessage(200, 'User Not found!', global.counter, {})
                    this.res.write(JSON.stringify(serialized))
                }

                this.res.end()
            } catch (err: any) {
                let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
                this.res.write(JSON.stringify(serialized))
                this.res.end()
            }
        });
    }

    post(): void { }

    delete(): void { }

    patch(): void { }
}


export class DepositHandler extends BaseHandler {
    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        super()
        this.req = req
        this.res = res
    }

    post(): void {
        global.counter++

        let body: any = [];
        this.req.on('error', (err) => {
            reqError(this.res, err)
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            this.res.on('error', (err) => {
                resError(this.res, err)
            });

            try {
                isLargeFile(Buffer.concat(body).toString())

                body = prepareBody(body)
                isCorrectFields(body, 'name', 'amount')
                this.res.writeHead(200, { 'Content-Type': 'application/json' })

                let flag = false
                for (let i = 0; i < data.users.length; i++) {
                    if (data.users[i].name == body.name) {
                        if (body.type == 'cash') {
                            data.users[i].bankAccount.cashBalance += body.amount
                        } else if (body.type == 'credit') {
                            data.users[i].bankAccount.creditBalance += body.amount
                        }
                        flag = true
                        let serialized: IResponce = genericResponseMessage(200, 'Deposit Done successfull', global.counter, data.users[i].bankAccount)
                        this.res.write(JSON.stringify({ 'visit counter': global.counter, 'bankDetails': data.users[i].bankAccount }))
                        break
                    }
                }

                if (!flag) {
                    let serialized: IResponce = genericResponseMessage(200, 'User Not found!', global.counter, {})
                    this.res.write(JSON.stringify(serialized))
                }

                this.res.end()
            } catch (err: any) {
                let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
                this.res.write(JSON.stringify(serialized))
                this.res.end()
            }
        });
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}


export class WithdrawHandler extends BaseHandler {
    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        super()
        this.req = req
        this.res = res
    }

    post(): void {
        global.counter++

        let body: any = [];
        this.req.on('error', (err) => {
            reqError(this.res, err)
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            this.res.on('error', (err) => {
                resError(this.res, err)
            });

            try {
                isLargeFile(Buffer.concat(body).toString())

                body = prepareBody(body)
                isCorrectFields(body, 'name', 'amount')
                this.res.writeHead(200, { 'Content-Type': 'application/json' })

                let flag = false
                for (let i = 0; i < data.users.length; i++) {
                    if (data.users[i].name == body.name) {
                        if (body.type == 'cash') {
                            if (data.users[i].bankAccount.cashBalance >= body.amount) {
                                data.users[i].bankAccount.cashBalance -= body.amount
                            }
                            else {
                                let serialized: IResponce = genericResponseMessage(500, 'Not suficient money!', global.counter, {})
                                this.res.write(JSON.stringify(serialized))
                                this.res.end()
                                return
                            }
                        } else if (body.type == 'credit') {
                            if (data.users[i].bankAccount.creditBalance >= body.amount) {
                                data.users[i].bankAccount.creditBalance -= body.amount
                            }
                            else {
                                let serialized: IResponce = genericResponseMessage(500, 'Not suficient money!', global.counter, {})
                                this.res.write(JSON.stringify(serialized))
                                this.res.end()
                                return
                            }
                        }
                        flag = true
                        let serialized: IResponce = genericResponseMessage(200, 'Withdraw Done successfull', global.counter, data.users[i].bankAccount)
                        this.res.write(JSON.stringify(serialized))
                        break
                    }
                }

                if (!flag) {
                    let serialized: IResponce = genericResponseMessage(500, 'User Not found!', global.counter, {})
                    this.res.write(JSON.stringify(serialized))
                }

                this.res.end()
            } catch (err: any) {
                let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
                this.res.write(JSON.stringify(serialized))
                this.res.end()
            }
        });
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}


export class PurchaseHandler extends BaseHandler {
    constructor(private req: http.IncomingMessage, private res: http.ServerResponse) {
        super()
        this.req = req
        this.res = res
    }

    post(): void {
        global.counter++

        let body: any = [];
        this.req.on('error', (err) => {
            reqError(this.res, err)
        }).on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            this.res.on('error', (err) => {
                resError(this.res, err)
            });

            try {
                isLargeFile(Buffer.concat(body).toString())

                body = prepareBody(body)
                isCorrectFields(body, 'name', 'amount')
                this.res.writeHead(200, { 'Content-Type': 'application/json' })

                let theProduct: IProduct = { name: '', price: 0 }
                let flag = false
                for (let i = 0; i < data.products.length; i++) {
                    if (data.products[i].name == body.productName) {
                        theProduct = data.products[i]
                        flag = true
                        break
                    }
                }

                if (!flag) {
                    let serialized: IResponce = genericResponseMessage(500, 'Product Not found!', global.counter, {})
                    this.res.write(JSON.stringify(serialized))
                    this.res.end()
                }

                let flag2 = false
                for (let i = 0; i < data.users.length; i++) {
                    if (data.users[i].name == body.username) {
                        if (body.type == 'cash') {
                            if (data.users[i].bankAccount.cashBalance >= theProduct.price) {
                                data.users[i].bankAccount.cashBalance -= theProduct.price
                            }
                            else {
                                let serialized: IResponce = genericResponseMessage(500, 'Not suficient money!', global.counter, {})
                                this.res.write(JSON.stringify(serialized))
                                this.res.end()
                                return
                            }
                        } else if (body.type == 'credit') {
                            if (data.users[i].bankAccount.creditBalance >= theProduct.price) {
                                data.users[i].bankAccount.creditBalance -= theProduct.price
                            }
                            else {
                                let serialized: IResponce = genericResponseMessage(500, 'Not suficient money!', global.counter, {})
                                this.res.write(JSON.stringify(serialized))
                                this.res.end()
                                return
                            }
                        } else {
                            let serialized: IResponce = genericResponseMessage(500, 'Payment method not correct, Please enter "cash" or "credit"', global.counter, {})
                            this.res.write(JSON.stringify(serialized))
                            this.res.end()
                            return
                        }
                        flag2 = true
                        let serialized: IResponce = genericResponseMessage(200, `Payment succeded, you purchased a ${theProduct.price}`, global.counter, data.users[i].bankAccount)
                        this.res.write(JSON.stringify(serialized))
                        break
                    }
                }

                if (!flag2) {
                    let serialized: IResponce = genericResponseMessage(500, 'User Not found!', global.counter, {})
                    this.res.write(JSON.stringify(serialized))
                }

                this.res.end()
            } catch (err: any) {
                let serialized: IResponce = genericResponseMessage(500, err.toString(), global.counter, {})
                this.res.write(JSON.stringify(serialized))
                this.res.end()
            }
        });
    }

    get(): void { }

    delete(): void { }

    patch(): void { }
}
