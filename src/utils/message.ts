import { Dialog } from '@varlet/ui';
import { Snackbar } from '@varlet/ui';

export function showErrorDialog(content: string) {
  Dialog({
    title: '错误',
    message: content,
    cancelButton: false,
    confirmButtonTextColor: 'var(--color-danger)',
  });
}

export function showWarningDialog(content: string) {
  Dialog({
    title: '错误',
    message: content,
    cancelButton: false,
    confirmButtonTextColor: 'var(--color-warning)',
  });
}

export function showConfirmDialog(content: string, callback: () => void) {
  Dialog({
    title: '提示',
    message: content,
    onConfirm: () => {
      callback();
    },
  });
}

export function showSuccessNotice(content: string) {
  Snackbar.success({
    content,
    duration: 1500,
  });
}

export function showWarningNotice(content: string) {
  Snackbar.warning({
    content,
    duration: 1500,
  });
}

export function showInfoMessage(content: string) {
  Snackbar.info({
    content,
    duration: 1500,
  });
}

export function showErrorMessage(content: string) {
  Snackbar.error({
    content,
    duration: 1500,
  });
}
