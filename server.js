const app = require("./src/app")

const PORT = process.env.PORT || 3000


const main = async () => {

    try{

        app.listen(PORT)
        console.log(`server online on http://localhost:${PORT}`)
        
    }catch(e){
        console.log(e)
    }

}

main()