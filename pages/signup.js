import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Signup = () => {
    const router = useRouter()
    useEffect(() => {
        let myUser = JSON.parse(localStorage.getItem('myUser'))
        try {
            if (myUser.token) {
                router.push('/')
            }
        } catch (error) {
            if (myUser) {
                router.push('/')
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onchangeHandler = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value);
        }
        else if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { name, email, password }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signupapi`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        setEmail('')
        setName('')
        setPassword('')
        localStorage.setItem('myUser', JSON.stringify({ token: response.token, email: response.email }))
        if (response.success) {
            toast.success('Account created Sucessfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                router.push("/")
            }, 1000);
        }
        else {
            toast.error(response.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <div>
            <Head>
                <title>Signup | {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
            </Head>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <center><Image src="/favicon.ico" height={50} width={50} alt="logo" /></center>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Signup to create new account</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <Link href={'/login'}><a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Login </a></Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input value={name} onChange={onchangeHandler} id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input value={email} onChange={onchangeHandler} id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input value={password} onChange={onchangeHandler} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup