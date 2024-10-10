import styles from '../Search/Search.module.css'

import { Link } from 'react-router-dom'

// components
import PostDetail from '../../components/PostDetail/PostDetail'

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = useFetchDocuments('posts', search)

  return (
    <div className={styles.search_container}>
        <h1>Resultados</h1>
        <div>
          {posts && posts.length === 0 && (
            <div className={styles.no_post}>
  	          <p>Não foram encontrados posts a partir da sua busca...</p>
              <Link to='/' className='btn btn-dark'>Voltar</Link>
            </div>
          )}
          {posts && posts.map((post) => (
            <PostDetail key={post.id} post={post}/>
          ))}
        </div>
    </div>
  )
}

export default Search