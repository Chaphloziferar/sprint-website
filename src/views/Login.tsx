import React from 'react';
import { useForm } from 'react-hook-form';
import authApi from '../apis/authApi'
import { useAppDispatch, useAppSelector } from '../context/app/hooks';
import { signIn, addError, removeError } from '../context/features/auth/authSlice';
import { LoginData } from '../interfaces/authInterfaces';

export const Login: React.FC = () => {

  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const error = useAppSelector(state => state.auth.errorMessage);

  const onSubmit = handleSubmit(async ({username, password}) => {
    try {
      const {data} = await authApi.post("/auth/signIn", {username, password});
      localStorage.setItem("token", data.token);

      dispatch(signIn(data));
    } catch (error: any) {
        dispatch(addError(error.response.data || 'Información Incorrecta'));
    }
  })

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center'>

      {
        error.length > 0 && (
          <div className="max-w-md w-full mx-auto flex flex-col bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Incorrect Login</strong>
            <span className="block sm:inline">{error}</span>
            <span onClick={() => dispatch(removeError())} className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )
      }

      <div className='max-w-md w-full mx-auto'>
        <div className='text-3xl font-bold text-gray-900 mt-2 text-center'>Sprint Website</div>
        <div className='text-center font-medium text-xl'>By Chaphloziferar</div>
      </div>
      <div className='max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300'>
        <form onSubmit={onSubmit} className='space-y-6'>
          <div>
            <label htmlFor="" className='text-sm font-bold text-gray-600 block'>Username</label>
            <input {...register("username", {required: true})} type="text" 
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
            {errors.username && <span className='text-red-600 text-sm'>This field is required</span>}
          </div>
          <div>
            <label htmlFor="" className='text-sm font-bold text-gray-600 block'>Password</label>
            <input {...register("password", {required: true})} type="password" 
              className='w-full p-2 border border-gray-300 rounded mt-1'
            />
            {errors.password && <span className='text-red-600 text-sm'>This field is required</span>}
          </div>
          <div>
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}