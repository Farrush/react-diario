import './style.scss'
import axios from 'axios'
import { useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Cadastro = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [erro, setErro] = useState('')

    async function cadastrar(){
        await axios.post('http://localhost:5040/usuario', {nome, email, senha})
        .then(res => navigate('/'))
        .catch(err => setErro(err.response.data.erro))
    }
    return(
        <div className="page_cad">
            <div className="form">
                <h1>Cadastro</h1>
                <div className="row">
                    <label>Nome:</label>
                    <input value={nome} onChange={e => setNome(e.target.value)} type="text"/>
                </div>
                <div className="row">
                    <label>Email:</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email"/>
                </div>
                <div className="row">
                    <label>Senha:</label>
                    <input value={senha} onChange={e => setSenha(e.target.value)} type="password"/>
                </div>
                <div className="row">
                    <button onClick={cadastrar}>Cadastrar</button>
                </div>
                <Link to="/">Voltar para o Login</Link>
            </div>
            {erro? <ErrorMessage close={() => setErro('')} erro={erro}/>: ''}
        </div>
    )
}
export default Cadastro