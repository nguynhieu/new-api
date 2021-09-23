import mongoose from 'mongoose'

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI || '')
    .then(() => {
      console.log("I am able to connect Oneforall's Database, yeahhhhh")
    })
    .catch((error) => {
      console.log('Opps I came across something :<')
      console.log(error)
    })
}

export default connect
