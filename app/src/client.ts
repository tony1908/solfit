import 'fast-text-encoding'
import { createClient } from '@dynamic-labs/client'
import { ReactNativeExtension } from '@dynamic-labs/react-native-extension'
import { ViemExtension } from '@dynamic-labs/viem-extension'
import { SolanaExtension } from '@dynamic-labs/solana-extension';

const environmentId =
  (process.env.EXPO_PUBLIC_ENVIRONMENT_ID as string) ||
  ''

if (!environmentId) {
  throw new Error('EXPO_PUBLIC_ENVIRONMENT_ID is required')
}

// Leave this undefined to use the default dynamic api base url
const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL

export const client = createClient({
  environmentId,
  apiBaseUrl,
  appLogoUrl: 'https://demo.dynamic.xyz/favicon-32x32.png',
  appName: 'Demo',
})
  .extend(ReactNativeExtension())
    .extend(SolanaExtension());
