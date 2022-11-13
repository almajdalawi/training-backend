import * as dotenv from 'dotenv'

dotenv.config()

export function getEnv(envName: string, fallback: string | number): any {
    const env = process.env[envName]
    if (env) {
        return env
    } else {
        return fallback
    }
}
