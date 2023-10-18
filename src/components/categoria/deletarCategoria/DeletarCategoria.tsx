import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext'
import Category from '../../../models/Category'
import { deletar } from '../../../service/Service'
import Util from '../../../utils/Util'


function DeletarCategoria() {
    const [categoria, setCategoria] = useState({} as Category)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    /*const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token*/

  /*  async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout()
            }
        }
    }*/

   /* useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])*/

    const buscarPorId = (id: string) => {
        setCategoria(Util.find((category) => category.id == Number(id)) as Category)
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/categoria")
    }

    async function deletarCategoria() {
        try {
            await deletar(`/categoria/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Tema deletado')

        } catch (error) {
          alert('Erro no delet do tema')
        }

        retornar()
    }
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar a categoria</h1>

            <p className='text-center font-semibold mb-4'>Quer mesmo apagar a categoria?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Categoria</header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.descricao}</p>
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
                    <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' onClick={DeletarCategoria}>
                        Sim
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarCategoria;