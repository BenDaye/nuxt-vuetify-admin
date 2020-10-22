import os from 'os'

export const getNodeRuntime = () => {
  const unit = 1024
  const precision = 2
  return {
    system: os.type(),
    release: os.release(),
    nodeVersion: process.version,
    totalmem: (os.totalmem() / unit / unit / unit).toFixed(precision),
    arch: os.arch(),
    cpuNumber: os.cpus().length,
  }
}
