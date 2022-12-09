import request from '@/utils/request.js'

export const getUserAPI = function() {
  return request.get('/user')
}
