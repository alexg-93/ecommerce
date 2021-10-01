import jwt from 'jsonwebtoken'

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '60min',
    })
}



export default generateToken;