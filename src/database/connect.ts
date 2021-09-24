import mongoose from 'mongoose'
import config from '../config'

const connect = () => {
  mongoose
    .connect(config.dbUri)
    .then(() => {
      console.log("I am able to connect Oneforall's Database, yeahhhhh")
    })
    .catch((error) => {
      console.log('Opps I came across something :<')
      console.log(error)
    })
}

export default connect
