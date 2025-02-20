import { defaultAccounts } from '../defaultAccounts.js'
import { defineChain } from '../defineChain.js'

const custom = {
  collectivesPolkadot: {
    dot: { Concrete: { parents: 1, interior: 'Here' } },
  },
  collectiveseKusama: {
    ksm: { Concrete: { parents: 1, interior: 'Here' } },
  },
}

const getInitStorages = (_config: typeof custom.collectivesPolkadot | typeof custom.collectiveseKusama) => ({
  System: {
    account: [
      [[defaultAccounts.alice.address], { providers: 1, data: { free: 1000e10 } }],
      [[defaultAccounts.bob.address], { providers: 1, data: { free: 1000e10 } }],
    ],
  },
})

export const collectivesPolkadot = defineChain({
  name: 'collectivesPolkadot',
  endpoint: 'wss://polkadot-collectives-rpc.polkadot.io',
  paraId: 1001,
  custom: custom.collectivesPolkadot,
  initStorages: getInitStorages(custom.collectivesPolkadot),
})

export const collectiveseKusama = defineChain({
  name: 'collectiveseKusama',
  endpoint: 'wss://kusama-collectives-rpc.polkadot.io',
  paraId: 1001,
  custom: custom.collectiveseKusama,
  initStorages: getInitStorages(custom.collectiveseKusama),
})
