"use client"

// import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Login from './components/Login';
import Register from './components/Register';
import { login, register} from '../../services/authService'
import { AxiosError } from 'axios';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();


  const handleLogin = async (username: string, password: string ) => {
      try {
        const token = await login({ username, password });
        console.log(`Login successful: ${token}`)
        // redirect('/home')
        router.push('/tasks');
        setErrorMessage(null);
        // const token = await login({ username, password });
        // // console.log('JWT Token:', token);
        // if (token){
        //     localStorage.setItem('token', token);
        //     // navigate('/tasks');
        // } else {
        //     setError('Invalid credentials');
        // }
      } catch (error: unknown) {
        console.error(`Login error: ${error}`)

        if (error instanceof AxiosError) {
          
          if (error.response){
            console.log("Error Status " + error.response.status + " Error StatusText " + error.response.statusText)
            if (error.response.status === 401) {
              setErrorMessage("Invalid username or password.")
            } else if (error.response.status === 404) {
              setErrorMessage("User not registered. Please register.");
            } else if (error.response.status === 500) {
              setErrorMessage("Server error. Please try again.");
            } else {
              setErrorMessage(`Error: ${error.response.status} - ${error.response.statusText || "No status text available"}`);
            }
          } else if (error.request) {
            setErrorMessage("Network error. Pleaes check your connection.");
          } else {
            setErrorMessage("An unexpected error occurred.");
          }
        } else if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      }
  };

  const handleRegister = async ( username: string , password: string, email: string ) => {
      try {
          const response = await register({ username, password, email });
          console.log(`Registration Response: ${response}`);
          router.push('/');
          setErrorMessage(null);
      } catch (error) {
          console.error(`Error registering user:${error}`);
          setErrorMessage("An error occurred during registration. Please try again.")
      }
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-4 sm:pb-20 sm:px-20 sm:pt-10 font-[family-name:var(--font-geist-sans)] border-black border-1">

      <main className="flex flex-col gap-8 row-start-2 items-center border-black border-2 w-fit h-full lg:max-h-min lg:pt-4 lg:pb-4 bg-slate-100 rounded-lg">
        <div className="">

          {isLogin ? 
            <p className="justify-self-center">Login</p> : 
            <p className="justify-self-center">Register</p>
          }
            
          <div className="h-56">
              {isLogin ? 
              <Login handleLogin={handleLogin} errorMessage={errorMessage}/> : 
              <Register handleRegister={handleRegister} />
              }
          </div>
        </div>
        

        <div className="flex justify-around w-1/4 align-bottom pb-2">

          {isLogin ? 
          <div className="justify-items-center">
            <p>No account?</p>
            <button 
              onClick={() => setIsLogin(false)}
              className="text-red-500 underline"
            >
              Register
            </button>
          </div> :
          <div className="justify-items-center">
            <p>Have an account? </p>
            <button 
              onClick={() => setIsLogin(true)}
              className="text-red-500 underline "
            >
              Login
            </button>
          </div>
          }


        </div>
      </main>
    </div>
  );
}
