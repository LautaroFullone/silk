import { useLayoutEffect, useRef, useState } from 'react'

const useDinamicHeight = () => {
   const ref = useRef<HTMLElement>(null)
   const [height, setHeight] = useState(0)

   useLayoutEffect(() => {
      const updateHeight = () => {
         if (ref.current) {
            setHeight(ref.current.offsetHeight)
         }
      }

      updateHeight()
      window.addEventListener('resize', updateHeight)
      window.addEventListener('scroll', updateHeight)

      return () => {
         window.removeEventListener('resize', updateHeight)
         window.removeEventListener('scroll', updateHeight)
      }
   }, [ref])

   return { ref, height }
}

export default useDinamicHeight
