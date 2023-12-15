import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './style.module.scss'
import Arrow from '@assets/Icon/Chevron.svg?react'
import { Task } from 'Types/ownType'
export const Finalize = () => {
  const [task, setTasks] = useState<Task>()
  const { idTask } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTest = await axios.get(
          `http://localhost:3100/tests/${idTask}`
        )
        const responseSites = await axios.get(
          `http://localhost:3100/sites/${responseTest.data.siteId}`
        )

        setTasks({
          ...responseTest.data,
          siteInfo: responseSites.data,
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Finalize</h1>
        <p className={styles.suptitle}>{task?.name}</p>
      </div>
      <div className={styles.colontitul} onClick={() => navigate(-1)}>
        <Arrow />
        <p className={styles.goBack}>Back</p>
      </div>
    </div>
  )
}
