import styles from './CreatePost.module.css'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'


const CreatePost = () => {
  const navigate = useNavigate()

  const {insertDocument, response} = useInsertDocument('posts')

  const {user} = useAuthValue()

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormError('')

    // validate image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError('A imagem precisa ser uma URL')
    }

    // criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    // checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError('Por favor, preencha todos os campos!')
    }

    if(formError) return

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    navigate('/')
  }


  return (
    <div className={styles.create_post}>
      <h1>Criar post</h1>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <label>
            <span>Título:</span>
            <input type="text" name="title"
            placeholder='Pense num bom título...' 
            required 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}/>
        </label>
        <label>
            <span>URL da imagem:</span>
            <input type="text" name="image"
            placeholder='Insira uma imagem que representa o seu post' 
            required 
            onChange={(e) => setImage(e.target.value)} 
            value={image}/>
        </label>
        <label>
            <span>Conteúdo:</span>
            <textarea name="body"
            placeholder='Insira o conteúdo do post' 
            required 
            onChange={(e) => setBody(e.target.value)} 
            value={body}></textarea>
        </label>
        <label>
            <span>Tags:</span>
            <input type="text" name="tags"
            placeholder='Insira as tags separadas por vírgula' 
            required 
            onChange={(e) => setTags(e.target.value)} 
            value={tags}/>
        </label>
        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && <button className='btn' disabled>Aguarde</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost