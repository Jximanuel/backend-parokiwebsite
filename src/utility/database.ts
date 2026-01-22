import mongoose from "mongoose"

const connectDB = async () => {
    const namaDb = process.env.DB_NAME
    try {
        await mongoose.connect(process.env.MONGO_URL as string,{
            dbName: namaDb
        })
        console.log("cluster terhubung dengan nama databse", `${process.env.DB_NAME}`);
    } catch (error) {
        console.log("koneksi gagal", error)
    }
}


export default connectDB