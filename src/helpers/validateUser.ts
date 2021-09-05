import User from "../models/users.models";



export const validationUser = async (username : any) => {

    const user = checkEmail(username);

    await User.findOne({ username: user }),
        
        (err: any, user: any) => {
        
             if (user) {
                 throw new Error("Ya se encuentra un usuario registrado");
            }
            
            if(err) return new Error("F")
            
        };
    
   

    
};


export const existUserById = async (username: any) => {

    const existUser = await User.findOne({ username });

    if (!existUser) {
        throw new Error("usuario no encontrado");
    }
};


//Le extraemos el correo al username esto del correo
export const checkEmail =  (username: any) => {
    

    if (username.includes("@")) {
        const charToDel: number = username.length - 14;

        let userName = username.substr(0, charToDel);

        const user = userName;

        return user;
    }

    return username;

};


export const validateDate = async (dayOfBirth: any) =>{
    
    
    console.log(dayOfBirth);


}