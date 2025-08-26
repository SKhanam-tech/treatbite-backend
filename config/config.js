import dotenv from "dotenv"

dotenv.config()

const {PORT,
    MONGO_URI,
    JWT_SECRET,
    SERVICE,
    SENDER_EMAIL,
    HOST,
    EMAIL_PORT,
    SECURE,
    PASS,
    BACKEND_URL,
    CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env

const Config = {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    SERVICE,
    SENDER_EMAIL,
    HOST,
    EMAIL_PORT,
    SECURE,
    PASS,
    BACKEND_URL,
    CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
}

export default Config