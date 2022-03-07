import ModalCard from '@/components/modal-card/modal-card.vue'
import { ref } from 'vue'

type callBackType = (dialogTitle: any) => void

export function useModalCard(newCb: callBackType, editCb: callBackType) {
  const modalCardRef = ref<InstanceType<typeof ModalCard>>()
  const defaultInfo = ref({})
  const dialogTitle = ref('')
  const handleNewClick = () => {
    defaultInfo.value = {}
    if (modalCardRef.value) {
      modalCardRef.value.dialogVisible = true
    }
    newCb && newCb(dialogTitle)
  }

  const handleEditClick = (data: any) => {
    defaultInfo.value = { ...data }
    if (modalCardRef.value) {
      modalCardRef.value.dialogVisible = true
    }
    editCb && editCb(dialogTitle)
  }

  return [modalCardRef, dialogTitle, defaultInfo, handleNewClick, handleEditClick]
}
