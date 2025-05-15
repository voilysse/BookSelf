import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useState } from "react";
import { useUpdateUserMutation } from "../../features/userApi";
import { PrimaryButton } from "../Button/Button";


export default function UserSettings() {
  const [updateUser] = useUpdateUserMutation();
  const user = useSelector(selectCurrentUser);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
      await updateUser(data).unwrap(); // Use unwrap() to handle errors properly
      console.log(data)
      alert("Profile updated!");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update profile");
    }
      };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 px-20 py-8 mx-10">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">bookself.com/</div>
                  <input
                    {...register("username")}
                    defaultValue={user.username}
                    id="username"
                    name="username"
                    type="username"
                    placeholder="janesmith"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    {...register("email")}
                    defaultValue={user.email}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>


            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                About
              </label>
            <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>

              <div className="mt-2">
                <textarea
                  {...register("biography")}
                  id="biography"
                  name="biography"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={user.biography}
                />
              </div>
            </div>


            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Profile Picture
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>



      <div className="mt-6 flex items-center justify-between gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Deactivate Account
        </button>
        <PrimaryButton
          type="submit"
          text="Save"
        />
      </div>
      </div>
    </form>
  )
}
