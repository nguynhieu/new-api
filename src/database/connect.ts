import mongoose from 'mongoose'
import config from '../config'

const connect = () => {
  mongoose
    .connect(config.dbUri)
    .then(() => {
      console.log('Dbs connected')
    })
    .catch((error) => {
      console.log('Opps I came across something')
      console.log(error)
    })
}

export default connect
