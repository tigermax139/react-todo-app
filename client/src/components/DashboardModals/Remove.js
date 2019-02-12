import { Modal } from 'antd';

const confirm = Modal.confirm;

export default function showConfirm(onSubmit) {
  confirm({
    title: 'Do you Want to delete this item?',
    onOk() {
      onSubmit(true);
    },
    onCancel() {
      onSubmit(false);
    },
  });
}