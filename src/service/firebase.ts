import firebaseApp from '../config/firebase.config'
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage'

const storage = getStorage(firebaseApp)

const avatarFolderString = 'avatar/'
const typeUploadString = 'base64'

export const uploadAvatar = async (
  avatarName: string,
  base64String: string
) => {
  const avatarRef = ref(storage, avatarFolderString + avatarName)

  try {
    const snapshot = await uploadString(
      avatarRef,
      base64String,
      typeUploadString
    )
    const downloadURL = await getDownloadURL(snapshot.ref)

    return downloadURL
  } catch (error) {
    return error
  }
}
