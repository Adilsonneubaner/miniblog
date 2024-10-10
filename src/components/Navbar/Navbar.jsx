import {NavLink} from 'react-router-dom'

import styles from './Navbar.module.css'

import {useAuthentication} from '../../hooks/useAuthentication'

import {useAuthValue} from '../../context/AuthContext'

import { useState } from 'react'

const Navbar = () => {

    const { user} = useAuthValue()

    const {logout} = useAuthentication()

    const [responser, setResponser] = useState(false)

  return (
    <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
            <NavLink to='/' className={styles.brand}>
                Mini <span>BLOG</span>
            </NavLink>
            <ul className={styles.link_list}>
                <li>
                    <NavLink to='/' className={({isActive}) => (isActive ? styles.active : "")}>
                        Home
                    </NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to='/login' className={({isActive}) => (isActive ? styles.active : "")}>
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/register' className={({isActive}) => (isActive ? styles.active : "")}>
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink to='/dashboard' className={({isActive}) => (isActive ? styles.active : "")}>
                                Seus Posts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/posts/create' className={({isActive}) => (isActive ? styles.active : "")}>
                                Criar Post
                            </NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to='/about' className={({isActive}) => (isActive ? styles.active : "")}>
                        Sobre
                    </NavLink>
                </li>
                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}
            </ul>
            <div className={styles.menu}  >
                <span className="material-symbols-outlined" onClick={() => setResponser(!responser)}>menu</span>
                {/* <input type="checkbox" onClick={() => setResponser(!responser)}/> */}
            </div>
        </div>

        {responser && (
            <div>
            <ul className={styles.link_list_responser}>
                    <li>
                        <NavLink to='/' className={({isActive}) => (isActive ? styles.active : "")} 
                        onClick={() => setResponser(!responser)}>
                            Home
                        </NavLink>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <NavLink to='/login' className={({isActive}) => (isActive ? styles.active : "")}
                                onClick={() => setResponser(!responser)}>
                                    Entrar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/register' className={({isActive}) => (isActive ? styles.active : "")}
                                onClick={() => setResponser(!responser)}>
                                    Cadastrar
                                </NavLink>
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <li>
                                <NavLink to='/dashboard' className={({isActive}) => (isActive ? styles.active : "")}
                                onClick={() => setResponser(!responser)}>
                                    Seus Posts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/posts/create' className={({isActive}) => (isActive ? styles.active : "")}
                                onClick={() => setResponser(!responser)}>
                                    Criar Post
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li>
                        <NavLink to='/about' className={({isActive}) => (isActive ? styles.active : "")}
                        onClick={() => setResponser(!responser)}>
                            Sobre
                        </NavLink>
                    </li>
                    {user && (
                        <li className={styles.logout}
                        onClick={() => setResponser(!responser)}>
                            <button onClick={logout}>Sair</button>
                        </li>
                    )}
                </ul>
            </div>
        )}
    </nav>
  )
}

export default Navbar