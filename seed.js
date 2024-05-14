const { db, Test } = require("./db")

const seed = async () => {
    try {
        await db.sync({force:false})
        
        await Test.create({
            name_test:"admin",
            email_test:"admin@email.com"
        })
    } catch (e) {
        console.error(e.message)
    }
}

async function runSeed(){
    try {
        await seed();
        console.log("Seeding success!")
    } catch (e) {
        console.error("SOMETHING WENT WRONG WHEN SEEDING!!!")
        console.error(e)
    }finally{
        db.close();
    }
}

runSeed()