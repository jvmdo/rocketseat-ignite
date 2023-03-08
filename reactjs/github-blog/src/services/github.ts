import { AxiosResponse } from 'axios'
import { github } from '../lib/axios'

export type ProfileUserData = {
  avatarUrl: string
  name: string
  profileUrl: string
  bio: string | null
  username: string
  company: string | null
  followers: number
} | null

export async function getGitHubUser(username = 'jvmdo') {
  try {
    const response = await github.get(`/users/${username}`)
    const { status, data } = response

    if (status === 200) {
      const {
        avatar_url: avatarUrl,
        name,
        html_url: profileUrl,
        login: username,
        bio,
        company,
        followers,
      } = data

      const profileUserData: ProfileUserData = {
        avatarUrl,
        name,
        profileUrl,
        username,
        bio,
        company,
        followers,
      }

      return profileUserData
    } else {
      console.log(`Request failed with status code ${status}`)
      return null
    }
  } catch (err) {
    console.log(`Request failed with error: ${err}`)
    return null
  }
}

export type IssueCardData = {
  [x: string]: any
  title: string
  createdAt: string
  body: string
  number: number
}

export async function getIssueCardData(
  name?: string,
  repo = 'jvmdo/rocketseat-ignite',
) {
  const q = `repo:${repo} ${name ?? ''}`
  try {
    const response: AxiosResponse<{ items: IssueCardData[] }> =
      await github.get('/search/issues', { params: { q } })
    const { status, data } = response

    if (status === 200) {
      const issueCardData = data.items.map((item) => ({
        title: item.title,
        createdAt: item.created_at,
        body: item.body,
        number: item.number,
      }))
      return issueCardData
    } else {
      console.log(`Request failed with status code ${status}`)
      return null
    }
  } catch (err) {
    console.log(`Request failed with error: ${err}`)
    return null
  }
}

export type IssuePostData = {
  issueUrl: string
  title: string
  username: string
  createdAt: string
  comments: number
  body: string
} | null

export async function getIssuePostData(
  number: string,
  repo = 'jvmdo/rocketseat-ignite',
) {
  const path = `repos/${repo}/issues/${number}`
  try {
    const response = await github.get(path)
    const { status, data } = response

    if (status === 200) {
      const {
        html_url: issueUrl,
        title,
        user: { login: username },
        created_at: createdAt,
        comments,
        body,
      } = data
      const issueData: IssuePostData = {
        issueUrl,
        title,
        username,
        createdAt,
        comments,
        body,
      }
      return issueData
    } else {
      console.log(`Request failed with status code ${status}`)
      return null
    }
  } catch (err) {
    console.log(`Request failed with error: ${err}`)
    return null
  }
}
