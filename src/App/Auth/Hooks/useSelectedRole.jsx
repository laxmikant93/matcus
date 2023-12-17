import { useEffect, useState } from 'react'
import Storage from "../../../Classes/Storage";
import { selectedRoleOnSignup } from "../../../Constant/auth"
const useSelectedRole = () => {

  const [selectedRole, setSelectedRole] = useState()

  // nunction (evt) {
  //   if (evt.key === selectedRoleOnSignup) {
  //     if (evt.newValue === null) {
  //       Storage.set(selectedRoleOnSignup, "Other")
  //       setSelectedRole("Other")
  //     }
  //     else {
  //       setSelectedRole(Storage.getString(selectedRoleOnSignup))
  //     }

  //   }
  // }

  const handleSetSelectedRole = (roleInput = "Other") => {
    Storage.set(selectedRoleOnSignup, roleInput)
    setSelectedRole(roleInput)
  }

  useEffect(() => {
    setSelectedRole(Storage.getString(selectedRoleOnSignup))

    window.addEventListener("storage", (evt) => {
    })

  }, [])

  return [
    selectedRole,
    handleSetSelectedRole
  ]
}

export default useSelectedRole
