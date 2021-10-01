import bcrypt from 'bcryptjs'


const users = [
    {
        name:'Admin user',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('admin',10),
        isAdmin:true
    },
    {
        name:'test1',
        email:'test1@gmail.com',
        password:bcrypt.hashSync('123456',10),
        
    },
    {
        name:'test2',
        email:'test2@gmail.com',
        password:bcrypt.hashSync('123456',10),
      
    },
]

export default users;