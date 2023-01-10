import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import ProductsRoutes from './handlers/ProductHandler';
import { UserRoutes } from './handlers/UserHandler';
import { orderRoutes } from './handlers/OrderHandler';
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

ProductsRoutes(app)
UserRoutes(app)
orderRoutes(app)

export default app