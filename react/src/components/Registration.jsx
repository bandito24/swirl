export default function Registration({setViewState, setUserInformation}) {


    return(
    <>
        <div>
            <h2>Once last thing...</h2>
            <p className='mb-6'>Please enter your email and password to save your profile</p>
            <div className="grid grid-cols-2 grid-rows-3 items-center gap-y-3 mb-24" >
                <label htmlFor='email' className=''>Enter your email</label>
                <input id='email' className="" name='email' type="text"  placeholder='Enter your email'/>

                <label htmlFor="password" className="">Enter your Password</label>
                <input id='password' name='password' type="text"  />

                <label htmlFor="password_confirmation" className="">Confirm Password</label>
                <input id='password_confirmation' name='password_confirmation' type="text"  />
            </div>
            <input type='submit' className="global-btn-styling w-46 px-5 py-2 text-xl" value='Become a Swirl User' />
        </div>


    </>
    )
}
