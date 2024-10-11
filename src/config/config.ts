export default () =>({
    jwt:{
        secret:process.env.SECRET_KEY
    },
    dB:{
        string:process.env.DB_STRING  
    }
})