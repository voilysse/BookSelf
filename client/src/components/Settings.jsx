import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Settings() {
  const user = useSelector((state) => state.auth.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteAccount = async (e) =>{
    e.preventDefault();
    try {
      const res = await fetch( `/api/user/delete/${user.user.userId}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      
    if (res.ok) {
      dispatch(deleteUser(data));
      navigate('/');
  }
    }
      catch (error) {

      }
    }

  return (
    <div>
    <div className="flex items-center justify-center px-16 py-8 sm:px-12 lg:col-span-7lg:py-12 xl:col-span-6">
      <div className="px-28">
        <div className="">
          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Settings
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            nam dolorum aliquam, quibusdam aperiam voluptatum.
          </p>
        </div>

        <form className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6">
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Username{" "}
            </label>

            <input
              type="text"
              placeholder="username"
              className="mt-1 input input-bordered w-full "
              id="username"
              required
            />
          </div>
          
          <div className="col-span-6">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              {user.user.email}
            </label>

            <input
              type="text"
              placeholder="email@gmail.com"
              className="mt-1 input input-bordered w-full "
              id="email"
              required
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Password{" "}
            </label>

            <input
              type="password"
              placeholder="**************"
              className="mt-1 input input-bordered w-full "
              id="password"
              required
            />
          </div>

          <div className="col-span-6">
            <button
              className="btn btn-neutral inline-block"
            >  Save
            </button>
          </div>
          
        </form>
        <div className='pt-4'>
        <button className="btn btn-outline btn-error" onClick={()=>document.getElementById('delete').showModal()}>Delete Account</button>
          <dialog id="delete" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Warning</h3>
              <p className="pt-4">Are you sure you want to delete your account?</p>
              <p className="pb-4">This action is irreversible.</p>
              <div className="modal-action w-full">
                <form method="dialog" className="w-full">
                  <div className="flex justify-between w-full">
                    <button className="btn btn-outline btn-error" onClick={deleteAccount}>Delete Account</button>
                    <button className="btn">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
      </div>
      </div>
    </div>
  </div>  
  )
}

export default Settings
