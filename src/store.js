import OrbitDB from 'orbit-db'
import { create } from 'ipfs';

class DataStore {
    constructor() {
        this.ipfs = null;
        this.odb = null;
    }

    async create() {
        this.node = await create({
            preload: { enabled: false },
            repo: './ipfs',
            EXPERIMENTAL: { pubsub: true },
            config: {
              Bootstrap: [],
              Addresses: { Swarm: [] }
            }
        })

        this._init()
    }

    async _init() {
        this.orbitdb = await OrbitDB.createInstance(this.node)
        this.defaultOptions = { accessController: {
            write: [this.orbitdb.identity.id]
        }}

        const docStoreOptions = {
            ...this.defaultOptions,
            indexBy: 'hash',
          }
          this.pieces = await this.orbitdb.docstore('pieces', docStoreOptions)
          await this.pieces.load()
          this.onready()
    }
}

const store = window.store = new DataStore()
export default store