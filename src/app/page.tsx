"use client"

// import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Login from './components/Login';
import Register from './components/Register';
import {  register} from '../../services/authService'
import { AxiosError } from 'axios';
import { useUser } from '../../context/UserContext';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { user, loginAndSetUser } = useUser();


  useEffect(() => {
    if (user && user.username === 'Guest') {
      router.push('/tasks');
    }
  }, [user, router]);

  const handleLogin = async (username: string, password: string ) => {
      try {
        await loginAndSetUser({ username, password });
        // console.log(`Login successful: ${token}`)
        setErrorMessage(null);
        router.push('/tasks');
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
            setErrorMessage("Network error. Please check your connection.");
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
          setErrorMessage("Account created successfully. Please log in.");
          setIsLogin(true);
      } catch (error) {
          console.error(`Error registering user:${error}`);
          setErrorMessage("An error occurred during registration. Please try again.")
      }
  };


  return (
    <div className="items-center justify-items-center w-full min-h-screen pb-20 gap-4 pt-16 sm:pb-16 sm:px-20 lg:pt-10 xl:pt-10 2xl-wide:pt-20 
                    font-[family-name:var(--font-geist-sans)] border-black border-1 dark:bg-[#121212] dark:text-[#E0E0E0]
                    dark:border-[#2C2C2C]">

      <main className="flex flex-col gap-8 row-start-2 items-center border-black border-2  
                      w-fit max-w-md h-fit mx-auto py-3 px-2 lg:max-h-min lg:pt-4 lg:pb-4 bg-slate-100 rounded-lg
                      dark:bg-[#1E1E1E] dark:border-[#2C2C2C]">
        <div className="">

          <div className="justify-self-center ">
            {isLogin ? 
              <p className="">Login</p> : 
              <p className="">Register</p>
            }
          </div>
            
            
          <div className="h-56">
              {isLogin ? 
              <Login handleLogin={handleLogin} errorMessage={errorMessage}/> : 
              <Register handleRegister={handleRegister} errorMessage={errorMessage}/>
              }
          </div>
        </div>
        

        <div className="flex justify-around align-bottom pb-2">

          {isLogin ? 
          <div className="justify-items-center">
            <p>No account?</p>
            <button 
              onClick={() => {
                setIsLogin(false);
                setErrorMessage(null);
              }}
              className="text-red-500 underline"
            >
              Register
            </button>
          </div> :
          <div className="justify-items-center">
            <p>Have an account? </p>
            <button 
              onClick={() => {
                setIsLogin(true);
                setErrorMessage(null);
              }}
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
