import { ethers } from 'ethers'
import { logger } from './logger'

let provider: ethers.JsonRpcProvider | null = null
let signer: ethers.Wallet | null = null

export function getProvider(): ethers.JsonRpcProvider {
  if (provider) return provider
  const rpcUrl = process.env.RPC_URL || process.env.VITE_RPC_URL
  if (!rpcUrl) {
    throw new Error('RPC_URL not configured')
  }
  provider = new ethers.JsonRpcProvider(rpcUrl)
  return provider
}

export function getSigner(): ethers.Wallet {
  if (signer) return signer
  const pk = process.env.PRIVATE_KEY
  if (!pk) {
    throw new Error('PRIVATE_KEY not configured')
  }
  signer = new ethers.Wallet(pk, getProvider())
  logger.info(`Blockchain signer loaded: ${signer.address}`)
  return signer
}

export async function mintTicketsFor(
  eventContractAddress: string,
  abi: any[],
  to: string,
  quantity: number
): Promise<{ txHash: string; tokenIds: number[] }> {
  const wallet = getSigner()
  const contract = new ethers.Contract(eventContractAddress, abi, wallet)
  const start: bigint = await contract.tokenCounter()
  const tx = await contract.mintFor(to, quantity)
  const receipt = await tx.wait()
  const first = Number(start)
  const ids: number[] = Array.from({ length: quantity }, (_, i) => first + i)
  return { txHash: receipt?.hash || tx.hash, tokenIds: ids }
}
