import styles from './style.module.scss'
import Arrow from '../../assets/Icon/Chevron.svg?react'
import { FC } from 'react'
import { TableProps } from 'Types/ownType'
import { getColor } from '../../Helpers/getColor'
import { Link } from 'react-router-dom'
import { columns } from '../../Helpers/mock'

export const Table: FC<TableProps> = ({ task, sortByField }) => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.headerContainer}>
        {columns.map((column) => (
          <p key={column.dataKey}>
            {column.title} <Arrow onClick={() => sortByField(column.dataKey)} />
          </p>
        ))}
      </div>

      {task.map((task) => (
        <div className={styles.item} key={task.id}>
          <span
            className={` ${styles['status-' + getColor(task.siteInfo.url)]}`}
          ></span>
          <p style={{ textTransform: 'capitalize' }}>
            {task.name.toLowerCase()}
          </p>

          <p style={{ textTransform: 'capitalize' }}>
            {task.type.toLowerCase()}
          </p>
          <p
            className={styles['status-' + task.status.toLowerCase()]}
            style={{ textTransform: 'capitalize' }}
          >
            {task.status.toLowerCase()}
          </p>

          <p>
            {task.siteInfo?.url}
            {Math.random() < 0.5 ? (
              <Link to={`results/${task.id}`} className={styles.resultsButton}>
                Results
              </Link>
            ) : (
              <Link
                to={`finalize/${task.id}`}
                className={styles.resultsFinalize}
              >
                Finalize
              </Link>
            )}
          </p>
        </div>
      ))}
    </div>
  )
}
