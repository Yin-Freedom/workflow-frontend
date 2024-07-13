import { http } from '@/utils/http';

export const findByPage = (data) => {
  const url = '/api/generator/findByPage'
  return http.request('post', url, { data });
}

export const saveOrUpdate = (data) => {
  const url = '/api/generator/saveOrUpdate'
  return http.request('post', url, { data });
}

export const deleteByIds = (data) => {
  const url = '/api/generator/deleteByIds'
  return http.request('post', url, { data });
}

export const findByTemplateName = (data) => {
  const url = '/api/generator/findByTemplateName'
  return http.request('post', url, { data });
}
