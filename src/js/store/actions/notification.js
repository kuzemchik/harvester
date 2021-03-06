export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

export const setNotification = ({ message, feature, duration, messageType = 'confirmation' }) => ({
  type: `${feature} ${SET_NOTIFICATION}`,
  payload: message,
  meta: { feature, duration, messageType },
})

export const setErrorNotification = (options) => setNotification({ ...options,  messageType: 'error' })

export const removeNotification = ({ notificationId, feature }) => ({
  type: `${feature} ${REMOVE_NOTIFICATION}`,
  payload: notificationId,
  meta: { feature },
})
