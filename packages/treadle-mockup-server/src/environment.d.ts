export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MASTER_PRIVATE_KEY: string;
            TRDLB_CONTRACT_ID: string;
        }
    }
}
