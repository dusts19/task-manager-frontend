"use client"

// import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Login from './components/Login';
import Register from './components/Register';
import { login, register} from '../../services/authService'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();


  const handleLogin = async (username: string, password: string ) => {
      try {
          const token = await login({ username, password });
          console.log(`Login successful: ${token}`)
          // redirect('/home')
          router.push('/tasks');

          // const token = await login({ username, password });
          // // console.log('JWT Token:', token);
          // if (token){
          //     localStorage.setItem('token', token);
          //     // navigate('/tasks');
          // } else {
          //     setError('Invalid credentials');
          // }
      } catch (error) {
          console.error(`Login error: ${error}`)
      }
  };

  const handleRegister = async ( username: string , password: string, email: string ) => {
      try {
          const response = await register({ username, password, email });
          console.log(`Registration Response: ${response}`);
          router.push('/');
      } catch (error) {
          console.error(`Error registering user:${error}`);
      }
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-4 sm:pb-20 sm:px-20 sm:pt-10 font-[family-name:var(--font-geist-sans)] border-black border-1">

      <main className="flex flex-col gap-8 row-start-2 items-center border-black border-2 w-fit h-full bg-slate-100 rounded-lg">
        <div className="">

          {
            isLogin ? 
            <p className="justify-self-center">Login</p>
            : 
            <p className="justify-self-center">Register</p>
          }
            
          {/* <p className="text-center">Hello from the home page!</p>s */}
          <div className="h-56">
              {
              isLogin ? 
              <Login handleLogin={handleLogin} /> 
              : 
              <Register handleRegister={handleRegister} />
              }
          </div>

        </div>
        

        <div className="flex justify-around w-1/4 align-bottom pb-2">

          {isLogin == false ? 
          <div className="justify-items-center">
            <p>Have an account? </p>
            <button 
              onClick={() => setIsLogin(true)}
              className="text-red-500 underline "
            >
              Login
            </button>
          </div> :
          <div className="justify-items-center">
            <p>No account? </p>
            <button 
              onClick={() => setIsLogin(false)}
              className="text-red-500 underline"
            >
              Register
            </button>
          </div>
          
          }


        </div>
      </main>
    </div>
  );
}
