import React, { useRef, useState } from 'react'

const IframeHero = () => {
  const iframeRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <iframe
      ref={iframeRef}
      className={`${
        isLoading ? 'opacity-0' : 'opacity-1'
      } transition-all duration-1000`}
      src="https://my.spline.design/untitled-18ba1390b53bebdecb84a2fb59aca0ec/"
      frameBorder="0"
      width="100%"
      height="100%"
      loading="eager"
      onLoad={handleIframeLoad}
    />
  )
}

export default IframeHero
