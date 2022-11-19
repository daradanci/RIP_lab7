import { useState, useEffect } from 'react';




function getCookie(name) {
  const value = `; ${document.cookie};`
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
function Logout(props){
  const [access, setAccess] = useState(localStorage.getItem('accessToken'))
  const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
  const [refreshRequired, setRefreshRequired] = useState(false)
//  const [loading, setLoading] = useState()
//  const [formUsername, setFormUsername] = useState()
//  const [formPassword, setFormPassword] = useState()
//  const [ firstName, setFirstName] = useState('')
//  const [ lastName, setLastName] = useState('')
//  const [ username, setUsername] = useState('')
//  const [ email, setEmail] = useState('')
//  const [ dateJoined, setDateJoined] = useState('')
//  const [ error, setError] = useState()
//  const csrftoken = getCookie('csrftoken')

  useEffect(() => {
    if (access)
    localStorage.setItem('accessToken', '')
    localStorage.setItem('userId', null)
  }, [refreshRequired])



  return(<div>Вы вышли</div>);

}

export default Logout;