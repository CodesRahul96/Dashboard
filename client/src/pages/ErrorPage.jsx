import React from 'react'
import Counter from './dashboard/Counter/Counter'

export const ErrorPage = () => {
  document.title = "Page Not Found!";
  return (
    <div className='container'>
      <h1>😑</h1>
      <h1>Page Not Found!</h1>
      <span>Error 404</span>
      <Counter />
    </div>
  )
}
