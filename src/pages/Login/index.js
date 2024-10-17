import './style.scss'
import axios from 'axios'
import { useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    async function fazerLogin(){
        await axios.post('http://localhost:5040/usuario/login', {email, senha})
        .then(res => {
            localStorage.setItem('tokend', res.data.token)
            navigate('/diario', {state: {userId: res.data.usuario.id}})
        })
        .catch(err => setErro(err.response.data.erro))
    }
    return(
        <div className="page_login">
            <div className="form">
                <h1>Login</h1>
                <div className="row">
                    <label>Email:</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email"/>
                </div>
                <div className="row">
                    <label>Senha:</label>
                    <input value={senha} onChange={e => setSenha(e.target.value)} type="password"/>
                </div>
                <div className="row">
                    <button onClick={fazerLogin}>Fazer Login</button>
                </div>
                <Link to="/cadastro">Não tenho conta</Link>
            </div>
            {erro? <ErrorMessage close={() => setErro('')} erro={erro}/>: ''}
        </div>
    )
}
export default Login