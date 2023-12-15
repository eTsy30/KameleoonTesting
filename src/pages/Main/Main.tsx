/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react'
import styles from './style.module.scss'
import SearchIcon from '../../assets/Icon/Search.svg?react'
import { Table } from '@components/Table/Table'
import axios from 'axios'
import { Task } from 'Types/ownType'
export const Main: FC = () => {
  const [task, setTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState<Task[]>()
  const [searchValue, setSearchValue] = useState<string>('')
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc')
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const responseTest = await axios.get('http://localhost:3100/tests')
      const responseSites = await axios.get('http://localhost:3100/sites')
      const mergedData = responseTest.data.map((test: { siteId: any }) => {
        const matchingSite = responseSites.data.find(
          (site: { id: any }) => site.id === test.siteId
        )
        let urlWithoutProtocol = matchingSite
          ? matchingSite.url.replace(/(^\w+:|^)\/\//, '')
          : null
        urlWithoutProtocol = urlWithoutProtocol.replace('www.', '')
        return {
          ...test,
          siteInfo: matchingSite ? { url: urlWithoutProtocol } : null,
        }
      })

      setTasks(mergedData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const searchByName = (query: string) => {
    const filteredTasks = task.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(query.toLowerCase())
      )
    )
    return setSearchQuery(filteredTasks)
  }

  const sortByField = (field: keyof Task) => {
    const sortedTasks = [...task]

    if (field === 'status') {
      const online = sortedTasks.filter(
        (item) => item.status.toLocaleLowerCase() === 'online'
      )
      const paused = sortedTasks.filter(
        (item) => item.status.toLocaleLowerCase() === 'paused'
      )
      const stopped = sortedTasks.filter(
        (item) => item.status.toLocaleLowerCase() === 'stopped'
      )
      const draft = sortedTasks.filter(
        (item) => item.status.toLocaleLowerCase() === 'draft'
      )
      const newOrder = [...online, ...paused, ...stopped, ...draft]
      sortBy === 'asc' ? newOrder : newOrder.reverse()
      setTasks(newOrder)
    } else {
      sortedTasks.sort((a, b) => {
        const fieldA = String(a[field]).toLowerCase()
        const fieldB = String(b[field]).toLowerCase()
        if (sortBy === 'asc') {
          return fieldA < fieldB ? -1 : 1
        } else {
          return fieldA > fieldB ? -1 : 1
        }
      })

      setTasks(sortedTasks)
    }
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc')
  }

  return (
    <main className={styles.mainContainer}>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.searchContainer}>
        <SearchIcon />
        <input
          type="text"
          placeholder="What test are you looking for?"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            searchByName(e.target.value)
          }}
        />
        <span>
          {searchQuery !== undefined ? searchQuery.length : task.length} tests
        </span>
      </div>
      {searchQuery !== undefined && searchQuery.length === 0 ? (
        <div className={styles.badSearch}>
          <h4>Your search did not match any results.</h4>
          <button
            onClick={() => {
              setSearchQuery(undefined)
              setSearchValue('')
            }}
            className={styles.resultsButton}
          >
            Reset
          </button>
        </div>
      ) : (
        <Table
          task={searchQuery !== undefined ? searchQuery : task}
          setTasks={setTasks}
          sortByField={sortByField}
        />
      )}
    </main>
  )
}
