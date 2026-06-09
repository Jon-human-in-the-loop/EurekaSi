#!/usr/bin/env node
/**
 * Genera el hash de la contraseña del admin para ADMIN_PASSWORD_HASH.
 * Uso:  npm run hash:password -- "mi-contraseña-larga"
 * Formato de salida:  <salt-hex>:<hash-hex>  (compatible con api/_lib/auth.ts)
 */
import { randomBytes, scryptSync } from 'node:crypto'

const password = process.argv[2]
if (!password) {
  console.error('Uso: npm run hash:password -- "<contraseña>"')
  process.exit(1)
}

const salt = randomBytes(16)
const hash = scryptSync(password, salt, 64)
console.log(`${salt.toString('hex')}:${hash.toString('hex')}`)
