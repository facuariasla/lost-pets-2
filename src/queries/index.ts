import type { PetData, PetReported } from "../Types";
// export const API_BASE_URL = "http://localhost:4000";

// DEPLOYED
export const API_BASE_URL = "https://dwf-m7-test01.herokuapp.com";

// PETS ENDPOINTS ////////////////////////////////////////////////////////////////
export const lostPetsAround = async (lat: number, lng: number) => {
  try {
    const getPets = await fetch(
      API_BASE_URL + `/pets-around?lat=${lat}&lng=${lng}`
    );
    const res = await getPets.json();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getOnePet = async (objectID: any) => {
  try {
    const pet = await fetch(API_BASE_URL + `/pets/${objectID}`);
    const res = await pet.json();
    return res;
  } catch (error) {
    console.log({error, message: 'Error en peticion get del cliente -- getOnePet'})
    return error
  }
};

export const reportPetAround = async (data: PetReported) => {
  try {
    const { objectID } = data;
    const petReported = await fetch(API_BASE_URL + `/pets/${objectID}/report`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await petReported.json();
    return res;
  } catch (error) {
    console.log({error, message: 'Error en post del cleint - reportPetAround'})
    return error
  }

};

export const createPet = async (data: PetData) => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");
    const newPet = await fetch(API_BASE_URL + "/pets", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${tokenVal}`,
      },
      body: JSON.stringify(data),
    });
    const res = await newPet.json();
    return res
  } catch (error) {
    console.log({error, message: 'Error en peticion del cliente - createPet'})
    return error
  }

};

export const editPet = async (data: any) => {
  try {
    const { objectID } = data;
    const tokenVal = localStorage.getItem("token_lostpet");
  
    const pet = await fetch(API_BASE_URL + `/pets/${objectID}`, {
      method: "PUT",
      headers: { "content-type": "application/json", "Authorization": `Bearer ${tokenVal}`},
      body: JSON.stringify(data),
    });
    const res = await pet.json();
    return res;
  } catch (error) {
    console.log({error, message: 'Error en peticion PUT cliente - editPet'})
    return error
  }

};

export const deletePet = async (objectID:any) => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");
    const pet = await fetch(API_BASE_URL + `/pets/${objectID}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${tokenVal}`},
    })
    const res = await pet.json();
    return res
  } catch (error) {
    console.log({error, message: 'Error en peticion DELETE cliente - deletePet'})
  }
}


// USERS ENDPOITNS /////////////////////////////////////////////////////////////////

export const createUser = async (data: object) => {
  try {
    const creating = await fetch(API_BASE_URL + "/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await creating.json();

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUser = async (data: object) => {
  try {
    const login = await fetch(API_BASE_URL + '/users/login', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    const res = await login.json();
    return res;
  } catch (error) {
    console.log({error, message: 'Error 400 en loginUser'});
    return error;
  }
};

export const updateUser = async (data: object) => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");
    const userVal = localStorage.getItem("user_lostpet");
    const updateUser = await fetch(API_BASE_URL + `/users/${userVal}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tokenVal}`,
      },
      body: JSON.stringify(data),
    });
    const res = await updateUser.json();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const myPetsReported = async () => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");
    const userId_:any = localStorage.getItem("user_lostpet");
    const userId = parseInt(userId_);
    const myPets = await fetch(API_BASE_URL + `/users/${userId}/pets`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
    });
    const res = await myPets.json();
    return res
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const myProfile = async () => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");

    const myProfileDB = await fetch(API_BASE_URL + '/me', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
    });
    const res = await myProfileDB.json()
    return res
  } catch (error) {
    console.log(error, 'Error en get myProfile - queries');
    return error;
  }
};

export const myProfileAuth = async () => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");

    const myProfileDB = await fetch(API_BASE_URL + '/user-auth', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenVal}`,
      },
    })
    const res = await myProfileDB.json()
    return res
  } catch (error) {
    console.log(error, 'Error en get myProfileAuth - queries');
    return error;
  }
}

export const changePassword = async (data: object) => {
  try {
    const tokenVal = localStorage.getItem("token_lostpet");
    const userVal = localStorage.getItem("user_lostpet");
    const updatePass = await fetch(API_BASE_URL + `/changepassword/${userVal}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tokenVal}`,
      },
      body: JSON.stringify(data),
    });
    const res = await updatePass.json();
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};