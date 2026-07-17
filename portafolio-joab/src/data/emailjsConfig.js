

export const EMAILJS_CONFIG = {
  serviceId: 'service_z2lqdgc',
  templateId: 'template_w1a553b',
  publicKey: 'XWCIZdonmX_Mngvzz',
}

export const isEmailJSConfigured = () =>
  !Object.values(EMAILJS_CONFIG).some((v) => v.startsWith('REEMPLAZAR_'))
