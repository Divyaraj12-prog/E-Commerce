import { loadUsers } from "../reducers/userSlice";
import { clearCart } from "../reducers/cartSlice";

const USERS_KEY = 'users_state';

const seedUsers = [
    {
        id: 'YOSo_LQuca34HaBSptqlO',
        username: import.meta.env.VITE_USER_NAME,
        email: import.meta.env.VITE_USER_EMAIL,
        password: import.meta.env.VITE_USER_PASSWORD,
        isAdmin: true,
    },
    {
        id: 'nIc5sJ-yBokXqUJVUo1dV',
        username: 'gandu',
        email: 'test@email.com',
        password: '222222',
        isAdmin: false,
    },
];

const getUsersState = () => {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        if (!raw) {
            localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
            return seedUsers;
        }
        return JSON.parse(raw);
    } catch {
        return seedUsers;
    }
};

const saveUsersState = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const asyncRegisterUser = (userData) => async (dispatch) => {
    const users = getUsersState();
    const exists = users.some((u) => u.email === userData.email);
    if (exists) return null;
    const createdUser = { ...userData };
    const updatedUsers = [...users, createdUser];
    dispatch(loadUsers(createdUser));
    saveUsersState(updatedUsers);
    localStorage.setItem("loggedInUser", JSON.stringify(createdUser));
    return createdUser;
}

export const asyncLoginUser = (userData) => async (dispatch) => {
    const users = getUsersState();
    const user = users.find(
        (u) => u.email === userData.email && u.password === userData.password
    );
    if (user) {
        dispatch(loadUsers(user));
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        return user;
    }
    return null;
}

export const asyncLogoutUser = () => (dispatch) => {
    try{
        localStorage.removeItem("loggedInUser");
        dispatch(loadUsers(null));
        dispatch(clearCart());
        console.log("Logged out successfully");
    }catch(err){
        console.log(err);
    }
}

export const asynccurrentUser = () => (dispatch) => {
    try{
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if(user) dispatch(loadUsers(user));
        else dispatch(loadUsers(null));
    }catch(err){
        console.log(err);
    }
}

export const asyncUpdateUser = (id, userData) => async (dispatch) => {
    const users = getUsersState();
    const updatedUsers = users.map((u) =>
        String(u.id) === String(id) ? { ...u, ...userData } : u
    );
    saveUsersState(updatedUsers);
    const updatedUser = updatedUsers.find((u) => String(u.id) === String(id)) || null;
    dispatch(loadUsers(updatedUser));
    if (updatedUser) localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    return updatedUser;
}

export const asyncDeleteUser = (id) => async (dispatch) => {
    const users = getUsersState();
    const updatedUsers = users.filter((u) => String(u.id) !== String(id));
    saveUsersState(updatedUsers);
    dispatch(asyncLogoutUser());
}