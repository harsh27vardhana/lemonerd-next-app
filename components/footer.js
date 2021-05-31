import Link from "next/link"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from '../styles/Footer.module.css'
function footer() {
    return (
        <div>
            <div className={styles.footernav}>
                <div className={styles.routes}>
                    <Link href="/"> HOME </Link>
                </div>
                <div className={styles.routes}>
                    <Link href="/about">ABOUT </Link>
                </div>
                <div className={styles.routes}>
                    <Link href="/team">TEAM </Link>
                </div>


            </div>
            <div className="text-center ">
                <div className={styles.copyright}>© 2021 Copyright:
      <Link href="/"> Lemonerd.in</Link>
                </div>
            </div>
        </div>
    )
}

export default footer
