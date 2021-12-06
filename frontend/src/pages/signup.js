const react = require("react")
const { useState, useEffect } = react
const axios = require("axios")

const SignUpPage = () => {
  // save the state of name
  const [name, setName] = useState("")

  // save the state of email
  const [email, setEmail] = useState("")

  // save the state of password
  const [password, setPassword] = useState("")

  // save the state of submission
  const [status, setStatus] = useState("")

  const processForm = async (event) => {
    const formData = {email, password, name}

    try{
      const {data} = await axios.post("http://localhost:3001/user", formData)
      setStatus("You have successfully registered !!!")
    }
    catch(e){
      setStatus(e.response.data.message)
      console.log(e.response.data)
    } 
  }

    return <section>
            <div className="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-3xl font-extrabold text-center text-neutral-600"> Register for an account </h2>
              </div>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 sm:px-10">
                  <div className="space-y-6" >
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email address </label>
                      <div className="mt-1">
                        <input id="email" name="email" type="email"  required={true} className="
                      block
                      w-full
                      px-5
                      py-3
                      text-base text-neutral-600
                      placeholder-gray-300
                      transition
                      duration-500
                      ease-in-out
                      transform
                      border border-transparent
                      rounded-lg
                      bg-gray-50
                      focus:outline-none
                      focus:border-transparent
                      focus:ring-2
                      focus:ring-white
                      focus:ring-offset-2
                      focus:ring-offset-gray-300
                    "
                        value={email}
                        onChange={(event) => setEmail(event.target.value)} 
                    />
                      </div>
                    </div>
                    {/* user name input */}
                    <div>
                      <label htmlFor="Name" className="block text-sm font-medium text-gray-700"> Name  </label>
                      <div className="mt-1">
                        <input id="Name" name="Name" type="text"  required={true}  className="
                      block
                      w-full
                      px-5
                      py-3
                      text-base text-neutral-600
                      placeholder-gray-300
                      transition
                      duration-500
                      ease-in-out
                      transform
                      border border-transparent
                      rounded-lg
                      bg-gray-50
                      focus:outline-none
                      focus:border-transparent
                      focus:ring-2
                      focus:ring-white
                      focus:ring-offset-2
                      focus:ring-offset-gray-300
                    " 
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password </label>
                      <div className="mt-1">
                        <input id="password" name="password" type="password" required={true} className="
                      block
                      w-full
                      px-5
                      py-3
                      text-base text-neutral-600
                      placeholder-gray-300
                      transition
                      duration-500
                      ease-in-out
                      transform
                      border border-transparent
                      rounded-lg
                      bg-gray-50
                      focus:outline-none
                      focus:border-transparent
                      focus:ring-2
                      focus:ring-white
                      focus:ring-offset-2
                      focus:ring-offset-gray-300
                    " 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="
                      w-4
                      h-4
                      text-blue-600
                      border-gray-300
                      rounded
                      focus:ring-blue-500
                    " />
                        <label htmlFor="remember-me" className="block ml-2 text-sm text-neutral-600"> Remember me </label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a>
                      </div>
                    </div>
                    <div>
                      <button type="submit" className="
                    flex
                    items-center
                    justify-center
                    w-full
                    px-10
                    py-4
                    text-base
                    font-medium
                    text-center text-white
                    transition
                    duration-500
                    ease-in-out
                    transform
                    bg-blue-600
                    rounded-xl
                    hover:bg-blue-700
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-blue-500
                  "
                  onClick={() => {processForm()}}
                  > Sign Up </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
}

export default SignUpPage