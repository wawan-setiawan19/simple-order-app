import { useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('/login', { username, password })
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch {
      setError('Username atau password salah')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="card" style={{ width: 360 }}>
        <h2>Simple Orders App</h2>
        <p style={{ fontSize: 14, color: '#6b7280' }}>
          Silakan login untuk melanjutkan
        </p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label>Username</label>
            <input onChange={e => setUsername(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </div>

          <button>Login</button>
        </form>
      </div>
    </div>
  )
}
