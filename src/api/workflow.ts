import { http } from '@/utils/http'
const baseUrl = '/api/flow'

export const findDefinitionByPage = (data) => {
  const url = baseUrl + '/findDefinitionByPage'
  return http.request('post', url, { data });
}

export const findFlowInstanceByPage = (data) => {
  const url = baseUrl + '/findFlowInstanceByPage'
  return http.request('post', url, { data });
}

export const findNodeInstanceByPage = (data) => {
  const url = baseUrl + '/findNodeInstanceByPage'
  return http.request('post', url, { data });
}

/**
 * 流程查询
 */
export const queryFlow = (data) => {
  const url = baseUrl + '/queryFlow'
  return http.request('post', url, { data });
}

export const createFlow = (data) => {
  const url = baseUrl + '/createFlow'
  return http.request('post', url, { data });
}

export const saveFlow = (data) => {
  const url = baseUrl + '/saveFlowModel'
  return http.request('post', url, { data });
}

export const deployFlow = (data) => {
  const url = baseUrl + '/deployFlow'
  return http.request('post', url, { data });
}

export const startProcess = (data) => {
  const url = baseUrl + '/startProcess'
  return http.request('post', url, { data });
}

export const commitTask = (data) => {
  const url = baseUrl + '/commitTask'
  return http.request('post', url, { data });
}

export const rollbackTask = (data) => {
  const url = baseUrl + '/rollbackTask'
  return http.request('post', url, { data });
}
