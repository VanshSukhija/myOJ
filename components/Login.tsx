
const Login = () => {
  return (
    <div className="w-1/3 h-screen bg-black text-white absolute right-0" >
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl font-bold">Login</h1>
        <div className="w-4/5 h-60 flex flex-col justify-evenly">
          <div>
            Email
            <input type="email" className="text-black w-full h-8 p-1 mb-2" placeholder="johndoe@gmail.com" />
            Password
            <input type="password" className="text-black w-full h-8 p-1" />
          </div>
          <button className="bg-blue-400 text-white w-full h-8 rounded">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
