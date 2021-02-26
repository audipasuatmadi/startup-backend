import app from './app'
import {isAddressInfo} from './servertypes'

const connection = app.listen(process.env.PORT || 8001, () => {
  const addressInfo = connection.address()
  if (isAddressInfo(addressInfo)) {
    console.log(`listening to port ${addressInfo.port}`)
  } else {
    console.log('something is wrong on starting server')
  }
})