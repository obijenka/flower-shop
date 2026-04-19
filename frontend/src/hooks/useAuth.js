import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { register, login } from '../api/auth';
import { saveAuthData } from '../utils/authStorage';

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {}
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();
  
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      saveAuthData(data.token, data.user);
      dispatch(setUser({ user: data.user, token: data.token }));
    }
  });
};