users = {
    id : "",
    name: "",
    lastName : "",
    lastName2 : "",
    dayOfBirth: "",
    profilePhoto : "",
    check: "",
    role : "",
    faculty : "",
    career : "",
    work : "",
    description : "",
    achievement : {
        name: "",
        date: "",
        description: ""
    },
    competences : [],
    cellphoneNumber : "",
    email : "",
    password : ""
}

publications = {
    id:"",
    user: users,
    visibility: "",
    group: groups,
    photo:"",
    category: "",
    description: "",
    Likes: [users],
    createdAt : "",
    comments:[
        {
            user:users,
            comment :"",
            date :"",

        }
    ],

}

groups= {
    id : "",
    name:"",
    description: "",
    visibility : "",
    check: "",
    type: "",
    admin : [users],
    members: [users],
    publications : [publications],
}

projects= {
    id : "",
    owner : user,
    group : group,
    name: "",
    link: "",
    images:[],
    areas :[],
    description :"",
    developers : [user]
}

followers= {
    id : "",
    following : users,
    followers : users,
}

messages= {
    id: "",
    body: "",
    transmitter: users,
    receiver: users,
    date: "",
    viewed: "",
    file : "",
}

questions= {
    id : "",
    user: users,
    question: "",
    description: "",
    date: "",
    category: "",
    hashtag: [],
    score:"",
    answers: [{
        user: users,
        description: "",
        score: "",
        date: ""
    }]
}

