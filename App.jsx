import React, { useEffect, useState } from 'react'

const CAT_ENPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const API_PREFIX_IMAGE_URL = 'https://cataas.com'

function App () {
  const [fact, setFact] = React.useState()
  const [imageURL, setImageURL] = useState()

  // Recuperar las palabras
  useEffect(() => {
    fetch(CAT_ENPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

  // Enviar la palabras recuperadas del Effect anterior
  useEffect(() => {
    if (!fact) return
    // const firstWord = fact.split(' ', 3).join(' ')
    const Words = fact.split(' ').slice(0, 3).join(' ')
    // console.log(Words)
    fetch(`https://cataas.com/cat/says/${Words}?size=10&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        // console.log(response)
        setImageURL(url)
      })
  }, [])

  return (
    <main>
      <h1>Hello, World!</h1>
      {fact && <p>{fact}</p>}
      {imageURL && (
        <img
          src={`${API_PREFIX_IMAGE_URL}${imageURL}`}
          alt={`Image a cat with the 3 words ${fact}`}
        />
      )}
    </main>
  )
}

export { App }
