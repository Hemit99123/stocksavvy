import httpHeader from '../../services/httpHeader'
import type { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Logout = () => {
  const navigate = useNavigate()

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [response, setResponse] = useState<AxiosResponse<any, any>>()
  
  const handleLogout = async () => {
    const response = await httpHeader.get("/auth/logout")
    setResponse(response)
  }

  useEffect(() => {
    handleLogout()

    if (response?.status == 400  || response?.status == 500) {
      navigate("/logout/error")
    } else {
      navigate("/logout/success")
    }
  }, [navigate, response])

  return null
}

export default Logout