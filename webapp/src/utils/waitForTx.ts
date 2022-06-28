interface WaitForTxOptions {
  pollingIntervalMs?: number
  timeoutMs?: number 
}

export const waitForTx = async (txHash: string, opts?: WaitForTxOptions): Promise<any> => {
  // @ts-ignore
  const zilliqa = window.zilPay;
  const { pollingIntervalMs = 1000, timeoutMs = 120000 } = opts || {}
  return new Promise(async (resolve, reject) => {
    const pollingInterval = setInterval(async () => {
      try {        
        const res = await zilliqa.blockchain.getTransaction(
          txHash,
        );
        clearInterval(pollingInterval)
        return resolve(res)
      } catch (error) {
        console.log(`txHash=${txHash} not found on Blockchain. Polling...`)
      }
    }, pollingIntervalMs)
    const timeout = setTimeout(() => {
      clearTimeout(timeout)
      return reject()
    }, timeoutMs)
  })
}
