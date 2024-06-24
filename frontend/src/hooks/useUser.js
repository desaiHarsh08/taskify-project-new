import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "../app/features/userSlice";
import { selectToken } from "../app/features/authSlice";
import { fetchUserByEmail } from "../apis/authApis";

export const useUser = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);

    useEffect(() => {
        (async () => {
            if (user || !token) return;
            const { data, error } = await fetchUserByEmail(token.email);
            if (data) {
                dispatch(setUser(data));
            } else {
                console.error('Failed to fetch user:', error);
            }
        })();
    }, [token, user, dispatch]);

    return user;
}
