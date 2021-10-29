
export interface DataUpdateUser {
        work?: string;
        description?: string;
        profilePicture?: string;
}

export interface DataAchievement{

}

export interface IUser{
        
        _id?: String;
        name?: String;
        username?: String;
        faculty?: String;
        rol?: String;
        deparment?: String;
        work?: String;
        description?: String;
        achievement?: Array<Object>;
        competences?: Array<Object>;
        following?: Array<Object>;
        dayOfBirth?: Date;
        profilePicture?: String;
        proyects?: Array<Object>;
        check?: Boolean;

}