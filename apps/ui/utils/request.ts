import axios from 'axios'

class Request {
  private static client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' },
  })

  static async post<T = any>(
    path: string,
    body: Record<string, string | number>
  ) {
    const { data } = await this.client.post<T>(path, body)
    return data
  }
}

export default Request
