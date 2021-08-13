import axios from 'axios'

interface FetcherProps<T> {
  method: 'get' | 'post' | 'put' | 'delete'
  body?: T | Record<string, string | number>
  headers?: Record<string, string>
}

const fetcher = <T, P>(
  url: string,
  { method, body, headers }: FetcherProps<T>,
) => {
  if (method === 'post' || method === 'put') {
    return axios[method](url, body, { headers })
      .then((res) => (res.status === 200 ? (res.data as P) : null))
      .catch(() => null)
  }

  return axios[method](url, { headers })
    .then((res) => (res.status === 200 ? (res.data as P) : null))
    .catch(() => null)
}

export default fetcher
