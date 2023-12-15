import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import styles from './style.module.scss'
export const Layout: FC = () => {
  return (
    <div className={styles.layoutContainer}>
      <Outlet />
    </div>
  )
}
