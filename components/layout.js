import Navbar from './navbar'
import Footer from './footer'
import Link from 'next/link'
import styles from '../styles/Layout.module.css'


function layout({ children }) {
    return (
        <>

          <Navbar/>
              
         
             {children}

             <Footer/>
        </>
    )
}

export default layout
