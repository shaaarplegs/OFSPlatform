import axios from "axios";

const domain = "https://nzr8v6mql6.execute-api.eu-west-1.amazonaws.com";


function FreelancerRegister(user){
  return axios.post(domain + "/register/fs", user, {
    headers: {
      "Content-Type": "application/json"
    },
  })
}

function ServiceSeekerRegister(user){
    return axios.post(domain + "/register/ss", user, {
      headers: {
        "Content-Type": "application/json"
      },
    })
}

export{
    FreelancerRegister,
    ServiceSeekerRegister
}