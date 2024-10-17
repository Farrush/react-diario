import './style.scss'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const Diario = () => {
    const location = useLocation()
    const userId = location.state.userId
    const [diario, setDiario] = useState({
        titulo: ''
    })
    const navigate = useNavigate()
    useEffect( () => {
        buscarDiario()
    }, [])
    async function buscarDiario(){
        await axios.get('http://localhost:5040/diario/usuario/'+userId, {headers: {"x-access-token": localStorage.getItem('tokend')}})
        .then(res => setDiario(res.data))
        .catch(err => alert(err.response.data.erro))
    }
    function logoff(){
        localStorage.removeItem('tokend')
        navigate('/')
    }
    return(
        <div className='page_diario'>
            <div className='top'>
                <h1>{diario.titulo}</h1>
                <button onClick={logoff}>Sair</button>
            </div>
        </div>
    )
}

export default Diario