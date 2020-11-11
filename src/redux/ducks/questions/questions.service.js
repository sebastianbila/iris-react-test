import axios from 'axios'
import { transformTags } from '../../../shared/utils'

// Url to fetch all questions from stackoverflow
const REQUEST_URL = 'https://api.stackexchange.com/2.2/questions'

export async function fetchQuestionFromAPI(params = {}) {
  const order = params.order || 'desc'
  const sort = params.sort || 'activity'
  const fromDate = params.fromDate || ''
  const toDate = params.toDate || ''
  const tags = params.tags || ','
  const page = params.page || 1

  const transformedTags = transformTags(tags).join('OE')

  const requestConfig = {
    params: {
      site: 'stackoverflow',
      order,
      sort,
      todate: toDate,
      fromdate: fromDate,
      pagesize: 25,
      page,
      q: transformedTags
    }
  }
  const response = await axios.get(REQUEST_URL, requestConfig)
  return transformQuestion(response.data.items)
}

function transformQuestion(questions) {
  return questions.map((item) => {
    return {
      title: item.title,
      link: item.link,
      user: item.owner.display_name,
      creationDate: item.creation_date,
      score: item.score,
      viewCount: item.view_count,
      answerCount: item.answer_count,
      tags: item.tags
    }
  })
}
