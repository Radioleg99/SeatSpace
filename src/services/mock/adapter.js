import {
  MOCK_DELAY_MS,
  listNearbyTheaters,
  listRecentShows,
  findTheater,
  listTheaterShows,
  getShowBasic,
  getShowLayout,
  listShowComments,
  listSeatComments,
  searchCatalog,
} from './data.js'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const toAxiosResponse = (data, config = {}) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config,
})

const normalizeUrl = (url) => {
  if (!url) return '/'
  return url.startsWith('/') ? url : `/${url}`
}

const parseId = (url, prefix) => {
  const normalized = normalizeUrl(url)
  return normalized.startsWith(prefix) ? normalized.slice(prefix.length) : null
}

const toNumberOrDefault = (maybeNumber, defaultValue = 1) => {
  const parsed = Number(maybeNumber)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue
}

export const applyMockHandlers = (axiosInstance) => {
  axiosInstance.get = async (url, config = {}) => {
    const normalizedUrl = normalizeUrl(url)
    const params = config.params || {}
    await delay(MOCK_DELAY_MS)

    if (normalizedUrl === '/theater/nearby') {
      return toAxiosResponse(listNearbyTheaters(), config)
    }

    if (normalizedUrl === '/show/recent') {
      return toAxiosResponse(listRecentShows(), config)
    }

    if (normalizedUrl.startsWith('/theater/basic/')) {
      const theaterId = parseId(normalizedUrl, '/theater/basic/')
      const theater = findTheater(theaterId)
      return theater
        ? toAxiosResponse(theater, config)
        : Promise.reject(new Error(`Mock theater ${theaterId} not found`))
    }

    if (normalizedUrl.startsWith('/theater/shows/')) {
      const theaterId = parseId(normalizedUrl, '/theater/shows/')
      const page = toNumberOrDefault(params.page || config.page, 1)
      return toAxiosResponse(listTheaterShows(theaterId, page), config)
    }

    if (normalizedUrl.startsWith('/show/basic/')) {
      const showId = parseId(normalizedUrl, '/show/basic/')
      const showBasic = getShowBasic(showId)
      return showBasic
        ? toAxiosResponse(showBasic, config)
        : Promise.reject(new Error(`Mock show ${showId} not found`))
    }

    if (normalizedUrl.startsWith('/show/layout/')) {
      const showId = parseId(normalizedUrl, '/show/layout/')
      return toAxiosResponse(getShowLayout(showId), config)
    }

    if (normalizedUrl.startsWith('/show/comment/')) {
      const showId = parseId(normalizedUrl, '/show/comment/')
      const page = toNumberOrDefault(params.page || config.page, 1)
      return toAxiosResponse(listShowComments(showId, page), config)
    }

    if (normalizedUrl.startsWith('/seat/')) {
      const seatId = parseId(normalizedUrl, '/seat/')
      const comments = listSeatComments(Number(seatId))
      return toAxiosResponse({ comments }, config)
    }

    if (normalizedUrl === '/search') {
      const keyword = params.search_content || params.keyword || ''
      const page = toNumberOrDefault(params.page || config.page, 1)
      return toAxiosResponse(searchCatalog(keyword, page), config)
    }

    return Promise.reject(new Error(`Mock GET handler missing for ${normalizedUrl}`))
  }

  axiosInstance.post = async (url, data, config = {}) => {
    const normalizedUrl = normalizeUrl(url)
    await delay(MOCK_DELAY_MS)

    if (normalizedUrl === '/comment/new') {
      return toAxiosResponse({
        success: true,
        message: 'Mock comment accepted locally. Data is not persisted.',
      }, config)
    }

    return Promise.reject(new Error(`Mock POST handler missing for ${normalizedUrl}`))
  }

  return axiosInstance
}
